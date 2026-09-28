"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollAnim } from "@/components/Smooth";
import { techHighlights } from "@/lib/products";
import { BLUE, Kicker, useTitleReveal } from "./ui";

function PocketArt() {
  return (
    <svg viewBox="0 0 220 140" className="w-full" aria-hidden="true">
      {Array.from({ length: 5 }, (_, k) => {
        const x = 22 + k * 44;
        const d = `M${x} 128 ` + Array.from({ length: 8 }, (_, j) => `C${x + 16} ${122 - j * 14} ${x + 16} ${114 - j * 14} ${x} ${114 - j * 14} C${x - 16} ${114 - j * 14} ${x - 16} ${106 - j * 14} ${x} ${106 - j * 14}`).join(" ");
        return <path key={k} className="draw" d={d} fill="none" stroke={k === 2 ? BLUE : "#9db8ff"} strokeWidth="2" strokeLinecap="round" />;
      })}
    </svg>
  );
}

function ZArt() {
  const d = "M10 120 " + Array.from({ length: 9 }, (_, j) => `L${20 + j * 22} ${j % 2 ? 120 : 20}`).join(" ") + " L210 120";
  return (
    <svg viewBox="0 0 220 140" className="w-full" aria-hidden="true">
      <path className="draw" d={d} fill="none" stroke="#9db8ff" strokeWidth="2" strokeLinejoin="round" />
      <path className="draw" d={d.replace(/ 20/g, " 30").replace(/ 120/g, " 110")} fill="none" stroke={BLUE} strokeWidth="2" strokeLinejoin="round" opacity="0.7" />
      <path className="draw" d="M10 128 H210 M10 12 H210" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="2" />
    </svg>
  );
}

export function TechHighlights() {
  const root = useRef<HTMLElement>(null);
  useTitleReveal(root);
  useScrollAnim(() => {
    gsap.utils.toArray<HTMLElement>(".th-card").forEach((card) => {
      gsap
        .timeline({ scrollTrigger: { trigger: card, start: "top 80%" } })
        .from(card, { y: 60, opacity: 0, duration: 0.9, ease: "power3.out" })
        .from(card.querySelectorAll(".draw"), { drawSVG: "0%", duration: 1.8, stagger: 0.12, ease: "power2.inOut" }, 0.2)
        .from(card.querySelectorAll(".th-in"), { y: 20, opacity: 0, stagger: 0.08, duration: 0.6 }, 0.6);
    });
  }, root);

  const [cross, norma, copper] = techHighlights;
  return (
    <section id="tecnologias" ref={root} className="bg-night px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Kicker>Destaque Pikolin · Líder do descanso na Europa</Kicker>
        <h2 className="reveal-title font-display mt-5 max-w-4xl text-3xl leading-tight sm:text-5xl">O maior suporte do mercado, em duas tecnologias exclusivas.</h2>
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {[
            { t: cross, art: <PocketArt /> },
            { t: norma, art: <ZArt /> },
          ].map(({ t, art }) => (
            <article key={t.name} className="th-card rounded-[2rem] bg-white/[0.04] p-8 ring-1 ring-white/10 sm:p-10">
              <div className="rounded-2xl bg-night-2 p-6">{art}</div>
              <p className="th-in mt-8 text-xs font-semibold tracking-widest text-white/40 uppercase">{t.kicker}</p>
              <div className="th-in mt-2 flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl sm:text-3xl">{t.name}</h3>
                <p className="font-display text-3xl text-sky">
                  {t.metric} <span className="font-sans text-sm text-white/50">{t.metricLabel}</span>
                </p>
              </div>
              <p className="th-in mt-4 leading-relaxed text-white/60">{t.text}</p>
            </article>
          ))}
        </div>
        <div className="th-card mt-5 flex flex-col items-start gap-6 rounded-[2rem] bg-gradient-to-r from-[#b8622f]/25 to-transparent p-8 ring-1 ring-[#e0894f]/25 sm:flex-row sm:items-center sm:p-10">
          <span className="th-in font-display grid size-20 shrink-0 place-items-center rounded-2xl bg-[#c4703a] text-2xl">Cu</span>
          <div className="th-in">
            <p className="text-xs font-semibold tracking-widest text-white/40 uppercase">{copper.kicker}</p>
            <h3 className="font-display mt-2 text-2xl">{copper.name}</h3>
            <p className="mt-2 max-w-2xl text-white/65">{copper.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
