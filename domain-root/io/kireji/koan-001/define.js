super(["choice"])

this.populate = () => {
 const
  row = this[0].model[this[0].choice.i],
  observation = row[4 + this[0].choice.choice.i],
  [ ba, bb, aa, ab ] = row
 this.container.innerHTML = `<p>${aa} ${ab} and there is ${observation.join(" ")}. what is the ${observation.at(-1)} of one ${ba} ${bb}?</p>`
}