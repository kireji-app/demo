const url = new URL(REQUEST_URL)
const pathname = url.pathname
const host = url.host
const themeDomains = host.split(".")
_.routeIDs = swap(pathname)
const rootRouteIDs = _.routeIDs[0]
const rootRouteID = rootRouteIDs[0]

if (desktop.theme?.key !== host)
 desktop.theme = getPartFromDomains(themeDomains)

if (_.routeID !== _.routeIDs[0][0]) {
 log(5, `Setting the DNS root route ID: ${_.routeID} => ${_.routeIDs[0][0]}`)
 _.setRouteID(_.routeIDs[0][0])
}