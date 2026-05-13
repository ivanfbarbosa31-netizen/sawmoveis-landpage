const PptxGenJS = require("C:/Users/ivan/AppData/Roaming/npm/node_modules/pptxgenjs");
const BASE = "C:/Users/ivan/Desktop/pasta claude/agente landpage/";

const pres = new PptxGenJS();
pres.layout = "LAYOUT_16x9";
pres.author = "SAW Móveis";
pres.title = "SAW Móveis — Apresentação Comercial 2026";

const DARK    = "111111";
const DARK2   = "1E1E1E";
const ORANGE  = "D95B00";
const ORANGE2 = "FF8C38";
const WHITE   = "FFFFFF";
const LIGHT   = "F6F6F6";
const CARD    = "F2F2F2";
const GRAY    = "888888";
const TEXT    = "1A1A1A";

const mkShadow = () => ({ type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.12 });

// ═══════════════════════════════════════════════════════════════
// SLIDE 1 — CAPA
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.addImage({ path: BASE + "fotos/hero-bg.jpg", x: 0, y: 0, w: 10, h: 5.625, sizing: { type: "cover", w: 10, h: 5.625 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: "000000", transparency: 38 } });

  // Logo
  s.addImage({ path: BASE + "assets/logo-principal.png", x: 0.55, y: 0.45, w: 2.6, h: 0.72 });

  // Tag
  s.addText("APRESENTAÇÃO COMERCIAL 2026", {
    x: 0.55, y: 1.42, w: 6, h: 0.32,
    fontSize: 9, color: ORANGE2, bold: true, charSpacing: 3.5, margin: 0
  });

  // Main headline
  s.addText([
    { text: "Móveis sob Medida\n", options: { fontSize: 50, bold: true } },
    { text: "entregues em 45 dias.", options: { fontSize: 50, bold: true, color: ORANGE2 } }
  ], {
    x: 0.55, y: 1.78, w: 8.5, h: 2.0,
    fontFace: "Georgia", color: WHITE, margin: 0
  });

  // Subtitle
  s.addText("Projeto 3D gratuito com arquiteta · Equipe 100% própria · 3 anos de garantia total\nAtendemos toda a Grande São Paulo · 5.0 ★ no Google · 350+ obras entregues", {
    x: 0.55, y: 3.78, w: 8, h: 0.7,
    fontSize: 12, color: "DDDDDD", margin: 0
  });

  // Stats bottom bar
  const stats = [
    { v: "11 anos", l: "de mercado" },
    { v: "350+", l: "obras entregues" },
    { v: "5.0 ★", l: "Google" },
    { v: "45 dias", l: "prazo médio" },
    { v: "R$ 8 mil+", l: "a partir de" }
  ];
  stats.forEach((st, i) => {
    const x = 0.4 + i * 1.84;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.65, w: 1.75, h: 0.82, fill: { color: "FFFFFF", transparency: 78 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.65, w: 1.75, h: 0.06, fill: { color: ORANGE } });
    s.addText(st.v, { x: x + 0.1, y: 4.72, w: 1.55, h: 0.35, fontSize: 15, color: WHITE, bold: true, margin: 0 });
    s.addText(st.l, { x: x + 0.1, y: 5.06, w: 1.55, h: 0.26, fontSize: 9, color: "BBBBBB", margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 2 — QUEM SOMOS
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  // Left dark panel
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 4.6, h: 5.625, fill: { color: DARK2 } });

  s.addText("QUEM SOMOS", {
    x: 0.45, y: 0.38, w: 3.7, h: 0.32,
    fontSize: 9, color: ORANGE2, bold: true, charSpacing: 3.5, margin: 0
  });

  s.addText("SAW Móveis\n— 11 anos\ntransformando\nespaços.", {
    x: 0.45, y: 0.76, w: 3.7, h: 2.2,
    fontSize: 26, color: WHITE, bold: true, fontFace: "Georgia", margin: 0
  });

  s.addText(
    "Somos uma fábrica de móveis planejados sob medida em Itapecerica da Serra, atendendo toda a Grande São Paulo desde 2015.\n\nCom equipe própria, fábrica de 570m², maquinário CNC e arquiteta dedicada, entregamos qualidade de alto padrão com prazo e garantia reais.",
    {
      x: 0.45, y: 3.05, w: 3.7, h: 1.8,
      fontSize: 11, color: "BBBBBB", margin: 0
    }
  );

  // Slogan bottom
  s.addShape(pres.shapes.RECTANGLE, { x: 0.45, y: 4.98, w: 2.4, h: 0.04, fill: { color: ORANGE } });
  s.addText('"Produtividade de fábrica com essência artesanal"', {
    x: 0.45, y: 5.1, w: 3.7, h: 0.36,
    fontSize: 10, color: "888888", italic: true, margin: 0
  });

  // Right: photo + stats
  s.addImage({
    path: BASE + "fotos/processo.jpg",
    x: 4.85, y: 0.2, w: 4.85, h: 2.45,
    sizing: { type: "cover", w: 4.85, h: 2.45 }
  });

  const nums = [
    { v: "11", u: "anos", d: "de mercado desde 2015" },
    { v: "350+", u: "obras", d: "projetos concluídos com excelência" },
    { v: "15", u: "profissionais", d: "equipe própria treinada" },
    { v: "570", u: "m² fábrica", d: "infraestrutura própria em Itapecerica" },
    { v: "45", u: "dias", d: "prazo médio de entrega e instalação" },
    { v: "3", u: "anos garantia", d: "estrutura, ferragens e acabamento" }
  ];
  nums.forEach((n, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 4.85 + col * 1.65, y = 2.82 + row * 1.36;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 1.55, h: 1.2, fill: { color: i % 2 === 0 ? LIGHT : CARD }, shadow: mkShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: 1.2, fill: { color: ORANGE } });
    s.addText(n.v, { x: x + 0.14, y: y + 0.08, w: 1.3, h: 0.44, fontSize: 26, color: ORANGE, bold: true, fontFace: "Georgia", margin: 0 });
    s.addText(n.u, { x: x + 0.14, y: y + 0.52, w: 1.3, h: 0.3, fontSize: 10, color: TEXT, bold: true, margin: 0 });
    s.addText(n.d, { x: x + 0.14, y: y + 0.82, w: 1.3, h: 0.32, fontSize: 8, color: GRAY, margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 3 — PORTFÓLIO
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: DARK };

  s.addText("PORTFÓLIO", {
    x: 0.5, y: 0.22, w: 9, h: 0.32,
    fontSize: 9, color: ORANGE2, bold: true, charSpacing: 3.5, margin: 0
  });
  s.addText("Projetos que transformam espaços em realidade", {
    x: 0.5, y: 0.56, w: 9, h: 0.7,
    fontSize: 28, color: WHITE, bold: true, fontFace: "Georgia", margin: 0
  });
  s.addText("+350 ambientes únicos criados para clientes em toda a Grande São Paulo", {
    x: 0.5, y: 1.26, w: 9, h: 0.32,
    fontSize: 11.5, color: "999999", margin: 0
  });

  // Photo mosaic
  const photos = [
    { path: "fotos/gal-cozinha2.jpg",      x: 0.35, y: 1.72, w: 3.2, h: 3.55, label: "Cozinha Planejada" },
    { path: "fotos/gal-dormitorio-v2.jpg",  x: 3.7,  y: 1.72, w: 2.8, h: 1.72, label: "Dormitório Completo" },
    { path: "fotos/sala-estar.jpg",          x: 3.7,  y: 3.55, w: 2.8, h: 1.72, label: "Sala de Estar" },
    { path: "fotos/quarto.jpg",              x: 6.65, y: 1.72, w: 3.0, h: 1.72, label: "Quarto Planejado" },
    { path: "fotos/foto-prof-1.jpg",         x: 6.65, y: 3.55, w: 3.0, h: 1.72, label: "Sala de Jantar" },
  ];
  photos.forEach(p => {
    s.addImage({ path: BASE + p.path, x: p.x, y: p.y, w: p.w, h: p.h, sizing: { type: "cover", w: p.w, h: p.h } });
    s.addShape(pres.shapes.RECTANGLE, { x: p.x, y: p.y + p.h - 0.42, w: p.w, h: 0.42, fill: { color: "000000", transparency: 30 } });
    s.addShape(pres.shapes.RECTANGLE, { x: p.x, y: p.y + p.h - 0.42, w: 0.06, h: 0.42, fill: { color: ORANGE } });
    s.addText(p.label, { x: p.x + 0.14, y: p.y + p.h - 0.36, w: p.w - 0.2, h: 0.3, fontSize: 10, color: WHITE, bold: true, margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 4 — SEGMENTOS
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };

  // Left dark panel
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 3.0, h: 5.625, fill: { color: DARK2 } });

  s.addText("SEGMENTOS\nDE\nATUAÇÃO", {
    x: 0.2, y: 0.65, w: 2.6, h: 1.9,
    fontSize: 26, color: WHITE, bold: true, fontFace: "Georgia", align: "center", margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.7, w: 1.4, h: 0.05, fill: { color: ORANGE } });
  s.addText("8 segmentos,\numa só excelência.", {
    x: 0.2, y: 2.85, w: 2.6, h: 0.65,
    fontSize: 13, color: "BBBBBB", align: "center", fontFace: "Georgia", margin: 0
  });
  s.addText("Da residência ao hospital — estrutura para qualquer projeto sob medida.", {
    x: 0.2, y: 3.65, w: 2.6, h: 0.8,
    fontSize: 10, color: "777777", align: "center", margin: 0
  });

  // Image at bottom of left panel
  s.addImage({
    path: BASE + "fotos/seg-residencial-v2.jpg",
    x: 0.2, y: 4.55, w: 2.6, h: 1.0,
    sizing: { type: "cover", w: 2.6, h: 1.0 }
  });

  // Right: 2-column grid
  const segs = [
    { name: "Residencial",          sub: "Cozinhas, dormitórios, closets, home offices, áreas gourmet e projetos completos" },
    { name: "Corporativo",          sub: "Escritórios, salas de reunião, recepções e estações de trabalho" },
    { name: "Hospitais e Clínicas", sub: "Balcões, consultórios, áreas de espera e mobiliário hospitalar especializado" },
    { name: "Apart. Decorados",     sub: "Ambientes integrados de alto padrão para construtoras e lançamentos" },
    { name: "Laboratórios",         sub: "Bancadas técnicas, armários especializados e mobiliário para equipamentos" },
    { name: "Áreas Comuns",         sub: "Salões de festas, áreas gourmet e espaços de convivência em condomínios" },
    { name: "Stands de Vendas",     sub: "Estandes impactantes para lançamentos imobiliários com design atrativo" },
    { name: "Projetos Especiais",   sub: "Soluções customizadas sob demanda: gôndolas, móveis exclusivos e projetos únicos" },
  ];
  segs.forEach((seg, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 3.2 + col * 3.35, y = 0.18 + row * 1.3;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.15, h: 1.18, fill: { color: WHITE }, shadow: mkShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: 1.18, fill: { color: ORANGE } });
    s.addText(`${String(i + 1).padStart(2, "0")}  ${seg.name}`, {
      x: x + 0.18, y: y + 0.14, w: 2.9, h: 0.38,
      fontSize: 12.5, color: TEXT, bold: true, margin: 0
    });
    s.addText(seg.sub, {
      x: x + 0.18, y: y + 0.54, w: 2.9, h: 0.56,
      fontSize: 9.5, color: GRAY, margin: 0
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 5 — PROCESSO
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.07, fill: { color: ORANGE } });

  s.addText("COMO FUNCIONA", {
    x: 0.5, y: 0.22, w: 9, h: 0.3,
    fontSize: 9, color: ORANGE, bold: true, charSpacing: 3.5, margin: 0
  });
  s.addText("Do primeiro contato à instalação finalizada", {
    x: 0.5, y: 0.55, w: 9, h: 0.65,
    fontSize: 26, color: TEXT, bold: true, fontFace: "Georgia", margin: 0
  });
  s.addText("Processo completo e transparente — você acompanha cada etapa.", {
    x: 0.5, y: 1.22, w: 9, h: 0.3,
    fontSize: 12, color: GRAY, margin: 0
  });

  // Connecting line behind circles
  s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y: 2.27, w: 8.0, h: 0.05, fill: { color: "E0E0E0" } });

  const steps = [
    { num: "01", title: "Atendimento\nComercial", desc: "Check-list personalizado. Proposta detalhada com prazos e condições claras." },
    { num: "02", title: "Projeto 3D\nProfissional", desc: "Arquiteta realiza medição técnica e desenvolve projeto executivo em 3D com Promob." },
    { num: "03", title: "Fabricação\ncom Precisão", desc: "CNC, esquadrejadeira e policorte automático. Controle de qualidade em cada etapa." },
    { num: "04", title: "Entrega e\nInstalação", desc: "Equipe própria: transporte seguro, montagem profissional e limpeza do local." },
    { num: "05", title: "Pós-Venda e\nGarantia", desc: "3 anos de garantia total. Suporte com revisão inclusa após a instalação." },
  ];
  steps.forEach((step, i) => {
    const cx = 0.98 + i * 2.02;
    const isHighlight = i === 2;

    // Circle
    s.addShape(pres.shapes.OVAL, {
      x: cx, y: 1.98, w: 0.6, h: 0.6,
      fill: { color: isHighlight ? ORANGE : DARK },
      shadow: isHighlight ? { type: "outer", color: ORANGE, blur: 8, offset: 0, angle: 135, opacity: 0.5 } : undefined
    });
    s.addText(step.num, {
      x: cx, y: 1.98, w: 0.6, h: 0.6,
      fontSize: 13, color: WHITE, bold: true, align: "center", valign: "middle", margin: 0
    });

    // Card below
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx - 0.5, y: 2.75, w: 1.6, h: 2.6,
      fill: { color: isHighlight ? ORANGE : LIGHT },
      shadow: mkShadow()
    });
    s.addText(step.title, {
      x: cx - 0.42, y: 2.85, w: 1.44, h: 0.6,
      fontSize: 11.5, color: isHighlight ? WHITE : TEXT, bold: true, align: "center", margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx - 0.1, y: 3.5, w: 0.8, h: 0.04,
      fill: { color: isHighlight ? "FFCCAA" : ORANGE }
    });
    s.addText(step.desc, {
      x: cx - 0.42, y: 3.64, w: 1.44, h: 1.52,
      fontSize: 9, color: isHighlight ? "FFE5CC" : GRAY, align: "center", margin: 0
    });
  });

  // Bottom note
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.35, w: 10, h: 0.275, fill: { color: DARK } });
  s.addText("⏱  Prazo médio de 45 dias · Da aprovação do projeto 3D à instalação finalizada — com flexibilidade para urgências.", {
    x: 0.5, y: 5.36, w: 9, h: 0.25,
    fontSize: 10, color: "CCCCCC", align: "center", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 6 — DIFERENCIAIS
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: DARK };

  s.addText("POR QUE ESCOLHER A SAW", {
    x: 0.5, y: 0.28, w: 9, h: 0.32,
    fontSize: 9, color: ORANGE2, bold: true, charSpacing: 3.5, margin: 0, align: "center"
  });
  s.addText("5 razões que nos diferenciam no mercado", {
    x: 0.5, y: 0.62, w: 9, h: 0.68,
    fontSize: 28, color: WHITE, bold: true, fontFace: "Georgia", align: "center", margin: 0
  });
  s.addText("Critérios que os melhores clientes avaliam antes de contratar uma marcenaria.", {
    x: 0.5, y: 1.3, w: 9, h: 0.3,
    fontSize: 12, color: "777777", align: "center", margin: 0
  });

  const difs = [
    { num: "01", title: "Projeto 3D Gratuito", desc: "Arquiteta própria mede, projeta e apresenta em 3D com Promob. Você aprova cada detalhe antes da produção iniciar." },
    { num: "02", title: "3 Anos de Garantia", desc: "Cobertura total: estrutura, ferragens e acabamento. Assistência com equipe própria — sem burocracia." },
    { num: "03", title: "Equipe 100% Própria", desc: "Não terceirizamos nenhuma etapa. Da fábrica à montagem, os mesmos profissionais treinados pela SAW." },
    { num: "04", title: "Entrega em 45 Dias", desc: "Prazo claro desde o contrato. Fabricação com CNC e controle de qualidade para cumprir cada data prometida." },
    { num: "05", title: "+350 Obras · 5.0 ★ Google", desc: "11 anos de mercado, 20 avaliações 5 estrelas verificadas. Histórico real, não promessa." },
  ];

  // First row: 3 cards
  for (let i = 0; i < 3; i++) {
    const x = 0.38 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.78, w: 2.9, h: 1.85, fill: { color: "1E1E1E" }, shadow: mkShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.78, w: 2.9, h: 0.07, fill: { color: ORANGE } });
    s.addText(difs[i].num, { x: x + 0.18, y: 1.9, w: 0.7, h: 0.44, fontSize: 22, color: ORANGE, bold: true, fontFace: "Georgia", margin: 0 });
    s.addText(difs[i].title, { x: x + 0.18, y: 2.36, w: 2.55, h: 0.44, fontSize: 12.5, color: WHITE, bold: true, margin: 0 });
    s.addText(difs[i].desc, { x: x + 0.18, y: 2.82, w: 2.55, h: 0.72, fontSize: 9.5, color: "888888", margin: 0 });
  }

  // Second row: 2 cards centered
  for (let i = 3; i < 5; i++) {
    const x = 1.4 + (i - 3) * 3.8;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 3.8, w: 3.3, h: 1.58, fill: { color: "1E1E1E" }, shadow: mkShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 3.8, w: 3.3, h: 0.07, fill: { color: ORANGE } });
    s.addText(difs[i].num, { x: x + 0.18, y: 3.92, w: 0.7, h: 0.4, fontSize: 22, color: ORANGE, bold: true, fontFace: "Georgia", margin: 0 });
    s.addText(difs[i].title, { x: x + 0.18, y: 4.34, w: 2.95, h: 0.36, fontSize: 13, color: WHITE, bold: true, margin: 0 });
    s.addText(difs[i].desc, { x: x + 0.18, y: 4.72, w: 2.95, h: 0.55, fontSize: 9.5, color: "888888", margin: 0 });
  }
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 7 — DEPOIMENTOS
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: "F4F2EF" };

  // Orange left panel
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 2.85, h: 5.625, fill: { color: ORANGE } });

  s.addText("★★★★★", { x: 0.15, y: 0.65, w: 2.55, h: 0.42, fontSize: 20, color: WHITE, align: "center", margin: 0 });
  s.addText("5.0", { x: 0.15, y: 1.08, w: 2.55, h: 1.1, fontSize: 72, color: WHITE, bold: true, fontFace: "Georgia", align: "center", margin: 0 });
  s.addText("no Google", { x: 0.15, y: 2.2, w: 2.55, h: 0.35, fontSize: 13, color: "FFE0C0", align: "center", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.85, y: 2.7, w: 1.15, h: 0.05, fill: { color: WHITE } });
  s.addText("20 avaliações\nverificadas", { x: 0.15, y: 2.85, w: 2.55, h: 0.5, fontSize: 11.5, color: "FFE0C0", align: "center", margin: 0 });
  s.addText("O que nossos\nclientes dizem\nsobre a SAW", { x: 0.15, y: 3.55, w: 2.55, h: 1.1, fontSize: 14, color: WHITE, bold: true, fontFace: "Georgia", align: "center", margin: 0 });
  s.addText("Depoimentos reais", { x: 0.15, y: 5.05, w: 2.55, h: 0.35, fontSize: 10, color: "FFE0C0", align: "center", italic: true, margin: 0 });

  const testimonials = [
    { ini: "AS", name: "Alexandra Silva Grassmann", q: '"Excelente empresa! Atendimento de qualidade, produtos de muita qualidade e prazo diferenciado!"' },
    { ini: "EM", name: "Eliade Matos", q: '"A SAW entregou tudo o que prometeu. Colaboradores zelosos e atenciosos do início ao fim. Muito satisfeito!"' },
    { ini: "KV", name: "Karla Vilantt · Local Guide", q: '"Nossos móveis ficaram lindos! Muito capricho e atenção aos detalhes. Ótimo atendimento! Indicamos para todos!"' },
    { ini: "MI", name: "Midori", q: '"Excelente equipe, caprichosos em cada detalhe, muito organizados e material de qualidade."' },
    { ini: "EG", name: "Ednilson Ganiko", q: '"Ótimo atendimento, preço justo e profissionais qualificados. Recomendo muito."' },
    { ini: "MS", name: "Marlene Sales de Oliveira", q: '"Material impecável. Qualidade e preços excelentes. Serviço superou as expectativas."' },
  ];
  testimonials.forEach((t, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 3.1 + col * 3.4, y = 0.2 + row * 1.76;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.2, h: 1.6, fill: { color: WHITE }, shadow: mkShadow() });
    s.addText("★★★★★", { x: x + 0.15, y: y + 0.12, w: 2.9, h: 0.28, fontSize: 11, color: ORANGE, margin: 0 });
    s.addText(t.q, { x: x + 0.15, y: y + 0.42, w: 2.9, h: 0.75, fontSize: 9.5, color: "444444", italic: true, margin: 0 });
    s.addShape(pres.shapes.OVAL, { x: x + 0.15, y: y + 1.22, w: 0.3, h: 0.3, fill: { color: ORANGE } });
    s.addText(t.ini, { x: x + 0.15, y: y + 1.22, w: 0.3, h: 0.3, fontSize: 8, color: WHITE, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(t.name, { x: x + 0.53, y: y + 1.28, w: 2.6, h: 0.26, fontSize: 9, color: TEXT, bold: true, margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 8 — CLIENTES & CASES
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.07, fill: { color: ORANGE } });
  s.addText("CASES & CLIENTES", {
    x: 0.5, y: 0.22, w: 9, h: 0.3,
    fontSize: 9, color: ORANGE, bold: true, charSpacing: 3.5, margin: 0
  });
  s.addText("Projetos realizados para grandes nomes do mercado", {
    x: 0.5, y: 0.56, w: 9, h: 0.62,
    fontSize: 24, color: TEXT, bold: true, fontFace: "Georgia", margin: 0
  });
  s.addText("Da residência ao hospital — experiência comprovada em múltiplos segmentos.", {
    x: 0.5, y: 1.2, w: 9, h: 0.3,
    fontSize: 12, color: GRAY, margin: 0
  });

  const clients = [
    { name: "Cordicell", seg: "Corporativo", desc: "Mobiliário completo para escritório corporativo.", img: "fotos/seg-corporativo.jpg" },
    { name: "CYMS — Hospital Alemão", seg: "Hospitalar", desc: "Mobiliário especializado para ambiente hospitalar.", img: "fotos/seg-hospitais.jpg" },
    { name: "G.R.F. Laboratórios LTDA", seg: "Laboratorial", desc: "Bancadas técnicas e armários especializados.", img: "fotos/seg-laboratorio.jpg" },
    { name: "MEGA · CP · Interlagos · Panamby", seg: "Apart. Decorados", desc: "Ambientes de alto padrão para construtoras.", img: "fotos/seg-apartamentos.jpg" },
    { name: "Stands em São Paulo", seg: "Stands de Vendas", desc: "Estandes impactantes para lançamentos imobiliários.", img: "fotos/lojas.jpg" },
    { name: "+350 famílias atendidas", seg: "Residencial", desc: "Projetos únicos para lares em toda a Grande SP.", img: "fotos/seg-residencial-v2.jpg" },
  ];
  clients.forEach((c, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.38 + col * 3.12, y = 1.65 + row * 1.95;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.9, h: 1.78, fill: { color: LIGHT }, shadow: mkShadow() });
    s.addImage({ path: BASE + c.img, x, y, w: 2.9, h: 0.88, sizing: { type: "cover", w: 2.9, h: 0.88 } });
    // Seg tag overlay
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.12, y: y + 0.62, w: 1.1, h: 0.24, fill: { color: ORANGE } });
    s.addText(c.seg, { x: x + 0.12, y: y + 0.62, w: 1.1, h: 0.24, fontSize: 8, color: WHITE, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(c.name, { x: x + 0.12, y: y + 0.97, w: 2.68, h: 0.44, fontSize: 11, color: TEXT, bold: true, margin: 0 });
    s.addText(c.desc, { x: x + 0.12, y: y + 1.42, w: 2.68, h: 0.28, fontSize: 9, color: GRAY, margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 9 — INVESTIMENTO
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  // Left dark panel
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 4.3, h: 5.625, fill: { color: DARK2 } });

  s.addText("INVESTIMENTO", {
    x: 0.4, y: 0.42, w: 3.5, h: 0.3,
    fontSize: 9, color: ORANGE2, bold: true, charSpacing: 3.5, margin: 0
  });
  s.addText("Qualidade\nplanejada para\nseu orçamento.", {
    x: 0.4, y: 0.82, w: 3.5, h: 1.5,
    fontSize: 25, color: WHITE, bold: true, fontFace: "Georgia", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 2.5, w: 2.5, h: 0.05, fill: { color: ORANGE } });

  s.addText("a partir de", {
    x: 0.4, y: 2.68, w: 3.5, h: 0.3,
    fontSize: 12, color: "AAAAAA", margin: 0
  });
  s.addText("R$ 8.000", {
    x: 0.4, y: 2.98, w: 3.5, h: 0.82,
    fontSize: 46, color: ORANGE, bold: true, fontFace: "Georgia", margin: 0
  });
  s.addText("Parcelamos em até 18x", {
    x: 0.4, y: 3.85, w: 3.5, h: 0.35,
    fontSize: 12.5, color: "DDDDDD", bold: true, margin: 0
  });
  s.addText("Orçamento 100% gratuito e personalizado.\nSem visita, não há como saber o preço real.", {
    x: 0.4, y: 4.3, w: 3.5, h: 0.65,
    fontSize: 10.5, color: "777777", margin: 0
  });
  s.addText("Resposta em até 2 horas", {
    x: 0.4, y: 5.1, w: 3.5, h: 0.3,
    fontSize: 10, color: ORANGE2, bold: true, margin: 0
  });

  // Right: included items
  s.addText("O que está incluído:", {
    x: 4.6, y: 0.32, w: 5.0, h: 0.38,
    fontSize: 14, color: TEXT, bold: true, margin: 0
  });

  const included = [
    "Visita técnica de medição gratuita",
    "Projeto 3D profissional com software Promob",
    "Fabricação com CNC — alta precisão e qualidade",
    "Transporte seguro até o local de instalação",
    "Instalação por equipe própria treinada pela SAW",
    "Limpeza completa pós-instalação",
    "3 anos de garantia total (estrutura + ferragens + acabamento)",
    "Revisão técnica pós-instalação inclusa",
  ];
  included.forEach((item, i) => {
    const y = 0.88 + i * 0.575;
    s.addShape(pres.shapes.RECTANGLE, { x: 4.55, y, w: 5.1, h: 0.52, fill: { color: i % 2 === 0 ? LIGHT : CARD } });
    s.addShape(pres.shapes.OVAL, { x: 4.7, y: y + 0.13, w: 0.26, h: 0.26, fill: { color: ORANGE } });
    s.addText("✓", { x: 4.7, y: y + 0.13, w: 0.26, h: 0.26, fontSize: 9, color: WHITE, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(item, { x: 5.08, y: y + 0.11, w: 4.45, h: 0.3, fontSize: 11, color: TEXT, margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 10 — CONTATO / CTA
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.addImage({ path: BASE + "fotos/hero-bg2.jpg", x: 0, y: 0, w: 10, h: 5.625, sizing: { type: "cover", w: 10, h: 5.625 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: "000000", transparency: 42 } });

  s.addImage({ path: BASE + "assets/logo-principal.png", x: 0.55, y: 0.38, w: 2.4, h: 0.67 });

  s.addText("Transforme seu projeto\nem realidade agora.", {
    x: 0.55, y: 1.2, w: 8.9, h: 1.45,
    fontSize: 42, color: WHITE, bold: true, fontFace: "Georgia", align: "center", margin: 0
  });
  s.addText("Entre em contato e receba atendimento personalizado — projeto 3D gratuito · da medição à instalação · sem compromisso.", {
    x: 0.55, y: 2.72, w: 8.9, h: 0.52,
    fontSize: 12.5, color: "DDDDDD", align: "center", margin: 0
  });

  const contacts = [
    { icon: "☎", label: "Telefone / WhatsApp", val: "(11) 3495-9479" },
    { icon: "✉", label: "E-mail", val: "atendimento@sawmoveis.com.br" },
    { icon: "📍", label: "Localização", val: "Rua Teixeira, 99 — Itapecerica da Serra/SP" },
    { icon: "🌐", label: "Site / Instagram", val: "sawmoveis.com.br\n@marcenariasawmoveis" },
  ];
  contacts.forEach((c, i) => {
    const x = 0.42 + i * 2.3;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 3.42, w: 2.15, h: 1.6, fill: { color: "FFFFFF", transparency: 80 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 3.42, w: 2.15, h: 0.06, fill: { color: ORANGE } });
    s.addText(c.icon, { x, y: 3.52, w: 2.15, h: 0.45, fontSize: 20, align: "center", margin: 0 });
    s.addText(c.label, { x: x + 0.1, y: 3.98, w: 1.95, h: 0.28, fontSize: 9, color: "BBBBBB", align: "center", margin: 0 });
    s.addText(c.val, { x: x + 0.1, y: 4.27, w: 1.95, h: 0.65, fontSize: 10, color: WHITE, bold: true, align: "center", margin: 0 });
  });

  s.addText('"Produtividade de fábrica com essência artesanal"', {
    x: 0.5, y: 5.23, w: 9, h: 0.28,
    fontSize: 11, color: ORANGE2, italic: true, align: "center", margin: 0
  });
}

// Save
pres.writeFile({ fileName: "C:/Users/ivan/Desktop/pasta claude/agente landpage/SAW Moveis - Apresentacao Comercial.pptx" })
  .then(() => console.log("✅ Apresentação criada: SAW Moveis - Apresentacao Comercial.pptx"))
  .catch(e => console.error("❌ Erro:", e));
