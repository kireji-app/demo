onload = e => {
 // Challenge: employ the same script on the server and use it to deliver files and interact between with clients
 const
  parts = {

   "default.parts": {
    get() {
     return ({
      "layout.uri": { value: "" },
      "layout.css": { value: "" },
      "view.node": { value: null },
      "children.uri": { value: "" },
      "view.tag": { value: "tag-" },
      "inner.html": { value: null },
      "heirs.things": { value: {} },
      "view.stylesheet": { value: null }
     })
    }
   },

   // Queries
   "grey2.query": { value: "grey.color=grey2.color" },
   "grey1.query": { value: "grey.color=data:text/color,#344555" },
   "dev.core.parts.query": { value: "background.color=grey.color&children.uri=editor-children.uri&layout.uri=theme-layout.uri" },
   "version.query": { value: "inner.html=version.float&view.tag=name.tag" },
   "address.query": { value: "inner.html=../../../path.uri&view.tag=data:text/tag,addressbar-&layout.uri=addressbar-layout.uri" },
   "sidebar.query": { value: "children.uri=sidebar-children.uri&view.tag=name.tag&layout.uri=sidebar-layout.uri&layout.css=sidebar.css" },
   "article.query": { value: "inner.html=color.html&view.tag=native.tag" },
   "header.query": { value: "children.uri=header-children.uri&view.tag=native.tag&layout.uri=header-layout.uri" },
   "grey-background.query": { value: "background.color=grey.color&layout.css=background.css" },
   "inspector.query": { value: "header.query=inspector-header.query&children.uri=zero-children.uri&view.tag=name.tag" },
   "inspector-header.query": { value: "inner.html=data:text/html,Some panel" },
   "top-menu.query": { value: "inner.html=data:text/html,top&view.tag=data:text/tag,top-menu" },
   "bottom-menu.query": { value: "inner.html=data:text/html,bottom&view.tag=data:text/tag,bottom-menu" },
   "main-layout.query": { value: "layout.css=main-layout.css" },
   "open-sidebar.query": { value: "sidebar-open.bool=true.bool" },
   "open-inspector.query": { value: "inspector-open.bool=true.bool" },
   "lighten-background.query": { value: "background.color=../light-background.color" },
   "addressbar-layout.query": { value: 'layout.css=addressbar.css' },
   "header-layout.query": { value: 'layout.css=header.css' },

   // Things
   "parent.thing": { get() { return Object.getPrototypeOf(this) } },

   // Child lists and html
   "color.html": { get() { return `${this["background.color"]}` } },
   "editor-children.uri": { get() { return `${this["sidebar-open.bool"] ? 'sidebar ' : ''}header article` } },
   "sidebar-children.uri": { get() { return `top-menu bottom-menu inspector` } },
   "inspector-children.uri": { get() { return `header menu` } },
   "header-children.uri": { value: "version address" },
   "zero-children.uri": { value: "" },

   // Stylesheets, layouts, and css tokens
   "background.css": { get() { return `:host { color: white; padding: 12px; background: ${this["background.color"]} }` } },
   "sidebar.css": {
    get() {
     const inspectorOpen = this["inspector-open.bool"];
     return `
      :host {
       color: ${this["background.color"]};
       background: ${this["light-background.color"]};
       display: grid;
       grid-template:
        "t${inspectorOpen ? ' i' : ''}" 50%
        "b${inspectorOpen ? ' i' : ''}" auto / 56px ${inspectorOpen ? '1fr' : ''};
      }
      top-menu { grid-area: t }
      bottom-menu { grid-area: b }
      ${inspectorOpen ? `inspector- { grid-area: i; background: ${this["beget.fn"]("lighten-background")["light-background.color"]} }` : ''}`
    }
   },
   "main-layout.css": {
    get() {
     const sidebarOpen = this["sidebar-open.bool"]
     return `
     :host {
      --system-ui: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      font: 13px var(--system-ui);
      margin: 0;
      padding: 0;
      display: grid;
      grid-template: 
       "${sidebarOpen ? 's ' : ''}h" 48px
       "${sidebarOpen ? 's ' : ''}c" auto / ${sidebarOpen ? `${(this["inspector-open.bool"] ? '2' : '')}56px ` : ''}1fr;
     }
     sidebar- { grid-area: s }
     header { grid-area: h }
     article { grid-area: c; margin: 24px }` }
   },
   "grey2.color": { value: "#444444" },
   "grey.color": { value: "#333445" },
   "light-background.color": { get() { return '#' + this["background.color"].match(/[^#]{2}/g).map(s => Math.trunc((1 - (1 - parseInt(s, 16) / 255) * 0.5) * 255).toString(16)).join('') } },
   "theme-layout.uri": { value: "main-layout" },
   "background.color": { value: "tomato" },
   "sidebar-layout.uri": { value: "sidebar" },
   "addressbar-layout.uri": { value: "addressbar-layout" },
   "header-layout.uri": { value: "header-layout" },
   "addressbar.css": { get() { return `:host { margin: 7px; display: inline-block; line-height: 24px; padding: 4px; border: 1px solid white; color: white; border-radius: 16px; background: ${this["background.color"]}}` } },
   "header.css": { get() { return `:host { background: ${this["beget.fn"]("lighten-background")["light-background.color"]}}` } },

   // HTML tag names
   "h1.tag": { value: "h1" },
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

   // Numerical values
   "version.float": { value: 42 / 1000 },

   // Booleans
   "debug.bool": { value: false },
   "true.bool": { value: true },
   "false.bool": { value: false },

   // URIs
   "name.uri": { value: "https://core.parts" },
   "path.uri": { get() { return (this["parent.thing"]?.["path.uri"] ?? "") + this["name.uri"] + "/" } },

   // Functions
   "beget.fn": {
    get() {
     return (name, inputParts) => {

      const
       description = { ... this["default.parts"] },
       query = this[name + ".query"];

      if (!(name + ".query" in this))
       throw new RangeError('Error: missing query for "' + name + '"')

      for (const [key, ref] of (query ? query.split('&') : []).map(a => a ? a.split('=') : [])) {

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

         let thing = this

         for (let i = 0; i < levels; i++) {

          thing = thing["parent.thing"]

          if (thing === null)
           throw new RangeError(`Error: reference to non-existent pre-core ${ref})`)
         }

         return thing[subkey]
        }
       }
      }

      return this["heirs.things"][name] = Object.create(this, Object.assign(description, inputParts, {
       "context.uri": { value: "context.uri defaults.uri name.uri query.uri" },
       "defaults.uri": { value: Object.keys(description).join(' ') },
       "name.uri": { value: name },
       "query.uri": { value: query }
      }))
     }
    }
   },
   "donate.fn": {
    get() {
     return (child, parent, name = child["name.uri"]) => {
      delete this["heirs.things"][name]
      parent["heirs.things"][name] = child
      Object.setPrototypeOf(child, parent)
      child["render.fn"]()
     };
    },
   },
   "insert.fn": {
    get() {
     return name => {

      const
       thing = this["beget.fn"](name),
       heirs = this["heirs.things"]

      for (const subkey in heirs)
       if (heirs[subkey] !== thing)
        this["donate.fn"](heirs[subkey], thing, subkey)

      return thing
     }
    }
   },
   "remove.fn": {
    get() {
     return () => {

      if (this === core)
       throw new Error("Error: Attempted to remove core.")

      const
       parent = this["parent.thing"],
       heirs = this["heirs.things"]

      delete parent["heirs.things"][this["name.uri"]]

      for (const subkey in heirs)
       this["donate.fn"](heirs[subkey], parent, subkey)

      return parent
     }
    }
   },
   "replaceWith.fn": {
    get() {
     return name => {

      if (this === core)
       return this["insert.fn"](name)

      const
       parent = this["parent.thing"],
       thing = parent["beget.fn"](name),
       heirs = this["heirs.things"]

      delete parent["heirs.things"][this["name.uri"]]

      for (const subkey in heirs)
       this["donate.fn"](heirs[subkey], thing, subkey)

      return thing
     }
    }
   },
   "render.fn": {
    get() {
     return () => {
      this["setLayouts.fn"]()
      this["setChildren.fn"]()
      this["subrender.fn"]()
     }
    }
   },
   "subrender.fn": {
    get() {
     return () => {
      const heirs = this["heirs.things"]

      for (const name in heirs)
       heirs[name]["render.fn"]()
     }
    }
   },
   "setChildren.fn": {
    get() {
     return () => {

      if (!this["view.node"])
       return

      const
       innerHTML = this["inner.html"],
       showAttributes = this["debug.bool"],
       path = this["path.uri"],
       { shadowRoot } = this["view.node"];

      if (innerHTML !== null) {

       if (shadowRoot.innerHTML != innerHTML)
        shadowRoot.innerHTML = innerHTML

       if (showAttributes && shadowRoot.host.getAttribute('data-path') != path)
        shadowRoot.host.setAttribute('data-path', path)

       return
      }

      const
       manifest = this["children.uri"],
       incomingNames = manifest === '' ? [] : manifest.split(' '),
       children = shadowRoot.children,
       existingNodes = [...children],
       existingBranches = existingNodes.map(node => node.thing)

      if (showAttributes)
       shadowRoot.host.setAttribute('data-path', path)

      let i = -1

      while (existingBranches.length && incomingNames.length) {

       i++

       const
        existingBranch = existingBranches.shift(),
        existing = existingBranch["name.uri"],
        incoming = incomingNames.shift()

       if (existing !== incoming) {

        const existingIndex = existingBranches.findIndex(thing => thing["name.uri"] === incoming)

        if (existingIndex === -1) {
         this["createNode.fn"](incoming, i)
        } else {
         shadowRoot.insertBefore(children[i + existingIndex + 1], children[i])
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
       incomingNames.forEach(name => this["createNode.fn"](name))
     }
    }
   },
   "setLayouts.fn": {
    get() {
     return () => {

      if (this["view.stylesheet"] !== null)
       this["view.stylesheet"].replaceSync(this["layout.css"])

      if (!this["view.node"])
       return

      const
       layout = this["layout.uri"],
       incomingNames = layout === '' ? [] : layout.split(' '),
       showAttributes = this["debug.bool"],
       { shadowRoot } = this["view.node"]

      const
       stylesheets = shadowRoot.adoptedStyleSheets,
       existingSheets = [...stylesheets],
       existingBranches = existingSheets.map(sheet => sheet.thing)

      if (showAttributes)
       shadowRoot.host.setAttribute('data-layout', layout)

      let i = -1

      while (existingBranches.length && incomingNames.length) {

       i++

       const
        existingBranch = existingBranches.shift(),
        existing = existingBranch["name.uri"],
        incoming = incomingNames.shift()

       if (existing === incoming)
        continue

       const existingIndex = existingBranches.findIndex(thing => thing["name.uri"] === incoming)

       let stylesheet

       if (existingIndex === -1) {
        stylesheet = new CSSStyleSheet()
        stylesheet.thing = this["beget.fn"](incoming, { ["view.stylesheet"]: { value: stylesheet } })
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
        stylesheet.thing = this["beget.fn"](incoming, { ["view.stylesheet"]: { value: stylesheet } })
        stylesheets.push(stylesheet)
       }
     }
    }
   },
   "createNode.fn": {
    get() {
     return (name, index = -1) => {

      let node

      const
       thing = this["beget.fn"](name, { "view.node": { get() { return node } } }),
       showAttributes = this["debug.bool"],
       { shadowRoot } = this["view.node"],
       children = shadowRoot.children

      node = document.createElement(thing["view.tag"])
      node.thing = thing

      if (showAttributes)
       node.setAttribute('data-name', name)

      node.attachShadow({ mode: 'open' })

      if (index !== -1 && index < children.length)
       shadowRoot.insertBefore(node, children[index])
      else
       shadowRoot.appendChild(node)
     }
    }
   },
   "test.fn": {
    get() {
     return () => {
      const
       delay = 1000,
       action = delay > (1000 / 60) ? setTimeout : requestAnimationFrame;

      action(() => {
       const sidebar = this["insert.fn"]("open-sidebar")
       action(() => {
        const grey1 = sidebar["insert.fn"]("grey1")
        action(() => {
         const grey2 = grey1["replaceWith.fn"]("grey2")
         action(() => {
          grey2["remove.fn"]()
          action(() => {
           const lighten = sidebar["insert.fn"]("lighten-background")
           action(() => {
            const inspect = lighten["insert.fn"]("open-inspector")
            action(() => {
             lighten["remove.fn"]()
             action(() => {
              inspect["remove.fn"]()
              action(() => {
               sidebar["remove.fn"]()
               this["test.fn"]()
              }, delay)
             }, delay)
            }, delay)
           }, delay)
          }, delay)
         }, delay)
        }, delay)
       }, delay)
      }, delay)
     }
    }
   }
  };
 Object.assign(parts, parts["default.parts"].get())
 const
  core = Object.create(null, parts),
  main = core["beget.fn"](location.host, { "view.node": { value: document.body } })
 document.body.thing = main
 document.body.attachShadow({ mode: 'open' })
 main["render.fn"]()
 core["test.fn"]()
}