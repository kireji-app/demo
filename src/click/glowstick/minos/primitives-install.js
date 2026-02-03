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
  { width: 2, height: 2, price: 500, minos: [{ x: 1, y: 0 }, { x: 0, y: 1 }] }
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
  { width: 3, height: 2, price: 100, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 1 }] }
 ],
 radialBomb = { width: 1, height: 1, price: 750, minos: [{ x: 0, y: 0 }] },
 crosshairBomb = { width: 1, height: 1, price: 750, minos: [{ x: 0, y: 0 }] },
 allPrimitives = [...easyPrimitives, radialBomb, crosshairBomb, ...normalPrimitives, ...hardPrimitives]

minos.define({
 primitives: {
  value: {
   easyPrimitives,
   normalPrimitives,
   hardPrimitives,
   crosshairBomb,
   radialBomb,
   allPrimitives,
  }
 }
})