#!/usr/bin/env python3
"""Validate and merge the four localized versions of the R7 vendor reviews."""
import json
import re
from collections import Counter
from decimal import Decimal
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'docs/agent/goal/research/r7'
DEST = ROOT / 'src/i18n/data'
LANGS = ('de', 'es', 'fr', 'it')
SLUGS = set('ion-peptide simple-peptide'.split())
INVARIANT_NAMES = {'US-only'}  # shipsTo tokens are localized in shipsToText()


def load(path):
    return json.loads(path.read_text(encoding='utf-8'))


def numbers(s):
    # Do not treat dots/commas as grouping separators in results such as 98.228%.
    return Counter(Decimal(m.replace(',', '.')) for m in re.findall(r'\d+(?:[.,]\d+)?', s))


def flatten(d, prefix=''):
    for k, v in (d.items() if isinstance(d, dict) else enumerate(d)):
        key = f'{prefix}.{k}' if prefix else str(k)
        if isinstance(v, (list, dict)):
            yield from flatten(v, key)
        elif isinstance(v, str):
            yield key, v


assert {f.stem for f in SOURCE.glob('*.json')} == SLUGS
assert {f.stem for f in (SOURCE / 'i18n').glob('*.json')} == SLUGS
translated = {lang: {} for lang in LANGS}
for slug in sorted(SLUGS):
    audit = load(SOURCE / f'{slug}.json')
    assert audit['slug'] == slug and audit.get('auditEvidence'), slug
    raw = dict(flatten(audit, f'audit.{slug}'))
    group = load(SOURCE / 'i18n' / f'{slug}.json')
    assert set(group) == set(LANGS), slug
    required = {
        key for key, value in raw.items()
        if key.split('.')[2] in {'verdict', 'summary', 'legalEntity', 'coaAccess', 'shipsTo', 'dispatchInfo', 'freeShippingThreshold', 'strengths', 'weaknesses', 'subscore_reasons'}
        and not key.startswith(f'audit.{slug}.shipsTo.')  # Country codes and scopes are localized in shipsToText().
        and value not in INVARIANT_NAMES | {'not published'}
    }
    for lang, entries in group.items():
        assert entries.keys() == group['de'].keys(), (slug, lang, 'inconsistent locale keys')
        assert required <= entries.keys() <= raw.keys(), (slug, lang, 'missing', required - entries.keys(), 'unknown', entries.keys() - raw.keys())
        for key, value in entries.items():
            assert value.strip(), (lang, key, 'empty')
            assert numbers(raw[key]) == numbers(value), (lang, key, numbers(raw[key]), numbers(value))
        translated[lang].update(entries)
for lang in LANGS:
    path = DEST / f'{lang}.json'
    data = load(path)
    data.update(translated[lang])
    result = json.dumps(data, indent=1, ensure_ascii=False) + '\n'
    if path.read_text(encoding='utf-8') != result:
        path.write_text(result, encoding='utf-8')
    print(f'{lang}: {len(translated[lang])} keys across {len(SLUGS)} shops')
