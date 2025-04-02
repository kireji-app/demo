let binaryValue = "0b0"
let binaryOffset = "0b0"

for (const char of STRING) {
 const index = Framework.pathSegmentRadix.indexOf(char)
 if (index === -1 || index >= 64) {
  warn("ignoring unused path (paths cannot include '" + char + "').")
  binaryValue = "0b0"
  binaryOffset = "0b0"
  break;
 }
 binaryValue += index.toString(2).padStart(6, 0)
 binaryOffset += "000001"
}

return BigInt(binaryValue) + BigInt(binaryOffset) - 1n