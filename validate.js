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
 closeLog(1)
}

closeLog(1)