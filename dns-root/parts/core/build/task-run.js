Framework.log(0, "Running build task...")

const {
 existsSync: itemExists,
 mkdirSync: makeFolder,
 readFileSync: readFile,
 writeFileSync: writeFile
} = require('fs')

if (!itemExists(Framework.outputRoot))
 makeFolder(Framework.outputRoot)

writeFile(Framework.outputRoot + "/endpoint.js", Framework.compile())
writeFile("README.md", readFile("README.md", "utf-8").replace(/version-\d+\.\d+\.\d+/, "version-" + BUILD.tags[0]))