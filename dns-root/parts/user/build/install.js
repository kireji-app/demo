const {
 existsSync: itemExists,
 mkdirSync: makeFolder,
 writeFileSync: writeFile
} = require('fs')

if (!itemExists("api"))
 makeFolder("api")

writeFile("api/service.js", user["service.js"])
writeFile("README.md", build.readme)