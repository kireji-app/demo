const sourceFile = new SourceMappedFile("../", undefined, "service.js")
sourceFile.addSection(ƒ.toString(), sourceFile.addSource("build.js", ƒ.toString()))
sourceFile.addSection(`\nƒ(${serialize(_)})`, sourceFile.addSource(property.filename, property.content))
return sourceFile.packAndMap()