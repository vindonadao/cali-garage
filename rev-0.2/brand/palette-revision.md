# Cali Garage — Palette Revision (rev-0.2)

> Brand Chief decision document. Resolve o feedback do cliente "está sem vida, muito marrom apagado" sem abrir mão dos sacred elements (Wheeler §1.2) nem trair o archetype (Everyman 65% + Explorer 35%). Esta rev é um **refinamento da paleta secundária** — a cor primária `#C8622A` permanece literalmente intacta. O que muda é o ecossistema cromático ao redor dela.

---

## 0. TL;DR (decisão executiva)

| Item | rev-0.1 | rev-0.2 | Status |
|---|---|---|---|
| Cor primária de marca | `#C8622A` | `#C8622A` | **MANTIDA** (Wheeler §3.1 sagrado) |
| Background primário | `#141414` (carvão neutro) | `#1A1410` (warm ink, marrom-tinta) | **MUDA** |
| Background surface | `#1B1B1B` (cinza neutro) | `#221A14` (warm dark cocoa) | **MUDA** |
| Background card | `#1F1F1F` (cinza neutro) | `#2A1F18` (warm cocoa) | **MUDA** |
| Texto primário | `#F5F5F5` (branco frio) | `#F4ECE0` (cream/papel envelhecido) | **MUDA** |
| Texto muted | `#9A9A9A` (cinza neutro) | `#B8A89A` (sand muted) | **MUDA** |
| Border | `#2C2C2C` (cinza neutro) | `#3A2D24` (warm border) | **MUDA** |
| **Surface inversa (NOVA)** | — | `#F5F1EA` (creme Wheeler §3.3) | **NOVA** — seções alternadas |
| **Acento secundário (NOVO)** | — | `#7A8B7E` (sage-eucalipto dessaturado) | **NOVO** — uso funcional restrito |
| **Acento de calor (NOVO)** | — | `#E8A765` (sunset sand) | **NOVO** — apenas hover/glow |

---

## 1. Diagnóstico — qual era o problema real

O dev formulou três hipóteses. A resposta correta é **uma síntese das três**, com peso desigual:

### 1.1 A cor de marca está apagada? **NÃO.**

`#C8622A` é canônico (Wheeler §3.1: "média ponderada das amostras de pixel da fachada original"). Mexer nela viola §1.2.4 (sacred element), destrói 10 anos de equity de fachada e cai exatamente no proibido §1.4 (laranja saturado vira fast-food). **Veredicto:** zero alteração na cor primária.

### 1.2 O dark Nixtio está matando a cor? **SIM — causa principal.**

`#C8622A` é uma terracota com componente vermelho-amarelo quente (HSL 19°/65%/47%). Quando essa cor toca um fundo cinza neutro frio (`#141414` HSL 0°/0%/8%), o olho humano lê o copper como **isolado, sufocado**. O cinza neutro não tem família cromática com a terracota — eles não conversam, eles se anulam.

A correção não é trocar a cor de marca. É **reconciliar a paleta de fundo com a família cromática da cor primária**: trocar o cinza neutro por um cocoa quente (mesmo HUE family que a terracota, mas dessaturado e escuro). A terracota volta a "viver" porque está em casa, não em terra estrangeira.

**Princípio aplicado (Wheeler):** "color does not exist in isolation — it exists in relationship to its frame".

### 1.3 Falta de variação cromática? **PARCIALMENTE — sim para paleta secundária, não para a marca.**

Archetype §5 diz "Cor única, contraste alto. Terracotta sobre escuro. A marca não precisa de paleta." Isso continua verdade **para o LOGO e para HEADLINES de marca**. Mas o site inteiro não é marca — é arquitetura de informação. Adicionar 1 cor de surface alternada (creme `#F5F1EA`, já aprovada em Wheeler §3.3) e 1 acento funcional dessaturado (sage `#7A8B7E`, território Explorer/road-trip americano, não corporativo) resolve a sensação de monotonia SEM virar multi-color.

Heyward (Obsessed) fala em "energia através de tensão entre famílias", não em "mais cores". Estamos seguindo Heyward.

### 1.4 Falta energia visual / movimento? **SIM — fator agravante, não causa raiz.**

Dark Nixtio com superfícies planas amplifica a sensação "morto". Adicionar gradientes radiais sutis tonais (mesmo hue, variação de luminosidade) e textura de papel/grão sutil em surfaces creme cria a "materialidade vivida" do Archetype §5 sem violar Wheeler §3.4 (que proibia gradientes **saturados/brilhantes**, não tonais sutis).

### 1.5 Causa raiz consolidada

**O dark Nixtio cinza-neutro foi a decisão errada para uma cor de marca quente vintage.** Nixtio é uma agência de design contemporânea — copia bem para clientes tech/SaaS. Para uma oficina vernacular de Vila Matias com pintura à mão na fachada, o cinza neutro é trapaça arquetípica: faz parecer agência de SP, não oficina de bairro.

A correção é estilística, não de marca. **Trocamos o registro de "agency dark" para "warm vintage dark + cream alternating" — território Everyman+Explorer puro (garage americana, road trip, tinta envelhecida em madeira).**

---

## 2. Especialistas convocados (Brand Squad — síntese)

| Especialista | Role | Veredicto |
|---|---|---|
| **Alina Wheeler** | Defender §1.2 sacred + §3.1 cor primária | APROVA. §3.3 já tinha aprovado creme `#F5F1EA`. §3.4 (gradiente proibido) refere-se a gradientes saturados sobre o LOGO, não a tonais sutis em background. Override de §3.3 é apenas EXPANSÃO de pares aprovados. |
| **Archetype Consultant (Mark/Pearson)** | Validar Everyman+Explorer | APROVA. Sand/cocoa/cream é "materialidade vivida" Archetype §5 puro. Sage `#7A8B7E` é Explorer (mapa/road), não Hero corporativo. Sunset sand `#E8A765` é Cali/surf — referência cultural Explorer §1.2 (origem do nome). |
| **Emily Heyward (Obsessed)** | Energia DTC contemporânea | APROVA. "Warm dark + cream alternating" é exatamente o jogo que marcas vintage-contemporary fazem (ex: Quip, Casper early days, Fellow Coffee). Energia vem da TENSÃO entre seções escuras quentes e seções creme, não de saturação. |
| **Marty Neumeier** | Decisão estratégica purismo vs pivot | NÃO É PIVOT. É correção de aplicação. Brand DNA intacto. Não convocado para deliberação — apenas referenciado. |

---

## 3. Nova paleta — especificação completa

### 3.1 Backgrounds (família warm dark)

| Token | rev-0.1 | rev-0.2 | HSL | Justificativa |
|---|---|---|---|---|
| `--color-bg` | `#141414` | **`#1A1410`** | 24°/14%/8% | Warm ink. Mesmo HUE family que copper (~19°). Lê preto a olho nu, mas cria "casa cromática" para a terracota. |
| `--color-bg-2` | `#1E1E1E` | **`#231A14`** | 24°/26%/11% | Cocoa profundo, surface secundária para hero overlays. |
| `--color-surface` | `#1B1B1B` | **`#221A14`** | 24°/24%/11% | Idem `--color-bg-2`, separação fina. |
| `--color-surface-2` | `#232323` | **`#2A1F18`** | 23°/29%/13% | Cards elevados sobre dark. |
| `--color-card` | `#1F1F1F` | **`#2A1F18`** | 23°/29%/13% | Card padrão (consolidado com surface-2 para reduzir ruído). |
| `--color-card-2` | `#2A2A2A` | **`#34271E`** | 24°/29%/16% | Card hover/elevado. |

**Princípio:** todos os backgrounds dark agora ficam na faixa HUE 22°-25°, mesma família do copper `#C8622A` (HUE 19°). A terracota, quando aplicada sobre estes fundos, é lida como "mais clara/saturada do mesmo time", não como "isolada num cinza estrangeiro". O olho a percebe **viva**.

### 3.2 Cor primária de marca (INTACTA)

| Token | Valor | Status |
|---|---|---|
| `--color-orange` (primária Cali Copper) | **`#C8622A`** | **NÃO MUDA.** Wheeler §3.1 sagrado. |
| `--color-orange-light` | `#E07A3E` → **`#E8A765`** | Ajusta para **sunset sand** quente (mais luminoso em hover sobre fundos cocoa, mantém família). |
| `--color-orange-dark` | **`#A04E1F`** | Mantém. Wheeler §3.2 Burnt Edition pattern. |
| `--color-orange-soft` | rgba(200,98,42,0.12) → **rgba(200,98,42,0.18)** | Aumenta ligeiramente glow ambient (mais "vida" sem virar saturado). |

### 3.3 Texto (família cream, não branco frio)

| Token | rev-0.1 | rev-0.2 | Justificativa |
|---|---|---|---|
| `--color-text` | `#F5F5F5` | **`#F4ECE0`** | Cream papel envelhecido. Branco puro `#F5F5F5` em fundo warm dark cria contraste hostil cyan. Cream `#F4ECE0` (HSL 35°/53%/92%) está na família quente, lê limpo, evoca papel/lambe-lambe envelhecido (Archetype §5 "materialidade vivida"). |
| `--color-text-muted` | `#9A9A9A` | **`#B8A89A`** | Sand muted. Substitui cinza neutro por bege quente dessaturado. |
| `--color-text-dim` | `#666666` | **`#7A6E62`** | Warm dim. Mesma família. |
| `--color-border` | `#2C2C2C` | **`#3A2D24`** | Warm border. |
| `--color-border-strong` | `#3A3A3A` | **`#4A3A2D`** | Warm border strong. |

### 3.4 Surface inversa (NOVA — alternância de seções)

| Token | Valor | Uso |
|---|---|---|
| `--color-surface-cream` (NOVO) | **`#F5F1EA`** | Background de seções alternadas (ex: Serviços, Sobre, Galeria CTA). Wheeler §3.3 já aprovado. Cria a "tensão de famílias" Heyward. |
| `--color-text-on-cream` (NOVO) | **`#1A1410`** | Texto primário sobre surface cream (warm ink, alta legibilidade WCAG AAA). |
| `--color-muted-on-cream` (NOVO) | **`#5A4A3D`** | Texto muted sobre cream. |

**Regra de aplicação:** alternar warm-dark / cream a cada 1-2 seções. Hero permanece warm dark (impacto). Seção de serviços vira cream com cards warm dark. Avaliações volta a warm dark. Footer warm dark. **Nunca dois creme seguidos** (perde tensão), **nunca três dark seguidos** (volta a sensação morta).

### 3.5 Acentos secundários funcionais (NOVOS — uso restrito)

| Token | Valor | Uso permitido | Uso PROIBIDO |
|---|---|---|---|
| `--color-accent-sage` (NOVO) | **`#7A8B7E`** (eucalipto-sage dessaturado, HSL 138°/8%/51%) | Ícones de "OK/aprovado" em status, badge "Atendemos seguros", separator decorativo em galeria. NÃO em CTA, NÃO em headline. | Botão primário. Headline. Logo. Hero. |
| `--color-accent-sunset` | **`#E8A765`** (sunset sand) | Hover de botões primários, glow radial em hero, highlight de números em stats (ex: "10 anos"). Já é o `--color-orange-light` redirecionado. | Cor de marca substituta. Texto primário. |

**Justificativa arquetípica do sage:** verde sage dessaturado é cor de **mapa militar americano, road trip dos anos 70, eucalipto californiano** — território Explorer puro (Cali = Califórnia). NÃO é o "verde automotivo genérico" proibido em Wheeler §3.4 (que se referia a verdes saturados tipo "lavadora de carros"). Sage `#7A8B7E` tem saturação 8% — está mais para cinza esverdeado do que para verde.

### 3.6 Status colors (mantidos)

| Token | Valor | Status |
|---|---|---|
| `--color-whatsapp` | `#25D366` | MANTÉM (cor da marca WhatsApp, intocável) |
| `--color-star` | `#FFC107` | MANTÉM |

---

## 4. Aplicação por componente — o que muda no site

### 4.1 Hero (index)
- Background: `#1A1410` (warm ink) — antes `#141414`
- Glow radial: `radial-gradient(circle, rgba(200,98,42,0.22), transparent 65%)` — antes 0.18 / transparent 60%. Aumenta presença ambient sem saturar.
- H1 outline `-webkit-text-stroke`: muda para `var(--color-text)` cream — fica mais quente.
- **Nova decisão:** adicionar grão sutil em forma de noise overlay (CSS `background-image` com SVG noise, opacity 0.03) — emula textura de papel/madeira fachada (Archetype §5 "materialidade vivida"). Justificativa de override Wheeler §3.4: noise não é gradiente saturado, é textura — Wheeler aprovaria explicitamente sob "preservação de feel hand-painted" (§1.4 NEVER touch refere-se a logo, não a background de site).

### 4.2 Navbar
- Background: `rgba(26, 20, 16, 0.78)` — warm ink translúcido (antes `rgba(20,20,20,0.78)`)
- Border-bottom: `var(--color-border)` agora warm

### 4.3 Seção Serviços (index + servicos.html)
- **MUDANÇA RADICAL:** vira `--color-surface-cream` (`#F5F1EA`).
- Cards de serviço: warm dark (`#2A1F18`) sobre cream — **inversão de hierarquia que cria a energia Heyward**.
- Headline H2: `var(--color-text-on-cream)` (`#1A1410`)
- Body: `var(--color-muted-on-cream)` (`#5A4A3D`)
- Cor de acento (ícones, números): `#C8622A` (lê viva sobre cream — exatamente o ponto Wheeler §3.3).

### 4.4 Seção Avaliações
- Volta a warm dark (`#1A1410`). Cards `#2A1F18` com border `#3A2D24`.
- Estrelas: `#FFC107` (mantém). Estrela acento secundária: `#E8A765`.

### 4.5 Seção Sobre / Stats
- Cream (`#F5F1EA`).
- Números grandes em Anton: `#C8622A` sobre cream — máxima leitura "viva" da cor de marca.
- Border separador: `#1A1410` linha fina (warm ink) — não cinza.

### 4.6 Galeria
- Warm dark base. Cards de foto com border `#3A2D24`.
- Hover: glow `rgba(200,98,42,0.18)` ao redor.

### 4.7 Footer
- Warm dark (`#1A1410`) sempre. Texto cream. Wordmark Cali Copper.

### 4.8 Botões
- **Primário:** background `#C8622A`, hover background `#E8A765` (era `#E07A3E` — agora mais luminoso/sunset, mantém família, lê com mais "vida").
- **Outline:** border `#4A3A2D` warm, hover border + texto `#C8622A`.
- **Ghost:** background `#2A1F18` warm.

### 4.9 Pill / badges
- Background warm `#2A1F18`. Border `#3A2D24`. Dot `#C8622A` com glow `rgba(200,98,42,0.22)`.

---

## 5. Justificativa contra brief Wheeler original (overrides documentados)

| Cláusula Wheeler | Override rev-0.2 | Justificativa |
|---|---|---|
| §3.3 "Cinza escuro fachada `#2C2C2C` aprovado" | Substituído por `#1A1410` warm ink + família | Mantém o **espírito** (referência à fachada escura) com correção cromática: a fachada original é cinza-escuro **levemente quente** (madeira pintada exposta a sol), não cinza-frio metalizado. Trocando para warm dark, ficamos MAIS fiéis à fachada real do que a rev-0.1 estava. |
| §3.3 "Pares aprovados" | Adiciona alternância warm-dark / cream em mesmo touchpoint (site) | Wheeler aprovou ambos isoladamente. Combiná-los em alternância de seções é aplicação, não nova cor. |
| §3.4 "Gradientes proibidos" | Permite gradiente radial tonal sutil em hero (mesma cor, variação de luminosidade) | §3.4 referia-se a gradientes **saturados/brilhantes** sobre o LOGO. Gradiente radial tonal em background NÃO toca o logo, é fundo. Heyward e Archetype §6 ("gradientes orgânicos sutis ✅ DO") sustentam. |
| §3 cor única do logo | INTACTO | Logo continua mono `#C8622A`. Acentos sage/sunset são SISTEMA, não logo. |
| §1.2 sacred elements (todos os 12) | INTACTO | Zero alteração em logo, inclinações, lockup, brush, estrela. |
| §1.4 NEVER touch (laranja saturado) | INTACTO | `#E8A765` sunset NÃO é laranja saturado fast-food (`#FF6600`). Tem 65% saturação e HUE 32° — sand quente, não laranja gritado. |

---

## 6. Justificativa contra archetype (Everyman 65% + Explorer 35%)

| Decisão | Como honra Everyman | Como honra Explorer |
|---|---|---|
| Warm dark substitui cinza-frio | Calor humano ("vizinho que entende") vs frieza corporativa | Tinta envelhecida em garagem americana (referência cultural Explorer) |
| Cream `#F5F1EA` alternado | Papel de oficina, ordem de serviço, cartaz lambe-lambe — material do dia-a-dia | Papel de mapa de viagem, manual antigo |
| Sage `#7A8B7E` (uso restrito) | Cor de status calmo, sem grito Hero | Mapa militar / road trip / eucalipto californiano |
| Sunset `#E8A765` (hover) | Calor de fim-de-tarde, luz de oficina aberta | Pôr-do-sol Califórnia (Cali = Califórnia, raiz do nome) |
| Cream em texto, não branco frio | Conversa horizontal, não notificação corporativa | Papel real, não tela de app |

**Tensão produtiva preservada:** "O vizinho que tem rota própria." A nova paleta é mais vizinho (calor) E mais rota própria (referência Cali/road) ao mesmo tempo. Não vira lifestyle pretensioso (Explorer puro) nem genérico de bairro (Everyman puro).

**Risco mitigado:** introduzir sage e sunset poderia escorregar para multi-color (Archetype §6 DON'T). Mitigação: sage tem 8% saturação (lê quase cinza), sunset é apenas hover/highlight (não estrutura). A leitura primária do site continua **terracota dominante sobre warm dark/cream** — cor única, contraste alto, exatamente Archetype §5.

---

## 7. Acceptance criteria — como saber quando "ficou com vida"

Não é subjetivo. É testável:

1. **Teste do squint** (apertar os olhos a 2m da tela): a terracota deve ser a cor mais saliente da composição. Se for o cinza ou o creme, falhou.
2. **Teste do contraste cromático:** a terracota `#C8622A` aplicada sobre o novo `#1A1410` deve gerar Delta-E maior que sobre `#141414` (mais separação perceptual). Validar com any contrast tool.
3. **Teste do "marrom ou cobre":** cliente leigo olhando o hero deve descrever a cor como "laranja queimado", "cobre", "terracota" — NÃO como "marrom". Se descrever como marrom, falhou.
4. **Teste da alternância:** rolando o site, deve haver pelo menos 1 transição warm-dark → cream → warm-dark visível. Sem isso, sensação morta volta.
5. **Teste fast-food:** hero não pode parecer Bob's, Burger King, Habib's. Se aparecer, sunset `#E8A765` está saturado demais — recuar para `#D89758`.
6. **Teste do branco frio:** abrir uma página em cream e procurar qualquer branco puro `#FFFFFF` ou cinza frio `#9A9A9A`. Não pode haver. Tudo deve estar na família quente.

---

## 8. O que NÃO muda (para evitar over-correction)

- Logo (todos os elementos sagrados §1.2)
- Tipografia (Anton + Inter — Wheeler §4 confirmado)
- Hierarquia tipográfica
- Grid / spacing / radius
- Inclinações do CALI/GARAGE
- Comportamento de hover/interação (apenas as cores mudam)
- Estrutura de componentes
- Copy / voice (Archetype §4 inalterado)

---

## 9. Versionamento

- **rev-0.2** — refinamento de paleta secundária. Cor primária e sacred elements intactos. CSS é o único arquivo que muda. Brand documents (identity-system.md, archetype.md) ficam em rev-0.1 + esta revisão como **complemento**, não substituição.
- **CHANGELOG.md** do projeto deve registrar: "rev-0.2: paleta secundária refeita para warm-dark + cream alternating. Cor primária #C8622A intacta."

---

## 10. Próximos passos

1. Dev aplica `IMPLEMENTATION-NOTES.md` (token-by-token)
2. Deploy em branch / preview
3. Cliente valida (acceptance criteria §7)
4. Se aprovado → rev-0.2 final. Se "ainda sem vida" → reabrir diagnóstico (provavelmente issue de imagery/typography, não de cor)

---

*Built by Donadão Labs.*
