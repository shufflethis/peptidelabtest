export interface CountryLawGuide {
  slug: string;
  country: string;
  flag: string;
  regionHub: 'US' | 'EU' | 'GLOBAL';
  customsRisk: 'LOW (Domestic Available)' | 'MODERATE (Intra-EU Recommended)' | 'HIGH (Strict Border Screening)';
  ruoStatusSummary: string;
  regulatoryBodies: string[];
  shippingRecommendation: string;
  recommendedVendorSlugs: string[];
  keyTakeaways: string[];
}

export const COUNTRY_LAWS: CountryLawGuide[] = [
  {
    slug: 'united-states',
    country: 'United States',
    flag: '🇺🇸',
    regionHub: 'US',
    customsRisk: 'LOW (Domestic Available)',
    ruoStatusSummary:
      'Unapproved peptides may not be marketed for human clinical administration or compounded under 503A/503B Category 2 restrictions, but genuine in-vitro laboratory reagents labeled strictly Research Use Only (RUO) circulate domestically between US suppliers and research buyers.',
    regulatoryBodies: ['FDA (FD&C Act)', 'USP Analytical Standards'],
    shippingRecommendation:
      'Use US-domestic suppliers (Florida, California, Colorado, Alaska) shipping via USPS Priority or UPS Ground to avoid CBP international mail inspections.',
    recommendedVendorSlugs: ['real-peptides', 'arctic-lab-supply', 'source-research'],
    keyTakeaways: [
      'Avoid overseas parcels entering ISC New York / Los Angeles where CBP screens unlabelled lyophilized vials.',
      'Legitimate RUO suppliers prohibit human dosing claims and provide lot-specific HPLC/MS certificates.',
      'FDA 2024–2026 compounding restrictions specifically target human-use pharmacies, increasing scrutiny on misbranded storefronts.',
    ],
  },
  {
    slug: 'united-kingdom',
    country: 'United Kingdom',
    flag: '🇬🇧',
    regionHub: 'GLOBAL',
    customsRisk: 'MODERATE (Intra-EU Recommended)',
    ruoStatusSummary:
      'Under the UK Human Medicines Regulations 2012, unapproved peptides cannot be advertised as medicinal products for human administration, while laboratory research reagents remain lawful to possess and acquire for non-clinical analytical work.',
    regulatoryBodies: ['MHRA', 'UK Border Force'],
    shippingRecommendation:
      'Check carrier customs declarations carefully post-Brexit; tracked courier dispatch with clear analytical reagent HS codes reduces Border Force holds.',
    recommendedVendorSlugs: ['certa-peptides', 'avellon-peptides', 'arctic-lab-supply'],
    keyTakeaways: [
      'MHRA enforcement targets sellers making medicinal, weight-loss, or cosmetic injection claims.',
      'Post-Brexit parcels from the EU cross customs; orders above £135 may incur import VAT.',
    ],
  },
  {
    slug: 'germany',
    country: 'Germany',
    flag: '🇩🇪',
    regionHub: 'EU',
    customsRisk: 'MODERATE (Intra-EU Recommended)',
    ruoStatusSummary:
      'Germany enforces strict AMG (Arzneimittelgesetz) and AntiDopG (Anti-Doping-Gesetz) thresholds on growth-hormone secretagogues and non-EU imports. Non-EU parcels from the US, UK, or China are routinely intercepted by German Zoll.',
    regulatoryBodies: ['BfArM', 'Zoll (German Customs)', 'AMG / AntiDopG'],
    shippingRecommendation:
      'Strictly choose EU-domestic dispatch (Poland, Slovakia, Romania, Netherlands) within the EU single market so parcels travel via intra-community DHL/DPD without third-country customs clearance.',
    recommendedVendorSlugs: ['certa-peptides', 'particle-peptides', 'avellon-peptides', 'peptidprofi'],
    keyTakeaways: [
      'Third-country shipments (US/China/UK) trigger mandatory electronic Zoll declarations and frequent AMG holds.',
      'Certain GH secretagogues (e.g., GHRPs, CJC-1295, IGF-1 analogues) fall under AntiDopG quantity schedules.',
      'Intra-EU shipments from Poland or Slovakia arrive in 1–4 business days without customs duties.',
    ],
  },
  {
    slug: 'poland',
    country: 'Poland',
    flag: '🇵🇱',
    regionHub: 'EU',
    customsRisk: 'LOW (Domestic Available)',
    ruoStatusSummary:
      'Poland serves as one of Europe’s primary hubs for registered KRS laboratory-reagent companies supplying analytical peptides across the European Union under strict RUO chemical labeling.',
    regulatoryBodies: ['GIF (Main Pharmaceutical Inspectorate)', 'KRS Commercial Register'],
    shippingRecommendation:
      'Order domestically within Poland (InPost / DPD / DHL) or intra-EU from neighboring Slovakia or Romania.',
    recommendedVendorSlugs: ['avellon-peptides', 'peptidprofi', 'particle-peptides'],
    keyTakeaways: [
      'Verify that Polish vendors disclose a valid KRS corporate number and NIP/VAT registration.',
      '24–48h domestic delivery available across Poland with zero customs exposure.',
    ],
  },
  {
    slug: 'netherlands',
    country: 'Netherlands',
    flag: '🇳🇱',
    regionHub: 'EU',
    customsRisk: 'LOW (Domestic Available)',
    ruoStatusSummary:
      'Research reagents labeled strictly against human consumption operate under Dutch chemical/analytical commerce rules, while IGJ enforces against unlicensed human medicines (especially pre-filled weight-loss pens).',
    regulatoryBodies: ['IGJ (Health and Youth Care Inspectorate)', 'KvK (Chamber of Commerce)'],
    shippingRecommendation:
      'Use EU-domestic suppliers (NL, PL, SK, RO) to bypass PostNL non-EU customs inspection fees.',
    recommendedVendorSlugs: ['certa-peptides', 'particle-peptides', '24peptides'],
    keyTakeaways: [
      'Always verify Dutch KvK registration numbers against the official Handelsregister.',
      'Avoid pre-mixed injection pens which IGJ treats as unlicensed medicinal devices.',
    ],
  },
  {
    slug: 'canada',
    country: 'Canada',
    flag: '🇨🇦',
    regionHub: 'GLOBAL',
    customsRisk: 'HIGH (Strict Border Screening)',
    ruoStatusSummary:
      'Health Canada classifies most injectable peptides as prescription-grade drugs when intended for human administration, and CBSA inspects cross-border USPS/courier parcels closely.',
    regulatoryBodies: ['Health Canada (Food and Drugs Act)', 'CBSA'],
    shippingRecommendation:
      'Institutional buyers require formal laboratory documentation on commercial invoices when importing reference standards across the US-Canada border.',
    recommendedVendorSlugs: ['arctic-lab-supply', 'ghostlabz-research'],
    keyTakeaways: [
      'CBSA routinely holds undeclared vials lacking clear analytical laboratory HS classifications.',
      'Ensure vendor includes lot-matched COA documentation if requested by customs brokers.',
    ],
  },
  {
    slug: 'australia',
    country: 'Australia',
    flag: '🇦🇺',
    regionHub: 'GLOBAL',
    customsRisk: 'HIGH (Strict Border Screening)',
    ruoStatusSummary:
      'Australia’s TGA Poisons Standard places most peptide hormones, GHRPs, and incretin mimetics in Schedule 4, with Australian Border Force (ABF) conducting high-rate X-ray and mail screening.',
    regulatoryBodies: ['TGA (Therapeutic Goods Administration)', 'Australian Border Force (ABF)'],
    shippingRecommendation:
      'Non-licensed personal imports of Schedule 4 substances face high ABF seizure probability; institutional researchers must hold valid state laboratory permits.',
    recommendedVendorSlugs: ['arctic-lab-supply', 'ghostlabz-research'],
    keyTakeaways: [
      'ABF maintains one of the strictest biosecurity and Schedule 4 border regimes globally.',
      'Verify state-specific laboratory possession permits prior to ordering.',
    ],
  },
  {
    slug: 'france',
    country: 'France',
    flag: '🇫🇷',
    regionHub: 'EU',
    customsRisk: 'MODERATE (Intra-EU Recommended)',
    ruoStatusSummary:
      'ANSM restricts human marketing of unapproved incretin and growth peptides, while intra-EU reagent shipments move inside the European customs union.',
    regulatoryBodies: ['ANSM', 'Douanes Françaises'],
    shippingRecommendation:
      'Select EU-based suppliers (Romania, Slovakia, Poland) rather than US or UK shippers to avoid Roissy CDG customs holds.',
    recommendedVendorSlugs: ['certa-peptides', 'particle-peptides', 'avellon-peptides'],
    keyTakeaways: [
      'ANSM issued heightened alerts on counterfeit pre-filled GLP-1 pens in 2025–2026.',
      'Lyophilized RUO vials with verifiable Janoshik/Liquilabs COAs ship smoothly within the EU.',
    ],
  },
  {
    slug: 'austria',
    country: 'Austria',
    flag: '🇦🇹',
    regionHub: 'EU',
    customsRisk: 'MODERATE (Intra-EU Recommended)',
    ruoStatusSummary:
      'Austria enforces the Arzneiwareneinfuhrgesetz (AWEG) strictly against non-EEA postal imports, alongside Austrian Anti-Doping legislation on anabolic/peptidic agents.',
    regulatoryBodies: ['BASG / AGES', 'Austrian Customs'],
    shippingRecommendation:
      'Never import from outside the EEA (US/UK/China) into Austria; rely strictly on EEA/EU-domestic fulfillment from neighboring Slovakia or Poland.',
    recommendedVendorSlugs: ['particle-peptides', 'certa-peptides', 'avellon-peptides'],
    keyTakeaways: [
      'Non-EEA pharmaceutical/peptide parcels routinely trigger BASG administrative proceedings.',
      'Neighboring Slovak and Polish couriers reach Vienna and Graz in 1–3 business days.',
    ],
  },
  {
    slug: 'switzerland',
    country: 'Switzerland',
    flag: '🇨🇭',
    regionHub: 'GLOBAL',
    customsRisk: 'HIGH (Strict Border Screening)',
    ruoStatusSummary:
      'Switzerland is outside the EU Customs Union (though in Schengen). Swissmedic and Antidoping Switzerland actively inspect incoming parcels from both the EU and the US.',
    regulatoryBodies: ['Swissmedic', 'BAZG (Federal Office for Customs)', 'Swiss Sport Integrity'],
    shippingRecommendation:
      'Institutional laboratories in Switzerland must ensure proper commercial reagent invoicing; growth-factor and GHRP compounds are subject to zero-tolerance anti-doping import bans.',
    recommendedVendorSlugs: ['peptidprofi', 'particle-peptides'],
    keyTakeaways: [
      'EU-to-Switzerland parcels still pass BAZG customs clearance despite geographic proximity.',
      'Swiss Sport Integrity enforces strict seizure rules on GHRPs, CJC-1295, TB-500, and IGF-1.',
    ],
  },
];

export function getLawBySlug(slug: string): CountryLawGuide | undefined {
  return COUNTRY_LAWS.find((l) => l.slug === slug);
}
