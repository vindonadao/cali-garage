# Brand Folder — Cali Garage rev-0.1

Pasta com os deliverables estratégicos da rev-0.1, produzidos pelo Brand Squad.

## Arquivos

| Arquivo | Autor (squad) | Conteúdo |
|---|---|---|
| `identity-system.md` | Alina Wheeler | Sistema completo: brand brief, 5 variantes, color system, typography pairing, clearspace, application guidelines, do/don't, versioning |
| `archetype.md` | Archetype Consultant | Arquétipo Everyman + Explorer, tone of voice, visual personality anchors, voice samples |
| `assets/` | (futuro) | SVGs e PNGs exportados das variantes do logo, com naming convention `caligarage-{variante}-{cor}-{tamanho}.{ext}` |

## Como usar

1. **Antes de qualquer alteração visual no site**, consultar `identity-system.md`
2. **Antes de qualquer copy/texto novo**, consultar `archetype.md` (tone of voice + voice samples)
3. **Antes de criar nova variante de logo**, validar contra §2 (Identity System) do Wheeler
4. **Antes de aprovar nova aplicação** (cartão, uniforme, social), checar §6 (Application Guidelines)

## Pendências críticas

### 1. Foto em alta da fachada (CRÍTICO)

A pintura da fachada é o **artefato canônico rev-0.0** (Wheeler §1.1, §6.2). A versão digital atual é uma **aproximação geométrica honesta** — não tenta fingir pincelada que não conseguimos reproduzir manualmente em SVG.

**Para alcançar fidelidade 1:1**, precisamos:
- Foto frontal da placa em alta resolução (1500x800 mínimo)
- Luz neutra (sem sol direto, ~10h ou ~16h)
- Sem cropping agressivo
- Idealmente em formato JPG ou PNG sem compressão excessiva

Com a foto em alta, o caminho técnico é:
1. **Auto-trace via potrace/Adobe Illustrator** — converte a imagem em SVG paths reais que preservam a textura do pincel
2. **Cleanup manual** — refina contornos, remove ruído de fundo
3. **Salva como `caligarage-primary-brush-authentic.svg`** — variante "alta fidelidade"
4. **Substitui o placeholder geométrico atual** nas aplicações ≥120px (hero, about, footer)
5. **Mantém o placeholder geométrico** apenas no navbar (pequeno, performance) — ou também substitui

### 2. Documentação fotográfica anual

Per Wheeler §6.2: fotografar a fachada anualmente em luz neutra para arquivar evolução. Próxima foto programada: 2027-05.

## Histórico de versionamento

- **rev-0.0** — fachada pintada à mão (artefato físico, sem arquivo digital, ~2014–presente)
- **rev-0** (snapshot em `../rev-0/`) — primeira tentativa digital, abandonada (font Shrikhand + filtro distressed = sem personalidade)
- **rev-0.1** — sistema atual: HTML+CSS no navbar, SVG inline geométrico nos placements grandes, brand system completo do Wheeler, archetype articulado

## Próximas revisões previstas

- **rev-0.2** — auto-trace da fachada quando foto em alta chegar
- **rev-0.3** — propagação completa do visual language para páginas internas
- **rev-1.0** — revisão major (apenas se justificada por reposicionamento estratégico ou repintura da fachada)
