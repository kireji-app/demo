globalThis.RADIX = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_.~?#&/=!$*".slice(0, 64)
globalThis.APP_UID = location.host === "localhost:3000" ? "glowstick.click" : location.host
globalThis.encode = state => {
 const
  hexads = [],
  binaryString = state.toString(2),
  newLength = Math.ceil(binaryString.length / 6),
  fullbin = binaryString.padStart(newLength * 6, 0)
 for (let i = 0; i < newLength; i++) hexads.push(fullbin.slice(i * 6, (i + 1) * 6))
 return hexads.reduce((hash, hexad) => hash + RADIX[parseInt(hexad, 2)], "")
}
globalThis.element = (node, tagname) => node.appendChild(document.createElement(tagname))
globalThis.spacer = node => {
 const spacer = element(node, "")
 spacer.setAttribute("class", "spacer")
 return spacer
}

this.choice[layer] = this[APP_UID] ?? this[0]
this.layer[layer] = this.choice[layer].offset
await this.choice[layer].setDocument(layer)

loop()