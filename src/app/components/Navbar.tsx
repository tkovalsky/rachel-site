import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">Rachel Kovalsky</Link>
        <nav className="text-sm text-slate-700 flex gap-4">
          <a href="#areas">Areas</a>
          <a href="#about">About</a>
          <a href="#testimonials">Reviews</a>
          <a href="#contact" className="font-semibold">Contact</a>
        </nav>
      </div>
    </header>
  );
}