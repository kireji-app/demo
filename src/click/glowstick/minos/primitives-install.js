const
 easyPrimitives = [
  { width: 1, height: 1, price: 500, minos: [{ x: 0, y: 0 }] },
  { width: 2, height: 1, price: 500, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }] },
  { width: 1, height: 2, price: 500, minos: [{ x: 0, y: 0 }, { x: 0, y: 1 }] },
  { width: 3, height: 1, price: 500, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }] },
  { width: 1, height: 3, price: 500, minos: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }] },
  { width: 2, height: 2, price: 500, minos: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }] },
  { width: 2, height: 2, price: 500, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }] },
  { width: 2, height: 2, price: 500, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }] },
  { width: 2, height: 2, price: 500, minos: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }] },
  { width: 2, height: 2, price: 500, minos: [{ x: 0, y: 0 }, { x: 1, y: 1 }] },
  { width: 2, height: 2, price: 500, minos: [{ x: 1, y: 0 }, { x: 0, y: 1 }] },
 ],
 mediumPrimitives = [
  { width: 3, height: 2, price: 400, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 1 }] },
  { width: 3, height: 2, price: 400, minos: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }] },
  { width: 2, height: 3, price: 400, minos: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }] },
  { width: 2, height: 3, price: 400, minos: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }] },
  { width: 3, height: 2, price: 400, minos: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 0 }] },
  { width: 3, height: 2, price: 400, minos: [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }] },
  { width: 2, height: 3, price: 400, minos: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 2 }] },
  { width: 2, height: 3, price: 400, minos: [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }] }
 ],
 normalPrimitives = [
  { width: 4, height: 1, price: 250, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }] },
  { width: 1, height: 4, price: 250, minos: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }] },
  { width: 2, height: 2, price: 250, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }] },
  { width: 3, height: 2, price: 250, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }] },
  { width: 3, height: 2, price: 250, minos: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }] },
  { width: 2, height: 3, price: 250, minos: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 1 }] },
  { width: 2, height: 3, price: 250, minos: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }] },
  { width: 3, height: 2, price: 250, minos: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }] },
  { width: 2, height: 3, price: 250, minos: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }] },
  { width: 3, height: 2, price: 250, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }] },
  { width: 2, height: 3, price: 250, minos: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }] },
  { width: 3, height: 2, price: 250, minos: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }] },
  { width: 3, height: 2, price: 250, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }] },
  { width: 2, height: 3, price: 250, minos: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }] },
  { width: 2, height: 3, price: 250, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }] },
  { width: 3, height: 2, price: 250, minos: [{ x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }] },
  { width: 3, height: 2, price: 250, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }] },
  { width: 2, height: 3, price: 250, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }] },
  { width: 2, height: 3, price: 250, minos: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }] }
 ],
 hardPrimitives = [
  { width: 3, height: 3, price: 100, minos: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }] },
  { width: 3, height: 3, price: 100, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }] },
  { width: 3, height: 3, price: 100, minos: [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }] },
  { width: 3, height: 3, price: 100, minos: [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }] },
  { width: 3, height: 3, price: 100, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }] },
  { width: 4, height: 3, price: 100, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 2 }, { x: 3, y: 2 }] },
  { width: 4, height: 4, price: 100, minos: [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 3 }, { x: 3, y: 3 }] },
  { width: 3, height: 3, price: 100, minos: [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 2, y: 2 }] },
  { width: 4, height: 2, price: 100, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 1 }, { x: 3, y: 1 }] },
 ],
 radialBomb = { width: 1, height: 1, price: 750, minos: [{ x: 0, y: 0 }] },
 crosshairBomb = { width: 1, height: 1, price: 750, minos: [{ x: 0, y: 0 }] },
 allPrimitives = [...easyPrimitives, ...mediumPrimitives, ...normalPrimitives, ...hardPrimitives, crosshairBomb, radialBomb]

minos.define({
 primitives: {
  value: {
   easyPrimitives,
   mediumPrimitives,
   normalPrimitives,
   hardPrimitives,
   crosshairBomb,
   radialBomb,
   allPrimitives,
   ranges: {
    easy: {
     cardinality: BigInt(easyPrimitives.length),
     offset: 0n
    },
    medium: {
     cardinality: BigInt(mediumPrimitives.length),
     offset: BigInt(easyPrimitives.length)
    },
    normal: {
     cardinality: BigInt(normalPrimitives.length),
     offset: BigInt(easyPrimitives.length + mediumPrimitives.length)
    },
    hard: {
     cardinality: BigInt(hardPrimitives.length),
     offset: BigInt(easyPrimitives.length + mediumPrimitives.length + normalPrimitives.length)
    },
    bomb: {
     cardinality: 2n,
     offset: BigInt(easyPrimitives.length + mediumPrimitives.length + normalPrimitives.length + hardPrimitives.length)
    }
   }
  }
 }
})