onfetch = (Ω = new Proxy({}, new Proxy({
 "https://core.parts/os/letters/capital-f.css": ":host::before { content: 'F' }",
 "https://core.parts/os/letters/capital-f.fx.uri": "https://core.parts/os/letters/capital-f",
 "https://core.parts/os/letters/capital-f?css": "https://core.parts/os/letters/capital-f.css",
 "https://core.parts/os/letters/capital-f?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/os/letters/capital-f~?core": "https://core.parts/~",
 "https://core.parts/os/letters/capital-f?core": "https://core.parts/",
 "https://core.parts/os/letters/capital-f~?fx": "https://core.parts/os/letters/capital-f.fx.uri",
 "https://core.parts/os/letters/capital-f~~": "part()",

 "https://core.parts/os/letters/lowercase-i.css": ":host::before { content: 'i' }",
 "https://core.parts/os/letters/lowercase-i.fx.uri": "https://core.parts/os/letters/lowercase-i",
 "https://core.parts/os/letters/lowercase-i?css": "https://core.parts/os/letters/lowercase-i.css",
 "https://core.parts/os/letters/lowercase-i?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/os/letters/lowercase-i~?core": "https://core.parts/~",
 "https://core.parts/os/letters/lowercase-i?core": "https://core.parts/",
 "https://core.parts/os/letters/lowercase-i~?fx": "https://core.parts/os/letters/lowercase-i.fx.uri",
 "https://core.parts/os/letters/lowercase-i~~": "part()",

 "https://core.parts/os/letters/lowercase-l.css": ":host::before { content: 'l' }",
 "https://core.parts/os/letters/lowercase-l.fx.uri": "https://core.parts/os/letters/lowercase-l",
 "https://core.parts/os/letters/lowercase-l?css": "https://core.parts/os/letters/lowercase-l.css",
 "https://core.parts/os/letters/lowercase-l?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/os/letters/lowercase-l~?core": "https://core.parts/~",
 "https://core.parts/os/letters/lowercase-l?core": "https://core.parts/",
 "https://core.parts/os/letters/lowercase-l~?fx": "https://core.parts/os/letters/lowercase-l.fx.uri",
 "https://core.parts/os/letters/lowercase-l~~": "part()",

 "https://core.parts/os/letters/lowercase-e.css": ":host::before { content: 'e' }",
 "https://core.parts/os/letters/lowercase-e.fx.uri": "https://core.parts/os/letters/lowercase-e",
 "https://core.parts/os/letters/lowercase-e?css": "https://core.parts/os/letters/lowercase-e.css",
 "https://core.parts/os/letters/lowercase-e?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/os/letters/lowercase-e~?core": "https://core.parts/~",
 "https://core.parts/os/letters/lowercase-e?core": "https://core.parts/",
 "https://core.parts/os/letters/lowercase-e~?fx": "https://core.parts/os/letters/lowercase-e.fx.uri",
 "https://core.parts/os/letters/lowercase-e~~": "part()",

 "https://core.parts/.fx.uri": "https://core.parts/",
 "https://core.parts/?css": "https://core.parts/os-95.css",
 "https://core.parts/?manifest": "https://core.parts/os-95.manifest.uri",
 "https://core.parts/apple-touch-icon.png": "<?=b64('icon.png')?>",
 "https://core.parts/core.js": "({ get: " + ((_, υ) => {
  const Ψ = υ.match(/^(?<protocol>https:\/\/)(?<host>[^\/]+?)(?:\/(?<path>(?:[^\s.~?\/]+?\/)*)(?:(?<part>[a-z][a-z0-9]*-[a-z0-9-]*)|(?<filename>[^\s~?\/]*)\.(?<extension>(?<binary>png|ico|woff2|wasm)|[^\s.~?\/]+))|\/(?<index>(?:[^\s.~?\/]+?\/)*))(?:~{0,6}\?(?<property>[a-zA-Z][a-zA-Z0-9_]*)(?:=(?<value>-?[\d]*\.?[\d]*)(?<properties>&(?:[a-zA-Z][a-zA-Z0-9_]*=-?[\d]*\.?[\d]*)+)?$)?)?(?<rank>~{0,7})$/)?.groups;
  if (!Ψ) throw new TypeError('bad request: ' + υ)
  if (Ψ.value) Ψ.target = υ.slice(0, - Ψ.property.length - (2 + Ψ.value.length))
  Ψ.type = { 'js': "text/javascript", 'css': "text/css", 'json': 'application/json', 'png': 'image/png', 'woff2': 'font/woff2', 'ico': 'image/vnd.microsoft.icon', 'html': 'text/html', 'wasm': 'application/wasm' }[Ψ.value ? 'js' : (Ψ.index !== undefined || Ψ.part !== undefined) ? 'html' : (Ψ.rank.length ? 'js' : (Ψ.property === undefined && Ψ.extension || 'txt'))] ?? 'text/plain'
  let α, β;
  α = new Proxy(Proxy, {
   get: (_, π) => {
    // context { Ω, Δ, V, Υ, υ, α, β, Ψ, π }
    if (π === Symbol.toPrimitive) π = 'toPrimitive';
    return eval(`(${Δ[Δ[`${υ}?${π}`] ?? Δ[`${Δ[`${υ}?core`]}?${π}`] ?? Δ[`${`https://core.parts/core.js`}?${π}`]]})`)
   }
  })
  return β = new Proxy(α, α);
 }) + ", set: " + ((_, υ, δ) => {
  if (Δ[υ] === δ) return;
  const
   payload = { [υ]: δ },
   onset = data => {
    if (!('inbox' in globalThis)) return;
    for (const url in data) if (url in inbox) inbox[url](data[url])
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
 "https://core.parts/core.js?apply": "https://core.parts/core/apply.js",
 "https://core.parts/core.js?construct": "https://core.parts/core/throw/unused-native.js",
 "https://core.parts/core.js?defineProperty": "https://core.parts/core/throw/unused-native.js",
 "https://core.parts/core.js?deleteProperty": "https://core.parts/core/throw/unused-native.js",
 "https://core.parts/core.js?get": "https://core.parts/core/get.js",
 "https://core.parts/core.js?getOwnPropertyDescriptor": "https://core.parts/core/getOwnPropertyDescriptor.js",
 "https://core.parts/core.js?getPrototypeOf": "https://core.parts/core/getPrototypeOf.js",
 "https://core.parts/core.js?has": "https://core.parts/core/has.js",
 "https://core.parts/core.js?headerOf": "https://core.parts/core/headerOf.js",
 "https://core.parts/core.js?isExtensible": "https://core.parts/core/isExtensible.js",
 "https://core.parts/core.js?ownKeys": "https://core.parts/core/ownKeys.js",
 "https://core.parts/core.js?preventExtensions": "https://core.parts/core/throw/unused-native.js",
 "https://core.parts/core.js?query": "https://core.parts/core/query.js",
 "https://core.parts/core.js?rootsOf": "https://core.parts/core/rootsOf.js",
 "https://core.parts/core.js?set": "https://core.parts/core/set.js",
 "https://core.parts/core.js?setPrototypeOf": "https://core.parts/core/throw/unused-native.js",
 "https://core.parts/core.js?toPrimitive": "https://core.parts/core/toPrimitive.js",
 "https://core.parts/core.js?toString": "https://core.parts/core/toString.js",
 "https://core.parts/core.js?valueOf": "https://core.parts/core/valueOf.js",
 "https://core.parts/core/apply.js": "" + ((_, __, A) => eval("" + α)(...A)),
 "https://core.parts/core/get.js": "" + ((_, π) => {
  if (['toPrimitive', Symbol.toPrimitive, 'toString', 'valueOf', 'headerOf', 'rootsOf', 'query'].includes(π)) return α[π]
  if (!(π in β)) return undefined
  return Ω[Ω[`${υ}?${π}`]]
 }),
 "https://core.parts/core/getOwnPropertyDescriptor.js": "(_, π) => ({ configurable: true, enumerable: true, writable: true, value: α })",
 "https://core.parts/core/getPrototypeOf.js": "() => Object.prototype",
 "https://core.parts/core/has.js": "(_, π) => Δ[`${υ}?${π}`] !== undefined",
 "https://core.parts/core/headerOf.js": "" + (() => ({ kernelActionLocation: V, kernelActionKey: Υ, href: υ, metaKernel: α, self: β, groups: Ψ, metaKernelKey: π })),
 "https://core.parts/core/isExtensible.js": "() => true", "https://core.parts/core/ownKeys.js": "" + (() => {
  const keys = new Set()
  α.query(l => keys.add(l.property))
  return [...keys]
 }),
 "https://core.parts/core/query.js": "" + ((ƒ = x => x) => {
  const roots = β.rootsOf()
  return Object.keys(Δ).reduce((o, url) => {
   const rootIndex = roots.findIndex(root => url.startsWith(root + '?'));
   if (rootIndex !== -1) {
    const root = roots[rootIndex],
     property = url.slice(root.length + 1)
    const item = { url, root, property, rootIndex }
    const result = ƒ(item)
    if (result) o.push(result)
   }
   return o
  }, [])
 }),
 "https://core.parts/core/rootsOf.js": "" + (() => {
  const roots = [υ]
  let root = υ, key;
  while (root = Δ[key = root + '?core']) {
   if (roots.includes(root)) throw 'core loop'
   roots.push(root);
   if (root === Υ) break;
  }
  if (!roots.includes(Υ)) roots.push(Υ)
  return roots;
 }),
 "https://core.parts/core/set.js": "" + ((_, property, value) => Ω[Ω[Ω[υ].query(l => l.property === property ? l.url : undefined)[0]]] = value),
 "https://core.parts/core/throw/unused-native.js": "() => { throw new TypeError(`unused native trap '${π}' called on ${υ}`) }",
 "https://core.parts/core/toPrimitive.js": "" + ((hint, caller) => {
  let url = υ, rank = Ψ.rank
  const imaginary = hint === 'imaginary';
  if (Δ[url] === undefined || imaginary) {
   while ((imaginary && url === υ) || Δ[url] === undefined && rank.length < 7) {
    rank += '~'
    url += '~';
   }
   if (Δ[url] === undefined) return (url.includes('?onclick') ? undefined : console.warn(new TypeError('possible fx with no constructor ' + url)), '')
   rank = rank.slice(0, -1)
   url = url.slice(0, -1)
   const properties = {}
   Ω[url].query(l => {
    if (l.property in properties && properties[l.property].rootIndex <= l.rootIndex) return;
    properties[l.property] = l
   })
   const primitive = eval(`({${Object.entries(properties).map(([property, { url }]) => `"${Ω[url]}":${property}`).join(',')}})=>${Ω[`${url}~`]}`)(Ω)
   if (typeof primitive !== 'string') throw new TypeError(`output of ${url} must be a string (got ${typeof primitive})`)
   if (imaginary) return primitive
   Ω[url] = primitive
  }
  return Δ[υ]
 }),

 "https://core.parts/core/templates/part.json": JSON.stringify({
  "$1.css": "$2",
  "$1.manifest.uri": "$3",
  "$1.fx.uri": "$1",
  "$1?css": "$1.css",
  "$1?manifest": "$1.manifest.uri",
  "$1~?core": "https://core.parts/~",
  "$1?core": "https://core.parts/",
  "$1~?fx": "$1.fx.uri",
  "$1~~": "part()"
 }),
 "https://core.parts/core/templates/part.js": "" + ((url, css = '', manifest = '', ...components) => {
  let parts = ('' + Ω['https://core.parts/core/templates/part.json']).replace(/\$1/g, url).replace(/\$2/, css).replace(/\$3/, manifest)
  for (const component in components) throw new RangeError('unhandled component', { url, component, components })
  Object.assign(Δ, JSON.parse(parts))
 }),

 "https://core.parts/core/templates/button.json": JSON.stringify({
  "$1.css~": "`:host { background: #c3c3c3; box-shadow: ${(''+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'} } $2`",
  "$1.manifest.uri": "$3",
  "$1.fx.uri": "$1",
  "$1/onclick.js": "$4",
  "$1?css": "$1.css",
  "$1?manifest": "$1.manifest.uri",
  "$1?onclick": "$1/onclick.js",
  "$1~?core": "https://core.parts/~",
  "$1?core": "https://core.parts/",
  "$1~?fx": "$1.fx.uri",
  "$1~~": "part()",
  "$1.css?down": "$1/down.txt",
  "$1?onpointerdown": "$1/onpointerdown.js",
  "$1/onpointerdown.js": "e => { e.stopPropagation(); Ω['$1/down.txt'] = '1'; Ω['https://core.parts/release-behavior.uri'] = '$1/release.js' }",
  "$1/release.js": "e => { Ω['$1/down.txt'] = '0' }",
  "$1/down.txt": "0",
  "$1/down.txt?fx": "$1/down.txt.fx.uri",
  "$1/down.txt.fx.uri": "$1.css"
 }),
 "https://core.parts/core/templates/button.js": "" + ((url, css = '', manifest = '', onclickjs = `()=>{ console.log('${url}') }`) => {
  let parts = ('' + Ω['https://core.parts/core/templates/button.json']).replace(/\$1/g, url).replace(/\$2/, css).replace(/\$3/, manifest).replace(/\$4/, onclickjs)
  Object.assign(Δ, JSON.parse(parts))
 }),

 "https://core.parts/core/toString.js": "() => Δ[υ]",
 "https://core.parts/core/valueOf.js": "() => Δ[υ]",
 "https://core.parts/desktop-95.css": ":host { position: relative; width: 100%; box-sizing: border-box; height: 100%; margin: 0; background: #377f7f }",
 "https://core.parts/desktop-95.fx.uri": "https://core.parts/desktop-95",
 "https://core.parts/desktop-95?css": "https://core.parts/desktop-95.css",
 "https://core.parts/desktop-95?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/desktop-95~?core": "https://core.parts/~",
 "https://core.parts/desktop-95?core": "https://core.parts/",
 "https://core.parts/desktop-95~?fx": "https://core.parts/desktop-95.fx.uri",
 "https://core.parts/desktop-95~~": "part()",
 "https://core.parts/desktop-95/onclick.js~": "`()=>{${(''+selected) === '-1' ? '' : `Ω['${selected.headerOf().href}'] = '-1'`}}`",
 "https://core.parts/desktop-95/onclick.js?selected": "https://core.parts/os/task-bar/selected.txt",
 "https://core.parts/desktop-95?onclick": "https://core.parts/desktop-95/onclick.js",
 "https://core.parts/empty.manifest.uri": "",
 "https://core.parts/empty.css": "",
 "https://core.parts/error-404.css": ":host { position: relative; width: 100%; box-sizing: border-box; height: 100%; margin: 0; background: magenta }",
 "https://core.parts/error-404.fx.uri": "https://core.parts/error-404",
 "https://core.parts/error-404?css": "https://core.parts/error-404.css",
 "https://core.parts/error-404?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/error-404~?core": "https://core.parts/~",
 "https://core.parts/error-404?core": "https://core.parts/",
 "https://core.parts/error-404~?fx": "https://core.parts/error-404.fx.uri",
 "https://core.parts/favicon.ico?src": "https://core.parts/apple-touch-icon.png",
 "https://core.parts/favicon.ico~": "src[Symbol.toPrimitive]()",
 "https://core.parts/file.js": "" + (event => {
  const
   direct = typeof event === 'string',
   url = direct ? event : event.request.url;
  if (url === 'https://core.parts/everything.js') return event.respondWith(new Response("onfetch = (Ω = new Proxy({}, new Proxy(" + JSON.stringify(Δ) + ', { get: (Δ, Υ) => eval(Δ[V = "https://core.parts/core.js"]) })))["https://core.parts/file.js"]', { headers: { 'content-type': 'application/json' } }))
  if (url.includes('&')) {
   if (!url.includes('?')) throw new TypeError(`bad format (ampersand with no query string) ${url}`)
   const [base, query] = url.split('?')
   query.split('&').forEach(subquery => {
    const
     url = base + '?' + subquery,
     proxy = Ω[url],
     { value, property, target } = proxy.headerOf().groups;
    Ω[target][property] = value
   })
   const response = new Response(new Int8Array([1]))
   return direct ? response : event.respondWith(response)
  }
  const proxy = Ω[url],
   { binary, type, value, property, target } = proxy.headerOf().groups;
  let string = '';
  if (value) {
   Ω[target][property] = value
   const response = new Response(new Int8Array([1]))
   return direct ? response : event.respondWith(response)
  }
  else {
   string = proxy.toPrimitive()
   if (property) {
    if (property === 'onclick') {
     const fnurl = '' + Ω[url];
     if (fnurl) {
      const proxy = Ω[Ω[fnurl]],
       { value, property, target } = proxy.headerOf().groups
      if (!(value && property && target)) throw new TypeError(`bad format event handler chain (${url} => ${fnurl})`)
      Ω[target][property] = value
     }
     const response = new Response(new Int8Array([1]))
     return direct ? response : event.respondWith(response)
    } else {
     const response = Response.redirect(string, 307);
     return direct ? response : event.respondWith(response)
    }
   }
  }
  var body = new TextEncoder().encode(string);
  if (binary) {
   const B = atob(string), k = B.length, A = new ArrayBuffer(k), I = new Uint8Array(A);
   for (var i = 0; i < k; i++) I[i] = B.charCodeAt(i);
   body = new Blob([I], { type });
  }
  const response = new Response(body, { headers: { "content-type": `${type}${binary ? '' : '; charset=UTF-8'}`, "expires": "Sun, 20 Jul 1969 20:17:00 UTC", "server": "kireji" } })
  return direct ? response : event.respondWith(response)
 }),
 "https://core.parts/flex-spacer.css": ":host { flex: 1 1 }",
 "https://core.parts/flex-spacer.fx.uri": "https://core.parts/flex-spacer",
 "https://core.parts/flex-spacer?css": "https://core.parts/flex-spacer.css",
 "https://core.parts/flex-spacer?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/flex-spacer~?core": "https://core.parts/~",
 "https://core.parts/flex-spacer?core": "https://core.parts/",
 "https://core.parts/flex-spacer~?fx": "https://core.parts/flex-spacer.fx.uri",
 "https://core.parts/flex-spacer~~": "part()",

 "https://core.parts/fullscreen-button?onclick": "https://core.parts/fullscreen-button/onclick.js",
 "https://core.parts/fullscreen-button/onclick.js": "()=>document.documentElement.requestFullscreen()",
 "https://core.parts/fullscreen-button.css": ":host { background: black; width: 16px; height: 16px; cursor: pointer; }",
 "https://core.parts/fullscreen-button.manifest.uri": "",
 "https://core.parts/fullscreen-button.fx.uri": "https://core.parts/fullscreen-button",
 "https://core.parts/fullscreen-button?css": "https://core.parts/fullscreen-button.css",
 "https://core.parts/fullscreen-button?manifest": "https://core.parts/fullscreen-button.manifest.uri",
 "https://core.parts/fullscreen-button~?core": "https://core.parts/~",
 "https://core.parts/fullscreen-button?core": "https://core.parts/",
 "https://core.parts/fullscreen-button~?fx": "https://core.parts/fullscreen-button.fx.uri",
 "https://core.parts/fullscreen-button~~": "part()",

 "https://core.parts/os-95.css?fx": "https://core.parts/.fx.uri",
 "https://core.parts/os-95.css?height": "https://core.parts/os/task-bar/css-height.txt",
 "https://core.parts/os-95.css~": "`:host { position: fixed; top: 0; left: 0; width: 100%; box-sizing: border-box; height: 100%; margin: 0; display: grid; grid-template-rows: 1fr ${height}; font: 12px / 16px sans-serif }`",
 "https://core.parts/os-95.manifest.uri~": "`https://core.parts/desktop-95${''+hide_welcome_folder === '0' ? ' https://core.parts/os/running/window/welcome-folder' : ''} https://core.parts/taskbar-95${''+start_menu === '1' ? ' https://core.parts/start-menu/click-to-close https://core.parts/start-menu': ''}`",
 "https://core.parts/os-95.manifest.uri?fx": "https://core.parts/.fx.uri",
 "https://core.parts/os-95.manifest.uri?start_menu": "https://core.parts/os/start-menu/open.txt",
 "https://core.parts/os-95.manifest.uri?hide_welcome_folder": "https://core.parts/os/running/window/welcome-folder/minimized.txt",

 "https://core.parts/os/running_apps.uri": "https://core.parts/os/running/taskbar/welcome-folder",

 // ACTUAL FOLDER ==============================================================================================================================================================================================================================================================================>>>
 "https://core.parts/welcome/hello.txt~": "`Welcome to my ${noun}.`",
 "https://core.parts/welcome/hello.txt?noun": "https://core.parts/welcome/noun.txt",
 "https://core.parts/welcome/noun.txt~": "prompt('Please enter a noun.')",
 // TODO: FIX RESUED PARTS ==============================================================================================================================================================================================================================================================================>>>
 "https://core.parts/os/running/welcome-folder/app-icon.css": ":host { display: inline-block; position: relative; width: 100%; box-sizing: border-box; height: 100%; margin: 0; background: magenta; width: 16px; height: 16px; vertical-align: center }",
 "https://core.parts/os/running/welcome-folder/app-icon.fx.uri": "https://core.parts/os/running/welcome-folder/app-icon",
 "https://core.parts/os/running/welcome-folder/app-icon?css": "https://core.parts/os/running/welcome-folder/app-icon.css",
 "https://core.parts/os/running/welcome-folder/app-icon?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/os/running/welcome-folder/app-icon~?core": "https://core.parts/~",
 "https://core.parts/os/running/welcome-folder/app-icon?core": "https://core.parts/",
 "https://core.parts/os/running/welcome-folder/app-icon~?fx": "https://core.parts/os/running/welcome-folder/app-icon.fx.uri",
 "https://core.parts/os/running/welcome-folder/app-icon~~": "part()",

 "https://core.parts/os/running/welcome-folder/app-label.css": ":host { margin: 0; height: 16px; vertical-align: center } :host::after { content: 'welcome' }",
 "https://core.parts/os/running/welcome-folder/app-label.fx.uri": "https://core.parts/os/running/welcome-folder/app-label",
 "https://core.parts/os/running/welcome-folder/app-label?css": "https://core.parts/os/running/welcome-folder/app-label.css",
 "https://core.parts/os/running/welcome-folder/app-label?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/os/running/welcome-folder/app-label~?core": "https://core.parts/~",
 "https://core.parts/os/running/welcome-folder/app-label?core": "https://core.parts/",
 "https://core.parts/os/running/welcome-folder/app-label~?fx": "https://core.parts/os/running/welcome-folder/app-label.fx.uri",
 "https://core.parts/os/running/welcome-folder/app-label~~": "part()",
 // TASL BAR ITEM==============================================================================================================================================================================================================================================================================>>>
 "https://core.parts/os/running/taskbar/welcome-folder/onclick.js~": "`() => { ${''+minimized === '1' ? `Ω['${minimized.headerOf().href}'] = '0'; ` : `` }Ω['https://core.parts/os/running/window/welcome-folder/active.txt'] = '${(''+open) === '1' ? '0' : '1'}' }`",
 "https://core.parts/os/running/taskbar/welcome-folder/onclick.js?open": "https://core.parts/os/running/window/welcome-folder/active.txt",
 "https://core.parts/os/running/taskbar/welcome-folder/onclick.js?minimized": "https://core.parts/os/running/window/welcome-folder/minimized.txt",
 "https://core.parts/os/running/taskbar/welcome-folder.css?fx": "https://core.parts/os/running/taskbar/welcome-folder.fx.uri",
 "https://core.parts/os/running/taskbar/welcome-folder.css?open": "https://core.parts/os/running/window/welcome-folder/active.txt",
 "https://core.parts/os/running/taskbar/welcome-folder.css~": "`:host { position: relative; height: 100%; margin: 0; width: 160px; display: flex; flex-flow: row nowrap; gap: 3px; border: none; font: ${('' + open) === '1' ? 'bold ' : ''}12px sans-serif; box-sizing: border-box; line-height: 16px; padding: ${('' + open) === '0' ? 3 : 4}px 2px 2px; text-align: left; box-shadow: ${('' + open) === '0' ? 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb' : 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a'} } ${('' + open) === '1' ? ':host::after { content: \"\"; position: absolute; margin: 3px; left: 0; right: 0; top: 0; bottom: 0; border: 1px dotted black; pointer-events: none; }' : ''} ${(''+open) === '1' ? ' :host > * { z-index: 3 } :host::before { content: \"\"; position: absolute; margin: 2px; border-top: 1px solid white; left: 0; right: 0; top: 0; bottom: 0; background-image:linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white),linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white);background-size: 2px 2px;background-position: 0 0, 1px 1px; }' : ''}`",
 "https://core.parts/os/running/taskbar/welcome-folder.fx.uri": "https://core.parts/os/running/taskbar/welcome-folder",
 "https://core.parts/os/running/taskbar/welcome-folder.manifest.uri?open": "https://core.parts/os/running/window/welcome-folder/active.txt",
 "https://core.parts/os/running/taskbar/welcome-folder.manifest.uri": "https://core.parts/os/running/welcome-folder/app-icon https://core.parts/os/running/welcome-folder/app-label",
 "https://core.parts/os/running/taskbar/welcome-folder/datum.txt": "https://core.parts/os/running/window/welcome-folder/active.txt",
 "https://core.parts/os/running/taskbar/welcome-folder/index.fx.uri": "https://core.parts/os/running/window/welcome-folder/active.txt",
 "https://core.parts/os/running/taskbar/welcome-folder/index.txt?datum": "https://core.parts/os/running/taskbar/welcome-folder/datum.txt",
 "https://core.parts/os/running/taskbar/welcome-folder/index.txt?fx": "https://core.parts/os/running/taskbar/welcome-folder/index.fx.uri",
 "https://core.parts/os/running/taskbar/welcome-folder/index.txt?order": "https://core.parts/os/task-bar/selected.txt.fx.uri",
 "https://core.parts/os/running/taskbar/welcome-folder/index.txt~": "''+(''+order).split(' ').indexOf(''+datum)",
 "https://core.parts/os/running/taskbar/welcome-folder/open.fx.uri": "https://core.parts/os/running/taskbar/welcome-folder.css https://core.parts/os/task-bar/selected.txt https://core.parts/os/running/taskbar/welcome-folder/onclick.js https://core.parts/os/running/window/welcome-folder/title-bar.css",
 "https://core.parts/os/running/taskbar/welcome-folder?onclick": "https://core.parts/os/running/taskbar/welcome-folder/onclick.js",
 "https://core.parts/os/running/taskbar/welcome-folder?css": "https://core.parts/os/running/taskbar/welcome-folder.css",
 "https://core.parts/os/running/taskbar/welcome-folder?manifest": "https://core.parts/os/running/taskbar/welcome-folder.manifest.uri",
 "https://core.parts/os/running/taskbar/welcome-folder~?core": "https://core.parts/~",
 "https://core.parts/os/running/taskbar/welcome-folder?core": "https://core.parts/",
 "https://core.parts/os/running/taskbar/welcome-folder~?fx": "https://core.parts/os/running/taskbar/welcome-folder.fx.uri",
 "https://core.parts/os/running/taskbar/welcome-folder~~": "part()",
 // RUNNING WINDOW ==============================================================================================================================================================================================================================================================================>>>
 "https://core.parts/os/running/window/welcome-folder.onpointerdown.js~": "`() => { ${(''+selected) === (''+index) ? '' : `Ω['${selected.headerOf().href}'] = '${''+index}'`} }`",
 "https://core.parts/os/running/window/welcome-folder.onpointerdown.js?selected": "https://core.parts/os/task-bar/selected.txt",
 "https://core.parts/os/running/window/welcome-folder.onpointerdown.js?index": "https://core.parts/os/running/taskbar/welcome-folder/index.txt",
 "https://core.parts/os/running/window/welcome-folder?onpointerdown": "https://core.parts/os/running/window/welcome-folder.onpointerdown.js",
 "https://core.parts/os/running/window/welcome-folder.css?fx": "https://core.parts/os/running/window/welcome-folder.fx.uri",
 "https://core.parts/os/running/window/welcome-folder.css~": ("" + (() => {
  const common = "position: absolute; display: flex; flex-flow: column nowrap; gap: 2px; background: #c3c3c3; box-sizing: border-box"
  if (('' + maximized) === '1') {
   return `:host { position: absolute; top: 0; left: 0; right: 0; bottom: 28px; padding: 2px; ${common} }`
  } else {
   const { x, y, w, h } = JSON.parse('' + position);
   return `:host { width: ${w}px; height: ${h}px; left: ${x}px; top: ${y}px; min-height: fit-content; padding: 4px; background: #c3c3c3; box-shadow: inset -1px -1px black, inset 1px 1px #c3c3c3, inset -2px -2px #7a7a7a, inset 2px 2px white; ${common} }`
  }
 })).slice(6),
 "https://core.parts/os/running/window/welcome-folder.css?position": "https://core.parts/os/running/window/welcome-folder/position.json",
 "https://core.parts/os/running/window/welcome-folder.css?maximized": "https://core.parts/os/running/window/welcome-folder/maximized.txt",
 "https://core.parts/os/running/window/welcome-folder.manifest.uri": "https://core.parts/os/running/window/welcome-folder/title-bar https://core.parts/os/running/window/welcome-folder/menu-bar https://core.parts/os/running/window/welcome-folder/explorer-view https://core.parts/os/running/window/welcome-folder/status-bar https://core.parts/os/running/window/welcome-folder/resize-top https://core.parts/os/running/window/welcome-folder/resize-bottom https://core.parts/os/running/window/welcome-folder/resize-left https://core.parts/os/running/window/welcome-folder/resize-right https://core.parts/os/running/window/welcome-folder/resize-top-right https://core.parts/os/running/window/welcome-folder/resize-bottom-right https://core.parts/os/running/window/welcome-folder/resize-top-left https://core.parts/os/running/window/welcome-folder/resize-bottom-left",
 "https://core.parts/os/running/window/welcome-folder.fx.uri": "https://core.parts/os/running/window/welcome-folder",
 "https://core.parts/os/running/window/welcome-folder?css": "https://core.parts/os/running/window/welcome-folder.css",
 "https://core.parts/os/running/window/welcome-folder?manifest": "https://core.parts/os/running/window/welcome-folder.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder~?fx": "https://core.parts/os/running/window/welcome-folder.fx.uri",
 "https://core.parts/os/running/window/welcome-folder~~": "part()",

 "https://core.parts/os/running/window/welcome-folder/active.txt?fx": "https://core.parts/os/running/taskbar/welcome-folder/open.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/active.txt?index": "https://core.parts/os/running/taskbar/welcome-folder/index.txt",
 "https://core.parts/os/running/window/welcome-folder/active.txt?selected": "https://core.parts/os/task-bar/selected.txt",
 "https://core.parts/os/running/window/welcome-folder/active.txt?minimized": "https://core.parts/os/running/window/welcome-folder/minimized.txt",
 "https://core.parts/os/running/window/welcome-folder/active.txt~": "('' + minimized) === '1' ? '0' : ('' + selected) === ('' + index) ? '1' : '0'",

 "https://core.parts/os/running/window/welcome-folder/grab.json": JSON.stringify({ x: 0, y: 0 }),
 "https://core.parts/os/running/window/welcome-folder/position.json": JSON.stringify({ x: 64, y: 32, w: 320, h: 240 }),
 "https://core.parts/os/running/window/welcome-folder/position.json?fx": "https://core.parts/os/running/window/welcome-folder/position.json.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/position.json.fx.uri": "https://core.parts/os/running/window/welcome-folder.css",
 "https://core.parts/os/running/window/welcome-folder/pointer-transform.js": "" + (({ clientX: x, clientY: y }) => {
  const
   grabState = JSON.parse('' + Ω['https://core.parts/os/running/window/welcome-folder/grab.json']),
   mousePosition = { x: Math.round(x), y: Math.round(y) };
  let deltaPosition, finalPosition;
  if (grabState.mode === 'move') {
   deltaPosition = { x: grabState.start.x - grabState.x, y: grabState.start.y - grabState.y },
    finalPosition = { x: deltaPosition.x + mousePosition.x, y: deltaPosition.y + mousePosition.y };
  }
  else if (grabState.mode === 'n-resize') finalPosition = { y: grabState.start.y - grabState.y + mousePosition.y, h: grabState.start.h + (grabState.y - mousePosition.y) }
  else if (grabState.mode === 's-resize') finalPosition = { h: grabState.start.h - (grabState.y - mousePosition.y) }
  else if (grabState.mode === 'e-resize') finalPosition = { w: grabState.start.w - (grabState.x - mousePosition.x) }
  else if (grabState.mode === 'w-resize') finalPosition = { x: grabState.start.x - grabState.x + mousePosition.x, w: grabState.start.w + (grabState.x - mousePosition.x) }
  else if (grabState.mode === 'ne-resize') finalPosition = { y: grabState.start.y - grabState.y + mousePosition.y, h: grabState.start.h + (grabState.y - mousePosition.y), w: grabState.start.w - (grabState.x - mousePosition.x) }
  else if (grabState.mode === 'se-resize') finalPosition = { h: grabState.start.h - (grabState.y - mousePosition.y), w: grabState.start.w - (grabState.x - mousePosition.x) }
  else if (grabState.mode === 'nw-resize') finalPosition = { y: grabState.start.y - grabState.y + mousePosition.y, h: grabState.start.h + (grabState.y - mousePosition.y), x: grabState.start.x - grabState.x + mousePosition.x, w: grabState.start.w + (grabState.x - mousePosition.x) }
  else if (grabState.mode === 'sw-resize') finalPosition = { h: grabState.start.h - (grabState.y - mousePosition.y), x: grabState.start.x - grabState.x + mousePosition.x, w: grabState.start.w + (grabState.x - mousePosition.x) }
  else throw new ReferenceError('No mode called ' + mode)
  Ω['https://core.parts/os/running/window/welcome-folder/position.json'] = JSON.stringify({ ...grabState.start, ...finalPosition })
 }),

 "https://core.parts/os/running/window/welcome-folder/maximized.txt": "0",
 "https://core.parts/os/running/window/welcome-folder/maximized.txt?fx": "https://core.parts/os/running/window/welcome-folder/maximized.txt.fx.url",
 "https://core.parts/os/running/window/welcome-folder/maximized.txt.fx.url": "https://core.parts/os/running/window/welcome-folder.css https://core.parts/os/running/window/welcome-folder/window-controls.manifest.uri https://core.parts/os/running/window/welcome-folder/title-bar/ondblclick.js",

 "https://core.parts/os/running/window/welcome-folder/minimized.txt": "0",
 "https://core.parts/os/running/window/welcome-folder/minimized.txt?fx": "https://core.parts/os/running/window/welcome-folder/minimized.txt.fx.url",
 "https://core.parts/os/running/window/welcome-folder/minimized.txt.fx.url": "https://core.parts/os-95.manifest.uri https://core.parts/os/running/window/welcome-folder/active.txt https://core.parts/start-menu/welcome-folder/onclick.js https://core.parts/os/running/taskbar/welcome-folder/onclick.js",

 "https://core.parts/os/running/window/welcome-folder/title-bar.css~": "`:host { background: ${(''+focus) === '1' ? 'rgb(0, 0, 163)' : '#7f7f7f'}; color: white; display: flex; flex-flow: row nowrap; align-items: center; gap: 3px; height: 18px; padding: 0px 2px; box-sizing: border-box; }`",
 "https://core.parts/os/running/window/welcome-folder/title-bar.css?fx": "https://core.parts/os/running/window/welcome-folder/title-bar.css.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/title-bar.css.fx.uri": "https://core.parts/os/running/window/welcome-folder/title-bar",
 "https://core.parts/os/running/window/welcome-folder/title-bar.css?focus": "https://core.parts/os/running/window/welcome-folder/active.txt",
 "https://core.parts/os/running/window/welcome-folder/title-bar.manifest.uri": "https://core.parts/os/running/welcome-folder/app-icon https://core.parts/os/running/welcome-folder/app-label  https://core.parts/flex-spacer https://core.parts/os/running/window/welcome-folder/window-controls",
 "https://core.parts/os/running/window/welcome-folder/title-bar.fx.uri": "https://core.parts/os/running/window/welcome-folder/title-bar",
 "https://core.parts/os/running/window/welcome-folder/title-bar?css": "https://core.parts/os/running/window/welcome-folder/title-bar.css",
 "https://core.parts/os/running/window/welcome-folder/title-bar?manifest": "https://core.parts/os/running/window/welcome-folder/title-bar.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/title-bar~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/title-bar?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/title-bar~?fx": "https://core.parts/os/running/window/welcome-folder/title-bar.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/title-bar~~": "part()",
 "https://core.parts/os/running/window/welcome-folder/title-bar?onpointerdown": "https://core.parts/os/running/window/welcome-folder/title-bar/onpointerdown.js",
 "https://core.parts/os/running/window/welcome-folder/title-bar/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os/running/window/welcome-folder/position.json']); Ω['https://core.parts/os/running/window/welcome-folder/grab.json'] = JSON.stringify({ x, y, start, mode: 'move' }); Ω['https://core.parts/grab-behavior.uri'] = 'https://core.parts/os/running/window/welcome-folder/pointer-transform.js' }`",
 "https://core.parts/os/running/window/welcome-folder/title-bar?ondblclick": "https://core.parts/os/running/window/welcome-folder/title-bar/ondblclick.js",
 "https://core.parts/os/running/window/welcome-folder/title-bar/ondblclick.js~": "`() => { Ω['https://core.parts/os/running/window/welcome-folder/${(''+maximized) === '1' ? 'restore' : 'maximize'}-button/onclick.js']() }`",
 "https://core.parts/os/running/window/welcome-folder/title-bar/ondblclick.js?maximized": "https://core.parts/os/running/window/welcome-folder/maximized.txt",

 "https://core.parts/os/running/window/welcome-folder/resize-top.css": ":host { position: absolute; top: -2px; left: 4px; right: 4px; height: 6px; cursor: ns-resize }",
 "https://core.parts/os/running/window/welcome-folder/resize-top.fx.uri": "https://core.parts/os/running/window/welcome-folder/resize-top",
 "https://core.parts/os/running/window/welcome-folder/resize-top?css": "https://core.parts/os/running/window/welcome-folder/resize-top.css",
 "https://core.parts/os/running/window/welcome-folder/resize-top?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/resize-top~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/resize-top?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/resize-top~?fx": "https://core.parts/os/running/window/welcome-folder/resize-top.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/resize-top~~": "part()",
 "https://core.parts/os/running/window/welcome-folder/resize-top?onpointerdown": "https://core.parts/os/running/window/welcome-folder/resize-top/onpointerdown.js",
 "https://core.parts/os/running/window/welcome-folder/resize-top/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os/running/window/welcome-folder/position.json']); Ω['https://core.parts/os/running/window/welcome-folder/grab.json'] = JSON.stringify({ x, y, start, mode: 'n-resize' }); Ω['https://core.parts/grab-behavior.uri'] = 'https://core.parts/os/running/window/welcome-folder/pointer-transform.js' }`",

 "https://core.parts/os/running/window/welcome-folder/resize-right.css": ":host { position: absolute; bottom: 4px; right: -2px; top: 4px; width: 6px; cursor: ew-resize }",
 "https://core.parts/os/running/window/welcome-folder/resize-right.fx.uri": "https://core.parts/os/running/window/welcome-folder/resize-right",
 "https://core.parts/os/running/window/welcome-folder/resize-right?css": "https://core.parts/os/running/window/welcome-folder/resize-right.css",
 "https://core.parts/os/running/window/welcome-folder/resize-right?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/resize-right~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/resize-right?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/resize-right~?fx": "https://core.parts/os/running/window/welcome-folder/resize-right.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/resize-right~~": "part()",
 "https://core.parts/os/running/window/welcome-folder/resize-right?onpointerdown": "https://core.parts/os/running/window/welcome-folder/resize-right/onpointerdown.js",
 "https://core.parts/os/running/window/welcome-folder/resize-right/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os/running/window/welcome-folder/position.json']); Ω['https://core.parts/os/running/window/welcome-folder/grab.json'] = JSON.stringify({ x, y, start, mode: 'e-resize' }); Ω['https://core.parts/grab-behavior.uri'] = 'https://core.parts/os/running/window/welcome-folder/pointer-transform.js' }`",

 "https://core.parts/os/running/window/welcome-folder/resize-left.css": ":host { position: absolute; bottom: 4px; left: -2px; top: 4px; width: 6px; cursor: ew-resize }",
 "https://core.parts/os/running/window/welcome-folder/resize-left.fx.uri": "https://core.parts/os/running/window/welcome-folder/resize-left",
 "https://core.parts/os/running/window/welcome-folder/resize-left?css": "https://core.parts/os/running/window/welcome-folder/resize-left.css",
 "https://core.parts/os/running/window/welcome-folder/resize-left?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/resize-left~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/resize-left?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/resize-left~?fx": "https://core.parts/os/running/window/welcome-folder/resize-left.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/resize-left~~": "part()",
 "https://core.parts/os/running/window/welcome-folder/resize-left?onpointerdown": "https://core.parts/os/running/window/welcome-folder/resize-left/onpointerdown.js",
 "https://core.parts/os/running/window/welcome-folder/resize-left/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os/running/window/welcome-folder/position.json']); Ω['https://core.parts/os/running/window/welcome-folder/grab.json'] = JSON.stringify({ x, y, start, mode: 'w-resize' }); Ω['https://core.parts/grab-behavior.uri'] = 'https://core.parts/os/running/window/welcome-folder/pointer-transform.js' }`",

 "https://core.parts/os/running/window/welcome-folder/resize-top-right.css": ":host { position: absolute; top: -2px; right: -2px; width: 6px; height: 6px; cursor: nesw-resize }",
 "https://core.parts/os/running/window/welcome-folder/resize-top-right.fx.uri": "https://core.parts/os/running/window/welcome-folder/resize-top-right",
 "https://core.parts/os/running/window/welcome-folder/resize-top-right?css": "https://core.parts/os/running/window/welcome-folder/resize-top-right.css",
 "https://core.parts/os/running/window/welcome-folder/resize-top-right?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/resize-top-right~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/resize-top-right?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/resize-top-right~?fx": "https://core.parts/os/running/window/welcome-folder/resize-top-right.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/resize-top-right~~": "part()",
 "https://core.parts/os/running/window/welcome-folder/resize-top-right?onpointerdown": "https://core.parts/os/running/window/welcome-folder/resize-top-right/onpointerdown.js",
 "https://core.parts/os/running/window/welcome-folder/resize-top-right/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os/running/window/welcome-folder/position.json']); Ω['https://core.parts/os/running/window/welcome-folder/grab.json'] = JSON.stringify({ x, y, start, mode: 'ne-resize' }); Ω['https://core.parts/grab-behavior.uri'] = 'https://core.parts/os/running/window/welcome-folder/pointer-transform.js' }`",

 "https://core.parts/os/running/window/welcome-folder/resize-bottom-right.css": ":host { position: absolute; bottom: -2px; right: -2px; width: 6px; height: 6px; cursor: nwse-resize }",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-right.fx.uri": "https://core.parts/os/running/window/welcome-folder/resize-bottom-right",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-right?css": "https://core.parts/os/running/window/welcome-folder/resize-bottom-right.css",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-right?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-right~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-right?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-right~?fx": "https://core.parts/os/running/window/welcome-folder/resize-bottom-right.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-right~~": "part()",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-right?onpointerdown": "https://core.parts/os/running/window/welcome-folder/resize-bottom-right/onpointerdown.js",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-right/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os/running/window/welcome-folder/position.json']); Ω['https://core.parts/os/running/window/welcome-folder/grab.json'] = JSON.stringify({ x, y, start, mode: 'se-resize' }); Ω['https://core.parts/grab-behavior.uri'] = 'https://core.parts/os/running/window/welcome-folder/pointer-transform.js' }`",

 "https://core.parts/os/running/window/welcome-folder/resize-top-left.css": ":host { position: absolute; top: -2px; left: -2px; width: 6px; height: 6px; cursor: nwse-resize }",
 "https://core.parts/os/running/window/welcome-folder/resize-top-left.fx.uri": "https://core.parts/os/running/window/welcome-folder/resize-top-left",
 "https://core.parts/os/running/window/welcome-folder/resize-top-left?css": "https://core.parts/os/running/window/welcome-folder/resize-top-left.css",
 "https://core.parts/os/running/window/welcome-folder/resize-top-left?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/resize-top-left~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/resize-top-left?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/resize-top-left~?fx": "https://core.parts/os/running/window/welcome-folder/resize-top-left.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/resize-top-left~~": "part()",
 "https://core.parts/os/running/window/welcome-folder/resize-top-left?onpointerdown": "https://core.parts/os/running/window/welcome-folder/resize-top-left/onpointerdown.js",
 "https://core.parts/os/running/window/welcome-folder/resize-top-left/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os/running/window/welcome-folder/position.json']); Ω['https://core.parts/os/running/window/welcome-folder/grab.json'] = JSON.stringify({ x, y, start, mode: 'nw-resize' }); Ω['https://core.parts/grab-behavior.uri'] = 'https://core.parts/os/running/window/welcome-folder/pointer-transform.js' }`",

 "https://core.parts/os/running/window/welcome-folder/resize-bottom-left.css": ":host { position: absolute; bottom: -2px; left: -2px; width: 6px; height: 6px; cursor: nesw-resize }",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-left.fx.uri": "https://core.parts/os/running/window/welcome-folder/resize-bottom-left",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-left?css": "https://core.parts/os/running/window/welcome-folder/resize-bottom-left.css",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-left?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-left~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-left?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-left~?fx": "https://core.parts/os/running/window/welcome-folder/resize-bottom-left.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-left~~": "part()",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-left?onpointerdown": "https://core.parts/os/running/window/welcome-folder/resize-bottom-left/onpointerdown.js",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom-left/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os/running/window/welcome-folder/position.json']); Ω['https://core.parts/os/running/window/welcome-folder/grab.json'] = JSON.stringify({ x, y, start, mode: 'sw-resize' }); Ω['https://core.parts/grab-behavior.uri'] = 'https://core.parts/os/running/window/welcome-folder/pointer-transform.js' }`",

 "https://core.parts/os/running/window/welcome-folder/resize-bottom.css": ":host { position: absolute; bottom: -2px; left: 4px; right: 4px; height: 6px; cursor: ns-resize }",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom.fx.uri": "https://core.parts/os/running/window/welcome-folder/resize-bottom",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom?css": "https://core.parts/os/running/window/welcome-folder/resize-bottom.css",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom~?fx": "https://core.parts/os/running/window/welcome-folder/resize-bottom.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom~~": "part()",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom?onpointerdown": "https://core.parts/os/running/window/welcome-folder/resize-bottom/onpointerdown.js",
 "https://core.parts/os/running/window/welcome-folder/resize-bottom/onpointerdown.js~": "`({ clientX: x, clientY: y }) => { const start = JSON.parse('' + Ω['https://core.parts/os/running/window/welcome-folder/position.json']); Ω['https://core.parts/os/running/window/welcome-folder/grab.json'] = JSON.stringify({ x, y, start, mode: 's-resize' }); Ω['https://core.parts/grab-behavior.uri'] = 'https://core.parts/os/running/window/welcome-folder/pointer-transform.js' }`",

 "https://core.parts/os/running/window/welcome-folder/menu-bar.css": ":host { height: 18px; display: flex; flex-flow: row nowrap; gap: 16px; align-items: center; padding: 0 4px; }",
 "https://core.parts/os/running/window/welcome-folder/menu-bar.manifest.uri": "https://core.parts/os/running/window/welcome-folder/menu-bar/file-menu",
 "https://core.parts/os/running/window/welcome-folder/menu-bar.fx.uri": "https://core.parts/os/running/window/welcome-folder/menu-bar",
 "https://core.parts/os/running/window/welcome-folder/menu-bar?css": "https://core.parts/os/running/window/welcome-folder/menu-bar.css",
 "https://core.parts/os/running/window/welcome-folder/menu-bar?manifest": "https://core.parts/os/running/window/welcome-folder/menu-bar.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/menu-bar~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/menu-bar?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/menu-bar~?fx": "https://core.parts/os/running/window/welcome-folder/menu-bar.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/menu-bar~~": "part()",

 "https://core.parts/os/running/window/welcome-folder/menu-bar/file-menu.css": ":host { display: flex; flex-flow: row nowrap; } capital-f { text-decoration: underline }",
 "https://core.parts/os/running/window/welcome-folder/menu-bar/file-menu.manifest.uri": "https://core.parts/os/letters/capital-f https://core.parts/os/letters/lowercase-i https://core.parts/os/letters/lowercase-l https://core.parts/os/letters/lowercase-e",
 "https://core.parts/os/running/window/welcome-folder/menu-bar/file-menu.fx.uri": "https://core.parts/os/running/window/welcome-folder/menu-bar/file-menu",
 "https://core.parts/os/running/window/welcome-folder/menu-bar/file-menu?css": "https://core.parts/os/running/window/welcome-folder/menu-bar/file-menu.css",
 "https://core.parts/os/running/window/welcome-folder/menu-bar/file-menu?manifest": "https://core.parts/os/running/window/welcome-folder/menu-bar/file-menu.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/menu-bar/file-menu~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/menu-bar/file-menu?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/menu-bar/file-menu~?fx": "https://core.parts/os/running/window/welcome-folder/menu-bar/file-menu.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/menu-bar/file-menu~~": "part()",

 "https://core.parts/os/running/window/welcome-folder/explorer-view.css": ":host { flex: 1 1; box-shadow: inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a; background: white; padding: 2px; display: grid; grid-template-columns: 1fr 1fr 1fr; }",
 "https://core.parts/os/running/window/welcome-folder/explorer-view.manifest.uri?button": "https://core.parts/core/templates/button.js",
 "https://core.parts/os/running/window/welcome-folder/explorer-view.manifest.uri~": `{
   const
   urlbase = υ.replace(/\.manifest\.uri$/, '/header-'),
   files = new Set(Object.keys(Δ).filter(url => url.startsWith('https://core.parts/welcome/') && !url.includes('?')).map(url => url.replace(/~+$/, '').replace('https://core.parts/welcome/', ''))),
   headercss = label => \`:host { height: 17px; display: flex; flex-flow: row nowrap; align-items: center; padding-left: 6px; } :host::before { content: '\${label}' }\`,
   headers = { "name": "Name", "type": "Type", "size": "Size" };
   for (const key in headers) button(urlbase + key, headercss(headers[key]))
   return Object.keys(headers).map(x=>urlbase + x).join(' ');
 }`,
 "https://core.parts/os/running/window/welcome-folder/explorer-view.fx.uri": "https://core.parts/os/running/window/welcome-folder/explorer-view",
 "https://core.parts/os/running/window/welcome-folder/explorer-view?css": "https://core.parts/os/running/window/welcome-folder/explorer-view.css",
 "https://core.parts/os/running/window/welcome-folder/explorer-view?manifest": "https://core.parts/os/running/window/welcome-folder/explorer-view.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/explorer-view~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/explorer-view?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/explorer-view~?fx": "https://core.parts/os/running/window/welcome-folder/explorer-view.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/explorer-view~~": "part()",

 "https://core.parts/os/running/window/welcome-folder/status-bar.css": ":host { padding: 0 3px; height: 17px; box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a; display: flex; flex-flow: row nowrap; align-items: center; } :host::after { content: '0 object(s), 0 selected' }",
 "https://core.parts/os/running/window/welcome-folder/status-bar.manifest.uri": "",
 "https://core.parts/os/running/window/welcome-folder/status-bar.fx.uri": "https://core.parts/os/running/window/welcome-folder/status-bar",
 "https://core.parts/os/running/window/welcome-folder/status-bar?css": "https://core.parts/os/running/window/welcome-folder/status-bar.css",
 "https://core.parts/os/running/window/welcome-folder/status-bar?manifest": "https://core.parts/os/running/window/welcome-folder/status-bar.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/status-bar~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/status-bar?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/status-bar~?fx": "https://core.parts/os/running/window/welcome-folder/status-bar.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/status-bar~~": "part()",

 "https://core.parts/os/running/window/welcome-folder/window-controls.css": ":host { display: flex; flex-flow: row nowrap }",
 "https://core.parts/os/running/window/welcome-folder/window-controls.manifest.uri~": "`https://core.parts/os/running/window/welcome-folder/minimize-button https://core.parts/os/running/window/welcome-folder/${(''+maximized) === '1' ? 'restore' : 'maximize'}-button https://core.parts/os/running/window/welcome-folder/exit-button`",
 "https://core.parts/os/running/window/welcome-folder/window-controls.manifest.uri?maximized": "https://core.parts/os/running/window/welcome-folder/maximized.txt",
 "https://core.parts/os/running/window/welcome-folder/window-controls.fx.uri": "https://core.parts/os/running/window/welcome-folder/window-controls",
 "https://core.parts/os/running/window/welcome-folder/window-controls?css": "https://core.parts/os/running/window/welcome-folder/window-controls.css",
 "https://core.parts/os/running/window/welcome-folder/window-controls?manifest": "https://core.parts/os/running/window/welcome-folder/window-controls.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/window-controls~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/window-controls?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/window-controls~?fx": "https://core.parts/os/running/window/welcome-folder/window-controls.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/window-controls~~": "part()",

 "https://core.parts/os/running/window/welcome-folder/exit-button.css": ":host { position: relative; width: 16px; height: 14px; background: #c3c3c3; margin-left: 2px; box-shadow: inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb } :host::before, :host::after { --color: #7f7f7f; content: ''; display: block; position: absolute; width: 8px; height: 7px; left: 4px; top: 3px; background: linear-gradient(to top left, transparent 0%, transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%), linear-gradient(to top right,  transparent 0%,  transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%) } :host::before { --color: white; left: 5px; top: 4px }",
 "https://core.parts/os/running/window/welcome-folder/exit-button.manifest.uri": "",
 "https://core.parts/os/running/window/welcome-folder/exit-button.fx.uri": "https://core.parts/os/running/window/welcome-folder/exit-button",
 "https://core.parts/os/running/window/welcome-folder/exit-button?css": "https://core.parts/os/running/window/welcome-folder/exit-button.css",
 "https://core.parts/os/running/window/welcome-folder/exit-button?manifest": "https://core.parts/os/running/window/welcome-folder/exit-button.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/exit-button~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/exit-button?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/exit-button~?fx": "https://core.parts/os/running/window/welcome-folder/exit-button.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/exit-button~~": "part()",

 "https://core.parts/os/running/window/welcome-folder/minimize-button.css~": "`:host { position: relative; width: 16px; height: 14px; background: #c3c3c3; box-shadow: ${(''+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'} } :host::before { --color: black; display: block; position: absolute; content: ''; width: 6px; height: 2px; background: var(--color); top: 9px; left: 4px } :host(:hover)::before { --color: blue }`",
 "https://core.parts/os/running/window/welcome-folder/minimize-button.manifest.uri": "",
 "https://core.parts/os/running/window/welcome-folder/minimize-button.fx.uri": "https://core.parts/os/running/window/welcome-folder/minimize-button",
 "https://core.parts/os/running/window/welcome-folder/minimize-button/onclick.js": "()=>{Ω['https://core.parts/os/running/window/welcome-folder/minimized.txt'] = '1' }",
 "https://core.parts/os/running/window/welcome-folder/minimize-button?css": "https://core.parts/os/running/window/welcome-folder/minimize-button.css",
 "https://core.parts/os/running/window/welcome-folder/minimize-button?manifest": "https://core.parts/os/running/window/welcome-folder/minimize-button.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/minimize-button?onclick": "https://core.parts/os/running/window/welcome-folder/minimize-button/onclick.js",
 "https://core.parts/os/running/window/welcome-folder/minimize-button~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/minimize-button?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/minimize-button~?fx": "https://core.parts/os/running/window/welcome-folder/minimize-button.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/minimize-button~~": "part()",
 "https://core.parts/os/running/window/welcome-folder/minimize-button.css?down": "https://core.parts/os/running/window/welcome-folder/minimize-button/down.txt",
 "https://core.parts/os/running/window/welcome-folder/minimize-button?onpointerdown": "https://core.parts/os/running/window/welcome-folder/minimize-button/onpointerdown.js",
 "https://core.parts/os/running/window/welcome-folder/minimize-button/onpointerdown.js": "e => { e.stopPropagation(); Ω['https://core.parts/os/running/window/welcome-folder/minimize-button/down.txt'] = '1'; Ω['https://core.parts/release-behavior.uri'] = 'https://core.parts/os/running/window/welcome-folder/minimize-button/release.js' }",
 "https://core.parts/os/running/window/welcome-folder/minimize-button/release.js": "e => { Ω['https://core.parts/os/running/window/welcome-folder/minimize-button/down.txt'] = '0' }",
 "https://core.parts/os/running/window/welcome-folder/minimize-button/down.txt": "0",
 "https://core.parts/os/running/window/welcome-folder/minimize-button/down.txt?fx": "https://core.parts/os/running/window/welcome-folder/minimize-button/down.txt.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/minimize-button/down.txt.fx.uri": "https://core.parts/os/running/window/welcome-folder/minimize-button.css",

 "https://core.parts/os/running/window/welcome-folder/maximize-button.css~": "`:host { position: relative; width: 16px; height: 14px; background: #c3c3c3; box-shadow: ${(''+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'} } :host::before { --color: black; display: block; position: absolute; content: ''; width: 9px; height: 9px; top: 2px; left: 3px; box-shadow: inset 0 2px var(--color), inset 0 0 0 1px var(--color) } :host(:hover)::before { --color: blue }`",
 "https://core.parts/os/running/window/welcome-folder/maximize-button.manifest.uri": "",
 "https://core.parts/os/running/window/welcome-folder/maximize-button.fx.uri": "https://core.parts/os/running/window/welcome-folder/maximize-button",
 "https://core.parts/os/running/window/welcome-folder/maximize-button/onclick.js": "()=>{Ω['https://core.parts/os/running/window/welcome-folder/maximized.txt'] = '1' }",
 "https://core.parts/os/running/window/welcome-folder/maximize-button?css": "https://core.parts/os/running/window/welcome-folder/maximize-button.css",
 "https://core.parts/os/running/window/welcome-folder/maximize-button?manifest": "https://core.parts/os/running/window/welcome-folder/maximize-button.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/maximize-button?onclick": "https://core.parts/os/running/window/welcome-folder/maximize-button/onclick.js",
 "https://core.parts/os/running/window/welcome-folder/maximize-button~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/maximize-button?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/maximize-button~?fx": "https://core.parts/os/running/window/welcome-folder/maximize-button.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/maximize-button~~": "part()",
 "https://core.parts/os/running/window/welcome-folder/maximize-button.css?down": "https://core.parts/os/running/window/welcome-folder/maximize-button/down.txt",
 "https://core.parts/os/running/window/welcome-folder/maximize-button?onpointerdown": "https://core.parts/os/running/window/welcome-folder/maximize-button/onpointerdown.js",
 "https://core.parts/os/running/window/welcome-folder/maximize-button/onpointerdown.js": "e => { e.stopPropagation(); Ω['https://core.parts/os/running/window/welcome-folder/maximize-button/down.txt'] = '1'; Ω['https://core.parts/release-behavior.uri'] = 'https://core.parts/os/running/window/welcome-folder/maximize-button/release.js' }",
 "https://core.parts/os/running/window/welcome-folder/maximize-button/release.js": "e => { Ω['https://core.parts/os/running/window/welcome-folder/maximize-button/down.txt'] = '0' }",
 "https://core.parts/os/running/window/welcome-folder/maximize-button/down.txt": "0",
 "https://core.parts/os/running/window/welcome-folder/maximize-button/down.txt?fx": "https://core.parts/os/running/window/welcome-folder/maximize-button/down.txt.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/maximize-button/down.txt.fx.uri": "https://core.parts/os/running/window/welcome-folder/maximize-button.css",

 "https://core.parts/os/running/window/welcome-folder/restore-button.css~": "`:host { position: relative; width: 16px; height: 14px; background: #c3c3c3; box-shadow: ${(''+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'} } :host::before, :host::after { --color: black; display: block; position: absolute; content: ''; width: 6px; height: 6px; top: 5px; left: 3px; box-shadow: inset 0 2px var(--color), inset 0 0 0 1px var(--color); background: #c3c3c3 } :host::before { top: 2px; left: 5px } :host(:hover)::before, :host(:hover)::after { --color: blue }`",
 "https://core.parts/os/running/window/welcome-folder/restore-button.manifest.uri": "",
 "https://core.parts/os/running/window/welcome-folder/restore-button.fx.uri": "https://core.parts/os/running/window/welcome-folder/restore-button",
 "https://core.parts/os/running/window/welcome-folder/restore-button/onclick.js": "()=>Ω['https://core.parts/os/running/window/welcome-folder/maximized.txt'] = '0'",
 "https://core.parts/os/running/window/welcome-folder/restore-button?css": "https://core.parts/os/running/window/welcome-folder/restore-button.css",
 "https://core.parts/os/running/window/welcome-folder/restore-button?manifest": "https://core.parts/os/running/window/welcome-folder/restore-button.manifest.uri",
 "https://core.parts/os/running/window/welcome-folder/restore-button?onclick": "https://core.parts/os/running/window/welcome-folder/restore-button/onclick.js",
 "https://core.parts/os/running/window/welcome-folder/restore-button~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/welcome-folder/restore-button?core": "https://core.parts/",
 "https://core.parts/os/running/window/welcome-folder/restore-button~?fx": "https://core.parts/os/running/window/welcome-folder/restore-button.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/restore-button~~": "part()",
 "https://core.parts/os/running/window/welcome-folder/restore-button.css?down": "https://core.parts/os/running/window/welcome-folder/restore-button/down.txt",
 "https://core.parts/os/running/window/welcome-folder/restore-button?onpointerdown": "https://core.parts/os/running/window/welcome-folder/restore-button/onpointerdown.js",
 "https://core.parts/os/running/window/welcome-folder/restore-button/onpointerdown.js": "e => { e.stopPropagation(); Ω['https://core.parts/os/running/window/welcome-folder/restore-button/down.txt'] = '1'; Ω['https://core.parts/release-behavior.uri'] = 'https://core.parts/os/running/window/welcome-folder/restore-button/release.js' }",
 "https://core.parts/os/running/window/welcome-folder/restore-button/release.js": "e => { Ω['https://core.parts/os/running/window/welcome-folder/restore-button/down.txt'] = '0' }",
 "https://core.parts/os/running/window/welcome-folder/restore-button/down.txt": "0",
 "https://core.parts/os/running/window/welcome-folder/restore-button/down.txt?fx": "https://core.parts/os/running/window/welcome-folder/restore-button/down.txt.fx.uri",
 "https://core.parts/os/running/window/welcome-folder/restore-button/down.txt.fx.uri": "https://core.parts/os/running/window/welcome-folder/restore-button.css",
 // START MENU ITEM ==============================================================================================================================================================================================================================================================================>>>
 "https://core.parts/start-menu/welcome-folder/onclick.js~": "`e => { ${''+minimized === '1' ? `Ω['${minimized.headerOf().href}'] = '0'; ` : `` }Ω['${selected.headerOf().href}'] = '${''+index}' }`",
 "https://core.parts/start-menu/welcome-folder/onclick.js?minimized": "https://core.parts/os/running/window/welcome-folder/minimized.txt",
 "https://core.parts/start-menu/welcome-folder/onclick.js?selected": "https://core.parts/os/task-bar/selected.txt",
 "https://core.parts/start-menu/welcome-folder/onclick.js?index": "https://core.parts/os/running/taskbar/welcome-folder/index.txt",
 "https://core.parts/start-menu/welcome-folder?onclick": "https://core.parts/start-menu/welcome-folder/onclick.js",
 "https://core.parts/start-menu/welcome-folder.css": ":host { position: relative; display: flex; flex-flow: row nowrap; padding: 4px 0 } :host(:hover) { background: #00007f; color: white }",
 "https://core.parts/start-menu/welcome-folder.manifest.uri": "https://core.parts/start-menu/welcome-folder/app-icon https://core.parts/start-menu/welcome-folder/app-label",
 "https://core.parts/start-menu/welcome-folder.fx.uri": "https://core.parts/start-menu/welcome-folder",
 "https://core.parts/start-menu/welcome-folder?css": "https://core.parts/start-menu/welcome-folder.css",
 "https://core.parts/start-menu/welcome-folder?manifest": "https://core.parts/start-menu/welcome-folder.manifest.uri",
 "https://core.parts/start-menu/welcome-folder~?core": "https://core.parts/~",
 "https://core.parts/start-menu/welcome-folder?core": "https://core.parts/",
 "https://core.parts/start-menu/welcome-folder~?fx": "https://core.parts/start-menu/welcome-folder.fx.uri",
 "https://core.parts/start-menu/welcome-folder~~": "part()",
 // ICON
 "https://core.parts/start-menu/welcome-folder/app-icon.css": ":host { width: 24px; height: 24px; background: tomato; margin: 0 10px; }",
 "https://core.parts/start-menu/welcome-folder/app-icon.fx.uri": "https://core.parts/start-menu/welcome-folder/app-icon",
 "https://core.parts/start-menu/welcome-folder/app-icon?css": "https://core.parts/start-menu/welcome-folder/app-icon.css",
 "https://core.parts/start-menu/welcome-folder/app-icon?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/start-menu/welcome-folder/app-icon~?core": "https://core.parts/~",
 "https://core.parts/start-menu/welcome-folder/app-icon?core": "https://core.parts/",
 "https://core.parts/start-menu/welcome-folder/app-icon~?fx": "https://core.parts/start-menu/welcome-folder/app-icon.fx.uri",
 "https://core.parts/start-menu/welcome-folder/app-icon~~": "part()",
 // LABEL
 "https://core.parts/start-menu/welcome-folder/app-label.css": ":host::after { height: 24px; font: 12px / 24px sans-serif; content: 'welcome' }",
 "https://core.parts/start-menu/welcome-folder/app-label.fx.uri": "https://core.parts/start-menu/welcome-folder/app-label",
 "https://core.parts/start-menu/welcome-folder/app-label?css": "https://core.parts/start-menu/welcome-folder/app-label.css",
 "https://core.parts/start-menu/welcome-folder/app-label?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/start-menu/welcome-folder/app-label~?core": "https://core.parts/~",
 "https://core.parts/start-menu/welcome-folder/app-label?core": "https://core.parts/",
 "https://core.parts/start-menu/welcome-folder/app-label~?fx": "https://core.parts/start-menu/welcome-folder/app-label.fx.uri",
 "https://core.parts/start-menu/welcome-folder/app-label~~": "part()",
 // END FOLDER ==============================================================================================================================================================================================================================================================================>>>

 "https://core.parts/os/start-menu/open.txt.fx.uri": "https://core.parts/start-95.css https://core.parts/os/task-bar/selected.txt https://core.parts/os-95.manifest.uri",
 "https://core.parts/os/start-menu/open.txt?fx": "https://core.parts/os/start-menu/open.txt.fx.uri",
 "https://core.parts/os/start-menu/open.txt?selected": "https://core.parts/os/task-bar/selected.txt",
 "https://core.parts/os/start-menu/open.txt~": "('' + selected) === '0' ? '1' : '0'",
 "https://core.parts/os/task-bar/css-height.txt": "28px",
 "https://core.parts/os/task-bar/css-height.txt.fx.uri": "https://core.parts/os-95.css https://core.parts/start-menu.css",
 "https://core.parts/os/task-bar/selected.txt.fx.uri": "https://core.parts/os/start-menu/open.txt https://core.parts/os/running/window/welcome-folder/active.txt https://core.parts/os/running/window/welcome-folder.onpointerdown.js https://core.parts/desktop-95/onclick.js",
 "https://core.parts/os/task-bar/selected.txt": "-1",
 "https://core.parts/os/task-bar/selected.txt?fx": "https://core.parts/os/task-bar/selected.txt.fx.uri",
 "https://core.parts/os/task-bar/selected.txt~": `{ let wasOn; const result = ''+(''+fx).split(' ').findIndex(${x => {
  const src = caller,
   isX = x === src;
  wasOn = Δ[src] === '1';
  return (src && wasOn) ? isX : ('' + Ω[x] === '1')
 }}); return result }`,
 "https://core.parts/part.js": "" + (() => `\`<!DOCTYPE html><script src="https://core.parts/everything.js"></script><script>onload = Ω["https://core.parts/onload.js"]</script><meta name="viewport" content="width=device-width, initial-scale=1" /><style>html, body { overscroll-behavior-y: contain !important; overflow: hidden; }</style>\``),
 "https://core.parts/patterns/tagname.regex": "" + /^[a-z][a-z0-9]*-[a-z0-9-]*$/,
 "https://core.parts/patterns/url.regex": "" + /^(?<protocol>https:\/\/)(?<host>[^\/]+?)(?:\/(?<path>(?:[^\s.~?\/]+?\/)*)(?:(?<part>[a-z][a-z0-9]*-[a-z0-9-]*)|(?<filename>[^\s~?\/]*)\.(?<extension>(?<binary>png|ico|woff2|wasm)|[^\s.~?\/]+))|\/(?<index>(?:[^\s.~?\/]+?\/)*))(?:~{0,6}\?(?<property>[a-zA-Z][a-zA-Z0-9_]*)(?:=(?<value>-?[\d]*\.?[\d]*)(?<properties>&(?:[a-zA-Z][a-zA-Z0-9_]*=-?[\d]*\.?[\d]*)+)?$)?)?(?<rank>~{0,7})$/,
 "https://core.parts/start-95/onclick.js": "() => Ω['https://core.parts/os/start-menu/open.txt'] = '1'",
 "https://core.parts/start-95?onclick": "https://core.parts/start-95/onclick.js",
 "https://core.parts/start-95.css?fx": "https://core.parts/start-95.fx.uri",
 "https://core.parts/start-95.css?open": "https://core.parts/os/start-menu/open.txt",
 "https://core.parts/start-95.css~": "`:host { flex: 0 0; position: relative; width: 100%; box-sizing: border-box; height: 100%; display: flex; flex-flow: row nowrap; gap: 3px; border: none; font: bold 12px sans-serif; box-sizing: border-box; line-height: ${('' + open) === '0' ? 16 : 16}px; padding: ${('' + open) === '0' ? 3 : 4}px 4px 2px; text-align: left; background: #c3c3c3; box-shadow: ${('' + open) === '0' ? 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb' : 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a'} } ${('' + open) === '1' ? ':host::after { content: \"\"; position: absolute; margin: 3px; left: 0; right: 0; top: 0; bottom: 0; border: 1px dotted black; pointer-events: none; }' : ''}`",
 "https://core.parts/start-95.fx.uri": "https://core.parts/start-95",
 "https://core.parts/start-95.manifest.uri": "https://core.parts/start-icon https://core.parts/start-label",
 "https://core.parts/start-95.manifest.uri?open": "https://core.parts/os/start-menu/open.txt",
 "https://core.parts/start-95?css": "https://core.parts/start-95.css",
 "https://core.parts/start-95?manifest": "https://core.parts/start-95.manifest.uri",
 "https://core.parts/start-95~?core": "https://core.parts/~",
 "https://core.parts/start-95?core": "https://core.parts/",
 "https://core.parts/start-95~?fx": "https://core.parts/start-95.fx.uri",
 "https://core.parts/start-95~~": "part()",
 "https://core.parts/start-icon.css": ":host { position: relative; box-sizing: border-box; height: 100%; margin: 0; background: magenta; width: 16px; height: 16px }",
 "https://core.parts/start-icon.fx.uri": "https://core.parts/start-icon",
 "https://core.parts/start-icon?css": "https://core.parts/start-icon.css",
 "https://core.parts/start-icon?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/start-icon~?core": "https://core.parts/~",
 "https://core.parts/start-icon?core": "https://core.parts/",
 "https://core.parts/start-icon~?fx": "https://core.parts/start-icon.fx.uri",
 "https://core.parts/start-icon~~": "part()",
 "https://core.parts/start-label.css": ":host { position: relative; box-sizing: border-box; margin: 0; height: 16px } :host::before { content: 'Start' }",
 "https://core.parts/start-label.fx.uri": "https://core.parts/start-label",
 "https://core.parts/start-label?css": "https://core.parts/start-label.css",
 "https://core.parts/start-label?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/start-label~?core": "https://core.parts/~",
 "https://core.parts/start-label?core": "https://core.parts/",
 "https://core.parts/start-label~?fx": "https://core.parts/start-label.fx.uri",
 "https://core.parts/start-label~~": "part()",

 "https://core.parts/start-menu.css?fx": "https://core.parts/start-menu.fx.uri",
 "https://core.parts/start-menu.css~": "`:host { position: relative; min-width: 164px; display: flex; flex-flow: column nowrap; position: absolute; left: 2px; bottom: calc(${height} - 4px); user-select: none; line-height: 18px; text-align: left; background: #c3c3c3; font: 12px sans-serif; box-sizing: border-box; line-height: 16px; padding: 3px 3px 3px 24px; text-align: left; background: #c3c3c3; box-shadow: inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb } :host::after { pointer-events: none; display: block; content: ''; position: absolute; left: 3px; top: 3px; bottom: 3px; background: #7f7f7f; width: 21px }`",
 "https://core.parts/start-menu.css?height": "https://core.parts/os/task-bar/css-height.txt",
 "https://core.parts/start-menu.manifest.uri": "https://core.parts/start-menu/welcome-folder https://core.parts/start-menu/network-folder https://core.parts/os/horizontal-line https://core.parts/start-menu/restart-server https://core.parts/start-menu/restart-computer https://core.parts/start-menu/save-computer",
 "https://core.parts/start-menu.fx.uri": "https://core.parts/start-menu",
 "https://core.parts/start-menu?css": "https://core.parts/start-menu.css",
 "https://core.parts/start-menu?manifest": "https://core.parts/start-menu.manifest.uri",
 "https://core.parts/start-menu?core": "https://core.parts/",
 "https://core.parts/start-menu~?core": "https://core.parts/~",
 "https://core.parts/start-menu~?fx": "https://core.parts/start-menu.fx.uri",
 "https://core.parts/start-menu~~": "part()",

 "https://core.parts/start-menu/click-to-close/onclick.js": "() => Ω['https://core.parts/os/start-menu/open.txt'] = '0'",
 "https://core.parts/start-menu/click-to-close?onclick": "https://core.parts/start-menu/click-to-close/onclick.js",
 "https://core.parts/start-menu/click-to-close.css": ":host { position: fixed; display: block; left: 0; top: 0; bottom: 0; right: 0; content: '' }",
 "https://core.parts/start-menu/click-to-close.fx.uri": "https://core.parts/start-menu/click-to-close",
 "https://core.parts/start-menu/click-to-close?css": "https://core.parts/start-menu/click-to-close.css",
 "https://core.parts/start-menu/click-to-close?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/start-menu/click-to-close~?core": "https://core.parts/~",
 "https://core.parts/start-menu/click-to-close?core": "https://core.parts/",
 "https://core.parts/start-menu/click-to-close~?fx": "https://core.parts/start-menu/click-to-close.fx.uri",
 "https://core.parts/start-menu/click-to-close~~": "part()",

 "https://core.parts/start-menu/network-folder.css": ":host { position: relative; display: flex; flex-flow: row nowrap; padding: 4px 0 } :host(:hover) { background: #00007f; color: white }",
 "https://core.parts/start-menu/network-folder.manifest.uri": "https://core.parts/start-menu/network-folder/app-icon https://core.parts/start-menu/network-folder/app-label",
 "https://core.parts/start-menu/network-folder.fx.uri": "https://core.parts/start-menu/network-folder",
 "https://core.parts/start-menu/network-folder?css": "https://core.parts/start-menu/network-folder.css",
 "https://core.parts/start-menu/network-folder?manifest": "https://core.parts/start-menu/network-folder.manifest.uri",
 "https://core.parts/start-menu/network-folder~?core": "https://core.parts/~",
 "https://core.parts/start-menu/network-folder?core": "https://core.parts/",
 "https://core.parts/start-menu/network-folder~?fx": "https://core.parts/start-menu/network-folder.fx.uri",
 "https://core.parts/start-menu/network-folder~~": "part()",

 "https://core.parts/start-menu/network-folder/app-icon.css": ":host { width: 24px; height: 24px; background: white; margin: 0 10px; }",
 "https://core.parts/start-menu/network-folder/app-icon.fx.uri": "https://core.parts/start-menu/network-folder/app-icon",
 "https://core.parts/start-menu/network-folder/app-icon?css": "https://core.parts/start-menu/network-folder/app-icon.css",
 "https://core.parts/start-menu/network-folder/app-icon?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/start-menu/network-folder/app-icon~?core": "https://core.parts/~",
 "https://core.parts/start-menu/network-folder/app-icon?core": "https://core.parts/",
 "https://core.parts/start-menu/network-folder/app-icon~?fx": "https://core.parts/start-menu/network-folder/app-icon.fx.uri",
 "https://core.parts/start-menu/network-folder/app-icon~~": "part()",

 "https://core.parts/start-menu/network-folder/app-label.css": ":host::after { height: 24px; font: 12px / 24px sans-serif; content: 'Network' }",
 "https://core.parts/start-menu/network-folder/app-label.fx.uri": "https://core.parts/start-menu/network-folder/app-label",
 "https://core.parts/start-menu/network-folder/app-label?css": "https://core.parts/start-menu/network-folder/app-label.css",
 "https://core.parts/start-menu/network-folder/app-label?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/start-menu/network-folder/app-label~?core": "https://core.parts/~",
 "https://core.parts/start-menu/network-folder/app-label?core": "https://core.parts/",
 "https://core.parts/start-menu/network-folder/app-label~?fx": "https://core.parts/start-menu/network-folder/app-label.fx.uri",
 "https://core.parts/start-menu/network-folder/app-label~~": "part()",

 "https://core.parts/os/horizontal-line.css": ":host { height: 2px; border-top: 1px solid #7f7f7f; border-bottom: 1px solid white; box-sizing: border-box; margin: 4px 0 }",
 "https://core.parts/os/horizontal-line.fx.uri": "https://core.parts/os/horizontal-line",
 "https://core.parts/os/horizontal-line?css": "https://core.parts/os/horizontal-line.css",
 "https://core.parts/os/horizontal-line?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/os/horizontal-line~?core": "https://core.parts/~",
 "https://core.parts/os/horizontal-line?core": "https://core.parts/",
 "https://core.parts/os/horizontal-line~?fx": "https://core.parts/os/horizontal-line.fx.uri",
 "https://core.parts/os/horizontal-line~~": "part()",

 "https://core.parts/start-menu/restart-server.css": ":host { position: relative; display: flex; flex-flow: row nowrap; padding: 4px 0 } :host(:hover) { background: #00007f; color: white }",
 "https://core.parts/start-menu/restart-server.manifest.uri": "https://core.parts/start-menu/restart-server/app-icon https://core.parts/start-menu/restart-server/app-label",
 "https://core.parts/start-menu/restart-server.fx.uri": "https://core.parts/start-menu/restart-server",
 "https://core.parts/start-menu/restart-server?css": "https://core.parts/start-menu/restart-server.css",
 "https://core.parts/start-menu/restart-server?manifest": "https://core.parts/start-menu/restart-server.manifest.uri",
 "https://core.parts/start-menu/restart-server~?core": "https://core.parts/~",
 "https://core.parts/start-menu/restart-server?core": "https://core.parts/",
 "https://core.parts/start-menu/restart-server~?fx": "https://core.parts/start-menu/restart-server.fx.uri",
 "https://core.parts/start-menu/restart-server~~": "part()",
 "https://core.parts/start-menu/restart-server/onclick.js": "" + (() => { navigator.serviceWorker.controller.postMessage('restart'); if (confirm('Restart computer too?')) location.reload() }),
 "https://core.parts/start-menu/restart-server?onclick": "https://core.parts/start-menu/restart-server/onclick.js",

 "https://core.parts/start-menu/restart-server/app-icon.css": ":host { width: 24px; height: 24px; background: grey; margin: 0 10px }",
 "https://core.parts/start-menu/restart-server/app-icon.fx.uri": "https://core.parts/start-menu/restart-server/app-icon",
 "https://core.parts/start-menu/restart-server/app-icon?css": "https://core.parts/start-menu/restart-server/app-icon.css",
 "https://core.parts/start-menu/restart-server/app-icon?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/start-menu/restart-server/app-icon~?core": "https://core.parts/~",
 "https://core.parts/start-menu/restart-server/app-icon?core": "https://core.parts/",
 "https://core.parts/start-menu/restart-server/app-icon~?fx": "https://core.parts/start-menu/restart-server/app-icon.fx.uri",
 "https://core.parts/start-menu/restart-server/app-icon~~": "part()",

 "https://core.parts/start-menu/restart-server/app-label.css": ":host::after { height: 24px; font: 12px / 24px sans-serif; content: 'Restart Server' }",
 "https://core.parts/start-menu/restart-server/app-label.fx.uri": "https://core.parts/start-menu/restart-server/app-label",
 "https://core.parts/start-menu/restart-server/app-label?css": "https://core.parts/start-menu/restart-server/app-label.css",
 "https://core.parts/start-menu/restart-server/app-label?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/start-menu/restart-server/app-label~?core": "https://core.parts/~",
 "https://core.parts/start-menu/restart-server/app-label?core": "https://core.parts/",
 "https://core.parts/start-menu/restart-server/app-label~?fx": "https://core.parts/start-menu/restart-server/app-label.fx.uri",
 "https://core.parts/start-menu/restart-server/app-label~~": "part()",

 "https://core.parts/start-menu/save-computer.css": ":host { position: relative; display: flex; flex-flow: row nowrap; padding: 4px 0; padding-right: 6px } :host(:hover) { background: #00007f; color: white }",
 "https://core.parts/start-menu/save-computer.manifest.uri": "https://core.parts/start-menu/save-computer/app-icon https://core.parts/start-menu/save-computer/app-label",
 "https://core.parts/start-menu/save-computer.fx.uri": "https://core.parts/start-menu/save-computer",
 "https://core.parts/start-menu/save-computer?css": "https://core.parts/start-menu/save-computer.css",
 "https://core.parts/start-menu/save-computer?manifest": "https://core.parts/start-menu/save-computer.manifest.uri",
 "https://core.parts/start-menu/save-computer~?core": "https://core.parts/~",
 "https://core.parts/start-menu/save-computer?core": "https://core.parts/",
 "https://core.parts/start-menu/save-computer~?fx": "https://core.parts/start-menu/save-computer.fx.uri",
 "https://core.parts/start-menu/save-computer~~": "part()",
 "https://core.parts/start-menu/save-computer/onclick.js": "" + (() => {
  const
   a = document.createElement('a'),
   json = JSON.stringify(Δ),
   js = "onfetch=(Ω=new Proxy({},new Proxy(" + json + ',{get:(Δ,Υ)=>eval(Δ[V="https://core.parts/core.js"])})))["https://core.parts/file.js"]',
   ourl = URL.createObjectURL(new Blob([json], { type: "application/json" }));
  a.href = ourl
  a.download = 'computer.json'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(ourl)
 }),
 "https://core.parts/start-menu/save-computer?onclick": "https://core.parts/start-menu/save-computer/onclick.js",

 "https://core.parts/start-menu/save-computer/app-icon.css": ":host { width: 24px; height: 24px; background: blue; margin: 0 10px }",
 "https://core.parts/start-menu/save-computer/app-icon.fx.uri": "https://core.parts/start-menu/save-computer/app-icon",
 "https://core.parts/start-menu/save-computer/app-icon?css": "https://core.parts/start-menu/save-computer/app-icon.css",
 "https://core.parts/start-menu/save-computer/app-icon?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/start-menu/save-computer/app-icon~?core": "https://core.parts/~",
 "https://core.parts/start-menu/save-computer/app-icon?core": "https://core.parts/",
 "https://core.parts/start-menu/save-computer/app-icon~?fx": "https://core.parts/start-menu/save-computer/app-icon.fx.uri",
 "https://core.parts/start-menu/save-computer/app-icon~~": "part()",

 "https://core.parts/start-menu/save-computer/app-label.css": ":host::after { height: 24px; font: 12px / 24px sans-serif; content: 'Save Computer' }",
 "https://core.parts/start-menu/save-computer/app-label.fx.uri": "https://core.parts/start-menu/save-computer/app-label",
 "https://core.parts/start-menu/save-computer/app-label?css": "https://core.parts/start-menu/save-computer/app-label.css",
 "https://core.parts/start-menu/save-computer/app-label?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/start-menu/save-computer/app-label~?core": "https://core.parts/~",
 "https://core.parts/start-menu/save-computer/app-label?core": "https://core.parts/",
 "https://core.parts/start-menu/save-computer/app-label~?fx": "https://core.parts/start-menu/save-computer/app-label.fx.uri",
 "https://core.parts/start-menu/save-computer/app-label~~": "part()",

 "https://core.parts/start-menu/restart-computer.css": ":host { position: relative; display: flex; flex-flow: row nowrap; padding: 4px 0; padding-right: 6px } :host(:hover) { background: #00007f; color: white }",
 "https://core.parts/start-menu/restart-computer.manifest.uri": "https://core.parts/start-menu/restart-computer/app-icon https://core.parts/start-menu/restart-computer/app-label",
 "https://core.parts/start-menu/restart-computer.fx.uri": "https://core.parts/start-menu/restart-computer",
 "https://core.parts/start-menu/restart-computer?css": "https://core.parts/start-menu/restart-computer.css",
 "https://core.parts/start-menu/restart-computer?manifest": "https://core.parts/start-menu/restart-computer.manifest.uri",
 "https://core.parts/start-menu/restart-computer~?core": "https://core.parts/~",
 "https://core.parts/start-menu/restart-computer?core": "https://core.parts/",
 "https://core.parts/start-menu/restart-computer~?fx": "https://core.parts/start-menu/restart-computer.fx.uri",
 "https://core.parts/start-menu/restart-computer~~": "part()",
 "https://core.parts/start-menu/restart-computer/onclick.js": "" + (() => { location.reload() }),
 "https://core.parts/start-menu/restart-computer?onclick": "https://core.parts/start-menu/restart-computer/onclick.js",

 "https://core.parts/start-menu/restart-computer/app-icon.css": ":host { width: 24px; height: 24px; background: blue; margin: 0 10px }",
 "https://core.parts/start-menu/restart-computer/app-icon.fx.uri": "https://core.parts/start-menu/restart-computer/app-icon",
 "https://core.parts/start-menu/restart-computer/app-icon?css": "https://core.parts/start-menu/restart-computer/app-icon.css",
 "https://core.parts/start-menu/restart-computer/app-icon?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/start-menu/restart-computer/app-icon~?core": "https://core.parts/~",
 "https://core.parts/start-menu/restart-computer/app-icon?core": "https://core.parts/",
 "https://core.parts/start-menu/restart-computer/app-icon~?fx": "https://core.parts/start-menu/restart-computer/app-icon.fx.uri",
 "https://core.parts/start-menu/restart-computer/app-icon~~": "part()",

 "https://core.parts/start-menu/restart-computer/app-label.css": ":host::after { height: 24px; font: 12px / 24px sans-serif; content: 'Restart Computer' }",
 "https://core.parts/start-menu/restart-computer/app-label.fx.uri": "https://core.parts/start-menu/restart-computer/app-label",
 "https://core.parts/start-menu/restart-computer/app-label?css": "https://core.parts/start-menu/restart-computer/app-label.css",
 "https://core.parts/start-menu/restart-computer/app-label?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/start-menu/restart-computer/app-label~?core": "https://core.parts/~",
 "https://core.parts/start-menu/restart-computer/app-label?core": "https://core.parts/",
 "https://core.parts/start-menu/restart-computer/app-label~?fx": "https://core.parts/start-menu/restart-computer/app-label.fx.uri",
 "https://core.parts/start-menu/restart-computer/app-label~~": "part()",

 "https://core.parts/taskbar-95.css": ":host { position: relative; width: 100%; box-sizing: border-box; height: 100%; margin: 0; display: flex; flex-flow: row nowrap; gap: 3px; height: 100%; padding: 4px 2px 2px; background: #c3c3c3; box-shadow: inset 0 1px #c3c3c3, inset 0 2px white }",
 "https://core.parts/taskbar-95.fx.uri": "https://core.parts/taskbar-95",
 "https://core.parts/taskbar-95.manifest.uri~": "`https://core.parts/start-95 ${'' + running_apps ? running_apps + ' ' : ''}https://core.parts/flex-spacer https://core.parts/tray-95`",
 "https://core.parts/taskbar-95.manifest.uri?running_apps": "https://core.parts/os/running_apps.uri",
 "https://core.parts/taskbar-95?css": "https://core.parts/taskbar-95.css",
 "https://core.parts/taskbar-95?manifest": "https://core.parts/taskbar-95.manifest.uri",
 "https://core.parts/taskbar-95~?core": "https://core.parts/~",
 "https://core.parts/taskbar-95?core": "https://core.parts/",
 "https://core.parts/taskbar-95~?fx": "https://core.parts/taskbar-95.fx.uri",
 "https://core.parts/taskbar-95~~": "part()",
 "https://core.parts/tray-95.css?fx": "https://core.parts/tray-95.fx.uri",
 "https://core.parts/tray-95.css~": "`:host { position: relative; display: flex; flex-flow: row nowrap; gap: 3px; box-sizing: border-box; height: 100%; margin: 0; user-select: none; font: 12px sans-serif; line-height: 16px; padding: 3px 4px 3px; text-align: left; background: #c3c3c3; box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a }`",
 "https://core.parts/tray-95.fx.uri": "https://core.parts/tray-95",
 "https://core.parts/tray-95.manifest.uri": "https://core.parts/fullscreen-button https://core.parts/time-h-mm",
 "https://core.parts/tray-95?css": "https://core.parts/tray-95.css",
 "https://core.parts/tray-95?manifest": "https://core.parts/tray-95.manifest.uri",
 "https://core.parts/tray-95~?core": "https://core.parts/~",
 "https://core.parts/tray-95?core": "https://core.parts/",
 "https://core.parts/tray-95~?fx": "https://core.parts/tray-95.fx.uri",
 "https://core.parts/tray-95~~": "part()",
 "https://core.parts/time-h-mm.css?fx": "https://core.parts/time-h-mm.fx.uri",
 "https://core.parts/time-h-mm.css~": "{ const minute = 1000 * 60, delay = minute - (Date.now() % minute); setTimeout(()=>{ β.date = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hourCycle: 'h12' }) }, delay + 5); return `:host::after { content: '${date}'; white-space: nowrap; }`}",
 "https://core.parts/time-h-mm.css?date": "https://core.parts/time-h-mm/date.txt",
 "https://core.parts/time-h-mm.fx.uri": "https://core.parts/time-h-mm",
 "https://core.parts/time-h-mm?css": "https://core.parts/time-h-mm.css",
 "https://core.parts/time-h-mm?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/time-h-mm~?core": "https://core.parts/~",
 "https://core.parts/time-h-mm?core": "https://core.parts/",
 "https://core.parts/time-h-mm~?fx": "https://core.parts/time-h-mm.fx.uri",
 "https://core.parts/time-h-mm~~": "part()",
 "https://core.parts/time-h-mm/date.txt~": "new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hourCycle: 'h12' })",
 "https://core.parts/time-h-mm/date.txt?fx": "https://core.parts/time-h-mm/date.txt.fx.uri",
 "https://core.parts/time-h-mm/date.txt.fx.uri": "https://core.parts/time-h-mm.css",
 "https://core.parts/utils/urlsToTags.js": "" + (manifest => manifest.split(' ').map(url => {
  if (!url) return ''
  const { part, path, host } = url.match(/^(?<protocol>https:\/\/)(?<host>[^\/]+?)(?:\/(?<path>(?:[^\s.~?\/]+?\/)*)(?:(?<part>[a-z][a-z0-9]*-[a-z0-9-]*)|(?<filename>[^\s~?\/]*)\.(?<extension>(?<binary>png|ico|woff2|wasm)|[^\s.~?\/]+))|\/(?<index>(?:[^\s.~?\/]+?\/)*))(?:~{0,6}\?(?<property>[a-zA-Z][a-zA-Z0-9_]*)(?:=(?<value>-?[\d]*\.?[\d]*)(?<properties>&(?:[a-zA-Z][a-zA-Z0-9_]*=-?[\d]*\.?[\d]*)+)?$)?)?(?<rank>~{0,7})$/)?.groups ?? {}
  return `<${part ?? 'article'}${host !== 'core.parts' ? ` host="${host}"` : ''}${path ? ` path="${path}"` : ''}></${part ?? 'article'}>`
 }).join('\n')),
 "https://core.parts/~?fx": "https://core.parts/.fx.uri",
 "https://core.parts/~?part": "https://core.parts/part.js",
 "https://core.parts/?toTags": "https://core.parts/utils/urlsToTags.js",
 "https://core.parts/?onpointermove": "https://core.parts/onpointermove.js",
 "https://core.parts/?onpointerup": "https://core.parts/onpointerup.js",
 "https://core.parts/onpointermove.js~": "(''+behavior) ? (''+Ω[behavior]) : '()=>{}'",
 "https://core.parts/onpointermove.js?behavior": "https://core.parts/grab-behavior.uri",
 "https://core.parts/onpointerup.js~": "`e => { ${(''+grab) ? `Ω['https://core.parts/grab-behavior.uri'] = ''` : ''}; ${(''+release) ? `Ω['${release}'](e); Ω['https://core.parts/release-behavior.uri'] = ''` : ''} }`",
 "https://core.parts/onpointerup.js?grab": "https://core.parts/grab-behavior.uri",
 "https://core.parts/onpointerup.js?release": "https://core.parts/release-behavior.uri",
 "https://core.parts/grab-behavior.uri": "",
 "https://core.parts/grab-behavior.uri?fx": "https://core.parts/grab-behavior.uri.fx.uri",
 "https://core.parts/grab-behavior.uri.fx.uri": "https://core.parts/onpointermove.js https://core.parts/onpointerup.js",
 "https://core.parts/release-behavior.uri": "",
 "https://core.parts/release-behavior.uri?fx": "https://core.parts/release-behavior.uri.fx.uri",
 "https://core.parts/release-behavior.uri.fx.uri": "https://core.parts/onpointerup.js",
 "https://core.parts/~~": "part()",
 "https://core.parts/client-to-server.js": "" + (({ data: key }) => {
  if (key === 'restart') registration.unregister()
 }),
 'https://core.parts/error-404~~': "part()",
 "https://core.parts/wasm/test.js": "WebAssembly.instantiateStreaming(onfetch('https://core.parts/wasm/test.wasm')).then(_ => console.log(_.instance.exports))",
 "https://core.parts/wasm/test.wasm": "AGFzbQEAAAABBwFgA39/fwADAgEABQMBAAEHDgIDbWVtAgAEZmlsbAAACg0BCwAgACABIAL8CwALAAoEbmFtZQIDAQAA",
 "https://core.parts/onload.js": "" + (() => {
  globalThis.inbox = {}
  const
   HOST = document.body,
   install = node => {
    if (!('Ω' in node)) return
    const
     container = node.attachShadow({ mode: "closed" }),
     sheet = new CSSStyleSheet(),
     remanifest = inbox[node.Ω.manifest.headerOf().href] = manifest => {
      // TODO: fun part! diff algorithm
      container.innerHTML = ''
      manifest.split(' ').forEach(url => {
       if (!url) return ''
       const
        child_proxy = Ω[url],
        { part } = child_proxy.headerOf().groups,
        child_node = container.appendChild(document.createElement(part));
       child_node.url = url
       child_node.Ω = child_proxy;
       install(child_node)
      })
     },
     restyle = inbox[node.Ω.css.headerOf().href] = css => {
      sheet.replace(css)
     };
    container.adoptedStyleSheets.push(sheet)
    for (const t of ['onclick', 'onpointerdown', 'onpointerup', 'onpointermove', 'ondblclick']) if (t in node.Ω) node[t] = node.Ω[t]
    node.ondragstart = e => e.preventDefault()
    restyle('' + node.Ω.css)
    remanifest('' + node.Ω.manifest)
   };
  HOST.url = location.href
  HOST.Ω = Ω[HOST.url]
  install(HOST);
  oncontextmenu = e => e.preventDefault()
 }),
}, { get: (Δ, Υ) => eval(Δ[V = "https://core.parts/core.js"]) })))["https://core.parts/file.js"]
onmessage = Ω['https://core.parts/client-to-server.js']