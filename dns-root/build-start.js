_.prototype.startBuild.call(_)

for (const tld of _.subdomains)
 for (const apex of _[tld].subdomains)
  if (_[tld][apex].www)
   _.applications["www." + apex + "." + tld] = _[tld][apex].www

openLog(1, "Installing Facets")
for (const subpart of desktop)
 if (subpart.prototype.host === "facet.core.parts")
  subpart.install()
closeLog(1, true)

Object.defineProperties(_, {
 "..": { value: null }
})