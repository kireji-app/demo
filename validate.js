openLog(1, "\x1b[32m\x1b[1mTests\x1b[0m")

openLog(5, "Applying Default Route")
const route = new Route()
log(5, "URI: " + route)
log(5, "Singleton RouteID: " + route.singletonRouteID)
_.setRoute(route)
closeLog(5)

/* Someday, users will be able to change domain files and then `serialize(_)` will need to reflect those changes.

 if (environment === "build") {
  openLog(5, "Testing for hydration artifacts")
  const postHydrationArchive = serialize(_)
  if (preHydrationArchive.length !== postHydrationArchive.length)
   throw new Error(`The second output file was not the same size as the first. Check for accidental parameters.\n\tUnhydrated Archive Length: ${preHydrationArchive.length}\n\tHydrated Archive Length: ${postHydrationArchive.length}`)
  closeLog(5)
 }

*/

openLog(5, "Reading index.html.")
log(5, _["index.html"])
closeLog(5)
closeLog(5)