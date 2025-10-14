import Hero from "./components/Hero";
import AreasGrid from "./components/AreasGrid";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";

import { HERO } from "./content/hero";
import { AREAS } from "./content/areas";
import { ABOUT } from "./content/about";
import { TESTIMONIALS } from "./content/testimonials";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero
        title={HERO.title}
        subtitle={HERO.subtitle}
        bullets={HERO.bullets}
        imageSrc={HERO.imageSrc}
        compassUrl={HERO.compassUrl}
      />
      <AreasGrid areas={AREAS} />
      <About intro={ABOUT.intro} bullets={ABOUT.bullets} />
      <Testimonials items={TESTIMONIALS} />
      <ContactForm />
    </main>
  );
}