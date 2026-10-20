"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from "@/lib/gsap";

// O ScrollSmoother precisa existir antes dos ScrollTriggers das seções.
// Como os efeitos dos filhos rodam antes dos do pai, as seções esperam `ready`.
// Época do modo de scroll (0 = não pronto); muda quando o smoother liga/desliga.
const ReadyCtx = createContext(0);
export const useSmoothReady = () => useContext(ReadyCtx);

/**
 * Registra as animações de uma seção só depois do ScrollSmoother estar pronto.
 * O callback roda dentro de um gsap.context com escopo no ref informado.
 */
export function useScrollAnim(fn: () => void | (() => void), scope: React.RefObject<HTMLElement | null>, deps: unknown[] = []) {
  const ready = useSmoothReady();
  useGSAP(
    () => {
      if (!ready) return;
      return fn();
    },
    { scope, dependencies: [ready, ...deps], revertOnUpdate: true },
  );
}

export default function Smooth({ children, smooth = 1.2 }: { children: ReactNode; smooth?: number }) {
  const [epoch, setEpoch] = useState(0);
  const wrapper = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scrollToEl = (el: HTMLElement | null, animate: boolean) => {
        const smoother = ScrollSmoother.get();
        if (smoother) smoother.scrollTo(el ?? 0, animate, "top top");
        else {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          (el ?? document.body).scrollIntoView({ behavior: animate && !reduce ? "smooth" : "auto" });
        }
      };

      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
        if (!a || a.target === "_blank") return;
        const url = new URL(a.href, location.href);
        const samePage = url.origin === location.origin && url.pathname === location.pathname;
        if (!samePage || !a.getAttribute("href")!.includes("#")) return;
        const id = decodeURIComponent(url.hash.slice(1));
        const el = id ? document.getElementById(id) : null;
        if (!el && id) return;
        e.preventDefault();
        scrollToEl(el, true);
        history.replaceState(null, "", id ? `#${id}` : location.pathname);
      };
      document.addEventListener("click", onClick);

      // Smoother só em desktop com mouse; touch/telas < 1024px usam scroll nativo.
      // As duas condições são complementares: o matchMedia só chama a função quando alguma
      // delas bate, e sem `native` o celular nunca sinalizava pronto (nenhuma animação rodava).
      const smoothQuery = "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
      const mm = gsap.matchMedia();
      mm.add(
        {
          smooth: smoothQuery,
          native: `not all and ${smoothQuery}`,
        },
        (ctx) => {
          if (ctx.conditions?.smooth) {
            const s = ScrollSmoother.create({
              wrapper: wrapper.current!,
              content: wrapper.current!.firstElementChild as HTMLElement,
              smooth,
              effects: true,
              normalizeScroll: false,
            });
            setEpoch((n) => n + 1);
            return () => s.kill();
          }
          setEpoch((n) => n + 1);
        },
      );

      // imagens/fontes carregando mudam as alturas
      let hashDone = !location.hash;
      const refresh = () => {
        ScrollTrigger.refresh();
        if (hashDone) return;
        const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (el) {
          hashDone = true;
          setTimeout(() => scrollToEl(el, false), 60);
        }
      };
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);

      return () => {
        document.removeEventListener("click", onClick);
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { dependencies: [smooth] },
  );

  return (
    <ReadyCtx.Provider value={epoch}>
      <div id="smooth-wrapper" ref={wrapper}>
        <div id="smooth-content">{children}</div>
      </div>
    </ReadyCtx.Provider>
  );
}
