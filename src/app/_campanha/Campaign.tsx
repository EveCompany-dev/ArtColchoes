"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { campaign } from "@/lib/campaign";
import { products } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import { ProductCard } from "@/components/ProductGrid";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Footer } from "@/components/Contact";
import Icon, { WhatsAppGlyph } from "@/components/Icon";

const startsAt = new Date(campaign.startsAt).getTime();
const endsAt = new Date(campaign.endsAt).getTime();

type Phase = "antes" | "durante" | "depois";

// Relógio só no cliente (export estático): null até hidratar.
function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function phaseAt(now: number | null): Phase {
  if (now === null || now < startsAt) return "antes";
  return now < endsAt ? "durante" : "depois";
}

function remaining(target: number, now: number) {
  const ms = Math.max(0, target - now);
  return {
    dias: Math.floor(ms / 864e5),
    horas: Math.floor((ms / 36e5) % 24),
    min: Math.floor((ms / 6e4) % 60),
    seg: Math.floor((ms / 1e3) % 60),
  };
}

function Countdown({ now, phase }: { now: number | null; phase: Phase }) {
  if (phase === "depois") {
    return (
      <div>
        <p className="font-display text-2xl text-[#e0894f]">A campanha {campaign.name} terminou.</p>
        <p className="mt-2 text-white/65">As condições direto de fábrica continuam no showroom.</p>
      </div>
    );
  }
  // durante a campanha, conta até o fim
  const t = now === null ? null : remaining(phase === "durante" ? endsAt : startsAt, now);
  const cells: [string, number | undefined][] = [
    ["dias", t?.dias],
    ["horas", t?.horas],
    ["min", t?.min],
    ["seg", t?.seg],
  ];
  return (
    <div>
      {phase === "durante" && <p className="font-display mb-4 text-2xl text-[#e0894f]">A campanha começou. Corre pro showroom!</p>}
      <div className="flex gap-3 sm:gap-4" role="timer" aria-live="off">
        {cells.map(([label, v]) => (
          <div key={label} className="cd-cell w-20 rounded-2xl bg-white/5 py-4 text-center ring-1 ring-white/10 sm:w-24">
            <span key={v} className="font-display block animate-[fadeUp_.35s_ease-out] text-3xl tabular-nums sm:text-4xl">
              {v === undefined ? "--" : String(v).padStart(2, "0")}
            </span>
            <span className="mt-1 block text-xs tracking-widest text-white/65 uppercase">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Texto dos CTAs muda conforme a fase da campanha
const cta: Record<Phase, { header: string; main: string; msg: string }> = {
  antes: {
    header: "Quero ser avisado",
    main: "Receber as ofertas no WhatsApp",
    msg: `Olá! Quero ser avisado(a) das condições da ${campaign.title}.`,
  },
  durante: {
    header: "Quero as ofertas",
    main: "Ver as ofertas no WhatsApp",
    msg: `Olá! Quero saber as condições da ${campaign.title}.`,
  },
  depois: {
    header: "Falar com consultor",
    main: "Consultar condições no WhatsApp",
    msg: "Olá! Vim pela página da campanha e gostaria de saber as condições atuais.",
  },
};

export default function Campaign() {
  const root = useRef<HTMLDivElement>(null);
  const featured = campaign.featured.map((s) => products.find((p) => p.slug === s)!).filter(Boolean);

  useGSAP(
    () => {
      const split = SplitText.create(".cp-big", { type: "chars" });
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(split.chars, { yPercent: 120, rotate: (i) => (i % 2 ? 10 : -10), opacity: 0, stagger: 0.08, duration: 1.4 })
        .from(".cp-in", { y: 30, opacity: 0, stagger: 0.08, duration: 0.9 }, 0.5)
        .from(".cd-cell", { y: 40, opacity: 0, stagger: 0.06, duration: 0.8 }, 0.7);
      gsap.to(".cp-orb", { x: "random(-60, 60)", y: "random(-40, 40)", duration: 6, ease: "sine.inOut", repeat: -1, repeatRefresh: true, yoyo: true });
      gsap.from(".cp-card", { y: 80, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".cp-grid", start: "top 85%" } });
      return () => split.revert();
    },
    { scope: root },
  );

  const now = useNow();
  const phase = phaseAt(now);
  const { header, main, msg } = cta[phase];

  return (
    <div ref={root} className="min-h-dvh bg-[#0b1630] text-white">
      <header className="absolute inset-x-0 top-0 z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" aria-label="Art Colchões - início">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo-light.png" alt="Art Colchões" className="h-10 w-auto" />
        </Link>
        <a href={whatsappLink(msg)} target="_blank" rel="noopener" className="rounded-full bg-[#c4703a] px-5 py-2.5 text-sm font-semibold">
          {header}
        </a>
      </header>

      <section className="relative overflow-hidden px-5 pt-36 pb-24 sm:px-8 sm:pt-44">
        <span className="cp-orb pointer-events-none absolute -top-20 right-[-10%] size-[50vmax] rounded-full bg-[#c4703a]/25 blur-3xl" />
        <span className="cp-orb pointer-events-none absolute bottom-[-30%] left-[-10%] size-[40vmax] rounded-full bg-[#2f6bff]/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <p className="cp-in text-xs font-semibold tracking-[0.3em] text-[#e0894f] uppercase">Campanha · {new Date(campaign.startsAt).toLocaleDateString("pt-BR")}</p>
          <h1 className="mt-4">
            <span className="cp-big font-display block text-[21vw] leading-[0.9] whitespace-nowrap sm:text-[20vw]">{campaign.name}</span>
            <span className="cp-in font-display mt-4 block text-2xl sm:text-4xl">{campaign.title}</span>
          </h1>
          <p className="cp-in mt-5 max-w-xl text-lg text-white/65">{campaign.subtitle}</p>
          <div className="mt-10">
            <Countdown now={now} phase={phase} />
          </div>
          <ul className="cp-in mt-10 flex flex-wrap gap-2">
            {campaign.perks.map((p) => (
              <li key={p} className="rounded-full bg-white/5 px-4 py-2 text-sm ring-1 ring-white/10">{p}</li>
            ))}
          </ul>
          <a href={whatsappLink(msg)} target="_blank" rel="noopener" className="cp-in mt-10 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-4 font-semibold transition hover:brightness-110">
            <WhatsAppGlyph className="size-5" /> {main}
          </a>
        </div>
      </section>

      <section className="bg-[#f5f2ec] px-5 py-24 text-[#0b1630] sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#c4703a] uppercase">Destaques da campanha</p>
          <h2 className="font-display mt-4 text-3xl sm:text-5xl">Os mais procurados do showroom.</h2>
          <div className="cp-grid mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <div key={p.slug} className="cp-card">
                <ProductCard p={p} accent="#c4703a" />
              </div>
            ))}
          </div>
          <p className="mt-10 flex items-center gap-2 text-sm text-black/65">
            <Icon name="pin" className="size-4" /> {site.address.full} · Seg a sex 9h às 18h · Sáb 9h às 13h
          </p>
        </div>
      </section>

      <Footer theme="dark" />
      <WhatsAppFloat />
    </div>
  );
}
