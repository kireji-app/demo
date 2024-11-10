var _ = {
 hash: {
  numerals: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_",
  fromIndex(index) {
   const bin = index.toString(2),
    newLength = Math.ceil(bin.length / 6),
    hexads = [],
    fullbin = bin.padStart(newLength * 6, 0)
   for (let i = 0; i < newLength; i++) hexads.push(fullbin.slice(i * 6, (i + 1) * 6))
   const hx = "#" + hexads.reduce((hx, hexad) => hx + this.numerals[parseInt(hexad, 2)], "")
   if (this.indexOf(hx) != index) throw _.debug.error(this, `lossy encoding detected.\n - hx = ${hx}\n - index = ${index}\n - this.indexOf(hx) = ${this.indexOf(hx)}`)
   return hx
  },
  indexOf(hx) {
   if (typeof hx !== "string" || hx.length <= 1 || hx[0] !== "#")
    throw _.debug.error(this, `incorrectly formatted hx "${hx}". hashes must begin with the hx mark '#' followed by one or more hexads.`)
   let bin = "0b"
   for (let i = 1; i < hx.length; i++) bin += this.numerals.indexOf(hx[i]).toString(2).padStart(6, 0)
   return BigInt(bin)
  },
  fromData(data, px = _.engine.type) {
   const index = px.indexOf(data)
   if (index !== -1n) return this.fromIndex(index)
  },
 },
 addressbar: {
  throttleTime: /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? 350 : 75,
  timeLastSet: performance.now(),
  render() {
   if (this.pausedAction) clearTimeout(this.pausedAction)
   if (_.engine.index !== this.engineIndex)
    this.pausedAction = setTimeout(() => {
     delete this.pausedAction
     const hx = _.hash.fromIndex(_.engine.index)
     if (hx === location.hx) return
     this.timeLastSet = performance.now()
     this.engineIndex = _.engine.index
     history.replaceState({}, null, hx)
    }, this.throttleTime - (performance.now() - this.timeLastSet))
  },
 },
 protopart: {
  create({ name, parts, composite = 0, bitdepth, archival = false }) {
   const new_px = Object.create(_.protopart)
   new_px.cache = {}
   new_px.name = name
   new_px.terminal = !parts
   new_px.archival = archival
   if (new_px.terminal) {
    new_px.range = !!bitdepth
    new_px.size = new_px.range ? 2n ** bitdepth : 1n
    new_px.length = 1
    new_px.composite = 0
    new_px.lastkey = new_px.range ? new_px.size.toString(2) : "0"
   } else {
    new_px.composite = composite
    new_px.length = parts.length
    if (composite) {
     const dimensions = new Set()
     new_px.parts = parts.map(e => {
      // todo: if parts is array, it's a selection. If it's an object, it is a composite.
      const px = Object.getPrototypeOf(e) === _.protopart ? e : this.create(typeof e === "object" ? e : { name: e })
      if (dimensions.has(px.name)) throw _.debug.error(new_px, `duplicate identifier "${px.name}" in composite px ${new_px.name}.`)
      dimensions.add(px.name)
      return px
     })
     new_px.size = new_px.parts.reduce((size, px) => size * px.size, BigInt(composite))
    } else {
     let offset = 0n
     new_px.planes = {}
     new_px.parts = parts.map((e, i) => {
      // todo: if parts is array, it's a selection. If it's an object, it is a composite.
      const px = Object.getPrototypeOf(e) === _.protopart ? e : this.create(typeof e === "object" ? e : { name: e })
      const plane = (new_px.planes[px.name] ??= [])
      plane.push({ px, i, offset })
      offset += px.size
      return px
     })
     new_px.size = new_px.parts.reduce((size, px) => size + px.size, BigInt(composite))
    }
    new_px.lastkey = new_px.size.toString(2)
   }
   new_px.bitdepth = new_px.lastkey.length
   new_px.depth64 = Math.ceil(new_px.bitdepth / 6)
   new_px.overhang = new_px.bitdepth % 6
   return new_px
  },
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
         const unit = this.parts.slice(e + 1).reduce((u, px) => u * px.size, 1n),
          px = this.parts[e],
          name = px.name
         if (!(name in subdata)) {
          index = -1n
          break
         }
         const subindex = px.indexOf({ [name]: subdata[name] })
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
      if (typeof subdata === "string" || typeof subdata === "number" || typeof subdata === "boolean") name = subdata
      else if (typeof subdata === "object" && Object.keys(subdata).length === 1) name = Object.keys(subdata)[0]
      const stack = this.planes[name]
      if (stack) {
       for (const { px, offset } of stack) {
        const addend = px.indexOf(subdata)
        if (addend !== -1n) {
         index = offset + addend
         break
        }
       }
      }
     }
    }
   }
   if (index === -1n) console.warn("data not found in " + this.name, data, { terminal: this.terminal, composite: this.composite })
   return index
  },
  get(index) {
   const cacheindex = index
   if (index < 0n) return undefined
   let data = {}
   if (this.size > 0n) {
    if (index >= this.size) index %= this.size
   } else if (index !== this.size) return undefined
   if (this.terminal) {
    if (this.range) data = { [this.name]: index }
    else data = this.name
   } else if (this.composite) {
    const subobject = (data[this.name] = {})
    for (let e = 0; e < this.length; e++) {
     const unit = this.parts.slice(e + 1).reduce((u, px) => u * px.size, 1n),
      px = this.parts[e]
     // todo: what if composite has a terminal dimension?
     Object.assign(subobject, px.get(index / unit))
     index %= unit
    }
   } else {
    let offset = 0n
    for (let e = 0; e < this.length; e++) {
     const px = this.parts[e]
     if (index - offset < px.size) {
      data[this.name] = px.get(index - offset)
      break
     }
     offset += px.size
    }
   }
   return data
  },
  random() {
   return this.get(this.randomIndex())
  },
  randomIndex() {
   let { bitdepth } = this
   let bin = "0b"
   while (bitdepth--) bin += Math.trunc(Math.random() * 2)
   const result = BigInt(bin)
   return result >= this.size ? this.randomIndex() : result
  },
  /*
   weightedRandom() {
    return this.get(this.weightedRandomIndex())
   },
   weightedRandomIndex() {
    let index = -1n,
     px
    if (this.terminal) {
     px = this
     if (this.range) index = this.randomIndex()
     else index = 0n
    } else if (this.composite) {
     index = 1n
     px = []
     for (let e = 0; e < this.length; e++) {
      const unit = this.parts.slice(e + 1).reduce((u, px) => u * px.size, 1n),
       subpart = this.parts[e],
       subindex = subpart.weightedRandomIndex()
      px.push(subpart)
      index += unit * subindex
     }
    } else {
     const i = Math.trunc(Math.random() * this.parts.length)
     px = this.parts[i]
     const offset = this.planes[px.name][0].offset,
      subindex = px.weightedRandomIndex()
     index = subindex + offset
    }
    return index
   },
  */
  controlledRandomIndex() {
   let index = -1n,
    px
   if (this.archival) {
    if (!(this.name in _.engine.state)) {
     //if (!(this.name in _.home))
     throw _.debug.error(this, `archival dimension must have a value in the state object`)
     //return this.indexOf({ [this.name]: _.home[this.name] })
    }
    index = this.indexOf({ [this.name]: _.engine.state[this.name] })
   } else if (this.terminal) {
    px = this
    if (this.range) index = this.randomIndex()
    else index = 0n
   } else if (this.composite) {
    index = 1n
    px = []
    for (let e = 0; e < this.length; e++) {
     const unit = this.parts.slice(e + 1).reduce((u, px) => u * px.size, 1n),
      subpart = this.parts[e],
      subindex = subpart.controlledRandomIndex()
     px.push(subpart)
     index += unit * subindex
    }
   } else {
    const i = Math.trunc(Math.random() * this.parts.length)
    px = this.parts[i]
    const offset = this.planes[px.name][0].offset,
     subindex = px.controlledRandomIndex()
    index = subindex + offset
   }
   return index
  },
 },
 engine: {
  boot() {
   _.debug.boot()
   const now = performance.now()
   this.time = now - (this.averageFrameTime = 1000)
   this.type = _.protopart.create(_.type.state())
   window.onhashchange = () => this.setIndexFromAddressbar()
   this.setIndexFromAddressbar()
   this.loop(now)
  },
  loop(now) {
   this.deltaTime = now - this.time
   this.averageFrameTime += (this.deltaTime - this.averageFrameTime) / 20
   this.time = now
   this.setValue("https://core.parts/framerate", Math.round(1000 / this.averageFrameTime))
   if (this.state["https://core.parts/fuzzing"]) this.setIndex(this.type.controlledRandomIndex())
   _.debug.render()
   _.addressbar.render()
   this.render()
   this.frame = requestAnimationFrame(now => this.loop(now))
  },
  stop() {
   cancelAnimationFrame(this.frame)
  },
  render() {
   const { previousview, state, index } = this
   document.title = _.hash.fromIndex(index)
   let currentview = previousview
   if (state.element) {
    if (state.element.tag) {
     const tag = state.element.tag
     if (!(currentview && currentview instanceof Element && currentview.tagName === tag && !currentview.shadowRoot)) {
      currentview = document.createElement(tag)
      if (!previousview) {
       document.body.appendChild(currentview)
      } else {
       previousview.replaceWith(currentview)
      }
     }
     /*if (currentview.textContent !== content) {
      currentview.textContent = content
     }*/
    }
   } else if (state.node) {
    if (state.node.text) {
     if (!(currentview && currentview instanceof Text)) {
      currentview = document.createTextNode(state.node.text)
      if (!previousview) {
       document.body.appendChild(currentview)
      } else {
       previousview.replaceWith(currentview)
      }
     }
     if (currentview.nodeValue !== state.node.text) {
      currentview.nodeValue = state.node.text
     }
    } else if (state.node.comment) {
     if (!(currentview && currentview instanceof Comment)) {
      currentview = document.createComment(state.node.comment)
      if (!previousview) {
       document.body.appendChild(currentview)
      } else {
       previousview.replaceWith(currentview)
      }
     }
     if (currentview.nodeValue !== state.node.comment) {
      currentview.nodeValue = state.node.comment
     }
    }
   } else if (state.component) {
    const tag = state.component.tag
    if (!(currentview instanceof Element && tag === currentview.tagName)) {
     currentview = document.createElement(tag)
     if (!previousview) {
      document.body.appendChild(currentview)
     } else {
      previousview.replaceWith(currentview)
     }
    }
    if (currentview.component !== state.component) {
     const color = state.component.color
     const background = state.component.background
     if (!currentview.component) {
      currentview.component = state.component
      const shadow = currentview.attachShadow({ mode: "open" }),
       sheet = new CSSStyleSheet()
      shadow.adoptedStyleSheets.push(sheet)
      sheet.replaceSync(`:host { background-color: ${background}; color: ${color} }`)
     } else {
      if (!(currentview.component.color === state.component.color && currentview.component.background === state.component.background)) {
       currentview.shadowRoot.adoptedStyleSheets[0].replaceSync(`:host { background-color: ${background}; color: ${color} }`)
      }
     }
     currentview.component = state.component
    }
    /*if (currentview.shadowRoot.textContent !== content) {
     currentview.shadowRoot.textContent = content
    }*/
   }
   this.previousview = currentview
  },
  setValue(k, v) {
   this.state = { ...this.state }
   this.state[k] = v
   this.index = this.type.indexOf({ state: this.state })
  },
  setIndex(index) {
   this.index = index
   this.state = this.type.get(index).state
  },
  setIndexFromAddressbar() {
   if (!location.hash) this.setIndex(this.type.indexOf({ state: _.home }))
   else this.setIndex(_.hash.indexOf(location.hash))
  },
 },
 debug: {
  dirty: true,
  stats: {
   prettyBigNumber(index) {
    return index.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
   },
   get parts() {
    return this.prettyBigNumber(_.engine.type.size)
   },
   get index() {
    return this.prettyBigNumber(_.engine.index)
   },
   get hx() {
    return _.hash.fromIndex(_.engine.index)
   },
   get state() {
    return _.engine.state
   },
  },
  error(owner, msg) {
   _.engine.stop()
   return `${owner.name}Error: ${msg}`
  },
  boot() {
   this.view = document.body.appendChild(document.createElement("div"))
   this.button = this.view.appendChild(document.createElement("button"))
   this.statview = this.view.appendChild(document.createElement("pre"))
   this.view.id = "debug"
   this.statview.id = "stats"
   this.button.id = "fuzzbtn"
  },
  render() {
   if (this.engineIndex !== _.engine.index) {
    this.statview.innerHTML = `${JSON.stringify(this.stats, (_, v) => (typeof v === "bigint" ? v.toString() + "n" : v), 1)}`
    this.engineIndex = _.engine.index
   }
   if (this.lastFuzzing !== _.engine.state["https://core.parts/fuzzing"]) {
    this.button.onclick = () => _.engine.setValue("https://core.parts/fuzzing", !_.engine.state["https://core.parts/fuzzing"])
    this.button.innerText = _.engine.state["https://core.parts/fuzzing"] ? "⏸" : "⏵"
    this.lastFuzzing = _.engine.state["https://core.parts/fuzzing"]
   }
  },
 },
 type: {
  color({ name = "color" } = {}) {
   return {
    name,
    parts:
     "#333445 #faf9f5 black silver gray white maroon red purple fuchsia green lime olive yellow navy blue teal aqua aliceblue antiquewhite aquamarine azure beige bisque blanchedalmond blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen gainsboro ghostwhite gold goldenrod greenyellow grey honeydew hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen lightskyblue lightslategray lightslategrey lightsteelblue lightyellow limegreen linen magenta mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite oldlace olivedrab orange orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue rebeccapurple rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna skyblue slateblue slategray slategrey snow springgreen steelblue tan thistle tomato transparent turquoise violet wheat whitesmoke yellowgreen".split(
      " ",
     ),
   }
  },
  number({ name = "number", max = 127, archival = false } = {}) {
   return { name, parts: new Array(max).fill(0).map((_, i) => i), archival }
  },
  index({ name = "index", bitdepth = 7n } = {}) {
   return { name, bitdepth }
  },
  shadowtag({ name = "tag" } = {}) {
   return { name, parts: "ARTICLE ASIDE BLOCKQUOTE BODY DIV FOOTER H1 H2 H3 H4 H5 H6 HEADER MAIN NAV P SECTION SPAN".split(" ") }
  },
  element({ name = "element" } = {}) {
   return {
    name,
    parts: [
     {
      name: "tag",
      parts: [
       ..."HTML HEAD TITLE ADDRESS HR PRE CITE Q DFN EM STRONG SMALL SUB SUP ABBR TIME MARK DEL INS OL UL LI DL DT DD TABLE CAPTION THEAD TBODY TFOOT TR TH TD FORM LABEL INPUT BUTTON SELECT OPTION TEXTAREA FIELDSET LEGEND IMG AUDIO SOURCE VIDEO IFRAME EMBED OBJECT FIGURE FIGCAPTION DETAILS SUMMARY DATALIST OUTPUT".split(
        " ",
       ),
       ..."ARTICLE ASIDE BLOCKQUOTE BODY DIV FOOTER H1 H2 H3 H4 H5 H6 HEADER MAIN NAV P SECTION SPAN".split(" "),
      ],
     },
     this.children(),
    ],
    composite: true,
   }
  },
  children({ name = "children" } = {}) {
   return { name, parts: [].concat("") }
  },
  component({ name = "component" } = {}) {
   return { name, parts: [this.shadowtag(), this.color(), this.color("background"), this.children()], composite: true }
  },
  node({ name = "node" } = {}) {
   return {
    name,
    parts: [
     { name: "text", parts: ["Hello world!", "This is a bit of placeholder text.", "This is a text option."] },
     { name: "comment", parts: ["This is an example comment!", "comment goes here"] },
    ],
   }
  },
  code({ name = "code" } = {}) {
   return {
    name,
    parts: Object.keys(_).map(name => {
     return {
      name,
      parts: Object.keys(_[name]).map(key => ({
       name: key,
       parts: [
        { name: "typeof", parts: [typeof _[name][key]] },
        { name: "toString", parts: [_[name][key].toString()] },
       ],
       composite: true,
      })),
     }
    }),
   }
  },
  state({ name = "state" } = {}) {
   return {
    name,
    parts: [
     this.number({
      name: "https://core.parts/framerate",
      max: 90,
      archival: true,
     }),
     {
      name: "https://core.parts/fuzzing",
      parts: [false, true],
      archival: true,
     },
     {
      name: "https://core.parts/mode",
      parts: ["dark", "light", "device"],
     },
     {
      name: "https://core.parts/application",
      parts: ["core.parts", "ejaugust.com", "pilot.parts", "kheb.online", "fallback.cloud", "kireji.app", "kireji.io", "orenjinari.com", "stargate.design"],
     },
    ],
    composite: true,
   }
  },
 },
 home: {
  "https://core.parts/framerate": 60,
  "https://core.parts/fuzzing": false,
  "https://core.parts/mode": "device",
  "https://core.parts/application": location.host.slice(location.host.startsWith("dev.") ? 4 : 0),
 },
}

_.engine.boot()
