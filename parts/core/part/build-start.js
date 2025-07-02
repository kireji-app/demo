openLog(5, `🛠️ Building ${part.title ?? `Untitled (${part.host})`}.`)

const buildMethodOwners = []

let buildMethodOwner = part === _ ? part.prototype : part

while (buildMethodOwner) {
 if (Object.hasOwn(buildMethodOwner, "build"))
  buildMethodOwners.unshift(buildMethodOwner)

 buildMethodOwner = buildMethodOwner.prototype
}

buildMethodOwners.forEach((owner, index) => {
 openLog(5, `${index}. ${owner.host}`)
 owner.build.call(part)
 closeLog(5)
})

if (typeof part.cardinality !== "bigint" || part.cardinality <= 0)
 throw new Error(`Part hydration ended with invalid cardinality: ${part.cardinality} (${host}).`)

closeLog(5, true)