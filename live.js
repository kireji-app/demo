const root = {
 word: { get() { return "core.parts" } },
 core: { get() { return null } },
 version: { get() { return 37 / 1000 } },
 extensions: { value: new Set() },
 root: { get() { return root } },
 node: { get() { return document.body } },
 rebuild: {
  get() {
   return root => {
    console.warn('hey, should rebuild here!', { core: this.core, root })
   }
  }
 },
 populate: {
  get() {
   return () => {
    console.warn('layout.css and content.html fx mark here');
    this["stylesheet"].replaceSync(this["layout.css"])
    this["shadow"].innerHTML = this["content.html"]
   }
  }
 },
 shadow: { get() { return this._shadow ??= this.node.attachShadow({ mode: "closed" }) } },
 stylesheet: {
  get() {
   if (!this._stylesheet) {
    this._stylesheet = new CSSStyleSheet()
    this["shadow"].adoptedStyleSheets.push(this._stylesheet)
   }
   return this._stylesheet
  }
 },
 render: { get() { return () => this.extend(location.host).populate() } },
 extend: {
  get() {
   return word => {
    const
     new_root = this[word],
     extension = Object.create(this, {
      ...new_root,
      core: { value: this },
      word: { value: word },
      root: { value: new_root },
      extensions: { value: new Set() }
     })
    this.extensions.add(extension)
    return extension
   }
  }
 },
 cover: { get() { return (a, b) => (console.warn(`fx mark ${b} in core of this to ${a} in root being returned`), { [a]: root[b] }) } },
 setBackground: { get() { return color => `:host { background: ${color} }` } },
 "content.html": { get() { console.log('somehow mark fx of live.color for content.html here'); return `I am ${this["live.color"]}.` } },
 "layout.css": { get() { console.log('somehow mark fx of setBackground and live.color in layout.css here'); return this.setBackground(this["live.color"]) } },
 "live.color": { value: 'tomato' },
 "green.color": { value: 'green' },
 "brown.color": { value: 'brown' },
 "dev.core.parts": { get() { return this.cover("live.color", "green.color") } },
 "brown.parts": { get() { return this.cover("green.color", "brown.color") } },
 reroot: {
  get() {
   return word => {
    const rerooted = this.extend(word)
    for (const extension of this.extensions) {
     if (extension === rerooted) continue
     this.extensions.delete(extension)
     rerooted.extensions.add(extension)
     Object.setPrototypeOf(extension, rerooted)
    }
    rerooted.extensions.forEach(extension => extension.rebuild(rerooted.root))
   }
  }
 }
}, core = Object.create(null, root)

// An event says "this address has become this address"
// Challenge: Every time we change the prototype of something, it's url should update to account for that
// Challenge: Replace a property descriptor and have it change the body shadow's innerHTML and css.
//            When root["live.color"] changes from tomato to silver, do not update the debug core at all.
//            When root["green.color"] changes from green to brown, core[location.host]["content.html"] and debug["live.color"] change
// Challenge: Instead of innerHTML, use a manifest checking scheme with child node list.
// Challenge: Instead of one layout, allow a set of layouts, synced the same way as the child node list.

onload = () => {
 core.render()
 setTimeout(() => {
  core.reroot("brown.parts")
 }, 2000)
}