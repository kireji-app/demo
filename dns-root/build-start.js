_.prototype.startBuild.call(_)

for (const tld of _.subdomains)
 for (const apex of _[tld].subdomains) {
  /** @type {IApplication} */
  const application = _[tld][apex].www
  if (application) {
   _.applications[application.host] = application
   if (application.prototype.host !== "error-501.core.parts")
    _.liveApplications[application.host] = application
  }
 }

openLog(1, "Installing Facets")
for (const subpart of desktop)
 if (subpart.prototype.host === "facet.core.parts")
  subpart.install()
closeLog(1, true)

Object.defineProperties(_, {
 "..": { value: null }
})