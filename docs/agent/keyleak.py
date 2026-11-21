import os,re,sys,html,json
DIST=sys.argv[1] if len(sys.argv)>1 else 'dist'
en=json.load(open('/Users/gorden/sites/peptidelabtest/src/i18n/en.json'))
en.update(json.load(open('/Users/gorden/sites/peptidelabtest/src/i18n/x/en.json')))
ns='|'.join(map(re.escape,en.keys()))
pat=re.compile(r'\b(?:%s)\.[A-Za-z_][\w.]*'%ns)
hits={}
for root,_,fs in os.walk(DIST):
  for f in fs:
    if f.endswith('.html'):
      s=open(os.path.join(root,f)).read()
      s2=re.sub(r'<script\b.*?</script>|<style\b.*?</style>',' ',s,flags=re.S)
      txt=html.unescape(re.sub(r'<[^>]+>',' ',s2))
      attrs=' '.join(re.findall(r'(?:content|aria-label|title|placeholder|alt)="([^"]*)"',s))
      for m in pat.findall(txt+' '+attrs):
        if re.match(r'^\w+\.(com|org|cz|io|is|de|co|pdf|png|net)\b',m): continue
        hits.setdefault(m,set()).add(os.path.relpath(root,DIST))
for k,v in sorted(hits.items()): print(k,len(v),sorted(v)[:3])
print('leaks',len(hits))
