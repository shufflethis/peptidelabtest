import json, subprocess, base64, urllib.request, sys
pw = subprocess.check_output(['security','find-generic-password','-s','dataforseo','-w']).decode().strip()
acct = subprocess.check_output(['security','find-generic-password','-s','dataforseo']).decode()
import re
m = re.search(r'"acct"<blob>="([^"]+)"', acct); login = m.group(1) if m else 'gw@famefact.com'
auth = base64.b64encode(f'{login}:{pw}'.encode()).decode()
def post(path, body):
    req = urllib.request.Request('https://api.dataforseo.com'+path, data=json.dumps(body).encode(), headers={'Authorization':'Basic '+auth,'Content-Type':'application/json'})
    return json.load(urllib.request.urlopen(req, timeout=120))
if __name__ == '__main__':
    r = post('/v3/appendix/user_data', None) if False else None
    req = urllib.request.Request('https://api.dataforseo.com/v3/appendix/user_data', headers={'Authorization':'Basic '+auth})
    d = json.load(urllib.request.urlopen(req))
    print(login, d['tasks'][0]['result'][0]['money'])
