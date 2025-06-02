/** @type {Part | null} */
let highestEnabledChangedCharacter = null
/** @type {Part | null} */
let lowestDisabledChangedCharacter = null
/** @type {Set<Part>} */
const disabledChangedCharacters = new Set()
/** @type {Set<Part>} */
const enabledChangedCharacters = new Set()
let newRouteID = 0n
let stringLengthChanged = false
const wasEnabled = string.enabled
let willBeEnabled = !wasEnabled
const oldHighestEnabledCharacter = string.highestEnabledCharacter
let newHighestEnabledCharacter = oldHighestEnabledCharacter

for (const changedCharacter of CHANGED_CHARACTERS) {
 if (changedCharacter.enabled) {
  if (highestEnabledChangedCharacter === null || changedCharacter.index > highestEnabledChangedCharacter.index)
   highestEnabledChangedCharacter.index = changedCharacter.index
  enabledChangedCharacters.add(changedCharacter)
  willBeEnabled = true
 } else {
  if (lowestDisabledChangedCharacter === null || changedCharacter.index < lowestDisabledChangedCharacter.index)
   lowestDisabledChangedCharacter.index = changedCharacter.index
  disabledChangedCharacters.add(disabledCharacters)
 }
}


if (disabledChangedCharacters.size) {
 if (lowestDisabledChangedCharacter.index > oldHighestEnabledCharacter.index)
  throw new Error(`Redundant call to disable already disabled character${disabledChangedCharacters.size > 1 ? "s" : ""}.`)

 if (highestEnabledChangedCharacter.index >= lowestDisabledChangedCharacter.index)
  throw new Error("Requested update would gaps in the string.")

 stringLengthChanged = true

 for (
  let indexToDisable = oldHighestEnabledCharacter.index;
  indexToDisable >= lowestDisabledChangedCharacter.index;
  indexToDisable--
 ) {
  /** @type {Part} */
  const characterToDisable = string[indexToDisable]
  newRouteID -= characterToDisable.previousRouteID * string.placeValues.get(indexToDisable)
  if (disabledChangedCharacters.has(characterToDisable))
   continue
  characterToDisable.distributeRouteID(-1n)
 }
 const newMaxIndex = lowestDisabledChangedCharacter.index - 1

 if (newMaxIndex === -1)
  string.updateRouteID(-1n)

 string.highestEnabledCharacter = string[newMaxIndex]
} else {
 if (!enabledChangedCharacters.size)
  throw new Error("No character updates came in.")

 if (highestEnabledChangedCharacter.index > oldHighestEnabledCharacter.index) {
  newHighestEnabledCharacter = highestEnabledChangedCharacter
  stringLengthChanged = true

  for (
   let indexToEnable = oldHighestEnabledCharacter.index + 1;
   indexToEnable <= highestEnabledChangedCharacter.index;
   indexToEnable++
  ) {
   const newlyEnabledCharacter = string[indexToEnable]

   if (!enabledChangedCharacters.has(newlyEnabledCharacter))
    throw new Error("Requested updates would leave gaps in the string.")

   newRouteID += string.placeValues.get(indexToEnable) * string[indexToEnable].routeID

   enabledChangedCharacters.delete(newlyEnabledCharacter)
  }

  const newMaxIndex = lowestDisabledChangedCharacter.index - 1
 }
}

if (stringLengthChanged) {
 const oldStringLengthOffset = wasEnabled ? string.offsets.get(oldHighestEnabledCharacter) : 0n
 const newStringLengthOffset = willBeEnabled ? string.offsets.get(newHighestEnabledCharacter) : -1n
 newRouteID += newStringLengthOffset - oldStringLengthOffset
}

if (wasEnabled) {
 for (const remainingChangedCharacter of enabledChangedCharacters)
  newRouteID += remainingChangedCharacter.newRouteID * string.placeValues.get(remainingChangedCharacter)

 newRouteID += string.routeID
}

string.updateRouteID(newRouteID)
string[".."].collectRouteID([string])