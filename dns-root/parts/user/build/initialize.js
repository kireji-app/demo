const {
 existsSync: itemExists,
 mkdirSync: makeFolder,
 readFileSync: readFile,
 writeFileSync: writeFile
} = require('fs')

// Write the output files.
if (!itemExists("api"))
 makeFolder("api")

writeFile("api/serverless.js", user["serverless.js"])
writeFile("README.md", readFile("README.md", "utf-8").replace(/version-\d+\.\d+\.\d+/, "version-" + _BUILD.version))