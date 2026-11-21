/** M5 chart data helpers: pure grouping/counting of audit.json values (no new numbers). */
import type { VendorProfile } from '../data/vendors';
import { LABS_IN_DATA, reportsByLab, VENDORS_BY_SCORE } from './site';

export interface VerifyRow { label: string; href?: string; opened: number; portal: number; accent?: boolean }

/** One row per lab in our data: reports opened that name the lab, and how many we confirmed on its portal. */
export function verifyByLab(L: (p: string) => string): VerifyRow[] {
  return LABS_IN_DATA.map((l) => {
    const reps = reportsByLab(l.slug);
    return { label: l.name.replace(/\s*\(.*\)\s*$/, ''), href: L(`/labs/${l.slug}/`), opened: reps.length, portal: reps.filter((r) => r.report.verifiable).length };
  }).sort((a, b) => b.opened - a.opened || b.portal - a.portal);
}

/** One row per shop (only shops with at least one opened report unless keepEmpty). */
export function verifyByShop(vendors: VendorProfile[], L: (p: string) => string, keepEmpty = false, highlight?: string): VerifyRow[] {
  return vendors
    .map((v) => ({ label: v.name, href: L(`/vendors/${v.slug}/`), opened: v.coaStats.opened, portal: v.coaStats.portalVerified, accent: highlight ? v.slug === highlight : undefined }))
    .filter((r) => keepEmpty || r.opened > 0);
}

/** Totals across a list of shops. */
export function verifyTotal(vendors: VendorProfile[] = VENDORS_BY_SCORE) {
  return vendors.reduce((a, v) => ({ opened: a.opened + v.coaStats.opened, portal: a.portal + v.coaStats.portalVerified }), { opened: 0, portal: 0 });
}
