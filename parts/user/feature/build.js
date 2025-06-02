if (!feature.environments)
 throw new Error("Feature is missing an environments array. " + feature.host)

Object.defineProperties(feature, {
 isAsync: { value: "installAsync" in feature, configurable: true, writable: true }
})

if (feature.environments.includes(environment)) {
 Object.defineProperties(feature, {
  supported: { value: feature.checkSupport(), configurable: true, writable: true }
 })
 if (!feature.supported)
  Object.defineProperties(feature, {
   error: { value: "support-check-failed", configurable: true, writable: true }
  })
} else Object.defineProperties(feature, {
 error: { value: "wrong-environment", configurable: true, writable: true }
})