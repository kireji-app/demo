if (MinosPoints.rid < COST)
 throw error(`can't spend more points than you have`)

MinosPoints.setRID(MinosPoints.rid - BigInt(COST))