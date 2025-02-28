if (!Array.isArray(ADDENDS))
 throw new RangeError(`disjunction expected array of addends (got ${typeof ADDENDS}) (${part.host})`)

part.addends = ADDENDS
part.choice = []
part.size = ADDENDS.reduce((size, addend, index) => size + part.insert(addend, index, size).size, 0n)