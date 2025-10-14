import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Delray & Boca Real Estate | Rachel Kovalsky",
  description: "Consultative guidance for Delray Beach, Boca Raton, and nearby coastal towns.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Skip link for keyboard users */}
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white text-black px-3 py-2 rounded shadow">
          Skip to main content
        </a>

        <Navbar />
        <main id="main" role="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}