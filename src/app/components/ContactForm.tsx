"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [progressMessage, setProgressMessage] = useState("");

  // Handler must return void for the lint rule
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void (async () => {
      try {
        setStatus("sending");
        setProgressMessage("Sending your message...");
        
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
          source: "contact-form",
          _gotcha: getStr("_gotcha"),
        };

        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const _result = await res.json() as { ok: boolean; devMessage?: string };
        
        setStatus("ok");
        // Don't reset form - we'll hide it instead
      } catch (error) {
        setStatus("error");
        if (process.env.NODE_ENV === 'development') {
          setProgressMessage(`Dev Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } else {
          setProgressMessage("");
        }
      }
    })();
  };

  return (
    <section id="contact" className="border-t bg-surface-subtle">
      <div className="section py-16">
        <h2 className="h2 text-deep">Let's talk about your move</h2>
        <p className="mt-4 body-large text-ink-soft">No pressure. Share your timing and must-haves.</p>

        {status === "ok" ? (
          // Success state - hide form, show success message
          <div className="mt-6 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="h3 text-deep mb-2">Thanks for sharing those details!</h3>
              <p className="body-large text-ink-soft">
                I will be in touch with you soon to discuss your real estate needs.
              </p>
            </div>
            <p className="body-small text-ink-lighter">
              I'll review your information and get back to you within 24 hours.
            </p>
          </div>
        ) : (
          // Form state
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
                className="btn-primary w-full sm:w-1/2 md:w-1/3 flex items-center justify-center gap-2"
              >
                {status === "sending" && (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                )}
                {status === "sending" ? "Sending your message..." : "Send"}
              </button>
            </div>
          </form>
        )}

        {status === "error" && (
          <p className="mt-4 body-small text-danger">
            {process.env.NODE_ENV === 'development' 
              ? progressMessage || 'Sorry, something went wrong. Please try again.' 
              : 'Sorry, something went wrong. Please try again.'}
          </p>
        )}

        <p className="mt-6 body-small text-ink-lighter">
          By submitting, you agree to our <a href="/privacy" className="text-champagne hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </section>
  );
}