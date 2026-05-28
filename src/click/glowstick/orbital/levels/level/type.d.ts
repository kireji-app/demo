declare interface IOrbitalLevel
 extends IWalkable<IOrbitalLevels> {

 // Serialized Properties.
 readonly getData(): IOrbitalLevelData

 // Runtime Properties.
 readonly gltf: GLTFDocument
 /** A cache of the pre-processed geometry data obtained by running the getData method. */
 readonly data: IOrbitalLevelData
 // Runtime Properties.
 /** The html element that represents the glowstick world (client only). */
 readonly element: HTMLElement
 /** represents the runtime position of the camera, which gently lags behind player movement to prevent popping due to pixel-perfect player motion. */
 readonly camera: IVector3
 readonly viewedTriIndex: IWalkableTriIndex
 readonly viewedPosition: IVector3
}

declare const orbitalLevel: IOrbitalLevel

declare interface IOrbitalLevelData
 extends IWalkableData {
 readonly gltf: GLTFDocument
}

// ── Primitive value types returned by accessor proxies ────────────────────────

type Mat2 = [[number, number], [number, number]]
type Mat3 = [[number, number, number], [number, number, number], [number, number, number]]
type Mat4 = [[number, number, number, number], [number, number, number, number], [number, number, number, number], [number, number, number, number]]

type AccessorTypedArray =
 | Int8Array
 | Uint8Array
 | Int16Array
 | Uint16Array
 | Int32Array
 | Uint32Array
 | Float32Array

// ── glTF component and element type enumerations ──────────────────────────────

type GLTFComponentType = 5120 | 5121 | 5122 | 5123 | 5124 | 5125 | 5126
type GLTFElementType = 'SCALAR' | 'VEC2' | 'VEC3' | 'VEC4' | 'MAT2' | 'MAT3' | 'MAT4'
type GLTFBufferTarget = 34962 | 34963  // ARRAY_BUFFER | ELEMENT_ARRAY_BUFFER
type GLTFPrimitiveMode = 0 | 1 | 2 | 3 | 4 | 5 | 6  // POINTS through TRIANGLE_FAN

// ── Core glTF objects, augmented with runtime-inlined data ────────────────────

interface GLTFAsset {
 readonly version: string
 readonly generator?: string
 readonly copyright?: string
 readonly minVersion?: string
}

interface GLTFBinaryResource {
 readonly uri?: string
 readonly name?: string
 /** The actual runtime array buffer created from the corresponding base-64 encoded data string. */
 readonly data?: ArrayBuffer
}

interface GLTFBuffer
 extends GLTFBinaryResource {
 readonly byteLength: number
}

interface GLTFImage
 extends GLTFBinaryResource {
 readonly mimeType?: 'image/png'
 readonly bufferView?: number
}

interface GLTFBufferView {
 readonly buffer: number
 readonly byteOffset: number
 readonly byteLength: number
 readonly byteStride?: number
 readonly target?: GLTFBufferTarget
 readonly name?: string
 /** A human-readable description of the buffer target type taken from the "target" property. */
 readonly targetDesc?: 'ARRAY_BUFFER' | 'ELEMENT_ARRAY_BUFFER'
 /** The actual runtime DataView over the corresponding runtime array buffer. */
 readonly data: DataView
}

interface GLTFAccessor {
 readonly bufferView: number
 readonly byteOffset: number
 readonly componentType: GLTFComponentType
 readonly count: number
 readonly type: GLTFElementType
 readonly normalized?: boolean
 readonly max?: number[]
 readonly min?: number[]
 readonly name?: string
 /** Runtime typed array created as a view on the corresponding buffer. */
 readonly data: AccessorTypedArray
 /** Runtime representation of the accessor data type for WGSL (e.g. "vec3<f32>"). */
 readonly format: string
 /** Runtime representation of the accessor data type for render pass definitions (e.g. "float32x3"). */
 readonly format2: string
 /** Computed number of bytes per element. */
 readonly stride: number
}

interface GLTFSampler {
 magFilter?: number
 minFilter?: number
 wrapS?: number
 wrapT?: number
 name?: string
}

interface GLTFTexture {
 readonly source?: number
 readonly sampler?: number
 readonly name?: string
}

interface GLTFTextureInfo {
 readonly index: number
 readonly texCoord?: number
}

interface GLTFPBRMetallicRoughness {
 readonly baseColorFactor?: [number, number, number, number]
 readonly baseColorTexture?: GLTFTextureInfo
 readonly metallicFactor?: number
 readonly roughnessFactor?: number
 readonly metallicRoughnessTexture?: GLTFTextureInfo
}

interface GLTFMaterial {
 readonly name?: string
 readonly pbrMetallicRoughness?: GLTFPBRMetallicRoughness
 readonly normalTexture?: GLTFTextureInfo & { scale?: number }
 readonly occlusionTexture?: GLTFTextureInfo & { strength?: number }
 readonly emissiveTexture?: GLTFTextureInfo
 readonly emissiveFactor?: [number, number, number]
 readonly alphaMode?: 'OPAQUE' | 'MASK' | 'BLEND'
 readonly alphaCutoff?: number
 readonly doubleSided?: boolean
 readonly extensions?: { KHR_materials_unlit?: Record<string, never>, [key: string]: unknown }
}

interface GLTFPrimitive {
 readonly attributes: { POSITION: number, TEXCOORD_0?: number, NORMAL?: number, [key: string]: number | undefined }
 readonly indices?: number
 readonly material?: number
 readonly mode?: GLTFPrimitiveMode
}

interface GLTFMesh {
 readonly primitives: GLTFPrimitive[]
 readonly name?: string
 readonly weights?: number[]
}

interface GLTFNode {
 name?: string
 mesh?: number
 children?: number[]
 matrix?: number[]
 translation?: [number, number, number]
 rotation?: [number, number, number, number]
 scale?: [number, number, number]
 extras?: Record<string, unknown>
}

interface GLTFScene {
 nodes: number[]
 name?: string
}

// ── Root glTF document ────────────────────────────────────────────────────────

interface GLTFDocument {
 readonly asset: GLTFAsset
 readonly scene?: number
 readonly scenes?: GLTFScene[]
 readonly nodes?: GLTFNode[]
 readonly meshes?: GLTFMesh[]
 readonly materials?: GLTFMaterial[]
 readonly textures?: GLTFTexture[]
 readonly images?: GLTFImage[]
 readonly samplers?: GLTFSampler[]
 readonly buffers?: GLTFBuffer[]
 readonly bufferViews?: GLTFBufferView[]
 readonly accessors?: GLTFAccessor[]
 readonly extensions?: Record<string, unknown>
 readonly extras?: Record<string, unknown>
}
