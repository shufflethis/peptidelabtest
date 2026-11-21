#!/usr/bin/env python3
"""M5: insert data charts into views that had none (one-off edit script, idempotent via marker check)."""
import re, sys
V = 'src/views/'

def edit(name, imports, anchor, block, mode='before', consts=''):
    f = V + name + '.astro'
    s = open(f).read()
    if 'M5chart' in s:
        print('skip', name); return
    head_end = s.index('\n---', 3)
    head = s[:head_end]
    for imp in imports:
        if imp not in head:
            head = head.replace('\n', '\n' + imp + '\n', 1) if head.startswith('---') else head
    if consts:
        head = head + '\n' + consts
    s = head + s[head_end:]
    if anchor not in s:
        print('ANCHOR MISSING', name, anchor); sys.exit(1)
    blk = '{/* M5chart */}\n' + block
    if mode == 'before':
        s = s.replace(anchor, blk + '\n' + anchor, 1)
    else:
        s = s.replace(anchor, anchor + '\n' + blk, 1)
    open(f, 'w').write(s)
    print('ok', name)

SC = "import ScoreChart from '../components/ScoreChart.astro';"
VC = "import VerifyChart from '../components/VerifyChart.astro';"
BL = "import BarList from '../components/BarList.astro';"
FC = "import FillChart from '../components/FillChart.astro';"
CH = "import { verifyByLab, verifyByShop, verifyTotal } from '../lib/charts';"
TN = "import { t as tM5, tn as tnM5 } from '../i18n';"

# Rankings (/vendors/, /vendors/europe/, /vendors/usa/)
edit('VendorsRanking', [SC, VC, CH], '    <FAQ ',
     '    <section class="grid gap-6 xl:grid-cols-2">\n'
     '      <ScoreChart vendors={all} />\n'
     '      <VerifyChart rows={verifyByShop(all, L)} title={t(lang, \'m5.verifyTitleShop\')} note={t(lang, \'m5.verifyNote\', { none: noReports })} />\n'
     '    </section>')
# Shop-vs-shop index
edit('VendorsCompareIndex', [SC, "import { PARTNERS } from '../lib/site';"], '  </div>\n</BaseLayout>',
     '    <div class="mt-10"><ScoreChart vendors={PARTNERS} title={t(lang, \'m5.partnerScoreTitle\')} /></div>')
# Country pages
edit('ShopsByCountry', [SC], '    <FAQ ',
     '    {(D.based.length > 0 || D.ship.length > 0) && <ScoreChart vendors={D.based.length ? D.based : D.ship} title={D.based.length ? t(lang, \'m5.countryBasedTitle\', { country: cname }) : t(lang, \'m5.countryShipTitle\', { country: cname })} />}')
edit('ShopsByCountryIndex', [BL], '    <RelatedLinks ',
     '    <BarList title={t(lang, \'m5.countryIndexTitle\', { total: V.total })} rows={rows.map((r) => ({ label: r.name, value: r.d.ship.length, display: t(lang, \'m5.basedShip\', { b: r.d.based.length, s: r.d.ship.length }), accent: true, href: L(`/shops-by-country/${r.c.slug}/`) }))} note={t(lang, \'m5.countryIndexNote\')} />')
# Prices index
edit('PricesIndex', [BL], '    <FAQ ',
     '    <BarList title={t(lang, \'m5.shopsPerCompound\')} rows={rows.map((r) => ({ label: r.name, value: r.shops, display: tn(lang, \'common.shops\', r.shops), accent: true, href: L(`/prices/${r.slug}/`) }))} />')
# Labs index
edit('LabsIndex', [VC, CH], '    <FAQ ',
     '    <VerifyChart rows={verifyByLab(L)} title={t(lang, \'m5.verifyTitleLab\')} />')
# Discount codes
edit('DiscountCodes', [SC], '    <FAQ ',
     '    <ScoreChart vendors={PARTNERS} title={t(lang, \'m5.partnerScoreTitle\')} />')
# Compound compare index
edit('CompareIndex', [BL], '  </div>\n</BaseLayout>',
     '    <div class="mt-10"><BarList title={t(lang, \'m5.bothTitle\')} rows={rows.map((r) => ({ label: `${compoundShort(r.a)} vs ${compoundShort(r.b)}`, value: r.both, display: t(lang, \'m5.bothDisplay\', { n: r.both }), accent: true, href: L(`/compare/${pairSlug(r.a, r.b)}/`) }))} /></div>')
# Code names
edit('CodeNames', [BL], '    <section class="prose-read" id="fda">',
     '    <BarList title={t(lang, \'m5.codeTitle\')} rows={[...CODE_NAMES].sort((a, b) => b.shops.length - a.shops.length).map((r) => ({ label: r.code, sub: compoundShort(r.compound), value: r.shops.length, display: t(lang, \'m5.bothDisplay\', { n: r.shops.length }), accent: true, href: L(`/prices/${r.compound}/`) }))} />')
# Brand status pages
edit('BrandStatus', [SC, "import { PARTNERS, VENDORS_BY_SCORE } from '../lib/site';"], '    <FAQ ',
     '    {v ? <ScoreChart vendors={VENDORS_BY_SCORE} highlight={v.slug} title={t(lang, \'m5.brandRankTitle\', { name: v.name })} /> : <ScoreChart vendors={PARTNERS} title={t(lang, \'m5.brandAltTitle\')} />}')
edit('BrandsIndex', [BL], '    <RelatedLinks ',
     '    <BarList title={t(lang, \'m5.brandSitesTitle\')} rows={BRANDS.map((b) => ({ label: b.name, value: b.domains.length, display: t(lang, \'m5.sitesDisplay\', { n: b.domains.length }), accent: true, href: L(`/brands/${b.slug}/`) }))} />')
# Blends index
edit('BlendsIndex', [BL], '    <RelatedLinks ',
     '    <BarList title={t(lang, \'m5.blendTitle\')} rows={rows.map((r) => ({ label: r.b.name, value: r.offers, display: t(lang, \'m5.blendDisplay\', { o: r.offers, n: r.n }), accent: true, href: L(`/blends/${r.b.slug}/`) }))} />')
# Batch tracker
edit('BatchTracker', [VC, CH], '    <FAQ ',
     '    <VerifyChart rows={verifyByLab(L)} title={t(lang, \'m5.verifyTitleLab\')} />')
# COA red flags: outlier fill chart
edit('LegitCheck', [FC], '        <div class="table-wrap">\n          <table class="data-table">\n            <thead><tr><th scope="col">{t(lang, \'rf.colShop\')}',
     '        <FillChart rows={FILL_OUTLIERS.slice(0, 12).map((r) => ({ label: `${r.vendor.name}: ${compoundShort(r.report.compound)} ${F.mg(r.report.labelMg)}`, labelMg: r.report.labelMg, measuredMg: r.report.measuredMg, verified: r.report.verifiable }))} title={t(lang, \'m5.outTitle\', { n: Math.min(12, FILL_OUTLIERS.length) })} />')
