if (part.enabled)
 throw "setting the parts of an enabled part is currently not supported"

part.length = 0
part.routeID = part.previousRouteID = -1n
part.cardinality = INITIAL_CARDINALITY

if (!PART_MANIFEST)
 throw new StringError("No part manifest was provided.")

Object.entries(PART_MANIFEST).forEach(([key, subpart], index, entries) => {

 if (key in part)
  throw new TypeError(`duplicate key ${key} in ${part.host}`)

 if (!subpart)
  subpart = key

 if (typeof subpart === "string") {
  if (/^[a-z][A-Za-z0-9]+$/.test(key))
   subpart = key.split(/(?<=[a-z0-9])(?=[A-Z])/).map(word => word[0].toLocaleLowerCase() + word.slice(1)).join("-")

  if (/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(subpart))
   subpart += "." + part.host

  PART_MANIFEST[key] = entries[index][1] = subpart = new Part(subpart)
 }

 else if (!(subpart instanceof CorePart))
  throw new TypeError(`unexpected ${subpart?.constructor?.name ?? typeof subpart} encountered as subpart of ${part.host}`)

 part[subpart.key = key] = part[subpart.index = index] = subpart
 subpart.parent = part

 if (subpart.distributeInitializePart.length !== 0)
  throw new PartError("Attempted to initialize an abstract part, " + subpart.host + ".")

 // try {
 subpart.distributeInitializePart()

 if (typeof subpart.cardinality !== "bigint")
  throw new PartError("Subpart initialized with invalid cardinality.")

 //} catch (cause) {
 // throw new PartError(`${cause.message ?? cause} \n  ${part.key}: "${part.host}" {\n   ${key}: "${subpart.host}" <----- here \n  }`, { cause })
 //}

 part.cardinality = CARDINALITY_CALLBACK(part.cardinality, subpart, index, entries)

 if (typeof part.cardinality !== "bigint")
  throw new PartError("Cardinality callback returned invalid cardinality.")

 part.length++
})