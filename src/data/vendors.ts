import AUDIT from './audit.json';

export interface CoaExample {
  compound: string; shopProductName: string; labelMg: number | null; measuredMg: number | null;
  purityPercent: number | null; lab: string; reportId: string | null; testDate: string | null;
  purityLowerBoundPercent?: number; purityComparator?: '>' | '≥';
  url: string; verifiable: boolean;
}
export interface CoaStats {
  opened: number; portalVerified: number; purityMin: number | null; purityMax: number | null;
  purityMedian: number | null; fillMinPct: number | null; fillMaxPct: number | null;
}
export interface VendorProduct {
  compound: string; shopProductName: string; vialMg: number | null; price: number | null;
  currency: string; salePrice: number | null; url: string; inStock: boolean | null; pricePerMg: number | null;
}

export type RegionCode = 'EU' | 'US' | 'GLOBAL';

export interface ScoreBreakdown {
  labVerification: number;
  fillAccuracy: number;
  panelDepth: number;
  entityTransparency: number;
  dispatchReliability: number;
  /** -1 = not assessable (prices not public); excluded from overallScore */
  valuePerMg: number;
}

export interface VendorProfile {
  rank: number;
  slug: string;
  name: string;
  region: RegionCode;
  countryFlag: string;
  originCountry: string;
  overallScore: number;
  puritySummary: string;
  fillVarianceNote: string;
  legalEntity: string;
  testingLabs: string[];
  panelBadges: string[];
  dispatchSummary: string;
  freeShippingThreshold: string;
  paymentMethods: string[];
  topCompounds: string[];
  editorBadge?: string;
  verdictSummary: string;
  strengths: string[];
  weaknesses: string[];
  auditNotes: string;
  scores: ScoreBreakdown;
  /** Opened lab reports (sourced) */
  coaExamples: CoaExample[];
  coaStats: CoaStats;
  coaAccess: string;
  products: VendorProduct[];
  /** Advertised prices are pre-tax; list in the review, not in shared price rankings. */
  pricesExcludeVat?: boolean;
  shopUrl: string;
  shipsTo: string;
  subscoreReasons: Record<string, string>;
  sources: string[];
  reviewedAt: string;
  /** Not published yet (e.g. vendor must review the draft first) */
  draft?: boolean;
}

const COUNTRY: Record<string, string> = {
  RO: 'Romania', SK: 'Slovakia', CZ: 'Czechia', DE: 'Germany', PL: 'Poland', NL: 'Netherlands', IS: 'Iceland',
  NO: 'Norway', GB: 'United Kingdom', US: 'United States', EE: 'Estonia', LT: 'Lithuania', LV: 'Latvia', HU: 'Hungary',
  BG: 'Bulgaria', AT: 'Austria', ES: 'Spain', FR: 'France', IT: 'Italy', SI: 'Slovenia', HR: 'Croatia', CH: 'Switzerland',
};
const DRAFTS = new Set(['licensed-peptides']);
const half = (n: number) => (n < 0 ? -1 : Math.round(n * 5) / 10);
const fmt = (n: number) => (Math.round(n * 10) / 10).toString();

function shipsToLabel(x: unknown): string {
  if (!x) return 'not published';
  if (Array.isArray(x)) return x.length > 6 ? `${x.length} countries (${x.slice(0, 5).join(', ')} …)` : x.join(', ');
  return String(x);
}

function build(a: any): VendorProfile {
  const st: CoaStats = a.coaStats;
  const purity = st.purityMin == null
    ? (st.opened ? 'Purity not stated on opened reports' : 'No public lab reports found')
    : `${st.purityMin === st.purityMax ? st.purityMin : `${st.purityMin}–${st.purityMax}`}% reported purity (${st.opened} reports opened, ${st.portalVerified} verified on the lab portal)`;
  const fill = st.fillMinPct == null ? 'Measured content not published' : `Measured content ${fmt(st.fillMinPct)}–${fmt(st.fillMaxPct!)}% of label`;
  const products: VendorProduct[] = a.products || [];
  const seen = new Set<string>();
  const top = products.filter((p) => !seen.has(p.compound) && seen.add(p.compound)).slice(0, 3)
    .map((p) => `${p.shopProductName}`);
  const s = a.subscores;
  return {
    rank: a.rank,
    slug: a.slug,
    name: a.name,
    region: a.region,
    countryFlag: a.originCountry || '',
    originCountry: a.originCountry ? (COUNTRY[a.originCountry] || a.originCountry) : 'not published',
    overallScore: a.overallScore,
    puritySummary: purity,
    fillVarianceNote: fill,
    legalEntity: a.legalEntity || 'not published',
    testingLabs: a.testingLabs?.length ? a.testingLabs : ['none named'],
    panelBadges: a.panelLabels || [],
    dispatchSummary: a.dispatchInfo || 'not published',
    freeShippingThreshold: a.freeShippingThreshold || 'not published',
    paymentMethods: Array.isArray(a.paymentMethods) && a.paymentMethods.length ? a.paymentMethods : ['not published'],
    topCompounds: top,
    verdictSummary: a.verdict,
    strengths: a.strengths || [],
    weaknesses: a.weaknesses || [],
    auditNotes: a.summary,
    scores: {
      labVerification: half(s.labVerification), fillAccuracy: half(s.fillAccuracy), panelDepth: half(s.panelDepth),
      entityTransparency: half(s.entityTransparency), dispatchReliability: half(s.dispatchReliability), valuePerMg: half(s.valuePerMg),
    },
    coaExamples: a.coaExamples || [],
    coaStats: st,
    coaAccess: a.coaAccess,
    products,
    pricesExcludeVat: a.pricesExcludeVat === true,
    shopUrl: a.shopUrl,
    shipsTo: shipsToLabel(a.shipsTo),
    subscoreReasons: a.subscore_reasons || {},
    sources: a.sources || [],
    reviewedAt: a.readAt || '2026-11-20',
    draft: DRAFTS.has(a.slug) || undefined,
  };
}

/** Built from src/data/audit.json (sourced re-audit 2026-11-20, scripts/build-audit-data.py). Scores: 0–5. */
export const ALL_VENDORS: VendorProfile[] = (AUDIT as any[]).map(build);

export const VENDORS: VendorProfile[] = ALL_VENDORS.filter((v) => !v.draft);

export function getVendorBySlug(slug: string): VendorProfile | undefined {
  return VENDORS.find((v) => v.slug === slug);
}
