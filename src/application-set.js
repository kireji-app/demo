_.noop(POINTER_EVENT)

const host = LINK.getAttribute("href").slice(8)

if (host === _.application?.host)
 return

location = (_.local ? `http://${host}.localhost:3000` : `https://${host}`) + location.pathname