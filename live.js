onload = e => {
 const
  root = {
   // Queries
   "grey2.query": { value: "grey.color=grey2.color" },
   "grey1.query": { value: "grey.color=data:text/color,#333443" },
   "dev.core.parts.query": { value: "background.color=grey.color" },
   "version.query": { value: "inner.html=version.float&view.tag=name.tag" },
   "article.query": { value: "inner.html=color.html&view.tag=native.tag" },
   "footer.query": { value: "inner.html=../path.uri&view.tag=native.tag" },
   "header.query": { value: "view.children=header.txt&view.tag=native.tag" },
   "greyBackground.query": { value: "background.color=grey.color&layout.css=background.css" },

   // Meta
   "branches.metas": { value: {} },
   "prototype.meta": { get() { return Object.getPrototypeOf(this) } },

   // Views and nodes
   ".views": { value: {} },
   "view.nodes": { value: [] },
   "shadow.nodes": { get() { return this["view.nodes"].map(node => node.shadowRoot ?? node.attachShadow({ mode: "open" })) } },

   // Child lists and html
   "inner.html": { value: null },
   "color.html": { get() { return `<h1><b>I am <i>${this["background.color"]}</i></b></h1>` } },
   "view.children": { get() { return `header article footer` } },

   // HTML tag names
   "view.tag": { value: "tag-" },
   "native.tag": {
    get() {

     const name = this["name.uri"]

     if (!/^[a-zA-Z]+$/.test(name))
      throw RangeError(`Error: name "${name}" is not a native tagname.`)

     return name
    }
   },
   "name.tag": {
    get() {

     const
      name = this["name.uri"].replaceAll(/[^a-zA-Z0-9]+/g, '-'),
      tag = name + (name.includes('-') ? '' : '-')

     return tag
    }
   },

   // Stylesheets, layouts, and css tokens
   "layout.css": { value: "" },
   "view.stylesheet": { value: null },
   "view.layout": { get() { return `greyBackground` } },
   "background.css": { get() { return `:host { background: ${this["background.color"]} }` } },
   "grey2.color": { value: "#333446" },
   "grey.color": { value: "#333445" },
   "background.color": { value: "tomato" },

   // Plain text values
   "empty.txt": { value: "" },
   "header.txt": { value: "version" },

   // Numerical values
   "version.float": { value: 41 / 1000 },

   // Booleans
   "debug.bool": { value: false },

   // URIs
   "name.uri": { value: "https://core.parts" },
   "path.uri": { get() { return (this["prototype.meta"]?.["path.uri"] ?? "") + this["name.uri"] + "/" } },

   // Functions
   "branch.fn": {
    get() {
     return (name, inputs) => {

      if (name === core["name.uri"])
       return (this["branches.metas"][name] = Object.create(this, root))

      const
       description = {},
       query = this[name + ".query"]

      if (query === undefined || query === null)
       throw new RangeError('Error: missing query "' + name + '.query"')

      const entries = (query ? query.split('&') : []).map(attribute => attribute ? attribute.split('=') : [])

      for (const [key, ref] of entries) {

       if (ref.startsWith('data:')) {
        const datum = ref.slice(ref.indexOf(',') + 1)
        description[key] = { get() { return datum } }
        continue
       }

       let
        levels = 0,
        subkey = ref

       while (subkey.startsWith('../')) {
        subkey = subkey.slice(3)
        levels++
       }

       description[key] = {
        get() {

         let meta = this

         for (let i = 0; i < levels; i++) {
          meta = meta["prototype.meta"]
          if (meta === null) throw new RangeError(`Error: looking beyond core (from ${this["path.uri"]} to ${ref})`)
         }

         return meta[subkey]
        }
       }
      }


      description["name.uri"] = { value: name }
      description["branches.metas"] = { value: {} }
      description["view.nodes"] = { value: inputs?.["view.nodes"] ?? [] }
      description["view.stylesheet"] = { value: inputs?.["view.stylesheet"] ?? null }

      return (this["branches.metas"][name] = Object.create(this, description))
     }
    }
   },
   "donate.fn": {
    get() {
     return (child, parent, name = child["name.uri"]) => {
      delete this["branches.metas"][name]
      parent["branches.metas"][name] = child
      Object.setPrototypeOf(child, parent)
      child["render.fn"]()
     };
    },
   },
   "insert.fn": {
    get() {
     return name => {

      const
       meta = this["branch.fn"](name),
       branches = this["branches.metas"]

      for (const subkey in branches)
       if (branches[subkey] !== meta)
        this["donate.fn"](branches[subkey], meta, subkey)

      return meta
     }
    }
   },
   "remove.fn": {
    get() {
     return () => {

      if (this === core)
       throw new Error("Error: Attempted to remove core.")

      const
       prototype = this["prototype.meta"],
       branches = this["branches.metas"]

      delete prototype["branches.metas"][this["name.uri"]]

      for (const subkey in branches)
       this["donate.fn"](branches[subkey], prototype, subkey)

      return prototype
     }
    }
   },
   "replaceWith.fn": {
    get() {
     return name => {

      if (this === core)
       return this["insert.fn"](name)

      const
       prototype = this["prototype.meta"],
       meta = prototype["branch.fn"](name),
       branches = this["branches.metas"]

      delete prototype["branches.metas"][this["name.uri"]]

      for (const subkey in branches)
       this["donate.fn"](branches[subkey], meta, subkey)

      return meta
     }
    }
   },
   "render.fn": {
    get() {
     return () => {

      // this["view.nodes"].forEach(subkey => subkey.setAttribute("data-path", this["path.uri"]))

      this["setLayouts.fn"]()
      this["setChildren.fn"]()
      this["subrender.fn"]()
     }
    }
   },
   "subrender.fn": {
    get() {
     return () => {
      const branches = this["branches.metas"]

      for (const name in branches)
       branches[name]["render.fn"]()
     }
    }
   },
   "setChildren.fn": {
    get() {
     return () => {

      if (!this["view.nodes"].length)
       return

      const
       innerHTML = this["inner.html"],
       showAttributes = this["debug.bool"],
       path = this["path.uri"]

      if (innerHTML !== null) {

       for (const shadow of this["shadow.nodes"]) {

        if (shadow.innerHTML != innerHTML)
         shadow.innerHTML = innerHTML

        if (showAttributes)
         shadow.host.setAttribute('data-path', path)
       }

       return
      }

      const
       manifest = this["view.children"],
       incomingNames = manifest === '' ? [] : manifest.split(' ')

      for (const shadow of this["shadow.nodes"]) {

       const
        children = shadow.children,
        existingNodes = [...children],
        existingBranches = existingNodes.map(node => node.meta)

       if (showAttributes)
        shadow.host.setAttribute('data-path', path)

       let i = -1

       while (existingBranches.length && incomingNames.length) {

        i++

        const
         existingBranch = existingBranches.shift(),
         existing = existingBranch["name.uri"],
         incoming = incomingNames.shift()

        if (existing !== incoming) {

         const existingIndex = existingBranches.findIndex(meta => meta["name.uri"] === incoming)

         if (existingIndex === -1) {
          this["installChild.fn"](incoming, i)
         } else {
          shadow.insertBefore(children[i + existingIndex + 1], children[i])
          existingBranches.splice(existingIndex, 1)
         }

         if (incomingNames.some(name => name === existing)) {
          existingBranches.unshift(existing)
          continue
         }

         children[i + 1].remove()
        }
       }

       if (existingBranches.length) {
        existingBranches.forEach(() => children[i + 1].remove())
        return
       }

       if (incomingNames.length)
        incomingNames.forEach(name => this["installChild.fn"](name))
      }
     }
    }
   },
   "setLayouts.fn": {
    get() {
     return () => {

      if (this["view.stylesheet"] !== null)
       this["view.stylesheet"].replaceSync(this["layout.css"])

      if (!this["view.nodes"].length)
       return

      const
       layout = this["view.layout"],
       incomingNames = layout === '' ? [] : layout.split(' '),
       showAttributes = this["debug.bool"]

      for (const shadow of this["shadow.nodes"]) {

       const
        stylesheets = shadow.adoptedStyleSheets,
        existingSheets = [...stylesheets],
        existingBranches = existingSheets.map(sheet => sheet.meta)

       if (showAttributes)
        shadow.host.setAttribute('data-layout', layout)

       let i = -1

       while (existingBranches.length && incomingNames.length) {

        i++

        const
         existingBranch = existingBranches.shift(),
         existing = existingBranch["name.uri"],
         incoming = incomingNames.shift()

        if (existing === incoming)
         continue

        const existingIndex = existingBranches.findIndex(meta => meta["name.uri"] === incoming)

        let stylesheet

        if (existingIndex === -1) {
         stylesheet = new CSSStyleSheet()
         stylesheet.meta = this["branch.fn"](incoming, { ["view.stylesheet"]: stylesheet })
        } else {
         const stylesheetIndex = i + existingIndex + 1
         stylesheet = stylesheets[stylesheetIndex]
         stylesheets.splice(stylesheetIndex, 1)
         existingBranches.splice(existingIndex, 1)
        }

        stylesheets.splice(i, 0, stylesheet)

        if (incomingNames.some(name => name === existing)) {
         existingBranches.unshift(existing)
         continue
        }

        stylesheets.splice(i + 1, 1)
       }

       if (existingBranches.length)
        existingBranches.forEach(() => stylesheets.pop())
       else if (incomingNames.length)
        for (const incoming of incomingNames) {
         const stylesheet = new CSSStyleSheet()
         stylesheet.meta = this["branch.fn"](incoming, { ["view.stylesheet"]: stylesheet })
         stylesheets.push(stylesheet)
        }
      }
     }
    }
   },
   "installChild.fn": {
    get() {
     return (name, index = -1) => {

      const
       nodes = [],
       meta = this["branch.fn"](name, { "view.nodes": nodes }),
       showAttributes = this["debug.bool"]

      for (const shadow of this["shadow.nodes"]) {

       const
        node = document.createElement(meta["view.tag"]),
        children = shadow.children

       node.meta = meta
       nodes.push(node)

       if (showAttributes)
        node.setAttribute('data-name', name)


       if (index !== -1 && index < children.length)
        shadow.insertBefore(node, children[index])
       else
        shadow.appendChild(node)
      }
     }
    }
   },
   "test.fn": {
    get() {
     return () => {
      const
       delay = 65 / 1000,
       action = delay > (1000 / 60) ? setTimeout : requestAnimationFrame;

      action(() => {
       const $1 = this["insert.fn"]("grey1");
       action(() => {
        const $2 = $1["replaceWith.fn"]("grey2")
        action(() => {
         $2["remove.fn"]()
         this["test.fn"]()
        }, delay)
       }, delay)
      }, delay)
     }
    }
   }
  },
  core = Object.create(null, root),
  main = core["branch.fn"](location.host, { "view.nodes": [document.body] })

 document.body.meta = main
 main["render.fn"]()
 core["test.fn"]()
}