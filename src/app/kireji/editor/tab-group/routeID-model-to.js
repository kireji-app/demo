const validTabs = []

let activeTabIndex = BigInt(MODEL.activeTabIndex)

let invalidTabCount = 0n

for (let i = 0n; i < MODEL.openTabs.length; i++) {
 const { host, filename } = MODEL.openTabs[i]
 const part = partsByHost[host]

 if (part) {
  if (filename === undefined || part.filenames.includes(filename)) {
   validTabs.push({ part, filename })
   continue
  } else warn(new RangeError(`Model To RouteID Error: Tab Group "${tabGroup.host}" does not support non-existing file "${filename}" on part "${host}".`))
 } else warn(new RangeError(`Model To RouteID Error: Tab Group "${tabGroup.host}" does not support non-existing part "${host}".`))

 const invalidTabIndex = i - invalidTabCount++
 if (invalidTabIndex < activeTabIndex || (activeTabIndex && activeTabIndex === invalidTabIndex))
  activeTabIndex--
}

const validTabCount = validTabs.length

const resultRouteID = tabGroup.getPermutationRouteID(validTabs) + activeTabIndex * tabGroup.permutationSizes[validTabCount] + tabGroup.tabOffsets[validTabCount]

if (resultRouteID >= part.cardinality)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a route ID that was too large (${resultRouteID}) (max ${part.cardinality}).`)

if (resultRouteID < 0n)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a negative route ID.`)

return resultRouteID