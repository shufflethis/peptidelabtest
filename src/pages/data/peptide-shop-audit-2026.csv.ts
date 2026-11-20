import type { APIRoute } from 'astro';
import { toCsv } from '../../lib/dataset';
export const GET: APIRoute = () => new Response(toCsv(), { headers: { 'Content-Type': 'text/csv; charset=utf-8' } });
