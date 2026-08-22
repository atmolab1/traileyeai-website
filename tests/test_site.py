from __future__ import annotations

import json
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://traileye.eu"


class HeadParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.title = ""
        self._in_title = False
        self.metas: list[dict[str, str]] = []
        self.links: list[dict[str, str]] = []
        self.anchors: list[str] = []
        self.ids: set[str] = set()

    def handle_starttag(self, tag: str, attrs) -> None:
        values = dict(attrs)
        if "id" in values:
            self.ids.add(values["id"])
        if tag == "title":
            self._in_title = True
        elif tag == "meta":
            self.metas.append(values)
        elif tag == "link":
            self.links.append(values)
        elif tag == "a" and "href" in values:
            self.anchors.append(values["href"])

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title += data


def parse(relative_path: str) -> tuple[str, HeadParser]:
    text = (ROOT / relative_path).read_text(encoding="utf-8")
    parser = HeadParser()
    parser.feed(text)
    return text, parser


def meta_content(parser: HeadParser, name: str) -> str:
    for meta in parser.metas:
        if meta.get("name") == name:
            return meta.get("content", "")
    return ""


def alternates(parser: HeadParser) -> dict[str, str]:
    return {
        link["hreflang"]: link["href"]
        for link in parser.links
        if link.get("rel") == "alternate" and "hreflang" in link and "href" in link
    }


class SiteSEOTests(unittest.TestCase):
    def test_homepage_is_keyword_first_and_has_no_species_count_pitch(self) -> None:
        text, parser = parse("index.html")
        self.assertTrue(parser.title.strip().startswith("Trail Camera Software for Windows"))
        self.assertIn("local", meta_content(parser, "description").lower())
        self.assertNotIn("38", text)
        self.assertNotRegex(text.lower(), r"\b40\s+(?:supported\s+)?(?:wildlife\s+)?species\b")
        self.assertNotIn("species-count.js", text)
        self.assertFalse((ROOT / "species-count.js").exists())

    def test_no_numbered_species_marketing_claims_remain(self) -> None:
        patterns = [
            r"\b(?:38|40)[-\s](?:supported[-\s])?(?:wildlife[-\s])?species\b",
            r"\b(?:38|40)[-\s]Arten",
            r"\b(?:38|40)\s+(?:podprtih\s+)?vrst",
            r"\b(?:38|40)\s+especies",
            r"\b(?:38|40)\s+(?:поддерживаемых\s+)?вид",
            r"(?:38|40)\s*(?:个)?物种",
            r"(?:library|bibliothek|knjižnic\w*|biblioteca)[^\n]{0,30}\b(?:38|40)\b",
        ]
        offenders: list[str] = []
        for path in ROOT.rglob("*"):
            if path.suffix.lower() not in {".html", ".js", ".xml"} or ".git" in path.parts:
                continue
            text = path.read_text(encoding="utf-8")
            for pattern in patterns:
                if re.search(pattern, text, re.IGNORECASE):
                    offenders.append(f"{path.relative_to(ROOT)}: {pattern}")
        self.assertEqual([], offenders)

    def test_internal_homepage_fragment_links_target_existing_ids(self) -> None:
        _, home = parse("index.html")
        broken: list[str] = []
        for path in ROOT.rglob("index.html"):
            _, parser = parse(str(path.relative_to(ROOT)).replace("\\", "/"))
            for href in parser.anchors:
                match = re.fullmatch(r"(?:\.\./)+#(.+)", href)
                if match and match.group(1) not in home.ids:
                    broken.append(f"{path.relative_to(ROOT)} -> {href}")
        self.assertEqual([], broken)

    def test_download_pages_are_complete_and_use_release_asset(self) -> None:
        for relative, lang in [("download/index.html", "en"), ("de/download/index.html", "de")]:
            text, parser = parse(relative)
            self.assertIn('lang="' + lang + '"', text)
            self.assertIn("TrailEyeAI-Setup-1.0.0.exe", text)
            self.assertIn("1,737,008,941", text)
            self.assertIn("78277868d46d80fa86be411403d3db744f2f7849b0e182f1df2e1031a8348efc", text.lower())
            self.assertRegex(text.lower(), r"system requirements|systemvoraussetzungen")
            self.assertRegex(text.lower(), r"windows smartscreen|smartscreen")
            self.assertTrue(parser.title.strip())

    def test_english_german_hreflang_pairs_are_reciprocal(self) -> None:
        pairs = [
            ("index.html", "de/index.html", f"{BASE}/", f"{BASE}/de/"),
            ("download/index.html", "de/download/index.html", f"{BASE}/download/", f"{BASE}/de/download/"),
            ("trail-camera-photo-sorting-software/index.html", "de/wildkamera-bilder-sortieren/index.html", f"{BASE}/trail-camera-photo-sorting-software/", f"{BASE}/de/wildkamera-bilder-sortieren/"),
            ("offline-trail-camera-software/index.html", "de/wildkamera-software-ohne-abo/index.html", f"{BASE}/offline-trail-camera-software/", f"{BASE}/de/wildkamera-software-ohne-abo/"),
            ("camera-trap-software-for-researchers/index.html", "de/kamerafallen-software-forschung/index.html", f"{BASE}/camera-trap-software-for-researchers/", f"{BASE}/de/kamerafallen-software-forschung/"),
        ]
        for en_file, de_file, en_url, de_url in pairs:
            for file_name in (en_file, de_file):
                _, parser = parse(file_name)
                links = alternates(parser)
                self.assertEqual(en_url, links.get("en"), file_name)
                self.assertEqual(de_url, links.get("de"), file_name)
                self.assertEqual(en_url, links.get("x-default"), file_name)

    def test_priority_german_pages_are_static_indexable_documents(self) -> None:
        pages = [
            "de/index.html",
            "de/wildkamera-software/index.html",
            "de/wildkamera-bilder-sortieren/index.html",
            "de/wildkamera-software-ohne-abo/index.html",
            "de/wildkamera-auswertung/index.html",
            "de/leere-wildkamera-bilder-filtern/index.html",
            "de/kamerafallen-software-forschung/index.html",
            "de/download/index.html",
        ]
        for relative in pages:
            text, parser = parse(relative)
            self.assertIn('<html lang="de">', text)
            self.assertIn('name="robots" content="index, follow', text)
            self.assertGreater(len(re.sub(r"<[^>]+>", " ", text).split()), 250, relative)
            canonicals = [l.get("href") for l in parser.links if l.get("rel") == "canonical"]
            self.assertEqual(1, len(canonicals), relative)
            self.assertEqual("traileye.eu", urlparse(canonicals[0]).netloc, relative)

    def test_sitemap_contains_all_indexable_pages_without_duplicates(self) -> None:
        tree = ET.parse(ROOT / "sitemap.xml")
        ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        urls = [node.text for node in tree.findall("s:url/s:loc", ns)]
        expected = {
            f"{BASE}/download/",
            f"{BASE}/de/",
            f"{BASE}/de/download/",
            f"{BASE}/de/wildkamera-software/",
            f"{BASE}/de/wildkamera-bilder-sortieren/",
            f"{BASE}/de/wildkamera-software-ohne-abo/",
            f"{BASE}/de/wildkamera-auswertung/",
            f"{BASE}/de/leere-wildkamera-bilder-filtern/",
            f"{BASE}/de/kamerafallen-software-forschung/",
        }
        self.assertTrue(expected.issubset(set(urls)), expected - set(urls))
        self.assertEqual(len(urls), len(set(urls)))

    def test_local_links_assets_and_structured_data_are_valid(self) -> None:
        broken: list[str] = []
        json_errors: list[str] = []
        for path in ROOT.rglob("*.html"):
            if ".git" in path.parts:
                continue
            text = path.read_text(encoding="utf-8")
            parser = HeadParser()
            parser.feed(text)
            refs = list(parser.anchors)
            refs.extend(
                match.group(1)
                for match in re.finditer(r'<(?:img|script|link)\b[^>]*(?:src|href)="([^"]+)"', text, re.IGNORECASE)
            )
            for ref in refs:
                if not ref or ref.startswith(("#", "mailto:", "https://", "http://", "data:", "javascript:")):
                    continue
                clean = ref.split("#", 1)[0].split("?", 1)[0]
                if not clean:
                    continue
                target = (ROOT / clean.lstrip("/")) if clean.startswith("/") else (path.parent / clean)
                if clean.endswith("/"):
                    target /= "index.html"
                if not target.resolve().exists():
                    broken.append(f"{path.relative_to(ROOT)} -> {ref}")
            for index, payload in enumerate(re.findall(r'<script\s+type="application/ld\+json">(.*?)</script>', text, re.DOTALL | re.IGNORECASE), 1):
                try:
                    json.loads(payload)
                except json.JSONDecodeError as exc:
                    json_errors.append(f"{path.relative_to(ROOT)} JSON-LD {index}: {exc}")
        self.assertEqual([], broken)
        self.assertEqual([], json_errors)


if __name__ == "__main__":
    unittest.main()
