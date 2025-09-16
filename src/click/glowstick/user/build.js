const ftPerSec = 16 // realistic max: 5.9
const ftPerTile = 1

Object.defineProperties(user, {
 cardinality: { value: 8n },
 tilesPerSecond: { value: ftPerSec / ftPerTile },
 element: { value: null, writable: true }
})