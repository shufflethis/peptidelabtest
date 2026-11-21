/**
 * Real cases from the 20 Nov 2026 desk audit (src/data/audit.json), used on the legit checklist and the COA red-flag page.
 * Each case points at a published weakness of one audited shop (weaknesses[idx], translated in data/<lang>.json)
 * and at the sources we opened (plain text, never links). No new facts are introduced here.
 */
import AUDIT from '../data/audit.json';
import { VENDORS } from '../data/vendors';

export interface AuditCase {
  /** check key -> UI strings x.<lang>.json cases.<key>.* */
  key: 'portal' | 'cropped' | 'copy' | 'batch' | 'drive' | 'nobatch' | 'entity' | 'onrequest';
  slug: string;
  /** index into audit weaknesses (localized text) */
  idx: number;
  /** sources opened for this case (shown as plain text) */
  sources: string[];
  /** report IDs involved (shown as code) */
  ids?: string[];
}

const RAW: AuditCase[] = [
  {
    key: 'portal', slug: 'ascension-peptides', idx: 1,
    sources: ['https://ascensionpeptides.com/wp-content/uploads/2026/05/Retatrutide_03-05260628_COA.pdf', 'https://koveralabs.com/#/verify?code=KVR-2026-D5D6AE'],
    ids: ['KVR-2026-D5D6AE'],
  },
  {
    key: 'cropped', slug: 'peptides-eu', idx: 0,
    sources: ['https://www.peptides-eu.net/testreports/Retatrutide_10mg_092026.png', 'https://www.peptides-eu.net/testreports/BPC-157_10mg_092026.png'],
    ids: ['CUCZPQ8IWHHI', 'NUG1AUJ1WI7T'],
  },
  {
    key: 'copy', slug: 'core-peptides', idx: 1,
    sources: ['https://verifiedbyvanguard.com/verify/2d074301-edd4-4dd5-930f-c5b4b8b9d5cd'],
    ids: ['V260706-2 014'],
  },
  {
    key: 'batch', slug: 'peptid24', idx: 0,
    sources: ['https://verify.janoshik.com/tests/236570_WSGVFJM6VMAJ'],
    ids: ['#236570', '#236568', '#236564'],
  },
  {
    key: 'drive', slug: 'limitless-life-nootropics', idx: 1,
    sources: ['https://drive.google.com/file/d/1EocdFpgf25lfmoStbqrivRH93myGDB6X/view'],
  },
  {
    key: 'nobatch', slug: 'real-peptides', idx: 1,
    sources: ['https://coa.realpeptides.co/api/public/certificates/392'],
    ids: ['KVR-2026-1ED56E'],
  },
  {
    key: 'entity', slug: 'pen-peptide', idx: 1,
    sources: ['https://penpeptide.pl/pages/kontakt', 'https://penpeptide.pl/policies/terms-of-service'],
  },
  {
    key: 'onrequest', slug: 'onyx-peptides', idx: 0,
    sources: ['https://onyxpeptides.com/quality-testing/'],
  },
];

const audit = AUDIT as any[];
/** Only cases whose shop is published (drafts stay hidden) and whose weakness text exists. */
export const CASES: AuditCase[] = RAW.filter((c) => VENDORS.some((v) => v.slug === c.slug) && audit.find((a) => a.slug === c.slug)?.weaknesses?.[c.idx]);

/** Source URLs above must exist in the shop's audit record (sources, coaExamples or verification note). Checked at build. */
for (const c of CASES) {
  const a = audit.find((x) => x.slug === c.slug);
  const known = [...(a.sources || []), ...(a.coaExamples || []).map((e: any) => e.url)].join(' ');
  for (const s of c.sources) {
    const base = s.replace(/^https?:\/\//, '');
    if (!known.includes(base) && !known.includes(s)) {
      throw new Error(`cases.ts: source not in audit record for ${c.slug}: ${s}`);
    }
  }
}

export function readAtOf(slug: string): string {
  return audit.find((a) => a.slug === slug)?.readAt || '';
}
