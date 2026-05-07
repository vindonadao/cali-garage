# Changelog — Cali Garage

Todas as mudanças significativas neste projeto são documentadas aqui.

Versionamento por revisões: `rev-X.Y` onde:
- **X** = major redesign (mudança estrutural de visual language ou IA)
- **Y** = iteração / refinamento dentro do mesmo redesign

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
