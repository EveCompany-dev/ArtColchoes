import { cities, site, whatsappLink } from "@/lib/site";
import Icon, { WhatsAppGlyph } from "./Icon";

// Mapa + endereço/horários/contatos + cidades atendidas (também reforça o SEO local).
export function ContactInfo({ theme = "light" }: { theme?: "light" | "dark" }) {
  const dark = theme === "dark";
  const muted = dark ? "text-white/60" : "text-black/55";
  const card = dark ? "bg-white/5 ring-1 ring-white/10" : "bg-white ring-1 ring-black/5 shadow-sm";
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
      <div className="grid gap-4">
        <div className={`ct-card rounded-2xl p-6 ${card}`}>
          <Icon name="pin" className="size-6" />
          <p className="mt-4 font-semibold">Endereço</p>
          <p className={`mt-1 ${muted}`}>{site.address.full}</p>
          <a href={site.address.mapsUrl} target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline">
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
          <div className="flex flex-col gap-3 text-sm">
            <a href={whatsappLink()} target="_blank" rel="noopener" className="flex items-center gap-3 font-semibold">
              <WhatsAppGlyph className="size-5 text-[#25D366]" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3"><Icon name="mail" className="size-5" /> {site.email}</a>
            <a href={site.instagram.url} target="_blank" rel="noopener" className="flex items-center gap-3"><Icon name="instagram" className="size-5" /> {site.instagram.handle}</a>
          </div>
        </div>
      </div>
      <div className={`ct-card relative min-h-[360px] overflow-hidden rounded-2xl ${card}`}>
        <iframe
          title="Mapa da Art Colchões"
          src={site.address.embed}
          className={`absolute inset-0 size-full border-0 ${dark ? "[filter:invert(0.9)_hue-rotate(180deg)_saturate(0.6)]" : "grayscale-[0.3]"}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
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
  const muted = dark ? "text-white/50" : "text-black/50";
  return (
    <footer className={`${dark ? "bg-[#060b19] text-white" : "bg-cream text-navy"} px-5 pt-16 pb-24 sm:px-8`}>
      <div className={`mx-auto grid max-w-7xl gap-10 ${links ? "sm:grid-cols-2 md:grid-cols-5" : "md:grid-cols-4"}`}>
        <div className={links ? "sm:col-span-2" : "md:col-span-2"}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dark ? "/img/logo-light.png" : "/img/logo-dark.png"} alt="Art Colchões" className="h-12 w-auto" loading="lazy" />
          <p className={`mt-5 max-w-sm text-sm leading-relaxed ${muted}`}>
            Loja direto de fábrica de colchões, bases, cabeceiras e cama & banho em Brusque/SC. O maior showroom da região.
          </p>
        </div>
        {links && (
          <nav className="text-sm" aria-label="Rodapé">
            <p className="font-semibold">Navegue</p>
            <ul className={`mt-3 space-y-2 ${muted}`}>
              {links.map((l) => (
                <li key={l.href}><a href={l.href} className="hover:underline">{l.label}</a></li>
              ))}
            </ul>
          </nav>
        )}
        <div className="text-sm">
          <p className="font-semibold">Visite</p>
          <p className={`mt-3 ${muted}`}>{site.address.full}</p>
          <p className={`mt-2 ${muted}`}>Seg a sex 9h às 18h<br />Sáb 9h às 13h</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Fale com a gente</p>
          <ul className={`mt-3 space-y-2 ${muted}`}>
            <li><a href={whatsappLink()} target="_blank" rel="noopener" className="hover:underline">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a></li>
            <li><a href={site.instagram.url} target="_blank" rel="noopener" className="hover:underline">{site.instagram.handle}</a></li>
          </ul>
        </div>
      </div>
      <div className={`mx-auto mt-14 flex max-w-7xl flex-wrap justify-between gap-4 border-t pt-6 text-xs ${dark ? "border-white/10" : "border-black/10"} ${muted}`}>
        <p>© {new Date().getFullYear()} Art Colchões · Brusque/SC</p>
        <p>Desenvolvido por eve</p>
      </div>
    </footer>
  );
}
