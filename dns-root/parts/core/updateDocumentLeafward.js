if (part.state[LAYER] !== -1n) {
 await part.updateDocument(LAYER)
 console.log(part.host + ' leafward')
 if (typeof part.onupdatedocument === "function") {
  console.log(part.host + ' calls update document leafward')
  await part.onupdatedocument()
 }
}