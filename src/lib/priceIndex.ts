/**
 * M6 price index: median listed price per mg per compound, EUR and USD kept separate (no conversion).
 * Source = every product in audit.json with a price per mg (sale price if listed, else list price, / vial mg),
 * read on the shop's audit date. Other currencies (PLN) are excluded. One edition per month: the current
 * edition is computed from audit.json; earlier editions are frozen in src/data/priceIndexHistory.json
 * (append the previous month's rows there before refreshing audit.json for a new month).
 */
import { PRICE_COMPOUNDS, offersFor, compoundShort, median, CHECKED_ISO } from './site';
import HISTORY from '../data/priceIndexHistory.json';

export const INDEX_CURRENCIES = ['EUR', 'USD'] as const;
export type IndexCur = (typeof INDEX_CURRENCIES)[number];

export interface IndexCell { median: number; min: number; max: number; offers: number; shops: number; readFrom: string; readTo: string }
export interface IndexRow { month: string; compound: string; name: string; cells: Partial<Record<IndexCur, IndexCell>> }

export const INDEX_MONTH = CHECKED_ISO.slice(0, 7);

const r3 = (n: number) => Math.round(n * 1000) / 1000;

export const INDEX_ROWS: IndexRow[] = PRICE_COMPOUNDS.map((c) => {
  const offers = offersFor(c).filter((o) => o.perMg != null);
  const cells: Partial<Record<IndexCur, IndexCell>> = {};
  for (const cur of INDEX_CURRENCIES) {
    const xs = offers.filter((o) => o.currency === cur);
    if (!xs.length) continue;
    const v = xs.map((o) => o.perMg as number);
    const dates = xs.map((o) => o.vendor.reviewedAt).sort();
    cells[cur] = {
      median: r3(median(v) as number), min: Math.min(...v), max: Math.max(...v), offers: xs.length,
      shops: new Set(xs.map((o) => o.vendor.slug)).size, readFrom: dates[0], readTo: dates[dates.length - 1],
    };
  }
  return { month: INDEX_MONTH, compound: c, name: compoundShort(c), cells };
}).filter((r) => Object.keys(r.cells).length > 0);

/** All editions, newest first (current + frozen history). */
export const INDEX_EDITIONS: string[] = Array.from(new Set([INDEX_MONTH, ...(HISTORY as IndexRow[]).map((r) => r.month)])).sort().reverse();

export const INDEX_TOTALS = (() => {
  const all = INDEX_ROWS.flatMap((r) => Object.values(r.cells)) as IndexCell[];
  const dates = all.flatMap((c) => [c.readFrom, c.readTo]).sort();
  return {
    compounds: INDEX_ROWS.length,
    offers: all.reduce((n, c) => n + c.offers, 0),
    excluded: PRICE_COMPOUNDS.flatMap((c) => offersFor(c)).filter((o) => o.perMg == null || !INDEX_CURRENCIES.includes(o.currency as IndexCur)).length,
    readFrom: dates[0],
    readTo: dates[dates.length - 1],
  };
})();

/** Previous edition's cell for a compound/currency, if any (for the change column once history exists). */
export function previousCell(compound: string, cur: IndexCur): IndexCell | undefined {
  const prev = INDEX_EDITIONS.find((m) => m < INDEX_MONTH);
  if (!prev) return undefined;
  return (HISTORY as IndexRow[]).find((r) => r.month === prev && r.compound === compound)?.cells[cur];
}

export const CSV_PATH = '/price-index/peptide-price-index.csv';

export function indexCsv(): string {
  const head = ['month', 'compound', 'currency', 'median_price_per_mg', 'min_price_per_mg', 'max_price_per_mg', 'listings', 'shops', 'prices_read_from', 'prices_read_to'];
  const rows = [...(HISTORY as IndexRow[]), ...INDEX_ROWS].flatMap((r) =>
    INDEX_CURRENCIES.filter((cur) => r.cells[cur]).map((cur) => {
      const c = r.cells[cur]!;
      return [r.month, r.compound, cur, c.median, c.min, c.max, c.offers, c.shops, c.readFrom, c.readTo].join(',');
    }),
  );
  return [head.join(','), ...rows].join('\n') + '\n';
}
