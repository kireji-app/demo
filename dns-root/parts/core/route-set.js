if (DELTA) {
 // Delta means that ROUTE_ID is relative.
 ROUTE_ID = (ROUTE_ID + part.routeID) % part.cardinality
}

if (ROUTE_ID !== part.routeID) {
 part.distributeRoute(ROUTE_ID)
 part.parent?.collectRoute([part])

 // At this point, no views have updated, but all routeIDs are up to date.
 if (part.wasEnabled) {
  if (part.enabled) {
   // The routeID of an active part changed.
   part.distributeRemoveView()

   // ... before making new ones.
   part.distributeAddView()
  } else {
   // The routeID was set to -1n.

   // Always remove subpart views ...
   part.distributeRemoveView()

   // ... before removing own views.
   part.collectRemoveView()
  }
 } else {
  // The part's own view was just enabled.

  // Always open the parent view ...
  part.parent?.collectAddView()

  // ... before you open this one.
  part.distributeAddView()
 }

 // The view update signal collects through all disabled
 //  parents up to the first enabled parent.
 part.parent?.collectPopulateView()

 // But only update the part and subparts when they are enabled.
 if (part.enabled) {
  part.distributePopulateView()
 } else {
  // The part will now be garbage collected.
 }
}