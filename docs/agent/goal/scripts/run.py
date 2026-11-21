import json, sys, re
from kw import post
from lists import MARKETS
out = {}
for mk,(loc,lang,kws) in MARKETS.items():
    kws = list(dict.fromkeys(k.lower() for k in kws))
    r = post('/v3/keywords_data/google_ads/search_volume/live', [{'keywords':kws,'location_code':loc,'language_code':lang}])
    t = r['tasks'][0]
    print(mk, t['status_code'], t['status_message'], t.get('cost'), len(t.get('result') or []))
    res = {x['keyword']:{'volume':x.get('search_volume'),'cpc':x.get('cpc'),'competition':x.get('competition')} for x in (t.get('result') or [])}
    out[mk] = {'location_code':loc,'language':lang,'requested':kws,'results':res}
json.dump(out, open('raw_sv.json','w'), indent=1, ensure_ascii=False)
