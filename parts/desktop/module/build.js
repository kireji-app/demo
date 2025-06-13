if (!module.environments) {
 if (isLeaf) Object.defineProperties(module, {
  environments: { value: ["server"] }
 })
 else throw new Error(`Module ${module.title} is missing an environments array (${module.host}).`)
}

Object.defineProperties(module, {
 isAsync: { value: "installAsync" in module, configurable: true, writable: true }
})

if (module.environments.includes(environment)) {
 Object.defineProperties(module, {
  supported: { value: module.checkSupport(), configurable: true, writable: true }
 })
 if (!module.supported)
  Object.defineProperties(module, {
   error: { value: "support check failed", configurable: true, writable: true }
  })
} else Object.defineProperties(module, {
 error: { value: "wrong environment", configurable: true, writable: true }
})