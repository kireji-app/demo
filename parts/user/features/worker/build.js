if (globalThis.worker && globalThis.worker !== feature)
 for (const property in globalThis.worker) {
  Object.defineProperties(feature, {
   property: {
    value: globalThis.worker[property], configurable: true, writable: true
   }
  })
 }

Object.defineProperties(feature, {
 environments: { value: ["window", "worker"], configurable: true, writable: true }
})