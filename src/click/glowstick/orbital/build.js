orbitalGame.define({
 loading: { value: false, writable: true },
 loadedLevel: { value: null, writable: true },
 walkingSpeed: { value: 142 }, // realistic: 65
 uniformBuffer: { value: null, writable: true },
 sprintingSpeed: { value: 240 }, // realistic: 211
 onscreenContext: { value: null, writable: true },
 offscreenContext: { value: null, writable: true },
 currentTurnSpeed: { value: 0, writable: true },
 canvasSizeChanged: { value: true, writable: true },
 renderPassDefinitions: { value: [] },
})

// TODO: implement pause button (full screen and pointer capture when not paused)
// TODO: implement crouch control (sets camera height only)
// TODO: improve controls including mobile controls
// TODO: Add loading screen fallback and/or overlay