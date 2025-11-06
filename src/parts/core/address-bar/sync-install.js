addressBar.define({
 throttleDuration: { value: agent.isSafari ? 350 : 75 },
 throttleStartTime: { value: _.now, writable: true }
})