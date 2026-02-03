const url = new URL(REQUEST_URL)
const devSuffix = "localhost:" + _.port
const host = url.host.endsWith(devSuffix) ? url.host.slice(0, -1 - devSuffix.length) : url.host

if (!(host in _.applications))
 throw `Unsupported Application: ${host}`

const pathname = url.pathname
const newRouteID = decodePathname(pathname)

if (_.application?.key !== host)
 _.application = _.applications[host]

if (_.routeID !== newRouteID)
 _.setRouteID(newRouteID)