/**
 * Lab guide facts. Only statements we could read on each lab's own public site (or on a report it issued),
 * read on 2026-11-20. Anything we could not source is null and rendered as "not published".
 * Counts (reports, portal-verified, fill range) are NOT stored here; they are computed from audit.json.
 */
export interface LabGuide {
  slug: string;
  name: string;
  /** Short plain description, sourced */
  about: string;
  address: string | null;
  operator: string | null;
  tests: string[];
  /** Verification steps specific to this lab, if the lab documents them */
  verifySteps: string[] | null;
  verifyWhere: string | null;
  accreditation: string | null;
  pricing: string | null;
  turnaround: string | null;
  sources: string[];
}

export const LAB_GUIDES: LabGuide[] = [
  {
    slug: 'janoshik',
    name: 'Janoshik Analytical',
    about:
      'Janoshik describes itself as an independent testing laboratory for anabolic compounds, peptides, SARMs and related substances. It accepts samples from clients worldwide and states that every report in its database can be verified.',
    address: null,
    operator: null,
    tests: [
      'Peptide identity, amount and purity (for example its BPC-157 test: HPLC, result as mg per vial and peptide purity)',
      'Blind test for common GLP-1 peptides (semaglutide, tirzepatide, retatrutide)',
      'Tests for many other compound classes (steroids, SARMs, SERMs)',
    ],
    verifySteps: [
      'Find the task number and the unique key on the report. Both are printed on Janoshik reports; the report also carries a QR code.',
      'Type janoshik.com/verification into your browser yourself and enter the task number and the unique key.',
      'Compare the lab record with the shop’s copy: compound, label amount, measured mg, purity, test date and sample photo.',
    ],
    verifyWhere: 'janoshik.com/verification (task number + unique key) or the QR code on the report',
    accreditation: null,
    pricing: 'Tests are sold one by one in its online shop. The pages we read did not show a price we could record.',
    turnaround: null,
    sources: ['https://janoshik.com/', 'https://janoshik.com/about-us/', 'https://janoshik.com/services/', 'https://janoshik.com/pricelist/bpc-157-analysis/', 'https://janoshik.com/verification/'],
  },
  {
    slug: 'vanguard',
    name: 'Vanguard Laboratory',
    about:
      'Vanguard Laboratory offers peptide testing for resellers, researchers and manufacturers and publishes a lab-hosted record for each report ("Verified by Vanguard") that can be opened by QR code.',
    address: '2635 Parkmont Ln SW, Suite A, Olympia, WA 98502, USA',
    operator: null,
    tests: [
      'Silver level: purity, quantity and identity',
      'Gold level: adds endotoxins and sterility (USP 71)',
      'Elite level: adds heavy metals (four vials required)',
      'Add-ons: fentanyl testing, TFA analysis, vial seal integrity, residual solvents',
    ],
    verifySteps: [
      'Scan the QR code on the report, or type verifiedbyvanguard.com into your browser yourself.',
      'Open the lab-hosted record and compare it with the PDF the shop shows you.',
      'Note that clients can keep reports private or link-only, so a report missing from public search is not proof it was never tested.',
    ],
    verifyWhere: 'verifiedbyvanguard.com (QR code on the report)',
    accreditation: null,
    pricing: 'Published: Silver $250, Gold $550, Elite $700 per sample; 10% off for 10 or more samples.',
    turnaround: '7-10 business days; sterility (USP 71) takes 14 days (as stated by the lab).',
    sources: ['https://verifiedbyvanguard.com/'],
  },
  {
    slug: 'ils',
    name: 'ILS Laboratories',
    about:
      'ILS Laboratories is an analytical lab in San Diego offering HPLC, mass spectrometry, ICP-MS and microbiology. It runs a client portal and issues QR-verified certificates.',
    address: '8222 Vickers St, Suite 106, San Diego, CA 92111, USA',
    operator: 'Laboratory services by ILS Labs Inc.; platform and billing by ILS Analytical LLC (as stated on its site).',
    tests: [
      'Purity and quantitation (HPLC)',
      'Identity confirmation (LC-MS)',
      'Endotoxin (USP <85>)',
      'Rapid sterility screen (DNA microarray)',
      'Heavy metals (ICP-MS)',
    ],
    verifySteps: [
      'Find the access code on the report: printed in bold under the QR code in the top-right header, and again in the footer next to the COA number. It is usually 7-8 letters and numbers.',
      'Type ils-lab.com/verify into your browser yourself and enter the code, or scan the QR code.',
      'Compare the verified result with the shop’s copy: compound, results, sample details and signatory.',
    ],
    verifyWhere: 'ils-lab.com/verify (access code under the QR code)',
    accreditation: 'States a quality system based on ISO/IEC 17025, and that peptide testing is not within any accreditation scope.',
    pricing: 'Standard pricing is shown to new accounts in its client portal; volume discounts of 5-20% are listed on the order page.',
    turnaround: 'About one week; rush reporting three business days from lab receipt (as stated by the lab).',
    sources: ['https://ils-lab.com/', 'https://ils-lab.com/verify/', 'https://portal.ils-lab.com/order'],
  },
  {
    slug: 'freedom-diagnostics',
    name: 'Freedom Diagnostics Testing',
    about:
      'Freedom Diagnostics Testing is a US lab focused on research-use-only peptides. It states it was established in 2023 in Franklin, Tennessee, and that its certificates are publicly searchable.',
    address: '133 Holiday Ct, Suite 106, Franklin, TN 37067, USA',
    operator: null,
    tests: ['Purity (HPLC)', 'Identity (LC-MS)', 'Net content', 'Endotoxins', 'Sterility (PCR)', 'Conformity (extra vials from the same lot)', 'Heavy metals', 'Fentanyl screen'],
    verifySteps: null,
    verifyWhere: 'Public certificate search on the lab’s own site',
    accreditation: null,
    pricing: 'Not published as a price list on the pages we read; volume discounts of 5-15% are described.',
    turnaround: '1-3 business days on average (as stated by the lab).',
    sources: ['https://freedomdiagnosticstesting.com/'],
  },
  {
    slug: 'kovera',
    name: 'Kovera Labs',
    about: 'Kovera Labs offers compound testing and COA verification. Samples are shipped to its lab in Illinois, and each certificate can be checked by QR code and report code.',
    address: '350 Lexington Dr, Buffalo Grove, IL 60089, USA',
    operator: null,
    tests: ['Purity (HPLC) plus net content', 'Identity (LC-MS)', 'Add-on panels: heavy metals, endotoxin, sterility'],
    verifySteps: null,
    verifyWhere: 'Verification by QR code and report code on koveralabs.com',
    accreditation: null,
    pricing: null,
    turnaround: null,
    sources: ['https://koveralabs.com/', 'https://koveralabs.com/services'],
  },
  {
    slug: 'liquilabs',
    name: 'Liquilabs s.r.o.',
    about:
      'Liquilabs s.r.o. is a Czech chemical analysis lab serving biotechnology, food, supplement and cosmetics clients. It also offers analysis of research peptides.',
    address: null,
    operator: 'Liquilabs s.r.o.',
    tests: ['Peptide content and purity (HPLC-UV or HPLC-MS)', 'Endotoxin testing', 'Bioburden (TAMC and TYMC)', 'Heavy metals (ICP-MS or AAS)'],
    verifySteps: null,
    verifyWhere: 'Reports we opened were hosted on base.liquilabs.cz',
    accreditation: null,
    pricing: 'Individual quote on request (as stated by the lab).',
    turnaround: null,
    sources: ['https://liquilabs.cz/en/', 'https://liquilabs.cz/en/research-peptide-analysis-and-testing/'],
  },
  {
    slug: 'mz-biolabs',
    name: 'MZ Biolabs',
    about: 'MZ Biolabs describes itself as a specialty testing and discovery lab using mass spectrometry, serving research, medical and veterinary markets.',
    address: '2102 N Country Club Rd, Suite C, Tucson, AZ 85716, USA',
    operator: null,
    tests: ['Mass-spectrometry based testing (details not listed on the home page)'],
    verifySteps: null,
    verifyWhere: null,
    accreditation: null,
    pricing: null,
    turnaround: null,
    sources: ['https://mzbiolabs.com/'],
  },
  {
    slug: 'trustpointe',
    name: 'TrustPointe Analytics',
    about: 'TrustPointe Analytics LLC is a US peptide testing lab. Its certificates carry a key that can be checked in its online LIMS.',
    address: '1743 142nd Ave, Suite 4, Dorr, MI 49323, USA (as printed on its certificates)',
    operator: 'TrustPointe Analytics LLC',
    tests: ['HPLC purity and potency (methods stated as validated according to USP <1225>)', 'Endotoxin (USP <85>)'],
    verifySteps: [
      'Find the key printed on the certificate ("Verify at TrustPointeLIMS.com, Key=...").',
      'Type trustpointelims.com into your browser yourself and enter the key.',
      'Compare the lab record with the shop’s copy.',
    ],
    verifyWhere: 'trustpointelims.com (key printed on the certificate)',
    accreditation: null,
    pricing: null,
    turnaround: '3-5 business days from receipt (as stated by the lab).',
    sources: ['https://trustpointeanalytics.com/', 'https://trustpointeanalytics.com/peptide-analytical-testing'],
  },
  {
    slug: 'biosyn',
    name: 'BioSyn',
    about: 'BioSyn is the lab name printed on the reports we opened. We could not find a lab website, address, accreditation or verification portal for it.',
    address: null,
    operator: null,
    tests: [],
    verifySteps: null,
    verifyWhere: null,
    accreditation: null,
    pricing: null,
    turnaround: null,
    sources: [],
  },
];

export function getLabGuide(slug: string): LabGuide | undefined {
  return LAB_GUIDES.find((l) => l.slug === slug);
}
