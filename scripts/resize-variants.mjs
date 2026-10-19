// Gera variantes menores (nome-480.webp, nome-720.webp) a partir dos .webp existentes em public/img.
// Nunca amplia e é idempotente (não recria variantes já existentes). Uso: node scripts/resize-variants.mjs
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const dir = path.resolve("public/img");
const targets = [480, 720];
const files = fs.readdirSync(dir).filter((f) => /^(.+)-(\d+)\.webp$/.test(f));

const bySource = new Map(); // base -> { width, file }
for (const f of files) {
  const [, base, w] = f.match(/^(.+)-(\d+)\.webp$/);
  const width = Number(w);
  const cur = bySource.get(base);
  if (!cur || width > cur.width) bySource.set(base, { width, file: f });
}

for (const [base, src] of bySource) {
  for (const w of targets) {
    const out = path.join(dir, `${base}-${w}.webp`);
    if (w >= src.width || fs.existsSync(out)) continue;
    await sharp(path.join(dir, src.file)).resize({ width: w, withoutEnlargement: true }).webp({ quality: 76 }).toFile(out);
    console.log("gerado", path.basename(out));
  }
}
