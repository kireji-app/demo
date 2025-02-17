super()

if (!Array.isArray(ADDENDS))
 throw new RangeError(`disjunction expected array of addends (got ${typeof ADDENDS}) (${this.uid})`)

this.size = ADDENDS.reduce((size, addend, i) => {
 const part = this.appendPart(addend)
 part.i = i
 part.offset = size
 return size + part.size
}, 0n)