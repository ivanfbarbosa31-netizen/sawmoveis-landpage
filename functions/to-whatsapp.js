/**
 * Cloudflare Pages Function — /to-whatsapp
 * Criado 2026-06-26 Rafael (DevOps/SRE) — autorizacao Ivan
 *
 * Proxy same-origin para o endpoint GET /to-whatsapp do saw-leads Worker.
 * Mantém todos os query params (origem, utm_*, gclid, referrer).
 * O Worker grava o clique em whatsapp_clicks (Supabase) e retorna 302 → wa.me.
 *
 * Fluxo: Browser clica no botão WhatsApp → GET /to-whatsapp?origem=float-wa&...
 *   → esta Pages Function → Worker saw-leads /to-whatsapp → 302 wa.me/551134959479
 */

const WORKER_BASE = 'https://saw-leads.ivan-fbarbosa31.workers.dev';

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  // Repassa todos os query params para o Worker
  const workerUrl = `${WORKER_BASE}/to-whatsapp${url.search}`;

  try {
    const workerResp = await fetch(workerUrl, {
      method: 'GET',
      headers: {
        // Repassa headers relevantes de geolocalização / IP Cloudflare
        'CF-Connecting-IP': context.request.headers.get('CF-Connecting-IP') || '',
        'CF-IPCountry':     context.request.headers.get('CF-IPCountry') || '',
        'User-Agent':       context.request.headers.get('User-Agent') || '',
        'Referer':          context.request.headers.get('Referer') || '',
      },
      redirect: 'manual', // recebe o 302 sem seguir automaticamente
    });

    // Repassa o 302 redirect do Worker para o browser
    if (workerResp.status === 302 || workerResp.status === 301) {
      const location = workerResp.headers.get('Location');
      return Response.redirect(location, workerResp.status);
    }

    // Fallback: se Worker retornar algo inesperado, redireciona direto
    return Response.redirect(`https://wa.me/551134959479`, 302);
  } catch (err) {
    // FALLBACK GARANTIDO: qualquer falha → vai direto para o WhatsApp
    // O usuário nunca é travado por falha de telemetria
    console.error('[to-whatsapp-proxy] erro:', err.message);
    return Response.redirect(`https://wa.me/551134959479`, 302);
  }
}
