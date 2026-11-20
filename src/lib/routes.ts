/** Static path lists shared by the English routes and the /[lang]/ mirrors. */
import { LIVE_OTHER } from '../i18n';
import { VENDORS } from '../data/vendors';
import { COMPOUNDS } from '../data/compounds';
import { COUNTRY_LAWS } from '../data/laws';
import { RESEARCH_ARTICLES } from '../data/labs';
import { PRICE_COMPOUNDS, SIZE_PAGES, COMPOUND_PAIRS, pairSlug, SHOP_PAIRS, LABS_IN_DATA } from './site';

type P = { params: Record<string, string>; props: Record<string, any> };
export const R = {
  pricesCompound: (): P[] => PRICE_COMPOUNDS.map((compound) => ({ params: { compound }, props: { compound } })),
  pricesSize: (): P[] => SIZE_PAGES.map((s) => ({ params: { compound: s.compound, size: `${s.size}mg` }, props: { compound: s.compound, size: s.size } })),
  vendor: (): P[] => VENDORS.map((v) => ({ params: { slug: v.slug }, props: { slug: v.slug } })),
  shopPair: (): P[] => SHOP_PAIRS.map(([a, b]) => ({ params: { pair: `${a}-vs-${b}` }, props: { a, b } })),
  compoundPair: (): P[] => COMPOUND_PAIRS.map(([a, b]) => ({ params: { pair: pairSlug(a, b) }, props: { a, b } })),
  lab: (): P[] => LABS_IN_DATA.map((l) => ({ params: { lab: l.slug }, props: { lab: l.slug } })),
  compound: (): P[] => COMPOUNDS.map((c) => ({ params: { slug: c.slug }, props: { slug: c.slug } })),
  law: (): P[] => COUNTRY_LAWS.map((l) => ({ params: { slug: l.slug }, props: { slug: l.slug } })),
  research: (): P[] => RESEARCH_ARTICLES.map((a) => ({ params: { slug: a.slug }, props: { slug: a.slug } })),
  single: (): P[] => [{ params: {}, props: {} }],
};

/** Mirror a path list into every live non-English language. */
export function withLangs(list: P[]): P[] {
  return LIVE_OTHER.flatMap((lang) => list.map((p) => ({ params: { ...p.params, lang }, props: { ...p.props, lang } })));
}
