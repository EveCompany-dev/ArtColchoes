# Desempenho — Art Colchões

Lighthouse mobile (emulação padrão, 4x CPU slowdown, rede simulada) sobre o `out/` servido localmente
(`npx serve out -l 4000`). Altura medida em viewport de 390px.

## Antes (baseline)

| Rota | Performance | LCP | CLS | TBT | Peso | Altura 390px |
|---|---|---|---|---|---|---|
| `/` | 65 | 9,12s | 0 | 320ms | 1529 KB | 10638px |
| `/produtos/` | 89 | 2,68s | 0,000 | 321ms | 1090 KB | 14280px |
| `/tecnologia/` | 83 | 2,83s | 0,006 | 483ms | 312 KB | 7891px |
| `/duvidas/` | 89 | 2,53s | 0 | 338ms | 305 KB | 3168px |

Observação: o ruído do Lighthouse local é de alguns pontos entre execuções.

## Depois

| Rota | Performance | LCP | CLS | TBT | Peso | Altura 390px |
|---|---|---|---|---|---|---|
| `/` | 94 | 2,96s | 0 | 116ms | 769 KB | 9284px |
| `/produtos/` | 87 | 4,04s | 0 | 67ms | 1073 KB | 7903px |
| `/tecnologia/` | 95 | 2,79s | 0 | 117ms | 314 KB | 4827px |
| `/duvidas/` | 96 | 2,61s | 0 | 109ms | 307 KB | 3039px |

Verificação em 360, 390, 768, 1024 e 1440px: sem rolagem horizontal e sem texto abaixo de 12px.

## Metas que não bateram

- **LCP** (meta < 2,5s): `/` 2,96s, `/produtos/` 4,04s, `/tecnologia/` 2,79s, `/duvidas/` 2,61s. O LCP oscila entre execuções (a home já mediu de 2,6s a 5s); depende do JS hidratar e do texto/imagem do topo pintar. Falta fôlego no bundle JS (GSAP + plugins).
- **Performance** (meta ≥ 90): `/produtos/` ficou em 87 (ruído do LCP).
- **Altura da home em 390px** (meta ≤ 9.000px): 9.284px; o hero, o contato (mapa, Instagram) e o rodapé ainda ocupam muito sem remover conteúdo.
- **/produtos/ pesa 1,07 MB**: as fotos do catálogo e do hero continuam as variantes disponíveis; as originais não estão no repositório.
