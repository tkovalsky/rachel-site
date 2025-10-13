export default function Footer() {
  return (
    <footer style={{borderTop:"1px solid #e2e8f0", marginTop:48}}>
      <div style={{maxWidth:1200, margin:"0 auto", padding:"24px 16px", color:"#475569", fontSize:14}}>
        © {new Date().getFullYear()} Rachel Kovalsky. Licensed Realtor® in Florida. Independent site (Compass-affiliated agent).
      </div>
    </footer>
  );
}