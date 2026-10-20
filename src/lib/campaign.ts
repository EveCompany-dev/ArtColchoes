// Campanha sazonal (briefing: 10.10 já previsto; estrutura reaproveitável para 8.8, Black Friday etc.).
// A página fica fora do ar em src/app/_campanha (pasta com "_" não vira rota).
// Para uma nova campanha: trocar os dados abaixo e seguir o passo a passo do README.
//
// Formato baseado nas campanhas reais da loja no Instagram (@artcolchoesbrusque):
// - 8.8 (08/08/2026): "8 ofertas imperdíveis", até 10x sem juros, horário especial no fim de semana
//   (sábado 8h às 20h, domingo 10h às 15h).
// - Mês do Cliente (12 e 13/09/2026): ofertas "de/por" com medida, entrega e montagem grátis.
// 10/10/2026 cai num sábado: a campanha foi montada como fim de semana (10 e 11/10), igual ao 8.8.

export type Offer = {
  title: string;
  size: string;
  from: number;
  to: number;
  note?: string;
};

export const campaign = {
  slug: "10-10",
  name: "10.10",
  title: "Semana 10.10 Art Colchões",
  subtitle: "Condições exclusivas direto de fábrica no maior showroom da região. Só neste fim de semana.",
  // horário de Brasília
  startsAt: "2026-10-10T08:00:00-03:00",
  endsAt: "2026-10-11T15:00:00-03:00",
  hours: [
    { day: "Sábado 10/10", time: "8h às 20h" },
    { day: "Domingo 11/10", time: "10h às 15h" },
  ],
  installments: 10,
  // TODO: ofertas reais da 10.10 ainda não existem. As abaixo repetem as do Mês do Cliente (12 e 13/09)
  // só para o layout; enquanto `preview` for true a página mostra um aviso de "ofertas de exemplo".
  preview: true,
  offers: [
    { title: "Colchão casal molas ensacadas", size: "138 x 188", from: 2399, to: 1399 },
    { title: "Conjunto Queen colchão + box", size: "158 x 198", from: 3999, to: 2499 },
    { title: "Colchão casal + base baú Linha Premium", size: "138 x 188", from: 4899, to: 2899, note: "Tecido da base personalizável" },
    { title: "Colchão Queen + base baú Premium", size: "158 x 198", from: 5999, to: 3999 },
  ] satisfies Offer[],
  featured: ["cure", "black-signature", "activeness"],
  perks: [
    "Até 10x sem juros no cartão",
    "Entrega e montagem grátis em Brusque e região",
    "Condições exclusivas direto de fábrica",
    "Produtos a pronta entrega",
  ],
};

export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: v % 1 ? 2 : 0 });
