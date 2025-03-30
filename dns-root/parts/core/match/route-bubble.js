/*
 If this part was directly set, there will be no subparts.
 Since the core has no subparts, there is nothing to do with subparts.
 However, bubbling my state (which can be -1n or 0n) to my
  parent is required if I was set directly.
*/
if (SUBPARTS) {
 // A match expects exactly one arm at any given time to bubble a setRoute event to it
 if (SUBPARTS.length !== 1)
  throw 'Match Error: unexpected quantity (' + SUBPARTS.length +
  ') of subparts bubbled their route to this part. (' + match.host + ")"

 const arm = SUBPARTS[0]

 if (match.arm !== arm) {
  /*
    The bubbling arm is a different arm.

    Such an arm must have had a routeID of -1n if it isn't the currently assigned arm
     because all match arms are kept at -1n except the currently assigned arm.

    The arm shouldn't be bubbling if there hasn't been a routeID change within it.
    Thus, the given arm has just become enabled.
  */
  if (!match.enabled) {
   /*
    A match arm just enabled on a disabled match.
    
    When I call routeUpdate below, it will set my enabled state.
    
    Yet, this could be a repeating concern (i.e. match.parent might
     also be disabled) so luckily we will bubble route to match.parent in the super call at the end.

    TODO: The last remaining concern here, it seems, is that this item may need to
     be marked as waking up so that its task can be executed. We will see as we get to the task flow later.
   */
  }
 }

 match.updateRoute(match.offsets[KEY] + match[KEY].routeID)
}

/*
 Now, bubble my state to my parent by calling super but DON'T pass along
  the SUBPARTS argument, since that would cause a repeat call to updateRoute
*/
super()