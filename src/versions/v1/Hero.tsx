"use client";

import { useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useScrollAnim } from "@/components/Smooth";
import Icon, { WhatsAppGlyph } from "@/components/Icon";
import { photos, site, whatsappLink } from "@/lib/site";
import { routes } from "./ui";

const columns: [string, string][][] = [
  [
    [photos.showroomSm, "Colchões expostos no showroom"],
    [photos.blackSignatureSm, "Pikolin Black Signature"],
    [photos.ambienteBox, "Ambiente com base box e cabeceira"],
    [photos.camaBanho, "Espaço de cama & banho"],
  ],
  [
    [photos.cureSm, "Pikolin Cure com Copper System"],
    [photos.espacoHerval, "Espaço Herval"],
    [photos.baseBau, "Base baú"],
    [photos.denseSm, "Ambiente com cabeceira estofada"],
  ],
  [
    [photos.blackSignatureDetalhe, "Detalhe do Black Signature"],
    [photos.camaEstofada, "Cama estofada"],
    [photos.roupaDeCama, "Roupa de cama"],
    [photos.showroomSm, "Showroom da Art Colchões"],
  ],
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useScrollAnim(() => {
    const split = SplitText.create(".h1-line", { type: "chars", mask: "chars" });
    gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .from(".hero-glow", { scale: 0.4, opacity: 0, duration: 2.2 }, 0)
      .from(split.chars, { yPercent: 110, duration: 1.3, stagger: 0.025 }, 0.1)
      .from(".hero-col", { yPercent: 12, opacity: 0, stagger: 0.12, duration: 1.8 }, 0.2)
      .from(".hero-meta > *", { y: 20, opacity: 0, stagger: 0.08, duration: 0.9 }, 0.7);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".hero-track").forEach((track, i) => {
        const up = i % 2 === 0;
        gsap.fromTo(track, { yPercent: up ? 0 : -50 }, { yPercent: up ? -50 : 0, duration: 46 + i * 8, ease: "none", repeat: -1 });
      });
    });

    gsap
      .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } })
      .to(".hero-copy", { y: -120, opacity: 0 }, 0)
      .to(".hero-cols", { y: 80, scale: 1.08 }, 0)
      .to(".hero-glow", { scale: 1.5, opacity: 0.3 }, 0);

    return () => {
      split.revert();
      mm.revert();
    };
  }, root);

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden bg-night pt-24 pb-16">
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute top-1/2 left-[70%] size-[75vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.32),rgba(47,107,255,0.07)_42%,transparent_66%)]" />

      <div
        aria-hidden="true"
        className="hero-cols absolute inset-y-0 right-0 flex w-full gap-3 px-3 opacity-55 sm:gap-4 lg:w-[44%] lg:px-0 lg:pr-8 lg:opacity-100 xl:w-[42%]"
        style={{ maskImage: "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)" }}
      >
        {columns.map((col, i) => (
          <div key={i} className={`hero-col flex-1 overflow-hidden ${i === 2 ? "hidden xl:block" : ""} ${i === 1 ? "lg:mt-24" : ""}`}>
            <div className="hero-track flex flex-col gap-3 sm:gap-4">
              {[...col, ...col].map(([src, alt], k) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={k} src={src} alt={alt} loading={k < 2 ? "eager" : "lazy"} className="aspect-[3/4] w-full rounded-2xl object-cover ring-1 ring-white/10" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/40 via-night/75 to-night/95 lg:bg-gradient-to-r lg:from-night lg:via-night/70 lg:via-45% lg:to-transparent lg:to-60%" />

      <div className="hero-copy relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="lg:max-w-[52%]">
          <div className="hero-meta">
            <p className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-medium tracking-widest text-white/70 uppercase ring-1 ring-white/10 backdrop-blur">
              <Icon name="factory" className="size-4 text-glow" /> Loja direto de fábrica · Brusque/SC
            </p>
          </div>
          <h1 className="font-display text-[9.3vw] leading-[0.98] tracking-tight whitespace-nowrap uppercase sm:text-[8.4vw] lg:text-[min(4.7vw,4.6rem)]">
            <span className="h1-line block">O maior</span>
            <span className="h1-line block text-sky">showroom</span>
            <span className="sr-only"> de colchões </span>
            <span className="h1-line block">da região</span>
          </h1>
          <div className="hero-meta mt-8 space-y-8">
            <p className="max-w-lg text-lg leading-relaxed text-white/65">
              Mais de 25 colchões expostos para você deitar, testar e comparar. Pikolin, Mannes, Herval e D&apos;Angelis, com entrega e montagem grátis em Brusque e região.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#showroom" className="inline-flex items-center gap-2 rounded-full bg-sky px-6 py-3.5 font-semibold transition hover:bg-white hover:text-night">
                Conheça o showroom <Icon name="arrowDown" className="size-4" />
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold ring-1 ring-white/20 backdrop-blur transition hover:bg-white/10">
                <WhatsAppGlyph className="size-5" /> Falar com consultor
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50">
              <a href={routes.contato} className="flex items-center gap-2 hover:text-white">
                <Icon name="pin" className="size-4" /> {site.address.full}
              </a>
              <p className="flex items-center gap-2">
                <Icon name="clock" className="size-4" /> Seg a sex 9h às 18h · Sáb 9h às 13h
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
