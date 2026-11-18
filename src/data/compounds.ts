export type CompoundCategory =
  | 'Metabolic & Incretin'
  | 'Tissue Repair & Recovery'
  | 'GH Secretagogues'
  | 'Cognitive & Nootropic'
  | 'Longevity & Mitochondrial'
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
    standardReconstitution: '2.0 ml BAC water into 10 mg vial → 5,000 mcg/ml (50 mcg per 1 IU tick)',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'arctic-lab-supply',
    summary:
      'Investigational triple-receptor agonist targeting GIP, GLP-1, and glucagon receptors simultaneously, widely studied in preclinical and clinical metabolic models for energy expenditure and lipid oxidation.',
    analyticalNotes:
      'Because many storefronts list Retatrutide under shorthand codes (RT-3, GLP-3, Triple G), researchers must verify LC-MS molecular mass (~4731.3 Da) or blind GLP-1 screening on the batch COA.',
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
    standardReconstitution: '2.0 ml BAC water into 15 mg vial → 7,500 mcg/ml (75 mcg per 1 IU tick)',
    defaultVialMg: 15,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'arctic-lab-supply',
    summary:
      'Dual incretin receptor agonist with imbalanced affinity favoring GIP over GLP-1 signaling, serving as a primary reference standard in glycemic and adipocyte signaling studies.',
    analyticalNotes:
      'Confirm C20 diacid side-chain integrity via ESI-MS deconvolution around 4813.5 Da; check net peptide mass vs. gross lyophilized mannitol cake.',
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
    standardReconstitution: '2.0 ml BAC water into 5 mg vial → 2,500 mcg/ml (25 mcg per 1 IU tick)',
    defaultVialMg: 5,
    defaultBacMl: 2,
    topEuVendorSlug: 'onyx-peptides',
    topUsVendorSlug: 'arctic-lab-supply',
    summary:
      'Foundational single-receptor GLP-1 mimetic featuring C18 diacid albumin-binding acylation and Aib8 substitution for DPP-4 enzymatic resistance.',
    analyticalNotes:
      'Mature synthesis route yields >99.3% purity across reputable labs; reject any lot lacking mass-spec confirmation at 4113.6 Da.',
  },
  {
    slug: 'bpc-157',
    name: 'BPC-157 (Pentadecapeptide)',
    category: 'Tissue Repair & Recovery',
    casNumber: '137525-51-0',
    molecularWeightDa: '1419.53 Da',
    formulaOrClass: '15-residue synthetic gastric peptide (Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val)',
    purityBenchmark: '≥ 99.2% (RP-HPLC)',
    codeNameAliases: ['PL 14736', 'Body Protection Compound-157', 'BPC157 Acetate / Arginate'],
    standardReconstitution: '2.0 ml BAC water into 10 mg vial → 5,000 mcg/ml (50 mcg per 1 IU tick)',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'real-peptides',
    summary:
      'Synthetic 15-amino-acid sequence investigated extensively in rodent tendon, ligament, microvascular angiogenesis (VEGFR2/eNOS), and gastrointestinal mucosal models.',
    analyticalNotes:
      'Distinguish standard acetate salt (lyophilized vials) from stable arginate salt (oral/enteric assays). Check COA net mass closely: our 2026 audit recorded a -39.2% underfill on a budget EU vendor’s 10 mg BPC-157 vial.',
  },
  {
    slug: 'tb-500',
    name: 'TB-500 (Thymosin Beta-4 / Ac-SDKP / 17-23)',
    category: 'Tissue Repair & Recovery',
    casNumber: '77591-33-4',
    molecularWeightDa: '4963.50 Da (full Tβ4) / 889.01 Da (17-23 fragment)',
    formulaOrClass: '43-amino-acid actin-sequestering polypeptide (or Ac-LKKTETQ fragment)',
    purityBenchmark: '≥ 99.0% (RP-HPLC)',
    codeNameAliases: ['Thymosin Beta-4', 'TB4', 'Wolverine Stack Component'],
    standardReconstitution: '2.0 ml BAC water into 10 mg vial → 5,000 mcg/ml',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'particle-peptides',
    topUsVendorSlug: 'real-peptides',
    summary:
      'Actin-monomer binding peptide studied for dermal wound closure, cytoskeletal cell migration, and cardiac/corneal tissue remodeling; frequently paired with BPC-157 in dual-peptide assays.',
    analyticalNotes:
      'CRITICAL COA CHECK: Many vendors label the 7-residue fragment Ac-LKKTETQ (~889 Da) as "TB-500" while others supply full 43-aa Thymosin Beta-4 (~4963 Da). Always check the LC-MS molecular weight on the COA!',
  },
  {
    slug: 'ghk-cu',
    name: 'GHK-Cu (Copper Tripeptide-1)',
    category: 'Longevity & Mitochondrial',
    casNumber: '89030-95-5',
    molecularWeightDa: '403.92 Da (2:1 / 1:1 Cu2+ complex)',
    formulaOrClass: 'Gly-His-Lys·Cu(II) coordination complex',
    purityBenchmark: '≥ 99.0% peptide moiety + stoichiometric Cu content',
    codeNameAliases: ['Copper Peptide', 'Prezatide Copper'],
    standardReconstitution: '3.0 ml BAC water into 50 mg vial → 16.67 mg/ml (166.7 mcg per 1 IU tick)',
    defaultVialMg: 50,
    defaultBacMl: 3,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'real-peptides',
    summary:
      'Naturally occurring plasma tripeptide-copper complex studied for extracellular matrix remodeling, collagen I/III gene modulation, and antioxidant SOD upregulation.',
    analyticalNotes:
      'Authentic GHK-Cu presents as a deep royal-blue violet lyophilizate; pale blue cakes often indicate excess mannitol filler or sub-stoichiometric copper chelation.',
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
    standardReconstitution: '2.0 ml BAC water into 5 mg vial → 2,500 mcg/ml',
    defaultVialMg: 5,
    defaultBacMl: 2,
    topEuVendorSlug: 'particle-peptides',
    topUsVendorSlug: 'ascension-peptides',
    summary:
      'Short-acting GHRH receptor agonist engineered with four amino-acid substitutions (Ala2, Gln8, Ala15, Leu27) to prevent rapid DPP-4 cleavage while preserving pulsatile somatotroph signaling.',
    analyticalNotes:
      'Verify whether the vial is Mod GRF 1-29 (~3368 Da, ~30 min half-life) vs. CJC-1295 with DAC (~3647 Da, maleimidopropionic acid albumin linker).',
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
    standardReconstitution: '2.0 ml BAC water into 5 mg vial → 2,500 mcg/ml',
    defaultVialMg: 5,
    defaultBacMl: 2,
    topEuVendorSlug: 'particle-peptides',
    topUsVendorSlug: 'purified-peptide',
    summary:
      'Selective pentapeptide ghrelin-receptor (GHS-R1a) agonist characterized in endocrine research for stimulating GH release without off-target ACTH, cortisol, or prolactin elevation.',
    analyticalNotes:
      'Short 5-aa synthesis routinely achieves >99.5% purity; any report under 98.5% indicates poor solid-phase purification.',
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
    standardReconstitution: '2.0 ml BAC water into 10 mg vial → 5,000 mcg/ml',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'peptidprofi',
    topUsVendorSlug: 'source-research',
    summary:
      'Full-length 44-residue stabilized GHRH analogue bearing an N-terminal hexenoyl moiety, studied extensively for visceral adipose tissue lipolysis and pulsatile IGF-1 regulation.',
    analyticalNotes:
      'Long 44-aa chain makes synthesis costlier and more prone to deletion sequences—demand LC-MS confirmation at ~5135.9 Da.',
  },
  {
    slug: 'epithalon',
    name: 'Epithalon (Epitalon / AEDG)',
    category: 'Longevity & Mitochondrial',
    casNumber: '307297-39-8',
    molecularWeightDa: '390.35 Da',
    formulaOrClass: 'Synthetic tetrapeptide (Ala-Glu-Asp-Gly)',
    purityBenchmark: '≥ 99.5% (RP-HPLC)',
    codeNameAliases: ['Epitalon', 'AEDG Tetrapeptide'],
    standardReconstitution: '2.0 ml BAC water into 10 mg vial → 5,000 mcg/ml',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'purified-peptide',
    summary:
      'Pineal-derived synthetic tetrapeptide researched in telomerase hTERT activation, melatonin rhythm restoration, and replicative senescence cell-culture assays.',
    analyticalNotes:
      'Historically subject to misidentification scams (some suppliers shipped Thymogen instead); verify exact 390.35 Da mass spec peak.',
  },
  {
    slug: 'mots-c',
    name: 'MOTS-c',
    category: 'Longevity & Mitochondrial',
    casNumber: '1627580-64-6',
    molecularWeightDa: '2174.60 Da',
    formulaOrClass: '16-residue mitochondrial-derived peptide (MRWQEMGYIFYPRKLR)',
    purityBenchmark: '≥ 99.0% (RP-HPLC)',
    codeNameAliases: ['Mitochondrial ORF of the 12S rRNA Type-c'],
    standardReconstitution: '2.0 ml BAC water into 10 mg vial → 5,000 mcg/ml',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'source-research',
    summary:
      'Mitochondrial-encoded 16-amino-acid peptide regulating the folate-AICAR-AMPK metabolic axis and stress-induced nuclear gene translocation in skeletal muscle models.',
    analyticalNotes:
      'Contains methionine at position 1 and 6—susceptible to sulfoxide oxidation (+16 Da impurity peak on LC-MS) if improperly lyophilized or stored warm.',
  },
  {
    slug: 'ss-31',
    name: 'SS-31 (Elamipretide)',
    category: 'Longevity & Mitochondrial',
    casNumber: '736992-21-5',
    molecularWeightDa: '639.79 Da',
    formulaOrClass: 'Aromatic-cationic mitochondria-penetrating tetrapeptide (D-Arg-Dmt-Lys-Phe-NH2)',
    purityBenchmark: '≥ 99.0% (RP-HPLC)',
    codeNameAliases: ['Elamipretide', 'MTP-131', 'Bendavia'],
    standardReconstitution: '2.0 ml BAC water into 10 mg vial → 5,000 mcg/ml',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'real-peptides',
    summary:
      'Cardiolipin-binding inner mitochondrial membrane tetrapeptide studied for electron transport chain stabilization, ATP restoration, and mitochondrial ROS attenuation.',
    analyticalNotes:
      'Confirm non-canonical 2,6-dimethyltyrosine (Dmt) incorporation via exact 639.8 Da molecular ion.',
  },
  {
    slug: 'nad-plus',
    name: 'NAD+ (Nicotinamide Adenine Dinucleotide)',
    category: 'Longevity & Mitochondrial',
    casNumber: '53-84-9',
    molecularWeightDa: '663.43 Da',
    formulaOrClass: 'Pyridine nucleotide redox coenzyme / PARP & Sirtuin substrate',
    purityBenchmark: '≥ 99.0% (HPLC, pH-buffered lyophilizate)',
    codeNameAliases: ['Beta-NAD+', 'Coenzyme I'],
    standardReconstitution: '2.5 ml BAC water into 500 mg vial → 200 mg/ml',
    defaultVialMg: 500,
    defaultBacMl: 2.5,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'arctic-lab-supply',
    summary:
      'Central cellular electron carrier and obligatory cosubstrate for sirtuin deacetylases (SIRT1–7) and PARP DNA-repair enzymes in aging research.',
    analyticalNotes:
      'Unbuffered NAD+ free acid forms highly acidic solutions (pH ~2.5); check whether supplier buffers lyophilizate and verify absence of nicotinamide degradation peaks.',
  },
  {
    slug: 'semax',
    name: 'Semax (ACTH 4-10 Pro-Gly-Pro)',
    category: 'Cognitive & Nootropic',
    casNumber: '80714-61-0',
    molecularWeightDa: '813.92 Da',
    formulaOrClass: 'Synthetic heptapeptide (Met-Glu-His-Phe-Pro-Gly-Pro)',
    purityBenchmark: '≥ 99.0% (RP-HPLC)',
    codeNameAliases: ['N-Acetyl Semax Amidate (variant)', 'ACTH(4-7)PGP'],
    standardReconstitution: '2.0 ml BAC water or sterile saline into 5 mg vial → 2,500 mcg/ml',
    defaultVialMg: 5,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'limitless-life-nootropics',
    summary:
      'Non-hormonal ACTH(4-10) heptapeptide analogue studied for hippocampal BDNF/TrkB mRNA upregulation, cerebral ischemia neuroprotection, and melanocortin modulation.',
    analyticalNotes:
      'Verify base Semax (813.9 Da) vs. N-Acetyl Semax Amidate (854.9 Da) on LC-MS.',
  },
  {
    slug: 'selank',
    name: 'Selank',
    category: 'Cognitive & Nootropic',
    casNumber: '129954-34-3',
    molecularWeightDa: '751.87 Da',
    formulaOrClass: 'Tuftsin-derived heptapeptide (Thr-Lys-Pro-Arg-Pro-Gly-Pro)',
    purityBenchmark: '≥ 99.0% (RP-HPLC)',
    codeNameAliases: ['TP-7', 'N-Acetyl Selank Amidate (variant)'],
    standardReconstitution: '2.0 ml BAC water or sterile saline into 5 mg vial → 2,500 mcg/ml',
    defaultVialMg: 5,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'limitless-life-nootropics',
    summary:
      'Synthetic analogue of endogenous immunomodulatory tetrapeptide tuftsin extended with Pro-Gly-Pro, studied for allosteric GABAA modulation and enkephalinase inhibition.',
    analyticalNotes:
      'High hydrophilicity enables rapid dissolution in 0.9% sterile saline or bacteriostatic water.',
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
    standardReconstitution: 'Supplied as research capsules/tablets or DMSO-cosolvent stock (hydrophobic)',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'avellon-peptides',
    topUsVendorSlug: 'cenexa-labs',
    summary:
      'Small-molecule pan-estrogen-related receptor (ERRα/β/γ) agonist developed to activate acute aerobic exercise transcriptional programs and mitochondrial fatty-acid oxidation in murine models.',
    analyticalNotes:
      'Not water-soluble in pure aqueous BAC water—insoluble small molecule requiring oral research matrices or DMSO cosolvents in vitro.',
  },
  {
    slug: 'kpv',
    name: 'KPV (Alpha-MSH 11-13)',
    category: 'Tissue Repair & Recovery',
    casNumber: '67727-97-3',
    molecularWeightDa: '342.43 Da',
    formulaOrClass: 'C-terminal α-MSH tripeptide (Lys-Pro-Val)',
    purityBenchmark: '≥ 99.2% (RP-HPLC)',
    codeNameAliases: ['Alpha-MSH(11-13)'],
    standardReconstitution: '2.0 ml BAC water into 5 mg vial → 2,500 mcg/ml',
    defaultVialMg: 5,
    defaultBacMl: 2,
    topEuVendorSlug: 'particle-peptides',
    topUsVendorSlug: 'genesis-peptides',
    summary:
      'Minimal C-terminal tripeptide of alpha-melanocyte-stimulating hormone retaining NF-κB anti-inflammatory suppression without MC1R pigmentary activation.',
    analyticalNotes:
      'PepT1 transporter substrate studied in both parenteral and colonic epithelial cell models.',
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
    standardReconstitution: '1.0–2.0 ml BAC water into 5 mg or 10 mg vial',
    defaultVialMg: 5,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'nextself-labs',
    summary:
      '28-amino-acid acetylated polypeptide investigated for Toll-like receptor (TLR2/9) dendritic signaling, T-cell maturation, and NK-cell cytotoxicity modulation.',
    analyticalNotes:
      'Confirm N-terminal acetylation (+42 Da) in mass spectrometry to distinguish authentic Thymalfasin from unacetylated precursors.',
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
    standardReconstitution: '2.0 ml BAC water into 10 mg vial → 5,000 mcg/ml',
    defaultVialMg: 10,
    defaultBacMl: 2,
    topEuVendorSlug: 'certa-peptides',
    topUsVendorSlug: 'real-peptides',
    summary:
      'De-amidated cyclic heptapeptide metabolite of Melanotan II acting centrally at hypothalamic MC4R/MC3R receptors.',
    analyticalNotes:
      'Distinguish C-terminal carboxylic acid PT-141 (1025.2 Da) from C-terminal amide Melanotan II (1024.2 Da) via high-resolution LC-MS.',
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
    standardReconstitution: '2.0 ml BAC water (+ optional 0.6% acetic acid buffer if gelling occurs) into 5 mg vial',
    defaultVialMg: 5,
    defaultBacMl: 2,
    topEuVendorSlug: 'particle-peptides',
    topUsVendorSlug: 'core-peptides',
    summary:
      'C-terminal lipolytic domain of human growth hormone containing a Cys182–Cys189 disulfide loop, researched for beta-3 adrenergic lipolysis without IGF-1 elevation.',
    analyticalNotes:
      'Prone to beta-sheet fibril gelling at neutral pH in high concentrations; verify oxidized intramolecular disulfide mass (1815.1 Da vs. reduced 1817.1 Da).',
  },
];

export function getCompoundBySlug(slug: string): CompoundSpec | undefined {
  return COMPOUNDS.find((c) => c.slug === slug);
}
