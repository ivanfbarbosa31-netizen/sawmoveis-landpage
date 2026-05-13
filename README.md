# SAW Móveis — Landing Page

Site institucional da SAW Móveis hospedado em `www.sawmoveis.com.br`.

## 🚀 Deploy

Deploy é **automático** via GitHub Actions. Todo `git push` na branch `main` sobe o site no Turbo Cloud em ~1 min.

### Workflow

1. Editar arquivos localmente
2. `git add . && git commit -m "..." && git push`
3. Aguardar ação verde em github.com/<user>/<repo>/actions
4. Validar em https://www.sawmoveis.com.br

### Secrets necessários (GitHub → Settings → Secrets)

| Nome | Valor |
|---|---|
| `FTP_HOST` | ftp.sawmoveis.com.br (ou IP) |
| `FTP_USERNAME` | conta FTP (ex: `deploy@sawmoveis.com.br`) |
| `FTP_PASSWORD` | senha da conta FTP |
| `FTP_SERVER_DIR` | `/public_html/` (caminho remoto) |

## 📁 Estrutura

```
index.html               # Home
obrigado.html            # Página pós-formulário
catalogo-saw.html        # Catálogo HTML
banner_saw_moveis.html   # Banner inicial
script.js                # Lógica (captura leads → Cloudflare Worker)
style.css                # Estilos
assets/                  # CSS, imagens, ícones
fotos/                   # Fotos de projetos
```

## 🔌 Integrações

- **Captura de leads**: `script.js` envia POST para `https://saw-leads.ivan-fbarbosa31.workers.dev/leads`
  (Cloudflare Worker → Supabase `leads`)
- **WhatsApp**: links `wa.me/551134959479` em todos os CTAs
- **GA4** e **Meta Pixel**: rastreamento de eventos `Lead`, `lead_capture_failed`

## ⚠️ Importante

- **Nunca commitar** arquivos `.env` ou senhas no código
- **Backups** do `script.js` salvos como `script.js.bak.AAAAMMDD_HHMM` ficam ignorados pelo git
