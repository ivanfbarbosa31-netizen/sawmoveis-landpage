# PDF Pré-Briefing SAW — Direção de Arte Completa
**Responsável:** Bárbara (Diretora de Arte)  
**Data:** 2026-06-05  
**Opção aprovada:** B-Completo  
**Para implementação:** Rafael (DevOps) — não mexer no site nem no JS agora; só consumir estes assets e instruções

---

## 1. Logo SAW — Base64 pronta para jsPDF

**Arquivo:** `_samples/logo-saw-base64.txt`  
**Logo usada:** `agente-barbara/proposta-premium/assets/logo-saw.png` — versão branca com alpha real (logo-saw.png, 16.465 bytes)  
**Por que essa:** é a versão para fundo escuro, com transparência real. Vai sobre o header `#1A1918` sem retângulo preto.

### Como Rafael usa no jsPDF

```javascript
// Lê o conteúdo de logo-saw-base64.txt
const logoBase64 = fs.readFileSync('logo-saw-base64.txt', 'utf-8').trim();

// Injeta na capa do PDF (jsPDF)
// Parâmetros: addImage(imageData, format, x, y, width, height)
// Logo no header: topo da página, margem 24px, largura 120px proporcional
doc.addImage(logoBase64, 'PNG', 24, 18, 120, 34); // ajustar height conforme proporção real
```

**Nota Rafael:** o arquivo `logo-saw.png` tem 16.465 bytes. A proporção do logo é ~3.52:1 (largura:altura). Para largura 120px, altura correta = ~34px. Testar e ajustar conforme render.

---

## 2. Fontes Brand — Assets em `_samples/fonts/`

### Arquivos disponíveis

| Arquivo | Tipo | Peso | Tamanho | Status |
|---|---|---|---|---|
| `PlayfairDisplay-Variable.ttf` | TTF | Variable (inclui 400-900) | 293KB | Válido |
| `PlayfairDisplay-Bold.ttf` | TTF | Variable (cópia) | 293KB | Válido |
| `PlayfairDisplay-Regular.woff2` | WOFF2 | 400 Regular | 21KB | Válido |
| `PlayfairDisplay-Bold.woff2` | WOFF2 | 700 Bold | 22KB | Válido |
| `PlayfairDisplay-Italic.woff2` | WOFF2 | 400 Italic | 21KB | Válido |
| `Inter-Regular.ttf` | TTF | 400 Regular | 397KB | Válido |
| `Inter-Bold.ttf` | TTF | 700 Bold | 405KB | Válido |
| `Inter-Italic.ttf` | TTF | 400 Italic | 403KB | Válido |
| `InterVariable.ttf` | TTF | Variable (inclui todos) | 842KB | Válido |
| `Inter-Regular.woff2` | WOFF2 | 400 Regular | 23KB | Válido |
| `Inter-Bold.woff2` | WOFF2 | 700 Bold | 23KB | Válido |

### Como Rafael usa no jsPDF

jsPDF nativo suporta TTF com `addFileToVFS` + `addFont`. Exemplo:

```javascript
import { jsPDF } from 'jspdf';
import fs from 'fs';

const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

// Carregar Playfair Display Bold
const playfairBoldData = fs.readFileSync('_samples/fonts/PlayfairDisplay-Bold.woff2');
// OU usar o TTF variable: PlayfairDisplay-Variable.ttf
const playfairTTFData = fs.readFileSync('_samples/fonts/PlayfairDisplay-Variable.ttf');
const playfairBase64 = playfairTTFData.toString('base64');
doc.addFileToVFS('PlayfairDisplay-Bold.ttf', playfairBase64);
doc.addFont('PlayfairDisplay-Bold.ttf', 'PlayfairDisplay', 'bold');

// Carregar Inter Regular
const interRegData = fs.readFileSync('_samples/fonts/Inter-Regular.ttf');
const interRegBase64 = interRegData.toString('base64');
doc.addFileToVFS('Inter-Regular.ttf', interRegBase64);
doc.addFont('Inter-Regular.ttf', 'Inter', 'normal');

// Carregar Inter Bold
const interBoldData = fs.readFileSync('_samples/fonts/Inter-Bold.ttf');
const interBoldBase64 = interBoldData.toString('base64');
doc.addFileToVFS('Inter-Bold.ttf', interBoldBase64);
doc.addFont('Inter-Bold.ttf', 'Inter', 'bold');

// Usar
doc.setFont('PlayfairDisplay', 'bold');
doc.setFontSize(28);
doc.text('Pré-Briefing personalizado', 300, 400, { align: 'center' });

doc.setFont('Inter', 'normal');
doc.setFontSize(12);
doc.text('Marcenaria SAW Móveis · Itapecerica da Serra', 300, 500, { align: 'center' });
```

**Recomendação de peso de arquivo:** usar Inter-Regular.ttf + Inter-Bold.ttf + PlayfairDisplay-Variable.ttf. Não incluir todos os pesos — PDF fica pesado. Variable font do Playfair cobre Regular + Bold + Italic com wght axis.

**WOFF2 para jsPDF:** jsPDF não processa WOFF2 nativo — converter para base64 e usar via `addFileToVFS` pode funcionar em alguns builds. Se der problema, usar os TTFs que são garantidos.

---

## 3. Paleta Cromática Exata — Brand Kit SAW

| Uso no PDF | Cor | Hex | Fonte |
|---|---|---|---|
| Header background | Betume | `#1A1918` | Brand kit |
| Header texto / logo | Branco off-white | `#F8F5F0` | Brand kit |
| Acento principal | Laranja SAW | `#E85C1A` | Brand kit |
| Bloco investimento background | Bege Mediterrâneo | `#F4EDE3` | Brand kit (derivado de Creme quente #F2EFE9) |
| Bloco investimento borda esq. | Laranja SAW | `#E85C1A` | Brand kit |
| Bloco investimento texto | Betume | `#1A1918` | Brand kit |
| Corpo do documento background | Branco neutro | `#FFFFFF` | Brand kit |
| Corpo texto principal | Cinza chumbo | `#3D3A37` | Brand kit (Cinza escuro) |
| Linhas separadoras | Cinza neblina | `#9A9590` | Brand kit (Cinza médio) |
| Footer background | Betume | `#1A1918` | Brand kit |
| Footer texto | Branco off-white | `#F8F5F0` | Brand kit |
| Labels de seção | Laranja SAW | `#E85C1A` | Brand kit |
| Fundo capa overlay | Betume 50% | `rgba(26,25,24,0.50)` | Inferido |

### Regras de uso do laranja (Brand kit)

- Máximo 2 elementos com laranja por seção
- Laranja NÃO como background de corpo — só como acento (borda, label, detalhe)
- Em texto corrido: nunca. Só em números de destaque ou label de seção

---

## 4. Capa Premium — 1ª Página

### Foto selecionada

**FOTO ESCOLHIDA:**
```
G:\Meu Drive\REDE SAW MOVEIS\015 - Catalogo\016 - Fotos\fotos\Fotos atualizadas\_SAG6701.jpg
```

**Por que esta foto:**
- Cozinha gourmet com mesa de madeira + ilha de granito preto, 8 cadeiras Eames brancas
- Marcenaria amadeirada SAW ocupando toda a parede ao fundo (nichos, armários altos, nicho de gourmet)
- Pendentes brancos tipo sino — elegância discreta
- Luz natural lateral (janela translúcida) — foto com qualidade profissional de catálogo
- Protagonismo SAW: 82% da área visual (marcenaria + mobília planejada)
- Nenhum objeto cotidiano poluindo — orquídeas, fruteira discreta
- Tons: madeira caramelo + branco + granito preto + cinza cimento — paleta que casa com `#1A1918` + `#F8F5F0`
- Resolução: 2.2MB, estimativa ~2000x1300px — adequada para PDF A4

**Critério Fernanda Marques aplicado:** foto de ambiente integrado, funcional e socialmente vivo — não apenas produto isolado. O espaço "conversa" sobre como a família vive.

**Alternativa segura** caso _SAG6701 tenha problema técnico:
```
G:\Meu Drive\REDE SAW MOVEIS\015 - Catalogo\016 - Fotos\fotos\Fotos atualizadas\_SAG6696.jpg
```
(mesma cozinha, ângulo mais fechado na mesa e nos nichos — também excelente, protagonismo ≥78%)

---

### Layout da Capa (Página 1) — Descrição Visual

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│  [FOTO _SAG6701 — sangrada em toda a página A4]       │
│  [overlay betume #1A1918 a 50% de opacidade]          │
│                                                        │
│  ┌── topo | margem 40pt ──────────────────────────┐   │
│  │  [logo SAW branca — base64 — 100px largura]    │   │
│  └────────────────────────────────────────────────┘   │
│                                                        │
│                                                        │
│         [CENTRO VERTICAL da página]                    │
│                                                        │
│    Playfair Display Italic 400 · 11pt · #9A9590       │
│    "Preparado exclusivamente para"                      │
│                                                        │
│    Playfair Display Bold 700 · 28pt · #F8F5F0         │
│    "Pré-Briefing"                                      │
│                                                        │
│    Playfair Display Italic 400 · 18pt · #F8F5F0       │
│    "personalizado"                                     │
│                                                        │
│    [linha laranja #E85C1A — 40pt de largura, 1pt]     │
│                                                        │
│    Inter Bold 700 · 16pt · #F8F5F0                    │
│    "[Nome do cliente]"   ← dinâmico via JS            │
│                                                        │
│    Inter Regular 400 · 11pt · #9A9590                 │
│    "[Data por extenso]"  ← dinâmico via JS            │
│                                                        │
│                                                        │
│  ┌── rodapé | margem 36pt ────────────────────────┐   │
│  │  Inter Regular 400 · 9pt · #F8F5F0             │   │
│  │  Marcenaria SAW Móveis · Itapecerica da Serra  │   │
│  └────────────────────────────────────────────────┘   │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Especificações técnicas da capa (jsPDF)

```javascript
// A4 em pontos: 595 x 842 pt
const pageW = doc.internal.pageSize.getWidth();  // 595
const pageH = doc.internal.pageSize.getHeight(); // 842

// 1. Foto sangrada (página inteira)
// Carregar _SAG6701.jpg como base64 antes de usar
const fotoBase64 = /* carregar _SAG6701.jpg em base64 */;
doc.addImage(fotoBase64, 'JPEG', 0, 0, pageW, pageH);

// 2. Overlay betume 50%
doc.setFillColor(26, 25, 24);   // #1A1918
doc.setGState(doc.GState({ opacity: 0.50 }));
doc.rect(0, 0, pageW, pageH, 'F');
doc.setGState(doc.GState({ opacity: 1.0 })); // restaurar

// 3. Logo topo esquerdo
const logoBase64 = /* ler logo-saw-base64.txt */;
doc.addImage(logoBase64, 'PNG', 40, 40, 100, 28);

// 4. Bloco centro
const centerY = pageH * 0.44;  // posição vertical centro visual (levemente acima do meio geométrico)

doc.setFont('PlayfairDisplay', 'normal');  // usar italic via setFontStyle se disponível
doc.setFontSize(11);
doc.setTextColor(154, 149, 144);  // #9A9590
doc.text('Preparado exclusivamente para', pageW / 2, centerY - 60, { align: 'center' });

doc.setFont('PlayfairDisplay', 'bold');
doc.setFontSize(28);
doc.setTextColor(248, 245, 240);  // #F8F5F0
doc.text('Pré-Briefing', pageW / 2, centerY - 26, { align: 'center' });

doc.setFont('PlayfairDisplay', 'normal');
doc.setFontSize(18);
doc.text('personalizado', pageW / 2, centerY + 4, { align: 'center' });

// Linha laranja
doc.setDrawColor(232, 92, 26);  // #E85C1A
doc.setLineWidth(1);
doc.line(pageW / 2 - 20, centerY + 20, pageW / 2 + 20, centerY + 20);

// Nome do cliente (dinâmico)
doc.setFont('Inter', 'bold');
doc.setFontSize(16);
doc.setTextColor(248, 245, 240);
doc.text(nomeCliente || 'Cliente', pageW / 2, centerY + 46, { align: 'center' });

// Data
doc.setFont('Inter', 'normal');
doc.setFontSize(11);
doc.setTextColor(154, 149, 144);
doc.text(dataAtual, pageW / 2, centerY + 64, { align: 'center' });

// Rodapé
doc.setFont('Inter', 'normal');
doc.setFontSize(9);
doc.setTextColor(248, 245, 240);
doc.text('Marcenaria SAW Móveis · Itapecerica da Serra', pageW / 2, pageH - 36, { align: 'center' });
```

---

## 5. Estrutura das Páginas Técnicas (após a capa)

### Header fixo (páginas 2+)

```
┌────────────────────────────────────────────────────────┐
│ [#1A1918 — faixa 56pt altura]                         │
│  logo SAW branca 72px    |    Inter 9pt #9A9590:      │
│  (esq, margem 32pt)      | "Pré-Briefing · [Nome]"   │
└────────────────────────────────────────────────────────┘
```

### Bloco de Investimento (quando presente)

```
┌─────────────────────────────────────────────────────┐
│ ║ [borda esq 3px #E85C1A]                          │
│   background #F4EDE3                                │
│                                                     │
│   Inter Bold 11pt #1A1918: "INVESTIMENTO ESTIMADO"  │
│   Playfair Bold 22pt #1A1918: "R$ XX.XXX"           │
│   Inter Regular 10pt #3D3A37: "valor aproximado..." │
└─────────────────────────────────────────────────────┘
```

### Separadores de seção

```
Playfair Regular Italic 10pt #9A9590 UPPERCASE → label de seção
Linha 0.5pt #9A9590 de margem a margem
```

### Footer das páginas técnicas

```
┌────────────────────────────────────────────────────────┐
│ [#1A1918 — faixa 40pt]                               │
│  Inter 8pt #F8F5F0:                                  │
│  "Marcenaria SAW Móveis · Itapecerica da Serra"       │
│  esq   |   "sawmoveis.com.br"   centro   |  pg X dir │
└────────────────────────────────────────────────────────┘
```

---

## 6. Checklist Rafael — Implementação

- [ ] Ler `_samples/logo-saw-base64.txt` e injetar no header/capa
- [ ] Carregar `_SAG6701.jpg` como base64 para a capa (arquivo no Drive G:)
- [ ] Registrar fontes: `addFileToVFS` + `addFont` para PlayfairDisplay e Inter (TTFs na pasta `_samples/fonts/`)
- [ ] Paleta: NUNCA usar hex fora da tabela acima. Sem filtros CSS, sem sombra pesada
- [ ] Logo: NUNCA esticar, NUNCA recortar, NUNCA aplicar efeito
- [ ] Overlay capa: opacidade 50% betume — não mais, não menos
- [ ] Nome do cliente e data: DINÂMICOS via dados do formulário (não hardcode)
- [ ] Testar legibilidade: texto branco sobre overlay — Inter 11pt mínimo
- [ ] Testar print: PDF deve imprimir bem em papel A4 — evitar transparência excessiva
- [ ] Razão social rodapé: "Marcenaria SAW Móveis · Itapecerica da Serra" — não "SAW Móveis e Decorações"

---

## 7. Assets entregues — Inventário completo

```
agente landpage/_samples/
├── logo-saw-base64.txt          ← base64 do logo branco (pronto pra jsPDF)
├── PDF-DIRECAO-ARTE.md          ← este documento
└── fonts/
    ├── PlayfairDisplay-Variable.ttf   ← 293KB — variable font (400-900)
    ├── PlayfairDisplay-Bold.ttf       ← 293KB — cópia da variable
    ├── PlayfairDisplay-Regular.woff2  ← 21KB — 400 normal
    ├── PlayfairDisplay-Bold.woff2     ← 22KB — 700 bold
    ├── PlayfairDisplay-Italic.woff2   ← 21KB — 400 italic
    ├── Inter-Regular.ttf              ← 397KB — 400 normal ✓ PREFERIR ESTE
    ├── Inter-Bold.ttf                 ← 405KB — 700 bold   ✓ PREFERIR ESTE
    ├── Inter-Italic.ttf               ← 403KB — 400 italic
    └── InterVariable.ttf              ← 842KB — variable completo
```

**Foto da capa** (no Drive — Rafael não precisa subir, só referenciar):
```
G:\Meu Drive\REDE SAW MOVEIS\015 - Catalogo\016 - Fotos\fotos\Fotos atualizadas\_SAG6701.jpg
```

---

*Direção de Arte: Bárbara · Brand kit [Brand kit] · Foto [Acervo SAW Drive] · Fontes [Google Fonts Open Source]*  
*Próximo passo: Rafael implementa via jsPDF · Marina valida copy das páginas técnicas*
