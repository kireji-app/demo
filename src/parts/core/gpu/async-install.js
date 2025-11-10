const adapter = await nav.gpu.requestAdapter()
const device = await adapter.requestDevice()

gpu.define({
 adapter: { value: adapter },
 device: { value: device }
})