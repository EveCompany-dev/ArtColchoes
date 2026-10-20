"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useScrollAnim } from "@/components/Smooth";
import Icon, { WhatsAppGlyph } from "@/components/Icon";
import ProductGrid from "@/components/ProductGrid";
import Img from "@/components/Img";
import FirmnessGuide from "@/components/FirmnessGuide";
import Faq from "@/components/Faq";
import InstagramGrid from "@/components/InstagramGrid";
import { CityList, ContactInfo } from "@/components/Contact";
import { brands, categories, categoryPhotos, differentials, photos, site, stats, whatsappLink } from "@/lib/site";
import { BLUE, Kicker, useTitleReveal } from "./ui";

export function BrandMarquee() {
  const root = useRef<HTMLElement>(null);
  useScrollAnim(() => {
    const loop = gsap.to(".mq-track", { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
    ScrollTrigger.create({
      trigger: root.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = gsap.utils.clamp(-4, 4, self.getVelocity() / 400);
        gsap.to(loop, { timeScale: self.direction * (1 + Math.abs(v)), duration: 0.3, overwrite: true });
        gsap.to(".mq-track", { skewX: -v * 2, duration: 0.3, overwrite: "auto" });
      },
    });
  }, root);
  const row = [...brands, ...brands, ...brands];
  return (
    <section ref={root} aria-label="Marcas" className="overflow-hidden border-y border-white/10 bg-night-2 py-8">
      <div className="mq-track flex w-max items-center">
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center" aria-hidden={k === 1}>
            {row.map((b, i) => (
              <span key={i} className="flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.logo}
                  alt={k === 0 && i < brands.length ? b.name : ""}
                  className={`mx-10 h-9 w-auto opacity-90 sm:mx-14 sm:h-12 ${b.name === "Mannes" ? "rounded bg-white px-2 py-1" : ""}`}
                />
                <span className="size-1.5 rounded-full bg-sky" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function Differentials() {
  const root = useRef<HTMLElement>(null);
  useTitleReveal(root);
  useScrollAnim(() => {
    gsap.matchMedia().add("(min-width: 1024px)", () => {
      ScrollTrigger.create({ trigger: ".df-grid", start: "top 120px", end: "bottom bottom", pin: ".df-side", pinSpacing: false });
    });
    gsap.utils.toArray<HTMLElement>(".df-item").forEach((el) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 80%" } });
      tl.from(el.querySelector(".df-line"), { scaleX: 0, transformOrigin: "left", duration: 1, ease: "expo.out" })
        .from(el.querySelectorAll(".df-in"), { y: 40, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" }, 0.1)
        .from(el.querySelector(".df-icon"), { rotate: -90, scale: 0, duration: 0.8, ease: "back.out(2)" }, 0.1);
    });
  }, root);

  return (
    <section id="showroom" ref={root} className="bg-night px-5 py-12 sm:px-8 sm:py-36">
      <div className="df-grid mx-auto grid max-w-7xl gap-8 sm:gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div className="df-side self-start">
          <Kicker>Por que a Art Colchões</Kicker>
          <h2 className="reveal-title font-display mt-5 text-3xl leading-tight sm:text-5xl">Qualidade de sono começa com a escolha certa.</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
            Somos uma loja especializada em colchões de alta tecnologia. Renovamos confortos de acordo com a necessidade e o biotipo de cada cliente.
          </p>
          <a href={whatsappLink()} target="_blank" rel="noopener" className="mt-8 inline-flex items-center gap-2 rounded-full bg-sky px-6 py-3.5 text-sm font-semibold transition hover:bg-white hover:text-night">
            <WhatsAppGlyph className="size-4" /> Fale com um consultor
          </a>
        </div>
        <ol>
          {differentials.map((d, i) => (
            <li key={d.title} className="df-item relative py-7 sm:py-10">
              <span className="df-line absolute top-0 left-0 h-px w-full bg-white/15" />
              <div className="flex gap-6 sm:gap-10">
                <span className="df-in font-display text-sm text-glow">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1">
                  <h3 className="df-in font-display text-xl sm:text-3xl">{d.title}</h3>
                  <p className="df-in mt-3 max-w-lg leading-relaxed text-white/65">{d.text}</p>
                </div>
                <span className="df-icon grid size-10 shrink-0 sm:size-14 place-items-center rounded-full bg-sky/15 text-glow ring-1 ring-sky/30">
                  <Icon name={d.icon} className="size-6" />
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Ambientes() {
  const root = useRef<HTMLElement>(null);
  useTitleReveal(root);
  const galleryImages: [string, string][] = [
    [photos.showroomSm, "Colchões expostos no showroom"],
    [photos.cureSm, "Pikolin Cure no showroom"],
    [photos.blackSignatureSm, "Pikolin Black Signature"],
    [photos.ambienteBox, "Ambiente com base box e cabeceira ripada"],
    [photos.camaEstofada, "Cama estofada"],
    [photos.baseBau, "Base baú exposta no showroom"],
    [photos.blackSignatureDetalhe, "Detalhe do Pikolin Black Signature"],
    [photos.espacoHerval, "Espaço Herval"],
    [photos.camaBanho, "Espaço de cama & banho"],
  ];
  const galleryCard = ([src, alt]: [string, string], index: number) => (
    <figure key={src} className="amb-img relative mb-3 overflow-hidden rounded-2xl sm:mb-5 sm:rounded-3xl">
      <Img name={src} alt={alt} sizes="33vw" className={`w-full object-cover ${["aspect-[3/4]", "aspect-[5/4]", "aspect-[4/5]"][index % 3]}`} />
      <figcaption className="absolute inset-x-2 bottom-2 rounded-lg bg-black/60 px-3 py-2 text-xs font-medium text-white sm:inset-x-3 sm:bottom-3 sm:rounded-xl sm:text-sm">{alt}</figcaption>
    </figure>
  );
  const mobileGalleryCard = ([src, alt]: [string, string]) => (
    <figure key={src} className="amb-img relative mb-4 overflow-hidden rounded-2xl bg-[#0b1428]">
      <Img name={src} alt={alt} sizes="50vw" className="block h-auto w-full object-contain" />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-3 pb-3 pt-8 text-xs font-medium text-white">{alt}</figcaption>
    </figure>
  );

  return (
    <section ref={root} className="overflow-hidden bg-night-2 px-5 py-12 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Kicker>Showroom</Kicker>
            <h2 className="reveal-title font-display mt-5 text-3xl leading-tight sm:text-5xl">Ambientes montados para você imaginar o seu quarto.</h2>
          </div>
          <p className="max-w-md text-white/60 lg:justify-self-end">Cabeceiras, bases e colchões combinados como na sua casa. Venha deitar, comparar e sentir a diferença entre as tecnologias.</p>
        </div>
        <div className="mt-12 grid grid-cols-2 items-start gap-x-3 sm:hidden">
          {[0, 1].map((column) => (
            <div key={column} className="flex flex-col">
              {galleryImages.filter((_, index) => index % 2 === column).map(mobileGalleryCard)}
            </div>
          ))}
        </div>
        <div className="amb-gallery mt-16 hidden grid-cols-3 gap-5 sm:grid">
          {[0, 1, 2].map((column) => (
            <div key={column} className={`flex flex-col ${column === 1 ? "pt-20" : column === 2 ? "pt-10" : ""}`}>
              {galleryImages.filter((_, index) => index % 3 === column).map((image, row) => galleryCard(image, row + column))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  const root = useRef<HTMLElement>(null);
  useTitleReveal(root);
  useScrollAnim(() => {
    gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
      const to = +el.dataset.to!;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: to,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString("pt-BR")),
      });
    });
    gsap.from(".about-photo", { scale: 1.25, ease: "none", scrollTrigger: { trigger: ".about-photo-wrap", start: "top bottom", end: "bottom top", scrub: true } });
  }, root);

  return (
    <section id="sobre" ref={root} className="bg-night-2 px-5 py-12 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="about-photo-wrap relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-white/10 sm:aspect-[3/4]">
          <Img name={photos.showroom} alt="Colchões expostos no showroom da Art Colchões" sizes="(min-width:1024px) 50vw, 100vw" className="about-photo size-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <Kicker>Sobre nós</Kicker>
          <h2 className="reveal-title font-display mt-5 text-3xl leading-tight sm:text-5xl">Há mais de 4 anos renovando confortos em Brusque.</h2>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-white/60">
            <p>A Art Colchões é uma loja especializada em colchões de alta tecnologia. Aqui cada cliente é atendido com calma, para encontrar o conforto certo para o seu biotipo e a sua forma de dormir.</p>
            <p>Trabalhamos direto de fábrica com Pikolin, Mannes, Herval e D&apos;Angelis, com produtos a pronta entrega e condições especiais de pagamento.</p>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="border-t border-white/10 pt-5">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="font-display text-4xl sm:text-5xl">
                    <span className="stat-num" data-to={s.value}>0</span>
                    <span className="text-sky">{s.suffix}</span>
                  </span>
                  <span className="mt-2 block text-sm text-white/65">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const root = useRef<HTMLElement>(null);
  useTitleReveal(root);
  useScrollAnim(() => {
    gsap.from(".city-chip", { y: 30, opacity: 0, scale: 0.8, stagger: 0.04, duration: 0.6, ease: "back.out(2)", scrollTrigger: { trigger: ".city-chip", start: "top 90%" } });
    gsap.from(".ct-card", { y: 50, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".ct-card", start: "top 85%" } });
  }, root);
  return (
    <section id="contato" ref={root} className="bg-night px-5 py-12 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <Kicker>Visite o showroom</Kicker>
            <h2 className="reveal-title font-display mt-5 text-3xl leading-tight sm:text-5xl">Entrega e montagem grátis em Brusque e região.</h2>
          </div>
          <CityList theme="dark" />
        </div>
        <div className="mt-10 sm:mt-14">
          <ContactInfo theme="dark" />
        </div>
        <div className="mt-8 sm:mt-20">
          <InstagramGrid theme="dark" />
        </div>
      </div>
    </section>
  );
}

export function Categories() {
  const root = useRef<HTMLElement>(null);
  useScrollAnim(() => {
    // Rolagem horizontal fixada só no desktop e sem "reduzir movimento"; no resto é uma grade.
    gsap.matchMedia().add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const track = root.current!.querySelector<HTMLElement>(".cat-track")!;
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance() * 0.55}`, scrub: 0.6, pin: true, invalidateOnRefresh: true },
      });
      gsap.utils.toArray<HTMLElement>(".cat-panel").forEach((panel) => {
        gsap.from(panel.querySelector(".cat-num"), {
          yPercent: 60,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 90%", end: "left 40%", scrub: true },
        });
        gsap.fromTo(panel.querySelector(".cat-art"), { scale: 1.25, xPercent: 8 }, {
          scale: 1,
          xPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        });
      });
    });
  }, root);

  return (
    <section id="categorias" ref={root} className="relative overflow-hidden bg-night-2 lg:motion-safe:h-[100svh]">
      <div className="cat-track grid grid-cols-2 gap-3 px-5 py-12 sm:gap-4 sm:px-8 sm:py-16 lg:grid-cols-3 lg:gap-5 lg:px-8 lg:motion-safe:flex lg:motion-safe:h-full lg:motion-safe:w-max lg:motion-safe:items-stretch lg:motion-safe:gap-0 lg:motion-safe:p-0">
        <div className="col-span-2 flex flex-col justify-center pb-4 lg:col-span-3 lg:motion-safe:col-auto lg:motion-safe:w-[48vw] lg:motion-safe:shrink-0 lg:motion-safe:px-20 lg:motion-safe:pb-0">
          <Kicker>Categorias</Kicker>
          <h2 className="font-display mt-4 text-3xl leading-tight sm:text-5xl">Tudo para o seu quarto em um só lugar.</h2>
          <p className="mt-4 max-w-md text-white/65">Colchões, bases, cabeceiras, travesseiros e cama & banho, com produtos a pronta entrega.</p>
          <p className="mt-10 hidden items-center gap-2 text-sm text-white/65 lg:motion-safe:flex">Continue rolando <Icon name="arrow" className="size-4" /></p>
        </div>
        {categories.map((c, i) => (
          <article key={c.slug} className="cat-panel relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-night p-4 sm:min-h-[300px] sm:p-6 lg:min-h-[340px] lg:motion-safe:min-h-0 lg:motion-safe:w-[34vw] lg:motion-safe:shrink-0 lg:motion-safe:rounded-none lg:motion-safe:border-0 lg:motion-safe:p-12">
            <div className="absolute inset-0 overflow-hidden">
              <Img name={categoryPhotos[c.slug]} alt={`${c.name} no showroom da Art Colchões`} sizes="(min-width:1024px) 40vw, 50vw" className="cat-art size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/10" />
            </div>
            <span className="cat-num font-display relative text-4xl leading-none text-glow opacity-60 lg:motion-safe:text-[12vw] lg:motion-safe:opacity-40">{String(i + 1).padStart(2, "0")}</span>
            <div className="relative">
              <h3 className="font-display text-lg sm:text-2xl lg:motion-safe:text-4xl">{c.name}</h3>
              <p className="mt-2 max-w-xs text-xs leading-snug text-white/80 sm:text-sm lg:motion-safe:text-base">{c.text}</p>
              {c.slug === "colchoes" ? (
                <a href="#catalogo" className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-night transition hover:bg-sky hover:text-white sm:px-5">
                  Ver opções <Icon name="arrow" className="size-4" />
                </a>
              ) : (
                <a
                  href={whatsappLink(`Olá! Gostaria de ver fotos e valores de ${c.name}.`)}
                  target="_blank"
                  rel="noopener"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-night transition hover:bg-sky hover:text-white sm:px-5"
                >
                  <WhatsAppGlyph className="size-4 shrink-0" /> Pedir fotos e valores
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  const root = useRef<HTMLElement>(null);
  useScrollAnim(() => {
    const split = SplitText.create(".fc-title", { type: "chars" });
    gsap.from(split.chars, { yPercent: 120, opacity: 0, stagger: 0.03, duration: 1, ease: "back.out(1.6)", scrollTrigger: { trigger: root.current, start: "top 75%" } });
    return () => split.revert();
  }, root);
  return (
    <section ref={root} className="relative overflow-hidden bg-night-2 px-5 py-14 text-white sm:px-8 sm:py-32">
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 size-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.22),transparent_65%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center">
        <h2 className="fc-title font-display text-[13vw] leading-none sm:text-[10vw]">Boa noite.</h2>
        <p className="mt-6 max-w-xl text-lg text-white/80">Venha deitar no maior showroom da região. {site.address.full}.</p>
        <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
          <a href={whatsappLink()} target="_blank" rel="noopener" className="inline-flex items-center gap-3 rounded-full bg-sky px-8 py-4 text-lg font-semibold transition hover:bg-white hover:text-night">
            <WhatsAppGlyph className="size-6" /> Chamar no WhatsApp
          </a>
          <a href={site.address.mapsUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-4 py-3 text-white/85 underline-offset-4 hover:underline">
            <Icon name="pin" className="size-4" /> Como chegar
          </a>
        </div>
      </div>
    </section>
  );
}

export function Products() {
  const root = useRef<HTMLElement>(null);
  useTitleReveal(root);
  useScrollAnim(() => {
    gsap.from(".prod-card", { y: 60, opacity: 0, stagger: 0.06, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".prod-card", start: "top 85%" } });
  }, root);
  return (
    <section id="catalogo" ref={root} className="bg-night px-5 py-12 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Kicker>Colchões em destaque</Kicker>
        <h2 className="reveal-title font-display mt-5 max-w-3xl text-3xl leading-tight sm:text-5xl">Encontre o conforto do seu jeito.</h2>
        <p className="mt-5 mb-8 max-w-xl sm:mb-12 text-white/60">Valores e condições especiais direto de fábrica, pelo WhatsApp.</p>
        <ProductGrid theme="dark" accent={BLUE} />
      </div>
    </section>
  );
}

export function Guide() {
  const root = useRef<HTMLElement>(null);
  useTitleReveal(root);
  useScrollAnim(() => {
    gsap.from(".guide-box", { y: 80, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: ".guide-box", start: "top 85%" } });
  }, root);
  return (
    <section id="guia" ref={root} className="bg-night-2 px-5 py-12 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Kicker>Guia de conforto</Kicker>
          <h2 className="reveal-title font-display mx-auto mt-5 max-w-3xl text-3xl leading-tight sm:text-5xl">Qual colchão combina com o seu biotipo?</h2>
        </div>
        <div className="guide-box mt-10 sm:mt-14">
          <FirmnessGuide theme="dark" accent={BLUE} />
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const root = useRef<HTMLElement>(null);
  useTitleReveal(root);
  useScrollAnim(() => {
    gsap.matchMedia().add("(min-width: 1024px)", () => {
      ScrollTrigger.create({ trigger: ".faq-questions", start: "top 120px", end: "bottom top", pin: ".faq-side", pinSpacing: false });
    });
  }, root);
  return (
    <section ref={root} className="bg-night px-5 pb-8 sm:px-8">
      <div className="faq-grid mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div className="faq-side self-start">
          <p className="text-white/60">Não achou sua dúvida? Chame no WhatsApp, respondemos rapidinho.</p>
          <a href={whatsappLink("Olá! Tenho uma dúvida sobre os colchões.")} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky px-6 py-3.5 text-sm font-semibold transition hover:bg-white hover:text-night">
            <WhatsAppGlyph className="size-4" /> Perguntar no WhatsApp
          </a>
        </div>
        <div className="faq-questions">
          <Faq theme="dark" />
        </div>
      </div>
    </section>
  );
}
