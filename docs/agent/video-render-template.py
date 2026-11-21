#!/opt/homebrew/bin/python3
"""Render 'Was kosten 100 g Kollagen wirklich?' data video frames.

Usage: render.py <portrait|landscape> <outdir> [--only t1,t2,...]
All numbers come from src/data/brands.json (read-only).
"""
import json, math, os, sys
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = "/Users/gorden/sites/kollagenpeptidekaufen/src/data/brands.json"
FPS = 30

BG = (22, 24, 27)
CREAM = (242, 238, 228)
MUTED = (178, 174, 166)   # cream at ~70 % on bg, AA for large text
ACCENT = (255, 122, 89)   # #ff7a59
LINE = (70, 72, 76)

# ---------------------------------------------------------------- data
def load_values():
    d = json.load(open(DATA))
    idx = {}
    for b in d:
        for p in b["products"]:
            idx[(b["name"], p["name"])] = (b, p)

    def get(brand, product, short, role):
        b, p = idx[(brand, product)]
        return {
            "brand": b["name"], "product": p["name"], "short": short, "role": role,
            "form": p["form"], "pricePer100gCollagen_eur": p["pricePer100gCollagen_eur"],
            "price_eur": p["price_eur"], "collagenPerServing_g": p["collagenPerServing_g"],
            "servingsPerPack": p["servingsPerPack"], "retail": p.get("retail") or [],
            "monetized": b["monetized"], "amazon": bool(p.get("asins")),
            "source": p["url"], "dataFile": "src/data/brands.json", "readAt": b.get("readAt"),
        }

    # cheapest monetized powders with an Amazon product link (checked against data)
    powders = []
    for b in d:
        for p in b["products"]:
            if (b["monetized"] and p["group"] == "pulver" and p["form"] == "Pulver"
                    and p.get("asins") and p["containsCollagen"]
                    and p["pricePer100gCollagen_eur"] is not None):
                powders.append((p["pricePer100gCollagen_eur"], b["name"], p["name"]))
    powders.sort()
    shorts = {
        "Bloom Naturals": "Pulver 1,5 kg", "WoldoHealth": "Pulver 1 kg",
        "Millers": "Alpha-Gel 1000 g", "Wehle Sports": "Pulver 1000 g",
        "natural elements": "Pulver 500 g", "Divique": "Pulver 500 g",
    }
    seen, chosen = set(), []
    for v, bn, pn in powders:
        if bn in seen:
            continue
        seen.add(bn)
        chosen.append(get(bn, pn, shorts[bn], "pulver"))
        if len(chosen) == 6:
            break
    drug = [
        get("altapharma", "altapharma Kollagen 5000 + Hyaluron 100 Trinkampullen (20 x 25 ml)",
            "Ampullen 20 x 25 ml · Rossmann", "drogerie-ampullen"),
        get("Abtei", "Abtei Beauty Kollagen Intensiv 5000 Trinkampullen (10 x 25 ml)",
            "Ampullen 10 x 25 ml · dm", "drogerie-ampullen"),
        get("Merz Spezial", "Merz Spezial Kollagen Schönheits-Formel Trinkampullen (14 x 25 ml)",
            "Ampullen 14 x 25 ml · dm", "drogerie-ampullen"),
    ]
    # max ampoule value in the whole data set
    amps = [(p["pricePer100gCollagen_eur"], b["name"], p["name"]) for b in d for p in b["products"]
            if p["group"] == "ampullen" and p["pricePer100gCollagen_eur"] is not None]
    mx = max(amps)
    maxamp = get(mx[1], mx[2], "Trinkampullen, Monatspackung 28 x 25 ml", "max-ampullen")
    method = get("natural elements", "natural elements Collagen Pulver (Neutral)", "Pulver 500 g", "methoden-beispiel")
    counts = {"brands": len(d), "products": sum(len(b["products"]) for b in d)}
    return chosen, drug, maxamp, method, counts


def eur(v):
    return "€ " + f"{v:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")


def num_de(v, nd=2):
    return f"{v:.{nd}f}".replace(".", ",")

# ---------------------------------------------------------------- helpers
_fc = {}

def font(kind, size):
    key = (kind, size)
    if key not in _fc:
        if kind == "display":
            f = ImageFont.truetype(os.path.join(HERE, "fonts/BigShouldersDisplay.ttf"), size)
            f.set_variation_by_axes([900])
        else:
            f = ImageFont.truetype(os.path.join(HERE, "fonts/Archivo.ttf"), size)
            f.set_variation_by_axes([700 if kind == "bold" else 400, 100])
        _fc[key] = f
    return _fc[key]


def clamp(x, a=0.0, b=1.0):
    return max(a, min(b, x))

def ease_out(x):
    x = clamp(x); return 1 - (1 - x) ** 3

def ease_io(x):
    x = clamp(x); return 4 * x ** 3 if x < 0.5 else 1 - (-2 * x + 2) ** 3 / 2

def mix(c, under, a):
    a = clamp(a)
    return tuple(int(round(u + (cc - u) * a)) for cc, u in zip(c, under))

def lerp(a, b, t):
    return a + (b - a) * t


class Canvas:
    def __init__(self, W, H):
        self.W, self.H = W, H
        self.im = Image.new("RGB", (W, H), BG)
        self.d = ImageDraw.Draw(self.im)

    def text(self, x, y, s, f, color, a=1.0, anchor="ls", under=BG):
        if a <= 0.003:
            return
        self.d.text((round(x), round(y)), s, font=f, fill=mix(color, under, a), anchor=anchor)

    def rect(self, x0, y0, x1, y1, color, a=1.0, under=BG):
        if a <= 0.003 or x1 - x0 < 0.5:
            return
        self.d.rectangle([round(x0), round(y0), round(x1) - 1, round(y1) - 1], fill=mix(color, under, a))

    def box(self, x0, y0, x1, y1, color, w=3, a=1.0, under=BG):
        if a <= 0.003:
            return
        c = mix(color, under, a)
        x0, y0, x1, y1 = map(round, (x0, y0, x1, y1))
        if x1 - x0 < 2 * w + 1:
            if x1 - x0 >= 1:
                self.d.rectangle([x0, y0, x1 - 1, y1 - 1], fill=c)
            return
        self.d.rectangle([x0, y0, x1 - 1, y0 + w - 1], fill=c)
        self.d.rectangle([x0, y1 - w, x1 - 1, y1 - 1], fill=c)
        self.d.rectangle([x0, y0, x0 + w - 1, y1 - 1], fill=c)
        self.d.rectangle([x1 - w, y0, x1 - 1, y1 - 1], fill=c)

    def dashed(self, x0, y0, x1, y1, color, w=3, dash=18, gap=12, a=1.0):
        c = mix(color, BG, a)
        x = x0
        while x < x1:
            xe = min(x + dash, x1)
            self.d.rectangle([round(x), round(y0), round(xe) - 1, round(y0) + w - 1], fill=c)
            self.d.rectangle([round(x), round(y1) - w, round(xe) - 1, round(y1) - 1], fill=c)
            x += dash + gap
        y = y0
        while y < y1:
            ye = min(y + dash, y1)
            self.d.rectangle([round(x0), round(y), round(x0) + w - 1, round(ye) - 1], fill=c)
            self.d.rectangle([round(x1) - w, round(y), round(x1) - 1, round(ye) - 1], fill=c)
            y += dash + gap

    def tw(self, s, f):
        b = self.d.textbbox((0, 0), s, font=f, anchor="ls")
        return b[2] - b[0]


def fit_size(c, lines, kind, maxw, cap):
    s = cap
    while s > 20 and max(c.tw(l, font(kind, s)) for l in lines) > maxw:
        s -= 2
    return s

# ---------------------------------------------------------------- scenes
class Video:
    def __init__(self, mode):
        self.P = mode == "portrait"
        self.W, self.H = (1080, 1350) if self.P else (1920, 1080)
        self.powders, self.drug, self.maxamp, self.method, self.counts = load_values()
        self.rows = sorted(self.powders + self.drug, key=lambda r: r["pricePer100gCollagen_eur"])
        self.scenes = [  # (start, duration, fn)
            (0.0, 3.6, self.s_title),
            (3.6, 11.6, self.s_chart),
            (15.2, 5.2, self.s_callout),
            (20.4, 4.6, self.s_method),
            (25.0, 3.0, self.s_end),
        ]
        self.duration = 28.0

    # common: brand mark top-left
    def mark(self, c, a):
        m = 60 if self.P else 80
        y = 70 if self.P else 72
        c.rect(m, y - 26, m + 26, y, ACCENT, a)
        c.text(m + 40, y, "kollagenpeptidekaufen.de", font("bold", 30), CREAM, a)

    def frame(self, t):
        c = Canvas(self.W, self.H)
        for st, du, fn in self.scenes:
            if st <= t < st + du:
                lt = t - st
                out = 1 - ease_io((lt - (du - 0.45)) / 0.45)
                fn(c, lt, du, out)
        return c.im

    # 1 ---------------------------------------------------------- title
    def s_title(self, c, t, du, out):
        P = self.P
        m = 60 if P else 120
        e = lambda d, L=0.6: ease_out((t - d) / L) * out
        self.mark(c, e(0.0))
        if P:
            lines = [("WAS KOSTEN", CREAM), ("100 G", ACCENT), ("KOLLAGEN", ACCENT), ("WIRKLICH?", CREAM)]
            size = fit_size(c, [l for l, _ in lines], "display", self.W - 2 * m, 250)
            y0 = 300
        else:
            lines = [("WAS KOSTEN", CREAM), ("100 G KOLLAGEN", ACCENT), ("WIRKLICH?", CREAM)]
            size = fit_size(c, [l for l, _ in lines], "display", 1300, 230)
            y0 = 200
        f = font("display", size)
        lead = size * 0.9
        # chip
        chip = "PREISCHECK · STAND 20.11.2026"
        fc = font("bold", 30)
        a = e(0.1)
        cw = c.tw(chip, fc)
        c.box(m, y0 - 20, m + cw + 44, y0 + 44, CREAM, 3, a)
        c.text(m + 22, y0 + 23, chip, fc, CREAM, a)
        y = y0 + 64 + size * 0.82
        for i, (l, col) in enumerate(lines):
            a = e(0.25 + 0.14 * i, 0.7)
            c.text(m, y + (1 - a) * 60 if out >= 1 else y - (1 - out) * 40, l, f, col, a)
            y += lead
        # rule
        rw = (self.W - 2 * m) * ease_out((t - 0.9) / 0.8)
        c.rect(m, y - lead + size * 0.25, m + rw, y - lead + size * 0.25 + 10, CREAM, out)
        ys = y - lead + size * 0.25 + 90
        fs = font("reg", 42 if P else 46)
        sub = ["Gerechnet pro 100 g Kollagen –", "nicht pro 100 g Packungsinhalt."]
        for i, s in enumerate(sub):
            c.text(m, ys + i * (58 if P else 62), s, fs, CREAM, e(1.1 + 0.12 * i))

    # 2 ---------------------------------------------------------- chart
    def s_chart(self, c, t, du, out):
        P = self.P
        m = 60 if P else 80
        e = lambda d, L=0.6: ease_out((t - d) / L) * out
        self.mark(c, out)
        # header
        if P:
            fh = font("display", 100)
            c.text(m, 200, "PREIS PRO 100 G", fh, CREAM, e(0.0))
            c.text(m, 292, "KOLLAGEN", fh, ACCENT, e(0.1))
            ly = 356
        else:
            fh = font("display", 104)
            c.text(m, 190, "PREIS PRO 100 G", fh, CREAM, e(0.0))
            c.text(m + c.tw("PREIS PRO 100 G ", fh), 190, "KOLLAGEN", fh, ACCENT, e(0.1))
            ly = 262
        # legend
        fl = font("reg", 32)
        a = e(0.3)
        c.rect(m, ly - 26, m + 30, ly + 4, ACCENT, a)
        c.text(m + 44, ly, "Pulver", fl, CREAM, a)
        lx = m + 44 + c.tw("Pulver", fl) + 44
        a2 = e(5.6)
        c.box(lx, ly - 26, lx + 30, ly + 4, CREAM, 3, a2)
        c.text(lx + 44, ly, "Trinkampullen (Drogerie)", fl, CREAM, a2)
        # scale chip (right)
        T_RESCALE = 5.8
        k = ease_io((t - T_RESCALE) / 1.4)
        smax = lerp(8.0, 50.0, k)
        chip = f"Skala 0–{int(round(smax))} €"
        fcp = font("bold", 30)
        cw = c.tw("Skala 0–50 €", fcp) + 40
        cx1 = self.W - m
        a = e(0.3)
        c.box(cx1 - cw, ly - 34, cx1, ly + 14, MUTED, 2, a)
        c.text(cx1 - cw / 2, ly - 1, chip, fcp, MUTED, a, anchor="ms")

        # rows
        n = len(self.rows)
        if P:
            top, rh = 392, 97
            bx0, bmax, bh = m, 760, 38
        else:
            top, rh = 300, 76
            bx0, bmax, bh = 780, 860, 42
        fb = font("bold", 34)
        fr = font("reg", 34)
        fv = font("display", 46 if P else 54)
        for i, r in enumerate(self.rows):
            amp = r["role"] != "pulver"
            j = i if not amp else i - len(self.powders)
            start = (0.7 + 0.42 * j) if not amp else (T_RESCALE + 0.9 + 0.5 * j)
            a = e(start, 0.5)
            g = ease_out((t - start - 0.1) / 0.9)
            v = r["pricePer100gCollagen_eur"]
            y = top + i * rh
            if P:
                ty = y + 30
                by0 = y + 42
                lx0 = m
            else:
                by0 = y + (rh - bh) / 2
                ty = by0 + bh / 2 + 12
                lx0 = m
            # label
            c.text(lx0, ty, r["brand"], fb, CREAM, a)
            c.text(lx0 + c.tw(r["brand"] + "  ", fb), ty, r["short"], fr, MUTED, a)
            # bar
            w = max(4.0, bmax * min(v, smax * 1.02) / smax) * g
            if amp:
                c.rect(bx0, by0, bx0 + w, by0 + bh, CREAM, a * 0.18)
                if w > 6:
                    c.box(bx0, by0, bx0 + w, by0 + bh, CREAM, 3, a)
            else:
                c.rect(bx0, by0, bx0 + w, by0 + bh, ACCENT, a)
            # value (counts up with the bar)
            shown = v if g > 0.97 else v * g
            c.text(bx0 + w + 18, by0 + bh - (2 if P else 1), eur(shown), fv, CREAM if amp else ACCENT, a * clamp(g * 3))
            # divider between powders and ampoules
            if i == len(self.powders) - 1:
                yy = y + rh - (8 if P else 2)
                ad = e(T_RESCALE + 0.6)
                xx = m
                while xx < (self.W - m) * ad + m * (1 - ad) and xx < self.W - m:
                    c.rect(xx, yy, min(xx + 16, self.W - m), yy + 3, LINE, out)
                    xx += 28
        # footer
        ff = font("reg", 30)
        c.text(m, self.H - 44 if P else self.H - 36,
               "Stand 20.11.2026 · Preise laut Recherche, können abweichen", ff, MUTED, e(0.5))

    # 3 ---------------------------------------------------------- callout
    def s_callout(self, c, t, du, out):
        P = self.P
        r = self.maxamp
        cheap = self.rows[0]
        v = r["pricePer100gCollagen_eur"]
        m = 60 if P else 120
        e = lambda d, L=0.6: ease_out((t - d) / L) * out
        self.mark(c, out)
        fh = font("display", 120 if P else 130)
        y = 250 if P else 220
        c.text(m, y, "TRINKAMPULLEN", fh, CREAM, e(0.0))
        c.text(m, y + (112 if P else 120), "BIS ZU", fh, CREAM, e(0.1))
        # accent value box
        by0 = y + (160 if P else 168)
        bh = 300 if P else 270
        bw = (self.W - 2 * m) if P else 1060
        g = ease_out((t - 0.25) / 0.6)
        c.rect(m, by0, m + bw * g, by0 + bh, ACCENT, out)
        kk = ease_out((t - 0.45) / 1.4)
        cnt = v if kk > 0.985 else v * kk
        fv = font("display", 270 if P else 250)
        c.text(m + 40, by0 + bh - 46 if P else by0 + bh - 40, eur(cnt), fv, BG, clamp((t - 0.4) / 0.3) * out, under=ACCENT)
        y2 = by0 + bh + 66
        c.text(m, y2, "pro 100 g Kollagen", font("bold", 46), CREAM, e(0.7))
        c.text(m, y2 + 56, f"{r['brand']} {r['short']}", font("reg", 36), MUTED, e(0.8))
        # comparison bars
        ratio = v / cheap["pricePer100gCollagen_eur"]
        if P:
            cy = y2 + 150
            cx, bx0, bmax = m, m, self.W - 2 * m
        else:
            cy = 470
            cx = bx0 = 1280
            bmax = self.W - m - bx0
        fb, fr = font("bold", 34), font("reg", 34)
        fv2 = font("display", 50)
        items = [(cheap, ACCENT, "Pulver"), (r, CREAM, "Trinkampullen")]
        for i, (it, col, kind) in enumerate(items):
            st = 1.6 + 0.35 * i
            a = e(st, 0.5)
            gg = ease_out((t - st - 0.1) / 0.9)
            yy = cy + i * 116
            lab = f"{it['brand']}"
            c.text(cx, yy, lab, fb, CREAM, a)
            c.text(cx + c.tw(lab + "  ", fb), yy, f"{kind} · {eur(it['pricePer100gCollagen_eur'])}", fr, MUTED, a)
            w = max(6, bmax * it["pricePer100gCollagen_eur"] / v) * gg
            if col == ACCENT:
                c.rect(bx0, yy + 16, bx0 + w, yy + 56, ACCENT, a)
            else:
                c.rect(bx0, yy + 16, bx0 + w, yy + 56, CREAM, a * 0.18)
                c.box(bx0, yy + 16, bx0 + w, yy + 56, CREAM, 3, a)
        yy = cy + 2 * 116 + 30
        fs = font("reg", 40 if P else 38)
        s1 = f"Rund {round(ratio)}-mal so teuer wie das"
        s2 = "günstigste Pulver im Vergleich."
        c.text(cx, yy, s1, fs, CREAM, e(2.6))
        c.text(cx, yy + 54, s2, fs, CREAM, e(2.7))

    # 4 ---------------------------------------------------------- method
    def s_method(self, c, t, du, out):
        P = self.P
        r = self.method
        m = 60 if P else 120
        e = lambda d, L=0.6: ease_out((t - d) / L) * out
        self.mark(c, out)
        fh = font("display", 130 if P else 140)
        y = 250 if P else 270
        c.text(m, y, "SO RECHNEN", fh, CREAM, e(0.0))
        c.text(m + c.tw("SO RECHNEN ", fh), y, "WIR", fh, ACCENT, e(0.1))
        ye = y + 80 if P else y + 90
        fex = font("reg", 34)
        c.text(m, ye, f"Beispiel: {r['brand']} {r['short']}", fex, MUTED, e(0.25))
        coll_g = r["collagenPerServing_g"] * r["servingsPerPack"]
        boxes = [
            ("Packungspreis", eur(r["price_eur"]), None),
            ("Kollagen pro Packung", f"{num_de(coll_g, 0)} g", f"{num_de(r['collagenPerServing_g'], 0)} g x {r['servingsPerPack']} Portionen"),
            ("Preis pro 100 g Kollagen", eur(r["pricePer100gCollagen_eur"]), None),
        ]
        ops = ["÷", "="]
        fl, fvv, fn = font("bold", 34), font("display", 92), font("reg", 30)
        if P:
            bx0, bx1 = m, self.W - m
            by = ye + 40
            bh, gap = 170, 74
            for i, (lab, val, note) in enumerate(boxes):
                a = e(0.4 + 0.4 * i)
                y0 = by + i * (bh + gap)
                dy = (1 - ease_out((t - 0.4 - 0.4 * i) / 0.6)) * 30
                y0 += dy
                last = i == 2
                if last:
                    c.rect(bx0, y0, bx1, y0 + bh, ACCENT, a)
                    und = mix(ACCENT, BG, a)
                    col = BG
                else:
                    c.box(bx0, y0, bx1, y0 + bh, CREAM, 3, a)
                    und, col = BG, CREAM
                c.text(bx0 + 32, y0 + 54, lab, fl, col, a if not last else 1.0 * (a > 0.01) * a, under=und)
                c.text(bx0 + 32, y0 + 148, val, fvv, col if last else ACCENT, a, under=und)
                if note:
                    c.text(bx1 - 32, y0 + 140, note, fn, MUTED, a, anchor="rs")
                if i < 2:
                    c.text(self.W / 2, y0 + bh + gap / 2 + 26, ops[i], font("display", 80), CREAM, e(0.6 + 0.4 * i), anchor="ms")
            yb = by + 3 * bh + 2 * gap + 80
        else:
            bw, gap = 470, 110
            by, bh = ye + 60, 260
            for i, (lab, val, note) in enumerate(boxes):
                a = e(0.4 + 0.4 * i)
                x0 = m + i * (bw + gap)
                y0 = by + (1 - ease_out((t - 0.4 - 0.4 * i) / 0.6)) * 30
                last = i == 2
                if last:
                    c.rect(x0, y0, x0 + bw, y0 + bh, ACCENT, a)
                    und, col = mix(ACCENT, BG, a), BG
                else:
                    c.box(x0, y0, x0 + bw, y0 + bh, CREAM, 3, a)
                    und, col = BG, CREAM
                c.text(x0 + 30, y0 + 62, lab, fl, col, a, under=und)
                c.text(x0 + 30, y0 + 176, val, font("display", 110), col if last else ACCENT, a, under=und)
                if note:
                    c.text(x0 + 30, y0 + 228, note, fn, MUTED, a, under=und)
                if i < 2:
                    c.text(x0 + bw + gap / 2, y0 + bh / 2 + 28, ops[i], font("display", 90), CREAM, e(0.6 + 0.4 * i), anchor="ms")
            yb = by + bh + 150
        fm = font("bold", 38 if P else 42)
        a = e(1.6)
        if P:
            c.rect(m, yb - 58, m + 10, yb + 70, ACCENT, a)
            c.text(m + 34, yb, "Preis ÷ Kollagen laut Hersteller-Angabe", fm, CREAM, a)
            c.text(m + 34, yb + 54, "Stand 20.11.2026", fm, CREAM, a)
            c.text(m, yb + 140, "Preise laut Recherche, können abweichen.", font("reg", 32), MUTED, e(1.8))
        else:
            c.rect(m, yb - 46, m + 10, yb + 12, ACCENT, a)
            c.text(m + 34, yb, "Preis ÷ Kollagen laut Hersteller-Angabe · Stand 20.11.2026", fm, CREAM, a)
            c.text(m, yb + 70, "Preise laut Recherche, können abweichen.", font("reg", 34), MUTED, e(1.8))

    # 5 ---------------------------------------------------------- end
    def s_end(self, c, t, du, out):
        P = self.P
        m = 60 if P else 120
        e = lambda d, L=0.6: ease_out((t - d) / L) * out
        lines = [("KOLLAGEN", CREAM), ("PEPTIDE", CREAM), ("KAUFEN", ACCENT)]
        size = fit_size(c, [l for l, _ in lines], "display", self.W - 2 * m if P else 900, 260 if P else 230)
        f = font("display", size)
        y = (300 if P else 140) + size * 0.82
        for i, (l, col) in enumerate(lines):
            a = e(0.05 + 0.12 * i)
            c.text(m, y + (1 - ease_out((t - 0.05 - 0.12 * i) / 0.6)) * 50, l, f, col, a)
            y += size * 0.9
        # domain in accent box
        fd = font("bold", 62 if P else 60)
        dom = "kollagenpeptidekaufen.de"
        dw = c.tw(dom, fd)
        y0 = y - size * 0.9 + 70
        if not P:
            m, y0 = 980, 500
        g = ease_out((t - 0.45) / 0.55)
        c.rect(m, y0, m + (dw + 70) * g, y0 + 110, ACCENT, out)
        c.text(m + 35, y0 + 76, dom, fd, BG, clamp((t - 0.7) / 0.3) * out, under=ACCENT)
        fs = font("reg", 40 if P else 38)
        k = self.counts
        c.text(m, y0 + 190, f"{k['brands']} Marken · {k['products']} Produkte verglichen", fs, CREAM, e(0.9))
        c.text(m, y0 + 246, "Preis pro 100 g Kollagen, Prüfberichte, Deklaration", fs, MUTED, e(1.0))


def main():
    mode, outdir = sys.argv[1], sys.argv[2]
    only = None
    if "--only" in sys.argv:
        only = [float(x) for x in sys.argv[sys.argv.index("--only") + 1].split(",")]
    v = Video(mode)
    os.makedirs(outdir, exist_ok=True)
    if only:
        for tt in only:
            v.frame(tt).save(os.path.join(outdir, f"t_{tt:05.2f}.png"))
        return
    n = int(round(v.duration * FPS))
    for i in range(n):
        v.frame(i / FPS).save(os.path.join(outdir, f"f_{i:04d}.png"), compress_level=1)


if __name__ == "__main__":
    main()
