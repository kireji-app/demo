match.updateRouteID(ROUTE_ID)

const arms = [...match]

for (let index = 0; index < arms.length; index++) {
 const nextIndex = index + 1

 if (nextIndex === arms.length || ROUTE_ID < match.offsets.get(arms[nextIndex])) {
  const oldArm = match.arm
  const newArm = arms[index]
  const armRouteID = ROUTE_ID - match.offsets.get(newArm)

  if (oldArm !== newArm)
   oldArm?.distributeRouteID(-1n)

  newArm.distributeRouteID(armRouteID)
  match.arm = newArm
  break
 }
}