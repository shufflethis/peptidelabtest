#!/usr/bin/env python3
"""Smoke-check all new vendor reviews locally; add --live to check production."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import date
from html import unescape
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[2]
RESEARCH = ROOT / 'docs/agent/goal/research/r6'
ORIGIN = 'https://www.peptidelabtest.org'
LANGS = ('en', 'de', 'es', 'fr', 'it')
SLUGS = 'primal-peptides glowing-peptides fit-peptides drakon-peptides mizan-supply elyvera novacell-peptides bioboostx forge-performance-co pepup-performance'.split()


class ReviewHTML(HTMLParser):
    def __init__(self, content):
        super().__init__(convert_charrefs=True)
        self.lang = self.canonical = None
        self.alternates = {}
        self.hrefs = []
        self.h1 = []
        self.in_h1 = False
        self.feed(content)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html':
            self.lang = a.get('lang')
        if tag == 'h1':
            self.in_h1 = True
        if tag == 'link' and a.get('rel') == 'canonical':
            self.canonical = a.get('href')
        if tag == 'link' and a.get('rel') == 'alternate' and 'hreflang' in a:
            self.alternates[a['hreflang']] = a.get('href')
        if tag == 'a' and 'href' in a:
            self.hrefs.append(a['href'])

    def handle_endtag(self, tag):
        if tag == 'h1':
            self.in_h1 = False

    def handle_data(self, data):
        if self.in_h1:
            self.h1.append(data)


def url_for(slug, lang):
    return f'{ORIGIN}/{lang + "/" if lang != "en" else ""}vendors/{slug}/'


def get_page(path):
    url = ORIGIN + path
    if args.live:
        req = Request(url, headers={'User-Agent': 'PeptideLabIndex review verification'})
        with urlopen(req, timeout=18) as response:
            assert response.status == 200 and response.url == url, (url, response.status, response.url)
            return response.read().decode('utf-8')
    p = ROOT / 'dist' / path.strip('/')
    return (p / 'index.html' if path.endswith('/') else p).read_text(encoding='utf-8')


def check(job):
    slug, lang = job
    audit = json.loads((RESEARCH / f'{slug}.json').read_text(encoding='utf-8'))
    url = url_for(slug, lang)
    content = get_page(urlparse(url).path)
    p = ReviewHTML(content)
    assert p.lang == lang and p.canonical == url, (url, p.lang, p.canonical)
    assert f'property="article:modified_time" content="{audit["readAt"]}"' in content, url
    assert {l: p.alternates.get(l) for l in LANGS} == {l: url_for(slug, l) for l in LANGS}, url
    assert audit['name'].casefold() in ''.join(p.h1).casefold(), (url, p.h1)
    assert 'id="lab-reports"' in content and '"@type":"Review"' in content, url
    assert not any(urlparse(urljoin(url, h)).hostname in shop_hosts for h in p.hrefs), url
    if lang == 'en':
        # The page must carry this audit's actual verdict, not a stale placeholder.
        assert audit['verdict'] in unescape(content), url
    return url


def faq_answers(page):
    schemas = re.findall(r'<script type="application/ld\+json">(.*?)</script>', page, flags=re.S)
    faqs = next(d for s in schemas if (d := json.loads(s))['@type'] == 'FAQPage')
    return {q['name']: q['acceptedAnswer']['text'] for q in faqs['mainEntity']}


def check_evidence_rendering():
    us = get_page('/shops-by-country/usa/')
    us_table = re.search(r'<section\b[^>]*\bid="ship"[^>]*>.*?</section>', us, flags=re.S)
    assert us_table and '/vendors/bioboostx/' not in us_table.group(), 'No confirmed US shipping'
    at = get_page('/laws/austria/')
    assert all(f'href="/vendors/{s}/"' in at for s in ('drakon-peptides', 'elyvera')), 'Published EU scope applies to Austria'
    fit = json.loads((RESEARCH / 'i18n/fit-peptides.json').read_text())['de']['audit.fit-peptides.shipsTo']
    assert fit in unescape(get_page('/de/laws/netherlands/')), 'Fit country table must use German text'

    elyvera = get_page('/vendors/elyvera/')
    assert 'VAT' in faq_answers(elyvera)['How expensive is ELYVERA?'], 'FAQ JSON-LD must qualify pre-tax figure'
    section = elyvera.split('id="prices"', 1)[1].split('</section>', 1)[0]
    rows = re.findall(r'<tr\b[^>]*>.*?</tr>', section, flags=re.S)
    variant = next(r for r in rows if 'Triple Receptor Agonist 50 mg' in r)
    assert 'Yes, portal-verified' not in variant, 'No 50 mg report in this sample'

    primal = get_page('/vendors/primal-peptides/')
    brand = get_page('/brands/primal-peptides/')
    rank = re.search(r'Rank (\d+) of \d+', primal)
    assert rank and f'(rank {rank[1]})' in brand, 'Published ranks must agree'
    assert 'HPLC' not in faq_answers(primal)['Which labs test Primal Peptides products?']
    nova = get_page('/vendors/novacell-peptides/')
    assert re.search(r'>\s*99\.8\s*%', faq_answers(nova)['Which labs test NovaCell Peptides products?']), 'Keep the purity lower bound'
    for lang in LANGS:
        prefix = '' if lang == 'en' else f'/{lang}'
        checker = get_page(f'{prefix}/coa-checker/')
        payload = re.search(r'<script type="application/json" id="coa-data">(.*?)</script>', checker, flags=re.S)
        assert payload, f'{lang}: checker payload missing'
        report = next(r for r in json.loads(payload[1])['d'] if r['id'] == 'LYO-0975' and r['s'] == 'novacell-peptides')
        assert re.fullmatch(r'>\s*99[.,]8\s*%', report['pf']), (lang, report['pf'])
    synopsis = get_page('/llms-full.txt').split('### NovaCell Peptides ', 1)[1].split('\n### ', 1)[0]
    assert 'exact reported purity values:' in synopsis and '>99.8%' in synopsis
    footer = get_page('/').split('<footer', 1)[1]
    latest = max(date.fromisoformat(json.loads(f.read_text())['readAt']) for f in RESEARCH.glob('*.json'))
    assert f'Data last updated {latest.day} {latest:%b %Y}' in footer, 'Footer must reflect latest audit'

    comp = get_page('/compare/semax-vs-selank/')
    assert 'href="/vendors/elyvera/"' in comp, 'Catalog availability includes the pre-tax seller'
    prices = get_page('/prices/retatrutide/')
    eur_section = re.search(r'<section\b[^>]*\bid="prices-eur"[^>]*>.*?</section>', prices, flags=re.S)
    assert eur_section and 'href="/vendors/elyvera/"' not in eur_section.group(), 'No ELYVERA entry in the price table'
    data = json.loads(get_page('/data/peptide-shop-audit-2026.json'))
    dates = [r['reviewedAt'] for r in data['rows']]
    assert data['reviewCoverage'] == {'earliest': min(dates), 'latest': max(dates)}, 'Export coverage follows row dates'
    assert any(r['shopSlug'] == 'elyvera' and r.get('pricesExcludeVat') is True for r in data['rows']), 'Export qualifies pre-tax rows'
    print('Evidence checks passed: shipping, localization, VAT, report variants, rank, purity and data dates')


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--live', action='store_true')
args = parser.parse_args()
shop_hosts = set()
for slug in SLUGS:
    audit = json.loads((RESEARCH / f'{slug}.json').read_text(encoding='utf-8'))
    host = urlparse(audit['shopUrl']).hostname.removeprefix('www.')
    shop_hosts.update({host, f'www.{host}'})
with ThreadPoolExecutor(max_workers=8) as pool:
    checked = list(pool.map(check, ((slug, lang) for slug in SLUGS for lang in LANGS)))
assert len(set(checked)) == len(SLUGS) * len(LANGS)
print(f'{len(checked)} pages verified ({"production" if args.live else "local"}): H1, language, canonical, hreflang and no outbound to the audited shops')
check_evidence_rendering()
