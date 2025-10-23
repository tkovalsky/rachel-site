"use client";
import { useState } from "react";

// Newsletter signup (posts to /api/contact; hidden type=newsletter)
export default function GuideDownload() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [progressMessage, setProgressMessage] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void (async () => {
      try {
        setStatus("sending");
        setProgressMessage("Adding you to the list...");
        
        const fd = new FormData(e.currentTarget);

        const getStr = (name: string) => {
          const v = fd.get(name);
          return typeof v === "string" ? v : "";
        };

        const payload = {
          email: getStr("email"),
          type: "newsletter",
          source: "newsletter-signup",
          _gotcha: getStr("_gotcha"),
        };

        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const result = await res.json();
        
        // Handle both success and duplicate cases
        if (result.ok) {
          setStatus("ok");
          // Don't reset form - we'll hide it instead
        } else {
          throw new Error(result.error || 'Unknown error');
        }
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
    <section aria-label="Newsletter signup" className="py-20 bg-surface-subtle">
      <div className="section">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="h2 text-deep mb-4">
                Weekly South Florida Market Notes
              </h2>
              <p className="body-large text-ink-soft max-w-2xl mx-auto">
                Short, useful updates on Delray, Boca & Boynton — new listings, price trends, and
                neighborhood spotlights. No spam.
              </p>
            </div>

            {status === "ok" ? (
              // Success state - hide form, show success message
              <div className="max-w-2xl mx-auto text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="h3 text-deep mb-2">You're added to The Loop!</h3>
                  <p className="body-large text-ink-soft">
                    Welcome to our weekly South Florida market updates. We'll send you the latest insights on Delray, Boca & Boynton.
                  </p>
                </div>
                <p className="body-small text-ink-lighter">
                  Check your email for a confirmation. You can unsubscribe anytime.
                </p>
              </div>
            ) : (
              // Form state
              <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <label htmlFor="nl-email" className="sr-only">Email</label>
                  <input
                    id="gd-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="youre@thebest.com"
                    className="flex-1 rounded-lg border border-divider bg-surface px-4 py-3 text-lg text-ink placeholder:text-ink-lighter focus:border-champagne focus:outline-none transition-colors"
                  />
                  {/* Honeypot */}
                  <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary sm:w-auto flex items-center gap-2"
                    aria-label="Subscribe to weekly market notes"
                  >
                    {status === "sending" && (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                    )}
                    {status === "sending" ? "Adding you to the list..." : "Subscribe"}
                  </button>
                </div>
                
                {status === "error" && (
                  <p className="text-center body-small text-danger mb-4">
                    {process.env.NODE_ENV === 'development' 
                      ? progressMessage || 'Sorry, something went wrong. Please try again.' 
                      : 'Sorry, something went wrong. Please try again.'}
                  </p>
                )}
                
                <p className="text-center body-small text-ink-lighter">
                  By subscribing you agree to our <a href="/privacy" className="text-champagne hover:underline">Privacy Policy</a>. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}