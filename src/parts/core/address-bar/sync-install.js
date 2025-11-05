addressBar.define({
 throttleDuration: { value: agent.isSafari ? 350 : 75 },
 throttleStartTime: { value: now, writable: true }
})