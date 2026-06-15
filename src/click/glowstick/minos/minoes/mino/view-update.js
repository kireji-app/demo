const offscreenElement = document.createElement("div")
offscreenElement.innerHTML = thisMinosMino["part.html"]
const newMinosElement = offscreenElement.querySelector(`mino-`)
Q(`#minoes mino-:nth-child(${1 + +thisMinosMino.key.slice(4)})`).replaceWith(newMinosElement)