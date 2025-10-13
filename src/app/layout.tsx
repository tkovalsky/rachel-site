import type { Metadata } from "next";
import "./globals.css";

// If you kept the alias:
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// If you went relative instead, use:
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Delray & Boca Real Estate | Rachel Kovalsky",
  description: "Consultative real estate guidance for Delray Beach, Boca Raton, and nearby coastal towns.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{color:"#0f172a", background:"#fff"}}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}