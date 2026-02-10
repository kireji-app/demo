return (
 `<button id=wins ${minosScore.wins.pointAttr("viewModal")}>` + (
  minosScore.wins["part.html"]
 ) + "</button>" +
 `<button id=trophies ${minosScore.trophies.pointAttr("viewModal")}>` + (
  minosScore.trophies["part.html"]
 ) + "</button>" +
 `<button id=points ${minosScore.points.pointAttr("viewModal")}>` + (
  minosScore.points["part.html"]
 ) + "</button>"
)