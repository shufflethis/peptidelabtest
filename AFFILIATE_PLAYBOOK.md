# PeptideLabIndex.com — Affiliate & Custom Code Playbook (`LABINDEX`)

Dieses Playbook enthält alle **live geprüften Partnerprogramm-URLs**, Awin-Merchant-IDs und Copy-Paste-Vorlagen, damit du dir für **PeptideLabIndex.com** überall deinen eigenen Rabattcode **`LABINDEX`** (plus Tracking-Links) sicherst.

---

## 1. Optimale Reihenfolge (damit du sofort akzeptiert wirst!)

1. **Domain sichern:** Registriere `peptidelabindex.com` (z. B. bei Cloudflare Registrar oder Porkbun für ~$10/Jahr) und richte eine Weiterleitungs-E-Mail `partners@peptidelabindex.com` ein (bei Cloudflare Email Routing kostenlos!). *Mit einer echten `@peptidelabindex.com`-Adresse wirst du 3x schneller freigeschaltet als mit Gmail.*
2. **Vor dem Live-Gang vorübergehend Demo-Codes ausblenden:**
   Öffne [src/data/affiliates.ts](file:///home/badmax/peptide/src/data/affiliates.ts) und setze Zeile 25 auf:
   ```ts
   export const PREVIEW_UNVERIFIED_CODES = false;
   ```
   *(Lokal steht er aktuell auf `true`, damit du sofort siehst, wie die `LABINDEX`-Buttons und die rabattierten `$/mg`-Preise aussehen!)*
3. **Kostenlos live stellen:** Push den Ordner `/home/badmax/peptide` auf GitHub und verbinde ihn mit **Cloudflare Pages** oder **Vercel** (`Build command: npm run build`, `Output directory: dist`). Innerhalb von 60 Sekunden ist `https://peptidelabindex.com` live – mit 69 fertigen SEO-Seiten!
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

**Subject:** Partnership & Custom Reader Code (`LABINDEX`) — PeptideLabIndex.com Audit Directory

```text
Hi [Vendor Name] Partnership Team,

We have completed and published our independent 2026 COA & True $/mg Audit listing for [Vendor Name] on PeptideLabIndex.com:
https://peptidelabindex.com/vendors/[vendor-slug]/

PeptideLabIndex benchmarks US and EU research peptide suppliers on third-party laboratory verification (Janoshik, Liquilabs, Kovera, ILS, Freedom Diagnostics), batch fill-weight accuracy, and net cost per measured milligram ($/mg & €/mg).

Because our True $/mg Price Index factors verified partner discount codes directly into a supplier's effective cost-per-milligram ranking, we would love to set up:
1. An affiliate tracking link for PeptideLabIndex.com
2. A vanity reader discount code: LABINDEX (matching your standard media partner discount tier, e.g., 15%–20% OFF)

Editorial scores remain strictly algorithmic under our 6-axis COA methodology, and all partner links are properly tagged rel="sponsored".

Could you share your affiliate onboarding link or activate code LABINDEX under our account (partners@peptidelabindex.com)?

Best regards,
Editorial & Partnerships
PeptideLabIndex.com
```

---

### Vorlage B — Deutsch (speziell für PeptidProfi & Avellon Peptides)

**Betreff:** Affiliate-Partnerschaft & eigener Gutscheincode `LABINDEX` — PeptideLabIndex.com

```text
Hallo [Shop-Name]-Team,

wir haben euren Shop samt eurer öffentlichen Janoshik-Laborberichte in unser unabhängiges englischsprachiges US/EU-Prüfverzeichnis PeptideLabIndex.com aufgenommen:
https://peptidelabindex.com/vendors/[vendor-slug]/

Da unser „True €/mg Price Index“ bestätigte Rabattcodes direkt in den effektiven Milligramm-Preisvergleich für europäische Käufer einrechnet, möchten wir gerne euer Partnerprogramm anbinden.

Könntet ihr für unser Konto (partners@peptidelabindex.com) neben dem regulären Tracking-Link auch den einheitlichen Leser-Gutscheincode „LABINDEX“ (z. B. 10% Rabatt, analog zu anderen Verzeichnissen) hinterlegen? Sobald der Code aktiv ist, hinterlegen wir ihn direkt in unserer EU-Scorecard, im €/mg-Rechner und auf unserer Discount-Codes-Übersicht.

Viele Grüße
Partnerships — PeptideLabIndex.com
```

---

### Vorlage C — Kurztext für das Awin-Bewerbungsfeld (`Real Peptides` & `Purified Peptide`)

```text
PeptideLabIndex.com is an independent analytical directory and COA verification index comparing research peptide suppliers on third-party HPLC/LC-MS certificates, batch fill-weight accuracy, and true $/mg cost. [Merchant Name] is already featured with a dedicated audit page at https://peptidelabindex.com/vendors/[slug]/ and across our True $/mg Price Index and Compound Monographs. All promotional placements comply strictly with RUO standards and FTC rel="sponsored" disclosures.
```
