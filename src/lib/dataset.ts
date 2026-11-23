/** Open dataset rows (one per product), built from audit.json via vendors.ts. Draft vendors excluded. */
import { VENDORS } from '../data/vendors';
import { reviewCoverage } from './site';

export interface DatasetRow {
  shop: string; shopSlug: string; region: string; compound: string; product: string; vialMg: number | null;
  price: number | null; salePrice: number | null; currency: string; pricePerMg: number | null;
  labReportOpenedForCompound: boolean; portalVerified: boolean; shopScore: number; reviewedAt: string; pricesExcludeVat: boolean;
}

export const DATASET: DatasetRow[] = VENDORS.flatMap((v) =>
  v.products.map((p) => {
    const reps = v.coaExamples.filter((c) => c.compound === p.compound);
    return {
      shop: v.name, shopSlug: v.slug, region: v.region, compound: p.compound, product: p.shopProductName, vialMg: p.vialMg,
      price: p.price, salePrice: p.salePrice, currency: p.currency, pricePerMg: p.pricePerMg,
      labReportOpenedForCompound: reps.length > 0, portalVerified: reps.some((c) => c.verifiable),
      shopScore: v.overallScore, reviewedAt: v.reviewedAt,
      pricesExcludeVat: v.pricesExcludeVat === true,
    };
  }),
);

export const DATASET_REVIEW_COVERAGE = reviewCoverage(DATASET);

export const DATASET_COLUMNS: (keyof DatasetRow)[] = [
  'shop', 'shopSlug', 'region', 'compound', 'product', 'vialMg', 'price', 'salePrice', 'currency', 'pricePerMg',
  'labReportOpenedForCompound', 'portalVerified', 'shopScore', 'reviewedAt', 'pricesExcludeVat',
];

export function toCsv(): string {
  const esc = (v: unknown) => {
    if (v == null) return '';
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [DATASET_COLUMNS.join(','), ...DATASET.map((r) => DATASET_COLUMNS.map((c) => esc(r[c])).join(','))].join('\n') + '\n';
}
