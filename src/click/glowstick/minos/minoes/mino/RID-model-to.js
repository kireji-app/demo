if (typeof MODEL !== "number")
 throw error(`unsupported model type ${typeof MODEL}`)

const resultRID = BigInt(MODEL)

if (resultRID >= thisMinosMino.cardinality || resultRID < 0n)
 throw error(`RID out of range\n\tRID:${resultRID}\n\tRange: [0, ${thisMinosMino.cardinality}]`)

return resultRID