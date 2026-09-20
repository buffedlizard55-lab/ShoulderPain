"""Offline structural/link checks. They do not verify medical truth."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit,unquote
import json,sys
ROOT=Path(__file__).resolve().parents[1]
errors=[]
class Page(HTMLParser):
 def __init__(self,path):
  super().__init__(convert_charrefs=True); self.path=path; self.ids=set(); self.links=[]; self.h1=0; self.main=0; self.title=False; self.lang=False; self.current=0; self.feed(path.read_text())
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:
   if a['id'] in self.ids: errors.append(f'{self.path.name}: duplicate id {a["id"]}')
   self.ids.add(a['id'])
  if tag=='html': self.lang=a.get('lang')=='en'
  if tag=='title': self.title=True
  if tag=='h1': self.h1+=1
  if tag=='main': self.main+=1
  if a.get('aria-current')=='page': self.current+=1
  if tag=='img' and 'alt' not in a: errors.append(f'{self.path.name}: image without alt')
  if a.get('target')=='_blank' and 'noopener' not in a.get('rel',''): errors.append(f'{self.path.name}: unsafe new tab')
  for key in ['href','src']:
   if key in a: self.links.append(a[key])
pages={p.name:Page(p) for p in ROOT.glob('*.html')}
for name,p in pages.items():
 for ok,label in [(p.lang,'language'),(p.title,'title'),(p.h1==1,'one h1'),(p.main==1,'one main'),(p.current==1,'one active nav item')]:
  if not ok: errors.append(f'{name}: missing {label}')
 if '[[' in p.path.read_text(): errors.append(f'{name}: unresolved source marker')
 for url in p.links:
  u=urlsplit(url)
  if u.scheme:
   if u.scheme not in ('https','mailto','tel'): errors.append(f'{name}: non-HTTPS or invalid URL {url}')
   continue
  if u.netloc or u.path.startswith('/'): errors.append(f'{name}: not project-path safe {url}'); continue
  target=ROOT/unquote(u.path) if u.path else p.path
  if not target.is_file(): errors.append(f'{name}: missing local target {url}'); continue
  if u.fragment and target.suffix=='.html' and unquote(u.fragment) not in pages[target.name].ids: errors.append(f'{name}: missing fragment {url}')
sources=json.loads((ROOT/'data/sources.json').read_text())
assert len({s['id'] for s in sources})==len(sources)
for s in sources:
 for key in ['id','title','url','locator','excerpt','boundary','checked','method']:
  if not s.get(key): errors.append(f'Source {s["id"]}: missing {key}')
 for url in [s['url']]:
  if urlsplit(url).scheme!='https': errors.append('Non-HTTPS source '+url)
if errors:
 print('\n'.join(errors)); sys.exit(1)
print(f'PASS: {len(pages)} pages; local files/fragments, metadata, navigation, source markers and {len(sources)} source records.')
