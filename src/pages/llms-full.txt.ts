import type { APIRoute } from 'astro';
import { VENDORS_BY_SCORE, TOTALS, CHECKED_ISO, SITE_URL, PRICE_COMPOUNDS, compoundShort, offersFor, cheapestBy, perMg, fillRange, purityRange, isPartner } from '../lib/site';

export const GET: APIRoute = () => {
  const out: string[] = [
    '# PeptideLabIndex: full audit data (plain text)',
    `Checked: ${CHECKED_ISO}. Shops: ${TOTALS.shops}. Lab reports opened: ${TOTALS.reportsOpened} (${TOTALS.portalVerified} portal-verified). Prices: ${TOTALS.products}.`,
    `Source: ${SITE_URL}/ · Method: ${SITE_URL}/methodology/ · CSV: ${SITE_URL}/data/peptide-shop-audit-2026.csv`,
    'Research use only. No dosing or health information.',
    '',
    '## Shops (by audit score, 0-5)',
  ];
  for (const v of VENDORS_BY_SCORE) {
    const labs = Array.from(new Set(v.coaExamples.map((c) => c.lab.replace(/\s*\(.*\)\s*$/, ''))));
    out.push(
      '',
      `### ${v.name} (${v.region}) - score ${v.overallScore.toFixed(1)}${isPartner(v.slug) ? ' - partner' : ''}`,
      `Review: ${SITE_URL}/vendors/${v.slug}/`,
      `Legal entity: ${v.legalEntity}`,
      `Labs on opened reports: ${labs.length ? labs.join(', ') : 'none'}`,
      `Lab reports opened: ${v.coaStats.opened}; portal-verified: ${v.coaStats.portalVerified}`,
      `Measured vs label: ${fillRange(v)}; HPLC purity: ${purityRange(v)}`,
      `Prices recorded: ${v.products.length}`,
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
  out.push('');
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
