const sourceFile = new Framework.SourceMappedFile("../", undefined, "serverless.js")
const externalSource = sourceFile.addSource("framework.js", Framework.sourceCode)
const internalSource = sourceFile.addSource(methodData.stringName, methodData.content)
sourceFile.addSection(Framework.sourceCode, externalSource)
sourceFile.addSection(`

Framework.initialize(${JSON.stringify(Object.fromEntries(GLOBE_KEYS.map(key => [key, globe[key]])), null, 1)})`, internalSource)
return sourceFile.packAndMap()