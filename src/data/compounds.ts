export type CompoundCategory =
  | 'Metabolic & Incretin'
  | 'Tissue & Cell-Signaling Research'
  | 'GH Secretagogues'
  | 'Neuropeptide Research'
  | 'Mitochondrial & Cellular Research'
  | 'Melanocortin & Immune';

export interface CompoundSpec {
  slug: string;
  name: string;
  category: CompoundCategory;
  casNumber: string;
  molecularWeightDa: string;
  formulaOrClass: string;
  purityBenchmark: string;
  codeNameAliases: string[];
  standardReconstitution: string;
  defaultVialMg: number;
  defaultBacMl: number;
  topEuVendorSlug: string;
  topUsVendorSlug: string;
  summary: string;
  analyticalNotes: string;
}

export const COMPOUNDS: CompoundSpec[] = [
  {
    slug: 'retatrutide',
    name: 'Retatrutide (LY3437943)',
    category: 'Metabolic & Incretin',
    casNumber: '2381089-83-2',
    molecularWeightDa: '4731.33 Da',
    formulaOrClass: '39-amino-acid acylated triple GIP/GLP-1/GCGR agonist',
    purityBenchmark: '≥ 99.0% (RP-HPLC)',
    codeNameAliases: ['RT-3', 'GLP-3', 'Triple G', 'RP-3', 'SR-3RT', 'GL-3 RT', 'NS-3RT', 'RTA GLP-1'],
    standardReconstitution: '',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'arctic-lab-supply',
    summary:
      `Retatrutide (development code LY3437943) is a synthetic 39-amino-acid acylated peptide designed to act on three receptors: GIP, GLP-1 and glucagon. It is an investigational compound in clinical development, not an approved medicine. Shops sell it as a research-use-only reagent, often under code names.`,
    analyticalNotes:
      `Because many shops list retatrutide under code names, check that the lab report confirms identity by mass spectrometry (expected mass about 4731 Da), not only HPLC purity.`,
  },
  {
    slug: 'tirzepatide',
    name: 'Tirzepatide',
    category: 'Metabolic & Incretin',
    casNumber: '2023788-19-2',
    molecularWeightDa: '4813.45 Da',
    formulaOrClass: '39-residue C20 fatty-diacid acylated GIP/GLP-1 co-agonist',
    purityBenchmark: '≥ 99.0% (RP-HPLC)',
    codeNameAliases: ['TZ-2', 'GLP-2', 'GL-2 TZ', 'SR-2TZ', 'TRZ GLP-1'],
    standardReconstitution: '',
    defaultVialMg: 15,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'arctic-lab-supply',
    summary:
      `Tirzepatide is a synthetic 39-residue peptide with a C20 fatty diacid side chain that acts on the GIP and GLP-1 receptors. Shops sell research-grade material as a research-use-only reagent. This site covers those research listings only.`,
    analyticalNotes:
      `Check that the report confirms identity by mass spectrometry (expected mass about 4813 Da) and states the measured mg, not only HPLC purity.`,
  },
  {
    slug: 'semaglutide',
    name: 'Semaglutide',
    category: 'Metabolic & Incretin',
    casNumber: '910463-68-2',
    molecularWeightDa: '4113.58 Da',
    formulaOrClass: '31-residue acylated GLP-1(7-37) analogue',
    purityBenchmark: '≥ 99.0% (RP-HPLC)',
    codeNameAliases: ['GLP-1 S', 'SG-1', 'Sema'],
    standardReconstitution: '',
    defaultVialMg: 5,
    defaultBacMl: 2,
    topEuVendorSlug: 'onyx-peptides',
    topUsVendorSlug: 'arctic-lab-supply',
    summary:
      `Semaglutide is a 31-residue acylated analogue of GLP-1(7-37) with a C18 fatty diacid side chain and an Aib substitution at position 8. Shops sell research-grade material as a research-use-only reagent. This site covers those research listings only.`,
    analyticalNotes:
      `Check that the report confirms identity by mass spectrometry (expected mass about 4114 Da) and states the measured mg.`,
  },
  {
    slug: 'bpc-157',
    name: 'BPC-157 (Pentadecapeptide)',
    category: 'Tissue & Cell-Signaling Research',
    casNumber: '137525-51-0',
    molecularWeightDa: '1419.53 Da',
    formulaOrClass: '15-residue synthetic gastric peptide (Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val)',
    purityBenchmark: '≥ 99.2% (RP-HPLC)',
    codeNameAliases: ['PL 14736', 'Body Protection Compound-157', 'BPC157 Acetate / Arginate'],
    standardReconstitution: '',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'real-peptides',
    summary:
      `BPC-157 is a synthetic 15-amino-acid peptide (Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val). Research on it is preclinical, and it has no approved medical use. Shops sell it as a research-use-only reagent, as acetate or arginate salt.`,
    analyticalNotes:
      `Shops sell acetate and arginate salt forms. Check which salt the report covers and that it states the measured mg, not only HPLC purity.`,
  },
  {
    slug: 'tb-500',
    name: 'TB-500 (Thymosin Beta-4 / Ac-SDKP / 17-23)',
    category: 'Tissue & Cell-Signaling Research',
    casNumber: '77591-33-4',
    molecularWeightDa: '4963.50 Da (full Tβ4) / 889.01 Da (17-23 fragment)',
    formulaOrClass: '43-amino-acid actin-sequestering polypeptide (or Ac-LKKTETQ fragment)',
    purityBenchmark: '≥ 99.0% (RP-HPLC)',
    codeNameAliases: ['Thymosin Beta-4', 'TB4', 'Thymosin Beta-4 fragment'],
    standardReconstitution: '',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'particle-peptides',
    topUsVendorSlug: 'real-peptides',
    summary:
      `TB-500 is the name shops use for a synthetic peptide related to thymosin beta-4, a 43-amino-acid actin-binding protein. Depending on the shop, the product is the full-length peptide or a short fragment. Research on it is preclinical, and it has no approved medical use.`,
    analyticalNotes:
      `Some shops sell the 7-residue fragment Ac-LKKTETQ (about 889 Da) as TB-500, others the full 43-residue thymosin beta-4 (about 4963 Da). Check the mass on the lab report to see which one you are looking at.`,
  },
  {
    slug: 'ghk-cu',
    name: 'GHK-Cu (Copper Tripeptide-1)',
    category: 'Mitochondrial & Cellular Research',
    casNumber: '89030-95-5',
    molecularWeightDa: '403.92 Da (2:1 / 1:1 Cu2+ complex)',
    formulaOrClass: 'Gly-His-Lys·Cu(II) coordination complex',
    purityBenchmark: '≥ 99.0% peptide moiety + stoichiometric Cu content',
    codeNameAliases: ['Copper Peptide', 'Prezatide Copper'],
    standardReconstitution: '',
    defaultVialMg: 50,
    defaultBacMl: 3,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'real-peptides',
    summary:
      `GHK-Cu is the copper(II) complex of the tripeptide glycyl-histidyl-lysine, a sequence that also occurs naturally in human plasma. Shops sell it as a research-use-only reagent, usually in larger vials than other peptides.`,
    analyticalNotes:
      `A complete report states both the peptide purity and the measured amount. Some reports also state the copper content.`,
  },
  {
    slug: 'cjc-1295',
    name: 'CJC-1295 (no DAC / Mod GRF 1-29)',
    category: 'GH Secretagogues',
    casNumber: '863288-34-0',
    molecularWeightDa: '3367.97 Da',
    formulaOrClass: 'Tetrasubstituted 29-amino-acid GHRH(1-29) analogue',
    purityBenchmark: '≥ 99.0% (RP-HPLC)',
    codeNameAliases: ['Mod GRF 1-29', 'Modified Sermorelin'],
    standardReconstitution: '',
    defaultVialMg: 5,
    defaultBacMl: 2,
    topEuVendorSlug: 'particle-peptides',
    topUsVendorSlug: 'ascension-peptides',
    summary:
      `CJC-1295 without DAC (also called Mod GRF 1-29) is a 29-amino-acid analogue of growth-hormone-releasing hormone (GHRH 1-29) with four amino-acid substitutions. A related version with a drug affinity complex (DAC) is sold under a similar name. It has no approved medical use.`,
    analyticalNotes:
      `Check which version the report covers: Mod GRF 1-29 (about 3368 Da) or CJC-1295 with DAC (about 3647 Da).`,
  },
  {
    slug: 'ipamorelin',
    name: 'Ipamorelin',
    category: 'GH Secretagogues',
    casNumber: '170851-70-4',
    molecularWeightDa: '711.85 Da',
    formulaOrClass: 'Pentapeptide GHS-R1a selective agonist (Aib-His-D-2-Nal-D-Phe-Lys-NH2)',
    purityBenchmark: '≥ 99.2% (RP-HPLC)',
    codeNameAliases: ['NNC 26-0161'],
    standardReconstitution: '',
    defaultVialMg: 5,
    defaultBacMl: 2,
    topEuVendorSlug: 'particle-peptides',
    topUsVendorSlug: 'purified-peptide',
    summary:
      `Ipamorelin is a synthetic pentapeptide (Aib-His-D-2-Nal-D-Phe-Lys-NH2) that binds the ghrelin receptor (GHS-R1a). It is an investigational compound with no approved medical use. Shops sell it as a research-use-only reagent.`,
    analyticalNotes:
      `Check that the report states the measured mg and confirms identity by mass (about 712 Da).`,
  },
  {
    slug: 'tesamorelin',
    name: 'Tesamorelin',
    category: 'GH Secretagogues',
    casNumber: '218949-48-5',
    molecularWeightDa: '5135.86 Da',
    formulaOrClass: 'Trans-3-hexenoic acid-modified human GHRH(1-44)-NH2',
    purityBenchmark: '≥ 99.0% (RP-HPLC)',
    codeNameAliases: ['TH9507'],
    standardReconstitution: '',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'peptidprofi',
    topUsVendorSlug: 'source-research',
    summary:
      `Tesamorelin is a 44-amino-acid analogue of human GHRH with a trans-3-hexenoyl group at the N-terminus. Shops sell research-grade material as a research-use-only reagent. This site covers those research listings only.`,
    analyticalNotes:
      `The long 44-residue chain makes synthesis harder. Check that the report confirms identity by mass spectrometry (about 5136 Da) and states the measured mg.`,
  },
  {
    slug: 'epithalon',
    name: 'Epithalon (Epitalon / AEDG)',
    category: 'Mitochondrial & Cellular Research',
    casNumber: '307297-39-8',
    molecularWeightDa: '390.35 Da',
    formulaOrClass: 'Synthetic tetrapeptide (Ala-Glu-Asp-Gly)',
    purityBenchmark: '≥ 99.5% (RP-HPLC)',
    codeNameAliases: ['Epitalon', 'AEDG Tetrapeptide'],
    standardReconstitution: '',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'purified-peptide',
    summary:
      `Epithalon (also spelled Epitalon, sequence AEDG) is a synthetic tetrapeptide, Ala-Glu-Asp-Gly. Research on it is preclinical, and it has no approved medical use. Shops sell it as a research-use-only reagent.`,
    analyticalNotes:
      `A short peptide with an expected mass of about 390 Da. Check that the report confirms identity by mass as well as purity.`,
  },
  {
    slug: 'mots-c',
    name: 'MOTS-c',
    category: 'Mitochondrial & Cellular Research',
    casNumber: '1627580-64-6',
    molecularWeightDa: '2174.60 Da',
    formulaOrClass: '16-residue mitochondrial-derived peptide (MRWQEMGYIFYPRKLR)',
    purityBenchmark: '≥ 99.0% (RP-HPLC)',
    codeNameAliases: ['Mitochondrial ORF of the 12S rRNA Type-c'],
    standardReconstitution: '',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'source-research',
    summary:
      `MOTS-c is a 16-amino-acid peptide (MRWQEMGYIFYPRKLR) encoded in mitochondrial DNA. Research on it is preclinical, and it has no approved medical use. Shops sell it as a research-use-only reagent.`,
    analyticalNotes:
      `The sequence contains methionine, which can oxidise. An oxidised impurity shows up about 16 Da heavier on mass spectrometry.`,
  },
  {
    slug: 'ss-31',
    name: 'SS-31 (Elamipretide)',
    category: 'Mitochondrial & Cellular Research',
    casNumber: '736992-21-5',
    molecularWeightDa: '639.79 Da',
    formulaOrClass: 'Aromatic-cationic mitochondria-penetrating tetrapeptide (D-Arg-Dmt-Lys-Phe-NH2)',
    purityBenchmark: '≥ 99.0% (RP-HPLC)',
    codeNameAliases: ['Elamipretide', 'MTP-131', 'Bendavia'],
    standardReconstitution: '',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'real-peptides',
    summary:
      `SS-31 (elamipretide) is a synthetic tetrapeptide (D-Arg-Dmt-Lys-Phe-NH2) containing the non-natural amino acid 2',6'-dimethyltyrosine. Shops sell research-grade material as a research-use-only reagent. This site covers those research listings only.`,
    analyticalNotes:
      `Check that the report confirms identity by mass (about 640 Da) and states the measured mg.`,
  },
  {
    slug: 'nad-plus',
    name: 'NAD+ (Nicotinamide Adenine Dinucleotide)',
    category: 'Mitochondrial & Cellular Research',
    casNumber: '53-84-9',
    molecularWeightDa: '663.43 Da',
    formulaOrClass: 'Pyridine nucleotide redox coenzyme / PARP & Sirtuin substrate',
    purityBenchmark: '≥ 99.0% (HPLC, pH-buffered lyophilizate)',
    codeNameAliases: ['Beta-NAD+', 'Coenzyme I'],
    standardReconstitution: '',
    defaultVialMg: 500,
    defaultBacMl: 2.5,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'arctic-lab-supply',
    summary:
      `NAD+ (nicotinamide adenine dinucleotide) is a coenzyme found in all living cells. It is a dinucleotide, not a peptide, but peptide shops list it alongside peptides as a research-use-only reagent, usually in large vials.`,
    analyticalNotes:
      `Check that the report states purity and the measured amount of NAD+ in the vial.`,
  },
  {
    slug: 'semax',
    name: 'Semax (ACTH 4-10 Pro-Gly-Pro)',
    category: 'Neuropeptide Research',
    casNumber: '80714-61-0',
    molecularWeightDa: '813.92 Da',
    formulaOrClass: 'Synthetic heptapeptide (Met-Glu-His-Phe-Pro-Gly-Pro)',
    purityBenchmark: '≥ 99.0% (RP-HPLC)',
    codeNameAliases: ['N-Acetyl Semax Amidate (variant)', 'ACTH(4-7)PGP'],
    standardReconstitution: '',
    defaultVialMg: 5,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'limitless-life-nootropics',
    summary:
      `Semax is a synthetic heptapeptide (Met-Glu-His-Phe-Pro-Gly-Pro) made from the ACTH(4-7) fragment extended with Pro-Gly-Pro. Shops sell it as a research-use-only reagent, sometimes as an N-acetyl amidate variant.`,
    analyticalNotes:
      `Base Semax (about 814 Da) and N-acetyl Semax amidate (about 855 Da) differ in mass. Check which one the report covers.`,
  },
  {
    slug: 'selank',
    name: 'Selank',
    category: 'Neuropeptide Research',
    casNumber: '129954-34-3',
    molecularWeightDa: '751.87 Da',
    formulaOrClass: 'Tuftsin-derived heptapeptide (Thr-Lys-Pro-Arg-Pro-Gly-Pro)',
    purityBenchmark: '≥ 99.0% (RP-HPLC)',
    codeNameAliases: ['TP-7', 'N-Acetyl Selank Amidate (variant)'],
    standardReconstitution: '',
    defaultVialMg: 5,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'limitless-life-nootropics',
    summary:
      `Selank is a synthetic heptapeptide (Thr-Lys-Pro-Arg-Pro-Gly-Pro) made from the tetrapeptide tuftsin extended with Pro-Gly-Pro. Shops sell it as a research-use-only reagent, sometimes as an N-acetyl amidate variant.`,
    analyticalNotes:
      `Check which variant the report covers and that it states the measured mg.`,
  },
  {
    slug: 'slu-pp-332',
    name: 'SLU-PP-332 (ERR Pan-Agonist)',
    category: 'Metabolic & Incretin',
    casNumber: '303760-60-3',
    molecularWeightDa: '290.32 Da',
    formulaOrClass: 'Synthetic small-molecule acylhydrazone ERRα/β/γ pan-agonist (non-peptide)',
    purityBenchmark: '≥ 99.0% (HPLC / NMR)',
    codeNameAliases: ['Exercise Mimetic ERR Agonist'],
    standardReconstitution: '',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'avellon-peptides',
    topUsVendorSlug: 'cenexa-labs',
    summary:
      `SLU-PP-332 is a synthetic small molecule, not a peptide. Preclinical literature describes it as an agonist of the estrogen-related receptors (ERR alpha, beta and gamma). It has no approved medical use. Some peptide shops list it as a research-use-only reagent.`,
    analyticalNotes:
      `As a small molecule, identity is usually confirmed by HPLC with mass spectrometry or NMR rather than peptide methods.`,
  },
  {
    slug: 'kpv',
    name: 'KPV (Alpha-MSH 11-13)',
    category: 'Tissue & Cell-Signaling Research',
    casNumber: '67727-97-3',
    molecularWeightDa: '342.43 Da',
    formulaOrClass: 'C-terminal α-MSH tripeptide (Lys-Pro-Val)',
    purityBenchmark: '≥ 99.2% (RP-HPLC)',
    codeNameAliases: ['Alpha-MSH(11-13)'],
    standardReconstitution: '',
    defaultVialMg: 5,
    defaultBacMl: 2,
    topEuVendorSlug: 'particle-peptides',
    topUsVendorSlug: 'genesis-peptides',
    summary:
      `KPV is the tripeptide Lys-Pro-Val, the C-terminal end of alpha-melanocyte-stimulating hormone (alpha-MSH 11-13). Research on it is preclinical, and it has no approved medical use. Shops sell it as a research-use-only reagent.`,
    analyticalNotes:
      `A very short peptide (about 342 Da). Check that the report confirms identity by mass and states the measured mg.`,
  },
  {
    slug: 'thymosin-alpha-1',
    name: 'Thymosin Alpha-1 (Thymalfasin)',
    category: 'Melanocortin & Immune',
    casNumber: '62304-98-7',
    molecularWeightDa: '3108.28 Da',
    formulaOrClass: 'N-acetylated 28-residue thymic polypeptide',
    purityBenchmark: '≥ 98.5% (RP-HPLC)',
    codeNameAliases: ['TA1', 'Thymalfasin'],
    standardReconstitution: '',
    defaultVialMg: 5,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'nextself-labs',
    summary:
      `Thymosin alpha-1 is an N-acetylated 28-amino-acid peptide first isolated from thymus tissue. Shops sell research-grade material as a research-use-only reagent. This site covers those research listings only.`,
    analyticalNotes:
      `Check the N-terminal acetylation (+42 Da) on mass spectrometry to tell the acetylated peptide from an unacetylated precursor.`,
  },
  {
    slug: 'pt-141',
    name: 'PT-141 (Bremelanotide)',
    category: 'Melanocortin & Immune',
    casNumber: '189691-06-3',
    molecularWeightDa: '1025.16 Da',
    formulaOrClass: 'Cyclic lactam heptapeptide MC3R/MC4R agonist',
    purityBenchmark: '≥ 99.0% (RP-HPLC)',
    codeNameAliases: ['Bremelanotide'],
    standardReconstitution: '',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'real-peptides',
    summary:
      `PT-141 (bremelanotide) is a cyclic heptapeptide that binds the melanocortin receptors MC3R and MC4R. It is structurally related to melanotan II. Shops sell research-grade material as a research-use-only reagent.`,
    analyticalNotes:
      `PT-141 (about 1025 Da) and melanotan II (about 1024 Da) differ by about 1 Da. Only high-resolution mass spectrometry tells them apart.`,
  },
  {
    slug: 'aod-9604',
    name: 'AOD-9604 (Tyr-hGH 177-191)',
    category: 'Metabolic & Incretin',
    casNumber: '221231-10-3',
    molecularWeightDa: '1815.08 Da',
    formulaOrClass: 'Disulfide-bridged 16-residue C-terminal hGH fragment',
    purityBenchmark: '≥ 99.0% (RP-HPLC)',
    codeNameAliases: ['Lipotropin Fragment 177-191'],
    standardReconstitution: '',
    defaultVialMg: 5,
    defaultBacMl: 2,
    topEuVendorSlug: 'particle-peptides',
    topUsVendorSlug: 'core-peptides',
    summary:
      `AOD-9604 is a 16-amino-acid fragment of human growth hormone (residues 177-191 plus an added tyrosine) with one internal disulfide bridge. It has no approved medical use. Shops sell it as a research-use-only reagent.`,
    analyticalNotes:
      `Check that the report confirms identity by mass (about 1815 Da for the bridged form) and states the measured mg.`,
  },
];

export function getCompoundBySlug(slug: string): CompoundSpec | undefined {
  return COMPOUNDS.find((c) => c.slug === slug);
}
