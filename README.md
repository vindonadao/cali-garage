# Cali Garage — Site institucional

Site estático da **Cali Garage Reparos Automotivos**, oficina mecânica em Santos/SP, Vila Matias.

> **4,8★ no Google · 18 opiniões reais · 10+ anos no mesmo endereço**

---

## Stack

- **HTML5 puro** — semântica forte, sem frameworks JS
- **CSS3 puro** — design tokens via CSS variables, sem preprocessadores
- **Zero dependências** — Google Fonts (Anton + Inter) é o único asset externo
- **Vanilla JS** — apenas ~10 linhas para nav mobile e ano dinâmico no footer

---

## Estrutura

```
cali-garage/
├── README.md                  Este arquivo
├── CHANGELOG.md               Versionamento por revisões (rev-X.Y)
├── caligarage.md              Brief original do projeto (CLAUDE.md)
├── rev-0/                     Snapshot imutável da baseline
├── rev-0.1/                   ← Pasta ativa de trabalho / entregável atual (rev-0.9.6 vive aqui)
│   ├── index.html             Home — hero billboard, features, services teaser, reviews, CTA
│   ├── sobre.html             Sobre a oficina, princípios, stats
│   ├── servicos.html          9 serviços detalhados
│   ├── galeria.html           Placeholders aguardando fotos reais
│   ├── avaliacoes.html        Resumo Google + 10 reviews reais
│   ├── contato.html           WhatsApp, telefone, mapa, horário
│   ├── css/
│   │   └── style.css          Stylesheet único
│   ├── img/
│   │   ├── favicon.svg        Estrela + swoosh em quadrado escuro
│   │   ├── logo.png           Logo oficial (rev-0.4) — usado via CSS mask-image
│   │   └── logo-source.pdf    Vetor original do cliente (preservado)
│   └── brand/                 Deliverables estratégicos do Brand Squad
│       ├── README.md          Manual da pasta brand/
│       ├── identity-system.md Sistema completo de identidade (Alina Wheeler)
│       └── archetype.md       Arquétipo Everyman + Explorer (Archetype Consultant)
└── rev-0.2/                   Specs estratégicas da revisão de paleta
    └── brand/
        ├── palette-revision.md       Spec da migração warm dark + cream
        └── IMPLEMENTATION-NOTES.md   Instruções token-by-token
```

---

## Como rodar localmente

```bash
# Opção 1: servidor Python (default)
cd rev-0.1 && python3 -m http.server 8080

# Opção 2: Node
npx serve rev-0.1

# Opção 3: abrir direto no navegador
open rev-0.1/index.html
```

Acesse `http://localhost:8080` no navegador.

---

## Como fazer deploy

### Netlify Drop (mais simples)

1. Acesse https://app.netlify.com/drop
2. Arraste a pasta `rev-0.1/` inteira
3. Pronto — URL pública gerada

### GitHub Pages

1. Push do repo (ver seção Versionamento)
2. Settings → Pages → Source: `main` branch → Folder: `/rev-0.1`
3. Salvar — URL `https://<usuario>.github.io/cali-garage/`

### Cloudflare Pages

1. Conectar o repo no dashboard
2. Build command: (vazio)
3. Build output: `rev-0.1`
4. Deploy automático

---

## Versionamento (rev-X.Y)

Convention global Donadão Labs: tags `rev-X.Y` + CHANGELOG.md em todos os projetos.

- **X (major)** — redesign estrutural (visual language ou IA)
- **Y (minor)** — iteração / refinamento dentro do mesmo redesign

Estado atual: **rev-0.9.10** (auditoria ponta a ponta, página 404 própria, travessões fora da copy).

> **Atenção ao cache:** `vercel.json` serve `css` e `js` como `immutable` por um ano. Toda alteração em `style.css` ou `main.js` exige subir o `?v=` nas 7 páginas, senão a mudança não chega em quem já visitou o site. Histórico completo em [CHANGELOG.md](./CHANGELOG.md).

---

## Identidade visual

Sistema completo documentado em [`rev-0.1/brand/`](./rev-0.1/brand/).

Princípios não-negociáveis:
- Cor primária: `#DD6520` (burnt copper — override de `#C8622A` aplicado em rev-0.3 por decisão do brand owner; mesma família terracotta, mais vivo em tela)
- Logo oficial vetorial em `rev-0.1/img/logo.png` (rev-0.4) — recolorível via CSS `mask-image` + `background-color: var(--color-orange)`
- Fachada pintada à mão = artefato canônico (rev-0.0). Não substituir.
- Brush = orgânico, tipografia ao redor = geométrica (Anton + Inter + Inter Tight 700 para a assinatura Donadão Labs)
- Backgrounds em família warm cocoa (`#15100C` / `#1F1610`) + seções `.section-cream` para alternância (rev-0.2)

---

## Informações da empresa

```
Nome:      Cali Garage Reparos Automotivos
Endereço:  Av. Campos Sales, 98 - Vila Matias, Santos - SP, CEP 11013-401
Telefone:  +55 13 3222-3456
WhatsApp:  +55 13 99625-2628
Horário:   Segunda a Sexta · 7h30 às 12h e 14h às 18h
           Sábado e Domingo · Fechado
```

---

*Built by Donadão Labs.*
