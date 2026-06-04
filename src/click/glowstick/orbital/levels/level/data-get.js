/** @type {GLTFDocument} */
const json = JSON.parse(thisOrbitalLevel["level.gltf"])

for (const resourceArray of [json.images ?? [], json.buffers ?? []]) {
 for (const resource of resourceArray)
  if (resource.uri) {

   if (resource.uri.startsWith("..") || resource.uri.startsWith("/") || !(resource.uri.endsWith(".png") || resource.uri.endsWith(".bin")))
    throw error(`invalid resource URI "${resource.uri}" - must be a .png or .bin file without a path`)

   const base64 = thisOrbitalLevel[resource.uri]

   if (!base64)
    throw error(`can't find resource "${resource.uri}"`)

   resource.data = atoBuffer(base64)
  }
}

for (const view of json.bufferViews) {
 const buffer = json.buffers[view.buffer].data
 const length = view.byteLength
 const offset = view.byteOffset
 if (view.target)
  view.targetDesc = {
   34962: 'ARRAY_BUFFER',
   34963: 'ELEMENT_ARRAY_BUFFER'
  }[view.target]
 view.data = new DataView(buffer, offset, length)
}

for (const accessor of json.accessors) {
 const view = json.bufferViews[accessor.bufferView]
 const componentType = {
  5120: ['Int8', Int8Array, 1, 'i32', 'sint8'],
  5121: ['Uint8', Uint8Array, 1, 'u32', 'uint8'],
  5122: ['Int16', Int16Array, 2, 'i32', 'sint16'],
  5123: ['Uint16', Uint16Array, 2, 'u32', 'uint16'],
  5124: ['Int32', Int32Array, 4, 'i32', 'sint32'], // 5124 is not supported, according to spec.
  5125: ['Uint32', Uint32Array, 4, 'u32', 'uint32'],
  5126: ['Float32', Float32Array, 4, 'f32', 'float32'],
 }[accessor.componentType]
 const int = INT = k => { k = parseInt(k); if (isNaN(k)) throw 'NaN index to accessor'; return k }
 const element = (k, componentTypes = 1, index = 0) => view.data['get' + componentType[0]](accessor.byteOffset + (int(k) * componentType[2] * componentTypes) + (index * componentType[2]), true)
 const elementType = {
  SCALAR: [componentType[3], componentType[4], 1],
  VEC2: [`vec2<${componentType[3]}>`, `${componentType[4]}x2`, 2],
  VEC3: [`vec3<${componentType[3]}>`, `${componentType[4]}x3`, 3],
  VEC4: [`vec4<${componentType[3]}>`, `${componentType[4]}x4`, 4],
  MAT2: [`mat2x2<${componentType[3]}>`, ``, 4],
  MAT3: [`mat3x3<${componentType[3]}>`, ``, 9],
  MAT4: [`mat4x4<${componentType[3]}>`, ``, 16],
 }[accessor.type]

 accessor.data = new componentType[1](view.data.buffer, view.data.byteOffset, view.data.byteLength / componentType[2])
 accessor.format = elementType[0]
 accessor.format2 = elementType[1]
 accessor.stride = componentType[2] * elementType[2]

 if (view.byteStride)
  throw "not implemented"
}

const data = {
 walkable: [[], []],
 gltf: json
}

const walkableIndices = json.meshes.reduce((indices, mesh, index) => {
 if (mesh.name.startsWith('walkable_'))
  indices.push(index)

 return indices
}, [])

if (walkableIndices.length === 0)
 throw error(`no mesh called "walkable_*" found in level.gltf`)

// TODO: handle more than one walkable mesh.
const { attributes: { POSITION }, indices } = json.meshes[walkableIndices[0]].primitives[0]

const points = json.accessors[POSITION].data
const tris = json.accessors[indices].data

for (let index = 0; index < points.length; index += 3)
 data.walkable[0].push([Math.round(points[index]), Math.round(points[index + 1]), Math.round(points[index + 2])])

for (let index = 0; index < tris.length; index += 3)
 data.walkable[1].push([tris[index], tris[index + 1], tris[index + 2]])

return data