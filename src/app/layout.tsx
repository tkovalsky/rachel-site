import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "HomeWatch | Palm Beach & Broward",
  description: "Weekly, Monthly, and One-Time home-watch services with photo-verified visits.",
  openGraph: {
    title: "HomeWatch | Palm Beach & Broward",
    description: "Trusted home-watch for snowbirds & seasonal owners.",
    images: ["/og-cover.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight">HomeWatch Co.</Link>
            <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-300">
              <Link href="#services" className="hover:text-white">Services</Link>
              <Link href="#coverage" className="hover:text-white">Coverage</Link>
              <Link href="#pricing" className="hover:text-white">Pricing</Link>
              <Link href="#contact" className="hover:text-white font-semibold">Contact</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4">{children}</main>
        <footer className="mt-16 border-t">
          <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500">
            © {new Date().getFullYear()} HomeWatch Co. • Palm Beach & Broward • Licensed & Insured
          </div>
        </footer>
      </body>
    </html>
  );
}