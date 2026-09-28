import type { Metadata } from "next";
import { faq } from "@/lib/site";
import { DuvidasPage } from "@/versions/v1/Pages";

export const metadata: Metadata = {
  title: "Dúvidas frequentes",
  description: "Garantia, prazo de entrega, montagem, pagamento e como escolher o colchão ideal para o seu biotipo. Respostas da Art Colchões, Brusque/SC.",
  alternates: { canonical: "/duvidas/" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <DuvidasPage />
    </>
  );
}
