user.throttleStartTime = user.time
const { pathname, search, hash, host, href } = new URL(LOCATION)
const typeName = BUILD.tags.includes("local") ? BUILD.host : host
const segments = pathname.slice(1).split(/\/+/).filter(segment => segment)
console.log('parseLocation', { pathname, segments, typeName })