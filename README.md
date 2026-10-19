# Art Colchões · site institucional

Next.js 16 (App Router) + Tailwind v4 + GSAP 3.15 (ScrollTrigger, ScrollSmoother, SplitText, Flip, DrawSVG).
Export estático: roda na Vercel ou em qualquer hospedagem de arquivos (Hostinger).

## Rotas

| Rota | O que é |
| --- | --- |
| `/` | Home: hero, marcas, diferenciais, showroom, sobre e contato |
| `/produtos/` | Categorias, catálogo com filtro e guia de firmeza |
| `/tecnologia/` | Explicador das camadas do colchão (Pikolin Cure) |
| `/duvidas/` | Perguntas frequentes (com FAQPage no JSON-LD) |

### Landing de campanha (modelo)

A landing de campanha (8.8, 10.10, Black Friday...) está fora do ar, guardada como modelo em
`src/app/_campanha/`: pastas que começam com `_` não viram rota no Next.js. Para uma nova campanha:

1. Trocar os dados em `src/lib/campaign.ts` (`name`, `title`, `startsAt`, `endsAt`, `featured`, `perks`).
2. Renomear a pasta `src/app/_campanha` para `src/app/campanha` (a página fica em `/campanha/`).
3. Adicionar `/campanha/` em `src/app/sitemap.ts`.
4. Depois do fim, voltar a pasta para `_campanha` e tirar do sitemap. Até lá, a página já muda sozinha
   para "terminou" quando passa do `endsAt`.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Onde editar o conteúdo

- `src/lib/site.ts`: contatos, endereço, horários, diferenciais, marcas, cidades e FAQ (tudo do briefing)
- `src/views/`: seções e páginas do site (`Home.tsx`, `Pages.tsx`, `Sections.tsx`); rotas e menu em `ui.tsx`
- `src/lib/products.ts`: catálogo (**placeholder** com a linha Pikolin) e camadas do explicador de tecnologia
- `src/lib/campaign.ts`: dados da campanha (data, título, produtos em destaque)
- `public/img/`: fotos otimizadas. Para regerar a partir dos originais: `node scripts/prepare-images.mjs`

## Deploy

### Vercel
Importar o repositório: o preset Next.js detecta tudo sozinho (`output: "export"` já está configurado).

### Hostinger (hospedagem compartilhada)
```bash
npm run build
```
Enviar o **conteúdo** da pasta `out/` para `public_html/`. Como está com `trailingSlash: true`,
cada rota vira `rota/index.html` e funciona no Apache sem configuração extra.

## Preview na rede local

```bash
npm run build
npx serve out -l tcp://0.0.0.0:4000
```
Abrir `http://<ip-da-máquina>:4000` no celular (mesma rede Wi-Fi).

## Pendências com o cliente

- Fotos de produto dos modelos sem foto (Bold, Balance, Equilibrium, Activeness, Inspire, Bless, Mind, Nova York): hoje aparece uma ilustração
- Ficha do Black Signature Medium e do Nova York (altura, firmeza e suporte não são públicos)
- Medidas disponíveis e garantia de cada modelo
- Confirmar se Herval e D'Angelis entram só como marcas de cama & banho/bases (os colchões expostos informados são Pikolin e Mannes)
- Instagram integrado: precisa de token da Graph API ou de um widget (Behold/Elfsight)
- Domínio definitivo (`site.url` em `src/lib/site.ts`)
- Logo da Art Colchões em vetor (o PDF "Logo pdf atualizada" enviado é o da D'Angelis)
