#!/usr/bin/env python3
"""Check src/i18n/x/<lang>.json against en.json: same keys, same {placeholders}, same number multiset per string.
Usage: python3 docs/agent/xcheck.py [suffix]   (suffix '.tmp' checks <lang>.tmp.json)"""
import json, re, sys, os
from collections import Counter
D = os.path.join(os.path.dirname(__file__), '..', '..', 'src', 'i18n', 'x')
suf = sys.argv[1] if len(sys.argv) > 1 else ''
en = json.load(open(os.path.join(D, 'en.json')))
def flat(o, p=''):
    if isinstance(o, dict):
        for k, v in o.items(): yield from flat(v, f'{p}.{k}' if p else k)
    elif isinstance(o, list):
        for i, v in enumerate(o): yield from flat(v, f'{p}.{i}')
    else: yield p, o
E = dict(flat(en)); bad = 0
for lang in ['de', 'es', 'fr', 'it']:
    f = os.path.join(D, f'{lang}{suf}.json')
    if not os.path.exists(f): print(lang, 'missing'); continue
    X = dict(flat(json.load(open(f))))
    miss = sorted(set(E) - set(X)); extra = sorted(set(X) - set(E))
    # list-valued title/description candidates may differ in length: compare only first-level presence
    miss = [k for k in miss if not re.search(r'\.(title|description)\.\d+$', k)]
    extra = [k for k in extra if not re.search(r'\.(title|description)\.\d+$', k)]
    if miss or extra: bad += 1; print(lang, 'missing', miss[:20], 'extra', extra[:20])
    for k, v in X.items():
        if k not in E or not isinstance(v, str): continue
        e = E[k]
        ph = lambda s: Counter(re.findall(r'\{\w+\}', re.sub(r'\{(\w+)\|(?:[^{}]|\{\w+\})*\}', r'{\1}', s)))  # inline plural {n|one|other} = {n}
        if re.search(r'\.(title|description)\.\d+$', k):
            base = re.sub(r'\.\d+$', '', k)
            allowed = set().union(*[set(ph(x)) for kk, x in E.items() if re.sub(r'\.\d+$', '', kk) == base and isinstance(x, str)])
            if not set(ph(v)) <= allowed: bad += 1; print(lang, k, 'unknown placeholders', set(ph(v)) - allowed)
            continue
        if ph(e) != ph(v): bad += 1; print(lang, k, 'placeholders', dict(ph(e)), dict(ph(v)))
        nm = lambda s: Counter(re.findall(r'\d+(?:[.,]\d+)?', re.sub(r'\{\w+\}', '', s)))
        if nm(e) != nm(v): bad += 1; print(lang, k, 'numbers', dict(nm(e)), dict(nm(v)))
    print(lang, 'keys', len(X))
print('problems', bad)
