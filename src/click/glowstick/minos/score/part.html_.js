return (
 "<div id=cash>" + (
  minosScore.cash["part.html"]
 ) + "</div>" +
 "<div id=wins>" + (
  minosScore.wins["part.html"]
 ) + "</div>" +
 `<button id=trophies ${minosScore.trophies.pointAttr("viewModal")}>` + (
  minosScore.trophies["part.html"]
 ) + "</button>"
)