import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import V1 from "@/versions/v1/V1";

export const metadata: Metadata = {
  title: "O Maior Showroom de Colchões da Região",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <JsonLd withFaq={false} />
      <V1 />
    </>
  );
}
