return [R, G, B].map(x => {
 const hex = Math.round(x).toString(16)
 return hex.length === 1 ? "0" + hex : hex
}).join("")