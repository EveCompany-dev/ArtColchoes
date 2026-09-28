import Link from "next/link";

// Página interna de revisão: escolha a direção criativa.
// Depois da aprovação, a versão escolhida passa a ser a home (/).
const versions = [
  {
    href: "/v1/",
    name: "V1 · Showroom Editorial (noite)",
    text: "Estrutura editorial da v1 com as cores da v2 e site multipágina: home com showroom, sobre e contato; Produtos, Tecnologia e Dúvidas em páginas próprias. Hero com colunas de fotos do showroom em movimento.",
    colors: ["#070d1f", "#2f6bff", "#9db8ff"],
  },
  {
    href: "/v2/",
    name: "V2 · Noite Profunda",
    text: "Escuro e imersivo, tema do sono. Colchão flutuando no hero que se desmonta camada por camada, cards empilhados, galeria horizontal e revelações em máscara.",
    colors: ["#070d1f", "#2f6bff", "#e8ecf5"],
  },
  {
    href: "/v3/",
    name: "V3 · Tipografia Bold",
    text: "Tipografia gigante com a letra do logo, hero com zoom através da palavra ART, texto que se revela palavra por palavra, anatomia do colchão clicável e marquees.",
    colors: ["#ebe4d8", "#111111", "#1f4fff"],
  },
];

export default function Home() {
  return (
    <main className="min-h-dvh bg-[#0b1630] px-5 py-16 text-white sm:px-10">
      <div className="mx-auto max-w-5xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo-light.png" alt="Art Colchões" className="h-14 w-auto" />
        <h1 className="font-display mt-12 text-2xl sm:text-4xl">Direções criativas</h1>
        <p className="mt-3 max-w-2xl text-white/60">
          Três propostas para o site institucional, com o mesmo conteúdo do briefing e linguagens visuais e de animação diferentes.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {versions.map((v) => (
            <Link key={v.href} href={v.href} className="group flex flex-col rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-white/10">
              <div className="flex gap-1.5">
                {v.colors.map((c) => (
                  <span key={c} className="size-6 rounded-full ring-1 ring-white/20" style={{ background: c }} />
                ))}
              </div>
              <h2 className="mt-6 text-lg font-semibold">{v.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{v.text}</p>
              <span className="mt-6 text-sm font-medium text-white/80 group-hover:text-white">Abrir →</span>
            </Link>
          ))}
        </div>
        <Link href="/campanha/" className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#c4703a]/15 p-6 ring-1 ring-[#c4703a]/40 transition hover:bg-[#c4703a]/25">
          <span>
            <span className="block text-lg font-semibold">Landing de campanha · 10.10</span>
            <span className="text-sm text-white/60">Página de campanha reaproveitável (8.8, 10.10, Black Friday), com contagem regressiva.</span>
          </span>
          <span className="text-sm font-medium">Abrir →</span>
        </Link>
      </div>
    </main>
  );
}
