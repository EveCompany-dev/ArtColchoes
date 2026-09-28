"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { ScrollSmoother, ScrollTrigger, useGSAP } from "@/lib/gsap";

// O ScrollSmoother precisa existir antes dos ScrollTriggers das seções.
// Como os efeitos dos filhos rodam antes dos do pai, as seções esperam `ready`.
const ReadyCtx = createContext(false);
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
  const [ready, setReady] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smoother = reduce
      ? null
      : ScrollSmoother.create({
          wrapper: wrapper.current!,
          content: wrapper.current!.firstElementChild as HTMLElement,
          smooth,
          effects: true,
          smoothTouch: 0.1,
          normalizeScroll: false,
        });

    const scrollToEl = (el: HTMLElement | null, animate: boolean) => {
      if (smoother) smoother.scrollTo(el ?? 0, animate, "top top");
      else (el ?? document.body).scrollIntoView({ behavior: animate ? "smooth" : "auto" });
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
    setReady(true);

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
      smoother?.kill();
    };
  });

  return (
    <ReadyCtx.Provider value={ready}>
      <div id="smooth-wrapper" ref={wrapper}>
        <div id="smooth-content">{children}</div>
      </div>
    </ReadyCtx.Provider>
  );
}
