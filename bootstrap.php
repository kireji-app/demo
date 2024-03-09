<? const ORIGIN_TRIAL_KEY = 'AgUuFQWZkdIa52GsgTR/6D7ArseT6H5a/GRtTOGXbN+8JOhzV4UWNjb3xwERvWlZr/x6WG7m2bDZ3Ni/W6ZESgAAAABceyJvcmlnaW4iOiJodHRwczovL2tpcmVqaS5pbzo0NDMiLCJmZWF0dXJlIjoiV2ViR1BVIiwiZXhwaXJ5IjoxNjkxNzExOTk5LCJpc1N1YmRvbWFpbiI6dHJ1ZX0=';
header('origin-trial:' . ORIGIN_TRIAL_KEY); ?>
<!DOCTYPE html>
<title>Kireji</title>
<link rel=manifest href=manifest.json />
<style>
 :root {
  background-color: silver;
 }

 * {
  box-sizing: border-box;
  text-overflow: ellipsis;
  font-family: 'Kireji Sans', sans-serif;
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
  min-height: 38px;
  padding: 8px 12px 8px 12px;
  background: magenta;
  display: flex;
  flex-flow: column nowrap;
  overflow-y: auto;
 }

 #info>:empty {
  display: none;
 }

 #info>*,
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

 #debug>*,
 #debug::after {
  font-family: monospace;
  color: white;
 }

 .toggle:not([open])>:not(:first-child) {
  display: none;
 }

 .toggle:not([open])::after {
  content: attr(id);
  padding-left: 8px;
 }

 .toggle:not([open]) {
  display: flex;
  flex-flow: row nowrap !important;
 }

 #info {
  width: var(--sidebar-width);
  height: 100vh;
 }

 canvas {
  position: absolute;
  top: 0;
  right: 0;
  height: calc(100vh - 16px);
  width: calc(100vw - 16px);
  margin: 8px;
  image-rendering: pixelated;
 }

 canvas[hover] {
  cursor: pointer;
 }
</style>
<script>
 const
  $D = document,
  $R = $D.documentElement,
  Utils = {
   foundation: classObj => {
    const pane = $D.createElement('div');
    pane.setAttribute('id', classObj.classId);
    pane.addPart = (type, config = {}) => {
     const part = pane.appendChild($D.createElement(type));
     for (const key in config) {
      part.setAttribute(key, config[key])
     }
     return part;
    }
    pane.addToClass = str => {
     if (pane.hasAttribute('class'))
      pane.setAttribute('class', pane.getAttribute('class') + ' ' + str)
     else
      pane.setAttribute('class', str);
    }
    pane.addTable = (heading, struct) => {
     pane.addPart('h2', {
      'class': 'key-value'
     }).innerText = heading;
     const headerProperties = Object.getOwnPropertyDescriptors(struct);
     for (const key in headerProperties) {
      let element = undefined
      if (headerProperties[key].get) {
       if (headerProperties[key].set) {
        element = pane.addPart('div', {
         'class': 'key-value'
        });
        const label = element.appendChild($D.createElement('label'));
        label.innerText = key
        const input = element.appendChild($D.createElement('input'));
        input.value = struct[key]
        input.oninput = e => struct[key] = input.value
       } else {
        element = pane.addPart('div', {
         'class': 'key-value'
        });
        const label = element.appendChild($D.createElement('label'));
        label.innerText = key
        const output = element.appendChild($D.createElement('output'));
        output.value = struct[key];
       }
      } else if (headerProperties[key].set) {
       throw 'set without get is not supported yet'
      }
     }
    }
    pane.addSurround = () => {
     pane.addToClass('surround')
     const label = pane.addPart('h1', {
      id: 'h-' + classObj.classId.slice(2)
     })
     label.innerText = classObj.classId
     return label
    }
    pane.addToggle = config => {
     pane.addToClass('toggle')
     const toggle = pane.addPart('input', {
      value: '☰',
      type: 'button',
      ...config,
     });
     if (Utils.cache(config.id + ' toggle', false) === "true") {
      pane.setAttribute('open', '')
     }
     toggle.onclick = e => {
      if (pane.hasAttribute('open')) {
       Utils.updateCache(config.id + ' toggle', false)
       pane.removeAttribute('open')
      } else {
       Utils.updateCache(config.id + ' toggle', true)
       pane.setAttribute('open', '')
      }
     }
     return toggle;
    }
    return pane;
   },
   classId: 'utils',
   chars: '-abcdefghijklmnopqrstuvwxyz',
   get base() {
    return this.chars.length
   },
   getBased(int) {
    let str = ''
    while (int) {
     let m = int % this.base;
     str += this.chars[m];
     int = Math.floor(int / this.base);
    }
    return str;
   },
   getColorKey(key) {
    const rgb = [...key].reduce((sum, char, i) => sum + this.chars.indexOf(char) * (this.base ** i), 0).toString(2).padStart(24, 0).match(/.{8}/g).map(b => parseInt(b, 2));
    return [...rgb, 255];
   },
   cache(key, fallback = () => {
    throw 'No cache data and no fallback'
   }, parse = null) {
    if (!key) throw 'Missing cache key.';
    let cached = localStorage[key];
    if (!cached) {
     if (typeof fallback == 'function')
      localStorage[key] = fallback()
     else
      localStorage[key] = fallback
     cached = localStorage[key];
    }
    if (parse) {
     cached = parse(cached);
    }
    return cached
   },
   linkCache(scene) {
    return {
     push(key, value, encode = x => x) {
      localStorage[key + ' ' + scene.name] = encode(value)
      scene.onstatechanged.forEach(callback => callback(scene))
     },
     pull(key, fallback, decode = parseFloat) {
      const value = Utils.cache(key + ' ' + scene.name, fallback, x => decode(x));
      scene.onstatechanged.forEach(callback => callback(scene))
      return value;
     }
    }
   },
   updateCache(key, value) {
    localStorage[key] = value
   },
   checkSupport() {
    if (!("gpu" in navigator)) {
     throw "WebGPU is not supported.";
    }
   },
   toggleFullscreen() {
    if (!$D.fullscreenElement) {
     if ($R.requestFullscreen) {
      $R.requestFullscreen();
     } else if ($R.webkitRequestFullscreen) {
      $R.webkitRequestFullscreen();
     } else if ($R.msRequestFullscreen) {
      $R.msRequestFullscreen();
     }
    } else {
     if ($D.exitFullscreen) {
      $D.exitFullscreen();
     } else if ($D.webkitExitFullscreen) {
      $D.webkitExitFullscreen();
     } else if ($D.msExitFullscreen) {
      $D.msExitFullscreen();
     }
    }
   }
  },
  same = (a, b) => a.every((x, i) => x == b[i]),
  DECODER = new TextDecoder(),
  ENCODER = new TextEncoder();
 var _W, _A, _S, _D, _SPACE, _OVER, _OVER_NAME, C;
 class Debug {
  //static get early() {
  // throw 'not ready'
  //}
  static get classId() {
   return 'debug'
  }
  static #foundation = undefined
  static previousFrameRate = 60
  static previousTime = undefined
  static frameRateElement = undefined
  static updateFrameRate(newTime) {
   const newFrameRate = 1000 / (this.previousTime ? newTime - this.previousTime : 1);
   this.previousTime = newTime;
   this.previousFrameRate = (this.previousFrameRate + newFrameRate) / 2
   if (!this.frameRateElement) return;
   this.frameRateElement.innerText = `${Math.round(this.previousFrameRate)} fps`;
  }
  static createFoundation(core) {
   this.#foundation = C.appendChild(Utils.foundation(this));
   const toggleView = this.#foundation.addToggle({
    value: '☰',
    id: 'menua'
   })
   this.frameRateElement = this.#foundation.appendChild($D.createElement('output'));
   this.frameRateElement.setAttribute('id', 'fps');
   return this.#foundation
  }
  static watch(id = 'debug') {
   if (!this.#foundation) return {
    innerText: ''
   };
   const watchElement = this.#foundation.appendChild($D.createElement('output'));
   watchElement.setAttribute('id', id);
   return watchElement;
  }
  static tap(variable, transform = x => x) {
   console.log(transform(variable));
   return variable;
  }
 }
 class Matrix {
  static get classId() {
   return 'mtx'
  }
  static {
   const {
    cos,
    sin
   } = Math;
   this.rx = a => [
    1, 0, 0, 0,
    0, cos(a), -sin(a), 0,
    0, sin(a), cos(a), 0,
    0, 0, 0, 1
   ]
   this.ry = a => [
    cos(a), 0, sin(a), 0,
    0, 1, 0, 0,
    -sin(a), 0, cos(a), 0,
    0, 0, 0, 1
   ]
   this.rz = a => [
    cos(a), -sin(a), 0, 0,
    sin(a), cos(a), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
   ]
   this.t = (x, y, z) => [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
   ]
   this.s = (x, y, z) => [
    w, 0, 0, 0,
    0, h, 0, 0,
    0, 0, d, 0,
    0, 0, 0, 1
   ]
  }
 }
 class Shape {
  static get classId() {
   return 'shape'
  }
  static cube = new Shape(
   [{
     x: 1,
     r: 1
    }, {
     x: -1,
     r: 0
    },
    {
     y: 1,
     g: 0
    }, {
     y: -1,
     g: 1
    },
    {
     z: 1,
     b: 1
    }, {
     z: -1,
     b: 0
    },
    {
     layer: 2,
     type: 'point'
    }, {
     layer: 3,
     type: 'point'
    }, {
     layer: 4,
     type: 'point'
    }, {
     layer: 5,
     type: 'point'
    },
    {
     layer: 6,
     type: 'point'
    }, {
     layer: 7,
     type: 'point'
    }, {
     layer: 8,
     type: 'point'
    }, {
     layer: 9,
     type: 'point'
    }
   ], [
    [0, 2, 4, 6],
    [0, 2, 5, 7],
    [1, 2, 5, 8],
    [1, 2, 4, 9],
    [0, 3, 4, 10],
    [0, 3, 5, 11],
    [1, 3, 5, 12],
    [1, 3, 4, 13],
   ], [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
   ], [
    [0, 1],
    [2, 3],
    [4, 5],
    [6, 7],
    [0, 8],
    [4, 9],
    [1, 9],
    [5, 10],
    [2, 10],
    [6, 11],
    [3, 11],
    [7, 8]
   ], [
    [0, 1],
    [2, 3],
    [4, 5],
    [6, 7],
    [8, 9],
    [10, 11]
   ])
  #cache = {}
  constructor(tags, points, edges, tris, faces) {
   this.tags = tags
   this.points = points
   this.edges = edges
   this.tris = tris
   this.faces = faces
  }
  get length() {
   return this.points.length
  }
  getTaggedPoint(index, method) {
   const point = this.#cache[index] ?? (this.#cache[index] = this.points[index].reduce((result, tag) => ({
    ...result,
    ...this.tags[tag]
   }), {}))
   return method(point)
  }
  getEdge(e) {
   return this.edges[e]
  }
  getEdgePair(t) {
   const pair = this.tris[t].map(e => this.getEdge(e))
   return pair
  }
  getRenderTri(t, method) {
   return Object.values(this.getEdgePair(t).flat().reduce((O, p) => O[p] ? O : (O[p] = this.getTaggedPoint(p, method), O), {}))
  }
  getRenderTris(f, method) {
   return f.map(t => this.getRenderTri(t, method))
  }
  getEdgePoints(e, method) {
   return e.map(p => this.getTaggedPoint(p, method))
  }
  serialize_shade(method) {
   return this.faces.map(f => this.getRenderTris(f, method)).flat(2)
  }
  serialize_wire(method) {
   return this.edges.map(e => this.getEdgePoints(e, method)).flat(2)
  }
  serialize_point(method) {
   return this.points.map((_, i) => this.getTaggedPoint(i, method))
  }
  xyz(x, y, z, sx, sy = sx, sz = sx) {
   const fx = sx / 2,
    fy = sy / 2,
    fz = sz / 2;
   return this.serialize_shade(_ => [_.x * fx + x, _.y * fy + y, _.z * fz + z]).flat()
  }
  wire_xyz(x, y, z, sx, sy = sx, sz = sx) {
   const fx = sx / 2,
    fy = sy / 2,
    fz = sz / 2;
   return this.serialize_wire(_ => [_.x * fx + x, _.y * fy + y, _.z * fz + z]).flat()
  }
  point_xyz(x, y, z, sx, sy = sx, sz = sx) {
   const fx = sx / 2,
    fy = sy / 2,
    fz = sz / 2;
   return this.serialize_point(_ => [_.x * fx + x, _.y * fy + y, _.z * fz + z])
  }
  get rgba() {
   return this.serialize_shade(_ => [_.r, _.g, _.b, (_.a ?? 1)]).flat()
  }
  get wire_rgba() {
   return this.serialize_wire(_ => [_.r, _.g, _.b, (_.a ?? 1)]).flat()
  }
  get point_rgba() {
   return this.serialize_point(_ => [_.r, _.g, _.b, 1])
  }
  get g() {
   return this.serialize_shade(_ => _.layer)
  }
  get wire_g() {
   return this.serialize_wire(_ => _.layer)
  }
  get point_g() {
   return this.serialize_point(_ => _.layer)
  }
  get point_type() {
   return this.serialize_point(_ => Utils.getColorKey(_.type))
  }
 }
 class T {
  static get classId() {
   return 'type'
  }
  static Text(width) {
   const bitDepth = 8 ** width;
   const logName = bitDepth + '-bit text';
   return new T(view => DECODER.decode(view), Debug.early, width, logName)
  }
  static Integer(width, signed) {
   const bitDepth = 8 * width;
   const nameRoot = (signed ? 'I' : 'Ui') + 'nt' + bitDepth;
   const logName = bitDepth + '-bit ' + (signed ? '' : 'un') + 'signed integer';
   return new T(view => view['get' + nameRoot](0, 0), Debug.early, width, logName);
  }
  static t4 = this.Text(4)
  static u2 = this.Integer(2)
  static u4 = this.Integer(4)
  #readView
  #setView
  #logName
  #byteCount
  #terminalBytePredicate
  constructor(readView, setView, byteCount, logName, terminalBytePredicate) {
   this.#readView = readView;
   this.#setView = setView;
   this.#byteCount = byteCount;
   this.#logName = logName;
   this.#terminalBytePredicate = terminalBytePredicate;
  }
  cast(view) {
   return this.#readView(view)
  }
  write(view, data) {
   return this.#setView(view, data);
  }
  get logName() {
   return this.#logName
  }
  countBytes(source, offset) {
   if (this.#terminalBytePredicate) {
    const view = new DataView(source, offset, this.#byteCount);
    for (let i = 0; i < view.byteLength; i++) {
     const isLast = this.#terminalBytePredicate(view.getUint8(i));
     if (isLast) return i + 1
    }
    throw `${this.logName}: string exceeded expected max length of ${this.#byteCount} (no terminator found)`;
   }
   return this.#byteCount
  }
 }
 class Struct {
  static get classId() {
   return 'struc'
  }
  #views = {}
  #offset = 0
  #byteCount = 0
  #source = undefined
  get byteCount() {
   return this.#byteCount
  }
  get offset() {
   return this.#offset
  }
  constructor(source, offset, ...properties) {
   this.#source = source
   this.#offset = offset
   properties.forEach(p => this.#attach(...p));
  }
  #attach(type, key, get = true, set = false, isEnabled) {
   if (isEnabled && !isEnabled(this)) return;
   const byteCount = type.countBytes(this.#source, this.#offset + this.byteCount);
   const view = this.#addView(key, byteCount);
   get ? (set ? this.#addGetSet(type, key) : this.#addGet(type, key)) : null;
   this.#byteCount += byteCount;
  }
  #addView(key, byteCount) {
   return this.#views[key] = new DataView(this.#source, this.#offset + this.#byteCount, byteCount);
  }
  #addGet(type, key) {
   Object.defineProperty(this, key, {
    get: function() {
     return type.cast(this.#views[key])
    }
   })
  }
  #addGetSet(type, key) {
   Object.defineProperty(this, key, {
    get: function() {
     return type.cast(this.#views[key])
    },
    set: function(data) {
     type.write(this.#views[key], data)
    }
   })
  }
 }
 class File {
  static get classId() {
   return 'file'
  }
  #byteCount = 0
  #buffer = undefined
  #signature = undefined
  constructor(buffer) {
   if (!(buffer instanceof ArrayBuffer)) throw 'File constructor requires an ArrayBuffer';
   const signatureSize = 4;
   this.#signature = new DataView(buffer, 0, signatureSize);
   this.#byteCount += signatureSize;
   this.#buffer = buffer
  }
  get signature() {
   return DECODER.decode(this.#signature);
  }
  get byteCount() {
   return this.#byteCount
  }
  skip(count) {
   this.#byteCount += count
  }
  addStruct(...args) {
   const struct = new Struct(...args);
   this.skip(struct.byteCount)
   return struct;
  }
  get buffer() {
   return this.#buffer
  }
 }
 class Woff2 extends File {
  static get classId() {
   return 'woffb'
  }
  #source = undefined
  #header = undefined
  #tableDirectory = []
  #collectionDirectory = undefined
  #compressedFontData = undefined
  #extendedMetaData = undefined
  #privateData = undefined
  constructor(src) {
   super(src)
   const
    UINT16_255 = new T(
     Debug.early,
     Debug.early,
     1
    ),
    UINTBASE128 = new T(
     view => {
      let accum = 0;
      for (let i = 0; i < view.byteLength; i++) {
       const data_byte = view.getUint8(i);
       if (i == 0 && data_byte == 0x80) throw 'UIntBase128 with leading zeros';
       if (accum & 0xFE000000) throw 'UIntBase128 top 7 bits are set';
       accum = (accum << 7) | (data_byte & 0x7F);
      }
      return accum;
     },
     Debug.early,
     5,
     'Variable-length base-128 sequence',
     byte => (byte & 0x80) == 0
    ),
    FLAGS = (values => new T(
     view => {
      const data_byte = view.getUint8(0);
      const tag = values[(data_byte & 0b00111111)];
      const transform = (data_byte & 0b11000000) >> 6;
      return {
       tag,
       transform,
       toString() {
        return [this.tag, this.transform].join(', ')
       }
      }
     },
     Debug.early,
     1,
     '{ 5-bit table tag, 2-bit transform number }'
    ))([
     'cmap', 'head', 'hhea', 'hmtx', 'maxp', 'name', 'OS/2', 'post', 'cvt ', 'fpgm', 'glyf', 'loca', 'prep', 'CFF ', 'VORG', 'EBDT',
     'EBLC', 'gasp', 'hdmx', 'kern', 'LTSH', 'PCLT', 'VDMX', 'vhea', 'vmtx', 'BASE', 'GDEF', 'GPOS', 'GSUB', 'EBSC', 'JSTF', 'MATH',
     'CBDT', 'CBLC', 'COLR', 'CPAL', 'SVG ', 'sbix', 'acnt', 'avar', 'bdat', 'bloc', 'bsln', 'cvar', 'fdsc', 'feat', 'fmtx', 'fvar',
     'gvar', 'hsty', 'just', 'lcar', 'mort', 'morx', 'opbd', 'prop', 'trak', 'Zapf', 'Silf', 'Glat', 'Gloc', 'Feat', 'Sill', 'cust'
    ])
   const {
    t4,
    u2,
    u4
   } = T;
   this.#header = this.addStruct(
    src, this.byteCount,
    [t4, 'flavor'],
    [u4, 'length'],
    [u2, 'numTables'],
    [u2, 'reserved', false],
    [u4, 'totalSfntSize'],
    [u4, 'totalCompressedSize'],
    [u2, 'majorVersion'],
    [u2, 'minorVersion'],
    [u4, 'metaOffset'],
    [u4, 'metaLength'],
    [u4, 'metaOrigLength'],
    [u4, 'privOffset'],
    [u4, 'privLength'],
   );
   for (let i = 0, max = this.header.numTables; i < max; i++) {
    this.#tableDirectory.push(this.addStruct(
     src, this.byteCount,
     [FLAGS, 'flags'],
     [t4, 'tag', true, false, struct => struct.flags.tag == 'cust'],
     [UINTBASE128, 'origLength'],
     [UINTBASE128, 'transformLength', true, null, struct => {
      const
       hasTransform = (tag) => {
        switch (tag) {
         case 'hmtx':
          return struct.flags.transform === 1;
         case 'loca':
         case 'glyf':
          return struct.flags.transform === 0;
         case 'cust':
          return hasTransform(struct.tag);
         default:
          if (struct.flags.transform !== 0)
           throw `transform inside ${tag} table. ${struct.offset}(0x${struct.offset.toString(16)}) ${struct.byteCount}`
          return false;
        }
       };
      return hasTransform(struct.flags.tag);
     }]
    ));
   };
   /*
      this.#collectionDirectory = new Struct(src, cursor, [
      
      ])
      this.#compressedFontData = new Struct(src, cursor, [
      
      ])
      this.#extendedMetaData = new Struct(src, cursor, [
      
      ])
      this.#privateData = new Struct(src, cursor, [
      
      ])*/
   if (this.signature !== 'wOF2') throw 'Invalid Woff2 file!';
  }
  get header() {
   return this.#header
  }
  get tableDirectory() {
   return this.#tableDirectory
  }
  get collectionDirectory() {
   return this.#collectionDirectory
  }
  get compressedFontData() {
   return this.#compressedFontData
  }
  get extendedMetaData() {
   return this.#extendedMetaData
  }
  get privateData() {
   return this.#privateData
  }
  toFontFace(family) {
   return new FontFace(family, this.buffer)
  }
 }
 class Font {
  static get classId() {
   return 'font'
  }
  static #output = undefined
  static #foundation = undefined
  static createFoundation() {
   this.#foundation = Utils.foundation(this);
   this.#foundation.addToggle({
    id: 'fnt'
   });
   const heading = this.#foundation.addSurround();
   this.#output = this.#foundation.addPart('output', {
    id: 'afont'
   })
   this.#output.value = 'initialized.'
   const selectedFont = new Font('font.woff2', 'Kireji Sans');
   heading.innerText = selectedFont.family;
   const linkToDocs = this.#foundation.addPart('a', {
    href: 'https://www.w3.org/TR/WOFF2/',
    id: 'woffl',
    target: '_blank'
   })
   linkToDocs.innerText = 'File Type Spec'

   return this.#foundation;
  }
  #woff2 = undefined
  #installed = undefined
  constructor(uri, family) {
   this.tap(`loading '${uri}' as '${family}' ...`);
   this.uri = uri;
   this.family = family;
   this.install()
    .then(() => {
     this.tap(`successfully loaded '${uri}' as '${family}'`);
     this.inspect()
    })
    .catch(reason => {
     this.tap(`failed to load '${uri}' as '${family}'.\n\t\t ${reason}`)
    })
  }
  tap(value, transform = x => x) {
   Font.#output.value += '\n' + transform(value);
   return value;
  }
  inspect() {
   Font.#foundation.addTable('header', this.#woff2.header);
   this.#woff2.tableDirectory.forEach((entry, i) => Font.#foundation.addTable(`tableDirectory[${i}]`, entry))
   this.tap(`${this.family} successfully parsed.\n/*\n\tEventually, file views like this\n\twill be a hierarchy of types.\n\tTheir foundations will be built\n\tand styled according to type.\n\n\tSome types are merely wrappers\n\tfor visualization, inheriting\n\tstructure from their base type\n*/`)
  }
  async install() {
   if (this.#installed) $D.fonts.delete(this.#installed);
   const reader = new FileReader();
   const blob = await fetch(this.uri).then(res => res.blob());
   return new Promise((resolve, reject) => {
    reader.onloadend = e => {
     this.#woff2 = new Woff2(reader.result);
     this.#installed = this.#woff2.toFontFace(this.family);
     this.#installed.load();
     $D.fonts.add(this.#installed);
     resolve();
    }
    reader.onerror = e => reject("FileReader error")
    reader.readAsArrayBuffer(blob);
   })
  }
 }
 class Mesh {
  static get classId() {
   return 'mesh';
  }
  static #register = new Map();
  static get(id) {
   return this.#register.get(id);
  }
  #mode = 'shade'
  #id = [0, 0, 0, 0]
  constructor(shape, transform, name = 'mesh', override = false) {
   this.shape = shape
   this.transform = transform
   this.name = name;
   this.#id = Utils.getColorKey(name);
   this.override = override
   const tag = btoa(new Float32Array(this.#id));
   Mesh.#register.set(tag, this)
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
   return this.g.map(g => this.#id.map(x => x / 255)).flat();
  }
 }
 class Group {
  static get classId() {
   return 'group'
  }
  #mode = 'shade'
  #scene
  constructor(children) {
   this.children = children.filter(child => {
    if (!child) return false;
    child.group = this;
    return true;
   })
  }
  set mode(mode) {
   this.#mode = mode
   this.forEach(child => child.mode = mode)
  }
  get scene() {
   return this.#scene
  }
  set scene(scene) {
   this.#scene = scene
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
  static get classId() {
   return 'lens'
  }
  static get NO_ID() {
   return this.#noFocus
  }
  static #noFocus = btoa(new Float32Array([0, 0, 0, 0]));
  #scene = undefined
  #focus
  x = 99
  y = 99
  eyedrop
  mouseX = 0
  mouseY = 0
  fov = 35
  near = 0.1
  far = 10000
  setFocus() {
   this.#focus = this.eyedrop
   this.cache.push('focus', this.#focus, x => x.join(' '))
   Utils.updateCache('core focus', this.#focus)
   this.tapFocus.innerText = this.#focus;
  }
  scopeIn() {
   this.scope *= 3 / 3.2;
  }
  scopeOut() {
   this.scope *= 3.1 / 3;
  }
  walk(w, a, s, d, space) {
   const
    yAngle = ((this.ry % 360) * Math.PI) / 180,
    speed = this.scope / 13,
    velocityU = s && w ? 0 : s ? speed : w ? -speed : 0,
    velocityV = a && d ? 0 : a ? speed : d ? -speed : 0,
    directionU = [velocityU * Math.sin(yAngle), velocityU * Math.cos(yAngle)],
    directionV = [velocityV * Math.sin(yAngle), velocityV * Math.cos(yAngle)];
   this.tx += -directionU[0] + -directionV[1]
   this.ty += (space ? speed : -speed)
   this.tz += -directionU[1] + directionV[0]
  }
  constructor(scene) {
   this.#scene = scene
   this.tapHover = Debug.watch('hover');
   this.tapFocus = Debug.watch('focus');
   this.eyedrop = [0, 0, 0, 0];
   this.#focus = this.cache.pull('focus', '0 0 0 0', x => x.split(' '));
  }
  get pixelRatio() {
   return this.#scene.pixelRatio
  }
  get focus() {
   return btoa(new Float32Array(this.#focus))
  }
  get hover() {
   return btoa(new Float32Array(this.eyedrop))
  }
  get cache() {
   return this.#scene.cache;
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
   if (v < 0) v = 0;
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
  set scope(v) {
   this.cache.push('scope', v)
  }
  get scope() {
   return this.cache.pull('scope', 4)
  }
  set s(v) {
   this.cache.push('s', v)
  }
  get s() {
   return this.cache.pull('s', 5)
  }
  get t() {
   return (Date.now() - this.#scene.startTime) / 1000
  }
  get aspect() {
   return this.x / this.y
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
   return new Float32Array([
    ...this.eyedrop.map(x => x / 255),
    ...this.#focus.map(x => x / 255),
    ...this.proj,
    ...Matrix.t(0, 0, -this.scope),
    ...Matrix.rz(this.rz * Math.PI / 180),
    ...Matrix.rx(this.rx * Math.PI / 180),
    ...Matrix.ry(this.ry * Math.PI / 180),
    ...Matrix.t(this.tx, this.ty, this.tz),
    this.t
   ]);
  }
 }
 class Scene {
  static get classId() {
   return 'scene'
  }
  #dirty = true
  #buffers = {}
  #cache = undefined
  #group = undefined
  #camera = undefined
  #onstatechanged = []
  #pixelRatio = undefined
  #startTime
  constructor(group, pixelRatio = 1, context, view) {
   group.scene = this
   this.context = context;
   this.view = view;
   this.#group = group
   this.#pixelRatio = pixelRatio
   this.#cache = Utils.linkCache(this);
   this.#startTime = this.#cache.pull('start-time', () => Date.now());
   this.#camera = new Camera(this);
  }
  render(time) {
   Debug.updateFrameRate(time);
   this.#camera.walk(_W, _A, _S, _D, _SPACE);
   new RenderPass('id', this);
   new RenderPass('beauty', this);
   requestAnimationFrame(time => this.render(time))
  }
  drawIdPass(pass) {
   const pipeline = this.#getPipeline('triangle-list', 'id');
   pass.setPipeline(pipeline);
   pass.setBindGroup(0, this.#getUniformBindGroup(pipeline));
   this.#changeBuffer(this.#buffers.uniform, this.#camera.buffer);
   const B = this.buffers;
   pass.setIndexBuffer(B.index_id, 'uint16');
   pass.setVertexBuffer(0, B.xyz_id);
   pass.setVertexBuffer(1, B.type_id);
   pass.drawIndexed(B.length_id);
  }
  drawBeautyPass(pass) {
   const pipeline = this.#getPipeline('triangle-list', 'beauty');
   pass.setPipeline(pipeline);
   pass.setBindGroup(0, this.#getUniformBindGroup(pipeline));
   this.#changeBuffer(this.#buffers.uniform, this.#camera.buffer);
   const B = this.buffers;
   pass.setIndexBuffer(B.index_shade, 'uint16');
   pass.setVertexBuffer(0, B.xyz_shade);
   pass.setVertexBuffer(1, B.rgba_shade);
   pass.setVertexBuffer(2, B.type_id);
   pass.drawIndexed(B.length_shade);
  }
  drawWirePass(pass) {
   const pipeline = this.#getPipeline('line-list', 'wire');
   pass.setPipeline(pipeline);
   pass.setBindGroup(0, this.#getUniformBindGroup(pipeline));
   const B = this.buffers;
   pass.setIndexBuffer(B.index_wire, 'uint16');
   pass.setVertexBuffer(0, B.xyz_wire);
   pass.setVertexBuffer(1, B.type_wire);
   pass.drawIndexed(B.length_wire);
  }
  #createBuffers() {
   const B = this.#buffers;
   this.#group.mode = 'shade';
   B.index_shade = Core.createBuffer(new Uint16Array([...Array(this.#group.length).keys()]), GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST);
   B.type_shade = Core.createBuffer(new Float32Array(this.#group.type));
   B.g_shade = Core.createBuffer(new Int32Array(this.#group.g));
   B.rgba_shade = Core.createBuffer(new Float32Array(this.#group.rgba));
   B.xyz_shade = Core.createBuffer(new Float32Array(this.#group.xyz));
   B.length_shade = this.#group.length
   this.#group.mode = 'id';
   B.index_id = Core.createBuffer(new Uint16Array([...Array(this.#group.length).keys()]), GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST);
   B.type_id = Core.createBuffer(new Float32Array(this.#group.type));
   B.g_id = Core.createBuffer(new Int32Array(this.#group.g));
   B.rgba_id = Core.createBuffer(new Float32Array(this.#group.rgba));
   B.xyz_id = Core.createBuffer(new Float32Array(this.#group.xyz));
   B.length_id = this.#group.length
   this.#group.mode = 'wire';
   B.index_wire = Core.createBuffer(new Uint16Array([...Array(this.#group.length).keys()]), GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST);
   B.type_wire = Core.createBuffer(new Float32Array(this.#group.type));
   B.g_wire = Core.createBuffer(new Int32Array(this.#group.g));
   B.rgba_wire = Core.createBuffer(new Float32Array(this.#group.rgba));
   B.xyz_wire = Core.createBuffer(new Float32Array(this.#group.xyz));
   B.length_wire = this.#group.length
   B.uniform = Core.createBuffer(this.#camera.buffer, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);
  }
  #getPipeline(topology = 'line-list', key = 'wire', code = `<? readfile('shader.wgsl') ?>`) {
   const universalShaderModule = Core.device.createShaderModule({
    code
   });
   const buffers = [{
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
   }];
   if (key == 'beauty') {
    buffers.push({
     attributes: [{
      shaderLocation: 2,
      offset: 0,
      format: 'float32x4'
     }],
     arrayStride: 4 * 4,
     stepMode: 'vertex'
    })
   }
   return Core.device.createRenderPipeline({
    layout: 'auto',
    vertex: {
     module: universalShaderModule,
     entryPoint: key + 'V',
     buffers
    },
    fragment: {
     module: universalShaderModule,
     entryPoint: key + 'F',
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
   })
  }
  #getUniformBindGroup(pipeline) {
   return Core.device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [{
     binding: 0,
     resource: {
      buffer: this.buffers.uniform
     }
    }]
   });
  }
  #changeBuffer(buffer, arr) {
   const encoder = Core.device.createCommandEncoder();
   Core.device.queue.writeBuffer(buffer, 0, arr);
   Core.device.queue.submit([encoder.finish()]);
  }
  get buffers() {
   if (this.#dirty) {
    this.#createBuffers();
    this.#dirty = false;
   }
   return this.#buffers;
  }
  get pixelRatio() {
   return this.#pixelRatio
  }
  get camera() {
   return this.#camera
  }
  get cache() {
   return this.#cache
  }
  get onstatechanged() {
   return this.#onstatechanged;
  }
  get width() {
   return this.#camera.x
  }
  get height() {
   return this.#camera.y
  }
  set width(value) {
   this.#camera.x = value
  }
  set height(value) {
   this.#camera.y = value
  }
  get startTime() {
   return this.#startTime
  }
  get selected() {
   const id = this.camera.focus
   if (id == Camera.NO_ID) return null;
   return Mesh.get(id);
  }
 }
 class Prime extends Group {
  static get classId() {
   return 'prime'
  }
  static createFoundation() {
   const foundation = Utils.foundation(this);
   foundation.addToggle({
    id: 'prim'
   });
   foundation.addSurround();
   this.cache_to(10000);
   this.map((p, i) => foundation.addPart('code').innerText = p);
   return foundation;
  }
  static map(callback) {
   return Object.keys(this.primes).map(i => callback(this.primes[i], parseInt(i), this.primes));
  }
  static pi = {
   1: 0,
   2: 1
  }
  static primes = {
   1: 2
  }
  static pi_max = 1
  static x_max = 3
  static cache_to(n) {
   if (this.x_max >= n) return;
   for (let x = this.x_max; x <= n; x++) {
    let i = 1
    while (this.primes[i] < x && x % this.primes[i] != 0) {
     i++
     if (this.pi_max < i) {
      this.primes[i] = x
      this.pi_max++
     }
    }
    this.pi[x] = this.pi_max;
   }
   this.x_max = n;
  }
  constructor() {
   super([]);
   this.children.push(...Prime.map((p, i) => {
    return new Mesh(Shape.cube, [p, -0.5, i, 1], Utils.getBased(i));
   }));
  }
 }
 class RenderPass {
  static get classId() {
   return 'rpass'
  }
  constructor(name, scene) {
   const
    offscreen = scene.context,
    onscreen = scene.view,
    attachments = {
     colorAttachments: [{
      get view() {
       return offscreen.getCurrentTexture().createView()
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
        size: [scene.width, scene.height, 1],
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
    commandEncoder = Core.device.createCommandEncoder(),
    pass = commandEncoder.beginRenderPass(attachments);
   pass.setViewport(0, 0, scene.width, scene.height, 0, 1);
   pass.setScissorRect(0, 0, scene.width, scene.height);
   switch (name) {
    case 'id':
     scene.drawIdPass(pass);
     break;
    case 'beauty-wire':
     scene.drawBeautyPass(pass);
     scene.drawWirePass(pass);
     break;
    case 'beauty':
     scene.drawBeautyPass(pass);
     break;
    case 'wire':
     scene.drawBeautyPass(pass);
     break;
    default:
     throw `Unknown renderpass identifier '${name}'`
   }
   pass.end();
   Core.device.queue.submit([commandEncoder.finish()]);
   onscreen.clearRect(0, 0, scene.width, scene.height);
   onscreen.drawImage(offscreen.canvas, 0, 0);
   if (name == 'id') {
    scene.camera.eyedrop = [...onscreen.getImageData(scene.camera.mouseX / scene.pixelRatio, scene.camera.mouseY / scene.pixelRatio, 1, 1).data];
    if (!same(scene.camera.eyedrop, [0, 0, 0, 0])) {
     onscreen.canvas.setAttribute('hover', '')
    } else {
     onscreen.canvas.removeAttribute('hover');
    }
   }
  }
 }
 class Core {
  static get classId() {
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
    C = $D.body;;
    this.#instance = new Core();
   });
  }
  static get device() {
   return this.#device;
  }
  static createFoundation() {
   C.setAttribute('id', 'core');
   return C
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
  #info = undefined
  #scene = undefined
  #context = undefined
  #bitmapContext = undefined
  #offscreen = new OffscreenCanvas(64, 64)
  #canvas = C.appendChild($D.createElement('canvas'))
  constructor() {
   if (Core.#instance) throw "Only one core allowed right now.";
   //this.#info = new Info(this);
   this.#canvas.setAttribute('id', 'panel');
   Prime.cache_to(10000);

   const
    context = this.#context = this.#offscreen.getContext('webgpu'),
    view = this.#bitmapContext = this.#canvas.getContext("2d", {
     willReadFrequently: true
    }),
    scene = this.#scene = new Scene(new Group([new Prime(), new Mesh(Shape.cube, [0, 0, 0, 16, 0, 16], 'grid')]), 1, context, view),
    camera = scene.camera,
    canvas = this.#canvas,
    rect = canvas.getBoundingClientRect();

   canvas.width = scene.width = this.#offscreen.width = Math.round(rect.width / scene.pixelRatio);
   canvas.height = scene.height = this.#offscreen.height = Math.round(rect.height / scene.pixelRatio);

   let
    pointerState = 0,
    camSpeed = 0.6;
   canvas.onwheel = event => {
    event.preventDefault();
    const factor = Math.sign(event.deltaY);
    if (factor > 0) camera.scopeIn()
    else camera.scopeOut()
   }
   canvas.onmousedown = event => {
    canvas.click();
    pointerState = 1
    event.preventDefault()
    globalThis.onmouseup = event => {
     if (pointerState == 1) camera.setFocus();
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
     if (pointerState == 1) {
      if (Math.sqrt(event.movementX ** 2 + event.movementY ** 2) > 1) {
       pointerState = 2
      }
     }
     camera.rx = Math.min(Math.max(-90, camera.rx + event.movementY * camSpeed), 90);
     camera.ry += event.movementX * camSpeed;
    }
   }
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
      let
       mesh = scene.selected,
       pos;
      if (!mesh) {
       camera.tx = 0
       camera.ty = 0
       camera.tz = 0
      } else {
       let mt = mesh.transform;
       camera.tx = -mt[0]
       camera.ty = -mt[1]
       camera.tz = -mt[2]
      }
      camera.scope = 4;
      break;
    }
   }
   C.onkeyup = event => {
    event.preventDefault();
    switch (event.code) {
     case 'KeyW':
      _W = false
      break;
     case 'KeyA':
      _A = false
      break;
     case 'KeyS':
      _S = false
      break;
     case 'KeyD':
      _D = false
      break;
     case 'Space':
      _SPACE = false
      break;
    }
   }
   onmousemove = e => (_OVER = e.target, _OVER_NAME = e.target.tagName == 'CANVAS' ? e.target.parentElement.getAttribute('id') : null);
   $R.onmouseleave = e => _OVER_NAME = undefined;
   canvas.ondblclick = () => Utils.toggleFullscreen();
   context.configure({
    device: Core.device,
    format: 'bgra8unorm',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
    alphaMode: 'premultiplied'
   });
   const resizeObserver = new ResizeObserver(resize => this.onresize())
   resizeObserver.observe(canvas);
   scene.render();
  }
  get device() {
   return Core.device;
  }
  get scene() {
   return this.#scene;
  }
  get showing() {
   return !!(C.offsetWidth || C.offsetHeight || C.getClientRects().length)
  }
  onresize() {
   setTimeout(() => {
    if (!this.showing) return;
    const rect = this.#canvas.getBoundingClientRect();
    this.#canvas.width = this.scene.width = this.#offscreen.width = Math.round(rect.width / this.scene.pixelRatio);
    this.#canvas.height = this.scene.height = this.#offscreen.height = Math.round(rect.height / this.scene.pixelRatio);
   }, 0)
  }
 }
 Core.initialize();
</script>