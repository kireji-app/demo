const url = new URL(REQUEST_URL)
const devSuffix = "localhost:3000"
const host = url.host.endsWith(devSuffix) ? url.host.slice(0, -1 - devSuffix.length) : url.host

if (!(host in _.applications))
 throw `Unsupported application '${host}'.`

const pathname = url.pathname
const newRouteID = decodePathname(pathname)

logScope(0, "setting route from " + _.ETag, log => {
 log("starting state", _.application?.[".."][".."][".."].ETag)

 if (_.application?.key !== host)
  _.application = getPartFromDomains(host.split("."))

 log("ending state", _.application[".."][".."][".."].ETag)
})

if (_.routeID !== newRouteID)
 _.setRouteID(newRouteID)