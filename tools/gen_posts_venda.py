import glob, sys
from PIL import Image, ImageDraw, ImageFont
FD = glob.glob('/root/.claude/skills/synced/*/canvas-design/canvas-fonts')[0]
S = 2
W, H = 1080*S, 1350*S
BG, CREAM, GOLD, DIM, MUTE = '#2E1B12', '#F4EFE9', '#C9A27E', '#4A3225', '#9C8573'
def F(name, px): return ImageFont.truetype(f'{FD}/{name}', px*S)
def text(d, xy, s, font, fill, track=0, anchor='l'):
    x, y = xy[0]*S, xy[1]*S
    w = sum(d.textlength(c, font=font) + track*S for c in s) - track*S
    if anchor == 'r': x -= w
    for c in s:
        d.text((x, y), c, font=font, fill=fill)
        x += d.textlength(c, font=font) + track*S
def post(path, nome, preco, fat, pct, n, num):
    im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
    M = 96
    mono = lambda px: F('DMMono-Regular.ttf', px)
    text(d, (M, 96), 'CACAU SHOW · BELÉM/PA', mono(22), GOLD, 5)
    text(d, (1080-M, 96), f'N° {num}/02', mono(22), MUTE, 5, 'r')
    d.rectangle([M*S, 148*S, (1080-M)*S, 149*S], fill=DIM)
    text(d, (M, 196), nome, F('Gloock-Regular.ttf', 112), CREAM)
    text(d, (M, 338), 'REPASSE DIRETO · UNIDADE EM OPERAÇÃO', mono(22), MUTE, 4)
    text(d, (M, 404), preco, F('Gloock-Regular.ttf', 168), GOLD)
    # grid
    cell, gap, gx, gy = 44, 6, M, 700
    for i in range(100):
        r, c = divmod(i, 10)
        x, y = gx + c*(cell+gap), gy + r*(cell+gap)
        d.rectangle([x*S, y*S, (x+cell)*S-1, (y+cell)*S-1], fill=GOLD if i < n else DIM)
    # right column
    cx = 660
    text(d, (cx, gy-4), fat, F('Gloock-Regular.ttf', 60), CREAM)
    text(d, (cx, gy+78), 'FATURAMENTO', mono(20), MUTE, 4)
    text(d, (cx, gy+106), 'ÚLTIMOS 12 MESES', mono(20), MUTE, 4)
    text(d, (cx, gy+210), pct, F('Gloock-Regular.ttf', 60), GOLD)
    text(d, (cx, gy+292), 'DO ANO EM UM ÚNICO', mono(20), MUTE, 4)
    text(d, (cx, gy+320), 'MÊS: A PÁSCOA', mono(20), MUTE, 4)
    ly = gy + 494 - 22
    d.rectangle([cx*S, ly*S, (cx+22)*S-1, (ly+22)*S-1], fill=GOLD)
    text(d, (cx+38, ly+1), 'PÁSCOA', mono(18), MUTE, 3)
    d.rectangle([(cx+170)*S, ly*S, (cx+192)*S-1, (ly+22)*S-1], fill=DIM)
    text(d, (cx+208, ly+1), 'DEMAIS', mono(18), MUTE, 3)
    d.rectangle([M*S, 1228*S, (1080-M)*S, 1229*S], fill=DIM)
    text(d, (M, 1256), 'LINK NA BIO', mono(22), GOLD, 5)
    text(d, (1080-M, 1256), 'SUJEITO À APROVAÇÃO DA FRANQUEADORA', mono(16), MUTE, 2, 'r')
    im.resize((1080, 1350), Image.LANCZOS).save(path, optimize=True)
post('instagram-posts/post-venda-marambaia.png', 'Marambaia', 'R$ 200 mil', 'R$ 1,23 mi', '33%', 33, '01')
post('instagram-posts/post-venda-icoaraci.png', 'Icoaraci', 'R$ 158 mil', 'R$ 756 mil', '36%', 36, '02')
