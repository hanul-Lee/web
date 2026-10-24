"""Add navigation to the 26-page portfolio without rewriting page artwork.

Usage: python3 tools/add_portfolio_links.py INPUT.pdf OUTPUT.pdf
Requires pypdf. Link rectangles use the artwork's 1920 x 1080 coordinates.
"""
import json
import sys
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.annotations import Link
from pypdf.generic import ArrayObject, Fit, FloatObject, NameObject, TextStringObject


def main():
    source, output = map(Path, sys.argv[1:])
    assert source.resolve() != output.resolve(), "Use a separate output file"
    reader = PdfReader(source)
    assert len(reader.pages) == 26, "Expected the reviewed 26-page portfolio"
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)
    prefix = "Portfolio navigation: "
    specs = []

    for page in writer.pages:
        annotations = page.get("/Annots", [])
        retained = [ref for ref in annotations if not str(ref.get_object().get("/Contents", "")).startswith(prefix)]
        if annotations:
            page[NameObject("/Annots")] = ArrayObject(retained)

    def add(page, rect, label, target=None, url=None):
        x, y, width, height = rect
        bounds = writer.pages[page - 1].mediabox
        sx, sy = float(bounds.width) / 1920, float(bounds.height) / 1080
        scaled = (float(bounds.left) + x * sx,
                  float(bounds.bottom) + (1080 - y - height) * sy,
                  float(bounds.left) + (x + width) * sx,
                  float(bounds.bottom) + (1080 - y) * sy)
        options = {"url": url} if url else {
            "target_page_index": target - 1,
            "fit": Fit.fit_horizontally(float(writer.pages[target - 1].mediabox.top)),
        }
        annotation = Link(rect=scaled, border=ArrayObject([FloatObject(0)] * 3), **options)
        annotation[NameObject("/Contents")] = TextStringObject(prefix + label)
        added = writer.add_annotation(page - 1, annotation)
        if target is not None:
            # Local destinations must reference a page object, not a page number.
            added[NameObject("/Dest")] = ArrayObject([
                writer.pages[target - 1].indirect_reference,
                NameObject("/FitH"),
                FloatObject(writer.pages[target - 1].mediabox.top),
            ])
        specs.append({"page": page, "rect": list(scaled), "label": label,
                      **({"url": url} if url else {"targetPage": target})})

    for page in range(2, 26):
        add(page, (58, 30, 34, 38), "표지로 이동", target=1)
        add(page, (98, 30, 34, 38), "목차로 이동", target=3)
    contents = [(4, "통합 관리 플랫폼"), (11, "현장 안전 기록(TBM)"),
                (16, "비용·인원 ERP"), (20, "공통 UI 기준"), (24, "추가 경험")]
    for i, (target, label) in enumerate(contents):
        add(3, (118, 301 + i * 142, 1684, 126), label, target=target)
    add(2, (366, 228, 252, 31), "이메일 작성", url="mailto:hanul.designer@gmail.com")
    add(2, (631, 228, 177, 31), "전화 걸기", url="tel:+821092718997")
    add(26, (110, 762, 350, 55), "전화 걸기", url="tel:+821092718997")
    add(26, (110, 835, 560, 55), "이메일 작성", url="mailto:hanul.designer@gmail.com")
    add(26, (110, 908, 840, 55), "포트폴리오 웹사이트",
        url="https://hanul-lee.github.io/web/index.html")

    if "/Outlines" in writer.root_object:
        del writer.root_object[NameObject("/Outlines")]
    bookmarks = [(1, "표지"), (2, "이력서"), (3, "목차"), (4, "01 통합 관리 플랫폼"),
                 (11, "02 현장 안전 기록(TBM)"), (16, "03 비용·인원 ERP"),
                 (20, "04 공통 UI 기준"), (24, "추가 경험 · 모바일 인트라넷"),
                 (25, "추가 경험 · 개인 칸반 프로토타입"), (26, "연락처")]
    for target, title in bookmarks:
        writer.add_outline_item(title, target - 1,
                                fit=Fit.fit_horizontally(float(writer.pages[target - 1].mediabox.top)))
    output.parent.mkdir(parents=True, exist_ok=True)
    writer.write(output)

    saved = PdfReader(output)
    assert len(saved.pages) == 26
    assert len(saved.outline) == len(bookmarks)
    page_ids = {p.indirect_reference.idnum: i + 1 for i, p in enumerate(saved.pages)}
    for n, (before, after) in enumerate(zip(reader.pages, saved.pages), 1):
        assert before.mediabox == after.mediabox, f"Page {n} size changed"
        assert before.get_contents().get_data() == after.get_contents().get_data(), f"Page {n} artwork changed"
    for spec in specs:
        annotations = [ref.get_object() for ref in saved.pages[spec["page"] - 1].get("/Annots", [])]
        found = [a for a in annotations if a.get("/Contents") == prefix + spec["label"]]
        assert len(found) == 1
        a = found[0]
        assert all(abs(float(actual) - expected) < 0.00001
                   for actual, expected in zip(a["/Rect"], spec["rect"]))
        if "url" in spec:
            assert a["/A"]["/URI"] == spec["url"]
        else:
            assert page_ids[a["/Dest"][0].idnum] == spec["targetPage"]
    report = {"pageCount": 26, "links": len(specs), "internalLinks": 53,
              "externalLinks": 5, "bookmarks": len(bookmarks), "linksByPage": specs}
    output.with_suffix(".links.json").write_text(json.dumps(report, ensure_ascii=False, indent=2))
    print("PASS: 58 links, 10 bookmarks, page artwork streams preserved")


if __name__ == "__main__":
    main()
