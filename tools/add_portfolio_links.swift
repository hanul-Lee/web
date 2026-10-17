// Add navigation to the reviewed image-based PDF without changing page artwork.
// Usage: swift tools/add_portfolio_links.swift INPUT.pdf OUTPUT.pdf
import Foundation
import PDFKit
import AppKit
import CryptoKit

guard CommandLine.arguments.count == 3 else {
    fatalError("Usage: swift tools/add_portfolio_links.swift INPUT.pdf OUTPUT.pdf")
}
let input = URL(fileURLWithPath: CommandLine.arguments[1])
let output = URL(fileURLWithPath: CommandLine.arguments[2])
guard input.standardizedFileURL != output.standardizedFileURL,
      let pdf = PDFDocument(url: input), pdf.pageCount == 26 else {
    fatalError("Use a separate output path and the reviewed 26-page PDF")
}
let prefix = "Portfolio navigation: "
struct LinkSpec {
    let page: Int
    let rect: CGRect // Top-left coordinates in the reviewed 1920 × 1080 artwork.
    let target: Int?
    let url: String?
    let label: String
}
var specs: [LinkSpec] = []
func internalLink(_ page: Int, _ rect: CGRect, _ target: Int, _ label: String) {
    specs.append(LinkSpec(page: page, rect: rect, target: target, url: nil, label: label))
}
func externalLink(_ page: Int, _ rect: CGRect, _ url: String, _ label: String) {
    specs.append(LinkSpec(page: page, rect: rect, target: nil, url: url, label: label))
}
// Every visible navigation icon, including the resume and contents pages.
for page in 2...25 {
    internalLink(page, CGRect(x: 58, y: 30, width: 34, height: 38), 1, "표지로 이동")
    internalLink(page, CGRect(x: 98, y: 30, width: 34, height: 38), 3, "목차로 이동")
}
let contents = [(4, "통합 관리 플랫폼"), (11, "현장 안전 기록(TBM)"),
                (16, "비용·인원 ERP"), (20, "공통 UI 기준"), (24, "추가 경험")]
for (index, item) in contents.enumerated() {
    internalLink(3, CGRect(x: 118, y: 301 + index * 142, width: 1684, height: 126), item.0, item.1)
}
externalLink(2, CGRect(x: 366, y: 228, width: 252, height: 31), "mailto:hanul.designer@gmail.com", "이메일 작성")
externalLink(2, CGRect(x: 631, y: 228, width: 177, height: 31), "tel:+821092718997", "전화 걸기")
externalLink(26, CGRect(x: 110, y: 762, width: 350, height: 55), "tel:+821092718997", "전화 걸기")
externalLink(26, CGRect(x: 110, y: 835, width: 560, height: 55), "mailto:hanul.designer@gmail.com", "이메일 작성")
externalLink(26, CGRect(x: 110, y: 908, width: 840, height: 55), "https://hanul-lee.github.io/web/index.html", "포트폴리오 웹사이트")

for n in 0..<pdf.pageCount {
    let page = pdf.page(at: n)!
    for annotation in page.annotations where annotation.contents?.hasPrefix(prefix) == true {
        page.removeAnnotation(annotation)
    }
}
for spec in specs {
    let page = pdf.page(at: spec.page - 1)!
    let bounds = page.bounds(for: .mediaBox)
    precondition(abs(bounds.width / bounds.height - 16.0 / 9.0) < 0.001)
    let rect = CGRect(x: bounds.minX + spec.rect.minX / 1920 * bounds.width,
                      y: bounds.minY + (1080 - spec.rect.maxY) / 1080 * bounds.height,
                      width: spec.rect.width / 1920 * bounds.width,
                      height: spec.rect.height / 1080 * bounds.height)
    let annotation = PDFAnnotation(bounds: rect, forType: .link, withProperties: nil)
    let border = PDFBorder(); border.lineWidth = 0
    annotation.border = border
    annotation.color = .clear
    annotation.contents = prefix + spec.label
    if let target = spec.target {
        let destinationPage = pdf.page(at: target - 1)!
        let destinationBounds = destinationPage.bounds(for: .mediaBox)
        annotation.action = PDFActionGoTo(destination: PDFDestination(page: destinationPage,
            at: CGPoint(x: destinationBounds.minX, y: destinationBounds.maxY)))
    } else {
        annotation.action = PDFActionURL(url: URL(string: spec.url!)!)
    }
    page.addAnnotation(annotation)
}
let outline = PDFOutline()
let bookmarks = [(1,"표지"),(2,"이력서"),(3,"목차"),(4,"01 통합 관리 플랫폼"),
                 (11,"02 현장 안전 기록(TBM)"),(16,"03 비용·인원 ERP"),
                 (20,"04 공통 UI 기준"),(24,"추가 경험 · 모바일 인트라넷"),
                 (25,"추가 경험 · 개인 칸반 프로토타입"),(26,"연락처")]
for (index, item) in bookmarks.enumerated() {
    let node = PDFOutline(); node.label = item.1
    let page = pdf.page(at: item.0 - 1)!
    node.destination = PDFDestination(page: page, at: CGPoint(x: 0, y: page.bounds(for: .mediaBox).maxY))
    outline.insertChild(node, at: index)
}
pdf.outlineRoot = outline
try FileManager.default.createDirectory(at: output.deletingLastPathComponent(), withIntermediateDirectories: true)
guard pdf.write(to: output), let saved = PDFDocument(url: output), let original = PDFDocument(url: input) else {
    fatalError("Failed to write/reopen PDF")
}
precondition(saved.pageCount == 26 && saved.outlineRoot?.numberOfChildren == bookmarks.count)
var checked = 0
for spec in specs {
    let page = saved.page(at: spec.page - 1)!
    let annotations = page.annotations.filter { $0.contents == prefix + spec.label }
    precondition(annotations.count == 1, "Missing/duplicate annotation: \(spec.label)")
    let annotation = annotations[0]
    precondition(page.bounds(for: .mediaBox).contains(annotation.bounds), "Link outside page")
    precondition(page.annotation(at: CGPoint(x: annotation.bounds.midX, y: annotation.bounds.midY)) != nil)
    if let target = spec.target {
        guard let action = annotation.action as? PDFActionGoTo, let targetPage = action.destination.page else {
            fatalError("Missing GoTo destination")
        }
        precondition(saved.index(for: targetPage) + 1 == target, "Wrong destination: \(spec.label)")
    } else {
        guard let action = annotation.action as? PDFActionURL else { fatalError("Missing URL action") }
        precondition(action.url?.absoluteString == spec.url, "Wrong URL")
    }
    checked += 1
}
// Exercise the same GoTo actions used by a PDF reader.
let view = PDFView(frame: NSRect(x: 0, y: 0, width: 960, height: 540))
view.document = saved
view.displayMode = .singlePage
var executed = 0
for n in 0..<saved.pageCount {
    let page = saved.page(at: n)!
    for annotation in page.annotations {
        guard let action = annotation.action as? PDFActionGoTo,
              let target = action.destination.page else { continue }
        view.go(to: page)
        view.perform(action)
        precondition(view.currentPage === target, "PDF reader navigation failed")
        executed += 1
    }
}
precondition(executed == specs.filter { $0.target != nil }.count)

// Compare the actual rendered pixels on all pages before/after annotation insertion.
func pixels(_ page: PDFPage) -> Data {
    let bounds = page.bounds(for: .mediaBox), width = 960
    let height = Int((CGFloat(width) / bounds.width * bounds.height).rounded())
    let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: width, pixelsHigh: height,
        bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
        colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)
    let context = NSGraphicsContext.current!.cgContext
    context.setFillColor(NSColor.white.cgColor)
    context.fill(CGRect(x: 0, y: 0, width: width, height: height))
    let scale = CGFloat(width) / bounds.width
    context.scaleBy(x: scale, y: scale)
    page.draw(with: .mediaBox, to: context)
    NSGraphicsContext.restoreGraphicsState()
    return Data(bytes: rep.bitmapData!, count: rep.bytesPerRow * rep.pixelsHigh)
}
for n in 0..<26 {
    let a = original.page(at: n)!.bounds(for: .mediaBox), b = saved.page(at: n)!.bounds(for: .mediaBox)
    precondition(abs(a.width - b.width) < 0.001 && abs(a.height - b.height) < 0.001)
    precondition(SHA256.hash(data: pixels(original.page(at: n)!)) == SHA256.hash(data: pixels(saved.page(at: n)!)),
        "Page \(n + 1) artwork changed")
}
let report: [String: Any] = ["pageCount": 26, "links": checked, "internalLinks": 53,
    "externalLinks": 5, "bookmarks": bookmarks.count, "pixelIdenticalPages": 26,
    "executedInternalActions": executed,
    "contentsTargets": contents.map { $0.0 }, "output": output.path,
    "linksByPage": (1...26).map { number in
        ["page": number, "links": specs.filter { $0.page == number }.map { spec -> [String: Any] in
            var record: [String: Any] = ["label": spec.label]
            if let target = spec.target { record["targetPage"] = target }
            if let url = spec.url { record["url"] = url }
            return record
        }] as [String: Any]
    }]
try JSONSerialization.data(withJSONObject: report, options: [.prettyPrinted, .sortedKeys])
    .write(to: output.deletingPathExtension().appendingPathExtension("links.json"))
print("PASS: \(checked) links, \(bookmarks.count) bookmarks, 26 visually identical pages")
