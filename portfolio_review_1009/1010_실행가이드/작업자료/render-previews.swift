import AppKit
import Foundation
import CoreGraphics

let output = URL(fileURLWithPath: CommandLine.arguments[1])
let layouts = output.appendingPathComponent("배치도")
var bounds = CGRect(x: 0, y: 0, width: 1920, height: 1080)
let pdfURL = output.appendingPathComponent("26쪽_수정배치_가이드.pdf")
guard let pdf = CGContext(pdfURL as CFURL, mediaBox: &bounds, nil) else {
    fatalError("Could not create layout PDF")
}
for n in 1...26 {
    let name = String(format: "%02d", n)
    guard let source = NSImage(contentsOf: layouts.appendingPathComponent("\(name).svg")) else {
        fatalError("Could not read layout \(name)")
    }
    let preview = NSImage(size: NSSize(width: 1920, height: 1080))
    preview.lockFocus()
    source.draw(in: NSRect(x: 0, y: 0, width: 1920, height: 1080))
    preview.unlockFocus()
    let rep = NSBitmapImageRep(data: preview.tiffRepresentation!)!
    try rep.representation(using: .png, properties: [:])!.write(to: layouts.appendingPathComponent("\(name).png"))
    pdf.beginPDFPage(nil)
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(cgContext: pdf, flipped: false)
    source.draw(in: bounds)
    NSGraphicsContext.restoreGraphicsState()
    pdf.endPDFPage()
}
pdf.closePDF()
print("Created 26 PNG previews and 26-page layout guide PDF")
