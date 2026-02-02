minosPiece.define({
 easyCardinality: { value: BigInt(minosPiece.easyPrimitives.length) },
 normalCardinality: { value: BigInt(minosPiece.normalPrimitives.length) },
 hardCardinality: { value: BigInt(minosPiece.hardPrimitives.length) },
 bombCardinality: { value: 2n },
 cardinality: { value: BigInt(minosPiece.allPrimitives.length) },
 allowedTiles: { value: new Set() }
})