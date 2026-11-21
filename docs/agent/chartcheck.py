#!/usr/bin/env python3
"""M5: every money page must render at least one data chart (element with data-chart=...).
Usage: python3 docs/agent/chartcheck.py [dist]"""
import os, re, sys

DIST = sys.argv[1] if len(sys.argv) > 1 else 'dist'
MONEY = re.compile(r'^/(prices|vendors|compare|labs|blends|calculator|brands|shops-by-country|compounds)/.+|^/(trusted-peptide-vendors|discount-codes|batch-tracker|price-index|code-names|coa-red-flags|badge|prices|vendors|blends|labs|compare)/$|^/$')
miss, ok = [], 0
for root, _, fs in os.walk(DIST):
    for f in fs:
        if f != 'index.html':
            continue
        rel = '/' + os.path.relpath(os.path.join(root, f), DIST).replace('index.html', '')
        base = re.sub(r'^/(de|es|fr|it)/', '/', rel)
        if base in ('/de/', '/es/', '/fr/', '/it/'):
            base = '/'
        if not MONEY.match(base):
            continue
        s = open(os.path.join(root, f), encoding='utf-8').read()
        if 'data-chart=' in s:
            ok += 1
        else:
            miss.append(rel)
en_miss = sorted(m for m in miss if not re.match(r'^/(de|es|fr|it)/', m))
print(f'money pages with chart: {ok}, without: {len(miss)} (en: {len(en_miss)})')
for m in en_miss:
    print('   ', m)
sys.exit(1 if miss else 0)
