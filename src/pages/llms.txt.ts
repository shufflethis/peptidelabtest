import type { APIRoute } from 'astro';
import { TOTALS, CHECKED_ISO, SITE_URL, PRICE_COMPOUNDS, compoundShort, COMPOUND_PAIRS, pairSlug, LABS_IN_DATA, PARTNERS, SIZE_PAGES } from '../lib/site';

export const GET: APIRoute = () => {
  const u = (p: string) => `${SITE_URL}${p}`;
  const lines = [
    '# PeptideLabIndex (peptidelabtest.org)',
    '',
    `> Independent desk audit of ${TOTALS.shops} research peptide shops in the EU and US. We open the lab reports shops publish, check them on the lab's own portal, compare measured mg with the label and record listed prices as price per mg (EUR and USD kept separate). Data checked ${CHECKED_ISO}. Research use only; no dosing or health information.`,
    '',
    '## Method',
    `- Score 0-5 per shop: lab verification 30%, fill accuracy 20%, test panel depth 20%, entity transparency 15%, dispatch information 10%, value per mg 5% (left out when prices are not public).`,
    `- ${TOTALS.reportsOpened} lab reports opened, ${TOTALS.portalVerified} verified on the lab portal, ${TOTALS.products} prices recorded. No test orders were placed.`,
    '- Rankings list partner shops by audit score only; commission never changes a score.',
    `- Method: ${u('/methodology/')}`,
    '',
    '## Key pages',
    `- Shop ranking: ${u('/vendors/')} (EU: ${u('/vendors/europe/')}, US: ${u('/vendors/usa/')})`,
    `- Price comparisons: ${u('/prices/')}`,
    `- Lab reports we opened: ${u('/batch-tracker/')}`,
    `- Testing lab guides: ${u('/labs/')}`,
    `- Compound facts: ${u('/compounds/')}`,
    `- Open data (CSV/JSON): ${u('/data/')}`,
    `- Full plain-text data: ${u('/llms-full.txt')}`,
    '',
    '## Price comparisons by compound',
    ...PRICE_COMPOUNDS.map((c) => `- ${compoundShort(c)}: ${u(`/prices/${c}/`)}`),
    '',
    '## Prices by vial size',
    ...SIZE_PAGES.map((s) => `- ${compoundShort(s.compound)} ${s.size} mg (${s.shops} shops): ${u(`/prices/${s.compound}/${s.size}mg/`)}`),
    '',
    '## Compound comparisons',
    ...COMPOUND_PAIRS.map(([a, b]) => `- ${compoundShort(a)} vs ${compoundShort(b)}: ${u(`/compare/${pairSlug(a, b)}/`)}`),
    '',
    '## Lab guides',
    ...LABS_IN_DATA.map((l) => `- ${l.name}: ${u(`/labs/${l.slug}/`)}`),
    '',
    '## Partner shops (by audit score)',
    ...PARTNERS.map((p) => `- ${p.name} (${p.region}, ${p.overallScore.toFixed(1)}/5): ${u(`/vendors/${p.slug}/`)}`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
