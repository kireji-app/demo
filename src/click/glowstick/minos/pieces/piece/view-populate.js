if (hydrated) {
 const offscreenElement = document.createElement("div")
 offscreenElement.innerHTML = minosPiece["part.html"]
 const newMinosElement = offscreenElement.querySelector(`minos-`)
 Q(`#pieces minos-:nth-child(${1 + +minosPiece.key.slice(5)})`).replaceWith(newMinosElement)
}