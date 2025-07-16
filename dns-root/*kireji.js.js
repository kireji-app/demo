const sourceFile = new SourceMappedFile("../", undefined, "kireji.js")
sourceFile.addSection(ƒ.toString(), sourceFile.addSource("build.js", ƒ.toString()))
sourceFile.addSection(`\nƒ(${serialize(_)})`, sourceFile.addSource(property.filename, property.content))
const script = sourceFile.packAndMap()
warn('serving script!')
return script