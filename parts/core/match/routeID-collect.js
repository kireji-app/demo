const oldArm = match.arm
/** @type PartCore */
let newArm = null
let disabledArm = null

if (!CHANGED_ARMS || !CHANGED_ARMS.length)
 throw new MatchCollectRouteError("No match arms were provided.")

for (const changedArm of CHANGED_ARMS) {

 if (changedArm.enabled) {
  if (newArm && newArm !== changedArm)
   throw new MatchCollectRouteError("Multiple match arms competing to be enabled.")

  if (changedArm.deltaRouteID === 0n)
   throw new MatchCollectRouteError("The enabled match arm didn't change.")

  newArm = changedArm
  continue
 }

 if (changedArm.deltaRouteID !== 0n) {
  if (changedArm !== oldArm)
   throw new MatchCollectRouteError("Arm assignment out of sync with arm state.")
  disabledArm = changedArm
 }
}

if (!newArm) {
 try {
  newArm = match.defaultArm
  if (newArm !== null)
   newArm.distributeRouteID(0n)
  else
   match.updateRouteID(-1n)
 } catch (cause) {
  throw new MatchCollectRouteError("An arm to enable could not be found.", cause)
 }
}

if (oldArm && newArm !== oldArm && !disabledArm)
 oldArm.distributeRouteID(-1n)

match.updateRouteID(match.offsets.get(newArm) + newArm.routeID)
match.parent?.collectRouteID([match])