const {
 existsSync: itemExists,
 mkdirSync: makeFolder,
 writeFileSync: writeFile
} = require('fs')

if (!itemExists("api"))
 makeFolder("api")

writeFile("api/serverless.js", user["serverless.js"])
writeFile("README.md", build.readme)