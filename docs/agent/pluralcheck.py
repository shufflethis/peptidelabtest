#!/usr/bin/env python3
"""Find '1 <plural noun>' in visible text + meta content of dist pages, all 5 languages.
Usage: python3 docs/agent/pluralcheck.py [dist]"""
import re, html, glob, sys, collections
DIST = sys.argv[1] if len(sys.argv) > 1 else 'dist'
NOUNS = ('shops|sites|reports|brands|countries|products|labs|listings|offers|vials|sizes|websites|'
         'Shops|Websites|Berichte|Laborberichte|Marken|Länder|Produkte|Angebote|Labore|'
         'tiendas|webs|informes|marcas|países|productos|ofertas|laboratorios|'
         'boutiques|rapports|marques|pays|produits|offres|laboratoires|'
         'negozi|siti|referti|marchi|paesi|prodotti|offerte|laboratori')
RX = re.compile(r'(?<![\d.,/\-–])\b1 (?:[A-Za-z][\w+-]* )?(' + NOUNS + r')\b')
c, ex = collections.Counter(), {}
for f in glob.glob(f'{DIST}/**/index.html', recursive=True):
    s = open(f, encoding='utf-8').read()
    s = re.sub(r'<script.*?</script>|<style.*?</style>', '', s, flags=re.S)
    metas = ' '.join(re.findall(r'<meta [^>]*content="([^"]*)"', s))
    s = re.sub(r'</?(?:td|th|tr|li|p|div|h[1-6]|figcaption|dt|dd|section|ol|ul|table|button|summary)\b[^>]*>', ' \u00a6 ', s)  # block boundary
    v = html.unescape(re.sub(r'<[^>]+>', ' ', s)) + ' \u00a6 ' + html.unescape(metas)
    v = re.sub(r'\s+', ' ', v)
    for m in RX.finditer(v):
        k = m.group(0)
        c[k] += 1
        ex.setdefault(k, (f[len(DIST):], v[max(0, m.start() - 70): m.end() + 25]))
print('plural problems:', sum(c.values()))
for k, n in c.most_common():
    print(f'   {n} x "{k}"', ex[k])
sys.exit(1 if c else 0)
