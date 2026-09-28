import type { Metadata } from "next";
import { TecnologiaPage } from "@/versions/v1/Pages";

export const metadata: Metadata = {
  title: "Tecnologia dos colchões Pikolin",
  description: "Conheça por dentro um colchão Pikolin: molas ensacadas Cross System, Normablock Pro e tecido Copper System. Teste no showroom da Art Colchões em Brusque/SC.",
  alternates: { canonical: "/tecnologia/" },
};

export default function Page() {
  return <TecnologiaPage />;
}
