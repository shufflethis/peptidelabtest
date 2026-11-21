/** M7 internal linking: extra contextual "related" links per compound and hub links, deduped by href. */
import { CALC_COMPOUNDS, PRICE_COMPOUNDS, sizePagesFor, compoundShort } from './site';
import { BLENDS } from './blends';
import { CODE_NAMES } from './m4';
import { t, lp, type Lang } from '../i18n';

export interface Rel { href: string; label: string; sub?: string }

const TRIPLE = ['retatrutide', 'tirzepatide', 'semaglutide'];

/** Calculator, blends with this compound, code names, 3-way GLP comparison, price index. */
export function compoundExtras(lang: Lang, compound: string, opts: { sizes?: boolean } = {}): Rel[] {
  const L = (p: string) => lp(lang, p);
  const c = compoundShort(compound);
  const out: Rel[] = [];
  if (CALC_COMPOUNDS.includes(compound)) out.push({ href: L(`/calculator/${compound}/`), label: t(lang, 'cc.relCalc', { c }) });
  if (opts.sizes) out.push(...sizePagesFor(compound).map((s) => ({ href: L(`/prices/${compound}/${s.size}mg/`), label: `${c} ${s.size} mg` })));
  out.push(...BLENDS.filter((b) => b.components.includes(compound)).map((b) => ({ href: L(`/blends/${b.slug}/`), label: t(lang, 'bl.relBlend', { name: b.name }) })));
  if (CODE_NAMES.some((r) => r.compound === compound)) out.push({ href: L(`/code-names/#${compound}`), label: t(lang, 'lnk.codeNames', { c }) });
  if (TRIPLE.includes(compound)) out.push({ href: L('/compare/retatrutide-vs-tirzepatide-vs-semaglutide/'), label: t(lang, 'c3.h1') });
  if (PRICE_COMPOUNDS.includes(compound)) out.push({ href: L('/price-index/'), label: t(lang, 'lnk.priceIndex') });
  return out;
}

/** Hub links (compare hub, blends hub, shop-vs-shop hub, price index, code names). */
export function hubs(lang: Lang, keys: ('compare' | 'blends' | 'shopPairs' | 'priceIndex' | 'codeNames' | 'calculator')[]): Rel[] {
  const L = (p: string) => lp(lang, p);
  const m: Record<string, Rel> = {
    compare: { href: L('/compare/'), label: t(lang, 'lnk.compareHub') },
    blends: { href: L('/blends/'), label: t(lang, 'lnk.blendsHub') },
    shopPairs: { href: L('/vendors/compare/'), label: t(lang, 'rank.relPairs') },
    priceIndex: { href: L('/price-index/'), label: t(lang, 'lnk.priceIndex') },
    codeNames: { href: L('/code-names/'), label: t(lang, 'lnk.codeNamesHub') },
    calculator: { href: L('/calculator/'), label: t(lang, 'lnk.calcHub') },
  };
  return keys.map((k) => m[k]);
}

export function uniqRel(xs: Rel[]): Rel[] {
  const seen = new Set<string>();
  return xs.filter((x) => (seen.has(x.href) ? false : (seen.add(x.href), true)));
}
