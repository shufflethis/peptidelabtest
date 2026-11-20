/**
 * i18n core. UI strings live in <lang>.json (nested keys, {placeholders}, plural objects {one, other}).
 * Missing keys fall back to English. Data texts (compounds, labs, audit …) are in data/<lang>.json (flat key paths).
 */
import en from './en.json';
import de from './de.json';
import es from './es.json';
import fr from './fr.json';
import it from './it.json';

export const LANGS = ['en', 'de', 'es', 'fr', 'it'] as const;
export type Lang = (typeof LANGS)[number];
export const OTHER_LANGS = LANGS.filter((l) => l !== 'en') as Exclude<Lang, 'en'>[];
/** Languages that are built and linked (hreflang, switcher, sitemap). Enabled one by one once green. */
export const LIVE_LANGS: Lang[] = ['en', 'de', 'es'];
export const LIVE_OTHER = LIVE_LANGS.filter((l) => l !== 'en') as Exclude<Lang, 'en'>[];
export const LOCALE: Record<Lang, string> = { en: 'en-US', de: 'de-DE', es: 'es-ES', fr: 'fr-FR', it: 'it-IT' };
export const OG_LOCALE: Record<Lang, string> = { en: 'en_US', de: 'de_DE', es: 'es_ES', fr: 'fr_FR', it: 'it_IT' };
export const LANG_LABEL: Record<Lang, string> = { en: 'EN', de: 'DE', es: 'ES', fr: 'FR', it: 'IT' };
export const LANG_NAME: Record<Lang, string> = { en: 'English', de: 'Deutsch', es: 'Español', fr: 'Français', it: 'Italiano' };

const DICTS: Record<Lang, any> = { en, de, es, fr, it };

function get(obj: any, key: string): any {
  let cur = obj;
  for (const k of key.split('.')) {
    if (cur == null || typeof cur !== 'object') return undefined;
    cur = cur[k];
  }
  return cur;
}

export type Vars = Record<string, string | number | null | undefined>;

function fill(s: string, vars?: Vars): string {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] == null ? m : String(vars[k])));
}

/** Translate a UI key; falls back to English, then to the key itself. */
export function t(lang: Lang, key: string, vars?: Vars): string {
  let v = get(DICTS[lang], key);
  if (typeof v !== 'string') v = get(en, key);
  if (typeof v !== 'string') return key;
  return fill(v, vars);
}

/** Plural-aware translation: entry is {one, other} (optionally zero/few/many). {n} is filled automatically. */
export function tn(lang: Lang, key: string, n: number, vars?: Vars): string {
  let v = get(DICTS[lang], key);
  if (!v || typeof v !== 'object') v = get(en, key);
  if (!v || typeof v !== 'object') return key;
  const cat = n === 0 && v.zero ? 'zero' : new Intl.PluralRules(LOCALE[lang]).select(n);
  const s = v[cat] ?? v.other;
  return fill(s, { ...vars, n });
}

/** Array/object lookup (lists of FAQ, steps …), falling back to English. */
export function tv<T = any>(lang: Lang, key: string): T {
  const v = get(DICTS[lang], key);
  return (v === undefined ? get(en, key) : v) as T;
}

/** Path for a language: '/prices/' -> '/de/prices/' */
export function lp(lang: Lang, path: string): string {
  if (lang === 'en' || !path.startsWith('/')) return path;
  return `/${lang}${path}`;
}

/** Strip a language prefix from a pathname. */
export function splitLang(pathname: string): { lang: Lang; path: string } {
  const m = pathname.match(/^\/(de|es|fr|it)(\/.*)?$/);
  if (!m) return { lang: 'en', path: pathname || '/' };
  return { lang: m[1] as Lang, path: m[2] || '/' };
}

/** Localized list join: "a, b and c" / "a, b und c" … */
export function listJoin(lang: Lang, items: string[]): string {
  try {
    return new (Intl as any).ListFormat(LOCALE[lang], { style: 'long', type: 'conjunction' }).format(items);
  } catch {
    if (items.length <= 1) return items.join('');
    return `${items.slice(0, -1).join(', ')} ${t(lang, 'common.and')} ${items[items.length - 1]}`;
  }
}

// ---------------------------------------------------------------- number formatting (no conversion)

export function num(lang: Lang, n: number, digits = 1): string {
  return new Intl.NumberFormat(LOCALE[lang], { minimumFractionDigits: digits, maximumFractionDigits: digits, useGrouping: true }).format(n);
}

function sym(cur: string): string {
  return cur === 'EUR' ? '€' : cur === 'USD' ? '$' : cur;
}

/** €12.50 (en) / 12,50 € (de, es, fr, it). Currency symbol of the data currency, never converted. */
export function fmtMoney(lang: Lang, n: number, cur: string, digits = 2): string {
  const v = num(lang, n, digits);
  if (lang === 'en') return cur === 'EUR' || cur === 'USD' ? `${sym(cur)}${v}` : `${cur} ${v}`;
  return `${v}\u00a0${sym(cur)}`;
}

export function fmtPct(lang: Lang, n: number, digits = 1): string {
  const v = num(lang, n, digits);
  return lang === 'en' || lang === 'it' ? `${v}%` : `${v}\u00a0%`;
}

export function fmtDate(lang: Lang, iso: string, month: 'short' | 'long' = 'short'): string {
  const d = new Date(`${iso}T12:00:00Z`);
  if (lang === 'en') return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(d);
  return new Intl.DateTimeFormat(LOCALE[lang], { day: 'numeric', month, year: 'numeric', timeZone: 'UTC' }).format(d);
}

/** Title from a list of candidate templates: first that fits 60 chars (hard limit). */
export function tt(lang: Lang, key: string, vars?: Vars): string {
  let v = tv<any>(lang, key);
  const arr: string[] = (Array.isArray(v) ? v : [v]).filter((x) => typeof x === 'string').map((x: string) => fill(x, vars));
  for (const c of arr) if (c.length <= 60) return c;
  const last = arr[arr.length - 1] || key;
  return last.slice(0, 60).replace(/\s+\S*$/, '');
}

/** Meta description from candidate templates: first inside 130-155 chars, else first <= 155. */
export function td(lang: Lang, key: string, vars?: Vars): string {
  let v = tv<any>(lang, key);
  const arr: string[] = (Array.isArray(v) ? v : [v]).filter((x) => typeof x === 'string').map((x: string) => fill(x, vars));
  return arr.find((c) => c.length >= 130 && c.length <= 155) || arr.find((c) => c.length <= 155) || (arr[arr.length - 1] || '').slice(0, 155);
}

/** FAQ list [{q, a}] with placeholders filled (falls back to English list). */
export function tfaq(lang: Lang, key: string, vars?: Vars): { q: string; a: string }[] {
  const arr = tv<{ q: string; a: string }[]>(lang, key) || [];
  return arr.map((f) => ({ q: fill(f.q, vars), a: fill(f.a, vars) }));
}

/** String list with placeholders filled. */
export function tlist(lang: Lang, key: string, vars?: Vars): string[] {
  const arr = tv<string[]>(lang, key) || [];
  return arr.map((s) => fill(s, vars));
}
