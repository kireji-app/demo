const
 propertyNames = new Set(),
 getLinkHTML = (part, filename, modifiers = "", niceName = `"${filename}"`, argumentString = "") => {
  return `<div>&nbsp;&nbsp;<a href="/" onpointerdown="${editor.runtimeReference}.point(event,this,${allParts.indexOf(part)},${part.filenames.indexOf(filename)})">${filename in Object.getPrototypeOf(part) ? "<i>" : ""}${modifiers ?? ""}${niceName}${argumentString}${filename in Object.getPrototypeOf(part) ? "</i>" : ""}</a></div>${part === selectedPart ? "<div>" + (
   // The number of whitespace characters before the filename entry in the table.
   part.domains.length + 1 +
   // The number of characters taken up by the filename itself, including quotes.
   serialize(filename).length +
   // The length of the colon and space linking the key to the value.
   2 +
   // The length of the record itself, including escape characters and outer quotes.
   serialize(part[filename]).length +
   // The comma separating this record from siblings and the following line break.
   2).toLocaleString() + " bytes</div>" : ""}`
 },
 createRecordsHTML = part => {

  const records = []

  const isSelectedPart = part === selectedPart

  records.push(`<div><b>${isSelectedPart ? "" : `extends <a href="/" onpointerdown="${editor.runtimeReference}.point(event,this,${allParts.indexOf(part)})">`}${part === _ ? "ecosystem" : part.host}${isSelectedPart ? "" : "</a>"}</b></div>${isSelectedPart ? `<div><b>${serialize(part).length.toLocaleString()} bytes</b></div>` : ""}`)

  if (isSelectedPart)
   for (const key of selectedPart.subdomains) {
    /** @type {IPartAny} */
    const childPart = selectedPart[key]
    records.push(`<div>&nbsp;&nbsp;<a href="/" onpointerdown="${editor.runtimeReference}.point(event,this,${allParts.indexOf(childPart)})">${childPart.isAbstract ? "<i>" : ""}<b>${childPart.key}</b>${childPart.isAbstract ? "</i>" : ""}</a></div><div><b>${serialize(childPart).length.toLocaleString()} bytes</b></div>`)
   }

  for (const id of part.Property.ids) {

   /** @type {Property} */
   const property = part.Property[id]

   if (!Object.hasOwn(part, property.key))
    continue

   if (propertyNames.has(property.filename))
    continue

   propertyNames.add(property.filename)
   propertyNames.add(property.key)

   records.push(getLinkHTML(part, property.filename, property.modifiers, property.niceName, property.argumentString ?? "()"))
  }

  for (const filename of part.filenames) {

   if (propertyNames.has(filename))
    continue

   propertyNames.add(filename)

   records.push(getLinkHTML(part, filename))
  }

  return `${isSelectedPart ? "" : "<hr>"}<part-${isSelectedPart ? "table" : "rows"}>${records.join("")}</part-${isSelectedPart ? "table" : "rows"}>`
 },
 recordHTML = [`<h2>Serialized Properties</h2>${createRecordsHTML(selectedPart)}`]

let prototype = selectedPart.prototype
while (prototype !== Object.prototype) {
 recordHTML.push(createRecordsHTML(prototype))
 prototype = prototype.prototype
}

return recordHTML.join("")