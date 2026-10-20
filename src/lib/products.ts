// Colchões expostos na loja (lista enviada pelo cliente em 23/09/2026).
// Especificações: sites oficiais pikolin.com.br e mannes.com.br e lâminas de catálogo
// enviadas pela loja (assets-cliente/catalogo). Nova York não informa firmeza: "Consultar".
// Fotos "produto-*": recortes das lâminas, gerados por scripts/prepare-catalog.mjs.

export type Firmness = "Extra Plush" | "Plush" | "Medium" | "Firm" | "Extra Firm";

export type Product = {
  slug: string;
  name: string;
  brand: "Pikolin" | "Mannes";
  line: string;
  category: "colchoes" | "box" | "bau" | "cabeceiras" | "travesseiros" | "cama-banho";
  height?: number;
  firmness?: Firmness;
  spring?: string;
  support?: string;
  techs: string[];
  tagline: string;
  sizes: string[];
  warranty: string;
  photo?: string;
  // cores usadas na ilustração isométrica quando não há foto
  tone: { top: string; side: string };
};

// TODO: confirmar com a loja as medidas disponíveis de cada modelo
const sizes = ["Casal 138x188", "Queen 158x198", "King 193x203"];

export const firmnessScale: Firmness[] = ["Extra Plush", "Plush", "Medium", "Firm", "Extra Firm"];
export const firmnessLabel: Record<Firmness, string> = {
  "Extra Plush": "Extra macio",
  Plush: "Macio",
  Medium: "Médio",
  Firm: "Firme",
  "Extra Firm": "Extra firme",
};

export const products: Product[] = [
  // ---------------- Pikolin ----------------
  {
    slug: "black-signature", name: "Black Signature Medium", brand: "Pikolin", line: "Black Signature Collection", category: "colchoes",
    height: 30, firmness: "Medium", spring: "Cross System", support: "250kg",
    techs: ["Pillow top", "Reactive", "Cool Touch", "High Support", "Health Protection", "Air Flow Support"],
    tagline: "A coleção mais exclusiva da Pikolin no showroom", sizes, warranty: "Consultar",
    photo: "/img/produto-signature-medium-720.webp", tone: { top: "#2a2f3a", side: "#1c2340" },
  },
  {
    slug: "cure", name: "Cure", brand: "Pikolin", line: "Copper System", category: "colchoes",
    height: 33, firmness: "Medium", spring: "Cross System", support: "250kg",
    techs: ["Copper Fabric", "Injected Gel Memory Foam", "Cool Touch", "Air Flow Support"],
    tagline: "O efeito curativo de um sono ideal", sizes, warranty: "Consultar",
    photo: "/img/showroom-cure-960.webp", tone: { top: "#f3ede4", side: "#cfc9c0" },
  },
  {
    slug: "dense", name: "Dense", brand: "Pikolin", line: "Copper System", category: "colchoes",
    height: 33, firmness: "Firm", spring: "Cross System", support: "250kg",
    techs: ["Copper Fabric", "Cool Touch", "Air Flow Support"],
    tagline: "Firmeza com frescor a noite toda", sizes, warranty: "Consultar",
    photo: "/img/showroom-dense-960.webp", tone: { top: "#f1ece3", side: "#c9c4bb" },
  },
  {
    slug: "bold", name: "Bold", brand: "Pikolin", line: "Copper System", category: "colchoes",
    height: 31, firmness: "Firm", spring: "Cross System", support: "250kg",
    techs: ["Copper Fabric", "Cool Touch", "High Support", "Air Flow Support"],
    tagline: "Estabilidade e firmeza com conforto e suporte", sizes, warranty: "Consultar",
    photo: "/img/produto-bold-720.webp", tone: { top: "#f2ede5", side: "#b8885f" },
  },
  {
    slug: "balance", name: "Balance", brand: "Pikolin", line: "Flow System", category: "colchoes",
    height: 32, firmness: "Medium", spring: "Cross System", support: "250kg",
    techs: ["Malha SensICE e Intense", "Gel Memory Foam", "Cool Touch", "Fresh Sense"],
    tagline: "Sonhos repletos de conforto e frescor", sizes, warranty: "Consultar",
    tone: { top: "#eef1f5", side: "#8e97a6" },
  },
  {
    slug: "equilibrium", name: "Equilibrium", brand: "Pikolin", line: "Health System", category: "colchoes",
    height: 30, firmness: "Medium", spring: "Normablock® Pro", support: "250kg",
    techs: ["Purotex® probióticos", "Cool Touch", "Reactive"],
    tagline: "Sono e saúde em sintonia", sizes, warranty: "Consultar",
    tone: { top: "#f4f4f1", side: "#b9b2a6" },
  },
  {
    slug: "activeness", name: "Activeness", brand: "Pikolin", line: "Health System", category: "colchoes",
    height: 30, firmness: "Firm", spring: "Normablock® Pro", support: "250kg",
    techs: ["Normablock® Pro 250kg", "Tri Zone Support", "Purotex® probióticos", "Cool Touch"],
    tagline: "Para quem acorda com energia", sizes, warranty: "Consultar",
    tone: { top: "#eef0f2", side: "#56627a" },
  },
  // ---------------- Mannes (fabricada no Brasil pela Pikolin) ----------------
  {
    slug: "inspire", name: "Inspire Macio", brand: "Mannes", line: "Molas Ensacadas", category: "colchoes",
    height: 28, firmness: "Plush", spring: "Molas ensacadas", support: "150kg",
    techs: ["Hyper Cell", "Gel Sense", "Reactive", "Air Flow Support"],
    tagline: "Planejado para um conforto muito macio", sizes, warranty: "Consultar",
    tone: { top: "#f6f3ee", side: "#c9bfb2" },
  },
  {
    slug: "bless", name: "Bless", brand: "Mannes", line: "Molas Ensacadas", category: "colchoes",
    height: 30, firmness: "Firm", spring: "Molas ensacadas 18cm", support: "150kg",
    techs: ["Malha Viscose", "Gel Sense", "High Support", "Health Protection antiácaro", "Air Flow Support"],
    tagline: "O toque supremo de firmeza para o seu sono", sizes, warranty: "Consultar",
    photo: "/img/produto-bless-720.webp", tone: { top: "#f4f2ee", side: "#a8a397" },
  },
  {
    slug: "mind", name: "Mind", brand: "Mannes", line: "Molas Ensacadas", category: "colchoes",
    height: 25, firmness: "Firm", spring: "Molas ensacadas 18cm", support: "150kg",
    techs: ["Malha Soft", "Gel Sense", "Ultra High Support", "Health Protection", "Air Flow Support"],
    tagline: "Planejado para um conforto estável", sizes, warranty: "Consultar",
    photo: "/img/produto-mind-720.webp", tone: { top: "#f1f1ef", side: "#7d8694" },
  },
  {
    slug: "nova-york", name: "Nova York", brand: "Mannes", line: "Linha Sky", category: "colchoes",
    height: 32, spring: "Molas ensacadas 18cm", support: "120kg",
    techs: ["Lateral em suede", "Health Protection", "Air Flow Support", "Homologado"],
    tagline: "Conforto e sofisticação da linha Sky", sizes, warranty: "Consultar",
    photo: "/img/produto-nova-york-720.webp", tone: { top: "#f3f0ea", side: "#3a4660" },
  },
];

// Composição por camadas do Pikolin Cure (fonte: pikolin.com.br/produto/cure),
// usada no explicador de tecnologia estilo "exploded view".
export type Layer = {
  name: string;
  short: string;
  text: string;
  t: number; // espessura relativa
  top: string;
  left: string;
  right: string;
  pattern?: "quilt" | "springs" | "dots" | "foam" | "mesh";
};

export const cureLayers: Layer[] = [
  { name: "Tecido Copper Fabric", short: "Copper Fabric", t: 16, top: "#f5efe6", left: "#e6ddd0", right: "#d6ccbd", pattern: "quilt",
    text: "Tecido com fios de cobre que reflete o calor do ambiente sem absorvê-lo e dissipa a transpiração. O cobre tem ação antibacteriana e antifúngica." },
  { name: "Fibra Siliconada", short: "Fibra", t: 7, top: "#ffffff", left: "#eceef0", right: "#dde0e4", pattern: "mesh",
    text: "Camada macia e respirável que dá volume ao pillow top e mantém o toque aveludado por mais tempo." },
  { name: "Injected Gel Memory Foam", short: "Gel Memory", t: 12, top: "#8fd3e8", left: "#6dbfd8", right: "#58abc5", pattern: "dots",
    text: "Espuma viscoelástica com gel que se molda ao corpo e reduz os pontos de pressão em ombros, quadris e joelhos, voltando à forma original." },
  { name: "Espuma Cool Touch", short: "Cool Touch", t: 12, top: "#2fc6c2", left: "#22aaa7", right: "#1b928f", pattern: "foam",
    text: "Espuma de contato com toque de frescor que promove conforto térmico durante toda a noite." },
  { name: "Tecido Retentor", short: "Retentor", t: 4, top: "#d9dde3", left: "#c3c8cf", right: "#b3b8c0",
    text: "Separa e estabiliza as camadas de conforto, mantendo o colchão uniforme ao longo dos anos." },
  { name: "Espuma Reactive", short: "Reactive", t: 12, top: "#b9a8e0", left: "#a391cf", right: "#8f7dbd", pattern: "foam",
    text: "Espuma de alta resiliência que acompanha os contornos do corpo sem criar pressão excessiva." },
  { name: "Mola Cross System 250kg", short: "Cross System", t: 46, top: "#f2f2f2", left: "#e4e4e4", right: "#d2d2d2", pattern: "springs",
    text: "Molas ensacadas com centro reforçado em três zonas para alinhar a coluna. O maior suporte comprovado em molas ensacadas do mercado: 250kg por pessoa." },
  { name: "Borda Air Flow Support", short: "Air Flow", t: 6, top: "#8f9aa8", left: "#7c8796", right: "#6b7684", pattern: "mesh",
    text: "Borda que facilita a circulação de ar em toda a superfície do colchão, mantendo-o fresco e higiênico." },
  { name: "Espuma de Suporte", short: "Suporte", t: 14, top: "#e6d6b8", left: "#d6c39f", right: "#c4b08a", pattern: "foam",
    text: "Base firme que sustenta todo o conjunto e garante estabilidade nas bordas." },
  { name: "Tecido Antiderrapante", short: "Antiderrapante", t: 5, top: "#5c6470", left: "#4b525d", right: "#3d434c", pattern: "mesh",
    text: "Mantém o colchão firme sobre a base, sem escorregar." },
];

export const techHighlights = [
  {
    name: "Cross System 250kg",
    kicker: "Molas ensacadas",
    text: "Centro reforçado em três zonas que alinha a coluna. O maior suporte comprovado em molas ensacadas do mercado.",
    metric: "250kg",
    metricLabel: "de suporte por pessoa",
  },
  {
    name: "Normablock® Pro",
    kicker: "Mola contínua exclusiva",
    text: "Molas em Z com zona central reforçada e fio contínuo com tratamento térmico. Mais durabilidade e firmeza lombar.",
    metric: "3",
    metricLabel: "zonas de suporte",
  },
];
