super(FACTORS)

this.computeShuffle = () => {
 const
  offset = this.offset,
  state = ((this.state * 1664525n + 1013904223n) % this.size)
 if (typeof this.onshuffle === "function") this.onshuffle(offset + state)
}