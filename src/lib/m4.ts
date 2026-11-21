/** GOAL M4: code-name decoder + shops by country. Built only from audit.json (shop product names, originCountry, shipsTo). */
import AUDIT from '../data/audit.json';
import { VENDORS, type VendorProfile } from '../data/vendors';
import { compoundShort } from './site';

const audit = AUDIT as any[];
const live = (slug: string) => VENDORS.find((v) => v.slug === slug);
const GLP = ['retatrutide', 'tirzepatide', 'semaglutide', 'cagrilintide', 'mazdutide', 'survodutide'];

export interface CodeNameRow { code: string; compound: string; shops: VendorProfile[]; examples: string[] }
/** Product names that do not contain the compound name (shop code names), sizes stripped. */
export const CODE_NAMES: CodeNameRow[] = (() => {
  const m = new Map<string, CodeNameRow>();
  for (const a of audit) {
    const v = live(a.slug);
    if (!v) continue;
    for (const p of a.products || []) {
      if (!GLP.includes(p.compound)) continue;
      const n: string = p.shopProductName;
      if (new RegExp(p.compound.slice(0, 6), 'i').test(n)) continue;
      const code = n.replace(/\s*\(?\d+(\.\d+)?\s?mg\b.*$/i, '').replace(/\s+with mannitol$/i, '').replace(/\s*\(reta\)$/i, '').trim() || n;
      const key = `${p.compound}|${code.toLowerCase()}`;
      const row = m.get(key) || { code, compound: p.compound, shops: [], examples: [] };
      if (!row.shops.includes(v)) row.shops.push(v);
      if (!row.examples.includes(n) && row.examples.length < 4) row.examples.push(n);
      m.set(key, row);
    }
  }
  return Array.from(m.values()).sort((x, y) => GLP.indexOf(x.compound) - GLP.indexOf(y.compound) || x.code.localeCompare(y.code));
})();

export const EU_CODES = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'];
export interface CountryMeta { slug: string; code: string; law?: string }
export const COUNTRIES: CountryMeta[] = [
  { slug: 'usa', code: 'US', law: 'united-states' },
  { slug: 'germany', code: 'DE', law: 'germany' },
  { slug: 'poland', code: 'PL', law: 'poland' },
  { slug: 'netherlands', code: 'NL', law: 'netherlands' },
  { slug: 'slovakia', code: 'SK' },
  { slug: 'romania', code: 'RO' },
];
export type ShipState = 'yes' | 'no' | 'np';
/** Whether a shop states shipping to a country: worldwide / EU-wide / explicit list / US-only, as recorded in audit.json shipsTo. */
export function shipsTo(slug: string, code: string): ShipState {
  const a = audit.find((x) => x.slug === slug);
  const s = a?.shipsTo;
  if (!s) return 'np';
  const list: string[] = Array.isArray(s) ? s : [String(s)];
  for (const x of list) {
    if (/worldwide/i.test(x)) return 'yes';
    if (/EU-wide/i.test(x) && EU_CODES.includes(code)) return 'yes';
    if (/US-only/i.test(x)) return code === 'US' ? 'yes' : 'no';
    if (x === code) return 'yes';
  }
  return 'no';
}
export function countryData(code: string) {
  const vis = VENDORS.filter((v) => audit.find((a) => a.slug === v.slug));
  const based = vis.filter((v) => audit.find((a) => a.slug === v.slug)?.originCountry === code).sort((x, y) => y.overallScore - x.overallScore);
  const ship = vis.filter((v) => shipsTo(v.slug, code) === 'yes').sort((x, y) => y.overallScore - x.overallScore);
  const np = vis.filter((v) => shipsTo(v.slug, code) === 'np');
  return { based, ship, np, total: vis.length };
}
const US_SHORT: Record<string, string> = { en: 'the USA', de: 'den USA', es: 'EE. UU.', fr: 'aux États-Unis', it: 'USA' };
export const regionName = (lang: string, code: string) => (code === 'US' ? { en: 'USA', de: 'USA', es: 'EE. UU.', fr: 'États-Unis', it: 'USA' }[lang] || 'USA' : new Intl.DisplayNames([lang], { type: 'region' }).of(code) || code);
export { US_SHORT };
export const codeLabel = (r: CodeNameRow) => `${r.code} (${compoundShort(r.compound)})`;
