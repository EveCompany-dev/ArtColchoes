"use client";

import { useMemo, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { firmnessLabel, firmnessScale, products } from "@/lib/products";
import { whatsappLink } from "@/lib/site";
import { WhatsAppGlyph } from "./Icon";

// "Qual colchão combina com você?": pré-indicação por biotipo, respondendo
// a pergunta mais comum do briefing. A decisão final continua com o consultor.

const questions = [
  {
    id: "peso",
    label: "Seu peso",
    options: [
      { label: "Até 60 kg", v: 1 },
      { label: "60 a 90 kg", v: 2 },
      { label: "90 a 120 kg", v: 3 },
      { label: "Mais de 120 kg", v: 4 },
    ],
  },
  {
    id: "posicao",
    label: "Como você dorme",
    options: [
      { label: "De lado", v: -1 },
      { label: "De costas", v: 0 },
      { label: "De bruços", v: 1 },
      { label: "Varia", v: 0 },
    ],
  },
  {
    id: "pref",
    label: "Você prefere",
    options: [
      { label: "Abraçar o colchão", v: -1 },
      { label: "Equilíbrio", v: 0 },
      { label: "Sentir firmeza", v: 1 },
    ],
  },
] as const;

type Theme = "light" | "dark";

export default function FirmnessGuide({ theme = "light", accent = "#c4703a" }: { theme?: Theme; accent?: string }) {
  const [ans, setAns] = useState<Record<string, number>>({ peso: 1, posicao: 1, pref: 1 });
  const root = useRef<HTMLDivElement>(null);

  const idx = useMemo(() => {
    const score = questions.reduce((s, q) => s + q.options[ans[q.id]].v, 0);
    // a loja trabalha de "Macio" a "Firme", então limitamos a indicação a essa faixa
    return Math.max(1, Math.min(3, score));
  }, [ans]);
  const firm = firmnessScale[idx];
  const matches = useMemo(() => {
    const byDist = products.filter((p) => p.firmness).sort(
      (a, b) => Math.abs(firmnessScale.indexOf(a.firmness!) - idx) - Math.abs(firmnessScale.indexOf(b.firmness!) - idx),
    );
    return byDist.slice(0, 3);
  }, [idx]);

  useGSAP(
    () => {
      gsap.to(".fg-needle", { left: `${(idx / 4) * 100}%`, duration: 0.9, ease: "elastic.out(1, 0.6)" });
      gsap.fromTo(".fg-match", { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: "power3.out" });
    },
    { scope: root, dependencies: [idx] },
  );

  const dark = theme === "dark";
  const summary = questions.map((q) => `${q.label}: ${q.options[ans[q.id]].label}`).join(" | ");
  const msg = `Olá! Fiz o guia de firmeza no site. ${summary}. Indicação: ${firmnessLabel[firm]}. Pode me ajudar a escolher?`;

  return (
    <div ref={root} className={`grid gap-8 rounded-3xl p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] ${dark ? "bg-white/5 ring-1 ring-white/10" : "bg-white shadow-xl shadow-black/5 ring-1 ring-black/5"}`}>
      <div className="space-y-7">
        {questions.map((q) => (
          <fieldset key={q.id}>
            <legend className={`mb-3 text-xs font-semibold tracking-[0.2em] uppercase ${dark ? "text-white/70" : "text-black/65"}`}>{q.label}</legend>
            <div className="flex flex-wrap gap-2">
              {q.options.map((o, i) => {
                const on = ans[q.id] === i;
                return (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() => setAns((a) => ({ ...a, [q.id]: i }))}
                    aria-pressed={on}
                    className={`min-h-11 rounded-full px-5 py-2.5 text-sm transition ${
                      on
                        ? "text-white"
                        : dark
                                              ? "bg-white/5 text-white/80 hover:bg-white/10"
                                              : "bg-black/[0.04] text-black/75 hover:bg-black/[0.08]"
                    }`}
                    style={on ? { background: accent } : undefined}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="flex flex-col">
        <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${dark ? "text-white/70" : "text-black/65"}`}>Indicação de firmeza</p>
        <p className="font-display mt-2 text-3xl sm:text-4xl">{firmnessLabel[firm]}</p>
        <div className="relative mt-6 mb-2 h-2 rounded-full" style={{ background: `linear-gradient(90deg, #bfe3f0, #8fb2d6, #5b76a8, #2e3f6b, #0b1630)` }}>
          <span className="fg-needle absolute top-1/2 left-0 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white shadow-md" style={{ background: accent }} />
        </div>
        <div className={`flex justify-between         text-xs ${dark ? "text-white/70" : "text-black/65"}`}>
          <span>Mais macio</span>
          <span>Mais firme</span>
        </div>

        <p className={`mt-8 mb-3 text-xs font-semibold tracking-[0.2em] uppercase ${dark ? "text-white/70" : "text-black/65"}`}>Modelos para testar no showroom</p>
        <ul className="space-y-2">
          {matches.map((p) => (
            <li key={p.slug} className={`fg-match flex items-center justify-between rounded-xl px-4 py-3 ${dark ? "bg-white/5" : "bg-black/[0.03]"}`}>
              <span>
                <strong className="font-semibold">{p.brand} {p.name}</strong>
                <span className={`ml-2 text-sm ${dark ? "text-white/70" : "text-black/65"}`}>{p.line}</span>
              </span>
              <span className={`text-xs ${dark ? "text-white/70" : "text-black/65"}`}>{firmnessLabel[p.firmness!]}</span>
            </li>
          ))}
        </ul>

        <a
          href={whatsappLink(msg)}
          target="_blank"
          rel="noopener"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-white transition hover:brightness-110"
        >
          <WhatsAppGlyph className="size-5" /> Enviar para um consultor
        </a>
        <p className={`mt-3 text-xs ${dark ? "text-white/70" : "text-black/65"}`}>Pré-indicação. A escolha ideal é feita deitando no colchão, no nosso showroom.</p>
      </div>
    </div>
  );
}
