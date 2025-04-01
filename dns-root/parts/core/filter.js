/*
 if (TYPED) {
  const parts = {}

  for (const subpart of part)
   if (FILTER_FUNCTION(subpart))
    subparts[subpart.key] = subpart

  const clone = new part.framework.PartConstructor()
  clone.setParts(parts)

  return clone
 }
*/

const parts = []

for (const subpart of part)
 if (FILTER_FUNCTION(subpart))
  parts.push(subpart)

return parts