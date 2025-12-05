function getLinkHTML(part, filename, modifiers = "", niceName = `"${filename}"`, argumentString = "") {
 return `<div><a href=# onclick="${propertyViewer.runtimeReference}.open(event,${allParts.indexOf(part)},${part.filenames.indexOf(filename)})">&nbsp;&nbsp;${filename in Object.getPrototypeOf(part) ? "<i>" : ""}${modifiers ?? ""}${niceName}${argumentString}${filename in Object.getPrototypeOf(part) ? "</i>" : ""}</a></div><div>${part === selectedPart ? (
  // The number of whitespace characters before the filename entry in the table.
  part.domains.length + 1 +
  // The number of characters taken up by the filename itself, including quotes.
  serialize(filename).length +
  // The length of the colon and space linking the key to the value.
  2 +
  // The length of the record itself, including escape characters and outer quotes.
  serialize(part[filename]).length +
  // The comma separating this record from siblings and the following line break.
  2).toLocaleString() + " bytes" : ""}</div>`
}

const records = []
const propertyNames = new Set()
let owner = selectedPart
while (owner !== Object.prototype) {
 records.push(`<div><b>${owner === selectedPart ? "" : `from <a href=# onclick="${propertyViewer.runtimeReference}.open(event,${allParts.indexOf(owner)})">`}${owner === _ ? "ecosystem root" : owner.host}${owner === selectedPart ? "" : "</a>"}</b></div><div>${owner === selectedPart ? `<b>${serialize(owner).length.toLocaleString()} bytes</b>` : ""}</div>`)

 for (const id of owner.Property.ids) {

  /** @type {Property} */
  const property = owner.Property[id]

  if (!Object.hasOwn(owner, property.key))
   continue

  if (propertyNames.has(property.filename))
   continue

  propertyNames.add(property.filename)
  propertyNames.add(property.key)

  records.push(getLinkHTML(owner, property.filename, property.modifiers, property.niceName, property.argumentString ?? "()"))
 }

 for (const filename of owner.filenames) {

  if (propertyNames.has(filename))
   continue

  propertyNames.add(filename)

  records.push(getLinkHTML(owner, filename))
 }

 owner = Object.getPrototypeOf(owner)
}

return (
 "<h2>Serialized Properties</h2>" +
 '<part-data>' + records.join("") + "</part-data>"
)