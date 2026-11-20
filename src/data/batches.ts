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
  listPrice: number | null;
  reportUrl: string;
  verifiable: boolean;
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

import { ALL_VENDORS } from './vendors';
import { getCompoundBySlug } from './compounds';

function flag(pct: number): BatchAuditRecord['statusFlag'] {
  if (pct < 95) return 'UNDERFILL_ALERT';
  if (pct > 110) return 'OVERFILL';
  if (pct >= 97 && pct <= 105) return 'OPTIMAL';
  return 'MINOR_VARIANCE';
}

/** Only lab reports opened in the 2026-11-20 re-audit, each with its report URL. */
export const BATCH_RECORDS: BatchAuditRecord[] = ALL_VENDORS.filter((v) => !v.draft).flatMap((v) =>
  v.coaExamples
    .filter((c) => c.measuredMg && c.labelMg && c.purityPercent)
    .map((c, i) => {
      const prod = v.products.find((p) => p.compound === c.compound && p.vialMg === c.labelMg);
      const cur = (prod?.currency || (v.region === 'EU' ? 'EUR' : 'USD')) as 'EUR' | 'USD';
      return {
        id: `${v.slug}-${i}`,
        compoundSlug: c.compound,
        compoundName: getCompoundBySlug(c.compound)?.name || c.compound,
        vendorSlug: v.slug,
        vendorName: v.name,
        region: v.region as 'EU' | 'US',
        currency: cur,
        labelMg: c.labelMg!,
        measuredMg: c.measuredMg!,
        purityPercent: c.purityPercent!,
        listPrice: prod ? (prod.salePrice ?? prod.price) : null,
        reportUrl: c.url,
        verifiable: c.verifiable,
        labName: c.lab,
        batchRef: c.reportId || 'not published',
        testedDate: c.testDate || 'not published',
        panels: {
          hplc: true,
          lcms: v.panelBadges.includes('LC-MS identity'),
          endotoxin: v.panelBadges.includes('Endotoxin'),
          sterility: v.panelBadges.includes('Sterility'),
          heavyMetals: v.panelBadges.includes('Heavy metals'),
          contaminantScreen: false,
        },
        statusFlag: flag((100 * c.measuredMg!) / c.labelMg!),
      };
    }),
);

export interface ComputedBatchMetrics extends BatchAuditRecord {
  variancePercent: number;
  netPriceAfterCode: number | null;
  labelCostPerMg: number | null;
  trueMeasuredCostPerMg: number | null;
  promoCode?: string;
  discountPercent: number;
  vendorHref: string;
  vendorRel: string;
}

export function getComputedBatches(): ComputedBatchMetrics[] {
  return BATCH_RECORDS.map((b) => {
    const link = resolveVendorLink(b.vendorSlug);
    const discountPercent = link.discountPercent ?? 0;
    const netPriceAfterCode = b.listPrice == null ? null : Number((b.listPrice * (1 - discountPercent / 100)).toFixed(2));
    const variancePercent = Number((((b.measuredMg - b.labelMg) / b.labelMg) * 100).toFixed(1));
    const labelCostPerMg = b.listPrice == null ? null : Number((b.listPrice / b.labelMg).toFixed(2));
    const trueMeasuredCostPerMg = netPriceAfterCode == null ? null : Number((netPriceAfterCode / b.measuredMg).toFixed(2));
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
