/** M6 audit badge: SVG per audited shop showing its real audit score, linking to its review. */
import { VENDORS } from '../data/vendors';
import { shopShort, SITE_URL, CHECKED_ISO } from './site';

export const BADGE_W = 280;
export const BADGE_H = 72;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const badgeSrc = (slug: string) => `${SITE_URL}/badge/${slug}.svg`;
export const reviewUrl = (slug: string) => `${SITE_URL}/vendors/${slug}/`;

export function badgeSvg(slug: string): string {
  const v = VENDORS.find((x) => x.slug === slug)!;
  const name = shopShort(v.name);
  const nm = name.length > 20 ? `${name.slice(0, 19)}…` : name;
  const score = v.overallScore.toFixed(1);
  const month = new Date(`${CHECKED_ISO}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
  const fill = Math.max(0, Math.min(1, v.overallScore / 5)) * 64;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${BADGE_W}" height="${BADGE_H}" viewBox="0 0 ${BADGE_W} ${BADGE_H}" role="img" aria-label="${esc(`PeptideLabIndex audit: ${v.name} ${score} of 5, checked ${month}`)}">
  <title>${esc(`PeptideLabIndex audit: ${v.name} ${score} / 5 (checked ${month})`)}</title>
  <rect x="0.5" y="0.5" width="${BADGE_W - 1}" height="${BADGE_H - 1}" rx="12" fill="#ffffff" stroke="#0f766e"/>
  <rect x="8" y="8" width="72" height="${BADGE_H - 16}" rx="8" fill="#0f766e"/>
  <text x="44" y="38" text-anchor="middle" font-family="Inter, Arial, Helvetica, sans-serif" font-size="22" font-weight="800" fill="#ffffff">${score}</text>
  <text x="44" y="54" text-anchor="middle" font-family="Inter, Arial, Helvetica, sans-serif" font-size="11" font-weight="600" fill="#ccfbf1">of 5</text>
  <rect x="12" y="${BADGE_H - 14}" width="64" height="3" rx="1.5" fill="#134e4a"/>
  <rect x="12" y="${BADGE_H - 14}" width="${fill.toFixed(1)}" height="3" rx="1.5" fill="#5eead4"/>
  <text x="92" y="25" font-family="Inter, Arial, Helvetica, sans-serif" font-size="11" font-weight="700" fill="#0f766e">PEPTIDELABINDEX AUDIT</text>
  <text x="92" y="45" font-family="Inter, Arial, Helvetica, sans-serif" font-size="15" font-weight="700" fill="#0f172a">${esc(nm)}</text>
  <text x="92" y="62" font-family="Inter, Arial, Helvetica, sans-serif" font-size="11" fill="#334155">Lab reports checked ${month}</text>
</svg>
`;
}

export function embedCode(slug: string): string {
  const v = VENDORS.find((x) => x.slug === slug)!;
  return `<a href="${reviewUrl(slug)}" title="${esc(`${v.name}: audit score and lab reports on PeptideLabIndex`)}"><img src="${badgeSrc(slug)}" width="${BADGE_W}" height="${BADGE_H}" alt="${esc(`PeptideLabIndex audit score for ${v.name}: ${v.overallScore.toFixed(1)} of 5`)}"></a>`;
}
