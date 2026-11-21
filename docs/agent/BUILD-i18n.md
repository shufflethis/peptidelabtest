# peptidelabtest.org – Phase A (titles/CTA, internal links, mobile) + Phase B (DE/ES/FR/IT)

Repo ~/sites/peptidelabtest (Astro 7, Tailwind 4, trailingSlash always, push master = deploy). Read CONTENT_RULES.md and /Users/gorden/.hermes/cache/scratch/pep-seo/BRIEF.md (rules + readability standard still apply). Verify script: /Users/gorden/.hermes/cache/scratch/pep-seo/verify.py (run `python3 verify.py dist` from repo root or pass path), screenshot helper shot.sh + h.py in the same folder.

WORK SAFELY: milestone commits with green build; never delete pages wholesale; do not touch other repos; no accounts, no emails.

## Phase A1 – Titles + CTA (commit)
- Every <title> <= 60 chars (hard), unique, primary keyword first, a click hook at the end. Meta descriptions 130-155 chars, answer-first, with a CTA verb ("Compare", "See lab reports", "Check prices"). Examples:
  * /prices/bpc-157/ -> "BPC-157 Price per mg: 17 Shops Compared (2026)"
  * /prices/retatrutide/10mg/ -> "Retatrutide 10mg Prices & Lab Tests (2026)"
  * /vendors/onyx-peptides/ -> "Onyx Peptides Review: Legit? Lab Tests & Prices"
  * /compare/bpc-157-vs-tb-500/ -> "BPC-157 vs TB-500: Prices & Lab Data Compared"
  * /labs/janoshik/ -> "Janoshik Analytical: How to Verify a Report"
  Numbers in titles must come from data (count shops computed at build).
- H1 can stay longer/descriptive. On-page CTAs: partner cards/rows one clear primary button "Visit <Shop>" (+ "Code <X> for N%" badge where allowed), secondary "See lab reports" internal. Sticky mobile CTA bar on partner vendor pages (shop name + code + button). Keep rel sponsored rules.
- verify.py: add check title length > 60 -> must be 0.

## Phase A2 – Internal linking (commit)
- Build a link graph from dist (python): report orphan pages (0 inbound internal links) and pages with < 3 inbound; fix to 0 orphans and >= 3 inbound for every money page (/prices/*, /vendors/*, /compare/*, /labs/*).
- Add/ensure: breadcrumbs; "Related" blocks (prices page -> its size pages, compound page, compare pages containing the compound, top 3 partner shop reviews carrying it; size page -> sibling sizes + parent; vendor page -> its cheapest compounds' price pages, relevant vs pages, labs it uses; lab page -> shops using it; compare page -> both compounds' price pages). Descriptive anchor text (not "click here"), varied. Footer: top compounds price pages + top labs.
- Report before/after inbound stats.

## Phase A3 – Mobile recheck (commit)
- Screenshots at 390px and 1280px live (after deploy) of: home, /prices/bpc-157/, /prices/retatrutide/10mg/, /vendors/certa-peptides/, /vendors/onyx-peptides/, /compare/bpc-157-vs-tb-500/, /labs/janoshik/, /batch-tracker/. Look at every screenshot yourself; fix horizontal overflow, cut-off text, tiny chart labels, cramped tables, tap targets < 44px. Run an automated overflow sweep (scrollWidth > innerWidth) over all page types at 390px. Save shots to /Users/gorden/.hermes/cache/scratch/pep-i18n/shots/.

## Phase B – DE / ES / FR / IT (commit per language once green)
- Routing: English stays at root. /de/, /es/, /fr/, /it/ mirror EVERY page with the same path below the prefix (e.g. /de/prices/bpc-157/). Use Astro i18n config (defaultLocale en, prefixDefaultLocale false) or a [lang] param route pattern – your choice, but avoid duplicating page code per language: shared page components take `lang`.
- UI strings: extract all hard-coded English UI/prose from templates into src/i18n/en.json (keys), then write de.json, es.json, fr.json, it.json yourself (native quality, neutral consumer-testing tone, same hard rules as /Users/gorden/.hermes/cache/scratch/pep-i18n/TRANSLATE.md). Template-generated sentences with data (e.g. "Cheapest partner price: €X/mg at Y") must be proper localized templates with placeholders – not concatenated English grammar.
- Data texts: translated files arrive (from parallel agents) at /Users/gorden/.hermes/cache/scratch/pep-i18n/data-de.json, data-es.json, data-fr.json, data-it.json (keys documented in src-data.json, built by dump.ts there: compounds.*, labGuides.*, labs.*, laws.*, audit.<slug>.<field>[.<i>|.<subscore>]). Copy them into src/i18n/data/<lang>.json and look up by the same key path; fall back to English for any missing key. If a file is not there yet when you need it, build with fallback, continue with other work, and check again before the final commit (they should land within ~20 minutes). Validate: no key in data-<lang>.json changes a number (python: extract digits from EN vs translation per key; report mismatches and fix by using English for those keys).
- Number/currency formatting per locale for UI-generated values (Intl.NumberFormat: de/es/fr/it decimal comma; keep currency symbol per data currency, no conversion).
- SEO per language: localized <title> (<= 60 chars) and meta description using local search terms: DE "kaufen", "Preisvergleich", "Test & Erfahrungen", "Laborbericht"; ES "comprar", "precio", "comparativa", "opiniones", "análisis de laboratorio"; FR "acheter", "prix", "comparatif", "avis", "analyse labo"; IT "acquistare", "prezzo", "confronto", "recensioni", "analisi di laboratorio". html lang attribute, og:locale, canonical self per language, hreflang alternates for en/de/es/fr/it + x-default (en) on every page, consistent and reciprocal. Sitemap with all language URLs (+ xhtml:link alternates if the sitemap integration supports i18n option). JSON-LD inLanguage. Language switcher in header (text labels EN DE ES FR IT, no flags/emojis), links to the same page in the other language.
- llms.txt: add a section listing language versions; llms-full.txt stays English.
- /data/ CSV stays one English file (link it from all languages).
- Legal/RUO disclaimer and affiliate disclosure translated. Methodology translated.
- Do not translate shop names, product names, codes, report IDs, URLs.

## Verification (final report must include outputs)
1) npm run build passes; page count per language. 2) verify.py on dist (all checks incl. new title-length check) for all languages: sponsored rule, no lab-portal <a>, no emojis, banned-words scan in all languages (add DE/ES/FR/IT terms: Dosis/Dosierung/injizieren/spritzen/Abnehmen/Heilung; dosis/inyectar/adelgazar/curar; dose/posologie/injecter/perte de poids/guérir; dose/dosaggio/iniettare/dimagrire/guarire) – fix claims; codeOnlyOnVendorPage codes visible only on own vendor pages (in every language); no 'undefined'/'NaN'; licensed-peptides absent. 3) hreflang reciprocity check script: for every page, all 5 alternates exist in dist and point back. 4) orphan/inbound stats. 5) After final push wait ~90s, curl 200 + H1 for /, /de/, /es/prices/bpc-157/, /fr/vendors/certa-peptides/, /it/compare/bpc-157-vs-tb-500/. 6) Commit hashes.
