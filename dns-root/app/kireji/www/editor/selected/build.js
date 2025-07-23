Object.defineProperties(selected, {
 cardinality: { value: BigInt(allParts.length) },
 partListener: {
  value: () => {
   debug(`ima firin' mah callback`)
   selected.replaceContent()
  }
 },
 previousPart: { value: null, writable: true }
})