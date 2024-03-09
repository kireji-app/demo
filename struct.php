<script>
 class Struct {

  #views = {}
  #offset = 0
  #byteCount = 0
  #source = undefined

  get byteCount() {
   return this.#byteCount
  }

  constructor(source, offset, ...properties) {
   this.#source = source
   this.#offset = offset
   properties.forEach(p => this.#attach(...p));
  }

  #attach(type, key, get = true, set = false, isEnabled) {
   if (isEnabled && !isEnabled(this)) return;
   const byteCount = type.countBytes(this.#source, this.#offset + this.byteCount);
   const view = this.#addView(key, byteCount);
   get ? (set ? this.#addGetSet(type, key) : this.#addGet(type, key)) : null;
   this.#byteCount += byteCount;
  }

  #addView(key, byteCount) {
   return this.#views[key] = new DataView(this.#source, this.#offset + this.#byteCount, byteCount);
  }

  #addGet(type, key) {
   Object.defineProperty(this, key, {
    get: function() {
     return type.cast(this.#views[key])
    }
   })
  }

  #addGetSet(type, key) {
   Object.defineProperty(this, key, {
    get: function() {
     return type.cast(this.#views[key])
    },
    set: function(data) {
     type.write(this.#views[key], data)
    }
   })
  }
 }
</script>