#!/bin/sh
# Renders /coa-checklist/ of every language to public/downloads/peptide-coa-checklist-<lang>.pdf (headless Chrome, from the built site).
# Usage: npm run build && sh scripts/make-checklist-pdfs.sh && npm run build
set -e
cd "$(dirname "$0")/.."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p public/downloads
npx astro preview --port 4329 >/tmp/pep-preview.log 2>&1 &
PID=$!
sleep 4
for l in en de es fr it; do
  P="/coa-checklist/"; [ "$l" != "en" ] && P="/$l/coa-checklist/"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="public/downloads/peptide-coa-checklist-$l.pdf" "http://localhost:4329$P" 2>/dev/null
done
kill $PID
ls -la public/downloads
