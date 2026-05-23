# rev-0.8 — Notes

> Status: **Open**
> Aberta em: 2026-05-10
> Foco: Hardening de segurança e proteções contra phishing/spoofing para landing page de serviços

---

## Contexto

Site estático servido por Vercel, sem backend, sem coleta de dados, sem formulários. Toda comunicação com cliente é via WhatsApp (link wa.me) ou telefone. Galeria e avaliações são HTML estático.

A pergunta levantada pelo cliente: "existe alguma atualização de segurança contra vírus e phishing que seja necessária? Precisa criar algum banco de dados?"

---

## Mudanças solicitadas

- [x] **Runbook de pós-compra do domínio** — checklist técnico completo para o dia do go-live em `caligarage.com.br`

## Decisões arquivadas

### Por que NÃO criar banco de dados
Site é landing page de serviços, não captura leads via formulário (toda comunicação é WhatsApp/telefone). Não tem login, não tem comentários. Avaliações são HTML estático conforme brief original. DB seria over-engineering — quebraria o princípio "zero dependências externas" e exigiria backend que não existe hoje. Caso futuro mude (ex: agendamento online), reabrir avaliação.

### Por que NÃO antivírus / EDR / WAF custom
Não há servidor para ser comprometido. Site é arquivo estático servido pela CDN da Vercel — superfície de ataque é a CDN (Vercel já protege) e o navegador do visitante (browser-level, fora do escopo do site). WAF custom é redundante: Vercel free tier já tem proteção DDoS + bot detection.

### Foco escolhido para esta rev: Setup pós-compra de domínio
Cliente ainda não comprou `caligarage.com.br`. Quando comprar, há um momento crítico de configuração (DNS, SSL, CAA, DNSSEC, HSTS preload, SPF/DMARC) que se for mal feito deixa janela de phishing/spoofing aberta. O runbook em `domain-launch-runbook.md` é a entregável principal: 8 fases sequenciais com comandos prontos pra copy-paste.
