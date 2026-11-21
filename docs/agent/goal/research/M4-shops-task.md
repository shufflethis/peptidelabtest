# M4 task: read-only audit of new shops (GOAL.md M4)

Output: one JSON object per shop in docs/agent/goal/research/r5/<slug>.json (same schema as an entry in
src/data/audit.json before scoring: slug, name, shopUrl, region, originCountry, shipsTo, legalEntity,
testingLabs, coaAccess, coaExamples[], panels{}, paymentMethods[], freeShippingThreshold, dispatchInfo,
products[], subscores{}, subscore_reasons{}, strengths[], weaknesses[], verdict, summary, notes, sources[], readAt).
scripts/build-audit-data.py merges r5/*.json after r1-r4 and computes overallScore, coaStats, rank.

Rules
- Read-only: GET pages / public store APIs only. No accounts, no forms, no age-gate bypass by registering, no emails.
- Every value from a page you opened; list it in sources[]. Missing = null / "not published".
- Login wall or bot wall that blocks the catalog = record that fact (like peptide-pro), do not guess.
- Several sites with the same brand name: record all domains seen in notes; audit only a domain whose
  own pages identify the business (entity, address) or that is the one most cited; otherwise mark the
  brand as "origin unclear" and do not score it.
- COAs: open up to 4 per shop (prefer GLP-1 class, BPC-157, TB-500); verifiable=true only if the report
  was found on the lab's own portal/page.
- Subscores 0-10 with one-sentence reasons, using the same scale as existing shops
  (no public reports -> labVerification 0-1, fillAccuracy 3, panelDepth 0-2).
- Peptide Sciences: status only (closed March 2026 per its own site) -> not scored, shown as status note.
- Limitless Biotech = limitless-life-nootropics (already audited) -> own section on its review page.

Progress (update after each shop)
- see docs/agent/goal/PROGRESS.md
