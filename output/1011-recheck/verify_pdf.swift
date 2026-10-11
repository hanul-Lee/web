import Foundation
import PDFKit

let file = URL(fileURLWithPath: CommandLine.arguments[1])
guard let pdf = PDFDocument(url: file) else { fatalError("Cannot open generated review PDF") }
let allText = (0..<pdf.pageCount).compactMap { pdf.page(at: $0)?.string }.joined(separator: "\n")
let pageMarkers = (1...26).map { String(format: "%02d ·", $0) }
let missing = pageMarkers.filter { !allText.contains($0) }
let report: [String: Any] = ["file": file.lastPathComponent, "pageCount": pdf.pageCount, "textCharacters": allText.count, "missingReviewPageMarkers": missing, "excludedAchievementsStated": allText.contains("주요성과") && allText.contains("제외")]
let json = try JSONSerialization.data(withJSONObject: report, options: [.prettyPrinted, .sortedKeys])
print(String(data: json, encoding: .utf8)!)
assert(missing.isEmpty)
assert(pdf.pageCount > 0 && allText.count > 5000)
