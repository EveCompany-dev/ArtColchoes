"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { faq } from "@/lib/site";
import Icon from "./Icon";

export default function Faq({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(0);
  const root = useRef<HTMLDivElement>(null);
  const dark = theme === "dark";

  const toggle = (i: number) => {
    const next = open === i ? null : i;
    gsap.utils.toArray<HTMLElement>(".faq-a", root.current).forEach((el, k) => {
      gsap.to(el, {
        height: k === next ? "auto" : 0,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => ScrollTrigger.refresh(),
      });
    });
    setOpen(next);
  };

  return (
    <div ref={root} className={`divide-y ${dark ? "divide-white/10 border-y border-white/10" : "divide-black/10 border-y border-black/10"}`}>
      {faq.map((f, i) => (
        <div key={f.q}>
          <button type="button" onClick={() => toggle(i)} aria-expanded={open === i} className="flex min-h-11 w-full items-center justify-between gap-6 py-4 text-left">
            <span className="text-lg font-medium sm:text-xl">{f.q}</span>
            <span className={`grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-500 ${open === i ? "rotate-45" : ""} ${dark ? "bg-white/10" : "bg-black/5"}`}>
              <Icon name="plus" className="size-4" />
            </span>
          </button>
          <div className="faq-a overflow-hidden" style={{ height: i === 0 ? "auto" : 0 }}>
            <p className={`max-w-3xl pb-6 leading-relaxed ${dark ? "text-white/75" : "text-black/65"}`}>{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
