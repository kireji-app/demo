class Die {
 static roll(multiplier = 2) {
  return Math.trunc(Math.random() * multiplier)
 }
}
class Addressbar {
 static lastCaptureTime = 0
 static #code
 static set code(code) {
  if (this.pending) clearTimeout(this.pending)
  const delay = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? 320 : 64 + this.lastCaptureTime - Date.now(),
   action = () => {
    delete this.pending
    history.replaceState({}, null, "#" + code.b64)
    this.lastCaptureTime = Date.now()
    this.#code = code
   }
  if (!delay) action()
  else this.pending = setTimeout(() => action(), delay)
 }
 static get code() {
  return this.#code
 }
}
class Code {
 static cache = new Map()
 static #exists(value) {
  return this.cache.has(value)
 }
 static #recover(value) {
  return this.cache.get(value)
 }
 static #register(code) {
  this.cache.set(code.b64, code)
  this.cache.set(code.bin, code)
  this.cache.set(code.i, code)
 }
 static encode(bin) {
  if (bin.length !== Depth2) throw `EncodeError: wrong length. ` + bin.length
  const N = []
  for (let i = 0; i < Depth64; i++) N.push(bin.slice(i * 6, 6))
  if (Overhang) N[Depth64 - 1] = N[Depth64 - 1].padEnd(6, 0)
  return N.reduce((b64, n) => b64 + Numerals[parseInt(n, 2)], "")
 }
 static decode(b64) {
  if (b64.length !== Depth64) throw "DecodeError: wrong length. " + b64.length
  const N = []
  for (let i = 0; i < Depth64; i++) if ((N[i] = Numerals.indexOf(b64[i]).toString(2).padStart(6, 0)) === -1) throw "DecodeError: invalid numeral(C[1]) " + b64
  if (Overhang) N[Depth64 - 1] = N[Depth64 - 1].slice(0, Overhang)
  return N.join("")
 }
 constructor(value, radix = 64) {
  if (Code.#exists(value)) return Code.#recover(value)
  if (typeof value === "string") {
   if (radix === 2) {
    this.bin = value
    this.b64 = Code.encode(value)
    this.i = BigInt(`0b${value}`)
   } else if (radix === 64) {
    this.b64 = value
    this.bin = Code.decode(value)
    this.i = BigInt(`0b${this.bin}`)
   } else throw `CodeError: radix cannot be ${radix}.4`
  } else {
   if (typeof value === "number") this.i = BigInt(Math.trunc(value))
   else if (typeof value === "bigint") this.i = value
   else throw `CodeError: typeof value cannot be ${typeof value}.`
   this.bin = value.toString(2).padStart(Depth2, 0).slice(0, Depth2)
   this.b64 = Code.encode(this.bin)
  }
  Code.#register(this)
 }
}
class Debug {
 static view = document.body.appendChild(document.createElement("pre"))
 static element = document.createElement("div")
 static textNode = document.createTextNode("#text")
 static time = 0
 static deltaTime = 10000
 static averageFrameTime = 10000
 static fuzz(time = 0) {
  this.deltaTime = time - this.time
  this.averageFrameTime += (this.deltaTime - this.averageFrameTime) / 20
  this.time = time
  this.mode = Die.roll(4)
  switch (this.mode) {
   case 0:
    {
     let i = Depth2,
      bin = ""
     while (i--) bin += Die.roll(2)
     this.code = new Code(bin, 2)
    }
    break
   case 1:
    {
     let i = Depth64,
      b64 = ""
     while (i--) b64 += Numerals[Die.roll(64)]
     this.code = new Code(b64, 64)
    }
    break
   case 2:
    {
     let i = Math.ceil(Depth2 / Math.log2(10)),
      value = ""
     while (i--) value += Die.roll(10)
     this.code = new Code(BigInt(value))
    }
    break
   default:
    const i = Die.roll(Number(Count))
    this.code = new Code(i)
    break
  }
  Addressbar.code = this.code
  const part = new Part(this.code.i)
  this.subject ??= ((this.element.innerText = "element"), document.body.appendChild(this.element))
  this.view.textContent = `${Math.round(1000 / this.averageFrameTime)}fps\n${JSON.stringify(part, (_, v) => (typeof v === "bigint" ? v.toString() : v), 1)}`
  requestAnimationFrame(time => this.fuzz(time))
 }
}
const W = ["textContent", "tag", "color", "tag", "nodeType"],
 S = [
  ["", "happy", "sad", "yay", "wow"],
  [
   // shadow tags
   "ARTICLE",
   "ASIDE",
   "BLOCKQUOTE",
   "BODY",
   "DIV",
   "FOOTER",
   "H1",
   "H2",
   "H3",
   "H4",
   "H5",
   "H6",
   "HEADER",
   "MAIN",
   "NAV",
   "P",
   "SECTION",
   "SPAN",
  ],
  [
   // color
   "#234",
   "#243",
   "#324",
   "#423",
   "#342",
   "#432",
   "#333",
  ],
  [
   "HTML",
   "HEAD",
   "TITLE",
   "ADDRESS",
   "HR",
   "PRE",
   "CITE",
   "Q",
   "DFN",
   "EM",
   "STRONG",
   "SMALL",
   "SUB",
   "SUP",
   "ABBR",
   "TIME",
   "MARK",
   "DEL",
   "INS",
   "OL",
   "UL",
   "LI",
   "DL",
   "DT",
   "DD",
   "TABLE",
   "CAPTION",
   "THEAD",
   "TBODY",
   "TFOOT",
   "TR",
   "TH",
   "TD",
   "FORM",
   "LABEL",
   "INPUT",
   "BUTTON",
   "SELECT",
   "OPTION",
   "TEXTAREA",
   "FIELDSET",
   "LEGEND",
   "IMG",
   "AUDIO",
   "SOURCE",
   "VIDEO",
   "IFRAME",
   "EMBED",
   "OBJECT",
   "FIGURE",
   "FIGCAPTION",
   "DETAILS",
   "SUMMARY",
   "DATALIST",
   "OUTPUT",
  ],
  ["#text", "#comment"],
 ],
 C = S.map(s => BigInt(s.length)),
 struct = `0*(1*2+3+4)`,
 kMax = 1418 * 6,
 Count = C[0] * (C[1] * C[2] + (C[3] + C[1]) + C[4]),
 Count2 = Count.toString(2),
 Depth2 = Count2.length,
 Depth64 = Math.ceil(Depth2 / 6),
 Overhang = Depth2 % 6,
 Numerals = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"

class Element {
 get(i) {
  if (i != BigInt(0)) throw "ElementError: an element only has one index, '0'. Tried to get " + i
  return { value: this.name }
 }
 constructor(name) {
  this.name = name
  this.size = BigInt(1)
 }
}

class Space extends Element {
 get(i) {
  let item = { i },
   bin = i.toString(2).padStart(this.bitdepth, 0)
  if (this.cartesian) {
   for (let e = 0; e < this.elements.length; e++) {
    const unit = this.elements.slice(e + 1).reduce((y, E) => y * E.size, BigInt(1))
    const element = this.elements[e]
    if (element instanceof Space) item[element.name] = element.get(i / unit)
    else item = element.name
    i %= unit
   }
  } else {
   let offset = BigInt(0)
   for (let e = 0; e < this.elements.length; e++) {
    const element = this.elements[e]
    if (i - offset >= element.size) {
     offset += element.size
     continue
    }
    if (element instanceof Space) item[element.name] = element.get(i - offset)
    else item = element.name
    break
   }
  }
  return item
 }
 random() {
  return this.get(this.randomIndex())
 }
 randomIndex() {
  let i = this.bitdepth
  let bin = "0b"
  while (i--) bin += Die.roll(2)
  const result = BigInt(bin)
  if (result >= this.size) {
   // reroll if out of range
   return this.randomIndex()
  }
  return result
 }
 constructor(name, elements, cartesian = false) {
  super(name)
  this.elements = elements.map(e => (typeof e === "string" ? new Element(e) : e))
  this.cartesian = cartesian
  this.size = this.elements.reduce((y, element) => {
   const { size } = element
   return cartesian ? y * size : y + size
  }, BigInt(+cartesian))
  this.lastkey = this.size.toString(2)
  this.bitdepth = this.lastkey.length
  this.depth64 = Math.ceil(this.bitdepth / 6)
  this.overhang = this.bitdepth % 6
 }
}

const words = new Space("textContent", ["", "happy", "sad", "yay", "wow"])
const shadowTags = new Space("tag", [
 "ARTICLE",
 "ASIDE",
 "BLOCKQUOTE",
 "BODY",
 "DIV",
 "FOOTER",
 "H1",
 "H2",
 "H3",
 "H4",
 "H5",
 "H6",
 "HEADER",
 "MAIN",
 "NAV",
 "P",
 "SECTION",
 "SPAN",
])
const colors = new Space("color", ["#234", "#243", "#324", "#423", "#342", "#432", "#333"])
const nodeTypes = new Space("nodeType", ["#text", "#comment"])
const lightTags = new Space("tag", [
 "HTML",
 "HEAD",
 "TITLE",
 "ADDRESS",
 "HR",
 "PRE",
 "CITE",
 "Q",
 "DFN",
 "EM",
 "STRONG",
 "SMALL",
 "SUB",
 "SUP",
 "ABBR",
 "TIME",
 "MARK",
 "DEL",
 "INS",
 "OL",
 "UL",
 "LI",
 "DL",
 "DT",
 "DD",
 "TABLE",
 "CAPTION",
 "THEAD",
 "TBODY",
 "TFOOT",
 "TR",
 "TH",
 "TD",
 "FORM",
 "LABEL",
 "INPUT",
 "BUTTON",
 "SELECT",
 "OPTION",
 "TEXTAREA",
 "FIELDSET",
 "LEGEND",
 "IMG",
 "AUDIO",
 "SOURCE",
 "VIDEO",
 "IFRAME",
 "EMBED",
 "OBJECT",
 "FIGURE",
 "FIGCAPTION",
 "DETAILS",
 "SUMMARY",
 "DATALIST",
 "OUTPUT",
])
const allTags = new Space("node", [lightTags, shadowTags])
const components = new Space("component", [shadowTags, colors], true)
const containers = new Space("container", [components, allTags, nodeTypes])
const wordNodes = new Space("wordNode", [words, containers], true)

class Part {
 static cache = new Map()
 constructor(i) {
  if (Part.cache.has(i)) return Part.cache.get(i)
  Part.cache.set(i, this)
  this.i = i

  i %= wordNodes.size

  this.textContent = S[0][i / (C[1] * C[2] + (C[3] + C[1]) + C[4])]
  i %= C[1] * C[2] + (C[3] + C[1]) + C[4]
  this.container = { i }
  if (i < C[1] * C[2]) {
   this.container.component = { i }
   this.container.component.tag = S[1][i / C[2]]
   i %= C[2]
   this.container.component.color = S[2][i]
  } else {
   i -= C[1] * C[2]
   if (i < C[3] + C[1]) {
    this.container.node = { i }
    if (i < C[3]) {
     this.container.node.tag = S[3][i]
    } else {
     i -= C[3]
     this.container.node.tag = S[1][i]
    }
   } else {
    i -= C[3] + C[1]
    this.container.nodeType = S[4][i]
   }
  }
 }
}

function compareObjects(referencePart, particle) {
 for (const key in referencePart) {
  if (!(key in particle)) {
   console.warn({ referencePart, particle })
   throw `particle missing key ` + key
  }
  if (typeof referencePart[key] === "object") {
   if (typeof particle[key] !== "object") {
    console.warn({ referencePart, particle })
    throw `particle shouldn't have object ` + typeof particle[key]
   }
   compareObjects(referencePart[key], particle[key])
  } else if (referencePart[key] !== particle[key]) {
   console.warn({ referencePart, particle })
   throw `particle has wrong ${key} value - "${referencePart[key]}" vs. "${particle[key]}"`
  }
 }
 for (const key in particle) {
  if (!(key in referencePart)) {
   console.warn({ referencePart, particle })
   throw `particle has extra key ` + key
  }
  if (typeof referencePart[key] === "object") {
   if (typeof particle[key] === "object") {
    if (typeof referencePart[key] !== "object") {
     console.warn({ referencePart, particle })
     throw `particle is missing object ` + key
    }
    compareObjects(referencePart[key], particle[key])
   }
  } else if (referencePart[key] !== particle[key]) {
   console.warn({ referencePart, particle })
   throw `particle has wrong ${key} value - "${referencePart[key]}" vs. "${particle[key]}"`
  }
 }
}

// Get every particle in space. WARNING: slow for large particle counts!
for (let i = BigInt(0); i < wordNodes.size; i++) {
 const referencePart = new Part(i)
 const particle = wordNodes.get(i)
 compareObjects(referencePart, particle)
 console.log({ referencePart, particle })
}

console.log(wordNodes.get(BigInt(0)))
// Debug.fuzz()

/* These functions are not reccomended for large count!

 // Precompute every part to debug the indexer.
 let i = 0
 const precomputeCache = {}

 function addPrecomputedPart(data) {
  data.bin = i.toString(2).padStart(this.Depth2, 0)
  precomputeCache[data.bin] = data
  i++
 }

 for (let $0 = 0; $0 < S[0].length; $0++) {
  for (let $1 = 0; $1 < S[1].length; $1++) {
   for (let $2 = 0; $2 < S[2].length; $2++) {
    addPrecomputedPart({
     [W[0]]: S[0][$0],
     [W[1]]: S[1][$1],
     [W[2]]: S[2][$2],
    })
   }
  }
  for (let $1 = 0; $1 < S[3].length; $1++) {
   addPrecomputedPart({
    [W[0]]: S[0][$0],
    [W[3]]: S[3][$1],
   })
  }
  for (let $1 = 0; $1 < S[4].length; $1++) {
   addPrecomputedPart({
    [W[0]]: S[0][$0],
    [W[4]]: S[4][$1],
   })
  }
 }

 // Create every part using indexer.
 for (let i = 0; i < Count; i++) {
  const bin = i.toString(2).padStart(Depth2, 0)
  console.log(new Part(bin))
 }

*/
