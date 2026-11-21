"""Compare numbers in <main> text of each translated page with its English counterpart (multiset, decimal comma normalised)."""
import os,re,sys,html
from collections import Counter
DIST=sys.argv[1]; LANG=sys.argv[2]
def nums(path):
    s=open(path).read()
    m=re.search(r'<main\b.*?</main>',s,re.S); s=m.group(0) if m else s
    s=re.sub(r'<script\b.*?</script>|<style\b.*?</style>',' ',s,flags=re.S)
    s=re.sub(r'<[^>]+>',' ',s); s=html.unescape(s)
    s=s.replace('\u00a0',' ').replace('\u202f',' ')
    s=re.sub(r'(?<=\d)[ ,.](?=\d{3}\b)','',s)  # thousands
    xs=re.findall(r'\d+(?:[.,]\d+)?',s)
    return Counter(x.replace(',','.') for x in xs)
bad=0; n=0
for root,_,fs in os.walk(os.path.join(DIST,LANG)):
    for f in fs:
        if not f.endswith('.html'): continue
        p=os.path.join(root,f); ep=p.replace(os.path.join(DIST,LANG)+os.sep, DIST+os.sep,1)
        if not os.path.exists(ep): continue
        n+=1
        a,b=nums(ep),nums(p)
        if a!=b:
            bad+=1
            if bad<=12: print(os.path.relpath(p,DIST),'EN-only',dict((a-b).most_common(6)),'XX-only',dict((b-a).most_common(6)))
print(f'{LANG}: pages compared {n}, number mismatches {bad}')
