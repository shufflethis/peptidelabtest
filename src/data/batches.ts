import { resolveVendorLink } from './affiliates';

export interface BatchAuditRecord {
  id: string;
  compoundSlug: string;
  compoundName: string;
  vendorSlug: string;
  vendorName: string;
  region: 'EU' | 'US';
  currency: 'EUR' | 'USD';
  labelMg: number;
  measuredMg: number;
  purityPercent: number;
  listPrice: number;
  labName: string;
  batchRef: string;
  testedDate: string;
  panels: {
    hplc: boolean;
    lcms: boolean;
    endotoxin: boolean;
    sterility: boolean;
    heavyMetals: boolean;
    contaminantScreen: boolean;
  };
  statusFlag: 'OPTIMAL' | 'OVERFILL' | 'MINOR_VARIANCE' | 'UNDERFILL_ALERT';
}

/**
 * Legacy batch figures from the initial build had no traceable lab reports and were removed on 2026-11-20
 * (CONTENT_RULES: every measured number needs a verifiable source). Re-added only with a public COA link.
 */
export const BATCH_RECORDS: BatchAuditRecord[] = [
];

export interface ComputedBatchMetrics extends BatchAuditRecord {
  variancePercent: number;
  netPriceAfterCode: number;
  labelCostPerMg: number;
  trueMeasuredCostPerMg: number;
  promoCode?: string;
  discountPercent: number;
  vendorHref: string;
  vendorRel: string;
}

export function getComputedBatches(): ComputedBatchMetrics[] {
  return BATCH_RECORDS.map((b) => {
    const link = resolveVendorLink(b.vendorSlug);
    const discountPercent = link.discountPercent ?? 0;
    const netPriceAfterCode = Number((b.listPrice * (1 - discountPercent / 100)).toFixed(2));
    const variancePercent = Number((((b.measuredMg - b.labelMg) / b.labelMg) * 100).toFixed(1));
    const labelCostPerMg = Number((b.listPrice / b.labelMg).toFixed(2));
    const trueMeasuredCostPerMg = Number((netPriceAfterCode / b.measuredMg).toFixed(2));
    return {
      ...b,
      variancePercent,
      netPriceAfterCode,
      labelCostPerMg,
      trueMeasuredCostPerMg,
      promoCode: link.promoCode,
      discountPercent,
      vendorHref: link.href,
      vendorRel: link.rel,
    };
  });
}
