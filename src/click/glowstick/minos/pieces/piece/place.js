// Allow undoing of placement using the back button/context+z.
setUndoPoint()

// Place this piece on the board.
if (minosPiece.primitive === minos.primitives.radialBomb) {
 minos.bomb.setRouteID(minos.bomb.offsets.get(minos.bomb.radial) + BigInt(POINT.y * minos.board.width + POINT.x))
} else if (minosPiece.primitive === minos.primitives.crosshairBomb) {
 minos.bomb.setRouteID(minos.bomb.offsets.get(minos.bomb.crosshair) + BigInt(POINT.y * minos.board.width + POINT.x))
} else {
 minos.board.setRouteID(minosPiece.minos.reduce(
  (routeID, { x, y }) => routeID |= 1n << BigInt(((POINT.y + y) * minos.board.width) + POINT.x + x),
  minos.board.routeID))

 // Update the placeability of all pieces but this one.
 for (const piece of minos.pieces)
  if (piece !== minosPiece)
   piece.recompute()
}

// Change this piece (which updates its placeability).
minosPiece.randomize()

// Ensure focus remains in the application, since the focused piece was removed.
Q("title-bar").focus()

// Increment the move count (needed for determining certain achievements).
minos.score.moves.count()

// Update the status of the game.
minos.checkState()