ROUTE_ID++

let binaryValue = ""
let segment = ""
let tempRoute = ROUTE_ID
let chunkCount = 0n

while (tempRoute > 0n) {
 const chunkAddend = 2n ** (chunkCount * 6n)
 if (tempRoute >= chunkAddend) {
  tempRoute -= chunkAddend
  chunkCount++
 } else {
  break;
 }
}

let offset = 0n
for (let i = 0n; i < chunkCount; i++)
 offset += 2n ** (i * 6n)

binaryValue = (ROUTE_ID - offset).toString(2)

const finalLength = Number(chunkCount) * 6
const paddedBinaryString = binaryValue.padStart(finalLength, '0')

for (let i = 0; i < finalLength; i += 6) {
 const hexad = paddedBinaryString.slice(i, i + 6)
 segment += Framework.pathSegmentRadix[parseInt(hexad, 2)]
}

return segment