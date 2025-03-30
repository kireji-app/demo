if (part.length === 1 && SUBPARTS) {
 if (SUBPARTS.length !== 1)
  throw `Part Error: unexpected quantity (${SUBPARTS.length}) of subparts bubbled their route to this part. (${part.host})`

 part.updateRoute(SUBPARTS[0].routeID)
}

part.parent?.bubbleRoute([part])