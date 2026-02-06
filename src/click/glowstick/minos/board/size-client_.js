const { left, top, width } = minosBoard.element.getBoundingClientRect()
return { left, top, tileSize: width / minosBoard.width }