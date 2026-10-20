// <Img name="/img/showroom-hibrido" sizes="(min-width:1024px) 50vw, 100vw" alt="..." className="..." />
// `name` aceita a base ("/img/foto") ou o caminho de uma variante ("/img/foto-720.webp", como em `photos`).
// srcSet, width e height (evita CLS) saem do mapa `available` abaixo; passe `widths`/`width`/`height` para sobrescrever.
// Rode `node scripts/resize-variants.mjs` ao adicionar fotos e atualize `available`. priority = eager + fetchPriority="high" (só a imagem LCP).
import type { ImgHTMLAttributes } from "react";

type Meta = { widths: number[]; ratio: number };

// ratio = altura / largura da foto original
const available: Record<string, Meta> = {
  "ambiente-box": { widths: [480, 720], ratio: 1087 / 720 },
  "base-bau": { widths: [480, 720], ratio: 1280 / 720 },
  "black-signature": { widths: [480, 720], ratio: 1280 / 720 },
  "black-signature-detalhe": { widths: [480, 720], ratio: 960 / 720 },
  "cama-banho": { widths: [480, 720], ratio: 960 / 720 },
  "cama-estofada": { widths: [480, 720], ratio: 1279 / 720 },
  "espaco-herval": { widths: [480, 720], ratio: 960 / 720 },
  "roupa-de-cama": { widths: [480, 720], ratio: 1280 / 720 },
  fachada: { widths: [480, 720, 960, 1920], ratio: 2560 / 1920 },
  "fachada-vertical": { widths: [480, 720, 960], ratio: 1707 / 960 },
  "showroom-cure": { widths: [480, 720, 960], ratio: 1280 / 960 },
  "showroom-dense": { widths: [480, 720, 960], ratio: 1173 / 960 },
  "showroom-hibrido": { widths: [480, 720, 1440], ratio: 1920 / 1440 },
  // fotos de produto (scripts/prepare-catalog.mjs): os cards nunca passam de ~450px, 720 cobre tela 2x
  "produto-bless": { widths: [480, 720], ratio: 1014 / 1352 },
  "produto-bold": { widths: [480, 720], ratio: 1080 / 1440 },
  "produto-mind": { widths: [480, 720], ratio: 1024 / 1365 },
  "produto-nova-york": { widths: [480, 720], ratio: 715 / 1240 },
  "produto-signature-medium": { widths: [480, 720], ratio: 1055 / 1406 },
};

export type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height" | "alt"> & {
  name: string;
  alt: string;
  widths?: number[];
  width?: number;
  height?: number;
  priority?: boolean;
};

export function Img({ name, alt, widths, width, height, priority = false, sizes = "100vw", loading, decoding = "async", ...rest }: ImgProps) {
  const base = name.replace(/\.webp$/, "").replace(/-\d+$/, "");
  const meta = available[base.split("/").pop() ?? ""];
  const list = [...(widths ?? meta?.widths ?? [])].sort((a, b) => a - b);
  const largest = list[list.length - 1];

  if (!list.length) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={name} alt={alt} width={width} height={height} sizes={sizes} loading={priority ? "eager" : (loading ?? "lazy")} decoding={decoding} fetchPriority={priority ? "high" : undefined} {...rest} />;
  }

  const w = width ?? largest;
  const h = height ?? (meta ? Math.round(w * meta.ratio) : undefined);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${base}-${largest}.webp`}
      srcSet={list.map((x) => `${base}-${x}.webp ${x}w`).join(", ")}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
      loading={priority ? "eager" : (loading ?? "lazy")}
      decoding={decoding}
      fetchPriority={priority ? "high" : undefined}
      {...rest}
    />
  );
}

export default Img;
