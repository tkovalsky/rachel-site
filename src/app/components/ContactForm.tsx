"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  // Handler must return void for the lint rule
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void (async () => {
      try {
        setStatus("sending");
        const fd = new FormData(e.currentTarget);

        const getStr = (name: string) => {
          const v = fd.get(name);
          return typeof v === "string" ? v : "";
        };

        const payload = {
          email: getStr("email"),
          name: getStr("name"),
          phone: getStr("phone"),
          message: getStr("notes"),
          _gotcha: getStr("_gotcha"),
        };

        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setStatus("ok");
        e.currentTarget.reset();
      } catch {
        setStatus("error");
      }
    })();
  };

  return (
    <section id="contact" className="border-t bg-surface-subtle">
      <div className="section py-16">
        <h2 className="h2 text-deep">Let's talk about your move</h2>
        <p className="mt-4 body-large text-ink-soft">No pressure. Share your timing and must-haves.</p>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <input 
            required 
            name="name" 
            placeholder="Name" 
            className="rounded-lg border border-divider bg-surface p-4 text-lg text-ink placeholder:text-ink-lighter focus:border-champagne focus:outline-none transition-colors" 
          />
          <input 
            required 
            type="email" 
            name="email" 
            placeholder="Email" 
            className="rounded-lg border border-divider bg-surface p-4 text-lg text-ink placeholder:text-ink-lighter focus:border-champagne focus:outline-none transition-colors" 
          />
          <input 
            name="phone" 
            placeholder="Phone" 
            className="rounded-lg border border-divider bg-surface p-4 text-lg text-ink placeholder:text-ink-lighter focus:border-champagne focus:outline-none transition-colors" 
          />
          <input 
            name="neighborhoods" 
            placeholder="Neighborhoods of interest" 
            className="rounded-lg border border-divider bg-surface p-4 text-lg text-ink placeholder:text-ink-lighter focus:border-champagne focus:outline-none transition-colors" 
          />
          <textarea 
            name="notes" 
            placeholder="Timing, budget, must-haves…" 
            className="h-32 rounded-lg border border-divider bg-surface p-4 text-lg text-ink placeholder:text-ink-lighter focus:border-champagne focus:outline-none transition-colors md:col-span-2" 
          />
          {/* Honeypot */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full sm:w-1/2 md:w-1/3"
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>
          </div>
        </form>

        {status === "ok" && <p className="mt-4 body-small text-success">Thanks! We'll be in touch.</p>}
        {status === "error" && <p className="mt-4 body-small text-danger">Sorry, something went wrong.</p>}

        <p className="mt-6 body-small text-ink-lighter">
          By submitting, you agree to our <a href="/privacy" className="text-champagne hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </section>
  );
}