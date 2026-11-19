# PeptideLabTest.org — Affiliate & Custom Code Playbook (`LABINDEX`)

Dieses Playbook enthält alle **live geprüften Partnerprogramm-URLs**, Awin-Merchant-IDs und Copy-Paste-Vorlagen, damit du dir für **PeptideLabTest.org** überall deinen eigenen Rabattcode **`LABINDEX`** (plus Tracking-Links) sicherst.

---

## 1. Optimale Reihenfolge (damit du sofort akzeptiert wirst!)

1. **Domain sichern:** Registriere `peptidelabtest.org` (z. B. bei Cloudflare Registrar oder Porkbun für ~$10/Jahr) und richte eine Weiterleitungs-E-Mail `partners@peptidelabtest.org` ein (bei Cloudflare Email Routing kostenlos!). *Mit einer echten `@peptidelabtest.org`-Adresse wirst du 3x schneller freigeschaltet als mit Gmail.*
2. **Vor dem Live-Gang vorübergehend Demo-Codes ausblenden:**
   Öffne [src/data/affiliates.ts](file:///home/badmax/peptide/src/data/affiliates.ts) und setze Zeile 25 auf:
   ```ts
   export const PREVIEW_UNVERIFIED_CODES = false;
   ```
   *(Lokal steht er aktuell auf `true`, damit du sofort siehst, wie die `LABINDEX`-Buttons und die rabattierten `$/mg`-Preise aussehen!)*
3. **Kostenlos live stellen:** Push den Ordner `/home/badmax/peptide` auf GitHub und verbinde ihn mit **Cloudflare Pages** oder **Vercel** (`Build command: npm run build`, `Output directory: dist`). Innerhalb von 60 Sekunden ist `https://www.peptidelabtest.org` live – mit 69 fertigen SEO-Seiten!
4. **Partnerprogramme beantragen (Tabelle unten):** Sobald die Prüfer der Shops sehen, dass sie bei dir bereits mit einem detaillierten COA-Audit gelistet sind, schalten sie deinen Link + den Wunschcode **`LABINDEX`** fast immer innerhalb von 24–72 Stunden frei.
5. **Code aktivieren:** Sobald ein Shop zusagt, trägst du in [src/data/affiliates.ts](file:///home/badmax/peptide/src/data/affiliates.ts) bei diesem Shop deinen echten Tracking-Link ein und setzt `isApproved: true`. Fertig!

---

## 2. Alle 15 Affiliate-Programme & Direkt-Links

### Priorität 1: Die wichtigsten Umsatztreiber (EU & US Top-Picks)

| Anbieter | Region | Netzwerk / Typ | Direkter Anmelde- / Kontakt-Link | Ziel-Code & Rabatt |
| :--- | :--- | :--- | :--- | :--- |
| **CertaPeptides** (#1 EU) | 🇪🇺 EU | In-House Portal | `https://certapeptides.com/affiliate` (+ `/contact`) | `LABINDEX` (15% OFF) |
| **Real Peptides** (#1 US) | 🇺🇸 US | **Awin (`mid=125918`)** | Awin Konto erstellen & auf Merchant ID **125918** bewerben | `LABINDEX` (10% OFF) |
| **Particle Peptides** (#3) | 🇪🇺 EU | In-House (`?refs=`) | `https://particlepeptides.com/en/` (Footer/Support anschreiben) | `LABINDEX` (15% OFF) |
| **Avellon Peptides** (#4) | 🇪🇺 EU | In-House Portal | `https://avellon-peptides.com/affiliate-bereich/` | `LABINDEX` (10% OFF) |
| **Arctic Lab Supply** (#5) | 🇺🇸 US | In-House (`?ref=`) | `https://arcticlabsupply.com/contact` | `LABINDEX` (20% OFF) |
| **PeptidProfi** (#9) | 🇪🇺 EU/DE | In-House Portal | `https://peptidprofi.de/affiliate` | `LABINDEX` (10% OFF) |
| **Purified Peptide** (#11) | 🇺🇸 US | **Awin (`mid=129215`)** | Auf Awin nach Merchant ID **129215** suchen & bewerben | Link-Tracking (Awin) |

### Priorität 2: Weitere 8 Partner-Shops mit hohen Rabatten (bis 25% OFF)

| Anbieter | Region | Netzwerk / Typ | Direkter Anmelde- / Kontakt-Link | Ziel-Code & Rabatt |
| :--- | :--- | :--- | :--- | :--- |
| **Limitless Life Nootropics** | 🇺🇸 US/Global | In-House (`?ref=`) | `https://limitlesslifenootropics.com/contact-us/` | `LABINDEX` (15% OFF) |
| **Onyx Peptides** | 🇪🇺 EU | In-House Portal | `https://onyxpeptides.com/affiliate/` | `LABINDEX10` (10% OFF) |
| **GhostLabz Research** | 🇺🇸 US/Global | In-House (`?ref=`) | `https://ghostlabzresearch.com/contact-us/` | `LABINDEX` (25% OFF) |
| **Source Research** | 🇺🇸 US | Coupon-Only | Über Kontaktformular auf `https://sourceresearch.io/` | `LABINDEX` (20% OFF) |
| **Genesis Peptides** | 🇺🇸 US | In-House Portal | `https://genesispeptides.com/partners` | `LABINDEX` (15% OFF) |
| **Peptides EU** | 🇪🇺 EU | In-House Portal | `https://www.peptides-eu.net/affiliate-program` | `LABINDEX` (10% OFF) |
| **Cenexa Labs** | 🇺🇸 US | In-House (`/ref/`) | `https://cenexalabs.com/contact/` | `LABINDEX` (20% OFF) |
| **NextSelf Labs** | 🇺🇸 US/Global | Coupon-Only | `https://nextselflabs.com/contact/` | `LABINDEX` (25% OFF) |

---

## 3. Copy-Paste Anschreiben für eigene `LABINDEX`-Codes

### Vorlage A — Englisch (für US- & internationale EU-Shops)

**Subject:** Partnership & Custom Reader Code (`LABINDEX`) — PeptideLabTest.org Audit Directory

```text
Hi [Vendor Name] Partnership Team,

We have completed and published our independent 2026 COA & True $/mg Audit listing for [Vendor Name] on PeptideLabTest.org:
https://www.peptidelabtest.org/vendors/[vendor-slug]/

PeptideLabIndex benchmarks US and EU research peptide suppliers on third-party laboratory verification (Janoshik, Liquilabs, Kovera, ILS, Freedom Diagnostics), batch fill-weight accuracy, and net cost per measured milligram ($/mg & €/mg).

Because our True $/mg Price Index factors verified partner discount codes directly into a supplier's effective cost-per-milligram ranking, we would love to set up:
1. An affiliate tracking link for PeptideLabTest.org
2. A vanity reader discount code: LABINDEX (matching your standard media partner discount tier, e.g., 15%–20% OFF)

Editorial scores remain strictly algorithmic under our 6-axis COA methodology, and all partner links are properly tagged rel="sponsored".

Could you share your affiliate onboarding link or activate code LABINDEX under our account (partners@peptidelabtest.org)?

Best regards,
Editorial & Partnerships
PeptideLabTest.org
```

---

### Vorlage B — Deutsch (speziell für PeptidProfi & Avellon Peptides)

**Betreff:** Affiliate-Partnerschaft & eigener Gutscheincode `LABINDEX` — PeptideLabTest.org

```text
Hallo [Shop-Name]-Team,

wir haben euren Shop samt eurer öffentlichen Janoshik-Laborberichte in unser unabhängiges englischsprachiges US/EU-Prüfverzeichnis PeptideLabTest.org aufgenommen:
https://www.peptidelabtest.org/vendors/[vendor-slug]/

Da unser „True €/mg Price Index“ bestätigte Rabattcodes direkt in den effektiven Milligramm-Preisvergleich für europäische Käufer einrechnet, möchten wir gerne euer Partnerprogramm anbinden.

Könntet ihr für unser Konto (partners@peptidelabtest.org) neben dem regulären Tracking-Link auch den einheitlichen Leser-Gutscheincode „LABINDEX“ (z. B. 10% Rabatt, analog zu anderen Verzeichnissen) hinterlegen? Sobald der Code aktiv ist, hinterlegen wir ihn direkt in unserer EU-Scorecard, im €/mg-Rechner und auf unserer Discount-Codes-Übersicht.

Viele Grüße
Partnerships — PeptideLabTest.org
```

---

### Vorlage C — Kurztext für das Awin-Bewerbungsfeld (`Real Peptides` & `Purified Peptide`)

```text
PeptideLabTest.org is an independent analytical directory and COA verification index comparing research peptide suppliers on third-party HPLC/LC-MS certificates, batch fill-weight accuracy, and true $/mg cost. [Merchant Name] is already featured with a dedicated audit page at https://www.peptidelabtest.org/vendors/[slug]/ and across our True $/mg Price Index and Compound Monographs. All promotional placements comply strictly with RUO standards and FTC rel="sponsored" disclosures.
```


---

## 4. Master-Prompts für schnelle Code-Freischaltung (Browser-Agent & KI-Outreach)

### Prompt A: Für einen Browser-Assistenten (Formulare automatisch vorbefüllen lassen)

```markdown
Du hilfst mir dabei, mein unabhängiges Peptid-Analyse-Verzeichnis https://www.peptidelabtest.org bei 15 Partnerprogrammen anzumelden und überall unseren eigenen Rabattcode „LABINDEX“ anzufragen.

### Meine Stammdaten zum Ausfüllen von Formularen
- Website: https://www.peptidelabtest.org
- Projektbeschreibung: Independent US & EU Research Peptide COA Verification Directory, Batch Fill-Variance Tracker & True $/mg Price Index (72 static SEO/GEO pages).
- Kontakt-E-Mail: [DEINE E-MAIL HIER EINTRAGEN, z. B. partners@peptidelabtest.org]
- Ansprechpartner / Name: [DEIN NAME / FIRMA]
- Gewünschter Affiliate- / Coupon-Code: LABINDEX (Alternativ: LABINDEX10 / LABINDEX15)
- Traffic-Kanäle: Organic SEO (Google/Bing), AI Search (ChatGPT/Perplexity via llms.txt), Interactive Reconstitution Calculator & Price Index.

### Sicherheits- & Ausführungsregeln (STRIKT EINHALTEN!)
1. Öffne die untenstehenden Shop-URLs nacheinander.
2. Fülle die Partner-/Kontaktformulare mit meinen Stammdaten und einer individuell auf den jeweiligen Shop zugeschnittenen Nachricht aus. Verweise in der Nachricht IMMER auf die bereits veröffentlichte Review-Unterseite des jeweiligen Shops auf unserer Seite (Format: `https://www.peptidelabtest.org/vendors/[slug]/`).
3. Nutze als Hauptargument unseren „True $/mg & €/mg Price Index“ (`https://www.peptidelabtest.org/price-index/`): Erkläre sachlich, dass unser Preisindex aktive Partner-Rabattcodes direkt in den effektiven Milligramm-Preis einrechnet – ein 15%–20% Code „LABINDEX“ verbessert also sofort das Preis-pro-mg-Ranking des Shops im Vergleich zu Wettbewerbern.
4. WICHTIG: Löse NIEMALS CAPTCHAs oder Anti-Bot-Abfragen selbst, lege keine Passwörter ohne meine Rückfrage fest und klicke bei Formularen mit Rechts-/Steuer-/Auszahlungsdaten NICHT eigenmächtig auf „Submit“, sondern stoppe nach dem Ausfüllen kurz und gib mir Bescheid, damit ich selbst bestätigen und absenden kann.

### Abzuarbeitende Shop-Liste (inkl. unserer Live-Audit-URLs)
1. CertaPeptides -> Signup: https://certapeptides.com/affiliate | Unser Live-Audit: https://www.peptidelabtest.org/vendors/certa-peptides/
2. Avellon Peptides -> Signup: https://avellon-peptides.com/affiliate-bereich/ | Unser Live-Audit: https://www.peptidelabtest.org/vendors/avellon-peptides/
3. PeptidProfi -> Signup: https://peptidprofi.de/affiliate | Unser Live-Audit: https://www.peptidelabtest.org/vendors/peptidprofi/
4. Onyx Peptides -> Signup: https://onyxpeptides.com/affiliate/ | Unser Live-Audit: https://www.peptidelabtest.org/vendors/onyx-peptides/
5. Genesis Peptides -> Signup: https://genesispeptides.com/partners | Unser Live-Audit: https://www.peptidelabtest.org/vendors/genesis-peptides/
6. Peptides EU -> Signup: https://www.peptides-eu.net/affiliate-program | Unser Live-Audit: https://www.peptidelabtest.org/vendors/peptides-eu/
7. Arctic Lab Supply -> Kontakt: https://arcticlabsupply.com/contact | Unser Live-Audit: https://www.peptidelabtest.org/vendors/arctic-lab-supply/
8. Particle Peptides -> Kontakt: https://particlepeptides.com/en/ | Unser Live-Audit: https://www.peptidelabtest.org/vendors/particle-peptides/
9. GhostLabz Research -> Kontakt: https://ghostlabzresearch.com/contact-us/ | Unser Live-Audit: https://www.peptidelabtest.org/vendors/ghostlabz-research/
10. Limitless Life Nootropics -> Kontakt: https://limitlesslifenootropics.com/contact-us/ | Unser Live-Audit: https://www.peptidelabtest.org/vendors/limitless-life-nootropics/
11. Source Research -> Kontakt auf: https://sourceresearch.io/ | Unser Live-Audit: https://www.peptidelabtest.org/vendors/source-research/
12. Cenexa Labs -> Kontakt: https://cenexalabs.com/contact/ | Unser Live-Audit: https://www.peptidelabtest.org/vendors/cenexa-labs/
13. NextSelf Labs -> Kontakt: https://nextselflabs.com/contact/ | Unser Live-Audit: https://www.peptidelabtest.org/vendors/nextself-labs/
```

---

### Prompt B: KI-Generator für maßgeschneiderte Shop-Pitches & Provisions-Verhandlung

```markdown
Du bist Head of Affiliate Partnerships für https://www.peptidelabtest.org – ein unabhängiges englischsprachiges Prüfverzeichnis für Research Peptides (US & EU), das Drittanbieter-COAs (Janoshik, Liquilabs, Kovera, ILS, Freedom Diagnostics), reale Vial-Füllmengen und den echten Preis pro gemessenem Milligramm ($/mg & €/mg) vergleicht.

### Ziel-Shop für diese Anfrage
- Shop-Name & URL: [z. B. CertaPeptides / neuer Shop]
- Region & Sprache des Shops: [z. B. EU / Englisch oder Deutsch]
- Unsere Live-Unterseite zum Shop (falls schon vorhanden): [z. B. https://www.peptidelabtest.org/vendors/certa-peptides/]
- Bekannte Stärken / Prüflabor des Shops: [z. B. 49+ Janoshik-Berichte direkt im Portal, EU-Versand]
- Bekannter Rabatt bei Konkurrenz-Verzeichnissen (falls bekannt): [z. B. 15% Rabattcode]

### Deine Aufgabe
Schreibe mir ein 3-teiliges High-Conversion Outreach-Paket (kurz, auf Augenhöhe von Betreiber zu Betreiber, null Bettel-Ton, null KI-Floskeln):

1. **Erst-Anschreiben (max. 140 Wörter, Betreff + Text):**
   - Zeige sofort, dass der Shop bereits kostenlos und detailliert auf PeptideLabTest.org gelistet ist (Link einbauen -> sofortiger Social Proof).
   - Erkläre unseren stärksten Hebel: Unser „True $/mg & €/mg Price Index“ berechnet den realen Milligramm-Preis NACH Abzug bestätigter Partner-Codes. Sobald der Shop für unsere Leser den Code **`LABINDEX`** (zum Top-Partner-Satz von z. B. 15%–20% Rabatt) aktiviert, sinkt sein angezeigter $/mg-Wert in unserer Vergleichstabelle sofort sichtbar unter den Listenpreis der Konkurrenz.
   - Frage konkret nach: (a) Affiliate-Tracking-Link + (b) Custom-Code `LABINDEX` + (c) Provisionssatz (Ziel: 15%–20% Lifetime/RevShare, Auszahlung per SEPA/Crypto/PayPal).
   - Betone kurz unsere Unabhängigkeit (redaktioneller 6-Achsen-Score bleibt objektiv, Links sauber `rel="sponsored"`).

2. **Kurzes Follow-up nach 4 Tagen (max. 60 Wörter):**
   - Höflicher Reminder mit Hinweis auf unser monatliches Update der US/EU-Scorecard und des `/discount-codes/`-Verzeichnisses.

3. **Nachverhandlungs-Antwort (falls der Shop erst nur 5%–10% Standard-Code anbietet):**
   - Sachliche Antwort, die zeigt, dass andere Verzeichnisse im Markt 15%–20% erhalten und ein stärkerer `LABINDEX`-Rabatt den Shop im True-$/mg-Filter direkt in die Top-Ränge schiebt (höhere Conversion für beide Seiten).
```
