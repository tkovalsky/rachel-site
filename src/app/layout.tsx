export const dynamic = "force-static";

import "./globals.css";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Atlantic Home Watch | Palm Beach & Broward",
  description:
    "Trusted home-watch for snowbirds & seasonal owners. Photo-verified visits. Licensed & insured. Compass-affiliated.",
  openGraph: {
    title: "Atlantic Home Watch",
    description:
      "Trusted home-watch for snowbirds & seasonal owners. Photo-verified visits.",
    images: ["/og-cover.jpg"],
  },
  metadataBase: new URL("https://www.atlantichomewatch.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-slate-100">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-10 space-y-20">{children}</main>
        <footer className="mt-20 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-400 space-y-2">
            <div>© {new Date().getFullYear()} Atlantic Home Watch.</div>
            <div>
              A DBA of <strong>Real Estate Rachel Kovalsky LLC</strong>. Licensed Florida Real Estate Sales Associate. Compass-affiliated.
            </div>
            <div className="text-slate-500">
              Serving Palm Beach & Broward Counties.{" "}
              <a href="/terms" className="underline decoration-white/20 hover:decoration-white">Terms</a>{" "}
              •{" "}
              <a href="/privacy" className="underline decoration-white/20 hover:decoration-white">Privacy</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}