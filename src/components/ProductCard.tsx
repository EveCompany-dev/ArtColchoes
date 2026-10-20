"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, ScrollSmoother } from "@/lib/gsap";
import { firmnessLabel, firmnessScale, type Product } from "@/lib/products";
import { whatsappLink } from "@/lib/site";
import IsoMattress, { productLayers } from "./IsoMattress";
import { WhatsAppGlyph } from "./Icon";
import Img from "./Img";

type Theme = "light" | "dark";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Cta({ p, dark, className = "" }: { p: Product; dark: boolean; className?: string }) {
  return (
    <a
      href={whatsappLink(`Olá! Tenho interesse no colchão ${p.brand} ${p.name}. Pode me passar valores e condições?`)}
      target="_blank"
      rel="noopener"
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${dark ? "bg-white text-navy hover:bg-[#25D366] hover:text-white" : "bg-navy text-white hover:bg-[#25D366]"} ${className}`}
    >
      <WhatsAppGlyph className="size-4" /> Consultar valores
    </a>
  );
}

type Rects = { card: DOMRect; img: DOMRect };

function Expanded({ p, dark, accent, getFrom, onReveal, onClose }: { p: Product; dark: boolean; accent: string; getFrom: () => Rects; onReveal: () => void; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const imgCol = useRef<HTMLDivElement>(null);
  const imgBox = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const fi = p.firmness ? firmnessScale.indexOf(p.firmness) : -1;
  const firm = p.firmness ? firmnessLabel[p.firmness] : "Consultar";
  const muted = dark ? "text-white/70" : "text-black/65";
  const bg = dark ? "bg-night-2 ring-1 ring-white/10" : "bg-white";

  // Caixas (fundo e foto) na posição/tamanho do card, relativas ao layout final. Só animamos
  // left/top/width/height reais, sem escala, então nada distorce.
  const cardBoxes = useCallback(() => {
    const { card, img } = getFrom();
    const r = panel.current!.getBoundingClientRect();
    const c = imgCol.current!.getBoundingClientRect();
    const md = window.matchMedia("(min-width: 768px)").matches;
    return {
      shell: { left: card.left - r.left, top: card.top - r.top, width: card.width, height: card.height },
      shellEnd: { left: 0, top: 0, width: r.width, height: r.height },
      img: { left: img.left - c.left, top: img.top - c.top, width: img.width, height: img.height, borderRadius: "24px 24px 0 0" },
      imgEnd: { left: 0, top: 0, width: c.width, height: c.height, borderRadius: md ? "24px 0 0 24px" : "24px 24px 0 0" },
    };
  }, [getFrom]);

  useLayoutEffect(() => {
    const el = panel.current!;
    if (reduced()) {
      el.style.overflowY = "auto";
      return;
    }
    const ctx = gsap.context(() => {
      const b = cardBoxes();
      const content = el.querySelectorAll("[data-x]");
      gsap.set(content, { opacity: 0, y: 20 });
      gsap
        .timeline({ defaults: { ease: "expo.inOut" }, onComplete: () => { gsap.set([shell.current, imgBox.current], { clearProps: "left,top,width,height" }); el.style.overflowY = "auto"; } })
        .fromTo(backdrop.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
        .fromTo(shell.current, b.shell, { ...b.shellEnd, duration: 0.8 }, 0)
        .fromTo(imgBox.current, b.img, { ...b.imgEnd, duration: 0.8 }, 0)
        .to(content, { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: "power3.out" }, 0.5);
    });
    return () => ctx.revert();
  }, [cardBoxes]);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    if (reduced()) return onClose();
    const el = panel.current!;
    el.style.overflowY = "visible";
    el.scrollTop = 0;
    const b = cardBoxes();
    gsap.set([shell.current, imgBox.current], { position: "absolute" });
    gsap
      .timeline({ defaults: { ease: "expo.inOut" }, onComplete: onClose })
      .to(el.querySelectorAll("[data-x]"), { opacity: 0, y: 12, duration: 0.25, stagger: { each: 0.02, from: "end" }, ease: "power2.in" }, 0)
      .fromTo(shell.current, b.shellEnd, { ...b.shell, duration: 0.7 }, 0.15)
      .fromTo(imgBox.current, b.imgEnd, { ...b.img, duration: 0.7 }, 0.15)
      .to(backdrop.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, 0.3)
      .call(onReveal, undefined, 0.65)
      .to([shell.current, imgBox.current], { opacity: 0, duration: 0.2, ease: "none" }, 0.65);
  }, [cardBoxes, onClose, onReveal]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const smoother = ScrollSmoother.get();
    smoother?.paused(true);
    const prev = document.documentElement.style.overflow;
    const prevGutter = document.documentElement.style.scrollbarGutter;
    // Mantém o espaço da barra para a página não "pular" quando ela some/volta
    document.documentElement.style.scrollbarGutter = "stable";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.scrollbarGutter = prevGutter;
      window.removeEventListener("keydown", onKey);
      smoother?.paused(false);
      document.documentElement.style.overflow = prev;
    };
  }, [close]);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-8" role="dialog" aria-modal="true" aria-label={`${p.brand} ${p.name}`}>
      <div ref={backdrop} onClick={close} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div ref={panel} className="relative grid max-h-full w-full max-w-5xl overscroll-contain rounded-3xl md:grid-cols-2">
        <div ref={shell} aria-hidden="true" className={`absolute inset-0 rounded-3xl ${bg}`} />
        <button
          type="button"
          onClick={(e) => {
            if (!reduced()) gsap.to(e.currentTarget.querySelector("svg"), { rotate: 180, scale: 0.6, duration: 0.35, ease: "power3.in" });
            close();
          }}
          aria-label="Fechar"
          data-x
          className="group/close absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition duration-300 hover:scale-110 hover:bg-white hover:text-navy active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-5 transition-transform duration-300 group-hover/close:rotate-90" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <div ref={imgCol} className="relative aspect-[4/3] md:aspect-auto md:min-h-[28rem]">
          <div ref={imgBox} className="absolute inset-0 overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none" style={{ background: dark ? "linear-gradient(160deg,#1a2749,#0b1328)" : `linear-gradient(160deg, #f7f5f1, ${p.tone.top})` }}>
            {p.photo ? (
              <>
                <Img name={p.photo} alt="" aria-hidden="true" sizes="20vw" className="absolute inset-0 size-full scale-125 object-cover opacity-40 blur-2xl" />
                <Img name={p.photo} alt={`Colchão ${p.brand} ${p.name} no showroom da Art Colchões`} sizes="(min-width:768px) 40vw, 100vw" priority className="absolute inset-0 size-full object-contain" />
              </>
            ) : (
              <IsoMattress layers={productLayers(p.tone.top, p.tone.side)} className="absolute inset-0 m-auto h-[82%] w-[82%]" title={`Ilustração do colchão ${p.name}`} />
            )}
          </div>
        </div>

        <div className={`relative flex flex-col p-6 sm:p-10 ${dark ? "text-white" : "text-black"}`}>
          <p data-x className={`text-xs font-semibold tracking-wider uppercase ${muted}`}>
            {p.brand} · {p.line}
          </p>
          <h3 data-x className="font-display mt-3 text-2xl sm:text-3xl">{p.name}</h3>
          <p data-x className={`mt-2 ${muted}`}>{p.tagline}</p>

          <dl data-x className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
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

          <ul data-x className="mt-6 flex flex-wrap gap-1.5">
            {p.techs.map((t) => (
              <li key={t} className={`rounded-full px-2.5 py-1 text-xs ${dark ? "bg-white/10 text-white/80" : "bg-black/[0.05] text-black/65"}`}>
                {t}
              </li>
            ))}
          </ul>

          <div data-x className="mt-5">
            <p className={`text-xs ${muted}`}>{p.sizes.join(" · ")}</p>
            <p className={`mt-1 text-xs ${muted}`}>Garantia de fábrica · Pagamento facilitado</p>
          </div>

          <div data-x className="mt-8">
            <Cta p={p} dark={dark} />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function ProductCard({ p, theme = "light", accent }: { p: Product; theme?: Theme; accent: string }) {
  const dark = theme === "dark";
  const muted = dark ? "text-white/70" : "text-black/65";
  const [isOpen, setIsOpen] = useState(false);
  const card = useRef<HTMLElement>(null);

  const getFrom = useCallback((): Rects => ({ card: card.current!.getBoundingClientRect(), img: card.current!.querySelector("[data-img]")!.getBoundingClientRect() }), []);
  const open = () => setIsOpen(true);

  return (
    <>
      <article
        ref={card}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`Ver detalhes do colchão ${p.name}`}
        onClick={open}
        onKeyDown={(e) => {
          if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            open();
          }
        }}
        className={`group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl transition duration-500 ${dark ? "bg-night-2 ring-1 ring-white/10 hover:bg-[#172440]" : "bg-white ring-1 ring-black/5 hover:shadow-2xl hover:shadow-black/10"}`}
        style={isOpen ? { visibility: "hidden" } : undefined}
      >
        <div data-img className="relative aspect-[4/3] shrink-0 overflow-hidden" style={{ background: dark ? "linear-gradient(160deg,#1a2749,#0b1328)" : `linear-gradient(160deg, #f7f5f1, ${p.tone.top})` }}>
          {p.photo ? (
            <Img name={p.photo} alt="" aria-hidden="true" sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="size-full object-cover transition duration-700 motion-reduce:transition-none group-hover:scale-105 motion-reduce:group-hover:scale-100" />
          ) : (
            <IsoMattress layers={productLayers(p.tone.top, p.tone.side)} className="absolute inset-0 m-auto h-[82%] w-[82%] transition duration-700 motion-reduce:transition-none group-hover:-translate-y-2 motion-reduce:group-hover:translate-y-0" title={`Ilustração do colchão ${p.name}`} />
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between gap-6 p-6">
          <div>
            <p className={`text-xs font-semibold tracking-wider uppercase ${muted}`}>
              {p.brand} · {p.line}
            </p>
            <h3 className="font-display mt-3 text-xl">{p.name}</h3>
            <p className={`mt-1 text-sm ${muted}`}>{p.tagline}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold tracking-wider uppercase transition-transform group-hover:translate-x-1" style={{ color: accent }}>
              Ver detalhes <span aria-hidden="true">→</span>
            </span>
          </div>
          <Cta p={p} dark={dark} />
        </div>
      </article>
      {isOpen && <Expanded p={p} dark={dark} accent={accent} getFrom={getFrom} onReveal={() => { card.current!.style.visibility = ""; }} onClose={() => setIsOpen(false)} />}
    </>
  );
}
