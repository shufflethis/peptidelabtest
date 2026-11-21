#!/usr/bin/env python3
"""hreflang reciprocity + language-consistent internal links.
For every HTML page: the set of hreflang alternates must contain all live languages + x-default, each target must exist in dist,
and each target's own alternates must point back to this page (reciprocal, identical set).
Also: on /de/ etc. pages, internal <a href> must stay in the same language (except /llms.txt, /data/*.csv|json, /favicon)."""
import os, re, sys, html
from urllib.parse import urlparse
DIST = sys.argv[1] if len(sys.argv) > 1 else 'dist'
LANGS = sys.argv[2].split(',') if len(sys.argv) > 2 else ['en', 'de', 'es', 'fr', 'it']
SITE = 'https://www.peptidelabtest.org'
pages = {}
for root, _, fs in os.walk(DIST):
    for f in fs:
        if f.endswith('.html'):
            rel = '/' + os.path.relpath(os.path.join(root, f), DIST).replace('index.html', '')
            pages[rel] = open(os.path.join(root, f), encoding='utf-8').read()

def alts(s):
    out = {}
    for m in re.finditer(r'<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"', s):
        out[m.group(1)] = urlparse(m.group(2)).path
    return out

errs = {'missing_alternates': [], 'target_missing': [], 'not_reciprocal': [], 'no_self': [], 'wrong_lang_attr': [], 'canonical_not_self': [], 'cross_lang_links': []}
checked = 0
for p, s in pages.items():
    if p.startswith('/404') or p == '/404.html':
        continue
    checked += 1
    a = alts(s)
    need = set(LANGS) | {'x-default'}
    if set(a) != need:
        errs['missing_alternates'].append((p, sorted(set(need) - set(a)), sorted(set(a) - need)))
        continue
    lang = re.match(r'^/(de|es|fr|it)/', p)
    lang = lang.group(1) if lang else 'en'
    if a.get(lang) != p:
        errs['no_self'].append((p, a.get(lang)))
    hl = re.search(r'<html lang="([^"]+)"', s)
    if not hl or hl.group(1) != lang:
        errs['wrong_lang_attr'].append((p, hl.group(1) if hl else None))
    can = re.search(r'<link rel="canonical" href="([^"]+)"', s)
    if not can or urlparse(can.group(1)).path != p:
        errs['canonical_not_self'].append((p, can.group(1) if can else None))
    if a['x-default'] != a['en']:
        errs['not_reciprocal'].append((p, 'x-default != en'))
    for l, tgt in a.items():
        if tgt not in pages:
            errs['target_missing'].append((p, l, tgt)); continue
        if alts(pages[tgt]) != a:
            errs['not_reciprocal'].append((p, l, tgt))
    if lang != 'en':
        for m in re.finditer(r'<a\b[^>]*>', s):
            hm = re.search(r'href="([^"]+)"', m.group(0))
            if not hm:
                continue
            h = html.unescape(hm.group(1))
            u = urlparse(h)
            if u.netloc and 'peptidelabtest.org' not in u.netloc:
                continue
            path = u.path
            if not path.startswith('/') or path.startswith('/llms') or path.startswith('/data/peptide-shop') or path.startswith('/favicon') or path.startswith('/downloads/') or re.search(r'\.(csv|json|svg|png|txt|xml)$', path):
                continue
            if 'hreflang=' in m.group(0):
                continue  # language switcher links
            if not path.startswith(f'/{lang}/'):
                errs['cross_lang_links'].append((p, h))
print(f'pages checked: {checked} (languages: {",".join(LANGS)})')
for k, v in errs.items():
    print(f'== {k}: {len(v)}')
    for x in v[:8]:
        print('   ', x)
