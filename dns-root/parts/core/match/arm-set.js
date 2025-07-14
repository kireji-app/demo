if (!(match.offsets.has(ARM)))
 throw new Error(`The requested arm (${ARM}) could not be found. ${match.host}`)

match.setRouteID(match.offsets.get(ARM))