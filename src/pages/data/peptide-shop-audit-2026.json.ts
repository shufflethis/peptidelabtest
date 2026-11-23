import type { APIRoute } from 'astro';
import { DATASET, DATASET_REVIEW_COVERAGE } from '../../lib/dataset';
import { SITE_URL } from '../../lib/site';
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({ name: 'PeptideLabIndex research peptide shop audit 2026', source: `${SITE_URL}/data/`, reviewCoverage: DATASET_REVIEW_COVERAGE, license: 'CC BY 4.0', rows: DATASET }, null, 1),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
  );
