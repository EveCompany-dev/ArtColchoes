"use client";

import { useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useScrollAnim } from "@/components/Smooth";
import Icon, { WhatsAppGlyph } from "@/components/Icon";
import Img from "@/components/Img";
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

function createStars(count: number, seed: number) {
  let value = seed;
  const random = () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: `${seed}-${i}`,
    x: random() * 100,
    y: 52 + random() * 47,
    size: 1 + random() * 1.4,
    opacity: 0.45 + random() * 0.55,
  }));
}

const starLayers = [
  { className: "hero-stars-back", stars: createStars(45, 17), mobileCount: 8 },
  { className: "hero-stars-mid", stars: createStars(55, 43), mobileCount: 10 },
  { className: "hero-stars-front", stars: createStars(70, 89), mobileCount: 12 },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useScrollAnim(() => {
    const split = SplitText.create(".h1-line", { type: "chars", mask: "chars" });
    gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .from(".hero-glow", { scale: 0.4, opacity: 0, duration: 2.2 }, 0)
      .from(split.chars, { yPercent: 110, duration: 1.3, stagger: 0.025 }, 0.1)
      .from(".hero-meta > *", { y: 20, opacity: 0, stagger: 0.08, duration: 0.9 }, 0.7);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".hero-track").forEach((track, i) => {
        const start = [0, -17, -34][i % 3];
        gsap.fromTo(
          track,
          { yPercent: start },
          { yPercent: start - 50, duration: 42 + ((i * 11) % 19), delay: i * 1.3, ease: "none", repeat: -1 },
        );
      });
      gsap.from(".hero-col", { yPercent: 12, opacity: 0, stagger: 0.12, duration: 1.8, delay: 0.2 });
      gsap.to(".hero-cols", {
        y: 80,
        scale: 1.08,
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    });

    gsap
      .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } })
      .to(".hero-copy", { y: -120, opacity: 0 }, 0)
      .to(".hero-stars-back", { yPercent: -10 }, 0)
      .to(".hero-stars-mid", { yPercent: -22 }, 0)
      .to(".hero-stars-front", { yPercent: -36 }, 0)
      .to(".hero-glow", { scale: 1.5, opacity: 0.3 }, 0);

    return () => {
      split.revert();
      mm.revert();
    };
  }, root);

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-start overflow-hidden bg-night pt-24 pb-16 lg:items-center">
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute top-1/2 left-[70%] z-0 size-[75vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.32),rgba(47,107,255,0.07)_42%,transparent_66%)]" />
      <div
        aria-hidden="true"
        className="hero-cols absolute inset-x-0 bottom-0 top-auto z-[3] hidden h-[30svh] w-full gap-3 px-3 opacity-80 sm:gap-4 lg:inset-y-0 lg:right-0 lg:left-auto lg:flex lg:h-auto lg:w-[44%] lg:px-0 lg:pr-8 lg:opacity-100 xl:w-[42%]"
        style={{ maskImage: "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)" }}
      >
        {columns.map((col, i) => (
          <div key={i} className={`hero-col flex-1 overflow-hidden ${i === 2 ? "hidden xl:block" : ""}`}>
            <div className="hero-track flex flex-col gap-3 sm:gap-4">
              {[...col, ...col].map(([src, alt], k) => (
                // lazy (padrão do Img): as colunas ficam ocultas abaixo de 1024px e não devem baixar no celular
                <Img key={k} name={src} alt={alt} sizes="(min-width:1280px) 14vw, 22vw" className="aspect-[3/4] w-full rounded-2xl object-cover ring-1 ring-white/10" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-night to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-night to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-night/30 via-night/65 to-night/85 lg:bg-gradient-to-r lg:from-night lg:via-night/60 lg:via-45% lg:to-transparent lg:to-60%" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        {starLayers.map(({ className, stars, mobileCount }) => (
          <div key={className} className={`hero-stars ${className} absolute inset-0`}>
            {stars.map((star, index) => (
              <span
                key={star.id}
                className={`hero-star absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)] ${index >= mobileCount ? "hero-star-desktop-only" : ""}`}
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="hero-copy relative z-[4] mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex min-h-[calc(100svh-10rem)] flex-col lg:min-h-0 lg:max-w-[52%]">
          <div className="hero-meta">
            <p className="mx-auto mb-5 flex w-fit items-center justify-center gap-2 text-center text-xs font-semibold tracking-[0.16em] text-white/75 uppercase sm:mb-8 sm:inline-flex sm:rounded-full sm:bg-white/5 sm:px-4 sm:py-2 sm:tracking-widest sm:ring-1 sm:ring-white/10 sm:backdrop-blur lg:mx-0 lg:justify-start lg:text-left">
              <Icon name="factory" className="size-4 text-glow" /> Loja direto de fábrica · Brusque/SC
            </p>
          </div>
          <h1 className="font-display text-center text-[8.8vw] leading-[1.08] tracking-tight whitespace-nowrap uppercase sm:text-[8.4vw] sm:leading-[0.98] lg:text-left lg:text-[min(4.7vw,4.6rem)]">
            <span className="h1-line block">O maior</span>
            <span className="h1-line block text-sky">showroom</span>
            <span className="sr-only"> de colchões </span>
            <span className="h1-line block">da região</span>
          </h1>
          <div className="hero-meta mt-5 flex flex-1 flex-col sm:mt-8 lg:flex-none">
            <p className="mx-auto max-w-lg text-center text-base leading-relaxed text-white/85 sm:text-lg sm:text-white/65 lg:mx-0 lg:text-left">
              Mais de 25 colchões expostos para você deitar, testar e comparar. Pikolin, Mannes, Herval e D&apos;Angelis, com entrega e montagem grátis em Brusque e região.
            </p>
            <div className="mt-auto flex w-full justify-center gap-3 pt-8 lg:mt-8 lg:w-auto lg:justify-start lg:pt-0">
              <a href={whatsappLink()} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-sky px-6 py-3.5 font-semibold text-white transition hover:bg-white hover:text-night sm:bg-transparent sm:ring-1 sm:ring-white/20 sm:backdrop-blur sm:hover:bg-white/10 sm:hover:text-white">
                <WhatsAppGlyph className="size-5" /> Falar com consultor
              </a>
            </div>
            <div className="mt-8 hidden flex-wrap gap-x-6 gap-y-2 text-sm text-white/70 sm:flex lg:mt-8">
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
