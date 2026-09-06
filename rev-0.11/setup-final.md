# Setup final — o que falta para zerar o projeto

> Aberto em 2026-09-06, com o site já no ar em `caligarage.com.br` (rev-0.10.2).
> Cada frente diz **quem faz o quê**. O que dependia só de código já está pronto.

---

## 1. GA4 — ✅ CONCLUÍDO em 06/09/2026

Measurement ID `G-33VMGDZ8BQ` ativo, com **Consent Mode básico**: nenhuma requisição ao Google e nenhum cookie antes do aceite. Verificado em produção nos três cenários. `generate_lead` confirmado no clique do WhatsApp.

**Resta ao cliente:** marcar `generate_lead` como evento de conversão em GA4 → Administrador → Eventos. Só aparece na lista depois do primeiro disparo real.

<details><summary>Registro do que foi feito</summary>

### Como era

### Estado
Implementado e testado na rev-0.11: `js/analytics.js` com Consent Mode v2, banner de consentimento e evento `generate_lead` no WhatsApp e no telefone. A CSP já libera os domínios do Google.

**Enquanto `GA_ID` estiver vazio, nada acontece**: sem banner, sem cookie, sem uma única requisição ao Google. É seguro estar em produção nesse estado, e foi verificado.

### O que o Vinicius faz
1. Acessar [analytics.google.com](https://analytics.google.com) **com a conta Google do cliente** — mesma lógica da Vercel e do Supabase: infraestrutura no nome dele.
2. Criar propriedade: nome `Cali Garage`, fuso **(GMT-03:00) São Paulo**, moeda **Real brasileiro (BRL)**.
3. Em **Administrador → Fluxos de dados → Adicionar fluxo → Web**, URL `https://caligarage.com.br`, nome `Site Cali Garage`.
4. Copiar o **Measurement ID**, no formato `G-XXXXXXXXXX`, e me passar.
5. Depois que o tráfego começar: **Administrador → Eventos**, marcar `generate_lead` como **evento de conversão**. Só aparece na lista depois do primeiro disparo.

### O que eu faço quando o ID chegar
Preencher `GA_ID` em `js/analytics.js`, subir o `?v=` dos assets e publicar. Uma linha, um deploy.

### Como conferir que funcionou
- Abrir o site, aceitar o banner, e ver a visita em **GA4 → Relatórios → Tempo real**.
- Clicar no WhatsApp e ver o `generate_lead` aparecer em tempo real.
- **Antes de aceitar o banner, nenhuma chamada a `google-analytics.com`** deve sair na aba Network. É o comportamento de LGPD opt-in.

---

## 2. Google Search Console — ✅ VERIFICADO em 06/09/2026

Propriedade do tipo **Domínio** verificada por TXT no DNS. O registro foi adicionado por CLI na zona da Vercel e propagou em menos de 20 segundos.

```
google-site-verification=BNGo67pMsXR4EOzZyZc3yN8Tnx4RpmJqK0Qb0mYlwoc
```

Sitemap validado antes do envio: XML válido, 7 URLs, todas em 200 com `index, follow`, e o `robots.txt` apontando para ele.

**Resta ao cliente:** enviar `sitemap.xml` em Search Console → Sitemaps, e pedir indexação da home em Inspeção de URL.

<details><summary>Registro do que foi feito</summary>

### Como era

### O que o Vinicius faz
1. Acessar [search.google.com/search-console](https://search.google.com/search-console), **também com a conta do cliente**.
2. **Adicionar propriedade → Domínio** (não "Prefixo do URL"): cobre `caligarage.com.br`, `www` e qualquer subdomínio futuro, em http e https.
3. Digitar `caligarage.com.br`.
4. O Google mostra um registro TXT, algo como `google-site-verification=AbC123...`. **Copiar esse valor e me passar.**

### O que eu faço
Como o DNS está na Vercel, adiciono o TXT por linha de comando:
```bash
export VERCEL_TOKEN=$(grep '^VERCEL_TOKEN=' ~/projetos/cali-garage-ops/.env.local | cut -d= -f2-)
npx vercel@latest dns add caligarage.com.br '@' TXT 'google-site-verification=VALOR' --token "$VERCEL_TOKEN" --scope cali-garage
```
Aviso quando propagar, ele clica em **Verificar**, e eu submeto o sitemap `https://caligarage.com.br/sitemap.xml`.

---

## 3. HSTS preload — pronto para submeter

### Estado: os três requisitos já passam
| Requisito | Situação |
|---|---|
| `http://` redireciona para `https://` no apex | 308 ✅ |
| Header no HTTPS com `max-age` ≥ 31536000 | 63072000, o dobro ✅ |
| `includeSubDomains` e `preload` presentes | ✅ |
| `www` com HTTPS válido | ✅ |

### Como submeter
Abrir [hstspreload.org](https://hstspreload.org/?domain=caligarage.com.br), conferir os itens em verde e clicar em **Submit**. Entra na lista dos navegadores em 2 a 6 semanas.

### O que pesar antes
Preload é **difícil de reverter**: sair da lista leva meses e passa por atualização de versão dos navegadores. E o `includeSubDomains` obriga **todo subdomínio futuro** de `caligarage.com.br` a ter HTTPS válido. Hoje a zona inteira está na Vercel, que emite certificado sozinha, então o risco é baixo. Mas se um dia apontarem um subdomínio para um servidor sem HTTPS, ele fica inacessível.

**Não submeti por conta própria** justamente por ser difícil de desfazer.

---

## 4. E-mail `contato@caligarage.com.br` — depende do Fabrício

Custo zero pelo Resend, que hoje também recebe e-mail (Inbound), incluído no plano gratuito.

### Como fica
1. Conta Resend **nova, no nome do cliente** (o plano free dá 1 domínio verificado por conta, e a da agência já usa o `donadaolabs.com`).
2. Verificar `caligarage.com.br` no Resend. Ele fornece os registros; como o DNS está na Vercel, **eu adiciono por CLI**.
3. Ativar o Inbound com encaminhamento para o Gmail do Fabrício.
4. No Gmail dele: **Configurações → Contas → Enviar e-mail como**, adicionar `contato@caligarage.com.br` com `smtp.gmail.com` e uma senha de app. O código de confirmação chega pelo encaminhamento.

Resultado: ele lê e responde tudo do Gmail de sempre, e o cliente vê o endereço profissional.

### O que muda no DNS
Hoje o domínio **não tem SPF nem DMARC**. Duas rotas:
- **Sem e-mail:** `v=spf1 -all` e DMARC `p=reject`, que impedem golpista de mandar e-mail se passando por `@caligarage.com.br`. Vale fazer mesmo sem usar e-mail.
- **Com e-mail:** SPF autorizando Google e Resend, DKIM do Resend, DMARC começando em `p=quarantine` e subindo para `reject` depois de duas semanas de relatório.

**Pergunta única para o Fabrício:** ele quer um e-mail no domínio? Se sim, faço a rota completa. Se não, aplico o bloqueio anti-spoofing, que é bom de qualquer jeito.

---

## 5. Fotos da oficina — depende do cliente

O site **não tem nenhuma tag `<img>`**. A galeria são 8 placeholders. É o item que mais mudaria a percepção de quem chega, porque hoje o visitante não vê a oficina em lugar nenhum.

O que pedir ao Fabrício, em ordem de utilidade:
1. **Fachada** — reconhecimento na rua, e o Google Business usa a mesma foto.
2. **Área de serviço com carro no elevador** — mostra estrutura.
3. **Equipe**, Carlinhos e Fabrício — as avaliações citam os dois pelo nome; rosto converte.
4. Detalhes: bancada, ferramenta, diagnóstico eletrônico.

Celular recente serve. Horizontal, luz do dia, sem filtro. Eu trato, corto e otimizo.

---

## Fora do escopo

**Horário no Google Business Profile.** Continua publicando "Abre seg. às 08:00", errado. Está com outra pessoa do lado do cliente.

</details>
