/** Home-page data video (rendered by docs/agent/video/render.py from audit.json). Numbers in the transcript are computed here from the same data. */
import { VENDORS_BY_SCORE, TOTALS, CHECKED_ISO, SITE_URL } from './site';
import { verifyByLab } from './charts';

export const VIDEO = {
  mp4: '/video/coa-verified.mp4',
  webm: '/video/coa-verified.webm',
  poster: '/video/coa-verified-poster.jpg',
  width: 1280,
  height: 720,
  durationSec: 29.5,
  durationIso: 'PT30S',
  uploadDate: '2026-11-21',
};

export function videoFacts() {
  const withRep = VENDORS_BY_SCORE.filter((v) => v.coaStats.opened > 0);
  return {
    shops: TOTALS.shops,
    opened: TOTALS.reportsOpened,
    portal: TOTALS.portalVerified,
    copy: TOTALS.reportsOpened - TOTALS.portalVerified,
    pct: Math.round((100 * TOTALS.portalVerified) / TOTALS.reportsOpened),
    withRep: withRep.length,
    zero: withRep.filter((v) => v.coaStats.portalVerified === 0).length,
    noRep: TOTALS.shops - withRep.length,
    products: TOTALS.products,
    labs: verifyByLab((p) => p),
    checked: CHECKED_ISO,
  };
}

export const abs = (p: string) => `${SITE_URL}${p}`;

import { t, fmtDate, listJoin, fmtPct, type Lang } from '../i18n';

/** Transcript paragraphs, one per scene, localized; all numbers from videoFacts(). */
export function videoTranscript(lang: Lang): string[] {
  const f = videoFacts();
  const date = fmtDate(lang, f.checked);
  const V = { ...f, date, pct: fmtPct(lang, f.pct, 0), labList: listJoin(lang, f.labs.map((l) => t(lang, 'm5.vLab', { lab: l.label, p: l.portal, o: l.opened }))) };
  return ['v1', 'v2', 'v3', 'v4', 'v5', 'v6'].map((k) => t(lang, `m5.${k}`, V));
}

export function videoSchema(lang: Lang, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: t(lang, 'm5.videoName'),
    description: t(lang, 'm5.videoDesc', { shops: TOTALS.shops, opened: TOTALS.reportsOpened, portal: TOTALS.portalVerified }),
    thumbnailUrl: [abs(VIDEO.poster)],
    contentUrl: abs(VIDEO.mp4),
    uploadDate: `${VIDEO.uploadDate}T08:00:00+08:00`,
    duration: VIDEO.durationIso,
    width: VIDEO.width,
    height: VIDEO.height,
    transcript: videoTranscript(lang).join(' '),
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}
