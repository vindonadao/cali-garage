# Changelog — Cali Garage

Todas as mudanças significativas neste projeto são documentadas aqui.

Versionamento por revisões: `rev-X.Y` onde:
- **X** = major redesign (mudança estrutural de visual language ou IA)
- **Y** = iteração / refinamento dentro do mesmo redesign

---

## rev-0.9.2 — Released (2026-05-23)

### Foco
Substituir o placeholder `[PREENCHER]` do CNPJ na Política de Privacidade pelo CNPJ real fornecido pelo cliente.

### Mudanças
- **`/privacidade.html` seção 1 (Controlador dos dados)**: `CNPJ: [PREENCHER]` → `CNPJ: 49.311.687/0001-75` (formato canônico brasileiro)

### Files modificados
- `rev-0.1/privacidade.html`
- `CHANGELOG.md` — esta entrada

### TODOs remanescentes pro cliente
- Decisão sobre DPO/Encarregado na seção 9 de `/privacidade.html` (placeholder `[A definir]`)
- Foto real da fachada (opcional, pra substituir og-cover.jpg gerada)

---

## rev-0.9.1 — Released (2026-05-23)

### Foco
Substituir o placeholder `GOOGLE_BUSINESS_PROFILE_URL` deixado na rev-0.9 pela URL real do perfil do Google Maps da Cali Garage, fornecida pelo cliente, e aproveitar as coordenadas precisas que vieram junto.

### Mudanças
- **JSON-LD `sameAs`**: placeholder substituído pela URL canônica do perfil Google Maps (tracking params removidos)
- **JSON-LD `geo.latitude/longitude`**: `-23.9532, -46.3326` → `-23.943392, -46.3223533` (coords oficiais do perfil Google — ~1km de diferença do valor anterior, que era geocode aproximado da criação inicial)
- **Meta `geo.position` e `ICBM`** em `index.html` e `contato.html`: idem

### Files modificados
- `rev-0.1/index.html` — JSON-LD sameAs + geo coords + meta geo
- `rev-0.1/contato.html` — meta geo
- `CHANGELOG.md` — esta entrada

### TODOs remanescentes pro cliente (não bloqueantes)
- CNPJ pra preencher na seção 1 de `/privacidade.html`
- Decisão sobre DPO/Encarregado na seção 9 de `/privacidade.html`
- Foto real da fachada (opcional, pra substituir og-cover.jpg gerada)

---

## rev-0.9 — Released (2026-05-23)

### Foco
Onda 1 da auditoria Cowork (2026-05-23). Resolve os 2 itens 🟠 Alto não-tracking, 3 dos 4 🟡 Médio e 1 dos 2 ⚪ Baixo. GA4/Consent Mode ficam pra rev-0.10. Notas em [`rev-0.9/notes.md`](./rev-0.9/notes.md).

### Origem
Auditoria de landing page Cowork realizada em https://caligarage.donadaolabs.com/ (Vinicius Donadão, Donadão Labs). Veredito geral: tecnicamente sólida, sem bloqueador crítico — itens são correções de SEO/social/LGPD.

### Mudanças

**1. JSON-LD `AutoRepair` — domínio canônico** (🟠 Alto)
- `cali-garage.vercel.app` → `caligarage.donadaolabs.com` em 3 campos: `@id`, `url`, `image`
- `image` agora aponta pra `og-cover.jpg` (gerada nesta rev) — não mais pra `fachada.jpg` inexistente
- Novo campo `sameAs` com placeholder `GOOGLE_BUSINESS_PROFILE_URL` (TODO: preencher quando o cliente passar a URL do Google Business Profile)

**2. Open Graph + Twitter Cards + canonical em todas as 7 páginas** (🟡 Médio)
- Site é divulgado por WhatsApp → preview sem imagem era atrito de conversão
- Adicionado em index, sobre, servicos, galeria, avaliacoes, contato + nova privacidade: `og:url`, `og:image`, `og:image:width=1200`, `og:image:height=630`, `og:image:alt`, `og:image:type`, `twitter:card=summary_large_image`, `<link rel="canonical">`
- Páginas internas também ganharam `og:site_name` e `og:locale` (só o index tinha)

**3. Página de Política de Privacidade LGPD** (🟡 Médio — pré-requisito pra rev-0.10)
- `rev-0.1/privacidade.html` novo — 11 seções cobrindo: controlador, dados não coletados, logs técnicos, cookies (atualmente nenhum), dados via WhatsApp/telefone, compartilhamento, retenção, direitos do titular (art. 18 LGPD), segurança, encarregado/DPO, atualizações, lei aplicável
- Placeholders explícitos para o cliente preencher: `[PREENCHER]` no CNPJ, `[A definir]` no DPO
- Link "Política de Privacidade" no `.footer-bottom` de todas as 7 páginas
- `/privacidade.html` adicionado ao sitemap (changefreq=yearly, priority=0.3)

**4. og-cover.jpg gerada** (1200×630, 64KB JPEG)
- Composta via PIL: warm cocoa background (#1F1610) + logo recolorido em laranja (#DD6520) via alpha mask + texto "OFICINA MECÂNICA · SANTOS/SP" em cream + subtitle "★ 4,7 no Google · Reparos honestos para o seu carro"
- `rev-0.1/img/og-cover.jpg` novo

**5. Sitemap.xml** alinhado
- `cali-garage.vercel.app` → `caligarage.donadaolabs.com` em todas as URLs
- Paths `/sobre` → `/sobre.html` (e demais) — antes era inconsistente com os arquivos reais
- Adicionado `/privacidade.html`

**6. Tap targets ≥44px no mobile** (⚪ Baixo, WCAG 2.5.5)
- `.footer-col ul li a`, `.footer-col address a`, `.footer-bottom a`, `.section-head .meta a` com `min-height: 44px` + `line-height: 44px` em viewports ≤900px
- Auditor mediu ~17-18px nos links do rodapé e no "Ver todas as avaliações"

### Não fechado nesta rev (vai pra rev-0.10)
- 🟠 Alto: instalar GA4 + event tracking nos CTAs WhatsApp/Telefone/Agendar
- 🟡 Médio: banner LGPD com Consent Mode v2 (deny-all default)
- Pré-requisito da rev-0.10 já está pronto: /privacidade.html publicada

### Não fechado nesta rev (backlog ⚪ Baixo)
- CSP nonce/hash → remover `'unsafe-inline'` de `script-src` (item de endurecimento, não urgente)

### TODOs pro cliente
- Passar URL do Google Business Profile pra preencher `sameAs` no JSON-LD
- Preencher CNPJ na seção 1 de `/privacidade.html`
- Confirmar designação (ou ausência) de DPO na seção 9 de `/privacidade.html`

### Files modificados
- `rev-0.1/index.html` — JSON-LD domain + sameAs + OG completo + canonical + link privacidade
- `rev-0.1/{sobre,servicos,galeria,avaliacoes,contato}.html` — OG completo + canonical + link privacidade + og:site_name + og:locale
- `rev-0.1/privacidade.html` (novo)
- `rev-0.1/img/og-cover.jpg` (novo, 1200×630, 64KB)
- `rev-0.1/sitemap.xml` — domain fix + paths .html + privacidade
- `rev-0.1/css/style.css` — bloco mobile tap-targets (≤900px media query)
- `rev-0.9/notes.md` (novo)
- `CHANGELOG.md` — esta entrada

---

## rev-0.8 — Released (2026-05-10)

### Foco
Hardening de segurança e proteções contra phishing/spoofing. Avaliação do que faz sentido para landing page de serviços. Notas em [`rev-0.8/notes.md`](./rev-0.8/notes.md).

### Decisões arquiteturais
- **Sem banco de dados:** site não captura nada do visitante; toda comunicação é WhatsApp/telefone; avaliações são estáticas conforme brief
- **Sem antivírus/WAF custom:** não há servidor; Vercel já protege na borda
- **Foco principal:** preparar setup técnico de segurança para o momento de lançamento do domínio próprio (`caligarage.com.br`), evitando janela de phishing/spoofing durante a transição

### Mudanças
**1. Runbook de pós-compra do domínio**
- Documento `rev-0.8/domain-launch-runbook.md` criado
- 8 fases sequenciais com comandos prontos: DNS Vercel, CAA records, DNSSEC, SPF/DKIM/DMARC (cenários com e sem email), HSTS preload list, reversão das URLs vercel.app no código, Google Search Console, validação consolidada
- Anexo sobre defesa contra perfis falsos em WhatsApp/Instagram via verificações oficiais

### Files modificados
- `rev-0.8/notes.md` (novo)
- `rev-0.8/domain-launch-runbook.md` (novo)
- `CHANGELOG.md` — esta entrada

---

## rev-0.7 — Released (2026-05-10)

### Status
Primeira revisão pós-deploy em produção (https://cali-garage.vercel.app). Aprovada pelo cliente após 7 iterações em sessão (v1→v7). Notas em [`rev-0.7/notes.md`](./rev-0.7/notes.md).

### Iterações dentro da rev (v1 → v7)
| v | Mudança | Resultado |
|---|---------|-----------|
| v1 | Hambúrguer global (direita) + overlay full-screen | ❌ "lado errado, links sumiram, caixa preta feia" |
| v2 | Hambúrguer à esquerda + drawer slide-in lateral | ❌ "logo abaixo do hambúrguer, drawer ainda sobreposto" |
| v3 | Flex defensivo + dropdown popover abaixo do botão | ✅ layout OK, mas click nos links não navegava |
| v4 | Removido `.nav-backdrop` (conflito de stacking context) + click-outside via document + CTA pill + polish em cards | ✅ menu funciona, padronização visual |
| v5 | Fix contraste contato (h4/p herdavam cor escura de `.section-cream`, invisíveis sobre warm dark) — labels viraram laranja, valores cream forte | ✅ contatos legíveis |
| v6 | Mapa contido no quadro cream (`height: 460px` fixo + `overflow: hidden` na seção) | ✅ overflow corrigido |
| v7 | Status "Aberto/Fechado agora" dinâmico (timezone America/Sao_Paulo, seg-sex 8-18h, exceto feriados nacionais com cálculo de Páscoa/Carnaval/Corpus Christi) | ✅ aprovado |

### Trigger
Após go-live na rev-0.6, cliente identificou dois pontos de atrito visual:
1. Navbar com 6 links + CTA poluindo o header em desktop
2. Cards de stats (4,7★ / 15+ / 100%) na seção About do index — fundo warm dark `#1F1610` sobre seção cream criava "tijolos pretos" isolados, lendo como pontos visuais sem hierarquia

### Iteração visual durante a rev (v1 → v2)
**v1 (descartada):** hambúrguer global à direita + overlay full-screen escuro com itens grandes. Cliente reagiu: hambúrguer no lado errado, links sumiram do desktop, overlay aparecia como caixa preta sólida cortando metade da tela.

**v2 (entregue):** três correções específicas conforme feedback:
- Hambúrguer reposicionado para a **esquerda** (antes do logo, dentro de novo wrapper `.navbar-start`)
- **Links inline mantidos visíveis** no desktop — drawer é adição, não substituto
- Overlay trocado por **drawer slide-in da esquerda** (largura `min(360px, 88vw)`) com gradiente vertical translúcido `rgba(31,22,16,0.92) → rgba(21,16,12,0.96)` + `backdrop-filter: blur(28px) saturate(1.15)`. Backdrop separado abafa o restante com gradiente diagonal `rgba(21,16,12,0.35→0.65)` + blur 6px

### Mudanças

**1. Header — hambúrguer à esquerda + drawer translúcido**
- HTML: novo wrapper `.navbar-start` agrupando `.nav-toggle` + `.logo` à esquerda; `.nav-menu` no centro/direita; `.nav-cta` no fim. `.nav-backdrop` adicionado fora do header em todas as 6 páginas
- Desktop: links inline mantidos como antes (`.nav-menu` com `display: flex`)
- Mobile (≤900px): links inline escondidos via `.nav-menu:not(.is-open) { display: none }`
- Drawer (`.nav-menu.is-open`): slide-in da esquerda em 0.32s, scrollável, items em Anton uppercase com border-left animado no hover
- Hambúrguer animado: 3 linhas → X ao abrir
- JS atualizado: ESC fecha, click no backdrop fecha, click em link fecha, scroll do body bloqueado quando aberto

**2. Stats — gradiente cream→peach**
- `.section-cream .stat` e `.section-cream .stat-item` saem de `background-color: var(--color-card)` (warm dark) para `linear-gradient(180deg, #FBF6EC 0%, #FFC79A 100%)`
- Border `rgba(221, 101, 32, 0.18)` e box-shadow laranja sutil
- `.stat-number` agora `var(--color-orange-dark)` `#B04A18` (contraste WCAG AA pass sobre o gradiente claro)
- `.stat-label` em dark warm `#1F1610` opacity 0.78
- Cards `.feature-card`/`.service-card` em `.section-cream` mantidos como antes (warm dark) — só os stats cards mudaram para o gradiente claro

### Files modificados
- `rev-0.1/index.html`, `rev-0.1/sobre.html`, `rev-0.1/servicos.html`, `rev-0.1/galeria.html`, `rev-0.1/avaliacoes.html`, `rev-0.1/contato.html` — `.nav-cta` reposicionado para fora de `.nav-menu`
- `rev-0.1/css/style.css` — bloco `.nav-toggle`/`.nav-menu` reescrito (overlay full-screen) + bloco gradiente nos stats + ajustes de contraste

### Acceptance criteria
- ✅ CSS balanceado (254 abre / 254 fecha)
- ✅ Deploy production OK
- ✅ Headers de segurança preservados
- ⏳ Validação visual mobile + desktop (cliente)

---

## rev-0.6 — Released (2026-05-07)

### Trigger
Cliente reagiu à rev-0.5: "do jeito que tá ficou horrível, ajusta pra ficar no mesmo padrão do site, uma linha abaixo, nas cores do site não fora com a parte preta".

### Mudanças (apenas CSS — markup mantido)
- **Background:** `#0E0A07` (preto harsh) → `var(--color-bg-2)` `#1D150F` (warm cocoa, paleta do site)
- **Layout:** 3 rows empilhadas em stripe gigante → **linha única inline**, flex-wrap em desktop, stack em mobile
- **Brand mark size:** 48px → **1rem (~16px)** — em footer credit line, 48px era display headline (contexto errado pra spec global)
- **Padding:** 4rem 1.5rem 3rem → 1.1rem 1.5rem (compacto, integrado)
- **Separadores `·`** entre seções (row · tag · links)
- **Border-top sutil** pra separação do `.site-footer` sem cortar o flow

### Resultado
Linha única elegante: `● Built by Donadão Labs · AI software that actually ships. · donadaolabs.com · @donadaolabs`

Brand mark mantém Inter Tight 700 letter-spacing -0.025em (spec global respeitada na tipografia, escala adaptada ao contexto).

---

## rev-0.5 — Released (2026-05-07)

### Adicionado
- **Donadão Labs built-by signature** em todas as 6 páginas — stripe abaixo do `.site-footer`, antes do WhatsApp float
- **Inter Tight 700** carregada via Google Fonts (peso único, +1 webfont request)
- Brand mark "Donadão Labs" em **Inter Tight 700, 48px, letter-spacing -0.025em** conforme spec global do usuário
- Tagline italic "AI software that actually ships."
- Links pra `donadaolabs.com` e `@donadaolabs` (target="_blank" rel="noopener")
- Background mais profundo `#0E0A07` pra separar visualmente do site-footer
- Mobile: brand 36px, padding reduzido

### Bug fix durante implementação
- Primeiro pass do Python script usou marker ambíguo (`<a href="https://wa.me/...`) que matchou o `nav-cta` do navbar antes do `whatsapp-float`, inserindo o signature DENTRO do `<nav>`. Corrigido com regex pra remover inserção errada + marker específico (`class="whatsapp-float"`).

---

## rev-0.4 — Released (2026-05-07)

### Trigger
Cliente forneceu o logo oficial em PDF vetorial (`PDF FABRICIO DA CALI.pdf`) — exatamente o que faltava pra fidelidade 1:1 da identidade visual. Encerra a busca por aproximação geométrica e tracing manual; agora temos o asset original.

### Mudanças
- **Logo source vetorial preservado** — `rev-0.1/img/logo-source.pdf` (62KB) arquivado no repo
- **Conversão PDF → PNG transparente** via `pdftocairo` (poppler) em 400 DPI
- **Crop preciso** com `sips --cropOffset` baseado nos clip-paths do SVG do PDF (logo + tagline em 2302×773)
- **Compressão** para 1400px de largura → `rev-0.1/img/logo.png` (111KB)
- **Técnica CSS mask-image** — PNG transparente como máscara + `background-color: var(--color-orange)` permite recolorir o logo via variável CSS sem gerar múltiplas variantes raster
- **Substituição em todos os 6 HTMLs:**
  - Navbar: HTML/CSS spans → `<span class="cg-logo-img">`
  - Hero billboard, About-image, Footer-mark (index.html): SVGs inline removidos → `cg-logo-img`
  - About-image (sobre.html): SVG inline → `cg-logo-img`
  - Navbars das 5 páginas internas atualizadas
- **Limpeza:** removidos `logo.svg` e `logo-mark.svg` (aproximações antigas que falharam)
- **Toolchain instalada:** Homebrew + Poppler (`pdftocairo`) — disponível pra futuras conversões

### Files modificados
- `rev-0.1/img/logo.png` (NEW) — asset oficial
- `rev-0.1/img/logo-source.pdf` (NEW) — source preservado
- `rev-0.1/img/logo-mark.svg` (DELETED)
- `rev-0.1/img/logo.svg` (DELETED)
- `rev-0.1/css/style.css` — bloco LOGO SYSTEM reescrito
- `rev-0.1/{index,sobre,servicos,galeria,avaliacoes,contato}.html` — todas instâncias

### Pendência da rev-0.1 RESOLVIDA
A pendência crítica documentada no `brand/README.md` ("Foto em alta da fachada para auto-trace") foi resolvida pelo cliente entregando o vetor digital direto. Auto-trace via potrace/Illustrator não foi mais necessário.

### Vantagens da nova abordagem
- **1 arquivo PNG** = logo em qualquer cor (controle via CSS)
- **111KB** total para o asset (vs. ~200KB de SVG embedded raster)
- **Cor responsiva** ao contexto (.section-cream, hero, footer — todos herdam `--color-orange`)
- **Fidelidade 1:1** com o asset oficial do cliente
- **Source PDF preservado** no repo — futuras conversões/variantes são triviais

### Próximas variantes possíveis
- `logo-mono-black.png` — pra impresso preto-e-branco
- `logo-mono-white.png` — knockout sobre fundos saturados (gerável via CSS filter por enquanto)
- `logo-mark-only.png` — só CALI ★ GARAGE sem tagline (recropar do PDF)

---

## rev-0.3 — Released (2026-05-07)

### Trigger
Cliente reagiu à rev-0.2: "continua uma cor pouco chamativa e fraca, olha que coisa horrivel em anexo, quase não consigo ler". Screenshot mostrou stat cards na seção About com labels ilegíveis (marrom escuro sobre warm dark) e percepção de cor primária ainda muted.

### Diagnóstico
1. **Bug de cascata CSS:** `.section-cream .stat-label { color: var(--color-muted-on-cream) }` aplicava marrom-escuro `#5A4A3D` em labels que estavam DENTRO de cards warm dark — contraste destruído.
2. **Cor primária ainda muted:** `#C8622A` lê fraco em tela mesmo com paleta warm. Brand owner é autoridade última — Wheeler §1.2 sacred recebe override documentado.
3. **Noise overlay:** opacity 0.04 com mix-blend-mode overlay desaturava sutilmente — reduzido a 0.02.

### Mudanças
- **Cor primária:** `#C8622A` → `#DD6520` (burnt copper mais vivo, ainda família terracotta — não é "fast-food orange" #FF6600)
- **Cor light:** `#E8A765` → `#F2925A` (sunset mais quente)
- **Cor dark:** `#A04E1F` → `#B04A18` (compatível com novo tom)
- **Backgrounds mais profundos** pra o orange saltar:
  - `--color-bg`: `#1A1410` → `#15100C`
  - `--color-card`: `#2A1F18` → `#1F1610`
- **9 referências hardcoded `rgba(200, 98, 42, ...)` migradas** para `rgba(221, 101, 32, ...)`
- **Bug fix labels:** override específico `.section-cream .stat .stat-label` usa `var(--color-text)` (cream light) com opacity 0.85 — contraste WCAG AA pass sobre warm dark cards
- **Noise overlay:** 0.04 → 0.02 opacity (não interferir vibrância)

### Override documentado de Wheeler §1.2
A cor primária `#C8622A` foi declarada "sacred" por Wheeler como amostra-fiel da fachada original. Brand owner reagiu duas revisões consecutivas dizendo que está "fraca/sem vida". Decisão: brand owner > spec. O override é mínimo (mesma família terracotta, mais vivo, ainda longe de saturado). Documentação preservada para futura revisão de identidade se necessário.

### Files modificados
- `rev-0.1/css/style.css` — tokens cromáticos + bug fix + noise overlay reduzido

### Próxima validação
Se cliente ainda perceber "fraca", rev-0.4 escala pra brand-chief com decisão estratégica: paleta dual (terracotta + accent), gradiente sunset, ou pivote estrutural de cor.

---

## rev-0.2 — Released (2026-05-07)

### Trigger
Cliente reagiu à rev-0.1 deployada: "as cores estão muito sem vida, falta toque artístico, está muito esse marrom apagado".

### Diagnóstico (Brand Chief)
Cor de marca `#C8622A` está fiel à fachada — problema é o ecossistema cinza-neutro frio (Nixtio dark) que sequestra a vivacidade da terracota. **Solução: reconciliar paleta de fundo com a família cromática quente da cor primária.**

### Mudanças
- **Backgrounds** saem de cinza-neutro (`#141414`/`#1B1B1B`/`#1F1F1F`) para **warm dark cocoa** (`#1A1410`/`#221A14`/`#2A1F18`)
- **Texto** sai de branco frio (`#F5F5F5`) para **cream papel envelhecido** (`#F4ECE0`)
- **Borders** + **muted** todos warmer (família cromática quente)
- **Nova classe `.section-cream`** com surface `#F5F1EA` (Wheeler §3.3 expansion)
- **Alternância dark/cream/dark** aplicada: index (Por que escolher → cream, About/Stats → cream), sobre (story → cream), serviços (listing → cream), contato (form → cream)
- **Cards dentro de seções cream** invertem hierarquia → warm dark sobre cream (contraste máximo)
- **Noise overlay sutil** (opacity 0.04) via SVG turbulência — materialidade vivida do Archetype §5
- **Cor primária `#C8622A` LITERALMENTE INALTERADA** (Wheeler §1.2 sacred preservado)
- **Logo, ângulos, balanço assimétrico** todos preservados

### Squad envolvido
- Brand Chief — diagnóstico e roteamento
- Alina Wheeler — aprovou (override é apenas EXPANSÃO da §3.3 de pares aprovados)
- Archetype Consultant — aprovou (warm dark + cream é Everyman+Explorer puro)
- Emily Heyward — aprovou (energia DTC vem da TENSÃO entre seções alternando)

### Tensão produtiva resolvida
> A terracota mantém sua equity de 10 anos enquanto o ecossistema ao redor ganha família cromática quente que a deixa respirar — o site fica mais vizinho-de-bairro (Everyman) E mais Cali/road-trip (Explorer) ao mesmo tempo.

### Files modificados
- `rev-0.1/css/style.css` — 22 tokens trocados, 5 rgba migrados, 110 linhas de `.section-cream` rules + noise overlay
- `rev-0.1/index.html` — 2 sections com `.section-cream`
- `rev-0.1/sobre.html` — 1 section com `.section-cream`
- `rev-0.1/servicos.html` — 1 section com `.section-cream`
- `rev-0.1/contato.html` — 1 section com `.section-cream`
- `rev-0.2/brand/palette-revision.md` (novo) — spec estratégica
- `rev-0.2/brand/IMPLEMENTATION-NOTES.md` (novo) — instruções token-by-token

### Acceptance criteria (Brand Chief)
- ✅ Cor primária inalterada literalmente
- ✅ Backgrounds em família quente cocoa
- ✅ Texto cream (não branco frio)
- ✅ Alternância dark/cream/dark aplicada
- ✅ Noise overlay sutil (não ruidoso)
- ⏳ Cliente leigo descreve cor como "cobre/terracota" (validação a campo)

---

## rev-0.1 — Released (2026-05-07)

### Adicionado
- **Brand Squad acionado** — Brand Chief diagnosticou e roteou para Alina Wheeler (lead) + Archetype Consultant (suporte)
- **`brand/identity-system.md`** (Wheeler) — sistema completo de identidade: 5 variantes (primary, stacked, mark-only, wordmark, monogram), cores (`#C8622A` Cali Copper), tipografia (Anton + Inter confirmadas), clearspace, tamanhos mínimos por touchpoint, application guidelines (web, fachada, uniforme, fiscal, social, cartão)
- **`brand/archetype.md`** (Archetype Consultant) — arquétipo Everyman 65% + Explorer 35%, tensão produtiva "o vizinho que tem rota própria", 5 princípios de tone of voice, 5 visual personality anchors, do/don't, voice samples
- **Logo retrabalhado** seguindo brief Wheeler:
  - Navbar: HTML+CSS com Anton + estrela ★ + rotações leves (CALI -2°, GARAGE +1°)
  - Hero/About/Footer: SVG inline (font Anton herda do CSS, sem sandbox issue), CALI rotate(+6°), GARAGE rotate(-3°), estrela 5-pontas com ponta superior arredondada (preservando imperfeição), swoosh tapered de 4 curvas Bézier
  - Cor única `#C8622A` em todas as instâncias
  - **Filtros removidos** (Wheeler §1.4: "Não adicione efeitos drop shadow, gradiente, bevel...")
  - **Shrikhand removida** (Wheeler §1.4: "Não substitua o brush por uma fonte digital 'parecida'")

### Pendente para rev-0.2
- **Foto em alta da fachada** — para auto-trace do logo brush original (path mais fiel)
- **Aplicar identity system completo** — variantes stacked/wordmark/monogram quando os contextos surgirem
- **Páginas internas** — propagar visual language Nixtio do home (page-header com pill ghost, cards numerados)
- **Imagens reais** — substituir placeholders na galeria
- **Deploy** — Netlify Drop, Cloudflare Pages ou GitHub Pages

### Decisões arquivadas
- **Não fingir pincelada que não conseguimos reproduzir.** Vetor honesto > filtro computacional falso. Quando hi-res photo da fachada chegar, fazemos auto-trace via potrace/Illustrator e plugamos como variante "brush authentic".

---

## rev-0 — Baseline (snapshot em `rev-0/`)

### Adicionado
- **Estrutura inicial do site** — 6 páginas HTML5 estáticas (index, sobre, serviços, galeria, avaliações, contato)
- **CSS centralizado** — `css/style.css` com tokens de design (cores, raios, sombras, transições)
- **Visual language inspirado em Nixtio** — pill nav flutuante, hero billboard arredondado, cards numerados, marquee, footer wordmark gigante
- **SEO local** — meta tags `geo.*`, Schema.org `AutoRepair` com `aggregateRating`, `openingHoursSpecification`, `geo`, `address`
- **WhatsApp** — botão flutuante com pulse animation + CTA no header em todas as páginas
- **Logo SVG (tentativa 1)** — `img/logo.svg`, `img/logo-mark.svg`, `img/favicon.svg` usando Shrikhand + filtro distressed (resultado insatisfatório, será refeito em rev-0.1)
- **Tipografia** — Anton (display), Inter (body), Shrikhand (logo) via Google Fonts
- **Acessibilidade** — `aria-label`, `aria-expanded`, `:focus-visible`, contraste alto

### Identidade visual base
- Paleta: laranja/cobre `#C8622A`, carvão `#141414`/`#1E1E1E`, branco `#F5F5F5`
- Sistema de raios: 10px → 18px → 28px → 40px → pill (999px)
- Cubic-bezier `(0.2, 0.8, 0.2, 1)` para transições premium

### Conteúdo institucional
- Telefone: (13) 3222-3456
- WhatsApp: (13) 99625-2628
- Endereço: Av. Campos Sales, 98 — Vila Matias, Santos/SP, 11013-401
- Horário: Seg–Sex, 08h às 18h
- Avaliação Google: 4,7★ (15 opiniões)
