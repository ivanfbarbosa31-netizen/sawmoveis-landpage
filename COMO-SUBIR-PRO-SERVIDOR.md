# 🚀 Como subir as alterações pro servidor sawmoveis.com.br

## 📦 Arquivos modificados/novos hoje (3 arquivos)

| Arquivo | O que mudou |
|---|---|
| `index.html` | Adicionado canonical URL, geo tags, Open Graph, Schema.org LocalBusiness |
| `script.js` | Form redireciona pra `/obrigado.html` (já subiu antes) |
| `obrigado.html` | Página de confirmação com tracking (já subiu antes) |
| `.htaccess` | **NOVO** — bloqueia spam, force HTTPS, cache, segurança |

## ⚠️ Importante

Apenas o `index.html` foi modificado AGORA. O `script.js` e `obrigado.html` já subiram mais cedo.

O `.htaccess` é **NOVO** — você nunca subiu esse arquivo.

## 🔼 Como subir via cPanel (mesma forma que fizemos antes)

### Passo 1 — Login no cPanel
Acessa: https://br.kessel3020.com.br:2083

### Passo 2 — Abrir File Manager
Clique em **"Gerenciador de arquivos"** → entra na pasta **`public_html`**

### Passo 3 — Backup do index.html atual (segurança)
1. Clique em `index.html` → botão **"Renomear"**
2. Renomeia pra `index.html.bak`

### Passo 4 — Subir o novo index.html
1. Botão **"Carregar"** no topo
2. Selecione `index.html` da pasta `agente landpage` no seu PC
3. Aguarda upload concluir (ícone verde)

### Passo 5 — Subir o .htaccess (CUIDADO ESPECIAL)
1. Botão **"Carregar"**
2. Selecione `.htaccess` da pasta `agente landpage` (atenção: arquivos que começam com `.` ficam ocultos no Windows — pode precisar habilitar "mostrar arquivos ocultos")
3. Se já existir um `.htaccess` no servidor, vai pedir confirmação pra sobrescrever
4. **Antes de sobrescrever, faça backup do antigo** (renomeie pra `.htaccess.bak`)

### Passo 6 — Validar
1. Acesse https://www.sawmoveis.com.br/ — deve carregar normal
2. Acesse https://sawmoveis.com.br/ (sem www) — deve **redirecionar** pra https://www.sawmoveis.com.br/
3. Acesse http://sawmoveis.com.br/ (sem HTTPS) — deve **redirecionar** pra https://www.sawmoveis.com.br/
4. Acesse https://www.sawmoveis.com.br/?xnxx=1 — deve dar **erro 410 Gone**

## ⚠️ Se algo der errado

### Site quebrou após subir .htaccess
1. Vai no File Manager → public_html
2. Renomeia `.htaccess` → `.htaccess.broken`
3. Renomeia `.htaccess.bak` → `.htaccess` (volta o antigo)

### Site quebrou após subir index.html
1. Vai no File Manager → public_html
2. Deleta `index.html`
3. Renomeia `index.html.bak` → `index.html`

## 🧪 Como testar se as melhorias SEO funcionaram

### Validar Schema.org:
https://search.google.com/test/rich-results?url=https%3A%2F%2Fwww.sawmoveis.com.br%2F

Deve mostrar **"FurnitureStore"** detectado com horários e áreas atendidas.

### Validar Open Graph:
https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fwww.sawmoveis.com.br%2F

Deve mostrar título, descrição e logo corretos.

### Validar canonical:
Abra o site, **Ctrl+U** (ver fonte), procura por `canonical` — deve aparecer:
```
<link rel="canonical" href="https://www.sawmoveis.com.br/" />
```

### Validar HTTPS forçado:
Tente acessar `http://sawmoveis.com.br/` — deve redirecionar pra `https://www.sawmoveis.com.br/`

## 📅 O que vai acontecer depois

| Tempo | Resultado esperado |
|---|---|
| Hoje | Schema.org já visível no Google Rich Results Test |
| 3-7 dias | Google reindexa páginas com canonical correto |
| 14 dias | Spam URLs começam a sair do Google (410 Gone) |
| 30 dias | Site começa a aparecer melhor pra buscas locais |
| 60 dias | LocalBusiness pode aparecer no Google Maps (ainda precisa Google Meu Negócio) |
