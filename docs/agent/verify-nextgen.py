#!/usr/bin/env python3
"""Verify the NextGen brand-page placement in dist or on the production site."""
import argparse
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.request import urlopen

LANGS = ('', 'de/', 'es/', 'fr/', 'it/')
LINK = 'https://goaff.pro/molszu'
CODE = 'megadiscount'


class AffiliateLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.matches = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'a' and attrs.get('href') == LINK:
            self.matches.append(set((attrs.get('rel') or '').split()))


def check_offer(path, content):
    sections = re.findall(r'<section\b[^>]*\bid="partner-offer"[^>]*>(.*?)</section>', content, re.S)
    assert len(sections) == 1, f'{path}: missing or duplicate NextGen offer'
    section, = sections
    links = AffiliateLinks()
    links.feed(section)
    assert len(links.matches) == 1, f'{path}: missing or duplicate tracked link'
    assert {'sponsored', 'nofollow'} <= links.matches[0], f'{path}: missing affiliate link attributes'
    outside_offer = content.replace(section, '', 1)
    assert LINK not in outside_offer and CODE not in outside_offer, f'{path}: offer leaked outside the ngpeptide.com section'
    text = unescape(re.sub(r'<[^>]+>', ' ', section))
    assert 'ngpeptide.com' in text, f'{path}: offer not explicitly tied to ngpeptide.com'
    assert not any(host in text for host in ('nxtgenpep.com', 'nextgen-peptides.net')), f'{path}: incorrect domain in offer'
    assert f'data-copy="{CODE}"' in section and CODE in text, f'{path}: exact code missing'
    assert re.search(r'\b10\s*%', text), f'{path}: 10% reader discount missing'
    assert re.search(r'\baff?ilia', text, re.I) and re.search(r'\b(?:commission|provision|comisión)', text, re.I), f'{path}: commission disclosure missing by the link'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('dist', type=Path, nargs='?', default=Path('dist'))
    parser.add_argument('--live', metavar='SITE')
    args = parser.parse_args()
    expected = {f'{lang}brands/nextgen-peptides/' for lang in LANGS}

    def load(path):
        if args.live:
            with urlopen(f'{args.live.rstrip("/")}/{path}', timeout=15) as response:
                assert response.status == 200 and response.url == f'{args.live.rstrip("/")}/{path}', path
                return response.read().decode('utf-8')
        return (args.dist / path / 'index.html').read_text(encoding='utf-8')

    for path in sorted(expected):
        check_offer(path, load(path))
    if args.live:
        for lang in LANGS:
            for page in ('discount-codes/', 'brands/', 'brands/amino-club/'):
                path = f'{lang}{page}'
                content = load(path)
                assert CODE not in content and LINK not in content, f'{path}: offer leaked outside the NextGen brand check'
    else:
        expected_files = {f'{p}index.html' for p in expected}
        for file in args.dist.rglob('*.html'):
            path = file.relative_to(args.dist).as_posix()
            if path in expected_files:
                continue
            content = file.read_text(encoding='utf-8')
            assert CODE not in content and LINK not in content, f'{path}: offer leaked outside the NextGen brand check'
    print(f'NextGen placement verified in {len(expected)} language versions; no leakage on checked pages.')


if __name__ == '__main__':
    main()
