# Content Rules – peptidelabtest.org (PeptideLabIndex)

Binding for ALL new and edited content (human or AI-written). Partner rules come from
affiliate approvals/terms; breaking them = commission forfeited or account closed.
Check this file before writing or publishing anything. When in doubt: leave it out.

## 1. Hard rules (all vendors)

1. Research Use Only (RUO). Every product is a laboratory reagent. Never imply human or animal use.
2. NO dosing: no doses, mcg/mg per person, frequencies, cycles, protocols, "stacks" for people,
   injection sites, syringe/IU instructions, "how to use/take".
3. NO health/medical claims: no healing, treatment, cure, prevention, weight/fat loss, muscle growth,
   anti-aging, recovery, libido, sleep, cognition benefits. Not even "studies suggest it may help…".
4. NO presenting products as approved drugs or alternatives to prescription drugs
   (no "semaglutide alternative", "cheaper than Ozempic", etc.).
5. Facts only about vendors: lab results, COA verification, fill weight, price per mg, shipping,
   legal entity. Weaknesses may be stated, but strictly factual and sourced (lab report, portal link, date).
6. Affiliate disclosure on every page with partner links; all partner links rel="sponsored nofollow".
7a. Vendors whose terms ban coupon/code pages get `codeOnlyOnVendorPage: true` in src/data/affiliates.ts
   (code shown only on /vendors/<slug>/, hidden on /discount-codes/, cards, compound pages).
7. Only codes the vendor actually issued to us (see src/data/affiliates.ts / code-register.csv).
   No invented discounts, no "up to X%" beyond what is issued, no fake urgency/limited-time claims.
8. No own discount promotions or deal campaigns with a vendor's code without the vendor's written OK.
9. No paid ads (Google/Meta) on vendor brand names; no vendor names in our domains or URL slugs
   like "<brand>-coupon".
10. Never invent lab values. Every measured number needs a verifiable source (lab portal key/PDF + date).
11. Use vendor COAs/certificates only for factual presentation of that vendor's products.
12. No external link without our affiliate tracking (owner decision 2026-11-20). Non-partner vendors get no
    outbound button (cards link to our own review page instead); lab portals/sources are shown as plain text.

## 2. Vendor-specific rules

| Vendor | Extra rules |
|---|---|
| Avellon (LABINDEX, 20%) | RUO only; no human-use, dosing, health effects or medical treatment claims; no healing/misleading claims; no presentation as approved drugs; transparent ad labelling; own discount promos only with Avellon's approval. |
| CertaPeptides (AFF-LABINDEX) | RUO wording; follow program terms in dashboard. |
| Genesis (labindex15 / labindexwelcome30) | RUO wording; follow program terms in dashboard. |
| Arctic Lab Supply (VENDORS) | RUO wording; follow program terms in dashboard. |
| Peptides EU (AFF-45MPJVHZ, 20%, BTC payout) | No coupon/deal sites, no brand bidding, no self-referrals, RUO-only messaging -> code only on /vendors/peptides-eu/ (codeOnlyOnVendorPage). |
| GhostLabz Research (toplist, 30%) | GoAffPro operating agreement bans coupon websites and "reveal code" mechanics -> code only on /vendors/ghostlabz-research/ (codeOnlyOnVendorPage). |
| Particle Peptides (applied) | Link only on a properly completed website with RUO disclaimers; no brand bidding, no cookie stuffing, no self-referrals. |
| Real Peptides (ref link, 25%) | Link only, no code; RUO wording (vendor is RUO chemical supplier, no human/animal use). |
| Modern Aminos (not joined) | Terms contain non-compete + non-disparagement (sec. 10/11) – do NOT publish their code until written carve-out. |
| PeptidProfi (accepted, placement on hold) | Do not publish the code or referral link until a written carve-out covers website-only publishing and independent price comparisons. [Affiliate agreement](https://peptidprofi.de/affiliate/vereinbarung) v2026-10-20.1: “Dein persönlicher Rabattcode und @peptidprofi stehen dauerhaft in deiner Profil-Bio. Fehlen sie, wird dein Partnerkonto deaktiviert oder gelöscht.” [Advertising guidelines](https://peptidprofi.de/affiliate/richtlinien) forbid “Preisvergleiche mit anderen Anbietern.” Clearly label advertisements; RUO only; no human effects or medical claims, ingestion, application, dosing or injection, before/after comparisons or bodily-use testimonials, misleading claims or self-referrals. |
| Ameano/AMP, SwissChems, Glacier | Ban coupon/“verified code” pages and brand-keyword SEO – never list them on /discount-codes/. |

## 3. Fixed content (2026-11-19)

- Calculator rebuilt as pure lab stock-concentration tool (mg + mL -> mg/mL, COA override, two-compound vial).
  Removed: dose/aliquot input, U-100 syringe/IU outputs, syringe graphic, "withdrawals". Do NOT re-add.
- compounds.ts: removed "mcg per 1 IU tick"; categories renamed to neutral research classes
  (no "Repair & Recovery", "Longevity", "Nootropic").
- Nav, calculator page meta/FAQ, index CTA, legal text and public/llms.txt updated accordingly.
