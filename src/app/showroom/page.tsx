import type { Metadata } from "next";
import { ShowroomVersionB } from "@/views/ShowroomConcepts";

export const metadata: Metadata = {
  title: "Showroom · Conceito B",
  description: "Proposta imersiva para apresentar o showroom da Art Colchões em Brusque.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ShowroomVersionB />;
}
