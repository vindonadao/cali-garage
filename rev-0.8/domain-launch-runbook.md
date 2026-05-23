# Runbook — Lançamento do domínio `caligarage.com.br`

> **Quando executar:** no dia que o cliente comprar o domínio (provavelmente Registro.br).
> **Tempo estimado:** 45-60 min de configuração + 24h de propagação DNS + 2-6 semanas pra HSTS preload list.
> **Pré-requisito:** site já no ar em https://cali-garage.vercel.app (rev-0.7+).

---

## Fase 1 — Apontar DNS para a Vercel

### 1.1 Adicionar domínio no Vercel Dashboard
1. Acessar https://vercel.com/vindonadaos-projects/cali-garage/settings/domains
2. Clicar em **"Add"** e digitar `caligarage.com.br`
3. Repetir para `www.caligarage.com.br`
4. Vercel mostra os registros DNS que você precisa criar no registrador

### 1.2 Configurar DNS no Registro.br
Acessar https://registro.br → painel do domínio → "Editar Zona" (DNS).

Adicionar 2 registros:

| Tipo | Nome | Valor | TTL |
|------|------|-------|-----|
| **A** | `caligarage.com.br` (apex/raiz) | `76.76.21.21` | 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com.` | 3600 |

> **Atenção:** o ponto final em `cname.vercel-dns.com.` é importante em alguns painéis — sinaliza FQDN absoluto. No Registro.br geralmente o painel coloca automático.

### 1.3 Validar propagação (aguardar 5-30 min)
```bash
dig caligarage.com.br +short
# esperado: 76.76.21.21

dig www.caligarage.com.br +short
# esperado: alguma resposta resolvendo via cname.vercel-dns.com → IP Vercel
```

Vercel detecta automaticamente e provisiona SSL Let's Encrypt em ~5-10min após DNS resolver.

---

## Fase 2 — CAA records (anti-emissão de SSL fraudulento)

CAA restringe **quais autoridades certificadoras podem emitir SSL pro seu domínio**. Sem CAA, qualquer CA pode emitir. Com CAA, só as listadas conseguem — bloqueia atacante que tente clonar SSL no nome do seu domínio.

### 2.1 Adicionar CAA records no Registro.br

Vercel usa **Let's Encrypt**. Adicione 3 registros:

| Tipo | Nome | Valor |
|------|------|-------|
| CAA | `caligarage.com.br` | `0 issue "letsencrypt.org"` |
| CAA | `caligarage.com.br` | `0 issuewild ";"` |
| CAA | `caligarage.com.br` | `0 iodef "mailto:donadao@gmail.com"` |

**Tradução:**
- `issue "letsencrypt.org"` — só Let's Encrypt pode emitir cert SAN
- `issuewild ";"` — ninguém pode emitir wildcard `*.caligarage.com.br`
- `iodef "mailto:..."` — qualquer tentativa de violação manda relatório pro seu email

### 2.2 Validar
```bash
dig CAA caligarage.com.br +short
# esperado: 3 linhas com issue, issuewild e iodef
```

---

## Fase 3 — DNSSEC (anti-sequestro de DNS)

DNSSEC assina criptograficamente os registros DNS. Sem isso, atacante pode envenenar cache DNS de provedores e desviar tráfego pra servidor falso.

### 3.1 Habilitar no Registro.br
1. Painel do domínio → seção **"DNSSEC"** ou **"Chaves DNSSEC"**
2. Clicar em **"Habilitar DNSSEC automaticamente"** (Registro.br gerencia chaves)
3. Aguardar ~30min para propagação

### 3.2 Validar
```bash
dig +dnssec caligarage.com.br | grep -E "ad;|RRSIG"
# esperado: presença do flag "ad" (Authenticated Data) e linhas RRSIG

# Validação completa via DNSViz:
# https://dnsviz.net/d/caligarage.com.br/dnssec/
# (deve mostrar "Secure" em verde)
```

---

## Fase 4 — Email security (SPF, DKIM, DMARC)

Mesmo se você **não usar email** pelo domínio, configure estes registros para **bloquear spammers de mandarem email se passando por @caligarage.com.br**.

### Cenário A — NÃO vai usar email (mais simples)
Se toda comunicação continua sendo WhatsApp/telefone:

| Tipo | Nome | Valor |
|------|------|-------|
| TXT | `caligarage.com.br` | `v=spf1 -all` |
| TXT | `_dmarc.caligarage.com.br` | `v=DMARC1; p=reject; rua=mailto:donadao@gmail.com; aspf=s; adkim=s` |

**Tradução:**
- `v=spf1 -all` — nenhum servidor está autorizado a mandar email pelo domínio
- `p=reject` — qualquer email falsificado é REJEITADO pelo servidor de destino
- `rua=mailto:...` — relatórios diários de tentativas vão pro seu Gmail

### Cenário B — VAI usar email (Google Workspace, Zoho, etc)
Configure conforme provedor:

**SPF (autoriza servidores):**
```
v=spf1 include:_spf.google.com -all          # se usar Google Workspace
v=spf1 include:zoho.com -all                 # se usar Zoho
```

**DKIM:** o provedor gera um par de chaves. Você cria um TXT no DNS apontando pra subdomínio específico (ex: `google._domainkey.caligarage.com.br`).

**DMARC inicial (modo monitor):**
```
v=DMARC1; p=quarantine; rua=mailto:donadao@gmail.com; pct=100; aspf=s; adkim=s
```
Após 2 semanas observando relatórios, evoluir pra `p=reject`.

### Validação SPF/DKIM/DMARC
Use https://www.mail-tester.com ou:
```bash
dig TXT caligarage.com.br +short                   # deve mostrar SPF
dig TXT _dmarc.caligarage.com.br +short            # deve mostrar DMARC
```

---

## Fase 5 — HSTS preload list (anti-stripping de HTTPS)

Hoje o `vercel.json` já tem o header HSTS com `max-age=63072000; includeSubDomains; preload`. Falta **submeter à lista oficial** dos navegadores — uma vez aceito, browsers (Chrome, Firefox, Safari, Edge) FORÇAM HTTPS antes mesmo de tentar HTTP, eliminando vetor de attack MITM.

### 5.1 Pré-requisitos (já atendidos pelo vercel.json atual)
- [x] `Strict-Transport-Security` retornado no HTTPS
- [x] `max-age` ≥ 31536000 (você tem 63072000 = 2 anos)
- [x] Diretiva `includeSubDomains`
- [x] Diretiva `preload`
- [x] HTTPS válido com cert reconhecido (Let's Encrypt via Vercel)
- [ ] HTTP redireciona pra HTTPS no apex (Vercel faz automático)

### 5.2 Submeter
1. Acessar https://hstspreload.org/?domain=caligarage.com.br
2. Página verifica todos os requisitos automaticamente
3. Se tudo verde, clicar em **"Submit"**
4. Aguardar 2-6 semanas até entrar na lista master dos browsers

### 5.3 Validar status
```bash
curl -sI https://caligarage.com.br | grep -i strict
# esperado: strict-transport-security: max-age=63072000; includeSubDomains; preload
```

E volte na URL https://hstspreload.org/?domain=caligarage.com.br periodicamente até aparecer "preloaded".

---

## Fase 6 — Reverter URLs do código

Hoje o site referencia `cali-garage.vercel.app` em 3 arquivos (foi temporário pra rodar sem domínio). Após domínio ativo, reverter.

### 6.1 Substituir em 3 arquivos
```bash
cd /Users/donadao/cali-garage/rev-0.1
sed -i '' 's|cali-garage.vercel.app|caligarage.com.br|g' index.html
sed -i '' 's|cali-garage.vercel.app|caligarage.com.br|g' robots.txt
sed -i '' 's|cali-garage.vercel.app|caligarage.com.br|g' sitemap.xml
```

### 6.2 Validar
```bash
grep -rn "cali-garage.vercel.app" /Users/donadao/cali-garage/rev-0.1
# esperado: nenhum resultado
```

### 6.3 Redeploy
```bash
cd /Users/donadao/cali-garage && vercel --prod --yes
```

---

## Fase 7 — Submeter ao Google Search Console

Indexação oficial e detecção de problemas de SEO.

1. Acessar https://search.google.com/search-console
2. Adicionar propriedade: tipo **"Domínio"** (cobre todos subdomínios)
3. Verificação via TXT no DNS (Google fornece valor)
4. Após verificado, submeter sitemap: `https://caligarage.com.br/sitemap.xml`
5. Solicitar indexação manual da home

---

## Fase 8 — Validação final consolidada

Checklist de "tudo pronto":

| Item | Como validar | Esperado |
|------|--------------|----------|
| HTTPS funcionando | https://caligarage.com.br | Cadeado verde |
| Redirect www → apex (ou vice-versa) | https://www.caligarage.com.br | Redireciona |
| HTTP → HTTPS automático | http://caligarage.com.br | 301 → HTTPS |
| Headers de segurança | https://securityheaders.com/?q=caligarage.com.br | Grade **A** ou **A+** |
| SSL config | https://www.ssllabs.com/ssltest/analyze.html?d=caligarage.com.br | Grade **A+** |
| DNSSEC | https://dnsviz.net/d/caligarage.com.br/dnssec/ | Tudo verde |
| CAA records | `dig CAA caligarage.com.br` | 3 linhas |
| Email spoofing | https://www.mail-tester.com | SPF + DMARC validados |
| Schema.org | https://search.google.com/test/rich-results?url=caligarage.com.br | `AutoRepair` válido |
| Performance | https://pagespeed.web.dev/?url=caligarage.com.br | Mobile + desktop > 90 |
| Robots/Sitemap | https://caligarage.com.br/robots.txt e /sitemap.xml | Resolvem |

---

## Anexo — Defesa contra perfis falsos no WhatsApp/Instagram

Não é técnica de DNS mas afeta segurança da marca:

1. **Verificar negócio no Google Business Profile** — selo verificado nos resultados de busca local
2. **WhatsApp Business verificado** — ícone verde de verificação (depende de aprovação Meta)
3. **Instagram Business** — meta-verified ou perfil verificado se atingir critérios
4. **Monitorar via Google Alerts**: criar alerta para `"Cali Garage" Santos -site:caligarage.com.br`
5. **Reportar imitações** via canais oficiais (Meta, Google) quando detectadas

---

*Documento gerado em rev-0.8. Atualize após executado, marcando data de cada fase.*
