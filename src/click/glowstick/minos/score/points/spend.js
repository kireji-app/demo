if (minosPoints.routeID < COST)
 throw new RangeError(`Spend Error: You cannot spend more points than you have.`)

minosPoints.setRouteID(minosPoints.routeID - BigInt(COST))