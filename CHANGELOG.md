# Changelog — Cali Garage

Todas as mudanças significativas neste projeto são documentadas aqui.

Versionamento por revisões: `rev-X.Y` onde:
- **X** = major redesign (mudança estrutural de visual language ou IA)
- **Y** = iteração / refinamento dentro do mesmo redesign

---

## rev-0.10.1 — Released (2026-09-06)

### Foco
Resposta à auditoria externa de 2026-09-06. Cada achado foi confrontado com o código e com a resposta de produção antes de virar tarefa. Veredito item a item em [`AUDIT-2026-09-06.md`](./AUDIT-2026-09-06.md).

**Dos 10 achados: 5 procedem e foram corrigidos, 4 não procedem, 1 é decisão de produto já tomada.**

### Corrigido
- **CSP sem `'unsafe-inline'` em `script-src`.** O único bloco inline é o JSON-LD, que é *data block* e não é executado, então a diretiva era desnecessária. Testado antes de aplicar, reescrevendo o header no navegador: zero violações, JSON-LD válido, `main.js` rodando.
- **`favicon.ico`** multi-resolução (16/32/48/64) gerado do SVG oficial, com `<link rel="alternate icon">` nas 8 páginas. Antes respondia 404.
- **Cor do favicon corrigida.** Achado que a auditoria não pegou: o `favicon.svg` ainda usava `#C8622A`, a cor anterior à rev-0.3. Nunca recebeu o override para `#DD6520`.
- **Texto pequeno no mobile.** A auditoria mediu 12,5px; o menor real era **11,2px** em três pontos (label do selo, badge do billboard, títulos do rodapé). Subiram para 12,8px.
- **`BreadcrumbList`** nas 6 subpáginas. A home mantém o `AutoRepair`. **Não** foi adicionado `AggregateRating` em `/avaliacoes`: já existe na home, e duplicar rating em página secundária é o caso que o Google penaliza.

### Falsos positivos registrados (não reabrir)
- **HSTS ausente** — presente e mais forte que o recomendado: 2 anos, `includeSubDomains`, `preload`. **Segunda vez que esse mesmo falso positivo aparece**, já constava do `AUDIT-2026-06-04.md`. A ferramenta parece checar o header na resposta do redirect `http://`, não na do documento.
- **Telefone placeholder** — `(13) 3222-3456` é o número real, confirmado no perfil do Google da oficina.
- **Âncora vazia no rodapé** — são os CTAs em estado fechado, todos com `aria-label`. A "vazia" é a flutuante, que tem SVG no lugar de texto.
- **GrowthBook** — extensão do navegador do auditor, como a própria auditoria concluiu. Também já constava de junho.

### Confirmado como pendência real
- **Analytics**: o GA4 não é esquecimento, estava represado de propósito esperando o domínio próprio. Com `caligarage.com.br` no ar, **destravou**.

### Verificação
7 páginas no Chrome real, 390px e 1280px: sem erro de console, sem 4xx, sem overflow, CTAs bloqueados corretos, CSP nova sem violação, `favicon.ico` em 200.

---

## rev-0.10 — Released (2026-09-06)

### Foco
**O site saiu do subdomínio da agência e passou a viver em `caligarage.com.br`**, na conta Vercel do próprio cliente. Fecha a pendência que travava GA4, Search Console e reenvio de sitemap desde junho.

### 1. Titularidade corrigida
O site rodava na conta Vercel da Donadão Labs (`vindonadaos-projects`), enquanto o Ops já estava na conta do cliente. Era a exceção à regra de titularidade do projeto, e só ficou evidente quando os nameservers do domínio do cliente foram apontados para a nossa conta.

- Projeto **`cali-garage-site`** criado no time `cali-garage` da conta do cliente (`caligaragerepauto-3832`), ao lado do `cali-garage-ops`.
- Deploy validado lá antes de mexer no domínio: home, páginas internas e a 404.
- `caligarage.com.br` e `www` removidos da conta da agência e adicionados ao projeto novo. A Vercel não aceita o mesmo domínio em duas contas.
- Deploy passou a usar o token concedido pelo cliente, revogável por ele.

### 2. Domínio e DNS
O domínio já estava comprado (31/08/2026). Os nameservers foram apontados para a Vercel direto no Registro.br, então a zona inteira é gerenciada por lá.

- Propagação levou cerca de 3h40, dentro do que o Registro.br informou.
- SSL Let's Encrypt emitido sozinho assim que o DNS resolveu.
- **CAA**: a Vercel já mantém os dela na zona (`letsencrypt.org`, `pki.goog`, `sectigo.com`). Foi acrescentado apenas o `iodef`, que manda relatório de violação para o e-mail da agência. O `issuewild ";"` **não pôde ser criado**: a API da Vercel exige FQDN e recusa o `;`. Wildcard segue sem bloqueio explícito, limitado apenas às três CAs acima.
- **DNSSEC continua desativado, de propósito.** O automático do Registro.br só funciona com a zona operada por ele, e a zona da Vercel não é assinada. Publicar DS apontando para zona não assinada derruba o domínio para quem valida.

### 3. URLs do código
As 35 referências a `caligarage.donadaolabs.com` em 10 arquivos (8 páginas, `robots.txt`, `sitemap.xml`) passaram para `caligarage.com.br`. Canonical, `og:url`, `og:image`, sitemap e robots. Assets subiram para `?v=0.10.0`.

O link da assinatura da Donadão Labs no rodapé foi mantido, que é o único `donadaolabs.com` que deve continuar no site.

### 4. www redirecionando
`www.caligarage.com.br` servia **200 com o mesmo conteúdo do apex**, o que é conteúdo duplicado. Passou a responder **308** para o apex, via bloco `redirects` com `has` de host no `vercel.json`.

### Verificação em produção
| Item | Resultado |
|------|-----------|
| 7 páginas | 200, canonical apontando para a própria URL limpa |
| 404 | 404 com a página própria |
| `www` | 308 para o apex |
| `http://` | 308 para HTTPS |
| HSTS | `max-age=63072000; includeSubDomains; preload` |
| sitemap | 7 URLs no domínio novo |
| robots | `Sitemap:` no domínio novo |

### Fase 6b executada (06/09/2026)
`caligarage.donadaolabs.com` foi **desvinculado do projeto** `cali-garage` na conta da agência e passou a responder 404. Nenhum registro DNS precisou ser removido: o subdomínio resolvia pelo wildcard `*` da zona de `donadaolabs.com`, que serve outros subdomínios e foi preservado. Confirmado logo após: subdomínio 404, `caligarage.com.br` 200.

Restou o projeto `cali-garage` órfão na conta da agência, sem domínio além do `.vercel.app`. Pode ser apagado.

### Pendências
- **Search Console**: adicionar a propriedade e submeter o sitemap. Destravado agora.
- **GA4**: destravado. Plano em `rev-0.10/notes.md`, falta conta e Measurement ID.
- **E-mail** `contato@caligarage.com.br`: aguardando decisão do dono. Resend Inbound resolve sem custo.
- **HSTS preload**: submeter em hstspreload.org agora que o domínio é definitivo.
- **Fotos da oficina**: seguem pendentes.

---

## rev-0.9.10 — Released (2026-09-05)

### Foco
Auditoria ponta a ponta do site pedida pelo brand owner, mais a limpeza dos travessões. Objetivo declarado: que o site não pareça feito por IA nem jogado às pressas.

### 1. Travessões fora da copy
Travessão no meio da frase é uma das marcas mais reconhecíveis de texto gerado por IA. As 48 ocorrências foram tratadas por categoria:

- **Copy visível**: virou vírgula ou frase reescrita. "Uma oficina nascida para tratar carros — e pessoas — com respeito" virou "Aqui o carro e as pessoas recebem o mesmo respeito". Em `/servicos`, `/sobre` e na Política de Privacidade, os apostos passaram a usar vírgula.
- **Endereços** nos sete rodapés: "Vila Matias — Santos/SP" virou "Vila Matias, Santos/SP".
- **Títulos e `og:title`**: o separador virou `|`, que é o padrão de mercado e não denuncia nada. "Contato — Cali Garage" virou "Fale com a Cali Garage".
- **Atributos de acessibilidade**: `aria-label="Cali Garage — Início"` virou "Cali Garage, início".

Sobraram travessões apenas em comentários de CSS e JS, que ninguém vê.

### 2. Bug de SEO: canonical apontando para URL que redireciona
O `vercel.json` usa `cleanUrls`, então `/sobre.html` responde **308** para `/sobre`. Só que o `<link rel="canonical">` e o `og:url` de cada página apontavam justamente para a versão `.html`. A página servida em `/sobre` declarava como canônica uma URL que redireciona de volta para ela mesma, e o `sitemap.xml` listava as sete no formato `.html`.

Canonical, `og:url` e sitemap passaram a usar as URLs limpas. Os links internos continuam com `.html` de propósito: é o que mantém o preview local (`python3 -m http.server`) funcionando, e o 308 é permanente e cacheado.

### 3. Página 404 própria
Antes, um endereço errado caía na tela cinza da Vercel ("The page could not be found"), sem identidade e sem saída. Agora existe `404.html` no visual do site, com quatro caminhos (serviços, avaliações, contato, início), `noindex, follow`, e a mesma tarja de horário das demais páginas.

### 4. "Avalie no Google" leva ao perfil
O link apontava para uma busca no Google. Agora vai direto ao perfil no Maps, o mesmo do `sameAs` do JSON-LD.

### Auditoria: o que foi verificado
| Item | Resultado |
|------|-----------|
| Links internos | 7 destinos, todos existem |
| Âncoras `#` | nenhuma quebrada |
| Links externos | wa.me, Instagram, donadaolabs.com, Maps, perfil do Google: todos 200 |
| Arquivos | sitemap, robots, og-cover, favicon, logo, css, js: todos 200 |
| `<a>` sem href ou sem texto | nenhum (com a oficina aberta) |
| `<img>` sem alt | nenhum, porque **não há `<img>` no site** |
| Erros de console | nenhum, nas 8 páginas |
| Recursos 4xx/5xx | nenhum |
| Hierarquia de headings | exatamente um `h1` por página |
| JSON-LD | válido, `AutoRepair`, 4.8 · 18, dois períodos de horário |
| Meta description | presente nas 8 páginas |
| Overflow horizontal | nenhum, em 390px e 1280px |

### Pendência conhecida
**Fotos reais da oficina.** A galeria segue com 8 placeholders e o site não tem uma única tag `<img>`. O brand owner informou que as fotos virão depois. Enquanto isso, o `og-cover.jpg` cobre o preview de compartilhamento.

### Files modificados
- `rev-0.1/*.html` — travessões, canonical, `og:url`, títulos
- `rev-0.1/404.html` — novo
- `rev-0.1/sitemap.xml` — URLs limpas e `lastmod`
- `CHANGELOG.md` — esta entrada

---

## rev-0.9.9 — Released (2026-09-05)

### Foco
Refino do aviso de fechado, tudo pedido pelo brand owner depois de ver a rev-0.9.8 no ar.

### 1. O aviso agora diz que o WhatsApp destrava sozinho
Antes: "Fechado agora. Abrimos na quarta às 7h30." O visitante via o botão apagado e podia achar que o site estava quebrado. Agora a frase liga uma coisa à outra:

> "Fechado agora. **O WhatsApp é liberado na quarta às 7h30.** Funcionamos de segunda a sexta, 7h30 às 12h e 14h às 18h."

No almoço: "Fechado para o almoço. O WhatsApp é liberado de volta às 14h." Com a oficina aberta, o tooltip também confirma: "Aberto agora, o WhatsApp está liberado."

A mesma frase serve tarja, tooltip e nota do asterisco, de uma fonte só.

### 2. Asterisco no "Pronto para resolver hoje?"
O bloco final da home promete resolver **hoje**, o que não se cumpre num sábado. Fora do expediente o título ganha `*` e aparece abaixo do botão a nota com o estado, o horário e um link para `/contato`. Com a oficina aberta o asterisco some: aí o "hoje" se cumpre e não há o que ressalvar.

### 3. Ponto pulsante na tarja
Pedido de "algo piscando para chamar atenção", resolvido como **pulso lento** (2,4s, opacidade + halo) em vez de pisca-pisca. Conteúdo que pisca rápido é gatilho de acessibilidade (WCAG 2.3.1) e atrapalha a leitura da própria frase. Reutiliza o vermelho `#E5484D` que o selo de status já usava, e desliga em `prefers-reduced-motion`.

### Decisão registrada
**Pontos facultativos ficam fora** da lista de feriados, por ora, por decisão do brand owner. Se a oficina fechar em algum (quarta-feira de cinzas, vésperas), o site vai anunciar que está aberta num dia de portas fechadas.

### Verificação
Três estados no Chrome real, em 390px e 1280px: fechado no fim de semana, almoço e aberto. Texto da tarja, presença do asterisco, texto da nota e tooltip conferidos em cada um. Sem erro de console.

### Files modificados
- `rev-0.1/index.html` — `<sup>` do asterisco e `<p class="cta-note">`
- `rev-0.1/js/main.js` — `bannerLabel()` reescrita, `updateCtaAsterisk()`, tooltip de aberto
- `rev-0.1/css/style.css` — `.cta-asterisk`, `.cta-note`, `.closed-banner::before` e `@keyframes banner-pulse`
- `rev-0.1/*.html` — `?v=0.9.9` nos assets
- `CHANGELOG.md` — esta entrada

---

## rev-0.9.8 — Released (2026-09-05)

### Foco
A lógica de feriados só conhecia os **nacionais**. Faltavam o feriado estadual de São Paulo e os municipais de Santos, que são justamente onde a oficina fica.

Apontado pelo brand owner: a tarja dizia "Abrimos na terça às 7h30" num fim de semana em que a terça, 08/09, é o Dia de Nossa Senhora do Monte Serrat, padroeira de Santos. A oficina estaria fechada e o site mandaria o cliente aparecer.

### Datas adicionadas a `holidaysBR()`
| Data | Feriado | Esfera |
|------|---------|--------|
| 26/01 | Aniversário de Santos | Municipal |
| 09/07 | Revolução Constitucionalista de 1932 | Estadual (SP) |
| 08/09 | N. Sra. do Monte Serrat, padroeira | Municipal |

Fonte: art. 245 da Lei Orgânica do Município de Santos, citado pela própria Prefeitura, e o Decreto nº 11.111/2025, que fixa o calendário de 2026. A Sexta-feira Santa e o Finados também são municipais em Santos, mas já entravam pela lista nacional.

### Efeito imediato
Neste fim de semana a segunda (07/09, Independência) e a terça (08/09, Monte Serrat) são feriados em sequência. A tarja passou de "Abrimos na terça" para **"Abrimos na quarta às 7h30"**, e o rótulo dos botões acompanha.

### Verificação
Suíte de horário ampliada de 16 para **19 casos**, todos passando. Os três novos cobrem exatamente as datas adicionadas: 26/01, 09/07 e a cadeia sáb + dom + 07/09 + 08/09 desembocando na quarta.

### Files modificados
- `rev-0.1/js/main.js` — `holidaysBR()`
- `rev-0.1/*.html` — `?v=0.9.8` nos assets
- `CHANGELOG.md` — esta entrada

### Em aberto
Pontos facultativos (quarta-feira de cinzas, vésperas) não estão na lista: valem para a prefeitura, não necessariamente para a oficina. Confirmar com o dono se ele fecha em alguma dessas datas.

---

## rev-0.9.7 — Released (2026-09-05)

### Foco
O bloqueio de WhatsApp entregue na rev-0.9.6 **não chegou a quem já tinha visitado o site**. Correção do cache, mais o aviso de horário que o bloqueio pedia para funcionar bem.

### 1. Bug: assets em cache eterno sem versão (a causa do bloqueio não funcionar)
O `vercel.json` serve `css` e `js` com `Cache-Control: public, max-age=31536000, immutable`, e as páginas referenciavam `./css/style.css` e `./js/main.js` sem qualquer versão. Para qualquer visitante que já tivesse aberto o site, o navegador continuou servindo o **JavaScript antigo**, sem o bloqueio, por até um ano. Foi assim que o primeiro teste do brand owner caiu direto no WhatsApp num sábado.

O erro passou pela verificação porque os testes rodam em contexto novo do Playwright, sempre sem cache. Verificação de deploy com cache quente virou item obrigatório.

- As 7 páginas passaram a referenciar `./css/style.css?v=0.9.7` e `./js/main.js?v=0.9.7`.
- **A partir daqui, toda alteração em `style.css` ou `main.js` exige subir esse `?v=`**, senão a mudança não chega em quem já visitou.

### 2. Tarja de aviso no topo
Fora do expediente, uma faixa fixa no topo de todas as páginas informa o estado e o horário completo, antes de o visitante tentar clicar em qualquer coisa:

- Sábado: "Fechado agora. Abrimos na terça às 7h30. Atendemos de segunda a sexta, 7h30 às 12h e 14h às 18h."
- No almoço: "Fechado para o almoço. Voltamos às 14h. …"
- Véspera de dia útil: "Fechado agora. Abrimos amanhã às 7h30. …"

Usa dia por extenso, porque na tarja sobra espaço, diferente do rótulo do botão. É `role="status"`, nasce `hidden` no HTML e só aparece por JS. O `.site-header` é `position: fixed`, então desce junto: o JS mede a altura real da tarja (no mobile a frase quebra em duas linhas) e grava em `--banner-h`, que empurra o header e o `padding-top` do body.

### 3. Tooltip com o horário nos dois estados
O `title` dos CTAs de WhatsApp agora sempre traz o horário de funcionamento. Aberto: "Aberto agora. Atendemos de segunda a sexta, 7h30 às 12h e 14h às 18h." Fechado: a mesma frase da tarja. O `aria-label` acompanha.

### 4. Rede de segurança no clique
Listener em fase de captura no `document` que dá `preventDefault` em `[data-wa-cta].is-closed`. Cobre o clique que chegue antes do estado ser aplicado e o caso de algo reintroduzir o `href`. O bloqueio deixou de depender só da remoção do atributo.

### Decisões
- Cor do botão fechado: **cinza**, não vermelho. Cinza é o código visual de desabilitado; vermelho seria lido como erro.
- Tarja escolhida em vez de aviso só junto ao botão: quem entra por `/servicos` ou clica no botão flutuante também precisa da informação.

### Verificação
- Quatro estados no Chrome real, em 390px e 1280px: aberto, almoço, fechado no fim de semana e fechado à noite. Texto da tarja, deslocamento do header, `padding-top` do body, `title`, presença do `href` e ausência de navegação no clique. Sem erro de console, sem overflow horizontal.
- As 7 páginas revalidadas com a contagem de CTAs bloqueados.
- Os 16 casos de fronteira da lógica de horário continuam passando.

### Files modificados
- `rev-0.1/{index,sobre,servicos,galeria,avaliacoes,contato,privacidade}.html` — tarja + `?v=` nos assets
- `rev-0.1/js/main.js` — `bannerLabel()`, `updateClosedBanner()`, tooltip, listener de captura
- `rev-0.1/css/style.css` — `.closed-banner` e o deslocamento do header
- `CHANGELOG.md` — esta entrada

---

## rev-0.9.6 — Released (2026-09-05)

### Foco
Dois pedidos do cliente: atualizar a prova social pelo que o Google mostra hoje e tirar do site a linguagem de agendamento, porque a oficina não trabalha com hora marcada. Durante a coleta dos dados do Google apareceu um terceiro problema, mais grave: as avaliações publicadas eram fictícias.

### 1. Avaliações reais no lugar das fictícias
Os 6 depoimentos de `/avaliacoes` (Rafael M., Juliana S., Carlos A., Mariana P., Paulo R., Fernanda L.) eram placeholder do rascunho inicial e nunca foram substituídos. Nenhum deles existe no perfil do Google. Foram trocados pelas **10 avaliações reais com texto**, da mais recente para a mais antiga, com nome abreviado (primeiro nome + inicial).

Os textos receberam **edição leve** por decisão do brand owner: ortografia e pontuação corrigidas, e cortes de trechos que atrapalhavam a leitura sem acrescentar nada. O caso claro era "Pai Carlinhos, Filho Fabricio 3 Irmã Do Carlinhos Sônia, Estão em Boas Mãos", reduzido a "Estão em boas mãos." Em outro depoimento saiu apenas o "ou qualquer outro enganador", mantendo o "para te livrar de auto center": o argumento fica, o xingamento ao concorrente não. Nenhuma edição inverteu ou inflou o sentido de nenhum depoimento. A nota de rodapé da página passou a dizer "com edição leve de pontuação", para não afirmar citação literal.

Coleta feita em 2026-09-05 no painel de comentários do Google (o perfil do Maps sem login não expõe a lista). Perfil hoje: **4,8 estrelas · 18 avaliações** — eram 4,7 e 15.

- **Nota e contagem** atualizadas nas 7 páginas: rodapé, meta description, `og:description`, `title` de `/avaliacoes`, bloco de resumo, stats de `index` e `sobre`, e o feature card ("Quinze clientes" → "Dezoito clientes").
- **`index.html` (JSON-LD)**: `aggregateRating` de `4.7`/`15` para `4.8`/`18`. É o campo que o Google lê para exibir a nota na busca.
- **`index.html` (hero)**: os avatares eram as iniciais dos nomes fictícios (R, J, C, M). Agora são as dos quatro clientes reais mais recentes (A, M, G, K).

Das 18 avaliações, 10 têm texto e entraram no site, 7 são só nota e uma é negativa (1 estrela, há um ano). A negativa não foi publicada, o que é decisão editorial do cliente, mas ela existe e o link "Avalie no Google" no fim da página leva ao perfil onde ela aparece.

### 2. Fim da linguagem de agendamento
O site não tinha módulo de agendamento, tinha copy de agendamento em 5 pontos:

- `index.html`: botão do topo "Agendar" → "WhatsApp" (padroniza com as outras 6 páginas); CTA do hero "Agendar serviço" → "Chamar no WhatsApp"; texto do bloco final "marque uma avaliação rápida" → "traga o carro para uma avaliação rápida".
- `avaliacoes.html`: "Marque uma avaliação e venha entender…" → "Traga seu carro e entenda…"; botão "Agendar pelo WhatsApp" → "Chamar no WhatsApp".
- `sobre.html`: "Passe pra um café ou marque uma avaliação" → "Passe pra um café ou traga o carro pra uma olhada" (também saiu o travessão da frase).
- Mensagens pré-preenchidas do WhatsApp que diziam "gostaria de agendar um serviço" passaram a "Vim pelo site da Cali Garage".

### 3. CTA de WhatsApp respeita o horário da oficina
Pedido do cliente: o WhatsApp só deve ser acionável quando a oficina está aberta, com feriado e fim de semana bloqueados. Implementado sobre o `businessState()` que já existia desde a rev-0.9.5, então a pausa do almoço, o fim de semana e os feriados nacionais (incluindo os móveis, calculados a partir da Páscoa) já vinham resolvidos.

- 21 CTAs marcados com `data-wa-cta` nas 7 páginas: botão do topo, botões de corpo e o flutuante.
- Fora do expediente o link perde o `href`, ganha `is-closed` + `aria-disabled="true"` + `tabindex="-1"` e passa a informar o retorno: **"Fechado · abre ter às 7h30"**, **"Almoço · volta às 14h"**, ou "Fechado" / "Volta 14h" no botão do topo, que tem menos espaço. O flutuante fica cinza, sem o pulso, com `aria-label` explicativo.
- `nextOpening()` calcula o próximo dia útil pulando fim de semana e feriados em sequência, e diz "amanhã" quando é o dia seguinte.
- **Fora do bloqueio**: o número no rodapé e na Política de Privacidade continuam sempre ativos. São canal de contato e de exercício de direitos da LGPD, não CTA de conversão.
- O rótulo longo começa pelo estado ("Fechado ·", "Almoço ·") de propósito: um botão apagado dizendo apenas "Abre ter às 7h30" não diz ao visitante o que ele era.
- Sem JS, os botões continuam funcionando. A falha é para o lado seguro: melhor uma mensagem fora de hora do que um CTA morto.

### Verificação
- 16 casos de fronteira da lógica de horário em Node: 7h29, 7h30, 11h59, 12h00, 13h59, 14h00, 17h59, 18h00, sábado, domingo, o encadeamento sáb + dom + feriado de 07/09 (abre só na terça) e a véspera de Natal caindo numa quinta (abre na segunda). Todos passaram.
- As 7 páginas abertas no Chrome real em 390px e 1280px, nos três estados (aberto, almoço, fechado), sem erro de console. Contagem de CTAs bloqueados conferida página a página.
- `/avaliacoes` conferida com os 10 cards, sem overflow horizontal em nenhuma das duas larguras.

### Files modificados
- `rev-0.1/{index,sobre,servicos,galeria,avaliacoes,contato,privacidade}.html`
- `rev-0.1/js/main.js` — `nextOpening()`, `closedLabel()`, `updateWhatsappCtas()`
- `rev-0.1/css/style.css` — estado `.is-closed`
- `CHANGELOG.md` — esta entrada

### Pendente de ação externa (cliente)
- **Google Business Profile**: o horário de lá continua "Abre seg. às 08:00", errado desde sempre e ainda não corrigido. É o que a maioria das pessoas vê antes de chegar ao site. Pendência aberta desde a rev-0.9.5.
- **Bairro**: o Google grafa "Vila Mathias" e o site usa "Vila Matias". Vale alinhar os dois, de preferência pela grafia oficial do endereço.
- **Avaliação negativa** sem resposta pública no perfil. Responder costuma pesar mais para quem lê do que a nota em si.

---

## rev-0.9.5 — Released (2026-09-01)

### Foco
Correção do horário de funcionamento. O site publicava **seg a sex, 8h às 18h**; o horário real da oficina, confirmado pelo dono e presente no cabeçalho de todas as ordens de serviço, é **seg a sex, 7h30 às 12h e 14h às 18h**, com fechamento para o almoço.

### Mudanças
- **Rodapé (7 páginas)**: `Seg a Sex: 08h às 18h` → `Seg a Sex: 7h30 às 12h / e 14h às 18h` em um único item de lista, com quebra interna (dois `<li>` separavam visualmente o que é um horário só).
- **`contato.html`**: bloco "Horário de atendimento" e `meta description` atualizados.
- **`index.html`**: `og:description` atualizado.
- **`index.html` (JSON-LD)**: `openingHoursSpecification` passou de um período (`08:00`–`18:00`) para dois (`07:30`–`12:00` e `14:00`–`18:00`). É o que o Google lê para exibir o horário na busca.
- **`js/main.js`**: o selo "Aberto agora" do hero considerava uma única janela contínua. Reescrito como `businessState()` com três estados — `aberto`, `almoco`, `fechado`. Entre 12h e 14h o selo passa a dizer **"Volta às 14h"** em vez de "Fechado agora", que faria o visitante achar que a oficina fechou o dia. Feriados e fim de semana seguem como estavam.

### Verificação
- Lógica testada nos limites: 7h29, 7h30, 11h59, 12h00, 13h59, 14h00, 17h59, 18h00, sábado, domingo e feriado (25/12). Todos os casos passaram.
- JSON-LD revalidado como JSON e conferido nos dois períodos.
- Rodapé e bloco de contato conferidos em 1280px e em 390px.

### Também nesta revisão
- **`.vercelignore`**: a pasta `cali garage ops/` (46 MB de planilhas da oficina, com CPF de 630 pessoas) estava no diretório do projeto e subia junto no deploy por CLI — 656 arquivos enviados contra os 29 do site. Os deployments da Vercel exigem SSO, então o arquivo nunca ficou público, mas não há razão para o dado sair da máquina. Agora `cali garage ops/`, `*.xlsx` e `*.zip` estão bloqueados, e o deploy voltou a enviar 29 arquivos.
- A pasta foi **movida** para `~/projetos/cali-garage-ops/dados-legado/` (gitignored), que é onde os dados serão importados. O repo do site não guarda mais dado de cliente.

### Publicado
Deploy em produção pela CLI (`vercel --prod`). Verificado no ar: rodapé, `contato`, `meta description`, `og:description`, JSON-LD com os dois períodos e `js/main.js` com o estado de almoço.

### Pendente de ação externa
- **Google Business Profile** da oficina: o horário exibido na busca e no Maps vem de lá, não do site. Precisa ser corrigido na conta do cliente — é o que a maioria dos visitantes vê antes de chegar ao site.

---

## rev-0.9.4 — Released (2026-06-04)

### Foco
Refinamento da auditoria externa de 2026-06-04. O guia de correções recebido foi confrontado item a item com o código real e com a resposta de produção (`curl`). Resultado: dos 6 achados, apenas 1 era ação imediata válida — os demais não procediam (HSTS, GrowthBook, Instagram) ou já estavam resolvidos (tap targets). Ver `AUDIT-2026-06-04.md`.

### Mudanças
- **`robots.txt`**: linha `Sitemap:` realinhada de `https://cali-garage.vercel.app/sitemap.xml` (staging) para `https://caligarage.donadaolabs.com/sitemap.xml` (domínio canônico). Bug residual da rev-0.9, que corrigiu o `sitemap.xml` mas deixou o `robots.txt` apontando para staging.
- **`AUDIT-2026-06-04.md`** (novo): auditoria refinada com veredito por achado, falsos positivos registrados e backlog depurado.

### Falsos positivos da auditoria 2026-06-04 (registrados, não reabrir)
- **HSTS** — presente no `vercel.json` e confirmado no ar via `curl`.
- **GrowthBook** — não existe no projeto.
- **Instagram do rodapé** — é a assinatura da agência (bloco `ddl-built-full`), não link social do cliente; oficina não tem perfil.
- **Tap targets** — já em 44px desde a rev-0.9.

### Files modificados
- `rev-0.1/robots.txt`
- `AUDIT-2026-06-04.md` — novo
- `CHANGELOG.md` — esta entrada

### Pendente para rev-0.10 (Onda 2 — depende do cliente)
- GA4 + evento `generate_lead` no WhatsApp + Consent Mode v2 + banner LGPD. **GA4 só sobe quando o cliente tiver o domínio próprio no ar** — não no subdomínio da agência (aguarda domínio + Measurement ID)
- CSP: remover `'unsafe-inline'` de `script-src` via hash SHA-256 do JSON-LD (polimento)

### Pós-deploy
- Reenviar o sitemap no Google Search Console.

---

## rev-0.9.3 — Released (2026-05-23)

### Foco
Designar o Encarregado/Ponto de contato LGPD na Política de Privacidade. Cliente optou por se indicar como ponto de contato (permitido pra ME/EPP por força da Resolução CD/ANPD nº 2/2022, que dispensa designação formal de DPO).

### Mudanças
- **`/privacidade.html` seção 9 (Encarregado/DPO)**: placeholder `[A definir]` substituído por bloco com nome + contato:
  - Nome: Fabrício Augusto Silva Nunes
  - WhatsApp: +55 13 99625-2628 (mesmo número de atendimento)
- Contexto regulatório incluído no texto (Resolução CD/ANPD nº 2/2022 que dispensa DPO formal pra ME/EPP)

### Files modificados
- `rev-0.1/privacidade.html`
- `CHANGELOG.md` — esta entrada

### Onda 1 da auditoria Cowork — FECHADA 100%
Com esta rev, todos os itens não-tracking da auditoria Cowork (2026-05-23) estão fechados. Falta só a Onda 2 (GA4 + Consent Mode v2 — vai pra rev-0.10) e o backlog ⚪ baixo (CSP nonce/hash).

### TODOs remanescentes (opcionais, não bloqueantes)
- Foto real da fachada (pra substituir og-cover.jpg gerada via PIL)

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
