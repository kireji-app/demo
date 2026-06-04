define(thisOrbitalLevel, {
 gltf: { resolve() { return this.data.gltf } },
 element: { value: null, writable: true },
 camera: { value: null, writable: true },
 viewedTriIndex: { value: null, writable: true },
 viewedPosition: { value: null, writable: true }
})