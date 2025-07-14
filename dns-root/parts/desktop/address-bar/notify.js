if (!facet.supported)
 throw "Can't set address bar right now. " + facet.error

if (addressBar.timer)
 clearTimeout(addressBar.timer)

addressBar.timer = setTimeout(

 () => {
  if (_.routeID !== _.routeIDs[0][0]) {
   _.routeIDs[0][0] = _.routeID
   history.replaceState({}, null, swap(_.routeIDs))
   addressBar.throttleStartTime = performance.now()
   addressBar.timer = undefined
  }
 },

 addressBar.throttleDuration + addressBar.throttleStartTime - now
)