const launchDate = comingSoon.launchTimestamp
const oneDay = 24 * 60 * 60
const oneWeek = oneDay * 7
const fiveMinutes = 5 * 60
const headers = { "Retry-After": oneWeek }

if (launchDate) {

 const now = Math.trunc(_.now / 1000)

 const timeUntilLaunch = launchDate - now

 if (timeUntilLaunch > 0)
  headers["Retry-After"] = timeUntilLaunch
 else if (timeUntilLaunch + oneDay > 0)
  headers["Retry-After"] = fiveMinutes
}

return headers