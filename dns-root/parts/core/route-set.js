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
   part.distributeViewRemove()

   // ... before making new ones.
   part.distributeViewAdd()
  } else {
   // The routeID was set to -1n.

   // Always remove subpart views ...
   part.distributeViewRemove()

   // ... before removing own views.
   part.collectViewRemove()
  }
 } else {
  // The part's own view was just enabled.

  // Always open the parent view ...
  part.parent?.collectViewAdd()

  // ... before you open this one.
  part.distributeViewAdd()
 }

 // The view update signal collects through all disabled
 //  parents up to the first enabled parent.
 part.parent?.collectViewPopulate()

 // But only update the part and subparts when they are enabled.
 if (part.enabled) {
  part.distributeViewPopulate()
 } else {
  // The part will now be garbage collected.
 }
}