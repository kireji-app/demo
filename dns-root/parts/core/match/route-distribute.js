/*
 A parent or this match had its routeID directly set.
 We don't need to check if the routeID has changed.
 super() of this just calls updateRoute.
 The purpose of this override is to do both:
 - super() to call updateRoute on self
 - use arithmetic to make decisions about which arm(s) to propagate to
*/

// First, we call updateRoute
super(ROUTE_ID)

// This tells us if the super call above actually changed the match's state.
if (match.deltaRouteID !== 0n) {

 // We start a loop which we will break out of as early as possible.
 for (const arm of match) {

  // If the remaining ROUTE_ID is smaller than arm...
  if (ROUTE_ID < arm.cardinality) {
   // ... Then the requested route must fall within this arm's own portion of match.cardinality

   // Is the given arm the currently active one?
   if (match.arm !== arm) {

    /*
     If a previous arm exists, we need to remove the view.
     match.arm?.distributeViewEnd()
     But now is not the time for view changes. It is route-only time.
     We will simply make a note of the expired arm.
    */
    match.previousArm = match.arm
   }

   match.arm = arm

   // routeDistribute allows duplicate assignment, so we should not call it if the given arm already has this id
   // then again ... if there has been a change
   if (ROUTE_ID !== arm.routeID)
    arm.routeDistribute(ROUTE_ID)

   // The routeID of this match part and all of its leafward parts is now up to date.
   break
  }

  // Shrink ROUTE_ID as we move on to the next plane.
  ROUTE_ID -= arm.cardinality
 }
}