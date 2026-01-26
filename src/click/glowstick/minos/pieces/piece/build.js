// TODO: prevent the duplicate copy of these pieces for each instance.
const easyPrimitives = [
 { width: 1, height: 1, minos: [{ x: 0, y: 0 }] },
 { width: 2, height: 1, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }] },
 { width: 1, height: 2, minos: [{ x: 0, y: 0 }, { x: 0, y: 1 }] },
 { width: 3, height: 1, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }] },
 { width: 1, height: 3, minos: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }] },
 { width: 2, height: 2, minos: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }] },
 { width: 2, height: 2, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }] },
 { width: 2, height: 2, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }] },
 { width: 2, height: 2, minos: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }] },
 { width: 2, height: 2, minos: [{ x: 0, y: 0 }, { x: 1, y: 1 }] },
 { width: 2, height: 2, minos: [{ x: 1, y: 0 }, { x: 0, y: 1 }] }
]
const radialBomb = { width: 1, height: 1, minos: [{ x: 0, y: 0 }] }
const crosshairBomb = { width: 1, height: 1, minos: [{ x: 0, y: 0 }] }
const normalPrimitives = [
 { width: 4, height: 1, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }] },
 { width: 1, height: 4, minos: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }] },
 { width: 2, height: 2, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }] },
 { width: 3, height: 2, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }] },
 { width: 3, height: 2, minos: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }] },
 { width: 2, height: 3, minos: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 1 }] },
 { width: 2, height: 3, minos: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }] },
 { width: 3, height: 2, minos: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }] },
 { width: 2, height: 3, minos: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }] },
 { width: 3, height: 2, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }] },
 { width: 2, height: 3, minos: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }] },
 { width: 3, height: 2, minos: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }] },
 { width: 3, height: 2, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }] },
 { width: 2, height: 3, minos: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }] },
 { width: 2, height: 3, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }] },
 { width: 3, height: 2, minos: [{ x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }] },
 { width: 3, height: 2, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }] },
 { width: 2, height: 3, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }] },
 { width: 2, height: 3, minos: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }] }
]
const hardPrimitives = [
 { width: 3, height: 3, minos: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }] },
 { width: 3, height: 3, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }] },
 { width: 3, height: 3, minos: [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }] },
 { width: 3, height: 3, minos: [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }] },
 { width: 3, height: 3, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }] },
 { width: 4, height: 3, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 2 }, { x: 3, y: 2 }] },
 { width: 4, height: 4, minos: [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 3 }, { x: 3, y: 3 }] },
 { width: 3, height: 3, minos: [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 2, y: 2 }] },
 { width: 4, height: 2, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 1 }, { x: 3, y: 1 }] },
 { width: 3, height: 2, minos: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 1 }] }
]
const allPrimitives = [...easyPrimitives, radialBomb, crosshairBomb, ...normalPrimitives, ...hardPrimitives]

minosPiece.define({
 easyPrimitives: { value: easyPrimitives },
 normalPrimitives: { value: normalPrimitives },
 hardPrimitives: { value: hardPrimitives },
 crosshairBomb: { value: crosshairBomb },
 radialBomb: { value: radialBomb },
 easyCardinality: { value: BigInt(easyPrimitives.length) },
 normalCardinality: { value: BigInt(normalPrimitives.length) },
 hardCardinality: { value: BigInt(hardPrimitives.length) },
 bombCardinality: { value: 2n },
 allPrimitives: { value: allPrimitives },
 cardinality: { value: BigInt(allPrimitives.length) },
 allowedTiles: { value: new Set() }
})