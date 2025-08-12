
const ftPerSec = 15 // realistic max: 5.9
const ftPerTile = 1

Object.defineProperties(glowstick, {
 fps: { value: 1, writable: true },
 time: { value: null, writable: true },
 walkMark: { value: null, writable: true },
 tilesCount: { value: null, writable: true },
 frameRequest: { value: null, writable: true },
 meanFrameTime: { value: 1000, writable: true },
 tilesPerSecond: { value: ftPerSec / ftPerTile },
 lastMoveVector: { value: null, writable: true }
})