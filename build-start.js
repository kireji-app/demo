_.prototype.startBuild.call(_)


if (environment === "server") {
 openLog(1, "Creating Script")
 logStringSize(1, _["kireji.js"])
 closeLog(1, true)
}

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