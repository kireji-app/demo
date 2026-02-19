const roundVector = n =>
 Math.abs(n) >= Math.sin((Math.PI / 8)) ? Math.sign(n) : 0

const facingRouteID = {
 [-1]: { [-1]: 0n, [+0]: 3n, [+1]: 5n },
 [+0]: { [-1]: 1n,/*-------*/[+1]: 6n },
 [+1]: { [-1]: 2n, [+0]: 4n, [+1]: 7n }
}[roundVector(VECTOR.x)]
[roundVector(VECTOR.y)]

return facingRouteID