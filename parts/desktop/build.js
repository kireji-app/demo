Object.defineProperties(desktop, {
 themes: { value: [] },
 themeHosts: { value: {} }
})

for (const tld of _.subdomains)
 for (const apex of _[tld].subdomains)
  if (_[tld][apex].www)
   desktop.themes.push(desktop.themeHosts["www." + apex + "." + tld] = _[tld][apex].www)

desktop.theme = getPartFromDomains(_.defaultHost.split("."))