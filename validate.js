openLog(1, "Tests")

if (environment === "build") {
 const testURL = "https://www.desktop.parts/hello/"
 openLog(1, "Routing Test: " + testURL)
 openLog(1, "Setting route.")
 _.setRoute(testURL)
 closeLog(1)
 openLog(1, "Reading index.html.")
 const result = _["index.html"]
 // log(1, result)
 closeLog(1)
 closeLog(1, true)
}

openLog(1, "Checking Serialization")
const postHydrationArchive = serialize(_)
if (postHydrationArchive !== preHydrationArchive) {
 warn(`The post-hydration archive was ${postHydrationArchive.length - preHydrationArchive.length} longer than the pre-hydration archive.`)
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
}
closeLog(1)

closeLog(1, true)