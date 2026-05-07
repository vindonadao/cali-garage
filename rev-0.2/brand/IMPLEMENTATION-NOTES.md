# Cali Garage — Implementation Notes (rev-0.2)

> Instruções token-by-token para o dev aplicar a revisão de paleta. Trabalha em cima de `/Users/donadao/cali-garage/rev-0.1/css/style.css`. Decisão crítica: este arquivo CSS pode ser editado in-place (rev-0.2 não duplica codebase) OU copiado para `/Users/donadao/cali-garage/rev-0.2/css/style.css` se houver preferência por preservar rev-0.1 navegável. Recomendação: **editar in-place** e marcar a transição via CHANGELOG + commit `rev-0.2`.

---

## 1. Substituições diretas no `:root` (linhas 16-53)

Localizar bloco `:root { ... }` em `style.css` linhas 16-53. Substituir EXATAMENTE:

### 1.1 Bloco de cores primárias (linhas 17-20)

```css
/* ANTES (linhas 17-20) */
--color-orange: #C8622A;
--color-orange-light: #E07A3E;
--color-orange-dark: #A04E1F;
--color-orange-soft: rgba(200, 98, 42, 0.12);
```

```css
/* DEPOIS */
--color-orange: #C8622A;            /* INTACTA — Cali Copper, Wheeler §3.1 */
--color-orange-light: #E8A765;      /* sunset sand — antes #E07A3E */
--color-orange-dark: #A04E1F;       /* mantém */
--color-orange-soft: rgba(200, 98, 42, 0.18);  /* glow ambient mais presente */
```

### 1.2 Bloco de backgrounds (linhas 22-27)

```css
/* ANTES (linhas 22-27) */
--color-bg: #141414;
--color-bg-2: #1E1E1E;
--color-surface: #1B1B1B;
--color-surface-2: #232323;
--color-card: #1F1F1F;
--color-card-2: #2A2A2A;
```

```css
/* DEPOIS */
--color-bg: #1A1410;                /* warm ink (era #141414) */
--color-bg-2: #231A14;              /* cocoa profundo (era #1E1E1E) */
--color-surface: #221A14;           /* warm dark surface (era #1B1B1B) */
--color-surface-2: #2A1F18;         /* warm cocoa (era #232323) */
--color-card: #2A1F18;              /* consolida com surface-2 (era #1F1F1F) */
--color-card-2: #34271E;            /* warm cocoa elevado (era #2A2A2A) */
```

### 1.3 Bloco de texto e borders (linhas 29-33)

```css
/* ANTES (linhas 29-33) */
--color-text: #F5F5F5;
--color-text-muted: #9A9A9A;
--color-text-dim: #666666;
--color-border: #2C2C2C;
--color-border-strong: #3A3A3A;
```

```css
/* DEPOIS */
--color-text: #F4ECE0;              /* cream papel envelhecido (era #F5F5F5 branco frio) */
--color-text-muted: #B8A89A;        /* sand muted (era #9A9A9A cinza neutro) */
--color-text-dim: #7A6E62;          /* warm dim (era #666666) */
--color-border: #3A2D24;            /* warm border (era #2C2C2C) */
--color-border-strong: #4A3A2D;     /* warm border strong (era #3A3A3A) */
```

### 1.4 Adicionar NOVOS tokens (após linha 33, antes da linha 35 `--color-whatsapp`)

```css
/* NOVOS TOKENS (rev-0.2) */
--color-surface-cream: #F5F1EA;     /* surface inversa Wheeler §3.3 */
--color-text-on-cream: #1A1410;     /* texto warm ink sobre cream */
--color-muted-on-cream: #5A4A3D;    /* muted sobre cream */
--color-accent-sage: #7A8B7E;       /* sage Explorer/road map */
--color-accent-sunset: #E8A765;     /* alias de orange-light, semântica clara */
```

---

## 2. Ajuste no glow ambient do hero

Localizar regra `.hero` ou wrapper que tenha `radial-gradient(circle, rgba(200, 98, 42, 0.18), transparent 60%)` — **linha 333**.

```css
/* ANTES (linha 333) */
background: radial-gradient(circle, rgba(200, 98, 42, 0.18), transparent 60%);
```

```css
/* DEPOIS */
background: radial-gradient(circle, rgba(200, 98, 42, 0.22), transparent 65%);
```

Aumenta sutilmente a presença ambient — mais "calor" sem virar saturado.

---

## 3. Ajuste no glow do pill (dot)

Localizar `.pill::before` na linha 116:

```css
/* ANTES (linha 116) */
box-shadow: 0 0 0 4px rgba(200, 98, 42, 0.18);
```

```css
/* DEPOIS */
box-shadow: 0 0 0 4px rgba(200, 98, 42, 0.22);
```

---

## 4. Navbar — ajuste de transparência

Linha 154 (e linha 468 se houver duplicata em billboard):

```css
/* ANTES */
background-color: rgba(20, 20, 20, 0.78);
```

```css
/* DEPOIS */
background-color: rgba(26, 20, 16, 0.78);    /* warm ink translúcido */
```

E linha 468 (`billboard` ou similar com `rgba(20, 20, 20, 0.85)`):

```css
/* DEPOIS */
background-color: rgba(26, 20, 16, 0.85);
```

---

## 5. Hero h1 outline

Linha 351:

```css
/* ANTES */
-webkit-text-stroke: 1.5px var(--color-text);
```

**Já usa variável** — vai herdar `#F4ECE0` cream automaticamente. **Sem ação manual necessária**, só validar visualmente que o stroke ficou com tom cream e não branco gelado.

---

## 6. Border do hero card / billboard

Linha 402:

```css
/* ANTES */
border: 2px solid var(--color-bg);
```

Vai herdar `#1A1410` warm ink automaticamente. **Validar visual.**

---

## 7. Aplicação CRÍTICA — alternância de seções (NOVA, exige edição de classes)

Esta é a mudança que mais entrega "vida". As seções abaixo precisam **mudar de warm dark para cream**. Adicionar a classe `.section-cream` ao tag `<section>` correspondente OU criar wrapper com cor inline.

### 7.1 Adicionar regra CSS (qualquer lugar após `.section`)

```css
/* NOVO — seção em superfície cream (rev-0.2) */
.section-cream {
  background-color: var(--color-surface-cream);
  color: var(--color-text-on-cream);
}
.section-cream h1,
.section-cream h2,
.section-cream h3,
.section-cream h4 {
  color: var(--color-text-on-cream);
}
.section-cream p {
  color: var(--color-muted-on-cream);
}
.section-cream .accent {
  color: var(--color-orange);  /* terracota lê viva sobre cream — exatamente o ponto Wheeler §3.3 */
}
.section-cream .pill {
  background-color: rgba(26, 20, 16, 0.06);
  border-color: rgba(26, 20, 16, 0.18);
  color: var(--color-text-on-cream);
}
/* Cards dentro de seção cream invertem hierarquia: viram warm dark sobre cream */
.section-cream .card,
.section-cream .service-card,
.section-cream .stat-card {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}
.section-cream .card h3,
.section-cream .service-card h3,
.section-cream .stat-card h3 {
  color: var(--color-text);
}
.section-cream .card p,
.section-cream .service-card p,
.section-cream .stat-card p {
  color: var(--color-text-muted);
}
```

### 7.2 Aplicar `.section-cream` em (HTML edits)

Em `index.html`:
- Seção **Serviços** (procurar bloco com cards de serviços oferecidos): adicionar classe `section-cream`
- Seção **Sobre / Stats** (procurar bloco com "10 anos", números grandes): adicionar classe `section-cream`

Em `servicos.html`:
- Section principal de listagem de serviços → `section-cream`

Em `sobre.html`:
- Section "história / sobre nós" central → `section-cream`

Em `galeria.html`:
- Manter warm dark (galeria de fotos pede contraste escuro)

Em `avaliacoes.html`:
- Manter warm dark (cards de depoimentos com estrelas amarelas leem melhor em escuro)

Em `contato.html`:
- Form section pode ser `section-cream` (formulários em fundo claro são mais convidativos)

**Regra de aplicação:** sempre alternar dark → cream → dark. NUNCA dois cream consecutivos. NUNCA três dark consecutivos.

---

## 8. Noise texture overlay (OPCIONAL mas recomendado para "materialidade vivida")

Adicionar ao `body` ou criar pseudo-overlay:

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.035;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>");
  mix-blend-mode: overlay;
}
```

Adiciona granulação sutil que emula textura de papel/madeira. Justificativa Brand Chief: Archetype §5 ("materialidade vivida"). Wheeler §3.4 não se aplica (refere-se a gradientes saturados sobre logo, não a texture overlay sutil).

**Acceptance:** se a olho nu aparece "sujo", reduzir opacity para 0.02. Se invisível mesmo de perto, aumentar para 0.05. NUNCA acima de 0.06 (vira ruidoso).

---

## 9. Botões — comportamento específico

`.btn-primary` (linhas 290-296) já usa variáveis — vai herdar automaticamente. Validar visual:
- Background: `#C8622A` (mantém)
- Hover: agora `#E8A765` sunset (era `#E07A3E`) — visualmente mais "vivo"

`.btn-outline` (linhas 307-311):
- Border: `#4A3A2D` warm
- Hover: `#C8622A`
- **Validar contraste sobre warm dark E sobre cream** — se em cream o outline ficar invisível, criar variante:

```css
.section-cream .btn-outline {
  border-color: rgba(26, 20, 16, 0.3);
  color: var(--color-text-on-cream);
}
.section-cream .btn-outline:hover {
  border-color: var(--color-orange);
  color: var(--color-orange);
}
```

---

## 10. Footer

Footer permanece warm dark `#1A1410`. Validar:
- Wordmark Cali Copper sobre warm dark — deve estar **mais vivo** que estava sobre `#141414`. Esse é o teste-chave.

---

## 11. Checklist de validação visual (após deploy)

Ordenado por prioridade:

- [ ] Hero: terracota do logo lê **viva**, não apagada (compare lado a lado com rev-0.1)
- [ ] Hero: stroke do H1 lê cream, não branco gelado
- [ ] Seção Serviços vira cream `#F5F1EA` com cards warm dark — alternância visível
- [ ] Sobre/Stats vira cream — números grandes em terracota saltam
- [ ] Seção Avaliações volta a warm dark — fluxo: dark → cream → dark → cream → dark
- [ ] Footer: Wordmark mais vivo que rev-0.1
- [ ] Squint test: terracota é a cor mais saliente da composição
- [ ] Cliente leigo descreve a cor como "cobre/terracota/laranja queimado", não como "marrom"
- [ ] Não há nenhum cinza neutro (`#XXX` onde X é cinza) visível em qualquer lugar
- [ ] Não há branco puro `#FFFFFF` em texto (apenas em surfaces específicas se for o caso)
- [ ] Botão primário hover lê "sunset" e não "fast-food laranja"
- [ ] Sage `#7A8B7E` (se aplicado em badges/status) lê quase como cinza, não como verde

---

## 12. Rollback plan

Se cliente rejeitar rev-0.2:
- `git revert` do commit `rev-0.2`
- Backup automático: o branch `rev-0.1` permanece intocável no histórico
- Não há migração de dados. Apenas CSS + classes HTML. Reversão = 1 comando.

---

## 13. Out of scope desta rev

- Imagery / fotografia (próxima rev)
- Animações / motion (próxima rev)
- Dark mode toggle (não aplicável — site É dark base)
- Mudanças de layout / spacing
- Mudanças tipográficas
- Logo (NUNCA — Wheeler §1.2 sagrado)

---

## 14. Após implementação

1. Atualizar `CHANGELOG.md` do projeto: "rev-0.2: paleta secundária refeita para warm-dark + cream alternating. Cor primária #C8622A intacta."
2. Tag git: `rev-0.2`
3. Deploy em https://vindonadao.github.io/cali-garage/
4. Apresentar ao cliente com framing: "Sua cor de marca não mudou. O que mudou foi o redor dela — agora a terracota tem uma família cromática que a deixa respirar."

---

*Built by Donadão Labs.*
