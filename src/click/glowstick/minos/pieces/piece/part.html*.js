return `<minos- ${minosPiece.pointAttr()} style="--w:${minosPiece.width};--h:${minosPiece.height}" class="${minosPiece.primitive === minosPiece.radialBomb ? "bomb radial" : minosPiece.primitive === minosPiece.crosshairBomb ? "bomb crosshair" : ""}">` + (
 minosPiece.minos.map(({ x, y }) => `<mino- style="--x:${x};--y:${y}"></mino->`).join("")
) + "</minos->"