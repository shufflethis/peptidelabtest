# GOAL – peptidelabtest.org zur besten Peptid-Vergleichsseite machen (Stand 21.11.2026)

Arbeite autonom, Milestone für Milestone, bis alle Erfolgskriterien unten erfüllt und live verifiziert sind. Melde dich nur bei echten Blockern oder Entscheidungen, die unten als OFFEN markiert sind. Kommunikation mit dem User: Deutsch, kurz.

## Kontext und Dateien
- Repo: ~/sites/peptidelabtest (Astro 7, Tailwind 4, Push auf master = Vercel-Deploy, live https://www.peptidelabtest.org). 836 Seiten in EN, DE, ES, FR und IT (i18n-System aus Skill `astro-i18n-mirror`, UI-Strings src/i18n/*.json, Datentexte src/i18n/data/<lang>.json, merge_lang.py, hreflang_check.py, numcheck.py, keyleak.py in docs/agent/).
- Pflichtlektüre zuerst: CONTENT_RULES.md im Repo, docs/agent/BRIEF.md (Regeln, Lesbarkeit), docs/agent/BUILD-i18n.md. Skills: affiliate-publisher-onboarding (Schritte 8a, 8d, 10, 11), affiliate-comparison-site-build, astro-i18n-mirror.
- Daten: src/data/audit.json (24 Shops, geprüft 20.11.2026, mit Quellen; nur über scripts/build-audit-data.py ändern), affiliates.ts (7 Partner live), batches.ts, compounds.ts, labs.ts, labGuides.ts, laws.ts. Code-Register ~/Documents/code-register.csv.
- Keywords: docs/agent/niche.json (US). DataForSEO-Zugang über Keychain `dataforseo` (Login gw@famefact.com). Weitere Märkte und Labs-Endpunkte selbst abfragen (Kosten im Blick halten, unter 5 USD pro Lauf).
- Messdaten vom User (DataForSEO, 21.11.): siehe Abschnitt "Marktdaten" unten.

## Harte Regeln (nicht verhandelbar)
1. Nie Werte erfinden. Jede Zahl braucht eine Quelle, die geöffnet wurde. Fehlt etwas: "not published" (in jeder Sprache lokalisiert).
2. CONTENT_RULES: nur Forschungszwecke (RUO), KEINE Dosierungen, keine Mengen pro Person, keine Zyklen oder Protokolle für Menschen, keine Injektions-/Spritzen-/IU-Angaben, keine Heil- oder Wirkversprechen. Avellon verbietet das ausdrücklich in den Partnerbedingungen, und alle Partner verkaufen nur für Forschungszwecke.
3. Externe Links nur zu Partner-Shops über resolveVendorLink() mit rel sponsored. Labor- und Quellen-URLs als reiner Text. Codes mit codeOnlyOnVendorPage nur auf der eigenen Shop-Seite.
4. Ranglisten nur Partner-Shops, sortiert nach Bewertung, nie nach Provision.
5. Keine Emojis, nur Inline-SVG. Lesbarkeit: 17–18 px Fließtext, AA-Kontrast, keine Monospace-Schrift, keine Großbuchstaben in Fließtext.
6. Alles Neue immer in EN, DE, ES, FR und IT mit hreflang. Nie nur Deutsch. US-Markt hat Vorrang bei Keyword-Auswahl.
7. Kleine Milestones, jeder mit grünem Build, Commit und Push. Nie Seiten pauschal löschen. Subagents bekommen ihren Auftrag als Datei und speichern Zwischenstände.

## Entscheidung Dosierung und Rechner (Default, bis der User anders entscheidet)
Die größten Suchvolumen liegen bei Dosierung und Rechnern ("peptide dosage calculator" 33.100, "retatrutide dosage" 49.500, "peptide reconstitution calculator" 14.800). Peptidemind holt damit seinen Traffic. Wir bauen nur die regelkonforme Variante:
- ERLAUBT: Labor-Konzentrationsrechner (mg im Fläschchen + mL Lösungsmittel = mg/mL Stammlösung, Korrektur über gemessene mg aus dem Laborbericht). Eigene URLs pro Wirkstoff, z. B. /calculator/tirzepatide/, /calculator/retatrutide/, /calculator/semaglutide/, /calculator/bpc-157/ mit Titeln wie "Tirzepatide Reconstitution Calculator (Lab mg/mL)". Ergebnis nur mg/mL und µg/µL. Daneben: welche Fläschchengrößen am Markt sind, Preis pro mg und Laborberichte aus unseren Daten. Kein Feld für Dosis, keine Spritzen-Einheiten, keine "withdraw X units".
- ERLAUBT: Seiten zu Blends als Produkt: "Wolverine" (BPC-157 + TB-500), KLOW, GLOW, CJC-1295/Ipamorelin. Inhalt: Zusammensetzung laut Shops, welche Shops den Blend führen, Preise pro mg, Laborberichte, Code-Namen. Keine Protokolle, keine Wirkung.
- NICHT ERLAUBT: Dosierungsseiten, Protokolle, Dosis-Tabellen. Die Suchbegriffe dafür nicht als Ziel-Keyword verwenden.
- OFFEN (nur der User entscheidet): ob doch Dosierungsinhalte gebaut werden sollen. Dann müssten Avellon (und ggf. andere) als Partner wegfallen. Nicht selbst entscheiden.

## Marktdaten (vom User gemessen, DataForSEO 21.11.)
- ChatGPT-Prompts US/Monat: "what is the most trusted peptide company" 701, "most trustworthy" 664, "most reliable" 496, "most reputable" 465, "how to tell if a peptide company is legit" 418, "can you legally buy peptides online" 323, "can i buy retatrutide peptide in the usa" 282, "which brand is best for peptides" 201, "is the licensed peptides website legit" 157. Zitiert werden fda.gov, usp.org, meritverified.org, lilly.com und kleine Review-Seiten (peptidepurityrank, peptideexaminer, peptidemind, peptidereferee, peptidehound, pepindex.org).
- Konkurrenz Google US: peptidemind.com ca. 2.747 Keywords, ca. 4.900 Besuche/Monat (Rechner, Dosierung, KLOW/GLOW, Markenbegriffe wie "limitless biotech" 6.600 auf Position 4). Andere Review-Seiten fast ohne Google-Traffic.
- Weitere Keywords: wolverine stack peptide 33.100 (KD 12), cjc-1295 ipamorelin 8.100, tirzepatide reconstitution calculator 2.900 (KD 2), semaglutide reconstitution calculator 590, peptide rechner DE 6.600, peptide kaufen DE 12.100, retatrutid kaufen DE 2.900, is janoshik legit 320, peptide coa 390, core peptides discount code 320, core peptides review 170, primal peptides erfahrungen 260. Aus niche.json: janoshik 18.100, janoshik verify 1.600, bpc-157 vs tb500 22.200, tirzepatide vs retatrutide 8.100, semaglutide vs tirzepatide 60.500, where to buy retatrutide 6.600, onyx peptides 22.200, core peptides 18.100, licensed peptides 9.900, ascension 8.100, peptide pro 6.600, limitless 5.400.
- KD 0 heißt bei DataForSEO oft "nicht berechnet", nicht "leicht".

## Milestones
M0 Keyword-Plan: DataForSEO für alle 5 Märkte (US, DE, ES/MX, FR, IT) zu den Clustern unten ziehen, in docs/agent/goal/keywords-<markt>.json speichern, Seitenliste mit URL, Titel (max 60 Zeichen) und Ziel-Keyword je Sprache in pep-goal/PAGES.md. Bereits vorhandene Seiten erweitern statt doppeln.

M1 Vertrauen und GEO (die Prompts, die ChatGPT beantwortet):
- /trusted-peptide-vendors/ "Most Trusted Peptide Vendors 2026": Antwort zuerst, dann Kriterien (Laborportal-verifizierte Berichte, Firma, Messung gegen Etikett), Rangliste nur Partner, Tabelle aller 24 Shops mit belegten Kennzahlen, Grafik.
- /how-to-tell-if-a-peptide-vendor-is-legit/: Checkliste mit echten Fällen aus audit.json (beschnittene Laborbilder, Shop-Kopie ohne mg-Zeile vs Portal, vertauschte Chargennummern, Berichte nur auf Google Drive, nicht auffindbar auf dem Portal, kein Impressum). Je Fall: welcher Shop, Quelle als Text.
- /is-it-legal-to-buy-peptides-online/ und /can-you-buy-retatrutide-in-the-usa/: Rechtslage aus laws.ts und Behördenquellen (FDA-Seiten selbst öffnen und zitieren), neutral, keine Anleitung zum Umgehen.
- "Is <Shop> legit?" auf allen Shop-Seiten schärfen: Antwort in 2 Sätzen zuerst, dann Belege.
- FAQ-Schema überall, wo Fragen stehen. llms.txt / llms-full.txt erweitern.

M2 COA-Hub (Lead-Magnet + Janoshik-Traffic):
- /how-to-read-a-peptide-coa/ mit annotierter SVG-Grafik eines Muster-Berichts (eigene Grafik, keine Kopie eines echten Berichts), Erklärung jedes Feldes, Red Flags.
- /coa-red-flags/ (echte Fälle wie oben).
- COA-Prüfwerkzeug /coa-checker/: Shop und Bericht-Nummer eingeben, Abgleich mit unserer Datenbank (batches + coaExamples), Ergebnis "in unseren Daten, auf Portal bestätigt / nur Shop-Kopie / nicht in unseren Daten" + Anleitung je Labor. Rein clientseitig mit JSON aus dem Build.
- Janoshik-Seite ausbauen ("is janoshik legit", "janoshik verify", "janoshik testing cost" – Kosten nur, wenn auf janoshik.com veröffentlicht).
- Checkliste als PDF in 5 Sprachen (ohne E-Mail-Pflicht), erzeugt aus HTML.

M3 Rechner und Blends (regelkonform, siehe Entscheidung oben):
- Konzentrationsrechner pro Wirkstoff (alle Wirkstoffe mit >= 3 Produkten), interaktiv, mit Formel, Beispielrechnung, Tabelle Fläschchengröße × Lösungsmittel = mg/mL, Preisvergleich und Laborberichte darunter.
- Blend-Seiten: Wolverine (BPC-157/TB-500), KLOW, GLOW, CJC-1295/Ipamorelin. Nur, was die Shops angeben, plus Preise und Berichte. Shop-Produkte dafür aus den Shop-Seiten neu erfassen (Read-only-Recherche mit Quellen, in audit-Struktur ergänzen über ein eigenes JSON und das Build-Skript).
- Bestehende /compare/-Seiten: Dreier-Vergleich Retatrutide vs Tirzepatide vs Semaglutide, Semaglutide vs Tirzepatide (neutral: Wirkstoffklasse, Studienstatus mit Quellen, Fläschchengrößen, Preis pro mg EU/US, Laborberichte).

M4 Mehr Shops und Markenbegriffe:
- Read-only-Neuprüfung und Aufnahme: Primal Peptides, Modern Aminos, Biotech Peptides, NextGen Peptides, Pure Peptides, Amino Club, Glacier Aminos, EZ Peptides, Peptide Sciences (Status), Limitless Biotech (eigener Abschnitt "limitless biotech" 6.600). Gleiches Schema und Bewertungssystem wie audit.json, scripts/build-audit-data.py erweitern.
- Shop-Seiten ausbauen: Überblick, "Is X legit?", Laborberichte, Preise, "X coupon code" (nur Partner; sonst Hinweis auf Shops mit Code), "X vs Y", FAQ. Mehr Text nur, wenn er Daten trägt.
- Code-Namen-Decoder /code-names/ (GLP-3 RT, RT-3, SR-3RT, LP3-R, GL-3 RT, GLP-2 TRZ, SR-2TZ, GLP-1 SM …) aus audit.json, jede Zeile mit Link zum Preisvergleich. In DE als "RT-3 Retatrutid" usw. optimieren.
- Länderseiten /shops-by-country/<land>/ (Polen, Slowakei, Rumänien, Deutschland, Niederlande, USA): Shops mit Sitz dort und Lieferländer aus den Daten.

M5 Visuals, Motion, Video:
- Je Geld-Seite mindestens eine Datengrafik (SVG, beim Build aus Daten erzeugt): Preis pro mg, gemessene mg gegen Etikett, Anteil portal-verifizierter Berichte. Scroll-Animationen mit prefers-reduced-motion.
- Startseite: 20–30-Sekunden-Datenvideo (MP4 + WebM + Poster, unter 3 MB) "What 1 mg really costs" bzw. "How many COAs are really verified" aus audit.json, gerendert mit Pillow (/opt/homebrew/bin/python3) + ffmpeg wie bei kollagenpeptidekaufen (Vorlage: docs/agent/video-render-template.py). Text-Transkript als HTML darunter in 5 Sprachen, VideoObject-Schema, Video-Sitemap.
- OG-Bild pro Seite.

M6 Preisindex und Siegel:
- /peptide-price-index/ monatlicher Index (Median Preis pro mg je Wirkstoff, EU/US) mit Grafik und CSV-Download. Nur aus erfassten Preisen mit Datum.
- Prüf-Siegel für Shops (SVG-Badge + Einbettungscode, zeigt die echte Bewertung und verlinkt zur Review). Seite /badge/ mit Regeln.

M7 Verlinkung, Technik, Prüfung:
- Link-Graph: 0 Waisen, jede Geld-Seite >= 5 Links aus dem Text. Hub: Startseite → Ranglisten → Preisseiten → Shop-Seiten → Vergleiche → Labore → COA-Hub → Rechner.
- docs/agent/verify.py erweitern und für alle Sprachen grün: keine Shop-Links ohne sponsored, keine Labor-<a>, keine Emojis, Bann-Wörter in 5 Sprachen (bei Rechner-Seiten ist "reconstitution" im Titel erlaubt, aber kein dose/dosing/units/IU/syringe/inject), Codes nur am erlaubten Ort, kein undefined/NaN, Titel max 60, hreflang wechselseitig, Licensed Peptides weiter versteckt.
- Screenshots 390 und 1280 px von je einer Seite pro neuem Typ, selbst ansehen, Lesbarkeit korrigieren.

## Erfolgskriterien
- Alle Milestones live, in allen 5 Sprachen, Prüfskripte grün, Stichproben-curl 200.
- PAGES.md enthält für jede neue Seite: URL, Ziel-Keyword je Sprache, Volumen, Status live.
- Kurzer Abschlussbericht an den User: neue Seiten pro Typ, Commits, Prüfergebnisse, offene Entscheidungen (Dosierung, Telegram).

## Nicht tun
Keine Accounts anlegen, keine Mails senden, keine DNS-Änderungen, keine anderen Repos ändern, keine Bewerbungen abschicken.
