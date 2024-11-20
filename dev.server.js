// version 86.7 / 1000
function boot() {
 async function client() {
  const style = document.querySelector("head>style"),
   body = document.body,
   alphabet64 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_",
   go = index => ($_CLIENT.HASH = encode(index)),
   encode = index => {
    const hexads = []
    const binaryString = index.toString(2)
    const newLength = Math.ceil(binaryString.length / 6)
    const fullbin = binaryString.padStart(newLength * 6, 0)
    for (let i = 0; i < newLength; i++) {
     hexads.push(fullbin.slice(i * 6, (i + 1) * 6))
    }
    const hash = "#" + hexads.reduce((hash, hexad) => hash + alphabet64[parseInt(hexad, 2)], "")
    debug: {
     const testBigInt = decode(hash)
     if (testBigInt != index) {
      throw this.error("EncodeHash", `lossy encoding detected.\n - hash = ${hash}\n - index = ${index}\n - test index = ${testBigInt}`)
     }
    }
    return hash
   },
   decode = hash => {
    if (typeof hash !== "string" || hash.length <= 1 || hash[0] !== "#") {
     throw this.error("DecodeHash", `incorrectly formatted hash "${hash}". hashes must begin with the hash mark '#' followed by one or more hexads.`)
    }
    let binaryString = "0b"
    for (let i = 1; i < hash.length; i++) {
     binaryString += alphabet64.indexOf(hash[i]).toString(2).padStart(6, 0)
    }
    return BigInt(binaryString)
   },
   $_CLIENT = {
    HAS_SW: "serviceWorker" in navigator,
    HAS_GPU: "gpu" in navigator,
    IS_MAC: navigator.userAgent.indexOf("Mac") > -1,
    THROTTLE_DURATION: /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? 350 : 75,
    FPS: 0,
    NOW: performance.now(),
    MEAN_FRAME_TIME: 1000,
    HASH: "#0",
    DOCUMENT_HASH: "#0",
    DOCUMENT_INDEX: 0,
    CONTEXT_KEYS: 0,
    SHIFTS_DOWN: 0,
   },
   loop = now => {
    $_CLIENT.MEAN_FRAME_TIME += (now - $_CLIENT.NOW - $_CLIENT.MEAN_FRAME_TIME) / 20
    $_CLIENT.NOW = now
    $_CLIENT.FPS = Math.round(1000 / $_CLIENT.MEAN_FRAME_TIME)

    if ($_CLIENT.NOW - $_CLIENT.THROTTLE_START_TIME >= $_CLIENT.THROTTLE_DURATION && location.hash !== $_CLIENT.HASH) {
     $_CLIENT.THROTTLE_START_TIME = now
     history.pushState({}, null, $_CLIENT.HASH)
    }

    if ($_CLIENT.DOCUMENT_HASH !== $_CLIENT.HASH) {
     newCore.populate(decode($_CLIENT.HASH))
     $_CLIENT.DOCUMENT_HASH = $_CLIENT.HASH
    }

    $_CLIENT.ANIM_FRAME = requestAnimationFrame(loop)
   }
  globalThis.$_CLIENT = $_CLIENT
  if ($_CLIENT.HAS_SW) {
   const _ = navigator.serviceWorker
   $_CLIENT.SW =
    ($_CLIENT.SW_REGISTRATION = await _.register(location.origin + "/" + (/^dev\./.test(location.host) ? "dev." : "") + "server.js")).active ??
    (await new Promise(r => (($_CLIENT.SW_REGISTRATION.waiting ?? $_CLIENT.SW_REGISTRATION.installing).onstatechange = ({ target: t }) => t.state == "activated" && r(t))))
   _.controller || (await new Promise(r => ((_.oncontrollerchange = r), $_CLIENT.SW.postMessage({ code: 0 }))))
   _.oncontrollerchange = _.onmessage = () => location.reload()
   $_CLIENT.MANIFEST_HREF = document.querySelector('[rel="manifest"]').href = location.origin + "/manifest.json"
   debug: {
    addEventListener("focus", () => $_CLIENT.SW_REGISTRATION.update().catch(() => location.reload()))
   }
  } else {
   console.error(new ReferenceError("ServiceWorker (and therefore offline features) is not supported on this client."))
  }
  if ($_CLIENT.HAS_GPU) {
   $_CLIENT.GPU = await (await navigator.gpu.requestAdapter()).requestDevice()
  }
  class Part {
   index = 0n
   cardinality = 1n
   constructor(name) {
    this.name = name
   }
   indexOf(data) {
    const index = this.getIndex(data) ?? -1n
    if (index === -1n) console.warn(`couldn't find data in part`, { data, part: this })
    return index
   }
   getIndex(data) {
    if (data === this.name) return 0n
   }
   enter() {}
   populate(index) {
    if (this.index === index) return
    if (index < 0n || index >= this.cardinality) throw new RangeError(`index ${index} out of range (cardinality ${this.cardinality}): ${this.name}`)
    this.index = index
   }
   leave() {
    this.index = 0n
   }
  }
  class Bitmask extends Part {
   constructor(name, length) {
    super(name)
    this.cardinality = 2n ** BigInt(length)
   }
   getIndex(data) {
    if (typeof data === "bigint" && data >= 0n && data < this.cardinality) return data
   }
  }
  class Decision extends Part {
   cardinality = 0n
   constructor(name, choices) {
    super(name)
    let offset = 0n
    this.planes = {}
    this.choices = choices.map((e, i) => {
     const choice = typeof e === "string" ? new Part(e) : e
     if (!(choice instanceof Part)) throw new TypeError(`unexpected ${typeof e} encountered as choice ${i} of decision ${this.name}`)
     const plane = (this.planes[choice.name] ??= [])
     plane.push({ choice, i, offset })
     offset += choice.cardinality
     this.cardinality += choice.cardinality
     choice.controller = this
     return choice
    })
   }
   getIndex(data) {
    let name
    if (typeof data === "object" && Object.keys(data).length === 1) name = Object.keys(data)[0]
    const stack = this.planes[name]
    if (stack) {
     for (const { part, offset } of stack) {
      const addend = part.indexOf(data)
      if (addend !== -1n) return offset + addend
     }
    }
   }
   enter() {
    console.group("Entering Decision", this)
    super.enter()
    this.choice = this.choices[0]
    this.choice.enter()
    console.groupEnd()
   }
   populate(index) {
    console.group("Populating", `${this.index} => ${index}`, this)
    super.populate(index)
    for (const choice of this.choices) {
     if (index < choice.cardinality) {
      if (this.choice !== choice) {
       this.choice?.leave()
       this.choice = choice
       choice.enter()
      }
      if (choice.index !== index) choice.populate(index)
      break
     }
     index -= choice.cardinality
    }
    console.groupEnd()
   }
   leave() {
    console.group("Leaving Decision", this)
    super.leave()
    this.choice.leave()
    delete this.choice
    console.groupEnd()
   }
  }
  class Composite extends Part {
   constructor(name, factors) {
    super(name)
    this.units = [1n]
    this.factors = {}
    this.parts = factors.reduceRight((parts, part) => {
     if (typeof part === "string") part = new Part(part)
     if (!(part instanceof Part)) throw new TypeError(`unexpected ${typeof part} encountered as factor of composite ${this.name}`)
     if (part.name in this.factors) throw new RangeError(`duplicate part name ${part.name} in composite ${name}`)
     this.factors[part.name] = part
     parts.unshift(part)
     this.units.unshift(this.units[0] * part.cardinality)
     part.controller = this
     return parts
    }, [])
    this.cardinality = this.units.shift()
   }
   getIndex(data) {
    const names = Object.keys(data)
    if (names.length !== this.parts.length) return
    let index = 0n
    for (let x = 0; x < this.units.length; x++) {
     const unit = this.units[x],
      part = this.parts[x],
      name = part.name
     if (!(name in data)) return
     const subindex = part.indexOf(data[name])
     if (subindex === -1n) return
     index += unit * subindex
    }
    return index
   }
   enter() {
    console.group("Entering Composite", this)
    super.enter()
    for (const part of this.parts) part.enter()
    console.groupEnd()
   }
   populate(index) {
    console.group("Populating", `${this.index} => ${index}`, this)
    super.populate(index)
    for (let x = 0; x < this.units.length; x++) {
     const unit = this.units[x],
      part = this.parts[x],
      subindex = index / unit
     part.populate(subindex)
     index %= unit
    }
    console.groupEnd()
   }
   leave() {
    console.group("Leaving Composite", this)
    super.leave()
    for (const part of this.parts) part.leave()
    console.groupEnd()
   }
  }
  class ExplorerSelectionAnchor extends Decision {
   constructor(items) {
    super("anchor", items)
    this.items = items
   }
   enter() {
    console.group("Entering ExplorerSelectionAnchor", this)
    super.enter()
    this.itemNodes = this.controller.itemNodes
    this.defaultNode = this.itemNodes[this.items[0]]
    this.anchorNode = this.defaultNode
    console.groupEnd()
   }
   populate(index) {
    console.group("Populating", `${this.index} => ${index}`, this)
    super.populate(index)
    this.anchorNode.removeAttribute("data-anchor")
    this.anchorNode = this.itemNodes[this.items[index]]
    this.anchorNode.setAttribute("data-anchor", "true")
    console.groupEnd()
   }
   leave() {
    super.leave()
    if (this.anchorNode !== this.defaultNode) {
     this.anchorNode.removeAttribute("data-anchor")
     this.defaultNode.setAttribute("data-anchor", "true")
    }
   }
  }
  class ExplorerSelectionMask extends Bitmask {
   sparseArray = {}
   constructor(items) {
    super("mask", items.length - 1)
    this.items = items
   }
   enter() {
    console.group("Entering ExplorerSelectionMask", this)
    super.enter()
    this.anchor = this.controller.anchor
    this.itemNodes = this.controller.itemNodes
    this.sparseArray = { 0: this.anchor.defaultNode }
    this.sparseArray[0].setAttribute("data-selected", "true")
    console.groupEnd()
   }
   populate(index) {
    console.group("Populating", `${this.index} => ${index}`, this)
    super.populate(index)
    const prefix = [...index.toString(2).padStart(this.items.length - 1, "0")].map(c => c === "1").reverse(),
     suffix = prefix.splice(Number(this.anchor.index)),
     mask = prefix.concat(true, suffix)
    for (let i = 0; i < mask.length; i++) {
     if (i in this.sparseArray) {
      if (!mask[i]) {
       this.sparseArray[i].removeAttribute("data-selected")
       delete this.sparseArray[i]
      }
     } else if (mask[i]) {
      this.sparseArray[i] = this.itemNodes[this.items[i]]
      this.sparseArray[i].setAttribute("data-selected", "true")
     }
    }
    console.groupEnd()
   }
   leave() {
    super.leave()
    for (const index in this.sparseArray) {
     this.sparseArray[index].removeAttribute("data-selected")
    }
   }
  }
  class ExplorerSelection extends Composite {
   constructor(items) {
    super("selection", [new ExplorerSelectionAnchor(items), new ExplorerSelectionMask(items)])
    this.anchor = this.factors.anchor
   }
   enter() {
    console.group("Entering ExplorerSelection", this)
    this.itemNodes = this.controller.itemNodes
    super.enter()
    console.groupEnd()
   }
  }
  class Explorer extends Decision {
   constructor() {
    const items = [
     ".htaccess",
     "index.php",
     "server.js",
     "client.js",
     "/favicon.svg",
     "/favicon.ico",
     "/apple-touch-icon.png",
     "/mobile-screenshot.svg",
     "/desktop-screenshot.svg",
     "/android-chrome-192x192.png",
     "/android-chrome-512x512.png",
    ]
    super("explorer", ["no-selection", new ExplorerSelection(items)])
    this.items = items
    this.container = body
    // TODO: get offset dynamically... hardcoding will be cumbersome
    this.offset = 1n
    this.selectionOffset = this.offset + 1n
    this.maskCardinality = this.choices[1].factors.mask.cardinality
    console.log(this.constructor.name, this.cardinality)
   }
   enter() {
    console.group("Entering Explorer", this)
    style.innerHTML = `html, body {
     background: linear-gradient(45deg, rgb(66,138,186) 0%, rgb(88,163,201) 47%, rgb(106,186,223) 100%);
     overflow: hidden;
     height: 100vh;
     width: 100vw;
     margin: 0;
     -webkit-user-select: none;
     overscroll-behavior-y: contain !important;
     -ms-user-select: none;
     user-select: none;
    }
    body {
     font-family: Arial, sans-serif;
     color: white;
     box-sizing: border-box;
     padding: 16px;
     --system-ui:
      system-ui,
      "Segoe UI",
      Roboto,
      Helvetica,
      Arial,
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol";
     font: 13px var(--system-ui);
    }
    #file-list {
     padding: 0;
     margin-top: 16px;
     border-radius: 3px;
     overflow: hidden;
     box-shadow: 2px 8px 16px #00208007;
    }
    li {
     list-style-type: none;
     display: flex;
     background: #adf6;
     padding: 15px;
     font-size: 16px;
     font-weight: 200;
     line-height: 16px;
     border-radius: 1.5px;
     color: #246;
     margin-bottom: 1px;
    }
    li::before, [data-anchor="true"]::after {
     content: "📄";
     width: 16px;
     height: 16px;
     font-size: 16px;
     line-height: 16px;
     margin-right: 1ch;
    }
    [data-anchor="true"]::after {
     background: #0005;
     content: "";
     margin-left: 1ch;
     margin-right: 0;
     border-radius: 8px;
    }
    [data-selected="true"] {
     background: #2466;
     color: white;
    }`
    body.innerHTML = `<h1 id="header">File Explorer</h1>`
    body.onclick = () => go(this.offset)
    const fileList = body.appendChild(document.createElement("ul"))
    fileList.setAttribute("id", "file-list")
    fileList.onclick = e => e.stopPropagation()
    this.itemNodes = {}
    for (let i = 0; i < this.items.length; i++) {
     const filename = this.items[i],
      itemNode = fileList.appendChild(document.createElement("li")),
      I = BigInt(i),
      replaceWithThis = () => go(this.selectionOffset + this.maskCardinality * I)
     itemNode.innerText = filename
     this.itemNodes[filename] = itemNode
     itemNode.onclick = e => {
      e.stopPropagation()
      const isSelected = itemNode.hasAttribute("data-selected"),
       anchorIndex = this.choices[1].factors.anchor.index,
       anchorOffset = anchorIndex * this.maskCardinality,
       anchorMaskThreshold = 2n ** anchorIndex,
       premaskOffset = this.selectionOffset + anchorOffset,
       clickedAnchor = anchorIndex === I,
       existingMaskIndex = this.choices[1].factors.mask.index,
       hasSelectionBelowAnchor = anchorMaskThreshold <= existingMaskIndex
      if ($_CLIENT.CONTEXT_KEYS) {
       if (isSelected) {
        if (clickedAnchor) {
         if (existingMaskIndex === 0n) go(this.offset)
         else if (hasSelectionBelowAnchor) {
          const fineMask = existingMaskIndex % anchorMaskThreshold,
           courseMask = existingMaskIndex / anchorMaskThreshold,
           courseMaskString = courseMask.toString(2),
           trimmedCourseMaskString = courseMaskString.replace(/0*$/, ""),
           trimCount = courseMaskString.length - trimmedCourseMaskString.length,
           reducedCourseMask = courseMask / 2n ** BigInt(trimCount + 1),
           newAnchorIndex = BigInt(i + trimCount + 1),
           adjustedAnchorMaskIndex = newAnchorIndex * this.maskCardinality,
           adjustedAnchorThreshold = 2n ** newAnchorIndex,
           newPremaskOffset = this.selectionOffset + adjustedAnchorMaskIndex,
           adjustedMaskIndex = reducedCourseMask * adjustedAnchorThreshold + fineMask
          go(newPremaskOffset + adjustedMaskIndex)
         } else {
          const newAnchorIndex = BigInt(existingMaskIndex.toString(2).length - 1),
           newAnchorMaskIndex = newAnchorIndex * this.maskCardinality,
           newPremaskOffset = this.selectionOffset + newAnchorMaskIndex,
           removeMask = 2n ** newAnchorIndex,
           newMaskIndex = existingMaskIndex - removeMask
          go(newPremaskOffset + newMaskIndex)
         }
        } else {
         const fineMask = existingMaskIndex % anchorMaskThreshold,
          courseMask = existingMaskIndex / anchorMaskThreshold,
          fullMask = (courseMask * 2n + 1n) * anchorMaskThreshold + fineMask,
          removeTargetMask = 2n ** I,
          newFullMask = fullMask - removeTargetMask,
          hasSelectionBelowTarget = newFullMask > removeTargetMask
         if (hasSelectionBelowTarget) {
          const newFineMask = newFullMask % removeTargetMask,
           newCourseMask = newFullMask / (removeTargetMask * 2n),
           newCourseMaskString = newCourseMask.toString(2),
           trimmedCourseMaskString = newCourseMaskString.replace(/0*$/, ""),
           trimCount = newCourseMaskString.length - trimmedCourseMaskString.length,
           reducedCourseMask = newCourseMask / 2n ** BigInt(trimCount + 1),
           newAnchorIndex = BigInt(i + trimCount + 1),
           adjustedAnchorMaskIndex = newAnchorIndex * this.maskCardinality,
           adjustedAnchorThreshold = 2n ** newAnchorIndex,
           newPremaskOffset = this.selectionOffset + adjustedAnchorMaskIndex,
           adjustedMaskIndex = reducedCourseMask * adjustedAnchorThreshold + newFineMask
          go(newPremaskOffset + adjustedMaskIndex)
         } else {
          const newAnchorIndex = BigInt(newFullMask.toString(2).length - 1),
           newAnchorMaskIndex = newAnchorIndex * this.maskCardinality,
           newPremaskOffset = this.selectionOffset + newAnchorMaskIndex,
           removeMask = 2n ** newAnchorIndex,
           newMaskIndex = newFullMask - removeMask
          go(newPremaskOffset + newMaskIndex)
         }
        }
       } else {
        if (this.index === 0n) replaceWithThis()
        else {
         const fineMask = existingMaskIndex % anchorMaskThreshold,
          courseMask = existingMaskIndex / anchorMaskThreshold,
          fullMask = (courseMask * 2n + 1n) * anchorMaskThreshold + fineMask,
          newAnchorMaskThreshold = 2n ** I,
          newFineMask = fullMask % newAnchorMaskThreshold,
          newCourseMask = fullMask / (newAnchorMaskThreshold * 2n),
          newMaskIndex = newCourseMask * newAnchorMaskThreshold + newFineMask,
          newAnchorMask = I * this.maskCardinality
         go(this.selectionOffset + newAnchorMask + newMaskIndex)
        }
       }
      } else if ($_CLIENT.SHIFTS_DOWN) {
       if (clickedAnchor) replaceWithThis()
       else {
        const delta = I - anchorIndex,
         clickedBelowAnchor = delta > 0,
         absDelta = clickedBelowAnchor ? delta : delta * -1n,
         ones = (2n ** absDelta - 1n) * 2n ** (anchorIndex - (clickedBelowAnchor ? 0n : absDelta))
        go(premaskOffset + ones)
       }
      } else replaceWithThis()
     }
    }
    this.anchorNode = this.itemNodes[this.items[0]]
    this.anchorNode.setAttribute("data-anchor", "true")
    super.enter()
    console.groupEnd()
   }
   leave() {
    console.group("Leaving Explorer", this)
    super.leave()
    style.innerHTML = body.innerHTML = ``
    body.onclick = undefined
    console.groupEnd()
   }
  }
  class Engine extends Composite {
   constructor() {
    super("engine", [new Bitmask("byte", 8)])
   }
   enter(byte) {
    console.group("Entering Engine", this)
    super.enter()
    console.warn("now doing a heavy process - creating the 3D engine from scratch. Use input for creation state... btye?", byte)
    const Utils = {
      foundation: classObj => {
       const pane = document.createElement("div")
       pane.setAttribute("id", classObj.classId)
       pane.addPart = (type, config = {}) => {
        const part = pane.appendChild(document.createElement(type))
        for (const key in config) {
         part.setAttribute(key, config[key])
        }
        return part
       }
       pane.addToClass = str => {
        if (pane.hasAttribute("class")) pane.setAttribute("class", pane.getAttribute("class") + " " + str)
        else pane.setAttribute("class", str)
       }
       pane.addTable = (heading, struct) => {
        pane.addPart("h2", {
         class: "key-value",
        }).innerText = heading
        const headerProperties = Object.getOwnPropertyDescriptors(struct)
        for (const key in headerProperties) {
         let element = undefined
         if (headerProperties[key].get) {
          if (headerProperties[key].set) {
           element = pane.addPart("div", {
            class: "key-value",
           })
           const label = element.appendChild(document.createElement("label"))
           label.innerText = key
           const input = element.appendChild(document.createElement("input"))
           input.value = struct[key]
           input.oninput = e => (struct[key] = input.value)
          } else {
           element = pane.addPart("div", {
            class: "key-value",
           })
           const label = element.appendChild(document.createElement("label"))
           label.innerText = key
           const output = element.appendChild(document.createElement("output"))
           output.value = struct[key]
          }
         } else if (headerProperties[key].set) {
          throw "set without get is not supported yet"
         }
        }
       }
       pane.addSurround = () => {
        pane.addToClass("surround")
        const label = pane.addPart("h1", {
         id: "h-" + classObj.classId.slice(2),
        })
        label.innerText = classObj.classId
        return label
       }
       pane.addToggle = config => {
        pane.addToClass("toggle")
        const toggle = pane.addPart("input", {
         value: "☰",
         type: "button",
         ...config,
        })
        if (Utils.cache(config.id + " toggle", false) === "true") {
         pane.setAttribute("open", "")
        }
        toggle.onclick = e => {
         if (pane.hasAttribute("open")) {
          Utils.updateCache(config.id + " toggle", false)
          pane.removeAttribute("open")
         } else {
          Utils.updateCache(config.id + " toggle", true)
          pane.setAttribute("open", "")
         }
        }
        return toggle
       }
       return pane
      },
      classId: "utils",
      chars: "-abcdefghijklmnopqrstuvwxyz",
      get base() {
       return this.chars.length
      },
      getBased(int) {
       let str = ""
       while (int) {
        let m = int % this.base
        str += this.chars[m]
        int = Math.floor(int / this.base)
       }
       return str
      },
      getColorKey(key) {
       const rgb = [...key]
        .reduce((sum, char, i) => sum + this.chars.indexOf(char) * this.base ** i, 0)
        .toString(2)
        .padStart(24, 0)
        .match(/.{8}/g)
        .map(b => parseInt(b, 2))
       return [...rgb, 255]
      },
      cache(
       key,
       fallback = () => {
        throw "No cache data and no fallback"
       },
       parse = null,
      ) {
       if (!key) throw "Missing cache key."
       let cached = localStorage[key]
       if (!cached) {
        if (typeof fallback == "function") localStorage[key] = fallback()
        else localStorage[key] = fallback
        cached = localStorage[key]
       }
       if (parse) {
        cached = parse(cached)
       }
       return cached
      },
      linkCache(scene) {
       return {
        push(key, value, encode = x => x) {
         localStorage[key + " " + scene.name] = encode(value)
         scene.onstatechanged.forEach(callback => callback(scene))
        },
        pull(key, fallback, decode = parseFloat) {
         const value = Utils.cache(key + " " + scene.name, fallback, x => decode(x))
         scene.onstatechanged.forEach(callback => callback(scene))
         return value
        },
       }
      },
      updateCache(key, value) {
       localStorage[key] = value
      },
      toggleFullscreen() {
       if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
         document.documentElement.requestFullscreen()
        } else if (document.documentElement.webkitRequestFullscreen) {
         document.documentElement.webkitRequestFullscreen()
        } else if (document.documentElement.msRequestFullscreen) {
         document.documentElement.msRequestFullscreen()
        }
       } else {
        if (document.exitFullscreen) {
         document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
         document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
         document.msExitFullscreen()
        }
       }
      },
     },
     same = (a, b) => a.every((x, i) => x == b[i]),
     DECODER = new TextDecoder()
    var _W, _A, _S, _D, _SPACE

    document.title = "3D Preview"

    class Group {
     static get classId() {
      return "group"
     }
     #mode = "shade"
     #scene
     constructor(children) {
      this.children = children.filter(child => {
       if (!child) return false
       child.group = this
       return true
      })
     }
     set mode(mode) {
      this.#mode = mode
      this.forEach(child => (child.mode = mode))
     }
     get scene() {
      return this.#scene
     }
     set scene(scene) {
      this.#scene = scene
     }
     map(getter) {
      return this.children.map(getter).flat()
     }
     forEach(callback) {
      this.children.forEach(child => callback(child))
     }
     get g() {
      return this.map(m => m.g)
     }
     get xyz() {
      return this.map(m => m.xyz)
     }
     get rgba() {
      return this.map(m => m.rgba)
     }
     get type() {
      return this.map(m => m.type)
     }
     get length() {
      return this.g.length
     }
    }
    class Prime extends Group {
     static get classId() {
      return "prime"
     }
     static createFoundation() {
      const foundation = Utils.foundation(this)
      foundation.addToggle({
       id: "prim",
      })
      foundation.addSurround()
      this.cache_to(10000)
      this.map((p, i) => (foundation.addPart("code").innerText = p))
      return foundation
     }
     static map(callback) {
      return Object.keys(this.primes).map(i => callback(this.primes[i], parseInt(i), this.primes))
     }
     static pi = {
      1: 0,
      2: 1,
     }
     static primes = {
      1: 2,
     }
     static pi_max = 1
     static x_max = 3
     static cache_to(n) {
      if (this.x_max >= n) return
      for (let x = this.x_max; x <= n; x++) {
       let i = 1
       while (this.primes[i] < x && x % this.primes[i] != 0) {
        i++
        if (this.pi_max < i) {
         this.primes[i] = x
         this.pi_max++
        }
       }
       this.pi[x] = this.pi_max
      }
      this.x_max = n
     }
     constructor() {
      super([])
      this.children.push(
       ...Prime.map((p, i) => {
        return new Mesh(Shape.cube, [p, -0.5, i, 1], Utils.getBased(i))
       }),
      )
     }
    }
    class Debug {
     static get classId() {
      return "debug"
     }
     static #foundation = undefined
     static previousFrameRate = 60
     static previousTime = undefined
     static frameRateElement = undefined
     static updateFrameRate(newTime) {
      const newFrameRate = 1000 / (this.previousTime ? newTime - this.previousTime : 1)
      this.previousTime = newTime
      this.previousFrameRate = (this.previousFrameRate + newFrameRate) / 2
      if (!this.frameRateElement) return
      this.frameRateElement.innerText = `${Math.round(this.previousFrameRate)} fps`
     }
     static createFoundation(core) {
      this.#foundation = body.appendChild(Utils.foundation(this))
      const toggleView = this.#foundation.addToggle({
       value: "☰",
       id: "menua",
      })
      this.frameRateElement = this.#foundation.appendChild(document.createElement("output"))
      this.frameRateElement.setAttribute("id", "fps")
      return this.#foundation
     }
     static watch(id = "debug") {
      if (!this.#foundation)
       return {
        innerText: "",
       }
      const watchElement = this.#foundation.appendChild(document.createElement("output"))
      watchElement.setAttribute("id", id)
      return watchElement
     }
     static tap(variable, transform = x => x) {
      console.log(transform(variable))
      return variable
     }
    }
    class Matrix {
     static get classId() {
      return "mtx"
     }
     static {
      const { cos, sin } = Math
      this.rx = a => [1, 0, 0, 0, 0, cos(a), -sin(a), 0, 0, sin(a), cos(a), 0, 0, 0, 0, 1]
      this.ry = a => [cos(a), 0, sin(a), 0, 0, 1, 0, 0, -sin(a), 0, cos(a), 0, 0, 0, 0, 1]
      this.rz = a => [cos(a), -sin(a), 0, 0, sin(a), cos(a), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
      this.t = (x, y, z) => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]
      this.s = (x, y, z) => [w, 0, 0, 0, 0, h, 0, 0, 0, 0, d, 0, 0, 0, 0, 1]
     }
    }
    class Shape {
     static get classId() {
      return "shape"
     }
     static cube = new Shape(
      [
       {
        x: 1,
        r: 1,
       },
       {
        x: -1,
        r: 0,
       },
       {
        y: 1,
        g: 0,
       },
       {
        y: -1,
        g: 1,
       },
       {
        z: 1,
        b: 1,
       },
       {
        z: -1,
        b: 0,
       },
       {
        layer: 2,
        type: "point",
       },
       {
        layer: 3,
        type: "point",
       },
       {
        layer: 4,
        type: "point",
       },
       {
        layer: 5,
        type: "point",
       },
       {
        layer: 6,
        type: "point",
       },
       {
        layer: 7,
        type: "point",
       },
       {
        layer: 8,
        type: "point",
       },
       {
        layer: 9,
        type: "point",
       },
      ],
      [
       [0, 2, 4, 6],
       [0, 2, 5, 7],
       [1, 2, 5, 8],
       [1, 2, 4, 9],
       [0, 3, 4, 10],
       [0, 3, 5, 11],
       [1, 3, 5, 12],
       [1, 3, 4, 13],
      ],
      [
       [0, 1],
       [1, 2],
       [2, 3],
       [3, 0],
       [4, 5],
       [5, 6],
       [6, 7],
       [7, 4],
       [0, 4],
       [1, 5],
       [2, 6],
       [3, 7],
      ],
      [
       [0, 1],
       [2, 3],
       [4, 5],
       [6, 7],
       [0, 8],
       [4, 9],
       [1, 9],
       [5, 10],
       [2, 10],
       [6, 11],
       [3, 11],
       [7, 8],
      ],
      [
       [0, 1],
       [2, 3],
       [4, 5],
       [6, 7],
       [8, 9],
       [10, 11],
      ],
     )
     #cache = {}
     constructor(tags, points, edges, tris, faces) {
      this.tags = tags
      this.points = points
      this.edges = edges
      this.tris = tris
      this.faces = faces
     }
     get length() {
      return this.points.length
     }
     getTaggedPoint(index, method) {
      const point =
       this.#cache[index] ??
       (this.#cache[index] = this.points[index].reduce(
        (result, tag) => ({
         ...result,
         ...this.tags[tag],
        }),
        {},
       ))
      return method(point)
     }
     getEdge(e) {
      return this.edges[e]
     }
     getEdgePair(t) {
      const pair = this.tris[t].map(e => this.getEdge(e))
      return pair
     }
     getRenderTri(t, method) {
      return Object.values(
       this.getEdgePair(t)
        .flat()
        .reduce((O, p) => (O[p] ? O : ((O[p] = this.getTaggedPoint(p, method)), O)), {}),
      )
     }
     getRenderTris(f, method) {
      return f.map(t => this.getRenderTri(t, method))
     }
     getEdgePoints(e, method) {
      return e.map(p => this.getTaggedPoint(p, method))
     }
     serialize_shade(method) {
      return this.faces.map(f => this.getRenderTris(f, method)).flat(2)
     }
     serialize_wire(method) {
      return this.edges.map(e => this.getEdgePoints(e, method)).flat(2)
     }
     serialize_point(method) {
      return this.points.map((_, i) => this.getTaggedPoint(i, method))
     }
     xyz(x, y, z, sx, sy = sx, sz = sx) {
      const fx = sx / 2,
       fy = sy / 2,
       fz = sz / 2
      return this.serialize_shade(_ => [_.x * fx + x, _.y * fy + y, _.z * fz + z]).flat()
     }
     wire_xyz(x, y, z, sx, sy = sx, sz = sx) {
      const fx = sx / 2,
       fy = sy / 2,
       fz = sz / 2
      return this.serialize_wire(_ => [_.x * fx + x, _.y * fy + y, _.z * fz + z]).flat()
     }
     point_xyz(x, y, z, sx, sy = sx, sz = sx) {
      const fx = sx / 2,
       fy = sy / 2,
       fz = sz / 2
      return this.serialize_point(_ => [_.x * fx + x, _.y * fy + y, _.z * fz + z])
     }
     get rgba() {
      return this.serialize_shade(_ => [_.r, _.g, _.b, _.a ?? 1]).flat()
     }
     get wire_rgba() {
      return this.serialize_wire(_ => [_.r, _.g, _.b, _.a ?? 1]).flat()
     }
     get point_rgba() {
      return this.serialize_point(_ => [_.r, _.g, _.b, 1])
     }
     get g() {
      return this.serialize_shade(_ => _.layer)
     }
     get wire_g() {
      return this.serialize_wire(_ => _.layer)
     }
     get point_g() {
      return this.serialize_point(_ => _.layer)
     }
     get point_type() {
      return this.serialize_point(_ => Utils.getColorKey(_.type))
     }
    }
    class T {
     static get classId() {
      return "type"
     }
     static Text(width) {
      const bitDepth = 8 ** width
      const logName = bitDepth + "-bit text"
      return new T(view => DECODER.decode(view), Debug.early, width, logName)
     }
     static Integer(width, signed) {
      const bitDepth = 8 * width
      const nameRoot = (signed ? "I" : "Ui") + "nt" + bitDepth
      const logName = bitDepth + "-bit " + (signed ? "" : "un") + "signed integer"
      return new T(view => view["get" + nameRoot](0, 0), Debug.early, width, logName)
     }
     static t4 = this.Text(4)
     static u2 = this.Integer(2)
     static u4 = this.Integer(4)
     #readView
     #setView
     #logName
     #byteCount
     #terminalBytePredicate
     constructor(readView, setView, byteCount, logName, terminalBytePredicate) {
      this.#readView = readView
      this.#setView = setView
      this.#byteCount = byteCount
      this.#logName = logName
      this.#terminalBytePredicate = terminalBytePredicate
     }
     cast(view) {
      return this.#readView(view)
     }
     write(view, data) {
      return this.#setView(view, data)
     }
     get logName() {
      return this.#logName
     }
     countBytes(source, offset) {
      if (this.#terminalBytePredicate) {
       const view = new DataView(source, offset, this.#byteCount)
       for (let i = 0; i < view.byteLength; i++) {
        const isLast = this.#terminalBytePredicate(view.getUint8(i))
        if (isLast) return i + 1
       }
       throw `${this.logName}: string exceeded expected max length of ${this.#byteCount} (no terminator found)`
      }
      return this.#byteCount
     }
    }
    class Struct {
     static get classId() {
      return "struc"
     }
     #views = {}
     #offset = 0
     #byteCount = 0
     #source = undefined
     get byteCount() {
      return this.#byteCount
     }
     get offset() {
      return this.#offset
     }
     constructor(source, offset, ...properties) {
      this.#source = source
      this.#offset = offset
      properties.forEach(p => this.#attach(...p))
     }
     #attach(type, key, get = true, set = false, isEnabled) {
      if (isEnabled && !isEnabled(this)) return
      const byteCount = type.countBytes(this.#source, this.#offset + this.byteCount)
      const view = this.#addView(key, byteCount)
      get ? (set ? this.#addGetSet(type, key) : this.#addGet(type, key)) : null
      this.#byteCount += byteCount
     }
     #addView(key, byteCount) {
      return (this.#views[key] = new DataView(this.#source, this.#offset + this.#byteCount, byteCount))
     }
     #addGet(type, key) {
      Object.defineProperty(this, key, {
       get: function () {
        return type.cast(this.#views[key])
       },
      })
     }
     #addGetSet(type, key) {
      Object.defineProperty(this, key, {
       get: function () {
        return type.cast(this.#views[key])
       },
       set: function (data) {
        type.write(this.#views[key], data)
       },
      })
     }
    }
    class File {
     static get classId() {
      return "file"
     }
     #byteCount = 0
     #buffer = undefined
     #signature = undefined
     constructor(buffer) {
      if (!(buffer instanceof ArrayBuffer)) throw "File constructor requires an ArrayBuffer"
      const signatureSize = 4
      this.#signature = new DataView(buffer, 0, signatureSize)
      this.#byteCount += signatureSize
      this.#buffer = buffer
     }
     get signature() {
      return DECODER.decode(this.#signature)
     }
     get byteCount() {
      return this.#byteCount
     }
     skip(count) {
      this.#byteCount += count
     }
     addStruct(...args) {
      const struct = new Struct(...args)
      this.skip(struct.byteCount)
      return struct
     }
     get buffer() {
      return this.#buffer
     }
    }
    class Woff2 extends File {
     static get classId() {
      return "woffb"
     }
     #source = undefined
     #header = undefined
     #tableDirectory = []
     #collectionDirectory = undefined
     #compressedFontData = undefined
     #extendedMetaData = undefined
     #privateData = undefined
     constructor(src) {
      super(src)
      const UINT16_255 = new T(Debug.early, Debug.early, 1),
       UINTBASE128 = new T(
        view => {
         let accum = 0
         for (let i = 0; i < view.byteLength; i++) {
          const data_byte = view.getUint8(i)
          if (i == 0 && data_byte == 0x80) throw "UIntBase128 with leading zeros"
          if (accum & 0xfe000000) throw "UIntBase128 top 7 bits are set"
          accum = (accum << 7) | (data_byte & 0x7f)
         }
         return accum
        },
        Debug.early,
        5,
        "Variable-length base-128 sequence",
        byte => (byte & 0x80) == 0,
       ),
       FLAGS = (values =>
        new T(
         view => {
          const data_byte = view.getUint8(0)
          const tag = values[data_byte & 0b00111111]
          const transform = (data_byte & 0b11000000) >> 6
          return {
           tag,
           transform,
           toString() {
            return [this.tag, this.transform].join(", ")
           },
          }
         },
         Debug.early,
         1,
         "{ 5-bit table tag, 2-bit transform number }",
        ))([
        "cmap",
        "head",
        "hhea",
        "hmtx",
        "maxp",
        "name",
        "OS/2",
        "post",
        "cvt ",
        "fpgm",
        "glyf",
        "loca",
        "prep",
        "CFF ",
        "VORG",
        "EBDT",
        "EBLC",
        "gasp",
        "hdmx",
        "kern",
        "LTSH",
        "PCLT",
        "VDMX",
        "vhea",
        "vmtx",
        "BASE",
        "GDEF",
        "GPOS",
        "GSUB",
        "EBSC",
        "JSTF",
        "MATH",
        "CBDT",
        "CBLC",
        "COLR",
        "CPAL",
        "SVG ",
        "sbix",
        "acnt",
        "avar",
        "bdat",
        "bloc",
        "bsln",
        "cvar",
        "fdsc",
        "feat",
        "fmtx",
        "fvar",
        "gvar",
        "hsty",
        "just",
        "lcar",
        "mort",
        "morx",
        "opbd",
        "prop",
        "trak",
        "Zapf",
        "Silf",
        "Glat",
        "Gloc",
        "Feat",
        "Sill",
        "cust",
       ])
      const { t4, u2, u4 } = T
      this.#header = this.addStruct(
       src,
       this.byteCount,
       [t4, "flavor"],
       [u4, "length"],
       [u2, "numTables"],
       [u2, "reserved", false],
       [u4, "totalSfntSize"],
       [u4, "totalCompressedSize"],
       [u2, "majorVersion"],
       [u2, "minorVersion"],
       [u4, "metaOffset"],
       [u4, "metaLength"],
       [u4, "metaOrigLength"],
       [u4, "privOffset"],
       [u4, "privLength"],
      )
      for (let i = 0, max = this.header.numTables; i < max; i++) {
       this.#tableDirectory.push(
        this.addStruct(
         src,
         this.byteCount,
         [FLAGS, "flags"],
         [t4, "tag", true, false, struct => struct.flags.tag == "cust"],
         [UINTBASE128, "origLength"],
         [
          UINTBASE128,
          "transformLength",
          true,
          null,
          struct => {
           const hasTransform = tag => {
            switch (tag) {
             case "hmtx":
              return struct.flags.transform === 1
             case "loca":
             case "glyf":
              return struct.flags.transform === 0
             case "cust":
              return hasTransform(struct.tag)
             default:
              if (struct.flags.transform !== 0) throw `transform inside ${tag} table. ${struct.offset}(0x${struct.offset.toString(16)}) ${struct.byteCount}`
              return false
            }
           }
           return hasTransform(struct.flags.tag)
          },
         ],
        ),
       )
      }
      /*
    this.#collectionDirectory = new Struct(src, cursor, [
    
    ])
    this.#compressedFontData = new Struct(src, cursor, [
    
    ])
    this.#extendedMetaData = new Struct(src, cursor, [
    
    ])
    this.#privateData = new Struct(src, cursor, [
    
    ])*/
      if (this.signature !== "wOF2") throw "Invalid Woff2 file!"
     }
     get header() {
      return this.#header
     }
     get tableDirectory() {
      return this.#tableDirectory
     }
     get collectionDirectory() {
      return this.#collectionDirectory
     }
     get compressedFontData() {
      return this.#compressedFontData
     }
     get extendedMetaData() {
      return this.#extendedMetaData
     }
     get privateData() {
      return this.#privateData
     }
     toFontFace(family) {
      return new FontFace(family, this.buffer)
     }
    }
    class Font {
     static get classId() {
      return "font"
     }
     static #output = undefined
     static #foundation = undefined
     static createFoundation() {
      this.#foundation = Utils.foundation(this)
      this.#foundation.addToggle({
       id: "fnt",
      })
      const heading = this.#foundation.addSurround()
      this.#output = this.#foundation.addPart("output", {
       id: "afont",
      })
      this.#output.value = "initialized."
      const selectedFont = new Font("font.woff2", "Kireji Sans")
      heading.innerText = selectedFont.family
      const linkToDocs = this.#foundation.addPart("a", {
       href: "https://www.w3.org/TR/WOFF2/",
       id: "woffl",
       target: "_blank",
      })
      linkToDocs.innerText = "File Type Spec"

      return this.#foundation
     }
     #woff2 = undefined
     #installed = undefined
     constructor(uri, family) {
      this.tap(`loading '${uri}' as '${family}' ...`)
      this.uri = uri
      this.family = family
      this.install()
       .then(() => {
        this.tap(`successfully loaded '${uri}' as '${family}'`)
        this.inspect()
       })
       .catch(reason => {
        this.tap(`failed to load '${uri}' as '${family}'.\n\t\t ${reason}`)
       })
     }
     tap(value, transform = x => x) {
      Font.#output.value += "\n" + transform(value)
      return value
     }
     inspect() {
      Font.#foundation.addTable("header", this.#woff2.header)
      this.#woff2.tableDirectory.forEach((entry, i) => Font.#foundation.addTable(`tableDirectory[${i}]`, entry))
      this.tap(
       `${this.family} successfully parsed.\n/*\n\tEventually, file views like this\n\twill be a hierarchy of types.\n\tTheir foundations will be built\n\tand styled according to type.\n\n\tSome types are merely wrappers\n\tfor visualization, inheriting\n\tstructure from their base type\n*/`,
      )
     }
     async install() {
      if (this.#installed) document.fonts.delete(this.#installed)
      const reader = new FileReader()
      const blob = await fetch(this.uri).then(res => res.blob())
      return new Promise((resolve, reject) => {
       reader.onloadend = e => {
        this.#woff2 = new Woff2(reader.result)
        this.#installed = this.#woff2.toFontFace(this.family)
        this.#installed.load()
        document.fonts.add(this.#installed)
        resolve()
       }
       reader.onerror = e => reject("FileReader error")
       reader.readAsArrayBuffer(blob)
      })
     }
    }
    class Mesh {
     static get classId() {
      return "mesh"
     }
     static #register = new Map()
     static get(id) {
      return this.#register.get(id)
     }
     #mode = "shade"
     #id = [0, 0, 0, 0]
     constructor(shape, transform, name = "mesh", override = false) {
      this.shape = shape
      this.transform = transform
      this.name = name
      this.#id = Utils.getColorKey(name)
      this.override = override
      const tag = btoa(new Float32Array(this.#id))
      Mesh.#register.set(tag, this)
     }
     set mode(mode) {
      this.#mode = mode
     }
     get g() {
      if (this.override) {
       switch (this.#mode) {
        case "wire":
         return this.shape.wire_g.fill(this.override)
        default:
         return this.shape.g.fill(this.override)
       }
      }
      switch (this.#mode) {
       case "wire":
        return this.shape.wire_g
       default:
        return this.shape.g
      }
     }
     get xyz() {
      switch (this.#mode) {
       case "wire":
        return this.shape.wire_xyz(...this.transform)
       default:
        return this.shape.xyz(...this.transform)
      }
     }
     get rgba() {
      switch (this.#mode) {
       case "wire":
        return this.shape.wire_rgba
       default:
        return this.shape.rgba
      }
     }
     get type() {
      return this.g.map(g => this.#id.map(x => x / 255)).flat()
     }
    }
    class Camera {
     static get classId() {
      return "lens"
     }
     static get NO_ID() {
      return this.#noFocus
     }
     static #noFocus = btoa(new Float32Array([0, 0, 0, 0]))
     #scene = undefined
     #focus
     x = 99
     y = 99
     eyedrop
     mouseX = 0
     mouseY = 0
     fov = 35
     near = 0.1
     far = 10000
     setFocus() {
      this.#focus = this.eyedrop
      this.cache.push("focus", this.#focus, x => x.join(" "))
      Utils.updateCache("core focus", this.#focus)
      this.tapFocus.innerText = this.#focus
     }
     scopeIn() {
      this.scope *= 3 / 3.2
     }
     scopeOut() {
      this.scope *= 3.1 / 3
     }
     walk(w, a, s, d, space) {
      const yAngle = ((this.ry % 360) * Math.PI) / 180,
       speed = this.scope / 13,
       velocityU = s && w ? 0 : s ? speed : w ? -speed : 0,
       velocityV = a && d ? 0 : a ? speed : d ? -speed : 0,
       directionU = [velocityU * Math.sin(yAngle), velocityU * Math.cos(yAngle)],
       directionV = [velocityV * Math.sin(yAngle), velocityV * Math.cos(yAngle)]
      this.tx += -directionU[0] + -directionV[1]
      this.ty += space ? speed : -speed
      this.tz += -directionU[1] + directionV[0]
     }
     constructor(scene) {
      this.#scene = scene
      this.tapHover = Debug.watch("hover")
      this.tapFocus = Debug.watch("focus")
      this.eyedrop = [0, 0, 0, 0]
      this.#focus = this.cache.pull("focus", "0 0 0 0", x => x.split(" "))
     }
     get pixelRatio() {
      return this.#scene.pixelRatio
     }
     get focus() {
      return btoa(new Float32Array(this.#focus))
     }
     get hover() {
      return btoa(new Float32Array(this.eyedrop))
     }
     get cache() {
      return this.#scene.cache
     }
     set rx(v) {
      this.cache.push("rx", v)
     }
     get rx() {
      return this.cache.pull("rx", 0)
     }
     set ry(v) {
      this.cache.push("ry", v)
     }
     get ry() {
      return this.cache.pull("ry", 180)
     }
     set rz(v) {
      this.cache.push("rz", v)
     }
     get rz() {
      return this.cache.pull("rz", 0)
     }
     set tx(v) {
      this.cache.push("tx", v)
     }
     get tx() {
      return this.cache.pull("tx", 0)
     }
     set ty(v) {
      if (v < 0) v = 0
      this.cache.push("ty", v)
     }
     get ty() {
      return this.cache.pull("ty", 0)
     }
     set tz(v) {
      this.cache.push("tz", v)
     }
     get tz() {
      return this.cache.pull("tz", -210)
     }
     set scope(v) {
      this.cache.push("scope", v)
     }
     get scope() {
      return this.cache.pull("scope", 4)
     }
     set s(v) {
      this.cache.push("s", v)
     }
     get s() {
      return this.cache.pull("s", 5)
     }
     get t() {
      return (Date.now() - this.#scene.startTime) / 1000
     }
     get aspect() {
      return this.x / this.y
     }
     get proj() {
      let out = [],
       fovy = 180 - this.fov,
       aspect = this.aspect,
       near = this.near,
       far = this.far,
       f = 1.0 / Math.tan((Math.PI * fovy) / 180)
      out[0] = f / aspect
      out[1] = 0
      out[2] = 0
      out[3] = 0
      out[4] = 0
      out[5] = f
      out[6] = 0
      out[7] = 0
      out[8] = 0
      out[9] = 0
      out[11] = -1
      out[12] = 0
      out[13] = 0
      out[15] = 0
      if (far != null && far !== Infinity) {
       var nf = 1 / (near - far)
       out[10] = far * nf
       out[14] = far * near * nf
      } else {
       out[10] = -1
       out[14] = -near
      }
      return out
     }
     get buffer() {
      return new Float32Array([
       ...this.eyedrop.map(x => x / 255),
       ...this.#focus.map(x => x / 255),
       ...this.proj,
       ...Matrix.t(0, 0, -this.scope),
       ...Matrix.rz((this.rz * Math.PI) / 180),
       ...Matrix.rx((this.rx * Math.PI) / 180),
       ...Matrix.ry((this.ry * Math.PI) / 180),
       ...Matrix.t(this.tx, this.ty, this.tz),
       this.t,
      ])
     }
    }
    class Scene {
     static get classId() {
      return "scene"
     }
     #dirty = true
     #buffers = {}
     #cache = undefined
     #group = undefined
     #camera = undefined
     #onstatechanged = []
     #pixelRatio = undefined
     #startTime
     #frame = undefined
     constructor(group, pixelRatio = 1, context, view) {
      group.scene = this
      this.context = context
      this.view = view
      this.#group = group
      this.#pixelRatio = pixelRatio
      this.#cache = Utils.linkCache(this)
      this.#startTime = this.#cache.pull("start-time", () => Date.now())
      this.#camera = new Camera(this)
     }
     render(now) {
      Debug.updateFrameRate(now)
      this.#camera.walk(_W, _A, _S, _D, _SPACE)
      new RenderPass("id", this)
      new RenderPass("beauty", this)
      this.#frame = requestAnimationFrame(now => this.render(now))
     }
     stop() {
      cancelAnimationFrame(this.#frame)
     }
     drawIdPass(pass) {
      const pipeline = this.#getPipeline("triangle-list", "id")
      pass.setPipeline(pipeline)
      pass.setBindGroup(0, this.#getUniformBindGroup(pipeline))
      this.#changeBuffer(this.#buffers.uniform, this.#camera.buffer)
      const B = this.buffers
      pass.setIndexBuffer(B.index_id, "uint16")
      pass.setVertexBuffer(0, B.xyz_id)
      pass.setVertexBuffer(1, B.type_id)
      pass.drawIndexed(B.length_id)
     }
     drawBeautyPass(pass) {
      const pipeline = this.#getPipeline("triangle-list", "beauty")
      pass.setPipeline(pipeline)
      pass.setBindGroup(0, this.#getUniformBindGroup(pipeline))
      this.#changeBuffer(this.#buffers.uniform, this.#camera.buffer)
      const B = this.buffers
      pass.setIndexBuffer(B.index_shade, "uint16")
      pass.setVertexBuffer(0, B.xyz_shade)
      pass.setVertexBuffer(1, B.rgba_shade)
      pass.setVertexBuffer(2, B.type_id)
      pass.drawIndexed(B.length_shade)
     }
     drawWirePass(pass) {
      const pipeline = this.#getPipeline("line-list", "wire")
      pass.setPipeline(pipeline)
      pass.setBindGroup(0, this.#getUniformBindGroup(pipeline))
      const B = this.buffers
      pass.setIndexBuffer(B.index_wire, "uint16")
      pass.setVertexBuffer(0, B.xyz_wire)
      pass.setVertexBuffer(1, B.type_wire)
      pass.drawIndexed(B.length_wire)
     }
     #createBuffers() {
      const B = this.#buffers
      this.#group.mode = "shade"
      B.index_shade = createBuffer(new Uint16Array([...Array(this.#group.length).keys()]), GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST)
      B.type_shade = createBuffer(new Float32Array(this.#group.type))
      B.g_shade = createBuffer(new Int32Array(this.#group.g))
      B.rgba_shade = createBuffer(new Float32Array(this.#group.rgba))
      B.xyz_shade = createBuffer(new Float32Array(this.#group.xyz))
      B.length_shade = this.#group.length
      this.#group.mode = "id"
      B.index_id = createBuffer(new Uint16Array([...Array(this.#group.length).keys()]), GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST)
      B.type_id = createBuffer(new Float32Array(this.#group.type))
      B.g_id = createBuffer(new Int32Array(this.#group.g))
      B.rgba_id = createBuffer(new Float32Array(this.#group.rgba))
      B.xyz_id = createBuffer(new Float32Array(this.#group.xyz))
      B.length_id = this.#group.length
      this.#group.mode = "wire"
      B.index_wire = createBuffer(new Uint16Array([...Array(this.#group.length).keys()]), GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST)
      B.type_wire = createBuffer(new Float32Array(this.#group.type))
      B.g_wire = createBuffer(new Int32Array(this.#group.g))
      B.rgba_wire = createBuffer(new Float32Array(this.#group.rgba))
      B.xyz_wire = createBuffer(new Float32Array(this.#group.xyz))
      B.length_wire = this.#group.length
      B.uniform = createBuffer(this.#camera.buffer, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST)
     }
     #getPipeline(topology = "line-list", key = "wire") {
      const universalShaderModule = gpu.createShaderModule({
       code: `struct UBO {
    hover: vec4<f32>,
    focus: vec4<f32>,
    proj: mat4x4<f32>,
    offset: mat4x4<f32>,
    rz: mat4x4<f32>,
    rx: mat4x4<f32>,
    ry: mat4x4<f32>,
    pos: mat4x4<f32>,
    t: f32
   };
  
   @group(0)
   @binding(0)
   var<uniform>
   uniforms : UBO;
  
   @fragment fn wireF(
    @builtin(position) inPos: vec4<f32>,
    @location(0) inColor: vec4<f32>
   ) -> @location(0) vec4<f32> {
    return inColor;
   }
  
   @fragment fn idF(
    @builtin(position) inPos: vec4<f32>,
    @location(0) inColor: vec4<f32>
   ) -> @location(0) vec4<f32> {
    return inColor;
   }
  
   struct VSOut {
    @builtin(position) Position: vec4<f32>,
    @location(0) color: vec4<f32>,
    @location(1) half: vec4<f32>,
   };
  
   fn project(inPos: vec3<f32>) -> vec4<f32> {
    return uniforms.proj * (uniforms.offset * (uniforms.rz * (uniforms.rx * (uniforms.ry * uniforms.pos)))) * vec4<f32>(inPos, 1.0);
   }
  
   @vertex fn idV( @location(0) inPos: vec3<f32>, @location(1) id: vec4<f32>) -> VSOut {
    var out: VSOut;
    out.color = id;
    out.Position = project(inPos);
    return out;
   }
  
   @vertex fn wireV(@location(0) inPos: vec3<f32>, @location(1) id: vec4<f32>) -> VSOut {
    var out: VSOut;
    out.color = id;
    out.Position = project(inPos);
    return out;
   }
  
   @vertex fn beautyV(@location(0) inPos: vec3<f32>, @location(1) inColor: vec4<f32>, @location(2) id: vec4<f32>) -> VSOut {
    var out: VSOut;
    out.color = inColor;
    out.half = vec4<f32>(0,0,0,0);
    if (all(id==uniforms.focus)) {
     out.half = vec4<f32>(1,0.5,0,1);
    } else if (all(id==uniforms.hover)) {
     out.half = vec4<f32>(0,1,1,1);
    }
    out.Position = project(inPos);
    return out;
   }
  
   @fragment fn beautyF(
    @builtin(position) inPos: vec4<f32>,
    @location(0) inColor: vec4<f32>,
    @location(1) inHalf: vec4<f32>,
   ) -> @location(0) vec4<f32> {
    var out = vec4<f32>(inColor);
    out = round(out*16)/16;
    if (inHalf.a != 0) {
     if (inPos.y % 2 < 1 || inPos.x % 2 > 1) {
      out.r = inHalf.r;
      out.g = inHalf.g;
      out.b = inHalf.b;
      out.a = 1;
     }
    }
    out.r *= out.a;
    out.g *= out.a;
    out.b *= out.a;
    return out;
   }`,
      })
      const buffers = [
       {
        attributes: [
         {
          shaderLocation: 0,
          offset: 0,
          format: "float32x3",
         },
        ],
        arrayStride: 4 * 3,
        stepMode: "vertex",
       },
       {
        attributes: [
         {
          shaderLocation: 1,
          offset: 0,
          format: "float32x4",
         },
        ],
        arrayStride: 4 * 4,
        stepMode: "vertex",
       },
      ]
      if (key == "beauty") {
       buffers.push({
        attributes: [
         {
          shaderLocation: 2,
          offset: 0,
          format: "float32x4",
         },
        ],
        arrayStride: 4 * 4,
        stepMode: "vertex",
       })
      }
      return gpu.createRenderPipeline({
       layout: "auto",
       vertex: {
        module: universalShaderModule,
        entryPoint: key + "V",
        buffers,
       },
       fragment: {
        module: universalShaderModule,
        entryPoint: key + "F",
        targets: [
         {
          format: "bgra8unorm",
         },
        ],
       },
       primitive: {
        frontFace: "cw",
        cullMode: "none",
        topology,
       },
       depthStencil: {
        depthWriteEnabled: true,
        depthCompare: "less",
        format: "depth24plus-stencil8",
       },
      })
     }
     #getUniformBindGroup(pipeline) {
      return gpu.createBindGroup({
       layout: pipeline.getBindGroupLayout(0),
       entries: [
        {
         binding: 0,
         resource: {
          buffer: this.buffers.uniform,
         },
        },
       ],
      })
     }
     #changeBuffer(buffer, arr) {
      const encoder = gpu.createCommandEncoder()
      gpu.queue.writeBuffer(buffer, 0, arr)
      gpu.queue.submit([encoder.finish()])
     }
     get buffers() {
      if (this.#dirty) {
       this.#createBuffers()
       this.#dirty = false
      }
      return this.#buffers
     }
     get pixelRatio() {
      return this.#pixelRatio
     }
     get camera() {
      return this.#camera
     }
     get cache() {
      return this.#cache
     }
     get onstatechanged() {
      return this.#onstatechanged
     }
     get width() {
      return this.#camera.x
     }
     get height() {
      return this.#camera.y
     }
     set width(value) {
      this.#camera.x = value
     }
     set height(value) {
      this.#camera.y = value
     }
     get startTime() {
      return this.#startTime
     }
     get selected() {
      const id = this.camera.focus
      if (id == Camera.NO_ID) return null
      return Mesh.get(id)
     }
    }
    class RenderPass {
     static get classId() {
      return "rpass"
     }
     constructor(name, scene) {
      const offscreen = scene.context,
       onscreen = scene.view,
       attachments = {
        colorAttachments: [
         {
          get view() {
           return offscreen.getCurrentTexture().createView()
          },
          get clearValue() {
           return {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
           }
          },
          loadOp: "clear",
          storeOp: "store",
         },
        ],
        depthStencilAttachment: {
         get view() {
          return gpu
           .createTexture({
            size: [scene.width, scene.height, 1],
            dimension: "2d",
            format: "depth24plus-stencil8",
            usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
           })
           .createView()
         },
         depthClearValue: 1,
         depthLoadOp: "clear",
         depthStoreOp: "store",
         stencilClearValue: 0,
         stencilLoadOp: "clear",
         stencilStoreOp: "store",
        },
       }
      const commandEncoder = gpu.createCommandEncoder(),
       pass = commandEncoder.beginRenderPass(attachments)
      pass.setViewport(0, 0, scene.width, scene.height, 0, 1)
      pass.setScissorRect(0, 0, scene.width, scene.height)
      switch (name) {
       case "id":
        scene.drawIdPass(pass)
        break
       case "beauty-wire":
        scene.drawBeautyPass(pass)
        scene.drawWirePass(pass)
        break
       case "beauty":
        scene.drawBeautyPass(pass)
        break
       case "wire":
        scene.drawBeautyPass(pass)
        break
       default:
        throw `Unknown renderpass identifier '${name}'`
      }
      pass.end()
      gpu.queue.submit([commandEncoder.finish()])
      onscreen.clearRect(0, 0, scene.width, scene.height)
      onscreen.drawImage(offscreen.canvas, 0, 0)
      if (name == "id") {
       scene.camera.eyedrop = [...onscreen.getImageData(scene.camera.mouseX / scene.pixelRatio, scene.camera.mouseY / scene.pixelRatio, 1, 1).data]
       if (!same(scene.camera.eyedrop, [0, 0, 0, 0])) {
        onscreen.canvas.setAttribute("hover", "")
       } else {
        onscreen.canvas.removeAttribute("hover")
       }
      }
     }
    }
    style.innerHTML = `
  :root {
  background-color: silver;
  }
  
  * {
  box-sizing: border-box;
  text-overflow: ellipsis;
  font-family: 'Kireji Sans', sans-serif;
  }
  
  input {
  border: none;
  background: none;
  padding: 0;
  text-align: left;
  }
  
  output {
  white-space: pre;
  font-family: monospace;
  }
  
  #panel,
  #debug {
  border-radius: 4px;
  box-shadow: 0 0 0 1px black;
  background-color: #eee;
  }
  
  h1 {
  margin: 0;
  padding: 0;
  font-size: 1.3em;
  }
  
  #core {
  --sidebar-width: 31vw;
  --canvas-color: #eee;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  }
  
  #debug {
  position: absolute;
  left: calc(var(--sidebar-width) + 18px);
  top: 18px;
  display: flex;
  flex-flow: column nowrap;
  background: #1235;
  max-width: 100px;
  width: min-content;
  min-height: min-content;
  padding: 3px;
  }
  
  .key-value {
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  padding: 3px;
  background: white;
  border: 1px solid black;
  border-top: none;
  box-shadow: 6px 5px 3px #0005;
  margin-left: 3px;
  margin-right: 7px;
  }
  
  div.key-value:hover {
  background: #7be;
  }
  
  h2.key-value {
  border-radius: 4px 4px 0 0;
  border-top: 1px solid black;
  margin-top: 8px;
  margin-bottom: 0;
  padding: 6px;
  font-size: 1.2em;
  background-color: #17a;
  color: white;
  }
  
  div.key-value:last-of-type {
  margin-bottom: 8px;
  border-radius: 0 0 4px 4px;
  }
  
  .key-value>* {
  width: 50%;
  overflow: hidden;
  }
  
  #debug[open] {
  width: 100px;
  }
  
  #debug>*,
  #debug::after {
  font-family: monospace;
  color: white;
  }
  
  .toggle:not([open])>:not(:first-child) {
  display: none;
  }
  
  .toggle:not([open])::after {
  content: attr(id);
  padding-left: 8px;
  }
  
  .toggle:not([open]) {
  display: flex;
  flex-flow: row nowrap !important;
  }
  
  canvas {
  position: absolute;
  top: 0;
  right: 0;
  height: calc(100vh - 16px);
  width: calc(100vw - 16px);
  margin: 8px;
  image-rendering: pixelated;
  }
  
  canvas[hover] {
  cursor: pointer;
  }`
    body.setAttribute("id", "core")
    const createBuffer = (arr, usage = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST) => {
      let desc = {
       size: (arr.byteLength + 3) & ~3,
       usage,
       mappedAtCreation: true,
      }
      if (usage == (GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST)) {
       desc.size = Math.ceil(desc.size / 16) * 16
      }
      let buffer = gpu.createBuffer(desc)
      const writeArray =
       arr instanceof Uint16Array
        ? new Uint16Array(buffer.getMappedRange())
        : arr instanceof Int32Array
        ? new Int32Array(buffer.getMappedRange())
        : new Float32Array(buffer.getMappedRange())
      writeArray.set(arr)
      buffer.unmap()
      return buffer
     },
     offscreen = new OffscreenCanvas(64, 64),
     canvas = body.appendChild(document.createElement("canvas"))
    canvas.setAttribute("id", "panel")
    Prime.cache_to(10000)
    const context = offscreen.getContext("webgpu"),
     view = canvas.getContext("2d", { willReadFrequently: true }),
     scene = (globalThis.MyScene = new Scene(new Group([new Prime(), new Mesh(Shape.cube, [0, 0, 0, 16, 0, 16], "grid")]), 1, context, view)),
     camera = scene.camera,
     rect = canvas.getBoundingClientRect()
    canvas.width = scene.width = offscreen.width = Math.round(rect.width / scene.pixelRatio)
    canvas.height = scene.height = offscreen.height = Math.round(rect.height / scene.pixelRatio)
    let pointerState = 0,
     camSpeed = 0.6
    canvas.onwheel = event => {
     event.preventDefault()
     const factor = Math.sign(event.deltaY)
     if (factor > 0) camera.scopeIn()
     else camera.scopeOut()
    }
    canvas.onmousedown = event => {
     canvas.click()
     pointerState = 1
     event.preventDefault()
     globalThis.onmouseup = event => {
      if (pointerState == 1) camera.setFocus()
      pointerState = 0
      globalThis.onmouseup = undefined
     }
    }
    canvas.onmousemove = event => {
     const rect = canvas.getBoundingClientRect(),
      w = rect.width,
      h = rect.height
     camera.mouseX = event.offsetX
     camera.mouseY = event.offsetY
     if (pointerState) {
      if (pointerState == 1) {
       if (Math.sqrt(event.movementX ** 2 + event.movementY ** 2) > 1) {
        pointerState = 2
       }
      }
      camera.rx = Math.min(Math.max(-90, camera.rx + event.movementY * camSpeed), 90)
      camera.ry += event.movementX * camSpeed
     }
    }
    body.onkeydown = event => {
     event.preventDefault()
     switch (event.code) {
      case "KeyW":
       if (event.repeat) return
       _W = true
       break
      case "KeyA":
       if (event.repeat) return
       _A = true
       break
      case "KeyS":
       if (event.repeat) return
       _S = true
       break
      case "KeyD":
       if (event.repeat) return
       _D = true
       break
      case "Space":
       if (event.repeat) return
       _SPACE = true
       break
      case "Enter":
       console.log("use")
       break
      case "KeyF":
       let mesh = scene.selected,
        pos
       if (!mesh) {
        camera.tx = 0
        camera.ty = 0
        camera.tz = 0
       } else {
        let mt = mesh.transform
        camera.tx = -mt[0]
        camera.ty = -mt[1]
        camera.tz = -mt[2]
       }
       camera.scope = 4
       break
     }
    }
    body.onkeyup = event => {
     event.preventDefault()
     switch (event.code) {
      case "KeyW":
       _W = false
       break
      case "KeyA":
       _A = false
       break
      case "KeyS":
       _S = false
       break
      case "KeyD":
       _D = false
       break
      case "Space":
       _SPACE = false
       break
     }
    }
    canvas.ondblclick = () => Utils.toggleFullscreen()
    context.configure({
     device: gpu,
     format: "bgra8unorm",
     usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
     alphaMode: "premultiplied",
    })
    const resizeObserver = new ResizeObserver(resize => {
     setTimeout(() => {
      if (!(body.offsetWidth || body.offsetHeight || body.getClientRects().length)) return
      const rect = canvas.getBoundingClientRect()
      canvas.width = scene.width = offscreen.width = Math.round(rect.width / scene.pixelRatio)
      canvas.height = scene.height = offscreen.height = Math.round(rect.height / scene.pixelRatio)
     }, 0)
    })
    resizeObserver.observe(canvas)
    scene.render()
    console.groupEnd()
   }
   populate(index) {
    console.group("Populating", `${this.index} => ${index} ... using "byte"?'`, this)
    super.populate(index)
    console.groupEnd()
   }
   leave() {
    console.group("Leaving Engine.\nInspect memory closely to ensure 3D engine is completely destroyed.", this)
    super.leave()
    while (body.attributes.length > 0) body.removeAttribute(body.attributes[0].name)
    style.innerHTML = body.innerHTML = ``
    document.querySelector("head>title").remove()
    globalThis.MyScene.stop()
    delete globalThis.MyScene
    console.groupEnd()
   }
  }
  class Core extends Decision {
   constructor() {
    super("core", ["empty", new Explorer(), new Engine()])
   }
  }
  const newCore = new Core()
  newCore.enter() // enters at index 0 - shouldn't do anything to the page

  onblur = () => ($_CLIENT.CONTEXT_KEYS = $_CLIENT.SHIFTS_DOWN = 0)
  onkeydown = e => {
   if ($_CLIENT.IS_MAC) {
    if (e.key === "Meta") $_CLIENT.CONTEXT_KEYS++
   } else if (e.key === "Control") $_CLIENT.CONTEXT_KEYS++
   if (e.key === "Shift") $_CLIENT.SHIFTS_DOWN++
   if ($_CLIENT.CONTEXT_KEYS === 1 && !$_CLIENT.SHIFTS_DOWN && e.key === "z") history.back()
   if ($_CLIENT.CONTEXT_KEYS === 1 && !$_CLIENT.SHIFTS_DOWN && e.key === "y") history.forward()
   if ($_CLIENT.CONTEXT_KEYS === 1 && $_CLIENT.SHIFTS_DOWN && e.key === "z") history.forward()
   e.preventDefault()
  }
  onkeyup = e => {
   if ($_CLIENT.IS_MAC) {
    if (e.key === "Meta") $_CLIENT.CONTEXT_KEYS = Math.max(0, $_CLIENT.CONTEXT_KEYS - 1)
   } else if (e.key === "Control") $_CLIENT.CONTEXT_KEYS = Math.max(0, $_CLIENT.CONTEXT_KEYS - 1)
   if (e.key === "Shift") $_CLIENT.SHIFTS_DOWN = Math.max(0, $_CLIENT.SHIFTS_DOWN - 1)
   e.preventDefault()
  }
  onhashchange = () => {
   if ($_CLIENT.ANIM_FRAME) cancelAnimationFrame($_CLIENT.ANIM_FRAME)
   if (location.pathname !== "/" || location.search || !location.hash) history.replaceState({}, null, `${location.origin}/${location.hash || "#1"}`)
   $_CLIENT.HASH = location.hash
   loop(($_CLIENT.THROTTLE_START_TIME = performance.now()))
  }
  onhashchange()
 }
 if (this.constructor === this.Window) client()
 else {
  const cache = {}
  onfetch = e => {
   const { pathname } = new URL(e.request.url),
    cacheKey = pathname
   if (!(cacheKey in cache)) {
    let body, type
    switch (pathname) {
     /* recreate real server files */
     case "/.htaccess":
      type = "text/plain"
      body = `AddCharset utf-8 .js
 ErrorDocument 404 /index.php
 ErrorDocument 403 /index.php
 Options -Indexes`
      break
     case "/index.php":
      body = `<!DOCTYPE html
  ><link rel=manifest
  ><meta name=robots content=noindex
  ><meta name=viewport content="width=device-width,initial-scale=1"
  ><meta name=copyright content="&copy; 2024 Eric Augustinowicz"
  ><script defer src="https://<?=$_SERVER['HTTP_HOST']."/".(in_array($_SERVER['REMOTE_ADDR'],['173.168.55.24'])?'dev.':'')?>server.js"
  ></script><style></style><!-- REMOTE INDEX -->`
      type = "text/html"
     case "/server.js":
     case "/dev.server.js":
      body = `${boot}\nboot()\n`
      type = "text/javascript; charset=UTF-8"
      break
     /* create virtual local files */
     case "/client.js":
      body = `(${client})()`
      type = "text/javascript; charset=UTF-8"
      break
     case "/manifest.json":
      body = JSON.stringify(
       {
        name: location.host.split(".").join(" "),
        short_name: location.host,
        start_url: ".",
        display: "standalone",
        background_color: "#336598",
        description: "An expirimental app.",
        icons: [
         {
          src: "favicon.svg",
          sizes: "144x144",
          type: "image/svg+xml",
         },
        ],
       },
       /*{
       name: "Untitled Application",
       short_name: "Untitled",
       start_url: ".",
       display: "standalone",
       theme_color: "#336598",
       background_color: "#333445",
       description: "A kireji app.",
       display_override: ["window-controls-overlay"],
       icons: [
        {
         src: "favicon.svg",
         sixes: "144x144",
         type: "image/svg+xml",
        },
        {
         src: "favicon.svg",
         sixes: "any",
         type: "image/svg+xml",
        },
        {
         src: "/android-chrome-192x192.png",
         sixes: "192x192",
         type: "image/svg+xml",
        },
        {
         src: "/android-chrome-512x512.png",
         sixes: "512x512",
         type: "image/svg+xml",
        },
       ],
       categories: ["entertainment", "games", "utilities"],
       protocol_handlers: [
        {
         protocol: "web+Part",
         url: "/Part?pathname=%s",
        },
       ],
       shortcuts: [
        {
         name: "New Item...",
         short_name: "New...",
         icons: [
          {
           src: "favicon.svg",
           sixes: "any",
           type: "image/svg+xml",
          },
         ],
         url: "/new",
         description: "This is just a placeholder/hint for future development.",
        },
       ],
       screenshots: [
        {
         src: "desktop-screenshot.svg",
         sixes: "640x480",
         type: "image/svg+xml",
         form_factor: "wide",
         label: "This is a placeholder for the image of the app.",
        },
        {
         src: "mobile-screenshot.svg",
         sixes: "640x360",
         type: "image/svg+xml",
         form_factor: "narrow",
         label: "This is a placeholder for the image of the app.",
        },
       ],
      }*/
       null,
       1,
      )
      type = "application/json; charset=UTf-8"
      break
     case "/favicon.svg":
     case "/favicon.ico":
     case "/apple-touch-icon.png":
     case "/mobile-screenshot.svg":
     case "/desktop-screenshot.svg":
     case "/android-chrome-192x192.png":
     case "/android-chrome-512x512.png":
      type = "image/svg+xml"
      body = `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
   svg { background: white }
   path { stroke: #333445 }
   @media (prefers-color-scheme = dark) {
    svg { background: #333445 }
    path { stroke: white }
   }
  </style>
  <path d="M8 11C9.10457 11 10 10.1046 10 9C10 7.89543 9.10457 7 8 7C6.89543 7 6 7.89543 6 9C6 10.1046 6.89543 11 8 11Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.56055 21C12.1305 8.89998 16.7605 6.77998 22.0005 14.63" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18 3H6C3.79086 3 2 4.79086 2 7V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V7C22 4.79086 20.2091 3 18 3Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
      break
     default:
      body = `<!DOCTYPE html
><link rel=manifest href="${location.origin}/manifest.json"
><meta name=robots content=noindex
><meta name=viewport content="width=device-width,initial-scale=1"
><meta name=copyright content="&copy; 2024 Eric Augustinowicz"
><script defer src="${location.origin}/client.js"
></script><style></style><!-- LOCAL INDEX -->`
      type = "text/html"
    }
    cache[cacheKey] = new Response(body, {
     headers: {
      "content-type": type,
      expires: "Sun, 20 Jul 1969 20:17:00 UTC",
      server: "kireji",
     },
    })
   }
   e.respondWith(cache[cacheKey].clone())
  }
  oninstall = e => skipWaiting()
  onactivate = e => clients.claim()
  onmessage = e => [onactivate, () => registration.unregister().then(() => e.source.postMessage({ code: 0 }))][e.data.code]()
 }
}
boot()
