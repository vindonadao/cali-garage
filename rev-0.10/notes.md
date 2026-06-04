# rev-0.10 — Notes

> Status: **Planned** (aguarda input do cliente)
> Aberta em: 2026-06-04
> Foco: Onda 2 da auditoria Cowork — GA4 + evento de conversão WhatsApp + Consent Mode v2 + banner LGPD

---

## Contexto

Fecha a Onda 2 da auditoria Cowork (2026-05-23), reconfirmada na auditoria refinada de 2026-06-04
(`AUDIT-2026-06-04.md`). O site não tem medição: o WhatsApp é a única conversão e roda no escuro.
Ativar tracking exige, por LGPD (Lei 13.709/2018), consentimento — daí o Consent Mode v2 + banner
entrarem no mesmo pacote.

---

## ⛔ Bloqueadores — ordem obrigatória

1. [ ] **Domínio próprio do cliente no ar** (`caligarage.com.br` ou equivalente).
       **GA4 só sobe quando o site estiver no domínio do cliente** — não no subdomínio da agência
       (`caligarage.donadaolabs.com`). Medir no subdomínio polui os dados, mistura com a
       infra da Donadão Labs e exigiria reconfigurar o stream/propriedade na migração.
       A transição de domínio está coberta pelo `domain-launch-runbook.md` (rev-0.8).
2. [ ] **Measurement ID do GA4** (`G-XXXXXXXXXX`) — criado na propriedade GA4 **já apontando para o
       domínio final**. GA4 → Admin → Fluxos de dados → Web.

Enquanto os dois não estiverem prontos, esta rev permanece **Planned**. Todo o resto está
especificado abaixo e é só executar.

---

## Escopo

### 1. GA4 com Consent Mode v2 (default = denied)

No `<head>` de **todas as 7 páginas**, ANTES do snippet de carregamento do gtag, definir consent
default como negado (LGPD: opt-in, não opt-out):

```html
<!-- Consent Mode v2 — default denied (LGPD opt-in) -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500
  });
</script>
<!-- GA4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

> Decisão pendente: inline (exige hash/nonce no CSP — ver item 4) **ou** mover todo o bloco
> gtag/consent para um `js/analytics.js` servido pelo próprio domínio (mantém `script-src` limpo,
> só precisa do `async src` do googletagmanager liberado). **Recomendação: arquivo externo**, pra
> não reintroduzir `'unsafe-inline'`.

### 2. Banner de consentimento LGPD

Banner simples, vanilla JS (zero dependências — constituição), persistência em `localStorage`:
- Botões **"Aceitar"** e **"Recusar"**.
- Ao aceitar: `gtag('consent', 'update', { 'analytics_storage': 'granted' })` + grava escolha.
- Ao recusar: mantém denied + grava escolha (não reexibe).
- Reabrir preferências: link "Cookies" no rodapé (próximo de "Política de Privacidade").
- Estilo coerente com a paleta warm cocoa do site (`css/style.css`).

### 3. Evento de conversão no WhatsApp + telefone

Em `js/main.js` (ou `js/analytics.js`), após consent granted:

```javascript
document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
  link.addEventListener('click', function () {
    if (typeof gtag === 'function') {
      gtag('event', 'generate_lead', {
        method: 'whatsapp',
        link_text: (link.innerText || '').trim().slice(0, 60),
        page_location: window.location.href
      });
    }
  });
});
document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
  link.addEventListener('click', function () {
    if (typeof gtag === 'function') {
      gtag('event', 'generate_lead', { method: 'phone' });
    }
  });
});
```

No GA4 → Admin → Eventos: marcar `generate_lead` como **conversão**.

### 4. CSP — liberar GA + (opcional) remover `'unsafe-inline'`

No `vercel.json`:
```diff
- script-src 'self' 'unsafe-inline';
+ script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  /* OU, com gtag em arquivo externo + hash do JSON-LD: sem 'unsafe-inline' */
- connect-src 'self';
+ connect-src 'self' https://www.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com;
- img-src 'self' data:;
+ img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com;
```

**Item 5 da auditoria refinada (polimento, mesmo pacote se der):** remover `'unsafe-inline'` de
`script-src` via hash SHA-256 do bloco JSON-LD do `index.html` (não "mover pro main.js" — JSON-LD
precisa ficar no HTML pra SEO).

### 5. Política de Privacidade

`privacidade.html` seção 3.1 já antecipa GA4 — revisar se o texto cobre Consent Mode + a opção de
recusar. Ajustar se necessário (provavelmente só uma frase sobre o banner).

---

## Acceptance criteria

- [ ] `curl -s …/ | grep googletagmanager` retorna o script (GA carregando)
- [ ] GA4 Realtime registra `generate_lead` ao clicar no WhatsApp (após aceitar cookies)
- [ ] Antes de aceitar: nenhuma chamada a `google-analytics.com` na aba Network (consent denied funciona)
- [ ] Banner persiste a escolha (não reaparece após decidir) e é reabrível pelo rodapé
- [ ] CSP no ar não quebra fontes/scripts (`curl -I` + DevTools Console sem violations)
- [ ] `generate_lead` marcado como conversão no GA4
- [ ] JSON-LD ainda valida no Rich Results Test

## Pós-deploy
- [ ] Reenviar sitemap no Google Search Console (herdado da rev-0.9.4)
- [ ] Validar `securityheaders.com` → manter grade A

---

## Files previstos
- `rev-0.1/*.html` (7) — bloco consent + GA no `<head>`, link "Cookies" no rodapé
- `rev-0.1/js/analytics.js` (novo) — gtag config + consent update + eventos
- `rev-0.1/js/main.js` — ou hospeda os listeners de evento
- `rev-0.1/css/style.css` — estilo do banner
- `rev-0.1/privacidade.html` — ajuste de texto (se necessário)
- `vercel.json` — CSP allowlist GA (+ hash JSON-LD opcional)
- `CHANGELOG.md` — entrada rev-0.10

---

## Próximos passos
1. Cliente passa o Measurement ID `G-XXXXXXXXXX`.
2. Executar escopo 1–5.
3. Push branch `rev-0.10-cowork-audit-wave-2` → preview Vercel.
4. Validar AC em desktop + mobile.
5. Merge `main` + tag `rev-0.10`.
