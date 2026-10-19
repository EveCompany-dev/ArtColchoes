"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollAnim } from "@/components/Smooth";
import IsoMattress from "@/components/IsoMattress";
import { cureLayers as layers } from "@/lib/products";
import { whatsappLink } from "@/lib/site";
import { BLUE } from "./ui";

const GAP = 34;
const n = layers.length;

// Explicador "exploded view": a seção fica fixa enquanto o scroll separa o colchão
// e percorre as camadas, uma de cada vez, com o card de descrição ao lado.
export default function TechLayers() {
  const root = useRef<HTMLElement>(null);

  useScrollAnim(() => {
    const els = gsap.utils.toArray<SVGGElement>(".iso-layer").sort((a, b) => +a.dataset.index! - +b.dataset.index!);
    const cards = gsap.utils.toArray<HTMLElement>(".tx-card");
    const items = gsap.utils.toArray<HTMLElement>(".tx-item");

    gsap.set(".iso-badge", { opacity: 0 });
    gsap.set(cards.slice(1), { autoAlpha: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: `+=${(n + 2) * 32}%`,
        scrub: 0.8,
        pin: true,
      },
    });

    tl.addLabel("start")
      .to(els, { y: (i) => -(n - 1 - i) * GAP, duration: 1, stagger: { each: 0.02, from: "end" } })
      .to(".iso-badge", { opacity: 1, duration: 0.4 }, "-=0.4");

    layers.forEach((_, k) => {
      const t = 1.2 + k;
      tl.addLabel(`l${k}`, t + 0.5)
        .to(els, { opacity: (i) => (i === k ? 1 : 0.42), x: (i) => (i === k ? 26 : 0), duration: 0.5 }, t)
        .to(cards[k], { autoAlpha: 0, y: -18, duration: 0.3 }, t)
        .fromTo(cards[k + 1], { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.3 }, t + 0.2)
        .to(items, { opacity: (i) => (i === k ? 1 : 0.35), duration: 0.3 }, t)
        .to(".tx-bar", { scaleX: (k + 1) / n, duration: 0.5 }, t);
    });

    const end = 1.2 + n;
    tl.to(els, { y: 0, x: 0, opacity: 1, duration: 1 }, end)
      .to(".iso-badge", { opacity: 0, duration: 0.3 }, end)
      .to(cards[n], { autoAlpha: 0, y: -18, duration: 0.3 }, end)
      .fromTo(cards[n + 1], { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.4 }, end + 0.3)
      .to(items, { opacity: 1, duration: 0.3 }, end)
      .addLabel("end");
  }, root);

  return (
    <section id="camadas" ref={root} className="relative h-[100svh] overflow-hidden bg-gradient-to-br from-night via-night-2 to-night-3 text-white">
      <div className="mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr_auto] gap-2 px-5 pt-20 pb-6 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:grid-rows-1 lg:items-center lg:gap-10 lg:pt-24">
        <div className="lg:hidden">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-glow uppercase">Tecnologia Pikolin</p>
          <h2 className="font-display mt-1 text-xl">Por dentro de um colchão</h2>
        </div>

        <div className="relative min-h-0 lg:h-[74svh]">
          <IsoMattress layers={layers} explodeRoom={GAP * (n - 1)} badges badgeColor={BLUE} className="absolute inset-0 size-full drop-shadow-[0_40px_60px_rgba(47,107,255,0.22)]" title="Colchão Pikolin Cure em camadas" />
        </div>

        <div className="relative">
          <div className="hidden lg:block">
            <p className="text-xs font-semibold tracking-[0.3em] text-glow uppercase">Tecnologia Pikolin · Copper System</p>
            <h2 className="font-display mt-3 text-4xl leading-tight">Por dentro de um colchão de verdade</h2>
          </div>

          <div className="relative mt-4 min-h-[230px] rounded-3xl border border-sky/50 bg-white/5 p-6 backdrop-blur sm:min-h-[220px] lg:mt-8 lg:p-8">
            <div className="tx-card absolute inset-6 lg:inset-8">
              <p className="text-xs tracking-widest text-white/45 uppercase">Pikolin Cure · 33 cm</p>
              <p className="font-display mt-2 text-xl sm:text-2xl">10 camadas, cada uma com uma função.</p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">Role para desmontar o colchão e ver a tecnologia que faz a diferença no seu sono.</p>
            </div>
            {layers.map((l, i) => (
              <div key={l.name} className="tx-card absolute inset-6 lg:inset-8">
                <p className="text-xs tracking-widest text-white/45 uppercase">
                  Camada {String(i + 1).padStart(2, "0")} / {n}
                </p>
                <p className="font-display mt-2 text-xl sm:text-2xl">{l.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{l.text}</p>
              </div>
            ))}
            <div className="tx-card absolute inset-6 lg:inset-8">
              <p className="text-xs tracking-widest text-white/45 uppercase">Venha sentir a diferença</p>
              <p className="font-display mt-2 text-xl sm:text-2xl">Teste o Cure no showroom.</p>
              <a href={whatsappLink("Olá! Quero agendar uma visita para testar o Pikolin Cure.")} target="_blank" rel="noopener" className="mt-5 inline-flex rounded-full bg-sky px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-night">
                Agendar visita
              </a>
            </div>
          </div>

          <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
            <div className="tx-bar h-full origin-left bg-sky" style={{ transform: "scaleX(0)" }} />
          </div>

          <ol className="mt-6 hidden grid-cols-2 gap-x-6 gap-y-1.5 text-sm lg:grid">
            {layers.map((l, i) => (
              <li key={l.name} className="tx-item flex items-center gap-2.5">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-sky text-[10px] font-bold text-white">{i + 1}</span>
                {l.short}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
