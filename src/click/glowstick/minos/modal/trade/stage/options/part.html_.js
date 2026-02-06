const options = []

const targetPiece = [...minos.pieces][Number(minosTradeModal.target.routeID)]
const targetPieceIndex = targetPiece.routeID

for (let optionIndex = minosTradeStage.confirm.cardinality - 1n; optionIndex >= 0n; optionIndex--) {
 const trueIndex = optionIndex + BigInt(optionIndex >= targetPieceIndex)
 const primitive = minos.primitives.allPrimitives[Number(trueIndex)]
 const canAfford = BigInt(primitive.price) <= minos.score.cash.routeID
 const minosHTML = `<minos- style="--w:${primitive.width};--h:${primitive.height}" class="${primitive === minos.primitives.radialBomb ? "bomb radial" : primitive === minos.primitives.crosshairBomb ? "bomb crosshair" : ""}">` + (
  primitive.minos.map(({ x, y }) => `<mino- style="--x:${x};--y:${y}"></mino->`).join("")
 ) + "</minos->"
 options.push(`<button ${canAfford ? minosTradeOptions.pointAttr("select", optionIndex) : "disabled"} class=item>${minosHTML}<span class=label>$${primitive.price.toLocaleString()}</span></button>`)
}

return `<h2><span class=label>Trade</span><minos- style="--w:${targetPiece.primitive.width};--h:${targetPiece.primitive.height}" class="${targetPiece.primitive === minos.primitives.radialBomb ? "bomb radial" : targetPiece.primitive === minos.primitives.crosshairBomb ? "bomb crosshair" : ""}">` + (
 targetPiece.primitive.minos.map(({ x, y }) => `<mino- style="--x:${x};--y:${y}"></mino->`).join("")
) + `</minos-><flex-spacer></flex-spacer><button ${minosModal.pointAttr("close")}>✕</button></h2><div id=options>${minosTradeModal.scroller.wrap(options.join(""))}</div>`