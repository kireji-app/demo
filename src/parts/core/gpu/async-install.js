const adapter = await nav.gpu.requestAdapter()
const device = await gpu.adapter.requestDevice()

gpu.define({
 adapter: { value: adapter },
 device: { value: device }
})