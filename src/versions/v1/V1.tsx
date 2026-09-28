"use client";

import Hero from "./Hero";
import { About, Ambientes, BrandMarquee, ContactSection, Differentials, Explore } from "./Sections";
import { Shell } from "./ui";

export default function V1() {
  return (
    <Shell>
      <Hero />
      <BrandMarquee />
      <Differentials />
      <Ambientes />
      <Explore />
      <About />
      <ContactSection />
    </Shell>
  );
}
