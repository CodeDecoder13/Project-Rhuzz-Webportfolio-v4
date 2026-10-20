"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactInput } from "@/lib/validators";

const input = "w-full rounded-[10px] border-[1.5px] border-ink bg-card px-3.5 py-2.5";

export default function ContactForm() {
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        reset();
        setStatus({ ok: true, msg: "Message sent. I reply within 24-48h." });
      } else {
        const j = await res.json().catch(() => null);
        setStatus({ ok: false, msg: j?.error ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ ok: false, msg: "Network error. Please try again." });
    }
  };

  const field = (name: "name" | "email" | "subject" | "message", label: string, area = false) => {
    const err = errors[name]?.message;
    const props = {
      id: name,
      className: input,
      "aria-invalid": !!err,
      "aria-describedby": err ? `${name}-err` : undefined,
      ...register(name),
    };
    return (
      <div>
        <label htmlFor={name} className="mono mb-1.5 block">
          {label}
        </label>
        {area ? <textarea rows={6} {...props} /> : <input type={name === "email" ? "email" : "text"} {...props} />}
        {err && (
          <p id={`${name}-err`} role="alert" className="mt-1 text-sm text-fail">
            {err}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
      {field("name", "Name")}
      {field("email", "Email")}
      {field("subject", "Subject")}
      {field("message", "Message", true)}
      {/* Honeypot: hidden from people and assistive tech, bots fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="justify-self-start rounded-full border-[1.5px] border-blue bg-blue px-[26px] py-3.5 font-mono text-[13px] uppercase tracking-[.06em] text-white disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
      {status && (
        <p role="status" className={status.ok ? "text-blue" : "text-fail"}>
          {status.msg}
        </p>
      )}
    </form>
  );
}
