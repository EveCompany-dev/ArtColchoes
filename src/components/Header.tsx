"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { site, whatsappLink } from "@/lib/site";
import Icon, { WhatsAppGlyph } from "./Icon";

export type NavItem = { href: string; label: string };

const telHref = `tel:+${site.whatsapp}`;

export const nav: NavItem[] = [
  { href: "#tecnologia", label: "Tecnologia" },
  { href: "#produtos", label: "Produtos" },
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
  const [menuVisible, setMenuVisible] = useState(false);
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
  const toggle = () => {
    if (open) {
      setOpen(false);
      return;
    }
    setMenuVisible(true);
    setOpen(true);
  };

  const tone = scrolled
    ? barTone === "dark"
      ? "light"
      : "dark"
    : heroTone;
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
          className={`mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:h-20 sm:px-8 ${text}`}
        >
          <a
            href={homeHref}
            className="hd-item relative z-10 col-start-2 row-start-1 inline-flex min-h-11 items-center justify-self-center lg:col-start-1 lg:justify-self-start"
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
            className="col-start-2 row-start-1 hidden items-center gap-8 lg:flex"
            aria-label="Principal"
          >
            {items.map((n) => {
              const active = isActive(n.href, pathname);
              return (
              <a
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className="hd-item group relative inline-flex min-h-11 items-center text-sm font-medium"
              >
                {n.label}
                <span className={`absolute bottom-2 left-0 h-px w-full bg-current transition-transform duration-300 ${active ? "scale-x-100" : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"}`} />
              </a>
              );
            })}
          </nav>

          <div className="col-start-3 row-start-1 flex items-center gap-3 justify-self-end">
            <span className="hd-item hidden sm:block">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                style={{ background: accent }}
              >
                <WhatsAppGlyph className="size-4" /> {site.phone}
              </a>
            </span>
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
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
        onTransitionEnd={(event) => {
          if (event.propertyName === "clip-path" && !open) setMenuVisible(false);
        }}
        style={{ clipPath: open ? "circle(150% at 100% 0%)" : "circle(0% at 100% 0%)" }}
        className={`mm-panel fixed inset-0 z-30 bg-navy px-6 pt-28 pb-10 text-white transition-[clip-path] duration-[800ms] ease-in-out lg:hidden ${menuVisible ? "" : "pointer-events-none invisible"}`}
      >
        <nav className="flex flex-col gap-2" aria-label="Menu mobile">
          {items.map((n, index) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(n.href, pathname) ? "page" : undefined}
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(60px)",
                transitionDelay: `${open ? 250 + index * 60 : (items.length - index - 1) * 60}ms`,
              }}
              className="mm-link font-display border-b border-white/10 py-4 text-2xl transition-[opacity,transform] duration-[600ms] ease-out aria-[current=page]:text-glow"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div
          className="mm-link mt-10 space-y-3 text-sm text-white/75 transition-[opacity,transform] duration-[600ms] ease-out"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(60px)",
            transitionDelay: `${open ? 250 + items.length * 60 : 0}ms`,
          }}
        >
          <a href={telHref} className="touch-link gap-2 font-semibold text-white">
            <Icon name="phone" className="size-4" /> Ligar: {site.phone}
          </a>
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
