export interface TestingLabProfile {
  slug: string;
  name: string;
  location: string;
  verificationMethod: string;
  portalUrl: string;
  methodsOffered: string[];
  accreditationNote: string;
  vendorsUsing: string[];
}

export const TESTING_LABS: TestingLabProfile[] = [
  {
    slug: 'janoshik-analytical',
    name: 'Janoshik Analytical',
    location: 'Prague, Czech Republic',
    verificationMethod: 'Public task number + unique cryptographic verification key on janoshik.com/tests/',
    portalUrl: 'https://janoshik.com',
    methodsOffered: ['RP-HPLC Purity', 'LC-MS Identity', 'Net Peptide Content (mg)', 'Blind GLP-1 Screen', 'Endotoxin & Heavy Metals'],
    accreditationNote:
      'Gold-standard specialist laboratory for grey-market and RUO peptide verification globally; hosts immutable sample photos and verification keys directly on its server.',
    vendorsUsing: ['CertaPeptides', 'Particle Peptides', 'Avellon Peptides', 'PeptidProfi', 'Onyx Peptides'],
  },
  {
    slug: 'liquilabs',
    name: 'Liquilabs s.r.o.',
    location: 'Czech Republic',
    verificationMethod: 'Direct lab-hosted certificate URLs indexed by batch code',
    portalUrl: 'https://liquilabs.cz',
    methodsOffered: ['Ph. Eur. HPLC Purity', 'Net Content (mg)', 'Endotoxin (LAL)', 'Microbial TAMC/TYMC', 'ICP-MS Heavy Metals'],
    accreditationNote:
      'Performs comprehensive European Pharmacopoeia multi-point safety panels rarely seen on standard purity-only certificates.',
    vendorsUsing: ['Particle Peptides', '24Peptides'],
  },
  {
    slug: 'kovera-labs',
    name: 'Kovera Labs',
    location: 'Buffalo Grove, Illinois, USA',
    verificationMethod: 'Certificate ID lookup and direct lab verification',
    portalUrl: 'https://koveralabs.com',
    methodsOffered: ['HPLC Purity', 'LC-MS Identity', 'Net Mass', 'USP <85> Endotoxin', 'USP <71> Sterility', 'Heavy Metals'],
    accreditationNote:
      'US analytical lab delivering full 6-tier safety and assay panels including sterility and bacterial endotoxins.',
    vendorsUsing: ['Real Peptides'],
  },
  {
    slug: 'ils-laboratories',
    name: 'ILS Laboratories',
    location: 'San Diego, California, USA',
    verificationMethod: 'Cryptographic QR / URL token on portal.ils-lab.com/verify/',
    portalUrl: 'https://portal.ils-lab.com',
    methodsOffered: ['RP-HPLC Purity', 'LC-MS Mass Confirmation', 'Net Content (mg)', 'Endotoxin', 'Fentanyl Contaminant Screen'],
    accreditationNote:
      'Widely adopted by transparent 2025–2026 US peptide suppliers; includes dedicated fentanyl cross-contamination screening.',
    vendorsUsing: ['Arctic Lab Supply', 'GhostLabz Research', 'Source Research', 'NextSelf Labs'],
  },
  {
    slug: 'freedom-diagnostics',
    name: 'Freedom Diagnostics Testing',
    location: 'Franklin, Tennessee, USA',
    verificationMethod: 'Direct PDF archive hosted on coas.freedomdiagnosticstesting.com + lookup tool',
    portalUrl: 'https://freedomdiagnosticstesting.com',
    methodsOffered: ['HPLC Purity', 'Net Vial Content (mg)', 'Endotoxin', 'Microbial PCR'],
    accreditationNote:
      'Hosts original PDFs on its own subdomain so researchers can verify byte-identical authenticity against vendor uploads.',
    vendorsUsing: ['Arctic Lab Supply', 'Purified Peptide', 'Genesis Peptides', 'GhostLabz Research', 'NextSelf Labs'],
  },
  {
    slug: 'mz-biolabs',
    name: 'MZ Biolabs',
    location: 'Tucson, Arizona, USA',
    verificationMethod: 'Direct lab confirmation & signed analytical chromatograms',
    portalUrl: 'https://www.mzbiolabs.com',
    methodsOffered: ['RP-HPLC Purity', 'ESI-MS Molecular Weight Identification', 'Peptide Net Mass'],
    accreditationNote:
      'Long-established Arizona mass-spectrometry and peptide analytical facility.',
    vendorsUsing: ['Ascension Peptides', 'Limitless Life Nootropics'],
  },
];

export interface ResearchArticle {
  slug: string;
  title: string;
  category: string;
  publishedDate: string;
  readTime: string;
  excerpt: string;
  keyFindings: string[];
  sections: { heading: string; body: string }[];
}

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    slug: 'rt-3-glp-3-retatrutide-code-names',
    title: 'RT-3, GLP-3, Triple G & SR-3RT: Decoding Every Retatrutide Vendor Code Name via LC-MS',
    category: 'Code-Name Verification',
    publishedDate: '2026-11-12',
    readTime: '6 min read',
    excerpt:
      'Why US and EU peptide shops rename Retatrutide and Tirzepatide—and how to confirm whether "RT-3", "GLP-3", "RP-3", or "NS-3RT" actually contains the 4731.3 Da triple agonist.',
    keyFindings: [
      'Payment processors and pharmaceutical trademark bots trigger automated takedowns on the word "Retatrutide", prompting shorthand SKUs like RT-3, GLP-3, Triple G, and SR-3RT.',
      'Code names carry zero legal standardization: only an LC-MS deconvoluted molecular weight around 4731.33 Da (or a Janoshik blind GLP-1 screen) proves compound identity.',
      'Tirzepatide follows a parallel naming pattern: GL-2 TZ, SR-2TZ, GLP-2, and TRZ (~4813.45 Da).',
    ],
    sections: [
      {
        heading: 'Complete 2026 Code-Name Cross-Reference Table',
        body: 'Across our 22-vendor audit, Retatrutide (CAS 2381089-83-2) appeared under seven distinct storefront labels: RT-3 (Avellon Peptides), GLP-3 RT (Arctic Lab Supply), GL-3 RT (GhostLabz Research), SR-3RT (Source Research), NS-3RT (NextSelf Labs), RP-3 (Primal), and Triple G (Glowing). In every verified instance, the linked Janoshik or ILS certificate confirmed Retatrutide by mass spectrometry.',
      },
      {
        heading: 'How to Verify Shorthand Vials Before Reconstitution',
        body: 'Never rely on vial cap color or shorthand letters alone. Open the linked laboratory portal, confirm the task date is within the last 6 months, match the printed lot code on your vial against the certificate, and verify both HPLC purity (≥99.0%) and measured milligram mass.',
      },
    ],
  },
  {
    slug: 'peptide-sciences-alternatives-2026',
    title: 'Peptide Sciences 2026 Shutdown: What Happened & Top Lab-Verified US/EU Alternatives',
    category: 'Market Intelligence',
    publishedDate: '2026-11-08',
    readTime: '5 min read',
    excerpt:
      'Following Peptide Sciences’ voluntary operational closure in March 2026, legacy buyers face dozens of copycat domains. Here is how current third-party-tested suppliers compare on COA depth and $/mg.',
    keyFindings: [
      'Peptide Sciences ceased operations in March 2026 amid heightened US regulatory scrutiny and legacy reliance on unverified in-house COAs.',
      'Any new domain claiming to be "Peptide Sciences Official Relaunch" should be treated as a phishing or clone risk unless corporate continuity is proven.',
      'Modern top-ranked US suppliers (Real Peptides via Kovera Labs; Arctic Lab Supply & Source Research via ILS) provide dramatically stronger independent lab verification at 40%–60% lower $/mg cost.',
    ],
    sections: [
      {
        heading: 'Why In-House COAs Are No Longer Acceptable in 2026',
        body: 'Historically, legacy vendors published self-generated PDFs bearing their own logo with no independent laboratory name. In 2026, leading suppliers publish cryptographic portal links to Janoshik Analytical, Liquilabs, Kovera Labs, or ILS Laboratories covering net peptide mass, endotoxins, and heavy metals.',
      },
      {
        heading: 'Direct Replacement Routing (US vs. EU)',
        body: 'US domestic researchers migrating from Peptide Sciences achieve full 6-panel sterility + endotoxin coverage at Real Peptides or 20%-discounted lot-matched ILS verification at Arctic Lab Supply. European researchers eliminate customs holds completely via CertaPeptides (Romania) or Particle Peptides (Slovakia).',
      },
    ],
  },
  {
    slug: 'purity-vs-net-content-underfill-audit',
    title: '99.5% Pure—and 39% Empty: Why Net Milligram Content Beats HPLC Purity Alone',
    category: 'COA Methodology',
    publishedDate: '2026-11-02',
    readTime: '7 min read',
    excerpt:
      'An HPLC chromatogram only measures peptide purity relative to other UV-absorbing peaks—it ignores mannitol filler and underfilled vials. Our batch tracker exposes swings from -39.2% to +34%.',
    keyFindings: [
      'A 10 mg labeled vial containing 6.08 mg of peptide and 40 mg of mannitol excipient can still score 99.4% HPLC purity.',
      'Without quantitative net peptide content (mg) assay on the COA, concentration math in any reconstitution calculator can be off by 15% to 40%.',
      'Calculating True $/mg (post-discount vial price divided by COA-measured mg) changes vendor value rankings dramatically.',
    ],
    sections: [
      {
        heading: 'How Lyophilization Fill Variance Happens',
        body: 'Research peptides are filled as liquid aliquots into glass vials prior to freeze-drying. Poor pump calibration, upstream raw powder salt/moisture weight (TFA or acetate counter-ions typically account for 8%–18% of gross powder weight), or deliberate under-dosing cause finished vials to deviate sharply from label claims.',
      },
      {
        heading: 'Using Measured mg in Your Reconstitution Math',
        body: 'In our Reconstitution Calculator, always populate the optional "COA Measured Content (mg)" field. For example, adding 2.0 ml of bacteriostatic water to a 10 mg vial that actually tested at 10.76 mg yields 5,380 mcg/ml rather than 5,000 mcg/ml.',
      },
    ],
  },
  {
    slug: 'how-to-verify-janoshik-liquilabs-coa',
    title: '5-Step COA Verification Protocol: Spotting Altered PDFs & Upstream Manufacturer Reports',
    category: 'Lab Verification',
    publishedDate: '2026-10-24',
    readTime: '6 min read',
    excerpt:
      'Step-by-step checklist for validating Janoshik keys, Liquilabs URLs, ILS QR codes, and Freedom Diagnostics byte-hashes before placing a research order.',
    keyFindings: [
      'Screenshot COAs with cropped headers, blurred client names, or missing verification URLs fail audit verification automatically.',
      'Distinguish vendor-commissioned post-bottling tests from upstream Chinese raw-batch certificates shared by 10 different shops.',
      'Check laboratory accreditation scopes: an ISO/IEC 17025 badge for cannabis potency does not automatically cover peptide RP-HPLC.',
    ],
    sections: [
      {
        heading: 'Portal Resolution Beats PDF Downloads',
        body: 'PDF metadata and text layers take less than two minutes to edit. Always click through to janoshik.com/tests/, portal.ils-lab.com, or coas.freedomdiagnosticstesting.com and verify that the lab-hosted record shows the identical compound, mg content, and date.',
      },
    ],
  },
];

export function getArticleBySlug(slug: string): ResearchArticle | undefined {
  return RESEARCH_ARTICLES.find((a) => a.slug === slug);
}
