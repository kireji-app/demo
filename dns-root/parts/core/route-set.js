if (DELTA) {
 // Delta gives us a relative routeID
 ROUTE_ID = (ROUTE_ID + part.routeID) % part.cardinality
}

if (ROUTE_ID !== part.routeID) {
 // This updates the routeID for the current part and subparts.
 part.captureRoute(ROUTE_ID)

 // This updates the routeID for the parent chain.
 part.bubbleRoute()

 if (part.wasEnabled) {
  if (part.enabled) {
   // The routeID changed...

   // Always finish one thing...
   part.captureTaskEnd()

   // ... before you start another.
   part.captureTaskRun()
  } else {
   // The routeID was set to -1n.

   // Always close a subtask ...
   part.captureTaskEnd()

   // ... before closing its parent.
   part.bubbleTaskEnd()
  }
 } else {
  // This part's own task was just enabled.

  // Always open the parent task ...
  part.bubbleTaskRun()

  // ... before you open this one.
  part.captureTaskRun()
 }

 // The task update signal bubbles through all disabled
 //  parents up to the first enabled parent.
 part.parent?.bubbleTaskUpdate()

 // But only update this part and subparts when they are enabled.
 if (part.enabled) {
  part.captureTaskUpdate()
 } else {
  // This part will now be garbage collected.
 }
}