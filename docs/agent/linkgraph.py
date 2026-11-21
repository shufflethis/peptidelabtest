#!/usr/bin/env python3
"""M7 link graph over dist/: orphans (0 inbound from any other page) and contextual inbound links
(distinct source pages linking from inside <main>, i.e. not header/footer) for every money page.
Usage: python3 docs/agent/linkgraph.py [dist] [--min 5] [--list]"""
import os, re, sys, html
from collections import defaultdict

DIST = next((a for a in sys.argv[1:] if not a.startswith('--')), 'dist')
MIN = int(sys.argv[sys.argv.index('--min') + 1]) if '--min' in sys.argv else 5
MONEY = re.compile(r'^/(prices|vendors|compare|labs|blends|calculator|brands|shops-by-country)/.+|^/(trusted-peptide-vendors|discount-codes|price-index|code-names|badge|prices|vendors|blends|labs|compare|batch-tracker)/$')

pages = {}
for root, _, fs in os.walk(DIST):
    for f in fs:
        if f == 'index.html':
            rel = '/' + os.path.relpath(os.path.join(root, f), DIST).replace('index.html', '')
            rel = '/' if rel == '/./' else rel
            pages[rel] = os.path.join(root, f)

def links(s):
    out = []
    for m in re.finditer(r'<a\b[^>]*\bhref="([^"#?]*)[^"]*"', s):
        h = html.unescape(m.group(1))
        if h.startswith('https://www.peptidelabtest.org'):
            h = h[len('https://www.peptidelabtest.org'):]
        if h.startswith('/') and not re.search(r'\.\w+$', h):
            out.append(h if h.endswith('/') else h + '/')
    return out

inb_any, inb_ctx = defaultdict(set), defaultdict(set)
for p, f in pages.items():
    s = open(f, encoding='utf-8').read()
    m = re.search(r'<main\b.*?</main>', s, re.S)
    main = m.group(0) if m else ''
    # breadcrumbs are navigation, not context
    main_ctx = re.sub(r'<nav\b[^>]*aria-label="[^"]*"[^>]*>.*?</nav>', ' ', main, flags=re.S)
    for h in set(links(s)):
        if h != p:
            inb_any[h].add(p)
    for h in set(links(main_ctx)):
        if h != p:
            inb_ctx[h].add(p)

orphans = sorted(p for p in pages if p not in ('/', '/de/', '/es/', '/fr/', '/it/') and not inb_any.get(p) and '404' not in p)
weak = []
for p in sorted(pages):
    base = re.sub(r'^/(de|es|fr|it)/', '/', p)
    if MONEY.match(base) and len(inb_ctx.get(p, ())) < MIN:
        weak.append((p, len(inb_ctx.get(p, ()))))
money_n = sum(1 for p in pages if MONEY.match(re.sub(r'^/(de|es|fr|it)/', '/', p)))
print(f'pages: {len(pages)}, money pages: {money_n}')
print(f'orphans: {len(orphans)}')
for o in orphans[:30]:
    print('   ', o)
print(f'money pages with < {MIN} contextual inbound: {len(weak)} (en: {sum(1 for w in weak if not re.match(r"^/(de|es|fr|it)/", w[0]))})')
if '--list' in sys.argv or len(weak) < 80:
    for w in weak:
        if not re.match(r'^/(de|es|fr|it)/', w[0]):
            print('   ', w)
sys.exit(1 if orphans or weak else 0)
