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
- [ ] Localização exata / região em Belém
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

## Rodando localmente
Basta abrir `index.html` no navegador, ou servir a pasta com qualquer servidor estático.

## Deploy
Repositório conectado ao Netlify — todo push na branch `main` gera um novo deploy automaticamente.
