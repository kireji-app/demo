const options = []

const targetMino = [...MinosGame.minoes][Number(MinosShopModal.target.rid)]
const targetMinoIndex = targetMino.rid
const targetMinoSellValue = Math.trunc(targetMino.price / 10)

if (targetMinoSellValue > 50)
 options.push(`<button ${MinosShopModal.pointAttr("select")} class="item sell"><span>Sell</span><span class=price>${targetMinoSellValue.toLocaleString()}</span></button>`)

for (let optionIndex = BigInt(MinosGame.primitives.allPrimitives.length) - 2n; optionIndex >= 0n; optionIndex--) {
 const trueIndex = optionIndex + BigInt(optionIndex >= targetMinoIndex)
 const primitive = MinosGame.primitives.allPrimitives[Number(trueIndex)]
 const buyPrice = primitive.price - targetMinoSellValue
 const canAfford = BigInt(buyPrice) <= MinosGame.score.points.rid
 const minoHTML = `<mino- style="--w:${primitive.width};--h:${primitive.height}" class="${primitive === MinosGame.primitives.radialBomb ? "bomb radial" : primitive === MinosGame.primitives.crosshairBomb ? "bomb crosshair" : ""}">` + (
  primitive.tiles.map(({ x, y }) => `<tile- style="--x:${x};--y:${y}"></tile->`).join("")
 ) + "</mino->"
 options.push(`<button ${canAfford ? MinosShopModal.pointAttr("select", optionIndex) : "disabled"} class=item>${minoHTML}<span class=price>${buyPrice === 0 ? "FREE" : `${buyPrice < 0 ? `+ ${-buyPrice.toLocaleString()}` : buyPrice.toLocaleString()}`}</span></button>`)
}

return options.join("")