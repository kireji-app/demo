if (root.environment === "client" && LAYER === root.primaryLayer) {
 console.log('prop leafward on primary client disjunction - erase previousChoice - ' + part.host)
}

if (part.state[LAYER] !== STATE) {
 super(STATE)
 for (const subpart of part) {
  if (root.environment === "client" && LAYER === root.primaryLayer) {
   console.log('is it ' + subpart.host + '?')
  }
  if (STATE < subpart.size) {
   if (root.environment === "client" && LAYER === root.primaryLayer) {
    console.log('yes... its ' + subpart.host)
   }
   if (LAYER === root.primaryLayer && part.choice[LAYER] !== subpart) {
    part.previousChoice = part.choice[LAYER]
    if (root.environment === "client") {
     if (part.previousChoice)
      console.log('I\'ve set previousChoice for disabling here - ' + part.previousChoice.host)
    }
   }
   part.choice[LAYER] = subpart
   await subpart.propagateLeafward(LAYER, STATE)
   break
  }
  STATE -= subpart.size
 }
}

// two issues so far:

// 1. on alpha, can't reopen menu
// 2. on core.parts, doesn't render the document until refresh
// 3. the icons are not centered on core.parts