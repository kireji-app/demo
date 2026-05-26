orbitalGame.define({
 loading: { value: false, writable: true },
 loadedLevel: { value: null, writable: true },
 uniformBuffer: { value: null, writable: true },
 onscreenContext: { value: null, writable: true },
 offscreenContext: { value: null, writable: true },
 currentTurnSpeed: { value: 0, writable: true },
 canvasSizeChanged: { value: true, writable: true },
 renderPassDefinitions: { value: [] },
})

// TODO: implement crouch control (sets camera height only)
// TODO: improve controls including mobile controls
// TODO: Add loading screen fallback and/or overlay