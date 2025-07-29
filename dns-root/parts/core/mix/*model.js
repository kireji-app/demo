const model = {}

for (const subpart of part)
 if (subpart.cardinality !== 1n && subpart.routeID !== 0n)
  model[subpart.key] = subpart.model

return model