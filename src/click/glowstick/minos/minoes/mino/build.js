define(thisMinosMino, {
 cardinality: {
  resolve() {
   if (!MinosGame.primitives)
    MinosGame.installPrimitives()

   return BigInt(MinosGame.primitives.allPrimitives.length)
  }
 },
 allowedTiles: { value: new Set() }
})