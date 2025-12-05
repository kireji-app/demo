const boilerplate = ƒ.toString()

const sourceFile = new SourceMappedFile("../", undefined, "build.js")
sourceFile.addSection(boilerplate, sourceFile.addSource("build.js", boilerplate))
sourceFile.addSection(`\nƒ(${JSON.stringify(_, (k, v) => {
 if (typeof v === "bigint")
  return v.toString() + "n"

 return v

}, 1)})`, sourceFile.addSource(property.filename, property.content))
const script = sourceFile.packAndMap()
return script