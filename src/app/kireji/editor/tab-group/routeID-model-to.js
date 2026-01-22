const validTabs = []

let activeTabRouteID = BigInt(MODEL.activeTabIndex ?? 0)
let previewTabRouteID = BigInt(MODEL.previewTabIndex ?? MODEL.openTabs.length)

let invalidTabCount = 0n

for (let i = 0n; i < MODEL.openTabs.length; i++) {
 const { host, filename, payload } = MODEL.openTabs[i]
 const part = partsByHost[host]

 if (part) {
  if (filename === undefined || part.filenames.includes(filename)) {
   if (payload === undefined || typeof payload === "number") {
    if (payload === undefined || payload >= 0n && payload < tabGroup.payloadCardinality) {
     validTabs.push({ part, filename, payload: payload ?? 0 })
     continue
    } else warn(new RangeError(`Model To RouteID Error: Tab Group "${tabGroup.host}" does not support out of range payload ${payload} (found on part "${host}").`))
   } else warn(new TypeError(`Model To RouteID Error: Tab Group "${tabGroup.host}" does not support a payload of type "${typeof payload}" (found on part "${host}").`))
  } else warn(new RangeError(`Model To RouteID Error: Tab Group "${tabGroup.host}" does not support non-existing file "${filename}" on part "${host}".`))
 } else warn(new RangeError(`Model To RouteID Error: Tab Group "${tabGroup.host}" does not support non-existing part "${host}".`))

 const invalidTabIndex = i - invalidTabCount++
 if (invalidTabIndex < activeTabRouteID || (activeTabRouteID && activeTabRouteID === invalidTabIndex))
  activeTabRouteID--
 if (invalidTabIndex < previewTabRouteID || (previewTabRouteID && previewTabRouteID === invalidTabIndex))
  previewTabRouteID--
}

const numberOfTabsOpen = validTabs.length

const resultRouteID = tabGroup.tabOffsets[numberOfTabsOpen] +
 (
  (
   previewTabRouteID
   * BigInt(numberOfTabsOpen)
   + activeTabRouteID
  )
  * tabGroup.permutationSizes[numberOfTabsOpen]
  + tabGroup.getPermutationRouteID(validTabs)
 )
 * tabGroup.payloadSizes[numberOfTabsOpen]
 + tabGroup.getPayloadRouteID(validTabs)

if (resultRouteID >= part.cardinality)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a route ID that was too large (${resultRouteID}) (max ${part.cardinality}).`)

if (resultRouteID < 0n)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a negative route ID.`)

return resultRouteID