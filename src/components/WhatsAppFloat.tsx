"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { whatsappLink } from "@/lib/site";
import { WhatsAppGlyph } from "./Icon";

// Anel pulsa só 3 ciclos (CSS) e fica desligado com prefers-reduced-motion.
const RING_CSS = `@keyframes wa-ring{from{transform:scale(1);opacity:.6}to{transform:scale(1.9);opacity:0}}
.wa-ring{opacity:0;animation:wa-ring 1.8s ease-out 3 both;animation-delay:2.4s}
.wa-ring-2{animation-delay:3.3s}
@media (prefers-reduced-motion:reduce){.wa-ring{display:none}}`;

// Botão flutuante (fora do ScrollSmoother, por isso fica fixo de verdade).
export default function WhatsAppFloat({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(ref.current, { scale: 0, rotate: -90, duration: 0.8, delay: 1.6, ease: "back.out(2)" });
    },
    { scope: ref },
  );

  return (
    <a
      ref={ref}
      href={whatsappLink()}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className={`group fixed right-4 bottom-4 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-110 sm:right-6 sm:bottom-6 sm:size-16 ${className}`}
    >
      <style>{RING_CSS}</style>
      <span className="wa-ring absolute inset-0 rounded-full bg-[#25D366]/60" />
      <span className="wa-ring wa-ring-2 absolute inset-0 rounded-full bg-[#25D366]/60" />
      <WhatsAppGlyph className="relative size-7 sm:size-8" />
      <span className="pointer-events-none absolute right-full mr-3 translate-x-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium whitespace-nowrap text-neutral-900 opacity-0 shadow transition group-hover:translate-x-0 group-hover:opacity-100">
        Fale com um consultor
      </span>
    </a>
  );
}
