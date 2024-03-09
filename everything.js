var causality = {}, onfetch = (Ω = new Proxy({}, new Proxy(
 {
  "https://core.parts/?layout": "https://core.parts/layout.css",
  "https://core.parts/?manifest": "https://core.parts/os-95/manifest.uri",
  "https://core.parts/?onpointermove": "https://core.parts/onpointermove.js",
  "https://core.parts/?onpointerup": "https://core.parts/onpointerup.js",
  "https://core.parts/apple-touch-icon.png": "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",
  "https://core.parts/client-to-server.js": "({ data }) => {\n  if (data === 'restart') registration.unregister()\n  else { Object.assign(Δ, data) }  }",
  "https://core.parts/core-part~": "''+index",
  "https://core.parts/core-part?index": "https://core.parts/core-part/index.html",
  "https://core.parts/core-part?layout": "https://core.parts/core-part/layout.css",
  "https://core.parts/core-part?manifest": "https://core.parts/core-part/manifest.uri",
  "https://core.parts/core-part/index.html": "<!DOCTYPE html><script src=\"https://core.parts/everything.js\"></script><script>Ω[\"https://core.parts/element.js\"]()</script><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" /><style>html, body { overscroll-behavior-y: contain !important; overflow: hidden; text-overflow: ellipsis; white-space: nowrap }</style>",
  "https://core.parts/core-part/layout.css": "",
  "https://core.parts/core-part/manifest.uri": "",
  "https://core.parts/proxy/alpha.js": "({ get: " + ((_, υ) => {
   const Ψ = υ.match(/^(?<protocol>https:\/\/)(?<host>[^\/]+?)(?:\/(?<path>(?:[^\s.~?\/]+?\/)*)(?:(?<part>[a-z][a-z0-9]*-[a-z0-9-]*)|(?<filename>[^\s~?\/]*)\.(?<extension>(?<binary>png|ico|woff2|wasm)|[^\s.~?\/]+))|\/(?<index>(?:[^\s.~?\/]+?\/)*))(?:~{0,6}\?(?<kireji>[a-zA-Z][a-zA-Z0-9_]*)(?:=(?<value>-?[\d]*\.?[\d]*)(?<rest_kireji>&(?:[a-zA-Z][a-zA-Z0-9_]*=-?[\d]*\.?[\d]*)+)?$)?)?(?<rank>~{0,7})$/)?.groups;
   if (!Ψ) throw new TypeError('bad request: ' + υ)
   if (Ψ.value) Ψ.target = υ.slice(0, - Ψ.kireji.length - (2 + Ψ.value.length))
   Ψ.type = { 'js': "text/javascript", 'css': "text/css", 'json': 'application/json', 'png': 'image/png', 'woff2': 'font/woff2', 'ico': 'image/vnd.microsoft.icon', 'html': 'text/html', 'wasm': 'application/wasm', 'uri': 'text/uri-list' }[Ψ.value ? 'js' : (Ψ.index !== undefined || Ψ.part !== undefined) ? 'html' : (Ψ.rank.length ? 'js' : (Ψ.kireji === undefined && Ψ.extension || 'txt'))] ?? 'text/plain'
   Object.defineProperties(Ψ, { size: { get() { return Δ[υ]?.length ?? 0 } }, entrySize: { get() { return this.size + υ.length } }, /* TODO: also add size of exported constructors */ })
   let α, β;
   α = new Proxy(Proxy, {
    get: (_, π) => {
     if (π === Symbol.toPrimitive) π = 'toPrimitive';
     const result = eval(`(${Δ[Δ[`${υ}?${π}`] ?? Δ[`${Δ[`${υ}?core`] ?? 'https://core.parts/core-part'}?${π}`]] ?? Δ[`https://core.parts/proxy/beta/${π}.js`]})`)
     return result
    }
   })
   return β = new Proxy(α, α)
  }) + ", set: " + ((_, υ, δ) => {
   if (Δ[υ] === δ) return;
   const
    payload = { [υ]: δ },
    onset = data => {
     for (const url in data) if (url in causality) Object.entries(causality[url]).forEach(([kireji, nodeset]) => { nodeset.forEach(node => node[kireji] = data[url]) })
    };
   Δ[υ] = δ
   if (globalThis.coresetlock) return onset(payload)
   globalThis.coresetlock = true
   const
    fxdom = {},
    fxneg = {},
    fxall = new Set(),
    recursive_getfx = (cause, affected, level) => {
     fxneg[cause] = affected
     for (const url of affected) {
      if (!(url in fxdom)) {
       fxdom[url] = new Set()
       if (cause) fxdom[url].add(level + '|' + cause)
       if (url === 'undefined') continue;
       fxall.add(url)
       recursive_getfx(url, ('' + Ω[url].fx).split(' '), level + 1)
      } else fxdom[url].add(level + '|' + cause)
     }
    }
   recursive_getfx(undefined, [υ], 0)
   const
    seen = new Set(),
    order = [...fxall],
    extract = item => {
     if (!order.includes(item)) return;
     order.splice(order.indexOf(item), 1)
    },
    moveToStart = item => {
     if (!order.includes(item)) return;
     order.unshift(extract(item)[0])
    },
    recursive_getprio = item => {
     if (seen.has(item) || !order.includes(item)) return;
     fxdom[item].forEach(moveToStart)
     fxdom[item].forEach(recursive_getprio)
    }
   extract(υ)
   extract('undefined')
   recursive_getprio(υ)
   // TODO: Allow a script to set others?
   order.forEach(url => {
    const
     existing = Δ[url],
     imagination = Ω[url][Symbol.toPrimitive]('imaginary', υ);
    if (existing !== imagination) {
     payload[url] = Δ[url] = imagination
     // TODO: verify. For all fx of current url whose own url already passed through this callback,
     // imagine the fx's value again. maybe it changed? That would be a consistency issue. 
    }
   })
   onset(payload)
   globalThis.coresetlock = false
  }) + " }[Υ] ?? console.error('unexpected omega request', Υ))",

  "https://core.parts/core-part?apply": "https://core.parts/proxy/beta/apply.js",
  "https://core.parts/core-part?get": "https://core.parts/proxy/beta/get.js",
  "https://core.parts/core-part?getOwnPropertyDescriptor": "https://core.parts/proxy/beta/getOwnPropertyDescriptor.js",
  "https://core.parts/core-part?getPrototypeOf": "https://core.parts/proxy/beta/getPrototypeOf.js",
  "https://core.parts/core-part?has": "https://core.parts/proxy/beta/has.js",
  "https://core.parts/core-part?headerOf": "https://core.parts/proxy/beta/headerOf.js",
  "https://core.parts/core-part?isExtensible": "https://core.parts/proxy/beta/isExtensible.js",
  "https://core.parts/core-part?ownKeys": "https://core.parts/proxy/beta/ownKeys.js",
  "https://core.parts/core-part?query": "https://core.parts/proxy/beta/query.js",
  "https://core.parts/core-part?rootsOf": "https://core.parts/proxy/beta/rootsOf.js",
  "https://core.parts/core-part?set": "https://core.parts/proxy/beta/set.js",
  "https://core.parts/core-part?toPrimitive": "https://core.parts/proxy/beta/toPrimitive.js",
  "https://core.parts/core-part?toString": "https://core.parts/proxy/beta/toString.js",
  "https://core.parts/core-part?valueOf": "https://core.parts/proxy/beta/valueOf.js",

  "https://core.parts/proxy/beta/apply.js": "(_, __, A) => eval(\"\" + α)(...A)",
  "https://core.parts/proxy/beta/get.js": "" + ((_, π) => {
   if (['toPrimitive', Symbol.toPrimitive, 'toString', 'valueOf', 'headerOf', 'rootsOf', 'query'].includes(π)) return α[π]
   const url = Δ[`${υ}?${π}`] ?? Δ[`${Δ[`${υ}?core`] ?? 'https://core.parts/core-part'}?${π}`];
   return url ? Ω[url] : undefined
  }),
  "https://core.parts/proxy/beta/getOwnPropertyDescriptor.js": "(_, π) => ({ configurable: true, enumerable: true, writable: true, value: α })",
  "https://core.parts/proxy/beta/getPrototypeOf.js": "() => Object.prototype",
  "https://core.parts/proxy/beta/has.js": "(_, π) => Δ[`${υ}?${π}`] !== undefined",
  "https://core.parts/proxy/beta/headerOf.js": "() => ({ kernelActionLocation: V, kernelActionKey: Υ, href: υ, metaKernel: α, self: β, groups: Ψ, metaKernelKey: π })",
  "https://core.parts/proxy/beta/isExtensible.js": "() => true",
  "https://core.parts/proxy/beta/ownKeys.js": "() => {\n  const keys = new Set()\n  α.query(l => keys.add(l.kireji))\n  return [...keys]\n }",
  "https://core.parts/proxy/beta/query.js": "(ƒ = x => x) => {\n  const roots = β.rootsOf()\n  return Object.keys(Δ).reduce((o, url) => {\n   const rootIndex = roots.findIndex(root => url.startsWith(root + '?'));\n   if (rootIndex !== -1) {\n    const root = roots[rootIndex],\n     kireji = url.slice(root.length + 1)\n    const item = { url, root, kireji, rootIndex }\n    const result = ƒ(item)\n    if (result) o.push(result)\n   }\n   return o\n  }, [])\n }",
  "https://core.parts/proxy/beta/rootsOf.js": "() => {\n  const roots = [υ]\n  let root = υ, key;\n  while (root = Δ[key = root + '?core']) {\n   if (roots.includes(root)) throw 'core loop'\n   roots.push(root);\n   if (root === Υ) break;\n  }\n  if (!roots.includes(Υ)) roots.push(Υ)\n  return roots;\n }",
  "https://core.parts/proxy/beta/set.js": "(_, kireji, value) => Ω[Ω[Ω[υ].query(l => l.kireji === kireji ? l.url : undefined)[0]]] = value",
  "https://core.parts/proxy/beta/toPrimitive.js": "" + ((hint, caller) => {
   let url = υ, rank = Ψ.rank
   const
    getroots = () => {
     const roots = []
     let root = υ, key;
     while (root = Δ[key = root + '?core']) {
      if (roots.includes(root)) throw 'core loop'
      roots.push(root);
     }
     return roots;
    },
    imaginary = hint === 'imaginary';
   if (Δ[url] === undefined || imaginary) {
    while ((imaginary && url === υ) || Δ[url] === undefined && rank.length < 7) {
     rank += '~'
     url += '~';
    }
    if (Δ[url] === undefined) {
     for (const root of getroots()) {
      const value = Ω[root][Symbol.toPrimitive]()
      if (value !== undefined) return value
     }
     console.warn(new TypeError('possible fx with no constructor ' + url), { roots: getroots() })
     return
    }
    rank = rank.slice(0, -1)
    url = url.slice(0, -1)
    const Kireji = {}
    Ω[url].query(l => {
     if (l.kireji in Kireji && Kireji[l.kireji].rootIndex <= l.rootIndex) return;
     Kireji[l.kireji] = l
    })
    const primitive = eval(`({${Object.entries(Kireji).map(([kireji, { url }]) => `"${Ω[url]}":${kireji}`).join(',')}})=>${Ω[`${url}~`]}`)(Ω)
    if (typeof primitive !== 'string') throw new TypeError(`output of ${url} must be a string (got ${typeof primitive})`)
    if (imaginary) return primitive
    Ω[url] = primitive
   }
   return Δ[υ]
  }),
  "https://core.parts/proxy/beta/toString.js": "() => Δ[υ]",
  "https://core.parts/proxy/beta/valueOf.js": "() => Δ[υ]",
  "https://core.parts/demo/hello.txt?noun": "https://core.parts/demo/noun.txt",
  "https://core.parts/templates/button.js": "(url, layout = '', manifest = '', onclickjs = `()=>{ console.log('button click ${url}') }`) => {\n  let parts = ('' + Ω['https://core.parts/templates/button.json']).replace(/\\$1/g, url).replace(/\\$2/, layout).replace(/\\$3/, manifest).replace(/\"\\$4\"/, JSON.stringify(''+onclickjs))\n  Object.entries(JSON.parse(parts)).forEach(([url, value]) => Ω[url] = value)\n }",
  "https://core.parts/templates/button.json": "{\"$1/layout.css~\":\"`:host { background: #c3c3c3; box-shadow: ${(''+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'} } $2`\",\"$1/manifest.uri\":\"$3\",\"$1/onclick.js\":\"$4\",\"$1?layout\":\"$1/layout.css\",\"$1?manifest\":\"$1/manifest.uri\",\"$1?onclick\":\"$1/onclick.js\",\"$1?core\":\"https://core.parts/\",\"$1~\":\"index[Symbol.toPrimitive]()\",\"$1/layout.css?down\":\"$1/down.txt\",\"$1?onpointerdown\":\"$1/onpointerdown.js\",\"$1/onpointerdown.js\":\"e => { e.stopPropagation(); Ω['$1/down.txt'] = '1'; Ω['https://core.parts/behaviors/release/src.uri'] = '$1/release.js' }\",\"$1/release.js\":\"e => { Ω['$1/down.txt'] = '0' }\",\"$1/down.txt\":\"0\",\"$1/down.txt?fx\":\"$1/down-fx.uri\",\"$1/down-fx.uri\":\"$1/layout.css\"}",
  "https://core.parts/templates/double_click.js": "(url, js = `()=>{ console.log('double clicked ${url}') }`) => { let parts = ('' + Ω['https://core.parts/templates/double_click.json']).replace(/\\$1/g, url).replace(/\"\\$2\"/, JSON.stringify(''+js)); Object.assign(Δ, JSON.parse(parts)) }",
  "https://core.parts/templates/double_click.json": JSON.stringify({ "$1?ondblclick": "$1/ondblclick.js", "$1/ondblclick.js": "$2" }),
  "https://core.parts/templates/click.js": "(url, js = `()=>{ console.log('single clicked ${url}') }`) => { let parts = ('' + Ω['https://core.parts/templates/click.json']).replace(/\\$1/g, url).replace(/\"\\$2\"/, JSON.stringify(''+js)); Object.assign(Δ, JSON.parse(parts)) }",
  "https://core.parts/templates/click.json": JSON.stringify({ "$1?onclick": "$1/onclick.js", "$1/onclick.js": "$2" }),
  "https://core.parts/templates/part.js": "(url, layout = '', manifest = '', ...components) => {\n  let parts = ('' + Ω['https://core.parts/templates/part.json']).replace(/\\$1/g, url).replace(/\\$2/, layout).replace(/\\$3/, manifest)\n  for (const component in components) throw new RangeError('unhandled component', { url, component, components })\n  Object.assign(Δ, JSON.parse(parts))\n }",
  "https://core.parts/templates/part.json": "{\"$1/layout.css\":\"$2\",\"$1/manifest.uri\":\"$3\",\"$1?layout\":\"$1/layout.css\",\"$1?manifest\":\"$1/manifest.uri\",\"$1?core\":\"https://core.parts/\",\"$1~\":\"index[Symbol.toPrimitive]()\"}",
  "https://core.parts/demo/hello.txt~": "`Welcome to my ${noun}, ${persons_name}! I've been ${verb_ending_in_ing} on it all ${time_interval}, so I'm ${mood} you ${past_phrasal_verb}.`",
  "https://core.parts/demo/noun.txt": "website",
  "https://core.parts/demo/persons-name.txt": "stranger",
  "https://core.parts/demo/verb_ending_in_ing.txt:": "working",
  "https://core.parts/demo/mood.txt": "glad",
  "https://core.parts/demo/past_phrasal_verb.txt:": "stopped by",
  "https://core.parts/demo/time_interval.txt": "day",
  // TODO check core's constructor i.e. { `${υ}~`, `${υ}~~`, `${υ}~~~`, ... `${β.core}~`, `${β.core}~~`, `${β.core}~~~`, ... }
  "https://core.parts/error-404/layout.css": ":host { position: relative; width: 100%; box-sizing: border-box; height: 100%; margin: 0; background: magenta }",
  "https://core.parts/error-404?core": "https://core.parts/core-part",
  "https://core.parts/error-404?layout": "https://core.parts/error-404/layout.css",
  "https://core.parts/favicon.ico?src": "https://core.parts/apple-touch-icon.png",
  "https://core.parts/favicon.ico~": "src[Symbol.toPrimitive]()",
  "https://kireji.io/favicon.ico?src": "https://core.parts/apple-touch-icon.png",
  "https://kireji.io/favicon.ico~": "src[Symbol.toPrimitive]()",
  "https://kireji.app/favicon.ico?src": "https://core.parts/apple-touch-icon.png",
  "https://kireji.app/favicon.ico~": "src[Symbol.toPrimitive]()",
  "https://ejaugust.com/favicon.ico?src": "https://core.parts/apple-touch-icon.png",
  "https://ejaugust.com/favicon.ico~": "src[Symbol.toPrimitive]()",
  "https://orenjinari.com/favicon.ico?src": "https://core.parts/apple-touch-icon.png",
  "https://orenjinari.com/favicon.ico~": "src[Symbol.toPrimitive]()",
  "https://core.parts/file.js": "event => {\n const\n   direct = typeof event === 'string',\n   url = direct ? event : event.request.url;\n  console.info('FileInfo: just fetched '+url+'.');\n  if (url === 'https://core.parts/everything.js') return event.respondWith(new Response(\"var causality = {}, onfetch = (Ω = new Proxy({}, new Proxy(\" + JSON.stringify(Δ) + ', { get: (Δ, Υ) => eval(Δ[V = \"https://core.parts/proxy/alpha.js\"]) })))[\"https://core.parts/file.js\"]', { headers: { 'content-type': 'application/json' } }))\n  if (url.includes('&')) {\n   if (!url.includes('?')) throw new TypeError(`bad format (ampersand with no query string) ${url}`)\n   const [base, query] = url.split('?')\n   query.split('&').forEach(subquery => {\n    const\n     url = base + '?' + subquery,\n     proxy = Ω[url],\n     { value, kireji, target } = proxy.headerOf().groups;\n    Ω[target][kireji] = value\n   })\n   const response = new Response(new Int8Array([1]))\n   return direct ? response : event.respondWith(response)\n  }\n  const proxy = Ω[url],\n   { binary, type, value, kireji, target } = proxy.headerOf().groups;\n  let string = '';\n  if (value) {\n   Ω[target][kireji] = value\n   const response = new Response(new Int8Array([1]))\n   return direct ? response : event.respondWith(response)\n  }\n  else {\n   string = proxy.toPrimitive()\n   if (kireji) {\n    if (kireji === 'onclick') {\n     const fnurl = '' + Ω[url];\n     if (fnurl) {\n      const proxy = Ω[Ω[fnurl]],\n       { value, kireji, target } = proxy.headerOf().groups\n      if (!(value && kireji && target)) throw new TypeError(`bad format event handler chain (${url} => ${fnurl})`)\n      Ω[target][kireji] = value\n     }\n     const response = new Response(new Int8Array([1]))\n     return direct ? response : event.respondWith(response)\n    } else {\n     const response = Response.redirect(string, 307);\n     return direct ? response : event.respondWith(response)\n    }\n   }\n  }\n  var body = new TextEncoder().encode(string);\n  if (binary) {\n   const B = atob(string), k = B.length, A = new ArrayBuffer(k), I = new Uint8Array(A);\n   for (var i = 0; i < k; i++) I[i] = B.charCodeAt(i);\n   body = new Blob([I], { type });\n  }\n  const response = new Response(body, { headers: { \"content-type\": `${type}${binary ? '' : '; charset=UTF-8'}`, \"expires\": \"Sun, 20 Jul 1969 20:17:00 UTC\", \"server\": \"kireji\" } })\n  return direct ? response : event.respondWith(response)\n }",
  "https://core.parts/flex-spacer/layout.css": ":host { flex: 1 1 }",
  "https://core.parts/flex-spacer?core": "https://core.parts/core-part",
  "https://core.parts/flex-spacer?layout": "https://core.parts/flex-spacer/layout.css",
  "https://core.parts/fullscreen-button/layout.css": ":host { width: 16px; height: 16px; cursor: pointer } :host::before { content: '\u{26F6}'; font-size: 16px; line-height: 16px }",
  "https://core.parts/fullscreen-button/manifest.uri": "",
  "https://core.parts/fullscreen-button/onclick.js": "()=>document.documentElement.requestFullscreen()",
  "https://core.parts/fullscreen-button?core": "https://core.parts/core-part",
  "https://core.parts/fullscreen-button?layout": "https://core.parts/fullscreen-button/layout.css",
  "https://core.parts/fullscreen-button?manifest": "https://core.parts/fullscreen-button/manifest.uri",
  "https://core.parts/fullscreen-button?onclick": "https://core.parts/fullscreen-button/onclick.js",
  "https://core.parts/factory-reset-button/layout.css": ":host { width: 16px; height: 16px; cursor: pointer } :host::before { content: '\u{1F9FC}'; font-size: 16px; line-height: 16px }",
  "https://core.parts/factory-reset-button/manifest.uri": "",
  "https://core.parts/factory-reset-button?core": "https://core.parts/core-part",
  "https://core.parts/factory-reset-button?layout": "https://core.parts/factory-reset-button/layout.css",
  "https://core.parts/factory-reset-button?manifest": "https://core.parts/factory-reset-button/manifest.uri",
  "https://core.parts/factory-reset-button?onclick": "https://core.parts/os-95/taskbar-/start-menu/restart-server/onclick.js",
  "https://core.parts/behaviors/grab/src.uri": "",
  "https://core.parts/behaviors/grab/fx.uri": "https://core.parts/onpointermove.js https://core.parts/onpointerup.js",
  "https://core.parts/behaviors/grab/src.uri?fx": "https://core.parts/behaviors/grab/fx.uri",
  "https://core.parts/element.js": "" + (() => {
   const eventKireji = { onclick: 0, onpointerdown: 0, onpointerup: 0, onpointermove: 0, ondblclick: 0, layout: 1, manifest: 1, ondragstart: -1, oncontextmenu: -1 }, nodePool = {};
   Object.defineProperties(HTMLElement.prototype, {
    shadow: {
     get() { if (!this._shadow) this._shadow = this.attachShadow({ mode: 'closed' }); return this._shadow }
    },
    layout: {
     get() { if (!this._layout) { this._layout = new CSSStyleSheet(); this.shadow.adoptedStyleSheets.push(this._layout) } return this._layout },
     set(v) { this.layout.replaceSync(v) }
    },
    manifest: {
     get() { return [...this.shadow.children].map(x => x.url) },
     set(v) {
      v = '' + v
      const O = this.manifest, N = v.split(' ').filter(x => x), C = this.shadow
      let o, n, i = -1;
      while (O.length && N.length) {
       i++
       if ((o = O.shift()) === (n = N.shift())) continue
       const u = O.findIndex(x => x === n)
       if (u === -1) this.install(n, i)
       else { C.insertBefore(C.children[i + u + 1], C.children[i]); O.splice(u, 1) }
       if (N.some(x => x === o)) O.unshift(o)
       else C.children[i + 1].remove()
      }
      if (O.length) O.forEach(() => C.children[i + 1].remove())
      else if (N.length) N.forEach(x => this.install(x))
     }
    },
    install: {
     get() {
      return (url, index) => {
       if (!url) throw 'empty url'
       const node = (url in nodePool ? [...nodePool[url]].find(n => !n.isConnected) : undefined) ?? document.createElement(Ω[url].headerOf().groups.part);
       if (index === undefined || index >= this.shadow.children.length) this.shadow.appendChild(node); else this.shadow.insertBefore(node, this.shadow.children[index])
       if (node._url !== url) node.url = url; else node.repair()
      }
     }
    },
    repair: {
     get() {
      return () => this['manifest'] = this.proxy['manifest']
     }
    },
    proxy: {
     get() { if (!this._proxy) this._proxy = Ω[this.url]; return this._proxy }
    },
    url: {
     get() { if (!this._url) throw new ReferenceError('attempted to get url before it was defined.'); return this._url },
     set(v) {
      if (this._url) throw new TypeError(`cannot change HTMLElement's url (is ${this._url}, tried to set to ${v})`);
      this._url = v
      if (!(v in nodePool)) nodePool[v] = new Set()
      nodePool[v].add(this)
      for (const kireji in eventKireji) {
       if (eventKireji[kireji] === -1) {
        this[kireji] = e => e.preventDefault()
       } else if (kireji in this.proxy) {
        this[kireji] = this.proxy[kireji]
        if (eventKireji[kireji]) {
         const url = this.proxy[kireji].headerOf().href;
         if (!(url in causality)) causality[url] = {}
         if (!(kireji in causality[url])) causality[url][kireji] = new Set()
         causality[url][kireji].add(this)
        }
       }
      }
     }
    }
   })
   onload = () => document.body.url = location.href
  }),
  "https://core.parts/onpointermove.js?behavior": "https://core.parts/behaviors/grab/src.uri",
  "https://core.parts/onpointermove.js~": "(''+behavior) ? (''+Ω[behavior]) : '()=>{}'",
  "https://core.parts/onpointerup.js?grab": "https://core.parts/behaviors/grab/src.uri",
  "https://core.parts/onpointerup.js?release": "https://core.parts/behaviors/release/src.uri",
  "https://core.parts/onpointerup.js~": "`e => { ${(''+grab) ? `Ω['https://core.parts/behaviors/grab/src.uri'] = ''` : ''}; ${(''+release) ? `Ω['${release}'](e); Ω['https://core.parts/behaviors/release/src.uri'] = ''` : ''} }`",
  "https://core.parts/layout.css?height": "https://core.parts/os-95/taskbar-/css-height.txt",
  "https://core.parts/layout.css~": "`:host { position: fixed; top: 0; left: 0; width: 100%; box-sizing: border-box; height: 100%; margin: 0; display: grid; grid-template-rows: 1fr ${height}; font: 11px / 16px sans-serif }`",
  "https://core.parts/os-95/manifest.uri?hide_file_browser": "https://core.parts/os-95/windows/file-browser-0/minimized.txt",
  "https://core.parts/os-95/manifest.uri?hide_graph_editor": "https://core.parts/os-95/windows/graph-editor-0/minimized.txt",
  "https://core.parts/os-95/manifest.uri?start_menu": "https://core.parts/os/start-menu/open.txt",
  "https://core.parts/os-95/manifest.uri~": "`https://core.parts/os-95/desktop-${''+hide_file_browser === '0' ? ' https://core.parts/os-95/windows/file-browser-0' : ''}${''+hide_graph_editor === '0' ? ' https://core.parts/os-95/windows/graph-editor-0' : ''} https://core.parts/os-95/taskbar-${''+start_menu === '1' ? ' https://core.parts/os-95/taskbar-/start-menu/click-to-close https://core.parts/os-95/taskbar-/start-menu': ''}`",
  "https://core.parts/os/icons/layout.js": "([r,g,b,a=0.8], c, ext = undefined, color = 'black') => `:host { --rgba: rgba(${r}, ${g}, ${b}, ${a}); --character: '${c}'; --size: 16px; color: ${color}; position: relative; width: 16px; height: 16px } :host::before, :host::after { border-radius: calc(var(--size) / 6) } :host::before { content: var(--character); font-size: var(--size); line-height: var(--size) } :host::after { box-shadow: 0 0 0 calc(var(--size) / 16) ${color}; background: var(--rgba); position: absolute; bottom: 0; right: 0;${ext ? `content: '${ext}';` : ''} font: 400 calc(var(--size) / 3) / calc(var(--size) / 3) monospace; padding: calc(var(--size) / 12)}`",
  "https://core.parts/os/icons/text-css-icon?core": "https://core.parts/os/icons/core-icon",
  "https://core.parts/os/icons/text-css-icon?layout": "https://core.parts/os/icons/text-css-icon/layout.css",
  "https://core.parts/os/icons/text-css-icon/layout.css?layout": "https://core.parts/os/icons/layout.js",
  "https://core.parts/os/icons/text-css-icon/layout.css~": "layout([0, 255, 255], '\\u{1F4C4}', 'css')",
  "https://core.parts/os/icons/text-uri-list-icon?core": "https://core.parts/os/icons/core-icon",
  "https://core.parts/os/icons/text-uri-list-icon?layout": "https://core.parts/os/icons/text-uri-list-icon/layout.uri-list",
  "https://core.parts/os/icons/text-uri-list-icon/layout.uri-list?layout": "https://core.parts/os/icons/layout.js",
  "https://core.parts/os/icons/text-uri-list-icon/layout.uri-list~": "layout([0, 0, 0], '\\u{1F4C4}', 'uri', '#ffff3f')",
  "https://core.parts/os/icons/application-json-icon?core": "https://core.parts/os/icons/core-icon",
  "https://core.parts/os/icons/application-json-icon?layout": "https://core.parts/os/icons/application-json-icon/layout.css",
  "https://core.parts/os/icons/application-json-icon/layout.css?layout": "https://core.parts/os/icons/layout.js",
  "https://core.parts/os/icons/application-json-icon/layout.css~": "layout([220, 220, 255], '\\u{1F4C4}', 'json', '#2f071f')",
  "https://core.parts/os/icons/image-png-icon?core": "https://core.parts/os/icons/core-icon",
  "https://core.parts/os/icons/image-png-icon?layout": "https://core.parts/os/icons/image-png-icon/layout.css",
  "https://core.parts/os/icons/image-png-icon/layout.css?layout": "https://core.parts/os/icons/layout.js",
  "https://core.parts/os/icons/image-png-icon/layout.css~": "layout([255, 127, 0], '\\u{1F4C4}', 'png')",
  "https://core.parts/os/icons/image-vnd-microsoft-icon-icon?core": "https://core.parts/os/icons/core-icon",
  "https://core.parts/os/icons/image-vnd-microsoft-icon-icon?layout": "https://core.parts/os/icons/image-vnd-microsoft-icon-icon/layout.css",
  "https://core.parts/os/icons/image-vnd-microsoft-icon-icon/layout.css?layout": "https://core.parts/os/icons/layout.js",
  "https://core.parts/os/icons/image-vnd-microsoft-icon-icon/layout.css~": "layout([127, 127, 127, 0.25], '\\u{1F4C4}', 'ico', '#373737')",
  "https://core.parts/os/icons/application-wasm-icon?core": "https://core.parts/os/icons/core-icon",
  "https://core.parts/os/icons/application-wasm-icon?layout": "https://core.parts/os/icons/application-wasm-icon/layout.css",
  "https://core.parts/os/icons/application-wasm-icon/layout.css?layout": "https://core.parts/os/icons/layout.js",
  "https://core.parts/os/icons/application-wasm-icon/layout.css~": "layout([0, 0, 0, 0], '\\u{1F4E6}')",
  "https://core.parts/os/icons/text-javascript-icon?core": "https://core.parts/os/icons/core-icon",
  "https://core.parts/os/icons/text-javascript-icon?layout": "https://core.parts/os/icons/text-javascript-icon/layout.css",
  "https://core.parts/os/icons/text-javascript-icon/layout.css?layout": "https://core.parts/os/icons/layout.js",
  "https://core.parts/os/icons/text-javascript-icon/layout.css~": "layout([255, 127, 127, 0.7], '\\u{1F4C4}', 'js', '#5f0000')",
  "https://core.parts/os/icons/text-html-icon?core": "https://core.parts/os/icons/core-icon",
  "https://core.parts/os/icons/text-html-icon?layout": "https://core.parts/os/icons/text-html-icon/layout.css",
  "https://core.parts/os/icons/text-html-icon/layout.css?layout": "https://core.parts/os/icons/layout.js",
  "https://core.parts/os/icons/text-html-icon/layout.css~": "layout([255, 255, 255], '\\u{1F4C4}', 'html')",
  "https://core.parts/os/icons/text-plain-icon/layout.css": ":host { --size: 16px; width: var(--size); height: var(--size) } :host::before { content: '\u{1F4C4}'; font-size: var(--size); line-height: var(--size) }",
  "https://core.parts/os/icons/text-plain-icon?core": "https://core.parts/core-part",
  "https://core.parts/os/icons/text-plain-icon?layout": "https://core.parts/os/icons/text-plain-icon/layout.css",
  "https://core.parts/os-95/programs/graph-editor/app-icon/layout.css": ":host { --size: 16px; width: var(--size); height: var(--size) } :host::before { content: '\u{1F9EC}'; font-size: var(--size); line-height: var(--size) }",
  "https://core.parts/os-95/programs/graph-editor/app-icon?core": "https://core.parts/core-part",
  "https://core.parts/os-95/programs/graph-editor/app-icon?layout": "https://core.parts/os-95/programs/graph-editor/app-icon/layout.css",
  "https://core.parts/os/icons/folder-icon/layout.css": ":host { --size: 16px; width: var(--size); height: var(--size) } :host::before { content: '\u{1F4C1}'; font-size: var(--size); line-height: var(--size) }",
  "https://core.parts/os/icons/folder-icon?core": "https://core.parts/core-part",
  "https://core.parts/os/icons/folder-icon?layout": "https://core.parts/os/icons/folder-icon/layout.css",
  "https://core.parts/os/icons/kireji-icon/layout.css": ":host { --size: 16px; width: var(--size); height: var(--size) } :host::before { content: '\u{1F517}'; font-size: var(--size); line-height: var(--size) }",
  "https://core.parts/os/icons/kireji-icon?core": "https://core.parts/core-part",
  "https://core.parts/os/icons/kireji-icon?layout": "https://core.parts/os/icons/kireji-icon/layout.css",
  "https://core.parts/os/icons/server-icon/layout.css": ":host { --size: 16px; width: var(--size); height: var(--size) } :host::before { content: '\u{1F5C4}'; font-size: var(--size); line-height: var(--size) }",
  "https://core.parts/os/icons/server-icon?core": "https://core.parts/core-part",
  "https://core.parts/os/icons/server-icon?layout": "https://core.parts/os/icons/server-icon/layout.css",
  "https://core.parts/os-95/horizontal-line?core": "https://core.parts/core-part",
  "https://core.parts/os-95/horizontal-line?layout": "https://core.parts/os-95/horizontal-line/layout.css",
  "https://core.parts/os-95/horizontal-line/layout.css": ":host { height: 2px; border-top: 1px solid #7f7f7f; border-bottom: 1px solid white; box-sizing: border-box; margin: 4px 0 }",
  "https://core.parts/os/letters/capital-f?core": "https://core.parts/core-part",
  "https://core.parts/os/letters/capital-f?layout": "https://core.parts/os/letters/capital-f/layout.css",
  "https://core.parts/os/letters/capital-f/layout.css": ":host::before { content: 'F' }",
  "https://core.parts/os/letters/lowercase-e?core": "https://core.parts/core-part",
  "https://core.parts/os/letters/lowercase-e?layout": "https://core.parts/os/letters/lowercase-e/layout.css",
  "https://core.parts/os/letters/lowercase-e/layout.css": ":host::before { content: 'e' }",
  "https://core.parts/os/letters/lowercase-i?core": "https://core.parts/core-part",
  "https://core.parts/os/letters/lowercase-i?layout": "https://core.parts/os/letters/lowercase-i/layout.css",
  "https://core.parts/os/letters/lowercase-i/layout.css": ":host::before { content: 'i' }",
  "https://core.parts/os/letters/lowercase-l?core": "https://core.parts/core-part",
  "https://core.parts/os/letters/lowercase-l?layout": "https://core.parts/os/letters/lowercase-l/layout.css",
  "https://core.parts/os/letters/lowercase-l/layout.css": ":host::before { content: 'l' }",
  "https://core.parts/os-95/programs/file-browser/app-label?core": "https://core.parts/core-part",
  "https://core.parts/os-95/programs/file-browser/app-label?layout": "https://core.parts/os-95/programs/file-browser/app-label/layout.css",
  "https://core.parts/os-95/programs/file-browser/app-label/layout.css~": "`:host { margin: 0; height: 16px; vertical-align: center; text-overflow: ellipsis; overflow: hidden } :host::after { content: 'File Browser - ${address}'; white-space: nowrap; }`",
  "https://core.parts/os-95/programs/file-browser/app-label/layout.css?address": "https://core.parts/os-95/windows/file-browser-0/address.uri",
  "https://core.parts/os-95/programs/file-browser/item-height.txt": "18",
  "https://core.parts/os-95/programs/file-browser/item-height.txt?fx": "18",
  "https://core.parts/os-95/programs/graph-editor/app-label?core": "https://core.parts/core-part",
  "https://core.parts/os-95/programs/graph-editor/app-label?layout": "https://core.parts/os-95/programs/graph-editor/app-label/layout.css",
  "https://core.parts/os-95/programs/graph-editor/app-label/layout.css~": "`:host { margin: 0; height: 16px; vertical-align: center; text-overflow: ellipsis; overflow: hidden } :host::after { content: 'Graph Editor'; white-space: nowrap; }`",
  "https://core.parts/os-95/desktop-/layout.css": ":host { position: relative; width: 100%; box-sizing: border-box; height: 100%; margin: 0; background: #377f7f }",
  "https://core.parts/os-95/desktop-/onclick.js?selected": "https://core.parts/os-95/taskbar-/selected.txt",
  "https://core.parts/os-95/desktop-/onclick.js~": "`()=>{${(''+selected) === '-1' ? '' : `Ω['${selected.headerOf().href}'] = '-1'`}}`",
  "https://core.parts/os-95/desktop-?core": "https://core.parts/core-part",
  "https://core.parts/os-95/desktop-?layout": "https://core.parts/os-95/desktop-/layout.css",
  "https://core.parts/os-95/desktop-?onclick": "https://core.parts/os-95/desktop-/onclick.js",
  "https://core.parts/os-95/windows/file-browser-0/layout.css?maximized": "https://core.parts/os-95/windows/file-browser-0/maximized.txt",
  "https://core.parts/os-95/windows/file-browser-0/layout.css?position": "https://core.parts/os-95/windows/file-browser-0/position.json",
  "https://core.parts/os-95/windows/file-browser-0/layout.css~": "{\n  const common = \"position: absolute; display: flex; flex-flow: column nowrap; gap: 2px; background: #c3c3c3; box-sizing: border-box\"\n  if (('' + maximized) === '1') {\n   return `:host { position: absolute; top: 0; left: 0; right: 0; bottom: 28px; padding: 2px; ${common} }`\n  } else {\n   const { x, y, w, h } = JSON.parse('' + position);\n   return `:host { width: ${w}px; height: ${h}px; left: ${x}px; top: ${y}px; min-height: fit-content; padding: 4px; background: #c3c3c3; box-shadow: inset -1px -1px black, inset 1px 1px #c3c3c3, inset -2px -2px #7a7a7a, inset 2px 2px white; ${common} }`\n  }\n }",
  "https://core.parts/os-95/windows/file-browser-0/manifest.uri~": "`https://core.parts/os-95/windows/file-browser-0/title-bar https://core.parts/os-95/windows/file-browser-0/menu-bar https://core.parts/os-95/windows/file-browser-0/explorer-view https://core.parts/os-95/windows/file-browser-0/status-bar https://core.parts/os-95/windows/file-browser-0/resize-top https://core.parts/os-95/windows/file-browser-0/resize-bottom https://core.parts/os-95/windows/file-browser-0/resize-left https://core.parts/os-95/windows/file-browser-0/resize-right https://core.parts/os-95/windows/file-browser-0/resize-top-right https://core.parts/os-95/windows/file-browser-0/resize-bottom-right https://core.parts/os-95/windows/file-browser-0/resize-top-left https://core.parts/os-95/windows/file-browser-0/resize-bottom-left`",
  "https://core.parts/os-95/windows/file-browser-0/onpointerdown.js?index": "https://core.parts/os-95/taskbar-/file-browser/index.txt",
  "https://core.parts/os-95/windows/file-browser-0/onpointerdown.js?selected": "https://core.parts/os-95/taskbar-/selected.txt",
  "https://core.parts/os-95/windows/file-browser-0/onpointerdown.js~": "`() => { ${(''+selected) === (''+index) ? '' : `Ω['${selected.headerOf().href}'] = '${''+index}'`} }`",
  "https://core.parts/os-95/windows/file-browser-0/active.txt?fx": "https://core.parts/os-95/taskbar-/file-browser/open/fx.uri",
  "https://core.parts/os-95/windows/file-browser-0/active.txt?index": "https://core.parts/os-95/taskbar-/file-browser/index.txt",
  "https://core.parts/os-95/windows/file-browser-0/active.txt?minimized": "https://core.parts/os-95/windows/file-browser-0/minimized.txt",
  "https://core.parts/os-95/windows/file-browser-0/active.txt?selected": "https://core.parts/os-95/taskbar-/selected.txt",
  "https://core.parts/os-95/windows/file-browser-0/active.txt~": "('' + minimized) === '1' ? '0' : ('' + selected) === ('' + index) ? '1' : '0'",
  "https://core.parts/os-95/windows/file-browser-0/exit-button/layout.css": ":host { position: relative; width: 16px; height: 14px; background: #c3c3c3; margin-left: 2px; box-shadow: inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb } :host::before, :host::after { --color: #7f7f7f; content: ''; display: block; position: absolute; width: 8px; height: 7px; left: 4px; top: 3px; background: linear-gradient(to top left, transparent 0%, transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%), linear-gradient(to top right,  transparent 0%,  transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%) } :host::before { --color: white; left: 5px; top: 4px }",
  "https://core.parts/os-95/windows/file-browser-0/exit-button/manifest.uri": "",
  "https://core.parts/os-95/windows/file-browser-0/exit-button?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/exit-button?layout": "https://core.parts/os-95/windows/file-browser-0/exit-button/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/exit-button?manifest": "https://core.parts/os-95/windows/file-browser-0/exit-button/manifest.uri",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/name_width.txt": "256",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/name_width.txt?fx": "https://core.parts/os-95/windows/file-browser-0/explorer-view/column-fx.uri",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/type_width.txt": "128",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/type_width.txt?fx": "https://core.parts/os-95/windows/file-browser-0/explorer-view/column-fx.uri",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/column-fx.uri": "https://core.parts/os-95/windows/file-browser-0/explorer-view/header-/layout.css https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/headers.json": JSON.stringify({ name: "Name", type: "Type", size: "Size" }),
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/header-?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/header-?layout": "https://core.parts/os-95/windows/file-browser-0/explorer-view/header-/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/header-?manifest": "https://core.parts/os-95/windows/file-browser-0/explorer-view/header-/manifest.uri",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/header-/layout.css~": "`:host { display: grid; width: 100%; height: 18px; grid-template-columns: ${name_width}px ${type_width}px 1fr }`",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/header-/layout.css?name_width": "https://core.parts/os-95/windows/file-browser-0/explorer-view/name_width.txt",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/header-/layout.css?type_width": "https://core.parts/os-95/windows/file-browser-0/explorer-view/type_width.txt",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/header-/item_layout.css": ":host { display: flex; flex-flow: row nowrap; align-items: center; padding-left: 6px; position: relative }",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/header-/manifest.uri?headers": "https://core.parts/os-95/windows/file-browser-0/explorer-view/headers.json",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/header-/manifest.uri?item_layout": "https://core.parts/os-95/windows/file-browser-0/explorer-view/header-/item_layout.css",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/header-/manifest.uri?button": "https://core.parts/templates/button.js",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/header-/manifest.uri?sort_order": "https://core.parts/os-95/windows/file-browser-0/sort_order.json",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/header-/manifest.uri~": ("" + (() => {
   const header_obj = JSON.parse('' + headers), urls = []
   Object.keys(header_obj).forEach((key, i) => button(
    urls[i] = 'https://core.parts/os-95/windows/file-browser-0/explorer-view/header-/' + key + '-button',
    `${item_layout} :host::before { content: '${header_obj[key]}' }`,
    i ? `https://core.parts/os-95/windows/file-browser-0/resize-${key}-column` : undefined,
    `() => { const order = ${('' + sort_order)}, keys = Object.keys(order), key = '${key}', keyplace = keys.indexOf(key); if (keyplace !== 0) { keys.splice(keyplace, 1); keys.unshift(key); Ω['${sort_order.headerOf().href}'] = JSON.stringify(keys.reduce((o, k) => (o[k]=order[k],o), {})) } else { order[key] = !order[key]; Ω['${sort_order.headerOf().href}'] = JSON.stringify(order) }  }`
   ))
   return urls.join(' ')
  })).slice(6),
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/parent-folder?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/parent-folder?layout": "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/parent-folder/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/parent-folder?ondblclick": "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/parent-folder/ondblclick.js",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/parent-folder?manifest": "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/parent-folder/manifest.uri",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/parent-folder/layout.css": ":host {  position: relative; display: flex; flex-flow: row nowrap; align-items: center; padding: 4px 0; padding-right: 6px; font-weight: bold } folder-icon { --size: 16px; margin-right: 4px } :host::after { content: '..' }",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/parent-folder/manifest.uri": "https://core.parts/os/icons/folder-icon",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/parent-folder/ondblclick.js~": "`() => Ω['https://core.parts/os-95/windows/file-browser-0/address.uri'] = '${('' + address).split('/').slice(0, -2).join('/')}/'`",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/parent-folder/ondblclick.js?address": "https://core.parts/os-95/windows/file-browser-0/address.uri",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-?layout": "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-?manifest": "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/manifest.uri",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/layout.css~": "`:host { display: grid; grid-template-columns: ${name_width}px ${type_width}px 1fr; grid-auto-rows: 18px; grid-template-areas: \"up up up\" } parent-folder { grid-area: up }`",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/layout.css?name_width": "https://core.parts/os-95/windows/file-browser-0/explorer-view/name_width.txt",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/layout.css?type_width": "https://core.parts/os-95/windows/file-browser-0/explorer-view/type_width.txt",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/manifest.uri?cell": "https://core.parts/templates/part.js",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/manifest.uri?click": "https://core.parts/templates/click.js",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/manifest.uri?double_click": "https://core.parts/templates/double_click.js",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/manifest.uri?address": "https://core.parts/os-95/windows/file-browser-0/address.uri",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/manifest.uri?sort_order": "https://core.parts/os-95/windows/file-browser-0/sort_order.json",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/manifest.uri?header_json": "https://core.parts/os-95/windows/file-browser-0/explorer-view/headers.json",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/manifest.uri~": ("" + (() => {
   const
    browse_url = '' + address, icon_urlbase = 'https://core.parts/os/icons/', fileurlbase = υ.replace(/\/manifest.uri$/, '/file-'), constructor_end = /~+$/, file_list = [], url_list = [], O = JSON.parse(sort_order), K = Object.keys(O), header = JSON.parse(header_json),
    filenames = [...new Set(Object.keys(Δ).filter(url => (url !== browse_url) && url.startsWith(browse_url) /*&& !url.includes('?') && url.replace(constructor_end, '') !== browse_url*/).map(x => x.replace(browse_url, '').includes('/') ? x.slice(0, browse_url.length + x.replace(browse_url, '').indexOf('/') + 1).replace(/~+$/, '') : x.replace(/~+$/, '')))].map(url => [url, url.replace(browse_url, '')])
   if (browse_url !== 'https://') url_list.push("https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/parent-folder")
   const kireji_count = filenames.filter(x => x[0].includes('?')).length, folder_count = filenames.filter(x => x[0].endsWith('/')).length, file_count = filenames.length - (kireji_count + folder_count)
   Ω['https://core.parts/os-95/windows/file-browser-0/status/file_count.txt'] = file_count
   Ω['https://core.parts/os-95/windows/file-browser-0/status/folder_count.txt'] = folder_count
   Ω['https://core.parts/os-95/windows/file-browser-0/status/kireji_count.txt'] = kireji_count
   for (const [url, name] of filenames) {
    const
     proxy = Ω[url],
     groups = proxy.headerOf().groups,
     row_data = {
      ...groups,
      url,
      manifest: [],
      type: url.match(constructor_end) ? 'constructor' : url.match(/\?[\w\d_$]+$/) ? 'kireji' : url.endsWith('/') ? url.match(/^https:\/\/[\w\d]+\.[\w\d]{2,}\/$/) ? 'server' : 'folder' : groups.type,
      size_label: groups.size + ' byte' + (groups.size === 1 ? '' : 's'),
     },
     is_index = ['folder', 'server'].includes(row_data.type),
     item_url = fileurlbase + (name.replace(/[^a-zA-Z0-9]+/g, '-').replace(/\/$/, '-folder').toLowerCase()),
     label_url = item_url + '/app-label',
     icontag = row_data.type.replace(/[^a-zA-Z0-9]+/g, '-') + '-icon',
     icon_url = icon_urlbase + icontag,
     label_css = `:host { overflow: hidden; text-overflow: ellipsis } :host::before { content: '${name.endsWith('/') ? name.slice(0, -1) : name}' }`,
     item_layout = `:host { position: relative; display: flex; flex-flow: row nowrap; align-items: center; padding: 4px 0; overflow: hidden; padding-right: 6px${is_index ? '; font-weight: bold' : ''} } ${icontag} { --size: 16px; margin-right: 4px }`,
     item_manifest = icon_url + ' ' + label_url,
     ondblclick = `() => { ${is_index ? `Ω['https://core.parts/os-95/windows/file-browser-0/address.uri'] = '${url}'` : `console.log('open ${name} now')`} }`,
     onclick = `() => { ${`console.log('focus ${name} now')`} }`;
    for (const key in header) {
     if (key === 'name') {
      const keyurl = item_url + '-item'
      row_data.manifest.push(keyurl)
      cell(label_url, label_css)
      cell(keyurl, item_layout, item_manifest)
      double_click(keyurl, ondblclick)
      click(keyurl, onclick)
     } else {
      const keyurl = item_url + '-' + key, content = row_data[key + (key === 'size' ? '_label' : '')];
      row_data.manifest.push(keyurl)
      cell(keyurl, `:host { overflow: hidden; text-overflow: ellipsis } :host::before { content: '${content}' }`)
      double_click(keyurl, ondblclick)
      click(keyurl, onclick)
     }
    }
    file_list.push(row_data)
   }
   file_list.sort((a, b) => ((a[K[0]] > b[K[0]] === O[K[0]]) ? 1 : (a[K[0]] === b[K[0]] ? ((a[K[1]] > b[K[1]] === O[K[1]]) ? 1 : (a[K[1]] === b[K[1]] ? ((a[K[2]] > b[K[2]] === O[K[2]]) ? 1 : (a[K[2]] === b[K[2]] ? 0 : -1)) : -1)) : -1)))
   url_list.push(...file_list.map(({ manifest }) => manifest).flat())
   return url_list.join(' ')
  })).slice(6),
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/manifest.uri?fx": "https://core.parts/os-95/windows/file-browser-0/status/fx.uri",
  "https://core.parts/os-95/windows/file-browser-0/address.uri": "https://core.parts/os/",
  "https://core.parts/os-95/windows/file-browser-0/address.uri?fx": "https://core.parts/os-95/windows/file-browser-0/address-fx.uri",
  "https://core.parts/os-95/windows/file-browser-0/address-fx.uri": "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/manifest.uri https://core.parts/os-95/programs/file-browser/app-label/layout.css https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/parent-folder/ondblclick.js",
  "https://core.parts/os-95/windows/file-browser-0/sort_order.json": JSON.stringify({ 'size': false, 'type': true, 'name': false }),
  "https://core.parts/os-95/windows/file-browser-0/sort_order.json?fx": "https://core.parts/os-95/windows/file-browser-0/sort-order-fx.uri",
  "https://core.parts/os-95/windows/file-browser-0/sort-order-fx.uri": "https://core.parts/os-95/windows/file-browser-0/explorer-view/files-/manifest.uri",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/layout.css": ":host { position: relative; overflow-y: auto; flex: 1 1; box-shadow: -0.5px -0.5px 0 0.5px black, 0 0 0 1px #dbdbdb, -0.5px -0.5px 0 1.5px #7a7a7a, 0 0 0 2px white; background: white; margin: 2px; display: flex; flex-flow: column nowrap } header- { height: 18px } files- { flex: 1 1 }",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view/manifest.uri": "https://core.parts/os-95/windows/file-browser-0/explorer-view/header- https://core.parts/os-95/windows/file-browser-0/explorer-view/files-",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view?layout": "https://core.parts/os-95/windows/file-browser-0/explorer-view/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/explorer-view?manifest": "https://core.parts/os-95/windows/file-browser-0/explorer-view/manifest.uri",
  "https://core.parts/os-95/windows/file-browser-0/grab.json": "{\"x\":514.88671875,\"y\":328.80859375,\"start\":{\"x\":136.64453125,\"y\":118.046875,\"w\":377.390625,\"h\":212.2890625},\"mode\":\"se-resize\"}",
  "https://core.parts/os-95/windows/file-browser-0/maximize-button/layout.css?down": "https://core.parts/os-95/windows/file-browser-0/maximize-button/down.txt",
  "https://core.parts/os-95/windows/file-browser-0/maximize-button/layout.css~": "`:host { position: relative; width: 16px; height: 14px; background: #c3c3c3; box-shadow: ${(''+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'} } :host::before { --color: black; display: block; position: absolute; content: ''; width: 9px; height: 9px; top: 2px; left: 3px; box-shadow: inset 0 2px var(--color), inset 0 0 0 1px var(--color) } :host(:hover)::before { --color: blue }`",
  "https://core.parts/os-95/windows/file-browser-0/maximize-button/manifest.uri": "",
  "https://core.parts/os-95/windows/file-browser-0/maximize-button/down.txt": "0",
  "https://core.parts/os-95/windows/file-browser-0/maximize-button/down-fx.uri": "https://core.parts/os-95/windows/file-browser-0/maximize-button/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/maximize-button/down.txt?fx": "https://core.parts/os-95/windows/file-browser-0/maximize-button/down-fx.uri",
  "https://core.parts/os-95/windows/file-browser-0/maximize-button/onclick.js": "()=>{Ω['https://core.parts/os-95/windows/file-browser-0/maximized.txt'] = '1' }",
  "https://core.parts/os-95/windows/file-browser-0/maximize-button/onpointerdown.js": "e => { e.stopPropagation(); Ω['https://core.parts/os-95/windows/file-browser-0/maximize-button/down.txt'] = '1'; Ω['https://core.parts/behaviors/release/src.uri'] = 'https://core.parts/os-95/windows/file-browser-0/maximize-button/release.js' }",
  "https://core.parts/os-95/windows/file-browser-0/maximize-button/release.js": "e => { Ω['https://core.parts/os-95/windows/file-browser-0/maximize-button/down.txt'] = '0' }",
  "https://core.parts/os-95/windows/file-browser-0/maximize-button?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/maximize-button?layout": "https://core.parts/os-95/windows/file-browser-0/maximize-button/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/maximize-button?manifest": "https://core.parts/os-95/windows/file-browser-0/maximize-button/manifest.uri",
  "https://core.parts/os-95/windows/file-browser-0/maximize-button?onclick": "https://core.parts/os-95/windows/file-browser-0/maximize-button/onclick.js",
  "https://core.parts/os-95/windows/file-browser-0/maximize-button?onpointerdown": "https://core.parts/os-95/windows/file-browser-0/maximize-button/onpointerdown.js",
  "https://core.parts/os-95/windows/file-browser-0/maximized.txt": "0",
  "https://core.parts/os-95/windows/file-browser-0/maximized/fx.url": "https://core.parts/os-95/windows/file-browser-0/layout.css https://core.parts/os-95/windows/file-browser-0/window-controls/manifest.uri https://core.parts/os-95/windows/file-browser-0/title-bar/ondblclick.js",
  "https://core.parts/os-95/windows/file-browser-0/maximized.txt?fx": "https://core.parts/os-95/windows/file-browser-0/maximized/fx.url",
  "https://core.parts/os-95/windows/file-browser-0/menu-bar/layout.css": ":host { height: 18px; display: flex; flex-flow: row nowrap; gap: 16px; align-items: center; padding: 0 4px; }",
  "https://core.parts/os-95/windows/file-browser-0/menu-bar/manifest.uri": "https://core.parts/os-95/windows/file-browser-0/menu-bar/file-menu",
  "https://core.parts/os-95/windows/file-browser-0/menu-bar/file-menu/layout.css": ":host { display: flex; flex-flow: row nowrap; } capital-f { text-decoration: underline }",
  "https://core.parts/os-95/windows/file-browser-0/menu-bar/file-menu/manifest.uri": "https://core.parts/os/letters/capital-f https://core.parts/os/letters/lowercase-i https://core.parts/os/letters/lowercase-l https://core.parts/os/letters/lowercase-e",
  "https://core.parts/os-95/windows/file-browser-0/menu-bar/file-menu?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/menu-bar/file-menu?layout": "https://core.parts/os-95/windows/file-browser-0/menu-bar/file-menu/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/menu-bar/file-menu?manifest": "https://core.parts/os-95/windows/file-browser-0/menu-bar/file-menu/manifest.uri",
  "https://core.parts/os-95/windows/file-browser-0/menu-bar?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/menu-bar?layout": "https://core.parts/os-95/windows/file-browser-0/menu-bar/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/menu-bar?manifest": "https://core.parts/os-95/windows/file-browser-0/menu-bar/manifest.uri",
  "https://core.parts/os-95/windows/file-browser-0/minimize-button/layout.css?down": "https://core.parts/os-95/windows/file-browser-0/minimize-button/down.txt",
  "https://core.parts/os-95/windows/file-browser-0/minimize-button/layout.css~": "`:host { position: relative; width: 16px; height: 14px; background: #c3c3c3; box-shadow: ${(''+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'} } :host::before { --color: black; display: block; position: absolute; content: ''; width: 6px; height: 2px; background: var(--color); top: 9px; left: 4px } :host(:hover)::before { --color: blue }`",
  "https://core.parts/os-95/windows/file-browser-0/minimize-button/manifest.uri": "",
  "https://core.parts/os-95/windows/file-browser-0/minimize-button/down.txt": "0",
  "https://core.parts/os-95/windows/file-browser-0/minimize-button/down-fx.uri": "https://core.parts/os-95/windows/file-browser-0/minimize-button/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/minimize-button/down.txt?fx": "https://core.parts/os-95/windows/file-browser-0/minimize-button/down-fx.uri",
  "https://core.parts/os-95/windows/file-browser-0/minimize-button/onclick.js": "()=>{Ω['https://core.parts/os-95/windows/file-browser-0/minimized.txt'] = '1' }",
  "https://core.parts/os-95/windows/file-browser-0/minimize-button/onpointerdown.js": "e => { e.stopPropagation(); Ω['https://core.parts/os-95/windows/file-browser-0/minimize-button/down.txt'] = '1'; Ω['https://core.parts/behaviors/release/src.uri'] = 'https://core.parts/os-95/windows/file-browser-0/minimize-button/release.js' }",
  "https://core.parts/os-95/windows/file-browser-0/minimize-button/release.js": "e => { Ω['https://core.parts/os-95/windows/file-browser-0/minimize-button/down.txt'] = '0' }",
  "https://core.parts/os-95/windows/file-browser-0/minimize-button?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/minimize-button?layout": "https://core.parts/os-95/windows/file-browser-0/minimize-button/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/minimize-button?manifest": "https://core.parts/os-95/windows/file-browser-0/minimize-button/manifest.uri",
  "https://core.parts/os-95/windows/file-browser-0/minimize-button?onclick": "https://core.parts/os-95/windows/file-browser-0/minimize-button/onclick.js",
  "https://core.parts/os-95/windows/file-browser-0/minimize-button?onpointerdown": "https://core.parts/os-95/windows/file-browser-0/minimize-button/onpointerdown.js",
  "https://core.parts/os-95/windows/file-browser-0/minimized.txt": "0",
  "https://core.parts/os-95/windows/file-browser-0/minimized/fx.url": "https://core.parts/os-95/manifest.uri https://core.parts/os-95/windows/file-browser-0/active.txt https://core.parts/os-95/taskbar-/start-menu/file-browser/onclick.js https://core.parts/os-95/taskbar-/file-browser/onclick.js",
  "https://core.parts/os-95/windows/file-browser-0/minimized.txt?fx": "https://core.parts/os-95/windows/file-browser-0/minimized/fx.url",
  "https://core.parts/os-95/windows/file-browser-0/pointer-transform.js": "({ clientX: x, clientY: y }) => {\n  const\n   grabState = JSON.parse('' + Ω['https://core.parts/os-95/windows/file-browser-0/grab.json']),\n   mousePosition = { x: Math.round(x), y: Math.round(y) };\n  let deltaPosition, finalPosition;\n  if (grabState.mode === 'move') {\n   deltaPosition = { x: grabState.start.x - grabState.x, y: grabState.start.y - grabState.y },\n    finalPosition = { x: Math.max(0, deltaPosition.x + mousePosition.x), y: Math.max(0, deltaPosition.y + mousePosition.y) };\n  }\n  else if (grabState.mode === 'n-resize') finalPosition = { y: Math.max(0, grabState.start.y - grabState.y + mousePosition.y), h: Math.max(64, grabState.start.h + (grabState.y - mousePosition.y)) }\n  else if (grabState.mode === 's-resize') finalPosition = { h: Math.max(64, grabState.start.h - (grabState.y - mousePosition.y)) }\n  else if (grabState.mode === 'e-resize') finalPosition = { w: Math.max(64, grabState.start.w - (grabState.x - mousePosition.x)) }\n  else if (grabState.mode === 'w-resize') finalPosition = { x: Math.max(0, grabState.start.x - grabState.x) + mousePosition.x, w: Math.max(64, grabState.start.w + (grabState.x - mousePosition.x)) }\n  else if (grabState.mode === 'ne-resize') finalPosition = { y: Math.max(0, grabState.start.y - grabState.y + mousePosition.y), h: Math.max(64, grabState.start.h + (grabState.y - mousePosition.y)), w: Math.max(64, grabState.start.w - (grabState.x - mousePosition.x)) }\n  else if (grabState.mode === 'se-resize') finalPosition = { h: Math.max(64, grabState.start.h - (grabState.y - mousePosition.y)), w: Math.max(64, grabState.start.w - (grabState.x - mousePosition.x)) }\n  else if (grabState.mode === 'nw-resize') finalPosition = { y: Math.max(0, grabState.start.y - grabState.y + mousePosition.y), h: Math.max(64, grabState.start.h + (grabState.y - mousePosition.y)), x: Math.max(0, grabState.start.x - grabState.x) + mousePosition.x, w: Math.max(64, grabState.start.w + (grabState.x - mousePosition.x)) }\n  else if (grabState.mode === 'sw-resize') finalPosition = { h: Math.max(64, grabState.start.h - (grabState.y - mousePosition.y)), x: Math.max(0, grabState.start.x - grabState.x) + mousePosition.x, w: Math.max(64, grabState.start.w + (grabState.x - mousePosition.x)) }\n  else throw new ReferenceError('No mode called ' + mode)\n  Ω['https://core.parts/os-95/windows/file-browser-0/position.json'] = JSON.stringify({ ...grabState.start, ...finalPosition })\n }",
  "https://core.parts/os-95/windows/file-browser-0/position.json": "{\"x\":136.64453125,\"y\":118.046875,\"w\":412.50390625,\"h\":245.48046875}",
  "https://core.parts/os-95/windows/file-browser-0/position/fx.uri": "https://core.parts/os-95/windows/file-browser-0/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/position.json?fx": "https://core.parts/os-95/windows/file-browser-0/position/fx.uri",
  "https://core.parts/os-95/windows/file-browser-0/resize-bottom-left/layout.css": ":host { position: absolute; bottom: -2px; left: -2px; width: 6px; height: 6px; cursor: nesw-resize }",
  "https://core.parts/os-95/windows/file-browser-0/resize-bottom-left/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/file-browser-0/position.json']); Ω['https://core.parts/os-95/windows/file-browser-0/grab.json'] = JSON.stringify({ x, y, start, mode: 'sw-resize' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/file-browser-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/file-browser-0/resize-bottom-left?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/resize-bottom-left?layout": "https://core.parts/os-95/windows/file-browser-0/resize-bottom-left/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/resize-bottom-left?onpointerdown": "https://core.parts/os-95/windows/file-browser-0/resize-bottom-left/onpointerdown.js",
  "https://core.parts/os-95/windows/file-browser-0/resize-bottom-right/layout.css": ":host { position: absolute; bottom: -2px; right: -2px; width: 6px; height: 6px; cursor: nwse-resize }",
  "https://core.parts/os-95/windows/file-browser-0/resize-bottom-right/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/file-browser-0/position.json']); Ω['https://core.parts/os-95/windows/file-browser-0/grab.json'] = JSON.stringify({ x, y, start, mode: 'se-resize' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/file-browser-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/file-browser-0/resize-bottom-right?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/resize-bottom-right?layout": "https://core.parts/os-95/windows/file-browser-0/resize-bottom-right/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/resize-bottom-right?onpointerdown": "https://core.parts/os-95/windows/file-browser-0/resize-bottom-right/onpointerdown.js",
  "https://core.parts/os-95/windows/file-browser-0/resize-bottom/layout.css": ":host { position: absolute; bottom: -2px; left: 4px; right: 4px; height: 6px; cursor: ns-resize }",
  "https://core.parts/os-95/windows/file-browser-0/resize-bottom/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/file-browser-0/position.json']); Ω['https://core.parts/os-95/windows/file-browser-0/grab.json'] = JSON.stringify({ x, y, start, mode: 's-resize' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/file-browser-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/file-browser-0/resize-bottom?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/resize-bottom?layout": "https://core.parts/os-95/windows/file-browser-0/resize-bottom/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/resize-bottom?onpointerdown": "https://core.parts/os-95/windows/file-browser-0/resize-bottom/onpointerdown.js",
  "https://core.parts/os-95/windows/file-browser-0/resize-left/layout.css": ":host { position: absolute; bottom: 4px; left: -2px; top: 4px; width: 6px; cursor: ew-resize }",
  "https://core.parts/os-95/windows/file-browser-0/resize-left/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/file-browser-0/position.json']); Ω['https://core.parts/os-95/windows/file-browser-0/grab.json'] = JSON.stringify({ x, y, start, mode: 'w-resize' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/file-browser-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/file-browser-0/resize-left?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/resize-left?layout": "https://core.parts/os-95/windows/file-browser-0/resize-left/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/resize-left?onpointerdown": "https://core.parts/os-95/windows/file-browser-0/resize-left/onpointerdown.js",
  "https://core.parts/os-95/windows/file-browser-0/resize-right/layout.css": ":host { position: absolute; bottom: 4px; right: -2px; top: 4px; width: 6px; cursor: ew-resize }",
  "https://core.parts/os-95/windows/file-browser-0/resize-right/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/file-browser-0/position.json']); Ω['https://core.parts/os-95/windows/file-browser-0/grab.json'] = JSON.stringify({ x, y, start, mode: 'e-resize' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/file-browser-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/file-browser-0/resize-right?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/resize-right?layout": "https://core.parts/os-95/windows/file-browser-0/resize-right/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/resize-right?onpointerdown": "https://core.parts/os-95/windows/file-browser-0/resize-right/onpointerdown.js",
  "https://core.parts/os-95/windows/file-browser-0/resize-top-left/layout.css": ":host { position: absolute; top: -2px; left: -2px; width: 6px; height: 6px; cursor: nwse-resize }",
  "https://core.parts/os-95/windows/file-browser-0/resize-top-left/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/file-browser-0/position.json']); Ω['https://core.parts/os-95/windows/file-browser-0/grab.json'] = JSON.stringify({ x, y, start, mode: 'nw-resize' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/file-browser-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/file-browser-0/resize-top-left?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/resize-top-left?layout": "https://core.parts/os-95/windows/file-browser-0/resize-top-left/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/resize-top-left?onpointerdown": "https://core.parts/os-95/windows/file-browser-0/resize-top-left/onpointerdown.js",
  "https://core.parts/os-95/windows/file-browser-0/resize-top-right/layout.css": ":host { position: absolute; top: -2px; right: -2px; width: 6px; height: 6px; cursor: nesw-resize }",
  "https://core.parts/os-95/windows/file-browser-0/resize-top-right/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/file-browser-0/position.json']); Ω['https://core.parts/os-95/windows/file-browser-0/grab.json'] = JSON.stringify({ x, y, start, mode: 'ne-resize' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/file-browser-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/file-browser-0/resize-top-right?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/resize-top-right?layout": "https://core.parts/os-95/windows/file-browser-0/resize-top-right/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/resize-top-right?onpointerdown": "https://core.parts/os-95/windows/file-browser-0/resize-top-right/onpointerdown.js",
  "https://core.parts/os-95/windows/file-browser-0/resize-top/layout.css": ":host { position: absolute; top: -2px; left: 4px; right: 4px; height: 6px; cursor: ns-resize }",
  "https://core.parts/os-95/windows/file-browser-0/resize-top/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/file-browser-0/position.json']); Ω['https://core.parts/os-95/windows/file-browser-0/grab.json'] = JSON.stringify({ x, y, start, mode: 'n-resize' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/file-browser-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/file-browser-0/resize-top?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/resize-top?layout": "https://core.parts/os-95/windows/file-browser-0/resize-top/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/resize-top?onpointerdown": "https://core.parts/os-95/windows/file-browser-0/resize-top/onpointerdown.js",
  "https://core.parts/os-95/windows/file-browser-0/restore-button/layout.css?down": "https://core.parts/os-95/windows/file-browser-0/restore-button/down.txt",
  "https://core.parts/os-95/windows/file-browser-0/restore-button/layout.css~": "`:host { position: relative; width: 16px; height: 14px; background: #c3c3c3; box-shadow: ${(''+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'} } :host::before, :host::after { --color: black; display: block; position: absolute; content: ''; width: 6px; height: 6px; top: 5px; left: 3px; box-shadow: inset 0 2px var(--color), inset 0 0 0 1px var(--color); background: #c3c3c3 } :host::before { top: 2px; left: 5px } :host(:hover)::before, :host(:hover)::after { --color: blue }`",
  "https://core.parts/os-95/windows/file-browser-0/restore-button/manifest.uri": "",
  "https://core.parts/os-95/windows/file-browser-0/restore-button/down.txt": "0",
  "https://core.parts/os-95/windows/file-browser-0/restore-button/down-fx.uri": "https://core.parts/os-95/windows/file-browser-0/restore-button/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/restore-button/down.txt?fx": "https://core.parts/os-95/windows/file-browser-0/restore-button/down-fx.uri",
  "https://core.parts/os-95/windows/file-browser-0/restore-button/onclick.js": "()=>Ω['https://core.parts/os-95/windows/file-browser-0/maximized.txt'] = '0'",
  "https://core.parts/os-95/windows/file-browser-0/restore-button/onpointerdown.js": "e => { e.stopPropagation(); Ω['https://core.parts/os-95/windows/file-browser-0/restore-button/down.txt'] = '1'; Ω['https://core.parts/behaviors/release/src.uri'] = 'https://core.parts/os-95/windows/file-browser-0/restore-button/release.js' }",
  "https://core.parts/os-95/windows/file-browser-0/restore-button/release.js": "e => { Ω['https://core.parts/os-95/windows/file-browser-0/restore-button/down.txt'] = '0' }",
  "https://core.parts/os-95/windows/file-browser-0/restore-button?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/restore-button?layout": "https://core.parts/os-95/windows/file-browser-0/restore-button/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/restore-button?manifest": "https://core.parts/os-95/windows/file-browser-0/restore-button/manifest.uri",
  "https://core.parts/os-95/windows/file-browser-0/restore-button?onclick": "https://core.parts/os-95/windows/file-browser-0/restore-button/onclick.js",
  "https://core.parts/os-95/windows/file-browser-0/restore-button?onpointerdown": "https://core.parts/os-95/windows/file-browser-0/restore-button/onpointerdown.js",
  "https://core.parts/os-95/windows/file-browser-0/status-bar/layout.css~": "`:host { padding: 0 3px; height: 17px; box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a; display: flex; flex-flow: row nowrap; align-items: center; } :host::after { content: '${file_count} file${''+file_count === '1' ? '' : 's'}, ${folder_count} folder${''+folder_count === '1' ? '' : 's'}, ${kireji_count} kireji' }`",
  "https://core.parts/os-95/windows/file-browser-0/status-bar/layout.css?file_count": "https://core.parts/os-95/windows/file-browser-0/status/file_count.txt",
  "https://core.parts/os-95/windows/file-browser-0/status-bar/layout.css?folder_count": "https://core.parts/os-95/windows/file-browser-0/status/folder_count.txt",
  "https://core.parts/os-95/windows/file-browser-0/status-bar/layout.css?kireji_count": "https://core.parts/os-95/windows/file-browser-0/status/kireji_count.txt",
  "https://core.parts/os-95/windows/file-browser-0/status/file_count.txt": "2",
  "https://core.parts/os-95/windows/file-browser-0/status/file_count.txt?fx": "https://core.parts/os-95/windows/file-browser-0/status/fx.uri",
  "https://core.parts/os-95/windows/file-browser-0/status/folder_count.txt": "3",
  "https://core.parts/os-95/windows/file-browser-0/status/folder_count.txt?fx": "https://core.parts/os-95/windows/file-browser-0/status/fx.uri",
  "https://core.parts/os-95/windows/file-browser-0/status/kireji_count.txt": "1",
  "https://core.parts/os-95/windows/file-browser-0/status/kireji_count.txt?fx": "https://core.parts/os-95/windows/file-browser-0/status/fx.uri",
  "https://core.parts/os-95/windows/file-browser-0/status/fx.uri": "https://core.parts/os-95/windows/file-browser-0/status-bar/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/status-bar/manifest.uri": "",
  "https://core.parts/os-95/windows/file-browser-0/status-bar?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/status-bar?layout": "https://core.parts/os-95/windows/file-browser-0/status-bar/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/status-bar?manifest": "https://core.parts/os-95/windows/file-browser-0/status-bar/manifest.uri",
  "https://core.parts/os-95/windows/file-browser-0/title-bar/css-fx.uri": "https://core.parts/os-95/windows/file-browser-0/title-bar",
  "https://core.parts/os-95/windows/file-browser-0/title-bar/layout.css?focus": "https://core.parts/os-95/windows/file-browser-0/active.txt",
  "https://core.parts/os-95/windows/file-browser-0/title-bar/layout.css~": "`:host { background: ${(''+focus) === '1' ? 'rgb(0, 0, 163)' : '#7f7f7f'}; color: white; display: flex; flex-flow: row nowrap; align-items: center; gap: 3px; height: 18px; padding: 0px 2px; box-sizing: border-box; } app-icon { width: 16px; height: 16px }`",
  "https://core.parts/os-95/windows/file-browser-0/title-bar/manifest.uri": "https://core.parts/os/icons/folder-icon https://core.parts/os-95/programs/file-browser/app-label  https://core.parts/flex-spacer https://core.parts/os-95/windows/file-browser-0/window-controls",
  "https://core.parts/os-95/windows/file-browser-0/title-bar/ondblclick.js?maximized": "https://core.parts/os-95/windows/file-browser-0/maximized.txt",
  "https://core.parts/os-95/windows/file-browser-0/title-bar/ondblclick.js~": "`() => { Ω['https://core.parts/os-95/windows/file-browser-0/${(''+maximized) === '1' ? 'restore' : 'maximize'}-button/onclick.js']() }`",
  "https://core.parts/os-95/windows/file-browser-0/title-bar/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/file-browser-0/position.json']); Ω['https://core.parts/os-95/windows/file-browser-0/grab.json'] = JSON.stringify({ x, y, start, mode: 'move' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/file-browser-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/file-browser-0/title-bar?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/title-bar?layout": "https://core.parts/os-95/windows/file-browser-0/title-bar/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/title-bar?manifest": "https://core.parts/os-95/windows/file-browser-0/title-bar/manifest.uri",
  "https://core.parts/os-95/windows/file-browser-0/title-bar?ondblclick": "https://core.parts/os-95/windows/file-browser-0/title-bar/ondblclick.js",
  "https://core.parts/os-95/windows/file-browser-0/title-bar?onpointerdown": "https://core.parts/os-95/windows/file-browser-0/title-bar/onpointerdown.js",
  "https://core.parts/os-95/windows/file-browser-0/window-controls/layout.css": ":host { display: flex; flex-flow: row nowrap }",
  "https://core.parts/os-95/windows/file-browser-0/window-controls/manifest.uri?maximized": "https://core.parts/os-95/windows/file-browser-0/maximized.txt",
  "https://core.parts/os-95/windows/file-browser-0/window-controls/manifest.uri~": "`https://core.parts/os-95/windows/file-browser-0/minimize-button https://core.parts/os-95/windows/file-browser-0/${(''+maximized) === '1' ? 'restore' : 'maximize'}-button https://core.parts/os-95/windows/file-browser-0/exit-button`",
  "https://core.parts/os-95/windows/file-browser-0/window-controls?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0/window-controls?layout": "https://core.parts/os-95/windows/file-browser-0/window-controls/layout.css",
  "https://core.parts/os-95/windows/file-browser-0/window-controls?manifest": "https://core.parts/os-95/windows/file-browser-0/window-controls/manifest.uri",
  "https://core.parts/os-95/windows/file-browser-0?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/file-browser-0?layout": "https://core.parts/os-95/windows/file-browser-0/layout.css",
  "https://core.parts/os-95/windows/file-browser-0?manifest": "https://core.parts/os-95/windows/file-browser-0/manifest.uri",
  "https://core.parts/os-95/windows/file-browser-0?onpointerdown": "https://core.parts/os-95/windows/file-browser-0/onpointerdown.js",
  "https://core.parts/os-95/windows/open.uri": "https://core.parts/os-95/taskbar-/file-browser https://core.parts/os-95/taskbar-/graph-editor",
  "https://core.parts/os-95/windows/graph-editor-0/layout.css?maximized": "https://core.parts/os-95/windows/graph-editor-0/maximized.txt",
  "https://core.parts/os-95/windows/graph-editor-0/layout.css?position": "https://core.parts/os-95/windows/graph-editor-0/position.json",
  "https://core.parts/os-95/windows/graph-editor-0/layout.css~": "{\n  const common = \"position: absolute; display: flex; flex-flow: column nowrap; gap: 2px; background: #c3c3c3; box-sizing: border-box\"\n  if (('' + maximized) === '1') {\n   return `:host { position: absolute; top: 0; left: 0; right: 0; bottom: 28px; padding: 2px; ${common} }`\n  } else {\n   const { x, y, w, h } = JSON.parse('' + position);\n   return `:host { width: ${w}px; height: ${h}px; left: ${x}px; top: ${y}px; min-height: fit-content; padding: 4px; background: #c3c3c3; box-shadow: inset -1px -1px black, inset 1px 1px #c3c3c3, inset -2px -2px #7a7a7a, inset 2px 2px white; ${common} }`\n  }\n }",
  "https://core.parts/os-95/windows/graph-editor-0/manifest.uri~": "`https://core.parts/os-95/windows/graph-editor-0/title-bar https://core.parts/flex-spacer https://core.parts/os-95/windows/graph-editor-0/resize-top https://core.parts/os-95/windows/graph-editor-0/resize-bottom https://core.parts/os-95/windows/graph-editor-0/resize-left https://core.parts/os-95/windows/graph-editor-0/resize-right https://core.parts/os-95/windows/graph-editor-0/resize-top-right https://core.parts/os-95/windows/graph-editor-0/resize-bottom-right https://core.parts/os-95/windows/graph-editor-0/resize-top-left https://core.parts/os-95/windows/graph-editor-0/resize-bottom-left`",
  "https://core.parts/os-95/windows/graph-editor-0/onpointerdown.js?index": "https://core.parts/os-95/taskbar-/graph-editor/index.txt",
  "https://core.parts/os-95/windows/graph-editor-0/onpointerdown.js?selected": "https://core.parts/os-95/taskbar-/selected.txt",
  "https://core.parts/os-95/windows/graph-editor-0/onpointerdown.js~": "`() => { ${(''+selected) === (''+index) ? '' : `Ω['${selected.headerOf().href}'] = '${''+index}'`} }`",
  "https://core.parts/os-95/windows/graph-editor-0/active.txt?fx": "https://core.parts/os-95/taskbar-/graph-editor/open/fx.uri",
  "https://core.parts/os-95/windows/graph-editor-0/active.txt?index": "https://core.parts/os-95/taskbar-/graph-editor/index.txt",
  "https://core.parts/os-95/windows/graph-editor-0/active.txt?minimized": "https://core.parts/os-95/windows/graph-editor-0/minimized.txt",
  "https://core.parts/os-95/windows/graph-editor-0/active.txt?selected": "https://core.parts/os-95/taskbar-/selected.txt",
  "https://core.parts/os-95/windows/graph-editor-0/active.txt~": "('' + minimized) === '1' ? '0' : ('' + selected) === ('' + index) ? '1' : '0'",
  "https://core.parts/os-95/windows/graph-editor-0/exit-button/layout.css": ":host { position: relative; width: 16px; height: 14px; background: #c3c3c3; margin-left: 2px; box-shadow: inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb } :host::before, :host::after { --color: #7f7f7f; content: ''; display: block; position: absolute; width: 8px; height: 7px; left: 4px; top: 3px; background: linear-gradient(to top left, transparent 0%, transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%), linear-gradient(to top right,  transparent 0%,  transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%) } :host::before { --color: white; left: 5px; top: 4px }",
  "https://core.parts/os-95/windows/graph-editor-0/exit-button/manifest.uri": "",
  "https://core.parts/os-95/windows/graph-editor-0/exit-button?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/graph-editor-0/exit-button?layout": "https://core.parts/os-95/windows/graph-editor-0/exit-button/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/exit-button?manifest": "https://core.parts/os-95/windows/graph-editor-0/exit-button/manifest.uri",
  "https://core.parts/os-95/windows/graph-editor-0/grab.json": "{\"x\":514.88671875,\"y\":328.80859375,\"start\":{\"x\":136.64453125,\"y\":118.046875,\"w\":377.390625,\"h\":212.2890625},\"mode\":\"se-resize\"}",
  "https://core.parts/os-95/windows/graph-editor-0/maximize-button/layout.css?down": "https://core.parts/os-95/windows/graph-editor-0/maximize-button/down.txt",
  "https://core.parts/os-95/windows/graph-editor-0/maximize-button/layout.css~": "`:host { position: relative; width: 16px; height: 14px; background: #c3c3c3; box-shadow: ${(''+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'} } :host::before { --color: black; display: block; position: absolute; content: ''; width: 9px; height: 9px; top: 2px; left: 3px; box-shadow: inset 0 2px var(--color), inset 0 0 0 1px var(--color) } :host(:hover)::before { --color: blue }`",
  "https://core.parts/os-95/windows/graph-editor-0/maximize-button/manifest.uri": "",
  "https://core.parts/os-95/windows/graph-editor-0/maximize-button/down.txt": "0",
  "https://core.parts/os-95/windows/graph-editor-0/maximize-button/down-fx.uri": "https://core.parts/os-95/windows/graph-editor-0/maximize-button/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/maximize-button/down.txt?fx": "https://core.parts/os-95/windows/graph-editor-0/maximize-button/down-fx.uri",
  "https://core.parts/os-95/windows/graph-editor-0/maximize-button/onclick.js": "()=>{Ω['https://core.parts/os-95/windows/graph-editor-0/maximized.txt'] = '1' }",
  "https://core.parts/os-95/windows/graph-editor-0/maximize-button/onpointerdown.js": "e => { e.stopPropagation(); Ω['https://core.parts/os-95/windows/graph-editor-0/maximize-button/down.txt'] = '1'; Ω['https://core.parts/behaviors/release/src.uri'] = 'https://core.parts/os-95/windows/graph-editor-0/maximize-button/release.js' }",
  "https://core.parts/os-95/windows/graph-editor-0/maximize-button/release.js": "e => { Ω['https://core.parts/os-95/windows/graph-editor-0/maximize-button/down.txt'] = '0' }",
  "https://core.parts/os-95/windows/graph-editor-0/maximize-button?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/graph-editor-0/maximize-button?layout": "https://core.parts/os-95/windows/graph-editor-0/maximize-button/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/maximize-button?manifest": "https://core.parts/os-95/windows/graph-editor-0/maximize-button/manifest.uri",
  "https://core.parts/os-95/windows/graph-editor-0/maximize-button?onclick": "https://core.parts/os-95/windows/graph-editor-0/maximize-button/onclick.js",
  "https://core.parts/os-95/windows/graph-editor-0/maximize-button?onpointerdown": "https://core.parts/os-95/windows/graph-editor-0/maximize-button/onpointerdown.js",
  "https://core.parts/os-95/windows/graph-editor-0/maximized.txt": "0",
  "https://core.parts/os-95/windows/graph-editor-0/maximized/fx.url": "https://core.parts/os-95/windows/graph-editor-0/layout.css https://core.parts/os-95/windows/graph-editor-0/window-controls/manifest.uri https://core.parts/os-95/windows/graph-editor-0/title-bar/ondblclick.js",
  "https://core.parts/os-95/windows/graph-editor-0/maximized.txt?fx": "https://core.parts/os-95/windows/graph-editor-0/maximized/fx.url",
  "https://core.parts/os-95/windows/graph-editor-0/minimize-button/layout.css?down": "https://core.parts/os-95/windows/graph-editor-0/minimize-button/down.txt",
  "https://core.parts/os-95/windows/graph-editor-0/minimize-button/layout.css~": "`:host { position: relative; width: 16px; height: 14px; background: #c3c3c3; box-shadow: ${(''+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'} } :host::before { --color: black; display: block; position: absolute; content: ''; width: 6px; height: 2px; background: var(--color); top: 9px; left: 4px } :host(:hover)::before { --color: blue }`",
  "https://core.parts/os-95/windows/graph-editor-0/minimize-button/manifest.uri": "",
  "https://core.parts/os-95/windows/graph-editor-0/minimize-button/down.txt": "0",
  "https://core.parts/os-95/windows/graph-editor-0/minimize-button/down-fx.uri": "https://core.parts/os-95/windows/graph-editor-0/minimize-button/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/minimize-button/down.txt?fx": "https://core.parts/os-95/windows/graph-editor-0/minimize-button/down-fx.uri",
  "https://core.parts/os-95/windows/graph-editor-0/minimize-button/onclick.js": "()=>{Ω['https://core.parts/os-95/windows/graph-editor-0/minimized.txt'] = '1' }",
  "https://core.parts/os-95/windows/graph-editor-0/minimize-button/onpointerdown.js": "e => { e.stopPropagation(); Ω['https://core.parts/os-95/windows/graph-editor-0/minimize-button/down.txt'] = '1'; Ω['https://core.parts/behaviors/release/src.uri'] = 'https://core.parts/os-95/windows/graph-editor-0/minimize-button/release.js' }",
  "https://core.parts/os-95/windows/graph-editor-0/minimize-button/release.js": "e => { Ω['https://core.parts/os-95/windows/graph-editor-0/minimize-button/down.txt'] = '0' }",
  "https://core.parts/os-95/windows/graph-editor-0/minimize-button?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/graph-editor-0/minimize-button?layout": "https://core.parts/os-95/windows/graph-editor-0/minimize-button/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/minimize-button?manifest": "https://core.parts/os-95/windows/graph-editor-0/minimize-button/manifest.uri",
  "https://core.parts/os-95/windows/graph-editor-0/minimize-button?onclick": "https://core.parts/os-95/windows/graph-editor-0/minimize-button/onclick.js",
  "https://core.parts/os-95/windows/graph-editor-0/minimize-button?onpointerdown": "https://core.parts/os-95/windows/graph-editor-0/minimize-button/onpointerdown.js",
  "https://core.parts/os-95/windows/graph-editor-0/minimized.txt": "1",
  "https://core.parts/os-95/windows/graph-editor-0/minimized/fx.url": "https://core.parts/os-95/manifest.uri https://core.parts/os-95/windows/graph-editor-0/active.txt https://core.parts/os-95/taskbar-/start-menu/graph-editor/onclick.js https://core.parts/os-95/taskbar-/graph-editor/onclick.js",
  "https://core.parts/os-95/windows/graph-editor-0/minimized.txt?fx": "https://core.parts/os-95/windows/graph-editor-0/minimized/fx.url",
  "https://core.parts/os-95/windows/graph-editor-0/pointer-transform.js": "({ clientX: x, clientY: y }) => {\n  const\n   grabState = JSON.parse('' + Ω['https://core.parts/os-95/windows/graph-editor-0/grab.json']),\n   mousePosition = { x: Math.round(x), y: Math.round(y) };\n  let deltaPosition, finalPosition;\n  if (grabState.mode === 'move') {\n   deltaPosition = { x: grabState.start.x - grabState.x, y: grabState.start.y - grabState.y },\n    finalPosition = { x: Math.max(0, deltaPosition.x + mousePosition.x), y: Math.max(0, deltaPosition.y + mousePosition.y) };\n  }\n  else if (grabState.mode === 'n-resize') finalPosition = { y: Math.max(0, grabState.start.y - grabState.y + mousePosition.y), h: Math.max(64, grabState.start.h + (grabState.y - mousePosition.y)) }\n  else if (grabState.mode === 's-resize') finalPosition = { h: Math.max(64, grabState.start.h - (grabState.y - mousePosition.y)) }\n  else if (grabState.mode === 'e-resize') finalPosition = { w: Math.max(64, grabState.start.w - (grabState.x - mousePosition.x)) }\n  else if (grabState.mode === 'w-resize') finalPosition = { x: Math.max(0, grabState.start.x - grabState.x) + mousePosition.x, w: Math.max(64, grabState.start.w + (grabState.x - mousePosition.x)) }\n  else if (grabState.mode === 'ne-resize') finalPosition = { y: Math.max(0, grabState.start.y - grabState.y + mousePosition.y), h: Math.max(64, grabState.start.h + (grabState.y - mousePosition.y)), w: Math.max(64, grabState.start.w - (grabState.x - mousePosition.x)) }\n  else if (grabState.mode === 'se-resize') finalPosition = { h: Math.max(64, grabState.start.h - (grabState.y - mousePosition.y)), w: Math.max(64, grabState.start.w - (grabState.x - mousePosition.x)) }\n  else if (grabState.mode === 'nw-resize') finalPosition = { y: Math.max(0, grabState.start.y - grabState.y + mousePosition.y), h: Math.max(64, grabState.start.h + (grabState.y - mousePosition.y)), x: Math.max(0, grabState.start.x - grabState.x) + mousePosition.x, w: Math.max(64, grabState.start.w + (grabState.x - mousePosition.x)) }\n  else if (grabState.mode === 'sw-resize') finalPosition = { h: Math.max(64, grabState.start.h - (grabState.y - mousePosition.y)), x: Math.max(0, grabState.start.x - grabState.x) + mousePosition.x, w: Math.max(64, grabState.start.w + (grabState.x - mousePosition.x)) }\n  else throw new ReferenceError('No mode called ' + mode)\n  Ω['https://core.parts/os-95/windows/graph-editor-0/position.json'] = JSON.stringify({ ...grabState.start, ...finalPosition })\n }",
  "https://core.parts/os-95/windows/graph-editor-0/position.json": "{\"x\":128,\"y\":128,\"w\":256,\"h\":256}",
  "https://core.parts/os-95/windows/graph-editor-0/position/fx.uri": "https://core.parts/os-95/windows/graph-editor-0/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/position.json?fx": "https://core.parts/os-95/windows/graph-editor-0/position/fx.uri",
  "https://core.parts/os-95/windows/graph-editor-0/resize-bottom-left/layout.css": ":host { position: absolute; bottom: -2px; left: -2px; width: 6px; height: 6px; cursor: nesw-resize }",
  "https://core.parts/os-95/windows/graph-editor-0/resize-bottom-left/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/graph-editor-0/position.json']); Ω['https://core.parts/os-95/windows/graph-editor-0/grab.json'] = JSON.stringify({ x, y, start, mode: 'sw-resize' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/graph-editor-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/graph-editor-0/resize-bottom-left?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/graph-editor-0/resize-bottom-left?layout": "https://core.parts/os-95/windows/graph-editor-0/resize-bottom-left/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/resize-bottom-left?onpointerdown": "https://core.parts/os-95/windows/graph-editor-0/resize-bottom-left/onpointerdown.js",
  "https://core.parts/os-95/windows/graph-editor-0/resize-bottom-right/layout.css": ":host { position: absolute; bottom: -2px; right: -2px; width: 6px; height: 6px; cursor: nwse-resize }",
  "https://core.parts/os-95/windows/graph-editor-0/resize-bottom-right/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/graph-editor-0/position.json']); Ω['https://core.parts/os-95/windows/graph-editor-0/grab.json'] = JSON.stringify({ x, y, start, mode: 'se-resize' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/graph-editor-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/graph-editor-0/resize-bottom-right?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/graph-editor-0/resize-bottom-right?layout": "https://core.parts/os-95/windows/graph-editor-0/resize-bottom-right/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/resize-bottom-right?onpointerdown": "https://core.parts/os-95/windows/graph-editor-0/resize-bottom-right/onpointerdown.js",
  "https://core.parts/os-95/windows/graph-editor-0/resize-bottom/layout.css": ":host { position: absolute; bottom: -2px; left: 4px; right: 4px; height: 6px; cursor: ns-resize }",
  "https://core.parts/os-95/windows/graph-editor-0/resize-bottom/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/graph-editor-0/position.json']); Ω['https://core.parts/os-95/windows/graph-editor-0/grab.json'] = JSON.stringify({ x, y, start, mode: 's-resize' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/graph-editor-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/graph-editor-0/resize-bottom?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/graph-editor-0/resize-bottom?layout": "https://core.parts/os-95/windows/graph-editor-0/resize-bottom/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/resize-bottom?onpointerdown": "https://core.parts/os-95/windows/graph-editor-0/resize-bottom/onpointerdown.js",
  "https://core.parts/os-95/windows/graph-editor-0/resize-left/layout.css": ":host { position: absolute; bottom: 4px; left: -2px; top: 4px; width: 6px; cursor: ew-resize }",
  "https://core.parts/os-95/windows/graph-editor-0/resize-left/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/graph-editor-0/position.json']); Ω['https://core.parts/os-95/windows/graph-editor-0/grab.json'] = JSON.stringify({ x, y, start, mode: 'w-resize' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/graph-editor-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/graph-editor-0/resize-left?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/graph-editor-0/resize-left?layout": "https://core.parts/os-95/windows/graph-editor-0/resize-left/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/resize-left?onpointerdown": "https://core.parts/os-95/windows/graph-editor-0/resize-left/onpointerdown.js",
  "https://core.parts/os-95/windows/graph-editor-0/resize-right/layout.css": ":host { position: absolute; bottom: 4px; right: -2px; top: 4px; width: 6px; cursor: ew-resize }",
  "https://core.parts/os-95/windows/graph-editor-0/resize-right/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/graph-editor-0/position.json']); Ω['https://core.parts/os-95/windows/graph-editor-0/grab.json'] = JSON.stringify({ x, y, start, mode: 'e-resize' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/graph-editor-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/graph-editor-0/resize-right?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/graph-editor-0/resize-right?layout": "https://core.parts/os-95/windows/graph-editor-0/resize-right/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/resize-right?onpointerdown": "https://core.parts/os-95/windows/graph-editor-0/resize-right/onpointerdown.js",
  "https://core.parts/os-95/windows/graph-editor-0/resize-top-left/layout.css": ":host { position: absolute; top: -2px; left: -2px; width: 6px; height: 6px; cursor: nwse-resize }",
  "https://core.parts/os-95/windows/graph-editor-0/resize-top-left/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/graph-editor-0/position.json']); Ω['https://core.parts/os-95/windows/graph-editor-0/grab.json'] = JSON.stringify({ x, y, start, mode: 'nw-resize' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/graph-editor-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/graph-editor-0/resize-top-left?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/graph-editor-0/resize-top-left?layout": "https://core.parts/os-95/windows/graph-editor-0/resize-top-left/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/resize-top-left?onpointerdown": "https://core.parts/os-95/windows/graph-editor-0/resize-top-left/onpointerdown.js",
  "https://core.parts/os-95/windows/graph-editor-0/resize-top-right/layout.css": ":host { position: absolute; top: -2px; right: -2px; width: 6px; height: 6px; cursor: nesw-resize }",
  "https://core.parts/os-95/windows/graph-editor-0/resize-top-right/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/graph-editor-0/position.json']); Ω['https://core.parts/os-95/windows/graph-editor-0/grab.json'] = JSON.stringify({ x, y, start, mode: 'ne-resize' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/graph-editor-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/graph-editor-0/resize-top-right?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/graph-editor-0/resize-top-right?layout": "https://core.parts/os-95/windows/graph-editor-0/resize-top-right/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/resize-top-right?onpointerdown": "https://core.parts/os-95/windows/graph-editor-0/resize-top-right/onpointerdown.js",
  "https://core.parts/os-95/windows/graph-editor-0/resize-top/layout.css": ":host { position: absolute; top: -2px; left: 4px; right: 4px; height: 6px; cursor: ns-resize }",
  "https://core.parts/os-95/windows/graph-editor-0/resize-top/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/graph-editor-0/position.json']); Ω['https://core.parts/os-95/windows/graph-editor-0/grab.json'] = JSON.stringify({ x, y, start, mode: 'n-resize' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/graph-editor-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/graph-editor-0/resize-top?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/graph-editor-0/resize-top?layout": "https://core.parts/os-95/windows/graph-editor-0/resize-top/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/resize-top?onpointerdown": "https://core.parts/os-95/windows/graph-editor-0/resize-top/onpointerdown.js",
  "https://core.parts/os-95/windows/graph-editor-0/restore-button/layout.css?down": "https://core.parts/os-95/windows/graph-editor-0/restore-button/down.txt",
  "https://core.parts/os-95/windows/graph-editor-0/restore-button/layout.css~": "`:host { position: relative; width: 16px; height: 14px; background: #c3c3c3; box-shadow: ${(''+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'} } :host::before, :host::after { --color: black; display: block; position: absolute; content: ''; width: 6px; height: 6px; top: 5px; left: 3px; box-shadow: inset 0 2px var(--color), inset 0 0 0 1px var(--color); background: #c3c3c3 } :host::before { top: 2px; left: 5px } :host(:hover)::before, :host(:hover)::after { --color: blue }`",
  "https://core.parts/os-95/windows/graph-editor-0/restore-button/manifest.uri": "",
  "https://core.parts/os-95/windows/graph-editor-0/restore-button/down.txt": "0",
  "https://core.parts/os-95/windows/graph-editor-0/restore-button/down-fx.uri": "https://core.parts/os-95/windows/graph-editor-0/restore-button/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/restore-button/down.txt?fx": "https://core.parts/os-95/windows/graph-editor-0/restore-button/down-fx.uri",
  "https://core.parts/os-95/windows/graph-editor-0/restore-button/onclick.js": "()=>Ω['https://core.parts/os-95/windows/graph-editor-0/maximized.txt'] = '0'",
  "https://core.parts/os-95/windows/graph-editor-0/restore-button/onpointerdown.js": "e => { e.stopPropagation(); Ω['https://core.parts/os-95/windows/graph-editor-0/restore-button/down.txt'] = '1'; Ω['https://core.parts/behaviors/release/src.uri'] = 'https://core.parts/os-95/windows/graph-editor-0/restore-button/release.js' }",
  "https://core.parts/os-95/windows/graph-editor-0/restore-button/release.js": "e => { Ω['https://core.parts/os-95/windows/graph-editor-0/restore-button/down.txt'] = '0' }",
  "https://core.parts/os-95/windows/graph-editor-0/restore-button?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/graph-editor-0/restore-button?layout": "https://core.parts/os-95/windows/graph-editor-0/restore-button/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/restore-button?manifest": "https://core.parts/os-95/windows/graph-editor-0/restore-button/manifest.uri",
  "https://core.parts/os-95/windows/graph-editor-0/restore-button?onclick": "https://core.parts/os-95/windows/graph-editor-0/restore-button/onclick.js",
  "https://core.parts/os-95/windows/graph-editor-0/restore-button?onpointerdown": "https://core.parts/os-95/windows/graph-editor-0/restore-button/onpointerdown.js",
  "https://core.parts/os-95/windows/graph-editor-0/title-bar/css-fx.uri": "https://core.parts/os-95/windows/graph-editor-0/title-bar",
  "https://core.parts/os-95/windows/graph-editor-0/title-bar/layout.css?focus": "https://core.parts/os-95/windows/graph-editor-0/active.txt",
  "https://core.parts/os-95/windows/graph-editor-0/title-bar/layout.css~": "`:host { background: ${(''+focus) === '1' ? 'rgb(0, 0, 163)' : '#7f7f7f'}; color: white; display: flex; flex-flow: row nowrap; align-items: center; gap: 3px; height: 18px; padding: 0px 2px; box-sizing: border-box; } app-icon { width: 16px; height: 16px }`",
  "https://core.parts/os-95/windows/graph-editor-0/title-bar/manifest.uri": "https://core.parts/os-95/programs/graph-editor/app-icon https://core.parts/os-95/programs/graph-editor/app-label  https://core.parts/flex-spacer https://core.parts/os-95/windows/graph-editor-0/window-controls",
  "https://core.parts/os-95/windows/graph-editor-0/title-bar/ondblclick.js?maximized": "https://core.parts/os-95/windows/graph-editor-0/maximized.txt",
  "https://core.parts/os-95/windows/graph-editor-0/title-bar/ondblclick.js~": "`() => { Ω['https://core.parts/os-95/windows/graph-editor-0/${(''+maximized) === '1' ? 'restore' : 'maximize'}-button/onclick.js']() }`",
  "https://core.parts/os-95/windows/graph-editor-0/title-bar/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os-95/windows/graph-editor-0/position.json']); Ω['https://core.parts/os-95/windows/graph-editor-0/grab.json'] = JSON.stringify({ x, y, start, mode: 'move' }); Ω['https://core.parts/behaviors/grab/src.uri'] = 'https://core.parts/os-95/windows/graph-editor-0/pointer-transform.js' }`",
  "https://core.parts/os-95/windows/graph-editor-0/title-bar?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/graph-editor-0/title-bar?layout": "https://core.parts/os-95/windows/graph-editor-0/title-bar/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/title-bar?manifest": "https://core.parts/os-95/windows/graph-editor-0/title-bar/manifest.uri",
  "https://core.parts/os-95/windows/graph-editor-0/title-bar?ondblclick": "https://core.parts/os-95/windows/graph-editor-0/title-bar/ondblclick.js",
  "https://core.parts/os-95/windows/graph-editor-0/title-bar?onpointerdown": "https://core.parts/os-95/windows/graph-editor-0/title-bar/onpointerdown.js",
  "https://core.parts/os-95/windows/graph-editor-0/window-controls/layout.css": ":host { display: flex; flex-flow: row nowrap }",
  "https://core.parts/os-95/windows/graph-editor-0/window-controls/manifest.uri?maximized": "https://core.parts/os-95/windows/graph-editor-0/maximized.txt",
  "https://core.parts/os-95/windows/graph-editor-0/window-controls/manifest.uri~": "`https://core.parts/os-95/windows/graph-editor-0/minimize-button https://core.parts/os-95/windows/graph-editor-0/${(''+maximized) === '1' ? 'restore' : 'maximize'}-button https://core.parts/os-95/windows/graph-editor-0/exit-button`",
  "https://core.parts/os-95/windows/graph-editor-0/window-controls?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/graph-editor-0/window-controls?layout": "https://core.parts/os-95/windows/graph-editor-0/window-controls/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0/window-controls?manifest": "https://core.parts/os-95/windows/graph-editor-0/window-controls/manifest.uri",
  "https://core.parts/os-95/windows/graph-editor-0?core": "https://core.parts/core-part",
  "https://core.parts/os-95/windows/graph-editor-0?layout": "https://core.parts/os-95/windows/graph-editor-0/layout.css",
  "https://core.parts/os-95/windows/graph-editor-0?manifest": "https://core.parts/os-95/windows/graph-editor-0/manifest.uri",
  "https://core.parts/os-95/windows/graph-editor-0?onpointerdown": "https://core.parts/os-95/windows/graph-editor-0/onpointerdown.js",
  "https://core.parts/os-95/taskbar-/selected/fx.uri": "https://core.parts/os/start-menu/open.txt https://core.parts/os-95/windows/file-browser-0/active.txt https://core.parts/os-95/windows/file-browser-0/onpointerdown.js https://core.parts/os-95/windows/graph-editor-0/active.txt https://core.parts/os-95/windows/graph-editor-0/onpointerdown.js https://core.parts/os-95/desktop-/onclick.js",
  "https://core.parts/os/start-menu/open-fx.uri": "https://core.parts/os-95/taskbar-/start-button/layout.css https://core.parts/os-95/taskbar-/selected.txt https://core.parts/os-95/manifest.uri",
  "https://core.parts/os/start-menu/open.txt?fx": "https://core.parts/os/start-menu/open-fx.uri",
  "https://core.parts/os/start-menu/open.txt?selected": "https://core.parts/os-95/taskbar-/selected.txt",
  "https://core.parts/os/start-menu/open.txt~": "('' + selected) === '0' ? '1' : '0'",
  "https://core.parts/os-95/taskbar-/css-height.txt": "28px",
  "https://core.parts/os-95/taskbar-/css-height/fx.uri": "https://core.parts/layout.css https://core.parts/os-95/taskbar-/start-menu/layout.css",
  "https://core.parts/os-95/taskbar-/selected.txt": "1",
  "https://core.parts/os-95/taskbar-/selected.txt?fx": "https://core.parts/os-95/taskbar-/selected/fx.uri",
  "https://core.parts/os-95/taskbar-/selected.txt~": "{ let wasOn; const result = ''+(''+fx).split(' ').findIndex(x => {\n  const src = caller,\n   isX = x === src;\n  wasOn = Δ[src] === '1';\n  return (src && wasOn) ? isX : ('' + Ω[x] === '1')\n }); return result }",
  "https://core.parts/behaviors/release/src.uri": "",
  "https://core.parts/behaviors/release/fx.uri": "https://core.parts/onpointerup.js",
  "https://core.parts/behaviors/release/src.uri?fx": "https://core.parts/behaviors/release/fx.uri",
  "https://core.parts/os-95/taskbar-/file-browser/layout.css?open": "https://core.parts/os-95/windows/file-browser-0/active.txt",
  "https://core.parts/os-95/taskbar-/file-browser/layout.css~": "`:host { position: relative; height: 100%; margin: 0; width: 160px; display: flex; flex-flow: row nowrap; gap: 3px; border: none ${('' + open) === '1' ? '; font: bold 11px sans-serif' : ''}; box-sizing: border-box; padding: ${('' + open) === '0' ? 3 : 4}px 2px 2px; text-align: left; box-shadow: ${('' + open) === '0' ? 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb' : 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a'} } ${('' + open) === '1' ? ':host::after { content: \"\"; position: absolute; margin: 3px; left: 0; right: 0; top: 0; bottom: 0; border: 1px dotted black; pointer-events: none; }' : ''} ${(''+open) === '1' ? ' :host > * { z-index: 3 } :host::before { content: \"\"; position: absolute; margin: 2px; border-top: 1px solid white; left: 0; right: 0; top: 0; bottom: 0; background-image:linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white),linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white);background-size: 2px 2px;background-position: 0 0, 1px 1px; }' : ''} app-icon { width: 16px; height: 16px }`",
  "https://core.parts/os-95/taskbar-/file-browser/manifest.uri": "https://core.parts/os/icons/folder-icon https://core.parts/os-95/programs/file-browser/app-label",
  "https://core.parts/os-95/taskbar-/file-browser/manifest.uri?open": "https://core.parts/os-95/windows/file-browser-0/active.txt",
  "https://core.parts/os-95/taskbar-/file-browser/datum.txt": "https://core.parts/os-95/windows/file-browser-0/active.txt",
  "https://core.parts/os-95/taskbar-/file-browser/index/fx.uri": "https://core.parts/os-95/windows/file-browser-0/active.txt",
  "https://core.parts/os-95/taskbar-/file-browser/index.txt?datum": "https://core.parts/os-95/taskbar-/file-browser/datum.txt",
  "https://core.parts/os-95/taskbar-/file-browser/index.txt?fx": "https://core.parts/os-95/taskbar-/file-browser/index/fx.uri",
  "https://core.parts/os-95/taskbar-/file-browser/index.txt?order": "https://core.parts/os-95/taskbar-/selected/fx.uri",
  "https://core.parts/os-95/taskbar-/file-browser/index.txt~": "''+(''+order).split(' ').indexOf(''+datum)",
  "https://core.parts/os-95/taskbar-/file-browser/onclick.js?minimized": "https://core.parts/os-95/windows/file-browser-0/minimized.txt",
  "https://core.parts/os-95/taskbar-/file-browser/onclick.js?open": "https://core.parts/os-95/windows/file-browser-0/active.txt",
  "https://core.parts/os-95/taskbar-/file-browser/onclick.js~": "`() => { ${''+minimized === '1' ? `Ω['${minimized.headerOf().href}'] = '0'; ` : `` }Ω['https://core.parts/os-95/windows/file-browser-0/active.txt'] = '${(''+open) === '1' ? '0' : '1'}' }`",
  "https://core.parts/os-95/taskbar-/file-browser/open/fx.uri": "https://core.parts/os-95/taskbar-/file-browser/layout.css https://core.parts/os-95/taskbar-/selected.txt https://core.parts/os-95/taskbar-/file-browser/onclick.js https://core.parts/os-95/windows/file-browser-0/title-bar/layout.css",
  "https://core.parts/os-95/taskbar-/file-browser?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/file-browser?layout": "https://core.parts/os-95/taskbar-/file-browser/layout.css",
  "https://core.parts/os-95/taskbar-/file-browser?manifest": "https://core.parts/os-95/taskbar-/file-browser/manifest.uri",
  "https://core.parts/os-95/taskbar-/file-browser?onclick": "https://core.parts/os-95/taskbar-/file-browser/onclick.js",
  "https://core.parts/os-95/taskbar-/graph-editor/layout.css?open": "https://core.parts/os-95/windows/graph-editor-0/active.txt",
  "https://core.parts/os-95/taskbar-/graph-editor/layout.css~": "`:host { position: relative; height: 100%; margin: 0; width: 160px; display: flex; flex-flow: row nowrap; gap: 3px; border: none ${('' + open) === '1' ? '; font: bold 11px sans-serif' : ''}; box-sizing: border-box; padding: ${('' + open) === '0' ? 3 : 4}px 2px 2px; text-align: left; box-shadow: ${('' + open) === '0' ? 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb' : 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a'} } ${('' + open) === '1' ? ':host::after { content: \"\"; position: absolute; margin: 3px; left: 0; right: 0; top: 0; bottom: 0; border: 1px dotted black; pointer-events: none; }' : ''} ${(''+open) === '1' ? ' :host > * { z-index: 3 } :host::before { content: \"\"; position: absolute; margin: 2px; border-top: 1px solid white; left: 0; right: 0; top: 0; bottom: 0; background-image:linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white),linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white);background-size: 2px 2px;background-position: 0 0, 1px 1px; }' : ''} app-icon { width: 16px; height: 16px }`",
  "https://core.parts/os-95/taskbar-/graph-editor/manifest.uri": "https://core.parts/os-95/programs/graph-editor/app-icon https://core.parts/os-95/programs/graph-editor/app-label",
  "https://core.parts/os-95/taskbar-/graph-editor/manifest.uri?open": "https://core.parts/os-95/windows/graph-editor-0/active.txt",
  "https://core.parts/os-95/taskbar-/graph-editor/datum.txt": "https://core.parts/os-95/windows/graph-editor-0/active.txt",
  "https://core.parts/os-95/taskbar-/graph-editor/index/fx.uri": "https://core.parts/os-95/windows/graph-editor-0/active.txt",
  "https://core.parts/os-95/taskbar-/graph-editor/index.txt?datum": "https://core.parts/os-95/taskbar-/graph-editor/datum.txt",
  "https://core.parts/os-95/taskbar-/graph-editor/index.txt?fx": "https://core.parts/os-95/taskbar-/graph-editor/index/fx.uri",
  "https://core.parts/os-95/taskbar-/graph-editor/index.txt?order": "https://core.parts/os-95/taskbar-/selected/fx.uri",
  "https://core.parts/os-95/taskbar-/graph-editor/index.txt~": "''+(''+order).split(' ').indexOf(''+datum)",
  "https://core.parts/os-95/taskbar-/graph-editor/onclick.js?minimized": "https://core.parts/os-95/windows/graph-editor-0/minimized.txt",
  "https://core.parts/os-95/taskbar-/graph-editor/onclick.js?open": "https://core.parts/os-95/windows/graph-editor-0/active.txt",
  "https://core.parts/os-95/taskbar-/graph-editor/onclick.js~": "`() => { ${''+minimized === '1' ? `Ω['${minimized.headerOf().href}'] = '0'; ` : `` }Ω['https://core.parts/os-95/windows/graph-editor-0/active.txt'] = '${(''+open) === '1' ? '0' : '1'}' }`",
  "https://core.parts/os-95/taskbar-/graph-editor/open/fx.uri": "https://core.parts/os-95/taskbar-/graph-editor/layout.css https://core.parts/os-95/taskbar-/selected.txt https://core.parts/os-95/taskbar-/graph-editor/onclick.js https://core.parts/os-95/windows/graph-editor-0/title-bar/layout.css",
  "https://core.parts/os-95/taskbar-/graph-editor?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/graph-editor?layout": "https://core.parts/os-95/taskbar-/graph-editor/layout.css",
  "https://core.parts/os-95/taskbar-/graph-editor?manifest": "https://core.parts/os-95/taskbar-/graph-editor/manifest.uri",
  "https://core.parts/os-95/taskbar-/graph-editor?onclick": "https://core.parts/os-95/taskbar-/graph-editor/onclick.js",
  "https://core.parts/os-95/taskbar-/start-menu/manifest.uri": "https://core.parts/os-95/taskbar-/start-menu/file-browser https://core.parts/os-95/taskbar-/start-menu/graph-editor https://core.parts/os-95/taskbar-/start-menu/network-folder https://core.parts/os-95/horizontal-line https://core.parts/os-95/taskbar-/start-menu/restart-server https://core.parts/os-95/taskbar-/start-menu/save-computer https://core.parts/os-95/taskbar-/start-menu/restart-computer https://core.parts/os-95/taskbar-/start-menu/save-computer-as",
  "https://core.parts/os-95/taskbar-/start-button/layout.css?open": "https://core.parts/os/start-menu/open.txt",
  "https://core.parts/os-95/taskbar-/start-button/layout.css~": "`:host { flex: 0 0; position: relative; width: 100%; box-sizing: border-box; height: 100%; display: flex; flex-flow: row nowrap; gap: 3px; border: none; font: bold 11px / 16px sans-serif; box-sizing: border-box; padding: ${('' + open) === '0' ? 3 : 4}px 4px 2px; text-align: left; background: #c3c3c3; box-shadow: ${('' + open) === '0' ? 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb' : 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a'} } ${('' + open) === '1' ? ':host::after { content: \"\"; position: absolute; margin: 3px; left: 0; right: 0; top: 0; bottom: 0; border: 1px dotted black; pointer-events: none; }' : ''}`",
  "https://core.parts/os-95/taskbar-/start-button/manifest.uri": "https://core.parts/os-95/taskbar-/start-button/icon- https://core.parts/os-95/taskbar-/start-button/label-",
  "https://core.parts/os-95/taskbar-/start-button/manifest.uri?open": "https://core.parts/os/start-menu/open.txt",
  "https://core.parts/os-95/taskbar-/start-button/onclick.js": "() => Ω['https://core.parts/os/start-menu/open.txt'] = '1'",
  "https://core.parts/os-95/taskbar-/start-button?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-button?layout": "https://core.parts/os-95/taskbar-/start-button/layout.css",
  "https://core.parts/os-95/taskbar-/start-button?manifest": "https://core.parts/os-95/taskbar-/start-button/manifest.uri",
  "https://core.parts/os-95/taskbar-/start-button?onclick": "https://core.parts/os-95/taskbar-/start-button/onclick.js",
  "https://core.parts/os-95/taskbar-/start-button/icon-/layout.css~": "`:host { position: relative; box-sizing: border-box; height: 100%; margin: 0; background: url(data:image/png;base64,${icon}); background-size: 16px; width: 16px; height: 16px }`",
  "https://core.parts/os-95/taskbar-/start-button/icon-/layout.css?icon": "https://core.parts/apple-touch-icon.png",
  "https://core.parts/os-95/taskbar-/start-button/icon-?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-button/icon-?layout": "https://core.parts/os-95/taskbar-/start-button/icon-/layout.css",
  "https://core.parts/os-95/taskbar-/start-button/label-/layout.css": ":host { position: relative; box-sizing: border-box; margin: 0; height: 16px } :host::before { content: 'Start' }",
  "https://core.parts/os-95/taskbar-/start-button/label-?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-button/label-?layout": "https://core.parts/os-95/taskbar-/start-button/label-/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/layout.css?height": "https://core.parts/os-95/taskbar-/css-height.txt",
  "https://core.parts/os-95/taskbar-/start-menu/layout.css~": "`:host { position: relative; min-width: 164px; display: flex; flex-flow: column nowrap; position: absolute; left: 2px; bottom: calc(${height} - 4px); user-select: none; line-height: 18px; text-align: left; background: #c3c3c3; box-sizing: border-box; padding: 3px 3px 3px 24px; text-align: left; background: #c3c3c3; box-shadow: inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb } :host::after { pointer-events: none; display: block; content: ''; position: absolute; left: 3px; top: 3px; bottom: 3px; background: #7f7f7f; width: 21px }`",
  "https://core.parts/os-95/taskbar-/start-menu/click-to-close/layout.css": ":host { position: fixed; display: block; left: 0; top: 0; bottom: 0; right: 0; content: '' }",
  "https://core.parts/os-95/taskbar-/start-menu/click-to-close/onclick.js": "() => Ω['https://core.parts/os/start-menu/open.txt'] = '0'",
  "https://core.parts/os-95/taskbar-/start-menu/click-to-close?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/click-to-close?layout": "https://core.parts/os-95/taskbar-/start-menu/click-to-close/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/click-to-close?onclick": "https://core.parts/os-95/taskbar-/start-menu/click-to-close/onclick.js",
  "https://core.parts/os-95/taskbar-/start-menu/file-browser/layout.css": ":host { position: relative; display: flex; flex-flow: row nowrap; align-items: center; padding: 4px 0 } :host(:hover) { background: #00007f; color: white } app-icon { width: 24px; height: 24px; margin: 0 10px; --size: 24px }",
  "https://core.parts/os-95/taskbar-/start-menu/file-browser/manifest.uri": "https://core.parts/os/icons/folder-icon https://core.parts/os-95/taskbar-/start-menu/file-browser/app-label",
  "https://core.parts/os-95/taskbar-/start-menu/file-browser/app-label/layout.css": ":host::after { height: 24px; content: 'File Browser' }",
  "https://core.parts/os-95/taskbar-/start-menu/file-browser/app-label?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/file-browser/app-label?layout": "https://core.parts/os-95/taskbar-/start-menu/file-browser/app-label/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/file-browser/onclick.js?index": "https://core.parts/os-95/taskbar-/file-browser/index.txt",
  "https://core.parts/os-95/taskbar-/start-menu/file-browser/onclick.js?minimized": "https://core.parts/os-95/windows/file-browser-0/minimized.txt",
  "https://core.parts/os-95/taskbar-/start-menu/file-browser/onclick.js?selected": "https://core.parts/os-95/taskbar-/selected.txt",
  "https://core.parts/os-95/taskbar-/start-menu/file-browser/onclick.js~": "`e => { ${''+minimized === '1' ? `Ω['${minimized.headerOf().href}'] = '0'; ` : `` }Ω['${selected.headerOf().href}'] = '${''+index}' }`",
  "https://core.parts/os-95/taskbar-/start-menu/file-browser?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/file-browser?layout": "https://core.parts/os-95/taskbar-/start-menu/file-browser/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/file-browser?manifest": "https://core.parts/os-95/taskbar-/start-menu/file-browser/manifest.uri",
  "https://core.parts/os-95/taskbar-/start-menu/file-browser?onclick": "https://core.parts/os-95/taskbar-/start-menu/file-browser/onclick.js",
  "https://core.parts/os-95/taskbar-/start-menu/graph-editor/layout.css": ":host { position: relative; display: flex; flex-flow: row nowrap; align-items: center; padding: 4px 0 } :host(:hover) { background: #00007f; color: white } app-icon { width: 24px; height: 24px; margin: 0 10px; --size: 24px }",
  "https://core.parts/os-95/taskbar-/start-menu/graph-editor/manifest.uri": "https://core.parts/os-95/programs/graph-editor/app-icon https://core.parts/os-95/taskbar-/start-menu/graph-editor/app-label",
  "https://core.parts/os-95/taskbar-/start-menu/graph-editor/app-label/layout.css": ":host::after { height: 24px; content: 'Graph Editor' }",
  "https://core.parts/os-95/taskbar-/start-menu/graph-editor/app-label?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/graph-editor/app-label?layout": "https://core.parts/os-95/taskbar-/start-menu/graph-editor/app-label/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/graph-editor/onclick.js?index": "https://core.parts/os-95/taskbar-/graph-editor/index.txt",
  "https://core.parts/os-95/taskbar-/start-menu/graph-editor/onclick.js?minimized": "https://core.parts/os-95/windows/graph-editor-0/minimized.txt",
  "https://core.parts/os-95/taskbar-/start-menu/graph-editor/onclick.js?selected": "https://core.parts/os-95/taskbar-/selected.txt",
  "https://core.parts/os-95/taskbar-/start-menu/graph-editor/onclick.js~": "`e => { ${''+minimized === '1' ? `Ω['${minimized.headerOf().href}'] = '0'; ` : `` }Ω['${selected.headerOf().href}'] = '${''+index}' }`",
  "https://core.parts/os-95/taskbar-/start-menu/graph-editor?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/graph-editor?layout": "https://core.parts/os-95/taskbar-/start-menu/graph-editor/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/graph-editor?manifest": "https://core.parts/os-95/taskbar-/start-menu/graph-editor/manifest.uri",
  "https://core.parts/os-95/taskbar-/start-menu/graph-editor?onclick": "https://core.parts/os-95/taskbar-/start-menu/graph-editor/onclick.js",
  "https://core.parts/os-95/taskbar-/start-menu/network-folder/layout.css": ":host { position: relative; display: flex; flex-flow: row nowrap; align-items: center; padding: 4px 0 } :host(:hover) { background: #00007f; color: white } app-icon { width: 24px; height: 24px; margin: 0 10px; --size: 24px }",
  "https://core.parts/os-95/taskbar-/start-menu/network-folder/manifest.uri": "https://core.parts/os-95/taskbar-/start-menu/network-folder/app-icon https://core.parts/os-95/taskbar-/start-menu/network-folder/app-label",
  "https://core.parts/os-95/taskbar-/start-menu/network-folder/app-icon/layout.css": ":host { --size: 16px } :host::before { content: '\u{1F52D}'; font-size: var(--size); line-height: var(--size) }",
  "https://core.parts/os-95/taskbar-/start-menu/network-folder/app-icon?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/network-folder/app-icon?layout": "https://core.parts/os-95/taskbar-/start-menu/network-folder/app-icon/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/network-folder/app-label/layout.css": ":host::after { height: 24px; content: 'Network' }",
  "https://core.parts/os-95/taskbar-/start-menu/network-folder/app-label?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/network-folder/app-label?layout": "https://core.parts/os-95/taskbar-/start-menu/network-folder/app-label/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/network-folder?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/network-folder?layout": "https://core.parts/os-95/taskbar-/start-menu/network-folder/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/network-folder?manifest": "https://core.parts/os-95/taskbar-/start-menu/network-folder/manifest.uri",
  "https://core.parts/os-95/taskbar-/start-menu/restart-computer/layout.css": ":host { position: relative; display: flex; flex-flow: row nowrap; align-items: center; padding: 4px 0; padding-right: 6px } :host(:hover) { background: #00007f; color: white } app-icon { width: 24px; height: 24px; margin: 0 10px; --size: 24px }",
  "https://core.parts/os-95/taskbar-/start-menu/restart-computer/manifest.uri": "https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-icon https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-label",
  "https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-icon/layout.css": ":host { background: blue }",
  "https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-icon?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-icon?layout": "https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-icon/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-label/layout.css": ":host::after { height: 24px; content: 'Load Last Save' }",
  "https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-label?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-label?layout": "https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-label/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/restart-computer/onclick.js": "() => { location.reload() }",
  "https://core.parts/os-95/taskbar-/start-menu/restart-computer?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/restart-computer?layout": "https://core.parts/os-95/taskbar-/start-menu/restart-computer/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/restart-computer?manifest": "https://core.parts/os-95/taskbar-/start-menu/restart-computer/manifest.uri",
  "https://core.parts/os-95/taskbar-/start-menu/restart-computer?onclick": "https://core.parts/os-95/taskbar-/start-menu/restart-computer/onclick.js",
  "https://core.parts/os-95/taskbar-/start-menu/restart-server/layout.css": ":host { position: relative; display: flex; flex-flow: row nowrap; align-items: center; padding: 4px 0 } :host(:hover) { background: #00007f; color: white } app-icon { width: 24px; height: 24px; margin: 0 10px; --size: 24px }",
  "https://core.parts/os-95/taskbar-/start-menu/restart-server/manifest.uri": "https://core.parts/os-95/taskbar-/start-menu/restart-server/app-icon https://core.parts/os-95/taskbar-/start-menu/restart-server/app-label",
  "https://core.parts/os-95/taskbar-/start-menu/restart-server/app-icon/layout.css": ":host { background: grey }",
  "https://core.parts/os-95/taskbar-/start-menu/restart-server/app-icon?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/restart-server/app-icon?layout": "https://core.parts/os-95/taskbar-/start-menu/restart-server/app-icon/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/restart-server/app-label/layout.css": ":host::after { height: 24px; content: 'Factory Reset' }",
  "https://core.parts/os-95/taskbar-/start-menu/restart-server/app-label?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/restart-server/app-label?layout": "https://core.parts/os-95/taskbar-/start-menu/restart-server/app-label/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/restart-server/onclick.js": "() => { navigator.serviceWorker.controller.postMessage('restart'); setTimeout(()=>location.reload(),1000) }",
  "https://core.parts/os-95/taskbar-/start-menu/restart-server?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/restart-server?layout": "https://core.parts/os-95/taskbar-/start-menu/restart-server/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/restart-server?manifest": "https://core.parts/os-95/taskbar-/start-menu/restart-server/manifest.uri",
  "https://core.parts/os-95/taskbar-/start-menu/restart-server?onclick": "https://core.parts/os-95/taskbar-/start-menu/restart-server/onclick.js",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/layout.css": ":host { position: relative; display: flex; flex-flow: row nowrap; align-items: center; padding: 4px 0; padding-right: 6px } :host(:hover) { background: #00007f; color: white } app-icon { width: 24px; height: 24px; margin: 0 10px; --size: 24px }",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/manifest.uri": "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/app-icon https://core.parts/os-95/taskbar-/start-menu/save-computer-as/app-label",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/app-icon/layout.css": ":host {background: blue }",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/app-icon?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/app-icon?layout": "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/app-icon/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/app-label/layout.css": ":host::after { height: 24px; content: 'Download' }",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/app-label?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/app-label?layout": "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/app-label/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/onclick.js": "() => {\n   Ω['https://core.parts/os/start-menu/open.txt'] = '0'\n   delete Δ['https://core.parts/os-95/taskbar-/tray-/clock-/date.txt']\n   delete Δ['https://core.parts/os-95/taskbar-/tray-/clock-/layout.css']\n   const\n    a = document.createElement('a'),\n    json = JSON.stringify(Object.keys(Δ).sort().reduce((temp_obj, key) => { temp_obj[key] = Δ[key]; return temp_obj }, {})).replace(/\",\"/g,'\",\\n  \"').replace(/^{/s,'\\n {\\n  ').replace(/}$/s, '\\n }'),\n    js = `var causality={},onfetch=(Ω=new Proxy({},new Proxy(${json},\\n {get:(Δ,Υ)=>eval(Δ[V=\"https://core.parts/proxy/alpha.js\"])})))[\"https://core.parts/file.js\"]\\nonmessage=Ω[\"https://core.parts/client-to-server.js\"]`,\n    ourl = URL.createObjectURL(new Blob([js], { type: \"text/javascript\" }));\n   a.href = ourl\n   a.download = 'everything.js'\n   document.body.appendChild(a)\n  a.click();\n   a.remove()\n   URL.revokeObjectURL(ourl)\n }",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer-as?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer-as?layout": "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer-as?manifest": "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/manifest.uri",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer-as?onclick": "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/onclick.js",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer/layout.css": ":host { position: relative; display: flex; flex-flow: row nowrap; align-items: center; padding: 4px 0; padding-right: 6px } :host(:hover) { background: #00007f; color: white } app-icon { width: 24px; height: 24px; margin: 0 10px; --size: 24px }",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer/manifest.uri": "https://core.parts/os-95/taskbar-/start-menu/save-computer/app-icon https://core.parts/os-95/taskbar-/start-menu/save-computer/app-label",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer/app-icon/layout.css": ":host { background: blue }",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer/app-icon?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer/app-icon?layout": "https://core.parts/os-95/taskbar-/start-menu/save-computer/app-icon/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer/app-label/layout.css": ":host::after { height: 24px; content: 'Quick Save' }",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer/app-label?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer/app-label?layout": "https://core.parts/os-95/taskbar-/start-menu/save-computer/app-label/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer/onclick.js": "() => {\n   Ω['https://core.parts/os/start-menu/open.txt'] = '0'\n   delete Δ['https://core.parts/os-95/taskbar-/tray-/clock-/date.txt']\n   delete Δ['https://core.parts/os-95/taskbar-/tray-/clock-/layout.css']\n   navigator.serviceWorker.controller.postMessage(Δ)\n }",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer?layout": "https://core.parts/os-95/taskbar-/start-menu/save-computer/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer?manifest": "https://core.parts/os-95/taskbar-/start-menu/save-computer/manifest.uri",
  "https://core.parts/os-95/taskbar-/start-menu/save-computer?onclick": "https://core.parts/os-95/taskbar-/start-menu/save-computer/onclick.js",
  "https://core.parts/os-95/taskbar-/start-menu?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/start-menu?layout": "https://core.parts/os-95/taskbar-/start-menu/layout.css",
  "https://core.parts/os-95/taskbar-/start-menu?manifest": "https://core.parts/os-95/taskbar-/start-menu/manifest.uri",
  "https://core.parts/os-95/taskbar-/layout.css": ":host { position: relative; width: 100%; box-sizing: border-box; height: 100%; margin: 0; display: flex; flex-flow: row nowrap; gap: 3px; height: 100%; padding: 4px 2px 2px; background: #c3c3c3; box-shadow: inset 0 1px #c3c3c3, inset 0 2px white }",
  "https://core.parts/os-95/taskbar-/manifest.uri?running_apps": "https://core.parts/os-95/windows/open.uri",
  "https://core.parts/os-95/taskbar-/manifest.uri~": "`https://core.parts/os-95/taskbar-/start-button ${'' + running_apps ? running_apps + ' ' : ''}https://core.parts/flex-spacer https://core.parts/os-95/taskbar-/tray-`",
  "https://core.parts/os-95/taskbar-?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-?layout": "https://core.parts/os-95/taskbar-/layout.css",
  "https://core.parts/os-95/taskbar-?manifest": "https://core.parts/os-95/taskbar-/manifest.uri",
  "https://core.parts/os-95/taskbar-/tray-/clock-/layout.css?date": "https://core.parts/os-95/taskbar-/tray-/clock-/date.txt",
  "https://core.parts/os-95/taskbar-/tray-/clock-/layout.css~": "{ const minute = 1000 * 60, delay = minute - (Date.now() % minute); setTimeout(()=>{ β.date = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hourCycle: 'h12' }) }, delay + 5); return `:host::after { content: '${date}'; white-space: nowrap; }`}",
  "https://core.parts/os-95/taskbar-/tray-/clock-?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/tray-/clock-?layout": "https://core.parts/os-95/taskbar-/tray-/clock-/layout.css",
  "https://core.parts/os-95/taskbar-/tray-/clock-/date/fx.uri": "https://core.parts/os-95/taskbar-/tray-/clock-/layout.css",
  "https://core.parts/os-95/taskbar-/tray-/clock-/date.txt?fx": "https://core.parts/os-95/taskbar-/tray-/clock-/date/fx.uri",
  "https://core.parts/os-95/taskbar-/tray-/clock-/date.txt~": "new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hourCycle: 'h12' })",
  "https://core.parts/os-95/taskbar-/tray-/layout.css~": "`:host { position: relative; display: flex; flex-flow: row nowrap; gap: 3px; box-sizing: border-box; height: 100%; margin: 0; user-select: none; padding: 3px 4px 3px; text-align: left; background: #c3c3c3; box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a }`",
  "https://core.parts/os-95/taskbar-/tray-/manifest.uri": "https://core.parts/factory-reset-button https://core.parts/fullscreen-button https://core.parts/os-95/taskbar-/tray-/clock-",
  "https://core.parts/os-95/taskbar-/tray-?core": "https://core.parts/core-part",
  "https://core.parts/os-95/taskbar-/tray-?layout": "https://core.parts/os-95/taskbar-/tray-/layout.css",
  "https://core.parts/os-95/taskbar-/tray-?manifest": "https://core.parts/os-95/taskbar-/tray-/manifest.uri",
  "https://ejaugust.com/research/wasm/test.js": "WebAssembly.instantiateStreaming(onfetch('https://core.parts/wasm/test.wasm')).then(_ => console.log(_.instance.exports))",
  "https://ejaugust.com/research/wasm/test.wasm": "AGFzbQEAAAABBwFgA39/fwADAgEABQMBAAEHDgIDbWVtAgAEZmlsbAAACg0BCwAgACABIAL8CwALAAoEbmFtZQIDAQAA",
  "https://core.parts/?core": "https://core.parts/core-part",
  "https://kireji.io/?core": "https://core.parts/",
  "https://kireji.app/?core": "https://core.parts/",
  "https://orenjinari.com/?core": "https://core.parts/",
  "https://ejaugust.com/?core": "https://core.parts/",
 },
 { get: (Δ, Υ) => eval(Δ[V = "https://core.parts/proxy/alpha.js"]) })))["https://core.parts/file.js"]
onmessage = Ω["https://core.parts/client-to-server.js"]