const parts = []

for (const subpart of part)
 parts.push(MAP_FUNCTION(subpart, subpart.index, part))

return parts