// TODO: Fix this logic slow on iOS.
window.scrollTo(0, Number(part.routeID * BigInt(document.body.scrollHeight - window.innerHeight) / part.cardinality))