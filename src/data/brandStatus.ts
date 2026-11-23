/** Domain snapshots from the initial 21 November check, with later audits linked individually. */
export type DomainState = 'officialClosed' | 'successorClaim' | 'researcherGate' | 'shop' | 'accessGate' | 'forSale' | 'audited';
export interface BrandDomain { domain: string; state: DomainState; seen: string }
export interface BrandStatus {
  slug: string; name: string; status: 'closed' | 'gated' | 'unclear' | 'audited';
  vendor?: string; domains: BrandDomain[]; sources: string[];
}
export const BRANDS: BrandStatus[] = [
  {
    slug: 'peptide-sciences', name: 'Peptide Sciences', status: 'closed',
    domains: [
      { domain: 'peptidesciences.com', state: 'officialClosed', seen: 'Peptide Sciences voluntarily discontinued all research-use-only product sales in March 2026. … has not authorized any third party to sell research-use-only products on its behalf, operate a replacement website, represent itself as a successor …' },
      { domain: 'realpeptidesciences.com', state: 'successorClaim', seen: 'Peptide Sciences is back up and running at realpeptidesciences.com' },
    ],
    sources: ['https://www.peptidesciences.com/', 'https://realpeptidesciences.com/peptide-sciences-shutdown-notice'],
  },
  {
    slug: 'amino-club', name: 'Amino Club', status: 'gated',
    domains: [
      { domain: 'aminoclub.com', state: 'researcherGate', seen: 'Researcher verification: date of birth and a research-use declaration before the catalog is shown' },
      { domain: 'aminoclub.org', state: 'shop', seen: 'Homepage title "Home - Amino Club"' },
    ],
    sources: ['https://www.aminoclub.com/age-verify?return=%2F', 'https://aminoclub.org/'],
  },
  {
    slug: 'primal-peptides', name: 'Primal Peptides', status: 'audited', vendor: 'primal-peptides',
    domains: [
      { domain: 'primalpeptides.nl', state: 'audited', seen: 'Audit of the Dutch storefront only; no relationship to the other listed domains established.' },
      { domain: 'primalpeptides.net', state: 'shop', seen: 'About page: "Primal Peptides was founded with a simple mission …"' },
      { domain: 'theprimalpeptides.com', state: 'shop', seen: 'Homepage: "At Primal Peptides, we are committed to providing high-quality research peptides …"' },
      { domain: 'primal-peptide.com', state: 'shop', seen: 'Homepage title "Primal Peptides – Structured Research Standards"' },
      { domain: 'primalpeptides.org', state: 'accessGate', seen: 'Redirects to a "Research Access" page before the shop' },
      { domain: 'primalpeptides.com', state: 'forSale', seen: 'Parked page: "The domain name primalpeptides.com is for sale"' },
    ],
    sources: ['https://primalpeptides.nl', 'https://primalpeptides.net/about-us', 'https://theprimalpeptides.com', 'https://primal-peptide.com/', 'https://primalpeptides.org/', 'https://primalpeptides.com'],
  },
  {
    slug: 'nextgen-peptides', name: 'NextGen Peptides', status: 'unclear',
    domains: [
      { domain: 'nxtgenpep.com', state: 'shop', seen: 'Homepage title "NextGen Peptides"' },
      { domain: 'ngpeptide.com', state: 'shop', seen: 'Homepage title "NextGen Peptides | Buy Research Peptides Online | NGPeptide"' },
      { domain: 'nextgen-peptides.net', state: 'shop', seen: 'Homepage title "NextGen Peptides | Research Catalog"' },
    ],
    sources: ['https://nxtgenpep.com/', 'https://www.ngpeptide.com/', 'https://www.nextgen-peptides.net/'],
  },
  {
    slug: 'limitless-biotech', name: 'Limitless Biotech', status: 'audited', vendor: 'limitless-life-nootropics',
    domains: [{ domain: 'limitlesslifenootropics.com', state: 'audited', seen: 'Audited shop (Limitless Life Nootropics, brand Limitless Biotech)' }],
    sources: [],
  },
];
export const brandBySlug = (s: string) => BRANDS.find((b) => b.slug === s);
