// Allow undoing of placement using the back button/context+z.
setUndoPoint()

// Place this piece on the board.
if (minosPiece.primitive === minosPiece.radialBomb) {
 minos.bomb.setRouteID(minos.bomb.offsets.get(minos.bomb.radial) + BigInt(Y * minos.board.width + X))
} else if (minosPiece.primitive === minosPiece.crosshairBomb) {
 minos.bomb.setRouteID(minos.bomb.offsets.get(minos.bomb.crosshair) + BigInt(Y * minos.board.width + X))
} else {
 minos.board.setRouteID(minosPiece.minos.reduce(
  (routeID, { x, y }) => routeID |= 1n << BigInt(((Y + y) * minos.board.width) + X + x),
  minos.board.routeID))

 // Update the placeability of all pieces but this one.
 for (const piece of minos.pieces)
  if (piece !== minosPiece)
   piece.recompute()
}

// Change this piece (which updates its placeability).
minosPiece.randomize()

// Increment the move count (needed for determining certain achievements).
minos.score.moves.count()

// Update the status of the game.
minos.checkState()