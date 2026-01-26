const {
 easyCardinality,
 bombCardinality,
 normalCardinality,
 hardCardinality,
 routeID: existingPieceID
} = minosPiece

let newPieceID = existingPieceID

while (newPieceID === existingPieceID) {
 if (flipCoin() || flipCoin())
  newPieceID = randomRouteID(easyCardinality)
 else if (flipCoin() || flipCoin())
  newPieceID = randomRouteID(bombCardinality) + easyCardinality
 else if (flipCoin() || flipCoin() || flipCoin() || flipCoin())
  newPieceID = randomRouteID(normalCardinality) + bombCardinality + easyCardinality
 else
  newPieceID = randomRouteID(hardCardinality) + normalCardinality + bombCardinality + easyCardinality
}

minosPiece.setRouteID(newPieceID)