// Campanha sazonal (briefing: 10.10 já previsto; estrutura reaproveitável para 8.8, Black Friday etc.).
// A página fica fora do ar em src/app/_campanha (pasta com "_" não vira rota).
// Para uma nova campanha: trocar os dados abaixo e seguir o passo a passo do README.

export const campaign = {
  slug: "10-10",
  name: "10.10",
  title: "Semana 10.10 Art Colchões",
  subtitle: "Condições especiais direto de fábrica no maior showroom da região.",
  // início da campanha (horário de Brasília)
  startsAt: "2026-10-10T09:00:00-03:00",
  endsAt: "2026-10-10T18:00:00-03:00",
  // TODO: confirmar ofertas reais com o cliente. Enquanto isso, mostramos "condição especial".
  featured: ["cure", "dense", "equilibrium"],
  perks: [
    "Condições especiais de pagamento",
    "Entrega e montagem grátis em Brusque e região",
    "Produtos a pronta entrega",
  ],
};
