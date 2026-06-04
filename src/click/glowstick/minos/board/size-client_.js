const { left, top, width } = MinosBoard.element.getBoundingClientRect()
return { left, top, tileSize: width / MinosBoard.width }