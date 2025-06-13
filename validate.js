// This only runs in the build environment.

openLog(5, "Testing index.html.")
const route = new Route()
openLog(5, "Setting the route to " + route + ".")
root.setRoute(route)
log(5, "Done." + route)

// TODO: check if the stringified JSON object is the
//  same size as the pre-hydration JSON that was exported
//   to the output file prior to hydration.

closeLog(5)
openLog(5, "Reading index.html.")
log(5, root.parts.user["index.html"])
closeLog(5)
closeLog(5)