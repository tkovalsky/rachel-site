"use client";
import { useState } from "react";

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
    <section id="contact" className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Let Rachel help you find your perfect home in South Florida
            </h2>
            <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Whether you're looking for a retirement community, vacation home, or family residence, Rachel's expertise makes the difference.
            </p>
          </div>

          {status === "ok" ? (
            // Success state
            <div className="text-center">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-white mb-4">Thanks for sharing those details!</h3>
                <p className="text-2xl text-gray-300">
                  I will be in touch with you soon to discuss your real estate needs.
                </p>
              </div>
              <p className="text-xl text-gray-400">
                I'll review your information and get back to you within 24 hours.
              </p>
            </div>
          ) : (
            // Form state
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <form onSubmit={onSubmit} className="space-y-8">
                
                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xl font-bold text-gray-900 mb-4">
                      Your Name *
                    </label>
                    <input 
                      id="name"
                      required 
                      name="name" 
                      placeholder="Enter your full name" 
                      className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:outline-none transition-colors bg-white placeholder:text-gray-600" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-xl font-bold text-gray-900 mb-4">
                      Email Address *
                    </label>
                    <input 
                      id="email"
                      required 
                      type="email" 
                      name="email" 
                      placeholder="your@email.com" 
                      className={`w-full px-6 py-4 text-xl border-2 rounded-xl focus:outline-none transition-colors bg-white placeholder:text-gray-600 ${
                        emailError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-amber-500'
                      }`}
                      onChange={(e) => validateEmail(e.target.value)}
                    />
                    {emailError && <p className="mt-2 text-red-500 text-lg">{emailError}</p>}
                  </div>
                </div>
                
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xl font-bold text-gray-900 mb-4">
                    Phone Number
                  </label>
                  <input 
                    id="phone"
                    name="phone" 
                    placeholder="(555) 123-4567" 
                    maxLength={20}
                    className={`w-full px-6 py-4 text-xl border-2 rounded-xl focus:outline-none transition-colors bg-white placeholder:text-gray-600 ${
                      phoneError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-amber-500'
                    }`}
                    onChange={(e) => validatePhone(e.target.value)}
                  />
                  {phoneError && <p className="mt-2 text-red-500 text-lg">{phoneError}</p>}
                </div>
                
                {/* Areas of Interest */}
                <div>
                  <label className="block text-xl font-bold text-gray-900 mb-4">
                    Areas of Interest (select all that apply)
                  </label>
                  <div className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {SERVICE_AREAS.map((area) => (
                        <label key={area} className="flex items-center space-x-3 text-xl cursor-pointer hover:bg-white p-4 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedNeighborhoods.includes(area)}
                            onChange={(e) => handleNeighborhoodChange(area, e.target.checked)}
                            className="w-6 h-6 text-amber-500 border-2 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
                          />
                          <span className="text-gray-800 font-semibold">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {selectedNeighborhoods.length > 0 && (
                    <p className="mt-4 text-xl text-gray-700 font-semibold">
                      Selected: {selectedNeighborhoods.join(", ")}
                    </p>
                  )}
                </div>
                
                {/* Message */}
                <div>
                  <label htmlFor="notes" className="block text-xl font-bold text-gray-900 mb-4">
                    Tell Us About Your Move
                  </label>
                  <textarea 
                    id="notes"
                    name="notes" 
                    placeholder="Are you looking for a retirement community? Vacation home? Family residence? What areas interest you? Any specific requirements?" 
                    rows={6}
                    className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:outline-none transition-colors bg-white placeholder:text-gray-600 resize-none" 
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
                    className="inline-flex items-center gap-3 px-12 py-6 text-xl font-semibold text-white bg-gradient-to-r from-gray-800 to-amber-500 rounded-2xl hover:from-gray-700 hover:to-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
              <p className="text-xl text-red-400">
                {process.env.NODE_ENV === 'development' 
                  ? progressMessage || 'Sorry, something went wrong. Please try again.' 
                  : 'Sorry, something went wrong. Please try again.'}
              </p>
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 text-xl text-gray-300">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Licensed Realtor®</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold">South Florida Expert</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">Compass Florida</span>
              </div>
            </div>
            
            <p className="mt-6 text-xl text-gray-400">
              By submitting, you agree to our <a href="/privacy" className="text-amber-400 hover:underline font-semibold">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
