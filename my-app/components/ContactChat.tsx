"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

type Msg = { role: "user" | "assistant"; content: string };

const hello: Msg = {
  role: "assistant",
  content:
    "Hi, I'm Rhuzzel's AI assistant. Ask me about his work, or tell me what you have in mind and I'll pass it on to him.",
};
const chips = [
  "What does Rhuzzel do?",
  "Show me his projects",
  "I'd like to hire him",
];

// ChatGPT-style conversation: assistant text flows unboxed beside an avatar, the visitor's turns are bubbles, the composer is a pill.
export default function ContactChat() {
  const [msgs, setMsgs] = useState<Msg[]>([hello]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const log = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    log.current?.scrollTo({
      top: log.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs]);

  // Edits the assistant reply that is currently streaming (always the last message).
  const write = (v: string, add = true) =>
    setMsgs((m) => {
      const last = m[m.length - 1];
      return [
        ...m.slice(0, -1),
        { ...last, content: add ? last.content + v : v },
      ];
    });

  const send = async (q: string) => {
    const content = q.trim();
    if (!content || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content }];
    setMsgs([...next, { role: "assistant", content: "" }]);
    setText("");
    if (box.current) box.current.style.height = "";
    setBusy(true);
    let got = false;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => null);
        write(j?.error ?? "Something went wrong.", false);
        got = true;
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const l of lines) {
          if (!l) continue;
          const e = JSON.parse(l);
          got = true;
          if (e.t === "text") write(e.v);
          else if (e.t === "err") write(`${e.v}`);
          else if (e.t === "sent") {
            setSent(true);
            write(`Sent! Rhuzzel replies within ${site.replyTime}.`);
          }
        }
      }
    } catch {
      write("Network error. Please try again.", false);
      got = true;
    } finally {
      if (!got)
        write(
          `Hmm, I got nothing back. You can email ${site.email} directly.`,
          false,
        );
      setBusy(false);
      box.current?.focus();
    }
  };

  const reset = () => {
    setMsgs([hello]);
    setSent(false);
    setText("");
  };

  return (
    <div className="flex h-[min(640px,calc(100svh-340px))] min-h-[420px] flex-col">
      <div className="flex items-center gap-3 border-b-[1.5px] border-ink pb-3">
        <span
          aria-hidden="true"
          className="display grid size-10 place-items-center rounded-full border-[1.5px] border-ink bg-blue text-[18px] text-white"
        >
          R
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-tight">
            Chat with Rhuzzel&rsquo;s assistant
          </p>
          <p className="mono text-[11px] text-muted">
            AI · answers from his resume
          </p>
        </div>
        {msgs.length > 1 && (
          <button
            type="button"
            onClick={reset}
            disabled={busy}
            className="mono rounded-full border-[1.5px] border-ink px-3 py-1.5 text-[11px] uppercase transition-transform active:scale-[.96] disabled:opacity-40"
          >
            New chat
          </button>
        )}
      </div>

      <div
        ref={log}
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        className="flex-1 space-y-5 overflow-y-auto py-5 pr-1"
      >
        {msgs.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <p className="max-w-[85%] whitespace-pre-wrap rounded-[20px] rounded-br-md bg-ink px-4 py-2.5 text-paper">
                {m.content}
              </p>
            </div>
          ) : (
            <div key={i} className="flex gap-3">
              <span
                aria-hidden="true"
                className="display mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border-[1.5px] border-ink bg-blue text-[14px] text-white"
              >
                R
              </span>
              <p className="max-w-[85%] whitespace-pre-wrap pt-1 leading-relaxed">
                {m.content || (
                  <span
                    className="inline-flex gap-1 align-middle"
                    role="status"
                    aria-label="Typing"
                  >
                    {[0, 1, 2].map((d) => (
                      <i
                        key={d}
                        style={{ animationDelay: `${d * 0.15}s` }}
                        className="chat-dot size-2 rounded-full bg-muted"
                      />
                    ))}
                  </span>
                )}
              </p>
            </div>
          ),
        )}
        {msgs.length === 1 && (
          <div className="flex flex-wrap gap-2 pl-11">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => send(c)}
                className="rounded-full border-[1.5px] border-ink bg-card px-3.5 py-2 text-sm transition-transform hover:-translate-y-0.5 active:scale-[.97]"
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(text);
        }}
        className="flex items-end gap-2 rounded-[26px] border-[1.5px] border-ink bg-card p-2 pl-4 shadow-[4px_4px_0_var(--blue)]"
      >
        <textarea
          ref={box}
          rows={1}
          value={text}
          maxLength={2000}
          disabled={busy}
          aria-label="Message"
          placeholder={sent ? "Anything else?" : "Message Rhuzzel's assistant…"}
          onChange={(e) => {
            setText(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
          }}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey &&
              !e.nativeEvent.isComposing
            ) {
              e.preventDefault();
              send(text);
            }
          }}
          className="max-h-[140px] min-h-[40px] flex-1 resize-none bg-transparent py-2 text-[16px] outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={busy || !text.trim()}
          aria-label="Send"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform active:scale-[.92] disabled:opacity-30"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-5"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </form>
      <p className="mono mt-2 text-center text-[10px] text-muted">
        AI can be wrong. For anything important, email {site.email}.
      </p>
    </div>
  );
}
