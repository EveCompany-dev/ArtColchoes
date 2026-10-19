import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Home from "@/views/Home";

// Título: o padrão do layout (o template "%s | Art Colchões Brusque" não vale para a raiz)
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <JsonLd withFaq={false} />
      <Home />
    </>
  );
}
