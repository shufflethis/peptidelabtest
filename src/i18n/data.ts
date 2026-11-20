/**
 * Localized data texts. Translations: data/<lang>.json, flat key paths as documented in src-data.json
 * (compounds.COMPOUNDS.<slug>.<field>, labGuides.LAB_GUIDES.<slug>..., labs.RESEARCH_ARTICLES.<slug>..., laws.COUNTRY_LAWS.<slug>...,
 * audit.<slug>.<field>[.<i>|.<subscore>]). Any missing key falls back to English. Numbers were validated against English.
 */
import de from './data/de.json';
import es from './data/es.json';
import fr from './data/fr.json';
import it from './data/it.json';
import type { Lang } from './index';
import { t } from './index';
import type { VendorProfile } from '../data/vendors';
import type { CompoundSpec } from '../data/compounds';
import type { LabGuide } from '../data/labGuides';
import type { ResearchArticle } from '../data/labs';
import type { CountryLawGuide } from '../data/laws';
import AUDIT_RAW from '../data/audit.json';

const DATA: Record<string, Record<string, string>> = { de, es, fr, it } as any;

export function dt(lang: Lang, key: string, en: string): string {
  if (lang === 'en') return en;
  const v = DATA[lang]?.[key];
  return typeof v === 'string' && v.trim() ? v : en;
}

/** Walks an object like dump.ts did (arrays keyed by element slug or index, `slug` skipped) and swaps translated strings. */
function walk<T>(lang: Lang, prefix: string, v: T): T {
  if (lang === 'en') return v;
  if (typeof v === 'string') return dt(lang, prefix, v) as any;
  if (Array.isArray(v)) return v.map((x, i) => walk(lang, `${prefix}.${x && (x as any).slug ? (x as any).slug : i}`, x)) as any;
  if (v && typeof v === 'object') {
    const o: any = {};
    for (const [k, x] of Object.entries(v as any)) o[k] = k === 'slug' ? x : walk(lang, `${prefix}.${k}`, x);
    return o;
  }
  return v;
}

export const locCompound = (lang: Lang, c: CompoundSpec): CompoundSpec => walk(lang, `compounds.COMPOUNDS.${c.slug}`, c);
export const locLabGuide = (lang: Lang, g: LabGuide | undefined): LabGuide | undefined => (g ? walk(lang, `labGuides.LAB_GUIDES.${g.slug}`, g) : g);
export const locArticle = (lang: Lang, a: ResearchArticle): ResearchArticle => walk(lang, `labs.RESEARCH_ARTICLES.${a.slug}`, a);
export const locLaw = (lang: Lang, l: CountryLawGuide): CountryLawGuide => walk(lang, `laws.COUNTRY_LAWS.${l.slug}`, l);

const NP = 'not published';
const raw = (slug: string) => (AUDIT_RAW as any[]).find((a) => a.slug === slug) || {};

/** Category label of a compound (UI key first, then data translation). */
export function categoryLabel(lang: Lang, c: CompoundSpec | undefined): string {
  if (!c) return t(lang, 'common.researchCompound');
  return locCompound(lang, c).category;
}

/** "not published" & co. in the UI language */
export function npx(lang: Lang, s: string | null | undefined): string {
  if (s == null || s === '' || s === NP) return t(lang, 'common.notPublished');
  if (s === 'none named') return t(lang, 'common.noneNamed');
  return s;
}

export function shipsToText(lang: Lang, slug: string): string {
  const x = raw(slug).shipsTo;
  if (x == null || x === 'None') return t(lang, 'common.notPublished');
  const one = (s: string) => {
    const k = s.toLowerCase();
    if (k === 'worldwide') return t(lang, 'ships.worldwide');
    if (k === 'eu-wide') return t(lang, 'ships.euWide');
    if (k === 'us-only') return t(lang, 'ships.usOnly');
    return s;
  };
  if (!Array.isArray(x)) return one(String(x));
  if (x.length > 6) return t(lang, 'ships.countries', { n: x.length, list: x.slice(0, 5).join(', ') });
  return x.map(one).join(', ');
}

export function countryName(lang: Lang, code: string | null | undefined): string {
  if (!code) return t(lang, 'common.notPublished');
  try {
    return new Intl.DisplayNames([lang === 'en' ? 'en' : lang], { type: 'region' }).of(code) || code;
  } catch {
    return code;
  }
}

/** Vendor with translated audit texts and localized defaults. */
export function locVendor(lang: Lang, v: VendorProfile): VendorProfile {
  const a = `audit.${v.slug}`;
  const r = raw(v.slug);
  const reasons: Record<string, string> = {};
  for (const [k, s] of Object.entries(v.subscoreReasons || {})) reasons[k] = dt(lang, `${a}.subscore_reasons.${k}`, s);
  const pm = (s: string) => (s === NP ? t(lang, 'common.notPublished') : t(lang, `payments.${s}`) !== `payments.${s}` ? t(lang, `payments.${s}`) : s);
  return {
    ...v,
    originCountry: r.originCountry ? countryName(lang, r.originCountry) : t(lang, 'common.notPublished'),
    legalEntity: npx(lang, v.legalEntity),
    verdictSummary: dt(lang, `${a}.verdict`, v.verdictSummary),
    auditNotes: dt(lang, `${a}.summary`, v.auditNotes),
    dispatchSummary: v.dispatchSummary === NP ? t(lang, 'common.notPublished') : dt(lang, `${a}.dispatchInfo`, v.dispatchSummary),
    freeShippingThreshold: v.freeShippingThreshold === NP ? t(lang, 'common.notPublished') : dt(lang, `${a}.freeShippingThreshold`, v.freeShippingThreshold),
    strengths: v.strengths.map((s, i) => dt(lang, `${a}.strengths.${i}`, s)),
    weaknesses: v.weaknesses.map((s, i) => dt(lang, `${a}.weaknesses.${i}`, s)),
    subscoreReasons: reasons,
    paymentMethods: v.paymentMethods.map(pm),
    panelBadges: v.panelBadges.map((p) => (t(lang, `panels.${p}`) !== `panels.${p}` ? t(lang, `panels.${p}`) : p)),
    coaAccess: v.coaAccess ? (t(lang, `coaAccess.${v.coaAccess}`) !== `coaAccess.${v.coaAccess}` ? t(lang, `coaAccess.${v.coaAccess}`) : v.coaAccess) : t(lang, 'common.notPublished'),
    shipsTo: shipsToText(lang, v.slug),
    testingLabs: v.testingLabs.map((l) => (l === 'none named' ? t(lang, 'common.noneNamed') : l)),
  };
}
