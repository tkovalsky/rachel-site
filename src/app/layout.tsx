// src/app/layout.tsx
import "./globals.css";

import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Delray & Boca Real Estate | Rachel Kovalsky",
  description:
    "Consultative guidance for Delray Beach, Boca Raton, and nearby coastal towns.",
};

// Load fonts first and expose as CSS variables
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-playfair" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Apply font vars. Color/text styles are now handled in globals.css */}
      <body className={`${inter.variable} ${playfair.variable}`}>
        {/* Skip link for a11y */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white text-black px-3 py-2 rounded shadow"
        >
          Skip to main content
        </a>

        <Navbar />
        <main id="main" role="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}