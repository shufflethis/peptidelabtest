# Refresh runbook – twice weekly (Mon + Thu)

Sites: ~/sites/peptidelabtest (peptidelabtest.org) and ~/sites/kollagenpeptidekaufen (kollagenpeptidekaufen.de). Push to master/main deploys via Vercel.
Read CONTENT_RULES.md of each repo first. Never invent values; only record what you opened, with URL and date. No accounts, no forms, no carts, no emails, no DNS. Answer (final report) in German, short.

## A. peptidelabtest.org (priority)
1. Partner shops first (they carry our money links): certa-peptides, avellon-peptides, arctic-lab-supply, genesis-peptides, real-peptides, ghostlabz-research, peptides-eu. Then all other shops in src/data/audit.json (rotate: half the non-partner shops per run, oldest readAt first).
2. Per shop: re-read current prices of the products already listed (products[].url; WooCommerce: /wp-json/wc/store/v1/products, Shopify: /products/<handle>.js, else page JSON-LD/HTML). Record price, salePrice, inStock. Check the shop's COA/lab page for NEW reports (not yet in coaExamples); open new reports on the lab portal where possible (verify.janoshik.com, verifiedbyvanguard.com, portal.ils-lab.com, base.liquilabs.cz …) and add them with lab, reportId, testDate, labelMg, measuredMg, purity, url, verifiable.
3. Write changes as a dated research file docs/agent/goal/research/refresh-<YYYY-MM-DD>.json (same schema as the audit research files; only changed fields + readAt + sources) and merge via the existing build-audit-data.py flow (read docs/agent/goal/PROGRESS.md for how research files are merged). Recompute scores only via the script. Price index: the monthly edition logic lives on /price-index/ (history CSV) – on the first run of a new month freeze the previous month's edition as the script/docs describe.
4. Update the visible "last checked" date only for data actually re-read.
5. Build, then `python3 docs/agent/verify.py dist --all` must be all 0. Commit "Refresh <date>: …", push.

## B. kollagenpeptidekaufen.de
1. Re-read prices on the brands' own shops for the products in src/data/brands.json (Shopify .js / JSON-LD), plus check whether brands with labTestPublished 'no/claimed' now publish a lab report. Do NOT scrape Amazon prices (Amazon terms); Amazon-only products keep "Preis laut Recherche am <Datum>".
2. Record changes in the research inputs used by scripts/build-data.py (dated file under docs/refresh/), rebuild data, `npm run build`, `npm run verify` (0 errors), commit, push.

## C. After both
- Wait ~90 s, curl the changed pages (200).
- Ping IndexNow for changed URLs: `python3 ~/.hermes/scripts/indexnow.py` (submits all sitemap URLs of the three sites; fine twice a week).
- Final report (German, max 12 lines): per site number of shops/brands re-read, price changes (biggest moves with product + old -> new), new lab reports added, stock changes of partner products, anything broken (shop down, redirect, blocked), commits. If nothing changed: say so in one line.

## Safety
- If a build or verify fails and you cannot fix it within the rules: do not push; revert local changes (`git checkout -- .`) and report the error.
- If a partner shop is down or no longer sells a listed product, report it prominently (money link at risk) but do not remove the partner link yourself.
