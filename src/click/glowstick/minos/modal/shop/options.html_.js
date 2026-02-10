const options = []

const targetPiece = [...minos.pieces][Number(minosShopModal.target.routeID)]
const targetPieceIndex = targetPiece.routeID
const targetPieceSellValue = Math.trunc(targetPiece.price / 10)

if (targetPieceSellValue > 50)
 options.push(`<button ${minosShopModal.pointAttr("select")} class=item><span class=sell>Random</span><span class=label>Earn ${targetPieceSellValue.toLocaleString()} points.</span></button>`)

for (let optionIndex = BigInt(targetPiece.allPrimitives.length) - 2n; optionIndex >= 0n; optionIndex--) {
 const trueIndex = optionIndex + BigInt(optionIndex >= targetPieceIndex)
 const primitive = minos.primitives.allPrimitives[Number(trueIndex)]
 const buyPrice = primitive.price - targetPieceSellValue
 const canAfford = BigInt(buyPrice) <= minos.score.points.routeID
 const minosHTML = `<minos- style="--w:${primitive.width};--h:${primitive.height}" class="${primitive === minos.primitives.radialBomb ? "bomb radial" : primitive === minos.primitives.crosshairBomb ? "bomb crosshair" : ""}">` + (
  primitive.minos.map(({ x, y }) => `<mino- style="--x:${x};--y:${y}"></mino->`).join("")
 ) + "</minos->"
 options.push(`<button ${canAfford ? minosShopModal.pointAttr("select", optionIndex) : "disabled"} class=item>${minosHTML}<span class=label>${buyPrice === 0 ? "FREE" : `${buyPrice < 0 ? `Earn ${-buyPrice.toLocaleString()} points` : `Spend ${buyPrice.toLocaleString()} points`}`}</span></button>`)
}

return options.join("")