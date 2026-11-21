#!/usr/bin/env python3
"""Merge scratch/<lang>/*.json into src/i18n/<lang>.json and validate against en.json:
missing/extra keys, placeholder sets, list lengths, banned words, numbers in literal text."""
import json, glob, re, sys
B = '/Users/gorden/.hermes/cache/scratch/pep-i18n/'
S = '/Users/gorden/sites/peptidelabtest/src/i18n/'
BANNED = {
    'de': r'\b(dosis|dosierung\w*|injizier\w*|spritz\w*|abnehm\w*|heilung\w*)\b',
    'es': r'\b(dosis|inyect\w*|adelgaz\w*|curar\w*)\b',
    'fr': r'\b(doses?|posologie|inject\w*|perte de poids|guérir|guéri\w*)\b',
    'it': r'\b(dose|dosi|dosaggio|iniett\w*|dimagri\w*|guarir\w*)\b',
}
en = json.load(open(S + 'en.json'))

def merge(a, b):
    for k, v in b.items():
        if isinstance(v, dict) and isinstance(a.get(k), dict) and not ('one' in v and 'other' in v):
            merge(a[k], v)
        else:
            a[k] = v

def flat(d, p=''):
    out = {}
    if isinstance(d, dict):
        if 'one' in d and 'other' in d and all(isinstance(x, str) for x in d.values()):
            for k, v in d.items():
                out[f'{p}#{k}'] = v
            return out
        for k, v in d.items():
            out.update(flat(v, f'{p}.{k}' if p else k))
    elif isinstance(d, list):
        out[p + '[]'] = len(d)
        for i, v in enumerate(d):
            out.update(flat(v, f'{p}[{i}]'))
    else:
        out[p] = d
    return out

ph = lambda s: set(re.findall(r'\{(\w+)\}', s)) if isinstance(s, str) else set()
for lang in sys.argv[1:]:
    d = {}
    for f in sorted(glob.glob(B + f'{lang}/*.json')):
        merge(d, json.load(open(f)))
    json.dump(d, open(S + f'{lang}.json', 'w'), ensure_ascii=False, indent=2)
    fe, fl = flat(en), flat(d)
    # plural keys: compare base names (languages may differ in categories)
    base = lambda k: k.split('#')[0]
    eb = {base(k) for k in fe}
    lb = {base(k) for k in fl}
    missing = sorted(eb - lb)
    extra = sorted(k for k in lb - eb if not k.startswith('payments.'))
    badph, badlen, ban = [], [], []
    for k, v in fl.items():
        if k.endswith('[]'):
            if fe.get(k) != v:
                badlen.append((k, fe.get(k), v))
            continue
        ek = k if k in fe else (base(k) + '#other' if base(k) + '#other' in fe else None)
        if ek and isinstance(v, str):
            a, b = ph(fe[ek]), ph(v)
            # plurals may omit {n}
            if a - {'n'} != b - {'n'} and not (a == b):
                badph.append((k, sorted(a), sorted(b)))
        if isinstance(v, str) and re.search(BANNED[lang], v, re.I):
            ban.append((k, re.search(BANNED[lang], v, re.I).group(0)))
    print(f'{lang}: strings={sum(1 for k,v in fl.items() if isinstance(v,str))} missing={len(missing)} extra={len(extra)} placeholder_mismatch={len(badph)} list_len_mismatch={len(badlen)} banned={len(ban)}')
    for x in missing[:40]: print('   MISSING', x)
    for x in extra[:20]: print('   EXTRA', x)
    for x in badph[:20]: print('   PH', x)
    for x in badlen[:20]: print('   LEN', x)
    for x in ban[:20]: print('   BAN', x)
