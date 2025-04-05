match.updateRoute(ROUTE_ID)

for (let index = 0; index < match.length; index++) {
 const nextIndex = index + 1

 if (nextIndex === match.length || ROUTE_ID < match.offsets.get(nextIndex)) {
  const oldArm = match.arm
  const newArm = match[index]
  const armRouteID = ROUTE_ID - match.offsets.get(newArm)

  if (oldArm !== newArm)
   oldArm?.distributeRoute(-1n)

  newArm.distributeRoute(armRouteID)
  match.arm = newArm
  break
 }
}