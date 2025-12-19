const propertyKeys = new Set()
const recordTable = []

for (const id of selectedPart.Property.ids) {

 /** @type {Property} */
 const property = selectedPart.Property[id]

 if (!Object.hasOwn(selectedPart, property.key))
  continue

 if (!/\.(png|gif)(\.js)?$/.test(property.filename))
  continue

 propertyKeys.add(property.filename)
 propertyKeys.add(property.key)

 const isNew = !(selectedPart.prototype && (property.key in selectedPart.prototype))

 recordTable.push(`<img src="${selectedPart.placeholderImage(property.key)}">`)
}

for (const filename of selectedPart.filenames) {

 if (propertyKeys.has(filename))
  continue

 if (!/\.(png|gif)(\.js)?$/.test(filename))
  continue

 propertyKeys.add(filename)

 const isNew = !(selectedPart.prototype && (filename in selectedPart.prototype))

 recordTable.push(`<img src="${selectedPart.placeholderImage(filename)}">`)
}

return "<h2>Images</h2><div>" + recordTable.join("") + "</div>"