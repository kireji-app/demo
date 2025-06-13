if (globalThis.worker && globalThis.worker !== module)
 for (const property in globalThis.worker) {
  Object.defineProperties(module, {
   property: {
    value: globalThis.worker[property], configurable: true, writable: true
   }
  })
 }

Object.defineProperties(module, {
 environments: { value: ["window", "worker"], configurable: true, writable: true }
})