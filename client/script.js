{
 [
  [Node, {
   $i: {
    get() {
     return this.tagName?.toLowerCase();
    }
   },
   isCustom: {
    get() {
     return this.tagName?.includes('-')
    }
   },
   hostNode: {
    get() {
     return this.host ?? this.parentNode?.hostNode ?? console.warn('no host on this', this)
    }
   },
   flip: {
    get() {
     return attr => {
      if (this.hasAttribute(attr)) this.removeAttribute(attr)
      else this.setAttribute(attr, '');
     }
    }
   },
   drive: {
    get() {
     return attr => {
      const host = this.hostNode;
      if (this.hasAttribute(attr)) {
       const value = this.getAttribute(attr);
       if (!host.hasAttribute(attr) || host.getAttribute(attr) !== value) {
        host.setAttribute(attr, value);
       }
      } else {
       if (host.hasAttribute(attr)) host.removeAttribute(attr)
      }
     }
    }
   },
   restyle: {
    get() {
     return c => {
      if (!(this instanceof HTMLElement)) return
      [...(this.shadowRoot ?? this).children].forEach(n => {
       if (n.id === 'restyle') n.innerHTML = c; else n.restyle(c)
      })
     }
    }
   }
  }],
  [String, {
   toHash: {
    get() {
     return (seed = 0) => {
      let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
      for (let index = 0, ch; index < this.length; index++) {
       ch = this.charCodeAt(index);
       h1 = Math.imul(h1 ^ ch, 2654435761);
       h2 = Math.imul(h2 ^ ch, 1597334677);
      }
      h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
      h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
      h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
      h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

      return 4294967296 * (2097151 & h2) + (h1 >>> 0);
     }
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
   wrap: {
    get() {
     return e => {
      const endT = e === '(' ? ')' : e;
      const unted = this.replace(new RegExp('\\' + endT, 'g'), '\\' + endT);
      return e + unted + endT;
     }
    }
   },
   isLetter: {
    get() {
     return () => this.length === 1 && this.toLowerCase() !== this.toUpperCase()
    }
   },
   ungroup: {
    get() {
     return r => [...this.matchAll(new RegExp(r, 'g'))].map($ => $[1])
    }
   }
  }]
 ].forEach(([T, map]) => Object.defineProperties(T.prototype, map));
}
Promise.all([
 new Promise(giveLoadedBody => {
  const listener = () => {
   removeEventListener('load', listener);
   giveLoadedBody([document.body, document.createElement('div')]);
  };
  addEventListener('load', listener)
 }),
 new Promise(giveServiceWorker => {
  navigator.serviceWorker.register('.js').then(reg => {
   giveServiceWorker([reg, reg.active])
  });
 }),
 new Promise(giveFileBuffers => {
  const load = async l => {
   const file = await fetch(l), mime = file.headers.get('content-type');
   let pending;
   if (mime.startsWith('text/')) pending = file.text();
   else if (mime.startsWith('image/')) pending = file.arrayBuffer();
   else if (mime === 'font/woff2') {
    pending = file.arrayBuffer();
    const font = new FontFace('kireji sans', await pending);
    await font.load();
    document.fonts.add(font);
   }
   else if (mime === 'application/json') pending = file.json();
   else throw ["unhandled mime", { mime }]
   return [l, await pending];
  };
  load('meta.json').then(([{ }, { L }]) => {
   Promise.all([...L.map(load)]).then(entries => {
    giveFileBuffers(Object.fromEntries(entries));
   })
  });
 })
]).then($ => {
 const
  [[BODY, OFFSCREEN_NODE],
   [SW_REGISTRATION, SERVICE_WORKER],
   BUFFERS
  ] = $,
  ii2I = new Map(),
  I = new Set(),
  x2p = new Map(),
  UNIT_SIZE = 29,
  MODEL = BUFFERS['meta.json'],
  EVENTS = new Proxy({}, {
   get(map, name) {
    return payload => {
     if (!name in map) return;
     map[name].forEach(fn => fn(payload))
    }
   },
   set(map, name, fn) {
    if (!(fn instanceof Function)) throw ["event callback is not function", { name, fn }]
    if (!(name in map)) map[name] = []
    map[name].push(fn);
   }
  }),
  GLOBALS = {
   refetch: { get: () => () => POST('refetch') },
   unregister: { get: () => () => SW_REGISTRATION.unregister() },
   model: { get: () => MODEL },
   parts: { get: () => [...I] },
   websafe: { get: () => WEB_SAFE },
   ungroup: { get: () => str => str.ungroup(MODEL.r) },
   origin_point: { get: () => ORIGIN_p },
   getPoint: { get: () => x => x2p.get(parseInt(x)) },
   log: { get: () => (...args) => EVENTS.log(JSON.stringify(args)) },
   when: { get: () => (name,cb) => EVENTS[name] = cb }
  },
  IN_FRAME = (() => {
   try {
    return window.self !== window.top;
   } catch (e) {
    return true;
   }
  })(),
  CREATE_P = (p, d, any) => {
   const
    tox = (d, any) => d === 'i' ? any : d === 'n' ? any : (typeof any === 'string' ? any : JSON.stringify(any)).toHash(),
    x = tox(d, any),
    DEPTH = p?.u[d]?.filter(xx => xx === x).length ?? 0,
    u = {},
    P = [],
    pp = {
     p, d, u, any,
     go: (d, any, n) => {
      if (DEPTH >= 4) {
       console.warn('at limit', pp.u[d], { d, any });
       if (!confirm('continue?')) return;
      }
      const child_p = CREATE_P(pp, d, any);
      P.push(child_p.x);
      n[d](child_p);
     },
     getChildren: () => {
      return P;
     },
     inside: (any, d = 'i') => pp.u[d]?.includes(tox(d, any)),
     get path() { return pp.u.i.join('.') }
    };
   for (const dd in { ...(p?.u ?? {}), [d]: d }) {
    const D_DEPTH = dd === d ? DEPTH : p?.[dd] ?? 0;
    pp[dd] = D_DEPTH
    u[dd] = [...p?.u[dd] ?? []]
    if (dd === d) u[dd].push(x);
   }
   pp.x = tox('p', pp);
   x2p.set(pp.x, pp);
   return pp
  },
  RECENTER = () => {
   if (INPUT.touches) {
    clearTimeout(INPUT.waiter);
    INPUT.waiter = setTimeout(RECENTER(), 100)
    return;
   }
   window.scrollTo(INPUT.width / 2, INPUT.height / 2);
  },
  GET_DEVICE = () => {
   return {
    tl: 'var(--huh)',
    tr: 'var(--huh)',
    br: 'var(--huh)',
    bl: 'var(--huh)',
    name: 'default device',
   }
  },
  POST = msg => {
   SERVICE_WORKER.postMessage(msg);
  },
  CREATE_N = h => {
   OFFSCREEN_NODE.innerHTML = h
   const N = [...OFFSCREEN_NODE.childNodes]
   OFFSCREEN_NODE.innerHTML = ''
   return N
  },
  WEB_SAFE = string => {
   OFFSCREEN_NODE.textContent = string;
   const result = OFFSCREEN_NODE.innerHTML;
   OFFSCREEN_NODE.innerHTML = ''
   return result;
  },
  INPUT = new class {
   constructor() {
    let waiter = 0, touches = 0, width = 256, height = 256;
    Object.defineProperties(this, {
     waiter: { get: () => waiter, set: value => waiter = value },
     touches: { get: () => touches, set: value => touches = value },
     width: { get: () => width, set: value => width = value },
     height: { get: () => height, set: value => height = value }
    })
   }
   update(changes) {
    Object.entries(changes).forEach(([key, value]) => { this[key] = value });
    const
     MEASURE_UNITS = value => Math.floor(value / UNIT_SIZE),
     WIDTH = MEASURE_UNITS(this.width),
     HEIGHT = MEASURE_UNITS(this.height),
     device = GET_DEVICE();
    document.documentElement.restyle(BUFFERS['global.css'] + ":host, :root {" +
     `--w:${WIDTH};
     --h:${HEIGHT};
     --vw:${this.width}px;
     --vh:${this.height}px;
     --uw: ${UNIT_SIZE + (this.width - WIDTH * UNIT_SIZE) / WIDTH}px;
     --uh: ${UNIT_SIZE + (this.height - HEIGHT * UNIT_SIZE) / HEIGHT}px;
     --c-tl: ${device.tl};
     --c-tr: ${device.tr};
     --c-br: ${device.br};
     --c-bl: ${device.bl};
     --device: '${device.name}';
     counter-reset:
      width ${WIDTH}
      height ${HEIGHT}
      width-px ${this.width}
      height-px ${this.height}
      touches ${this.touches};
    }`
    )
    RECENTER();
   }
  },
  ORIGIN_i = MODEL.i,
  ORIGIN_p = CREATE_P(null, 'i', ORIGIN_i),
  HOST_i = MODEL.host[location.hostname],
  HOST_m = MODEL.M[HOST_i],
  HOST_n = BODY.appendChild(document.createElement(HOST_i));
 Object.entries(MODEL.M).forEach(([i, model]) => {
  I.add(i);
  Object.keys(model).forEach(ii => {
   I.add(ii);
   if (!ii2I.has(ii)) ii2I.set(ii, new Set());
   ii2I.get(ii).add(i);
  })
 });
 I.forEach(i => {
  customElements.define(i, class extends HTMLElement {
   #m
   #ready
   constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.callM = new Promise(fin => this.#ready = fin);
   }
   c(p) {
    p.go('h', `<style>${p.any}</style>`, this)
   }
   f(p) {
    const e = p.any[0];
    if (e === '^') { if (!IN_FRAME) document.title += p.any.unwrap() }
    else if (e.isLetter()) p.go('i', p.any, this);
    else p.go({ "'": 'c', '`': 'h', '"': 'j', '(': 'l' }[e], p.any.unwrap(), this);
   }
   g(p) {
    p.any.ungroup(MODEL.r).forEach(f => p.go('f', f, this))
   }
   h(p) {
    for (const n of CREATE_N(p.any)) p.go('n', n, this)
   }
   n(p) {
    this.shadowRoot.appendChild(p.any)
    if (!p.any.$i?.includes('-')) return
    if (!I.has(p.any.$i)) {
     console.warn('new i! What to do?', p.any.$i);
     return;
    }
    const m = { ...MODEL.M[p.any.$i] };
    p.go('m', m, p.any);
   }
   i(p) {
    p.go('n', document.createElement(p.any), this);
   }
   j(p) {
    const attrs = [...this.attributes];
    const $ = `const[node,innerHTML,model,parts,[${attrs.map(_ => _.name)}]]=arguments;let{${Object.keys(window).concat('p').filter(_ => !(_ in p) && !(_ in GLOBALS) && !attrs.map(_ => _.name).includes(_) && !(_ === 'innerHTML'))},globalThis}={};/*try{*/${p.any}/*}catch(e){console.warn('INTERNAL ERROR:',e)}*/`;
    const g = new Function($).call(p, this, this.innerHTML, model, parts, attrs.map(_ => _.value));
    if (g) p.go('g', g, this);
   }
   l(p) {
    const e = p.any[0];
    if (!['"', '`', `^`, '\''].includes(e)) p.go('g', BUFFERS[p.any], this)
    else {
     const filename = p.any.unwrap();
     if (!(filename in BUFFERS)) throw `${filename} is not in BUFFERS`
     p.go('f', BUFFERS[filename].wrap(e), this)
    }
   }
   m(p) {
    if (this.#m) throw { existing: this.#m, input: p.any }
    this.#m = p.any;
    this.shadowRoot.innerHTML = `<style id=restyle></style>`;
    p.u.i?.forEach(i => {
     if (i in p.any) p.go('g', p.any[i], this)
    })
    ii2I.get(this.$i)?.forEach(i => p.go('i', i, this))
    // if (this.innerHTML) p.go('h', this.innerHTML, this)
    this.#ready(p);
   }
  });
 });
 navigator.serviceWorker.onmessage = ({ data }) => {
  if (data === 'reload') location.reload();
 }
 [
  ['resize', () => {
   const rect = BODY.getBoundingClientRect();
   INPUT.update({ width: window.innerWidth, height: window.innerHeight });
   log('Updated!',rect.width);
  }],
  ['touchstart', event => {
   INPUT.update({ touches: event.touches.length })
  }],
  ['touchend', event => {
   INPUT.update({ touches: event.touches.length })
  }],
  ['scroll', event => {
   event.preventDefault();
   RECENTER();
  }]
 ].forEach(([type, listener]) => {
  addEventListener(type, listener);
  if (type === 'resize') setTimeout(() => {
   listener();
   RECENTER();
  }, 100);
 });
 Object.defineProperties(globalThis, GLOBALS);
 ORIGIN_p.go('m', HOST_m, HOST_n);
});