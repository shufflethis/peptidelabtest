import type { APIRoute } from 'astro';
import { indexCsv } from '../../lib/priceIndex';
export const GET: APIRoute = () => new Response(indexCsv(), { headers: { 'Content-Type': 'text/csv; charset=utf-8' } });
