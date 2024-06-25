onload = e => {
 const
  root = {
   ".branches": { value: {} },
   "name.txt": { value: "https://core.parts" },
   "live.color": { value: "tomato" },
   "green.color": { value: "green" },
   "brown.color": { value: "brown" },
   "yellow.color": { value: "yellow" },
   "version.float": { value: 39 / 1000 },
   "brown.map": { value: [["green.color", "brown.color"]] },
   "yellow.map": { value: [["green.color", "yellow.color"]] },
   "dev.core.parts.map": { value: [["live.color", "green.color"]] },
   "root.map": {
    get() {
     return root
    }
   },
   "view.node": {
    get() {
     return document.body;
    },
   },
   "prototype.branch": {
    get() {
     return Object.getPrototypeOf(this);
    },
   },
   "shadow.node": {
    get() {
     return (this["#shadow"] ??= this["view.node"].attachShadow({
      mode: "closed",
     }));
    },
   },
   "path.uri": {
    get() {
     return (
      (this["prototype.branch"]?.["path.uri"] ?? "") + this["name.txt"] + "/"
     );
    },
   },
   "view.html": {
    get() {
     return `<h1><b>I am <i>${this["live.color"]}.</i></b></h1>`;
    },
   },
   "layout.css": {
    get() {
     return `:host { background: ${this["live.color"]} }`;
    },
   },
   "view.stylesheet": {
    get() {
     return (
      this["#stylesheet"] ||
      ((this["#stylesheet"] = new CSSStyleSheet()),
       this["shadow.node"].adoptedStyleSheets.push(this["#stylesheet"])),
      this["#stylesheet"]
     );
    },
   },
   "branch.run": {
    get() {
     return t => {
      let r = this["getDescriptorMap.run"](t);
      console.log('branching ' + this["path.uri"] + ' + ' + t)
      return (this[".branches"][t] = Object.create(this, {
       ...r,
       "name.txt": { value: t },
       "root.map": { value: r },
       ".branches": { value: {} },
      }));
     };
    },
   },
   "donate.run": {
    get() {
     return (t, r, o = t["name.txt"]) => {
      let oldpath = t["path.uri"]
      delete this[".branches"][o]
      r[".branches"][o] = t
      Object.setPrototypeOf(t, r)
      t["render.run"]()
      console.log('moved ' + oldpath + ' to ' + t["path.uri"])
     };
    },
   },
   "insert.run": {
    get() {
     return t => {
      let r = this["branch.run"](t);
      for (let o in this[".branches"]) {
       let n = this[".branches"][o];
       n !== r && this["donate.run"](n, r, o);
      }
      return r;
     };
    },
   },
   "remove.run": {
    get() {
     return () => {
      if (this === core)
       throw Error("Error: Attempted to delete core.");
      let t = this["prototype.branch"], r = this[".branches"];
      delete t[".branches"][this["name.txt"]]
      for (let o in r) this["donate.run"](r[o], t, o)
      return t;
     };
    },
   },
   "replaceWith.run": {
    get() {
     return t => {
      if (this === core)
       return this["insert.run"](t);
      let r = this["prototype.branch"]["branch.run"](t),
       o = this[".branches"];
      for (let n in o) this["donate.run"](o[n], r, n);
      return r;
     };
    },
   },
   "getDescriptorMap.run": {
    get() {
     return t => {
      if (t === core["name.txt"]) return root;
      if (!(t + ".map" in this))
       throw RangeError('No such map as "' + t + '.map"');
      let r = {};
      for (let [o, n] of this[t + ".map"])
       r[o] = {
        get() {
         return this["prototype.branch"][n];
        },
       };
      return r;
     };
    },
   },
   "render.run": {
    get() {
     return () => {
      console.log('render called on ' + this["path.uri"])
      this["view.stylesheet"].replaceSync(this["layout.css"]),
       (this["shadow.node"].innerHTML = this["view.html"]),
       this["view.node"].setAttribute("data-path", this["path.uri"]);
     };
    },
   },
   "test.run": {
    get() {
     return () => {
      requestAnimationFrame(() => {
       const brown = this["insert.run"]("brown");
       requestAnimationFrame(() => {
        const yellow = brown["replaceWith.run"]("yellow")
        requestAnimationFrame(() => {
         yellow["remove.run"]();
         requestAnimationFrame(() => {
          console.log(this)
          //this["test.run"]()
         })
        })
       })
      })
     }
    }
   }
  },
  core = Object.create(null, root);
 core["branch.run"](location.host)["render.run"]();
 core["test.run"]()
}