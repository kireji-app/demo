const
 encoder = new TextEncoder('utf-8'),
 N = source => {
  if (source instanceof Promise) return source.then(N)
  if (source instanceof ArrayBuffer) return new Uint8Array(source).reduce((n, byte) => n * BYTE_RANGE + N(byte), ZERO)
  else return BigInt(source)
 },
 SUM = (A,zero=ZERO,f=(y,x)=>y) => A.reduce((sum, a, i) => sum + f(a,N(i)), zero),
 MAX = (...args) => args.reduce((m, e) => e > m ? e : m),
 MIN = (...args) => args.reduce((m, e) => e < m ? e : m),
 BYTE_RANGE = N(256),
 DOUBLE_WORD_RANGE = N(2 ** 32 - 1),
 ZERO = N(0),
 FRAC = (a,b,precision=10**5) => Number(a * N(precision) / b) / precision;
class Data {
 #n
 static fromArrayBuffer(x) {
  return new Data(new Uint8Array(x).reduce((n, byte) => n * BYTE_RANGE + N(byte), ZERO))
 }
 static fromString() {
  
 }
 constructor(n) {
  if (typeof n !== 'bigint') throw new Error('Data is a wrapper for BigInt');
 }
}
class Letter {
 static greek = 'αβγδεζηθικλμνξοπρστυφχψω'
 static latin = 'abcdefghijklmnopqrstuvwxyz'
 static observers = []
 static observables = []
 static fromObserver(observer) {
  return this.greek[this.#register(observer, this.observers)]
 }
 static fromObservable(observable) {
  return this.latin[this.#register(observable, this.observables)]
 }
 static #register(member, set) {
  let index = set.indexOf(member);
  if (index < 0) index += set.push(member)
  return index
 }
}
class Observation {
 static history = []
 static get count() {
  return this.history.length
 }
 static store(n) {
  if (typeof n !== 'bigint') throw new Error('Observations must be recorded as BigInt. ' + n)
  this.history.push(n)
 }
 constructor(observer, observable, position, dimension, pletter, dletter) {
  const output = observer(observable);
  if (output instanceof Promise) {
   Wait.register()
   output.then(n => {
    Observation.store(n)
    position[dletter] = dimension[pletter] = n
    Wait.unregister()
   })
  }
  else {
   Observation.store(output)
   position[dletter] = dimension[pletter] = output
  }
 }
}
class Wait {
 static events = 1
 static finish = undefined
 static promise = new Promise(finish => Wait.finish = finish)
 static register() {
  this.events++
 }
 static unregister() {
  this.events--
  if (this.events === 0) this.finish()
 }
 static then(oncompute) {
  this.promise.then(oncompute)
  this.unregister()
 }
}
class Property {
 static dimensions = {}
 static observers = new Map()
 static validate(input) {
  let output = undefined
  if (typeof input === "string") input = parseInt(input)
  if (typeof input === "number") input = N(input)
  if (typeof input === "bigint") output = () => input
  else if (typeof input === "function") output = input
  else throw new Error("Property observers are unary operators that take strings and return bigints. Properties must be made from a string (parseable as int), number, bigint, or function (string => bigint)")
  return output
 }
 static incorperate(observer, letter) {
  const dimension = {}
  Entity.observables.forEach(async (observable, position) =>
   new Observation(observer, observable, position, dimension, Letter.fromObservable(observable), letter))
  this.observers.set(dimension, observer)
  return dimension
 }
 static add(observer) {
  const letter = Letter.fromObserver(observer);
  Entity.add(observer)
  observer = this.validate(observer)
  if (letter in this.dimensions) return
  this.dimensions[letter] = this.incorperate(observer, letter)
 }
}
class Entity {
 static positions = {}
 static observables = new Map()
 static validate(input) {
  let output = undefined
  if (typeof input !== "string") output = input.toString()
  else output = input
  return output
 }
 static incorperate(observable, letter) {
  const position = {}
  Property.observers.forEach(async (observer, dimension) => new Observation(observer, observable, position, dimension, letter, Letter.fromObserver(observer)))
  this.observables.set(position, observable)
  return position
 }
 static add(observable) {
  observable = this.validate(observable)
  const letter = Letter.fromObservable(observable)
  if (letter in this.positions) return
  this.positions[letter] = this.incorperate(observable, letter)
 }
}
Property.add(string => [...string].reduce((n, char) => n + N(char.charCodeAt()), ZERO))
Property.add(string => N(crypto.subtle.digest('SHA-256', new TextEncoder('utf-8').encode(string))))
Property.add(string => N(string.length))
Wait.then(() => {
 const
  max_y = MIN(MAX(...Observation.history), DOUBLE_WORD_RANGE),
  max_x = N(Observation.history.length),
  path = SUM(Observation.history,'M0 0',(y,x)=>`L${FRAC(x,max_x)} -${FRAC(y,max_y)}`);
 log(path);
 echo(`'svg{width:100%;height:100%}'+<svg preserveAspectRatio="none" viewBox="0 -1 1 1"><path vector-effect="non-scaling-stroke" stroke=black stroke-width=1 d="${path}" fill=none /></svg>+`)
 console.log({ Entity, Property, Observation })
})
/*

--- literal
a. Observation : integer, run-time
b. Observable : string   <--.
--- operational              }-- program is unordered set of these
c. Observer : string  <-----'
--- relational
d. Dimension - 1:1 with observer, every observation by a certain one
e. Position - 1:1 with observable, every observation about a certain one

*/