return `<minos- ${minosPiece.pointAttr()} style="--w:${minosPiece.width};--h:${minosPiece.height}" data-index="${minosPiece.key.slice(5)}" class="${minosPiece.primitive === minosPiece.radialBomb ? "bomb radial" : minosPiece.primitive === minosPiece.crosshairBomb ? "bomb crosshair" : ""}">` + (
 minosPiece.minos.map(({ x, y }) => `<mino- style="--x:${x};--y:${y}"></mino->`).join("")
) + "</minos->"