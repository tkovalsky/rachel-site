import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur border-b border-divider">
      <div className="section h-14 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl font-semibold text-deep tracking-tight">
          Rachel Kovalsky
        </Link>
        <nav className="text-base text-ink-soft flex gap-8">
          <a href="#areas" className="hover:text-ink transition-colors font-medium scroll-smooth">Areas</a>
          <a href="#about" className="hover:text-ink transition-colors font-medium scroll-smooth">About</a>
          <a href="#testimonials" className="hover:text-ink transition-colors font-medium scroll-smooth">Reviews</a>
          <a href="#contact" className="hover:text-ink transition-colors font-medium scroll-smooth">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}