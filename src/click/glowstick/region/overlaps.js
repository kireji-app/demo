const { x, y, w, h } = region
const { x: X, y: Y, w: W, h: H } = REGION

// This adjustment allows perfectly-aligned regions to overlap by one pixel.
const $x = (x - 0.51)
const $y = (y - 0.51)
const $w = (w + 0.51)
const $h = (h + 0.51)
const $X = (X - 0.51)
const $Y = (Y - 0.51)
const $W = (W + 0.51)
const $H = (H + 0.51)

return !($x >= $X + $W || $x + $w <= $X || $y >= $Y + $H || $y + $h <= $Y)