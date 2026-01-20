// Memoize the permutation data.
const tabBitDepths = [0n, 0n]
const tabOffsets = [0n]
const permutationSizes = [1n]
const partOffsets = [0, allParts.length]
const subjectCount = BigInt(allParts.reduce((subjectCount, part, i) =>
 partOffsets[i + 2] = subjectCount + part.filenames.length, allParts.length
))
const maxTabCount = subjectCount
const LSB = []
const powerFloor = 2n ** BigInt(subjectCount.toString(2).length - 1)

let cardinality = 1n

for (let k = 1n, p = 1n; k <= subjectCount; k++) {

 // Memoize a prototype LSB array to simplify initialization of Fenwick tree instances.
 LSB[k - 1n] = k & -k

 if (k > maxTabCount)
  continue

 // Increase the permutation size based on tab count.
 p *= subjectCount - k + 1n
 permutationSizes[k] = p
 tabOffsets[k] = cardinality

 // We multiply by this k to account for the active tab index as an independent variable.
 // Consider 2^k additional factor here for masking _keep open_ status on tabs.
 cardinality += p * k

 // Enable O(1) recovery of k later.
 const bitDepth = cardinality.toString(2).length
 while (bitDepth > tabBitDepths.length)
  tabBitDepths.push(k - 1n)
 tabBitDepths[bitDepth] = k
}

tabGroup.define({
 cardinality: { value: cardinality },
 permutationRouteID: { value: null, writable: true },
 activeTabIndex: { value: null, writable: true },
 viewedTab: { value: null, writable: true },
 viewedPermutation: { value: null, writable: true },
 viewedOpenTabs: { value: null, writable: true },
 openTabs: { value: [] },
 tabOffsets: { value: tabOffsets },
 tabBitDepths: { value: tabBitDepths },
 permutationSizes: { value: permutationSizes },
 partOffsets: { value: partOffsets },
 subjectCount: { value: subjectCount },
 maxTabCount: { value: maxTabCount },
 previousPart: { value: null, writable: true },
 tree: { value: null, writable: true },
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