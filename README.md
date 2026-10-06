# Landing Page — Franquia de Chocolates em Belém

Página estática (HTML/CSS/JS puro), publicada via Netlify com deploy automático a partir do GitHub.
Formulário de contato usa **Netlify Forms** (`data-netlify="true"`) — não precisa de backend.

## ✅ Checklist de pendências

Tudo marcado como `[PENDENTE]` no site (fundo bege com borda tracejada) precisa ser preenchido
antes de divulgar a página. Lista completa:

### Textos e dados
- [ ] Anos de mercado da marca (hero)
- [ ] Número de unidades da rede (hero)
- [ ] Texto institucional da oportunidade (seção "A Oportunidade")
- [ ] O que está incluso na venda (ponto, equipamentos, estoque, equipe)
- [ ] Localização exata / região na Marambaia em Belém
- [ ] Motivo da venda da franquia
- [ ] Indicadores de faturamento, ticket médio, payback
- [ ] Descrição do suporte oferecido ao franqueado
- [ ] Valor total do investimento
- [ ] Faturamento médio mensal
- [ ] Prazo médio de retorno (payback)
- [ ] Metragem do ponto comercial
- [ ] Faixas de investimento no formulário (`<select id="investimento">`)
- [ ] Confirmar material/dossiê enviado na etapa 2 do processo
- [ ] Etapas contratuais/jurídicas do fechamento (etapa 4 do processo)
- [ ] Respostas do FAQ (valor, itens inclusos, experiência prévia, suporte)
- [ ] 3 depoimentos reais (cliente ou franqueado)
- [ ] WhatsApp oficial (rodapé + `js/script.js` → `WHATSAPP_NUMBER`)
- [ ] E-mail oficial de contato (rodapé)
- [ ] Endereço do ponto comercial, se divulgável (rodapé)
- [ ] Links de Instagram/Facebook (rodapé)

### Imagens (colocar em `images/`, descaracterizadas da marca conforme combinado)
- [ ] `hero.jpg` — foto de destaque (fachada ou vitrine), paisagem, alta resolução
- [ ] `produto-01.jpg` a `produto-04.jpg` — fotos de produtos/ambiente (formato quadrado)
- [ ] Logo oficial (substituir os blocos "LOGO AQUI" no header e rodapé)

### Antes de publicar de vez
- [ ] Revisar todo o texto marcado com `[PENDENTE]`
- [ ] Trocar as imagens placeholder (tracejado laranja) pelas fotos reais
- [ ] Testar o envio do formulário em produção (Netlify Forms só funciona após deploy)
- [ ] Configurar notificação de novos leads em Site settings → Forms → Notifications no Netlify

## Como editar a copy (bundle)

O `index.html` publicado é um bundle: a página real fica embutida como uma string JSON em
`<script type="__bundler/template">`. Fluxo seguro de edição:

1. Extrair a versão plana a partir do bundle ao vivo: `python3 tools/bundle.py extract` gera `scratch_s4.html`.
2. Editar a copy em `scratch_s4.html`.
3. Reembutir: `python3 tools/bundle.py embed` reescreve o template em `index.html` (o script escapa
   `</script>` como `<\/script>`, senão o bundle quebra) **e regenera sozinho** o `<head>` de SEO
   (title, description, canonical, Open Graph, JSON-LD — tudo vindo do `<helmet>` do template) e o
   texto estático da página (`<main id="prerender">`).
4. Não edite à mão o que fica entre `<!-- seo:start/end -->` e `<!-- prerender:start/end -->` em `index.html`:
   a próxima execução do `embed` sobrescreve.

Por que o prerender existe: o bundle só monta a página com JavaScript. Sem ele, WhatsApp/Instagram,
crawlers de IA (GPTBot, ClaudeBot, PerplexityBot) e qualquer leitor de HTML cru enxergam só "Unpacking...".
Título ≤ 65 caracteres e description ≤ 160 caracteres, senão o Google trunca.

O script fica em `tools/bundle.py`. A copy segue `dna-oferta.md`.

## Rodando localmente
Basta abrir `index.html` no navegador, ou servir a pasta com qualquer servidor estático.

## Deploy
Repositório conectado ao Netlify — todo push na branch `main` gera um novo deploy automaticamente.

## Link para a bio do Instagram
Use **`https://franquia-chocolates-belem.netlify.app/ig`** como link da bio, em vez da URL longa com
`utm_source`/`utm_medium`/`utm_content`. O redirecionamento em `netlify.toml` adiciona os parâmetros de
rastreamento por trás dos panos, então o link que aparece ao colar ou repassar (WhatsApp, etc.) fica limpo.

Isso não evita o `fbclid`/`_aem` que o próprio Instagram/Facebook anexa quando alguém abre o link de dentro
do app deles — esse parâmetro é adicionado pelo Meta no momento do clique, não depende da URL de destino.
