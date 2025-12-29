const { x, y, w, h } = region
const { x: X, y: Y, w: W, h: H } = REGION
return !(x >= X + W || x + w <= X || y >= Y + H || y + h <= Y)