#!/usr/bin/env python3
"""Append one research batch (docs/agent/goal/research/<batch>/*.json) to the committed src/data/audit.json.

Same scoring, coaStats, panelLabels and pricePerMg logic as scripts/build-audit-data.py, but existing entries are
left byte-for-byte untouched except their rank. Use this instead of a full rebuild when the r1-r4 backup does not
reproduce the committed scores exactly (2026-11-24: a full rebuild scores real-peptides 3.1 instead of the
published 3.0; not reproducible from the backup, cause not established). Idempotent: shops of the batch are replaced on re-run.
  python3 scripts/add-audit-batch.py r7
"""
import glob, json, statistics, sys

BATCH = sys.argv[1] if len(sys.argv) > 1 else 'r7'
WEIGHTS = {'labVerification': .30, 'fillAccuracy': .20, 'panelDepth': .20,
           'entityTransparency': .15, 'dispatchReliability': .10, 'valuePerMg': .05}
PANEL_LABELS = {'hplc': 'HPLC purity', 'lcms': 'LC-MS identity', 'identity': 'Identity',
                'mass': 'Measured mg', 'endotoxin': 'Endotoxin', 'sterility': 'Sterility',
                'heavyMetals': 'Heavy metals'}


def overall(s):
    w = {k: v for k, v in WEIGHTS.items() if not (k == 'valuePerMg' and s.get(k, -1) < 0)}
    return round(sum(s[k] * w[k] for k in w) / sum(w.values()) / 2, 1)


audit = json.load(open('src/data/audit.json'))
new = []
for f in sorted(glob.glob(f'docs/agent/goal/research/{BATCH}/*.json')):
    v = json.load(open(f))
    assert v.get('sources') and v.get('subscores') and v.get('auditEvidence'), f
    v.pop('auditEvidence')
    coas = v.get('coaExamples') or []
    measured = [c for c in coas if c.get('measuredMg') and c.get('labelMg')]
    purities = [c['purityPercent'] for c in coas if c.get('purityPercent')]
    fills = [round(100 * c['measuredMg'] / c['labelMg'], 1) for c in measured]
    v['overallScore'] = overall(v['subscores'])
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
    v.setdefault('blendProducts', [])
    v.setdefault('blendReports', [])
    new.append(v)

slugs = {v['slug'] for v in new}
out = [v for v in audit if v['slug'] not in slugs] + new
out.sort(key=lambda x: -x['overallScore'])  # stable: existing order kept within equal scores
for i, v in enumerate(out, 1):
    v['rank'] = i
json.dump(out, open('src/data/audit.json', 'w'), indent=1, ensure_ascii=False)
for v in new:
    print(f"{v['rank']:>2} {v['overallScore']:.1f} {v['slug']:<20} coas {v['coaStats']['opened']} portal {v['coaStats']['portalVerified']} fill {v['coaStats']['fillMinPct']}-{v['coaStats']['fillMaxPct']} prods {len(v['products'])}")
