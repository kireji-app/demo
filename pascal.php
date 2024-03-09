<script>
 var relationships = 0, integers = 0;
 class N {
  static #seen = {}
  #cache = {}
  constructor(n) {
   if (N.#seen[n]) throw N.#seen[n]
   if (n < 0 || n % 1) throw `${n} is not a natural number.`
   if (n == 0) throw 0
   this.value = n
   N.#seen[n] = this
  }
  static to(n, key, arg) {
   let final = undefined
   try {
    final = new N(n)
    console.warn(`Found ${integers++}/${Number.MAX_SAFE_INTEGER} numbers. ${n}, day ${final.pascalPosition.row.value}, ${final.pascalPosition.column.value} away`);
   } catch (existing) {
    final = existing
   } finally {
    if (!final) return 0
    key = `_${key}_`;
    if (!final[key]) final[key] = []
    if (!final[key].includes(arg)) {
     console.log(`Found ${relationships++}/Infinite relationships. ${key}(${arg.value}) = ${n}, anti-${key}(${n}) = [ ${arg.value} ... ]`);
     final[key].push(arg)
    }
    return final
   }
  }
  get times() {
   let result = {},
    self = this;
   for (const prop in N.#seen) {
    result = {
     ...result,
     get [prop]() {
      return N.to(self.value * N.#seen[prop].value, 'multiply', self)
     }
    }
   }
   return result;
  }
  get binaryReversed() {
   return this.#cache.binr ?? (this.#cache.binr = [...this.binary].reverse())
  }
  get reflection() {
   return this.#cache.refl ?? (this.#cache.refl = N.to(parseInt(this.binaryReversed.join(''), 2), "reflection", this))
  }
  get string() {
   return this.#cache.str ?? (this.#cache.str = this.value.toString(2))
  }
  get binary() {
   return this.#cache.bin ?? (this.#cache.bin = [...this.string].map(x => parseInt(x)))
  }
  get sections() {
   return this.#cache.sect ?? (this.#cache.sect = this.string.split('1').map((sec, i) => N.to(sec.length, `section_${i}`, this)))
  }
  get hammingWeight() {
   return this.#cache.hw ?? (this.#cache.hw = N.to(this.sections.length - 1, "hammingWeight", this))
  }
  get floorLog2() {
   return this.#cache.fl2 ?? (this.#cache.fl2 = N.to(this.string.length, "floorLog2", this))
  }
  get pascalPosition() {
   const self = this
   return {
    get column() {
     return N.to(self.hammingWeight.value, 'pascal_column', self)
    },
    get row() {
     return N.to(self.floorLog2.value, 'pascal_row', self)
    }
   }
  }
  get ones() {
   if (!this.#cache.ones) {
    const list = this.#cache.ones = []
    for (let i = 0; i < this.floorLog2.value; i++) {
     if (this.binaryReversed[i] == 1) {
      const place = i,
       value = 2 ** i;
      list.push({
       place: N.to(place, `place_of_${value}`, this),
       value: N.to(2 ** i, `place_${place}`, this)
      });
     }
    }
   }
   return this.#cache.ones
  }
 }
</script>