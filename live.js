const
 debug_limit = 1000,
 root = {
  ["version.float"]: {
   value: 38 / 1000
  },
  ["name.txt"]: {
   get() { return "https://core.parts" }
  },
  ["prototype.branch"]: {
   get() { return Object.getPrototypeOf(this) }
  },
  [".branches"]: {
   value: {}
  },
  ["view.node"]: {
   get() { return document.body }
  },
  ["shadow.node"]: {
   get() { return this["#shadow"] ??= this["view.node"].attachShadow({ mode: "closed" }) }
  },
  ["path.uri"]: {
   get() { return (this["prototype.branch"]?.["path.uri"] ?? '') + this["name.txt"] + '/' }
  },
  ["view.html"]: {
   get() { return `I am ${this["live.color"]}.` }
  },
  ["layout.css"]: {
   get() { return `:host { background: ${this["live.color"]} }` }
  },
  ["view.stylesheet"]: {
   get() {
    if (!this["#stylesheet"]) {
     this["#stylesheet"] = new CSSStyleSheet()
     this["shadow.node"].adoptedStyleSheets.push(this["#stylesheet"])
    }
    return this["#stylesheet"]
   }
  },

  ["live.color"]: {
   value: 'tomato'
  },
  ["green.color"]: {
   value: 'green'
  },
  ["yellow.color"]: {
   value: 'yellow'
  },
  ["brown.color"]: {
   value: 'brown'
  },

  ["root.map"]: {
   get() { return root }
  },
  ["dev.core.parts.map"]: {
   value: [["live.color", "green.color"]]
  },
  ["brown.map"]: {
   value: [["green.color", "brown.color"]]
  },
  ["yellow.map"]: {
   value: [["green.color", "yellow.color"]]
  },

  ["append.run"]: {
   get() {
    return name => {

     const descriptorMap = this["getDescriptorMap.run"](name);

     return this[".branches"][name] = Object.create(this, {
      ...descriptorMap,
      ["name.txt"]: { value: name },
      ["root.map"]: { value: descriptorMap },
      [".branches"]: { value: {} }
     })
    }
   }
  },
  ["donate.run"]: {
   get() {
    return (branch, recipient, name = branch["name.txt"]) => {
     delete this[".branches"][name]
     recipient[".branches"][name] = branch
     Object.setPrototypeOf(branch, recipient)
     branch["render.run"]()
    }
   }
  },
  ["insert.run"]: {
   get() {
    return name => {

     const insertedBranch = this["append.run"](name)

     for (const subname in this[".branches"]) {
      const branch = this[".branches"][subname];
      if (branch === insertedBranch) continue
      this["donate.run"](branch, insertedBranch, subname)
     }

     return insertedBranch
    }
   }
  },
  ["remove.run"]: {
   get() {
    return () => {

     if (this["path.uri"] === root["name.txt"].get())
      throw Error("Error: Attempted to delete core node.")

     const
      prototype = this["prototype.branch"],
      branches = this[".branches"];

     for (const subname in branches)
      this["donate.run"](branches[subname], prototype, subname)

     return prototype
    }
   }
  },
  ["replaceWith.run"]: {
   get() {
    return name => {

     if (this["path.uri"] === root["name.txt"].get())
      return this["insert.run"](name)

     const
      newCore = this["prototype.branch"]["append.run"](name),
      branches = this[".branches"];

     for (const subname in branches)
      this["donate.run"](branches[subname], newCore, subname)

     return newCore
    }
   }
  },
  ["getDescriptorMap.run"]: {
   get() {
    return name => {

     if (debug++ >= debug_limit) throw 'over limit'

     if (name === root["name.txt"].get())
      return root

     if (!(name + '.map' in this))
      throw RangeError('No such map as "' + name + '.map"')

     const map = {}

     for (const [a, b] of this[name + '.map'])
      map[a] = { get() { return this["prototype.branch"][b] } }

     return map
    }
   }
  },
  ["render.run"]: {
   get() {
    return () => {
     // TODO: Spawn fx network instead of full rerender.
     // TODO: Turn view.html and view.stylesheet into ordered lists of nodes and stylesheets, respectively.
     this["view.stylesheet"].replaceSync(this["layout.css"])
     this["shadow.node"].innerHTML = this["view.html"]
     this["view.node"].setAttribute('data-path', this["path.uri"])
    }
   }
  },
 }, hosted = Object.create(null, root)["append.run"](location.host)

var debug = 0
onload = () => {
 // Tests...
 hosted["render.run"]()
 setTimeout(() => {
  const browned = hosted["prototype.branch"]["insert.run"]("brown")
  setTimeout(() => {
   const yellowed = browned["replaceWith.run"]("yellow")
   setTimeout(() => {
    yellowed["remove.run"]()
   }, 3000)
  }, 3000)
 }, 2000)
}