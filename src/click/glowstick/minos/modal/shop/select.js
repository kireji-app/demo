Pointer.handle({
 click() {
  const targetMino = [...MinosGame.minoes][Number(MinosShopModal.target.rid)]
  const targetMinoIndex = targetMino.rid
  const targetMinoSellValue = Math.trunc(targetMino.price / 10)

  if (REPLACEMENT_INDEX === undefined) {
   MinosGame.score.points.earn(targetMinoSellValue)
   if ([MinosGame.primitives.radialBomb, MinosGame.primitives.crosshairBomb].includes(targetMino.primitive)) {
    if (!MinosGame.score.trophies.shop.armsDealer.isEarned)
     MinosGame.score.trophies.shop.armsDealer.setRID(1n)
   }
   targetMino.randomize()
  } else {
   const trueIndex = BigInt(REPLACEMENT_INDEX) + BigInt(REPLACEMENT_INDEX >= targetMinoIndex)
   const primitive = MinosGame.primitives.allPrimitives[Number(trueIndex)]
   const netCost = primitive.price - targetMinoSellValue
   if (netCost > 0) MinosGame.score.points.spend(netCost)
   else if (netCost < 0) MinosGame.score.points.earn(netCost)
   targetMino.setRID(trueIndex)
   if ([MinosGame.primitives.radialBomb, MinosGame.primitives.crosshairBomb].includes(primitive)) {
    if (!MinosGame.score.trophies.shop.buyABomb.isEarned)
     MinosGame.score.trophies.shop.buyABomb.setRID(1n)
   } else if (primitive === MinosGame.primitives.easyPrimitives[0]) {
    if (!MinosGame.score.trophies.shop.buyAMino.isEarned)
     MinosGame.score.trophies.shop.buyAMino.setRID(1n)
   }
   if (!MinosGame.score.trophies.shop.myFirstTrade.isEarned)
    MinosGame.score.trophies.shop.myFirstTrade.setRID(1n)
  }

  MinosModal.setModel("none")

  MinosGame.checkState()
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})