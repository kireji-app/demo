onload = e => {
 const
  root = {
   ".views": { value: {} },
   "empty.txt": { value: "" },
   "view.nodes": { value: [] },
   "tagname.txt": { value: "tag-" },
   "viewers.branches": { value: {} },
   "live.color": { value: "tomato" },
   "tomato.color": { value: "tomato" },
   "grey.color": { value: "#333445" },
   "grey2.color": { value: "#333446" },
   "version.float": { value: 40 / 1000 },
   "root.map": { get() { return root } },
   "name.txt": { value: "https://core.parts" },
   "grey1.map": { value: [["grey.color", "data:text/color,#333443"]] },
   "grey2.map": { value: [["grey.color", "grey2.color"]] },
   "header.map": { value: [["manifest.txt", "empty.txt"], ["tagname.txt", "nametag.txt"]] },
   "article.map": { value: [["inner.html", "color.html"], ["tagname.txt", "nametag.txt"]] },
   "footer.map": { value: [["inner.html", "../path.uri"], ["tagname.txt", "nametag.txt"]] },
   "prototype.branch": { get() { return Object.getPrototypeOf(this) } },
   "layout.css": { get() { return `:host { background: ${this["live.color"]} }` } },
   "manifest.txt": { get() { return `header article footer` } },
   "dev.core.parts.map": { value: [["live.color", "grey.color"]] },
   "inner.html": { value: null },
   "color.html": { get() { return `<h1><b>I am <i>${this["live.color"]}</i></b></h1>` } },
   "path.uri": { get() { return (this["prototype.branch"]?.["path.uri"] ?? "") + this["name.txt"] + "/" } },
   "shadow.nodes": { get() { return this["view.nodes"].map(n => n.shadowRoot ?? n.attachShadow({ mode: "open" })) } },

   "nametag.txt": {
    get() {

     const
      name = this["name.txt"].replaceAll(/[^a-zA-Z0-9]+/g, '-'),
      tag = name + (name.includes('-') ? '' : '-')

     return tag
    }
   },

   "view.stylesheet": {
    get() {
     return (
      this["#stylesheet"] ||
      ((this["#stylesheet"] = new CSSStyleSheet()),
       this["shadow.nodes"].forEach(shadow => shadow.adoptedStyleSheets.push(this["#stylesheet"]))),
      this["#stylesheet"]
     );
    },
   },

   "branch.run": {
    get() {
     return (name, nodes = []) => {

      const descriptormap = this["getDescriptorMap.run"](name)

      return (this["viewers.branches"][name] = Object.create(this, {
       "name.txt": { value: name },
       "root.map": { value: descriptormap },
       "viewers.branches": { value: {} },
       "view.nodes": { value: nodes },
       ...descriptormap,
      }))
     }
    }
   },

   "donate.run": {
    get() {
     return (child, parent, name = child["name.txt"]) => {
      delete this["viewers.branches"][name]
      parent["viewers.branches"][name] = child
      Object.setPrototypeOf(child, parent)
      child["render.run"]()
     };
    },
   },

   "insert.run": {
    get() {
     return name => {

      const
       branch = this["branch.run"](name),
       branches = this["viewers.branches"]

      for (const n in branches)
       if (branches[n] !== branch)
        this["donate.run"](branches[n], branch, n)

      return branch
     }
    }
   },

   "remove.run": {
    get() {
     return () => {

      if (this === core)
       throw new Error("Error: Attempted to remove core.")

      const
       prototype = this["prototype.branch"],
       branches = this["viewers.branches"]

      delete prototype["viewers.branches"][this["name.txt"]]

      for (const n in branches)
       this["donate.run"](branches[n], prototype, n)

      return prototype
     }
    }
   },

   "replaceWith.run": {
    get() {
     return name => {

      if (this === core)
       return this["insert.run"](name)

      const
       prototype = this["prototype.branch"],
       branch = prototype["branch.run"](name),
       branches = this["viewers.branches"]

      delete prototype["viewers.branches"][this["name.txt"]]

      for (const n in branches)
       this["donate.run"](branches[n], branch, n)

      return branch
     }
    }
   },

   "getDescriptorMap.run": {
    get() {
     return name => {

      if (name === core["name.txt"])
       return root

      if (!(name + ".map" in this))
       throw new RangeError('No such map as "' + name + '.map"')

      const result = {}

      for (const [a, n] of this[name + ".map"]) {
       if (n.startsWith('data:')) {
        const datum = n.slice(n.indexOf(',') + 1)
        result[a] = {
         get() { return datum }
        }
        continue;
       }
       let levels = 0, b = n
       while (b.startsWith('../')) {
        b = b.slice(3)
        levels++
       }
       result[a] = {
        get() {
         let branch = this;
         for (let i = 0; i < levels; i++) {
          branch = branch["prototype.branch"]
          if (branch === null) throw new RangeError(`Error: looking beyond core branch (from ${this["path.uri"]} to ${n})`)
         }
         return branch[b]
        }
       }
      }

      return result
     }
    }
   },

   "render.run": {
    get() {
     return () => {

      if (!this["view.nodes"].length)
       throw new Error('Error: render called on non-view branch.')

      this["view.stylesheet"].replaceSync(this["layout.css"])
      this["view.nodes"].forEach(n => n.setAttribute("data-path", this["path.uri"]))
      this["populate.run"]()
      const branches = this["viewers.branches"]

      for (const name in branches)
       branches[name]["render.run"]()
     }
    }
   },

   "populate.run": {
    get() {
     return () => {

      if (!this["view.nodes"].length)
       throw new Error('Error: populate called on non-view branch.')

      const innerHTML = this["inner.html"];

      if (innerHTML !== null) {

       for (const shadow of this["shadow.nodes"])
        shadow.innerHTML = innerHTML

       return
      }

      const
       manifest = this["manifest.txt"],
       incomingNames = manifest === '' ? [] : manifest.split(' ')

      for (const shadow of this["shadow.nodes"]) {

       const
        children = shadow.children,
        existingNodes = [...children],
        existingNames = existingNodes.map(node => node.branch["name.txt"])

       let i = -1

       while (existingNames.length && incomingNames.length) {

        i++

        const
         existing = existingNames.shift(),
         incoming = incomingNames.shift()

        if (existing !== incoming) {

         const existingIndex = existingNames.findIndex(name => name === incoming)

         if (existingIndex === -1) {
          this["install.run"](incoming, i)
         } else {
          shadow.insertBefore(children[i + existingIndex + 1], children[i])
          existingNames.splice(existingIndex, 1)
         }

         if (incomingNames.some(name => name === existing)) {
          existingNames.unshift(existing)
          continue
         }

         children[i + 1].remove()
        }
       }

       if (existingNames.length) {
        existingNames.forEach(() => children[i + 1].remove())
        return
       }

       if (incomingNames.length)
        incomingNames.forEach(name => this["install.run"](name))
      }
     }
    }
   },

   "install.run": {
    get() {
     return (name, index = -1) => {

      const
       nodes = [],
       branch = this["branch.run"](name, nodes)

      for (const shadow of this["shadow.nodes"]) {

       const
        node = document.createElement(branch["tagname.txt"]),
        children = shadow.children

       node.branch = branch
       nodes.push(node)

       if (index !== -1 && index < children.length) {
        shadow.insertBefore(node, children[index])
       } else {
        shadow.appendChild(node)
       }
      }
     }
    }
   },

   "test.run": {
    get() {
     return () => {
      const
       delay = 250,
       action = delay > (1000 / 60) ? setTimeout : requestAnimationFrame;

      action(() => {
       const $1 = this["insert.run"]("grey1");
       action(() => {
        const $2 = $1["replaceWith.run"]("grey2")
        action(() => {
         $2["remove.run"]()
         this["test.run"]()
        }, delay)
       }, delay)
      }, delay)
     }
    }
   }
  },
  core = Object.create(null, root),
  main = core["branch.run"](location.host, [document.body]);

 document.body.branch = main
 main["render.run"]()
 core["test.run"]()
}