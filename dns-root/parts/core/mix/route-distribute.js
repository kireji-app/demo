mix.updateRoute(ROUTE_ID)

for (let i = mix.length - 1; i >= 0; i--) {
 const placeValue = mix.placeValues[i]
 mix[i].distributeRoute(ROUTE_ID / placeValue)
 ROUTE_ID %= placeValue
}