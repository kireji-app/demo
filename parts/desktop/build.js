globalThis.desktop = part

Object.defineProperties(desktop, {
 themes: { value: [] },
 themeHosts: { value: {} }
})

for (const tld of root.subdomains)
 for (const apex of root[tld].subdomains)
  if (root[tld][apex].www)
   desktop.themes.push(desktop.themeHosts["www." + apex + "." + tld] = root[tld][apex].www)