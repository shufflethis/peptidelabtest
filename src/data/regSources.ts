/**
 * Regulator and manufacturer sources opened on 21 Nov 2026 (copies of the opened text: docs/agent/goal/sources/).
 * Shown as plain text only (no links). Facts below paraphrase these pages; nothing is added.
 */
export interface RegSource {
  id: string;
  publisher: string;
  title: string;
  /** publication date of the document (ISO) when stated */
  date?: string;
  url: string;
}

export const ACCESSED_ISO = '2026-11-21';

export const REG_SOURCES: Record<string, RegSource> = {
  fdaGlp1: {
    id: 'fdaGlp1', publisher: 'U.S. Food and Drug Administration',
    title: "FDA's Concerns with Unapproved GLP-1 Drugs",
    url: 'https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss',
  },
  wlPeptidePartners: {
    id: 'wlPeptidePartners', publisher: 'U.S. Food and Drug Administration', title: 'Warning letter 735063 (Peptide Partners LLC)', date: '2026-08-24',
    url: 'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/peptide-partners-llc-735063-08242026',
  },
  wlPeak: {
    id: 'wlPeak', publisher: 'U.S. Food and Drug Administration', title: 'Warning letter 735127 (Peak Performance Peptides)', date: '2026-08-24',
    url: 'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/peak-performance-peptides-735127-08242026',
  },
  wlPinkPony: {
    id: 'wlPinkPony', publisher: 'U.S. Food and Drug Administration', title: 'Warning letter 721088 (Lovega LLC dba Pink Pony Peptides)', date: '2026-03-31',
    url: 'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/lovega-llc-dba-pink-pony-peptides-721088-03312026',
  },
  wlGram: {
    id: 'wlGram', publisher: 'U.S. Food and Drug Administration', title: 'Warning letter 721806 (Gram Peptides)', date: '2026-03-31',
    url: 'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/gram-peptides-721806-03312026',
  },
  wlSummit: {
    id: 'wlSummit', publisher: 'U.S. Food and Drug Administration', title: 'Warning letter 695607 (Summit Research Peptides)', date: '2024-12-10',
    url: 'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/summit-research-peptides-695607-12102024',
  },
  lillyReta: {
    id: 'lillyReta', publisher: 'Eli Lilly and Company (Lilly Medical)', title: 'Is retatrutide available in the consumer market?', date: '2026-08-04',
    url: 'https://medical.lilly.com/us/products/answers/is-retatrutide-available-in-the-consumer-market-381272',
  },
};

/** Code names quoted in the FDA warning letters above (product name as written by the seller -> compound). */
export const FDA_CODE_NAMES: { name: string; compound: string; source: string }[] = [
  { name: 'GLP-3 RT', compound: 'retatrutide', source: 'wlPinkPony' },
  { name: 'GLP-2 TZ', compound: 'tirzepatide', source: 'wlPinkPony' },
  { name: 'GLP-1-R peptide', compound: 'retatrutide', source: 'wlGram' },
  { name: 'GLP-2 peptide', compound: 'tirzepatide', source: 'wlGram' },
  { name: 'GLP-3R', compound: 'retatrutide', source: 'wlPeak' },
  { name: 'GLP-3 Reta', compound: 'retatrutide', source: 'wlPeptidePartners' },
  { name: 'GLP-2 T', compound: 'tirzepatide', source: 'wlPeptidePartners' },
  { name: 'GLP-1 S', compound: 'semaglutide', source: 'wlPeptidePartners' },
  { name: 'Reta', compound: 'retatrutide', source: 'wlSummit' },
  { name: 'Tirz', compound: 'tirzepatide', source: 'wlSummit' },
  { name: 'Sema', compound: 'semaglutide', source: 'wlSummit' },
];

/** Warning letters that name retatrutide (for the retatrutide page), newest first. */
export const RETA_LETTERS = ['wlPeptidePartners', 'wlPeak', 'wlPinkPony', 'wlGram', 'wlSummit'];

/** Regulatory status of GLP-1-class compounds compared on the site (i18n key gs.<key>), each with its opened source. */
export const REG_STATUS: Record<string, { key: 'approvedIngredient' | 'investigational'; source: string }> = {
  semaglutide: { key: 'approvedIngredient', source: 'fdaGlp1' },
  tirzepatide: { key: 'approvedIngredient', source: 'fdaGlp1' },
  retatrutide: { key: 'investigational', source: 'lillyReta' },
};
