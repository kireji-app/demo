const oldArm = match.arm
/** @type Part */
let newArm = null
let disabledArm = null

if (!CHANGED_ARMS || !CHANGED_ARMS.length)
 throw new Error("No match arms were provided.")

for (const changedArm of CHANGED_ARMS) {

 if (changedArm.enabled) {
  if (newArm && newArm !== changedArm)
   throw new Error("Multiple match arms competing to be enabled.")

  if (changedArm.deltaRouteID === 0n)
   throw new Error("The enabled match arm didn't change.")

  newArm = changedArm
  continue
 }

 if (changedArm.deltaRouteID !== 0n) {
  if (changedArm !== oldArm)
   throw new Error("Arm assignment out of sync with arm state.")
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
  throw new Error("An arm to enable could not be found.", cause)
 }
}

if (oldArm && newArm !== oldArm && !disabledArm)
 oldArm.distributeRouteID(-1n)

match.updateRouteID(match.offsets.get(newArm) + newArm.routeID)

if (DEPTH === 1)
 return

match[".."].collectRouteID([match], DEPTH ? DEPTH-- : undefined)