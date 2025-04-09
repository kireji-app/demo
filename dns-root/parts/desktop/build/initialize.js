const {
 existsSync: itemExists,
 mkdirSync: makeFolder,
 readFileSync: readFile,
 writeFileSync: writeFile
} = require('fs')

// Write the output files.
if (!itemExists("api"))
 makeFolder("api")

// Write the output files.
if (!itemExists("public"))
 makeFolder("public")

writeFile("api/serverless.js", desktop["serverless.js"])
writeFile("public/serverless.js", desktop["serverless.js"])
writeFile("README.md", readFile("README.md", "utf-8").replace(/version-\d+\.\d+\.\d+/, "version-" + BUILD_TAGS[0]))