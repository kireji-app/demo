const entries = Object.entries(PARTS)

if (entries.length > 1)
 throw 'CorePart.prototype.setParts() expects an object with at most one key ' + part.host

if (typeof SUBPART === "string") {

 if (/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/g.test(SUBPART)) {
  // Resolve relative host.
  SUBPART += "." + part.host
 }

 SUBPART = new Part(SUBPART, null, part)
} else if (!(SUBPART instanceof Framework.Core))
 throw new TypeError(`unexpected ${SUBPART.constructor?.name ?? typeof SUBPART} encountered as subpart of ${part.host}`)

if (KEY in part)
 console.warn(new TypeError(`duplicate key ${KEY} in ${part.host}`))

SUBPART.key = KEY
SUBPART.index = INDEX
SUBPART.parent = part
SUBPART.instancePath = part.instancePath + "/" + key

return part[KEY] = part[INDEX] = SUBPART