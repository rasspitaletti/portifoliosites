# Portfólio — Raul Spitaletti

Site estático (HTML + CSS + JS puro, sem dependências), focado em clínicas de estética e massoterapia.

```
index.html              home
case.html               página de case (case.html?slug=SEU-SLUG)
assets/css/styles.css   design system (tokens de cor, tipo e espaço no topo)
assets/js/config.js     ← SEUS DADOS (único arquivo a editar)
assets/js/shared.js     funções comuns (WhatsApp, menu, analytics…)
assets/js/main.js       home (destaque, grid, filtro, depoimentos)
assets/js/case.js       página de case (índice, lightbox, antes/depois, "ver no celular")
assets/img/projetos/    screenshots
assets/video/           vídeos/demos
```

## Projetos atuais
- **Aurora Prime Integrativa** (destaque): telas em `assets/img/projetos/aurora/`. Quando o site estiver publicado, preencha `url` no `config.js` para ativar o botão "Site ao vivo".
- **Neide Estética**: telas em `assets/img/projetos/neide/`; preencha `url` quando publicado.
- **Loja da Mary** (brechó, publicado em https://lojadamary.com.br/): telas em `assets/img/projetos/loja-da-mary/`.
- **Joana D'arc Massoterapia**: telas em `assets/img/projetos/joana-darc/`; preencha `url` quando o site dela for publicado. para os próximos sites.

## Configuração (`assets/js/config.js`)

| O quê | Campo |
|---|---|
| WhatsApp | `SITE_CONFIG.whatsappNumber` — só números, com DDI+DDD |
| Mensagem do WhatsApp | `SITE_CONFIG.whatsappMessage` (nas páginas de case é acrescentado o nome do case) |
| Google Analytics 4 | `SITE_CONFIG.gaMeasurementId` — ex.: `"G-ABC123"` |
| Investimento no FAQ | `SITE_CONFIG.priceFrom` — ex.: `"R$ 1.500"`; vazio = "orçamento sob medida" |
| Depoimentos | `TESTIMONIALS` — a seção só aparece quando houver pelo menos um |
| Projetos | `PROJECTS` — veja o modelo comentado no próprio arquivo |

### Como um projeto vira case
1. Preencha `name` e `slug` (sem espaços, ex.: `"clinica-aurora"`).
2. Preencha o que tiver: `context`, `problems`, `solutions`, `beforeAfter`, `results`, `lighthouse`, `testimonial`.
3. Seções vazias simplesmente não aparecem na página do case.
4. `featured: true` coloca o projeto no destaque da home.
5. `isConcept: true` exibe o selo **Projeto conceito** (obrigatório para marcas fictícias).

Regras: só números medidos, com `source` e `period`; só depoimentos e imagens autorizados por escrito; antes e depois de pacientes apenas com consentimento e dentro das regras do conselho do profissional.

### Eventos do GA4
`click_whatsapp`, `click_email`, `view_live_site`, `open_case` — marque `click_whatsapp` como conversão.

### Imagens
- Screenshot de página inteira (1440 px de largura), `.webp` ou `.jpg` < 400 KB: rola no hover.
- `imageMobile`: screenshot de página inteira no celular (390 px) — aparece em "Ver no celular".
- Vídeos verticais (9:16), `.mp4`, sem áudio, < 8 MB.

## Visual
- Tema escuro único (preto e dourado, com detalhes em verde-sálvia). Cores no topo de `assets/css/styles.css`.
- Fontes auto-hospedadas em `assets/fonts/`: somente DM Serif Display (títulos) e Libre Baskerville (textos e rótulos). Licença SIL Open Font License.
- Fundos em `assets/img/ambient/`: texturas (`silk-*`) e colagens de interface (`ui-*`) feitas com os próprios componentes deste site. Tudo original e livre para uso. Para trocar, substitua os arquivos mantendo os nomes.

## Sua foto
`assets/img/raul.webp` (quadrada, 560×560) aparece no topo, no menu e no "Sobre"; `raul-sm.webp` é a versão pequena do menu. Para trocar, substitua os dois arquivos mantendo os nomes.

## Preview de links e metadados
- `assets/img/og-image.jpg` (1200×630): imagem que aparece ao compartilhar o link no WhatsApp, Instagram, LinkedIn etc.
- Ícones: `favicon.ico`, `favicon.svg`, `assets/img/apple-touch-icon.png`, `icon-192/512.png`, `site.webmanifest`.
- `robots.txt` e `sitemap.xml` prontos.

### Depois de publicar (obrigatório para o preview funcionar)
1. O endereço já está configurado como `https://portifoliosites-khaki.vercel.app`. Se trocar de domínio, faça "localizar e substituir" desse endereço em index.html, case.html, robots.txt e sitemap.xml.
2. Teste o preview em https://developers.facebook.com/tools/debug/ (também serve para o WhatsApp) e em https://www.opengraph.xyz/.
3. Envie o `sitemap.xml` no Google Search Console.
4. Rode `python -m http.server` (ou qualquer servidor) para testar localmente: abrindo o arquivo direto no navegador, as fontes não carregam.
