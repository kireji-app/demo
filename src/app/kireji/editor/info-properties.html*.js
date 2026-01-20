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

  return `<div>&nbsp;&nbsp;<a href="/" onpointerdown="${editor.runtimeReference}.point(event,this,${allParts.indexOf(subject)},${subject.filenames.indexOf(filename)})">${filename in Object.getPrototypeOf(subject) ? "<i>" : ""}${!isAlias && modifiers ? `<span class=modifier>${modifiers}</span>` : ""}${!isAlias && modifiers === "get " ? `<span class=readonly>${niceName}</span>` : !isAlias && (isView || args) ? `<span class=function>${niceName}</span>` : `<span class=string>${isAlias ? `"${niceName}"` : niceName}</span>`}${!isAlias && (isView || isGenerated || args) ? `<span class=modifier>(</span>${(isView || isGenerated) ? "" : args.map(arg => `<span class=readonly>${arg}</span>`).join("<span class=modifier>, </span>")}<span class=modifier>)</span>` : ""}${filename in Object.getPrototypeOf(subject) ? "</i>" : ""}</a></div>${subject === selectedPart ? "<div>" + (
   // The number of whitespace characters before the filename entry in the table.
   subject.domains.length + 1 +
   // The number of characters taken up by the filename itself, including quotes.
   serialize(filename).length +
   // The length of the colon and space linking the key to the value.
   2 +
   // The length of the record itself, including escape characters and outer quotes.
   serialize(subject[filename]).length +
   // The comma separating this record from siblings and the following line break.
   2).toLocaleString() + " bytes</div>" : ""}`
 },
 createRecordsHTML = subject => {

  const records = []

  const isSelectedPart = subject === selectedPart

  records.push(`<div><b>${isSelectedPart ? "" : `extends <a href="/" onpointerdown="${editor.runtimeReference}.point(event,this,${allParts.indexOf(subject)})">`}${subject === _ ? "ecosystem" : subject.host}${isSelectedPart ? "" : "</a>"}</b></div>${isSelectedPart ? `<div><b>${serialize(subject).length.toLocaleString()} bytes</b></div>` : ""}`)

  if (isSelectedPart)
   for (const key of selectedPart.subdomains) {
    /** @type {IPartAny} */
    const childPart = selectedPart[key]
    records.push(`<div>&nbsp;&nbsp;<a href="/" onpointerdown="${editor.runtimeReference}.point(event,this,${allParts.indexOf(childPart)})">${childPart.isAbstract ? "<i>" : ""}<b>${childPart.key}</b>${childPart.isAbstract ? "</i>" : ""}</a></div><div><b>${serialize(childPart).length.toLocaleString()} bytes</b></div>`)
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

  return `${isSelectedPart ? "" : "<hr>"}<part-${isSelectedPart ? "table" : "rows"}>${records.join("")}</part-${isSelectedPart ? "table" : "rows"}>`
 },
 recordHTML = [`<summary onpointerdown=${editor.settings.runtimeReference}.point(event,this)>Serialized Properties</summary>${createRecordsHTML(selectedPart)}`]

let prototype = selectedPart.prototype
while (prototype !== Object.prototype) {
 recordHTML.push(createRecordsHTML(prototype))
 prototype = prototype.prototype
}

return recordHTML.join("")