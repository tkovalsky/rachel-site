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
      <body className="text-slate-900 bg-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}