// Here, we are only just updating the address bar.
console.log(`Regenerate any in-use paths (always at least one: the address bar). ${subpart.key} -> ${subpart.routeID}`)

/*
 const now = performance.now()
 desktop.fps = Math.round(1000 / (desktop.meanFrameTime += (now - desktop.time - desktop.meanFrameTime) / 20))
 desktop.time = now
 if (now - desktop.throttleStartTime >= desktop.user.agent.throttleDuration && desktop.addressBarState !== desktop.routeID) {
  desktop.throttleStartTime = now
 
 Framework.pathEncoder.stage.set(0n)
 
 for (const subpart of desktop) {
  Framework.pathEncoder[subpart.index].stage.set(subpart.routeID)
  console.log(`Autosave ${subpart.key} -> ${subpart.routeID}`)
 }
 
 desktop.addressBarState = Framework.pathEncoder.stage.routeID
 history.replaceState({}, null, Framework.pathEncoder.stringify("stage"))
 
 

Object.assign(globe, {
 desktop: Object.assign(part, {
   requestFrame(now) {
    desktop.fps = Math.round(1000 / (desktop.meanFrameTime += (now - desktop.time - desktop.meanFrameTime) / 20))
    desktop.time = now
    if (desktop.time - desktop.throttleStartTime >= desktop.user.agent.throttleDuration && desktop.addressBarState !== desktop.routeID) {
     const hash = "#" + desktop.encodeState(desktop.routeID)
     history.pushState({}, null, hash)
     desktop.addressBarState = desktop.routeID
     desktop.throttleStartTime = desktop.time
    }
    desktop.animationFrameID = requestAnimationFrame(now => desktop.requestFrame(now))
   },
  decodeState(code) {
   let binaryValue = "0b0"
   let binaryOffset = "0b0"

   for (const char of code) {
    const index = Framework.pathSegmentRadix.indexOf(char)
    if (index === -1) {
     console.warn("ignoring invalid path (paths cannot include '" + char + "').")
     binaryValue = "0b0"
     binaryOffset = "0b0"
     break;
    }
    binaryValue += index.toString(2).padStart(6, 0)
    binaryOffset += "000001"
   }

   return BigInt(binaryValue) + BigInt(binaryOffset) - 1n
  },
  encodeState(state) {
   state++
   let binaryValue = ""
   let code = ""

   let tempState = state
   let chunkCount = 0n

   while (tempState > 0n) {
    const chunkAddend = 2n ** (chunkCount * 6n)
    if (tempState >= chunkAddend) {
     tempState -= chunkAddend
     chunkCount++
    } else {
     break;
    }
   }

   let offset = 0n
   for (let i = 0n; i < chunkCount; i++)
    offset += 2n ** (i * 6n)

   binaryValue = (state - offset).toString(2)

   const finalLength = Number(chunkCount) * 6
   const paddedBinaryString = binaryValue.padStart(finalLength, '0')

   for (let i = 0; i < finalLength; i += 6) {
    const hexad = paddedBinaryString.slice(i, i + 6)
    code += Framework.pathSegmentRadix[parseInt(hexad, 2)]
   }

   return code
  },
 }),
})

*/