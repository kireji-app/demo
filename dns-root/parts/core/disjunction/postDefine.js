part.setAddends = addends => {
 if (typeof addends !== "object")
  throw new RangeError(`disjunction expected an addend object or null (got ${typeof addends} -> ${addends}) (${part.host})`)

 part.length = 0
 part.addends = addends
 part.choice = []
 part.size = Object.keys(addends).reduce((size, key, index) => size + part.insert(key, addends[key], index, size).size, 0n)
}

if (ADDENDS !== null) part.setAddends(ADDENDS)