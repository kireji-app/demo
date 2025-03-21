if (part.state[LAYER] !== -1n) {

 await part.updateDocument(LAYER)

 if (typeof part.onupdatedocument === "function")
  await part.onupdatedocument()

}