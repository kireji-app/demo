const sourceFile = new SourceMappedFile("../", undefined, "service.js")
sourceFile.addSection(boot.toString(), sourceFile.addSource("build.js", boot.toString()))
sourceFile.addSection(`\nboot(${serialize(root)})`, sourceFile.addSource(property.filename, property.content))
return sourceFile.packAndMap()