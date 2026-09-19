import AppKit
// Dumps the raw public.html clipboard content (Figma copy payload) to the file path in argv[1].
let pb = NSPasteboard.general
guard let data = pb.data(forType: NSPasteboard.PasteboardType("public.html")) else {
    print("no public.html on clipboard")
    exit(1)
}
try! data.write(to: URL(fileURLWithPath: CommandLine.arguments[1]))
print("wrote", data.count, "bytes")
