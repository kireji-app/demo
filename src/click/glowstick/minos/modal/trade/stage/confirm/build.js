if (!minos.primitives)
 minos.installPrimitives()

part.define({
 cardinality: { value: BigInt(minos.primitives.allPrimitives.length - 1) }
})