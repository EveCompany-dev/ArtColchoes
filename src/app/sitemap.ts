import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// Campanha ativa? Adicionar `${site.url}/campanha/` aqui (ver README).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/produtos/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/tecnologia/`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/duvidas/`, changeFrequency: "yearly", priority: 0.6 },
  ];
}
