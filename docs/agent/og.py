#!/opt/homebrew/bin/python3
"""M5: one Open Graph image per page (1200x630 PNG) from the built HTML titles.

Usage (from repo root): npm run build && /opt/homebrew/bin/python3 docs/agent/og.py && npm run build
Reads dist/**/index.html (<title>, <html lang>), writes public/og/<path>.png where <path> is the page path
without trailing slash ('/' -> 'home', '/de/' -> 'de/home'). BaseLayout points og:image at the same path.
Only rewrites an image when its title changed (hash stored in public/og/.manifest.json).
"""
import hashlib, html, json, os, re, sys
from PIL import Image, ImageDraw, ImageFont

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
DIST, OUT = os.path.join(REPO, 'dist'), os.path.join(REPO, 'public', 'og')
FONTS = os.path.join(REPO, 'docs', 'agent', 'video', 'fonts')
W, H = 1200, 630
BG, INK, MUTED, TEAL, AMBER, TRACK = (15, 23, 42), (241, 245, 249), (176, 188, 204), (45, 212, 191), (245, 158, 11), (30, 41, 59)
TAG = {'en': 'Lab reports · price per mg · audit data', 'de': 'Laborberichte · Preis pro mg · Prüfdaten', 'es': 'Informes de laboratorio · precio por mg · auditoría',
       'fr': 'Rapports de laboratoire · prix par mg · audit', 'it': 'Referti di laboratorio · prezzo per mg · verifica'}
F = {k: ImageFont.truetype(os.path.join(FONTS, f), s) for k, (f, s) in {
    'brand': ('Inter-Bold.ttf', 34), 'tag': ('Inter-Regular.ttf', 30), 'dom': ('Inter-Bold.ttf', 30)}.items()}


def og_rel(page_path: str) -> str:
    p = page_path.strip('/')
    if p in ('', 'de', 'es', 'fr', 'it'):
        p = (p + '/home').lstrip('/')
    return p + '.png'


def wrap(d, text, font, maxw):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=font) <= maxw:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def render(title, lang, dst):
    im = Image.new('RGB', (W, H), BG)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([64, 56, 100, 92], radius=8, fill=TEAL)
    d.text((116, 88), 'PeptideLabIndex', font=F['brand'], fill=INK, anchor='ls')
    # decorative data motif (static, not data): three bars
    for i, (w, c) in enumerate([(300, TEAL), (210, AMBER), (130, TEAL)]):
        y = 64 + i * 26
        d.rounded_rectangle([W - 64 - 300, y, W - 64, y + 14], radius=7, fill=TRACK)
        d.rounded_rectangle([W - 64 - 300, y, W - 64 - 300 + w, y + 14], radius=7, fill=c)
    size = 76
    ft = ImageFont.truetype(os.path.join(FONTS, 'InterDisplay-Black.ttf'), size)
    lines = wrap(d, title, ft, W - 128)
    while size > 44:
        ft = ImageFont.truetype(os.path.join(FONTS, 'InterDisplay-Black.ttf'), size)
        lines = wrap(d, title, ft, W - 128)
        if len(lines) <= 3:
            break
        size -= 4
    lines = lines[:3]
    lh = int(size * 1.12)
    y = 330 - (len(lines) * lh) // 2 + size
    for ln in lines:
        d.text((64, y), ln, font=ft, fill=INK, anchor='ls')
        y += lh
    d.rectangle([64, 500, W - 64, 503], fill=TRACK)
    d.text((64, 566), TAG.get(lang, TAG['en']), font=F['tag'], fill=MUTED, anchor='ls')
    d.text((W - 64, 566), 'peptidelabtest.org', font=F['dom'], fill=TEAL, anchor='rs')
    im = im.quantize(colors=48, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im.save(dst, optimize=True)


def main():
    man_p = os.path.join(OUT, '.manifest.json')
    man = json.load(open(man_p)) if os.path.exists(man_p) else {}
    seen, made = set(), 0
    for root, _, fs in os.walk(DIST):
        for f in fs:
            if f != 'index.html':
                continue
            rel = '/' + os.path.relpath(os.path.join(root, f), DIST).replace('index.html', '')
            s = open(os.path.join(root, f), encoding='utf-8').read()
            t = re.search(r'<title>(.*?)</title>', s, re.S)
            lang = (re.search(r'<html lang="(\w+)"', s) or [None, 'en'])[1]
            if not t:
                continue
            title = html.unescape(t.group(1)).strip()
            key = og_rel(rel)
            seen.add(key)
            h = hashlib.sha1(f'{title}|{lang}|v1'.encode()).hexdigest()[:12]
            dst = os.path.join(OUT, key)
            if man.get(key) == h and os.path.exists(dst):
                continue
            render(title, lang, dst)
            man[key] = h
            made += 1
    # default image for pages without their own (404 etc.)
    if not os.path.exists(os.path.join(OUT, 'default.png')):
        render('Research Peptide Prices & Lab Tests Compared', 'en', os.path.join(OUT, 'default.png'))
    stale = [k for k in man if k not in seen]
    for k in stale:
        p = os.path.join(OUT, k)
        if os.path.exists(p):
            os.remove(p)
        man.pop(k)
    json.dump(man, open(man_p, 'w'), indent=0, sort_keys=True)
    print(f'og images: {len(seen)} pages, {made} rendered, {len(stale)} removed')


if __name__ == '__main__':
    main()
