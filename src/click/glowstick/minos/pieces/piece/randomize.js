const { easy, normal, hard, bomb } = minos.primitives.ranges

let newPieceID = minosPiece.routeID
while (newPieceID === minosPiece.routeID) {

 let range = null

 if (flipCoin() || flipCoin())
  range = easy
 else if (flipCoin() || flipCoin())
  range = bomb
 else if (flipCoin() || flipCoin() || flipCoin() || flipCoin())
  range = normal
 else
  range = hard

 newPieceID = randomRouteID(range.cardinality) + range.offset
}

minosPiece.setRouteID(newPieceID)