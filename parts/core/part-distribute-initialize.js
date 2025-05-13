if (part.enabled)
 throw new PartError("Setting the parts of an enabled part is currently not supported. " + part.host)

part.length = 0
part.enabled = part.wasEnabled = part.justDisabled = part.justEnabled = false
part.routeID = part.previousRouteID = -1n
part.cardinality = INITIAL_CARDINALITY
part.deltaRouteID = 0n

if (!PART_MANIFEST)
 throw new PartError("No part manifest was provided. " + part.host)

for (const key in part.manifest ?? {})
 delete part[key]

Object.entries(PART_MANIFEST).forEach(([key, subpart], index, entries) => {

 if (key in part)
  throw new PartError(`Duplicate key ${key}. ${part.host}`)


 if (!subpart || typeof subpart === "string") {
  subpart = part.framework.resolveImplicitHost(subpart || key)
  PART_MANIFEST[key] = entries[index][1] = subpart = new Part(subpart)
 } else if (!(subpart instanceof CorePart))
  throw new PartError(`Unexpected ${subpart?.constructor?.name ?? typeof subpart} encountered as subpart. ${part.host}`)

 part[subpart.key = key] = part[subpart.index = index] = subpart
 subpart.parent = part

 if (subpart.distributeInitializePart.length !== 0)
  throw new PartError("Attempted to initialize an abstract part, " + subpart.host + ". " + part.host)

 // try {
 subpart.distributeInitializePart()

 if (typeof subpart.cardinality !== "bigint")
  throw new PartError("Subpart initialized with invalid cardinality. " + part.host)

 //} catch (cause) {
 // throw new PartError(`${cause.message ?? cause} \n  ${part.key}: "${part.host}" {\n   ${key}: "${subpart.host}" <----- here \n  }`, { cause })
 //}

 part.cardinality = CARDINALITY_CALLBACK(part.cardinality, subpart, index, entries)

 if (typeof part.cardinality !== "bigint")
  throw new PartError("Cardinality callback returned invalid cardinality. " + part.host)

 part.length++
})

part.manifest = PART_MANIFEST