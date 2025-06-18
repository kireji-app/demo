// Prepare the necessary modules before allowing interaction.
await addressBar.promise // Distributes the initial user route.
await agent.promise
await hotKeys.promise
await worker.promise

/* Simulate long init.

 function hang(timeInMilliseconds) {
  warn(`Intentionally hanging the main thread for ${timeInMilliseconds} milliseconds.`)
  const start = performance.now()
  let iteration = -1, elapsedMilliseconds, remainingMilliseconds
  do {
   elapsedMilliseconds = Math.trunc(performance.now() - start)
   const newRemainingMilliseconds = timeInMilliseconds - elapsedMilliseconds
   Math.sin(iteration++)
   if (Math.trunc(newRemainingMilliseconds / 100) !== Math.trunc(remainingMilliseconds / 100)) log(0, "t: -" + newRemainingMilliseconds)
   remainingMilliseconds = newRemainingMilliseconds
  } while (remainingMilliseconds > 0)
  warn(`Main thread hang finished at iteration ${iteration}.`)
 }
 hang(1000)

*/

user.setRoute(addressBar.route)
document.body.removeAttribute("inert")
module.hydrated = true
log(1, "Hydrated.")