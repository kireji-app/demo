part.setFactors([
 "frames",
 "player"
].reduce((factors, key) => {
 factors[key] = Framework.createPart(
  key + "." + part.host,
  part.host === scriptHost ? null : {
   "base.host": key + "." + scriptHost
  },
  part
 )
 return factors
}, {}))