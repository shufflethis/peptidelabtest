import type { APIRoute } from 'astro';
import { VENDORS } from '../../data/vendors';
import { badgeSvg } from '../../lib/badge';
export const getStaticPaths = () => VENDORS.map((v) => ({ params: { slug: v.slug } }));
export const GET: APIRoute = ({ params }) => new Response(badgeSvg(params.slug as string), { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
