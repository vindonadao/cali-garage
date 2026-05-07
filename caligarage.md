# CLAUDE.md — Cali Garage Reparos Automotivos

## Visão Geral

Site institucional estático da **Cali Garage Reparos Automotivos**, oficina mecânica localizada em Santos/SP. O site serve como vitrine digital da empresa, apresentando seus serviços, localização, horários e canal de contato via WhatsApp. Público-alvo: donos de veículos motorizados na região de Santos/SP.

---

## Stack e Tecnologias

- **HTML5** puro — sem frameworks ou bibliotecas JavaScript
- **CSS3** puro — sem preprocessadores
- Sem dependências externas, sem build tool, sem gerenciador de pacotes
- Site 100% estático, sem backend

---

## Estrutura do Projeto

```
cali-garage/
├── index.html          # Home — hero, chamada principal, destaques
├── sobre.html          # Sobre a oficina — história, diferenciais
├── servicos.html       # Lista de serviços oferecidos
├── galeria.html        # Galeria de fotos (placeholders iniciais)
├── avaliacoes.html     # Avaliações do Google (conteúdo estático)
├── contato.html        # Contato, WhatsApp, telefone, mapa
├── css/
│   └── style.css       # Estilos globais e por seção
└── img/                # Imagens e assets visuais
```

Cada página HTML é independente e compartilha o mesmo `style.css` e navbar/footer.

---

## Identidade Visual

| Elemento        | Valor                          |
|-----------------|--------------------------------|
| Cor primária    | Laranja/cobre — `#C8622A` (aproximado da fachada) |
| Cor de fundo    | Cinza carvão escuro — `#1E1E1E` / `#2A2A2A`       |
| Cor de texto    | Branco — `#F5F5F5`             |
| Estilo geral    | Moderno retrô, tipografia bold, estilo californiano/garage |
| Logo referência | Tipografia cursiva + estrela, laranja sobre cinza escuro |

---

## Informações da Empresa

```
Nome:      Cali Garage Reparos Automotivos
Endereço:  Av. Campos Sales, 98 - Vila Matias, Santos - SP, CEP 11013-401
Telefone:  +55 13 3222-3456
WhatsApp:  +55 13 99625-2628
Horário:   Segunda a Sexta — 08:00 às 18:00
           Sábado e Domingo — Fechado
Avaliação: 4,7 ⭐ no Google (15 opiniões)
```

---

## Seções do Site

| Página          | Conteúdo principal |
|-----------------|--------------------|
| `index.html`    | Hero com nome/slogan, destaques de serviços, CTA WhatsApp |
| `sobre.html`    | Apresentação da oficina, missão, diferenciais |
| `servicos.html` | Lista completa de serviços (manutenção preventiva, corretiva, alinhamento, balanceamento, troca de óleo, freios, suspensão, etc.) |
| `galeria.html`  | Grade de imagens da oficina (placeholders até receber fotos reais) |
| `avaliacoes.html` | Avaliações do Google copiadas manualmente como conteúdo estático (4,7 ⭐ / 15 opiniões) |
| `contato.html`  | Botão WhatsApp, telefone, endereço, horários, embed Google Maps |

---

## Comandos Essenciais

```bash
# Abrir o site localmente (sem servidor)
open index.html

# Ou usar servidor local simples com Python
python3 -m http.server 8080
# Acesse: http://localhost:8080

# Ou com Node.js (se disponível)
npx serve .
```

Não há build, compilação ou processo de deploy automatizado. O deploy consiste em copiar os arquivos para o servidor de hospedagem (FTP, Netlify, GitHub Pages, etc.).

---

## SEO Local

O site deve ser otimizado para buscas locais em Santos/SP. Aplicar em todas as páginas:

- `<title>` com nome da cidade: ex. `Cali Garage — Oficina Mecânica em Santos SP`
- `<meta name="description">` com menção a Santos, Vila Matias e serviços
- Tag `<address>` com endereço completo no footer
- Dados estruturados (Schema.org) do tipo `LocalBusiness` ou `AutoRepair` no `index.html`
- Embed do Google Maps na página de contato
- Atributos `alt` descritivos em todas as imagens com referência à localização

---

## Diretrizes para o Claude

### Tarefas prioritárias
- Geração e edição de HTML/CSS das páginas
- Criação e ajuste de componentes visuais (navbar, cards, hero, footer)
- Otimização de SEO local (meta tags, Schema.org, semântica HTML)
- Copywriting para seções do site (sobre, serviços, chamadas)
- Inserção manual de avaliações do Google como HTML estático

### Padrões obrigatórios ao propor mudanças
- Manter a paleta de cores definida (laranja/cobre + cinza carvão + branco)
- Toda proposta de código deve ser **HTML5 semântico** (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<address>`)
- O botão de WhatsApp deve estar visível e acessível em **todas as páginas**
- Links entre páginas devem usar caminhos relativos (`./servicos.html`, não `/servicos.html`)
- CSS deve estar centralizado em `css/style.css` — evitar estilos inline
- Imagens devem ter atributo `alt` sempre preenchido

### O que evitar
- Não introduzir JavaScript frameworks (React, Vue, etc.)
- Não adicionar dependências externas (Bootstrap, jQuery, etc.) sem aprovação explícita
- Não criar área administrativa ou funcionalidades dinâmicas
- Não alterar as informações de contato (telefone, WhatsApp, endereço) sem confirmação
- Não remover ou substituir as avaliações do Google por dados fictícios

### Tom e formato das respostas
- Respostas técnicas diretas, com blocos de código completos e prontos para uso
- Ao propor alterações de CSS ou HTML, sempre entregar o trecho completo, não apenas o diff
- Quando gerar uma página inteira, incluir `<!DOCTYPE html>`, `<head>` completo com meta tags de SEO e link para `style.css`

---

## Contexto Adicional

- **Imagens:** O projeto inicia com imagens de referência/placeholder. Quando o cliente fornecer fotos reais da oficina, substituir os placeholders mantendo os mesmos atributos `alt` e estrutura HTML.
- **Avaliações:** As avaliações do Google são inseridas manualmente como HTML estático. Não há integração com API do Google. Atualizar o conteúdo quando o cliente fornecer novas avaliações.
- **Hospedagem:** Ainda não definida. O código deve ser compatível com qualquer hospedagem estática (Netlify, GitHub Pages, cPanel/FTP).
- **Avaliação Google:** 4,7 ⭐ com 15 opiniões — destacar no hero e na página de avaliações como prova social.
