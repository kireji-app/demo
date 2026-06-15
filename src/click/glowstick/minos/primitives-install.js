const
 easyPrimitives = [
  { width: 1, height: 1, price: 500, tiles: [Vector.xy(0, 0)] },
  { width: 2, height: 1, price: 500, tiles: [Vector.xy(0, 0), Vector.xy(1, 0)] },
  { width: 1, height: 2, price: 500, tiles: [Vector.xy(0, 0), Vector.xy(0, 1)] },
  { width: 3, height: 1, price: 500, tiles: [Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(2, 0)] },
  { width: 1, height: 3, price: 500, tiles: [Vector.xy(0, 0), Vector.xy(0, 1), Vector.xy(0, 2)] },
  { width: 2, height: 2, price: 500, tiles: [Vector.xy(0, 0), Vector.xy(0, 1), Vector.xy(1, 1)] },
  { width: 2, height: 2, price: 500, tiles: [Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(0, 1)] },
  { width: 2, height: 2, price: 500, tiles: [Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(1, 1)] },
  { width: 2, height: 2, price: 500, tiles: [Vector.xy(1, 0), Vector.xy(0, 1), Vector.xy(1, 1)] },
  { width: 2, height: 2, price: 500, tiles: [Vector.xy(0, 0), Vector.xy(1, 1)] },
  { width: 2, height: 2, price: 500, tiles: [Vector.xy(1, 0), Vector.xy(0, 1)] },
 ],
 mediumPrimitives = [
  { width: 3, height: 2, price: 400, tiles: [Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(2, 1)] },
  { width: 3, height: 2, price: 400, tiles: [Vector.xy(0, 1), Vector.xy(1, 0), Vector.xy(2, 0)] },
  { width: 2, height: 3, price: 400, tiles: [Vector.xy(1, 0), Vector.xy(1, 1), Vector.xy(0, 2)] },
  { width: 2, height: 3, price: 400, tiles: [Vector.xy(1, 0), Vector.xy(0, 1), Vector.xy(0, 2)] },
  { width: 3, height: 2, price: 400, tiles: [Vector.xy(0, 1), Vector.xy(1, 1), Vector.xy(2, 0)] },
  { width: 3, height: 2, price: 400, tiles: [Vector.xy(0, 0), Vector.xy(1, 1), Vector.xy(2, 1)] },
  { width: 2, height: 3, price: 400, tiles: [Vector.xy(0, 0), Vector.xy(0, 1), Vector.xy(1, 2)] },
  { width: 2, height: 3, price: 400, tiles: [Vector.xy(0, 0), Vector.xy(1, 1), Vector.xy(1, 2)] }
 ],
 normalPrimitives = [
  { width: 4, height: 1, price: 250, tiles: [Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(2, 0), Vector.xy(3, 0)] },
  { width: 1, height: 4, price: 250, tiles: [Vector.xy(0, 0), Vector.xy(0, 1), Vector.xy(0, 2), Vector.xy(0, 3)] },
  { width: 2, height: 2, price: 250, tiles: [Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(0, 1), Vector.xy(1, 1)] },
  { width: 3, height: 2, price: 250, tiles: [Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(2, 0), Vector.xy(1, 1)] },
  { width: 3, height: 2, price: 250, tiles: [Vector.xy(1, 0), Vector.xy(0, 1), Vector.xy(1, 1), Vector.xy(2, 1)] },
  { width: 2, height: 3, price: 250, tiles: [Vector.xy(0, 0), Vector.xy(0, 1), Vector.xy(0, 2), Vector.xy(1, 1)] },
  { width: 2, height: 3, price: 250, tiles: [Vector.xy(1, 0), Vector.xy(1, 1), Vector.xy(1, 2), Vector.xy(0, 1)] },
  { width: 3, height: 2, price: 250, tiles: [Vector.xy(1, 0), Vector.xy(2, 0), Vector.xy(0, 1), Vector.xy(1, 1)] },
  { width: 2, height: 3, price: 250, tiles: [Vector.xy(0, 0), Vector.xy(0, 1), Vector.xy(1, 1), Vector.xy(1, 2)] },
  { width: 3, height: 2, price: 250, tiles: [Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(1, 1), Vector.xy(2, 1)] },
  { width: 2, height: 3, price: 250, tiles: [Vector.xy(1, 0), Vector.xy(1, 1), Vector.xy(0, 1), Vector.xy(0, 2)] },
  { width: 3, height: 2, price: 250, tiles: [Vector.xy(0, 0), Vector.xy(0, 1), Vector.xy(1, 1), Vector.xy(2, 1)] },
  { width: 3, height: 2, price: 250, tiles: [Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(2, 0), Vector.xy(2, 1)] },
  { width: 2, height: 3, price: 250, tiles: [Vector.xy(1, 0), Vector.xy(1, 1), Vector.xy(0, 2), Vector.xy(1, 2)] },
  { width: 2, height: 3, price: 250, tiles: [Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(0, 1), Vector.xy(0, 2)] },
  { width: 3, height: 2, price: 250, tiles: [Vector.xy(2, 0), Vector.xy(0, 1), Vector.xy(1, 1), Vector.xy(2, 1)] },
  { width: 3, height: 2, price: 250, tiles: [Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(2, 0), Vector.xy(0, 1)] },
  { width: 2, height: 3, price: 250, tiles: [Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(1, 1), Vector.xy(1, 2)] },
  { width: 2, height: 3, price: 250, tiles: [Vector.xy(0, 0), Vector.xy(0, 1), Vector.xy(0, 2), Vector.xy(1, 2)] }
 ],
 hardPrimitives = [
  { width: 3, height: 3, price: 100, tiles: [Vector.xy(1, 0), Vector.xy(0, 1), Vector.xy(1, 1), Vector.xy(2, 1), Vector.xy(1, 2)] },
  { width: 3, height: 3, price: 100, tiles: [Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(2, 0), Vector.xy(0, 1), Vector.xy(1, 1), Vector.xy(2, 1), Vector.xy(0, 2), Vector.xy(1, 2), Vector.xy(2, 2)] },
  { width: 3, height: 3, price: 100, tiles: [Vector.xy(0, 0), Vector.xy(1, 1), Vector.xy(2, 2)] },
  { width: 3, height: 3, price: 100, tiles: [Vector.xy(2, 0), Vector.xy(1, 1), Vector.xy(0, 2)] },
  { width: 3, height: 3, price: 100, tiles: [Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(2, 0), Vector.xy(0, 1), Vector.xy(2, 1), Vector.xy(0, 2), Vector.xy(1, 2), Vector.xy(2, 2)] },
  { width: 4, height: 3, price: 100, tiles: [Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(2, 2), Vector.xy(3, 2)] },
  { width: 4, height: 4, price: 100, tiles: [Vector.xy(0, 0), Vector.xy(3, 0), Vector.xy(0, 3), Vector.xy(3, 3)] },
  { width: 3, height: 3, price: 100, tiles: [Vector.xy(0, 0), Vector.xy(2, 0), Vector.xy(1, 1), Vector.xy(0, 2), Vector.xy(2, 2)] },
  { width: 4, height: 2, price: 100, tiles: [Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(2, 0), Vector.xy(3, 0), Vector.xy(0, 1), Vector.xy(3, 1)] },
 ],
 radialBomb = { width: 1, height: 1, price: 750, tiles: [Vector.xy(0, 0)] },
 crosshairBomb = { width: 1, height: 1, price: 750, tiles: [Vector.xy(0, 0)] },
 allPrimitives = [...easyPrimitives, ...mediumPrimitives, ...normalPrimitives, ...hardPrimitives, crosshairBomb, radialBomb]

define(MinosGame, {
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