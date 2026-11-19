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
7. Only codes the vendor actually issued to us (see src/data/affiliates.ts / code-register.csv).
   No invented discounts, no "up to X%" beyond what is issued, no fake urgency/limited-time claims.
8. No own discount promotions or deal campaigns with a vendor's code without the vendor's written OK.
9. No paid ads (Google/Meta) on vendor brand names; no vendor names in our domains or URL slugs
   like "<brand>-coupon".
10. Never invent lab values. Every measured number needs a verifiable source (lab portal key/PDF + date).
11. Use vendor COAs/certificates only for factual presentation of that vendor's products.

## 2. Vendor-specific rules

| Vendor | Extra rules |
|---|---|
| Avellon (LABINDEX, 20%) | RUO only; no human-use, dosing, health effects or medical treatment claims; no healing/misleading claims; no presentation as approved drugs; transparent ad labelling; own discount promos only with Avellon's approval. |
| CertaPeptides (AFF-LABINDEX) | RUO wording; follow program terms in dashboard. |
| Genesis (labindex15 / labindexwelcome30) | RUO wording; follow program terms in dashboard. |
| Arctic Lab Supply (VENDORS) | RUO wording; follow program terms in dashboard. |
| Modern Aminos (not joined) | Terms contain non-compete + non-disparagement (sec. 10/11) – do NOT publish their code until written carve-out. |
| Ameano/AMP, SwissChems, Glacier | Ban coupon/“verified code” pages and brand-keyword SEO – never list them on /discount-codes/. |

## 3. Existing content flagged for review (2026-11-19)

These conflict with rule 2 (dosing) and with Avellon's "no dosing" clause:
- src/components/ReconstitutionCalculator.astro (dose in mcg, U-100 syringe units) – used on / and /calculator/
- src/data/compounds.ts `standardReconstitution` ("… mcg per 1 IU tick")
- Nav labels "Syringe Tool", "Blend & U-100 Syringe Calculator" (src/layouts/BaseLayout.astro)
Decision pending with Gorden: remove, or reduce to a pure concentration tool (mg + mL → mg/mL) without dose/syringe units.
