#!/opt/homebrew/bin/python3
"""Render the home-page data video "How many peptide lab reports are really verified?" (silent, ~28 s).

Usage: render.py <outdir> [--only t1,t2,...]
  full run: pipes raw frames into ffmpeg and writes <outdir>/coa-verified.mp4, .webm and poster.jpg
  --only:   writes single PNG frames t_<sec>.png for inspection
All numbers are read from src/data/audit.json (read-only). Lab grouping = LAB_KEYS in src/lib/site.ts.
Fonts: Inter (OFL), docs/agent/video/fonts. Text min 54 px at 1920 width (= 30 px at 1080 width).
"""
import json, os, re, subprocess, sys
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
DATA = os.path.join(REPO, 'src', 'data', 'audit.json')
FFMPEG = '/opt/homebrew/bin/ffmpeg'
FPS = 30
W, H = 1920, 1080

BG = (15, 23, 42)          # slate-900
INK = (241, 245, 249)      # slate-100
MUTED = (176, 188, 204)    # ~slate-300/400, AA on BG for large text
TEAL = (45, 212, 191)      # teal-400 (portal-confirmed)
AMBER = (245, 158, 11)     # amber-500 (shop copy only)
TRACK = (30, 41, 59)       # slate-800
LINE = (51, 65, 85)

LABS = [('Janoshik', r'janoshik', re.I), ('Vanguard', r'vanguard', re.I), ('ILS', r'\bILS\b', 0),
        ('Freedom Diagnostics', r'freedom diagnostics', re.I), ('Kovera', r'kovera', re.I), ('Liquilabs', r'liquilabs', re.I),
        ('MZ Biolabs', r'mz biolabs', re.I), ('TrustPointe', r'trustpointe', re.I), ('BioSyn', r'biosyn', re.I)]


def load():
    a = [x for x in json.load(open(DATA)) if x['slug'] != 'licensed-peptides']  # draft stays hidden everywhere
    reps = [c for x in a for c in x['coaExamples']]
    opened = sum(x['coaStats']['opened'] for x in a)
    portal = sum(x['coaStats']['portalVerified'] for x in a)
    assert opened == len(reps) and portal == sum(1 for c in reps if c['verifiable']), 'coaStats out of sync with coaExamples'
    labs = []
    for name, rx, fl in LABS:
        rr = [c for c in reps if re.search(rx, c['lab'], fl)]
        if rr:
            labs.append({'name': name, 'opened': len(rr), 'portal': sum(1 for c in rr if c['verifiable'])})
    labs.sort(key=lambda r: (-r['opened'], -r['portal']))
    with_rep = [x for x in a if x['coaStats']['opened'] > 0]
    return {
        'shops': len(a), 'opened': opened, 'portal': portal, 'products': sum(len(x['products']) for x in a),
        'withRep': len(with_rep), 'zeroPortal': sum(1 for x in with_rep if x['coaStats']['portalVerified'] == 0),
        'noRep': len(a) - len(with_rep), 'labs': labs, 'date': '20 Nov 2026',
    }


_fc = {}
def font(kind, size):
    k = (kind, size)
    if k not in _fc:
        fn = {'display': 'InterDisplay-Black.ttf', 'bold': 'Inter-Bold.ttf', 'reg': 'Inter-Regular.ttf'}[kind]
        _fc[k] = ImageFont.truetype(os.path.join(HERE, 'fonts', fn), size)
    return _fc[k]

def clamp(x, a=0.0, b=1.0): return max(a, min(b, x))
def ease_out(x): x = clamp(x); return 1 - (1 - x) ** 3
def ease_io(x): x = clamp(x); return 4 * x ** 3 if x < 0.5 else 1 - (-2 * x + 2) ** 3 / 2
def mix(c, under, a): a = clamp(a); return tuple(int(round(u + (cc - u) * a)) for cc, u in zip(c, under))


class C:
    def __init__(self):
        self.im = Image.new('RGB', (W, H), BG)
        self.d = ImageDraw.Draw(self.im)
    def text(self, x, y, s, f, col, a=1.0, anchor='ls', under=BG):
        if a > 0.003:
            self.d.text((round(x), round(y)), s, font=f, fill=mix(col, under, a), anchor=anchor)
    def rect(self, x0, y0, x1, y1, col, a=1.0, under=BG, r=0):
        if a > 0.003 and x1 - x0 >= 0.5:
            fill = mix(col, under, a)
            if r and x1 - x0 > 2 * r:
                self.d.rounded_rectangle([round(x0), round(y0), round(x1) - 1, round(y1) - 1], radius=r, fill=fill)
            else:
                self.d.rectangle([round(x0), round(y0), round(x1) - 1, round(y1) - 1], fill=fill)
    def tw(self, s, f):
        b = self.d.textbbox((0, 0), s, font=f, anchor='ls'); return b[2] - b[0]


class Video:
    def __init__(self):
        self.v = load()
        self.scenes = [(0.0, 4.0, self.s_title), (4.0, 6.0, self.s_counts), (10.0, 8.5, self.s_labs),
                       (18.5, 5.0, self.s_shops), (23.5, 3.0, self.s_method), (26.5, 3.0, self.s_end)]
        self.duration = 29.5

    def mark(self, c, a):
        c.rect(96, 52, 136, 92, TEAL, a, r=8)
        c.text(156, 88, 'peptidelabtest.org', font('bold', 54), INK, a)

    def frame(self, t):
        c = C()
        for st, du, fn in self.scenes:
            if st <= t < st + du:
                lt = t - st
                out = 1 - ease_io((lt - (du - 0.4)) / 0.4)
                fn(c, lt, du, out)
        return c.im

    # 1 title
    def s_title(self, c, t, du, out):
        e = lambda d, L=0.6: ease_out((t - d) / L) * out
        self.mark(c, e(0))
        chip = f'DESK AUDIT · {self.v["date"].upper()}'
        fc = font('bold', 54)
        a = e(0.1)
        cw = c.tw(chip, fc)
        c.rect(120, 200, 120 + cw + 60, 290, TEAL, a * 0.18, r=14)
        c.text(150, 265, chip, fc, TEAL, a)
        f = font('display', 150)
        lines = [('How many peptide', INK), ('lab reports are', INK), ('really verified?', TEAL)]
        y = 470
        for i, (s, col) in enumerate(lines):
            a = e(0.3 + 0.15 * i, 0.7)
            c.text(120, y + (1 - ease_out((t - 0.3 - 0.15 * i) / 0.7)) * 50, s, f, col, a)
            y += 165
        c.text(120, 1000, f'{self.v["shops"]} shops · data from our own audit', font('reg', 56), MUTED, e(1.2))

    # 2 counters
    def s_counts(self, c, t, du, out):
        e = lambda d, L=0.6: ease_out((t - d) / L) * out
        v = self.v
        self.mark(c, out)
        items = [(v['shops'], 'shops audited', INK, 0.1), (v['opened'], 'lab reports opened', INK, 0.8), (v['portal'], "confirmed on the lab's own portal", TEAL, 1.6)]
        y = 330
        for n, lab, col, st in items:
            k = ease_out((t - st) / 1.1)
            shown = int(round(n * k))
            a = e(st, 0.4)
            c.text(120, y, f'{shown}', font('display', 190), col, a)
            c.text(560, y - 18, lab, font('bold', 64), col if col != INK else INK, a)
            y += 230
        # share bar
        share = v['portal'] / v['opened']
        g = ease_out((t - 2.6) / 1.2)
        a = e(2.5)
        x0, x1, by = 120, W - 120, 850
        c.rect(x0, by, x1, by + 56, AMBER, a, r=10)
        c.rect(x0, by, x0 + (x1 - x0) * share * g, by + 56, TEAL, a, r=10)
        c.text(x0, by + 140, f'{round(share * 100)} % confirmed · {v["opened"] - v["portal"]} only as a copy on the shop site', font('bold', 56), INK, e(3.2))

    # 3 by lab
    def s_labs(self, c, t, du, out):
        e = lambda d, L=0.6: ease_out((t - d) / L) * out
        self.mark(c, out)
        c.text(120, 215, 'Reports by testing lab', font('display', 100), INK, e(0))
        fl = font('reg', 54)
        a = e(0.3)
        lx, ly = 120, 300
        c.rect(lx, ly - 40, lx + 40, ly, TEAL, a, r=6); c.text(lx + 56, ly, 'confirmed on the lab portal', fl, INK, a)
        lx2 = lx + 56 + c.tw('confirmed on the lab portal', fl) + 60
        c.rect(lx2, ly - 40, lx2 + 40, ly, AMBER, a, r=6); c.text(lx2 + 56, ly, 'shop copy only', fl, INK, a)
        rows = self.v['labs']
        hi = max(r['opened'] for r in rows)
        top, rh = 330, 78
        bx0 = 120 + max(c.tw(r['name'], font('bold', 56)) for r in rows) + 50
        bmax = W - 120 - 290 - bx0
        for i, r in enumerate(rows):
            st = 0.6 + 0.35 * i
            a = e(st, 0.4)
            g = ease_out((t - st - 0.1) / 0.9)
            y = top + i * rh
            c.text(120, y + 56, r['name'], font('bold', 56), INK, a)
            c.rect(bx0, y + 16, bx0 + bmax, y + 62, TRACK, a, r=8)
            wo = bmax * r['opened'] / hi * g
            wp = bmax * r['portal'] / hi * g
            c.rect(bx0, y + 16, bx0 + wo, y + 62, AMBER, a, r=8)
            if r['portal']:
                c.rect(bx0, y + 16, bx0 + wp, y + 62, TEAL, a, r=8)
            c.text(W - 120, y + 58, f'{r["portal"]} of {r["opened"]}', font('bold', 56), INK, a * clamp(g * 2), anchor='rs')

    # 4 shops callout
    def s_shops(self, c, t, du, out):
        e = lambda d, L=0.6: ease_out((t - d) / L) * out
        v = self.v
        self.mark(c, out)
        c.text(120, 300, f'{v["zeroPortal"]} of {v["withRep"]} shops', font('display', 170), AMBER, e(0))
        c.text(120, 420, 'that publish reports had not one', font('bold', 72), INK, e(0.3))
        c.text(120, 510, "confirmed on the lab's portal.", font('bold', 72), INK, e(0.4))
        c.rect(120, 600, W - 120, 604, LINE, e(0.8))
        c.text(120, 760, f'{v["noRep"]} more shops', font('display', 130), MUTED, e(1.4))
        c.text(120, 860, 'published no report we could open.', font('bold', 72), INK, e(1.7))

    # 5 method
    def s_method(self, c, t, du, out):
        e = lambda d, L=0.5: ease_out((t - d) / L) * out
        self.mark(c, out)
        c.text(120, 250, 'How we check a report', font('display', 110), INK, e(0))
        steps = ['Open the report on the shop site', 'Find the same key on the lab portal', 'Compare mg and purity line by line']
        for i, s in enumerate(steps):
            a = e(0.4 + 0.35 * i)
            y = 430 + i * 170
            c.rect(120, y - 70, 210, y + 20, TEAL, a, r=22)
            c.text(165, y - 2, str(i + 1), font('display', 72), BG, a, anchor='ms', under=TEAL)
            c.text(260, y, s, font('bold', 66), INK, a)

    # 6 end
    def s_end(self, c, t, du, out):
        e = lambda d, L=0.6: ease_out((t - d) / L) * out
        v = self.v
        g = ease_out((t - 0.2) / 0.5)
        dom = 'peptidelabtest.org'
        fd = font('display', 130)
        dw = c.tw(dom, fd)
        c.rect(120, 300, 120 + (dw + 100) * g, 480, TEAL, out, r=20)
        c.text(170, 440, dom, fd, BG, clamp((t - 0.45) / 0.3) * out, under=TEAL)
        c.text(120, 640, f'{v["shops"]} shops · {v["opened"]} lab reports · {v["products"]} prices per mg', font('bold', 64), INK, e(0.7))
        c.text(120, 740, f'Research use only · data checked {v["date"]}', font('reg', 56), MUTED, e(0.9))


def main():
    outdir = sys.argv[1]
    os.makedirs(outdir, exist_ok=True)
    vid = Video()
    if '--only' in sys.argv:
        for tt in [float(x) for x in sys.argv[sys.argv.index('--only') + 1].split(',')]:
            vid.frame(tt).save(os.path.join(outdir, f't_{tt:05.2f}.png'))
        return
    print(json.dumps({k: v for k, v in vid.v.items() if k != 'labs'}), vid.v['labs'])
    n = int(round(vid.duration * FPS))
    raw = os.path.join(outdir, 'frames.rgb')
    with open(raw, 'wb') as fh:
        for i in range(n):
            fh.write(vid.frame(i / FPS).tobytes())
    src = [FFMPEG, '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', raw]
    scale = ['-vf', 'scale=1280:720:flags=lanczos']
    subprocess.run(src + scale + ['-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an',
                                  os.path.join(outdir, 'coa-verified.mp4')], check=True)
    # WebM: two-pass VP9 from the MP4 (crf mode came out 4x larger than the MP4)
    mp4 = os.path.join(outdir, 'coa-verified.mp4')
    vp9 = ['-c:v', 'libvpx-vp9', '-b:v', '180k', '-maxrate', '400k', '-row-mt', '1', '-deadline', 'good', '-an']
    subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-i', mp4] + vp9 + ['-pass', '1', '-passlogfile', os.path.join(outdir, 'vp9'), '-f', 'null', '/dev/null'], check=True)
    subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-i', mp4] + vp9 + ['-pass', '2', '-passlogfile', os.path.join(outdir, 'vp9'), os.path.join(outdir, 'coa-verified.webm')], check=True)
    for fn in os.listdir(outdir):
        if fn.startswith('vp9'):
            os.remove(os.path.join(outdir, fn))
    # poster = the by-lab chart, fully drawn
    vid.frame(16.0).resize((1280, 720), Image.Resampling.LANCZOS).save(os.path.join(outdir, 'coa-verified-poster.jpg'), quality=78, optimize=True, progressive=True)
    os.remove(raw)


if __name__ == '__main__':
    main()
