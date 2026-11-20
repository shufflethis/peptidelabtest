/**
 * Guides (/research/). Plain-language explainers without dosing or health content.
 * Any figures shown on guide pages are computed from audit.json at build time (see `data` blocks), never typed here.
 */
export interface ResearchArticle {
  slug: string;
  title: string;
  h1: string;
  category: string;
  publishedDate: string;
  excerpt: string;
  keyPoints: string[];
  sections: { heading: string; body: string[] }[];
  /** Data block rendered from audit.json */
  data?: 'code-names' | 'purity-vs-fill' | 'verify' | 'peptide-sciences';
}

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    slug: 'how-to-verify-janoshik-liquilabs-coa',
    title: 'How to Verify a Peptide Lab Report (COA) in 4 Steps',
    h1: 'How to verify a peptide lab report',
    category: 'Lab reports',
    publishedDate: '2026-11-20',
    excerpt: 'A lab report on a shop page is a claim. Checking it on the lab’s own website turns it into evidence. Here is how, in four steps.',
    keyPoints: [
      'A PDF or screenshot on a shop page can be edited. The lab’s own record cannot be edited by the shop.',
      'Most labs print a report number, key or QR code that opens the lab’s copy.',
      'Compare compound, label amount, measured mg, purity, date and batch with the shop’s copy.',
    ],
    sections: [
      {
        heading: 'The four steps',
        body: [
          '1. Find the report number, key or QR code on the report.',
          '2. Type the lab’s address into your browser yourself. Do not rely on a link inside the PDF.',
          '3. Look up the report on the lab’s site.',
          '4. Compare every field with the shop’s copy: compound, label amount, measured mg, purity, test date and batch.',
        ],
      },
      {
        heading: 'If the lab has no lookup',
        body: ['Some labs do not offer a public lookup. Then the report is “shop-hosted”: it may be genuine, but you cannot confirm it with the lab. Our scores give these reports less weight than portal-verified ones.'],
      },
    ],
    data: 'verify',
  },
  {
    slug: 'purity-vs-net-content-underfill-audit',
    title: 'Purity vs Measured mg: Why a Lab Report Needs Both',
    h1: 'Purity vs measured mg: why a lab report needs both',
    category: 'Lab reports',
    publishedDate: '2026-11-20',
    excerpt: 'HPLC purity tells you how clean the peptide is. Measured mg tells you how much is in the vial. One does not replace the other.',
    keyPoints: [
      'Purity (HPLC) is the share of the main compound among the substances the method detects.',
      'Measured mg (net content) is the amount of compound actually found in the vial.',
      'A vial can show high purity and still hold more or less than the label says.',
    ],
    sections: [
      {
        heading: 'Two different questions',
        body: [
          'Purity answers “how clean is it?”. Measured mg answers “how much is there?”.',
          'We divide measured mg by label mg to get “measured vs label”. 100% means the vial holds exactly what the label says.',
        ],
      },
      {
        heading: 'What to look for on a report',
        body: ['Check that the report states both a purity figure and a measured amount in mg for the vial size you are looking at. A report with purity only cannot tell you the amount in the vial.'],
      },
    ],
    data: 'purity-vs-fill',
  },
  {
    slug: 'rt-3-glp-3-retatrutide-code-names',
    title: 'Retatrutide Code Names Used by Shops (RT-3, GLP-3 and More)',
    h1: 'Retatrutide and tirzepatide code names used by shops',
    category: 'Product names',
    publishedDate: '2026-11-20',
    excerpt: 'Many shops list retatrutide and tirzepatide under code names. This list shows the product names we recorded in our audit, and how to check identity on a report.',
    keyPoints: [
      'Code names are not standardised; the same code can mean different things at different shops.',
      'Only a lab report with identity testing (mass spectrometry) confirms what is in the vial.',
      'The list below comes straight from the product names we recorded.',
    ],
    sections: [
      {
        heading: 'How to check identity',
        body: ['Look for an identity test on the report, usually mass spectrometry (LC-MS or ESI-MS), and compare the mass with the expected value on our compound page. Some labs also offer a blind test that names the compound found.'],
      },
    ],
    data: 'code-names',
  },
  {
    slug: 'peptide-sciences-alternatives-2026',
    title: 'Peptide Sciences Closure (2026): What Its Notice Says',
    h1: 'Peptide Sciences closure: what its notice says',
    category: 'Shop news',
    publishedDate: '2026-11-20',
    excerpt: 'Peptide Sciences stopped selling research products in March 2026. A short summary of its own notice and where to compare audited shops.',
    keyPoints: [
      'peptidesciences.com states that sales of research-use-only products were discontinued in March 2026.',
      'The notice says no third party is authorised to act as its successor or sell on its behalf.',
      'Audited shops are compared on our shop ranking by audit score.',
    ],
    sections: [
      {
        heading: 'Summary',
        body: ['Our status page quotes the notice and lists the highest-scoring audited partner shops in the US and EU.'],
      },
    ],
    data: 'peptide-sciences',
  },
];

export function getArticleBySlug(slug: string): ResearchArticle | undefined {
  return RESEARCH_ARTICLES.find((a) => a.slug === slug);
}
