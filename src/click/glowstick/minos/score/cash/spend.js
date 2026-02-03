if (minosCash.routeID < COST)
 throw new RangeError(`Spend Error: You cannot spend more than you have.`)

minosCash.setRouteID(minosCash.routeID - BigInt(COST))