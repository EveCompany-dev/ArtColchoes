import type { Metadata } from "next";
import { campaign } from "@/lib/campaign";
import Campaign from "./Campaign";

export const metadata: Metadata = {
  title: `${campaign.title} | Ofertas em colchões em Brusque`,
  description: `${campaign.subtitle} Colchões Pikolin, Herval, Mannes e D'angelis com entrega e montagem grátis.`,
};

export default function Page() {
  return <Campaign />;
}
