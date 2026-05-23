# rev-0.7 — Notes

> Status: **Released** ✅ (aprovada pelo cliente)
> Aberta em: 2026-05-10
> Fechada em: 2026-05-10 (mesmo dia, 7 iterações)
> Foco: Atualizações de front-end pós-deploy v0.6

---

## Contexto inicial

Saída da rev-0.6:
- Site no ar em https://cali-garage.vercel.app (Vercel, deploy estático)
- Domínio `caligarage.com.br` ainda não comprado pelo cliente — URLs canônicas (JSON-LD, sitemap, robots) apontam para vercel.app temporariamente
- 8 security headers ativos validados em produção
- Logo oficial vetorial integrado (rev-0.4)
- Paleta `#DD6520` warm copper sobre warm cocoa (rev-0.3)
- Assinatura "Built by Donadão Labs" em linha única integrada (rev-0.6)

## Convenção desta revisão

- Código continua em `rev-0.1/` (edição in-place — padrão estabelecido em rev-0.2)
- Esta pasta `rev-0.7/` recebe specs, decisões e notas de implementação
- Cada mudança aprovada → entrada no CHANGELOG.md
- Deploy via `vercel --prod` quando quiser publicar

## Mudanças solicitadas

- [x] **Hambúmburger global no header** — implementado como dropdown popover à esquerda, com links inline desktop preservados (v1→v4)
- [x] **Stats cards com gradiente** branco→laranja em vez do bloco preto sobre cream
- [x] **CTA WhatsApp/Agendar arredondado** (era quadrado por perda de herança ao mover de dentro do `.nav-menu`)
- [x] **Padronização de border-radius** + sombras suaves nos cards (feature-icon, service-card, review-card, contact-item)
- [x] **Contraste dos cards de contato** — labels laranja, valores cream forte (estavam invisíveis por herança de `.section-cream`)
- [x] **Mapa contido na seção cream** — altura fixa 460px + overflow hidden defensivo
- [x] **Status "Aberto/Fechado" dinâmico** — horário Brasil + 13 feriados nacionais (móveis incluídos)

## Decisões arquivadas

### Hambúmburger: global, esquerda, com links inline mantidos (v2)
**v1 (descartada):** hambúrguer à direita, links sumiam do desktop, overlay caixa preta full-screen.

**v2 (entregue):** hambúrguer à esquerda (em `.navbar-start`, antes do logo). Links inline preservados no desktop — drawer é ADIÇÃO. Mobile esconde os links inline e só mostra hambúrguer + logo + CTA. Drawer slide da esquerda com gradiente translúcido (não bloco preto sólido) e backdrop separado com blur leve cobrindo o resto da tela.

Razão da reformulação: feedback direto do cliente após ver v1 em prod — "hambúrguer no lado errado, textos antes têm que continuar, caixa preta sobrepondo feio". Cada um dos 3 pontos virou correção específica em v2.

### Stats: gradiente cream→peach (não cream→orange forte)
Cliente pediu "branco→alaranjado". Apresentei 3 variantes (vertical suave, diagonal forte, sunrise radial). Cliente escolheu vertical suave. Implementado com `#FBF6EC → #FFC79A` — usa cream do site como topo e termina em peach claro (não no `#DD6520` saturado), garantindo que o número em `--color-orange-dark` `#B04A18` tenha contraste WCAG AA. Variante diagonal foi recusada por risco de ofuscar o número; sunrise radial foi recusada por adicionar complexidade visual sem ganho claro.

---

## Backlog conhecido (do SECURITY-AUDIT — não bloqueante)

| Item | Esforço | Benefício |
|---|---|---|
| Calcular hash SHA-256 do JSON-LD e remover `'unsafe-inline'` de `script-src` | 30min | CSP mais restrita |
| Adicionar SRI ao `<link>` do Google Fonts | 15min | Proteção contra CDN compromise |
| Mover atributos `style="..."` inline para CSS classes | 1h | CSP totalmente sem unsafe-inline |
| Adicionar `<link rel="canonical">` em todas as 6 páginas | 15min | Evita duplicate content |
