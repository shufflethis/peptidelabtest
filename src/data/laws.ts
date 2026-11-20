/**
 * Country notes: neutral, general information only (no legal advice, no shipping or customs tips).
 * Which audited shops state they ship to a country is computed from audit.json (shipsTo) on the page.
 */
export interface CountryLawGuide {
  slug: string;
  country: string;
  /** ISO 3166-1 alpha-2 */
  code: string;
  eu: boolean;
  authorities: string[];
  note: string;
}

export const COUNTRY_LAWS: CountryLawGuide[] = [
  {
    slug: 'united-states', country: 'United States', code: 'US', eu: false,
    authorities: ['U.S. Food and Drug Administration (FDA)', 'U.S. Customs and Border Protection (CBP)'],
    note: 'Medicines are regulated under the Federal Food, Drug, and Cosmetic Act. Products sold as research-use-only may not be marketed for human use.',
  },
  {
    slug: 'united-kingdom', country: 'United Kingdom', code: 'GB', eu: false,
    authorities: ['Medicines and Healthcare products Regulatory Agency (MHRA)', 'UK Border Force'],
    note: 'Medicines are regulated under the Human Medicines Regulations 2012. Unlicensed products may not be advertised or sold as medicines.',
  },
  {
    slug: 'germany', country: 'Germany', code: 'DE', eu: true,
    authorities: ['Federal Institute for Drugs and Medical Devices (BfArM)', 'German customs (Zoll)'],
    note: 'Medicines are regulated under the Arzneimittelgesetz (AMG). The Anti-Doping-Gesetz (AntiDopG) also covers some substances.',
  },
  {
    slug: 'poland', country: 'Poland', code: 'PL', eu: true,
    authorities: ['Chief Pharmaceutical Inspectorate (GIF)', 'Office for Registration of Medicinal Products (URPL)'],
    note: 'Medicines are regulated under the Pharmaceutical Law (Prawo farmaceutyczne).',
  },
  {
    slug: 'netherlands', country: 'Netherlands', code: 'NL', eu: true,
    authorities: ['Health and Youth Care Inspectorate (IGJ)', 'Medicines Evaluation Board (CBG-MEB)'],
    note: 'Medicines are regulated under the Medicines Act (Geneesmiddelenwet). The IGJ enforces against unlicensed medicines.',
  },
  {
    slug: 'canada', country: 'Canada', code: 'CA', eu: false,
    authorities: ['Health Canada', 'Canada Border Services Agency (CBSA)'],
    note: 'Drugs are regulated under the Food and Drugs Act and its regulations.',
  },
  {
    slug: 'australia', country: 'Australia', code: 'AU', eu: false,
    authorities: ['Therapeutic Goods Administration (TGA)', 'Australian Border Force (ABF)'],
    note: 'Therapeutic goods are regulated under the Therapeutic Goods Act 1989, and many substances are scheduled in the Poisons Standard.',
  },
  {
    slug: 'france', country: 'France', code: 'FR', eu: true,
    authorities: ['National Agency for the Safety of Medicines and Health Products (ANSM)'],
    note: 'Medicines are regulated under the Public Health Code (Code de la santé publique).',
  },
  {
    slug: 'austria', country: 'Austria', code: 'AT', eu: true,
    authorities: ['Federal Office for Safety in Health Care (BASG)'],
    note: 'Medicines are regulated under the Arzneimittelgesetz; imports of medicinal products are covered by the Arzneiwareneinfuhrgesetz (AWEG).',
  },
  {
    slug: 'switzerland', country: 'Switzerland', code: 'CH', eu: false,
    authorities: ['Swissmedic', 'Swiss Sport Integrity'],
    note: 'Therapeutic products are regulated under the Therapeutic Products Act (HMG). Switzerland is not part of the EU customs union.',
  },
];

export function getLawBySlug(slug: string): CountryLawGuide | undefined {
  return COUNTRY_LAWS.find((l) => l.slug === slug);
}
