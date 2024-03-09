<style>
 :root {
  background-color: silver;
 }

 * {
  box-sizing: border-box;
  text-overflow: ellipsis;
 }

 input {
  border: none;
  background: none;
  padding: 0;
  text-align: left;
 }

 output {
  white-space: pre;
  font-family: monospace;
 }

 #info>* {
  min-height: 10px;
  background: magenta;
 }

 #info>.surround {
  padding: 8px 12px 8px 12px;
  display: flex;
  flex-flow: column nowrap;
  overflow-y: auto;
 }

 #info>.surround,
 #panel,
 #debug {
  border-radius: 4px;
  box-shadow: 0 0 0 1px black;
  background-color: #eee;
 }

 h1 {
  margin: 0;
  padding: 0;
  font-size: 1.3em;
 }

 #info {
  display: flex;
  flex-flow: column nowrap;
  justify-items: stretch;
  overflow-y: auto;
  padding: 8px;
  padding-left: 10px;
  gap: 8px;
 }

 #core {
  --sidebar-width: 31vw;
  --canvas-color: #eee;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
 }

 #debug {
  position: absolute;
  left: calc(var(--sidebar-width) + 18px);
  top: 18px;
  display: flex;
  flex-flow: column nowrap;
  background: #1235;
  max-width: 100px;
  width: min-content;
  min-height: min-content;
  padding: 3px;
 }

 .key-value {
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  padding: 3px;
  background: white;
  border: 1px solid black;
  border-top: none;
  box-shadow: 6px 5px 3px #0005;
  margin-left: 3px;
  margin-right: 7px;
 }

 div.key-value:hover {
  background: #7be;
 }

 h2.key-value {
  border-radius: 4px 4px 0 0;
  border-top: 1px solid black;
  margin-top: 8px;
  margin-bottom: 0;
  padding: 6px;
  font-size: 1.2em;
  background-color: #17a;
  color: white;
 }

 div.key-value:last-of-type {
  margin-bottom: 8px;
  border-radius: 0 0 4px 4px;
 }

 .key-value>* {
  width: 50%;
  overflow: hidden;
 }

 #debug[open] {
  width: 100px;
 }

 #debug>* {
  display: block;
  font-family: monospace;
  color: white;
 }

 #debug:not([open])>:not(#menua) {
  display: none;
 }

 #info {
  width: var(--sidebar-width);
  height: 100vh;
 }

 canvas {
  cursor: none;
  position: absolute;
  top: 0;
  right: 0;
  height: calc(100vh - 16px);
  width: calc(100vw - var(--sidebar-width) - 8px);
  margin: 8px;
 }
</style>
<script>
 class Mesh {
  static get companyId() {
   return 'mesh';
  }
  #mode = 'shade'
  constructor(shape, transform, name = 'mesh', override = false) {
   this.shape = shape
   this.transform = transform
   this.name = name
   this.override = override
  }
  set mode(mode) {
   this.#mode = mode
  }
  get g() {
   if (this.override) {
    switch (this.#mode) {
     case 'wire':
      return this.shape.wire_g.fill(this.override);
     default:
      return this.shape.g.fill(this.override);
    }
   }
   switch (this.#mode) {
    case 'wire':
     return this.shape.wire_g;
    default:
     return this.shape.g;
   }
  }
  get xyz() {
   switch (this.#mode) {
    case 'wire':
     return this.shape.wire_xyz(...this.transform);
    default:
     return this.shape.xyz(...this.transform);
   }
  }
  get rgba() {
   switch (this.#mode) {
    case 'wire':
     return this.shape.wire_rgba;
    default:
     return this.shape.rgba;
   }
  }
  get type() {
   return this.g.map(g => Utils.getColorKey(this.name)).flat();
  }
 }
 class Group {
  static get companyId() {
   return 'group'
  }
  #mode = 'shade'
  constructor(children) {
   this.children = children.filter(child => !!child)
  }
  set mode(mode) {
   this.#mode = mode
   this.forEach(child => child.mode = mode)
  }
  map(getter) {
   return this.children.map(getter).flat()
  }
  forEach(callback) {
   this.children.forEach(child => callback(child));
  }
  get g() {
   return this.map(m => m.g)
  }
  get xyz() {
   return this.map(m => m.xyz)
  }
  get rgba() {
   return this.map(m => m.rgba)
  }
  get type() {
   return this.map(m => m.type)
  }
  get length() {
   return this.g.length
  }
 }
 class Camera {
  static get companyId() {
   return 'lens'
  }
  static createFoundation() {
   const foundation = Utils.foundation(Camera);
   const toggleView = foundation.addToggle({
    id: 'menub',
    value: '📷'
   });
   return foundation
  }
  #core = undefined
  #focusId = 'none'
  x = 99
  y = 99
  z = 1000
  eyedrop = [0, 0, 0, 0]
  mouseX = 0
  mouseY = 0
  fov = 35
  near = 0.1
  far = 10000
  set pos({
   x,
   y,
   z
  }) {
   /*
     const maxX = C.getBoundingClientRect().width;
     if (x > maxX) x = maxX;
     if (x < 0) x = 0;
     if (y < -this.y) y = -this.y;
     if (y > 0) y = 0;*/
   if (z < 0) z = 0;
   this.cache.push('pos x', x)
   this.cache.push('pos y', y)
   this.cache.push('pos z', z)
  }
  get pos() {
   return {
    x: this.cache.pull('pos x', 0),
    y: this.cache.pull('pos y', 0),
    z: this.cache.pull('pos z', 0)
   };
  }
  get hoverId() {
   const id = Utils.getKeyFromColor(this.eyedrop) || 'none'
   this.tapHover.innerText = id;
   return id;
  }
  get focusId() {
   return this.#focusId
  }
  setFocus() {
   this.#focusId = this.hoverId
   Utils.updateCache('core focus', this.#focusId)
   this.tapFocus.innerText = this.#focusId;
  }
  constructor(core) {
   this.#core = core
   this.tapHover = Debug.watch('hover');
   this.tapFocus = Debug.watch('focus');
   this.#focusId = Utils.cache('core focus', 'none')
   this.tapFocus.innerText = this.#focusId;
  }
  get pixelRatio() {
   return this.#core.pixelRatio
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
   return this.cache.pull('rx', 0)
  }
  set ry(v) {
   this.cache.push('ry', v)
  }
  get ry() {
   return this.cache.pull('ry', 180)
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
   return new Float32Array([...this.proj, ...this.view, this.t, this.s, this.x * this.pixelRatio, this.y * this.pixelRatio, this.z])
  }
 }
 class Model {
  static get companyId() {
   return 'model'
  }
  #group
  #mode = 'shade'
  constructor(group) {
   this.#group = group
  }
  get mode() {
   return this.#mode
  }
  set mode(mode) {
   this.#mode = this.#group.mode = mode
  }
  get xyz() {
   const typedArray = new Float32Array(this.#group.xyz);
   return Core.createBuffer(typedArray);
  }
  get rgba() {
   const typedArray = new Float32Array(this.#group.rgba);
   return Core.createBuffer(typedArray);
  }
  get g() {
   const typedArray = new Int32Array(this.#group.g);
   return Core.createBuffer(typedArray)
  }
  get index() {
   const typedArray = new Uint16Array([...Array(this.#group.length).keys()]);
   return Core.createBuffer(typedArray, GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST)
  }
  get length() {
   return this.#group.length
  }
  get type() {
   const typedArray = new Float32Array(this.#group.type);
   return Core.createBuffer(typedArray);
  }
 }
 class Cursor {
  static get companyId() {
   return 'arrow'
  }
  #mode = 'shade'
  constructor(core, subject = false) {
   this.core = core
   this.subject = subject
   this.mesh = new Mesh(CURSOR, [0, 0, 0, 200], 'cur')
  }
  set mode(mode) {
   this.mesh.mode = mode
   this.#mode = mode
  }
  hoverOnly(geometry) {
   if (Core.companyId != OVER_NAME || this.#mode == 'id' && !this.subject) return [];
   return geometry;
  }
  get xyz() {
   this.mesh.transform = this.subject ? [
    this.core.camera.x / 2 - this.core.camera.mouseX, 0, this.core.camera.y / 2 + this.core.camera.mouseY, 200
   ] : [
    this.core.camera.mouseX - this.core.camera.x / 2, this.core.camera.mouseY - this.core.camera.y / 2, 0, 200
   ]
   return this.hoverOnly(this.mesh.xyz);
  }
  get rgba() {
   return this.hoverOnly(this.mesh.rgba)
  }
  get g() {
   return this.hoverOnly(this.mesh.g.fill(this.subject ? 0 : 101))
  }
  get type() {
   return this.hoverOnly(this.mesh.type)
  }
 }
 class DocMesh {
  static get companyId() {
   return 'plan'
  }
  #mode = 'shade'
  constructor(core, subject = false) {
   this.core = core
   this.subject = subject
  }
  set mode(mode) {
   this.#mode = mode
  }
  get group() {
   if (!this._group) {
    const
     getPlane = (node, depth) => {
      let id = node.getAttribute('id');
      if (!node.hasAttribute('id')) id = 'none';
      const {
       height,
       width,
       x,
       y
      } = node.getBoundingClientRect();
      if (!this.subject) return new Mesh(CUBE, [(width / 2 + x) - this.core.camera.x / 2, (height / 2 + y) - this.core.camera.y / 2, depth + this.core.camera.pos.z, width, height, 2], id)
      return new Mesh(CUBE, [-(width / 2 + x) + this.core.camera.pos.x, depth + this.core.camera.pos.z, (height / 2 + y) + this.core.camera.pos.y, width, 2, height], id);
     },
     getPlaneRecursive = (node, depth, core) => {
      let plane;
      if (!core || this.subject) plane = getPlane(node, depth + 1)
      if (!node.children.length) return plane
      return new Group([...[...node.children].map(node => getPlaneRecursive(node, depth - 2)), plane]);
     };
    this._group = getPlaneRecursive(C, 2, 1)
    this._group.mode = this.#mode
   }
   return this._group;
  }
  get xyz() {
   return this.group.xyz;
  }
  get g() {
   const final = [...this.group.g].fill(this.subject ? 0 : 100);
   this._group = undefined
   return final;
  }
  get rgba() {
   return this.group.rgba;
  }
  get type() {
   return this.group.type;
  }
 }
 class Core {
  static get companyId() {
   return 'core'
  }
  static #device = undefined
  static #instance = false

  static async initialize(...names) {
   if (this.#instance) throw "Duplicate initialization on singleton Core.";
   Utils.checkSupport();

   await Promise.all([
    navigator.gpu.requestAdapter().then(adapter => adapter.requestDevice()),
    navigator.serviceWorker.register('serviceWorker.js'),
    new Promise(resolve => onload = () => resolve())
   ]).then(([device]) => {
    this.#device = device;
    C = document.body;;
    this.#instance = new Core();
   });
  }

  static get device() {
   return this.#device;
  }

  static add(manifest = '{"name":"untitled"}') {
   manifest = prompt('New Project | Edit Manifest', manifest);
   let parsed = undefined;
   try {
    parsed = JSON.parse(manifest);
   } catch {
    alert('Error! Bad Manifest: `' + manifest + '`')
    return Core.add(manifest);
   }
   if (!parsed) return;
   Utils.updateCache('core ' + parsed.name, manifest)
   return new Core(parsed);
  }

  static createFoundation() {
   Root.scroll(1, 1);
   C.setAttribute('id', 'core');
   return C
  }

  #ui3D = true
  #manifest = {}
  #pixelRatio = 1
  #attributes = {}
  #info = undefined
  #cache = undefined
  #camera = undefined
  #onstatechanged = []
  #context = undefined
  #startTime = undefined
  #onmanifestchanged = []
  #attachments = undefined
  #bitmapContext = undefined
  #uniformBuffer = undefined
  #offscreen = new OffscreenCanvas(64, 64)
  #canvas = C.appendChild(document.createElement('canvas'))

  constructor() {
   if (Core.#instance) throw "Only one core allowed right now.";
   this.#info = new Info(this);
   this.#canvas.setAttribute('id', 'panel');
   this.#cache = Utils.linkCache(this);
   this.#startTime = this.cache.pull('start-time', () => Date.now());
   const camera = this.#camera = new Camera(this),
    canvas = this.canvas;
   const rect = canvas.getBoundingClientRect();
   canvas.width = camera.x = this.#offscreen.width = Math.round(rect.width / this.#pixelRatio);
   canvas.height = camera.y = this.#offscreen.height = Math.round(rect.height / this.#pixelRatio);
   C.setAttribute('style', `--aspect:${camera.aspect}`);
   const uniformBuffer = this.#uniformBuffer = Core.createBuffer(camera.buffer, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);
   const PAD_SAMPLE = 5;
   const model = new Model(new Group([
    // new DocMesh(this),
    new Cursor(this),
    new DocMesh(this, true),
    new Mesh(CUBE, [0, -0.5, 0, 1], 'you'),
   ]));
   const context = this.#context = this.#offscreen.getContext('webgpu');
   const bitmapContext = this.#bitmapContext = this.#canvas.getContext("2d", {
    willReadFrequently: true
   });
   let
    pointerState = 0,
    camSpeed = 0.2;
   canvas.onwheel = event => {
    event.preventDefault();
    const factor = Math.sign(event.deltaY);
    if (factor > 0) camera.tz *= 3 / 3.2;
    else camera.tz *= 3.1 / 3;
   }
   canvas.onmousedown = event => {
    canvas.click();
    camera.setFocus();
    pointerState = 1
    event.preventDefault()
    globalThis.onmouseup = event => {
     pointerState = 0
     globalThis.onmouseup = undefined
    }
   }
   canvas.onmousemove = event => {
    const
     rect = canvas.getBoundingClientRect(),
     w = rect.width,
     h = rect.height;
    camera.mouseX = event.offsetX;
    camera.mouseY = event.offsetY;
    if (pointerState) {
     camera.rx = Math.min(Math.max(-90, camera.rx + event.movementY * camSpeed), 90);
     camera.ry += event.movementX * camSpeed;
    }
   }
   let _W, _A, _S, _D, _SPACE;
   C.onkeydown = event => {
    event.preventDefault();
    switch (event.code) {
     case 'KeyW':
      if (event.repeat) return;
      _W = true;
      break;
     case 'KeyA':
      if (event.repeat) return;
      _A = true;
      break;
     case 'KeyS':
      if (event.repeat) return;
      _S = true;
      break;
     case 'KeyD':
      if (event.repeat) return;
      _D = true;
      break;
     case 'Space':
      if (event.repeat) return;
      _SPACE = true;
      break;
     case 'Enter':
      console.log('use')
      break;
     case 'KeyF':
      let id = camera.focusId;
      if (id == 'you') {
       camera.tz = -3;
       break;
      }
      if (id == 'none') id = 'core';
      const {
       width, height, x, y
      } = document.getElementById(id).getBoundingClientRect();
      camera.pos = {
       x: x + width / 2,
       y: -(height / 2 + y),
       z: 1
      }
      camera.tz = -Math.max(width, height);
      break;
    }
   }
   C.onkeyup = event => {
    event.preventDefault();
    switch (event.code) {
     case 'KeyW':
      _W = false
      console.log('stop moving forward')
      break;
     case 'KeyA':
      console.log('stop moving left')
      _A = false
      break;
     case 'KeyS':
      console.log('stop moving backward')
      _S = false
      break;
     case 'KeyD':
      console.log('stop moving right')
      _D = false
      break;
     case 'Space':
      console.log('stop jumping')
      _SPACE = false
      break;
    }
   }
   // canvas.ondblclick = () => Utils.toggleFullscreen();
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
     get clearValue() {
      return {
       r: 0,
       g: 0,
       b: 0,
       a: 0
      }
     },
     loadOp: 'clear',
     storeOp: 'store'
    }],
    depthStencilAttachment: {
     get view() {
      return Core.device.createTexture({
       size: [canvas.width, canvas.height, 1],
       dimension: '2d',
       format: 'depth24plus-stencil8',
       usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
      }).createView()
     },
     depthClearValue: 1,
     depthLoadOp: 'clear',
     depthStoreOp: 'store',
     stencilClearValue: 0,
     stencilLoadOp: 'clear',
     stencilStoreOp: 'store'
    }
   }
   const
    getPipeline = (topology = 'line-list', code = SHADER) => Core.device.createRenderPipeline({
     layout: 'auto',
     vertex: {
      module: Core.device.createShaderModule({
       code
      }),
      entryPoint: 'v',
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
      }]
     },
     fragment: {
      module: Core.device.createShaderModule({
       code
      }),
      entryPoint: 'f',
      targets: [{
       format: "bgra8unorm"
      }]
     },
     primitive: {
      frontFace: 'cw',
      cullMode: 'none',
      topology
     },
     depthStencil: {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth24plus-stencil8'
     },
    }),
    getUniformBindGroup = pipeline => Core.device.createBindGroup({
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
   const resizeObserver = new ResizeObserver(resize => this.onresize())
   resizeObserver.observe(this.#canvas);

   // =============================================

   const render = async time => {
    if (!camera.x || !camera.y || !this.showing) {
     requestAnimationFrame(render)
     return;
    };
    Debug.updateFrameRate(time);
    let commandEncoder, passEncoder, pipeline;
    let oldPos = camera.pos;
    const yAngle = ((camera.ry % 360) * Math.PI) / 180;
    let speed = 10;
    let velocity = (_S && _W ? 0 : _S ? speed : _W ? -speed : 0);
    let direction = [velocity * Math.sin(yAngle), velocity * Math.cos(yAngle)]
    oldPos = camera.pos = {
     x: oldPos.x + -direction[0],
     y: oldPos.y + -direction[1],
     z: oldPos.z + (_SPACE ? 10 : -10),
    }
    velocity = (_A && _D ? 0 : _A ? speed : _D ? -speed : 0);
    direction = [velocity * Math.sin(yAngle), velocity * Math.cos(yAngle)]
    camera.pos = {
     x: oldPos.x + -direction[1],
     y: oldPos.y + direction[0],
     z: oldPos.z
    }

    await this.changeBuffer(uniformBuffer, camera.buffer);
    commandEncoder = this.device.createCommandEncoder();
    passEncoder = commandEncoder.beginRenderPass(this.attachments);
    passEncoder.setViewport(0, 0, camera.x, camera.y, 0, 1);
    //optimization: passEncoder.setScissorRect(Math.max(camera.mouseX - PAD_SAMPLE, 0), Math.max(camera.mouseY - PAD_SAMPLE, 0), Math.min(camera.x - camera.mouseX, PAD_SAMPLE * 2), Math.min(camera.y - camera.mouseY, PAD_SAMPLE * 2));
    passEncoder.setScissorRect(0, 0, camera.x, camera.y);

    pipeline = getPipeline('triangle-list');
    model.mode = 'id';
    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, getUniformBindGroup(pipeline));
    passEncoder.setIndexBuffer(model.index, 'uint16');
    passEncoder.setVertexBuffer(0, model.xyz);
    passEncoder.setVertexBuffer(1, model.type);
    passEncoder.setVertexBuffer(2, model.g);
    passEncoder.drawIndexed(model.length);

    passEncoder.end();
    this.device.queue.submit([commandEncoder.finish()]);

    this.#bitmapContext.clearRect(0, 0, camera.x, camera.y);
    this.#bitmapContext.drawImage(this.#offscreen, 0, 0);
    camera.eyedrop = [...this.#bitmapContext.getImageData(camera.mouseX, camera.mouseY, 1, 1).data];
    camera.hoverId
    camera.focusId
    // document.body.style.setProperty('background-color', '#' + camera.eyedrop.map(n => n.toString(16).padStart(2, 0)).join(''))

    await this.changeBuffer(uniformBuffer, camera.buffer);
    commandEncoder = this.device.createCommandEncoder();
    passEncoder = commandEncoder.beginRenderPass(this.attachments);
    passEncoder.setViewport(0, 0, camera.x, camera.y, 0, 1);
    passEncoder.setScissorRect(0, 0, camera.x, camera.y);

    pipeline = getPipeline('triangle-list');
    model.mode = 'shade';
    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, getUniformBindGroup(pipeline));
    passEncoder.setIndexBuffer(model.index, 'uint16');
    passEncoder.setVertexBuffer(0, model.xyz);
    passEncoder.setVertexBuffer(1, model.rgba);
    passEncoder.setVertexBuffer(2, model.g);
    passEncoder.drawIndexed(model.length);

    pipeline = getPipeline('line-list');
    model.mode = 'wire';
    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, getUniformBindGroup(pipeline));
    passEncoder.setIndexBuffer(model.index, 'uint16');
    passEncoder.setVertexBuffer(0, model.xyz);
    passEncoder.setVertexBuffer(1, model.type);
    passEncoder.setVertexBuffer(2, model.g);
    passEncoder.drawIndexed(model.length);

    passEncoder.end();
    this.device.queue.submit([commandEncoder.finish()]);
    this.#bitmapContext.clearRect(0, 0, camera.x, camera.y);
    this.#bitmapContext.drawImage(this.#offscreen, 0, 0);

    requestAnimationFrame(render)
   };
   render();
  }
  get startTime() {
   return this.#startTime;
  }
  get pixelRatio() {
   return this.#pixelRatio
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
  get manifest() {
   return JSON.stringify(this.#manifest);
  }
  set manifest(value) {
   this.#manifest = JSON.parse(value);
   this.onmanifestchanged.forEach(callback => callback(core))
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
  get showing() {
   return SHOWING(C)
  }
  onresize() {
   setTimeout(() => {
    if (!this.showing) return;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = this.camera.x = this.#offscreen.width = Math.round(rect.width / this.#pixelRatio);
    this.canvas.height = this.camera.y = this.#offscreen.height = Math.round(rect.height / this.#pixelRatio);
   }, 0)
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
  showContextMenu({
   x,
   y
  }, target) {
   const cache = onclick;
   const rules = `left:${x}px;top:${y}px`
   this.contextMenu.style = rules
   this.contextMenu.setAttribute('open', '');
   onclick = e => {
    this.hideContextMenu();
    onclick = cache
   };
  }
  hideContextMenu() {
   this.contextMenu.removeAttribute('open');
  }
  showToolTip({
   x,
   y
  }, target) {
   const cache = onclick;
   const rules = `left:${x}px;top:${y}px`
   this.tooltip.style = rules
   this.tooltip.setAttribute('open', '');
  }
  hideToolTip() {
   this.contextMenu.removeAttribute('open');
  }
 }
 class Info {
  static get companyId() {
   return 'info'
  }
  constructor() {
   const infoFoundation = C.appendChild(Utils.foundation(Info));
   this.companies = [
    Font,
    Debug,
    Utils,
    Shape,
    Mesh,
    Group,
    Camera,
    Model,
    Cursor,
    DocMesh,
    Core
   ].map(Company => {
    const foundation = Company.createFoundation?.() ?? Utils.foundation(Company);
    if (Company != Core) infoFoundation.appendChild(foundation);
    return foundation;
   })
  }
 }
 const SHADER = `<? readfile('shader.wgsl') ?>`;
 var OVER, OVER_NAME;
 onmousemove = e => (OVER = e.target, OVER_NAME = e.target.tagName == 'CANVAS' ? e.target.parentElement.getAttribute('id') : null);
 Root.onmouseleave = e => OVER_NAME = undefined;
</script>