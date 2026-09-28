import { useId } from "react";
import type { Layer } from "@/lib/products";

// Colchão isométrico desenhado em SVG. Cada camada é um <g class="iso-layer">
// para que o GSAP possa "explodir" o colchão movendo as camadas no eixo Y.
//
// Projeção: X = (x - y) * cos30, Y = (x + y) * sin30 - z

const C = Math.cos(Math.PI / 6);
const S = 0.5;
const W = 360; // largura (eixo x)
const D = 240; // profundidade (eixo y)

const p = (x: number, y: number, z: number) => [(x - y) * C, (x + y) * S - z] as const;
const pts = (...list: (readonly [number, number])[]) => list.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");

// camadas de baixo para cima (ordem de desenho), mantendo o índice original (0 = topo)
function stackLayers(layers: Layer[]) {
  const out: { l: Layer; i: number; zb: number; zt: number }[] = [];
  let z = 0;
  for (let i = layers.length - 1; i >= 0; i--) {
    out.push({ l: layers[i], i, zb: z, zt: z + layers[i].t });
    z += layers[i].t;
  }
  return out;
}

type Props = {
  layers: Layer[];
  /** espaço extra no topo do viewBox para as camadas separadas */
  explodeRoom?: number;
  badges?: boolean;
  className?: string;
  title?: string;
  badgeColor?: string;
};

export default function IsoMattress({ layers, explodeRoom = 0, badges = false, className, title, badgeColor = "#0b1630" }: Props) {
  const uid = useId().replace(/:/g, "");
  const total = layers.reduce((s, l) => s + l.t, 0);
  const minX = -D * C - 40;
  const maxX = W * C + 10;
  const minY = -total - explodeRoom - 20;
  const maxY = (W + D) * S + 10;

  const stack = stackLayers(layers);

  return (
    <svg
      viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
      className={className}
      role="img"
      aria-label={title ?? `Colchão com ${layers.length} camadas`}
    >
      <defs>
        <pattern id={`dots-${uid}`} width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.9" fill="#000" opacity="0.13" />
          <circle cx="5.5" cy="5" r="0.6" fill="#000" opacity="0.09" />
        </pattern>
        <pattern id={`mesh-${uid}`} width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M0 5L5 0" stroke="#000" strokeOpacity="0.1" strokeWidth="0.7" />
        </pattern>
        <linearGradient id={`shine-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* sombra no chão */}
      <ellipse cx={(W - D) * C * 0.5} cy={(W + D) * S * 0.5 + 18} rx={W * 0.78} ry={W * 0.26} fill="#0b1630" opacity="0.07" className="iso-shadow" />

      {stack.map(({ l, i, zb, zt }) => {
        const top = pts(p(0, 0, zt), p(W, 0, zt), p(W, D, zt), p(0, D, zt));
        const left = pts(p(0, D, zb), p(W, D, zb), p(W, D, zt), p(0, D, zt));
        const right = pts(p(W, 0, zb), p(W, D, zb), p(W, D, zt), p(W, 0, zt));
        const tex = l.pattern === "foam" || l.pattern === "dots" ? `url(#dots-${uid})` : l.pattern === "mesh" ? `url(#mesh-${uid})` : null;
        const zm = (zb + zt) / 2;
        const [bx, by] = p(W * 0.02, D, zm);

        return (
          <g key={i} className="iso-layer" data-index={i}>
            <polygon points={left} fill={l.left} stroke="#0b1630" strokeOpacity="0.1" strokeWidth="0.8" />
            <polygon points={right} fill={l.right} stroke="#0b1630" strokeOpacity="0.1" strokeWidth="0.8" />
            {tex && <polygon points={left} fill={tex} />}
            {tex && <polygon points={right} fill={tex} />}
            <polygon points={top} fill={l.top} stroke="#0b1630" strokeOpacity="0.12" strokeWidth="0.8" />
            {tex && <polygon points={top} fill={tex} opacity="0.7" />}
            <polygon points={top} fill={`url(#shine-${uid})`} />

            {l.pattern === "springs" && <Springs zb={zb} zt={zt} />}
            {l.pattern === "quilt" && <Quilt z={zt} />}

            {badges && (
              <g className="iso-badge" transform={`translate(${bx - 26} ${by})`}>
                <line x1="12" y1="0" x2="26" y2="0" stroke={badgeColor} strokeOpacity="0.5" />
                <circle r="11" fill={badgeColor} />
                <text textAnchor="middle" dy="4" fontSize="11" fontWeight="700" fill="#fff">
                  {i + 1}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Springs({ zb, zt }: { zb: number; zt: number }) {
  const turns = 6;
  const coil = (x: number, y: number, dx: number, dy: number) => {
    const h = zt - zb - 6;
    const path: string[] = [];
    for (let k = 0; k <= turns * 2; k++) {
      const zz = zb + 3 + (h * k) / (turns * 2);
      const off = k % 2 === 0 ? -4.5 : 4.5;
      const [X, Y] = p(x + dx * off, y + dy * off, zz);
      path.push(`${k === 0 ? "M" : "L"}${X.toFixed(1)} ${Y.toFixed(1)}`);
    }
    return path.join("");
  };
  const step = 18;
  const leftCoils = Array.from({ length: Math.floor(W / step) }, (_, k) => coil(step / 2 + k * step, D, 1, 0));
  const rightCoils = Array.from({ length: Math.floor(D / step) }, (_, k) => coil(W, step / 2 + k * step, 0, 1));
  // topo das molas (visível quando a camada de cima se afasta)
  const tops: [number, number][] = [];
  for (let x = step / 2; x < W; x += step) for (let y = step / 2; y < D; y += step) tops.push([x, y]);

  return (
    <g className="iso-springs">
      {tops.map(([x, y], k) => {
        const [X, Y] = p(x, y, zt);
        const center = x > W * 0.3 && x < W * 0.7; // zona central reforçada
        return <ellipse key={k} cx={X} cy={Y} rx="7.4" ry="4.3" fill="none" stroke={center ? "#c0392b" : "#8a93a1"} strokeWidth="1.3" />;
      })}
      {leftCoils.map((d, k) => (
        <path key={`l${k}`} d={d} fill="none" stroke="#7d8694" strokeWidth="1.4" strokeLinejoin="round" />
      ))}
      {rightCoils.map((d, k) => (
        <path key={`r${k}`} d={d} fill="none" stroke="#6b7482" strokeWidth="1.4" strokeLinejoin="round" />
      ))}
    </g>
  );
}

function Quilt({ z }: { z: number }) {
  const step = 36;
  const tufts: [number, number][] = [];
  for (let x = step / 2; x < W; x += step) for (let y = step / 2; y < D; y += step) tufts.push([x, y]);
  const inset = 10;
  const edge = pts(p(inset, inset, z), p(W - inset, inset, z), p(W - inset, D - inset, z), p(inset, D - inset, z));
  return (
    <g className="iso-quilt">
      <polygon points={edge} fill="none" stroke="#b8894f" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="3 3" />
      {tufts.map(([x, y], k) => {
        const [X, Y] = p(x, y, z);
        return (
          <g key={k}>
            <ellipse cx={X} cy={Y + 1.5} rx="5" ry="2.6" fill="#000" opacity="0.08" />
            <ellipse cx={X} cy={Y} rx="3.2" ry="1.8" fill="#c7925a" opacity="0.8" />
          </g>
        );
      })}
    </g>
  );
}

/** Colchão simples (pillow top + corpo + base box) para miniaturas de produto. */
export function productLayers(top: string, side: string): Layer[] {
  return [
    { name: "Pillow top", short: "", text: "", t: 14, top, left: shade(top, -6), right: shade(top, -12), pattern: "quilt" },
    { name: "Corpo", short: "", text: "", t: 40, top: shade(side, 10), left: side, right: shade(side, -10), pattern: "mesh" },
    { name: "Base", short: "", text: "", t: 46, top: shade(side, -4), left: shade(side, -14), right: shade(side, -22), pattern: "mesh" },
  ];
}

function shade(hex: string, pct: number) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c: number) => Math.max(0, Math.min(255, Math.round(c + (pct / 100) * (pct < 0 ? c : 255 - c))));
  const r = f(n >> 16), g = f((n >> 8) & 255), b = f(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
