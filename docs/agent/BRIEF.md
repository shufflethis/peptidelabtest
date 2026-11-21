# peptidelabtest.org – Redesign + Nischen-SEO/GEO Brief (2026-11-20)

Repo: ~/sites/peptidelabtest (Astro 7 + Tailwind 4, trailingSlash always, site https://www.peptidelabtest.org, push to master = auto deploy).
READ FIRST: CONTENT_RULES.md (hard rules). Keyword data: ~/.hermes/cache/scratch/pep-seo/niche.json (US, DataForSEO, volume/KD).

## WORK SAFELY (a previous attempt was interrupted after deleting all pages)
- Never delete pages wholesale. Rewrite file by file; the build must stay green.
- Commit + push after EACH milestone (M1..M5 below) once `npm run build` passes. Small commits survive interruptions.
- Untracked src/components/Icon.astro and Stars.astro exist from the aborted attempt: inspect, reuse or overwrite.

## DATA (do not invent ANY number)
- src/data/audit.json (24 shops, regenerate only via `python3 scripts/build-audit-data.py`): coaExamples (report URL, labelMg, measuredMg, purity, lab, reportId, testDate, verifiable), products (compound, shopProductName, vialMg, price, salePrice, currency, url, inStock, pricePerMg), subscores 0-10 + subscore_reasons, strengths, weaknesses, verdict, summary, sources, readAt, legalEntity, shipsTo, dispatchInfo, paymentMethods, panels, coaAccess. Field `notes` is internal: never render.
- src/data/vendors.ts -> VendorProfile (scores 0-5, overallScore, coaExamples, products, sources, reviewedAt, shipsTo, subscoreReasons). Licensed Peptides = draft (hidden, keep hidden everywhere incl. sitemap/CSV/llms).
- src/data/batches.ts BATCH_RECORDS (opened reports only), getComputedBatches (null prices -> 'n/a').
- src/data/affiliates.ts resolveVendorLink(slug) -> {href, rel, promoCode, discountPercent, discountNote, isSponsored, codeOnlyOnVendorPage}.
  Partners (isSponsored): certa-peptides, avellon-peptides, arctic-lab-supply, genesis-peptides, real-peptides (link only, no code), ghostlabz-research + peptides-eu (codeOnlyOnVendorPage: code visible ONLY on their own /vendors/<slug>/ page; elsewhere 'Reader code on review page').
- src/data/compounds.ts (getCompoundBySlug), labs.ts, laws.ts.
- Missing values: 'not published' / 'n/a'.

## HARD RULES
1. No invented values; every number from the data files.
2. External links ONLY to partner shops via resolveVendorLink().href, rel="sponsored noopener noreferrer", target=_blank. Non-partner shops: no outbound link at all (internal /vendors/<slug>/ only). Lab report URLs = plain copyable text, not <a>. Partner product deep links: append the partner's ref param (?ref=AFF-LABINDEX / ?aff=LABINDEX / ?ref=VENDORS / ?aff=AFF-45MPJVHZ / ?ref=toplist) to products[].url; genesis + real-peptides: use affiliateUrl (home) only.
3. Do not compute "price after code". Show price (sale price, list struck through), price per mg, separate code column.
4. No currency conversion; EU (EUR) and US (USD) shown separately.
5. Rankings / "best" lists rank ONLY partner shops, by overallScore (never commission). Non-partners in "Other audited shops" (score + text + internal link). Non-partner vendor pages get "Compare: audited shops with a store link" box (2-3 best partners, same region).
6. No emojis anywhere (incl. flags, ★). Inline SVG only (Lucide-style Icon.astro; SVG stars).
7. NO dosing, reconstitution, injection, "how much bac water", protocols, human-use or health-benefit claims. Skip every keyword of that type. Compound texts = neutral research-compound facts (what it is, research status, sequence/class from compounds.ts, vial sizes on the market, prices, lab-test coverage). RUO disclaimer stays. /calculator/ stays but only linked from footer.

## M1 – Design system (light, premium comparison site; "noch ein Pfund drauf")
- Style reference: ~/sites/mushroomsupplementreview (Layout.astro, index.astro, components) – same family, own accent (teal/emerald + deep slate), white/slate-50 backgrounds, generous spacing, Inter/system font, rounded-2xl cards, subtle shadows, sticky header with nav: Compare prices | Shops | Lab reports | Compounds | Methodology. Mobile-first, sticky table headers, horizontal scroll on mobile tables.
- Visual extras, all inline SVG generated at build time from data (no JS libs): score ring (0-5) per shop, subscore bars, "measured vs label mg" dot/bar chart per shop and per compound (100% reference line, ±10% band), price-per-mg bar chart per compound (partner bars in accent, others grey), verification badges (portal-verified / vendor-hosted / none), trust strip with counts.
- Components: Icon, Stars, ScoreRing, SubscoreBars, FillChart, PriceBars, ShopCard (partner tile with CTA + code badge), CompareBox, Breadcrumbs, FAQ, Disclosure.
- BaseLayout: meta, canonical (www + trailing slash), OG/Twitter tags, Organization+WebSite JSON-LD, BreadcrumbList slot, Plausible script kept (pa-gLRgumVP7qfI1CLz6JJes.js), footer with RUO + affiliate disclosure + legal + tools links.

## M2 – Core pages
- Home: H1 "Research Peptide Prices & Lab Tests Compared (2026)". Compound quick picker -> /prices/<compound>/. "Best audited shops" partner tiles EU + US (score ring, lab, portal-verified x/y, purity range, fill range, cheapest €/$ per mg example, code badge, CTA). Trust strip (24 shops audited, N reports opened, N portal-verified, 20 Nov 2026). "How we test" block. "Other audited shops" list. ItemList JSON-LD.
- /prices/ index + /prices/[compound]/ for every compound with >=2 products: Title "<Compound> Price Comparison 2026: N Shops, Price per mg & Lab Tests". Data summary paragraph, PriceBars chart, EU table + US table (shop, product, vial mg, price, price/mg, lab report for this compound yes/no + measured/label + purity + lab, shop score, code, button; partners first-class, non-partners greyed without outbound link), small vanilla JS sort, FAQ (from data) + FAQPage JSON-LD, ItemList, last updated.
- /vendors/ (ranking partners + other shops), /vendors/[slug]/ (hero score ring + subscores with reasons, key facts table, "Lab reports we opened" table + FillChart, prices table, strengths/weaknesses, verdict, sources plain text, reviewed date, partner CTA/code or alternatives box). Review JSON-LD (itemReviewed Organization, reviewRating 0-5, author Organization "PeptideLabIndex Editorial", datePublished/dateModified = reviewedAt). Keep /vendors/europe/ and /vendors/usa/ as regional rankings.
- /batch-tracker/ -> heading "Lab reports we opened" (table from BATCH_RECORDS, URL plain text). /discount-codes/ (only partner codes allowed there; others "see review"). /price-index/ -> overview linking to /prices/*. Rebuild /labs/, /compounds/, /compounds/[slug]/, /laws/, /research/, /methodology/, /legal/, /advertise/ in the new design, no emojis, no legacy unsourced numbers ("49+", "mean HPLC", "#1 EU", editor badges, invented purity prose -> remove).
- /methodology/: real method (weights lab verification 30, fill accuracy 20, panel depth 20, entity transparency 15, dispatch 10, value 5; value excluded when prices not public; 0-5 scale; desk audit of public shop pages and lab portals on 20 Nov 2026, no test orders). Remove claims we never did (e.g. registry cross-checks).

## M3 – Super-niche pages (KD ~0 in US data; build only from our data, all neutral)
a) Vial-size pages /prices/[compound]/[size]mg/ for compound+size combos offered by >=3 shops (e.g. retatrutide 10mg 2.9k, tesamorelin 10mg 2.9k, ghk-cu 50mg 1.6k, mots-c 40mg 1.3k, mots-c 10mg 1k, ss-31 50mg 720, tb-500 10mg 480, selank 10mg 480, epitalon 10mg). Title "<Compound> <N>mg: Prices at N Shops & Lab Tests (2026)". Table + chart only for that size.
b) "Where to buy" intent (bpc-157 where to buy 4.4k, where to buy retatrutide 6.6k, mots-c peptide buy 1.9k, ss-31 peptide buy 1.9k, tesamorelin peptide buy 1.9k): don't create separate thin pages – target via the /prices/[compound]/ title/H2/FAQ ("Where to buy <compound> for research: N audited shops compared") with EU/US split.
c) Compound-vs-compound research comparison pages /compare/[a]-vs-[b]/: bpc-157-vs-tb-500 (22.2k), tirzepatide-vs-retatrutide (8.1k), semax-vs-selank (4.4k), tesamorelin-vs-ipamorelin (2.4k) (sermorelin only if in compounds.ts), ghk-cu-vs-ahk-cu only if both in data, else skip. Content strictly: identity/class/sequence facts from compounds.ts, research-status (non-clinical wording), vial sizes on the market, side-by-side price per mg (EU/US), lab-report coverage and measured-fill stats from our audit, which audited shops carry both. NO effects/benefits/dosing comparison. FAQPage + BreadcrumbList.
d) Lab guides /labs/[lab]/ for labs appearing in audit.json (Janoshik 18.1k "janoshik", "janoshik verify" 1.6k, "is janoshik legit" 320, "janoshik testing cost" 390; Vanguard, ILS, Freedom Diagnostics, Liquilabs, MZ Biolabs, TrustPointe, BioSyn): what the lab is (only facts we can source from its public site – fetch and cite; if not sourceable, say not published), how to verify a report on its portal (steps, generic), which audited shops publish reports from this lab, how many of the reports we opened were portal-verified, measured fill range from those reports. Cite sources as plain text.
e) Vendor review pages are brand-query magnets (onyx peptides 22.2k, core peptides 18.1k, licensed 9.9k [hidden draft – skip], ascension 8.1k, peptide pro 6.6k, limitless 5.4k, real peptides 2.9k, particle 1.3k, nextself 880, arctic 590, ghostlabz 480, cenexa 390, genesis 320): title pattern "<Shop> Review 2026: Lab Reports, Prices & Legitimacy Checked", H2s answering "Is <Shop> legit?" (factual: entity, lab portal verification, what we could not verify), "<Shop> coupon code" (partners only; non-partners: "no reader code – compare shops with a code"), FAQPage JSON-LD on vendor pages too.
f) Shop-vs-shop pages /vendors/compare/[a]-vs-[b]/ only for partner pairs in the same region (e.g. certa-peptides-vs-peptides-eu, certa-vs-avellon, arctic-vs-genesis, arctic-vs-ghostlabz, ghostlabz-vs-genesis, real-peptides-vs-arctic) – side-by-side data table, charts, overlapping product prices per mg, verdict from scores.

## M4 – GEO / technical SEO
- public/llms.txt (purpose, method summary, data date, key URLs incl. /prices/*, /compare/*, /labs/*, /data/) + /llms-full.txt (plain-text dump: per shop score, entity, labs, portal-verified counts, cheapest price/mg per compound, reviewed date) generated at build (Astro endpoint .txt.ts).
- /data/ page + /data/peptide-shop-audit-2026.csv and .json endpoints generated from audit.json (one row per product; shop, region, compound, product, vialMg, price, salePrice, currency, pricePerMg, labReportOpenedForCompound, portalVerified, shopScore, reviewedAt). Dataset JSON-LD on /data/.
- Every page: unique title (<60 chars where possible) + meta description (<155), canonical, OG image (one static SVG->PNG not required; reuse a site OG image if present, else skip), BreadcrumbList, dateModified. Answer-first intro paragraph (40-60 words, fact-dense, quotable) on every money page for AI overviews. Visible "Last checked 20 Nov 2026".
- No Product/Offer/AggregateRating schema for peptides.
- robots.txt allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) + sitemap link. Sitemap includes all new pages, excludes draft vendor. lastmod 2026-11-20.
- Internal linking mesh: compound <-> prices <-> size pages <-> vendor pages <-> compare pages <-> lab pages; related links blocks.
- 404 page in new design.

## M5 – Verify, then final push
(1) npm run build passes; (2) python scan of dist: external <a href> to shop hosts without rel containing "sponsored" = 0; any <a> to lab portals = 0; (3) emoji regex over dist HTML = 0; (4) grep visible text for dose|dosing|inject|subcutaneous|reconstitut|bac water|weight loss|fat loss|healing|cure|treat -> fix claims (compound names/legal disclaimers ok; report hits); (5) list generated /prices/*, /compare/*, /labs/*, /vendors/compare/* pages; (6) 'AFF-45MPJVHZ' and 'toplist' visible text only on their own vendor pages (href params fine); (7) no page renders 'undefined' or 'NaN'; (8) licensed-peptides absent from dist except nothing. After push wait ~90s and curl https://www.peptidelabtest.org/, one /prices/ page, one /compare/ page, one /labs/ page: HTTP 200 + new H1.

Report: pages created/changed (counts per type), commit hashes, verification outputs. No other repos, no accounts, no emails.

## STATUS 17:05 + READABILITY (user feedback: "Lesbarkeit nicht top")
- M1 is committed (70c905c). A temporary CSS "Readability bridge" block was appended to src/styles/global.css (commit after 70c905c) that remaps legacy dark classes. Rebuild pages so they no longer need it, then DELETE that bridge block.
- Untracked, unfinished files from the interrupted run: src/components/PriceSection.astro, WhereToBuy.astro, src/pages/prices/ (index.astro, [compound]/[size].astro, maybe more). Review/finish them, do not trust blindly.
- Readability standard for every page (check these, it is the user's main complaint):
  * Body text 17-18px, line-height 1.65-1.75, max-width ~68ch for prose, color slate-700 (#334155) or darker on white; muted text never lighter than slate-500 (#64748b) and only for meta info. WCAG AA contrast (4.5:1) for all text incl. table cells, badges, chart labels.
  * No monospace for UI/body/buttons/labels (mono only for codes like report IDs and promo codes). No ALL-CAPS tracking-wide labels for anything longer than 2 words.
  * No gradient text for headings; solid slate-900 headings, clear hierarchy (H1 36-44px desktop / 30px mobile, H2 26-28px, H3 20px), sentence case.
  * Short paragraphs (max 3-4 sentences), lists for facts, one idea per section, plain English (no jargon without a one-line explanation, e.g. "price per mg = vial price / mg on label").
  * Tables: 15-16px, zebra rows, enough padding, right-aligned numbers, units in the header, sticky first column on mobile, max ~7 columns visible (extra details in an expandable row or second line).
  * Buttons min 44px height, clear labels ("Visit shop", "See lab reports"), max one primary CTA per card.
  * Remove all legacy marketing copy ("Verify True Milligrams.", "6.08 mg", "Underfill Alerts", emojis in buttons, calculator CTA on home).
- After pushing, take screenshots (browser) of home, one /prices/ page, one vendor page at 390px and 1280px width and fix what is hard to read before finishing.
