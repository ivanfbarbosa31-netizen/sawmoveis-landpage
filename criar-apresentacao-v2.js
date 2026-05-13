const PptxGenJS = require("C:/Users/ivan/AppData/Roaming/npm/node_modules/pptxgenjs");
const BASE = "C:/Users/ivan/Desktop/pasta claude/agente landpage/";

const pres = new PptxGenJS();
pres.layout = "LAYOUT_16x9";
pres.title = "SAW Móveis";

// ── Tokens ─────────────────────────────────────────
const D     = "0B0B0B";   // near-black
const NAV   = "111C2E";   // deep navy
const ORA   = "E8560A";   // hero orange
const ORA2  = "FF8040";   // light orange
const CREAM = "F4EEE6";   // warm cream
const WHITE = "FFFFFF";
const MUTED = "9A9A9A";
const TXT   = "1C1C1C";
const CARD  = "F0EAE2";

const W = 10, H = 5.625;
const mkS = () => ({ type: "outer", color: "000000", blur: 8, offset: 3, angle: 135, opacity: 0.15 });

// ═══════════════════════════════════════════════════════════════
// SLIDE 1 — CAPA SPLIT: esquerda escura + direita imagem
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();

  // Full background image
  s.addImage({ path: BASE + "fotos/gal-cozinha2.jpg", x: 0, y: 0, w: W, h: H, sizing: { type: "cover", w: W, h: H } });

  // Dark overlay on the entire slide
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: H, fill: { color: "000000", transparency: 35 } });

  // Dark panel left 55%
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 5.8, h: H, fill: { color: D, transparency: 10 } });

  // Orange brand stripe (left edge)
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.14, h: H, fill: { color: ORA } });

  // Logo
  s.addImage({ path: BASE + "assets/logo-principal.png", x: 0.38, y: 0.42, w: 2.4, h: 0.67 });

  // Overline
  s.addText("MÓVEIS PLANEJADOS SOB MEDIDA", {
    x: 0.38, y: 1.28, w: 5, h: 0.28,
    fontSize: 8.5, color: ORA2, bold: true, charSpacing: 4, margin: 0
  });

  // Main headline — big, confident
  s.addText("Seu espaço.\nNossa\nassinatura.", {
    x: 0.38, y: 1.6, w: 5.2, h: 2.55,
    fontSize: 54, color: WHITE, bold: true, fontFace: "Georgia", margin: 0
  });

  // Orange sub-line
  s.addShape(pres.shapes.RECTANGLE, { x: 0.38, y: 4.28, w: 2.6, h: 0.05, fill: { color: ORA } });

  // Promise text
  s.addText("Projeto 3D gratuito · Equipe própria · 3 anos de garantia · 45 dias.", {
    x: 0.38, y: 4.42, w: 5.2, h: 0.35,
    fontSize: 11, color: "CCCCCC", margin: 0
  });

  // Bottom-right badge
  s.addShape(pres.shapes.RECTANGLE, { x: 6.5, y: 4.7, w: 3.1, h: 0.72, fill: { color: ORA } });
  s.addText("★★★★★  5.0 Google · 350+ obras · 11 anos", {
    x: 6.5, y: 4.7, w: 3.1, h: 0.72,
    fontSize: 11.5, color: WHITE, bold: true, align: "center", valign: "middle", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 2 — "TODO MUNDO PROMETE. A SAW ENTREGA."
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: NAV };

  // Giant quote
  s.addText('"Todo mundo\npromete.\nA SAW entrega."', {
    x: 0.6, y: 0.45, w: 5.8, h: 3.6,
    fontSize: 46, color: WHITE, bold: true, fontFace: "Georgia", margin: 0
  });

  // Orange underline
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4.15, w: 3.2, h: 0.07, fill: { color: ORA } });

  // Three micro-promises below
  const promises = [
    { icon: "⏱", text: "45 dias de prazo real, no contrato" },
    { icon: "🛡", text: "3 anos de garantia total, sem burocracia" },
    { icon: "👥", text: "Equipe 100% própria — sem terceiros" },
  ];
  promises.forEach((p, i) => {
    s.addText(`${p.icon}  ${p.text}`, {
      x: 0.6, y: 4.32 + i * 0.38,
      w: 5.5, h: 0.35,
      fontSize: 12.5, color: "BBBBBB", margin: 0
    });
  });

  // Right image strip
  s.addImage({ path: BASE + "fotos/quarto.jpg", x: 6.6, y: 0, w: 3.4, h: H, sizing: { type: "cover", w: 3.4, h: H } });

  // Overlay on the image
  s.addShape(pres.shapes.RECTANGLE, { x: 6.6, y: 0, w: 3.4, h: H, fill: { color: "000000", transparency: 50 } });

  // Side label on image
  s.addText("Projeto real\nSAW Móveis", {
    x: 6.75, y: H - 0.85, w: 3.1, h: 0.7,
    fontSize: 10, color: "BBBBBB", align: "center", italic: true, margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 3 — "350+" IMPACT SLIDE (um número, uma mensagem)
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: D };

  // Texture: subtle horizontal lines
  for (let i = 0; i < 10; i++) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: i * 0.6, w: W, h: 0.01,
      fill: { color: WHITE, transparency: 95 }
    });
  }

  // Giant "350" number
  s.addText("350", {
    x: 0.5, y: 0.35, w: 7, h: 3.8,
    fontSize: 220, color: ORA, bold: true, fontFace: "Georgia", margin: 0
  });

  // "+" small, top right of number
  s.addText("+", {
    x: 7.1, y: 0.35, w: 1.5, h: 1.5,
    fontSize: 80, color: ORA2, bold: true, fontFace: "Georgia", margin: 0
  });

  // Label
  s.addText("projetos entregues com excelência em toda a Grande São Paulo", {
    x: 0.5, y: 4.35, w: 6.5, h: 0.5,
    fontSize: 16, color: "AAAAAA", margin: 0
  });

  // Right side: 3 small supporting stats
  const mini = [
    { n: "11", l: "anos de mercado" },
    { n: "5.0★", l: "no Google" },
    { n: "45d", l: "prazo médio" },
  ];
  mini.forEach((m, i) => {
    const y = 1.2 + i * 1.35;
    s.addShape(pres.shapes.RECTANGLE, { x: 8.5, y, w: 1.25, h: 1.15, fill: { color: "191919" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 8.5, y, w: 1.25, h: 0.06, fill: { color: ORA } });
    s.addText(m.n, { x: 8.5, y: y + 0.1, w: 1.25, h: 0.6, fontSize: 26, color: ORA, bold: true, fontFace: "Georgia", align: "center", margin: 0 });
    s.addText(m.l, { x: 8.5, y: y + 0.7, w: 1.25, h: 0.35, fontSize: 9, color: MUTED, align: "center", margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 4 — PORTFÓLIO (magazine editorial)
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: D };

  // Header strip
  s.addText("PORTFÓLIO", {
    x: 0.4, y: 0.22, w: 4, h: 0.28,
    fontSize: 9, color: ORA, bold: true, charSpacing: 5, margin: 0
  });
  s.addText("Cada projeto conta uma história.", {
    x: 0.4, y: 0.5, w: 9, h: 0.55,
    fontSize: 26, color: WHITE, bold: true, fontFace: "Georgia", margin: 0
  });

  // Large left image
  s.addImage({ path: BASE + "fotos/Quarto Casal 01.jpg", x: 0.3, y: 1.18, w: 4.1, h: 4.18, sizing: { type: "cover", w: 4.1, h: 4.18 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 4.95, w: 4.1, h: 0.42, fill: { color: D, transparency: 15 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 4.95, w: 0.06, h: 0.42, fill: { color: ORA } });
  s.addText("Quarto Casal — Projeto Completo", { x: 0.45, y: 5.0, w: 3.8, h: 0.3, fontSize: 10.5, color: WHITE, bold: true, margin: 0 });

  // Top-right image (taller)
  s.addImage({ path: BASE + "fotos/gal-cozinha2.jpg", x: 4.6, y: 1.18, w: 2.7, h: 2.0, sizing: { type: "cover", w: 2.7, h: 2.0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 4.6, y: 2.8, w: 2.7, h: 0.38, fill: { color: D, transparency: 15 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 4.6, y: 2.8, w: 0.06, h: 0.38, fill: { color: ORA } });
  s.addText("Cozinha Planejada", { x: 4.75, y: 2.85, w: 2.4, h: 0.28, fontSize: 10, color: WHITE, bold: true, margin: 0 });

  // Mid-right image
  s.addImage({ path: BASE + "fotos/sala-estar.jpg", x: 4.6, y: 3.34, w: 2.7, h: 2.02, sizing: { type: "cover", w: 2.7, h: 2.02 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 4.6, y: 4.98, w: 2.7, h: 0.38, fill: { color: D, transparency: 15 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 4.6, y: 4.98, w: 0.06, h: 0.38, fill: { color: ORA } });
  s.addText("Sala de Estar", { x: 4.75, y: 5.03, w: 2.4, h: 0.28, fontSize: 10, color: WHITE, bold: true, margin: 0 });

  // Far-right top
  s.addImage({ path: BASE + "fotos/gal-dormitorio-v2.jpg", x: 7.5, y: 1.18, w: 2.2, h: 2.0, sizing: { type: "cover", w: 2.2, h: 2.0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: 2.8, w: 2.2, h: 0.38, fill: { color: D, transparency: 15 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: 2.8, w: 0.06, h: 0.38, fill: { color: ORA } });
  s.addText("Dormitório", { x: 7.65, y: 2.85, w: 2.0, h: 0.28, fontSize: 10, color: WHITE, bold: true, margin: 0 });

  // Far-right bottom
  s.addImage({ path: BASE + "fotos/Adega 01.jpg", x: 7.5, y: 3.34, w: 2.2, h: 2.02, sizing: { type: "cover", w: 2.2, h: 2.02 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: 4.98, w: 2.2, h: 0.38, fill: { color: D, transparency: 15 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: 4.98, w: 0.06, h: 0.38, fill: { color: ORA } });
  s.addText("Adega / Gourmet", { x: 7.65, y: 5.03, w: 2.0, h: 0.28, fontSize: 10, color: WHITE, bold: true, margin: 0 });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 5 — "45 DIAS" HERO (uma promessa, um slide)
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();

  // Background: process photo
  s.addImage({ path: BASE + "fotos/processo.jpg", x: 0, y: 0, w: W, h: H, sizing: { type: "cover", w: W, h: H } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: H, fill: { color: "000000", transparency: 25 } });

  // Left dark panel
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 6.5, h: H, fill: { color: "000000", transparency: 30 } });

  // Orange stripe
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.14, h: H, fill: { color: ORA } });

  // Overline
  s.addText("NOSSO COMPROMISSO", {
    x: 0.35, y: 0.4, w: 6, h: 0.3,
    fontSize: 9, color: ORA2, bold: true, charSpacing: 4, margin: 0
  });

  // "45" mega-number
  s.addText("45", {
    x: 0.3, y: 0.7, w: 4.5, h: 3.4,
    fontSize: 200, color: WHITE, bold: true, fontFace: "Georgia", margin: 0
  });

  // "dias" to the right of the number
  s.addText("dias.", {
    x: 4.3, y: 1.5, w: 2.0, h: 1.5,
    fontSize: 52, color: ORA, bold: true, fontFace: "Georgia", margin: 0
  });

  // Sub-text
  s.addText("Da aprovação do projeto 3D\nà instalação finalizada.", {
    x: 0.35, y: 4.35, w: 5.8, h: 0.9,
    fontSize: 17, color: "DDDDDD", fontFace: "Georgia", italic: true, margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 6 — COMO FUNCIONA (processo visual)
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  // Top orange stripe
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: 0.07, fill: { color: ORA } });

  s.addText("COMO FUNCIONA", {
    x: 0.5, y: 0.22, w: 9, h: 0.28,
    fontSize: 9, color: ORA, bold: true, charSpacing: 4, margin: 0
  });
  s.addText("Do primeiro contato à instalação finalizada.", {
    x: 0.5, y: 0.52, w: 9, h: 0.7,
    fontSize: 30, color: TXT, bold: true, fontFace: "Georgia", margin: 0
  });

  // Horizontal connecting line
  s.addShape(pres.shapes.RECTANGLE, { x: 0.95, y: 2.35, w: 8.1, h: 0.04, fill: { color: "D0C8BE" } });

  const steps = [
    { n: "01", title: "Atendimento\nComercial", desc: "Check-list personalizado, proposta com prazos e condições claras." },
    { n: "02", title: "Projeto 3D\nProfissional", desc: "Arquiteta mede no local e desenvolve o projeto em 3D com Promob." },
    { n: "03", title: "Fabricação\nCNC", desc: "Produção com maquinário CNC e controle de qualidade em cada etapa." },
    { n: "04", title: "Entrega e\nInstalação", desc: "Equipe própria: transporte, montagem e limpeza do local." },
    { n: "05", title: "Pós-Venda\ne Garantia", desc: "3 anos de garantia total. Revisão técnica inclusa pós-instalação." },
  ];

  steps.forEach((st, i) => {
    const cx = 0.95 + i * 2.03;

    // Circle — highlight step 2 (Projeto 3D)
    const isKey = i === 1;
    s.addShape(pres.shapes.OVAL, { x: cx, y: 2.05, w: 0.62, h: 0.62, fill: { color: isKey ? ORA : TXT } });
    s.addText(st.n, { x: cx, y: 2.05, w: 0.62, h: 0.62, fontSize: 13, color: WHITE, bold: true, align: "center", valign: "middle", margin: 0 });

    // Card below
    s.addShape(pres.shapes.RECTANGLE, { x: cx - 0.55, y: 2.88, w: 1.7, h: 2.55, fill: { color: isKey ? ORA : WHITE }, shadow: mkS() });

    s.addText(st.title, {
      x: cx - 0.45, y: 2.98, w: 1.5, h: 0.62,
      fontSize: 11.5, color: isKey ? WHITE : TXT, bold: true, align: "center", margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, { x: cx + 0.05, y: 3.66, w: 0.52, h: 0.04, fill: { color: isKey ? "FFCCA8" : ORA } });
    s.addText(st.desc, {
      x: cx - 0.45, y: 3.8, w: 1.5, h: 1.45,
      fontSize: 9.5, color: isKey ? "FFDDCC" : "666666", align: "center", margin: 0
    });
  });

  // Bottom note
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.35, w: W, h: 0.275, fill: { color: TXT } });
  s.addText("Prazo médio de 45 dias · Com flexibilidade para urgências · Você acompanha cada etapa.", {
    x: 0.5, y: 5.36, w: 9, h: 0.25,
    fontSize: 10, color: "BBBBBB", align: "center", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 7 — 8 SEGMENTOS (visual com fotos)
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: D };

  s.addText("ATENDEMOS QUEM PRECISA DE QUALIDADE.", {
    x: 0.5, y: 0.22, w: 9, h: 0.35,
    fontSize: 9, color: ORA, bold: true, charSpacing: 3, margin: 0
  });
  s.addText("8 segmentos, uma só excelência.", {
    x: 0.5, y: 0.56, w: 9, h: 0.62,
    fontSize: 28, color: WHITE, bold: true, fontFace: "Georgia", margin: 0
  });

  // 4 columns x 2 rows grid
  const segs = [
    { name: "Residencial",      img: "fotos/seg-residencial-v2.jpg" },
    { name: "Corporativo",      img: "fotos/seg-corporativo.jpg" },
    { name: "Hospitalar",       img: "fotos/seg-hospitais.jpg" },
    { name: "Apart. Decorados", img: "fotos/seg-apartamentos.jpg" },
    { name: "Laboratórios",     img: "fotos/seg-laboratorio.jpg" },
    { name: "Áreas Comuns",     img: "fotos/seg-areas-comuns.jpg" },
    { name: "Stands",           img: "fotos/lojas.jpg" },
    { name: "Esp. Especiais",   img: "fotos/seg-corporativo1.jpg" },
  ];

  segs.forEach((seg, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = 0.22 + col * 2.42, y = 1.35 + row * 2.05;
    const W2 = 2.25, H2 = 1.88;

    s.addImage({ path: BASE + seg.img, x, y, w: W2, h: H2, sizing: { type: "cover", w: W2, h: H2 } });
    // Gradient overlay at bottom
    s.addShape(pres.shapes.RECTANGLE, { x, y: y + H2 - 0.58, w: W2, h: 0.58, fill: { color: "000000", transparency: 15 } });
    // Left orange stripe
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: H2, fill: { color: ORA } });
    s.addText(seg.name, {
      x: x + 0.14, y: y + H2 - 0.5, w: W2 - 0.2, h: 0.4,
      fontSize: 11.5, color: WHITE, bold: true, margin: 0
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 8 — 3 DIFERENCIAIS (3 pilares verticais)
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: "141414" };

  s.addText("POR QUE A SAW?", {
    x: 0.5, y: 0.25, w: 9, h: 0.3,
    fontSize: 9, color: ORA2, bold: true, charSpacing: 5, margin: 0, align: "center"
  });
  s.addText("3 motivos que fazem toda a diferença.", {
    x: 0.5, y: 0.58, w: 9, h: 0.62,
    fontSize: 28, color: WHITE, bold: true, fontFace: "Georgia", align: "center", margin: 0
  });

  const pillars = [
    {
      n: "01",
      title: "Projeto 3D\nGratuito",
      sub: "Você aprova antes de produzir.",
      body: "Nossa arquiteta visita o local, mede com precisão e cria o projeto em 3D com Promob. Você visualiza cada detalhe — cor, material, proporção — antes de qualquer coisa ser produzida. Zero surpresa na entrega.",
      color: "1A1A1A"
    },
    {
      n: "02",
      title: "Equipe\n100% Própria",
      sub: "Sem terceiros. Sem desculpas.",
      body: "Da fábrica à montagem, são os mesmos profissionais treinados pela SAW. Isso garante padrão, responsabilidade e agilidade. Se algo precisar de ajuste, a mesma equipe resolve — sem terceirizar o problema.",
      color: ORA
    },
    {
      n: "03",
      title: "3 Anos de\nGarantia",
      sub: "Estrutura, ferragens e acabamento.",
      body: "Nossa garantia cobre tudo: estrutura, dobradiças, corrediças e acabamento. E o melhor: com equipe própria, o atendimento é rápido, sem burocracia. Você não fica no vácuo se algo der errado.",
      color: "1A1A1A"
    },
  ];

  pillars.forEach((p, i) => {
    const x = 0.28 + i * 3.18;
    const isHigh = i === 1;
    const bg = isHigh ? ORA : "1E1E1E";

    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.42, w: 3.0, h: 4.0, fill: { color: bg }, shadow: mkS() });

    // Number
    s.addText(p.n, {
      x: x + 0.2, y: 1.55, w: 1.5, h: 0.7,
      fontSize: 38, color: isHigh ? "FFE0C8" : ORA, bold: true, fontFace: "Georgia", margin: 0
    });

    // Title
    s.addText(p.title, {
      x: x + 0.2, y: 2.32, w: 2.65, h: 0.72,
      fontSize: 20, color: isHigh ? WHITE : WHITE, bold: true, margin: 0
    });

    // Sub
    s.addText(p.sub, {
      x: x + 0.2, y: 3.08, w: 2.65, h: 0.32,
      fontSize: 10.5, color: isHigh ? "FFD4B2" : ORA, italic: true, margin: 0
    });

    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.2, y: 3.48, w: 2.6, h: 0.04, fill: { color: isHigh ? "FFCCAA" : "333333" } });

    // Body
    s.addText(p.body, {
      x: x + 0.2, y: 3.62, w: 2.65, h: 1.65,
      fontSize: 10, color: isHigh ? "FFE8D8" : "888888", margin: 0
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 9 — DEPOIMENTO HERO (um quote, tela toda)
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();

  s.addImage({ path: BASE + "fotos/sala-estar.jpg", x: 0, y: 0, w: W, h: H, sizing: { type: "cover", w: W, h: H } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: H, fill: { color: "000000", transparency: 22 } });

  // Orange top bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: 0.1, fill: { color: ORA } });

  // Quote mark (decorative)
  s.addText("''", {
    x: 0.4, y: 0.3, w: 1.5, h: 1.5,
    fontSize: 120, color: ORA, fontFace: "Georgia", opacity: 0.6, margin: 0
  });

  // The quote
  s.addText("A SAW Móveis entregou tudo o que prometeu.\nColaboradores zelosos e atenciosos do início ao fim.\nEstou muito satisfeito com o resultado!", {
    x: 0.5, y: 1.5, w: 9, h: 2.0,
    fontSize: 28, color: WHITE, bold: false, fontFace: "Georgia", italic: true, align: "center", margin: 0
  });

  // Stars
  s.addText("★ ★ ★ ★ ★", {
    x: 0.5, y: 3.65, w: 9, h: 0.5,
    fontSize: 20, color: ORA, align: "center", margin: 0
  });

  // Author
  s.addText("— Eliade Matos   ·   Cliente verificado no Google", {
    x: 0.5, y: 4.22, w: 9, h: 0.35,
    fontSize: 13, color: "CCCCCC", align: "center", margin: 0
  });

  // Orange bottom bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.3, w: W, h: 0.325, fill: { color: ORA } });
  s.addText("5.0 ★ no Google  ·  20 avaliações verificadas  ·  11 anos de mercado", {
    x: 0.5, y: 5.31, w: 9, h: 0.3,
    fontSize: 11, color: WHITE, align: "center", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 10 — MAIS DEPOIMENTOS + SOCIAL PROOF
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: "F2EDE6" };

  // Left panel
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 2.75, h: H, fill: { color: ORA } });
  s.addText("★★★★★", { x: 0.1, y: 0.7, w: 2.55, h: 0.45, fontSize: 20, color: WHITE, align: "center", margin: 0 });
  s.addText("5.0", { x: 0.1, y: 1.15, w: 2.55, h: 1.1, fontSize: 72, color: WHITE, bold: true, fontFace: "Georgia", align: "center", margin: 0 });
  s.addText("no Google", { x: 0.1, y: 2.25, w: 2.55, h: 0.35, fontSize: 13, color: "FFE0C0", align: "center", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.85, y: 2.75, w: 1.05, h: 0.05, fill: { color: WHITE } });
  s.addText("20 avaliações\n5 estrelas", { x: 0.1, y: 2.9, w: 2.55, h: 0.5, fontSize: 12, color: "FFE0C0", align: "center", margin: 0 });
  s.addText("Depoimentos\nreais de clientes\nverificados.", { x: 0.1, y: 3.6, w: 2.55, h: 1.0, fontSize: 13, color: WHITE, bold: true, fontFace: "Georgia", align: "center", margin: 0 });
  s.addText("@marcenariasawmoveis", { x: 0.1, y: 5.08, w: 2.55, h: 0.32, fontSize: 9.5, color: "FFE0C0", align: "center", italic: true, margin: 0 });

  // 4 testimonial cards
  const deps = [
    { ini: "AS", name: "Alexandra Silva Grassmann", q: '"Excelente empresa! Atendimento de qualidade, produtos de muita qualidade e prazo diferenciado!"' },
    { ini: "KV", name: "Karla Vilantt · Local Guide", q: '"Nossos móveis ficaram lindos! Muito capricho e atenção nos detalhes. Indicamos para todos!"' },
    { ini: "EG", name: "Ednilson Ganiko", q: '"Ótimo atendimento, preço justo e profissionais qualificados. Recomendo muito."' },
    { ini: "MS", name: "Marlene Sales de Oliveira", q: '"Material impecável. Qualidade e preços excelentes. Serviço superou as expectativas."' },
  ];

  deps.forEach((d, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 2.95 + col * 3.52, y = 0.22 + row * 2.62;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.35, h: 2.42, fill: { color: WHITE }, shadow: mkS() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.35, h: 0.07, fill: { color: ORA } });
    s.addText("★★★★★", { x: x + 0.18, y: y + 0.15, w: 3.0, h: 0.3, fontSize: 12, color: ORA, margin: 0 });
    s.addText(d.q, { x: x + 0.18, y: y + 0.5, w: 3.0, h: 1.2, fontSize: 10.5, color: "444444", italic: true, margin: 0 });
    s.addShape(pres.shapes.OVAL, { x: x + 0.18, y: y + 1.85, w: 0.32, h: 0.32, fill: { color: ORA } });
    s.addText(d.ini, { x: x + 0.18, y: y + 1.85, w: 0.32, h: 0.32, fontSize: 8.5, color: WHITE, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(d.name, { x: x + 0.58, y: y + 1.9, w: 2.7, h: 0.26, fontSize: 9.5, color: TXT, bold: true, margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 11 — QUEM JÁ CONFIOU NA SAW
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: 0.07, fill: { color: ORA } });

  s.addText("QUEM JÁ CONFIOU NA SAW", {
    x: 0.5, y: 0.22, w: 9, h: 0.3, fontSize: 9, color: ORA, bold: true, charSpacing: 4, margin: 0
  });
  s.addText("Cases reais em múltiplos segmentos.", {
    x: 0.5, y: 0.56, w: 9, h: 0.6, fontSize: 26, color: TXT, bold: true, fontFace: "Georgia", margin: 0
  });

  const cases = [
    { name: "Cordicell", seg: "Corporativo", desc: "Escritório completo — estações de trabalho, recepção e salas.", img: "fotos/seg-corporativo.jpg" },
    { name: "CYMS Hospital Alemão", seg: "Hospitalar", desc: "Balcões, consultórios e áreas de espera especializados.", img: "fotos/seg-hospitais.jpg" },
    { name: "G.R.F. Laboratórios", seg: "Laboratorial", desc: "Bancadas técnicas e armários para equipamentos de precisão.", img: "fotos/seg-laboratorio.jpg" },
    { name: "MEGA · CP · Interlagos · Panamby", seg: "Apart. Decorados", desc: "Ambientes completos de alto padrão para construtoras.", img: "fotos/seg-apartamentos.jpg" },
    { name: "Stands em São Paulo", seg: "Stands de Vendas", desc: "Estandes para lançamentos imobiliários na Grande SP.", img: "fotos/lojas.jpg" },
    { name: "+350 famílias", seg: "Residencial", desc: "Projetos únicos para lares de todos os estilos e tamanhos.", img: "fotos/seg-residencial-v2.jpg" },
  ];

  cases.forEach((c, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.28 + col * 3.18, y = 1.42 + row * 2.0;
    const CW = 3.0, CH = 1.82;

    s.addShape(pres.shapes.RECTANGLE, { x, y, w: CW, h: CH, fill: { color: "F8F5F1" }, shadow: mkS() });
    s.addImage({ path: BASE + c.img, x, y, w: CW, h: 0.9, sizing: { type: "cover", w: CW, h: 0.9 } });

    // Segment badge over image
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.12, y: y + 0.6, w: 1.05, h: 0.26, fill: { color: ORA } });
    s.addText(c.seg, { x: x + 0.12, y: y + 0.6, w: 1.05, h: 0.26, fontSize: 8, color: WHITE, bold: true, align: "center", valign: "middle", margin: 0 });

    s.addText(c.name, { x: x + 0.12, y: y + 0.98, w: 2.78, h: 0.4, fontSize: 11.5, color: TXT, bold: true, margin: 0 });
    s.addText(c.desc, { x: x + 0.12, y: y + 1.4, w: 2.78, h: 0.35, fontSize: 9, color: "666666", margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 12 — INVESTIMENTO (bold + clean)
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  // Dark left
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 4.5, h: H, fill: { color: NAV } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: H, fill: { color: ORA } });

  s.addText("INVESTIMENTO", { x: 0.35, y: 0.42, w: 3.8, h: 0.3, fontSize: 9, color: ORA2, bold: true, charSpacing: 4, margin: 0 });
  s.addText("Qualidade sob medida\npara o seu bolso.", { x: 0.35, y: 0.82, w: 3.8, h: 1.4, fontSize: 26, color: WHITE, bold: true, fontFace: "Georgia", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 2.42, w: 2.8, h: 0.06, fill: { color: ORA } });

  s.addText("a partir de", { x: 0.35, y: 2.62, w: 3.8, h: 0.3, fontSize: 12, color: MUTED, margin: 0 });
  s.addText("R$ 8.000", { x: 0.35, y: 2.92, w: 3.8, h: 0.88, fontSize: 50, color: ORA, bold: true, fontFace: "Georgia", margin: 0 });
  s.addText("Parcelamos em até 18×", { x: 0.35, y: 3.88, w: 3.8, h: 0.35, fontSize: 13, color: "DDDDDD", bold: true, margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 4.42, w: 3.8, h: 0.05, fill: { color: "2A3A55" } });
  s.addText("Orçamento 100% gratuito.\nResposta em até 2 horas.", { x: 0.35, y: 4.55, w: 3.8, h: 0.7, fontSize: 11, color: "8899BB", margin: 0 });

  // Right: included list
  s.addText("Tudo incluído no seu projeto:", { x: 4.72, y: 0.32, w: 5.0, h: 0.4, fontSize: 14, color: TXT, bold: true, margin: 0 });

  const inc = [
    "Visita técnica de medição gratuita",
    "Projeto 3D profissional (Promob)",
    "Fabricação CNC — alta precisão",
    "Transporte seguro até o local",
    "Instalação por equipe própria SAW",
    "Limpeza completa pós-instalação",
    "3 anos de garantia total",
    "Revisão técnica pós-instalação",
  ];
  inc.forEach((item, i) => {
    const y = 0.92 + i * 0.56;
    s.addShape(pres.shapes.RECTANGLE, { x: 4.65, y, w: 5.1, h: 0.49, fill: { color: i % 2 === 0 ? "F8F5F1" : CARD } });
    s.addShape(pres.shapes.OVAL, { x: 4.8, y: y + 0.12, w: 0.26, h: 0.26, fill: { color: ORA } });
    s.addText("✓", { x: 4.8, y: y + 0.12, w: 0.26, h: 0.26, fontSize: 8, color: WHITE, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(item, { x: 5.18, y: y + 0.1, w: 4.4, h: 0.3, fontSize: 11.5, color: TXT, margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 13 — CTA FINAL ("VAMOS TRANSFORMAR SEU ESPAÇO?")
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();

  s.addImage({ path: BASE + "fotos/Sala de Tv 01.jpg", x: 0, y: 0, w: W, h: H, sizing: { type: "cover", w: W, h: H } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: H, fill: { color: "000000", transparency: 28 } });

  // Orange stripe top
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: 0.1, fill: { color: ORA } });

  // Logo centered
  s.addImage({ path: BASE + "assets/logo-principal.png", x: 3.8, y: 0.28, w: 2.4, h: 0.67 });

  // Big CTA text
  s.addText("Vamos transformar\nseu espaço?", {
    x: 0.5, y: 1.15, w: 9, h: 2.0,
    fontSize: 58, color: WHITE, bold: true, fontFace: "Georgia", align: "center", margin: 0
  });

  // Horizontal orange divider
  s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 3.25, w: 3.0, h: 0.07, fill: { color: ORA } });

  s.addText("Fale agora com um especialista — projeto 3D gratuito, sem compromisso.", {
    x: 0.5, y: 3.42, w: 9, h: 0.4,
    fontSize: 13, color: "DDDDDD", align: "center", margin: 0
  });

  // 3 contact cards
  const contacts = [
    { icon: "☎", label: "WhatsApp / Telefone", val: "(11) 3495-9479" },
    { icon: "✉", label: "E-mail", val: "atendimento@sawmoveis.com.br" },
    { icon: "🌐", label: "Site", val: "www.sawmoveis.com.br" },
  ];
  contacts.forEach((c, i) => {
    const x = 1.18 + i * 2.82;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.02, w: 2.6, h: 1.35, fill: { color: ORA } });
    s.addText(c.icon, { x, y: 4.1, w: 2.6, h: 0.45, fontSize: 18, align: "center", margin: 0 });
    s.addText(c.label, { x: x + 0.1, y: 4.58, w: 2.4, h: 0.26, fontSize: 9, color: "FFE0C8", align: "center", margin: 0 });
    s.addText(c.val, { x: x + 0.1, y: 4.85, w: 2.4, h: 0.4, fontSize: 10.5, color: WHITE, bold: true, align: "center", margin: 0 });
  });

  // Slogan bottom
  s.addText('"Produtividade de fábrica com essência artesanal" — SAW Móveis', {
    x: 0.5, y: 5.46, w: 9, h: 0.28,
    fontSize: 10, color: ORA2, italic: true, align: "center", margin: 0
  });
}

// Save
pres.writeFile({ fileName: "C:/Users/ivan/Desktop/pasta claude/agente landpage/SAW Moveis - Apresentacao Comercial v2.pptx" })
  .then(() => console.log("✅ Apresentação v2 criada!"))
  .catch(e => console.error("❌", e));
