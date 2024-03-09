<script>
 class Mesh {
  constructor(shape, transform) {
   this.shape = shape
   this.transform = transform
  }
  get g() {
   return this.shape.g
  }
  get xyz() {
   return this.shape.xyz(...this.transform)
  }
  get rgba() {
   return this.shape.rgba
  }
  get p() {
   return [...this.g].fill(0)
  }
 }
 class PointView {
  static shape = PRIM_CUBE
  static size = 3
  constructor(mesh) {
   this.mesh = mesh
  }
  get #shape() {
   return this.mesh.shape;
  }
  get xyz() {
   return this.#shape.point_xyz(...this.mesh.transform).map(point => PointView.shape.xyz(...point, PointView.size)).flat()
  }
  get rgba() {
   return this.#shape.point_rgba.map(color => this.#shape.serialize(_ => color)).flat(2)
  }
  get g() {
   return this.#shape.point_g.map(g => this.#shape.serialize(_ => g)).flat()
  }
  get p() {
   return [...this.g].fill(1)
  }
 }
 class Group {
  constructor(meshes) {
   this.meshes = meshes
  }
  map(getter) {
   return this.meshes.map(getter).flat()
  }
  get g() {
   return this.map(m => m.g)
  }
  get p() {
   return this.map(m => m.p)
  }
  get xyz() {
   return this.map(m => m.xyz)
  }
  get rgba() {
   return this.map(m => m.rgba)
  }
  get length() {
   return this.g.length
  }
 }
 class Camera {
  #core = undefined
  x = 99
  y = 99
  mx = 0
  my = 0
  fov = 35
  near = 1
  far = 1000
  constructor(core) {
   this.#core = core
  }
  get core() {
   return this.#core;
  }
  get cache() {
   return this.#core.cache;
  }
  set rx(v) {
   this.cache.push('rx', v)
  }
  get rx() {
   return this.cache.pull('rx', 12)
  }
  set ry(v) {
   this.cache.push('ry', v)
  }
  get ry() {
   return this.cache.pull('ry', -35)
  }
  set rz(v) {
   this.cache.push('rz', v)
  }
  get rz() {
   return this.cache.pull('rz', 0)
  }
  set tx(v) {
   this.cache.push('tx', v)
  }
  get tx() {
   return this.cache.pull('tx', 0)
  }
  set ty(v) {
   this.cache.push('ty', v)
  }
  get ty() {
   return this.cache.pull('ty', 0)
  }
  set tz(v) {
   this.cache.push('tz', v)
  }
  get tz() {
   return this.cache.pull('tz', -210)
  }
  set s(v) {
   this.cache.push('s', v)
  }
  get s() {
   return this.cache.pull('s', 5)
  }
  get t() {
   return (Date.now() - this.core.startTime) / 1000
  }
  get aspect() {
   return this.x / this.y
  }
  get view() {
   return MDN.multiplyArrayOfMatrices([
    MDN.translateMatrix(this.tx, this.ty, this.tz),
    MDN.rotateZMatrix(this.rz * Math.PI / 180),
    MDN.rotateXMatrix(this.rx * Math.PI / 180),
    MDN.rotateYMatrix(this.ry * Math.PI / 180),
   ])
  }
  get proj() {
   let
    out = [],
    fovy = 180 - this.fov,
    aspect = this.aspect,
    near = this.near,
    far = this.far,
    f = 1.0 / Math.tan(Math.PI * fovy / 180);
   out[0] = f / aspect;
   out[1] = 0;
   out[2] = 0;
   out[3] = 0;
   out[4] = 0;
   out[5] = f;
   out[6] = 0;
   out[7] = 0;
   out[8] = 0;
   out[9] = 0;
   out[11] = -1;
   out[12] = 0;
   out[13] = 0;
   out[15] = 0;
   if (far != null && far !== Infinity) {
    var nf = 1 / (near - far);
    out[10] = far * nf;
    out[14] = far * near * nf;
   } else {
    out[10] = -1;
    out[14] = -near;
   }
   return out
  }
  get buffer() {
   return new Float32Array([...this.proj, ...this.view, this.aspect, this.mx, this.my, this.t, this.s])
  }
 }
 class Model {
  #group
  constructor(group) {
   this.#group = group
  }
  get xyz() {
   const typedArray = new Float32Array(this.#group.xyz);
   return Core.createBuffer(typedArray);
  }
  get rgba() {
   const typedArray = new Float32Array(this.#group.rgba);
   return Core.createBuffer(typedArray)
  }
  get g() {
   const typedArray = new Int32Array(this.#group.g);
   return Core.createBuffer(typedArray)
  }
  get p() {
   const typedArray = new Int32Array(this.#group.p);
   return Core.createBuffer(typedArray)
  }
  get index() {
   const typedArray = new Uint16Array([...Array(this.#group.length).keys()]);
   return Core.createBuffer(typedArray, GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST)
  }
  get length() {
   return this.#group.length
  }
 }
 class Core {
  static #device = undefined
  static #initialized = false

  static async initialize(...names) {
   if (!this.#initialized) {
    Utils.checkSupport();
    
    return await Promise.all([
     navigator.gpu.requestAdapter().then(adapter => adapter.requestDevice()),
     navigator.serviceWorker.register('serviceWorker.js'),
     new Promise(resolve => onload = () => resolve())
    ]).then(([device]) => {
     this.#device = device;
     this.#initialized = true;
    });
   }
  }

  static get device() {
   return this.#device;
  }

  static add(manifest='{"name":"untitled","width":64,"height":64}') {
   manifest = prompt('New Project | Edit Manifest', manifest);
   let parsed = undefined;
   try {
    parsed = JSON.parse(manifest);
   } catch {
    alert('Error! Bad Manifest: `'+manifest+'`')
    return Core.add(manifest);
   }
   if (!parsed) return;
   Utils.updateCache('core '+parsed.name, manifest)
   return new Core(parsed);
  }

  #name = undefined
  #cache = undefined
  #camera = undefined
  #startTime = undefined
  #attachments = undefined
  #uniformBuffer = undefined
  #onmanifestchanged = [ ]
  #onstatechanged = [ ]

  #root = document.createElement('div')
  #canvas = this.#root.appendChild(document.createElement('canvas'))
  #attributes = { }

  constructor({
   name = 'base',
   width = '640',
   height = '480'
  } = {}) {
   Debug.createGUI(this.#root);
   this.#name = name;
   this.#root.setAttribute('name', name);
   this.#root.setAttribute('class', 'tab');
   this.#cache = Utils.linkCache(this);
   this.#startTime = this.cache.pull('start-time', () => Date.now());
   const camera = this.#camera = new Camera(this);
   this.canvas.width = camera.x = width;
   this.canvas.height = camera.y = height;
   this.#root.setAttribute('style', `--aspect:${camera.aspect}`);
   const uniformBuffer = this.#uniformBuffer = Core.createBuffer(camera.buffer, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);
   const model = new Model(new Group([
    this.getCursor(),
    TEST_MESH,
    TEST_MESH_POINTS
   ]));
   const
    context = this.canvas.getContext('webgpu'),
    stencil = this.device.createTexture({
     size: [this.canvas.width, this.canvas.height, 1],
     dimension: '2d',
     format: 'depth24plus-stencil8',
     usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
    });

   let
    pointerState = 0,
    camSpeed = 0.2;
   this.canvas.onwheel = event => {
    const factor = Math.sign(event.deltaY);
    if (factor > 0) camera.tz *= 3 / 3.2;
    else camera.tz *= 3.1 / 3;
   }
   this.canvas.onkeydown = event => {
    if (event.key == 'ArrowRight') {
     event.preventDefault()
     camera.s++
    } else if (event.key == 'ArrowLeft') {
     event.preventDefault()
     camera.s--
    }
   }
   this.canvas.onmousedown = event => {
    pointerState = 1
    event.preventDefault()
    globalThis.onmouseup = event => {
     pointerState = 0
     globalThis.onmouseup = undefined
    }
   }
   this.canvas.onmousemove = event => {
    const
     rect = this.canvas.getBoundingClientRect(),
     w = rect.width,
     h = rect.height;
    camera.mx = 2 * event.offsetX / w - 1
    camera.my = -2 * event.offsetY / h + 1
    if (pointerState) {
     camera.rx = Math.min(Math.max(-90, camera.rx + event.movementY * camSpeed), 90);
     camera.ry += event.movementX * camSpeed;
    }
   }
   this.canvas.ondblclick = () => Utils.toggleFullscreen();
   context.configure({
    device: Core.device,
    format: 'bgra8unorm',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
    alphaMode: 'premultiplied'
   });
   this.#attachments = {
    colorAttachments: [{
     get view() {
      return context.getCurrentTexture().createView()
     },
     clearValue: {
      r: 0,
      g: 0,
      b: 0,
      a: 0
     },
     loadOp: 'clear',
     storeOp: 'store'
    }],
    depthStencilAttachment: {
     get view() {
      return stencil.createView()
     },
     depthClearValue: 1,
     depthLoadOp: 'clear',
     depthStoreOp: 'store',
     stencilClearValue: 0,
     stencilLoadOp: 'clear',
     stencilStoreOp: 'store'
    }
   }
   let
    pipeline = Core.device.createRenderPipeline({
     layout: 'auto',
     vertex: {
      module: Core.device.createShaderModule({
       code: COMMON_SHADER + `struct VSOut { @builtin(position) Position: vec4<f32>, @location(0) color: vec4<f32>, }; @vertex fn main( @location(0) inPos: vec3<f32>, @location(1) inColor: vec4<f32>, @location(2) inGui: u32, @location(3) inType: u32 ) -> VSOut { var vsOut: VSOut; vsOut.color = inColor; var factor = uniforms.t * f32(inGui); var m = vec2<f32>(uniforms.mx, uniforms.my); if (inGui != 1) { var pos = vec4<f32>(inPos, 1.0); pos = vec4<f32>(inPos.x+sin(factor),inPos.y+cos(factor/2),inPos.z+cos(factor), 1); if (f32(inGui) == round(uniforms.s)) { if (f32(inType) == 1) { vsOut.color = vec4<f32>(((sin(uniforms.t * 5)+1)/2) * vec3<f32>(1,1,1), 1); } } vsOut.Position = uniforms.proj * uniforms.view * pos; } else { vsOut.Position = vec4<f32>(inPos[0] / uniforms.aspect + m.x, inPos[1] + m.y, inPos[2], 1.0); } return vsOut; }`
      }),
      entryPoint: 'main',
      buffers: [{
       attributes: [{
        shaderLocation: 0,
        offset: 0,
        format: 'float32x3'
       }],
       arrayStride: 4 * 3,
       stepMode: 'vertex'
      }, {
       attributes: [{
        shaderLocation: 1,
        offset: 0,
        format: 'float32x4'
       }],
       arrayStride: 4 * 4,
       stepMode: 'vertex'
      }, {
       attributes: [{
        shaderLocation: 2,
        offset: 0,
        format: 'uint32'
       }],
       arrayStride: 4,
       stepMode: 'vertex'
      }, {
       attributes: [{
        shaderLocation: 3,
        offset: 0,
        format: 'uint32'
       }],
       arrayStride: 4,
       stepMode: 'vertex'
      }]
     },
     fragment: {
      module: Core.device.createShaderModule({
       code: COMMON_SHADER + `@fragment fn main(@builtin(position)inPos: vec4<f32>, @location(0) inColor: vec4<f32>) -> @location(0) vec4<f32> { var color = inColor; return color; }`
      }),
      entryPoint: 'main',
      targets: [{
       format: 'bgra8unorm'
      }]
     },
     primitive: {
      frontFace: 'cw',
      cullMode: 'none',
      topology: 'triangle-list'
     },
     depthStencil: {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth24plus-stencil8'
     },
    }),
    uniformBindGroup = Core.device.createBindGroup({
     layout: pipeline.getBindGroupLayout(0),
     entries: [{
      binding: 0,
      resource: {
       get buffer() {
        return uniformBuffer
       }
      }
     }]
    });
   const render = async time => {
    Debug.updateFrameRate(time);
    await this.changeBuffer(uniformBuffer, camera.buffer);
    let commandEncoder = this.device.createCommandEncoder();
    let passEncoder = commandEncoder.beginRenderPass(this.attachments);

    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, uniformBindGroup);
    passEncoder.setViewport(0, 0, camera.x, camera.y, 0, 1);
    passEncoder.setScissorRect(0, 0, camera.x, camera.y);

    passEncoder.setIndexBuffer(model.index, 'uint16');
    passEncoder.setVertexBuffer(0, model.xyz);
    passEncoder.setVertexBuffer(1, model.rgba);
    passEncoder.setVertexBuffer(2, model.g);
    passEncoder.setVertexBuffer(3, model.p);

    passEncoder.drawIndexed(model.length);
    passEncoder.end();
    this.device.queue.submit([commandEncoder.finish()]);
    requestAnimationFrame(render)
   };
   render();
  }
  get startTime() {
   return this.#startTime;
  }
  get name() {
   return this.#name;
  }
  get device() {
   return Core.device;
  }
  get attachments() {
   return this.#attachments;
  }
  get camera() {
   return this.#camera;
  }
  get cache() {
   return this.#cache
  }
  get canvas() {
   return this.#canvas
  }
  get root() {
   return this.#root;
  }
  get manifest() {
   return JSON.stringify({
    name: this.name,
    width: this.camera.x,
    height: this.camera.y
   });
  }
  get onstatechanged() {
   return this.#onstatechanged;
  }
  get onmanifestchanged() {
   return this.#onmanifestchanged;
  }
  get attributes() {
   return this.#attributes;
  }
  getCursor() {
   const NAME = this.name,
    cameraWidth = this.camera.x,
    getClientWidth = () => this.canvas.getBoundingClientRect().width;
   return {
    get g() {
     if (NAME != OVER_NAME) {
      return []
     }
     return [1, 1, 1]
    },
    get xyz() {
     if (NAME != OVER_NAME) {
      return []
     }
     const factor = 2;//cameraWidth / getClientWidth();
     return [
      0, 0, 0,
      0, -0.1 * factor, 0,
      0.07 * factor, -0.07 * factor, 0
     ]
    },
    get rgba() {
     if (NAME != OVER_NAME) {
      return []
     }
     return [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1]
    },
    get p() {
     if (NAME != OVER_NAME) {
      return []
     }
     return [0, 0, 0]
    }
   }
  }
  static createBuffer(arr, usage = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST) {
   let desc = {
    size: (arr.byteLength + 3) & ~3,
    usage,
    mappedAtCreation: true
   };
   if (usage == (GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST)) {
    desc.size = Math.ceil(desc.size / 16) * 16;
   }
   let buffer = this.device.createBuffer(desc);
   const writeArray = arr instanceof Uint16Array ? new Uint16Array(buffer.getMappedRange()) : arr instanceof Int32Array ? new Int32Array(buffer.getMappedRange()) : new Float32Array(buffer.getMappedRange());
   writeArray.set(arr);
   buffer.unmap();
   return buffer;
  }
  changeBuffer(buffer, arr) {
   const encoder = this.device.createCommandEncoder();
   this.device.queue.writeBuffer(buffer, 0, arr);
   this.device.queue.submit([encoder.finish()]);
  }
 }
 const
  COMMON_SHADER = `struct UBO { proj: mat4x4<f32>, view: mat4x4<f32>, aspect: f32, mx: f32, my: f32, t: f32, s: f32 }; @group(0) @binding(0) var<uniform> uniforms: UBO;`,
  TEST_MESH = new Mesh(PRIM_CUBE, [0, 0, 0, 50]),
  TEST_MESH_POINTS = new PointView(TEST_MESH);
 var OVER = undefined,
  OVER_NAME = undefined;

 onkeydown = e => OVER?.onkeydown?.(e);
 onmousemove = e => (OVER = e.target, OVER_NAME = e.target.tagName == 'CANVAS' ? e.target.parentNode.getAttribute('name') : null);
 Root.onmouseleave = e => OVER_NAME = undefined;
</script>