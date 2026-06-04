return (
 `<button id=wins ${MinosScore.wins.pointAttr("viewModal")}>` + (
  MinosScore.wins["part.html"]
 ) + "</button>" +
 `<button id=trophies ${MinosScore.trophies.pointAttr("viewModal")}>` + (
  MinosScore.trophies["part.html"]
 ) + "</button>" +
 `<button id=points ${MinosScore.points.pointAttr("viewModal")}>` + (
  MinosScore.points["part.html"]
 ) + "</button>"
)