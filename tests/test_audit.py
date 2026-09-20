"""Offline regression tests: audit integrity, not medical correctness."""
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))
from claim_ledger import Units, collect


class AuditTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        for name in ("tools", "content", "data", "assets", "css", "js"):
            shutil.copytree(ROOT / name, self.root / name)
        for pattern in ("*.html", "*.md"):
            for path in ROOT.glob(pattern):
                shutil.copy(path, self.root / path.name)

    def check(self):
        return subprocess.run([sys.executable, "tools/check.py"], cwd=self.root,
                              text=True, capture_output=True)

    def test_current_site(self):
        result = self.check()
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_stale_claim_text_rejected(self):
        path = self.root / "data/claims.json"
        data = json.loads(path.read_text())
        data["claims"][0]["text"] = "Unsupported replacement"
        path.write_text(json.dumps(data))
        self.assertIn("ledger is stale", self.check().stdout)

    def test_stale_line_rejected(self):
        path = self.root / "content/causes.html"
        path.write_text("\n" + path.read_text())
        self.assertIn("ledger is stale", self.check().stdout)

    def test_missing_page_rejected(self):
        (self.root / "products.html").unlink()
        self.assertNotEqual(self.check().returncode, 0)

    def test_unknown_marker_even_without_build(self):
        path = self.root / "content/index.html"
        path.write_text(path.read_text() + "<p>[[Z99]]</p>")
        self.assertIn("unknown source marker Z99", self.check().stdout)

    def test_future_check_date_rejected(self):
        path = self.root / "data/sources.json"
        data = json.loads(path.read_text())
        data[0]["checked"] = "9999-01-01"
        path.write_text(json.dumps(data))
        self.assertIn("future check date", self.check().stdout)

    def test_markup_separates_words(self):
        parser = Units()
        parser.feed('<tr><td>First</td><td>Second [[M1]]</td></tr>')
        self.assertEqual(parser.rows[0]["text"], "First Second [[M1]]")

    def test_collect_has_no_write_side_effect(self):
        path = self.root / "data/claims.json"
        before = path.read_bytes()
        self.assertTrue(collect(self.root)["claims"])
        self.assertEqual(path.read_bytes(), before)


if __name__ == "__main__":
    unittest.main()
