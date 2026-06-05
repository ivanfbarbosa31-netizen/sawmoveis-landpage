/**
 * Gerador standalone do PDF Pré-Briefing SAW — v2 PREMIUM
 * Implementa TUDO: Bárbara (arte) + Marina (copy)
 *
 * Executa: node --experimental-vm-modules _samples/gerar-sample-v2.mjs
 * Saída:   _samples/Pre-Briefing-Sample-Ivan-v2.pdf
 */

import { jsPDF } from 'jspdf';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const samplesDir = __dirname;

// ─── Assets ─────────────────────────────────────────────────────────────────
const logoBase64   = readFileSync(resolve(samplesDir, 'logo-saw-base64.txt'), 'utf-8').trim();
const capaBase64   = readFileSync(resolve(samplesDir, 'capa-SAG6701-base64.txt'), 'utf-8').trim();

// Fontes (TTF → base64)
const interRegB64  = readFileSync(resolve(samplesDir, 'fonts/Inter-Regular.ttf')).toString('base64');
const interBoldB64 = readFileSync(resolve(samplesDir, 'fonts/Inter-Bold.ttf')).toString('base64');
const interItaB64  = readFileSync(resolve(samplesDir, 'fonts/Inter-Italic.ttf')).toString('base64');
const playfairB64  = readFileSync(resolve(samplesDir, 'fonts/PlayfairDisplay-Variable.ttf')).toString('base64');

// ─── Dados de exemplo (Ivan Barbosa, Cozinha, 15-25 m², Moderno) ────────────
const s = {
  nome:    'Ivan Barbosa',
  tel:     '(11) 9 8765-4321',
  email:   'ivan.fbarbosa31@icloud.com',
  ambiente: 'cozinha',
  tamanho: '15-25',
  estilo:  'moderno',
};

const tamanhos = {
  'ate-8':   'até 8 m²',
  '8-15':    '8 a 15 m²',
  '15-25':   '15 a 25 m²',
  '25-plus': '25 m² ou +',
};
const BUDGET = {
  'ate-8':   { moderno: [6, 12],   classico: [8, 15]   },
  '8-15':    { moderno: [12, 22],  classico: [15, 28]  },
  '15-25':   { moderno: [22, 38],  classico: [28, 48]  },
  '25-plus': { moderno: [38, 80],  classico: [48, 120] },
};

const ambientes     = Array.isArray(s.ambiente) ? s.ambiente.join(', ') : (s.ambiente || '—');
const ambienteLabel = ambientes.charAt(0).toUpperCase() + ambientes.slice(1);
const tamanhoLabel  = tamanhos[s.tamanho] || s.tamanho || '—';
const estiloLabel   = s.estilo === 'moderno' ? 'Moderno'
                    : s.estilo === 'classico' ? 'Clássico / Sofisticado'
                    : (s.estilo || '—');

const range = (BUDGET[s.tamanho] && BUDGET[s.tamanho][s.estilo]) || [10, 30];
const valMin = range[0];
const valMax = range[1];

// Data fixa do sample
const dataAtual = '05 de junho de 2026';

// ─── Paleta SAW (Brand Kit Bárbara) ─────────────────────────────────────────
const C = {
  betume:    [26, 25, 24],      // #1A1918
  offwhite:  [248, 245, 240],   // #F8F5F0
  orange:    [232, 92, 26],     // #E85C1A
  bege:      [244, 237, 227],   // #F4EDE3
  bodyBg:    [255, 255, 255],   // #FFFFFF
  bodyText:  [61, 58, 55],      // #3D3A37
  separator: [154, 149, 144],   // #9A9590
};

// ─── Documento ─────────────────────────────────────────────────────────────
const doc = new jsPDF({ unit: 'pt', format: 'a4' });
const W   = doc.internal.pageSize.getWidth();   // 595
const H   = doc.internal.pageSize.getHeight();  // 842

// ─── Registrar fontes ─────────────────────────────────────────────────────
doc.addFileToVFS('Inter-Regular.ttf', interRegB64);
doc.addFont('Inter-Regular.ttf', 'Inter', 'normal');

doc.addFileToVFS('Inter-Bold.ttf', interBoldB64);
doc.addFont('Inter-Bold.ttf', 'Inter', 'bold');

doc.addFileToVFS('Inter-Italic.ttf', interItaB64);
doc.addFont('Inter-Italic.ttf', 'Inter', 'italic');

doc.addFileToVFS('PlayfairDisplay.ttf', playfairB64);
doc.addFont('PlayfairDisplay.ttf', 'PlayfairDisplay', 'normal');
doc.addFont('PlayfairDisplay.ttf', 'PlayfairDisplay', 'bold');

// ════════════════════════════════════════════════════════
//  PÁGINA 1 — CAPA PREMIUM
// ════════════════════════════════════════════════════════

// 1. Foto sangrada na página inteira
doc.addImage(capaBase64, 'JPEG', 0, 0, W, H);

// 2. Overlay betume 50%
doc.setGState(doc.GState({ opacity: 0.50 }));
doc.setFillColor(...C.betume);
doc.rect(0, 0, W, H, 'F');
doc.setGState(doc.GState({ opacity: 1.0 }));

// 3. Logo SAW topo esquerdo
//    proporção ~3.52:1 → largura 100pt → altura ~28pt
doc.addImage(logoBase64, 'PNG', 40, 40, 100, 28);

// 4. Bloco central
const centerY = H * 0.44;  // levemente acima do meio geométrico

// "Preparado exclusivamente para"
doc.setFont('PlayfairDisplay', 'normal');
doc.setFontSize(11);
doc.setTextColor(...C.separator);
doc.text('Preparado exclusivamente para', W / 2, centerY - 60, { align: 'center' });

// "Pré-Briefing"
doc.setFont('PlayfairDisplay', 'bold');
doc.setFontSize(28);
doc.setTextColor(...C.offwhite);
doc.text('Pré-Briefing', W / 2, centerY - 26, { align: 'center' });

// "personalizado"
doc.setFont('PlayfairDisplay', 'normal');
doc.setFontSize(18);
doc.setTextColor(...C.offwhite);
doc.text('personalizado', W / 2, centerY + 4, { align: 'center' });

// Linha laranja decorativa
doc.setDrawColor(...C.orange);
doc.setLineWidth(1);
doc.line(W / 2 - 20, centerY + 20, W / 2 + 20, centerY + 20);

// Nome do cliente
doc.setFont('Inter', 'bold');
doc.setFontSize(16);
doc.setTextColor(...C.offwhite);
doc.text(s.nome || 'Cliente', W / 2, centerY + 46, { align: 'center' });

// Data
doc.setFont('Inter', 'normal');
doc.setFontSize(11);
doc.setTextColor(...C.separator);
doc.text(dataAtual, W / 2, centerY + 64, { align: 'center' });

// 5. Rodapé capa
doc.setFont('Inter', 'normal');
doc.setFontSize(9);
doc.setTextColor(...C.offwhite);
doc.text('Marcenaria SAW Móveis · Itapecerica da Serra', W / 2, H - 36, { align: 'center' });


// ════════════════════════════════════════════════════════
//  PÁGINA 2 — CONTEÚDO PREMIUM
// ════════════════════════════════════════════════════════
doc.addPage();
const MARGIN = 40;
const CONTENT_W = W - MARGIN * 2;

// ─── Helpers ────────────────────────────────────────────────────────────────
function drawHeader(nomeCliente) {
  // Faixa betume #1A1918 topo
  doc.setFillColor(...C.betume);
  doc.rect(0, 0, W, 56, 'F');

  // Logo no header
  doc.addImage(logoBase64, 'PNG', MARGIN, 14, 72, 20);

  // Subtítulo à direita
  doc.setFont('Inter', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...C.separator);
  doc.text(`Pré-Briefing · ${nomeCliente}`, W - MARGIN, 32, { align: 'right' });
}

function drawFooter(pageNum) {
  const fY = H - 40;
  doc.setFillColor(...C.betume);
  doc.rect(0, fY, W, 40, 'F');

  doc.setFont('Inter', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...C.offwhite);
  doc.text('Marcenaria SAW Móveis · Itapecerica da Serra', MARGIN, fY + 15);
  doc.text('sawmoveis.com.br', W / 2, fY + 15, { align: 'center' });
  doc.text(`${pageNum}`, W - MARGIN, fY + 15, { align: 'right' });

  // Linha LGPD disclaimer
  doc.setFontSize(7);
  doc.setTextColor(...C.separator);
  doc.text(
    'Seus dados são usados exclusivamente para elaboração do orçamento e contato sobre seu projeto. Não compartilhamos com terceiros.',
    W / 2, fY + 28, { align: 'center', maxWidth: CONTENT_W }
  );
}

function sectionLabel(label, yPos) {
  doc.setFont('Inter', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...C.separator);
  doc.text(label.toUpperCase(), MARGIN, yPos);
  doc.setDrawColor(...C.separator);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, yPos + 4, W - MARGIN, yPos + 4);
  return yPos + 20;
}

// ─── Desenha header e define y ───────────────────────────────────────────────
drawHeader(s.nome);
let y = 74;

// ─── BLOCO APRESENTAÇÃO ─────────────────────────────────────────────────────
y = sectionLabel('Apresentação', y);

const intro = [
  'Recebemos as informações do seu projeto.',
  'Este documento reúne uma referência de investimento baseada no ambiente, dimensão e estilo\nque você escolheu — projetada a partir de obras similares já entregues pela SAW.',
  'Nossa equipe entra em contato em até 2 horas úteis pelo WhatsApp informado para alinhar\nagenda e responder qualquer dúvida.',
];

doc.setFont('Inter', 'normal');
doc.setFontSize(11);
doc.setTextColor(...C.bodyText);
intro.forEach(para => {
  const linhas = doc.splitTextToSize(para, CONTENT_W);
  doc.text(linhas, MARGIN, y);
  y += linhas.length * 15 + 6;
});
y += 8;

// ─── BLOCO CLIENTE + PROJETO (duas colunas) ──────────────────────────────────
const colW = (CONTENT_W - 20) / 2;

// Coluna esquerda — CLIENTE
const colLX = MARGIN;
const colRX = MARGIN + colW + 20;
let yL = y;
let yR = y;

// Label CLIENTE
doc.setFont('Inter', 'bold');
doc.setFontSize(9);
doc.setTextColor(...C.orange);
doc.text('CLIENTE', colLX, yL);
doc.setDrawColor(...C.orange);
doc.setLineWidth(0.7);
doc.line(colLX, yL + 3, colLX + 50, yL + 3);
yL += 18;

const clienteRows = [
  ['Nome', s.nome || '—'],
  ['WhatsApp', s.tel || '—'],
  ['E-mail', s.email || '—'],
];
clienteRows.forEach(([lbl, val]) => {
  doc.setFont('Inter', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...C.bodyText);
  doc.text(lbl + ':', colLX, yL);
  doc.setFont('Inter', 'normal');
  doc.setFontSize(11);
  const linhas = doc.splitTextToSize(val, colW - 10);
  doc.text(linhas, colLX, yL + 13);
  yL += linhas.length * 14 + 12;
});

// Coluna direita — SEU PROJETO
doc.setFont('Inter', 'bold');
doc.setFontSize(9);
doc.setTextColor(...C.orange);
doc.text('SEU PROJETO', colRX, yR);
doc.setDrawColor(...C.orange);
doc.setLineWidth(0.7);
doc.line(colRX, yR + 3, colRX + 70, yR + 3);
yR += 18;

const projetoRows = [
  ['Ambiente', ambienteLabel],
  ['Dimensão aproximada', `${s.tamanho === 'ate-8' ? 'até 8' : s.tamanho === '25-plus' ? '25 m² ou +' : s.tamanho.replace('-', ' a ')} m²`],
  ['Estilo escolhido', estiloLabel],
];
projetoRows.forEach(([lbl, val]) => {
  doc.setFont('Inter', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...C.bodyText);
  doc.text(lbl + ':', colRX, yR);
  doc.setFont('Inter', 'normal');
  doc.setFontSize(11);
  const linhas = doc.splitTextToSize(val, colW - 10);
  doc.text(linhas, colRX, yR + 13);
  yR += linhas.length * 14 + 12;
});

y = Math.max(yL, yR) + 12;

// ─── BLOCO INVESTIMENTO (destaque com borda laranja) ─────────────────────────
const boxH = 86;
// Fundo bege mediterrâneo
doc.setFillColor(...C.bege);
doc.roundedRect(MARGIN, y, CONTENT_W, boxH, 5, 5, 'F');
// Borda esquerda laranja 3px
doc.setFillColor(...C.orange);
doc.rect(MARGIN, y, 3, boxH, 'F');

// Label
doc.setFont('Inter', 'bold');
doc.setFontSize(9);
doc.setTextColor(...C.orange);
doc.text('REFERÊNCIA DE INVESTIMENTO', MARGIN + 16, y + 20);

// Valor em Playfair
doc.setFont('PlayfairDisplay', 'bold');
doc.setFontSize(22);
doc.setTextColor(...C.betume);
doc.text(`R$ ${valMin} mil  –  R$ ${valMax} mil`, MARGIN + 16, y + 48);

// Microcopy
doc.setFont('Inter', 'italic');
doc.setFontSize(9);
doc.setTextColor(...C.bodyText);
doc.text(
  'Baseado em projetos similares já entregues pela SAW.\nO valor exato é definido após visita técnica e detalhamento de materiais.',
  MARGIN + 16, y + 65,
  { maxWidth: CONTENT_W - 24 }
);
y += boxH + 18;

// ─── BLOCO CHECKLIST ─────────────────────────────────────────────────────────
y = sectionLabel('Checklist para sua visita técnica', y);

const checkItems = [
  'Medidas aproximadas do ambiente (largura × profundidade × pé direito)',
  'Fotos do espaço atual em diferentes ângulos',
  'Localização de tomadas, janelas, portas e pontos de iluminação',
  'Lista de funcionalidades essenciais (ex: 4 panelas, air fryer, lava-louças)',
  'Referências visuais que você gosta — foto de revista, Pinterest, obra vista',
  'Faixa de investimento confirmada com quem decide — agiliza o processo',
];

doc.setFont('Inter', 'normal');
doc.setFontSize(10);
doc.setTextColor(...C.bodyText);
checkItems.forEach(item => {
  // Quadrado de checkbox
  doc.setDrawColor(...C.separator);
  doc.setLineWidth(0.5);
  doc.rect(MARGIN, y - 9, 10, 10);
  const linhas = doc.splitTextToSize(item, CONTENT_W - 20);
  doc.text(linhas, MARGIN + 16, y);
  y += linhas.length * 14 + 4;
});
y += 10;

// ─── BLOCO O QUE ACONTECE AGORA ─────────────────────────────────────────────
y = sectionLabel('O que acontece agora', y);

const steps = [
  'Em até 2 horas úteis, nossa equipe entra em contato pelo WhatsApp informado para confirmar interesse e alinhar agenda.',
  'Agendamos visita técnica gratuita — vemos o ambiente, tiramos as medidas e entendemos o que você precisa que o projeto resolva.',
  'Em até 5 dias úteis após a visita, você recebe orçamento detalhado com projeto 3D técnico. Incluso, sem custo adicional.',
  'Projeto aprovado: fabricamos em 45 dias na nossa fábrica própria em Itapecerica da Serra. Garantia de 3 anos em estrutura, ferragens e acabamento — escrita em contrato.',
];

doc.setFont('Inter', 'normal');
doc.setFontSize(10);
doc.setTextColor(...C.bodyText);
steps.forEach((step, i) => {
  // Número em laranja
  doc.setFont('Inter', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...C.orange);
  doc.text(`${i + 1}.`, MARGIN, y);
  // Texto do passo
  doc.setFont('Inter', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...C.bodyText);
  const linhas = doc.splitTextToSize(step, CONTENT_W - 20);
  doc.text(linhas, MARGIN + 16, y);
  y += linhas.length * 14 + 8;
});
y += 6;

// ─── RODAPÉ COMPLETO (página 2) ─────────────────────────────────────────────
// Footer betume com 3 linhas: legal + contato + credenciais
const fY = H - 80;
doc.setFillColor(...C.betume);
doc.rect(0, fY, W, 80, 'F');
// Linha laranja topo do footer
doc.setFillColor(...C.orange);
doc.rect(0, fY, W, 2, 'F');

doc.setFont('Inter', 'normal');
doc.setFontSize(8);
doc.setTextColor(...C.offwhite);
// Linha 1 — legal
doc.text(
  'Marcenaria SAW Móveis Ltda  ·  CNPJ 42.345.456/0001-33  ·  Rua Teixeira, 99  ·  Itapecerica da Serra/SP  ·  CEP 06853-460',
  W / 2, fY + 14, { align: 'center' }
);
// Linha 2 — contato
doc.text(
  'WhatsApp (11) 3495-9479  ·  sawmoveis.com.br',
  W / 2, fY + 28, { align: 'center' }
);
// Linha 3 — credenciais
doc.text(
  '11 anos no mercado  ·  +350 obras entregues  ·  45 dias de fabricação  ·  Ferragens FGV (Itália) e Häfele (Alemanha)  ·  MDF Eucatex',
  W / 2, fY + 42, { align: 'center' }
);
doc.text(
  '3 anos de garantia em estrutura, ferragens e acabamento',
  W / 2, fY + 56, { align: 'center' }
);

// LGPD no rodapé
doc.setFontSize(7);
doc.setTextColor(...C.separator);
doc.text(
  'Seus dados são usados exclusivamente para elaboração do orçamento e contato sobre seu projeto. Não compartilhamos com terceiros.  Política de Privacidade: sawmoveis.com.br/politica-de-privacidade',
  W / 2, fY + 70, { align: 'center', maxWidth: CONTENT_W }
);

// ─── Salva ──────────────────────────────────────────────────────────────────
const outPath = resolve(samplesDir, 'Pre-Briefing-Sample-Ivan-v2.pdf');
writeFileSync(outPath, Buffer.from(doc.output('arraybuffer')));
console.log('PDF v2 salvo em:', outPath);
