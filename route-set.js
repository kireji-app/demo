const url = new URL(REQUEST_URL)
const devSuffix = "localhost:3000"
const host = url.host.endsWith(devSuffix) ? url.host.slice(0, -1 - devSuffix.length) : url.host

if (!(host in _.applications))
 throw `Unsupported application '${host}'.`

const pathname = url.pathname
_.routeIDs = swap(pathname)
const rootRouteIDs = _.routeIDs[0]
const rootRouteID = rootRouteIDs[0]

if (_.application?.key !== host)
 _.application = getPartFromDomains(host.split("."))

if (_.routeID !== _.routeIDs[0][0])
 _.setRouteID(_.routeIDs[0][0])