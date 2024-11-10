class Part {
 // if it's an object, each of it's properties are composite factors and the return value is an object
 // if it's an array, each of it's entries are options and the return value is the same type as the return value of the given member
 // if it's a function, it's a nullary getter and the return value is the result of applying the getter (consider having properties for fx tracking?)
 // if it's anything else, it's a terminal literal value
 static core = new this({
  version: {
   test: 7,
   cardinality: () => Part.cardinality,
  },
  framerate: new Array(90).fill(0).map((_, i) => i),
  fuzzing: [true, false],
  origin: ["core.parts", "ejaugust.com", "orenjinari.com"],
  mode: ["light", "dark", "device"],
  test: [
   [..."abc"],
   [1, 2, 3],
   ["do", "re", "me"],
   {
    x: 8,
    y: [0, -1, -2, -3],
   },
  ],
 })
 static time = performance.now()
 static averageFrameTime = 1000
 static frameRequest
 static fuzzing
 static coreView
 static coreBigInt
 static pausedAction
 static encodeHash(index) {
  const hexads = []
  const binaryString = index.toString(2)
  const newLength = Math.ceil(binaryString.length / 6)
  const fullbin = binaryString.padStart(newLength * 6, 0)
  for (let i = 0; i < newLength; i++) {
   hexads.push(fullbin.slice(i * 6, (i + 1) * 6))
  }
  const hash = "#" + hexads.reduce((hash, hexad) => hash + "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[parseInt(hexad, 2)], "")
  const testBigInt = this.decodeHash(hash)
  if (testBigInt != index) {
   throw this.error("EncodeHash", `lossy encoding detected.\n - hash = ${hash}\n - index = ${index}\n - test index = ${testBigInt}`)
  }
  return hash
 }
 static decodeHash(hash) {
  if (typeof hash !== "string" || hash.length <= 1 || hash[0] !== "#") {
   throw this.error("DecodeHash", `incorrectly formatted hash "${hash}". hashes must begin with the hash mark '#' followed by one or more hexads.`)
  }
  let binaryString = "0b"
  for (let i = 1; i < hash.length; i++) {
   binaryString += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".indexOf(hash[i]).toString(2).padStart(6, 0)
  }
  return BigInt(binaryString)
 }
 static error(system, msg) {
  // TODO: fallback to a previous version and populate the page in an error state
  cancelAnimationFrame(this.frameRequest)
  return `[HALT LOOP] ${system} error: ${msg}`
 }
 static visit({ hash }) {
  if (this.frameRequest) cancelAnimationFrame(this.frameRequest)
  history.lastSetTime = performance.now()
  this.setState(
   this.getState(
    (this.index = hash
     ? this.decodeHash(hash)
     : this.indexOf({
        test2: "test2",
        framerate: 60,
        fuzzing: false,
        origin: location.host.slice(location.host.startsWith("dev.") ? 4 : 0),
        mode: "device",
        version: {
         test: 7,
         cardinality: Part.cardinality,
        },
       })),
   ),
  )
  this.loop(performance.now())
 }
 static getState(index) {
  return this.core.getState(index).state
 }
 static setState(state) {
  const newState = { ...this.state, ...state }
  const newIndex = this.indexOf(newState)
  if (newIndex === -1n) {
   throw this.error("SetCore", `the given state was not possible.\n${JSON.stringify(newState, (_, value) => (typeof value === "bigint" ? value.toString() + "n" : value))}`)
  }
  // TODO: gather causality callbacks?
  // for (const [k, v] of Object.entries(newState)) {
  //  this.state[k] = v
  //  // do callbacks
  // }
  this.index = newIndex
  this.state = newState
 }
 static indexOf(state) {
  return this.core.indexOf({ state })
 }
 static loop(now) {
  // TODO: fire causality callbacks?
  // TODO: Streamline this so that debug is builtin to the constraint state.
  this.deltaTime = now - this.time
  this.averageFrameTime += (this.deltaTime - this.averageFrameTime) / 20
  this.time = now
  const fuzzing = this.state.fuzzing
  const adjustedState = {}
  if (fuzzing) {
   let { bitdepth } = this.core
   let binaryString = "0b"
   while (bitdepth--) binaryString += Math.trunc(Math.random() * 2)
   this.index = BigInt(binaryString) % this.core.cardinality
   Object.assign(adjustedState, this.getState(this.index))
  }
  adjustedState.framerate = Math.round(1000 / this.averageFrameTime)
  adjustedState.fuzzing = fuzzing
  // TODO: encode session time, deltaTime and start time here
  this.setState(adjustedState)
  if (DebugView.index !== this.index) {
   DebugStatView.innerHTML = `${JSON.stringify(
    {
     // TODO: just encode this.state after moving other three into this.state OR encoding version and it's dependant information into constraints
     cardinality: this.cardinality.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
     index: this.index.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
     hash: this.encodeHash(this.index),
     state: this.state,
    },
    (_, value) => (typeof value === "bigint" ? value.toString() + "n" : value),
    1,
   )}`
   DebugView.index = this.index
  }
  if (this.fuzzing !== fuzzing) {
   DebugButton.onclick = () => this.setState({ fuzzing: !fuzzing })
   DebugButton.innerText = fuzzing ? "⏸" : "⏵"
   this.fuzzing = fuzzing
  }
  if (this.pausedAction) {
   clearTimeout(this.pausedAction)
   this.pausedAction = undefined
  }
  if (this.index !== history.index) {
   this.pausedAction = setTimeout(() => {
    this.pausedAction = undefined
    const hash = this.encodeHash(this.index)
    if (hash === location.hash) {
     return
    }
    history.lastSetTime = performance.now()
    history.index = this.index
    history.replaceState({}, null, hash)
    document.title = this.encodeHash(this.index)
   }, (/^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? 350 : 75) - (performance.now() - history.lastSetTime))
  }
  let currentView = this.coreView
  if (this.state.element) {
   if (this.state.element.tag) {
    const tag = this.state.element.tag
    if (!(currentView && currentView instanceof Element && currentView.tagName === tag && !currentView.shadowRoot)) {
     currentView = document.createElement(tag)
     if (!this.coreView) {
      document.body.appendChild(currentView)
     } else {
      this.coreView.replaceWith(currentView)
     }
    }
    /*
       if (currentView.textContent !== content) {
        currentView.textContent = content
       }
      */
   }
  } else if (this.state.node) {
   if (this.state.node.text) {
    if (!(currentView && currentView instanceof Text)) {
     currentView = document.createTextNode(this.state.node.text)
     if (!this.coreView) {
      document.body.appendChild(currentView)
     } else {
      this.coreView.replaceWith(currentView)
     }
    }
    if (currentView.nodeValue !== this.state.node.text) {
     currentView.nodeValue = this.state.node.text
    }
   } else if (this.state.node.comment) {
    if (!(currentView && currentView instanceof Comment)) {
     currentView = document.createComment(this.state.node.comment)
     if (!this.coreView) {
      document.body.appendChild(currentView)
     } else {
      this.coreView.replaceWith(currentView)
     }
    }
    if (currentView.nodeValue !== this.state.node.comment) {
     currentView.nodeValue = this.state.node.comment
    }
   }
  } else if (this.state.component) {
   const tag = this.state.component.tag
   if (!(currentView instanceof Element && tag === currentView.tagName)) {
    currentView = document.createElement(tag)
    if (!this.coreView) {
     document.body.appendChild(currentView)
    } else {
     this.coreView.replaceWith(currentView)
    }
   }
   if (currentView.component !== this.state.component) {
    const color = this.state.component.color
    const background = this.state.component.background
    if (!currentView.component) {
     currentView.component = this.state.component
     const shadow = currentView.attachShadow({ mode: "open" }),
      sheet = new CSSStyleSheet()
     shadow.adoptedStyleSheets.push(sheet)
     sheet.replaceSync(`:host { background-color: ${background}; color: ${color} }`)
    } else {
     if (!(currentView.component.color === this.state.component.color && currentView.component.background === this.state.component.background)) {
      currentView.shadowRoot.adoptedStyleSheets[0].replaceSync(`:host { background-color: ${background}; color: ${color} }`)
     }
    }
    currentView.component = this.state.component
   }
   /*if (currentView.shadowRoot.textContent !== content) {
      currentView.shadowRoot.textContent = content
     }*/
  }
  this.coreView = currentView
  this.frameRequest = requestAnimationFrame(now => this.loop(now))
 }
 static get cardinality() {
  return this.core.cardinality
 }
 constructor(...args) {
  if (this.constructor == Part) throw Part.error("PartConstructor", "Part itself can't be instantiated.")
  console.log(this.setup, args)
 }
 /*
  const { name, parts, bitdepth, composite = false, get } = options
  this.name = name
  this.terminal = !("parts" in options)
  if (get) {
   this.get = get
   this.cardinality = 1n
  } else {
   if (this.terminal) {
    this.value = "value" in options ? options.value : name
    this.range = "bitdepth" in options
    this.cardinality = this.range ? 2n ** bitdepth : 1n
    this.length = 1
    this.composite = false
    this.lastkey = this.range ? this.cardinality.toString(2) : "0"
   } else {
    this.composite = composite
    this.length = parts.length
    // TODO: fix redundancy here
    if (composite) {
     const dimensions = new Set()
     this.cardinality = 1n
     this.parts = parts.map(e => {
      // TODO: if parts is array, it's a selection. If it's an object, it is a composite.
      const part = e instanceof Part ? e : new Part(typeof e === "object" ? e : { name: e })
      if (dimensions.has(part.name)) throw Part.error("NewPart", `duplicate identifier "${part.name}" in composite part ${this.name}.`)
      dimensions.add(part.name)
      this.cardinality *= part.cardinality
      return part
     })
    } else {
     let offset = 0n
     this.planes = {}
     this.cardinality = 0n
     this.parts = parts.map((e, i) => {
      // TODO: if parts is array, it's a selection. If it's an object, it is a composite.
      const part = e instanceof Part ? e : new Part(typeof e === "object" ? e : { name: e })
      const plane = (this.planes[part.name] ??= [])
      plane.push({ part, i, offset })
      offset += part.cardinality
      this.cardinality += part.cardinality
      return part
     })
    }
    this.lastkey = this.cardinality.toString(2)
   }
   this.bitdepth = this.lastkey.length
   this.depth64 = Math.ceil(this.bitdepth / 6)
   this.overhang = this.bitdepth % 6
  }*/
 indexOf(data) {
  let index = -1n
  if (this.terminal) {
   if (this.range) {
    if (typeof data === "object" && this.name in data && typeof data[this.name] === "bigint" && data[this.name] >= 0n && data[this.name] < this.cardinality) index = data[this.name]
   } else if (data === this.name) index = 0n
  } else if (typeof data === "object") {
   if (Object.keys(data).length === 1 && this.name in data) {
    const subdata = data[this.name]
    if (this.composite) {
     if (typeof subdata === "object") {
      const names = Object.keys(subdata)
      if (names.length === this.keys.length) {
       index = 0n
       for (let e = 0; e < this.keys.length; e++) {
        const unit = this.parts.slice(e + 1).reduce((u, part) => u * part.cardinality, 1n),
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
     if (typeof subdata === "string" || typeof subdata === "number" || typeof subdata === "boolean") name = subdata
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
  if (index === -1n) console.warn("data not found in " + this.name, data, { terminal: this.terminal, composite: this.composite })
  return index
 }
 getState(index) {
  let data = {}
  index %= this.cardinality
  if (this.terminal) {
   data = { [this.name]: this.range ? index : this.get ? this.get() : (data = this.value) }
  } else if (this.composite) {
   const subobject = (data[this.name] = {})
   for (let e = 0; e < this.length; e++) {
    const unit = this.parts.slice(e + 1).reduce((u, part) => u * part.cardinality, 1n),
     part = this.parts[e],
     result = part.getState(index / unit)
    console.log(this.name, part.name, result)
    // TODO: what if composite has a terminal dimension?
    Object.assign(subobject, result)
    index %= unit
   }
  } else {
   let offset = 0n
   for (let e = 0; e < this.length; e++) {
    const part = this.parts[e]
    if (index - offset < part.cardinality) {
     data[this.name] = part.getState(index - offset)
     break
    }
    offset += part.cardinality
   }
  }
  return data
 }
}

class Choice extends Part {
 setup(...choices) {
  let offset = 0n
  this.cardinality = 0n
  this.choices = choices.map((choice, i) => {
   const part = new Part(choice)
   const plane = (this.choices[part.name] ??= [])
   plane.push()
   offset += part.cardinality
   this.cardinality += part.cardinality
   return { part, i, offset }
  })
 }
}

class Composite extends Part {
 setup(factors) {
  this.dimension = 0
  this.cardinality = 1n
  this.factors = factors
  for (const name in factors) {
   this.cardinality *= (this.factors[key] = object[key]).cardinality
   this.dimension++
  }
 }
}

// TODO: move this type of thing into loop
const DebugView = document.body.appendChild(document.createElement("div"))
const DebugButton = DebugView.appendChild(document.createElement("button"))
const DebugStatView = DebugView.appendChild(document.createElement("pre"))
DebugView.id = "debug"
DebugStatView.id = "stats"
DebugButton.id = "fuzzbtn"

onhashchange = () => Part.visit(location)
Part.visit(location)

/*

A part (configuration space) providing
- subparts per the constraints of the space
- fast decompression of an integer to a state.
- fast compression of a state to an integer.
- the header of a table containing points in the space.

A state (position vector representing a point in that configuration space) having
- subspaces corresponding to inhabited subparts
- self-referential dimension storing the integer that decompressed to become it
- attachments to native objects including game objects and html elements
- the ability to move the state and see trickle down effects on the native objects

*/
