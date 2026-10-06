// Injeta metadados SEO/GEO/AEO no index.html (idempotente).
// Uso: node seo-inject.js
// Mantém confidencialidade: sem marca, endereço exato ou dados financeiros.
const fs = require('fs');
const URL_SITE = 'https://franquia-chocolates-belem.netlify.app/';
const TITLE = 'Repasse de Franquia no Ramo de Chocolates e Presentes | Belém/PA - Bairro Marambaia';
const DESC = 'Franqueado repassa diretamente, sem intermediários, uma operação estruturada de chocolates e presentes em Belém/PA (Marambaia). Cadastre seu interesse e passe pela triagem.';

const faq = [
  ['Quem está fazendo o repasse da operação?',
   'O repasse é conduzido diretamente pelo franqueado atual, sem intermediários ou corretores.'],
  ['Onde fica a operação de chocolates e presentes?',
   'A operação está localizada no bairro da Marambaia, em Belém, Pará. O endereço exato é informado apenas após a triagem.'],
  ['Como funciona o processo de interesse?',
   'O interessado preenche o formulário de triagem na página, informando capital disponível, experiência e prazo. O franqueado revisa as respostas e retorna em até 2 dias úteis com o próximo passo.'],
  ['Os dados completos da operação são públicos?',
   'Não. Dados financeiros detalhados e a identificação da unidade só são compartilhados após a triagem e a assinatura de um termo de confidencialidade.'],
  ['O repasse precisa de aprovação da franqueadora?',
   'Sim. A transferência da operação está sujeita à aprovação da franqueadora, e o formulário exige ciência desse ponto.'],
];

const ld = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite', '@id': URL_SITE + '#website', url: URL_SITE,
      name: 'Repasse de Franquia de Chocolates e Presentes - Belém/PA', inLanguage: 'pt-BR',
    },
    {
      '@type': 'WebPage', '@id': URL_SITE + '#webpage', url: URL_SITE, name: TITLE,
      description: DESC, inLanguage: 'pt-BR', isPartOf: { '@id': URL_SITE + '#website' },
      about: { '@id': URL_SITE + '#oferta' },
      spatialCoverage: {
        '@type': 'Place', name: 'Marambaia, Belém, Pará, Brasil',
        address: { '@type': 'PostalAddress', addressLocality: 'Belém', addressRegion: 'PA', addressCountry: 'BR' },
      },
    },
    {
      '@type': 'Service', '@id': URL_SITE + '#oferta',
      name: 'Repasse de operação de chocolates e presentes em Belém/PA',
      description: DESC, serviceType: 'Repasse de franquia',
      areaServed: { '@type': 'City', name: 'Belém', containedInPlace: { '@type': 'State', name: 'Pará' } },
      provider: { '@type': 'Person', name: 'Franqueado (repasse direto)' },
    },
    {
      '@type': 'FAQPage', '@id': URL_SITE + '#faq',
      mainEntity: faq.map(([q, a]) => ({
        '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
};

const head = `
  <!-- SEO-GEO-AEO:START -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#F4EFE9">
  <meta name="author" content="Franqueado - repasse direto">
  <meta name="geo.region" content="BR-PA">
  <meta name="geo.placename" content="Belém">
  <meta name="ICBM" content="-1.4558, -48.4902">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="Repasse de Franquia - Chocolates e Presentes">
  <meta property="og:title" content="${TITLE}">
  <meta property="og:description" content="${DESC}">
  <meta property="og:url" content="${URL_SITE}">
  <meta property="og:image" content="${URL_SITE}Main@2x.png">
  <meta property="og:image:alt" content="Resumo da oportunidade de repasse de operação de chocolates e presentes em Belém/PA">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${TITLE}">
  <meta name="twitter:description" content="${DESC}">
  <meta name="twitter:image" content="${URL_SITE}Main@2x.png">
  <link rel="alternate" type="text/markdown" href="${URL_SITE}llms.txt" title="llms.txt">
  <script type="application/ld+json">${JSON.stringify(ld)}</script>
  <!-- SEO-GEO-AEO:END -->
`;

const body = `
  <!-- SEO-GEO-AEO-BODY:START -->
  <noscript>
    <main style="font-family:system-ui,sans-serif;max-width:720px;margin:0 auto;padding:24px;line-height:1.6;color:#241F1C;background:#faf9f5">
      <h1>Repasse de franquia no ramo de chocolates e presentes em Belém/PA</h1>
      <p>Estou repassando diretamente, sem intermediários, uma operação estruturada de chocolates e presentes no bairro da Marambaia, em Belém, Pará. Você assume um negócio que já funciona, com equipe treinada, fornecimento definido e vendas em operação.</p>
      <h2>Como funciona</h2>
      <ol>
        <li>Preencha o formulário de triagem.</li>
        <li>Revisarei suas respostas e retorno em até 2 dias úteis.</li>
        <li>Dados completos são compartilhados após a triagem e termo de confidencialidade.</li>
        <li>A transferência depende de aprovação da franqueadora.</li>
      </ol>
      <h2>Perguntas frequentes</h2>
${faq.map(([q, a]) => `      <h3>${q}</h3>\n      <p>${a}</p>`).join('\n')}
    </main>
  </noscript>
  <!-- SEO-GEO-AEO-BODY:END -->
`;

for (const f of ['index.html', 'Landing - Repasse Cacau Show.html']) {
  let h = fs.readFileSync(f, 'utf8');
  h = h.replace(/\s*<!-- SEO-GEO-AEO:START -->[\s\S]*?<!-- SEO-GEO-AEO:END -->\n?/, '');
  h = h.replace(/\s*<!-- SEO-GEO-AEO-BODY:START -->[\s\S]*?<!-- SEO-GEO-AEO-BODY:END -->\n?/, '');
  h = h.replace('</head>', head + '</head>');
  h = h.replace(/<body>/, '<body>' + body);
  fs.writeFileSync(f, h, 'utf8');
  console.log('ok', f);
}
