orbitalGame.loading = true

// Create new level buffers, pipeline, bind group and render pass definitions.
const { gltf } = orbitalLevel

orbitalGame.renderPassDefinitions.length = 0

for (const mesh of gltf.meshes) {

 if (mesh.name === "collision")
  continue

 for (const primitive of mesh.primitives) {

  const vertexBufferDescriptors = []
  const indexArray = gltf.accessors[primitive.indices].data

  const vertexBuffers = []
  const shaderBuffers = []
  let shaderLocation = 0
  for (const attribute in primitive.attributes) {
   if (!(['POSITION'/*, 'NORMAL'*/, 'TEXCOORD_0'].includes(attribute))) continue
   const accessor = gltf.accessors[primitive.attributes[attribute]]
   const buffer = gpu.createBuffer(accessor.data)
   vertexBuffers.push(buffer)
   vertexBufferDescriptors.push({
    attributes: [{ shaderLocation, offset: 0, format: accessor.format2 }],
    arrayStride: accessor.stride,
    stepMode: 'vertex'
   })
   shaderBuffers.push(`@location(${shaderLocation}) ${attribute}: ${accessor.format}`)
   shaderLocation++
  }

  // START MATERIAL
  const material = gltf.materials?.[primitive.material]
  const textureInfo = material?.pbrMetallicRoughness?.baseColorTexture

  let gpuTexture
  let gpuSampler

  if (textureInfo != null) {
   const texture = gltf.textures[textureInfo.index]
   const sampler = gltf.samplers[texture.sampler]
   const image = gltf.images[texture.source]
   const blob = new Blob([image.data], { type: image.mimeType })
   const bitmap = await createImageBitmap(blob, { colorSpaceConversion: 'none' })

   gpuTexture = gpu.device.createTexture({
    size: [bitmap.width, bitmap.height],
    format: 'rgba8unorm',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
   })

   gpu.device.queue.copyExternalImageToTexture(
    { source: bitmap },
    { texture: gpuTexture },
    [bitmap.width, bitmap.height]
   )

   bitmap.close()

   const FILTER_MAP = {
    9728: 'nearest',
    9729: 'linear',
    9984: 'nearest',
    9985: 'linear',
    9986: 'nearest',
    9987: 'linear',
   }

   const WRAP_MAP = {
    33071: 'clamp-to-edge',
    33648: 'mirror-repeat',
    10497: 'repeat',
   }

   gpuSampler = gpu.device.createSampler({
    magFilter: FILTER_MAP[sampler?.magFilter] ?? 'nearest',
    minFilter: FILTER_MAP[sampler?.minFilter] ?? 'nearest',
    addressModeU: WRAP_MAP[sampler?.wrapS] ?? 'repeat',
    addressModeV: WRAP_MAP[sampler?.wrapT] ?? 'repeat',
    mipmapFilter: {
     9728: 'nearest',
     9729: 'linear',
     9984: 'linear',
     9985: 'nearest',
     9986: 'nearest',
     9987: 'linear',
    }[sampler?.minFilter] ?? 'nearest',
   })

  } else {
   gpuTexture = gpu.device.createTexture({
    size: [1, 1],
    format: 'rgba8unorm',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
   })
   gpu.device.queue.writeTexture(
    { texture: gpuTexture },
    new Uint8Array([255, 0, 255, 255]),
    { bytesPerRow: 4 },
    [1, 1]
   )
   gpuSampler = gpu.device.createSampler({
    magFilter: 'linear',
    minFilter: 'linear',
    addressModeU: 'repeat',
    addressModeV: 'repeat',
   })
  }

  // END MATERIAL

  const shaderCode = orbitalGame["shader.wgsl"].replace('{$0}', shaderBuffers.join(','))
  const module = gpu.device.createShaderModule({ code: shaderCode })
  const pipeline = gpu.device.createRenderPipeline({
   layout: 'auto',
   vertex: {
    module,
    entryPoint: 'v',
    buffers: vertexBufferDescriptors
   },
   fragment: {
    module,
    entryPoint: 'f',
    targets: [{
     format: "bgra8unorm",
     blen: {
      color: {
       operation: 'add',
       srcFactor: 'one',
       dstFactor: 'zero'
      },
      alpha: {
       operation: 'add',
       srcFactor: 'one',
       dstFactor: 'zero'
      }
     }
    }]
   },
   primitive: {
    frontFace: 'ccw',
    cullMode: 'back',
    topology: {
     // TODO: instead of throwing errors, perform a build-time conversion from the two unsupported modes to a compatable one.
     0: "point-list",
     1: "line-list",
     get 2() { throw "LINE-LOOP not supported by WebGPU" },
     3: "line-strip",
     4: "triangle-list",
     5: "triangle-strip",
     get 6() { throw "TRIANGLE-FAN not supported by WebGPU" },
    }[primitive.mode ?? 4]
   },
   depthStencil: {
    depthWriteEnabled: true,
    depthCompare: 'less',
    format: 'depth24plus-stencil8'
   },
  })


  orbitalGame.renderPassDefinitions.push({
   vertexBuffers,
   pipeline,
   indexCount: indexArray.length,
   indexBuffer: gpu.createBuffer(indexArray, GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST),
   bindGroup: gpu.device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
     { binding: 0, resource: { buffer: orbitalGame.uniformBuffer } },
     { binding: 1, resource: gpuTexture.createView() },
     { binding: 2, resource: gpuSampler },
    ]
   }),
   indexArray
  })

 }
}

orbitalGame.loading = false