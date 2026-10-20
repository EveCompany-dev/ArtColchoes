// Recorta as fotos de produto das lâminas de catálogo (PDFs das fabricantes, exportados
// como PNG em ../assets-cliente/catalogo) e remove o fundo liso, mantendo a sombra
// como transparência. Assim o colchão fica sobre o fundo do próprio card do site.
//
//   node scripts/prepare-catalog.mjs
import sharp from "sharp";
import path from "node:path";

const src = path.resolve("../assets-cliente/catalogo");
const out = path.resolve("public/img");

// crop em pixels da lâmina (1920 de largura). cutout: false mantém a foto inteira (ambientada).
// hue: tolerância de cromaticidade em relação ao fundo (fundo pêssego da Mannes pede menos).
const mannes = { hue: 0.012, lift: 4 };
const pikolin = { hue: 0.03, lift: 12 };
const items = [
  { file: "mannes-colchao-bless", name: "bless", crop: [230, 370, 1460, 780], ...mannes },
  { file: "mannes-colchao-mind", name: "mind", crop: [230, 370, 1460, 780], ...mannes },
  { file: "pikolin-colchao-bold", name: "bold", crop: [230, 480, 1460, 860], ...pikolin },
  { file: "pikolin-colchao-signature-medium", name: "signature-medium", crop: [300, 1300, 1320, 760], ...pikolin },
  { file: "mannes-colchao-nova-york", name: "nova-york", crop: [340, 420, 1240, 715], cutout: false },
];

const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

function cutout(data, w, h, { hue: hueTol, lift }) {
  const px = (i) => [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]];
  const chroma = ([r, g, b]) => { const s = r + g + b + 1; return [r / s, g / s]; };
  const refIdx = new Int32Array(w * h).fill(-1); // pixel de borda que originou o fundo
  const queue = [];
  for (let x = 0; x < w; x++) for (const y of [0, h - 1]) queue.push(y * w + x);
  for (let y = 0; y < h; y++) for (const x of [0, w - 1]) queue.push(y * w + x);
  for (const i of queue) refIdx[i] = i;
  for (let q = 0; q < queue.length; q++) {
    const i = queue[q];
    const p = px(i), ref = px(refIdx[i]), rc = chroma(ref), lr = lum(...ref);
    const x = i % w, y = (i / w) | 0;
    for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      const j = ny * w + nx;
      if (refIdx[j] !== -1) continue;
      const c = px(j);
      const step = Math.abs(c[0] - p[0]) + Math.abs(c[1] - p[1]) + Math.abs(c[2] - p[2]);
      const cc = chroma(c);
      const hue = Math.abs(cc[0] - rc[0]) + Math.abs(cc[1] - rc[1]);
      if (step < 14 && hue < hueTol && lum(...c) <= lr + lift) {
        refIdx[j] = refIdx[i];
        queue.push(j);
      }
    }
  }
  // pontinhos isolados (ruído/dither do fundo) que o flood fill não alcançou
  for (let pass = 0; pass < 3; pass++) {
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      if (refIdx[i] !== -1) continue;
      let n = 0, ref = -1;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const r = refIdx[i + dy * w + dx];
        if (r !== -1) { n++; ref = r; }
      }
      if (n >= 5) refIdx[i] = ref;
    }
  }
  // fundo vira preto com alfa = quanto ele escureceu em relação ao fundo original (sombra)
  for (let i = 0; i < w * h; i++) {
    if (refIdx[i] === -1) continue;
    const l = lum(...px(i)), lr = lum(...px(refIdx[i]));
    const a = Math.max(0, Math.min(1, 1 - l / lr)) * 0.9;
    data[i * 4] = data[i * 4 + 1] = data[i * 4 + 2] = 0;
    data[i * 4 + 3] = Math.round(a * 255);
  }
  return data;
}

for (const it of items) {
  const [left, top, width, height] = it.crop;
  let img = sharp(path.join(src, `${it.file}.png`)).extract({ left, top, width, height }).ensureAlpha();
  if (it.cutout !== false) {
    const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
    img = sharp(cutout(data, info.width, info.height, it), { raw: { width: info.width, height: info.height, channels: 4 } })
      .trim({ threshold: 1 });
    // respiro para caber no card 4:3 sem encostar nas bordas
    const buf = await img.png().toBuffer();
    const m = await sharp(buf).metadata();
    const W = Math.round(Math.max(m.width * 1.12, m.height * 1.12 * (4 / 3)));
    const H = Math.round(W * 0.75);
    img = sharp(buf).extend({
      left: Math.floor((W - m.width) / 2), right: Math.ceil((W - m.width) / 2),
      top: Math.floor((H - m.height) * 0.55), bottom: Math.ceil((H - m.height) * 0.45),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });
  }
  const buf = await img.png().toBuffer();
  for (const w of [720, 1440]) {
    await sharp(buf).resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82, alphaQuality: 90 }).toFile(path.join(out, `produto-${it.name}-${w}.webp`));
  }
  console.log("ok", it.name);
}
