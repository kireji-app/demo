_.prototype.startBuild.call(_)

const outputJS = _["service.js"]

if (environment === "build") {
 openLog(1, "Writing Output Files")
 const { writeFileSync: writeFile, existsSync: itemExists, mkdirSync: makeFolder, rmSync: removeFile } = require("fs")
 if (!itemExists("api")) makeFolder("api")
 else if (itemExists("api/service.js")) removeFile(`api/service.js`)
 writeFile("api/service.js", outputJS)
 log(2, `./api/service.js`)
 closeLog(1, true)
}

logStringSize(1, outputJS)
logEntropy(1, ...instances)

openLog(1, "Installing Facets")
for (const subpart of desktop)
 if (subpart.prototype.host === "facet.core.parts")
  subpart.install()
closeLog(1, true)

Object.defineProperties(_, {
 routeIDs: { value: [[]], writable: true },
 "..": { value: null }
})