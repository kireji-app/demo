await Promise.all([
 ...PROMISE_ARRAY.filter(promise => promise !== client.promise),
 worker.takeControlAsync()
])

logScope(0, "Finalizing Hydration", log => {
 if (_.haltHydration && !production)
  warn('Intentionally blocked hydration.')
 else {

  // To preview FOUC
  if (_.hangHydration > 0 && !production)
   logScope(0, `Intentionally hanging the main thread for ${_.hangHydration} milliseconds.`, log => {
    const start = _.now
    let iteration = -1, elapsedMilliseconds, remainingMilliseconds
    do {
     elapsedMilliseconds = Math.trunc(_.now - start)
     const newRemainingMilliseconds = _.hangHydration - elapsedMilliseconds
     Math.sin(iteration++)
     if (Math.trunc(newRemainingMilliseconds / 100) !== Math.trunc(remainingMilliseconds / 100))
      log("t: -" + newRemainingMilliseconds)
     remainingMilliseconds = newRemainingMilliseconds
    } while (remainingMilliseconds > 0)
    log(`Main thread hang finished at iteration ${iteration}.`)
   })

  globalThis.addEventListener("popstate", () => addressBar.useRoute())

  log("Setting initial state.")
  addressBar.useRoute()

  log("Activating Body.")
  document.body.classList.remove("unhydrated")

  // Make ecosystem available to HTML event handlers.
  globalThis._ = _

  log("Client hydration complete.")
  client.hydrated = true

  log("Starting Engine Loop")
  _.define({
   frameRequest: { value: requestAnimationFrame(() => _.distributeLoop()), writable: true },
  })
 }
})