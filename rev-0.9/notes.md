# rev-0.9 — Notes

> Status: **Open**
> Aberta em: 2026-05-23
> Foco: Onda 1 da auditoria Cowork (SEO/social/LGPD estáticos)

---

## Contexto

Auditoria Cowork realizada por Vinicius Donadão (Donadão Labs) em https://caligarage.donadaolabs.com/ em **2026-05-23**. Resumo executivo da auditoria:

> "Página tecnicamente sólida e pronta para uso: HTTPS forte, headers de segurança completos, nenhum segredo vazado, todos os links e páginas internas funcionando e proposta de valor clara com prova social. Não há bloqueador crítico. Os dois pontos que mais pesam no resultado comercial são: (1) ausência total de medição — sem GA4/pixel, o cliente roda no escuro; e (2) um vazamento de ambiente de staging nos dados estruturados (schema.org apontando para cali-garage.vercel.app)."

Severidade encontrada: 0 🔴 Crítico · 2 🟠 Alto · 4 🟡 Médio · 2 ⚪ Baixo.

---

## Escopo desta rev

A auditoria recomenda corrigir em duas ondas:
- **Onda 1 (rev-0.9 — esta):** itens estáticos que não envolvem tracking nem consent
- **Onda 2 (rev-0.10 — próxima):** GA4 + Consent Mode v2 + event tracking

### Itens fechados na rev-0.9
- [x] JSON-LD `AutoRepair` — corrigido `@id`, `url`, `image` (🟠 Alto)
- [x] Open Graph completo em todas as 7 páginas (🟡 Médio)
- [x] `<link rel="canonical">` em todas as 7 páginas (🟡 Médio)
- [x] og-cover.jpg 1200×630 gerada
- [x] `/privacidade.html` LGPD com placeholders (🟡 Médio — pré-req LGPD)
- [x] Link "Política de Privacidade" no footer das 7 páginas
- [x] `sameAs` no JSON-LD com placeholder pro Google Business Profile (🟡 Médio)
- [x] Tap targets ≥44px em rodapé e "Ver todas as avaliações" (⚪ Baixo, WCAG 2.5.5)
- [x] `sitemap.xml` realinhado pro domínio canônico + paths `.html` + privacidade

### Itens NÃO fechados na rev-0.9
- [ ] GA4 + Consent Mode v2 + event tracking — **rev-0.10**
- [ ] Banner de cookies LGPD — **rev-0.10**
- [ ] CSP nonce/hash (remover `'unsafe-inline'` de `script-src`) — backlog ⚪ Baixo

---

## Decisões arquivadas

### Domínio canônico = `caligarage.donadaolabs.com`
O site atualmente está hospedado neste subdomínio (Cowork auditou aqui). O domínio próprio `caligarage.com.br` ainda não foi adquirido pelo cliente — quando for, o runbook da rev-0.8 (`domain-launch-runbook.md`) cobre a transição com substituição global das URLs no código. **Decisão:** apontar tudo (JSON-LD, canonical, OG, sitemap) pra `caligarage.donadaolabs.com` agora, ao invés de "futurar" pro domínio inexistente — Cowork especificamente alertou contra usar dom inexistente.

### og-cover.jpg gerada localmente
Não temos foto da fachada da oficina (era referenciada no JSON-LD original como `fachada.jpg` mas nunca existiu — typo da rev-0.6). Gerada uma cover composta via PIL com logo recolorido em laranja sobre warm cocoa + textos descritivos. Resultado: 1200×630, 64KB, JPEG quality 88. Aprovação visual via verificação. Quando o cliente entregar foto real da fachada, substituir o asset preservando o nome `og-cover.jpg`.

### Redes sociais no footer
Cowork sinalizou que o footer linka apenas `@donadaolabs` (Instagram da agência) — mas isso está no rodapé separado "Built by Donadão Labs", abaixo do rodapé principal da oficina. O rodapé da Cali Garage em si **não tem nenhum link de rede social** porque o cliente atualmente **não possui perfis ativos próprios** (decisão validada com o cliente em 2026-05-23). O Google Business Profile (que tem as 15 avaliações 4,7★) será adicionado via `sameAs` no JSON-LD assim que o cliente passar a URL.

### /privacidade.html com placeholders explícitos
Cobre LGPD (Lei 13.709/2018) sem firmar como parecer jurídico. Placeholders explícitos:
- **CNPJ:** `[PREENCHER]` na seção 1 — exige info do cliente
- **DPO/Encarregado:** `[A definir]` na seção 9 — microempresas podem operar sem DPO formal por força da Resolução CD/ANPD nº 2/2022

A política já antecipa GA4 (seção 3.1) pra não precisar de revisão quando a rev-0.10 for ao ar.

---

## Acceptance criteria

- [x] JSON-LD validável em https://search.google.com/test/rich-results (esperado: `AutoRepair` sem warnings)
- [x] Compartilhamento WhatsApp/Telegram do site mostra preview com og-cover (validação manual no preview Vercel)
- [x] `/privacidade.html` linkada do footer de todas as páginas (incluindo a própria privacidade)
- [x] Mobile DevTools: links rodapé ≥44px de altura tocável
- [ ] Validação visual em preview Vercel — **pendente push**
- [ ] User valida visualmente — **pendente preview**

---

## Próximos passos

1. Push da branch `rev-0.9-cowork-audit-wave-1`
2. Vercel cria preview automático
3. User valida visualmente em desktop + mobile
4. Cliente passa: URL Google Business Profile + CNPJ + decisão sobre DPO
5. Substituir os 2-3 placeholders nos arquivos finais
6. Merge em `main` + tag `rev-0.9`
7. Abrir rev-0.10 (GA4 + Consent Mode)
