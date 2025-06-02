debug("adding placeValues Map to " + part.host)

Object.defineProperties(mix, {
 placeValues: { value: new Map(), configurable: true, writable: true }
})