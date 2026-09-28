"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { site, whatsappLink } from "@/lib/site";
import Icon, { WhatsAppGlyph } from "./Icon";

export type NavItem = { href: string; label: string };

export const nav: NavItem[] = [
  { href: "#showroom", label: "Showroom" },
  { href: "#tecnologia", label: "Tecnologia" },
  { href: "#produtos", label: "Produtos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

type Props = {
  /** cor do texto sobre o hero (antes de rolar) */
  heroTone?: "light" | "dark";
  /** fundo depois de rolar */
  barTone?: "light" | "dark";
  accent?: string;
  items?: NavItem[];
  homeHref?: string;
};

function isActive(href: string, pathname: string) {
  if (href.includes("#")) return false;
  const norm = (v: string) => (v.endsWith("/") ? v : `${v}/`);
  return norm(href) === norm(pathname);
}

export default function Header({
  heroTone = "dark",
  barTone = "light",
  accent = "#0b1630",
  items = nav,
  homeHref = "#",
}: Props) {
  const pathname = usePathname() ?? "";
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(
    () => {
      gsap.from(".hd-item", {
        y: -30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });

      // esconde ao descer, mostra ao subir
      const show = gsap
        .from(bar.current, {
          yPercent: -110,
          paused: true,
          duration: 0.35,
          ease: "power2.out",
        })
        .progress(1);
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          setScrolled(self.scroll() > 80);
          if (self.scroll() < 200) return show.play();
          if (self.direction === 1) show.reverse();
          else show.play();
        },
      });
    },
    { scope: root },
  );

  const { contextSafe } = useGSAP({ scope: root });
  const toggle = contextSafe(() => {
    const next = !open;
    setOpen(next);
    if (next) {
      gsap.fromTo(
        ".mm-panel",
        { clipPath: "circle(0% at 100% 0%)" },
        {
          clipPath: "circle(150% at 100% 0%)",
          duration: 0.8,
          ease: "power3.inOut",
        },
      );
      gsap.fromTo(
        ".mm-link",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          delay: 0.25,
          duration: 0.6,
          ease: "power3.out",
        },
      );
    }
  });

  const tone = scrolled ? barTone : heroTone;
  const text = tone === "dark" && !open ? "text-navy" : "text-white";
  const barBg = open
    ? "bg-transparent"
    : scrolled
      ? barTone === "light"
        ? "bg-white/80 shadow-sm backdrop-blur-xl"
        : "bg-[#070d1f]/75 backdrop-blur-xl"
      : "bg-transparent";

  return (
    <div ref={root}>
      <header
        ref={bar}
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${barBg}`}
      >
        <div
          className={`mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8 ${text}`}
        >
          <a
            href={homeHref}
            className="hd-item relative z-10"
            aria-label="Art Colchões - início"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                tone === "dark" && !open
                  ? "/img/logo-dark.png"
                  : "/img/logo-light.png"
              }
              alt="Art Colchões"
              className="h-9 w-auto sm:h-11"
            />
          </a>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Principal"
          >
            {items.map((n) => {
              const active = isActive(n.href, pathname);
              return (
              <a
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className="hd-item group relative text-sm font-medium"
              >
                {n.label}
                <span className={`absolute -bottom-1 left-0 h-px w-full bg-current transition-transform duration-300 ${active ? "scale-x-100" : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"}`} />
              </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hd-item hidden sm:block">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                style={{ background: accent }}
              >
                <WhatsAppGlyph className="size-4" /> {site.phone}
              </a>
            </span>
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-label="Menu"
              className={`hd-item relative z-10 grid size-11 place-items-center rounded-full lg:hidden ${open ? "text-white" : ""}`}
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 h-0.5 w-6 bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-6 bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mm-panel fixed inset-0 z-30 bg-navy px-6 pt-28 pb-10 text-white lg:hidden ${open ? "" : "pointer-events-none invisible"}`}
      >
        <nav className="flex flex-col gap-2" aria-label="Menu mobile">
          {items.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(n.href, pathname) ? "page" : undefined}
              className="mm-link font-display border-b border-white/10 py-4 text-2xl aria-[current=page]:text-glow"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="mm-link mt-10 space-y-3 text-sm text-white/70">
          <p className="flex items-center gap-2">
            <Icon name="pin" className="size-4" /> {site.address.full}
          </p>
          <p className="flex items-center gap-2">
            <Icon name="clock" className="size-4" /> Seg a sex 9h às 18h · Sáb
            9h às 13h
          </p>
        </div>
      </div>
    </div>
  );
}
