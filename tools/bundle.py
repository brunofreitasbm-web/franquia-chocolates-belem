"""Extrai/embute o template plano dentro do bundle index.html. Rodar na raiz do repo.
uso: python3 tools/bundle.py extract   -> grava scratch_s4.html a partir de index.html
     python3 tools/bundle.py embed     -> reescreve a linha do template em index.html a partir de scratch_s4.html
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

def embed():
    src = open(IDX, encoding='utf-8').read()
    html = open(PLAIN, encoding='utf-8').read()
    m = PAT.search(src); assert m, 'template not found'
    enc = json.dumps(html, ensure_ascii=False).replace('</script>', '<\\/script>')
    out = src[:m.start(2)] + enc + src[m.end(2):]
    open(IDX, 'w', encoding='utf-8').write(out)
    print('embedded', len(enc), 'chars into', IDX)

{'extract': extract, 'embed': embed}[sys.argv[1]]()
