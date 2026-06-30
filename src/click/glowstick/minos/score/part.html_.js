return (
 `<button id=level ${MinosScore.level.pointAttr("viewModal")}>` + (
  MinosScore.level["part.html"]
 ) + "</button>" +
 `<button id=trophies ${MinosScore.trophies.pointAttr("viewModal")}>` + (
  MinosScore.trophies["part.html"]
 ) + "</button>" +
 `<button id=points ${MinosScore.points.pointAttr("viewModal")}>` + (
  MinosScore.points["part.html"]
 ) + "</button>"
)