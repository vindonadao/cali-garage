# Cali Garage — Identity System (rev-0.1)

> Voz: Alina Wheeler. Princípio operacional: **identidade é um sistema, não um logo**. Esta rev é PRESERVATION-FIRST. Não estamos redesenhando — estamos traçando vetorialmente um artefato pintado à mão e construindo o sistema de aplicação que o pincel original não cobre. Cada decisão abaixo é justificada por (a) preservação de equity de 10 anos OU (b) necessidade técnica de um touchpoint específico.

---

## 1. Brand Brief

### 1.1 Diagnóstico do artefato fonte

O logo existente é um **artefato vernacular**: pintado à mão sobre tabuado de fachada cinza-escuro, monocromático em terracota/cobre, com assinaturas de autoria física (textura de cerda, pontos de tinta acumulada, bordas com sangrado, variações milimétricas entre letras repetidas). Não é um logo "ruim que precisa ser consertado". É um logo **com equity geográfico, temporal e cultural acumulado em uma esquina específica de Vila Matias por uma década.** O cliente nunca pediu um redesign. Pediu qualidade técnica para reproduzi-lo digitalmente.

### 1.2 MUST PRESERVE — sacred elements (não-negociável)

1. **Cor única terracota/cobre** na faixa #B85A24–#C8622A. Mono. Sem paleta complementar no logo.
2. **Inclinação +5° a +8° do CALI** (cai para a direita). Esta é a primeira assinatura visual da marca.
3. **Inclinação oposta -2° a -4° do GARAGE** (cai para a esquerda). O contraste de inclinações cria o **balanço assimétrico** que define o ritmo da marca.
4. **Hierarquia de tamanho:** GARAGE = 60–70% da altura do CALI. Não normalizar.
5. **Offset horizontal do GARAGE para a direita** — começa aproximadamente sob o L do CALI, NÃO centralizado sob a palavra de cima.
6. **Estrela de 5 pontas sólida**, com uma ponta visivelmente mais arredondada que as outras. Esta imperfeição é a marca da mão.
7. **Posição da estrela:** à direita de CALI, alinhada ao meio vertical das letras. NÃO acima, NÃO abaixo, NÃO entre palavras.
8. **Swoosh/sublinhado** com taper assimétrico (mais grosso no centro, afina nas pontas) e leve ondulação. Atravessa horizontalmente sob CALI + estrela.
9. **'I' baixo no CALI** — sentado abaixo da linha de base das outras letras, funcionando quase como um sinal de pontuação interno.
10. **Terminal horizontal do 'L'** estendido para a direita, ancorando visualmente a parte inferior do CALI.
11. **Textura de pincel visível** dentro de cada letra, swoosh e estrela. Não pode ser substituída por preenchimento sólido limpo.
12. **Conexão das letras na base** do CALI — elas se tocam, não flutuam separadas.

### 1.3 CAN regularize — para uso digital

Estas regularizações são permitidas **apenas porque** o pincel original não responde bem a contextos digitais específicos. Cada uma tem justificativa técnica:

- **Contorno externo geral** — pode ser suavizado em vetor para evitar pixels rasgados em rasterização sub-72dpi (ex: favicon). A textura interna do pincel deve ser preservada como camada de transparência.
- **Espessura mínima de traço** — em variantes ≤24px, partes muito finas do swoosh podem engrossar até ~20% para sobreviver à rasterização. Acima de 24px, manter espessuras originais.
- **Ângulos de inclinação** — congelados em valores exatos: CALI = +6°, GARAGE = -3°. (As variações milimétricas da pintura humana são coladas neste valor médio porque vetor não vibra como mão.)
- **Cor terracota** — congelada em hex único (ver §3) porque a pintura original tem variação de exposição solar e desbotamento que não traduz para web/print sem virar lama.
- **Pontas da estrela** — vetorizadas com a ponta arredondada preservada (não regularizar todas), mas com bordas limpas para impressão pequena.

### 1.4 NEVER touch — sob nenhuma circunstância

- Não mudar a cor para laranja saturado (#FF6600, #FF7A00 etc.). Perde o feel terracota/californiano e vira fast-food.
- Não centralizar GARAGE sob CALI. Quebra o balanço assimétrico.
- Não nivelar as inclinações. CALI horizontal = morte da identidade.
- Não substituir a estrela por outro símbolo (engrenagem, chave, pneu). A estrela é arbitrária e por isso memorável — engrenagem é genérico de oficina.
- Não recompor o lockup com tipografia digital "parecida". O brush é load-bearing.
- Não adicionar contorno preto, drop shadow, gradiente, bevel, ou qualquer efeito Photoshop. Mata o feel hand-painted.
- Não traduzir/expandir a tagline dentro do logo. "CALI GARAGE" é o lockup completo.

---

## 2. Identity System — variantes

Toda variante deriva do mesmo arquivo-mestre vetorial. Cinco variantes, cinco propósitos. Nada mais.

### 2.1 Primary Lockup — `cali-primary`

- **Composição:** CALI (inclinado +6°) + estrela à direita + swoosh atravessando + GARAGE abaixo (inclinado -3°, offset à direita).
- **Propósito:** representação canônica da marca. É a primeira escolha sempre que houver espaço.
- **Quando usar:** fachada (referência apenas, não substituir pintura), site (header desktop, hero, footer), uniforme bordado peito esquerdo, cartão de visita frente, ordem de serviço cabeçalho, post de Instagram dedicado, foto de capa do Google My Business.
- **Aspect ratio:** ~16:9 (largura:altura ≈ 1.78:1).
- **Tamanho mínimo:** 120px de largura (digital), 30mm (impresso).
- **Construção:** o lockup completo deve sempre ser exportado como uma única unidade — não recompor manualmente.

### 2.2 Stacked Compact — `cali-stacked`

- **Composição:** CALI no topo (mantém inclinação +6°), estrela centralizada abaixo do CALI substituindo o swoosh, GARAGE na base (inclinação -3°, agora centralizado).
- **Propósito:** ocupar containers quadrados ou levemente verticais sem perder reconhecimento das duas palavras.
- **Quando usar:** avatar de Instagram (1:1), avatar de WhatsApp Business, foto de perfil do Google My Business, selo em uniforme nas costas, adesivo redondo, qualquer container entre 1:1 e 3:4.
- **Aspect ratio:** ~1:1.
- **Tamanho mínimo:** 96px (digital), 25mm (impresso).
- **Nota crítica:** esta é a ÚNICA variante onde GARAGE pode ser centralizado, porque o offset à direita não cabe em quadrado. A inclinação -3° deve ser mantida.

### 2.3 Mark-Only — `cali-mark`

- **Composição:** apenas a estrela de 5 pontas sólida, com a ponta arredondada original preservada.
- **Propósito:** marca de reconhecimento secundário, ornamento, watermark, separador.
- **Quando usar:** padrão de fundo (repetido em escala pequena, baixa opacidade), divisor entre seções no site, watermark em foto de portfólio na galeria, selo de "serviço aprovado" em ordem de serviço, ícone de bullet em listas internas, decoração em e-mails/WhatsApp.
- **Aspect ratio:** 1:1.
- **Tamanho mínimo:** 16px (digital), 6mm (impresso).
- **Restrição:** nunca usar mark-only como representação primária da marca em contextos onde o cliente ainda não conhece a oficina. Reservado para reforço, não para introdução.

### 2.4 Wordmark — `cali-wordmark`

- **Composição:** "CALI GARAGE" em layout linear horizontal (CALI + GARAGE lado a lado, sem estrela, sem swoosh, sem stack vertical). Mantém a textura de pincel e as inclinações originais (CALI +6°, GARAGE -3°), mas em uma única linha.
- **Propósito:** assinatura mínima quando o lockup completo é grande demais ou compete visualmente com outros elementos.
- **Quando usar:** rodapé do site (após "© 2026 Cali Garage Reparos Automotivos"), assinatura de e-mail, marca d'água em PDF de orçamento, créditos em vídeos, footer de Instagram Story.
- **Aspect ratio:** ~5:1 (bem horizontal).
- **Tamanho mínimo:** 100px de largura (digital), 25mm (impresso).
- **Quando NÃO usar:** como marca principal em qualquer touchpoint primário. Esta variante é deliberadamente discreta.

### 2.5 Monogram — `cali-monogram`

- **Composição:** letra C maiúscula isolada (mesmo brush, mesma inclinação +6°) com a estrela posicionada ao lado direito superior, no espaço côncavo do C.
- **Propósito:** representação atômica da marca quando nem a estrela sozinha é reconhecível o suficiente.
- **Quando usar:** favicon 16×16 e 32×32, app icon iOS/Android se algum dia houver app, ícone de pin no Google Maps customizado, selo bordado em boné, monograma em chaveiro promocional.
- **Aspect ratio:** 1:1.
- **Tamanho mínimo:** 16px (digital), 8mm (impresso).
- **Construção:** o C deve ser claramente identificável mesmo a 16px — a estrela apenas confirma. Não usar a estrela sozinha em favicon (regra §2.3).

---

## 3. Color System

### 3.1 Cor primária

- **Cali Copper** — `#C8622A`
  - RGB: 200 / 98 / 42
  - CMYK: 0 / 60 / 80 / 15
  - Pantone aprox: 7578 C (validar em prova física)
  - HSL: 19° / 65% / 47%

Esta cor é o resultado de uma média ponderada das amostras de pixel da fachada original, com ajuste leve para saturação web (a pintura desbotada lê mais opaca; o digital exige um pouco mais de vivacidade para parecer a mesma coisa). É terracota com toque de queimado. NÃO é laranja.

### 3.2 Variações funcionais

Todas as variações servem APENAS para garantir contraste em fundos diversos. A cor primária é sempre a primeira escolha.

| Variação | Hex | Uso |
|---|---|---|
| Cali Copper (primária) | `#C8622A` | Fundos claros (branco, cinza-claro, creme). Default. |
| Cali Copper Light | `#E08A52` | Fundos escuros onde o copper original perde luminosidade. Usar APENAS se contraste WCAG AA falhar. |
| Mono Black | `#1A1A1A` | Fax, impressão p&b, quando contexto exige neutralidade absoluta (ex: ordem de serviço estilo ofício). |
| Mono White (knockout) | `#FFFFFF` | Sobre fundos da paleta secundária escura. O logo inteiro vira branco, preserva todas as outras características. |
| Burnt Edition (raro) | `#9B4A1F` | Versão envelhecida para contextos vintage/promocionais. NÃO usar como cor padrão. |

### 3.3 Pares de fundo aprovados

| Fundo | Hex | Variante do logo | Status |
|---|---|---|---|
| Branco puro | `#FFFFFF` | Cali Copper `#C8622A` | APROVADO — default |
| Creme/off-white | `#F5F1EA` | Cali Copper `#C8622A` | APROVADO — preferido para impresso |
| Cinza claro | `#E5E5E5` | Cali Copper `#C8622A` | APROVADO |
| Cinza escuro fachada | `#2C2C2C` | Cali Copper `#C8622A` | APROVADO — referência à fachada original |
| Preto | `#000000` | Mono White `#FFFFFF` | APROVADO — knockout |
| Cali Copper sólido | `#C8622A` | Mono White `#FFFFFF` | APROVADO — uso decorativo, não para leitura primária |

### 3.4 Pares de fundo PROIBIDOS

- Qualquer azul saturado (compete cromaticamente com terracota — vira esquema de time de futebol).
- Verde (associação automotiva genérica, sem identidade).
- Vermelho saturado (canibaliza o calor da cor principal).
- Gradientes (matam a integridade do brush).
- Fotos com áreas terracotas (logo desaparece).

---

## 4. Typography Pairing

O logo é o **único elemento brush** do sistema. Toda tipografia ao redor deve ser **geometricamente limpa** para que o logo respire e não compita. Esta é a regra estrutural.

### 4.1 Display — headlines

- **Font:** Anton (já em uso no site) — CONFIRMADA.
- **Justificativa:** condensada, alta-x, geométrica industrial. Conversa com o feel "garage" sem imitar o brush. Contraste estrutural com o logo: o logo é orgânico, o headline é geométrico.
- **Regras de uso:** apenas em maiúsculas. Tracking +20 em tamanhos ≥48px, 0 em ≤32px. Nunca em itálico (não tem itálico de verdade — falsos itálicos quebram o caráter).
- **Pesos:** Regular (único peso disponível, e suficiente).

### 4.2 Body & UI

- **Font:** Inter (já em uso no site) — CONFIRMADA.
- **Justificativa:** neutra, otimizada para tela, alta legibilidade em qualquer corpo. Não compete com o logo em nenhum contexto.
- **Regras de uso:** Regular (400) para body, Medium (500) para labels e CTA, SemiBold (600) para sub-headlines, Bold (700) para ênfase isolada. Nunca usar Light/Thin (perde peso e some perto do logo).
- **Tracking:** padrão (0). Não ajustar.

### 4.3 Pairing rules

- **Logo nunca toca tipografia.** Sempre clearspace (ver §5).
- **Anton e Inter nunca aparecem em brush, script, ou estilo decorativo.** São o contraponto limpo.
- **Não introduzir uma terceira família.** Se você sente vontade de adicionar uma fonte "fofa" ou "moderna" extra — não.
- **Tagline opcional** ("Reparos Automotivos", "Vila Matias desde 2015" etc.): sempre Inter Medium em caixa-alta com tracking +80–100, em tamanho 30–40% da altura do CALI. Posicionada FORA do clearspace do logo, nunca colada nele.

---

## 5. Clearspace & Minimum Sizes

### 5.1 Clearspace

A unidade de medida é **X = altura do CALI** (medida da base do C ao topo do C, sem incluir descida do J ou ascensão imaginária).

- **Clearspace mínimo em todos os lados:** `0.5 × X`
- **Clearspace ideal:** `1.0 × X`
- **Clearspace em contextos premium (cartão de visita, capa de manual):** `1.5 × X`

Nada — nem outro logo, nem texto, nem borda, nem foto, nem ícone — pode invadir esta área. Especialmente: o swoosh já tem seu próprio "respiro embutido"; não comprimir achando que ele protege a base.

### 5.2 Tamanhos mínimos por variante

| Variante | Digital min | Impresso min | Bordado min |
|---|---|---|---|
| Primary Lockup | 120px largura | 30mm largura | 50mm largura |
| Stacked Compact | 96px largura | 25mm largura | 40mm largura |
| Wordmark | 100px largura | 25mm largura | 40mm largura |
| Mark-Only (estrela) | 16px | 6mm | 12mm |
| Monogram (C + estrela) | 16px | 8mm | 15mm |

**Bordado tem mínimo maior** porque ponto de bordado tem espessura mínima física (~1mm) e textura de brush precisa de área para ser legível como brush, não como mancha.

### 5.3 Tamanhos por contexto (referência rápida)

- Favicon: 16×16, 32×32 → Monogram
- Header de site (desktop): ~180px largura → Primary Lockup
- Header de site (mobile): ~140px largura → Primary Lockup
- Hero (página inicial): 320–480px largura → Primary Lockup
- Avatar Instagram/WhatsApp: 320×320 → Stacked Compact
- Foto de capa Google My Business: 1080×608 → Primary Lockup centralizado com clearspace 2×X
- Cartão de visita 90×50mm: logo ~35mm → Primary Lockup
- Polo bordada: 60mm largura → Primary Lockup OU 40mm Stacked Compact
- Boné: 50mm largura → Stacked Compact OU Monogram
- Adesivo carro promocional: 200mm largura → Primary Lockup
- Fachada (referência apenas): preservar pintura original — não substituir

---

## 6. Application Guidelines

### 6.1 Web

- **Header:** Primary Lockup à esquerda, ~180px largura desktop, ~140px mobile. Linkado para home. Sempre Cali Copper sobre branco/creme.
- **Favicon:** Monogram em 16×16, 32×32, 180×180 (apple-touch-icon). Exportar como PNG transparente + SVG.
- **Hero:** Primary Lockup pode aparecer no hero se o headline for curto e não competir. Senão, deixar Anton dominar e usar só Wordmark no rodapé.
- **Footer:** Wordmark em Mono Black ou Cali Copper, 24–32px altura, ao lado de "© 2026". NUNCA Primary Lockup no footer (quebra hierarquia).
- **Open Graph / social share:** imagem 1200×630 com Stacked Compact centralizado sobre fundo creme `#F5F1EA`, clearspace generoso (2×X em todos os lados).

### 6.2 Fachada (existente)

- **NÃO SUBSTITUIR a pintura original.** A fachada É o artefato fonte. É o equity acumulado. Repintar com vetor "limpo" destrói 10 anos de identidade.
- **Manutenção permitida:** retoque pontual de áreas desbotadas pelo sol, usando a cor `#C8622A` como referência. Contratar pintor para retocar mantendo as imperfeições, NÃO um designer para "redesenhar".
- **Documentação:** fotografar a fachada anualmente em luz neutra (sem sol direto, ~10h ou ~16h) para arquivar evolução. Esta documentação é parte do brand asset.

### 6.3 Uniforme

- **Polo bordada (peito esquerdo):** Primary Lockup, 60mm largura, em Cali Copper sobre cinza-escuro (referência à fachada) ou branco. Bordado ponto cheio, sem contorno externo extra.
- **Polo bordada (costas):** Stacked Compact, 200mm largura, mesma cor. Opcional.
- **Boné:** Stacked Compact, 50mm largura. OU Monogram se boné tiver patch frontal pequeno.
- **Avental/macacão:** Primary Lockup peito esquerdo, 80mm largura.

### 6.4 Ordem de serviço impressa

- **Cabeçalho:** Primary Lockup à esquerda, 40mm largura, em Cali Copper.
- **Dados da empresa (CNPJ, endereço, telefone) à direita:** Inter Regular 9pt, mono black.
- **Footer:** Wordmark 20mm largura em Mono Black, centralizado.
- **Papel:** off-white `#F5F1EA` se possível, branco standard se não.

### 6.5 Recibo / nota fiscal

- **Header:** Wordmark (não Primary Lockup — economia de tinta + contexto fiscal pede formalidade) em Mono Black, 25mm largura.
- **Sem estrela, sem swoosh.** Contexto fiscal não é momento de marca, é momento de transação.

### 6.6 Instagram

- **Avatar:** Stacked Compact em Cali Copper sobre creme `#F5F1EA`, 320×320, clearspace 1.5×X. Nunca usar Mark-Only no avatar (fica genérico).
- **Story (1080×1920):** Primary Lockup no topo (margem segura 250px do topo) em ~400px largura. Deixar conteúdo dominar o restante.
- **Post grid:** Primary Lockup como assinatura discreta no canto inferior direito, ~120px largura, opacidade 100%, Cali Copper. NÃO repetir em todo post — pesar a frequência (~1 a cada 3 posts).
- **Reels:** Wordmark como assinatura final (3s de duração, fundo creme).

### 6.7 Google My Business

- **Foto de perfil:** Stacked Compact, mesma especificação do avatar Instagram.
- **Foto de capa:** foto real da fachada (a pintura original é o melhor "logo aplicado" possível). Se foto não estiver disponível, Primary Lockup centralizado sobre fundo creme.
- **Posts/atualizações:** Primary Lockup como assinatura.

### 6.8 Cartão de visita

- **Frente:** Primary Lockup centralizado, 35mm largura, sobre fundo creme `#F5F1EA`. Sem mais nada.
- **Verso:** dados de contato em Inter Regular 8pt, mono black. Mark-Only (estrela) como marcador de bullet ao lado do telefone/endereço, em Cali Copper.
- **Papel:** uncoated 350g, cor off-white. NÃO usar verniz, hot-stamping, relevo. O brush deve permanecer aparente como pintura, não virar artefato premium-corporativo.

### 6.9 WhatsApp Business

- **Foto de perfil:** Stacked Compact, mesma especificação do avatar Instagram.
- **Mensagem de saudação automática:** texto plano, sem ASCII art do logo. O logo está no avatar.
- **Catálogo de serviços:** cada item pode ter Mark-Only como ícone de bullet.

---

## 7. Do / Don't

### 7.1 DO

1. **Preserve a inclinação assimétrica em todas as variantes** (CALI +6°, GARAGE -3°). Esta é a impressão digital da marca.
2. **Use a cor `#C8622A` como única expressão cromática do logo.** Mono é parte da identidade.
3. **Mantenha a textura de pincel visível em qualquer tamanho ≥24px.** Abaixo disso, simplifique apenas o necessário para legibilidade.
4. **Respeite o offset horizontal do GARAGE** (começando sob o L do CALI) na variante Primary.
5. **Trate o logo como um artefato pintado** — não como um arquivo digital genérico. Pense "esta é uma fotografia vetorizada de uma pintura", não "este é um logo desenhado no Illustrator".

### 7.2 DON'T

1. **Não use laranja saturado** (`#FF6600`, `#FF7A00`, `#FF8C00`). Vira fast-food. A cor é terracota queimada, não laranja.
2. **Não centralize GARAGE sob CALI** na variante Primary. Centralizar quebra o balanço assimétrico que define a marca.
3. **Não nivele as inclinações.** CALI horizontal e GARAGE horizontal = logo morto.
4. **Não substitua o brush por uma fonte digital "parecida"** (Permanent Marker, Bangers, etc.). O brush é o artefato — uma fonte similar é falsificação.
5. **Não adicione efeitos** (drop shadow, gradiente, contorno externo, bevel, glow, outline duplo). O logo é plano, monocromático, sem ornamentação digital.

---

## 8. Versioning Notes

### 8.1 Status desta revisão

- **rev-0.1** é a primeira revisão da identidade digital sistematizada.
- O logo de fachada (artefato físico) é considerado **rev-0.0** — fonte canônica. Não tem arquivo, só existe pintado.
- Esta rev estabelece o **baseline** sobre o qual todas as futuras revisões devem se justificar.

### 8.2 O que justifica uma nova revisão minor (rev-0.x)

- Adição de uma variante nova (ex: animação de logo para motion).
- Ajuste de um valor de tamanho mínimo após teste de campo.
- Documentação de um novo touchpoint não previsto aqui.
- Correção de inconsistência interna deste documento.

### 8.3 O que justifica uma nova revisão major (rev-1.0+)

- Reposicionamento estratégico da marca aprovado pelo cliente.
- Mudança de nome (improvável).
- Repintura completa da fachada (evento crítico — exige nova captura, novo trace).
- Expansão de serviços que demanda lockups secundários (ex: "Cali Garage Elétrica", "Cali Garage Funilaria").

### 8.4 O que NÃO justifica revisão

- "Estou cansado da cor". Não. A cor é equity.
- "O CALI inclinado parece errado". É proposital. É a marca.
- "Logos modernos são minimalistas e geométricos". Cali Garage não é uma startup. É uma oficina vernacular de 10 anos.
- Tendência visual da estação. Sistema bem feito é resistente a moda.

### 8.5 Governança

- Toda nova aplicação ou contexto não previsto neste documento deve ser **adicionada ao §6** antes de ser produzida.
- Todo novo asset gerado deve ser arquivado em `/Users/donadao/cali-garage/rev-0.1/brand/assets/` com naming convention: `caligarage-{variante}-{cor}-{tamanho}.{ext}`.
- O CHANGELOG.md do projeto deve registrar qualquer alteração neste sistema.

---

*Sistema construído em rev-0.1, baseado em artefato fonte rev-0.0 (pintura de fachada, Vila Matias, Santos/SP). Princípio: preservation-first. Próxima revisão: somente quando justificada por necessidade técnica documentada ou decisão estratégica do cliente.*
