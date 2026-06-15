if (typeof MODEL !== "string")
 throw error(`unsupported model type "${typeof MODEL}"`)

const minoArray = [...MinosGame.minoes]

if (!minoArray.some(mino => mino.key === MODEL))
 throw error(`can't find game mino called "${MODEL}"`)

return BigInt(MODEL.slice(4))