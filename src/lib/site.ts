/**
 * Shared view helpers. Every number shown on the site is read from src/data/audit.json
 * through vendors.ts / batches.ts. Nothing here invents values; it only groups, sorts and formats.
 */
import { VENDORS, type VendorProfile, type VendorProduct, type CoaExample } from '../data/vendors';
import AUDIT_RAW from '../data/audit.json';
import { AFFILIATE_CONFIG, resolveVendorLink } from '../data/affiliates';
import { COMPOUNDS, getCompoundBySlug, type CompoundSpec } from '../data/compounds';

export const SITE_URL = 'https://www.peptidelabtest.org';
export const SITE_NAME = 'PeptideLabIndex';
export const CHECKED_ISO = '2026-11-20';
export const CHECKED_LABEL = '20 Nov 2026';
export const YEAR = 2026;
/**
 * Social profiles. Empty string = not shown anywhere (footer icons, Organization sameAs).
 * Telegram per language; empty language channels fall back to telegramEn.
 */
export const SOCIAL = {
  telegramEn: '',
  telegramDe: '',
  telegramEs: '',
  telegramFr: '',
  telegramIt: '',
  youtube: '',
  x: '',
};
const SOCIAL_ICONS = {
  telegram: 'M21.94 4.3 18.7 19.6c-.24 1.07-.88 1.34-1.78.83l-4.93-3.63-2.38 2.29c-.26.26-.48.48-.99.48l.35-5.02 9.14-8.26c.4-.35-.09-.55-.62-.2L6.2 13.2l-4.87-1.52c-1.06-.33-1.08-1.06.22-1.57L20.6 2.77c.88-.32 1.65.21 1.34 1.53Z',
  youtube: 'M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z',
  x: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z',
};
export function socialLinks(lang: string): { href: string; label: string; icon: string }[] {
  const key = `telegram${lang.charAt(0).toUpperCase()}${lang.slice(1)}` as keyof typeof SOCIAL;
  const tg = (SOCIAL[key] as string) || SOCIAL.telegramEn;
  return [
    tg ? { href: tg, label: 'Telegram', icon: SOCIAL_ICONS.telegram } : null,
    SOCIAL.youtube ? { href: SOCIAL.youtube, label: 'YouTube', icon: SOCIAL_ICONS.youtube } : null,
    SOCIAL.x ? { href: SOCIAL.x, label: 'X', icon: SOCIAL_ICONS.x } : null,
  ].filter(Boolean) as { href: string; label: string; icon: string }[];
}
export const SOCIAL_SAME_AS: string[] = Array.from(new Set(Object.values(SOCIAL).filter(Boolean)));

/** Partner links: CONTENT_RULES (sponsored nofollow) + brief (noopener noreferrer). */
export const REL_SPONSORED = 'sponsored nofollow noopener noreferrer';

// ---------------------------------------------------------------- partners

export function isPartner(slug: string): boolean {
  return resolveVendorLink(slug).isSponsored;
}

const byScore = (a: VendorProfile, b: VendorProfile) => b.overallScore - a.overallScore || a.name.localeCompare(b.name);

export const PARTNERS: VendorProfile[] = VENDORS.filter((v) => isPartner(v.slug)).sort(byScore);
export const NON_PARTNERS: VendorProfile[] = VENDORS.filter((v) => !isPartner(v.slug)).sort(byScore);
export const VENDORS_BY_SCORE: VendorProfile[] = [...VENDORS].sort(byScore);

export function partnersIn(region: string): VendorProfile[] {
  return PARTNERS.filter((v) => v.region === region);
}

export function vendorBySlug(slug: string): VendorProfile | undefined {
  return VENDORS.find((v) => v.slug === slug);
}

/** Outbound store link: partners only. Non-partners return null (no outbound link at all). */
export function shopHref(slug: string): string | null {
  const l = resolveVendorLink(slug);
  return l.isSponsored ? l.href : null;
}

/** Partner product deep link with the partner's ref parameter; path-based refs (genesis, real) use the home ref link. */
export function productHref(slug: string, productUrl: string | null | undefined): string | null {
  if (!isPartner(slug)) return null;
  const cfg = AFFILIATE_CONFIG[slug];
  const home = resolveVendorLink(slug).href;
  if (!cfg || !productUrl || slug === 'genesis-peptides' || slug === 'real-peptides') return home;
  try {
    const aff = new URL(cfg.affiliateUrl);
    if (!aff.search) return home;
    const u = new URL(productUrl);
    aff.searchParams.forEach((v, k) => u.searchParams.set(k, v));
    return u.toString();
  } catch {
    return home;
  }
}

export type CodeInfo =
  | { kind: 'none' }
  | { kind: 'link-only' }
  | { kind: 'on-review'; reviewUrl: string }
  | { kind: 'code'; code: string; note?: string; percent?: number };

/** Reader code display. codeOnlyOnVendorPage partners only show the code on their own /vendors/<slug>/ page. */
export function codeInfo(slug: string, onOwnReviewPage = false): CodeInfo {
  const l = resolveVendorLink(slug);
  if (!l.isSponsored) return { kind: 'none' };
  if (!l.promoCode) return { kind: 'link-only' };
  if (l.codeOnlyOnVendorPage && !onOwnReviewPage) return { kind: 'on-review', reviewUrl: `/vendors/${slug}/` };
  return { kind: 'code', code: l.promoCode, note: l.discountNote, percent: l.discountPercent };
}

export function codeText(slug: string): string {
  const c = codeInfo(slug);
  if (c.kind === 'code') return c.code;
  if (c.kind === 'on-review') return 'Reader code on review page';
  if (c.kind === 'link-only') return 'Link only (no code)';
  return 'No reader code';
}

// ---------------------------------------------------------------- formatting

export function curSymbol(cur: string): string {
  return cur === 'EUR' ? '€' : cur === 'USD' ? '$' : `${cur} `;
}

export function money(n: number | null | undefined, cur: string): string {
  if (n == null || !Number.isFinite(n)) return 'n/a';
  return `${curSymbol(cur)}${n.toFixed(2)}`;
}

export function perMg(n: number | null | undefined, cur: string): string {
  if (n == null || !Number.isFinite(n)) return 'n/a';
  const d = n < 0.1 ? 3 : 2;
  return `${curSymbol(cur)}${n.toFixed(d)}/mg`;
}

export function pct(n: number | null | undefined, digits = 1): string {
  if (n == null || !Number.isFinite(n)) return 'n/a';
  return `${n.toFixed(digits)}%`;
}

export function fillPct(c: { measuredMg: number | null; labelMg: number | null }): number | null {
  if (c.measuredMg == null || c.labelMg == null || !c.labelMg) return null;
  return (100 * c.measuredMg) / c.labelMg;
}

export function mg(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return 'n/a';
  return `${Number.isInteger(n) ? n : n.toString()} mg`;
}

export function score(n: number): string {
  return n.toFixed(1);
}

/** First candidate that fits the hard 60-char title limit; last resort: hard cut on a word boundary. */
export function fitTitle(...cands: string[]): string {
  for (const c of cands) if (c.length <= 60) return c;
  const last = cands[cands.length - 1];
  return last.slice(0, 60).replace(/\s+\S*$/, '');
}

/** First candidate inside the 130-155 char meta description window, else the first one that is <= 155. */
export function fitDesc(...cands: string[]): string {
  return cands.find((c) => c.length >= 130 && c.length <= 155) || cands.find((c) => c.length <= 155) || cands[cands.length - 1].slice(0, 155);
}

/** Pads a short meta description into the 130-155 window with neutral, true suffixes. */
export function padDesc(d: string, pads: string[] = [` Data checked ${CHECKED_LABEL}.`, ' Research use only.', ' Independent desk audit.']): string {
  let out = d.trim();
  for (const p of pads) {
    if (out.length >= 130) break;
    if (out.length + p.length <= 155) out += p;
  }
  return out;
}

/** Shop name without the operator in brackets: "24Peptides (Grail Formula)" -> "24Peptides" */
export function shopShort(name: string): string {
  return name.replace(/\s*\(.*\)\s*$/, '').trim();
}

export function regionLabel(r: string): string {
  return r === 'EU' ? 'EU' : r === 'US' ? 'US' : r;
}

export function listJoin(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

export function median(xs: number[]): number | null {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

export function range(xs: number[]): [number, number] | null {
  if (!xs.length) return null;
  return [Math.min(...xs), Math.max(...xs)];
}

// ---------------------------------------------------------------- compounds

export function compoundName(slug: string): string {
  return getCompoundBySlug(slug)?.name || slug;
}

/** Short display name: "BPC-157 (Pentadecapeptide)" -> "BPC-157" */
export function compoundShort(slug: string): string {
  const n = compoundName(slug);
  return n.replace(/\s*\(.*\)\s*$/, '').trim();
}

export interface Offer {
  vendor: VendorProfile;
  partner: boolean;
  product: VendorProduct;
  price: number | null;
  listPrice: number | null;
  onSale: boolean;
  perMg: number | null;
  currency: string;
  /** Opened report for this compound (same label size preferred) */
  report: CoaExample | null;
  reportsForCompound: CoaExample[];
  href: string | null;
}

function pickReport(v: VendorProfile, compound: string, vialMg: number | null): { report: CoaExample | null; all: CoaExample[] } {
  const all = v.coaExamples.filter((c) => c.compound === compound);
  const same = all.find((c) => vialMg != null && c.labelMg === vialMg && c.measuredMg != null);
  const any = all.find((c) => c.measuredMg != null) || all[0] || null;
  return { report: same || any, all };
}

export function offersFor(compound: string, size?: number): Offer[] {
  const out: Offer[] = [];
  for (const v of VENDORS) {
    for (const p of v.products) {
      if (p.compound !== compound) continue;
      if (size != null && p.vialMg !== size) continue;
      const { report, all } = pickReport(v, compound, p.vialMg);
      const onSale = p.salePrice != null && p.price != null && p.salePrice < p.price;
      out.push({
        vendor: v,
        partner: isPartner(v.slug),
        product: p,
        price: p.salePrice ?? p.price,
        listPrice: onSale ? p.price : null,
        onSale,
        perMg: p.pricePerMg,
        currency: p.currency,
        report,
        reportsForCompound: all,
        href: productHref(v.slug, p.url),
      });
    }
  }
  return out.sort((a, b) => {
    if (a.partner !== b.partner) return a.partner ? -1 : 1;
    const pa = a.perMg ?? Infinity;
    const pb = b.perMg ?? Infinity;
    return pa - pb || b.vendor.overallScore - a.vendor.overallScore;
  });
}

export function currenciesOf(offers: Offer[]): string[] {
  const order = ['EUR', 'USD'];
  const set = Array.from(new Set(offers.map((o) => o.currency)));
  return set.sort((a, b) => (order.indexOf(a) === -1 ? 9 : order.indexOf(a)) - (order.indexOf(b) === -1 ? 9 : order.indexOf(b)));
}

export function currencyHeading(cur: string): string {
  if (cur === 'EUR') return 'EU shops – prices in EUR';
  if (cur === 'USD') return 'Prices in USD (mostly US shops)';
  return `Prices in ${cur}`;
}

export const ALL_PRODUCT_COMPOUNDS: string[] = Array.from(new Set(VENDORS.flatMap((v) => v.products.map((p) => p.compound))));

export function productCount(compound: string): number {
  return VENDORS.reduce((n, v) => n + v.products.filter((p) => p.compound === compound).length, 0);
}

/** Compounds with >= 2 products, in compounds.ts order (then by count) */
export const PRICE_COMPOUNDS: string[] = [
  ...COMPOUNDS.map((c) => c.slug).filter((s) => productCount(s) >= 2),
  ...ALL_PRODUCT_COMPOUNDS.filter((s) => !getCompoundBySlug(s) && productCount(s) >= 2),
];

export function shopsCarrying(compound: string, size?: number): VendorProfile[] {
  return VENDORS.filter((v) => v.products.some((p) => p.compound === compound && (size == null || p.vialMg === size)));
}

export function sizesFor(compound: string): number[] {
  const s = new Set<number>();
  for (const v of VENDORS) for (const p of v.products) if (p.compound === compound && p.vialMg != null) s.add(p.vialMg);
  return Array.from(s).sort((a, b) => a - b);
}

/** Vial-size pages: compound + size offered by >= 3 shops */
export const SIZE_PAGES: { compound: string; size: number; shops: number }[] = PRICE_COMPOUNDS.flatMap((c) =>
  sizesFor(c)
    .map((size) => ({ compound: c, size, shops: shopsCarrying(c, size).length }))
    .filter((x) => x.shops >= 3),
);

export function sizePagesFor(compound: string) {
  return SIZE_PAGES.filter((s) => s.compound === compound);
}

export function reportsFor(compound: string): { vendor: VendorProfile; report: CoaExample }[] {
  return VENDORS.flatMap((v) => v.coaExamples.filter((c) => c.compound === compound).map((report) => ({ vendor: v, report })));
}

export function cheapestBy(offers: Offer[], cur: string): Offer | null {
  const xs = offers.filter((o) => o.currency === cur && o.perMg != null).sort((a, b) => a.perMg! - b.perMg!);
  return xs[0] || null;
}

export function getCompound(slug: string): CompoundSpec | undefined {
  return getCompoundBySlug(slug);
}

// ---------------------------------------------------------------- labs

export interface LabKey {
  slug: string;
  name: string;
  match: RegExp;
}

export const LAB_KEYS: LabKey[] = [
  { slug: 'janoshik', name: 'Janoshik Analytical', match: /janoshik/i },
  { slug: 'vanguard', name: 'Vanguard Laboratory', match: /vanguard/i },
  { slug: 'ils', name: 'ILS Laboratories', match: /\bILS\b/ },
  { slug: 'freedom-diagnostics', name: 'Freedom Diagnostics Testing', match: /freedom diagnostics/i },
  { slug: 'kovera', name: 'Kovera Labs', match: /kovera/i },
  { slug: 'liquilabs', name: 'Liquilabs s.r.o.', match: /liquilabs/i },
  { slug: 'mz-biolabs', name: 'MZ Biolabs', match: /mz biolabs/i },
  { slug: 'trustpointe', name: 'TrustPointe Analytics', match: /trustpointe/i },
  { slug: 'biosyn', name: 'BioSyn', match: /biosyn/i },
];

export function labKeyOf(labName: string): LabKey | undefined {
  return LAB_KEYS.find((l) => l.match.test(labName));
}

export function reportsByLab(labSlug: string): { vendor: VendorProfile; report: CoaExample }[] {
  const key = LAB_KEYS.find((l) => l.slug === labSlug);
  if (!key) return [];
  return VENDORS.flatMap((v) => v.coaExamples.filter((c) => key.match.test(c.lab)).map((report) => ({ vendor: v, report })));
}

/** Labs that appear on at least one opened report */
export const LABS_IN_DATA: LabKey[] = LAB_KEYS.filter((l) => reportsByLab(l.slug).length > 0);

// ---------------------------------------------------------------- verification

export type VerifyLevel = 'portal' | 'vendor' | 'none';

export function vendorVerify(v: VendorProfile): VerifyLevel {
  if (!v.coaStats.opened) return 'none';
  return v.coaStats.portalVerified > 0 ? 'portal' : 'vendor';
}

export function reportVerify(c: CoaExample): VerifyLevel {
  return c.verifiable ? 'portal' : 'vendor';
}

// ---------------------------------------------------------------- totals

export const TOTALS = {
  shops: VENDORS.length,
  partners: PARTNERS.length,
  reportsOpened: VENDORS.reduce((n, v) => n + v.coaStats.opened, 0),
  portalVerified: VENDORS.reduce((n, v) => n + v.coaStats.portalVerified, 0),
  products: VENDORS.reduce((n, v) => n + v.products.length, 0),
  shopsWithReports: VENDORS.filter((v) => v.coaStats.opened > 0).length,
};

// ---------------------------------------------------------------- compound comparisons & shop comparisons

export const COMPOUND_PAIRS: [string, string][] = (
  [
    ['bpc-157', 'tb-500'],
    ['tirzepatide', 'retatrutide'],
    ['semax', 'selank'],
    ['tesamorelin', 'ipamorelin'],
    ['ghk-cu', 'ahk-cu'],
    ['tesamorelin', 'sermorelin'],
  ] as [string, string][]
).filter(([a, b]) => getCompoundBySlug(a) && getCompoundBySlug(b) && productCount(a) > 0 && productCount(b) > 0);

export function pairSlug(a: string, b: string) {
  return `${a}-vs-${b}`;
}

export const SHOP_PAIRS: [string, string][] = (() => {
  const out: [string, string][] = [];
  for (const region of ['EU', 'US']) {
    const ps = partnersIn(region);
    for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) out.push([ps[i].slug, ps[j].slug]);
  }
  return out;
})();

export function shopPairsFor(slug: string): [string, string][] {
  return SHOP_PAIRS.filter(([a, b]) => a === slug || b === slug);
}

export function compoundPairsFor(slug: string): [string, string][] {
  return COMPOUND_PAIRS.filter(([a, b]) => a === slug || b === slug);
}

/** Up to n best partner shops in the same region (for non-partner pages) */
export function alternativesFor(v: VendorProfile, n = 3): VendorProfile[] {
  return PARTNERS.filter((p) => p.slug !== v.slug && p.region === v.region).slice(0, n);
}

export function cheapestFor(v: VendorProfile, compounds: string[] = ['bpc-157', 'retatrutide', 'ghk-cu', 'mots-c']) {
  for (const c of compounds) {
    const xs = v.products.filter((p) => p.compound === c && p.pricePerMg != null).sort((a, b) => a.pricePerMg! - b.pricePerMg!);
    if (xs.length) return xs[0];
  }
  return null;
}

export function fillRange(v: VendorProfile): string {
  const s = v.coaStats;
  if (s.fillMinPct == null || s.fillMaxPct == null) return 'not published';
  return `${s.fillMinPct.toFixed(1)}–${s.fillMaxPct.toFixed(1)}%`;
}

export function purityRange(v: VendorProfile): string {
  const s = v.coaStats;
  if (s.purityMin == null || s.purityMax == null) return 'not published';
  return s.purityMin === s.purityMax ? `${s.purityMin}%` : `${s.purityMin}–${s.purityMax}%`;
}

export const SUBSCORE_LABELS: { key: keyof VendorProfile['scores']; label: string; weight: number }[] = [
  { key: 'labVerification', label: 'Lab verification', weight: 30 },
  { key: 'fillAccuracy', label: 'Fill accuracy', weight: 20 },
  { key: 'panelDepth', label: 'Panel depth', weight: 20 },
  { key: 'entityTransparency', label: 'Entity transparency', weight: 15 },
  { key: 'dispatchReliability', label: 'Dispatch info', weight: 10 },
  { key: 'valuePerMg', label: 'Value per mg', weight: 5 },
];

export function abs(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function itemListSchema(name: string, items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: abs(it.url) })),
  };
}

// ---------------------------------------------------------------- shipping (from audit.json shipsTo)

const EU_CODES = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'];

/** 'yes' when the shop's published shipsTo covers the country; null when the shop does not publish it. */
export function shipsToCountry(slug: string, code: string): 'yes' | 'no' | null {
  const raw = (AUDIT_RAW as any[]).find((a) => a.slug === slug)?.shipsTo;
  if (raw == null || raw === 'None') return null;
  const list: string[] = Array.isArray(raw) ? raw : [String(raw)];
  for (const x of list) {
    const t = x.toLowerCase();
    if (t === 'worldwide') return 'yes';
    if (t === 'us-only' || t === 'us') { if (code === 'US') return 'yes'; continue; }
    if (t === 'eu-wide' && EU_CODES.includes(code)) return 'yes';
    if (x.toUpperCase() === code) return 'yes';
  }
  return 'no';
}
