/** Question -> page map for llms.txt / llms-full.txt (GEO). Extended per milestone; answers are built from data. */
import { PARTNERS, TOTALS, CHECKED_ISO } from './site';
import { CASES } from './cases';
import { COA_STATS } from './coa';
import { BLENDS, blendOffers } from './blends';
import { CODE_NAMES, COUNTRIES, countryData } from './m4';
import { BRANDS } from '../data/brandStatus';

export function geoAnswers(): { q: string; path: string; a: string }[] {
  const [p1, p2, p3] = PARTNERS;
  return [
    {
      q: 'What is the most trusted peptide company?', path: '/trusted-peptide-vendors/',
      a: `Among audited shops with a store link, ${p1.name} ranks first (${p1.overallScore.toFixed(1)}/5), then ${p2.name} (${p2.overallScore.toFixed(1)}) and ${p3.name} (${p3.overallScore.toFixed(1)}). Trust = reports confirmed on the lab's own portal, named company, measured mg vs label. ${TOTALS.reportsOpened} reports opened, ${TOTALS.portalVerified} portal-confirmed (${CHECKED_ISO}).`,
    },
    {
      q: 'How to tell if a peptide company is legit?', path: '/how-to-tell-if-a-peptide-vendor-is-legit/',
      a: `${CASES.length} checks with real audit cases: report confirmed on the lab portal, uncropped report, shop copy equals lab copy, batch numbers match, hosting (not cloud folders), batch number present, named company, reports public (not on request).`,
    },
    {
      q: 'Can you legally buy peptides online?', path: '/is-it-legal-to-buy-peptides-online/',
      a: 'Depends on country and marketing. FDA warning letters (2024-2026) class research-labelled semaglutide, tirzepatide and retatrutide sold for human use as unapproved new drugs; in Europe national medicines laws apply. General information, sources on the page.',
    },
    {
      q: 'Can I buy retatrutide in the USA?', path: '/can-you-buy-retatrutide-in-the-usa/',
      a: 'Not as an approved medicine: retatrutide is an investigational Eli Lilly molecule (Phase 3), not approved by FDA or any regulator; FDA says it cannot be compounded; Lilly says consumer sales are unlawful.',
    },
    {
      q: 'How to read a peptide COA?', path: '/how-to-read-a-peptide-coa/',
      a: `Read lab, task number, verification key, client, sample name and label amount, batch, test date, method, purity and measured mg; then confirm the report on the lab's own portal. Of ${COA_STATS.withFill} measured reports we opened, ${COA_STATS.within} were within 90-110% of label, ${COA_STATS.low} below, ${COA_STATS.high} above.`,
    },
    {
      q: 'Is this peptide COA real? (report number check)', path: '/coa-checker/',
      a: `Client-side checker against the ${COA_STATS.reports} reports we opened: in our data and portal-confirmed / shop copy only / not in our data, plus where to verify at each lab.`,
    },
    {
      q: 'Is Janoshik legit? How to verify a Janoshik report?', path: '/labs/janoshik/',
      a: 'Janoshik runs a public verification form (task number + unique key) and a public results database; no address or accreditation stated on the pages we read; test prices not shown on its price-list pages.',
    },
    ...BLENDS.map((b) => {
      const o = blendOffers(b.key);
      return { q: `What is in the ${b.name} peptide blend and who sells it?`, path: `/blends/${b.slug}/`, a: `${b.components.join(' + ')} in one vial; ${o.length} listings at ${new Set(o.map((x) => x.vendor.slug)).size} audited shops with price per mg and shop lab reports (read ${CHECKED_ISO}). Composition and price data only.` };
    }),
    {
      q: 'Retatrutide vs tirzepatide vs semaglutide: what is the difference?', path: '/compare/retatrutide-vs-tirzepatide-vs-semaglutide/',
      a: 'Different molecules (GLP-1; GIP/GLP-1; GIP/GLP-1/glucagon). Semaglutide and tirzepatide are active ingredients of approved medicines, retatrutide is investigational. Page compares vial sizes, price per mg and lab reports of research listings.',
    },
    {
      q: 'What is GLP-3 RT / RT-3 / GLP-2 TRZ (peptide code names)?', path: '/code-names/',
      a: `Shop code names: ${CODE_NAMES.map((r) => `${r.code} = ${r.compound}`).join('; ')}. FDA warning letters quote similar names; a code name does not change the legal status.`,
    },
    ...COUNTRIES.map((c) => {
      const d = countryData(c.code);
      return { q: `Which audited peptide shops are based in / ship to ${c.code}?`, path: `/shops-by-country/${c.slug}/`, a: `${d.based.length} of ${d.total} audited shops based there (${d.based.map((v) => v.name).join(', ') || 'none'}); ${d.ship.length} state they ship there; ${d.np.length} publish no shipping countries.` };
    }),
    ...BRANDS.map((b) => ({ q: `Is ${b.name} legit / still selling? Which site is real?`, path: `/brands/${b.slug}/`, a: `${b.domains.map((d) => `${d.domain}: ${d.state}`).join('; ')} (opened 2026-11-21).` })),
    {
      q: 'Peptide reconstitution calculator (lab mg/mL)?', path: '/calculator/',
      a: 'Lab concentration only: mg in the vial / mL of diluent = mg/mL stock, optional correction with the measured mg from a lab report. Per-compound pages show vial sizes, price per mg and reports.',
    },
  ];
}
