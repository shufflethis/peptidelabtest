import type { APIRoute } from 'astro';
import { geoAnswers } from '../lib/geo';
import { CASES } from '../lib/cases';
import { vendorBySlug, VENDORS_BY_SCORE, TOTALS, SITE_URL, PRICE_COMPOUNDS, compoundShort, offersFor, cheapestBy, perMg, fillRange, purityRange, isPartner, reviewCoverage } from '../lib/site';

export const GET: APIRoute = () => {
  const coverage = reviewCoverage(VENDORS_BY_SCORE);
  const out: string[] = [
    '# PeptideLabIndex: full audit data (plain text)',
    ...(coverage ? [`Shop review coverage: ${coverage.earliest} to ${coverage.latest}.`] : []),
    `Shops: ${TOTALS.shops}. Lab reports opened: ${TOTALS.reportsOpened} (${TOTALS.portalVerified} portal-verified). Prices: ${TOTALS.products}.`,
    `Source: ${SITE_URL}/ · Method: ${SITE_URL}/methodology/ · CSV: ${SITE_URL}/data/peptide-shop-audit-2026.csv`,
    'Research use only. No dosing or health information.',
    '',
    '## Shops (by audit score, 0-5)',
  ];
  for (const v of VENDORS_BY_SCORE) {
    const labs = Array.from(new Set(v.coaExamples.map((c) => c.lab.replace(/\s*\(.*\)\s*$/, ''))));
    const bounds = v.coaExamples.flatMap((r) => r.purityLowerBoundPercent != null && r.purityComparator
      ? [`${compoundShort(r.compound)} ${r.purityComparator}${r.purityLowerBoundPercent}%${r.reportId ? ` (${r.reportId})` : ''}`] : []);
    out.push(
      '',
      `### ${v.name} (${v.region}) - score ${v.overallScore.toFixed(1)}${isPartner(v.slug) ? ' - partner' : ''}`,
      `Review: ${SITE_URL}/vendors/${v.slug}/`,
      `Legal entity: ${v.legalEntity}`,
      `Labs on opened reports: ${labs.length ? labs.join(', ') : 'none'}`,
      `Lab reports opened: ${v.coaStats.opened}; portal-verified: ${v.coaStats.portalVerified}`,
      `Measured vs label: ${fillRange(v)}; exact reported purity values: ${purityRange(v)}`,
      ...(bounds.length ? [`Reported purity lower bounds: ${bounds.join('; ')}`] : []),
      `Prices recorded: ${v.products.length}${v.pricesExcludeVat ? ' (exclude VAT; not in comparative rankings)' : ''}`,
      `Verdict: ${v.verdictSummary}`,
      `Reviewed: ${v.reviewedAt}`,
    );
  }
  out.push('', '## Lowest listed price per mg by compound (EUR and USD separate, no codes)');
  for (const c of PRICE_COMPOUNDS) {
    const o = offersFor(c);
    const e = cheapestBy(o, 'EUR');
    const u = cheapestBy(o, 'USD');
    out.push(`- ${compoundShort(c)}: EUR ${e ? `${perMg(e.perMg, 'EUR')} (${e.vendor.name}, ${e.product.vialMg} mg)` : 'n/a'}; USD ${u ? `${perMg(u.perMg, 'USD')} (${u.vendor.name}, ${u.product.vialMg} mg)` : 'n/a'} - ${SITE_URL}/prices/${c}/`);
  }
  out.push('', '## Answers to common questions');
  for (const g of geoAnswers()) out.push(`- ${g.q} ${SITE_URL}${g.path}`, `  ${g.a}`);
  out.push('', '## Real audit cases (what to check before trusting a shop)');
  for (const c of CASES) {
    const v = vendorBySlug(c.slug)!;
    out.push(`- ${c.key}: ${v.name} - ${v.weaknesses[c.idx]} Source: ${c.sources.join(' ; ')}`);
  }
  out.push('');
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
