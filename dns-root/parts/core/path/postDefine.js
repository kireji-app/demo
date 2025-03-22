// The part.size begins at 1n, representing an empty path (zero segments).

const m = Framework.maxSegments

// Create this part's m subparts
for (let i = 0; i < m; i++) {

 // We insert a bunch of part objects which will behave like part but instead of inserting segments, segments insert characters.
 part.insert("segment" + i, "segment", i, part.size)

 // This performs the work of computing a geometric series.
 part.size *= 1n + part[i].size
}

part.stringify = (LAYER = root.primaryLayer) => {

 // Convert the segment part objects back into a path.
 return [...part].map(subpart => subpart.stringify(LAYER)).filter(segment => segment).join("/")
}

part.parse = (LAYER, path) => {

 // Break the path into segments.
 const segments = path.split(/\/+/).filter(segment => segment)

 // Get the number of segments.
 const k = segments.length

 // Get the offset to access the length-based plane of the address space.
 part.state[LAYER] = k ? part[k - 1].offset : 0n

 // Assign child states and obtain the in-plane amount.
 for (const subpart of part) {
  if (subpart.index < k) part.state[LAYER] += subpart.parse(LAYER, segments[subpart.index]) * subpart.offset
  else subpart.clear(LAYER)
 }

 return part.state[LAYER]
}

part.clear = LAYER => {
 for (const subpart of part)
  subpart.clear(LAYER)

 part.state[LAYER] = -1n
}