if (!CHANGED_FACTORS || !CHANGED_FACTORS.length)
 throw new Error("No mix factors were provided.")

let reportsAtLeastOneEnabledFactor = false
let reportsAtLeastOneDisabledFactor = false
let deltaMixRouteID = 0n

for (const changedFactor of CHANGED_FACTORS) {

 if (changedFactor.enabled) {

  if (reportsAtLeastOneDisabledFactor)
   throw new Error("Cannot enable some factors and disable others.")

  if (!reportsAtLeastOneEnabledFactor)
   reportsAtLeastOneEnabledFactor = true

  console.trace(deltaMixRouteID, mix.host, changedFactor === _, [...mix.placeValues.keys()].map(part => part.host))
  deltaMixRouteID += changedFactor.deltaRouteID * mix.placeValues.get(changedFactor)
 } else {

  if (reportsAtLeastOneEnabledFactor)
   throw new Error("Cannot enable some factors and disable others.")

  if (!reportsAtLeastOneDisabledFactor)
   reportsAtLeastOneDisabledFactor = true
 }
}

if (reportsAtLeastOneEnabledFactor) {
 const result = deltaMixRouteID + (!mix.enabled && reportsAtLeastOneEnabledFactor ? 0n : mix.routeID)
 mix.updateRouteID(result)
} else {
 mix.updateRouteID(-1n)
}

mix[".."]?.collectRouteID([mix])