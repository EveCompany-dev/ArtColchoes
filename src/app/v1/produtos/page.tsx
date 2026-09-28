import type { Metadata } from "next";
import { ProdutosPage } from "@/versions/v1/Pages";

export const metadata: Metadata = {
  title: "Produtos: colchões, bases, cabeceiras e cama & banho",
  description: "Colchões Pikolin e Mannes, bases box e baú, cabeceiras, travesseiros e cama & banho Herval direto de fábrica em Brusque/SC, com entrega e montagem grátis na região.",
  alternates: { canonical: "/produtos/" },
};

export default function Page() {
  return <ProdutosPage />;
}
