"use client";
import { useState, useEffect, useRef } from "react";

// Rachel's core service areas
const SERVICE_AREAS = [
  "Boca Raton",
  "Boynton Beach", 
  "Deerfield Beach",
  "Delray Beach",
  "Greenacres",
  "Lake Worth",
  "Palm Beach Gardens",
  "Parkland",
  "Pompano Beach",
  "West Palm Beach",
  "Other areas"
];

export default function HomepageContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [progressMessage, setProgressMessage] = useState("");
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? "" : "Please enter a valid email address");
    return isValid;
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Phone is optional
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
          source: "homepage-contact-form",
          adSource: getStr("adSource") || "homepage-contact-form",
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
    <section id="contact" className="relative min-h-screen bg-gradient-to-br from-deep to-ink">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      
      <div className="relative z-10 section py-20">
        {/* Header */}
          <div className="text-center mb-16">
            <h2 className="h1 text-white mb-6">
              Let Rachel help you find your perfect home in South Florida
            </h2>
            <p className="lead text-gray-300 max-w-3xl mx-auto">
              Whether you're looking for a retirement community, vacation home, or family residence, Rachel's expertise makes the difference.
            </p>
          </div>

          {status === "ok" ? (
            // Success state
            <div className="text-center">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto mb-6 bg-success/20 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="h2 text-white mb-4">Thanks for sharing those details!</h3>
                <p className="body-large text-gray-300">
                  I will be in touch with you soon to discuss your real estate needs.
                </p>
              </div>
              <p className="body text-gray-400">
                I'll review your information and get back to you within 24 hours.
              </p>
            </div>
          ) : (
            // Form state
            <div className="card p-8 md:p-12">
              <form onSubmit={onSubmit} className="space-y-8">
                
                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block body-large font-semibold text-ink mb-4">
                      Your Name *
                    </label>
                    <input 
                      id="name"
                      required 
                      name="name" 
                      placeholder="Enter your full name" 
                      className="w-full px-6 py-4 body border-2 border-divider rounded-xl focus:border-champagne focus:outline-none transition-colors bg-surface placeholder:text-ink-lighter" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block body-large font-semibold text-ink mb-4">
                      Email Address *
                    </label>
                    <input 
                      id="email"
                      required 
                      type="email" 
                      name="email" 
                      placeholder="your@email.com" 
                      className={`w-full px-6 py-4 body border-2 rounded-xl focus:outline-none transition-colors bg-surface placeholder:text-ink-lighter ${
                        emailError ? 'border-danger focus:border-danger' : 'border-divider focus:border-champagne'
                      }`}
                      onChange={(e) => validateEmail(e.target.value)}
                    />
                    {emailError && <p className="mt-2 text-danger body-small">{emailError}</p>}
                  </div>
                </div>
                
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block body-large font-semibold text-ink mb-4">
                    Phone Number
                  </label>
                  <input 
                    id="phone"
                    name="phone" 
                    placeholder="(555) 123-4567" 
                    maxLength={20}
                    className={`w-full px-6 py-4 body border-2 rounded-xl focus:outline-none transition-colors bg-surface placeholder:text-ink-lighter ${
                      phoneError ? 'border-danger focus:border-danger' : 'border-divider focus:border-champagne'
                    }`}
                    onChange={(e) => validatePhone(e.target.value)}
                  />
                  {phoneError && <p className="mt-2 text-danger body-small">{phoneError}</p>}
                </div>
                
                {/* Areas of Interest */}
                <div>
                  <label className="block body-large font-semibold text-ink mb-4">
                    Select the areas you're interested in
                  </label>
                  
                  {/* Multi-select Input */}
                  <div className="relative" ref={dropdownRef}>
                    <div 
                      className="w-full px-6 py-4 body border-2 border-divider rounded-xl focus-within:border-champagne focus:outline-none transition-colors bg-surface cursor-pointer min-h-[60px] flex flex-wrap items-center gap-2"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      {selectedNeighborhoods.length > 0 ? (
                        selectedNeighborhoods.map((area) => (
                          <span
                            key={area}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-champagne/10 text-champagne border border-champagne/20 rounded-lg text-sm font-medium"
                          >
                            {area}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNeighborhoodChange(area, false);
                              }}
                              className="text-champagne hover:text-champagne-dark ml-1"
                            >
                              ×
                            </button>
                          </span>
                        ))
                      ) : (
                        <span className="text-ink-lighter">Click to select areas...</span>
                      )}
                      <div className="ml-auto">
                        <svg 
                          className={`w-5 h-5 text-ink-lighter transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-2 bg-surface border-2 border-divider rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {SERVICE_AREAS.map((area) => (
                          <div
                            key={area}
                            className="flex items-center justify-between px-4 py-3 hover:bg-surface-subtle cursor-pointer"
                            onClick={() => handleNeighborhoodChange(area, !selectedNeighborhoods.includes(area))}
                          >
                            <span className={`body ${selectedNeighborhoods.includes(area) ? 'font-semibold text-ink' : 'text-ink-soft'}`}>
                              {area}
                            </span>
                            {selectedNeighborhoods.includes(area) && (
                              <svg className="w-5 h-5 text-champagne" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Message */}
                <div>
                  <label htmlFor="notes" className="block body-large font-semibold text-ink mb-4">
                    Tell Us About Your Move
                  </label>
                  <textarea 
                    id="notes"
                    name="notes" 
                    placeholder="Are you looking for a retirement community? Vacation home? Family residence? What areas interest you? Any specific requirements?" 
                    rows={6}
                    className="w-full px-6 py-4 body border-2 border-divider rounded-xl focus:border-champagne focus:outline-none transition-colors bg-surface placeholder:text-ink-lighter resize-none" 
                  />
                </div>
                
                {/* Honeypot */}
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                
                {/* Ad Source Tracking */}
                <input type="hidden" name="adSource" value="homepage-contact-form" />

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary inline-flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" && (
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                    )}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {status === "sending" ? "Sending your message..." : "Start Your Journey"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {status === "error" && (
            <div className="mt-8 text-center">
              <p className="body-large text-danger">
                {process.env.NODE_ENV === 'development' 
                  ? progressMessage || 'Sorry, something went wrong. Please try again.' 
                  : 'Sorry, something went wrong. Please try again.'}
              </p>
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 body-large text-gray-300">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Licensed Realtor®</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold">South Florida Expert</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">Compass Florida</span>
              </div>
            </div>
            
            <p className="mt-6 body text-gray-400">
              By submitting, you agree to our <a href="/privacy" className="text-champagne hover:underline font-semibold">Privacy Policy</a>.
            </p>
          </div>
      </div>
    </section>
  );
}
