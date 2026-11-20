from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
from pathlib import Path
from urllib.request import urlopen
import json
root=Path('/Users/ihan-ul/Downloads/최최종/0.web')
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args): pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(root)))
Thread(target=server.serve_forever,daemon=True).start()
results=[]
try:
 for p in ['index.html']+[p.name for p in root.glob('project-*.html')]+['assets/portfolio.pdf?v=20261025-linked']:
  with urlopen(f'http://127.0.0.1:{server.server_port}/{p}') as r:
   body=r.read(); first=body[:5]; assert r.status==200
   if p.startswith('assets/'): assert first==b'%PDF-'
   results.append({'path':p,'status':r.status,'content_type':r.headers['Content-Type']})
finally: server.shutdown();server.server_close()
Path('/tmp/hanul-review-20261107/http-check.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print('PASS: local HTTP 11 pages and PDF download signature')
