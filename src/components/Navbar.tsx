// src/components/Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
          <span>Atlantic Home Watch</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-300">
          <Link href="#services" className="hover:text-white">Services</Link>
          <Link href="#coverage" className="hover:text-white">Coverage</Link>
          <Link href="#pricing" className="hover:text-white">Pricing</Link>
          <Link href="#contact" className="hover:text-white font-semibold">Contact</Link>
        </nav>
        <button
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden inline-flex items-center rounded-lg border border-white/20 px-3 py-1.5 text-sm"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="sm:hidden mx-auto max-w-6xl px-4 pb-3">
          <div className="mt-2 grid gap-2 rounded-xl border border-white/10 bg-black/80 p-3 backdrop-blur">
            {[
              { href: "#services", label: "Services" },
              { href: "#coverage", label: "Coverage" },
              { href: "#pricing", label: "Pricing" },
              { href: "#contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block px-2 py-1.5 rounded hover:bg-white/5">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}