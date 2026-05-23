# Security Audit — rev-0.6 (pré-deploy Vercel)

> Auditoria realizada em 2026-05-10 antes do primeiro deploy em produção.
> Escopo: site estático em `rev-0.1/` (HTML5 + CSS3 + Vanilla JS, zero dependências JS).

---

## ✅ Findings — Todas as correções aplicadas

### 1. Code-level security
| Check | Resultado |
|-------|-----------|
| `eval()` / `Function()` | ✅ Ausente |
| `innerHTML` | ✅ Ausente (usa `textContent`) |
| `document.write` | ✅ Ausente |
| Inline event handlers (`onclick=`, `onerror=`, `onload=`) | ✅ Ausente |
| `javascript:` URIs | ✅ Ausente |
| Secrets / API keys / tokens | ✅ Nenhum encontrado em todo o projeto |
| Arquivos `.env`, `.key`, `.pem`, `credentials*` | ✅ Nenhum |
| Forms com submit (vetor CSRF) | ✅ Nenhum (site é apenas vitrine) |

### 2. External links — `target="_blank"` hygiene
- 36 links externos auditados (WhatsApp, Donadão Labs, Instagram, Google)
- **100% com `rel="noopener"`** (proteção contra `tabnabbing` via `window.opener`)
- ✅ Recomenda-se também `rel="noreferrer"` para links pra terceiros não-confiáveis (não crítico aqui — todos os destinos são domínios próprios ou serviços conhecidos)

### 3. Iframe (Google Maps embed em contato.html)
- ✅ `loading="lazy"` (performance)
- ✅ `referrerpolicy="no-referrer-when-downgrade"` (não vaza HTTPS → HTTP referrer)
- ⚠️ Sem `sandbox` — necessário para Google Maps funcionar; CSP `frame-src https://www.google.com` mitiga

### 4. Bug fix aplicado: typo de domínio
- **JSON-LD do index.html** continha `calligarage.com.br` (2 L's) — typo
- ✅ Corrigido para `caligarage.com.br` em 3 ocorrências (image, @id, url)

### 5. Refactor de hardening: scripts inline → externo
- 6 cópias idênticas do mesmo script inline (nav-toggle + ano dinâmico) em todos os HTMLs
- ✅ Extraídos para `rev-0.1/js/main.js` com `defer`
- Reduz superfície de XSS e elimina duplicação
- JSON-LD do index.html mantido inline (necessário pra SEO; CSP permite via `'unsafe-inline'`)

---

## 🛡️ Headers de segurança (vercel.json)

Configurados em `/Users/donadao/cali-garage/vercel.json`:

| Header | Valor | Propósito |
|--------|-------|-----------|
| `Content-Security-Policy` | Strict whitelist (ver nota) | Mitiga XSS, code injection, data exfil |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Força HTTPS por 2 anos (HSTS preload-ready) |
| `X-Content-Type-Options` | `nosniff` | Bloqueia MIME-sniffing attacks |
| `X-Frame-Options` | `DENY` | Bloqueia clickjacking (legacy, redundante com CSP `frame-ancestors`) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Não vaza paths em referrers cross-origin |
| `Permissions-Policy` | Bloqueia camera/mic/geo/USB/payment/cohort | Site não precisa, fechamos tudo |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isola browsing context |
| `Cross-Origin-Resource-Policy` | `same-origin` | Bloqueia carregamento cross-origin de assets |

### CSP detalhada
```
default-src 'self';
script-src 'self' 'unsafe-inline';      /* 'unsafe-inline' p/ JSON-LD em index.html */
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data:;
frame-src https://www.google.com;        /* Google Maps embed */
connect-src 'self';
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
upgrade-insecure-requests
```

### Cache strategy
- Assets versionáveis (CSS, JS, imagens, fontes, PDF): `max-age=31536000, immutable`
- HTML: `max-age=0, must-revalidate` (atualizações imediatas)

---

## 📋 Deploy checklist

### Pré-deploy (concluído)
- [x] Auditoria de código (zero patterns inseguros)
- [x] Typo de domínio corrigido (`calligarage` → `caligarage`)
- [x] Scripts inline migrados para arquivo externo
- [x] `vercel.json` com 8 security headers
- [x] `.vercelignore` excluindo `rev-0/`, `rev-0.2/`, `brand/`, `logo-source.pdf`, docs internos
- [x] `robots.txt` permitindo indexação
- [x] `sitemap.xml` com 6 URLs canônicas

### Deploy via Vercel CLI
```bash
cd /Users/donadao/cali-garage

# Login (uma vez)
vercel login

# Preview deploy
vercel

# Production deploy
vercel --prod
```

> ⚠️ Não tenho acesso à sua conta Vercel — você precisa rodar os comandos acima.

### Pós-deploy (validar manualmente)
- [ ] Acessar URL de preview e verificar carregamento de fonts, logo, mapa
- [ ] DevTools → Network: confirmar headers de segurança presentes
- [ ] Mobile Safari iOS: testar nav-toggle e WhatsApp float
- [ ] [securityheaders.com](https://securityheaders.com) → grade A esperado
- [ ] [ssllabs.com/ssltest](https://ssllabs.com/ssltest) → grade A+ esperado
- [ ] [search.google.com/test/rich-results](https://search.google.com/test/rich-results) → JSON-LD `AutoRepair` válido
- [ ] Rodar [PageSpeed Insights](https://pagespeed.web.dev) → mobile + desktop

### Configuração de domínio (após deploy)
1. Vercel Dashboard → Project → Settings → Domains
2. Adicionar `caligarage.com.br` e `www.caligarage.com.br`
3. Configurar DNS no registrar (provavelmente Registro.br):
   - `A` para `caligarage.com.br` → IP fornecido pela Vercel
   - `CNAME` para `www` → `cname.vercel-dns.com`
4. Aguardar provisionamento de SSL (Let's Encrypt automático)
5. Após HTTPS confirmado, considerar submeter para [hstspreload.org](https://hstspreload.org)

---

## 🔮 Melhorias futuras (não bloqueantes)

| Item | Esforço | Benefício |
|------|---------|-----------|
| Calcular hash SHA-256 do JSON-LD e remover `'unsafe-inline'` de `script-src` | 30min | CSP mais restrita |
| Adicionar Subresource Integrity (SRI) ao `<link>` do Google Fonts | 15min | Proteção contra CDN compromise |
| Mover atributos `style="..."` inline restantes para CSS classes (permite remover `'unsafe-inline'` de `style-src`) | 1h | CSP totalmente sem unsafe-inline |
| Adicionar `<link rel="canonical">` em todas as 6 páginas | 15min | Evita duplicate content |
| Configurar Vercel Analytics ou similar (sem tracker invasivo) | 30min | Métrica real de tráfego |

---

*Built by Donadão Labs.*
