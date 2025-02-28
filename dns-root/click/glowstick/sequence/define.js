super([
 "frames",
 "player"
].map(
 ([name, options]) => Framework.createPart(
  name + "." + new.target.framework.host,
  {
   "base.host": name + "." + scriptHost
  }
 )
))