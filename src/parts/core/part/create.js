if (part.manifest.inherit)
 return part

const result = Object.create(part)

// Clone the whole tree.
for (const subpart of part) {
 if (!subpart.manifest.inherit)
  result[subpart.key] = subpart.create()
}

return result