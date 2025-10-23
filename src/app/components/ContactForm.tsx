"use client";
import { useState } from "react";

// Palm Beach and Broward County cities
const FLORIDA_CITIES = [
  // Palm Beach County
  "Boca Raton", "Boynton Beach", "Delray Beach", "West Palm Beach", "Palm Beach",
  "Jupiter", "Palm Beach Gardens", "Wellington", "Royal Palm Beach", "Lantana",
  "Lake Worth", "Greenacres", "Loxahatchee", "Tequesta", "Belle Glade",
  "Pahokee", "South Bay", "Cloud Lake", "Glen Ridge", "Haverhill",
  "Hypoluxo", "Juno Beach", "Lake Clarke Shores", "Lake Park", "Mangonia Park",
  "North Palm Beach", "Ocean Ridge", "Palm Beach Shores", "Riviera Beach",
  "South Palm Beach", "Village of Golf", "Village of North Palm Beach",
  
  // Broward County
  "Fort Lauderdale", "Hollywood", "Pembroke Pines", "Miramar", "Coral Springs",
  "Pompano Beach", "Plantation", "Sunrise", "Tamarac", "Weston", "Davie",
  "Lauderhill", "Margate", "Deerfield Beach", "Coconut Creek", "Cooper City",
  "Dania Beach", "Hallandale Beach", "Lighthouse Point", "North Lauderdale",
  "Parkland", "Pembroke Park", "Sea Ranch Lakes", "Southwest Ranches",
  "Wilton Manors", "Lauderdale Lakes", "Lauderdale-by-the-Sea", "Oakland Park"
].sort();

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [progressMessage, setProgressMessage] = useState("");
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? "" : "Please enter a valid email address");
    return isValid;
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Phone is optional
    // Allow international numbers, limit to 20 characters
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,20}$/;
    const isValid = phoneRegex.test(phone) && phone.length <= 20;
    setPhoneError(isValid ? "" : "Please enter a valid phone number (max 20 characters)");
    return isValid;
  };

  const handleNeighborhoodChange = (city: string, checked: boolean) => {
    if (checked) {
      setSelectedNeighborhoods(prev => [...prev, city]);
    } else {
      setSelectedNeighborhoods(prev => prev.filter(c => c !== city));
    }
  };

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

        // Validate email and phone
        const email = getStr("email");
        const phone = getStr("phone");
        
        if (!validateEmail(email)) {
          setStatus("error");
          setProgressMessage("Please enter a valid email address");
          return;
        }
        
        if (!validatePhone(phone)) {
          setStatus("error");
          setProgressMessage("Please enter a valid phone number");
          return;
        }

        const payload = {
          email,
          name: getStr("name"),
          phone,
          neighborhoods: selectedNeighborhoods.join(", "),
          message: getStr("notes"),
          type: "contact",
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
            <div>
              <input 
                required 
                name="name" 
                placeholder="Name" 
                className="rounded-lg border border-divider bg-surface p-4 text-lg text-ink placeholder:text-ink-lighter focus:border-champagne focus:outline-none transition-colors w-full" 
              />
            </div>
            
            <div>
              <input 
                required 
                type="email" 
                name="email" 
                placeholder="Email" 
                className={`rounded-lg border bg-surface p-4 text-lg text-ink placeholder:text-ink-lighter focus:outline-none transition-colors w-full ${
                  emailError ? 'border-danger focus:border-danger' : 'border-divider focus:border-champagne'
                }`}
                onChange={(e) => validateEmail(e.target.value)}
              />
              {emailError && <p className="mt-1 text-sm text-danger">{emailError}</p>}
            </div>
            
            <div>
              <input 
                name="phone" 
                placeholder="Phone (optional)" 
                maxLength={20}
                className={`rounded-lg border bg-surface p-4 text-lg text-ink placeholder:text-ink-lighter focus:outline-none transition-colors w-full ${
                  phoneError ? 'border-danger focus:border-danger' : 'border-divider focus:border-champagne'
                }`}
                onChange={(e) => validatePhone(e.target.value)}
              />
              {phoneError && <p className="mt-1 text-sm text-danger">{phoneError}</p>}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-ink mb-2">
                Areas of Interest (select all that apply)
              </label>
              <div className="max-h-48 overflow-y-auto border border-divider rounded-lg p-4 bg-surface">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {FLORIDA_CITIES.map((city) => (
                    <label key={city} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedNeighborhoods.includes(city)}
                        onChange={(e) => handleNeighborhoodChange(city, e.target.checked)}
                        className="rounded border-divider text-champagne focus:ring-champagne focus:ring-2"
                      />
                      <span className="text-ink">{city}</span>
                    </label>
                  ))}
                </div>
              </div>
              {selectedNeighborhoods.length > 0 && (
                <p className="mt-2 text-sm text-ink-soft">
                  Selected: {selectedNeighborhoods.join(", ")}
                </p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <textarea 
                name="notes" 
                placeholder="Timing, budget, must-haves…" 
                className="h-32 rounded-lg border border-divider bg-surface p-4 text-lg text-ink placeholder:text-ink-lighter focus:border-champagne focus:outline-none transition-colors w-full" 
              />
            </div>
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