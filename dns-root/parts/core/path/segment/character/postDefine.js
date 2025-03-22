part.size = BigInt(Framework.segmentRadix.length)

part.stringify = LAYER => {
 return Framework.segmentRadix[part.state[LAYER]] ?? ""
}

part.clear = LAYER => {
 part.state[LAYER] = -1n
}