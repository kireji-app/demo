string.updateRoute(ROUTE_ID)

for (let index = 0; index < string.length; index++) {
 const nextIndex = index + 1

 if (nextIndex === string.length || ROUTE_ID < string.offsets.get(nextIndex)) {

  const oldHighestEnabledCharacter = string.highestEnabledCharacter
  const newHighestEnabledCharacter = string[index]
  if (newHighestEnabledCharacter.index < oldHighestEnabledCharacter.index) {
   for (
    let indexToDisable = newHighestEnabledCharacter + 1;
    indexToDisable <= oldHighestEnabledCharacter.index;
    indexToDisable++
   ) string[indexToDisable]?.distributeRoute(-1n)
  }

  string.highestEnabledCharacter = newHighestEnabledCharacter

  ROUTE_ID -= string.offsets.get(index)

  for (let indexToUpdate = index; indexToUpdate >= 0; indexToUpdate--) {
   const placeValue = string.placeValues[indexToUpdate]
   string[indexToUpdate].distributeRoute(ROUTE_ID / placeValue)
   ROUTE_ID %= placeValue
  }

  break
 }
}