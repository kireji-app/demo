const {
 existsSync: itemExists,
 mkdirSync: makeFolder,
 readFileSync: readFile,
 writeFileSync: writeFile
} = require('fs')

// Write the output files.
if (!itemExists("api"))
 makeFolder("api")

writeFile("api/serverless.js", desktop["serverless.js"])
writeFile("api/dns-root.json", serialize(BUILD_STRING_COLLECTION))
writeFile("README.md", readFile("README.md", "utf-8").replace(/version-\d+\.\d+\.\d+/, "version-" + BUILD_TAGS[0]))