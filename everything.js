onfetch = (Ω = new Proxy({}, new Proxy({
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
  // context { Ω, Δ, V, Υ, υ, δ }
  const existing = Δ[υ];
  if (existing !== δ) {
   Δ[υ] = δ
   const fx = Ω[υ].fx, changed = new Set(), payload = { [υ]: δ }
   const update = new BroadcastChannel('update')
   update.postMessage(payload)
   this.onset?.(payload)
   update.close()
   if (fx) {
    ("" + fx).split(' ').forEach(url => changed.add(url))
    for (const change of changed) {
     //if (change in Δ) delete Δ[change]
     Ω[change][Symbol.toPrimitive]('provisional', υ)
    }
   }
  }
 }) + " }[Υ] ?? console.error('unexpected omega request', Υ))",
 "https://core.parts/core.js?apply": `https://core.parts/core/apply.js`,
 "https://core.parts/core.js?construct": "https://core.parts/core/throw/unused-native.js",
 "https://core.parts/core.js?defineProperty": "https://core.parts/core/throw/unused-native.js",
 "https://core.parts/core.js?deleteProperty": "https://core.parts/core/throw/unused-native.js",
 "https://core.parts/core.js?get": `https://core.parts/core/get.js`,
 "https://core.parts/core.js?getOwnPropertyDescriptor": `https://core.parts/core/getOwnPropertyDescriptor.js`,
 "https://core.parts/core.js?getPrototypeOf": `https://core.parts/core/getPrototypeOf.js`,
 "https://core.parts/core.js?has": `https://core.parts/core/has.js`,
 "https://core.parts/core.js?headerOf": `https://core.parts/core/headerOf.js`,
 "https://core.parts/core.js?isExtensible": `https://core.parts/core/isExtensible.js`,
 "https://core.parts/core.js?ownKeys": `https://core.parts/core/ownKeys.js`,
 "https://core.parts/core.js?preventExtensions": "https://core.parts/core/throw/unused-native.js",
 "https://core.parts/core.js?query": `https://core.parts/core/query.js`,
 "https://core.parts/core.js?rootsOf": `https://core.parts/core/rootsOf.js`,
 "https://core.parts/core.js?set": "https://core.parts/core/set.js",
 "https://core.parts/core.js?setPrototypeOf": "https://core.parts/core/throw/unused-native.js",
 "https://core.parts/core.js?toPrimitive": `https://core.parts/core/toPrimitive.js`,
 "https://core.parts/core.js?toString": `https://core.parts/core/toString.js`,
 "https://core.parts/core.js?valueOf": `https://core.parts/core/valueOf.js`,
 "https://core.parts/core/apply.js": "" + ((_, __, A) => eval("" + α)(...A)),
 "https://core.parts/core/get.js": "" + ((_, π) => {
  if (['toPrimitive', Symbol.toPrimitive, 'toString', 'valueOf', 'headerOf', 'rootsOf', 'query'].includes(π)) return α[π]
  if (!(π in β)) return undefined
  return Ω[Ω[`${υ}?${π}`]]
 }),
 "https://core.parts/core/getOwnPropertyDescriptor.js": "(_, π) => ({ configurable: true, enumerable: true, writable: true, value: α })",
 "https://core.parts/core/getPrototypeOf.js": "() => Object.prototype",
 "https://core.parts/core/has.js": "(_, π) => Δ[`${υ}?${π}`] !== undefined",
 "https://core.parts/core/headerOf.js": "" + (() => ({ kernelActionLocation: V, kernelActionKey: Υ, full: υ, metaKernel: α, self: β, groups: Ψ, metaKernelKey: π })),
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
  if (Δ[url] === undefined || hint === 'provisional') {
   while ((hint === 'provisional' && url === υ) || Δ[url] === undefined && rank.length < 7) {
    rank += '~'
    url += '~';
   }
   if (Δ[url] === undefined) return (url.includes('?click') ? undefined : console.warn(new TypeError('possible fx with no constructor ' + url)), '')
   rank = rank.slice(0, -1)
   url = url.slice(0, -1)
   const properties = {}
   Ω[url].query(l => {
    if (l.property in properties && properties[l.property].rootIndex <= l.rootIndex) return;
    properties[l.property] = l
   })
   const primitive = eval(`({${Object.entries(properties).map(([property, { url }]) => `"${Ω[url]}":${property}`).join(',')}})=>${Ω[`${url}~`]}`)(Ω)
   if (typeof primitive !== 'string') throw new TypeError(`output of ${url} must be a string (got ${typeof primitive})`)
   Ω[url] = primitive
  }
  return Δ[υ]
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
    if (property === 'click') {
     const fnurl = '' + Ω[url];
     if (fnurl) {
      const proxy = Ω[Ω[fnurl]],
       { value, property, target } = proxy.headerOf().groups
      if (!(value && property && target)) throw new TypeError(`bad format event handler chain (${url} => ${fnurl})`)
      //console.log(fnurl, target, property, value)
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
 "https://core.parts/os-95.css?fx": "https://core.parts/.fx.uri",
 "https://core.parts/os-95.css?height": "https://core.parts/os/task-bar/css-height.txt",
 "https://core.parts/os-95.css~": "`:host { position: fixed; top: 0; left: 0; width: 100%; box-sizing: border-box; height: 100%; margin: 0; display: grid; grid-template-rows: 1fr ${height} }`",
 "https://core.parts/os-95.manifest.uri~": "`https://core.parts/desktop-95 https://core.parts/os/running/window/display-properties https://core.parts/taskbar-95  ${''+start_menu === '1' ? 'https://core.parts/start-menu': ''}`",
 "https://core.parts/os-95.manifest.uri?fx": "https://core.parts/.fx.uri",
 "https://core.parts/os-95.manifest.uri?start_menu": "https://core.parts/os/start-menu/open.txt",
 "https://core.parts/os/running/display-properties.click.js~": "`() => Ω['https://core.parts/os/running/display-properties/open.txt'] = ${(''+open) === '1' ? '0' : '1'}`",
 "https://core.parts/os/running/display-properties.click.js?open": "https://core.parts/os/running/display-properties/open.txt",
 "https://core.parts/os/running/display-properties.css?fx": "https://core.parts/os/running/display-properties.fx.uri",
 "https://core.parts/os/running/display-properties.css?open": "https://core.parts/os/running/display-properties/open.txt",
 "https://core.parts/os/running/display-properties.css~": "`:host { position: relative; height: 100%; margin: 0; width: 160px; display: flex; flex-flow: row nowrap; gap: 3px; border: none; font: bold 12px sans-serif; box-sizing: border-box; line-height: 16px; padding: ${('' + open) === '0' ? 3 : 4}px 2px 2px; text-align: left; box-shadow: ${('' + open) === '0' ? 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb' : 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a'} } ${('' + open) === '1' ? ':host::after { content: \"\"; position: absolute; margin: 3px; left: 0; right: 0; top: 0; bottom: 0; border: 1px dotted black; pointer-events: none; }' : ''} ${(''+open) === '1' ? ' :host > * { position: relative; z-index: 3 } :host::before { content: \"\"; position: absolute; margin: 2px; border-top: 1px solid white; left: 0; right: 0; top: 0; bottom: 0; background-image:linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white),linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white);background-size: 2px 2px;background-position: 0 0, 1px 1px; }' : ''}`",
 "https://core.parts/os/running/display-properties.fx.uri": "https://core.parts/os/running/display-properties",
 "https://core.parts/os/running/display-properties.manifest.uri?open": "https://core.parts/os/running/display-properties/open.txt",
 "https://core.parts/os/running/display-properties.manifest.uri": "https://core.parts/display-properties/app-icon https://core.parts/display-properties/app-label https://core.parts/hit-box",
 "https://core.parts/os/running/display-properties/datum.txt": "https://core.parts/os/running/display-properties/open.txt",
 "https://core.parts/os/running/display-properties/index.fx.uri": "https://core.parts/os/running/display-properties/open.txt",
 "https://core.parts/os/running/display-properties/index.txt?datum": "https://core.parts/os/running/display-properties/datum.txt",
 "https://core.parts/os/running/display-properties/index.txt?fx": "https://core.parts/os/running/display-properties/index.fx.uri",
 "https://core.parts/os/running/display-properties/index.txt?order": "https://core.parts/os/task-bar/order.fx.uri",
 "https://core.parts/os/running/display-properties/index.txt~": "''+(''+order).split(' ').indexOf(''+datum)",
 "https://core.parts/os/running/display-properties/open.fx.uri": "https://core.parts/os/running/display-properties.css https://core.parts/os/task-bar/selected.txt https://core.parts/os/running/display-properties.click.js",
 "https://core.parts/os/running/display-properties/open.txt?fx": "https://core.parts/os/running/display-properties/open.fx.uri",
 "https://core.parts/os/running/display-properties/open.txt?index": "https://core.parts/os/running/display-properties/index.txt",
 "https://core.parts/os/running/display-properties/open.txt?selected": "https://core.parts/os/task-bar/selected.txt",
 "https://core.parts/os/running/display-properties/open.txt~": "('' + selected) === ('' + index) ? '1' : '0'",
 "https://core.parts/os/running/display-properties?click": "https://core.parts/os/running/display-properties.click.js",
 "https://core.parts/os/running/display-properties?css": "https://core.parts/os/running/display-properties.css",
 "https://core.parts/os/running/display-properties?manifest": "https://core.parts/os/running/display-properties.manifest.uri",
 "https://core.parts/os/running/display-properties~?core": "https://core.parts/~",
 "https://core.parts/os/running/display-properties?core": "https://core.parts/",
 "https://core.parts/os/running/display-properties~?fx": "https://core.parts/os/running/display-properties.fx.uri",
 "https://core.parts/os/running/display-properties~~": "part()",
 "https://core.parts/os/running/display-properties?z": "https://core.parts/os/running/display-properties/pointer-z.txt",
 "https://core.parts/os/running/display-properties/pointer-z.txt": "0",
 "https://core.parts/os/running/display-properties/pointer-z.txt?fx": "https://core.parts/os/running/display-properties/pointer.fx.uri",
 "https://core.parts/os/running/display-properties/pointer.fx.uri": "https://core.parts/os/running/display-properties/pointer.json ",
 "https://core.parts/os/running/display-properties/pointer.json~": "JSON.stringify({ z:''+z })",
 "https://core.parts/os/running/display-properties/pointer.json?fx": "https://core.parts/os/running/display-properties/pointer.json.fx.uri",
 "https://core.parts/os/running/display-properties/pointer.json?z": "https://core.parts/os/running/display-properties/pointer-z.txt",
 "https://core.parts/os/running/display-properties/pointer.json.fx.uri": "https://core.parts/debug-session-1.css",
 "https://core.parts/display-properties/app-icon.css": ":host { position: relative; width: 100%; box-sizing: border-box; height: 100%; margin: 0; background: magenta; width: 16px; height: 16px; vertical-align: center }",
 "https://core.parts/display-properties/app-icon.fx.uri": "https://core.parts/display-properties/app-icon",
 "https://core.parts/display-properties/app-icon?css": "https://core.parts/display-properties/app-icon.css",
 "https://core.parts/display-properties/app-icon?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/display-properties/app-icon~?core": "https://core.parts/~",
 "https://core.parts/display-properties/app-icon?core": "https://core.parts/",
 "https://core.parts/display-properties/app-icon~?fx": "https://core.parts/display-properties/app-icon.fx.uri",
 "https://core.parts/display-properties/app-icon~~": "part()",
 "https://core.parts/display-properties/app-label.css": ":host { margin: 0; background: magenta; height: 16px; vertical-align: center } :host::after { content: 'Display Properties' }",
 "https://core.parts/display-properties/app-label.fx.uri": "https://core.parts/display-properties/app-label",
 "https://core.parts/display-properties/app-label?css": "https://core.parts/display-properties/app-label.css",
 "https://core.parts/display-properties/app-label?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/display-properties/app-label~?core": "https://core.parts/~",
 "https://core.parts/display-properties/app-label?core": "https://core.parts/",
 "https://core.parts/display-properties/app-label~?fx": "https://core.parts/display-properties/app-label.fx.uri",
 "https://core.parts/display-properties/app-label~~": "part()",
 "https://core.parts/os/running/window/display-properties.css?fx": "https://core.parts/os/running/window/display-properties.fx.uri",
 "https://core.parts/os/running/window/display-properties.css~": "`:host { position: absolute; left: ${left}px; top: ${top}px; margin: 0; user-select: none; line-height: 18px; padding: 2px 8px 2px; text-align: left; background: #c3c3c3; font: 12px sans-serif; box-sizing: border-box; line-height: 16px; padding: 4px 4px 2px; text-align: left; background: #c3c3c3; box-shadow: inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb }`",
 "https://core.parts/os/running/window/display-properties.css?left": "https://core.parts/os/running/window/display-properties/left.txt",
 "https://core.parts/os/running/window/display-properties.css?top": "https://core.parts/os/running/window/display-properties/top.txt",
 "https://core.parts/os/running/window/display-properties.manifest.uri": "https://core.parts/debug-session-1",
 "https://core.parts/os/running/window/display-properties.fx.uri": "https://core.parts/os/running/window/display-properties",
 "https://core.parts/os/running/window/display-properties?css": "https://core.parts/os/running/window/display-properties.css",
 "https://core.parts/os/running/window/display-properties?manifest": "https://core.parts/os/running/window/display-properties.manifest.uri",
 "https://core.parts/os/running/window/display-properties?core": "https://core.parts/",
 "https://core.parts/os/running/window/display-properties~?core": "https://core.parts/~",
 "https://core.parts/os/running/window/display-properties~?fx": "https://core.parts/os/running/window/display-properties.fx.uri",
 "https://core.parts/os/running/window/display-properties~~": "part()",
 "https://core.parts/os/running/window/display-properties/left.txt": "64",
 "https://core.parts/os/running/window/display-properties/top.txt": "32",
 "https://core.parts/os/start-menu/open.txt.fx.uri": "https://core.parts/start-95.css https://core.parts/os/task-bar/selected.txt https://core.parts/start-95.click.js https://core.parts/os-95.manifest.uri",
 "https://core.parts/os/start-menu/open.txt?fx": "https://core.parts/os/start-menu/open.txt.fx.uri",
 "https://core.parts/os/start-menu/open.txt?selected": "https://core.parts/os/task-bar/selected.txt",
 "https://core.parts/os/start-menu/open.txt~": "('' + selected) === '0' ? '1' : '0'",
 "https://core.parts/os/task-bar/css-height.txt": "28px",
 "https://core.parts/os/task-bar/css-height.txt.fx.uri": "https://core.parts/os-95.css https://core.parts/start-menu.css",
 "https://core.parts/os/task-bar/order.fx.uri": "https://core.parts/os/start-menu/open.txt https://core.parts/os/running/display-properties/open.txt",
 "https://core.parts/os/task-bar/selected.txt": "0",
 "https://core.parts/os/task-bar/selected.txt?fx": "https://core.parts/os/task-bar/order.fx.uri",
 "https://core.parts/os/task-bar/selected.txt~": `''+(''+β.fx).split(' ').findIndex(x => (caller && Δ[caller] === '1') ? (x === caller) : (''+Ω[x]==='1'))`,
 "https://core.parts/part.js": "" + (() => `\`<!DOCTYPE html><script src="https://core.parts/everything.js"></script><script>onload = Ω["https://core.parts/onload.js"]</script>\``),
 "https://core.parts/patterns/tagname.regex": "" + /^[a-z][a-z0-9]*-[a-z0-9-]*$/,
 "https://core.parts/patterns/url.regex": "" + /^(?<protocol>https:\/\/)(?<host>[^\/]+?)(?:\/(?<path>(?:[^\s.~?\/]+?\/)*)(?:(?<part>[a-z][a-z0-9]*-[a-z0-9-]*)|(?<filename>[^\s~?\/]*)\.(?<extension>(?<binary>png|ico|woff2|wasm)|[^\s.~?\/]+))|\/(?<index>(?:[^\s.~?\/]+?\/)*))(?:~{0,6}\?(?<property>[a-zA-Z][a-zA-Z0-9_]*)(?:=(?<value>-?[\d]*\.?[\d]*)(?<properties>&(?:[a-zA-Z][a-zA-Z0-9_]*=-?[\d]*\.?[\d]*)+)?$)?)?(?<rank>~{0,7})$/,
 "https://core.parts/start-95.click.js~": "`() => Ω['https://core.parts/os/start-menu/open.txt'] = ${(''+open) === '1' ? '0' : '1'}`",
 "https://core.parts/start-95.click.js?open": "https://core.parts/os/start-menu/open.txt",
 "https://core.parts/start-95.css?fx": "https://core.parts/start-95.fx.uri",
 "https://core.parts/start-95.css?open": "https://core.parts/os/start-menu/open.txt",
 "https://core.parts/start-95.css~": "`:host { flex: 0 0; position: relative; width: 100%; box-sizing: border-box; height: 100%; display: flex; flex-flow: row nowrap; gap: 3px; border: none; font: bold 12px sans-serif; box-sizing: border-box; line-height: ${('' + open) === '0' ? 16 : 16}px; padding: ${('' + open) === '0' ? 3 : 4}px 4px 2px; text-align: left; background: #c3c3c3; box-shadow: ${('' + open) === '0' ? 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb' : 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a'} } ${('' + open) === '1' ? ':host::after { content: \"\"; position: absolute; margin: 3px; left: 0; right: 0; top: 0; bottom: 0; border: 1px dotted black; pointer-events: none; }' : ''}`",
 "https://core.parts/start-95.fx.uri": "https://core.parts/start-95",
 "https://core.parts/start-95.manifest.uri": "https://core.parts/start-icon https://core.parts/start-label https://core.parts/hit-box",
 "https://core.parts/start-95.manifest.uri?open": "https://core.parts/os/start-menu/open.txt",
 "https://core.parts/start-95?click": "https://core.parts/start-95.click.js",
 "https://core.parts/start-95?css": "https://core.parts/start-95.css",
 "https://core.parts/start-95?manifest": "https://core.parts/start-95.manifest.uri",
 "https://core.parts/start-95~?core": "https://core.parts/~",
 "https://core.parts/start-95?core": "https://core.parts/",
 "https://core.parts/start-95~?fx": "https://core.parts/start-95.fx.uri",
 "https://core.parts/start-95~~": "part()",
 "https://core.parts/start-95?z": "https://core.parts/start-95/pointer-z.txt",
 "https://core.parts/start-95/pointer-z.txt": "0",
 "https://core.parts/start-95/pointer-z.txt?fx": "https://core.parts/start-95/pointer.fx.uri",
 "https://core.parts/start-95/pointer.fx.uri": "https://core.parts/start-95/pointer.json",
 "https://core.parts/start-95/pointer.json~": "JSON.stringify({ z:''+z })",
 "https://core.parts/start-95/pointer.json?fx": "https://core.parts/start-95/pointer.json.fx.uri",
 "https://core.parts/start-95/pointer.json?z": "https://core.parts/start-95/pointer-z.txt",
 "https://core.parts/start-95/pointer.json.fx.uri": "https://core.parts/debug-session-0.css",
 "https://core.parts/start-icon.css": ":host { position: relative; box-sizing: border-box; height: 100%; margin: 0; background: magenta; width: 16px; height: 16px }",
 "https://core.parts/start-icon.fx.uri": "https://core.parts/start-icon",
 "https://core.parts/start-icon?css": "https://core.parts/start-icon.css",
 "https://core.parts/start-icon?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/start-icon~?core": "https://core.parts/~",
 "https://core.parts/start-icon?core": "https://core.parts/",
 "https://core.parts/start-icon~?fx": "https://core.parts/start-icon.fx.uri",
 "https://core.parts/start-icon~~": "part()",
 "https://core.parts/hit-box.css": ":host { position: absolute; left: 0; top: 0; height: 100%; margin: 0; width: 100%; background: #9513ff50 }",
 "https://core.parts/hit-box.fx.uri": "https://core.parts/hit-box",
 "https://core.parts/hit-box?css": "https://core.parts/hit-box.css",
 "https://core.parts/hit-box?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/hit-box~?core": "https://core.parts/~",
 "https://core.parts/hit-box?core": "https://core.parts/",
 "https://core.parts/hit-box~?fx": "https://core.parts/hit-box.fx.uri",
 "https://core.parts/hit-box~~": "part()",
 "https://core.parts/start-label.css": ":host { position: relative; box-sizing: border-box; margin: 0; height: 16px } :host::before { content: 'Start' }",
 "https://core.parts/start-label.fx.uri": "https://core.parts/start-label",
 "https://core.parts/start-label?css": "https://core.parts/start-label.css",
 "https://core.parts/start-label?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/start-label~?core": "https://core.parts/~",
 "https://core.parts/start-label?core": "https://core.parts/",
 "https://core.parts/start-label~?fx": "https://core.parts/start-label.fx.uri",
 "https://core.parts/start-label~~": "part()",
 "https://core.parts/start-menu.css?fx": "https://core.parts/start-menu.fx.uri",
 "https://core.parts/start-menu.css~": "`:host { position: absolute; left: 2px; bottom: calc(${height} - 4px); margin: 0; user-select: none; line-height: 18px; padding: 2px 8px 2px; text-align: left; background: #c3c3c3; font: 12px sans-serif; box-sizing: border-box; line-height: 16px; padding: 4px 4px 2px; text-align: left; background: #c3c3c3; box-shadow: inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb }`",
 "https://core.parts/start-menu.css?height": "https://core.parts/os/task-bar/css-height.txt",
 "https://core.parts/start-menu.manifest.uri": "https://core.parts/debug-session-0",
 "https://core.parts/start-menu.fx.uri": "https://core.parts/start-menu",
 "https://core.parts/start-menu?css": "https://core.parts/start-menu.css",
 "https://core.parts/start-menu?manifest": "https://core.parts/start-menu.manifest.uri",
 "https://core.parts/start-menu?core": "https://core.parts/",
 "https://core.parts/start-menu~?core": "https://core.parts/~",
 "https://core.parts/start-menu~?fx": "https://core.parts/start-menu.fx.uri",
 "https://core.parts/start-menu~~": "part()",
 "https://core.parts/debug-session-0.css~": "`:host { position: relative; box-sizing: border-box; margin: 0; height: 16px } :host::before { content: '${json}' }`",
 "https://core.parts/debug-session-0.css?json": "https://core.parts/start-95/pointer.json",
 "https://core.parts/debug-session-0.fx.uri": "https://core.parts/debug-session-0",
 "https://core.parts/debug-session-0?css": "https://core.parts/debug-session-0.css",
 "https://core.parts/debug-session-0?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/debug-session-0~?core": "https://core.parts/~",
 "https://core.parts/debug-session-0?core": "https://core.parts/",
 "https://core.parts/debug-session-0~?fx": "https://core.parts/debug-session-0.fx.uri",
 "https://core.parts/debug-session-0~~": "part()",
 "https://core.parts/debug-session-1.css~": "`:host { position: relative; box-sizing: border-box; margin: 0; height: 16px } :host::before { content: '${json}' }`",
 "https://core.parts/debug-session-1.css?json": "https://core.parts/os/running/display-properties/pointer.json",
 "https://core.parts/debug-session-1.fx.uri": "https://core.parts/debug-session-1",
 "https://core.parts/debug-session-1?css": "https://core.parts/debug-session-1.css",
 "https://core.parts/debug-session-1?manifest": "https://core.parts/empty.manifest.uri",
 "https://core.parts/debug-session-1~?core": "https://core.parts/~",
 "https://core.parts/debug-session-1?core": "https://core.parts/",
 "https://core.parts/debug-session-1~?fx": "https://core.parts/debug-session-1.fx.uri",
 "https://core.parts/debug-session-1~~": "part()",
 "https://core.parts/taskbar-95.css": ":host { position: relative; width: 100%; box-sizing: border-box; height: 100%; margin: 0; display: flex; flex-flow: row nowrap; gap: 3px; height: 100%; padding: 4px 2px 2px; background: #c3c3c3; box-shadow: inset 0 1px #c3c3c3, inset 0 2px white }",
 "https://core.parts/taskbar-95.fx.uri": "https://core.parts/taskbar-95",
 "https://core.parts/taskbar-95.manifest.uri": "https://core.parts/start-95 https://core.parts/os/running/display-properties https://core.parts/flex-spacer https://core.parts/tray-95",
 "https://core.parts/taskbar-95?css": "https://core.parts/taskbar-95.css",
 "https://core.parts/taskbar-95?manifest": "https://core.parts/taskbar-95.manifest.uri",
 "https://core.parts/taskbar-95~?core": "https://core.parts/~",
 "https://core.parts/taskbar-95?core": "https://core.parts/",
 "https://core.parts/taskbar-95~?fx": "https://core.parts/taskbar-95.fx.uri",
 "https://core.parts/taskbar-95~~": "part()",
 "https://core.parts/tray-95.css?fx": "https://core.parts/tray-95.fx.uri",
 "https://core.parts/tray-95.css~": "`:host { position: relative; display: flex; flex-flow: row nowrap; gap: 3px; box-sizing: border-box; height: 100%; margin: 0; user-select: none; font: 12px sans-serif; line-height: 16px; padding: 3px 4px 3px; text-align: left; background: #c3c3c3; box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a }`",
 "https://core.parts/tray-95.fx.uri": "https://core.parts/tray-95",
 "https://core.parts/tray-95.manifest.uri": "https://core.parts/display-properties/app-icon https://core.parts/time-h-mm",
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
 "https://core.parts/~~": "part()",
 'https://core.parts/error-404~~': "part()",
 "https://core.parts/wasm/test.js": "WebAssembly.instantiateStreaming(onfetch('https://core.parts/wasm/test.wasm')).then(_ => console.log(_.instance.exports))",
 "https://core.parts/wasm/test.wasm": "AGFzbQEAAAABBwFgA39/fwADAgEABQMBAAEHDgIDbWVtAgAEZmlsbAAACg0BCwAgACABIAL8CwALAAoEbmFtZQIDAQAA",
 "https://core.parts/onload.js": "" + (() => {
  this.onset = data => {
   for (const url in data) inbox[url]?.(data[url])
  }
  const
   outbox = new Map(),
   send = () => {
    outbox.forEach((props, proxy) => Object.entries(props).forEach(([prop, value]) => proxy[prop] = value))
    requestAnimationFrame(send)
   },
   HOST = document.body,
   inbox = {},
   install = node => {
    if (!('Ω' in node)) return
    const
     container = node.attachShadow({ mode: "closed" }),
     sheet = new CSSStyleSheet();
    container.adoptedStyleSheets.push(sheet);
    if (node.tagName === 'HIT-BOX') {
     const pointer_proxy = Ω[node.parentNode.host.url];
     let down = false;
     node.onpointerdown = e => { e.preventDefault(); down = true; node.setPointerCapture(e.pointerId); outbox.set(pointer_proxy, { ...(outbox.get(pointer_proxy) ?? {}), z: 1 - e.button }) }
     ['up', 'leave', 'cancel'].forEach(t => node['onpointer' + t] = e => { e.preventDefault(); if (!down) return; down = false; node.releasePointerCapture(e.pointerId); outbox.set(pointer_proxy, { ...(outbox.get(pointer_proxy) ?? {}), z: 0 }) })
    }
    //new ResizeObserver(([{ contentRect: { height, width } }]) => outbox.set(node.Ω, { w: width, h: height })).observe(node);
    (inbox[node.url + '.css'] = css => {
     sheet.replace(css)
    })('' + node.Ω.css);
    (inbox[node.url + '.manifest.uri'] = manifest => {
     // TODO: fun part! diff algorithm
     node.innerHTML = ''
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
    })('' + node.Ω.manifest)
   };
  HOST.url = location.href
  HOST.Ω = Ω[HOST.url]
  install(HOST);
  oncontextmenu = e => e.preventDefault()
  requestAnimationFrame(send)
 }),
}, { get: (Δ, Υ) => eval(Δ[V = "https://core.parts/core.js"]) })))["https://core.parts/file.js"]

// Ω