"""Build dependency-free pages. Source markers resolve to direct official URLs."""
from pathlib import Path
import json, re, html
ROOT=Path(__file__).resolve().parents[1]
SOURCES=json.loads((ROOT/'data/sources.json').read_text())
BY_ID={s['id']:s for s in SOURCES}
PAGES=[('index','Start here','A calmer plan for your shoulder.','Understand the possibilities. Move with care. Make your space work better.'),('causes','Medical advice','Understand the pain.','Possibilities to discuss with a clinician, not a self-diagnosis.'),('treatment','Treatment','Relief, without guesswork.','Conservative options, medication cautions and when to seek care.'),('exercises','Exercises','Move gently. Build gradually.','Source-based exercise examples to review with a clinician or physiotherapist.'),('ergonomics','Desk & room','Less reaching. More moving.','A practical workstation and living-space plan for a small room.'),('products','Products & prices','Small-space options, honestly compared.','Folding ability, dimensions, prices and compromises — side by side.'),('costs','Care costs','Know what is — and is not — priced.','US examples only. No invented appointment costs or insurance assumptions.'),('pain-log','Optional log','A record, not a diagnosis.','Private browser-based notes you can choose to share with your clinician.'),('sources','Sources & audit','Follow every source.','Claim-level references, short evidence excerpts and explicit limits.'),('next-steps','Next steps','What comes next.','Priorities, unresolved requirements and a focused maintenance backlog.')]

def refs(text):
 def replace(m):
  s=BY_ID[m.group(1)]
  return f'<a class="source" href="{html.escape(s["url"],quote=True)}" title="{html.escape(s["title"],quote=True)}">[{s["id"]}]</a>'
 return re.sub(r'\[\[([A-Z][0-9]+)\]\]',replace,text)

def shell(slug,label,title,lead,body):
 body=body.replace('<div class="table-wrap">', '<div class="table-wrap" role="region" aria-label="Scrollable data table" tabindex="0">')
 nav=''.join(f'<a href="{p}.html"'+(' aria-current="page"' if p==slug else '')+f'>{n}</a>' for p,n,*_ in PAGES)
 return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="{html.escape(lead,quote=True)}">
<meta name="color-scheme" content="light">
<title>{label} · Shoulder Guide</title>
<link rel="icon" href="assets/mark.svg" type="image/svg+xml">
<link rel="stylesheet" href="css/style.css">
<script src="js/site.js" defer></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<aside class="sidebar"><a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">s.</span>Shoulder<span class="brand-light">guide</span></a>
<p class="nav-label">YOUR RESEARCH COMPANION</p><nav aria-label="Main navigation">{nav}</nav>
<div class="side-note"><span class="status-dot"></span> Sources checked<br><strong>20 September 2026</strong><p>Education, not diagnosis.<br>No ads. No affiliate links.</p></div></aside>
<div class="site-body"><header class="topbar"><span>SHOULDER &amp; SHOULDER-BLADE PAIN</span><a href="causes.html#red-flags">When to get help ↗</a></header>
<main id="main" tabindex="-1"><div class="page-intro"><p class="eyebrow">{label}</p><h1>{title}</h1><p class="lead">{lead}</p></div>
{refs(body)}
</main><footer>Built for informed decisions, not certainty. <a href="sources.html">Sources &amp; verification limits</a> · <a href="next-steps.html">Open questions</a><p>Prices are USD snapshots. This site cannot assess your symptoms or verify your room fit.</p></footer></div>
</body></html>\n'''

def source_page():
 text=(ROOT/'content/sources.html').read_text()
 text+='<section><h2>Official source register</h2><p>Each reference below was directly opened on 20 September 2026. Excerpts are short review aids, not full quotations of the guidance. Publisher authority does not make every claim certain. Commercial sources support prices/specifications only.</p><div class="source-list">'
 for s in SOURCES:
  text+=f'''<article class="source-record" id="{s['id'].lower()}"><div><span class="pill">{s['id']} · {html.escape(s['type'])}</span><h3><a href="{html.escape(s['url'],quote=True)}">{html.escape(s['title'])} ↗</a></h3></div><p><strong>Read:</strong> {html.escape(s['locator'])}.</p><blockquote>{html.escape(s['excerpt'])}</blockquote><p><strong>Boundary:</strong> {html.escape(s['boundary'])}</p><p class="small">Checked {s['checked']} · {s['method']}</p></article>'''
 return text+'</div></section>'

for slug,label,title,lead in PAGES:
 body=source_page() if slug=='sources' else (ROOT/'content'/f'{slug}.html').read_text()
 (ROOT/f'{slug}.html').write_text(shell(slug,label,title,lead,body))
print(f'Built {len(PAGES)} pages with {len(SOURCES)} registered sources.')
