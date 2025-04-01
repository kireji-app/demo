if (Framework.environment === "build") {
 const { existsSync: itemExists, mkdirSync: makeFolder, readFileSync: readFile, writeFileSync: writeFile } = require('fs')

 // Write the output files.
 if (!itemExists("api"))
  makeFolder("api")

 writeFile("api/portable.js", Framework.portableString)
 writeFile("README.md", readFile("README.md", "utf-8").replace(/version-\d+\.\d+\.\d+/, "version-" + BUILD.tags[0]))
}