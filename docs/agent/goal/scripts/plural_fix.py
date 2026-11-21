#!/usr/bin/env python3
"""Apply inline-plural rewrites {var|one|other} to i18n strings. Usage: python3 plural_fix.py <rules.json>
rules: {lang: [[file('m'|'x'), keypath, old, new], ...]}"""
import json, sys
rules = json.load(open(sys.argv[1]))
def getp(d, path):
    ks = path.split('.'); cur = d
    for k in ks[:-1]: cur = cur[int(k)] if isinstance(cur, list) else cur[k]
    return cur, (int(ks[-1]) if isinstance(cur, list) else ks[-1])
for l, items in rules.items():
    for fk in ['m', 'x']:
        f = f'src/i18n/{l}.json' if fk == 'm' else f'src/i18n/x/{l}.json'
        raw = open(f).read(); d = json.loads(raw); n = 0
        for ff, path, a, b in items:
            if ff != fk: continue
            c, k = getp(d, path); s = c[k]
            if a not in s: print('MISSING', l, path, a); continue
            c[k] = s.replace(a, b); n += 1
        open(f, 'w').write(json.dumps(d, ensure_ascii=False, indent=2) + ('\n' if raw.endswith('\n') else ''))
        print(l, fk, n)
