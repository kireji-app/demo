if (typeof INCOMING_VERSION !== "string")
 throw new TypeError(`Version comparison expects a string representing a dot-separated standard semantic version number.`)

const incoming = INCOMING_VERSION.split(".")

if (incoming.length !== 3)
 throw new SyntaxError(`The version number string "${INCOMING_VERSION}" is not correctly formatted.`)

const current = _.version.split(".")

for (let i = 0; i < 3; i++) {
 const a = +current[i]
 const b = +incoming[i]

 if (isNaN(b))
  throw new SyntaxError(`The version number string "${INCOMING_VERSION}" is not correctly formatted.`)

 if (a !== b)
  return b > a
}

return false