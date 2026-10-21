"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cities, site, whatsappLink } from "@/lib/site";
import Icon, { WhatsAppGlyph } from "./Icon";

// tel: derivado do número internacional já existente em site.ts
const telHref = `tel:+${site.whatsapp}`;

// Mapa + endereço/horários/contatos + cidades atendidas (também reforça o SEO local).
export function ContactInfo({ theme = "light" }: { theme?: "light" | "dark" }) {
  const dark = theme === "dark";
  const [mapOn, setMapOn] = useState(false);
  const muted = dark ? "text-white/70" : "text-black/65";
  const card = dark ? "bg-white/5 ring-1 ring-white/10" : "bg-white ring-1 ring-black/5 shadow-sm";
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
      <div className="grid gap-4">
        <div className={`ct-card rounded-2xl p-6 ${card}`}>
          <Icon name="pin" className="size-6" />
          <p className="mt-4 font-semibold">Endereço</p>
          <p className={`mt-1 ${muted}`}>{site.address.full}</p>
          <a href={site.address.mapsUrl} target="_blank" rel="noopener" className="touch-link mt-2 gap-1 text-sm font-semibold underline-offset-4 hover:underline">
            Abrir no Google Maps <Icon name="arrow" className="size-4" />
          </a>
        </div>
        <div className={`ct-card rounded-2xl p-6 ${card}`}>
          <Icon name="clock" className="size-6" />
          <p className="mt-4 font-semibold">Horário de atendimento</p>
          <ul className={`mt-1 space-y-0.5 ${muted}`}>
            {site.hours.map((h) => (
              <li key={h.days}>
                {h.days}: <strong className={dark ? "text-white" : "text-black"}>{h.time}</strong>
              </li>
            ))}
          </ul>
          <p className={`mt-1 text-sm ${muted}`}>{site.hoursNote}</p>
        </div>
        <div className={`ct-card rounded-2xl p-6 ${card}`}>
          <div className="flex flex-col text-sm">
            <div className="flex flex-wrap items-center gap-x-5">
              <a href={whatsappLink()} target="_blank" rel="noopener" className="touch-link gap-3 font-semibold">
                <WhatsAppGlyph className="size-5 text-[#25D366]" /> {site.phone}
              </a>
              <a href={telHref} className="touch-link gap-2 font-semibold underline-offset-4 hover:underline">
                <Icon name="phone" className="size-5" /> Ligar
              </a>
            </div>
            <a href={`mailto:${site.email}`} className="touch-link gap-3"><Icon name="mail" className="size-5" /> {site.email}</a>
            <a href={site.instagram.url} target="_blank" rel="noopener" className="touch-link gap-3"><Icon name="instagram" className="size-5" /> {site.instagram.handle}</a>
          </div>
        </div>
      </div>
      <div className={`ct-card relative min-h-[280px] overflow-hidden rounded-2xl sm:min-h-[360px] ${card}`}>
        {mapOn ? (
          <iframe
            title="Mapa da Art Colchões em Brusque/SC"
            src={site.address.embed}
            className={`absolute inset-0 size-full border-0 ${dark ? "[filter:invert(0.9)_hue-rotate(180deg)_saturate(0.6)]" : "grayscale-[0.3]"}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <Icon name="pin" className="size-10" />
            <p className="font-semibold">{site.address.full}</p>
            <button
              type="button"
              onClick={() => setMapOn(true)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#2f6bff] px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Ver mapa
            </button>
            <a href={site.address.mapsUrl} target="_blank" rel="noopener" className="touch-link text-sm font-semibold underline underline-offset-4">
              Abrir no Google Maps
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export function CityList({ theme = "light" }: { theme?: "light" | "dark" }) {
  const dark = theme === "dark";
  return (
    <ul className="flex flex-wrap gap-2">
      {cities.map((c) => (
        <li key={c} className={`city-chip rounded-full px-4 py-2 text-sm ${dark ? "bg-white/5 ring-1 ring-white/10" : "bg-white ring-1 ring-black/10"}`}>
          {c}
        </li>
      ))}
    </ul>
  );
}

export function Footer({ theme = "dark", links }: { theme?: "light" | "dark"; links?: { href: string; label: string }[] }) {
  const dark = theme === "dark";
  const muted = dark ? "text-white/70" : "text-black/65";
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; rotation: number; shape: number }[]>([]);
  const confettiId = useRef(0);
  const confettiTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (confettiTimeout.current) clearTimeout(confettiTimeout.current);
  }, []);

  const burstConfetti = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setConfetti(Array.from({ length: 24 }, (_, shape) => ({
      id: confettiId.current++,
      x: Math.round((Math.random() - 0.5) * 140),
      y: Math.round(-50 - Math.random() * 70),
      rotation: Math.round((Math.random() - 0.5) * 720),
      shape,
    })));
    if (confettiTimeout.current) clearTimeout(confettiTimeout.current);
    confettiTimeout.current = setTimeout(() => setConfetti([]), 900);
  };

  return (
    <footer className={`${dark ? "bg-[#060b19] text-white" : "bg-cream text-navy"} px-5 pt-12 pb-24 sm:px-8 sm:pt-16`}>
      <div className={`mx-auto grid max-w-7xl gap-8 sm:gap-10 ${links ? "sm:grid-cols-2 md:grid-cols-4" : "md:grid-cols-3"}`}>
        <div className={links ? "sm:col-span-2 md:col-span-1" : ""}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dark ? "/img/logo-light.png" : "/img/logo-dark.png"} alt="Art Colchões" className="mx-auto h-12 w-auto" loading="lazy" />
          <p className={`mt-5 max-w-sm text-center text-sm leading-relaxed ${muted}`}>
            Loja direto de fábrica de colchões, bases, cabeceiras e cama & banho em Brusque/SC. O maior showroom da região.
          </p>
          <div className="mt-4 flex justify-around" aria-label="Redes sociais e localização">
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Art Colchões" className={`grid size-11 place-items-center rounded-full ring-1 transition ${dark ? "ring-white/20 hover:bg-white/10" : "ring-black/15 hover:bg-black/5"}`}>
              <Icon name="instagram" className="size-5" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61552794909918&ref=PROFILE_EDIT_xav_ig_profile_page_web" target="_blank" rel="noopener noreferrer" aria-label="Facebook da Art Colchões" className={`grid size-11 place-items-center rounded-full ring-1 transition ${dark ? "ring-white/20 hover:bg-white/10" : "ring-black/15 hover:bg-black/5"}`}>
              <Icon name="facebook" className="size-5" />
            </a>
            <a href="https://maps.app.goo.gl/cNv48PMvbLV6Wtcw7" target="_blank" rel="noopener noreferrer" aria-label="Localização da Art Colchões no Google Maps" className={`grid size-11 place-items-center rounded-full ring-1 transition ${dark ? "ring-white/20 hover:bg-white/10" : "ring-black/15 hover:bg-black/5"}`}>
              <Icon name="pin" className="size-5" />
            </a>
            <a href="https://api.whatsapp.com/send/?phone=5547999007120&text&type=phone_number&app_absent=0&utm_source=ig" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da Art Colchões" className={`grid size-11 place-items-center rounded-full ring-1 transition ${dark ? "ring-white/20 hover:bg-white/10" : "ring-black/15 hover:bg-black/5"}`}>
              <WhatsAppGlyph className="size-5" />
            </a>
          </div>
        </div>
        {links && (
          <nav className="text-sm" aria-label="Rodapé">
            <p className="font-semibold">Navegue</p>
            <ul className={`mt-2 ${muted}`}>
              {links.map((l) => (
                <li key={l.href}><a href={l.href} className="touch-link hover:underline">{l.label}</a></li>
              ))}
            </ul>
          </nav>
        )}
        <div className="text-sm">
          <p className="font-semibold">Fale com a gente</p>
          <ul className={`mt-2 ${muted}`}>
            <li><a href={whatsappLink()} target="_blank" rel="noopener" className="touch-link break-words hover:underline">WhatsApp: {site.phone}</a></li>
            <li><a href={telHref} className="touch-link gap-2 hover:underline"><Icon name="phone" className="size-4" /> Ligar</a></li>
            <li><a href={`mailto:${site.email}`} className="touch-link break-all hover:underline">{site.email}</a></li>
            <li><a href={site.instagram.url} target="_blank" rel="noopener" className="touch-link break-all hover:underline">{site.instagram.handle}</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Visite</p>
          <p className={`mt-3 ${muted}`}>{site.address.full}</p>
          <p className={`mt-2 ${muted}`}>Seg a sex 9h às 18h<br />Sáb 9h às 13h</p>
        </div>
      </div>
      <div className={`mx-auto mt-14 flex max-w-7xl flex-wrap justify-between gap-4 border-t pt-6 text-xs ${dark ? "border-white/10" : "border-black/10"} ${muted} max-sm:flex-col max-sm:items-center max-sm:text-center`}>
        <p>© {new Date().getFullYear()} Art Colchões · Brusque/SC</p>
        <a href="https://evecompany.com.br" target="_blank" rel="noopener noreferrer" aria-label="Desenvolvido por Eve" className="inline-flex items-center gap-1.5 transition hover:text-white">
          <span>Desenvolvido por</span>
          <span className="relative inline-flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/eve.svg" alt="" onClick={burstConfetti} className="h-4 w-auto" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible">
              {confetti.map((particle) => (
                <span
                  key={particle.id}
                  className={`eve-confetti ${particle.shape % 3 === 0 ? "rounded-full" : "rounded-[1px]"}`}
                  style={{
                    "--confetti-x": `${particle.x}px`,
                    "--confetti-y": `${particle.y}px`,
                    "--confetti-rotation": `${particle.rotation}deg`,
                    left: "50%",
                    top: "50%",
                    animationDelay: `${particle.shape * 8}ms`,
                  } as CSSProperties}
                />
              ))}
            </span>
          </span>
        </a>
      </div>
    </footer>
  );
}
