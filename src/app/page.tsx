import Hero from "./components/Hero";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";

// New sections
import SocialProof from "./components/SocialProof";
import MarketHighlights from "./components/MarketHighlights";
import ProcessSteps from "./components/ProcessSteps";
import NeighborhoodGrid from "./components/NeighborhoodGrid";
import GuideDownload from "./components/GuideDownload";

// Content
import { HERO } from "./content/hero";
import { ABOUT } from "./content/about";
import { TESTIMONIALS } from "./content/testimonials";
import { NEIGHBORHOODS } from "./content/neighborhoods";
import { PROCESS_STEPS } from "./content/process";
import { HIGHLIGHTS, REPORT_URL } from "./content/highlights";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <Hero
        title={HERO.title}
        subtitle={HERO.subtitle}
        bullets={HERO.bullets}
        imageSrc={HERO.imageSrc}
        compassUrl={HERO.compassUrl}
        phone="+15612878966"
        phoneLabel="(561) 287-8966"
      />
      {/* Trust strip */}
      <SocialProof />

      {/* Featured areas (image tiles) */}
      <NeighborhoodGrid items={NEIGHBORHOODS} />

      {/* Process (StoryBrand-style 3 steps) */}
      <ProcessSteps steps={PROCESS_STEPS} />

      {/* Market snapshot */}
      <MarketHighlights items={HIGHLIGHTS} ctaHref={REPORT_URL} />

      {/* About + Testimonials */}
      <About intro={ABOUT.intro} bullets={ABOUT.bullets} />
      <Testimonials items={TESTIMONIALS} />

      {/* Lead magnet (email capture → /api/contact) */}
      <GuideDownload />

      {/* Contact */}
      <ContactForm />
    </main>
  );
}