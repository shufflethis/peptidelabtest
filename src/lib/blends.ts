/** Blend products (GOAL M3): read from audit.json blendProducts/blendReports (source: docs/agent/goal/research/blends.json). */
import AUDIT from '../data/audit.json';
import { VENDORS, type VendorProfile } from '../data/vendors';
import { isPartner, productHref } from './site';

export interface BlendMeta { slug: string; key: string; name: string; components: string[] }
export const BLENDS: BlendMeta[] = [
  { slug: 'wolverine-bpc-157-tb-500', key: 'wolverine', name: 'Wolverine', components: ['bpc-157', 'tb-500'] },
  { slug: 'klow', key: 'klow', name: 'KLOW', components: ['ghk-cu', 'bpc-157', 'tb-500', 'kpv'] },
  { slug: 'glow', key: 'glow', name: 'GLOW', components: ['ghk-cu', 'bpc-157', 'tb-500'] },
  { slug: 'cjc-1295-ipamorelin', key: 'cjc-ipamorelin', name: 'CJC-1295 + Ipamorelin', components: ['cjc-1295', 'ipamorelin'] },
];

export interface BlendOffer {
  vendor: VendorProfile; partner: boolean; name: string; totalMg: number; composition: Record<string, number> | null;
  price: number | null; listPrice: number | null; currency: string; perMg: number | null; inStock: boolean | null; url: string; href: string | null; readAt: string;
}
export interface BlendReport {
  vendor: VendorProfile; lab: string | null; lot: string | null; reportId: string | null; testDate: string | null; purityPercent: number | null;
  labelMg: number | null; measured: Record<string, number> | null; url: string; note?: string;
}

const audit = AUDIT as any[];
const live = (slug: string) => VENDORS.find((v) => v.slug === slug);

export function blendOffers(key: string): BlendOffer[] {
  const out: BlendOffer[] = [];
  for (const a of audit) {
    const v = live(a.slug);
    if (!v) continue;
    for (const p of a.blendProducts || []) {
      if (p.blend !== key) continue;
      const sale = p.salePrice != null && p.price != null && p.salePrice < p.price;
      out.push({
        vendor: v, partner: isPartner(v.slug), name: p.shopProductName, totalMg: p.totalMg, composition: p.composition,
        price: p.salePrice ?? p.price, listPrice: sale ? p.price : null, currency: p.currency, perMg: p.pricePerMg, inStock: p.inStock,
        url: p.url, href: productHref(v.slug, p.url), readAt: p.readAt,
      });
    }
  }
  return out.sort((x, y) => (x.partner !== y.partner ? (x.partner ? -1 : 1) : (x.perMg ?? Infinity) - (y.perMg ?? Infinity) || y.vendor.overallScore - x.vendor.overallScore));
}

export function blendReports(key: string): BlendReport[] {
  const out: BlendReport[] = [];
  for (const a of audit) {
    const v = live(a.slug);
    if (!v) continue;
    for (const r of a.blendReports || []) if (r.blend === key) out.push({ vendor: v, lab: r.lab, lot: r.lot, reportId: r.reportId ?? null, testDate: r.testDate, purityPercent: r.purityPercent, labelMg: r.labelMg, measured: r.measured, url: r.url, note: r.note });
  }
  return out;
}

export const blendBySlug = (slug: string) => BLENDS.find((b) => b.slug === slug);
export const blendShops = (key: string) => Array.from(new Set(blendOffers(key).map((o) => o.vendor.slug)));
