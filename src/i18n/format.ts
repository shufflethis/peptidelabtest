/** Locale-aware formatting of UI-generated values (decimal comma for de/es/fr/it; currency symbol kept, never converted). */
import { t, num, fmtMoney, fmtPct, fmtDate, type Lang } from './index';

export function fmt(lang: Lang) {
  const na = t(lang, 'common.na');
  const ok = (n: number | null | undefined): n is number => n != null && Number.isFinite(n);
  const dec = (n: number) => (Number.isInteger(n) ? 0 : Math.min(3, (String(n).split('.')[1] || '').length));
  return {
    na,
    num: (n: number | null | undefined, d = 1) => (ok(n) ? num(lang, n, d) : na),
    /** plain number with the decimals it has (e.g. 99.266 -> 99,266) */
    raw: (n: number | null | undefined) => (ok(n) ? num(lang, n, dec(n)) : na),
    int: (n: number) => num(lang, n, 0),
    score: (n: number) => num(lang, n, 1),
    money: (n: number | null | undefined, cur: string) => (ok(n) ? fmtMoney(lang, n, cur) : na),
    perMg: (n: number | null | undefined, cur: string) => (ok(n) ? `${fmtMoney(lang, n, cur, n < 0.1 ? 3 : 2)}/mg` : na),
    pct: (n: number | null | undefined, d = 1) => (ok(n) ? fmtPct(lang, n, d) : na),
    /** 95.9–115.2 % */
    pctRange: (a: number, b: number, d = 1) => {
      const s = fmtPct(lang, b, d);
      return `${num(lang, a, d)}–${s}`;
    },
    /** raw-decimals % range (purity) */
    rawPctRange: (a: number, b: number) => (a === b ? fmtPct(lang, a, dec(a)) : `${num(lang, a, dec(a))}–${fmtPct(lang, b, dec(b))}`),
    rawPct: (n: number) => fmtPct(lang, n, dec(n)),
    mg: (n: number | null | undefined) => (ok(n) ? `${num(lang, n, dec(n))} mg` : na),
    date: (iso: string) => fmtDate(lang, iso),
  };
}
export type Fmt = ReturnType<typeof fmt>;
