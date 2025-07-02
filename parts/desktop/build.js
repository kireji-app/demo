Object.defineProperties(desktop, {
 theme: { value: getPartFromDomains(_.themeHost.split(".")), writable: true },
 themes: { value: [] },
 themeHosts: { value: {} },
 wallpaper: { value: environment === "window" ? document.querySelector("wallpaper-") : null },
})

for (const tld of _.subdomains)
 for (const apex of _[tld].subdomains)
  if (_[tld][apex].www)
   desktop.themes.push(desktop.themeHosts["www." + apex + "." + tld] = _[tld][apex].www)