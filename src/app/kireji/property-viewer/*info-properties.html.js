const propertyKeys = new Set()
const recordTable = []

for (const id of selectedPart.Property.ids) {

 /** @type {Property} */
 const property = selectedPart.Property[id]

 if (!Object.hasOwn(selectedPart, property.key))
  continue

 if (/\.(png|gif)(\.js)?$/.test(property.filename))
  continue

 propertyKeys.add(property.filename)
 propertyKeys.add(property.key)


 const isNew = !(selectedPart.prototype && (property.key in selectedPart.prototype))

 recordTable.push(`<details><summary>${isNew ? "<b>" : ""}<code>${property.modifiers ?? ""}${property.niceName}${property.argumentString ?? "()"}</code>${isNew ? "</b>" : ""}</summary>` +
  `<pre>${sanitizeAttr(property.content)}</pre></details>`)
}

for (const filename of selectedPart.filenames) {

 if (propertyKeys.has(filename))
  continue

 if (/\.(png|gif)(\.js)?$/.test(filename))
  continue

 propertyKeys.add(filename)

 const isNew = !(selectedPart.prototype && (filename in selectedPart.prototype))

 recordTable.push(`<details><summary>${isNew ? "<b>" : ""}<code>"${filename}"</code>${isNew ? "</b>" : ""}</summary>` +
  `<pre>${sanitizeAttr(selectedPart[filename])}</pre></details>`)
}

return "<h2>Serialized Properties</h2>" + recordTable.join("")