// The part.size begins at 1n, representing an empty segment (zero characters).

const m = Framework.maxSegmentLength

// Create this part's m subparts
for (let i = 0; i < m; i++) {

 // We insert a bunch of character parts which are just selections between r states.
 part.insert("character" + i, "character", i, part.size)

 // This performs the work of computing a geometric series.
 part.size *= 1n + part[i].size
}

part.stringify = (LAYER = root.primaryLayer) => {

 // Convert the character part objects back into a segment.
 return [...part].map(subpart => subpart.stringify(LAYER)).join("")
}

part.parse = (LAYER, segment) => {

 // Break the segment into an array of its valid character indices.
 const codes = [...segment].map(segment => BigInt(Framework.segmentRadix.indexOf(segment))).filter(index => index !== -1n)

 // Get the number of valid characters.
 const k = codes.length

 // Get the offset to access the length-based plane of the address space.
 part.state[LAYER] = k ? part[k - 1].offset : 0n

 // Assign child states and obtain the in-plane amount.
 for (const subpart of part) {
  if (subpart.index < k) part.state[LAYER] += (subpart.state[LAYER] = codes[subpart.index]) * subpart.offset
  else subpart.clear(LAYER)
 }

 return part.state[LAYER]
}

part.clear = LAYER => {
 for (const subpart of part)
  subpart.clear(LAYER)

 part.state[LAYER] = -1n
}