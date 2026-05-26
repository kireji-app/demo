const options = []

const targetPiece = [...minos.pieces][Number(minosShopModal.target.routeID)]
const targetPieceIndex = targetPiece.routeID
const targetPieceSellValue = Math.trunc(targetPiece.price / 10)

if (targetPieceSellValue > 50)
 options.push(`<button ${minosShopModal.pointAttr("select")} class="item sell"><span>Sell</span><span class=price>${targetPieceSellValue.toLocaleString()}</span></button>`)

for (let optionIndex = BigInt(minos.primitives.allPrimitives.length) - 2n; optionIndex >= 0n; optionIndex--) {
 const trueIndex = optionIndex + BigInt(optionIndex >= targetPieceIndex)
 const primitive = minos.primitives.allPrimitives[Number(trueIndex)]
 const buyPrice = primitive.price - targetPieceSellValue
 const canAfford = BigInt(buyPrice) <= minos.score.points.routeID
 const minosHTML = `<minos- style="--w:${primitive.width};--h:${primitive.height}" class="${primitive === minos.primitives.radialBomb ? "bomb radial" : primitive === minos.primitives.crosshairBomb ? "bomb crosshair" : ""}">` + (
  primitive.minos.map(({ x, y }) => `<mino- style="--x:${x};--y:${y}"></mino->`).join("")
 ) + "</minos->"
 options.push(`<button ${canAfford ? minosShopModal.pointAttr("select", optionIndex) : "disabled"} class=item>${minosHTML}<span class=price>${buyPrice === 0 ? "FREE" : `${buyPrice < 0 ? `+ ${-buyPrice.toLocaleString()}` : buyPrice.toLocaleString()}`}</span></button>`)
}

return options.join("")