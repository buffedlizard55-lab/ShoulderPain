"""Offline structural and source-register checks.

These checks catch broken local references and unregistered outbound links. They
cannot verify medical truth, product availability, or a source's interpretation.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
errors = []

sources = json.loads((ROOT / "data/sources.json").read_text())
source_ids = {source["id"] for source in sources}
source_urls = {source["url"]: source["id"] for source in sources}
if len(source_ids) != len(sources):
    errors.append("data/sources.json: duplicate source id")
if len(source_urls) != len(sources):
    errors.append("data/sources.json: duplicate source URL")


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.ids = set()
        self.links = []
        self.h1 = 0
        self.main = 0
        self.title = False
        self.lang = False
        self.current = 0
        self.feed(path.read_text())

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if "id" in attributes:
            if attributes["id"] in self.ids:
                errors.append(f"{self.path.name}: duplicate id {attributes['id']}")
            self.ids.add(attributes["id"])
        if tag == "html":
            self.lang = attributes.get("lang") == "en"
        if tag == "title":
            self.title = True
        if tag == "h1":
            self.h1 += 1
        if tag == "main":
            self.main += 1
        if attributes.get("aria-current") == "page":
            self.current += 1
        if tag == "img" and "alt" not in attributes:
            errors.append(f"{self.path.name}: image without alt")
        if attributes.get("target") == "_blank" and "noopener" not in attributes.get(
            "rel", ""
        ):
            errors.append(f"{self.path.name}: unsafe new tab")
        for key in ("href", "src"):
            if key in attributes:
                self.links.append(attributes[key])


pages = {path.name: Page(path) for path in ROOT.glob("*.html")}
for name, page in pages.items():
    for ok, label in (
        (page.lang, "language"),
        (page.title, "title"),
        (page.h1 == 1, "one h1"),
        (page.main == 1, "one main"),
        (page.current == 1, "one active nav item"),
    ):
        if not ok:
            errors.append(f"{name}: missing {label}")

    raw = page.path.read_text()
    if "[[" in raw:
        errors.append(f"{name}: unresolved source marker")
    for marker in re.findall(r"\[\[([A-Z][0-9]+)\]\]", raw):
        if marker not in source_ids:
            errors.append(f"{name}: unknown source marker {marker}")

    for url in page.links:
        parsed = urlsplit(url)
        if parsed.scheme:
            if parsed.scheme not in ("https", "mailto", "tel"):
                errors.append(f"{name}: non-HTTPS or invalid URL {url}")
            elif parsed.scheme == "https" and url not in source_urls:
                errors.append(f"{name}: unregistered external source URL {url}")
            continue
        if parsed.netloc or parsed.path.startswith("/"):
            errors.append(f"{name}: not project-path safe {url}")
            continue
        target = ROOT / unquote(parsed.path) if parsed.path else page.path
        if not target.is_file():
            errors.append(f"{name}: missing local target {url}")
            continue
        if parsed.fragment and target.suffix == ".html":
            target_page = pages.get(target.name)
            if target_page is None or unquote(parsed.fragment) not in target_page.ids:
                errors.append(f"{name}: missing fragment {url}")

for source in sources:
    for key in (
        "id",
        "title",
        "url",
        "locator",
        "excerpt",
        "boundary",
        "checked",
        "method",
    ):
        if not source.get(key):
            errors.append(f"Source {source.get('id', '?')}: missing {key}")
    if urlsplit(source["url"]).scheme != "https":
        errors.append("Non-HTTPS source " + source["url"])

claims_path = ROOT / "data/claims.json"
claims_data = json.loads(claims_path.read_text())
claims = claims_data.get("claims", [])
if not isinstance(claims, list) or not claims:
    errors.append("data/claims.json: missing claims list")
else:
    for claim in claims:
        for key in ("id", "file", "line", "text", "source_ids"):
            if key not in claim or not claim[key]:
                errors.append(f"Claim {claim.get('id', '?')}: missing {key}")
        if not isinstance(claim.get("line"), int) or claim["line"] < 1:
            errors.append(f"Claim {claim.get('id', '?')}: invalid source line")
        if not set(claim.get("source_ids", [])) <= source_ids:
            errors.append(f"Claim {claim.get('id', '?')}: unknown source id")
        if not (ROOT / claim.get("file", "")).is_file():
            errors.append(f"Claim {claim.get('id', '?')}: missing content file")

if errors:
    print("\n".join(errors))
    sys.exit(1)

print(
    f"PASS: {len(pages)} pages; local files/fragments, metadata, navigation, "
    f"registered source links, {len(sources)} source records and {len(claims)} "
    "claim-ledger units."
)
