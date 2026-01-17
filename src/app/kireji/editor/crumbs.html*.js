function generateCrumb(part, filename) {
 return `<a href="/" onpointerdown="${editor.runtimeReference}.point(event,this,${allParts.indexOf(part)}${filename ? "," + part.filenames.indexOf(filename) : ""})">${filename ?? (part === _ ? "ecosystem" : part.key)}</a>`
}

if (selectedPart) {
 const crumbs = []

 let part = selectedPart

 if (selectedTab.filename)
  crumbs.push(generateCrumb(selectedPart, selectedTab.filename))

 while (part) {
  crumbs.push(generateCrumb(part))
  part = part[".."]
 }

 return crumbs.reverse().join(`<span></span>`)
}

return ""