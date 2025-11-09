_.noop(EVENT)

const { host, pathname, hash } = new URL(ANCHOR.href, `https://${_.application.host}${encodePathname(_.routeID)}`)

if (host !== _.application.host)
 throw 'perform cross origin go here'

const translatedPathname = _.translateCanonicalPathname(_.application.host, pathname, hash)
const translatedRouteID = decodePathname(translatedPathname)

if (_.routeID !== translatedRouteID) {
 history.pushState(null, null, location.href)
 _.setRouteID(translatedRouteID)
}