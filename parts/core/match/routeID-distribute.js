match.updateRouteID(ROUTE_ID)

for (let index = 0; index < match.length; index++) {
 const nextIndex = index + 1

 if (nextIndex === match.length || ROUTE_ID < match.offsets.get(nextIndex)) {
  const oldArm = match.arm
  const newArm = match[index]
  const armRouteID = ROUTE_ID - match.offsets.get(newArm)

  if (oldArm !== newArm)
   oldArm?.distributeRouteID(-1n)

  newArm.distributeRouteID(armRouteID)
  match.arm = newArm
  break
 }
}