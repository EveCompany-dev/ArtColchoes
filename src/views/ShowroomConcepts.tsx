"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import ShowroomVideo from "@/components/ShowroomVideo";
import { photos, whatsappLink } from "@/lib/site";
import Icon, { WhatsAppGlyph } from "@/components/Icon";
import { PageIntro, routes, Shell } from "./ui";

const editorialImages = [
  [photos.camaBanho, "Cama & banho"],
  [photos.ambienteBox, "Bases e cabeceiras"],
  [photos.blackSignatureDetalhe, "Colchões Pikolin"],
] as const;

const cinematicImages = [
  [photos.espacoHerval, "Espaço Herval"],
  [photos.denseSm, "Conforto para experimentar"],
  [photos.camaEstofada, "Ambientes completos"],
] as const;

export function ShowroomVersionA() {
  return (
    <Shell>
      <PageIntro
        crumb="Showroom · Conceito A"
        kicker="Proposta de showroom · A"
        title="Um espaço para escolher sem pressa."
        text="Uma apresentação editorial, clara e acolhedora: ambientes reais, categorias bem organizadas e um convite direto para experimentar."
      />
      <section className="bg-cream px-5 py-16 text-navy sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-copper uppercase">O showroom Art Colchões</p>
            <h2 className="font-display mt-5 text-3xl leading-tight sm:text-5xl">Conheça de perto. Encontre o seu conforto.</h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-black/65 sm:text-lg">
              Mais de 25 colchões para deitar, comparar e descobrir a diferença entre cada tecnologia. Nossa equipe acompanha sua escolha com calma.
            </p>
            <a href={whatsappLink("Olá! Quero conhecer o showroom da Art Colchões.")} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-sky">
              <WhatsAppGlyph className="size-4" /> Agendar uma visita
            </a>
          </div>
          <figure className="relative overflow-hidden rounded-[2rem] bg-sand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos.showroom} alt="Vista ampla do showroom da Art Colchões" className="aspect-[4/3] size-full object-cover" />
            <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 px-5 py-4 text-sm font-medium text-navy backdrop-blur sm:inset-x-6 sm:bottom-6">
              Ambientes montados para você testar como se estivesse em casa.
            </figcaption>
          </figure>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl gap-4 sm:grid-cols-3 sm:gap-6">
          {editorialImages.map(([src, label], index) => (
            <figure key={src} className="overflow-hidden rounded-2xl bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={label} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="flex items-center justify-between px-5 py-4">
                <span className="font-semibold">{label}</span>
                <span className="font-display text-sm text-copper">0{index + 1}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="bg-night px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-glow uppercase">Uma visita guiada</p>
            <h2 className="font-display mt-4 text-2xl leading-tight sm:text-4xl">Veja os detalhes. Depois, experimente.</h2>
            <p className="mt-4 max-w-lg leading-relaxed text-white/60">Um passeio rápido pelo espaço antes de vir conhecer pessoalmente.</p>
          </div>
          <div className="overflow-hidden rounded-3xl ring-1 ring-white/10">
            <ShowroomVideo className="aspect-video" />
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl">
          <a href={routes.contato} className="inline-flex items-center gap-2 text-sm font-semibold text-glow hover:text-white">
            Endereço e horários <Icon name="arrow" className="size-4" />
          </a>
        </div>
      </section>
    </Shell>
  );
}

export function ShowroomVersionB() {
  const [expandedImage, setExpandedImage] = useState<{
    src: string;
    alt: string;
    title: string;
    description?: string;
    origin: { left: number; top: number; width: number; height: number };
  } | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const closeExpandedImage = useCallback(() => {
    if (!expandedImage || isClosing) return;
    setIsClosing(true);

    const dialog = document.querySelector<HTMLElement>("[data-image-dialog]");
    const backdrop = document.querySelector<HTMLElement>("[data-image-backdrop]");
    const caption = document.querySelector<HTMLElement>("[data-image-caption]");
    if (!dialog || !backdrop || !caption) {
      setExpandedImage(null);
      setIsClosing(false);
      return;
    }

    gsap.timeline({
      onComplete: () => {
        setExpandedImage(null);
        setIsClosing(false);
      },
    })
      .to(caption, { opacity: 0, y: 24, duration: 0.2, ease: "power2.in" }, 0)
      .to(backdrop, { opacity: 0, duration: 0.55, ease: "power2.inOut" }, 0)
      .to(dialog, {
        ...expandedImage.origin,
        borderRadius: 24,
        duration: 0.75,
        ease: "power3.inOut",
      }, 0);
  }, [expandedImage, isClosing]);

  useEffect(() => {
    if (!expandedImage) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeExpandedImage();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [expandedImage, closeExpandedImage]);

  useEffect(() => {
    if (!expandedImage || isClosing) return;

    const dialog = document.querySelector<HTMLElement>("[data-image-dialog]");
    const backdrop = document.querySelector<HTMLElement>("[data-image-backdrop]");
    const caption = document.querySelector<HTMLElement>("[data-image-caption]");
    if (!dialog || !backdrop || !caption) return;

    gsap.set(dialog, {
      left: expandedImage.origin.left,
      top: expandedImage.origin.top,
      width: expandedImage.origin.width,
      height: expandedImage.origin.height,
      borderRadius: 24,
    });
    gsap.set(backdrop, { opacity: 0 });
    gsap.set(caption, { opacity: 0, y: 24 });

    const timeline = gsap.timeline();
    timeline
      .to(dialog, {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        borderRadius: 0,
        duration: 0.85,
        ease: "power3.inOut",
      })
      .to(backdrop, { opacity: 0.9, duration: 0.65, ease: "power2.out" }, 0)
      .to(caption, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.42);

    return () => {
      timeline.kill();
    };
  }, [expandedImage, isClosing]);

  function openExpandedImage(
    image: { src: string; alt: string; title: string; description?: string },
    source: HTMLElement,
  ) {
    const { left, top, width, height } = source.getBoundingClientRect();
    setIsClosing(false);
    setExpandedImage({ ...image, origin: { left, top, width, height } });
  }

  return (
    <Shell>
      <PageIntro
        crumb="Showroom · Conceito B"
        kicker="Proposta de showroom · B"
        title="Sinta a diferença antes de decidir."
        text="Uma experiência visual mais imersiva: o showroom em primeiro plano, percorrido em grandes imagens e pequenas pausas para explorar."
      />
      <section className="bg-night px-5 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-24">
        <div className="relative mx-auto flex min-h-[68svh] max-w-7xl items-end overflow-hidden rounded-[2rem] bg-night-3 p-7 sm:p-12 lg:p-16">
          <button
            type="button"
            aria-label="Ampliar imagem do showroom da Art Colchões"
            onClick={(event) => openExpandedImage({
              src: photos.showroom,
              alt: "Showroom da Art Colchões em Brusque",
              title: "Seu próximo colchão começa aqui.",
              description: "Um lugar para deitar, comparar e encontrar o conforto certo para você.",
            }, event.currentTarget)}
            className="absolute inset-0 z-0 cursor-zoom-in"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos.showroom} alt="" className="size-full object-cover" />
          </button>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/5" />
          <div className="pointer-events-none relative z-10 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.3em] text-glow uppercase">Brusque · Santa Catarina</p>
            <h2 className="font-display mt-5 text-3xl leading-tight sm:text-5xl lg:text-6xl">Seu próximo colchão começa aqui.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">Um lugar para deitar, comparar e encontrar o conforto certo para você.</p>
            <a href={whatsappLink("Olá! Quero visitar o showroom da Art Colchões.")} target="_blank" rel="noopener noreferrer" className="pointer-events-auto mt-8 inline-flex items-center gap-2 rounded-full bg-sky px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-night">
              <WhatsAppGlyph className="size-4" /> Vamos conversar
            </a>
          </div>
          <button
            type="button"
            onClick={(event) => openExpandedImage({
              src: photos.showroom,
              alt: "Showroom da Art Colchões em Brusque",
              title: "Seu próximo colchão começa aqui.",
              description: "Um lugar para deitar, comparar e encontrar o conforto certo para você.",
            }, event.currentTarget)}
            className="font-display absolute top-6 right-7 z-10 rounded-full bg-night/40 px-3 py-1.5 text-sm text-white/90 backdrop-blur transition hover:bg-night/70 sm:top-10 sm:right-12"
            aria-label="Ampliar imagem do showroom"
          >
            01 / 04 · Ampliar
          </button>
        </div>
        <div className="mx-auto mt-6 grid max-w-7xl gap-4 sm:grid-cols-3">
          {cinematicImages.map(([src, label], index) => (
            <button
              key={src}
              type="button"
              onClick={(event) => openExpandedImage({ src, alt: label, title: label }, event.currentTarget)}
              aria-label={`Ampliar imagem: ${label}`}
              className="group relative overflow-hidden rounded-2xl bg-night-2 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <span className="font-display text-lg">{label}</span>
                <span className="text-xs text-white/65">0{index + 2} · Ampliar</span>
              </span>
            </button>
          ))}
        </div>
      </section>
      {expandedImage && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[100]" role="presentation" onClick={closeExpandedImage}>
          <button
            type="button"
            aria-label="Fechar imagem ampliada"
            onClick={closeExpandedImage}
            className="absolute inset-0 size-full cursor-zoom-out bg-black"
            data-image-backdrop
            style={{ opacity: 0 }}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={expandedImage.title}
            data-image-dialog
            className="fixed overflow-hidden bg-night"
            style={{
              left: expandedImage.origin.left,
              top: expandedImage.origin.top,
              width: expandedImage.origin.width,
              height: expandedImage.origin.height,
              borderRadius: 24,
            }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={expandedImage.src} alt={expandedImage.alt} className="size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/15 to-night/20" />
            <button
              type="button"
              onClick={closeExpandedImage}
              aria-label="Fechar imagem ampliada"
              className="absolute top-5 right-5 z-10 grid size-12 place-items-center rounded-full bg-black/50 text-3xl leading-none text-white backdrop-blur transition hover:bg-white hover:text-night"
            >
              <span aria-hidden="true">×</span>
            </button>
            <div data-image-caption className="absolute inset-x-0 bottom-0 p-6 pb-[max(2rem,env(safe-area-inset-bottom))] text-white sm:p-10 md:p-14" style={{ opacity: 0, transform: "translateY(24px)" }}>
              <p className="text-xs font-semibold tracking-[0.3em] text-glow uppercase">Showroom Art Colchões · Brusque/SC</p>
              <h2 className="font-display mt-3 max-w-4xl text-3xl leading-tight sm:text-5xl md:text-6xl">{expandedImage.title}</h2>
              {expandedImage.description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{expandedImage.description}</p>}
            </div>
          </div>
        </div>
      , document.body)}
      <section className="bg-night-2 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="overflow-hidden rounded-3xl ring-1 ring-white/10">
            <ShowroomVideo className="aspect-[4/3]" />
          </div>
          <div className="lg:pl-8">
            <p className="text-xs font-semibold tracking-[0.28em] text-glow uppercase">Uma pausa para sentir</p>
            <h2 className="font-display mt-4 text-2xl leading-tight sm:text-4xl">Vem descobrir o que combina com você.</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-white/60">Mais de 25 modelos expostos. Compare tecnologias com ajuda de quem entende do seu descanso.</p>
            <a href={routes.contato} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-glow hover:text-white">
              Planejar minha visita <Icon name="arrow" className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
