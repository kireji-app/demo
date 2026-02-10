pointer.handle({
 click() {
  const targetPiece = [...minos.pieces][Number(minosShopModal.target.routeID)]
  const targetPieceIndex = targetPiece.routeID
  const targetPieceSellValue = Math.trunc(targetPiece.price / 10)

  if (REPLACEMENT_INDEX === undefined) {
   minos.score.points.earn(targetPieceSellValue)
   if ([minos.primitives.radialBomb, minos.primitives.crosshairBomb].includes(targetPiece.primitive)) {
    if (!minos.score.trophies.shop.armsDealer.isEarned)
     minos.score.trophies.shop.armsDealer.setRouteID(1n)
   }
   targetPiece.randomize()
  } else {
   const trueIndex = BigInt(REPLACEMENT_INDEX) + BigInt(REPLACEMENT_INDEX >= targetPieceIndex)
   const primitive = minos.primitives.allPrimitives[Number(trueIndex)]
   const netCost = primitive.price - targetPieceSellValue
   if (netCost > 0) minos.score.points.spend(netCost)
   else if (netCost < 0) minos.score.points.earn(netCost)
   targetPiece.setRouteID(trueIndex)
   if ([minos.primitives.radialBomb, minos.primitives.crosshairBomb].includes(primitive)) {
    if (!minos.score.trophies.shop.buyABomb.isEarned)
     minos.score.trophies.shop.buyABomb.setRouteID(1n)
   } else if (primitive === minos.primitives.easyPrimitives[0]) {
    if (!minos.score.trophies.shop.buyAMino.isEarned)
     minos.score.trophies.shop.buyAMino.setRouteID(1n)
   }
   if (!minos.score.trophies.shop.myFirstTrade.isEarned)
    minos.score.trophies.shop.myFirstTrade.setRouteID(1n)
  }

  minosModal.setRouteID(minosModal.modelToRouteID("none"))

  minos.checkState()
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})