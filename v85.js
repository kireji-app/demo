const v85 = {
  "https://core.parts/version/value.i": { value: 85n, parts: {} },
  "https://core.parts/origins.array": { value: ["core.parts", "ejaugust.com", "orenjinari.com"] },

  "https://core.parts/framerate/max.i": { value: 90n },
  "https://core.parts/framerate/min.i": { value: 0n },

  "https://core.parts/version/cardinality.i": { get: ({ "https://core.parts/": core }) => core.cardinality },
  "https://core.parts/fuzzing.boolean": { range: true },
  "https://core.parts/origin.string": { range: "origins.array" },
  "https://core.parts/framerate/value.i": { min: "framerate min.i", max: "framerate max.i" },
 },
 part = { cardinality: 1n }
const cache = {},
 test = {
  item0: {
   fx: ["item2", "item3", "item4"],
   min: "item5",
   max: "item10",
  },
  item1: {
   fx: ["item2", "item3", "item4"],
   min: "item5",
   max: "item6",
  },
  item2: {
   get({ item1, item7 }) {
    return item7 + item1
   },
  },
  item3: {
   get({ item1, item8 }) {
    return item8 + item1
   },
  },
  item4: {
   get({ item1, item9 }) {
    return item9 + item1
   },
  },
  item5: {
   value: 0n,
   fx: ["item1"],
  },
  item6: {
   get() {
    return 97n
   },
   fx: ["item1"],
  },
  item7: {
   value: 5n,
   fx: ["item2"],
  },
  item8: {
   value: 10n,
   fx: ["item3"],
  },
  item9: {
   value: 15n,
   fx: ["item4"],
  },
  item10: {
   value: 90n,
   fx: ["item1"],
  },
 }

class Range {
 constructor(p, { min, max, fx }) {
  this.cardinality = max - min
  console.log("constructing range " + p, fx, this.cardinality)
 }
}

function get(p) {
 if (p in cache) return cache[p]
 const subject = test[p]
 if ("min" in subject && "max" in subject) {
  cache[p] = new Range(p, subject)
  return
 }
 console.warn("unhandled input", { [p]: test[p] })
}

/*

 picking order at random ... scnvl

 @0 => determine s => t = s
 @1 => determine c => t = c
 @2 => determine n => t = n
 @3 => determine v => t = v
 @4 => determine l => t = l

*/
const names = [
  // chosen at random order
  "https://core.parts/element/shadow/",
  "https://core.parts/styles/",
  "https://core.parts/nodes/data/",
  "https://core.parts/value/",
  "https://core.parts/element/light/",
 ],
 breakdown = {
  0: {
   0: {
    0: {
     1: {
      1: {},
     },
    },
    1: {
     1: {
      0: {},
     },
    },
   },
  },
  1: {
   1: {
    0: {
     1: {
      0: {},
     },
    },
   },
  },
 }

const names2 = [
  // Chosen order.
  "https://core.parts/value/",
  "https://core.parts/element/shadow/",
  "https://core.parts/styles/",
  "https://core.parts/nodes/data/",
  "https://core.parts/element/light/",
 ],
 breakdown2 = {
  1: {
   0: {
    0: {
     0: {
      1: {},
     },
     1: {
      0: {},
     },
    },
   },
   1: {
    1: {
     0: {
      0: {},
     },
    },
   },
  },
 }

/*

 Each "property" is, in fact, a list of properties and values itself. 

 Take "https://core.parts/value/" for example.
 This property probably specifies properties and values of it's own, no? Does it make sense do it this way?

 Any given property has associating properties via their bit arrays. 

 Here, we are first separating the cardinality of property choices from the cardinality of those properties.
 Take the above breakdown. There are three end points: 10001, 10010, and 11100. The cardinality of property choices is 3.
 Yet, take 10001 for example. It implicates the properties "value" and "element/light".
 Let's suppose that each of these properties has a cardinality of 80.
 Of the three property choices, this property choice has dimension 2 and cardinality 6400.
 The total cardinality across all properties is the sum of the cardinality within each property choice.
 In the above example, "value" is a property in every choice.
 Within each property choice, the cardinalities of each property are multiplied - properties form a cartesian product together.

 Presume each property has 10 options.
 10001 has 2 properties and cardinality 10^2 = 100
 10010 has 2 properties and cardinality 10^2 = 100
 11100 has 3 properties and cardinality 10^3 = 1000
 { 10001, 10010, 11100 } has cardinality 10^3 + 2*10^2 = 1200.
 



 */
