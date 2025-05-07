// TODO: Fix this logic ... it is currently slow on iOS.
window.scrollTo(0, Number(part.routeID * BigInt(document.body.scrollHeight - window.innerHeight) / part.cardinality))