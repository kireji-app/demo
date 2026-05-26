minosPiece.define({
 cardinality: {
  resolve() {
   if (!minos.primitives)
    minos.installPrimitives()

   return BigInt(minos.primitives.allPrimitives.length)
  }
 },
 allowedTiles: { value: new Set() }
})