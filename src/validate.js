if (environment === "server" && require.main === module) {
 logScope(1, "Routing Test", log => {
  // logScope(3, "Uninitialized Model", log => log(serialize(_.model)))
  const testURL = `https://${_.defaultApplicationHost}/${_.version}/${_.landingHash}/`
  log("Test URL: " + testURL)
  logScope(1, "Setting route.", () => _.setRoute(testURL))

  // logScope(3, "Landing Model", log => log(serialize(_.landingModel)))
  // logScope(3, "Resulting Model", log => log(serialize(_.model)))

  logScope(3, "Landing Route ID", log => log(_.landingRouteID))
  logScope(3, "Resulting Route ID", log => log(_.routeID))

  logScope(3, "Landing Hash", log => log(_.landingHash))
  logScope(3, "Resulting Hash", log => log(encodeSegment(_.routeID)))

  if (_.landingRouteID !== _.routeID)
   throw "Detected SetRoute Mismatch"

  else log("RESULT: Exact Match")
 })
 logScope(1, "\nIndex Fetching Test", log => {
  const result = _["part.html"]

  if (!result || typeof result !== "string")
   throw "Index fetching failed."

  log("RESULT: Index Fetched")
 })
 logScope(1, "\nSerialization Test", log => {
  const postHydrationArchive = serialize(_)
  if (postHydrationArchive !== preHydrationArchive) {
   warn(`The post-hydration archive was ${postHydrationArchive.length - preHydrationArchive.length} bytes longer than the pre-hydration archive.`)
   const lines1 = preHydrationArchive.split('\n')
   const lines2 = postHydrationArchive.split('\n')
   const maxLength = Math.max(lines1.length, lines2.length)
   for (let i = 0; i < maxLength; i++) {
    const line1 = lines1[i] || ''
    const line2 = lines2[i] || ''
    if (line1 !== line2) {
     if (line2.length - line1.length === 1 && line2.at(-1) === ",")
      continue
     warn(`Found line difference between pre- and post-hydration archives.`, { lineNumber: i + 1, line1: line1, line2: line2 })
     break
    }
   }
  } else log(`RESULT: Exact match.`)
 })
}