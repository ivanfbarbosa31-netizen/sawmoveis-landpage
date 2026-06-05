/**
 * Gerador standalone do PDF Pré-Briefing SAW
 * Replica exatamente o gerarPDF() do index.html via Node + jsPDF
 * Dados fictícios: Ivan Barbosa · Cozinha · 15-25 m² · Moderno
 */

import { jsPDF } from 'jspdf';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Dados de exemplo (os que Ivan pediu) ─────────────────────────────────
const s = {
  nome:    'Ivan Barbosa',
  tel:     '(11) 9 8765-4321',
  email:   'ivan.fbarbosa31@icloud.com',
  ambiente: 'cozinha',
  tamanho: '15-25',
  estilo:  'moderno',
};

// Tabela de labels (idêntica ao JS do site)
const tamanhos = {
  'ate-8':   'até 8 m²',
  '8-15':    '8 a 15 m²',
  '15-25':   '15 a 25 m²',
  '25-plus': '25 m² ou +',
};

const BUDGET = {
  'ate-8':   { moderno: [6,12],   classico: [8,15]   },
  '8-15':    { moderno: [12,22],  classico: [15,28]  },
  '15-25':   { moderno: [22,38],  classico: [28,48]  },
  '25-plus': { moderno: [38,80],  classico: [48,120] },
};

const ambientes   = Array.isArray(s.ambiente) ? s.ambiente.join(', ') : (s.ambiente || '—');
const tamanhoLabel = tamanhos[s.tamanho] || s.tamanho || '—';
const estiloLabel  = (s.estilo === 'moderno')
  ? 'Moderno'
  : (s.estilo === 'classico' ? 'Clássico / Sofisticado' : s.estilo || '—');

const range = (BUDGET[s.tamanho] && BUDGET[s.tamanho][s.estilo]) || [10, 30];
const min   = range[0].toLocaleString('pt-BR');
const max   = range[1].toLocaleString('pt-BR');

// Data em pt-BR
const now = new Date(2026, 5, 5); // 05/06/2026
const dataAtual = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

// ─── Gera o PDF ────────────────────────────────────────────────────────────
const doc  = new jsPDF({ unit: 'pt', format: 'a4' });
const W    = doc.internal.pageSize.getWidth();
const H    = doc.internal.pageSize.getHeight();

// Paleta SAW
const orange      = [232, 92, 26];
const orangeLight = [255, 123, 59];
const dark        = [17, 17, 19];
const text        = [50, 50, 55];
const muted       = [120, 120, 125];

// ═══ FUNDO ESCURO TOPO ═══
doc.setFillColor(...dark);
doc.rect(0, 0, W, 130, 'F');
// Faixa laranja
doc.setFillColor(...orange);
doc.rect(0, 125, W, 6, 'F');

// Logo SAW (texto)
doc.setFont('helvetica', 'bold');
doc.setTextColor(255, 255, 255);
doc.setFontSize(28);
doc.text('SAW', 40, 60);
doc.setTextColor(...orange);
doc.text('MÓVEIS', 100, 60);

doc.setFont('helvetica', 'normal');
doc.setTextColor(200, 200, 200);
doc.setFontSize(9);
doc.text('Móveis Planejados sob Medida · 11 anos · +350 obras entregues', 40, 80);

doc.setFontSize(8);
doc.setTextColor(150, 150, 150);
doc.text(`Documento gerado em ${dataAtual}`, W - 40, 80, { align: 'right' });

// ═══ TÍTULO ═══
doc.setTextColor(...dark);
doc.setFont('helvetica', 'bold');
doc.setFontSize(22);
doc.text('Pré-Briefing Personalizado', 40, 175);

doc.setFont('helvetica', 'normal');
doc.setFontSize(11);
doc.setTextColor(...muted);
doc.text(`Preparado para ${s.nome || 'você'}`, 40, 195);

// ═══ DADOS DO CLIENTE ═══
let y = 230;
doc.setFontSize(10);
doc.setFont('helvetica', 'bold');
doc.setTextColor(...orange);
doc.text('CLIENTE', 40, y);
doc.setDrawColor(...orange);
doc.setLineWidth(1);
doc.line(40, y + 4, 110, y + 4);
y += 22;

doc.setFont('helvetica', 'normal');
doc.setFontSize(11);
doc.setTextColor(...text);
doc.text(`Nome:  ${s.nome || '—'}`, 40, y); y += 18;
doc.text(`WhatsApp:  ${s.tel || '—'}`, 40, y); y += 18;
if (s.email) { doc.text(`E-mail:  ${s.email}`, 40, y); y += 18; }
y += 10;

// ═══ PROJETO ═══
doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(...orange);
doc.text('SEU PROJETO', 40, y);
doc.line(40, y + 4, 150, y + 4);
y += 22;

doc.setFont('helvetica', 'normal');
doc.setFontSize(11);
doc.setTextColor(...text);
doc.text(`Ambiente:  ${ambientes.charAt(0).toUpperCase() + ambientes.slice(1)}`, 40, y); y += 18;
doc.text(`Tamanho:  ${tamanhoLabel}`, 40, y); y += 18;
doc.text(`Estilo:  ${estiloLabel}`, 40, y); y += 28;

// ═══ INVESTIMENTO (destaque) ═══
doc.setFillColor(252, 245, 240);
doc.roundedRect(40, y, W - 80, 80, 6, 6, 'F');
doc.setDrawColor(...orange);
doc.setLineWidth(0.5);
doc.roundedRect(40, y, W - 80, 80, 6, 6, 'S');

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...orange);
doc.text('REFERÊNCIA DE INVESTIMENTO', 56, y + 22);

doc.setFont('helvetica', 'bold');
doc.setFontSize(22);
doc.setTextColor(...dark);
doc.text(`R$ ${min} mil  –  R$ ${max} mil`, 56, y + 50);

doc.setFont('helvetica', 'italic');
doc.setFontSize(9);
doc.setTextColor(...muted);
doc.text('Baseado em projetos similares já entregues pela SAW. Orçamento exato após visita técnica.', 56, y + 70);
y += 105;

// ═══ CHECKLIST ═══
doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(...orange);
doc.text('CHECKLIST PARA SUA VISITA TÉCNICA', 40, y);
doc.line(40, y + 4, 230, y + 4);
y += 22;

const items = [
  'Medidas aproximadas do ambiente (largura × profundidade × pé direito)',
  'Fotos do espaço atual em diferentes ângulos',
  'Localização de tomadas, janelas, portas e pontos de iluminação',
  'Lista de funcionalidades essenciais (ex: 4 panelas + air fryer)',
  'Faixa de investimento aprovada — otimiza materiais sem retrabalho'
];
doc.setFont('helvetica', 'normal');
doc.setFontSize(10);
doc.setTextColor(...text);
items.forEach(item => {
  doc.setTextColor(...orange);
  doc.text('[  ]', 40, y);
  doc.setTextColor(...text);
  const linhas = doc.splitTextToSize(item, W - 90);
  doc.text(linhas, 62, y);
  y += linhas.length * 14 + 4;
});
y += 10;

// ═══ FOOTER (rodapé escuro) ═══
const footerY = H - 90;
doc.setFillColor(...dark);
doc.rect(0, footerY, W, 90, 'F');
doc.setFillColor(...orange);
doc.rect(0, footerY, W, 4, 'F');

doc.setTextColor(255, 255, 255);
doc.setFont('helvetica', 'bold');
doc.setFontSize(12);
doc.text('Quando estiver pronto:', 40, footerY + 28);

doc.setFont('helvetica', 'normal');
doc.setFontSize(11);
doc.setTextColor(...orangeLight);
doc.text('WhatsApp:', 40, footerY + 48);
doc.setTextColor(255, 255, 255);
doc.text(' (11) 3495-9479', 100, footerY + 48);

doc.setTextColor(...orangeLight);
doc.text('Endereço:', 40, footerY + 64);
doc.setTextColor(255, 255, 255);
doc.text(' Rua Taquaral, Sala 10 — Itapecerica da Serra/SP', 100, footerY + 64);

doc.setFontSize(8);
doc.setTextColor(150, 150, 150);
doc.text('11 anos · +350 obras · 45 dias entrega · 3 anos garantia', W / 2, footerY + 82, { align: 'center' });

// ─── Salva ─────────────────────────────────────────────────────────────────
const outPath = resolve(__dirname, 'Pre-Briefing-Sample-Ivan.pdf');
const pdfData  = doc.output('arraybuffer');
writeFileSync(outPath, Buffer.from(pdfData));
console.log('PDF salvo em:', outPath);
