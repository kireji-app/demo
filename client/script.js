document.reroot = (context, callback) => {
 document.parentContext = context
 document.provideEvents = callback
}
addEventListener('load', () => {
 const
  BODY = document.body,
  DICTIONARY_LISTENERS = new Set(),
  DICTIONARY = new Proxy(new Set(), {
   get(glossary, word, dictionary) {
    if (word.includes('-')) {
     let definition = undefined;
     if (!glossary.has(word)) {
      customElements.define(word, PROTODEFINITION(word))
      glossary.add(word)
      definition = customElements.get(word)
      DICTIONARY_LISTENERS.forEach(callback => {
       callback(definition)
      })
     } else {
      definition = customElements.get(word)
     }
     return definition
    }
    return {
     glossary,
     has: word => {
      return !!(word.includes('-') && dictionary[word])
     },
     length: glossary.size,
     forEach: (callback = definition => { }, applyToFutureWords = true) => {
      glossary.forEach(word => {
       callback(dictionary[word])
      })
      if (applyToFutureWords)
       DICTIONARY_LISTENERS.add(callback)
     }
    }[word]
   }
  }),
  PROTODEFINITION = WORD => class extends HTMLElement {
   constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.on('mouseover mouseout', event => DO['hover'](event.x, event.y))
   }
   css({ argument }) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(argument);
    this.shadowRoot.adoptedStyleSheets.push(sheet);
    return [sheet]
   }
   html({ append, argument }) {
    const returnable = [];
    for (const node of argument.toNodes()) returnable.push(...append('node', node, this));
    return returnable;
   }
   node({ append, argument, fork }) {
    if (argument === this) BODY.appendChild(argument)
    else if (this.shadowRoot) this.shadowRoot.appendChild(argument);
    else this.appendChild(argument);
    function recursive_model(subject, { append, fork }) {
     const word = subject.word
     if (!word) return;
     if (subject.isPart) {
      append('model', DICTIONARY[word].model, subject);
     } else {
      for (const child of subject.children)
       recursive_model(child, fork('node', child));
     }
    }
    recursive_model(argument, { append, fork });
    return [argument];
   }
   model({ append, argument, pickOne }) {
    const returnable = [];
    this.shadowRoot.adoptedStyleSheets = [GLOBAL_SHEET]
    const [word, expressions] = pickOne(argument);
    if (word in argument) returnable.push(...append('expressions', expressions, this));
    return returnable;
   }
   buffername({ append, argument }) {
    const e = argument[0];

    if (!['~', '+', `^`, '\'', '['].includes(e))
     return append('expressions', buffers[argument], this)

    const buffername = argument.unwrap();
    if (!(buffername in buffers)) throw `${buffername} is not in buffers`
    const file = buffers[buffername];
    if (typeof file !== 'string') throw `${buffername} is a binary file`

    return append('expression', buffers[buffername].wrap(e), this)
   }
   javascript(context) {
    const
     { argument, append, inside, stack, fork, index } = context,
     depth = inside(this.word),
     KEYWORDS = ['abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while', 'with', 'yield'],
     console = (msg, type) => {
      DO['console ' + type](msg, this, depth, index)
     },
     echo = (...expressions) => {
      const results = append('expressions', expressions, this);
      if (!returned) returnable.push(results)
      return results.flat(2);
     },
     { Q, K, flip, enableHost } = this,
     $ = (rootword = 'desktop-', word = this.word) => echo(...archive[word][rootword]),
     attributes = this.customizations && Object.keys(this.customizations),
     identifiers = attributes && attributes.map(key => key.replace('-', '_')),
     hasCustom = attributes && attributes.length,
     scopeGlobals = {
      depth,
      context,
      script: argument,
      innerHTML: this.innerHTML,
      echo, $,
      say: html => echo(html.wrap('+')),
      incoming: (callback = word => { }) => {
       const obj = {}, myLinks = backlinks.get(this.word);
       myLinks?.forEach(word => {
        obj[word] = callback?.(word)
       })
       return obj;
      },
      debounce: (event, callback, delay = 20) => {
       let timeout = 0
       ON[event]((...args) => {
        if (timeout !== 0) clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), delay)
       })
      },
      inside, stack, fork, index,
      Q, K, flip, enableHost,
      log: msg => console(msg, 'log'),
      error: msg => console(msg, 'error'),
      success: msg => console(msg, 'success'),
      warning: msg => console(msg, 'warning'),
      enableDrag: (update, startPos, ontoggle = x => { }) => {
       update(startPos);
       this.onmousedown = () => {
        window.telecursor.trackDrag(
         pos => {
          ontoggle(true, pos);
          update(pos, width, height)
         },
         update,
         pos => {
          update(pos);
          ontoggle(false, pos);
         }
        );
       }
      },
      followMouse: (update, startPos) => {
       update(startPos);
       window.telecursor.link(
        cursor_info => {
         update(cursor_info, width, height)
        }
       )
      },
      change: (key, value) => localStorage[key] = value,
      tip: (msg, node = this) => {
       node.on('mouseover', () => {
        DO['tooltip'](msg)
        const args = ['mouseout', () => {
         DO['tooltip'](null)
         node.removeEventListener(...args);
        }];
        node.on(...args);
       })
      },
      identifiers, attributes
     },
     returnable = [];
    [...this.attributes].filter(_ => !KEYWORDS.includes(_.name)).forEach(({ name, value }) => {
     let finalValue = value;
     scopeGlobals[name.replace('-', '_')] = finalValue
    });
    let returned = false;
    new Function(`var[{${Object.keys(scopeGlobals)}}]=arguments;${hasCustom ? '\nconst\n' + identifiers.map((ident, index) => ` $${ident} = value => {\n  if (value===${ident}) return;\n  ${ident} = value;\n  this.set('${attributes[index]}', value);\n  change('${this.customizations[attributes[index]]}',value);\n }`).join(',\n ') + `,\n $_set={\n  ${identifiers.map((ident, index) => `\"${attributes[index]}\":$${ident}`).join(',\n  ')}\n };` : ''}\nconst host = this.hostNode;\n${argument}`).call(this, scopeGlobals);
    returned = true;
    return returnable;
   }
   expression({ append, argument, index, create }) {
    let returnable = [];
    const e = argument[0];
    argument.parseExpression(
     {
      title: _ => { if (!IN_FRAME) document.title += _ },
      template: _ => returnable.push(...append('javascript', "say(`" + _ + "`)", this)),
      hostcss: _ => returnable.push(...append('css', `:host{${_}}`, this)),
      comment: _ => console.warn(_),
      custom: _ => {
       // TODO: No more cache. Work using changes in the model.
       if (!this.customizations) this.customizations = {};
       _.parseINI(([attr, value]) => {
        const key = this.customizations[attr] = version + '|' + index + '|' + attr;
        let finalValue = value;
        if (key in localStorage) finalValue = localStorage[key]
        else if (this.has(attr)) finalValue = this.get(attr);
        this.set(attr, finalValue);
       })
      },
      word: () => returnable.push(...append('node', create(argument, document, DICTIONARY), this)),
      fallback: _ => returnable.push(...append({ "'": 'css', '+': 'html', '~': 'javascript', '(': 'buffername' }[e], _, this))
     }
    );
    return returnable;
   }
   expressions({ append, argument }) {
    const returnable = [];
    if (!Array.isArray(argument)) throw { msg: "wrong argument format. Need array. ", argument }
    argument.forEach(expression => returnable.push(...append('expression', expression, this)))
    return returnable;
   }
   static get word() {
    return WORD
   }
   static get model() {
    return archive[this.hasModel ? this.word : 'proto-model']
   }
   static get hasModel() {
    return this.word in archive
   }
  },
  OFFSCREEN_NODE = document.createElement('div'),
  [_, DATA_WORD] = location.href.endsWith('?') && location.pathname.split('.') || ['/0'],
  HOST_WORD = DATA_WORD ? DATA_WORD : location.hostname.replace('.', '-'),
  GLOBAL_SHEET = new CSSStyleSheet(),
  IN_FRAME = (() => {
   try {
    return window.self !== window.top;
   } catch (e) {
    return true;
   }
  })(),
  INPUT = new class {
   #uw; #uh
   constructor() {
    let waiter = 0, touches = 0, width = 256, height = 256, unit = 13;
    Object.defineProperties(this, {
     waiter: { get: () => waiter, set: value => waiter = value },
     touches: { get: () => touches, set: value => touches = value },
     width: { get: () => width, set: value => width = value },
     height: { get: () => height, set: value => height = value },
     unit: { get: () => unit, set: value => unit = value }
    })
   }
   update(changes) {
    Object.entries(changes).forEach(([key, value]) => { this[key] = value });
    const
     WIDTH = this.gridWidth,
     HEIGHT = this.gridHeight,
     device = {
      tl: 'var(--huh)',
      tr: 'var(--huh)',
      br: 'var(--huh)',
      bl: 'var(--huh)',
      name: 'default device',
     };
    ({ x: this.#uw, y: this.#uh } = this.unitize({ x: this.width, y: this.height }));
    GLOBAL_SHEET.replaceSync(globalcss + ":host, :root {" +
     `--w:${WIDTH};
      --h:${HEIGHT};
      --vw:${this.width}px;
      --vh:${this.height}px;
      --uw:${this.#uw}px;
      --uh:${this.#uh}px;
      --hh:${Math.floor(HEIGHT / 2)};
      --hw:${Math.floor(WIDTH / 2)};
      --c-tl:${device.tl};
      --c-tr:${device.tr};
      --c-br:${device.br};
      --c-bl:${device.bl};
      --device:'${device.name}';

      counter-reset:
       width ${WIDTH}
       height ${HEIGHT}
       touches ${this.touches}
       width-px ${this.width}
       height-px ${this.height};
     }`
    )
    RECENTER();
   }
   unitize({ x, y }) {
    return {
     x: this.unit + (x - this.gridWidth * this.unit) / this.gridWidth,
     y: this.unit + (y - this.gridHeight * this.unit) / this.gridHeight
    }
   }
   get unitRatio() {
    return this.width / this.height;
   }
   get gridWidth() {
    return Math.floor(this.width / this.unit)
   }
   get gridHeight() {
    return Math.floor(this.height / this.unit)
   }
   get unitWidth() {
    return this.#uw
   }
   get unitHeight() {
    return this.#uh
   }
  },
  STATICS = {},
  LISTENERS = {},
  EVENTS = new Proxy(LISTENERS, {
   get(map, name) {
    return (str, sender, depth, index) => {
     let past;
     if (!(' - ' in map)) map[' - '] = past = {};
     else past = map[' - '];
     if (!(name in past)) past[name] = []
     past[name].push({ str, sender, depth, index });
     if (!(name in map)) return;
     map[name].forEach(fn => fn(str, sender, depth, index));
    }
   },
   set(map, name, fn) {
    if (typeof fn !== 'function') throw ["event callback is not function", { name, fn }]
    if (!(name in map)) map[name] = []
    map[name].push(fn);
    const past = map[' - '];
    if (!past || !(name in past)) return;
    [...past[name]].map(({ str, sender, depth, index }) => fn(str, sender, depth, index));
   }
  }),
  ON = new Proxy({}, {
   get(_, name) {
    return fn => {
     EVENTS[name] = fn
    }
   },
   set(_, name, fn) {
    EVENTS[name] = fn
   }
  }),
  RECENTER = () => {
   if (INPUT.touches) {
    clearTimeout(INPUT.waiter)
    INPUT.waiter = setTimeout(RECENTER(), 100)
    return
   }
   window.scrollTo(INPUT.width / 2, INPUT.height / 2)
  },
  RENDER = ({ append, globals, create }) => {
   [
    ['resize', () => {
     const change = { width: window.innerWidth, height: window.innerHeight };
     INPUT.update(change);
    }],
    ['scroll', event => {
     event.preventDefault();
     RECENTER();
    }],
   ].forEach(([type, listener]) => {
    addEventListener(type, listener);
    if (type === 'resize') setTimeout(() => {
     listener();
     RECENTER();
    }, 100);
   });
   document.adoptedStyleSheets = [GLOBAL_SHEET]
   Object.defineProperties(globalThis, globals)
   append('node', create(HOST_WORD, document, dictionary))
   append('node', create('tooltip-', document, dictionary))
   append('node', create('part-tool', document, dictionary))
  };
 {
  [
   [Node, {
    on: {
     get() {
      return (...args) => {
       console.assert(typeof args[0] === 'string')
       if (args[0].includes(' ')) {
        const args0 = args.shift();
        args0.split(' ').forEach(arg0 => this.addEventListener(arg0, ...args))
       }
       else this.addEventListener(...args)
      }
     }
    },
    off: {
     get() {
      return (...args) => {
       this.removeEventListener(...args)
      }
     }
    },
    has: {
     get() {
      return attr => {
       return this.hasAttribute(attr)
      }
     }
    },
    get: {
     get() {
      return attr => {
       if (Array.isArray(attr)) return attr.map(a => this.getAttribute(a))
       return this.getAttribute(attr)
      }
     }
    },
    set: {
     get() {
      return (attr, value = '') => {
       if (typeof attr === 'object')
        return Object.entries(attr).map(([attr, value]) => this.set(attr, value))
       if (value === null || value === undefined) {
        if (this.has(attr)) {
         this.removeAttribute(attr)
         return true
        }
        return false
       }
       if (this.get(attr) === value.toString()) return false
       this.setAttribute(attr, value)
       return true
      }
     }
    },
    word: {
     get() {
      return this.tagName?.toLowerCase();
     }
    },
    flip: {
     get() {
      return attr => {
       if (!this.has(attr)) { this.set(attr, ''); return true }
       this.unset(attr);
       return false;
      }
     }
    },
    Q: {
     get() {
      return (query, group = false, parts = false, nothing = group ? [] : undefined) => {
       const root = this.isPart ? this.shadowRoot : this;
       let result = root[`querySelector${group ? 'All' : ''}`](query);
       if (!group) return result ? result : nothing
       if (!parts) return result.length ? [...result] : nothing;
       result = [...result].filter(node => node.isPart);
       return result.length ? result : nothing
      }
     }
    },
    K: {
     get() {
      return (query, group = true, parts = false, nothing = 0) => {
       const root = this.isPart ? this.shadowRoot : this;
       let result = root[`querySelector${group ? 'All' : ''}`](query);
       if (!group) {
        if (parts) return result?.isPart ? 1 : nothing
        return result ? 1 : nothing
       }
       if (!parts) return result.length ? result.length : nothing;
       result = [...result].filter(node => node.isPart);
       return result.length ? result.length : nothing;
      }
     }
    },
    P: {
     get() {
      return ({ x, y }, group = false, parts = false, nothing = group ? [] : undefined) => {
       const root = this.isPart ? this.shadowRoot : this;
       let result = root[`element${group ? 's' : ''}FromPoint`](x, y);
       if (!group) {
        if (parts) return (result?.isPart && result !== this) ? result : nothing
        return (result && (result !== this)) ? result : nothing
       }
       if (!parts) return result.length ? [...result] : nothing;
       result = [...result].filter(node => node.isPart);
       return result.length ? result : nothing
      }
     }
    },
    unset: {
     get() {
      return attr => { if (this.has(attr)) this.set(attr, null) }
     }
    },
    drive: {
     get() {
      return attr => {
       const host = this.hostNode;
       if (this.has(attr)) {
        const value = this.get(attr);
        if (!host.has(attr) || host.get(attr) !== value) {
         host.set(attr, value);
        }
       } else {
        if (host.has(attr)) host.unset(attr)
       }
      }
     }
    },
    getHost: {
     get() {
      return (attr, value) => {
       if (value === undefined) return this.hostNode.has(attr) && this.hostNode.get(attr) !== '0';
       return value === this.hostNode.get(attr)
      }
     }
    },
    frameUp: {
     get() {
      return () => {
       setTimeout(() => this.scrollIntoView({ behavior: 'smooth', block: 'center' }), 125);
      }
     }
    },
    isPart: {
     get() {
      return this.tagName?.includes('-')
     }
    },
    hostNode: {
     get() {
      return this === document.body ? this : this.host ?? this.parentNode?.hostNode ?? console.warn('no host on this', this)
     }
    },
    driveBool: {
     get() {
      return (localAttr, hostAttr, value, save) => {
       this.enableSelf(localAttr, this.getHost(hostAttr, value));
       this.on('click', () => {
        const newValue = this.flip(localAttr);
        //this.enableHost(hostAttr, newValue)
        save?.(newValue)
       })
      }
     }
    },
    enableHost: {
     get() {
      return (attr, enable) => this.hostNode.enableSelf(attr, enable);
     }
    },
    enableSelf: {
     get() {
      return (attr, enable) => {
       if (enable) {
        if (!this.has(attr)) {
         this.set(attr, '');
        }
       } else {
        if (this.has(attr)) {
         this.unset(attr);
        }
       }
      }
     }
    },
    cursorField: {
     get() {
      return ondelta => {
       const
        LOCKED = 'cursor-field',
        WAITING = 'cursor-field-waiting',
        onclick = () => {
         if (this.has(WAITING)) return;
         document.on(...lock);
         this.requestPointerLock({ unadjustedMovement: true });
        },
        onmove = event => {
         if (document.pointerLockElement !== this) onlock();
         ondelta(event);
        },
        onlock = () => {
         if (document.pointerLockElement !== this) {
          document.off(lock);
          this.on(...click);
          this.unset(LOCKED);
          this.off(move);
          this.set(WAITING);
          setTimeout(() => this.unset(WAITING), 1500);
          return;
         }
         document.on(...lock);
         this.off(click);
         this.set(LOCKED);
         this.on(...move);
        },
        click = ["click", onclick, true],
        move = ['mousemove', onmove, false],
        lock = ["pointerlockchange", onlock, true];
       this.on(...click);
      }
     }
    },
   }],
   [String, {
    wrap: {
     get() {
      return e => {
       const
        pairs = { '{': '}', "(": ")", "[": "]", "<": ">" },
        endT = e in pairs ? pairs[e] : e,
        naked = this.replace(new RegExp('\\' + endT, 'g'), '\\' + endT);
       return e + naked + endT;
      }
     }
    },
    inset: {
     get() {
      return (left, right = left) => this.slice(left, this.length - right)
     }
    },
    unwrap: {
     get() {
      return () => {
       const
        endT = this.at(-1),
        escaped = this.slice(1, this.length - 1);
       return escaped.replace(new RegExp('\\\\\\' + endT, 'g'), endT);
      }
     }
    },
    toNodes: {
     get() {
      return () => {
       OFFSCREEN_NODE.innerHTML = this
       const nodes = [...OFFSCREEN_NODE.childNodes]
       OFFSCREEN_NODE.innerHTML = ''
       return nodes
      }
     }
    },
    websafe: {
     get() {
      return () => {
       OFFSCREEN_NODE.textContent = this;
       let result = OFFSCREEN_NODE.innerHTML;
       OFFSCREEN_NODE.innerHTML = ''
       result = result.replace(/"/g, '&quot;')
       result = result.replace(/'/g, '&apos;')
       return result;
      }
     }
    },
    parseINI: {
     get() {
      return (fn = (k, v) => { }) => [...this.matchAll(/([a-z][a-z-0-9]*)(?:\s*=\s*(?:([^\s'"`\]]+)|"([^"]+)"|'([^']+)'|`([^`]+)`))?/g)].map(match => match.slice(1).filter(x => x !== undefined)).map(fn)
     }
    },
    isLetter: {
     get() {
      return () => this.length === 1 && this.toLowerCase() !== this.toUpperCase()
     }
    },
    parseExpression: {
     get() {
      return handler => {
       const
        e = this[0],
        letter = e.isLetter(),
        key = letter ? 'word' : {
         '^': 'title',
         '`': 'template',
         '{': 'hostcss',
         '<': 'comment',
         '=': 'infix',
         '[': 'custom',
         "'": 'css',
         '~': 'javascript',
         '+': 'html',
         '(': 'buffername'
        }[e],
        handle = handler[key] ?? handler.fallback ?? (_ => console.warn({ unhandled: _ }));
       handle(letter ? this : this.unwrap(), key)
      }
     }
    }
   }],
   [Array, {
    removeValue: {
     get() {
      return value => {
       for (let index = 0; index < this.length; index++) {
        if (this[index] === value) {
         this.splice(index, 1)
         return true;
        }
       }
       return false;
      }
     }
    }
   }],
  ].forEach(([T, map]) => Object.defineProperties(T.prototype, map));
 }
 Object.defineProperties(globalThis, {
  DO: { get: () => EVENTS },
  ON: { get: () => ON },
  uw: { get: () => INPUT.unitWidth },
  uh: { get: () => INPUT.unitHeight },
  width: { get: () => INPUT.gridWidth },
  height: { get: () => INPUT.gridHeight },
  refresh: { get: () => () => location.reload() },
  unitRatio: { get: () => INPUT.unitRatio },
  dictionary: { get: () => DICTIONARY }
 })
 class Telecursor {
  #events = { up: undefined, down: undefined, move: undefined }
  #links = []
  constructor() {
   const onnative = (name, event) => {
    const pos = {
     x: event.screenX,
     y: event.screenY
    }, offset = {
     x: event.screenX - event.clientX,
     y: event.screenY - event.clientY
    }, factor = {
     x: INPUT.unitWidth,
     y: INPUT.unitHeight
    };
    this.invoke({ pos, offset, factor, name, depth: -1 })
   };
   window.addEventListener('mousedown', event => { onnative('down', event) })
   window.addEventListener('mousemove', event => { onnative('move', event) })
   window.addEventListener('mouseup', event => { onnative('up', event) })
  }
  get parent() {
   return IN_FRAME ? window.parent.telecursor : undefined
  }
  invoke(payload, x = 0, y = 0) {
   payload = {
    ...payload,
    depth: payload.depth + 1
   };
   this.parent?.invoke(payload, x + window.frameElement?.offsetLeft, y + window.frameElement?.offsetTop);
   this.#events[payload.name]?.(payload);
   payload = {
    ...payload,
    pos: {
     x: payload.pos.x + x,
     y: payload.pos.y + y
    },
    node: window.frameElement
   }
   this.#links.forEach(fn => fn(payload));
  }
  trackDrag(ondown, ondrag, onup) {
   const e = this.#events;
   let offset = { x: 0, y: 0 }, factor = { x: 1, y: 1 };
   const getPos = ({ x, y }) => ({
    x: Math.floor((x - offset.x) / factor.x),
    y: Math.floor((y - offset.y) / factor.y)
   });
   e.down = ({ pos, offset: offsetIn, factor: factorIn }) => {
    offset = offsetIn;
    factor = factorIn;
    ondown(getPos(pos));
    e.down = undefined;
   }
   e.move = ({ pos }) => {
    ondrag(getPos(pos));
   }
   e.up = ({ pos }) => {
    onup(getPos(pos));
    e.move = e.up = undefined;
   }
  }
  link(onmove) {
   let offset = { x: 0, y: 0 };
   const getPos = ({ x, y }) => ({
    x: Math.floor((x - offset.x)),
    y: Math.floor((y - offset.y))
   });
   this.#links.push(({ pos, offset: offsetIn, depth }) => {
    offset = offsetIn;
    onmove({ ...getPos(pos), depth: depth, offset });
   });
  }
 }
 window.telecursor = new Telecursor;
 if (DATA_WORD) document.documentElement.set('data-word', DATA_WORD);
 setTimeout(() => {
  if (!document.parentContext) {
   Promise.all([
    new Promise(giveServiceWorker => {
     navigator.serviceWorker.register('.js').then(reg => {
      giveServiceWorker([reg, reg.active])
     });
    }),
    new Promise(giveFileBuffers => {
     const load = async buffername => {
      const file = await fetch(buffername), mime = file.headers.get('content-type');
      let pending;
      if (mime.startsWith('text/')) pending = file.text();
      else if (mime.startsWith('image/')) pending = file.arrayBuffer();
      else if (mime === 'font/woff2') {
       pending = file.arrayBuffer();
       const font = new FontFace('kireji sans', await pending);
       font.weight = buffername.split('.')[0].split('-')[1];
       await font.load();
       document.fonts.add(font);
      }
      else if (mime === 'application/json') pending = file.json();
      else if (mime === 'application/x-empty') {
       console.warn('Empty File!', { buffername });
       pending = null;
      }
      else throw ["unhandled mime", { mime, buffername }]
      return [buffername, await pending];
     };
     load('directory.json').then(([{ }, directory]) => {
      Promise.all([...directory.map(load)]).then(entries => {
       giveFileBuffers(Object.fromEntries(entries));
      })
     });
    })
   ]).then($ => {
    const [
     [SW_REGISTRATION, SERVICE_WORKER],
     BUFFERS
    ] = $,
     ii2I = new Map(),
     CLIENT = BUFFERS['client.json'],
     ARCHIVE = BUFFERS['model.json'],
     PREVIEW = BUFFERS['preview/model.json'],
     CONTEXT_INDEX = [],
     POST = msg => {
      SERVICE_WORKER.postMessage(msg);
     },
     CREATE_CONTEXT = (parentContext, routine, argument) => {
      const
       date = Date.now(),
       // TODO: this array length is not a good address for caching nodes. It changes often.
       index = CONTEXT_INDEX.length,
       DEPTH = parentContext?.stack[routine]?.filter(oldArgument => oldArgument === argument).length ?? 0,
       PRECISION = 3,
       stack = { node: [] },
       newContext = {
        stack, argument, date, index,
        create: (word, document, dictionary) => {
         if (newContext.inside(word) >= PRECISION - 1)
          return document.createElement('stack-recurring')
         const Word = word.includes('-') ? dictionary[word] : undefined
         // TODO: model here?
         return document.createElement(word);
        },
        append: (routine, argument, node) => {
         const child = CREATE_CONTEXT(newContext, routine, argument);
         //try {
         return (node ? node : argument)[routine](child);
         //} catch (e) {
         //throw { e, routine, argument, node, resolvedNode: node ? node : argument }
         //}
        },
        inside: word => stack.node.filter(node => node.word === word).length - (word === stack.node.at(-1)?.word ? 1 : 0),
        pickOne: model => {
         const word = stack.node.filter(node => node.word in model).at(-1)?.word ?? 'desktop-';
         if (word !== 'desktop-') {
          const setModel = archive[word];
          if (!setModel) console.warn('element is in unknown set', word)
         }
         return [word, model[word]];
        },
        fork: (routine, argument) => CREATE_CONTEXT(newContext, routine, argument),
        globals: GLOBALS
       };
      for (const subroutine in { ...(parentContext?.stack ?? {}), [routine]: routine }) {
       const D_DEPTH = subroutine === routine ? DEPTH : parentContext?.[subroutine] ?? 0;
       newContext[subroutine] = D_DEPTH
       stack[subroutine] = [...parentContext?.stack[subroutine] ?? []]
       if (subroutine === routine) stack[subroutine].push(argument);
      }
      CONTEXT_INDEX.push(newContext);
      return newContext
     },
     GLOBALS = {
      ip: { get: () => CLIENT.ip },
      save: { get: () => () => POST('save') },
      fonts: { get: () => document.fonts },
      client: { get: () => CLIENT },
      origin: { get: () => ORIGIN_CONTEXT },
      version: { get: () => CLIENT.version },
      archive: { get: () => ARCHIVE },
      globals: { get: () => GLOBALS },
      buffers: { get: () => BUFFERS },
      refetch: { get: () => () => POST('refetch') },
      moments: { get: () => CONTEXT_INDEX },
      statics: { get: () => STATICS },
      uncache: { get: () => () => { localStorage.clear(); location.reload(); } },
      globalcss: { get: () => BUFFERS['global.css'] },
      backlinks: { get: () => ii2I },
     },
     ORIGIN_CONTEXT = CREATE_CONTEXT(null, 'word', "desktop-");
    Object.entries(ARCHIVE).forEach(([localTagname, model]) => {
     Object.keys(model).forEach(remoteTagname => {
      if (!ii2I.has(remoteTagname)) ii2I.set(remoteTagname, new Set());
      ii2I.get(remoteTagname).add(localTagname);
     })
    });
    console.groupCollapsed('History (' + localStorage.length + ')');
    for (let [key, value] of Object.entries(localStorage)) {
     let [version, index, name] = key.split('|');
     version = parseFloat(version);
     index = parseInt(index);
     console.info({ version, index, name, value });
    }
    console.groupEnd();
    navigator.serviceWorker.onmessage = ({ data }) => {
     if (data === 'reload') location.reload();
    }
    RENDER(ORIGIN_CONTEXT)
   });
  } else {
   document.provideEvents(EVENTS)
   RENDER(document.parentContext)
   fonts.forEach(font => document.fonts.add(font))
  }
 }, 10);
})

/*

TODO: render-order-based indexing means that caches for object called 'bob' at some large index i, aren't valid anymore if even one more object is rendered before i. Render-order-based indexing has too many unresolved edge cases. 
*/