"use client";

import TechLayers from "./TechLayers";
import { TechHighlights } from "./Tech";
import { BrandMarquee, Categories, FaqSection, Guide, Products } from "./Sections";
import { CtaBand, PageIntro, routes, Shell } from "./ui";

export function ProdutosPage() {
  return (
    <Shell>
      <PageIntro
        crumb="Produtos"
        kicker="Catálogo"
        title="Tudo para o seu quarto, direto de fábrica."
        text="Colchões Pikolin e Mannes, bases box e baú, cabeceiras, travesseiros e cama & banho Herval. Grande parte a pronta entrega, com entrega e montagem grátis na região."
      />
      <Categories />
      <Products />
      <Guide />
      <BrandMarquee />
      <CtaBand
        title="Quer ver de perto?"
        text="Os modelos estão expostos no showroom para você deitar e comparar. Pelo WhatsApp mandamos valores e condições."
        message="Olá! Vi os produtos no site e gostaria de valores e condições."
        secondary={{ href: routes.contato, label: "Como chegar" }}
      />
    </Shell>
  );
}

export function TecnologiaPage() {
  return (
    <Shell>
      <PageIntro
        crumb="Tecnologia"
        kicker="Tecnologia Pikolin"
        title="O que faz um colchão durar e dar suporte de verdade."
        text="Role para desmontar um Pikolin Cure camada por camada e conhecer as tecnologias que você encontra no nosso showroom."
      />
      <TechLayers />
      <TechHighlights />
      <CtaBand
        title="Sinta a diferença deitando."
        text="Explicar é bom, testar é melhor. Agende uma visita e compare as tecnologias lado a lado."
        message="Olá! Quero agendar uma visita para testar os colchões."
        secondary={{ href: routes.produtos, label: "Ver produtos" }}
      />
    </Shell>
  );
}

export function DuvidasPage() {
  return (
    <Shell>
      <PageIntro
        crumb="Dúvidas"
        kicker="Dúvidas frequentes"
        title="Antes de comprar, é normal perguntar."
        text="Reunimos as perguntas que mais recebemos sobre escolha, garantia, entrega e pagamento."
      />
      <FaqSection />
      <CtaBand
        title="Ainda ficou alguma dúvida?"
        text="Nossa equipe responde pelo WhatsApp e, se preferir, indica o colchão ideal antes da sua visita."
        message="Olá! Tenho uma dúvida sobre os colchões."
        secondary={{ href: routes.contato, label: "Endereço e horários" }}
      />
    </Shell>
  );
}
