const ftPerSec = 5.9 // realistic max: 5.9
const pixelsPerFoot = 5

user.define({
 cardinality: { value: 8n },
 element: { value: null, writable: true },
 pixelsPerSecond: { value: ftPerSec * pixelsPerFoot },
 walkPhase: { value: null, writable: true },
 walkFrames: { value: 8 },
 walkStartFrame: { value: 1 },
 strideFactor: { value: (pixelsPerFoot * ftPerSec) / 400 }
})