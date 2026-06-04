if (MinosPoints.rid === MinosPoints.cardinality - 1n)
 return

const earnedRID = BigInt(EARNINGS) + MinosPoints.rid

if (earnedRID > MinosPoints.cardinality - 1n)
 MinosPoints.setRID(MinosPoints.cardinality - 1n)
else
 MinosPoints.setRID(earnedRID)