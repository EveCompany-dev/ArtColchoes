# Art Colchões · site institucional

Next.js 16 (App Router) + Tailwind v4 + GSAP 3.15 (ScrollTrigger, ScrollSmoother, SplitText, Flip, DrawSVG).
Export estático: roda na Vercel ou em qualquer hospedagem de arquivos (Hostinger).

## Rotas

| Rota | O que é |
| --- | --- |
| `/` | Página interna de revisão com as direções criativas |
| `/v1/` | Showroom Editorial, agora no tema noturno da v2 e multipágina (home + `/v1/produtos/`, `/v1/tecnologia/`, `/v1/duvidas/`) |
| `/v2/` | Noite Profunda: escuro, imersivo, azul |
| `/v3/` | Tipografia Bold: areia + preto + azul elétrico |
| `/campanha/` | Landing de campanha (10.10) com contagem regressiva |

Depois que o cliente aprovar uma versão, mover o conteúdo dela para `src/app/page.tsx`,
apagar as outras e remover o bloqueio de `/v1..v3` em `src/app/robots.ts`.
Na v1, as rotas ficam em `src/versions/v1/ui.tsx` (`BASE`): trocar para `""` ao promover para a raiz,
mover `src/app/v1/*` para `src/app/*` e incluir as páginas novas no `sitemap.ts`.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Onde editar o conteúdo

- `src/lib/site.ts`: contatos, endereço, horários, diferenciais, marcas, cidades e FAQ (tudo do briefing)
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
- Ofertas reais da campanha 10.10
- Logo da Art Colchões em vetor (o PDF "Logo pdf atualizada" enviado é o da D'Angelis)
