# PDF-COPY — Pré-Briefing SAW Móveis
**Copywriter:** Marina · **Aprovação:** Ivan (B-completo) · **Data:** 2026-06-05
**Uso:** Rafael copia cada bloco diretamente no jsPDF. Variáveis dinâmicas marcadas com `{{chave}}`.

---

## VARIÁVEIS DINÂMICAS — mapa completo

| Variável | Origem (wizard) | Exemplo |
|---|---|---|
| `{{nome_cliente}}` | Etapa 1 — campo nome | Ivan Barbosa |
| `{{whatsapp_cliente}}` | Etapa 1 — campo WhatsApp | (11) 9 8765-4321 |
| `{{email_cliente}}` | Etapa 1 — campo e-mail | ivan@email.com |
| `{{ambiente}}` | Etapa 2 — seleção de ambiente | Cozinha |
| `{{dimensao_min}}` | Etapa 3 — faixa de m² (valor inferior) | 15 |
| `{{dimensao_max}}` | Etapa 3 — faixa de m² (valor superior) | 25 |
| `{{estilo}}` | Etapa 4 — seleção de estilo | Moderno |
| `{{valor_min}}` | Calculado por regra de negócio | 22 |
| `{{valor_max}}` | Calculado por regra de negócio | 38 |
| `{{data_geracao}}` | Date.now() no momento do submit | 05 de junho de 2026 |

---

## BLOCO 1 — Header / Capa (página 1)

### Título principal
*(Playfair Display, ~32pt, branco puro)*

```
Pré-Briefing Personalizado
```

### Subtítulo dinâmico
*(Inter Regular, ~14pt, branco off — #F5F5F5)*

```
Preparado para {{nome_cliente}}
```

> **Nota Rafael:** subtítulo fica na linha imediatamente abaixo do título, sem quebra de parágrafo extra. Tom: receptivo sem ser efusivo — o nome do cliente já personaliza; não precisa de "bem-vindo" ou exclamação.

---

## BLOCO 2 — Apresentação (logo abaixo do header, antes dos dados do cliente)

*(Inter Regular, ~13pt, cinza escuro #333333. Largura máxima recomendada: 480px para respirar no A4)*

```
Recebemos as informações do seu projeto.

Este documento reúne uma referência de investimento baseada no
ambiente, dimensão e estilo que você escolheu — projetada a partir
de obras similares já entregues pela SAW.

Nossa equipe entra em contato em até 2 horas úteis pelo WhatsApp
informado para alinhar agenda e responder qualquer dúvida.
```

> **Decisão de copy:** três parágrafos curtos em vez de um bloco único. Facilita leitura em diagonal — padrão de quem lê PDF no celular. Sem "estamos felizes em receber", sem "ficamos à disposição". Direto ao que o documento é e o que acontece a seguir.

---

## BLOCO 3 — Dados do Cliente

*(Label: Inter SemiBold ~10pt, laranja SAW #E85B04. Valor: Inter Regular ~12pt, preto #1A1A1A)*

### Seção "CLIENTE"

```
CLIENTE

Nome:       {{nome_cliente}}
WhatsApp:   {{whatsapp_cliente}}
E-mail:     {{email_cliente}}
```

### Seção "SEU PROJETO"

```
SEU PROJETO

Ambiente:             {{ambiente}}
Dimensão aproximada:  {{dimensao_min}} a {{dimensao_max}} m²
Estilo escolhido:     {{estilo}}
```

---

## BLOCO 4 — Referência de Investimento

*(Bloco com borda laranja ou fundo cinza claro — destaque visual. Rafael mantém o estilo atual do sample que está bem.)*

### Label do bloco
*(Inter SemiBold, ~10pt, laranja #E85B04, caps)*

```
REFERÊNCIA DE INVESTIMENTO
```

### Valor
*(Playfair Display ou Inter Bold, ~28pt, preto #1A1A1A)*

```
R$ {{valor_min}} mil  –  R$ {{valor_max}} mil
```

### Microcopy sob o valor
*(Inter Italic, ~11pt, cinza médio #666666)*

```
Baseado em projetos similares já entregues pela SAW.
O valor exato é definido após visita técnica e detalhamento de materiais.
```

> **Decisão de copy:** troquei "Orçamento exato após visita técnica" por duas frases separadas — a primeira ancora confiança (dados reais), a segunda define expectativa clara sem gerar ansiedade. Evita o cliente achar que a SAW vai cobrar diferente do que mostrou. Sem "estimativa" (palavra que enfraquece) — "referência" é mais técnico e preciso.

---

## BLOCO 5 — Checklist para a Visita Técnica

*(Label: Inter SemiBold ~10pt, laranja. Itens: Inter Regular ~12pt, com caixa de checkbox — quadrado vazio 10×10px)*

### Label
```
CHECKLIST PARA SUA VISITA TÉCNICA
```

### Itens
```
[ ]  Medidas aproximadas do ambiente (largura × profundidade × pé direito)
[ ]  Fotos do espaço atual em diferentes ângulos
[ ]  Localização de tomadas, janelas, portas e pontos de iluminação
[ ]  Lista de funcionalidades essenciais (ex: 4 panelas, air fryer, lava-louças)
[ ]  Referências visuais que você gosta — foto de revista, Pinterest, obra vista
[ ]  Faixa de investimento confirmada com quem decide — agiliza o processo
```

> **Mudanças em relação ao sample:**
> - Item 4: adicionei "lava-louças" ao exemplo — mais representativo de cozinha completa.
> - Item 5: **novo** — referências visuais. O cliente que chega com referência fecha mais rápido e com mais convicção. Dado real de venda consultiva.
> - Item 6: reescrevi "Faixa de investimento aprovada — otimiza materiais sem retrabalho" para "confirmada com quem decide — agiliza o processo". Mais direto, sem soar que a SAW vai "otimizar" (subentende cortar). "Quem decide" endereça o caso de cônjuge/sócio que não está na conversa.

---

## BLOCO 6 — Próximos Passos

*(Label: Inter SemiBold ~10pt, laranja. Itens: Inter Regular ~12pt, numerados. Espaçamento entre itens: 12px)*

### Label
```
O QUE ACONTECE AGORA
```

### Itens numerados
```
1.  Em até 2 horas úteis, nossa equipe entra em contato pelo WhatsApp
    informado para confirmar interesse e alinhar agenda.

2.  Agendamos visita técnica gratuita — vemos o ambiente, tiramos as
    medidas e entendemos o que você precisa que o projeto resolva.

3.  Em até 5 dias úteis após a visita, você recebe orçamento detalhado
    com projeto 3D técnico. Incluso, sem custo adicional.

4.  Projeto aprovado: fabricamos em 45 dias na nossa fábrica própria em
    Itapecerica da Serra. Garantia de 3 anos em estrutura, ferragens e
    acabamento — escrita em contrato.
```

> **Decisões de copy:**
> - Renomeei de "Próximos Passos" para "O QUE ACONTECE AGORA" — mais ativo, sem ser urgente. Foco no processo, não no cliente ter que fazer algo.
> - Item 1: "confirmar interesse" em vez de "refinar e detalhar os próximos passos juntos" — mais objetivo. "Juntos" soava forçadamente íntimo.
> - Item 2: adicionei "entendemos o que você precisa que o projeto resolva" — ancora que a visita é para entender o problema, não para vender. Tom consultivo.
> - Item 3: "Incluso, sem custo adicional" — separado, em frase curta. Mais impacto. Render 3D gratuito é diferencial real; não enterrar no meio da frase.
> - Item 4: "escrita em contrato" — puxei do playbook Ivan. Não é promessa verbal. É dado factual que gera confiança em ticket alto.
> - Mantive "fábrica própria" — diferencial de controle de processo e prazo que o concorrente de franquia não tem.

---

## BLOCO 7 — Footer (rodapé, todas as páginas)

*(Inter Regular, ~9pt, cinza escuro #444444. Linha separadora fina em laranja SAW acima. Centralizado.)*

### Linha 1 — Identidade legal
```
Marcenaria SAW Móveis Ltda  ·  CNPJ 42.345.456/0001-33
Rua Teixeira, 99  ·  Itapecerica da Serra/SP  ·  CEP 06853-460
```

### Linha 2 — Contato
```
WhatsApp (11) 3495-9479  ·  sawmoveis.com.br
```

### Linha 3 — Credenciais (separador · entre cada item)
```
11 anos no mercado  ·  +350 obras entregues  ·  45 dias de fabricação
Ferragens FGV (Itália) e Häfele (Alemanha)  ·  MDF Eucatex
3 anos de garantia em estrutura, ferragens e acabamento
```

> **Notas do rodapé:**
> - Razão social: Marcenaria SAW Móveis Ltda apenas. Nunca Embu, nunca SAW Móveis e Decorações.
> - Ferragens: FGV e Häfele com país de origem — regra SAW. Rena (dobradiças) não aparece no rodapé por espaço; pode entrar se houver linha extra.
> - "3 anos de garantia" — não "3 anos de garantia total" nem "garantia completa". Específico: estrutura, ferragens e acabamento. O cliente de ticket alto quer saber o que está coberto.
> - Endereço no footer usa "Rua Teixeira" conforme brief. Sample usava "Rua Taquaral" — confirmar endereço correto com Ivan antes de Rafael deployar.

---

## NOTAS PARA RAFAEL — implementação jsPDF

### Disclaimer LGPD (microcopy obrigatório — colocar no footer ou página 2 se houver)
*(Inter Regular, ~8pt, cinza claro #888888 — não chamar atenção, mas precisa estar)*

```
Seus dados são usados exclusivamente para elaboração do orçamento e
contato sobre seu projeto. Não compartilhamos com terceiros.
Política de Privacidade: sawmoveis.com.br/politica-de-privacidade
```

> Isso é obrigatório pelo que implementamos em 28/05 na política LGPD. Google Ads e Meta Ads exigem esta menção quando o dado veio de formulário web.

### Ordem de renderização sugerida (uma página A4)

```
[HEADER]          — logo + título + subtítulo {{nome_cliente}} + data
[APRESENTAÇÃO]    — bloco 2 (3 parágrafos curtos)
[CLIENTE]         — dados pessoais
[SEU PROJETO]     — ambiente + dimensão + estilo
[REFERÊNCIA]      — caixa destacada com R$ {{valor_min}}–{{valor_max}} mil
[CHECKLIST]       — 6 itens com checkbox
[PRÓXIMOS PASSOS] — 4 itens numerados
[DISCLAIMER LGPD] — microcopy ~8pt
[FOOTER]          — 3 linhas: legal + contato + credenciais
```

> Se não couber em uma página A4 com espaçamento adequado, mover "Próximos Passos" para página 2 com repetição do header reduzido. Não comprimir fontes abaixo de 9pt — PDF premium, não panfleto.

### Checklist de variáveis antes de deployar

- [ ] `{{nome_cliente}}` — não vazio, não "undefined"
- [ ] `{{valor_min}}` e `{{valor_max}}` — sempre número inteiro em "mil" (ex: 22, não 22000)
- [ ] `{{dimensao_min}}` e `{{dimensao_max}}` — número sem "m²" (o "m²" está fixo no template)
- [ ] `{{data_geracao}}` — formato "05 de junho de 2026" (por extenso, pt-BR)
- [ ] `{{ambiente}}` — primeira letra maiúscula (Cozinha, não cozinha)
- [ ] `{{estilo}}` — idem (Moderno, Clássico Sofisticado, etc.)
