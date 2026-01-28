function generateCrumb(part, filename) {
 return `<a ${editor.pointAttr("point", allParts.indexOf(part), ...(filename ? [part.filenames.indexOf(filename)] : []))} href="/">${filename ?? (part === _ ? "ecosystem" : part.key)}</a>`
}

if (activePart) {
 const crumbs = []

 let part = activePart

 if (activeTab.filename)
  crumbs.push(generateCrumb(activePart, activeTab.filename))

 while (part) {
  crumbs.push(generateCrumb(part))
  part = part[".."]
 }

 return crumbs.reverse().join(`<span></span>`)
}

return ""