return `<minos- tabIndex=0 ${minosPiece.pointAttr()} style="--w:${minosPiece.width};--h:${minosPiece.height}" class="${minosPiece.primitive === minos.primitives.radialBomb ? "bomb radial" : minosPiece.primitive === minos.primitives.crosshairBomb ? "bomb crosshair" : ""}">` + (
 minosPiece.minos.map(({ x, y }) => `<mino- style="--x:${x};--y:${y}"></mino->`).join("")
) + "</minos->"