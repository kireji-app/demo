pointer.handle({
 click() {
  /* To go to confirm dialog:

   minosTradeStage.setRouteID(minosTradeStage.modelToRouteID({
    confirm: REPLACEMENT_INDEX
   }))

  */
  const targetPiece = [...minos.pieces][Number(minosTradeModal.target.routeID)]
  const targetPieceIndex = targetPiece.routeID
  const trueIndex = BigInt(REPLACEMENT_INDEX) + BigInt(REPLACEMENT_INDEX >= targetPieceIndex)
  const primitive = minos.primitives.allPrimitives[Number(trueIndex)]
  minos.score.cash.spend(primitive.price)
  targetPiece.setRouteID(trueIndex)
  minosModal.setRouteID(minosModal.modelToRouteID("none"))

  if (!minos.score.trophies.trades.myFirstTrade.isEarned)
   minos.score.trophies.trades.myFirstTrade.setRouteID(1n)

  if ([minos.primitives.radialBomb, minos.primitives.crosshairBomb].includes(primitive)) {
   if (!minos.score.trophies.trades.buyABomb.isEarned)
    minos.score.trophies.trades.buyABomb.setRouteID(1n)
  } else if (primitive === minos.primitives.easyPrimitives[0]) {
   if (!minos.score.trophies.trades.buyAMino.isEarned)
    minos.score.trophies.trades.buyAMino.setRouteID(1n)
  }

  minos.checkState()
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})