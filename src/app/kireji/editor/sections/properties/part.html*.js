const
 propertyNames = new Set(),
 getLinkHTML = (subject, data) => {
  const isProperty = data instanceof subject.Property
  /** @type {Property} */
  const subjectProperty = isProperty ? data : null
  const filename = isProperty ? subjectProperty.filename : data
  const modifiers = isProperty ? subjectProperty.modifiers : ""
  const niceName = isProperty ? subjectProperty.niceName : `"${filename}"`
  const args = isProperty ? subject.manifest[subjectProperty.id] ?? null : null
  const isAlias = isProperty && subjectProperty.isAlias
  const isView = isProperty && subjectProperty.isView
  const isGenerated = isProperty && subjectProperty.isGenerated

  return `<div>&nbsp;&nbsp;<a ${editor.pointAttr("point", allParts.indexOf(subject), subject.filenames.indexOf(filename))} href="/">${filename in Object.getPrototypeOf(subject) ? "<i>" : ""}${!isAlias && modifiers ? `<span class=modifier>${modifiers}</span>` : ""}${!isAlias && modifiers === "get " ? `<span class=readonly>${niceName}</span>` : !isAlias && (isView || args) ? `<span class=function>${niceName}</span>` : `<span class=string>${isAlias ? `"${niceName}"` : niceName}</span>`}${!isAlias && (isView || isGenerated || args) ? `<span class=modifier>(</span>${(isView || isGenerated) ? "" : args.map(arg => `<span class=readonly>${arg}</span>`).join("<span class=modifier>, </span>")}<span class=modifier>)</span>` : ""}${filename in Object.getPrototypeOf(subject) ? "</i>" : ""}</a></div>${subject === activePart ? "<div>" + (
   // The number of whitespace characters before the filename entry in the table.
   subject.domains.length + 1 +
   // The number of characters taken up by the filename itself, including quotes.
   serialize(filename).length +
   // The length of the colon and space linking the key to the value.
   2 +
   // The length of the record itself, including escape characters and outer quotes.
   serialize(subject[filename]).length +
   // The comma separating the record from siblings and the following line break.
   2).toLocaleString() + " bytes</div>" : ""}`
 },
 createRecordsHTML = subject => {

  const records = []

  const isActivePart = subject === activePart

  records.push(`<div><b>${isActivePart ? "" : `extends <a ${editor.pointAttr("point", allParts.indexOf(subject))} href="/">`}${subject === _ ? "ecosystem" : subject.host}${isActivePart ? "" : "</a>"}</b></div>${isActivePart ? `<div><b>${serialize(subject).length.toLocaleString()} bytes</b></div>` : ""}`)

  if (isActivePart)
   for (const key of activePart.subdomains) {
    /** @type {IPartAny} */
    const childPart = activePart[key]
    records.push(`<div>&nbsp;&nbsp;<a ${editor.pointAttr("point", allParts.indexOf(childPart))} href="/">${childPart.isAbstract ? "<i>" : ""}<b>${childPart.key}</b>${childPart.isAbstract ? "</i>" : ""}</a></div><div><b>${serialize(childPart).length.toLocaleString()} bytes</b></div>`)
   }

  for (const id of subject.Property.ids) {

   /** @type {Property} */
   const subjectProperty = subject.Property[id]

   if (!Object.hasOwn(subject, subjectProperty.key) || propertyNames.has(subjectProperty.filename))
    continue

   propertyNames.add(subjectProperty.filename)
   propertyNames.add(subjectProperty.key)

   records.push(getLinkHTML(subject, subjectProperty))
  }

  for (const filename of subject.filenames) {

   if (propertyNames.has(filename))
    continue

   propertyNames.add(filename)

   records.push(getLinkHTML(subject, filename))
  }

  return `${isActivePart ? "" : "<hr>"}<part-${isActivePart ? "table" : "rows"}>${records.join("")}</part-${isActivePart ? "table" : "rows"}>`
 },
 recordHTML = [createRecordsHTML(activePart)]

let prototype = activePart.prototype
while (prototype !== Object.prototype) {
 recordHTML.push(createRecordsHTML(prototype))
 prototype = prototype.prototype
}

return recordHTML.join("")