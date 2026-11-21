# GOAL progress log (peptidelabtest.org)

Owner decisions (21.11.2026): full autonomous execution approved. NO dosing content (rule confirmed). Telegram NOT approved (skip).

| Milestone | Status | Commit | Notes |
|---|---|---|---|
| M0 keyword plan | done | e6ee280 | keywords-{us,de,es,fr,it}.json + PAGES.md, DataForSEO cost ~0.65 USD |
| M1 trust/GEO | done, live 200 | 27779d4 | 4 new page types x 5 langs (20 pages), vendor answer-first, llms answers |
| M2 COA hub | done | 9035fd7 | 4 new pages x 5 langs + Janoshik extension + 5 PDFs |
| M3 calculators/blends | todo | – | |
| M4 shops/brand terms | todo | – | |
| M5 visuals/video | todo | – | |
| M6 price index/badge | todo | – | |
| M7 linking/verify | todo | – | |

## Log
- Session 1 started: read GOAL, CONTENT_RULES, BRIEF, BUILD-i18n; skills loaded.
- M0 done: keywords-us/de/es/fr/it.json (ES file has ES+MX), PAGES.md with 36 planned page rows. Scripts in docs/agent/goal/scripts (read keychain dataforseo). Next: M1.
- M1 done (27779d4): views TrustedVendors, LegitCheck (variant legit|redflags), LegalStatus (variant legal|reta); data src/lib/cases.ts (8 audit cases, build asserts sources exist in audit.json), src/data/regSources.ts (FDA/Lilly, opened 21.11., copies in docs/agent/goal/sources/); new UI strings ONLY in src/i18n/x/<lang>.json (merged in i18n/index.ts), check with `python3 docs/agent/xcheck.py`; footer links added. Checks green: verify.py, hreflang_check.py, numcheck (1 pre-existing de/prices artefact), keyleak (pre-existing r.o false positives).
- Next: M2 COA hub (/how-to-read-a-peptide-coa/, /coa-red-flags/ = LegitCheck variant redflags + rf.* strings, /coa-checker/, janoshik extend, checklist PDF).
- M2 done (9035fd7): views CoaGuide, CoaChecker, Checklist, LegitCheck variant redflags; src/lib/coa.ts (COA_STATS, FILL_OUTLIERS, checkerData); PDFs via `sh scripts/make-checklist-pdfs.sh` (needs a fresh build first; rebuild afterwards) -> public/downloads/peptide-coa-checklist-<lang>.pdf (1 page each). Print CSS in global.css. hreflang_check allows /downloads/, keyleak skips .co/.pdf hosts.
- Next: M3 calculators per compound (/calculator/<slug>/), blends (needs read-only research of shop product pages -> src/data/blends.json via scripts/build-audit-data.py), compare pages semaglutide-vs-tirzepatide + 3-way.
