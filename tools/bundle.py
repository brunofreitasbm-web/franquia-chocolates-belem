"""Extrai/embute o template plano dentro do bundle index.html. Rodar na raiz do repo.
uso: python3 tools/bundle.py extract   -> grava scratch_s4.html a partir de index.html
     python3 tools/bundle.py embed     -> reescreve o template em index.html a partir de scratch_s4.html
                                          e regenera o <head> de SEO e o conteúdo estático (prerender)

O bundle só monta a página com JavaScript: quem não executa JS (WhatsApp/Instagram, crawlers de IA,
buscadores simples) recebe apenas o HTML externo. Por isso o embed copia para o HTML externo:
  - o conteúdo do <helmet> (title, description, canonical, robots, Open Graph, JSON-LD) -> <head>
  - o texto da página (sem estilos, imagens e formulários) -> <main id="prerender">
Nada é editado à mão nesses dois trechos: a fonte única é scratch_s4.html.
"""
import json, re, sys
IDX, PLAIN = 'index.html', 'scratch_s4.html'
PAT = re.compile(r'(<script type="__bundler/template">\n\n)(.*?)(\n\n</script>)', re.S)

def extract():
    src = open(IDX, encoding='utf-8').read()
    m = PAT.search(src); assert m, 'template not found'
    html = json.loads(m.group(2))
    open(PLAIN, 'w', encoding='utf-8').write(html)
    print('extracted', len(html), 'chars ->', PLAIN)

SEO_PAT = re.compile(r'<!-- seo:start -->.*?<!-- seo:end -->', re.S)
PRE_PAT = re.compile(r'<!-- prerender:start -->.*?<!-- prerender:end -->', re.S)

def seo_head(html):
    helmet = re.search(r'<helmet>(.*?)</helmet>', html, re.S).group(1)
    helmet = re.sub(r'<style>.*?</style>', '', helmet, flags=re.S)
    helmet = re.sub(r'\s*<link rel="preconnect"[^>]*>', '', helmet)
    lines = [l.rstrip() for l in helmet.strip().splitlines() if l.strip()]
    body = '\n'.join(l if l.startswith(' ') else '  ' + l for l in lines)
    return ('<!-- seo:start -->\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n'
            + body + '\n  <!-- seo:end -->')

EMOJI = re.compile('[\U0001F300-\U0001FAFF\u2600-\u27BF\u2713]\\s*')

def prerender(html):
    body = re.search(r'</helmet>(.*?)</x-dc>', html, re.S).group(1)
    for tag in ('script', 'svg', 'form', 'button', 'sc-for'):
        body = re.sub(r'<%s\b.*?</%s>' % (tag, tag), '', body, flags=re.S)
    body = re.sub(r'<img\b[^>]*>', '', body)
    # só sobram id e href: estilo, classe e atributos do runtime não servem a quem lê o HTML cru
    body = re.sub(r'<(\w[\w-]*)((?:\s+[\w:-]+(?:="[^"]*")?)*)\s*(/?)>',
                  lambda m: '<%s%s>' % (m.group(1), ''.join(' %s' % a for a in re.findall(r'\b(?:id|href)="[^"]*"', m.group(2)))), body)
    body = EMOJI.sub('', body)
    body = re.sub(r'<(div|span)>\s*</\1>', '', body)
    body = re.sub(r'\n\s*\n+', '\n', body).strip()
    assert '{{' not in body and 'sc-' not in body, 'binding do runtime vazou para o prerender'
    return ('<!-- prerender:start -->\n  <main id="prerender">\n' + body +
            '\n<p>O formulário de cadastro precisa de JavaScript ativo no navegador.</p>\n  </main>\n  <!-- prerender:end -->')

def embed():
    src = open(IDX, encoding='utf-8').read()
    html = open(PLAIN, encoding='utf-8').read()
    m = PAT.search(src); assert m, 'template not found'
    enc = json.dumps(html, ensure_ascii=False).replace('</script>', '<\\/script>')
    out = src[:m.start(2)] + enc + src[m.end(2):]
    assert SEO_PAT.search(out) and PRE_PAT.search(out), 'marcadores seo/prerender ausentes em index.html'
    out = SEO_PAT.sub(lambda _: seo_head(html), out, count=1)
    out = PRE_PAT.sub(lambda _: prerender(html), out, count=1)
    open(IDX, 'w', encoding='utf-8').write(out)
    print('embedded', len(enc), 'chars into', IDX)

{'extract': extract, 'embed': embed}[sys.argv[1]]()
