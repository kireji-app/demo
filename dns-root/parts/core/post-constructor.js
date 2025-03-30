part.key = "untitled"
part.index = 0
part.length = 0
part.running = false
part.enabled = false
part.routeID = -1n
part.cardinality = 1n
part.instancePath = "unknown-root/"
part.previousRouteID = -1n
part[Symbol.iterator] = (i = 0) => ({ next: () => ({ done: i === part.length, value: part[i++] }) })