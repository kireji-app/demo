super()

if (!Array.isArray(ADDENDS))
 throw new RangeError(`disjunction expected array of addends (got ${typeof ADDENDS}) (${this.uid})`)

this.size = ADDENDS.reduce((size, addend, i) => {
 const instance = this.appendInstance(addend)
 instance.i = i
 instance.offset = size
 return size + instance.size
}, 0n)

this.choice = []