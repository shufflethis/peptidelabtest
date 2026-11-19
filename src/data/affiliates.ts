/**
 * CENTRAL AFFILIATE & PROMO CODE CONFIGURATION — PeptideLabIndex.com
 * ------------------------------------------------------------------
 * Edit ONLY this file whenever a vendor approves your affiliate account
 * or activates your custom discount code (default target code: LABINDEX).
 *
 * TIP FOR APPLYING TO VENDORS:
 * - Keep `PREVIEW_UNVERIFIED_CODES = true` while previewing locally so you see
 *   the full coupon UI and post-discount $/mg calculations.
 * - Flip `PREVIEW_UNVERIFIED_CODES = false` right before submitting affiliate
 *   applications if you want unconfirmed codes hidden until each shop approves
 *   your `LABINDEX` coupon; then set `isApproved: true` vendor-by-vendor!
 */

export const SITE_BRAND = {
  name: 'PeptideLabIndex',
  domain: 'peptidelabtest.org',
  url: 'https://www.peptidelabtest.org',
  masterCode: 'LABINDEX',
  contactEmail: 'partners@peptidelabtest.org',
  telegramUrl: 'https://t.me/peptidelabindex',
  updatedLabel: 'November 2026',
};

export const PREVIEW_UNVERIFIED_CODES = false;

export interface VendorAffiliateConfig {
  slug: string;
  baseUrl: string;
  /** Paste your approved affiliate tracking link here */
  affiliateUrl: string;
  /** Set to true once your tracking link / coupon is live with this vendor */
  isApproved: boolean;
  /** Has an affiliate program at all? False = pure editorial / contrast review */
  hasProgram: boolean;
  network: 'In-House' | 'Awin' | 'Coupon-Only' | 'None';
  signupUrl?: string;
  promoCode?: string;
  discountPercent?: number;
  discountNote?: string;
}

export const AFFILIATE_CONFIG: Record<string, VendorAffiliateConfig> = {
  'certa-peptides': {
    slug: 'certa-peptides',
    baseUrl: 'https://certapeptides.com/',
    affiliateUrl: 'https://certapeptides.com/?ref=LABINDEX',
    isApproved: false,
    hasProgram: true,
    network: 'In-House',
    signupUrl: 'https://certapeptides.com/affiliate',
    promoCode: 'LABINDEX',
    discountPercent: 15,
    discountNote: '15% OFF sitewide',
  },
  'particle-peptides': {
    slug: 'particle-peptides',
    baseUrl: 'https://particlepeptides.com/en/',
    affiliateUrl: 'https://particlepeptides.com/en/?refs=LABINDEX',
    isApproved: false,
    hasProgram: true,
    network: 'In-House',
    signupUrl: 'https://particlepeptides.com/en/contact-us',
    promoCode: 'LABINDEX',
    discountPercent: 15,
    discountNote: '15% OFF EU catalog',
  },
  'real-peptides': {
    slug: 'real-peptides',
    baseUrl: 'https://realpeptides.com/',
    // Replace YOUR_AWIN_PUB_ID once approved on Awin Merchant ID 125918
    affiliateUrl: 'https://realpeptides.com/',
    isApproved: false,
    hasProgram: true,
    network: 'Awin',
    signupUrl: 'https://ui.awin.com/merchant-profile/125918',
    promoCode: 'LABINDEX',
    discountPercent: 10,
    discountNote: '10% OFF research catalog',
  },
  'avellon-peptides': {
    slug: 'avellon-peptides',
    baseUrl: 'https://avellon-peptides.com/',
    affiliateUrl: 'https://avellon-peptides.com/?aff=LABINDEX',
    isApproved: false,
    hasProgram: true,
    network: 'In-House',
    signupUrl: 'https://avellon-peptides.com/affiliate-bereich/',
    promoCode: 'LABINDEX',
    discountPercent: 10,
    discountNote: '10% OFF all vials',
  },
  'arctic-lab-supply': {
    slug: 'arctic-lab-supply',
    baseUrl: 'https://arcticlabsupply.com/',
    affiliateUrl: 'https://arcticlabsupply.com/?ref=LABINDEX',
    isApproved: false,
    hasProgram: true,
    network: 'In-House',
    signupUrl: 'https://arcticlabsupply.com/contact',
    promoCode: 'LABINDEX',
    discountPercent: 20,
    discountNote: '20% OFF lot-verified vials',
  },
  'limitless-life-nootropics': {
    slug: 'limitless-life-nootropics',
    baseUrl: 'https://www.limitlesslifenootropics.com/',
    affiliateUrl: 'https://www.limitlesslifenootropics.com/?ref=peptidelabindex',
    isApproved: false,
    hasProgram: true,
    network: 'In-House',
    signupUrl: 'https://limitlesslifenootropics.com/contact-us/',
    promoCode: 'LABINDEX',
    discountPercent: 15,
    discountNote: '15% OFF eligible items',
  },
  'onyx-peptides': {
    slug: 'onyx-peptides',
    baseUrl: 'https://onyxpeptides.com/',
    affiliateUrl: 'https://onyxpeptides.com/go/peptidelabindex',
    isApproved: false,
    hasProgram: true,
    network: 'In-House',
    signupUrl: 'https://onyxpeptides.com/affiliate/',
    promoCode: 'LABINDEX10',
    discountPercent: 10,
    discountNote: '10% OFF EU orders',
  },
  'peptidprofi': {
    slug: 'peptidprofi',
    baseUrl: 'https://peptidprofi.de/',
    affiliateUrl: 'https://peptidprofi.de/?ref=LABINDEX',
    isApproved: false,
    hasProgram: true,
    network: 'In-House',
    signupUrl: 'https://peptidprofi.de/affiliate',
    promoCode: 'LABINDEX',
    discountPercent: 10,
    discountNote: '10% OFF EU/DE orders',
  },
  'purified-peptide': {
    slug: 'purified-peptide',
    baseUrl: 'https://purifiedpeptide.com/',
    // Replace YOUR_AWIN_PUB_ID once approved on Awin Merchant ID 129215
    affiliateUrl: 'https://purifiedpeptide.com/',
    isApproved: false,
    hasProgram: true,
    network: 'Awin',
    signupUrl: 'https://ui.awin.com/merchant-profile/129215',
  },
  'genesis-peptides': {
    slug: 'genesis-peptides',
    baseUrl: 'https://genesispeptides.com/',
    affiliateUrl: 'https://genesispeptides.com/partners/',
    isApproved: false,
    hasProgram: true,
    network: 'In-House',
    signupUrl: 'https://genesispeptides.com/partners',
    promoCode: 'LABINDEX',
    discountPercent: 15,
    discountNote: '15% OFF US orders',
  },
  'ghostlabz-research': {
    slug: 'ghostlabz-research',
    baseUrl: 'https://ghostlabzresearch.com/',
    affiliateUrl: 'https://ghostlabzresearch.com/?ref=peptidelabindex',
    isApproved: false,
    hasProgram: true,
    network: 'In-House',
    signupUrl: 'https://ghostlabzresearch.com/contact-us/',
    promoCode: 'LABINDEX',
    discountPercent: 25,
    discountNote: '25% OFF sitewide',
  },
  'peptides-eu': {
    slug: 'peptides-eu',
    baseUrl: 'https://www.peptides-eu.net/',
    affiliateUrl: 'https://www.peptides-eu.net/?aff=LABINDEX',
    isApproved: false,
    hasProgram: true,
    network: 'In-House',
    signupUrl: 'https://www.peptides-eu.net/affiliate-program',
    promoCode: 'LABINDEX',
    discountPercent: 10,
    discountNote: '10% OFF first order',
  },
  'source-research': {
    slug: 'source-research',
    baseUrl: 'https://sourceresearch.io/',
    affiliateUrl: 'https://sourceresearch.io/',
    isApproved: false,
    hasProgram: true,
    network: 'Coupon-Only',
    promoCode: 'LABINDEX',
    discountPercent: 20,
    discountNote: '20% OFF non-sale items',
  },
  'cenexa-labs': {
    slug: 'cenexa-labs',
    baseUrl: 'https://cenexalabs.com/',
    affiliateUrl: 'https://cenexalabs.com/',
    isApproved: false,
    hasProgram: true,
    network: 'In-House',
    signupUrl: 'https://cenexalabs.com/contact/',
    promoCode: 'LABINDEX',
    discountPercent: 20,
    discountNote: '20% OFF research catalog',
  },
  'nextself-labs': {
    slug: 'nextself-labs',
    baseUrl: 'https://nextselflabs.com/',
    affiliateUrl: 'https://nextselflabs.com/',
    isApproved: false,
    hasProgram: true,
    network: 'Coupon-Only',
    signupUrl: 'https://nextselflabs.com/contact/',
    promoCode: 'LABINDEX',
    discountPercent: 25,
    discountNote: '25% OFF catalog',
  },
  // Non-affiliate editorial / contrast reviews (builds E-E-A-T & captures competitor search traffic)
  '24peptides': {
    slug: '24peptides',
    baseUrl: 'https://24peptides.com/',
    affiliateUrl: 'https://24peptides.com/',
    isApproved: false,
    hasProgram: false,
    network: 'None',
  },
  'ascension-peptides': {
    slug: 'ascension-peptides',
    baseUrl: 'https://ascensionpeptides.com/',
    affiliateUrl: 'https://ascensionpeptides.com/',
    isApproved: false,
    hasProgram: false,
    network: 'None',
  },
  'core-peptides': {
    slug: 'core-peptides',
    baseUrl: 'https://corepeptides.com/',
    affiliateUrl: 'https://corepeptides.com/',
    isApproved: false,
    hasProgram: false,
    network: 'None',
  },
  'biolab-shop': {
    slug: 'biolab-shop',
    baseUrl: 'https://biolabshop.eu/',
    affiliateUrl: 'https://biolabshop.eu/',
    isApproved: false,
    hasProgram: false,
    network: 'None',
  },
  'peptid24': {
    slug: 'peptid24',
    baseUrl: 'https://peptid24.de/',
    affiliateUrl: 'https://peptid24.de/',
    isApproved: false,
    hasProgram: false,
    network: 'None',
  },
  'pen-peptide': {
    slug: 'pen-peptide',
    baseUrl: 'https://penpeptide.pl/',
    affiliateUrl: 'https://penpeptide.pl/',
    isApproved: false,
    hasProgram: false,
    network: 'None',
  },
  'nordic-peptides': {
    slug: 'nordic-peptides',
    baseUrl: 'https://nordicpeptides.is/',
    affiliateUrl: 'https://nordicpeptides.is/',
    isApproved: false,
    hasProgram: false,
    network: 'None',
  },
};

export function resolveVendorLink(slug: string): {
  href: string;
  rel: string;
  promoCode?: string;
  discountPercent?: number;
  discountNote?: string;
  isSponsored: boolean;
} {
  const cfg = AFFILIATE_CONFIG[slug];
  if (!cfg) {
    return { href: '/vendors/', rel: 'nofollow noopener', isSponsored: false };
  }
  const useAffiliate = cfg.hasProgram && (cfg.isApproved || PREVIEW_UNVERIFIED_CODES);
  const showCode = cfg.hasProgram && cfg.promoCode && (cfg.isApproved || PREVIEW_UNVERIFIED_CODES);
  return {
    href: cfg.isApproved ? cfg.affiliateUrl : cfg.baseUrl,
    rel: useAffiliate ? 'sponsored noopener noreferrer' : 'nofollow noopener noreferrer',
    promoCode: showCode ? cfg.promoCode : undefined,
    discountPercent: showCode ? cfg.discountPercent : undefined,
    discountNote: showCode ? cfg.discountNote : undefined,
    isSponsored: Boolean(useAffiliate),
  };
}
