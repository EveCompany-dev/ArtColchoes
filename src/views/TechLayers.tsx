"use client";

import { useRef, useState } from "react";
import { gsap, ScrollSmoother, ScrollTrigger } from "@/lib/gsap";
import { useScrollAnim } from "@/components/Smooth";
import { WhatsAppGlyph } from "@/components/Icon";
import IsoMattress from "@/components/IsoMattress";
import { cureLayers as layers } from "@/lib/products";
import { whatsappLink } from "@/lib/site";
import { BLUE } from "./ui";

const GAP = 34;
const n = layers.length;

// Desktop usa scroll para explorar as camadas; mobile usa controles explícitos.
export default function TechLayers() {
  const root = useRef<HTMLElement>(null);
  const jumpToLayer = useRef<(index: number) => void>(() => {});
  const mobileExpanded = useRef(false);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const startMobileExploration = () => {
    setActiveLayer(0);
    if (mobileExpanded.current) return;

    const scope = root.current;
    if (!scope) return;

    const mobileLayers = Array.from(scope.querySelectorAll<SVGGElement>(".tech-mobile .iso-layer"))
      .sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index));
    if (mobileLayers.length !== n) return;

    mobileExpanded.current = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animate = reducedMotion ? gsap.set : gsap.to;
    animate(mobileLayers, {
      y: (i) => -(n - 1 - i) * GAP,
      duration: reducedMotion ? 0 : 1,
      ease: "power2.inOut",
      stagger: reducedMotion ? 0 : { each: 0.03, from: "end" },
    });
  };

  const skip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.nativeEvent.stopPropagation();
    const st = ScrollTrigger.getAll().find((t) => t.trigger === root.current && t.pin);
    if (!st) return document.getElementById("tecnologias")?.scrollIntoView({ behavior: "smooth" });
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(st.end, true);
    else window.scrollTo({ top: st.end, behavior: "smooth" });
  };

  useScrollAnim(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const scope = root.current;
      if (!scope) return;

      const els = Array.from(scope.querySelectorAll<SVGGElement>(".tech-desktop .iso-layer"))
        .sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index));
      const cards = Array.from(scope.querySelectorAll<HTMLElement>(".tech-desktop .tx-card"));
      const items = Array.from(scope.querySelectorAll<HTMLElement>(".tx-item"));
      const badges = Array.from(scope.querySelectorAll<SVGGElement>(".tech-desktop .iso-badge"));
      const bars = Array.from(scope.querySelectorAll<HTMLElement>(".tx-bar"));

      gsap.set(badges, { opacity: 0 });
      gsap.set(cards.slice(1), { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: `+=${(n + 2) * 16}%`,
          scrub: 0.5,
          pin: true,
        },
      });

      tl.addLabel("start")
        .to(els, { y: (i) => -(n - 1 - i) * GAP, duration: 1, stagger: { each: 0.02, from: "end" } })
        .to(badges, { opacity: 1, duration: 0.4 }, "-=0.4");

      layers.forEach((_, k) => {
        const t = 1.2 + k;
        tl.addLabel(`layer-${k}`, t + 0.5)
          .to(els, {
            opacity: (i) => (i === k ? 1 : 0.42),
            x: (i) => (i === k ? 26 : 0),
            duration: 0.5,
          }, t)
          .to(cards[k], { autoAlpha: 0, y: -18, duration: 0.3 }, t)
          .fromTo(cards[k + 1], { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.3 }, t + 0.2)
          .to(items, { opacity: (i) => (i === k ? 1 : 0.35), duration: 0.3 }, t)
          .to(bars, { scaleX: (k + 1) / n, duration: 0.5 }, t);
      });

      const end = 1.2 + n;
      tl.to(els, { y: 0, x: 0, opacity: 1, duration: 1 }, end)
        .to(badges, { opacity: 0, duration: 0.3 }, end)
        .to(cards[n], { autoAlpha: 0, y: -18, duration: 0.3 }, end)
        .fromTo(cards[n + 1], { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.4 }, end + 0.3)
        .to(items, { opacity: 1, duration: 0.3 }, end)
        .addLabel("end");

      jumpToLayer.current = (index) => {
        const trigger = tl.scrollTrigger;
        if (trigger) trigger.scroll(trigger.labelToScroll(`layer-${index}`));
      };

      return () => {
        jumpToLayer.current = () => {};
      };
    });

    return () => media.revert();
  }, root);

  return (
    <section id="camadas" ref={root} className="relative bg-gradient-to-br from-night via-night-2 to-night-3 text-white lg:h-[100svh] lg:overflow-hidden motion-reduce:h-auto motion-reduce:overflow-visible">
      <div className="mx-auto grid max-w-7xl grid-rows-[auto_auto_auto] gap-2 px-5 pt-20 pb-14 motion-reduce:pb-16 sm:px-8 lg:h-full lg:grid-cols-[1.25fr_1fr] lg:grid-rows-1 lg:items-center lg:gap-10 lg:pt-24">
        <div className="order-first lg:hidden">
          <p className="text-xs font-semibold tracking-[0.3em] text-glow uppercase">Tecnologia Pikolin</p>
          <h2 className="font-display mt-1 text-xl">Por dentro de um colchão</h2>
        </div>

        <div className="tech-mobile relative h-[50svh] min-h-[320px] max-h-[440px] lg:hidden">
          <IsoMattress layers={layers} explodeRoom={GAP * (n - 1)} activeLayer={activeLayer} centerHorizontally className="absolute inset-0 size-full drop-shadow-[0_40px_60px_rgba(47,107,255,0.22)]" title="Colchão Pikolin Cure em camadas" />
        </div>

        <div className="tech-desktop relative hidden min-h-0 lg:block lg:h-[74svh]">
          <IsoMattress layers={layers} explodeRoom={GAP * (n - 1)} badges badgeColor={BLUE} className="absolute inset-0 size-full drop-shadow-[0_40px_60px_rgba(47,107,255,0.22)]" title="Colchão Pikolin Cure em camadas" />
        </div>

        <div className="relative self-start lg:static">
          <div className="hidden lg:block">
            <p className="text-xs font-semibold tracking-[0.3em] text-glow uppercase">Tecnologia Pikolin · Copper System</p>
            <h2 className="font-display mt-3 text-4xl leading-tight">Por dentro de um colchão de verdade</h2>
          </div>

          <div className="relative mt-4 min-h-40 rounded-3xl border border-sky/50 bg-white/5 p-6 backdrop-blur lg:hidden">
            {activeLayer === null ? (
              <>
                <p className="text-xs tracking-widest text-white/65 uppercase">Pikolin Cure · 33 cm</p>
                <p className="font-display mt-2 text-xl sm:text-2xl">10 camadas, cada uma com uma função.</p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">Use os controles para explorar cada tecnologia que faz a diferença no seu sono.</p>
                <button
                  type="button"
                  onClick={startMobileExploration}
                  className="mx-auto mt-5 flex w-fit min-h-11 items-center justify-center rounded-full bg-sky px-5 text-sm font-semibold text-white transition hover:bg-white hover:text-night focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
                >
                  Conhecer as camadas
                </button>
              </>
            ) : (
              <>
                <p className="text-xs tracking-widest text-white/65 uppercase">
                  Camada {String(activeLayer + 1).padStart(2, "0")} / {n}
                </p>
                <p className="font-display mt-2 text-xl sm:text-2xl">{layers[activeLayer].name}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{layers[activeLayer].text}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveLayer(activeLayer === 0 ? null : activeLayer - 1)}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/30 px-4 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
                  >
                    Anterior
                  </button>
                  <span className="text-xs text-white/60">{activeLayer + 1} de {n}</span>
                  <button
                    type="button"
                    onClick={() => setActiveLayer(activeLayer === n - 1 ? null : activeLayer + 1)}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-sky px-4 text-sm font-semibold text-white transition hover:bg-white hover:text-night focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
                  >
                    {activeLayer === n - 1 ? "Voltar ao início" : "Próxima"}
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="tech-desktop relative mt-4 hidden min-h-[230px] rounded-3xl border border-sky/50 bg-white/5 p-6 backdrop-blur motion-reduce:min-h-0 motion-reduce:space-y-8 sm:min-h-[220px] lg:mt-8 lg:block lg:p-8">
            <div className="tx-card absolute inset-6 motion-reduce:static lg:inset-8">
              <p className="text-xs tracking-widest text-white/65 uppercase">Pikolin Cure · 33 cm</p>
              <p className="font-display mt-2 text-xl sm:text-2xl">10 camadas, cada uma com uma função.</p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">Role para desmontar o colchão e ver a tecnologia que faz a diferença no seu sono.</p>
            </div>
            {layers.map((l, i) => (
              <div key={l.name} className="tx-card absolute inset-6 motion-reduce:static lg:inset-8">
                <p className="text-xs tracking-widest text-white/65 uppercase">
                  Camada {String(i + 1).padStart(2, "0")} / {n}
                </p>
                <p className="font-display mt-2 text-xl sm:text-2xl">{l.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{l.text}</p>
              </div>
            ))}
            <div className="tx-card absolute inset-6 flex flex-col items-center justify-center gap-4 text-center motion-reduce:static lg:inset-8">
              <p className="text-xs tracking-widest text-white/65 uppercase">Venha sentir a diferença</p>
              <p className="font-display text-xl sm:text-2xl">Teste o Cure no showroom.</p>
              <a href={whatsappLink("Olá! Quero agendar uma visita para testar o Pikolin Cure.")} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-sky px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-night">
                <WhatsAppGlyph className="size-5 shrink-0" />
                Agendar visita
              </a>
            </div>
          </div>

          <div className="tech-desktop mt-4 hidden h-1 overflow-hidden rounded-full bg-white/10 lg:block motion-reduce:hidden">
            <div className="tx-bar h-full origin-left bg-sky" style={{ transform: "scaleX(0)" }} />
          </div>

          <ol className="mt-4 hidden grid-cols-2 gap-1 text-xs lg:mt-6 lg:grid lg:gap-x-6 lg:gap-y-1.5 lg:text-sm">
            {layers.map((l, i) => (
              <li key={l.name} className="tx-item">
                <button
                  type="button"
                  onClick={() => {
                    setActiveLayer(i);
                    jumpToLayer.current(i);
                  }}
                  aria-pressed={activeLayer === i}
                  className={`flex min-h-11 items-center gap-2.5 rounded-full px-2 py-1 text-left transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky ${activeLayer === i ? "text-white" : "text-white/70"}`}
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-sky text-xs font-bold text-white">{i + 1}</span>
                  {l.short}
                </button>
              </li>
            ))}
          </ol>
          <a href="#tecnologias" onClick={skip} className="mx-auto mt-4 hidden w-fit rounded-full border border-white/30 bg-night/70 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white hover:text-night lg:block motion-reduce:hidden">
            Pular explicação
          </a>
        </div>
      </div>
    </section>
  );
}
