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
