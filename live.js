const
 protocolumns = {
  "boot.fn": {
   get() {
    return (hostname, viewNode) => {
     viewNode.attachShadow({ mode: 'open' });
     (viewNode.row = this["branch.fn"](hostname, { "view.node": { value: viewNode } }))["render.fn"]();
    }
   }
  },
  "test.fn": {
   get() {
    return (name, o) => {
     if (name === undefined) {
      name = 'sidebar'
      o = { "": protorow }
     }
     const [src, fn, str, n2, t] = protorow[`${name}.test`].split(' ')
     setTimeout(() => {
      o[name] = o[src][fn + '.fn'](str || undefined)
      protorow["render.fn"]()
      this["test.fn"](n2, o)
     }, parseInt(t || 2000))
    }
   }
  },
  "render.fn": {
   get() {
    return () => {
     if (this["view.stylesheet"] !== null)
      this["view.stylesheet"].replaceSync(this["layout.css"])
     if (this["view.node"] !== null) {
      const { shadowRoot } = this["view.node"]
      layouts: {
       const
        rawCSS = this[".css"],
        stylesheets = shadowRoot.adoptedStyleSheets,
        existingSheets = [...stylesheets],
        existingSheetRows = existingSheets.map(sheet => sheet.row)
       if (rawCSS !== null) {
        let singleSheet = existingSheets[0];
        if (existingSheetRows.length !== 1 || singleSheet !== this) {
         for (const existingSheetRow of existingSheetRows) {
          existingSheetRow?.["remove.fn"]()
          stylesheets.pop()
         }
         singleSheet = new CSSStyleSheet()
         singleSheet.row = this
         stylesheets.push(singleSheet)
        }
        singleSheet.replaceSync(rawCSS)
       } else {
        const
         layout = this[".layout"],
         incomingSheetNames = layout === '' ? [] : layout.split(' ')
        let i = -1
        while (existingSheetRows.length && incomingSheetNames.length) {
         i++
         const
          existingSheetRow = existingSheetRows.shift(),
          existingSheetName = existingSheetRow?.["name.uri"],
          incomingSheetName = incomingSheetNames.shift()
         if (existingSheetName === incomingSheetName)
          continue
         const existingIndex = existingSheetRows.findIndex(row => row["name.uri"] === incomingSheetName)
         let stylesheet
         if (existingIndex === -1) {
          stylesheet = new CSSStyleSheet()
          stylesheet.row = this["branch.fn"](incomingSheetName, { ["view.stylesheet"]: { value: stylesheet } })
         } else {
          const stylesheetIndex = i + existingIndex + 1
          stylesheet = stylesheets[stylesheetIndex]
          stylesheets.splice(stylesheetIndex, 1)
          existingSheetRows.splice(existingIndex, 1)
         }
         stylesheets.splice(i, 0, stylesheet)
         if (incomingSheetNames.some(name => name === existingSheetName)) {
          existingSheetRows.unshift(existingSheetRow)
          continue
         }
         stylesheets.splice(i + 1, 1)
        }
        if (existingSheetRows.length)
         existingSheetRows.forEach(() => stylesheets.pop())
        else if (incomingSheetNames.length)
         for (const incomingSheetName of incomingSheetNames) {
          const stylesheet = new CSSStyleSheet()
          stylesheet.row = this["branch.fn"](incomingSheetName, { ["view.stylesheet"]: { value: stylesheet } })
          stylesheets.push(stylesheet)
         }
       }
      }
      children: {
       const innerHTML = this[".html"]
       if (innerHTML !== null) {
        if (shadowRoot.innerHTML != innerHTML) shadowRoot.innerHTML = innerHTML
       } else {
        const
         incomingManifest = this[".children"],
         children = shadowRoot.children,
         existingNodes = [...children],
         existingIndexRows = existingNodes.map(node => node.row),
         existingNameRows = existingIndexRows.map(row => Object.getPrototypeOf(row)),
         existingNames = existingNameRows.map(row => row["name.uri"]),
         existingManifest = existingNames.join(' '),
         createNode = (name, index = -1) => {
          let node = this[".rows"][name]?.[".rows"][index]?.["view.node"];
          const
           nameRow = this["branch.fn"](name),
           childRow = nameRow["branch.fn"](index, { "view.node": { get() { return node } } }),
           children = shadowRoot.children
          if (!node) {
           node ??= document.createElement(childRow["view.tag"])
           node.row = childRow
           try { node.attachShadow({ mode: 'open' }) }
           catch (e) { throw new Error(`Error: cannot attach shadow to <${childRow["view.tag"]}>. (creating node "${name}" at [${index}] using row "${this["name.uri"]}")`) }
          }
          if (index !== -1 && index < children.length)
           shadowRoot.insertBefore(node, children[index])
          else
           shadowRoot.appendChild(node)
         },
         removeNode = () => {
          const
           existingIndexRow = existingIndexRows.shift(),
           existingNameRow = existingNameRows.shift(),
           existingNode = existingNodes.shift()
          existingNode.remove()
          existingIndexRow["remove.fn"]()
          if (existingNameRow["count.int"] === 0)
           existingNameRow["remove.fn"]()
         }
        if (existingManifest !== incomingManifest) {
         const incomingNames = incomingManifest === '' ? [] : incomingManifest.split(' ')
         let i = -1
         while (existingNames.length && incomingNames.length) {
          i++
          const incomingName = incomingNames.shift();
          if (existingNames.shift() !== incomingName) { removeNode(); createNode(incomingName, i) }
         }
         existingNames.forEach(removeNode)
         incomingNames.forEach((incomingName, ii) => createNode(incomingName, i + ii + 1))
        }
       }
      }
     }
     Object.values(this[".rows"]).forEach(row => row["render.fn"]())
    }
   }
  },
  "branch.fn": {
   get() {
    return (name, inputColumns) => {
     if (name in this[".rows"]) {
      return this[".rows"][name]
     }
     const
      isIndex = !isNaN(name),
      description = { ... this["default.columns"] },
      fileset = isIndex ? `index.int=data:math/integer,${name}&view.tag&.layout&.html&.children&.css` : name + "/" in this ? this[name + "/"] : this["error404/"]
     for (const [key, ref] of (fileset ? fileset.split('&') : []).map(a => a ? a.split('=') : [])) {
      if (ref === undefined) {
       description[key] = { get() { return Object.getPrototypeOf(this)[key] } }
       continue
      }
      if (ref.startsWith('data:')) {
       const datum = ref.slice(ref.indexOf(',') + 1)
       description[key] = { get() { return datum } }
       continue
      }
      if (ref.startsWith('https://')) {
       const
        subpaths = ref.slice(8).split('/'),
        subkey = subpaths.pop()
       if (!subkey)
        throw new RangeError(`Error: absolute cell reference must include a file name. Get reference to entire row not yet supported. (on ${this["path.uri"]}, adding ${ref})`)
       description[key] = {
        get() {
         let row = protorow
         for (const subpath of subpaths)
          row = row["branch.fn"](subpath)
         return row[subkey]
        }
       }
       continue
      }
      let
       levels = 1,
       subkey = ref
      if (subkey.startsWith('./')) {
       subkey = subkey.slice(2)
       levels = 0
      } else while (subkey.startsWith('../')) {
       subkey = subkey.slice(3)
       levels++
      }
      description[key] = {
       get() {
        let row = this
        for (let i = 0; i < levels; i++) {
         row = Object.getPrototypeOf(row)
         if (row === null)
          throw new RangeError(`Error: relative reference to row which is beyond protorow ${ref})`)
        }
        return row[subkey]
       }
      }
     }
     return this[".rows"][name] = Object.create(this, Object.assign(description, inputColumns, {
      "context.uri": { value: "context.uri instance.uri name.uri /" },
      "instance.uri": { value: Object.keys(description).join(' ') },
      "name.uri": { value: name },
      "/": { value: fileset }
     }))
    }
   }
  },
  "donate.fn": {
   get() {
    return (child, parent, name = child["name.uri"]) => {
     delete this[".rows"][name]
     parent[".rows"][name] = child
     Object.setPrototypeOf(child, parent)
    };
   },
  },
  "insert.fn": {
   get() {
    return name => {
     const
      row = this["branch.fn"](name),
      rows = this[".rows"]
     for (const subkey in rows)
      if (rows[subkey] !== row)
       this["donate.fn"](rows[subkey], row, subkey)
     return row
    }
   }
  },
  "remove.fn": {
   get() {
    return () => {
     if (this === protorow)
      throw new Error("Error: Attempted to remove protorow.")
     const
      parent = Object.getPrototypeOf(this),
      rows = this[".rows"]
     delete parent[".rows"][this["name.uri"]]
     for (const subkey in rows)
      this["donate.fn"](rows[subkey], parent, subkey)
     return parent
    }
   }
  },
  "replaceWith.fn": {
   get() {
    return name => {
     if (this === protorow)
      return this["insert.fn"](name)
     const
      parent = Object.getPrototypeOf(this),
      row = parent["branch.fn"](name),
      rows = this[".rows"]
     delete parent[".rows"][this["name.uri"]]
     for (const subkey in rows)
      this["donate.fn"](rows[subkey], row, subkey)
     return row
    }
   }
  },
  "default.columns": {
   get() {
    return ({
     ".css": { value: null },
     ".html": { value: null },
     ".rows": { value: {} },
     ".layout": { value: "" },
     ".children": { value: "" },
     "view.node": { value: null },
     "view.tag": { value: "tag-" },
     "index.int": { value: -1 },
     "layout.css": { value: "" },
     "view.stylesheet": { value: null },
    })
   }
  },
  "name.uri": { value: "" },
  "path.uri": { get() { return (Object.getPrototypeOf(this)?.["path.uri"] ?? "") + this["name.uri"] + "/" } },
  "grey2/": { value: "grey.color=grey2.color" },
  "grey1/": { value: "grey.color=data:text/color,#344555" },
  "header/": { value: ".children=header.children&view.tag=./native.tag&.layout=header.layout" },
  "button/": { value: "view.tag=./name.tag" },
  "version/": { value: ".html=./version.number&view.tag=./name.tag&pill-icon-right.bool=true.bool&.layout=pill.layout" },
  "address/": { value: ".html=./path.uri&view.tag=data:text/tag,addressbar-&.layout=pill.layout" },
  "sidebar/": { value: ".children=sidebar.children&view.tag=./name.tag&.layout=sidebar.layout&layout.css=sidebar.css" },
  "article/": { value: ".html=color.html&view.tag=./native.tag" },
  "error404/": { value: '.css=error404.css&.html=error404.html' },
  "side-menu/": { value: ".children=menu-buttons.children&view.tag=./name.tag&.layout=menu-buttons.layout" },
  "inspector/": { value: "header/=inspector-header/&.children=zero.children&view.tag=./name.tag" },
  "core.parts/": { value: "background.color=grey.color&.children=./editor.children&.layout=theme.layout&color.html=./background.color&sidebar-open.bool=true.bool" },
  "pill-layout/": { value: 'layout.css=pill.css' },
  "flex-spacer/": { value: '.layout=flex-spacer.layout&view.tag=./name.tag' },
  "bottom-menu/": { value: ".html=data:text/html,bottom&view.tag=data:text/tag,bottom-menu" },
  "main-layout/": { value: "layout.css=main-layout.css" },
  "hide-sidebar/": { value: "sidebar-open.bool=false.bool" },
  "next-version/": { value: 'version.number=https://core.parts/next-version.number' },
  "header-layout/": { value: 'layout.css=header.css' },
  "account-button/": { value: '.html=data:text/html,User' },
  "open-inspector/": { value: "inspector-open.bool=true.bool" },
  "grey-background/": { value: "background.color=grey.color&layout.css=background.css" },
  "settings-button/": { value: '.html=data:text/html,Settings' },
  "inspector-header/": { value: ".html=data:text/html,Some panel" },
  "inspector-button/": { value: '.html=data:text/html,Inspector' },
  "lighten-background/": { value: "background.color=light-background.color" },
  "flex-spacer-layout/": { value: 'layout.css=flex-spacer.css' },
  "menu-buttons-layout/": { value: "layout.css=menu-buttons.css" },
  // BEGIN Future filesets ... (once fileset defs expand to include template strings, perhaps via datauri)
  "zero.children": { value: "" },
  "editor.children": { get() { return `${this["sidebar-open.bool"] ? 'sidebar ' : ''}header article` } },
  "header.children": { value: "address flex-spacer version" },
  "sidebar.children": { get() { return `side-menu${this["inspector-open.bool"] ? ' inspector' : ''}` } },
  "inspector.children": { get() { return `header menu` } },
  "menu-buttons.children": { value: "inspector-button flex-spacer account-button settings-button" },
  "version.number": { value: 48 / 1000 },
  "next-version.number": { get() { return Math.trunc(this["version.number"] * 1000 + 1) / 1000 } },
  "sidebar-width.number": { value: 42 },
  "error404.html": { value: `<b><i>404</i></b>` },
  "true.bool": { value: true },
  "false.bool": { value: false },
  "pill.layout": { value: "pill-layout" },
  "theme.layout": { value: "main-layout" },
  "header.layout": { value: "header-layout" },
  "sidebar.layout": { value: "sidebar" },
  "flex-spacer.layout": { value: "flex-spacer-layout" },
  "menu-buttons.layout": { value: "menu-buttons-layout" },
  "grey.color": { value: "#333445" },
  "grey2.color": { value: "#444444" },
  "background.color": { value: "tomato" },
  "light-background.color": { get() { return '#' + this["background.color"].match(/[^#]{2}/g).map(s => Math.trunc((1 - (1 - parseInt(s, 16) / 255) * 0.5) * 255).toString(16)).join('') } },
  "pill.css": { get() { return `:host::${this["pill-icon-right.bool"] ? 'after' : 'before'} { content: 'ⓘ'; padding: 5px; border-radius: 50%; background: ${this["light-background.color"]}; margin-${this["pill-icon-right.bool"] ? 'left' : 'right'}: 8px; } :host { ${this["pill-icon-right.bool"] ? 'text-align: right; ' : ''}margin: 7px; display: inline-block; line-height: 24px; padding: 5px; color: white; border-radius: 16px; background: ${this["background.color"]}}` } },
  "header.css": { get() { return `:host { display: flex; flex-flow: row nowrap; background: ${this["branch.fn"]("lighten-background")["light-background.color"]}}` } },
  "sidebar.css": { get() { return `:host { color: ${this["background.color"]}; background: ${this["light-background.color"]}; display: grid; grid-template: "b${this["inspector-open.bool"] ? ' i' : ''}" 1fr / ${this["sidebar-width.number"]}px ${this["inspector-open.bool"] ? '1fr' : ''}; } side-menu { grid-area: b } ${this["inspector-open.bool"] ? `inspector- { grid-area: i; background: ${this["branch.fn"]("lighten-background")["light-background.color"]} }` : ''}` } },
  "error404.css": { get() { return `:host { background: magenta }` } },
  "background.css": { get() { return `:host { color: white; padding: 12px; background: ${this["background.color"]} }` } },
  "flex-spacer.css": { value: `:host { flex: 1 1 }` },
  "menu-buttons.css": { get() { return `:host { display: flex; flex-flow: column nowrap; gap: 4px; padding: 4px; } tag- { height: auto !important; aspect-ratio: 1 / 1; }` } },
  "main-layout.css": { get() { return `:host { --system-ui: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; font: 13px var(--system-ui); margin: 0; padding: 0; display: grid; grid-template:   "${this["sidebar-open.bool"] ? 'h ' : ''}h" 48px  "${this["sidebar-open.bool"] ? 's ' : ''}c" auto / ${this["sidebar-open.bool"] ? `${this["inspector-open.bool"] ? '2' : ''}${this["sidebar-width.number"]}px ` : ''}1fr;} ${this["sidebar-open.bool"] ? "sidebar- { grid-area: s }" : ""} header { grid-area: h } article { grid-area: c; margin: 24px }` } },
  "grey1.test": { value: "sidebar insert grey1 grey2 1000" },
  "grey2.test": { value: "grey1 replaceWith grey2 lighten" },
  "sidebar.test": { value: " insert hide-sidebar grey1 100" },
  "lighten.test": { value: " insert next-version removed1" },
  "inspect.test": { value: "lighten insert open-inspector addressbarFocus" },
  "removed2.test": { value: "sidebarFocus remove  removed3 200" },
  "removed1.test": { value: "grey2 remove  inspect" },
  "removed3.test": { value: "inspect remove  removed4 200" },
  "removed4.test": { value: "sidebar remove  sidebar 2000" },
  "sidebarFocus.test": { value: "addressbarFocus replaceWith sidebar removed2" },
  "addressbarFocus.test": { value: "lighten replaceWith address sidebarFocus" },
  "name.tag": { get() { return this["name.uri"].replaceAll(/[^a-zA-Z0-9]+/g, '-') + '-' } },
  "native.tag": {
   get() {
    if (!this["name.uri"] || !/^[a-zA-Z]+$/.test(this["name.uri"]))
     throw RangeError(`Error: name "${this["name.uri"]}" is not a native tagname.`)
    return this["name.uri"]
   }
  },
 },
 protorow = Object.create(null, Object.assign(protocolumns, protocolumns["default.columns"].get()))

onload = () => {
 protorow["boot.fn"](location.host.slice(location.host.startsWith('dev.') ? 4 : 0), document.body)
 protorow["test.fn"]()
}