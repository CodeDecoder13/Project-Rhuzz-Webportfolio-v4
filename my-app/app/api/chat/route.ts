import { z } from "zod";
import { sendContact } from "@/lib/mail";
import { systemPrompt } from "@/lib/persona";
import { allow } from "@/lib/rateLimit";
import { contactSchema } from "@/lib/validators";

const body = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(2000),
      }),
    )
    .min(1)
    .max(30),
});

const sendTool = {
  name: "send_message",
  description:
    "Email the visitor's message to Rhuzzel. Call only after the visitor has confirmed name, email and message.",
  parameters: {
    type: "OBJECT",
    properties: {
      name: {
        type: "STRING",
        description: "Visitor's name, properly capitalised",
      },
      email: {
        type: "STRING",
        description: "Visitor's email, exactly as they gave it",
      },
      subject: { type: "STRING", description: "Short one-line subject" },
      message: {
        type: "STRING",
        description:
          "What the visitor wants to say, with spelling, grammar and punctuation corrected, same meaning and voice, first person",
      },
    },
    required: ["name", "email", "subject", "message"],
  },
};

const MODELS = [
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-flash-lite-latest",
  "gemini-2.5-flash-lite",
  "gemini-3.5-flash",
  "gemini-flash-latest",
];

type Part = { text?: string; functionCall?: { name: string; args: unknown } };

// Streams NDJSON to the browser: {t:"text",v} chunks, then optionally {t:"sent"} or {t:"err",v}.
export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  // ponytail: per-instance memory limiter (see lib/rateLimit.ts); 40 chat turns per hour per IP.
  if (!allow(`chat:${ip}`, Date.now(), 40))
    return Response.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 },
    );

  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success)
    return Response.json({ error: "Invalid request." }, { status: 400 });
  const key = process.env.GEMINI_API_KEY;
  if (!key)
    return Response.json({ error: "Chat is not configured." }, { status: 500 });

  const history = parsed.data.messages;
  const said = history
    .filter((m) => m.role === "user")
    .map((m) => m.content.toLowerCase());
  // Gemini wants the first turn to be the user's; drop the local greeting.
  const contents = history
    .slice(history.findIndex((m) => m.role === "user"))
    .map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

  // Free tier: each model has its own quota and speed, so try them in order and take the first that starts
  // answering within 8s (rate-limited, retired, overloaded or slow models are skipped). GEMINI_MODEL goes first.
  const reqBody = (think: boolean) =>
    JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents,
      tools: [{ functionDeclarations: [sendTool] }],
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 400,
        // minimal thinking = faster first word; not every model accepts it, so a 400 retries without
        ...(think && { thinkingConfig: { thinkingLevel: "minimal" } }),
      },
    });
  let up: Response | null = null;
  for (const model of [...new Set([process.env.GEMINI_MODEL, ...MODELS])]) {
    if (!model) continue;
    let r: Response | null = null;
    for (const think of [true, false]) {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), 8000);
      r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": key,
          },
          body: reqBody(think),
          signal: ctl.signal,
        },
      ).catch(() => null);
      clearTimeout(t); // headers arrived; let the body stream
      if (r?.status !== 400) break;
    }
    if (r?.ok && r.body) {
      up = r;
      break;
    }
    console.error("[chat] skip", model, r?.status);
  }
  if (!up?.body)
    return Response.json(
      {
        error: "The assistant is busy right now. Please try again in a moment.",
      },
      { status: 502 },
    );

  const enc = new TextEncoder();
  const dec = new TextDecoder();
  const reader = up.body.getReader();
  const stream = new ReadableStream({
    async start(ctrl) {
      let buf = "";
      let sent = false;
      const out = (o: object) =>
        ctrl.enqueue(enc.encode(JSON.stringify(o) + "\n"));

      const sendNow = async (args: unknown) => {
        // Same schema as the old form, and the email must literally appear in what the visitor typed.
        const a = contactSchema.safeParse({ ...(args as object), website: "" });
        if (
          !a.success ||
          !said.some((u) => u.includes(a.data.email.toLowerCase()))
        )
          return out({
            t: "err",
            v: "I couldn't send that. Could you double-check your email address?",
          });
        const { name, email, subject, message } = a.data;
        const err = allow(`mail:${ip}`)
          ? await sendContact({
              name,
              email,
              subject,
              message: `${message}\n\n(sent via the portfolio chat assistant)`,
              tag: "Portfolio chat",
            })
          : "Too many messages. Please try again later.";
        out(err ? { t: "err", v: err } : { t: "sent" });
      };

      const handle = async (data: string) => {
        let parts: Part[] = [];
        try {
          parts = JSON.parse(data).candidates?.[0]?.content?.parts ?? [];
        } catch {
          return;
        }
        for (const p of parts) {
          if (p.text) out({ t: "text", v: p.text });
          if (p.functionCall?.name === "send_message" && !sent) {
            sent = true;
            await sendNow(p.functionCall.args);
          }
        }
      };

      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() ?? "";
          for (const l of lines)
            if (l.startsWith("data:")) await handle(l.slice(5).trim());
        }
        if (buf.startsWith("data:")) await handle(buf.slice(5).trim());
      } catch {
        out({ t: "err", v: "The connection dropped. Please try again." });
      }
      ctrl.close();
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
