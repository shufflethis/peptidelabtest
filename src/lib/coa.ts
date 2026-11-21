/** COA statistics across all opened reports (published shops only). Pure grouping of audit.json values. */
import { VENDORS } from '../data/vendors';
import { fillPct, labKeyOf } from './site';

export const ALL_REPORTS = VENDORS.flatMap((v) => v.coaExamples.map((report) => ({ vendor: v, report, pct: fillPct(report) })));
const withPct = ALL_REPORTS.filter((r) => r.pct != null) as (typeof ALL_REPORTS[number] & { pct: number })[];
const pur = ALL_REPORTS.map((r) => r.report.purityPercent).filter((x): x is number => x != null);

export const COA_STATS = {
  reports: ALL_REPORTS.length,
  withFill: withPct.length,
  low: withPct.filter((r) => r.pct < 90).length,
  within: withPct.filter((r) => r.pct >= 90 && r.pct <= 110).length,
  high: withPct.filter((r) => r.pct > 110).length,
  purityMin: pur.length ? Math.min(...pur) : null,
  purityMax: pur.length ? Math.max(...pur) : null,
};

/** Reports outside 90-110 % of label, most extreme first. */
export const FILL_OUTLIERS = withPct.filter((r) => r.pct < 90 || r.pct > 110).sort((a, b) => Math.abs(b.pct - 100) - Math.abs(a.pct - 100));

/** Shops listing a given panel label (audit panelLabels). */
export function shopsWithPanel(label: string): number {
  return VENDORS.filter((v) => v.panelBadges.includes(label)).length;
}

/** Compact JSON for the client-side COA checker. */
export function checkerData() {
  return ALL_REPORTS.map(({ vendor, report }) => ({
    s: vendor.slug, n: vendor.name, c: report.compound, l: report.labelMg, m: report.measuredMg, p: report.purityPercent,
    lab: report.lab.replace(/\s*\(.*\)\s*$/, ''), lk: labKeyOf(report.lab)?.slug || null, id: report.reportId, d: report.testDate, v: report.verifiable, u: report.url,
  }));
}
