Object.defineProperties(stats, {
 fps: { value: 1, writable: true },
 time: { value: null, writable: true },
 meanFrameTime: { value: 1000, writable: true },
 element: { value: document.querySelector("stats-") },
})