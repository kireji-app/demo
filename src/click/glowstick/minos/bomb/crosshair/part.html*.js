const tile = minos.board.allTiles[Number(part.routeID)]
return `<mino- style="--x:${tile.x};--y:${tile.y}" class="crosshair"></mino->`