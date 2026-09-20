"""Export source-bearing content units for manual review; not a truth checker."""
from html.parser import HTMLParser
from pathlib import Path
import re,json
ROOT=Path(__file__).resolve().parents[1]
class Units(HTMLParser):
 def __init__(self):
  super().__init__(); self.stack=[]; self.rows=[]
 def handle_starttag(self,tag,attrs):
  if tag in ('p','li','tr','article'):
   self.stack.append({'tag':tag,'text':[],'line':self.getpos()[0]})
 def handle_data(self,text):
  for item in self.stack: item['text'].append(text)
 def handle_endtag(self,tag):
  if self.stack and self.stack[-1]['tag']==tag:
   row=self.stack.pop(); text=' '.join(''.join(row['text']).split()); ids=re.findall(r'\[\[([A-Z][0-9]+)\]\]',text)
   if ids: self.rows.append({'line':row['line'],'text':text,'source_ids':list(dict.fromkeys(ids))})
rows=[]
for path in sorted((ROOT/'content').glob('*.html')):
 if path.stem=='sources': continue
 parser=Units(); parser.feed(path.read_text())
 for n,row in enumerate(parser.rows,1): rows.append({'id':f'{path.stem}-{n:02}','file':str(path.relative_to(ROOT)),**row})
(ROOT/'data/claims.json').write_text(json.dumps({'notice':'Review ledger of source-bearing content units, not automated proof of truth. Project judgments and limitations are explicitly labeled in the site. References checked against opened official pages on 2026-09-20.','claims':rows},indent=2,ensure_ascii=False)+'\n')
print(f'Exported {len(rows)} source-bearing review units.')
