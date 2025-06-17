B = desktop.color.rgbFromHex(B)

return desktop.color.rgbToHex(...desktop.color.rgbFromHex(A).map((n, i) => {
 const m = B[i]
 const k = 255
 switch (MODE) {
  case "average":
   return (n + m) / 2

  case "multiply":
   return (n * m) / k

  case "screen":
   return k - (((k - n) * (k - m)) / k)

  default:
   throw new RangeError("unsupported blend mode " + MODE)
 }
}))