HEX = HEX.replace("#", "")

return [
 parseInt(HEX.slice(0, 2), 16),
 parseInt(HEX.slice(2, 4), 16),
 parseInt(HEX.slice(4, 6), 16)
]