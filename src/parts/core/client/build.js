facet.define({
 hydrated: { value: false, writable: true }
})

// TODO: is this the right place for this?
if (environment === "client")
 globalThis.Q = (...args) => document.querySelector(...args)