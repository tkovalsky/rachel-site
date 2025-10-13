import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section style={{background:"#f8fafc"}}>
        <div style={{maxWidth:1200, margin:"0 auto", padding:"56px 16px", display:"grid", gap:40, gridTemplateColumns:"1fr 1fr", alignItems:"center"}}>
          <div>
            <h1 style={{fontSize:40, lineHeight:1.1, fontWeight:700, margin:"0 0 12px"}}>
              Delray & Boca Real Estate — <span>Consultative, No-Pressure.</span>
            </h1>
            <p style={{color:"#475569", fontSize:18, margin:"0 0 16px"}}>
              Helping professionals and retirees relocate or find their next home in Delray Beach, Boca Raton, and nearby coastal towns.
            </p>
            <div style={{display:"flex", gap:12, marginTop:16}}>
              <a href="#contact" style={{padding:"12px 16px", borderRadius:8, background:"#000", color:"#fff", textDecoration:"none"}}>Start your home search</a>
              <Link href="https://www.compass.com/agents/rachel-kovalsky/" style={{padding:"12px 16px", borderRadius:8, border:"1px solid #e2e8f0", textDecoration:"none"}}>View Compass profile</Link>
            </div>
            <ul style={{color:"#334155", fontSize:14, marginTop:16}}>
              <li>Specializing in Delray Beach, Boca Raton, Boynton Beach, Deerfield Beach, West Palm Beach</li>
              <li>Relocation & second-home expertise • Coastal & walkable neighborhoods</li>
              <li>Personalized guidance from search to close</li>
            </ul>
          </div>

          <div style={{justifySelf:"center"}}>
            {/* If you saved /public/rachel.jpg use that path; unoptimized avoids Next’s image pipeline */}
            <Image src="/rachel.jpeg" alt="Rachel Kovalsky" width={480} height={600} unoptimized style={{borderRadius:12, border:"1px solid #e2e8f0", objectFit:"cover"}} />
          </div>
        </div>
      </section>

      {/* …keep your Areas/About/Testimonials/Contact sections … */}
    </main>
  );
}