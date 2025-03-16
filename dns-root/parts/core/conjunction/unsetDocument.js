for (const subpart of part) {
 if (typeof subpart.onunsetdocument === "function")
  await subpart.onunsetdocument()
 await subpart.unsetDocument(LAYER)
}