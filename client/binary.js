class bin {
 static #map = new Map()
 static one = new bin($1)
 #data
 get raw() { return this.#data.raw }
 get key() { return this.#data.key }
 get view() { return this.#data.view }
 get patch() { return this.#data.patch }
 get offset() { return this.#data.offset }
 get inverse() { return this.#data.inverse }
 constructor(raw) {
  const
   [patch, offset] = trim(raw),
   key = `${patch}«${offset}`,
   map = bin.#map;
  if (map.has(key)) return map.get(key)
  map.set(key, this)

  this.#data = { raw, key, patch, offset }

  map.forEach(that => new ratio(this, that))
  this.#data.inverse = new ratio(raw === $1 ? this : bin.one, this)
 }
}