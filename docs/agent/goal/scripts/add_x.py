#!/usr/bin/env python3
"""Merge new UI strings into src/i18n/x/<lang>.json.
Usage: python3 add_x.py strings.json   where strings.json = {"<ns>": {"<key>": {"en": ..., "de": ..., "es": ..., "fr": ..., "it": ...}}}
Values may be strings, lists or dicts (plural objects); nested keys use dots ("a.b")."""
import json, sys
src = json.load(open(sys.argv[1]))
for lang in ['en', 'de', 'es', 'fr', 'it']:
    f = f'src/i18n/x/{lang}.json'
    raw = open(f).read(); d = json.loads(raw); n = 0
    for ns, keys in src.items():
        tgt = d.setdefault(ns, {})
        for k, per in keys.items():
            if lang not in per:
                raise SystemExit(f'missing {lang} for {ns}.{k}')
            cur = tgt
            parts = k.split('.')
            for p in parts[:-1]:
                cur = cur.setdefault(p, {})
            cur[parts[-1]] = per[lang]; n += 1
    open(f, 'w').write(json.dumps(d, ensure_ascii=False, indent=2) + ('\n' if raw.endswith('\n') else ''))
    print(lang, n)
