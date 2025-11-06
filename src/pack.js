const boilerplate = ƒ.toString()

const sourceFile = new SourceMappedFile("../", undefined, `${_.codename}.js`)
sourceFile.addSection(boilerplate, sourceFile.addSource("build.js", boilerplate))
sourceFile.addSection(`\nƒ(${JSON.stringify(_, (k, v) => {
 if (typeof v === "bigint")
  return v.toString() + "n"

 if (INCLUDE_EARLY_ASSETS)
  return v

 if (k.startsWith("early-") || k.startsWith("*early-"))
  return undefined

 return v
}, 1)})`, sourceFile.addSource(property.filename, property.content))
const script = sourceFile.packAndMap()
return script