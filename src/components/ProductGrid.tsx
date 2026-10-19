"use client";

import { useMemo, useRef, useState } from "react";
import { Flip, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { firmnessLabel, firmnessScale, products, type Product } from "@/lib/products";
import { whatsappLink } from "@/lib/site";
import IsoMattress, { productLayers } from "./IsoMattress";
import { WhatsAppGlyph } from "./Icon";

type Theme = "light" | "dark";

export function ProductCard({ p, theme = "light", accent }: { p: Product; theme?: Theme; accent: string }) {
  const dark = theme === "dark";
  const fi = p.firmness ? firmnessScale.indexOf(p.firmness) : -1;
  const firm = p.firmness ? firmnessLabel[p.firmness] : "Consultar";
  const muted = dark ? "text-white/70" : "text-black/65";
  return (
    <article className={`group flex h-full flex-col overflow-hidden rounded-3xl transition-shadow duration-500 ${dark ? "bg-white/[0.04] ring-1 ring-white/10 hover:bg-white/[0.07]" : "bg-white ring-1 ring-black/5 hover:shadow-2xl hover:shadow-black/10"}`}>
      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: dark ? "linear-gradient(160deg,#1a2749,#0b1328)" : `linear-gradient(160deg, #f7f5f1, ${p.tone.top})` }}>
        {p.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.photo} alt={`Colchão ${p.brand} ${p.name} no showroom da Art Colchões`} loading="lazy" className="size-full object-cover transition duration-700 motion-reduce:transition-none group-hover:scale-105 motion-reduce:group-hover:scale-100" />
        ) : (
          <IsoMattress layers={productLayers(p.tone.top, p.tone.side)} className="absolute inset-0 m-auto h-[82%] w-[82%] transition duration-700 motion-reduce:transition-none group-hover:-translate-y-2 motion-reduce:group-hover:translate-y-0" title={`Ilustração do colchão ${p.name}`} />
        )}
        <span className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase ${dark ? "bg-black/40 text-white backdrop-blur" : "bg-white/85 text-black/70 backdrop-blur"}`}>
          {p.brand} · {p.line}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl">{p.name}</h3>
        <p className={`mt-1 text-sm ${muted}`}>{p.tagline}</p>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className={`text-xs tracking-wider uppercase ${muted}`}>Altura</dt>
            <dd className="font-medium">{p.height ? `${p.height} cm` : "Consultar"}</dd>
          </div>
          <div>
            <dt className={`text-xs tracking-wider uppercase ${muted}`}>Mola</dt>
            <dd className="font-medium">
              {p.spring ?? "Consultar"}
              {p.support && <span className={`block text-xs font-normal ${muted}`}>até {p.support} por pessoa</span>}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className={`mb-1.5 flex justify-between text-xs tracking-wider uppercase ${muted}`}>
              <span>Firmeza</span>
              <span>{firm}</span>
            </dt>
            <dd className="flex gap-1" aria-label={`Firmeza ${firm}`}>
              {firmnessScale.map((f, i) => (
                <span key={f} className={`h-1.5 flex-1 rounded-full ${i <= fi ? "" : dark ? "bg-white/10" : "bg-black/10"}`} style={i <= fi ? { background: accent } : undefined} />
              ))}
            </dd>
          </div>
        </dl>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {p.techs.map((t) => (
            <li key={t} className={`rounded-full px-2.5 py-1 text-xs ${dark ? "bg-white/10 text-white/80" : "bg-black/[0.05] text-black/65"}`}>
              {t}
            </li>
          ))}
        </ul>

        <p className={`mt-4 text-xs ${muted}`}>{p.sizes.join(" · ")}</p>
        <p className={`mt-1 text-xs ${muted}`}>Garantia de fábrica · Pagamento facilitado</p>

        <a
          href={whatsappLink(`Olá! Tenho interesse no colchão ${p.brand} ${p.name}. Pode me passar valores e condições?`)}
          target="_blank"
          rel="noopener"
          className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${dark ? "bg-white text-navy hover:bg-[#25D366] hover:text-white" : "bg-navy text-white hover:bg-[#25D366]"}`}
        >
          <WhatsAppGlyph className="size-4" /> Consultar valores
        </a>
      </div>
    </article>
  );
}

function CompactCard({ p, theme, accent }: { p: Product; theme: Theme; accent: string }) {
  const dark = theme === "dark";
  const firm = p.firmness ? firmnessLabel[p.firmness] : "Consultar";
  return (
    <article className={`flex h-full flex-col rounded-2xl p-5 ${dark ? "bg-white/[0.04] ring-1 ring-white/10" : "bg-white ring-1 ring-black/5"}`}>
      <p className={`text-xs font-semibold tracking-wider uppercase ${dark ? "text-white/70" : "text-black/65"}`}>
        {p.brand} · {p.line}
      </p>
      <h3 className="font-display mt-2 text-lg">{p.name}</h3>
      <p className={`mt-1 text-sm ${dark ? "text-white/70" : "text-black/65"}`}>Firmeza: {firm}</p>
      <a
        href={whatsappLink(`Olá! Tenho interesse no colchão ${p.brand} ${p.name}. Pode me passar valores e condições?`)}
        target="_blank"
        rel="noopener"
        aria-label={`Pedir valores do colchão ${p.name} no WhatsApp`}
        className={`mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${dark ? "bg-white text-navy hover:bg-[#25D366] hover:text-white" : "bg-navy text-white hover:bg-[#25D366]"}`}
        style={{ outlineColor: accent }}
      >
        <WhatsAppGlyph className="size-4" /> Pedir no WhatsApp
      </a>
    </article>
  );
}

const MOBILE_LIMIT = 6;
type Filter = { key: string; label: string; test: (p: Product) => boolean };

const filtersBy: Record<"firmness" | "line", Filter[]> = {
  firmness: [
    { key: "all", label: "Todos", test: () => true },
    { key: "soft", label: "Macios", test: (p) => p.firmness === "Plush" || p.firmness === "Extra Plush" },
    { key: "medium", label: "Médios", test: (p) => p.firmness === "Medium" },
    { key: "firm", label: "Firmes", test: (p) => p.firmness === "Firm" || p.firmness === "Extra Firm" },
  ],
  line: [
    { key: "all", label: "Todos", test: () => true },
    { key: "pikolin", label: "Pikolin", test: (p) => p.brand === "Pikolin" },
    { key: "mannes", label: "Mannes", test: (p) => p.brand === "Mannes" },
    { key: "cross", label: "Cross System", test: (p) => !!p.spring?.startsWith("Cross") },
    { key: "normablock", label: "Normablock® Pro", test: (p) => !!p.spring?.startsWith("Normablock") },
  ],
};

export default function ProductGrid({ theme = "light", accent = "#c4703a", filterBy = "firmness" }: { theme?: Theme; accent?: string; filterBy?: "firmness" | "line" }) {
  const filters = filtersBy[filterBy];
  const [active, setActive] = useState("all");
  const root = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const test = useMemo(() => filters.find((f) => f.key === active)!.test, [filters, active]);
  const [expanded, setExpanded] = useState(false);
  const dark = theme === "dark";

  useGSAP(
    () => {
      if (!flipState.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        flipState.current = null;
        return;
      }
      Flip.from(flipState.current, {
        duration: 0.7,
        ease: "power3.inOut",
        stagger: 0.04,
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.2 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.4 }),
        onComplete: () => ScrollTrigger.refresh(),
      });
      flipState.current = null;
    },
    { scope: root, dependencies: [active, expanded] },
  );

  const choose = (key: string) => {
    if (key === active) return;
    flipState.current = Flip.getState(root.current!.querySelectorAll(".prod-card"));
    setActive(key);
  };

  // destaque = quem tem foto; o resto vira card compacto
  const visible = products.filter(test);
  const featured = visible.filter((p) => p.photo);
  const compact = visible.filter((p) => !p.photo);
  const ordered = [...featured, ...compact];
  const rank = new Map(ordered.map((p, i) => [p.slug, i]));
  const total = ordered.length;
  const collapsible = total > MOBILE_LIMIT;
  const hideOnMobile = (slug: string) => collapsible && !expanded && (rank.get(slug) ?? 0) >= MOBILE_LIMIT;
  const compactHasMobile = compact.some((p) => !hideOnMobile(p.slug));

  return (
    <div ref={root}>
      <div className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => choose(f.key)}
            aria-pressed={active === f.key}
            className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-5 py-2.5 text-sm font-medium transition ${
              active === f.key ? "text-white" : dark ? "bg-white/5 text-white/80 ring-1 ring-white/10 hover:bg-white/10" : "bg-white text-black/65 ring-1 ring-black/10 hover:ring-black/30"
            }`}
            style={active === f.key ? { background: accent } : undefined}
          >
            {f.label}
          </button>
        ))}
      </div>

      {featured.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((p) => (
            <div key={p.slug} className={`prod-card ${hideOnMobile(p.slug) ? "max-sm:hidden" : ""}`}>
              <ProductCard p={p} theme={theme} accent={accent} />
            </div>
          ))}
        </div>
      )}

      {compact.length > 0 && (
        <section aria-labelledby="mais-modelos" className={featured.length > 0 ? "mt-12" : ""}>
          <div className={compactHasMobile ? "" : "max-sm:hidden"}>
            <h3 id="mais-modelos" className="font-display text-xl">Também no showroom</h3>
            <p className={`mt-1 mb-5 text-sm ${dark ? "text-white/70" : "text-black/65"}`}>Modelos para conhecer e testar pessoalmente na loja.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {compact.map((p) => (
              <div key={p.slug} className={`prod-card ${hideOnMobile(p.slug) ? "max-sm:hidden" : ""}`}>
                <CompactCard p={p} theme={theme} accent={accent} />
              </div>
            ))}
          </div>
        </section>
      )}

      {collapsible && (
        <div className="mt-8 flex justify-center sm:hidden">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className={`inline-flex min-h-11 items-center rounded-full px-6 py-2.5 text-sm font-semibold ring-1 transition ${dark ? "bg-white/5 text-white ring-white/20 hover:bg-white/10" : "bg-white text-black/80 ring-black/20 hover:ring-black/40"}`}
          >
            {expanded ? "Mostrar menos modelos" : `Ver todos os modelos (${total})`}
          </button>
        </div>
      )}

      <p className={`mt-8 text-center text-sm ${dark ? "text-white/65" : "text-black/60"}`}>
        Além dos colchões: bases box, bases baú, cabeceiras, travesseiros e cama & banho. Tudo a pronta entrega no showroom.
      </p>
    </div>
  );
}