const start = now
warn(`Simulating ${DELAY_IN_MS}-millisecond hydration time.`)
let iteration = -1
let elapsedMilliseconds
let remainingMilliseconds

do {
 elapsedMilliseconds = Math.trunc((performance.now() - start))

 const newRemainingMilliseconds = DELAY_IN_MS - elapsedMilliseconds

 Math.sin(iteration++)

 if (Math.trunc(newRemainingMilliseconds / 100) !== Math.trunc(remainingMilliseconds / 100))
  log(0, "t: -" + newRemainingMilliseconds)

 remainingMilliseconds = newRemainingMilliseconds

} while (remainingMilliseconds > 0)

warn('Simulation ended at iteration ' + iteration)
// throw 'no continue'