const parts = []

for (const subpart of part)
 if (FILTER_FUNCTION(subpart, subpart.index, part))
  parts.push(subpart)

return parts