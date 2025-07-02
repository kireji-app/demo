_.prototype.startBuild.call(_)

if (environment === "build") {
 openLog(1, "Writing Output Files")
 let outputJS
 const { writeFileSync: writeFile, existsSync: itemExists, mkdirSync: makeFolder, rmSync: removeFile } = require("fs")
 if (!itemExists("api")) makeFolder("api")
 else if (itemExists("api/service.js")) removeFile(`api/service.js`)
 outputJS = _["service.js"]
 writeFile("api/service.js", outputJS)
 log(2, `./api/service.js`)
 closeLog(1, true)
 logStringSize(0, outputJS)
}

logEntropy(0, ...instances)

openLog(0, "Installing Facets")
for (const subpart of desktop)
 if (subpart.prototype.host === "facet.core.parts")
  subpart.install()
closeLog(0, true)

Object.defineProperties(_, {
 routeIDs: { value: [[]], writable: true },
 "..": { value: null }
})