// Allow undoing of placement using the back button/context+z.
setUndoPoint()

// Place this mino on the board.
if (thisMinosMino.primitive === MinosGame.primitives.radialBomb) {
 MinosGame.bomb.setRID(MinosGame.bomb.offsets.get(MinosGame.bomb.radial) + BigInt(POINT.y * MinosGame.board.width + POINT.x))
} else if (thisMinosMino.primitive === MinosGame.primitives.crosshairBomb) {
 MinosGame.bomb.setRID(MinosGame.bomb.offsets.get(MinosGame.bomb.crosshair) + BigInt(POINT.y * MinosGame.board.width + POINT.x))
} else {
 MinosGame.board.setRID(thisMinosMino.tiles.reduce(
  (rid, { x, y }) => rid |= 1n << BigInt(((POINT.y + y) * MinosGame.board.width) + POINT.x + x),
  MinosGame.board.rid))

 // Update the placeability of all minoes but this one.
 for (const mino of MinosGame.minoes)
  if (mino !== thisMinosMino)
   mino.recompute()
}

// Change this mino (which updates its placeability).
thisMinosMino.randomize()

// Ensure focus remains in the app, since the focused mino was removed.
Q("title-bar").focus()

// Increment the move count (needed for determining certain achievements).
MinosGame.score.moves.count()

// Update the status of the game.
MinosGame.checkState()