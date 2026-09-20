"""Export source-bearing content units for review, never as proof of truth."""
from html.parser import HTMLParser
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
NOTICE = (
    "Review ledger of source-bearing content units, not automated proof of truth. "
    "Nested units can overlap. Uncited text is not included; review the full pages "
    "for editorial judgments, safety suggestions and limitations. Source check "
    "dates and scope are recorded separately in data/sources.json."
)


class Units(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.rows = []

    def handle_starttag(self, tag, attrs):
        if tag in ("p", "li", "tr", "article"):
            self.stack.append({"tag": tag, "text": [], "line": self.getpos()[0]})
        # Keep words separated across markup such as <br> and table cells.
        if tag in ("br", "td", "th", "p", "li", "h2", "h3"):
            self.handle_data(" ")

    def handle_data(self, text):
        for item in self.stack:
            item["text"].append(text)

    def handle_endtag(self, tag):
        if self.stack and self.stack[-1]["tag"] == tag:
            row = self.stack.pop()
            text = " ".join("".join(row["text"]).split())
            ids = re.findall(r"\[\[([A-Z][0-9]+)\]\]", text)
            if ids:
                self.rows.append({
                    "line": row["line"], "text": text,
                    "source_ids": list(dict.fromkeys(ids)),
                })
        if tag in ("td", "th", "p", "li", "h2", "h3"):
            self.handle_data(" ")


def collect(root=ROOT):
    rows = []
    for path in sorted((root / "content").glob("*.html")):
        if path.stem == "sources":
            continue
        parser = Units()
        parser.feed(path.read_text(encoding="utf-8"))
        for n, row in enumerate(parser.rows, 1):
            rows.append({"id": f"{path.stem}-{n:02}",
                         "file": str(path.relative_to(root)), **row})
    return {"notice": NOTICE, "claims": rows}


if __name__ == "__main__":
    data = collect()
    (ROOT / "data/claims.json").write_text(
        json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print(f"Exported {len(data['claims'])} source-bearing review units.")
