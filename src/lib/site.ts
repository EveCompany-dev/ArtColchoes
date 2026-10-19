// Conteúdo institucional da Art Colchões, extraído do briefing (21/09/2026).
// Contatos, endereço, textos e fotos usados em todo o site.

export const site = {
  name: "Art Colchões",
  tagline: "O Maior Showroom da Região!",
  url: "https://artcolchoes.com.br", // TODO: confirmar domínio
  address: {
    street: "Rodovia Antônio Heil, 5305",
    city: "Brusque",
    state: "SC",
    full: "Rodovia Antônio Heil, 5305 - Brusque/SC",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rodovia+Antonio+Heil+5305+Brusque+SC",
    embed: "https://www.google.com/maps?q=Rodovia+Antonio+Heil,+5305+-+Brusque,+SC&output=embed",
  },
  hours: [
    { days: "Segunda a sexta", time: "9h às 18h" },
    { days: "Sábado", time: "9h às 13h" },
  ],
  hoursNote: "Sem fechar ao meio-dia",
  phone: "(47) 99900-7120",
  whatsapp: "5547999007120",
  email: "brusquecolchoes@gmail.com",
  instagram: { handle: "@artcolchoesbrusque", url: "https://instagram.com/artcolchoesbrusque" },
};

export function whatsappLink(message = "Olá! Vim pelo site da Art Colchões e gostaria de mais informações.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const stats = [
  { value: 4, suffix: "+", label: "anos renovando confortos" },
  { value: 2000, suffix: "+", label: "colchões vendidos" },
  { value: 25, suffix: "+", label: "colchões expostos no showroom" },
  { value: 12, suffix: "", label: "cidades com entrega" },
];

export const differentials = [
  {
    title: "Maior showroom da região",
    text: "Mais de 25 colchões expostos para você deitar, testar e comparar antes de decidir.",
    icon: "showroom",
  },
  {
    title: "Direto de fábrica",
    text: "Condições especiais de pagamento direto de fábrica e as melhores negociações.",
    icon: "factory",
  },
  {
    title: "Entrega e montagem grátis",
    text: "Entregamos e montamos sem custo em Brusque e região.",
    icon: "truck",
  },
  {
    title: "Pronta entrega",
    text: "Grande parte do estoque disponível para levar ou receber em poucos dias.",
    icon: "box",
  },
  {
    title: "Atendimento humanizado",
    text: "Indicamos o conforto ideal de acordo com o seu biotipo e a sua forma de dormir.",
    icon: "heart",
  },
] as const;

// Marcas com logo oficial enviado pelo cliente. Colchões expostos: Pikolin e Mannes.
export const brands = [
  { name: "Pikolin", note: "Líder do descanso na Europa", logo: "/logos/pikolin.svg", featured: true },
  { name: "Mannes", note: "Fabricada no Brasil pela Pikolin", logo: "/logos/mannes.svg" },
  { name: "Herval", note: "Tradição brasileira", logo: "/logos/herval.svg" },
  { name: "D'Angelis", note: "Colchões", logo: "/logos/dangelis.svg" },
];

export const categories = [
  { slug: "colchoes", name: "Colchões", text: "Pikolin e Mannes com molas ensacadas, além de colchões sob medida." },
  { slug: "box", name: "Bases Box", text: "Bases box tradicionais para completar o conjunto." },
  { slug: "bau", name: "Bases Baú", text: "Espaço extra de armazenamento sem abrir mão do conforto." },
  { slug: "cabeceiras", name: "Cabeceiras", text: "Cabeceiras estofadas para deixar o quarto completo." },
  { slug: "travesseiros", name: "Travesseiros", text: "Travesseiros para cada posição de dormir." },
  { slug: "cama-banho", name: "Cama & Banho", text: "Jogos de cama, cobre-leitos e mais, com a Herval." },
];

export const cities = [
  "Brusque", "Guabiruba", "Itajaí", "Gaspar", "Botuverá", "Balneário Camboriú",
  "Camboriú", "Nova Trento", "Penha", "Itapema", "Bombinhas", "Navegantes",
];

export const faq = [
  {
    q: "Qual colchão é ideal para o meu biotipo?",
    a: "Depende do seu peso, altura e posição em que dorme. No showroom você testa mais de 25 modelos e nossa equipe indica a firmeza certa. Pelo WhatsApp também fazemos uma pré-indicação.",
  },
  {
    q: "Quanto tempo dura um colchão de qualidade?",
    a: "Colchões com molas ensacadas e espumas de alta densidade, como as linhas Pikolin, mantêm o suporte por muitos anos. A durabilidade varia por modelo e uso; te explicamos cada caso na loja.",
  },
  {
    q: "Os produtos têm garantia?",
    a: "Sim. Todos os colchões e bases têm garantia de fábrica, com prazo que varia por marca e modelo. Informamos a garantia de cada produto no atendimento.",
  },
  {
    q: "Qual o prazo de entrega?",
    a: "Trabalhamos com produtos a pronta entrega, então na maioria dos casos a entrega é feita em poucos dias. Modelos sob encomenda ou sob medida têm prazo informado na compra.",
  },
  {
    q: "A entrega e a montagem são cobradas?",
    a: "Não. Entrega e montagem são gratuitas para Brusque e região: Guabiruba, Itajaí, Gaspar, Botuverá, Balneário Camboriú, Camboriú, Nova Trento, Penha, Itapema, Bombinhas e Navegantes.",
  },
  {
    q: "Quais são as condições de pagamento?",
    a: "Como somos loja direto de fábrica, conseguimos condições especiais de pagamento. Chame no WhatsApp para uma simulação.",
  },
  {
    q: "Vocês fazem colchão sob medida?",
    a: "Sim, trabalhamos com colchões sob medida. Envie as medidas pelo WhatsApp que fazemos o orçamento.",
  },
];

export const photos = {
  fachada: "/img/fachada-1920.webp",
  fachadaSm: "/img/fachada-960.webp",
  fachadaVertical: "/img/fachada-vertical-960.webp",
  cureSm: "/img/showroom-cure-960.webp",
  denseSm: "/img/showroom-dense-960.webp",
  blackSignatureSm: "/img/black-signature-720.webp",
  blackSignatureDetalhe: "/img/black-signature-detalhe-720.webp",
  showroom: "/img/showroom-hibrido-1440.webp",
  showroomSm: "/img/showroom-hibrido-720.webp",
  camaEstofada: "/img/cama-estofada-720.webp",
  camaBanho: "/img/cama-banho-720.webp",
  roupaDeCama: "/img/roupa-de-cama-720.webp",
  espacoHerval: "/img/espaco-herval-720.webp",
  ambienteBox: "/img/ambiente-box-720.webp",
  baseBau: "/img/base-bau-720.webp",
};

export const video = {
  tour: "/video/tour-showroom.mp4",
  poster: "/video/tour-showroom-poster.webp",
};

// Foto de cada categoria (fotos reais do showroom)
export const categoryPhotos: Record<string, string> = {
  colchoes: photos.blackSignatureSm,
  box: photos.ambienteBox,
  bau: photos.baseBau,
  cabeceiras: photos.denseSm,
  travesseiros: photos.camaEstofada,
  "cama-banho": photos.camaBanho,
};
