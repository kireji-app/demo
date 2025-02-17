globalThis.RADIX = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_.~?#&/=!$*".slice(0, 64)
globalThis.APP_UID = location.host === "localhost:3000" ? "core.parts" : location.host
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

this.choice = this[APP_UID] ?? this[0]
this.state = this.choice.offset
await this.choice.install()

loop()