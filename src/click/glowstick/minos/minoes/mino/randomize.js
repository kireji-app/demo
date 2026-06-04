const { easy, normal, hard, bomb } = MinosGame.primitives.ranges

let newMinoID = thisMinosMino.rid
while (newMinoID === thisMinosMino.rid) {

 let range = null

 if (RID.random(4n)) range = easy
 else if (RID.random(4n)) range = bomb
 else if (RID.random(16n)) range = normal
 else range = hard

 newMinoID = RID.random(range.cardinality) + range.offset
}

thisMinosMino.setRID(newMinoID)