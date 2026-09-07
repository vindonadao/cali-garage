# E-mail do domínio — como está montado

> Configurado em 06 e 07/09/2026. `contato@caligarage.com.br`, custo zero.
> Duas contas gratuitas dividindo o trabalho, ambas no nome do cliente.

---

## Quem faz o quê

| Função | Serviço | Por quê |
|--------|---------|---------|
| **Receber** | ImprovMX (free) | Encaminha para o Gmail sem código. O Resend Inbound só encaminha por webhook, o que exigiria uma aplicação para manter. |
| **Enviar** | Resend (free) | Assina com DKIM do domínio, o que faz o DMARC passar. O ImprovMX free não envia. |

Contas: ambas em `caligaragerepauto@gmail.com`, junto da Vercel e do Supabase.

---

## Registros DNS (zona na Vercel, conta do cliente)

| Nome | Tipo | Valor | Para quê |
|------|------|-------|----------|
| `@` | MX 10 | `mx1.improvmx.com` | recebimento |
| `@` | MX 20 | `mx2.improvmx.com` | recebimento |
| `@` | TXT | `v=spf1 include:spf.improvmx.com -all` | autoriza o encaminhamento, bloqueia o resto |
| `send` | MX 10 | `feedback-smtp.sa-east-1.amazonses.com` | bounces do envio |
| `send` | TXT | `v=spf1 include:amazonses.com ~all` | autoriza o Resend a enviar |
| `resend._domainkey` | TXT | `p=MIGf…` | DKIM, assina como `@caligarage.com.br` |
| `_dmarc` | TXT | `v=DMARC1; p=quarantine; sp=reject; adkim=s; aspf=r; pct=100` | política |

---

## Decisões e o porquê

**DMARC em `quarantine`, não `reject`.** Com `reject`, qualquer desalinhamento faz o e-mail **sumir sem aviso**: o destinatário não recebe e o remetente não sabe. Em `quarantine` o pior caso é cair no spam, que é recuperável. **Subir para `p=reject` depois de duas semanas** confirmando que está tudo passando. O `sp=reject` já está firme para subdomínios, que não têm uso legítimo.

**`aspf=r` e não `aspf=s`.** O return-path do envio fica em `send.caligarage.com.br`, e com alinhamento estrito o SPF não casaria com o domínio raiz, deixando o DMARC dependendo só do DKIM. Com relaxed, os dois alinham.

**MX do raiz é exclusivo.** Só um serviço pode receber. Se um dia migrarem para Google Workspace, os MX do ImprovMX são **substituídos**, não somados.

**O Resend Inbound foi descartado.** Chegou a ser configurado (MX `inbound-smtp.sa-east-1.amazonaws.com`) e depois removido, porque o encaminhamento dele exige webhook, endpoint HTTPS, validação de assinatura e reenvio por código. Peça a mais para manter, sem ganho para o caso de uso.

---

## Como o Fabrício responde

Gmail dele → Configurações → Contas e importação → **Enviar e-mail como**:

```
Servidor SMTP : smtp.resend.com
Porta         : 465 (SSL)
Usuário       : resend        ← literalmente esta palavra, não o e-mail
Senha         : a API key do Resend (re_...)
```

O usuário ser `resend` para todo mundo é a pegadinha clássica: quem coloca o endereço recebe erro de autenticação sem explicação.

---

## Limites e pontos de atenção

- **500 encaminhamentos por dia** no ImprovMX free. Estourou, o domínio é pausado até meia-noite UTC. Muito acima do volume de uma oficina.
- **25 aliases** no free.
- **Catch-all (`*`)**: se ficar ativo, todo endereço `@caligarage.com.br` cai no Gmail, e robôs de spam varrem DNS atrás disso. Recomendado deixar só o `contato`.
- **3.000 e-mails/mês e 100/dia** no Resend free, para o envio.
