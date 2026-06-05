/* =============================================
   SAW MÓVEIS — script.js
   ============================================= */

/* ── NAV scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobile menu ── */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

/* ── Reveal on scroll ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const delay = Number(entry.target.dataset.delay || 0);
    setTimeout(() => entry.target.classList.add('is-visible'), delay);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.10, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
  el.dataset.delay = siblings.indexOf(el) * 90;
  revealObserver.observe(el);
});

/* ── Número counters ── */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.numero-card__val').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      if (!isNaN(target)) animateCount(el, target);
    });
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.4 });

document.querySelectorAll('.numeros__grid').forEach(el => counterObserver.observe(el));

function animateCount(el, target) {
  const duration = 1400;
  const start    = performance.now();
  const suffix   = el.nextElementSibling?.classList.contains('numero-card__unit') ? '' : '';

  (function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.round(target * ease).toLocaleString('pt-BR');
    if (p < 1) requestAnimationFrame(step);
  })(start);
}

/* ── hstat counters on hero card ── */
const hstatObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.hstat__num').forEach(el => {
      const raw    = el.textContent.trim();
      const num    = parseFloat(raw.replace(/[^\d.]/g, ''));
      const suffix = raw.replace(/[\d]/g, '');
      if (!isNaN(num) && num > 1) {
        const dur   = 1200;
        const start = performance.now();
        (function step(now) {
          const p    = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = (num >= 100
            ? Math.round(num * ease).toLocaleString('pt-BR')
            : Math.round(num * ease)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        })(start);
      }
    });
    hstatObserver.unobserve(entry.target);
  });
}, { threshold: 0.6 });

document.querySelectorAll('.hcard__stats').forEach(el => hstatObserver.observe(el));

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

/* ── Parallax orbs (hero) ── */
const orbs = document.querySelectorAll('.hero__orb');
window.addEventListener('mousemove', e => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  orbs.forEach((orb, i) => {
    const f = (i + 1) * 12;
    orb.style.transform = `translate(${dx * f}px, ${dy * f}px)`;
  });
}, { passive: true });

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + entry.target.id
        ? 'var(--gold-2)' : '';
    });
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── Carousel de avaliações no hero card ── */
(function () {
  const depoimentos = [
    {
      quote: '"Nossos móveis ficaram lindos! Muito capricho e atenção nos detalhes. Ótimo atendimento do início ao fim. Indicamos para todos!"',
      initials: 'KV',
      name: 'Karla Vilantt',
      info: 'Local Guide · 66 avaliações · 9 fotos'
    },
    {
      quote: '"A SAW Móveis atendeu às expectativas e entregou tudo o que prometeu. Colaboradores zelosos e atenciosos do início ao fim. Estou muito satisfeito com o resultado!"',
      initials: 'EM',
      name: 'Eliade Matos',
      info: '4 avaliações no Google'
    },
    {
      quote: '"Excelente empresa! Excelente atendimento, produtos de muita qualidade e prazo diferenciado!"',
      initials: 'AS',
      name: 'Alexandra Silva Grassmann',
      info: '20 avaliações no Google'
    },
    {
      quote: '"Material impecável… Qualidade, preços excelentes. Estão de parabéns! Serviço superou as expectativas."',
      initials: 'MS',
      name: 'Marlene Sales de Oliveira',
      info: '2 fotos · 1 avaliação'
    },
    {
      quote: '"Excelente equipe, caprichosos em cada detalhe, muito organizados e material de qualidade."',
      initials: 'MI',
      name: 'Midori',
      info: '1 ano atrás · 3 fotos'
    }
  ];

  const quoteEl  = document.querySelector('.hcard__quote');
  const authorEl = document.querySelector('.hcard__author');
  const dotsEl   = document.getElementById('hcardDots');

  if (!quoteEl || !authorEl || !dotsEl) return;

  let current = 0;

  /* Criar dots */
  depoimentos.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hcard__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Avaliação ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  function getDots() { return dotsEl.querySelectorAll('.hcard__dot'); }

  function goTo(index) {
    quoteEl.classList.add('fading');
    authorEl.classList.add('fading');

    setTimeout(() => {
      const d = depoimentos[index];
      quoteEl.textContent = d.quote;
      authorEl.innerHTML = `
        <div class="avatar-circle">${d.initials}</div>
        <div>
          <strong>${d.name}</strong>
          <span>${d.info}</span>
        </div>`;

      getDots().forEach((dot, i) => dot.classList.toggle('active', i === index));
      current = index;

      quoteEl.classList.remove('fading');
      authorEl.classList.remove('fading');
    }, 420);
  }

  /* Auto-play */
  let timer = setInterval(() => {
    goTo((current + 1) % depoimentos.length);
  }, 3000);

  /* Pausar ao hover */
  const hcard = document.querySelector('.hcard');
  hcard?.addEventListener('mouseenter', () => clearInterval(timer));
  hcard?.addEventListener('mouseleave', () => {
    timer = setInterval(() => goTo((current + 1) % depoimentos.length), 3000);
  });
})();

/* ── Hero mini-form → WhatsApp ── */
const hfSubmit = document.getElementById('hf-submit');
if (hfSubmit) {
  hfSubmit.addEventListener('click', () => {
    const nome = (document.getElementById('hf-nome')?.value || '').trim();
    const tel  = (document.getElementById('hf-tel')?.value  || '').trim();
    const amb  = (document.getElementById('hf-amb')?.value  || '').trim();

    if (!nome || !tel) {
      alert('Preencha seu nome e WhatsApp para continuar.');
      return;
    }

    let msg = `Olá! Quero solicitar um Projeto 3D Gratuito.\n\n`;
    msg += `*Nome:* ${nome}\n`;
    msg += `*WhatsApp:* ${tel}\n`;
    if (amb) msg += `*Ambiente:* ${amb}\n`;
    msg += `\nPode me chamar?`;

    /* Captura lead em background — usa _capturarLead com logging */
    _capturarLead({
      nome,
      telefone: tel,
      interesse: amb || null,
      origem: 'landing_page_hero',
      tags: ['site', 'projeto-3d-gratuito']
    });

    /* Eventos de conversão */
    if (typeof fbq  !== 'undefined') fbq('track', 'Lead');
    if (typeof gtag !== 'undefined') gtag('event', 'generate_lead', { event_category: 'hero_form' });

    window.open(`https://wa.me/551134959479?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  });
}

/* ── Upload de arquivo: feedback visual ── */
const arquivoInput = document.getElementById('f-arquivo');
const arquivoLabel = document.getElementById('arquivo-label');
const fileUploadBox = arquivoInput?.previousElementSibling;

if (arquivoInput) {
  arquivoInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const sizeKB = (file.size / 1024).toFixed(0);
      const sizeTxt = file.size > 1048576
        ? (file.size / 1048576).toFixed(1) + ' MB'
        : sizeKB + ' KB';
      arquivoLabel.textContent = `📎 ${file.name} (${sizeTxt})`;
      fileUploadBox?.classList.add('has-file');
    } else {
      arquivoLabel.textContent = 'Clique para anexar ou arraste aqui';
      fileUploadBox?.classList.remove('has-file');
    }
  });

  /* Drag & drop */
  fileUploadBox?.addEventListener('dragover', e => {
    e.preventDefault();
    fileUploadBox.style.borderColor = 'var(--orange)';
  });
  fileUploadBox?.addEventListener('dragleave', () => {
    fileUploadBox.style.borderColor = '';
  });
  fileUploadBox?.addEventListener('drop', e => {
    e.preventDefault();
    fileUploadBox.style.borderColor = '';
    const files = e.dataTransfer?.files;
    if (files?.length) {
      arquivoInput.files = files;
      arquivoInput.dispatchEvent(new Event('change'));
    }
  });
}

/* ── URL da API de Campanhas (auto-detecta ambiente) ──
 * Em produção (www.sawmoveis.com.br): usa URL pública do Cloudflare Worker / Railway
 * Em dev (localhost): usa servidor local na porta 3000
 *
 * IMPORTANTE: ao fazer deploy, atualize a constante CAMPANHAS_API_URL_PROD abaixo.
 */
const CAMPANHAS_API_URL_PROD = 'https://saw-leads.ivan-fbarbosa31.workers.dev';
const CAMPANHAS_API_URL = (
  location.hostname === 'localhost' || location.hostname === '127.0.0.1'
) ? 'http://localhost:3000' : CAMPANHAS_API_URL_PROD;

/* ═══════════════════════════════════════════════════════════
   ATRIBUIÇÃO (Diana) — captura de origem do lead
   Roda no load, guarda UTMs/gclid/referrer da PRIMEIRA visita em
   sessionStorage (sobrevive à navegação pra obrigado.html/catalogo).
   100% aditivo: não altera nada do fluxo de captura existente.
   ═══════════════════════════════════════════════════════════ */
const SAW_ATTR_KEY = 'saw_attr_v1';

function _capturaAtribuicao() {
  try {
    // Mantém a PRIMEIRA origem da sessão (first-touch)
    const existente = sessionStorage.getItem(SAW_ATTR_KEY);
    if (existente) return JSON.parse(existente);

    const qs = new URLSearchParams(location.search);
    const get = (k) => (qs.get(k) || '').slice(0, 255) || null;

    const utm_source = get('utm_source');
    const gclid = get('gclid') || get('wbraid') || get('gbraid');
    const fbclid = get('fbclid');

    let origem_derivada = utm_source;
    if (!origem_derivada) {
      if (gclid) origem_derivada = 'google_ads';
      else if (fbclid) origem_derivada = 'meta_ads';
      else if (document.referrer) {
        try {
          const refHost = new URL(document.referrer).hostname;
          origem_derivada = refHost.includes('sawmoveis') ? 'direto' : refHost;
        } catch { origem_derivada = 'direto'; }
      } else {
        origem_derivada = 'direto';
      }
    }

    const attr = {
      lead_id: (self.crypto?.randomUUID?.() || ('lid_' + Date.now() + '_' + Math.random().toString(36).slice(2))),
      utm_source,
      utm_medium: get('utm_medium'),
      utm_campaign: get('utm_campaign'),
      utm_term: get('utm_term'),
      utm_content: get('utm_content'),
      gclid,
      fbclid,
      referrer: (document.referrer || '').slice(0, 500) || null,
      landing_page: (location.pathname + location.search).slice(0, 500),
      origem_derivada,
      captado_em: new Date().toISOString()
    };
    sessionStorage.setItem(SAW_ATTR_KEY, JSON.stringify(attr));
    return attr;
  } catch (e) {
    return {};
  }
}

// Captura imediatamente no carregamento de qualquer página da LP
const _SAW_ATTR = _capturaAtribuicao();

/* ── Helper: captura de lead com logging visível em caso de erro ──
   Injeta a atribuição de forma ADITIVA: campos novos top-level + cópia
   dentro de metadata (failsafe — se a coluna ainda não existir no
   Supabase, o dado fica preservado no metadata jsonb que já existe). */
function _capturarLead(payload) {
  const attr = _SAW_ATTR || {};
  const enriquecido = Object.assign({}, payload, {
    lead_id: attr.lead_id || payload.lead_id || null,
    utm_source: attr.utm_source || null,
    utm_medium: attr.utm_medium || null,
    utm_campaign: attr.utm_campaign || null,
    utm_term: attr.utm_term || null,
    utm_content: attr.utm_content || null,
    gclid: attr.gclid || null,
    referrer: attr.referrer || null,
    metadata: Object.assign({}, payload.metadata || {}, { atribuicao: attr })
  });
  return _enviarLead(enriquecido);
}

function _enviarLead(payload) {
  return fetch(CAMPANHAS_API_URL + '/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  })
  .then(data => {
    console.log('[lead-captura] OK:', data?.id || 'sem-id');
    return data;
  })
  .catch(err => {
    // Loga no console em vez de engolir silenciosamente
    console.error('[lead-captura] FALHOU:', err.message, '— payload:', payload);
    // Envia evento de erro pro GA4 pra rastrear no painel
    if (typeof gtag !== 'undefined') {
      gtag('event', 'lead_capture_failed', {
        event_category: 'erro',
        event_label: err.message,
      });
    }
  });
}

/* ── Formulário de Projeto → WhatsApp + captura de lead ── */
const projetoForm = document.getElementById('projetoForm');
if (projetoForm) {
  projetoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome      = (this.nome?.value      || '').trim();
    const telefone  = (this.telefone?.value  || '').trim();
    const ambiente  = (this.ambiente?.value  || '').trim();
    const descricao = (this.descricao?.value || '').trim();

    if (!nome || !telefone) {
      const campos = [];
      if (!nome)     campos.push('Nome');
      if (!telefone) campos.push('WhatsApp');
      alert('Preencha os campos obrigatórios: ' + campos.join(', '));
      return;
    }

    /* Captura lead em background — usa _capturarLead com logging */
    _capturarLead({
      nome,
      telefone,
      interesse: ambiente || null,
      origem: 'landing_page',
      tags: ['site'],
      metadata: { descricao: descricao || null }
    });

    /* Redireciona pra página de obrigado, que dispara conversão e abre WhatsApp.
       Conversão Google Ads "Formulario Lead SAW Moveis" tem trigger ?nome= */
    const params = new URLSearchParams({
      nome,
      telefone,
      ambiente,
      descricao
    });
    window.location.href = 'obrigado.html?' + params.toString();
  });
}

/* ═══════════════════════════════════════════════════════════
   GALERIA — FILTROS + LIGHTBOX
   ═══════════════════════════════════════════════════════════ */
(function () {
  const filterBtns = document.querySelectorAll('.gal-filter');
  const galGrid = document.getElementById('galeriaGrid');
  const galEmpty = document.getElementById('galeriaEmpty');
  const toggle = document.getElementById('galeriaToggle');
  const filtersWrap = document.getElementById('galeriaFilters');
  const toggleCurrent = document.getElementById('galeriaToggleCurrent');
  if (!filterBtns.length || !galGrid) return;

  const items = galGrid.querySelectorAll('.gal-item');

  // Helper: extrai label do filtro (remove emoji/svg, mantém texto)
  function getFilterLabel(btn) {
    return btn.textContent.replace(/\s+/g, ' ').trim();
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      let visibleCount = 0;
      items.forEach(item => {
        const matches = filter === 'all' || item.dataset.categoria === filter;
        item.classList.toggle('is-hidden', !matches);
        if (matches) visibleCount++;
      });
      galEmpty.style.display = visibleCount === 0 ? 'block' : 'none';

      // Atualiza label do toggle mobile + fecha accordion
      if (toggleCurrent) toggleCurrent.textContent = getFilterLabel(btn);
      if (filtersWrap && window.innerWidth <= 768) {
        filtersWrap.classList.remove('is-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Toggle do accordion mobile
  if (toggle && filtersWrap) {
    toggle.addEventListener('click', () => {
      const open = filtersWrap.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
      if (window.innerWidth > 768) return;
      if (!filtersWrap.classList.contains('is-open')) return;
      if (toggle.contains(e.target) || filtersWrap.contains(e.target)) return;
      filtersWrap.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  /* Lightbox */
  let lightbox = document.getElementById('lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<button class="lightbox__close" aria-label="Fechar">&times;</button><img src="" alt="" />';
    document.body.appendChild(lightbox);
  }
  const lbImg = lightbox.querySelector('img');
  const lbClose = lightbox.querySelector('.lightbox__close');

  galGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.gal-item');
    if (!item) return;
    const img = item.querySelector('img');
    if (img) {
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      // Meta Pixel ViewContent — retargeting com contexto do card
      const cardTitle = item.querySelector('.gal-item__label')?.textContent?.trim() || img.alt || 'Portfolio';
      const cardCategoria = item.dataset.categoria || 'portfolio';
      if (typeof fbq !== 'undefined') {
        fbq('track', 'ViewContent', {
          content_name: cardTitle,
          content_category: cardCategoria,
          content_type: 'portfolio_item'
        });
      }
      // GA4 — também loga pra funil de análise
      if (typeof gtag !== 'undefined') {
        gtag('event', 'portfolio_view', {
          content_name: cardTitle,
          content_category: cardCategoria
        });
      }
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  lbClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox(); });
})();

/* ═══════════════════════════════════════════════════════════
   ANTES & DEPOIS — slider de comparação
   ═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.ad-slider').forEach(slider => {
  const range = slider.querySelector('.ad-range');
  const clip = slider.querySelector('.ad-img-clip');
  const handle = slider.querySelector('.ad-handle');
  if (!range || !clip || !handle) return;

  function update() {
    const v = range.value;
    clip.style.width = v + '%';
    handle.style.left = v + '%';
  }
  range.addEventListener('input', update);
  update();
});

/* ═══════════════════════════════════════════════════════════
   CALCULADORA DE ORÇAMENTO
   ═══════════════════════════════════════════════════════════ */
(function () {
  const btn = document.getElementById('calc-btn');
  const sa = document.getElementById('calc-ambiente');
  const st = document.getElementById('calc-tamanho');
  const sk = document.getElementById('calc-acabamento');
  const placeholder = document.querySelector('.calc__placeholder');
  const output = document.querySelector('.calc__output');
  const out_min = document.getElementById('calcMin');
  const out_max = document.getElementById('calcMax');
  const whatsBtn = document.getElementById('calcWhatsBtn');
  if (!btn) return;

  /* Tabela base de preços (R$) — ajustar conforme realidade SAW */
  /* preço base = ambiente · multiplicador tamanho · multiplicador acabamento */
  const baseAmbiente = {
    'cozinha':       { min: 8000,  max: 14000 },
    'dormitorio':    { min: 6000,  max: 11000 },
    'closet':        { min: 7000,  max: 13000 },
    'sala-tv':       { min: 5000,  max: 10000 },
    'sala-jantar':   { min: 4000,  max: 8000 },
    'home-office':   { min: 4500,  max: 9000 },
    'completo':      { min: 35000, max: 80000 },
    'corporativo':   { min: 12000, max: 35000 }
  };
  const multTamanho = {
    'pequeno':      1.0,
    'medio':        1.5,
    'grande':       2.0,
    'muito-grande': 2.8
  };
  const multAcabamento = {
    'mdf':       1.0,
    'madeirado': 1.4,
    'laqueado':  1.8,
    'premium':   2.3
  };
  const labelAmbiente = {
    'cozinha':'Cozinha','dormitorio':'Dormitório','closet':'Closet',
    'sala-tv':'Sala de TV','sala-jantar':'Sala de Jantar',
    'home-office':'Home Office','completo':'Projeto Completo','corporativo':'Corporativo'
  };
  const labelTamanho = {
    'pequeno':'até 8m²','medio':'8-15m²','grande':'15-25m²','muito-grande':'25m²+'
  };
  const labelAcabamento = {
    'mdf':'MDF','madeirado':'Madeirado','laqueado':'Laqueado','premium':'Premium'
  };

  function fmt(v) {
    return Math.round(v / 100) * 100; /* arredonda pra centena */
  }
  function brl(v) {
    return v.toLocaleString('pt-BR');
  }

  btn.addEventListener('click', () => {
    const a = sa.value, t = st.value, k = sk.value;
    if (!a || !t || !k) {
      alert('Selecione os 3 campos para calcular.');
      return;
    }
    const base = baseAmbiente[a];
    const mt = multTamanho[t];
    const mk = multAcabamento[k];
    const min = fmt(base.min * mt * mk);
    const max = fmt(base.max * mt * mk);

    placeholder.style.display = 'none';
    output.style.display = 'block';
    out_min.textContent = brl(min);
    out_max.textContent = brl(max);

    /* Monta link WhatsApp pré-preenchido */
    const msg = 'Olá! Calculei minha estimativa no site:\n\n' +
                '• Ambiente: ' + labelAmbiente[a] + '\n' +
                '• Tamanho: ' + labelTamanho[t] + '\n' +
                '• Acabamento: ' + labelAcabamento[k] + '\n' +
                '• Estimativa: R$ ' + brl(min) + ' a R$ ' + brl(max) + '\n\n' +
                'Quero um orçamento exato. Quando vocês podem agendar a visita técnica gratuita?';
    whatsBtn.href = 'https://wa.me/551134959479?text=' + encodeURIComponent(msg);

    /* Conversões / tracking */
    if (typeof fbq !== 'undefined') fbq('trackCustom', 'CalculatedEstimate', { ambiente: a, value_min: min, value_max: max, currency: 'BRL' });
    if (typeof gtag !== 'undefined') gtag('event', 'calculate_estimate', { ambiente: a, tamanho: t, acabamento: k, value_min: min, value_max: max, currency: 'BRL' });
  });
})();

/* ═══════════════════════════════════════════════════════════
   MODAL CATÁLOGO PDF
   ═══════════════════════════════════════════════════════════ */
(function () {
  const modal = document.getElementById('catalogoModal');
  const openBtn = document.getElementById('openCatalogo');
  const form = document.getElementById('catalogoForm');
  if (!modal || !openBtn) return;

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    /* Track abertura */
    if (typeof gtag !== 'undefined') gtag('event', 'catalog_modal_open');
  }
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  openBtn.addEventListener('click', openModal);
  modal.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });

  /* Submit do form: dispara conversão e leva pra página de download */
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = (form.nome.value || '').trim();
      const email = (form.email.value || '').trim();
      const tel = (form.telefone.value || '').trim();
      if (!email) {
        alert('Informe seu e-mail para receber o catálogo.');
        return;
      }

      /* Captura lead em background — usa _capturarLead com logging */
      _capturarLead({
        nome: nome || '(sem nome)',
        telefone: tel || email,
        interesse: 'Catalogo PDF',
        origem: 'landing_page_catalogo',
        tags: ['site', 'catalogo', 'lead-frio'],
        metadata: { email: email }
      });

      /* Conversões */
      if (typeof fbq !== 'undefined') fbq('track', 'Lead', { value: 800, currency: 'BRL', content_name: 'Catalogo PDF' });
      if (typeof gtag !== 'undefined') gtag('event', 'download_catalog', {
        currency: 'BRL', value: 800, lead_source: 'catalog_pdf'
      });

      /* Redireciona pra página de download */
      const params = new URLSearchParams({ nome: nome, email: email, telefone: tel });
      window.location.href = 'catalogo-saw.html?' + params.toString();
    });
  }
})();

/* ═══════════════════════════════════════════════════════════
   HIDE PRE-BRIEFING CTAs WHEN WIZARD IS VISIBLE
   Esconde os botões de CTA "Pré-Briefing" enquanto o usuário
   já está dentro do wizard (#diagnostico) — evita redundância visual.
   Usa IntersectionObserver (performático, sem scroll listener).
   ═══════════════════════════════════════════════════════════ */
(function () {
  if (!('IntersectionObserver' in window)) return; // browsers antigos: ignora gracefully

  const wizardSection = document.getElementById('diagnostico');
  if (!wizardSection) return;

  /* Seleciona todos os CTAs de "ir pro Pré-Briefing" que devem sumir */
  const prebriefingCtas = document.querySelectorAll(
    '.pre-briefing-float, .nav__prebriefing-mobile, #heroPreBriefingBtn'
  );
  if (!prebriefingCtas.length) return;

  /* Aplica transição suave em cada elemento */
  prebriefingCtas.forEach(function (btn) {
    btn.style.transition = 'opacity 200ms ease';
  });

  const wizardObserver = new IntersectionObserver(function (entries) {
    const insideWizard = entries[0].isIntersecting;
    prebriefingCtas.forEach(function (btn) {
      btn.style.opacity        = insideWizard ? '0' : '';
      btn.style.pointerEvents  = insideWizard ? 'none' : '';
    });
  }, { threshold: 0.3 });

  wizardObserver.observe(wizardSection);
})();
