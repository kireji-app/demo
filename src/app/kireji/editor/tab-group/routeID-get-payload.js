const numberOfTabsOpen = BigInt(TABS.length)

let payloadRouteID = 0n

for (let currentTabIndex = 0n; currentTabIndex < numberOfTabsOpen; currentTabIndex++)
 payloadRouteID += BigInt(TABS[Number(currentTabIndex)].payload ?? 0) * tabGroup.payloadSizes[currentTabIndex]

return payloadRouteID