const ftPerSec = 7.9 // realistic max: 5.9
const pixelsPerFoot = 9

user.define({
 cardinality: { value: 8n },
 element: { value: null, writable: true },
 pixelsPerSecond: { value: ftPerSec * pixelsPerFoot }
})