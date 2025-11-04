if (environment === "client") _.noop(EVENT)
const { host, pathname, hash } = new URL(HREF)
_.setRoute(`https://${host}/${_.version}/${_.landingHash}`)
switch (host) {
 case "www.ejaugust.com":
  const parts = pathname.split("/").slice(1)
  const { scroller, www } = _.com.ejaugust
  let noteRouteID
  if (parts.length === 1 && parts[0] === "") {
   if (hash) {
    if (hash === "#top") {
     scroller.setRouteID(0n)
     return true
    }
    throw `Unsupported document fragment "${hash}" on "${host}".`
   }
   noteRouteID = 0n
  } else if (parts[0] === "notes") {
   if (!parts[1] || parts.length !== 2) throw `Invalid canonical note link "${HREF}".`
   const timestamp = isNaN(parts[1]) ? {
    "unix-timestamp": "1762140334"
   }[parts[1]] : parts[1]
   const note = www.notes[timestamp]
   if (!note) throw `Could not locate note with timestamp "${timestamp}" on "${host}".`
   noteRouteID = www.notes.offsets.get(note) + www.offsets.get(www.notes)
  } else throw `Invalid canonical notebook link "${HREF}"`
  if (www.routeID !== noteRouteID) {
   if (environment === "client")
    history.pushState(null, null, location.href)
   scroller.setRouteID(0n)
   www.setRouteID(noteRouteID)
  }
  return true
 default:
  throw `Unhandled canonical link (unsupported host "${host}").`
}