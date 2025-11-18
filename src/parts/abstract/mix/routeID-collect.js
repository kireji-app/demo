if (!CHANGED_FACTORS || !CHANGED_FACTORS.length)
 throw new Error("No mix factors were provided.")

let reportsAtLeastOneEnabledFactor = false
let reportsAtLeastOneDisabledFactor = false
let deltaMixRouteID = 0n

for (const changedFactor of CHANGED_FACTORS) {

 if (changedFactor.enabled) {

  if (reportsAtLeastOneDisabledFactor)
   throw new Error("Can't enable some factors and disable others.")

  if (!reportsAtLeastOneEnabledFactor)
   reportsAtLeastOneEnabledFactor = true

  deltaMixRouteID += changedFactor.deltaRouteID * mix.placeValues.get(changedFactor)
 } else {

  if (reportsAtLeastOneEnabledFactor)
   throw new Error("Can't enable some factors and disable others.")

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

if (DEPTH === 1)
 return

mix[".."]?.collectRouteID([mix], DEPTH ? DEPTH-- : undefined)