// Memoize the permutation data.
const tabBitDepths = [0n, 0n]
const tabOffsets = [0n]
const permutationSizes = [1n]
const payloadSizes = [1n]
const partOffsets = [0, allParts.length]
const subjectCount = BigInt(allParts.reduce((subjectCount, part, i) =>
 partOffsets[i + 2] = subjectCount + part.filenames.length, allParts.length
))
const maxTabCount = subjectCount
const LSB = []
const powerFloor = 2n ** BigInt(subjectCount.toString(2).length - 1)
const payloadCardinality = 1n

let cardinality = 1n

for (let tabCount = 1n, permutationSize = 1n, payloadSize = 1n; tabCount <= subjectCount; tabCount++) {

 // Memoize a prototype LSB array to simplify initialization of Fenwick tree instances.
 LSB[tabCount - 1n] = tabCount & -tabCount

 if (tabCount > maxTabCount)
  continue

 // Increase the permutation size based on tab count.
 permutationSize *= subjectCount - tabCount + 1n

 // Increase the payload size.
 payloadSize *= payloadCardinality
 permutationSizes[tabCount] = permutationSize
 payloadSizes[tabCount] = payloadSize
 tabOffsets[tabCount] = cardinality

 // tabCount = range of active tab datum [0, k-1]
 // tabCount + 1n = range of preview tab datum
 cardinality +=
  (tabCount + 1n)
  * tabCount
  * permutationSize
  * payloadSize

 // Enable O(1) recovery of tabCount later.
 const bitDepth = cardinality.toString(2).length
 while (bitDepth > tabBitDepths.length)
  tabBitDepths.push(tabCount - 1n)
 tabBitDepths[bitDepth] = tabCount
}

tabGroup.define({
 cardinality: { value: cardinality },
 payloadCardinality: { value: payloadCardinality },
 permutationRouteID: { value: null, writable: true },
 payloadRouteID: { value: null, writable: true },
 activeTabIndex: { value: null, writable: true },
 previewTabIndex: { value: null, writable: true },
 viewedActiveTab: { value: null, writable: true },
 viewedPreviewTab: { value: null, writable: true },
 viewedPermutation: { value: null, writable: true },
 viewedPayload: { value: null, writable: true },
 viewedOpenTabs: { value: null, writable: true },
 openTabs: { value: [] },
 tabOffsets: { value: tabOffsets },
 tabBitDepths: { value: tabBitDepths },
 permutationSizes: { value: permutationSizes },
 payloadSizes: { value: payloadSizes },
 partOffsets: { value: partOffsets },
 subjectCount: { value: subjectCount },
 maxTabCount: { value: maxTabCount },
 previousPart: { value: null, writable: true },
 tree: { value: null, writable: true },
 container: { value: null, writable: true },
 FenwickTree: {
  value: class FenwickTree {
   constructor() {
    this.tree = [...LSB]
   }
   update(i, val) {
    for (; i < subjectCount; i += LSB[i])
     this.tree[i] += val
   }
   query(i) {
    let sum = 0n
    for (; i >= 0n; i -= LSB[i])
     sum += this.tree[i]
    return sum
   }
   findNthAvailable(n) {
    let nthAvailable = 0n
    for (let p = powerFloor; p > 0n; p /= 2n) {
     const i = nthAvailable + p
     if (i <= subjectCount && this.tree[i - 1n] <= n) {
      n -= this.tree[i - 1n]
      nthAvailable = i
     }
    }
    return nthAvailable
   }
  }
 }
})