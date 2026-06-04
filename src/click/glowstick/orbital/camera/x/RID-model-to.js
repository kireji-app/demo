if (typeof MODEL !== "number")
 throw error(`unsupported model type "${typeof MODEL}"`)

const resultRID = BigInt(Math.floor(Math.min(Math.max(MODEL + 90, 0), 180) * 10))

if (resultRID >= OrbitalCameraX.cardinality || resultRID < 0n)
 throw error(`RID out of range\n\tRID:${resultRID}\n\tRange: [0, ${OrbitalCameraX.cardinality}]`)

return resultRID