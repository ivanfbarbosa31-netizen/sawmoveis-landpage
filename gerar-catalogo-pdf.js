/**
 * Gera o catálogo PDF da SAW Móveis
 * Uso: NODE_PATH=$(npm root -g) node gerar-catalogo-pdf.js
 * Saída: catalogo-saw-moveis.pdf na mesma pasta
 */
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const ORANGE = '#E85C1A';
const ORANGE_2 = '#F46E2A';
const DARK = '#111113';
const DARK_2 = '#1A1A1C';
const GRAY = '#888888';
const WHITE = '#F4F4F4';
const TODAY = '2026-05-11';

const FOTOS = path.join(__dirname, 'fotos');
const ASSETS = path.join(__dirname, 'assets');

const doc = new PDFDocument({
  size: 'A4', // 595 × 842 pts
  margins: { top: 50, bottom: 50, left: 50, right: 50 },
  bufferPages: true,
  info: {
    Title: 'Catálogo SAW Móveis - 30 Projetos',
    Author: 'SAW Móveis',
    Subject: 'Móveis planejados sob medida em SP',
    Keywords: 'moveis planejados, sob medida, sao paulo, itapecerica',
  },
});

const out = fs.createWriteStream(path.join(__dirname, 'catalogo-saw-moveis.pdf'));
doc.pipe(out);

const PW = doc.page.width;
const PH = doc.page.height;
const M = 50;
const CW = PW - M * 2;

/* ───── Helpers ───── */
function fillBg(color) {
  doc.save().rect(0, 0, PW, PH).fill(color).restore();
}
function pageHeader(title) {
  doc.fillColor(ORANGE).fontSize(10).font('Helvetica-Bold')
    .text('SAW MÓVEIS · CATÁLOGO 2026', M, 24, { width: CW });
  doc.fillColor(GRAY).font('Helvetica').fontSize(9)
    .text(title, M, 24, { width: CW, align: 'right' });
}
function pageFooter(num, total) {
  doc.fillColor(GRAY).font('Helvetica').fontSize(8)
    .text(`sawmoveis.com.br  ·  (11) 3495-9479  ·  ${num} de ${total}`,
      M, PH - 30, { width: CW, align: 'center' });
}
function img(p, x, y, w, h) {
  try {
    if (fs.existsSync(p)) doc.image(p, x, y, { width: w, height: h, fit: [w, h], align: 'center', valign: 'center' });
    else { doc.save().rect(x, y, w, h).fill('#2A2A2C').restore(); }
  } catch (e) {
    doc.save().rect(x, y, w, h).fill('#2A2A2C').restore();
  }
}

/* ═══════════ CAPA ═══════════ */
fillBg(DARK);
doc.save()
  .moveTo(0, 0).lineTo(PW, 0).lineTo(PW, 250).lineTo(0, 350).closePath()
  .fillOpacity(0.08).fill(ORANGE).restore();

doc.fillOpacity(1);

/* logo no topo se existir */
const logoPath = path.join(ASSETS, 'logo-principal.png');
if (fs.existsSync(logoPath)) {
  doc.image(logoPath, M, 60, { width: 140 });
}

/* selo 350+ */
doc.save()
  .roundedRect(PW - M - 130, 60, 130, 32, 16)
  .fill(ORANGE).restore();
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(10)
  .text('+350 OBRAS · 5.0 ★', PW - M - 130, 71, { width: 130, align: 'center' });

/* título */
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(48)
  .text('CATÁLOGO', M, 280);
doc.fillColor(ORANGE_2).font('Helvetica-Bold').fontSize(48)
  .text('SAW MÓVEIS', M, 320);
doc.fillColor(GRAY).font('Helvetica').fontSize(14)
  .text('30 projetos reais entregues em São Paulo', M, 380);

/* destaque */
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(18)
  .text('Móveis planejados sob medida', M, 440);
doc.text('Cozinhas · Dormitórios · Closets · Salas · Áreas de Lazer', M, 470);
doc.fillColor(GRAY).font('Helvetica').fontSize(12)
  .text('Atendemos toda a Grande São Paulo · Itapecerica da Serra/SP', M, 500);

/* stats no rodapé da capa */
const stY = 600;
const cols = [
  ['11', 'anos de mercado'],
  ['350+', 'obras entregues'],
  ['5.0★', 'no Google'],
  ['45d', 'prazo médio'],
];
const colW = CW / cols.length;
cols.forEach((c, i) => {
  doc.fillColor(ORANGE_2).font('Helvetica-Bold').fontSize(28)
    .text(c[0], M + i * colW, stY, { width: colW, align: 'center' });
  doc.fillColor(GRAY).font('Helvetica').fontSize(10)
    .text(c[1], M + i * colW, stY + 38, { width: colW, align: 'center' });
});

/* CTA capa */
doc.save()
  .roundedRect(M, PH - 130, CW, 50, 8)
  .fill(ORANGE).restore();
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(14)
  .text('Solicite seu projeto 3D gratuito  →  sawmoveis.com.br', M, PH - 115,
    { width: CW, align: 'center' });

/* ═══════════ ABERTURA ═══════════ */
doc.addPage();
fillBg(DARK_2);
pageHeader('Bem-vindo');

doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(28)
  .text('Quem é a SAW Móveis', M, 100);
doc.fillColor(ORANGE_2).font('Helvetica').fontSize(13)
  .text('"Produtividade de fábrica com essência artesanal"', M, 140);

doc.fillColor(WHITE).font('Helvetica').fontSize(11.5)
  .text('Somos uma marcenaria especializada em móveis planejados, com fábrica própria de 570m² em Itapecerica da Serra/SP. Há 11 anos no mercado, já entregamos mais de 350 obras em toda a Grande São Paulo — entre residências, escritórios, hospitais, laboratórios e apartamentos decorados de grandes construtoras.',
    M, 180, { width: CW, align: 'justify', lineGap: 4 });

doc.text('Trabalhamos com equipe 100% própria — nossos arquitetos, marceneiros, instaladores e atendentes não são terceirizados. Isso significa controle total da qualidade, do primeiro contato à instalação final.',
  M, 280, { width: CW, align: 'justify', lineGap: 4 });

doc.text('Cada projeto começa com uma visita técnica gratuita e um modelo 3D realista que você aprova antes de qualquer corte. Acabamento impecável, prazo cumprido e 3 anos de garantia total — é assim que conquistamos a nota 5.0 no Google.',
  M, 380, { width: CW, align: 'justify', lineGap: 4 });

/* segmentos */
doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(14)
  .text('8 SEGMENTOS QUE ATENDEMOS', M, 510);

const segs = [
  '🏡 Residencial — cozinhas, dormitórios, closets, salas, áreas gourmet',
  '🏢 Corporativo — escritórios, salas de reunião, recepções',
  '🏥 Hospitalar — balcões, consultórios, áreas de espera (Case CYMS)',
  '🏗️ Apartamentos Decorados — MEGA, CP, Interlagos, Panamby',
  '🔬 Laboratórios — bancadas técnicas, armários especializados',
  '🎉 Áreas Comuns — salões de festa, áreas gourmet de condomínios',
  '🏷️ Stands de Vendas — lançamentos imobiliários',
  '✨ Projetos Especiais — soluções customizadas sob demanda',
];
doc.fillColor(WHITE).font('Helvetica').fontSize(10);
segs.forEach((s, i) => doc.text(s, M, 540 + i * 18, { width: CW }));

pageFooter(2, 12);

/* ═══════════ Páginas de portfólio (cozinhas, dormitórios, etc.) ═══════════ */
const sections = [
  {
    title: 'Cozinhas Planejadas',
    intro: 'O coração da casa. Cozinhas que combinam funcionalidade, beleza e o melhor aproveitamento de cada centímetro. De cozinhas compactas a gourmets com ilha.',
    fotos: ['gal-cozinha.jpg', 'gal-cozinha2.jpg', 'foto-prof-1.jpg', 'foto-prof-2.jpg'],
    preco: 'A partir de R$ 8.000',
  },
  {
    title: 'Dormitórios & Closets',
    intro: 'Quartos completos com guarda-roupa, criados-mudos e painel de TV. Closets sob medida com gavetas internas, espelhos e iluminação LED. Quartos infantis seguros e criativos.',
    fotos: ['Quarto Casal.jpg', 'Quarto Casal 01.jpg', 'gal-dormitorio.jpeg', 'gal-dormitorio-v2.jpg'],
    preco: 'A partir de R$ 6.000',
  },
  {
    title: 'Salas de Estar, TV e Jantar',
    intro: 'Salas integradas com painel de TV, rack, estantes laterais e buffets. Acabamentos laqueados ou madeirados premium. Iluminação destacada e organização inteligente.',
    fotos: ['Sala de Tv 01.jpg', 'Sala ok.jpg', 'sala-estar.jpg', 'gal-jantar.jpg'],
    preco: 'A partir de R$ 4.000',
  },
  {
    title: 'Adegas & Áreas de Lazer',
    intro: 'Adegas climatizadas, espaços gourmet e churrasqueiras com móveis funcionais. O ambiente que transforma momentos comuns em memórias.',
    fotos: ['Adega 01.jpg', 'gal-adega.jpg', 'Area de Lazer.jpg'],
    preco: 'A partir de R$ 7.000',
  },
  {
    title: 'Hospitalar & Laboratorial',
    intro: 'Mobiliário técnico para hospitais, clínicas e laboratórios. Materiais resistentes, fácil higienização e total atendimento às normas técnicas.',
    fotos: ['seg-hospitais.jpg', 'seg-laboratorio.jpg'],
    preco: 'Sob orçamento',
  },
  {
    title: 'Corporativo & Apartamentos',
    intro: 'Escritórios completos, salas de reunião e estações de trabalho. Apartamentos decorados para construtoras e lançamentos imobiliários.',
    fotos: ['seg-corporativo.jpg', 'seg-corporativo1.jpg', 'seg-apartamentos.jpg', 'seg-apartamentos1.jpg'],
    preco: 'Sob orçamento',
  },
];

let pageNum = 3;
sections.forEach((sec) => {
  /* página de capítulo */
  doc.addPage();
  fillBg(DARK);
  pageHeader(sec.title);

  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(11)
    .text('SEÇÃO ' + (pageNum - 2), M, 90);
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(34)
    .text(sec.title, M, 110);
  doc.fillColor(GRAY).font('Helvetica').fontSize(12)
    .text(sec.intro, M, 170, { width: CW, lineGap: 4 });

  /* faixa de preço */
  doc.save().roundedRect(M, 270, 200, 36, 18).fill(ORANGE).restore();
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(12)
    .text(sec.preco, M, 282, { width: 200, align: 'center' });

  /* Grid de até 4 fotos */
  const gridY = 350;
  const gridH = 360;
  const cellW = (CW - 16) / 2;
  const cellH = (gridH - 16) / 2;
  sec.fotos.slice(0, 4).forEach((file, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = M + col * (cellW + 16);
    const y = gridY + row * (cellH + 16);
    img(path.join(FOTOS, file), x, y, cellW, cellH);
  });

  pageFooter(pageNum, 12);
  pageNum++;
});

/* ═══════════ Página: Por que SAW ═══════════ */
doc.addPage();
fillBg(DARK_2);
pageHeader('5 razões pra escolher a SAW');

doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(28)
  .text('Por que escolher a SAW', M, 100);
doc.fillColor(GRAY).font('Helvetica').fontSize(12)
  .text('Critérios que os melhores clientes avaliam antes de contratar uma marcenaria.', M, 140, { width: CW });

const reasons = [
  ['01', 'Projeto 3D Gratuito', 'Arquiteta própria mede, projeta e apresenta o ambiente em 3D com Promob. Você aprova cada detalhe ANTES da produção começar. Quantas alterações forem necessárias.'],
  ['02', '3 Anos de Garantia Total', 'Cobertura em estrutura, ferragens e acabamento. Assistência técnica com equipe própria — sem burocracia, sem terceiros.'],
  ['03', 'Equipe 100% Própria', 'Não terceirizamos nenhuma etapa. Da fábrica à montagem, são os mesmos profissionais treinados pela SAW. Qualidade sob nosso controle.'],
  ['04', 'Entrega em 45 Dias', 'Prazo claro desde o contrato. Maquinário CNC e controle de qualidade pra cumprir cada data prometida. Flexibilidade para urgências.'],
  ['05', '350+ Obras · 5.0 ★ no Google', '11 anos de mercado, 20 avaliações 5 estrelas verificadas. Histórico real, não promessa. Cases reais (Cordicell, CYMS, MEGA, Panamby).'],
];

let yR = 200;
reasons.forEach((r) => {
  doc.save().roundedRect(M, yR, 50, 50, 8).fill(ORANGE).restore();
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(20)
    .text(r[0], M, yR + 14, { width: 50, align: 'center' });
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(14)
    .text(r[1], M + 65, yR + 5, { width: CW - 65 });
  doc.fillColor(GRAY).font('Helvetica').fontSize(10)
    .text(r[2], M + 65, yR + 25, { width: CW - 65, lineGap: 3 });
  yR += 80;
});

pageFooter(pageNum, 12);
pageNum++;

/* ═══════════ Página final: CTA ═══════════ */
doc.addPage();
fillBg(DARK);

/* gradient overlay */
doc.save()
  .moveTo(0, PH).lineTo(PW, PH).lineTo(PW, PH - 300).lineTo(0, PH - 200).closePath()
  .fillOpacity(0.12).fill(ORANGE).restore();
doc.fillOpacity(1);

doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(36)
  .text('Pronto pra começar', M, 200, { width: CW, align: 'center' });
doc.fillColor(ORANGE_2).font('Helvetica-Bold').fontSize(36)
  .text('o seu projeto?', M, 240, { width: CW, align: 'center' });

doc.fillColor(WHITE).font('Helvetica').fontSize(13)
  .text('Visita técnica gratuita · Projeto 3D incluso · Sem compromisso',
    M, 320, { width: CW, align: 'center' });

/* Card WhatsApp */
doc.save().roundedRect(M + 60, 400, CW - 120, 100, 16)
  .fill('#25d366').restore();
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(14)
  .text('FALE NO WHATSAPP', M + 60, 420, { width: CW - 120, align: 'center' });
doc.font('Helvetica-Bold').fontSize(28)
  .text('(11) 3495-9479', M + 60, 442, { width: CW - 120, align: 'center' });
doc.font('Helvetica').fontSize(11)
  .text('Resposta em até 2 horas em horário comercial',
    M + 60, 478, { width: CW - 120, align: 'center' });

/* ou online */
doc.fillColor(GRAY).font('Helvetica').fontSize(11)
  .text('— ou peça seu projeto 3D online —', M, 540, { width: CW, align: 'center' });

doc.save().roundedRect(M + 100, 570, CW - 200, 50, 25)
  .fill(ORANGE).restore();
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(13)
  .text('sawmoveis.com.br/#formulario', M + 100, 588, { width: CW - 200, align: 'center' });

/* contato detalhado */
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(11)
  .text('SAW MÓVEIS', M, 680, { align: 'center', width: CW });
doc.fillColor(GRAY).font('Helvetica').fontSize(10)
  .text('Rua Teixeira, 99 — Jardim Itapecerica · Itapecerica da Serra/SP', M, 700, { align: 'center', width: CW })
  .text('vendas02@sawmoveis.com.br · @marcenariasawmoveis', M, 715, { align: 'center', width: CW })
  .text('Atendemos toda a Grande São Paulo', M, 730, { align: 'center', width: CW });

/* timestamp */
doc.fillColor('#3A3A3A').font('Helvetica').fontSize(8)
  .text('Catálogo gerado em ' + TODAY + ' · v1.0', M, PH - 20, { align: 'center', width: CW });

doc.end();

out.on('finish', () => {
  const stat = fs.statSync(path.join(__dirname, 'catalogo-saw-moveis.pdf'));
  console.log('OK catalogo-saw-moveis.pdf gerado.');
  console.log('Tamanho:', (stat.size / 1024).toFixed(1), 'KB');
  console.log('Páginas: ~12');
});
