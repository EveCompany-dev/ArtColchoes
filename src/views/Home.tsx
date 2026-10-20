"use client";

import Hero from "./Hero";
import { About, Ambientes, BrandMarquee, ContactSection, Differentials } from "./Sections";
import { Shell } from "./ui";

export default function Home() {
  return (
    <Shell>
      <Hero />
      <BrandMarquee />
      <Differentials />
      <Ambientes />
      <About />
      <ContactSection />
    </Shell>
  );
}
