openLog(1, "Tests")

openLog(5, "Testing the default route")
const route = new Route()
log(5, "")
log(5, "URI: " + route + "\n")
log(5, "Singleton RouteID: " + route.singletonRouteID + "\n")
root.setRoute(route)
log(5, "Done.")
closeLog(5)

if (environment === "build") {
 openLog(5, "Testing for hydration artifacts")
 const postHydrationArchive = serialize(root)
 if (preHydrationArchive.length !== postHydrationArchive.length)
  throw new Error(`The second output file was not the same size as the first. Check for accidental parameters.\n\tUnhydrated Archive Length: ${preHydrationArchive.length}\n\tHydrated Archive Length: ${postHydrationArchive.length}`)
 log(5, "Done.")
 closeLog(5)
}

openLog(5, "Reading index.html.")
log(5, root.parts.user["index.html"])
closeLog(5)
closeLog(5)