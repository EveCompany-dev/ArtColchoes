import type { Metadata, Viewport } from "next";
import { Manrope, Michroma } from "next/font/google";
import "./globals.css";
import { cities, site } from "@/lib/site";

// Michroma é a mais próxima da tipografia do logo (família Microgramma/Eurostile)
const michroma = Michroma({ variable: "--font-michroma", weight: "400", subsets: ["latin"], display: "swap", preload: true });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap", preload: true });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Art Colchões | O Maior Showroom de Colchões da Região - Brusque/SC",
    template: "%s | Art Colchões Brusque",
  },
  description:
    "Loja direto de fábrica em Brusque/SC com mais de 25 colchões expostos: Pikolin, Herval, Mannes e D'angelis. Colchões, bases box e baú, cabeceiras, travesseiros e cama & banho. Entrega e montagem grátis na região.",
  keywords: [
    "colchão", "colchões Brusque", "base baú", "base box", "cama & banho", "cama", "cabeceira",
    "colchão sob medida", "Pikolin", "Herval", "Mannes", "loja de colchões",
    ...cities.map((c) => `colchão ${c}`),
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    images: [{ url: "/img/fachada-1920.webp", width: 1920, height: 2560, alt: "Fachada da Art Colchões em Brusque" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b1630",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${michroma.variable} ${manrope.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
