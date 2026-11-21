#!/usr/bin/env python3
"""M5 verification over dist/. Usage: python3 verify.py /path/to/dist"""
import os, re, sys, json, html
from urllib.parse import urlparse

DIST = sys.argv[1] if len(sys.argv) > 1 else 'dist'
sys.path.insert(0, os.path.dirname(__file__))
audit = json.load(open(os.path.join(DIST, '..', 'src', 'data', 'audit.json')))
shop_hosts = set()
for v in audit:
    for u in [v.get('shopUrl') or ''] + [p.get('url') or '' for p in v.get('products') or []]:
        h = urlparse(u).netloc.lower().replace('www.', '')
        if h:
            shop_hosts.add(h)
lab_hosts = set()
for v in audit:
    for c in v.get('coaExamples') or []:
        h = urlparse(c.get('url') or '').netloc.lower().replace('www.', '')
        if h and h not in shop_hosts:
            lab_hosts.add(h)
lab_hosts |= {'janoshik.com', 'verify.janoshik.com', 'public.janoshik.com', 'ils-lab.com', 'portal.ils-lab.com', 'freedomdiagnosticstesting.com',
              'koveralabs.com', 'liquilabs.cz', 'base.liquilabs.cz', 'mzbiolabs.com', 'trustpointeanalytics.com', 'trustpointelims.com', 'verifiedbyvanguard.com'}

EMOJI = re.compile('[\U0001F300-\U0001FAFF\U00002600-\U000027BF\U0001F1E6-\U0001F1FF\u2B50\u2B06\u2194-\u21AA\u2705\u274C\u2714\u2716\u2728\u2733\u2734\u2744\u2747\u2757\u2764\uFE0F\u2605\u2606]')
WORDS = re.compile(r'\b(dose|doses|dosing|dosage|inject\w*|subcutaneous|reconstitut\w*|bac water|bacteriostatic|weight loss|fat loss|healing|cure|cures|treat|treats|treatment)\b', re.I)
# Banned terms per language (checked on pages of that language; DE/ES/FR/IT added for the i18n build)
WORDS_L = {
    'de': re.compile(r'\b(dosis|dosierung\w*|injizier\w*|spritz\w*|abnehm\w*|heilung\w*)\b', re.I),
    'es': re.compile(r'\b(dosis|inyect\w*|adelgaz\w*|curar\w*)\b', re.I),
    'fr': re.compile(r'\b(doses?|posologie|inject\w*|perte de poids|guérir|guéri\w*)\b', re.I),
    'it': re.compile(r'\b(dose|dosi|dosaggio|iniett\w*|dimagri\w*|guarir\w*)\b', re.I),
}

files = []
for root, _, fs in os.walk(DIST):
    for f in fs:
        if f.endswith('.html'):
            files.append(os.path.join(root, f))
files.sort()

def visible(s):
    s = re.sub(r'<script\b.*?</script>', ' ', s, flags=re.S | re.I)
    s = re.sub(r'<style\b.*?</style>', ' ', s, flags=re.S | re.I)
    s = re.sub(r'<head\b.*?</head>', ' ', s, flags=re.S | re.I)
    s = re.sub(r'<[^>]+>', ' ', s)
    return html.unescape(re.sub(r'\s+', ' ', s))

res = {k: [] for k in ['unsponsored_shop_links', 'lab_links', 'emoji', 'words', 'calc_banned', 'code_leak', 'undefined_nan', 'licensed', 'long_title', 'long_desc', 'desc_outside_130_155', 'no_canonical', 'no_breadcrumb', 'dup_title', 'og_image_missing']}
# M7: calculator pages may say 'reconstitution' in the title, but never dose/units/IU/syringe/inject (any language)
CALC_BAN = re.compile(r'\b(dose|doses|dosing|dosage|units?|syringes?|inject\w*|Dosis|Dosierung\w*|Einheiten|Spritze\w*|injizier\w*|dosis|unidades|jeringas?|inyect\w*|posologie|unités|seringues?|dosaggio|dosi|unità|siringh?\w*|iniett\w*)\b|\bIU\b', re.I)
CALC_IU = re.compile(r'\bIU\b')
titles = {}
for f in files:
    rel = '/' + os.path.relpath(f, DIST).replace('index.html', '')
    s = open(f, encoding='utf-8').read()
    for m in re.finditer(r'<a\b[^>]*>', s, flags=re.I):
        tag = m.group(0)
        hm = re.search(r'href="([^"]+)"', tag)
        if not hm:
            continue
        href = html.unescape(hm.group(1))
        if not href.startswith('http'):
            continue
        host = urlparse(href).netloc.lower().replace('www.', '')
        if host in ('peptidelabtest.org',):
            continue
        rel_attr = (re.search(r'rel="([^"]*)"', tag) or [None, ''])[1]
        if host in lab_hosts:
            res['lab_links'].append((rel, href))
        elif 'sponsored' not in rel_attr:
            res['unsponsored_shop_links'].append((rel, href))
    vis = visible(s)
    if EMOJI.search(s):
        res['emoji'].append((rel, EMOJI.findall(s)[:5]))
    lang_m = re.match(r'^/(de|es|fr|it)/', rel)
    lang = lang_m.group(1) if lang_m else 'en'
    base_rel = re.sub(r'^/(de|es|fr|it)/', '/', rel)
    if lang != 'en':
        for w in WORDS_L[lang].finditer(vis):
            ctx = vis[max(0, w.start() - 60): w.end() + 60]
            res['words'].append((rel, w.group(0), ctx))
    for w in WORDS.finditer(vis):
        pre = vis[max(0, w.start() - 25): w.start()].lower()
        if re.search(r'\bno\b[^.]{0,20}$', pre) or 'no dosing' in pre:
            continue  # disclaimer ("no dosing or health information")
        ctx = vis[max(0, w.start() - 60): w.end() + 60]
        res['words'].append((rel, w.group(0), ctx))
    for code, own in (('AFF-45MPJVHZ', '/vendors/peptides-eu/'), ('toplist', '/vendors/ghostlabz-research/')):
        if code in vis and base_rel != own:
            res['code_leak'].append((rel, code))
    if re.search(r'\bundefined\b|\bNaN\b', vis):
        res['undefined_nan'].append((rel, re.findall(r'.{40}(?:undefined|NaN).{20}', vis)[:2]))
    if 'licensed-peptides' in s or 'Licensed Peptides' in s:
        res['licensed'].append(rel)
    if base_rel.startswith('/calculator/'):
        title_txt = (re.search(r'<title>(.*?)</title>', s, flags=re.S) or [None, ''])[1]
        for w in CALC_BAN.finditer(vis + ' ' + html.unescape(title_txt)):
            if w.group(0).lower() == 'iu' and w.group(0) != 'IU':
                continue
            pre = (vis + ' ' + title_txt)[max(0, w.start() - 30): w.start()]
            if re.search(r'\b(no|keine?[nr]?|sin|ni|aucune?|nessun\w*|non|ohne|sans|senza)\b[^.]{0,25}$', pre, re.I):
                continue  # disclaimer such as "no dosing or health information"

            res['calc_banned'].append((rel, w.group(0)))
    ogm = re.search(r'property="og:image" content="https://www\.peptidelabtest\.org(/og/[^"]+)"', s)
    if not ogm or not os.path.exists(os.path.join(DIST, ogm.group(1).lstrip('/'))):
        res['og_image_missing'].append(rel)
    t = re.search(r'<title>(.*?)</title>', s, flags=re.S)
    t = html.unescape(t.group(1)) if t else ''
    d = re.search(r'<meta name="description" content="([^"]*)"', s)
    d = html.unescape(d.group(1)) if d else ''
    if len(t) > 60:
        res['long_title'].append((rel, len(t), t))
    if len(d) > 160:
        res['long_desc'].append((rel, len(d)))
    if not (130 <= len(d) <= 155) and '404' not in rel:
        res['desc_outside_130_155'].append((rel, len(d)))
    if 'rel="canonical"' not in s:
        res['no_canonical'].append(rel)
    if base_rel != '/' and '404' not in rel and 'BreadcrumbList' not in s:
        res['no_breadcrumb'].append(rel)
    titles.setdefault(t, []).append(rel)
res['dup_title'] = [(t, p) for t, p in titles.items() if len(p) > 1]

# text endpoints (+ M5/M6 files: price index CSV, video sitemap, badges)
extra = ['price-index/peptide-price-index.csv', 'sitemap-video.xml'] + ['badge/' + x for x in sorted(os.listdir(os.path.join(DIST, 'badge'))) if x.endswith('.svg')]
for f in ['llms.txt', 'llms-full.txt', 'data/peptide-shop-audit-2026.csv', 'data/peptide-shop-audit-2026.json'] + extra:
    s = open(os.path.join(DIST, f), encoding='utf-8').read()
    if 'licensed-peptides' in s or 'Licensed Peptides' in s:
        res['licensed'].append(f)
    if EMOJI.search(s):
        res['emoji'].append((f, 'endpoint'))
    if re.search(r'\bundefined\b|\bNaN\b', s):
        res['undefined_nan'].append((f, 'endpoint'))

print('HTML pages:', len(files))
by = {}
for f in files:
    m = re.match(r'^(de|es|fr|it)' + re.escape(os.sep), os.path.relpath(f, DIST))
    by[m.group(1) if m else 'en'] = by.get(m.group(1) if m else 'en', 0) + 1
print('pages per language:', by)
for k, v in res.items():
    print(f'== {k}: {len(v)}')
    for x in v[: (40 if k == 'words' else 12)]:
        print('   ', x)

# M7: one entry point for every check (python3 docs/agent/verify.py dist --all)
if '--all' in sys.argv:
    import subprocess
    here = os.path.dirname(os.path.abspath(__file__))
    runs = [['hreflang_check.py', DIST], ['chartcheck.py', DIST], ['pluralcheck.py', DIST], ['linkgraph.py', DIST], ['keyleak.py', DIST], ['xcheck.py']] + [['numcheck.py', DIST, l] for l in ('de', 'es', 'fr', 'it')]
    print('== sub-checks')
    for r in runs:
        p = subprocess.run([sys.executable, os.path.join(here, r[0])] + r[1:], capture_output=True, text=True)
        tail = [x for x in p.stdout.strip().splitlines() if x.strip()][-3:]
        print(f'   {" ".join(r[:1] + r[2:])}: exit {p.returncode} | ' + ' / '.join(x.strip() for x in tail))
    vs = open(os.path.join(DIST, 'sitemap-video.xml')).read()
    print('   video sitemap entries:', vs.count('<video:video>'), '| mp4 exists:', os.path.exists(os.path.join(DIST, 'video', 'coa-verified.mp4')))
