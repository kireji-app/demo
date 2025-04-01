part.setParts([
 "frames",
 "player"
].reduce((factors, key) => {
 factors[key] = new Part(
  key + "." + part.host,
  part.host === framework.host ? null : {
   "part.json": JSON.stringify({ extends: key + "." + framework.host })
  },
  part
 )
 return factors
}, {}))