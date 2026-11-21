#!/usr/bin/env python3
"""Merge the sourced re-audit JSON (pep-reaudit/r1-r4.json) into src/data/audit.json.

Every value comes from the audit files; nothing is invented. Run from the repo root:
  python3 scripts/build-audit-data.py ~/.hermes/cache/scratch/pep-reaudit [blends.json]
Local backup of r1-r4: .research-backup/ (gitignored). Blend products (GOAL M3) come from
docs/agent/goal/research/blends.json (read-only research, sources per row) and are attached to
each shop as blendProducts / blendReports with pricePerMg = (salePrice or price) / totalMg.
"""
import json, sys, os, statistics

SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser('~/.hermes/cache/scratch/pep-reaudit')
WEIGHTS = {'labVerification': .30, 'fillAccuracy': .20, 'panelDepth': .20,
           'entityTransparency': .15, 'dispatchReliability': .10, 'valuePerMg': .05}
PANEL_LABELS = {'hplc': 'HPLC purity', 'lcms': 'LC-MS identity', 'identity': 'Identity',
                'mass': 'Measured mg', 'endotoxin': 'Endotoxin', 'sterility': 'Sterility',
                'heavyMetals': 'Heavy metals'}

vendors = []
for f in ['r1', 'r2', 'r3', 'r4']:
    vendors += json.load(open(os.path.join(SRC, f + '.json')))

def overall(s):
    w = {k: v for k, v in WEIGHTS.items() if not (k == 'valuePerMg' and s.get(k, -1) < 0)}
    tot = sum(w.values())
    raw = sum(s[k] * w[k] for k in w) / tot  # 0-10
    return round(raw / 2, 1)                 # 0-5

out = []
for v in vendors:
    s = v['subscores']
    coas = v.get('coaExamples') or []
    measured = [c for c in coas if c.get('measuredMg') and c.get('labelMg')]
    purities = [c['purityPercent'] for c in coas if c.get('purityPercent')]
    fills = [round(100 * c['measuredMg'] / c['labelMg'], 1) for c in measured]
    v['overallScore'] = overall(s)
    v['coaStats'] = {
        'opened': len(coas),
        'portalVerified': sum(1 for c in coas if c.get('verifiable')),
        'purityMin': min(purities) if purities else None,
        'purityMax': max(purities) if purities else None,
        'purityMedian': round(statistics.median(purities), 2) if purities else None,
        'fillMinPct': min(fills) if fills else None,
        'fillMaxPct': max(fills) if fills else None,
    }
    v['panelLabels'] = [PANEL_LABELS[k] for k, on in (v.get('panels') or {}).items() if on and k in PANEL_LABELS]
    for p in v.get('products') or []:
        p['pricePerMg'] = round((p['salePrice'] or p['price']) / p['vialMg'], 3) if p.get('price') and p.get('vialMg') else None
    out.append(v)

BLENDS = sys.argv[2] if len(sys.argv) > 2 else 'docs/agent/goal/research/blends.json'
if os.path.exists(BLENDS):
    bj = json.load(open(BLENDS))
    slugs = {v['slug'] for v in out}
    for p in bj['products'] + bj['reports']:
        assert p['shop'] in slugs, f"unknown shop in blends: {p['shop']}"
        assert p['blend'] in bj['blends'], f"unknown blend: {p['blend']}"
    for p in bj['products']:
        if p.get('composition'):
            assert abs(sum(p['composition'].values()) - p['totalMg']) < 0.01, f"composition != total: {p['shopProductName']}"
            assert set(p['composition']) == set(bj['blends'][p['blend']]['components']), f"components: {p['shopProductName']}"
        price = p['salePrice'] if p.get('salePrice') is not None else p.get('price')
        p['pricePerMg'] = round(price / p['totalMg'], 3) if price and p.get('totalMg') else None
    for v in out:
        v['blendProducts'] = [{k: x for k, x in p.items() if k != 'shop'} for p in bj['products'] if p['shop'] == v['slug']]
        v['blendReports'] = [{k: x for k, x in r.items() if k != 'shop'} for r in bj['reports'] if r['shop'] == v['slug']]

out.sort(key=lambda x: -x['overallScore'])
for i, v in enumerate(out, 1):
    v['rank'] = i
json.dump(out, open('src/data/audit.json', 'w'), indent=1, ensure_ascii=False)
for v in out:
    print(f"{v['rank']:>2} {v['overallScore']:.1f} {v['slug']:<26} coas {v['coaStats']['opened']} portal {v['coaStats']['portalVerified']} prods {len(v.get('products') or [])}")
