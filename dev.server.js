const Raw = {
 shadowTags: "ARTICLE ASIDE BLOCKQUOTE BODY DIV FOOTER H1 H2 H3 H4 H5 H6 HEADER MAIN NAV P SECTION SPAN",
 lightTags:
  "HTML HEAD TITLE ADDRESS HR PRE CITE Q DFN EM STRONG SMALL SUB SUP ABBR TIME MARK DEL INS OL UL LI DL DT DD TABLE CAPTION THEAD TBODY TFOOT TR TH TD FORM LABEL INPUT BUTTON SELECT OPTION TEXTAREA FIELDSET LEGEND IMG AUDIO SOURCE VIDEO IFRAME EMBED OBJECT FIGURE FIGCAPTION DETAILS SUMMARY DATALIST OUTPUT",
 colors:
  "black silver gray white maroon red purple fuchsia green lime olive yellow navy blue teal aqua aliceblue antiquewhite aquamarine azure beige bisque blanchedalmond blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen gainsboro ghostwhite gold goldenrod greenyellow grey honeydew hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen lightskyblue lightslategray lightslategrey lightsteelblue lightyellow limegreen linen magenta mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite oldlace olivedrab orange orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue rebeccapurple rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna skyblue slateblue slategray slategrey snow springgreen steelblue tan thistle tomato transparent turquoise violet wheat whitesmoke yellowgreen",
}
class Hash {
 static numerals = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
 static fromIndex(index) {
  const bin = index.toString(2),
   newLength = Math.ceil(bin.length / 6),
   hexads = [],
   fullbin = bin.padStart(newLength * 6, 0)
  for (let i = 0; i < newLength; i++) hexads.push(fullbin.slice(i * 6, (i + 1) * 6))
  const hash = "#" + hexads.reduce((hash, hexad) => hash + this.numerals[parseInt(hexad, 2)], "")
  if (this.indexOf(hash) != index) throw Debug.error(this, `lossy encoding detected.\n - hash = ${hash}\n - index = ${index}\n - Hash.indexOf(hash) = ${Hash.indexOf(hash)}`)
  return hash
 }
 static indexOf(hash) {
  if (typeof hash !== "string" || hash.length <= 1 || hash[0] !== "#")
   throw Debug.error(this, `incorrectly formatted hash "${hash}". Hashes must begin with the hash mark '#' followed by one or more hexads.`)
  let bin = "0b"
  for (let i = 1; i < hash.length; i++) bin += this.numerals.indexOf(hash[i]).toString(2).padStart(6, 0)
  return BigInt(bin)
 }
 static fromData(data, part = Core) {
  const index = part.indexOf(data)
  if (index !== -1n) return this.fromIndex(index)
 }
 static home() {
  const hash = Hash.fromData({
   core: {
    container: {
     component: {
      tag: "ARTICLE",
      color: "black",
      background: "silver",
     },
    },
    a: "red",
    b: "green",
    c: "blue",
    byte: 200n,
   },
  })
  console.warn("TODO: Hardcode this hash.", hash)
  return hash
 }
}
class Addressbar {
 static throttleTime = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? 350 : 75
 static timeLastSet = 0
 static render() {
  if (this.pausedAction) clearTimeout(this.pausedAction)
  const elapsedPause = Date.now() - this.timeLastSet,
   remainingPause = this.throttleTime - elapsedPause,
   action = () => {
    delete this.pausedAction
    const hash = Hash.fromIndex(Engine.index)
    if (hash === location.hash) return
    history.replaceState({}, null, hash)
    this.timeLastSet = Date.now()
   }
  this.pausedAction = setTimeout(() => action(), remainingPause)
 }
}
class Part {
 indexOf(data) {
  let index = -1n
  if (this.terminal) {
   if (this.range) {
    if (typeof data === "object" && this.name in data && typeof data[this.name] === "bigint" && data[this.name] >= 0n && data[this.name] < this.size) index = data[this.name]
   } else if (data === this.name) index = 0n
  } else if (typeof data === "object") {
   if (Object.keys(data).length === 1 && this.name in data) {
    const subdata = data[this.name]
    if (this.composite) {
     if (typeof subdata === "object") {
      const names = Object.keys(subdata)
      if (names.length === this.length) {
       index = 0n
       for (let e = 0; e < this.length; e++) {
        const unit = this.parts.slice(e + 1).reduce((u, part) => u * part.size, 1n),
         part = this.parts[e],
         name = part.name
        if (!(name in subdata)) {
         index = -1n
         break
        }
        const subindex = part.indexOf({ [name]: subdata[name] })
        if (subindex === -1n) {
         index = -1n
         break
        }
        index += unit * subindex
       }
      }
     }
    } else {
     let name
     if (typeof subdata === "string") name = subdata
     else if (typeof subdata === "object" && Object.keys(subdata).length === 1) name = Object.keys(subdata)[0]
     const stack = this.planes[name]
     if (stack) {
      for (const { part, offset } of stack) {
       const addend = part.indexOf(subdata)
       if (addend !== -1n) {
        index = offset + addend
        break
       }
      }
     }
    }
   }
  }
  return index
 }
 get(index) {
  if (index < 0n) return undefined
  if (index in this.cache) return this.cache[index]
  if (index >= this.size) index %= this.size
  let data = {}
  if (this.terminal) {
   if (this.range) data = { [this.name]: index }
   else data = this.name
  } else if (this.composite) {
   const subobject = (data[this.name] = {})
   for (let e = 0; e < this.length; e++) {
    const unit = this.parts.slice(e + 1).reduce((u, part) => u * part.size, 1n),
     part = this.parts[e]
    // todo: what if composite has a terminal dimension?
    Object.assign(subobject, part.get(index / unit))
    index %= unit
   }
  } else {
   let offset = 0n
   for (let e = 0; e < this.length; e++) {
    const part = this.parts[e]
    if (index - offset < part.size) {
     data[this.name] = part.get(index - offset)
     break
    }
    offset += part.size
   }
  }
  return (this.cache[index] = data)
 }
 random() {
  return this.get(this.randomIndex())
 }
 randomIndex() {
  let { bitdepth } = this
  let bin = "0b"
  while (bitdepth--) bin += Math.trunc(Math.random() * 2)
  const result = BigInt(bin)
  return result >= this.size ? this.randomIndex() : result
 }
 weightedRandom() {
  return this.get(this.weightedRandomIndex())
 }
 weightedRandomIndex() {
  let index = -1n,
   part
  if (this.terminal) {
   part = this
   if (this.range) index = this.randomIndex()
   else index = 0n
  } else if (this.composite) {
   index = 1n
   part = []
   for (let e = 0; e < this.length; e++) {
    const unit = this.parts.slice(e + 1).reduce((u, part) => u * part.size, 1n),
     subpart = this.parts[e],
     subindex = subpart.weightedRandomIndex()
    part.push(subpart)
    index += unit * subindex
   }
  } else {
   const i = Math.trunc(Math.random() * this.parts.length)
   part = this.parts[i]
   const offset = this.planes[part.name][0].offset,
    subindex = part.weightedRandomIndex()
   index = subindex + offset
  }
  return index
 }
 constructor({ name, parts, composite = 0, bitdepth }) {
  this.name = name
  this.terminal = !parts
  if (this.terminal) {
   this.range = !!bitdepth
   this.size = this.range ? 2n ** bitdepth : 1n
   this.length = 1
   this.composite = 0
   this.lastkey = this.range ? this.size.toString(2) : "0"
  } else {
   this.composite = composite
   this.length = parts.length
   if (composite) {
    const dimensions = new Set()
    this.parts = parts.map(e => {
     const part = typeof e === "string" ? new Part({ name: e }) : e
     if (dimensions.has(part.name)) throw Debug.error(this, `duplicate identifier "${part.name}" in composite part ${this.name}.`)
     dimensions.add(part.name)
     return part
    })
    this.size = this.parts.reduce((size, part) => size * part.size, BigInt(composite))
   } else {
    let offset = 0n
    this.planes = {}
    this.parts = parts.map((e, i) => {
     const part = typeof e === "string" ? new Part({ name: e }) : e
     const plane = (this.planes[part.name] ??= [])
     plane.push({ part, i, offset })
     offset += part.size
     return part
    })
    this.size = this.parts.reduce((size, part) => size + part.size, BigInt(composite))
   }
   this.lastkey = this.size.toString(2)
  }
  this.bitdepth = this.lastkey.length
  this.depth64 = Math.ceil(this.bitdepth / 6)
  this.overhang = this.bitdepth % 6
 }
 cache = {}
}
class CSSParts {
 static {
  this.colors = new Part({ name: "color", parts: Raw.colors.split(" ") })
  this.backgrounds = new Part({ name: "background", parts: Raw.colors.split(" ") })
 }
}
class DOMParts {
 static {
  this.shadowTags = new Part({ name: "tag", parts: Raw.shadowTags.split(" ") })
  this.lightTags = new Part({ name: "tag", parts: Raw.lightTags.split(" ") })
  this.elements = new Part({ name: "node", parts: [this.lightTags, this.shadowTags] })
  this.components = new Part({ name: "component", parts: [this.shadowTags, CSSParts.colors, CSSParts.backgrounds], composite: true })
  this.nodes = new Part({ name: "nodeType", parts: ["#text", "#comment"] })
  this.containers = new Part({ name: "container", parts: [this.components, this.elements, this.nodes] })
 }
}
class Library {
 static placeholder = new Part({ name: "token", parts: new Array(128).map((_, i) => i) })
 static placeholder2 = new Part({ name: "token", bitdepth: 7n })
}
class Engine {
 static fps = 60
 static time = performance.now()
 static averageFrameTime = 1000
 static randomize() {
  this.index = Core.weightedRandomIndex()
 }
 static stopped = true
 static get data() {
  return Core.get(this.index).core
 }
 static start() {
  // Handle all navigation events.
  onhashchange = () => {
   // Provide the default landing page.
   if (!location.hash) location.hash = Hash.home()
   Engine.index = Hash.indexOf(location.hash)
  }

  onhashchange()
  Debug.initialize()
  this.loop()
 }
 static loop() {
  if (Debug.fuzzing) this.randomize()
  Addressbar.render()
  Debug.render()
  this.render()
  this.frame = requestAnimationFrame(time => (this.tick(time), this.loop()))
 }
 static stop() {
  cancelAnimationFrame(this.frame)
 }
 static tick(time) {
  this.deltaTime = time - this.time
  this.averageFrameTime += (this.deltaTime - this.averageFrameTime) / 20
  this.fps = Math.round(1000 / this.averageFrameTime)
  this.time = time
 }
 static render() {
  const { previousview } = this,
   { a, b, c, container } = this.data,
   content = (document.title = [a, b, c].join(" "))

  let currentview = previousview
  if (container.node) {
   if (container.node.tag) {
    const tag = container.node.tag
    if (!(currentview && currentview instanceof Element && currentview.tagName === tag && !currentview.shadowRoot)) {
     currentview = document.createElement(tag)
     if (!previousview) {
      document.body.appendChild(currentview)
     } else {
      previousview.replaceWith(currentview)
     }
    }
    if (currentview.textContent !== content) {
     currentview.textContent = content
    }
   }
  } else if (container.nodeType) {
   if (container.nodeType === "#text") {
    if (!(currentview && currentview instanceof Text)) {
     currentview = document.createTextNode(content)
     if (!previousview) {
      document.body.appendChild(currentview)
     } else {
      previousview.replaceWith(currentview)
     }
    }
   } else if (container.nodeType === "#comment") {
    if (!(currentview && currentview instanceof Comment)) {
     currentview = document.createComment(content)
     if (!previousview) {
      document.body.appendChild(currentview)
     } else {
      previousview.replaceWith(currentview)
     }
    }
   }
   if (currentview.nodeValue !== content) {
    currentview.nodeValue = content
   }
  } else if (container.component) {
   const tag = container.component.tag
   if (!(currentview instanceof Element && tag === currentview.tagName)) {
    currentview = document.createElement(tag)
    if (!previousview) {
     document.body.appendChild(currentview)
    } else {
     previousview.replaceWith(currentview)
    }
   }
   if (currentview.component !== container.component) {
    const color = container.component.color
    const background = container.component.background
    if (!currentview.component) {
     currentview.component = container.component
     const shadow = currentview.attachShadow({ mode: "open" }),
      sheet = new CSSStyleSheet()
     shadow.adoptedStyleSheets.push(sheet)
     sheet.replaceSync(`:host { background-color: ${background}; color: ${color} }`)
    } else {
     if (!(currentview.component.color === container.component.color && currentview.component.background === container.component.background)) {
      currentview.shadowRoot.adoptedStyleSheets[0].replaceSync(`:host { background-color: ${background}; color: ${color} }`)
     }
    }
    currentview.component = container.component
   }
   if (currentview.shadowRoot.textContent !== content) {
    currentview.shadowRoot.textContent = content
   }
  }
  this.previousview = currentview
 }
}
const Core = new Part({
 name: "core",
 parts: [
  DOMParts.containers,
  new Part({ name: "a", parts: Raw.colors.split(" ") }),
  new Part({ name: "b", parts: Raw.colors.split(" ") }),
  new Part({ name: "c", parts: Raw.colors.split(" ") }),
  new Part({ name: "byte", bitdepth: 8n }),
 ],
 composite: true,
})
class Debug {
 static fuzzing = false
 static dirty = true
 static stats = {
  parts: Core.size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  get framerate() {
   return `${Engine.fps}fps`
  },
  get data() {
   return Engine.data
  },
 }
 static error(owner, msg) {
  Engine.stop()
  this.fuzzing = false
  return `${owner.name}Error: ${msg}`
 }
 static initialize() {
  this.view = document.body.appendChild(document.createElement("div"))
  this.button = this.view.appendChild(document.createElement("button"))
  this.statview = this.view.appendChild(document.createElement("pre"))
  this.view.id = "debug"
  this.statview.id = "stats"
  this.button.id = "fuzzbtn"
 }
 static render() {
  this.statview.innerHTML = `<pre>${JSON.stringify(Debug.stats, (_, v) => (typeof v === "bigint" ? v.toString() : v), 1)}</pre>`
  if (this.dirty) {
   this.button.onclick = () => {
    this.fuzzing = !this.fuzzing
    this.dirty = true
   }
   this.button.innerText = this.fuzzing ? "⏸" : "⏵"
   this.dirty = false
  }
 }
}

// Start the engine.
Engine.start()
