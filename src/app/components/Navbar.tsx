import Link from "next/link";

export default function Navbar() {
  return (
    <header style={{borderBottom:"1px solid #e2e8f0", position:"sticky", top:0, background:"#fff"}}>
      <div style={{maxWidth:1200, margin:"0 auto", padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <Link href="/" style={{fontWeight:600}}>Rachel Kovalsky</Link>
        <nav style={{display:"flex", gap:16, fontSize:14}}>
          <a href="#areas">Areas</a>
          <a href="#about">About</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact" style={{fontWeight:600}}>Contact</a>
        </nav>
      </div>
    </header>
  );
}