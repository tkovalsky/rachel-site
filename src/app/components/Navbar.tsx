"use client";
import Link from "next/link";
import { useState } from "react";
import MegaMenu from "./MegaMenu";

export default function Navbar() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur border-b border-divider">
        <div className="section h-14 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-semibold text-deep tracking-tight">
            Rachel Kovalsky
          </Link>
          <nav className="text-base text-ink-soft flex gap-8">
            <button 
              onClick={() => setIsMegaMenuOpen(true)}
              className="hover:text-ink transition-colors font-medium"
            >
              Explore
            </button>
            <a href="#areas" className="hover:text-ink transition-colors font-medium scroll-smooth">Areas</a>
            <a href="#about" className="hover:text-ink transition-colors font-medium scroll-smooth">About</a>
            <a href="#testimonials" className="hover:text-ink transition-colors font-medium scroll-smooth">Reviews</a>
            <a href="#contact" className="hover:text-ink transition-colors font-medium scroll-smooth">
              Contact
            </a>
          </nav>
        </div>
      </header>
      
      <MegaMenu 
        isOpen={isMegaMenuOpen} 
        onClose={() => setIsMegaMenuOpen(false)} 
      />
    </>
  );
}