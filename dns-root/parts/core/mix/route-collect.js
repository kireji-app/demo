if (!CHANGED_FACTORS || !CHANGED_FACTORS.length)
 new MixCollectRouteError("No mix factors were provided.")

let reportsAtLeastOneEnabledFactor = false
let reportsAtLeastOneDisabledFactor = false
let deltaMixRouteID = 0n

for (const changedFactor of CHANGED_FACTORS) {

 if (changedFactor.enabled) {

  if (reportsAtLeastOneDisabledFactor)
   throw new MixCollectRouteError("Cannot enable some factors and disable others.")

  if (!reportsAtLeastOneEnabledFactor)
   reportsAtLeastOneEnabledFactor = true

  deltaMixRouteID += changedFactor.deltaRouteID * mix.placeValues.get(changedFactor)
 } else {

  if (reportsAtLeastOneEnabledFactor)
   throw new MixCollectRouteError("Cannot enable some factors and disable others.")

  if (!reportsAtLeastOneDisabledFactor)
   reportsAtLeastOneDisabledFactor = true
 }
}

if (reportsAtLeastOneEnabledFactor) {
 const result = deltaMixRouteID + (!mix.enabled && reportsAtLeastOneEnabledFactor ? 0n : mix.routeID)
 debug(result)
 mix.updateRoute(result)
} else {
 mix.updateRoute(-1n)
}

mix.parent?.collectRoute([mix])