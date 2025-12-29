let index = 0

if (INITIAL_VALUE === undefined) {
 INITIAL_VALUE = part.subparts[0]
 index = 1
}

for (; index < part.subparts.length; index++) {
 const subpart = part.subparts[index]
 INITIAL_VALUE = REDUCE_FUNCTION(INITIAL_VALUE, subpart, subpart.index, part)
}

return INITIAL_VALUE