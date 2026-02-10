if (typeof MODEL !== "string")
 throw new TypeError(`Model To RouteID Error: Part "${part.host}" only supports a model of string (found "${typeof MODEL}").`)

const pieceArray = [...minos.pieces]

if (!pieceArray.some(piece => piece.key === MODEL))
 throw new Error(`Model To RouteID Error: Part "${part.host}" only supports a model which is the key of one of the game pieces. (found "${MODEL}").`)

return BigInt(MODEL.slice(5))