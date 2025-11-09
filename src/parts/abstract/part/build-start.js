logScope(5, `Building ${part.host}.`, log => {
 const buildMethodOwners = []

 let buildMethodOwner = part === _ ? part.prototype : part

 while (buildMethodOwner) {
  if (Object.hasOwn(buildMethodOwner, "build"))
   buildMethodOwners.unshift(buildMethodOwner)

  buildMethodOwner = buildMethodOwner.prototype
 }

 for (const owner of buildMethodOwners) {
  log(owner.host)
  owner.build.call(part)
 }

 if (typeof part.cardinality !== "bigint" || part.cardinality <= 0)
  throw new Error(`Recursive part tree hydration ended with invalid cardinality: ${part.cardinality} (${part.host}).`)
})