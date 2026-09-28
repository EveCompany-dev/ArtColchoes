"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import Smooth, { useScrollAnim } from "@/components/Smooth";
import Header, { type NavItem } from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Footer } from "@/components/Contact";
import Icon, { WhatsAppGlyph } from "@/components/Icon";
import { whatsappLink } from "@/lib/site";

export const BLUE = "#2f6bff";
export const BASE = "/v1";

export const routes = {
  home: `${BASE}/`,
  showroom: `${BASE}/#showroom`,
  produtos: `${BASE}/produtos/`,
  tecnologia: `${BASE}/tecnologia/`,
  sobre: `${BASE}/#sobre`,
  duvidas: `${BASE}/duvidas/`,
  contato: `${BASE}/#contato`,
};

export const v1Nav: NavItem[] = [
  { href: routes.showroom, label: "Showroom" },
  { href: routes.produtos, label: "Produtos" },
  { href: routes.tecnologia, label: "Tecnologia" },
  { href: routes.sobre, label: "Sobre" },
  { href: routes.duvidas, label: "Dúvidas" },
  { href: routes.contato, label: "Contato" },
];

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-night text-white">
      <Header heroTone="light" barTone="dark" accent={BLUE} items={v1Nav} homeHref={routes.home} />
      <Smooth>
        <main>{children}</main>
        <Footer theme="dark" links={[{ href: routes.home, label: "Início" }, ...v1Nav]} />
      </Smooth>
      <WhatsAppFloat />
    </div>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold tracking-[0.3em] text-glow uppercase">{children}</p>;
}

export function useTitleReveal(scope: React.RefObject<HTMLElement | null>) {
  useScrollAnim(() => {
    const splits = gsap.utils.toArray<HTMLElement>(".reveal-title").map((el) => {
      const s = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-mask" });
      gsap.from(s.lines, { yPercent: 105, duration: 1.1, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      return s;
    });
    return () => splits.forEach((s) => s.revert());
  }, scope);
}

export function PageIntro({ kicker, title, text, crumb }: { kicker: string; title: string; text: string; crumb: string }) {
  const root = useRef<HTMLElement>(null);
  useScrollAnim(() => {
    const split = SplitText.create(".pi-title", { type: "lines", mask: "lines", linesClass: "split-mask" });
    gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .from(".pi-glow", { scale: 0.5, opacity: 0, duration: 2 }, 0)
      .from(".pi-in", { y: 24, opacity: 0, stagger: 0.08, duration: 0.9 }, 0.1)
      .from(split.lines, { yPercent: 105, duration: 1.2, stagger: 0.1 }, 0.2);
    return () => split.revert();
  }, root);

  return (
    <section ref={root} className="relative overflow-hidden bg-night px-5 pt-32 pb-16 sm:px-8 sm:pt-44 sm:pb-24">
      <div aria-hidden="true" className="pi-glow pointer-events-none absolute -top-1/3 right-[-10%] size-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.28),rgba(47,107,255,0.06)_45%,transparent_68%)]" />
      <div className="relative mx-auto max-w-7xl">
        <nav aria-label="Você está em" className="pi-in text-sm text-white/45">
          <a href={routes.home} className="hover:text-white">Início</a>
          <span className="mx-2">/</span>
          <span className="text-white/80">{crumb}</span>
        </nav>
        <div className="pi-in mt-10">
          <Kicker>{kicker}</Kicker>
        </div>
        <h1 className="pi-title font-display mt-5 max-w-4xl text-4xl leading-[1.08] sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="pi-in mt-8 max-w-2xl text-lg leading-relaxed text-white/60">{text}</p>
      </div>
    </section>
  );
}

export function CtaBand({ title, text, message, secondary }: { title: string; text: string; message?: string; secondary?: { href: string; label: string } }) {
  const root = useRef<HTMLElement>(null);
  useTitleReveal(root);
  return (
    <section ref={root} className="bg-night px-5 py-24 sm:px-8 sm:py-32">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-night-3 to-night-2 p-8 ring-1 ring-white/10 sm:p-14">
        <span aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-sky/20 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <h2 className="reveal-title font-display text-3xl leading-tight sm:text-5xl">{title}</h2>
            <p className="mt-5 max-w-xl text-lg text-white/60">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a href={whatsappLink(message)} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-sky px-6 py-3.5 font-semibold transition hover:bg-white hover:text-night">
              <WhatsAppGlyph className="size-5" /> Falar com consultor
            </a>
            {secondary && (
              <a href={secondary.href} className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold ring-1 ring-white/20 transition hover:bg-white/10">
                {secondary.label} <Icon name="arrow" className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
