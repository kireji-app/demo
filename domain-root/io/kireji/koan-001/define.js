super(["choice"])

this.populate = layer => {
 const
  row = this[0].model[this[0].choice[layer].i],
  observation = row[4 + this[0].choice[layer].choice[layer].i],
  [ba, bb, aa, ab] = row
 this.container.innerHTML = `<p>${aa} ${ab} and there is ${observation.join(" ")}. what is the ${observation.at(-1)} of one ${ba} ${bb}?</p>`
}