// src/app/page.tsx
import Hero from "./components/Hero";
import About from "./components/About";
// FIX APPLIED: Importing Testimonials component, and both Review and RawReview types
import Testimonials, { type Review, type RawReview } from "./components/Testimonials"; 
import ContactForm from "./components/ContactForm";

import SocialProof from "./components/SocialProof";
import MarketHighlights from "./components/MarketHighlights";
import ProcessSteps from "./components/ProcessSteps";
import NeighborhoodGrid from "./components/NeighborhoodGrid";
import GuideDownload from "./components/GuideDownload";

import { HERO } from "./content/hero";
import { ABOUT } from "./content/about";
import { TESTIMONIALS } from "./content/testimonials";
import { NEIGHBORHOODS } from "./content/neighborhoods";
import { PROCESS_STEPS } from "./content/process";
import { MARKET_SEP_2025 } from "./content/market";

// REMOVED: The local RawReview definition is now imported from Testimonials.tsx

export default function HomePage() {
  // FIX APPLIED: Using the imported RawReview type instead of 'any'
  const normalizedTestimonials: Review[] = (Array.isArray(TESTIMONIALS) ? TESTIMONIALS : [])
  .map((t: RawReview) => ({
    quote: t.quote ?? t.q,
    author: t.author ?? t.a,
  }))
  .filter((t) => t.quote && t.author) as Review[]; // Final assertion to satisfy strict types
  
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <Hero
        title={HERO.title}
        subtitle={HERO.subtitle}
        bullets={HERO.bullets}
        imageSrc={HERO.imageSrc}
        compassUrl={HERO.compassUrl}
        phone={HERO.phone}
        phoneLabel={HERO.phoneLabel}
      />

      {/* Trust strip */}
      <SocialProof />

      {/* Featured areas (image tiles) */}
      <NeighborhoodGrid items={NEIGHBORHOODS} />

      {/* Process (StoryBrand-style 3 steps) */}
      <ProcessSteps steps={PROCESS_STEPS} />

      {/* Market snapshot */}
      <MarketHighlights
        items={MARKET_SEP_2025?.cards ?? []}
        source={MARKET_SEP_2025?.source}
      />

      {/* About + Testimonials */}
      <About intro={ABOUT.intro} bullets={ABOUT.bullets} />
      <Testimonials items={normalizedTestimonials} /> 

      {/* Lead magnet (email capture → /api/contact) */}
      <GuideDownload />

      {/* Contact */}
      <ContactForm />
    </main>
  );
}