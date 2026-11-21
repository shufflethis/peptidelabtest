import { VIDEO, abs } from '../lib/video';
import { LIVE_LANGS, lp, t } from '../i18n';
import { TOTALS } from '../lib/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Video sitemap: the home-page data video on the home page of every live language. */
export function GET() {
  const entries = LIVE_LANGS.map((lang) => `  <url>
    <loc>${abs(lp(lang, '/'))}</loc>
    <video:video>
      <video:thumbnail_loc>${abs(VIDEO.poster)}</video:thumbnail_loc>
      <video:title>${esc(t(lang, 'm5.videoName'))}</video:title>
      <video:description>${esc(t(lang, 'm5.videoDesc', { shops: TOTALS.shops, opened: TOTALS.reportsOpened, portal: TOTALS.portalVerified }))}</video:description>
      <video:content_loc>${abs(VIDEO.mp4)}</video:content_loc>
      <video:duration>${Math.round(VIDEO.durationSec)}</video:duration>
      <video:publication_date>${VIDEO.uploadDate}T08:00:00+08:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
      <video:live>no</video:live>
    </video:video>
  </url>`);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries.join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
