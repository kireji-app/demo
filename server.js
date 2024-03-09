onfetch = (Ω = new Proxy({
 "https://core.parts/part.js": "" + (hasScript => `\`<!DOCTYPE html>${hasScript ? '<script>${js}</script>' : ''}<style>iframe { border: none } \${css}</style>\${html}\``),

 "https://core.parts/~~": "part()",
 "https://core.parts/~?part": "https://core.parts/part.js",
 "https://core.parts/?css": "https://core.parts/os-95.css",
 "https://core.parts/?html": "https://core.parts/os-95.html",

 'https://core.parts/error-404~~': "part()",
 "https://core.parts/error-404~?core": "https://core.parts/~",
 "https://core.parts/error-404?css": "https://core.parts/error-404.css",
 "https://core.parts/error-404?html": "https://core.parts/error-404.html",
 "https://core.parts/error-404.css": "body { margin: 0; background: magenta }",
 "https://core.parts/error-404.html": "",

 "https://core.parts/desktop-95~~": "part()",
 "https://core.parts/desktop-95~?core": "https://core.parts/~",
 "https://core.parts/desktop-95?css": "https://core.parts/desktop-95.css",
 "https://core.parts/desktop-95?html": "https://core.parts/desktop-95.html",
 "https://core.parts/desktop-95.css": "body { margin: 0; background: #377f7f }",
 "https://core.parts/desktop-95.html": "",

 "https://core.parts/taskbar-95~~": "part()",
 "https://core.parts/taskbar-95~?core": "https://core.parts/~",
 "https://core.parts/taskbar-95?css": "https://core.parts/taskbar-95.css",
 "https://core.parts/taskbar-95?html": "https://core.parts/taskbar-95.html",
 "https://core.parts/taskbar-95.css": "body { margin: 0; height: 28px; padding: 4px 2px 2px; background: #c3c3c3; box-shadow: inset 0 1px #c3c3c3, inset 0 2px white } body > * { height: 22px } body > :first-child { width: 54px } body > :last-child { width: 64px }",
 "https://core.parts/taskbar-95.html?core": "https://core.parts/os-95.html",
 "https://core.parts/taskbar-95.html~": "iframes('https://core.parts/start-95', 'https://core.parts/tray-95')",

 "https://core.parts/start-95~~": "part(true)",
 "https://core.parts/start-95~?core": "https://core.parts/~",
 "https://core.parts/start-95.css?open": "https://core.parts/os/start-menu/open.txt",
 "https://core.parts/start-95?js": "https://core.parts/client/call.js",
 "https://core.parts/start-95?css": "https://core.parts/start-95.css",
 "https://core.parts/start-95?html": "https://core.parts/start-95.html",
 "https://core.parts/start-95?open": "https://core.parts/os/start-menu/open.txt",
 "https://core.parts/start-95.css~": "`body { user-select: none; font: bold 12px sans-serif; width: 54px; margin: 0; box-sizing: border-box; line-height: 18px; padding: 2px 5px 2px; text-align: right; background: #c3c3c3; box-shadow: ${console.log('rebuild css',('' + open) === '0'), ('' + open) === '0' ? 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a' : 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a'} } ${('' + open) === '1' ? 'body::after { content: \"\"; position: absolute; margin: 4px; left: 0; right: 0; top: 0; bottom: 0; border: 1px dotted black }' : ''}`",
 "https://core.parts/start-95.html~": "`<body onpointerdown=\"ƒ('open', ${console.log('rebuild html',(''+open) === '1' ? '0' : '1'), (''+open) === '1' ? '0' : '1'})\"><b>Start</b>`",
 "https://core.parts/start-95.html?affect": "https://core.parts/start-95.listeners.html",
 "https://core.parts/start-95.css?affect": "https://core.parts/start-95.listeners.html",
 "https://core.parts/start-95.html?open": "https://core.parts/os/start-menu/open.txt",

 "https://core.parts/start-95.listeners.html": "https://core.parts/start-95~",

 "https://core.parts/tray-95~~": "part()",
 "https://core.parts/tray-95~?core": "https://core.parts/~",
 "https://core.parts/tray-95?css": "https://core.parts/tray-95.css",
 "https://core.parts/tray-95?html": "https://core.parts/tray-95.html",
 "https://core.parts/tray-95.css~": "`body { user-select: none; font: 12px sans-serif; width: 64px; margin: 0; box-sizing: border-box; line-height: 18px; padding: 2px 8px 2px; text-align: right; background: #c3c3c3; box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a }`",
 "https://core.parts/tray-95.html~": "new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })",

 "https://core.parts/client/call.js": "ƒ=" + ((x, y) => fetch(`${location.href}?${x}=${y}`)) + ";new BroadcastChannel('update').onmessage=msg=>{ if (msg.data.includes(location.href)) location.reload() }",

 "https://core.parts/os/start-menu/open.txt": "1",
 "https://core.parts/os/start-menu/open.txt?affect": "https://core.parts/os/start-menu/open.listeners.txt",

 "https://core.parts/os/start-menu/open.listeners.txt": "https://core.parts/start-95.css https://core.parts/start-95.html",

 "https://core.parts/os-95.html~": "iframes('https://core.parts/desktop-95', 'https://core.parts/taskbar-95')",
 "https://core.parts/os-95.html?iframes": "https://core.parts/utils/html/iframes.js",
 "https://core.parts/utils/html/iframes.js": "(...K) => K.map(k => `<iframe src=\"${k}\"></iframe>`).join('\\n')",
 "https://core.parts/os-95.css": ":root, body { overflow: hidden } :root { display: grid; height: 100% } body { margin: 0; display: grid; grid-template-rows: 1fr 28px } iframe { height: 100%; width: 100%; border: none }",
 "https://core.parts/apple-touch-icon.png": "<?=b64('icon.png')?>",
 "https://core.parts/favicon.ico?src": "https://core.parts/apple-touch-icon.png",
 "https://core.parts/patterns/tagname.regex": "" + /^[a-z][a-z0-9]*-[a-z0-9-]*$/,
 "https://core.parts/patterns/url.regex": "" + /^(?<protocol>https:\/\/)(?<host>[^\/]+?)(?:\/(?<path>(?:[^\s.~?\/]+?\/)*)(?:(?<part>[a-z][a-z0-9]*-[a-z0-9-]*)|(?<filename>[^\s~?\/]*)\.(?<extension>(?<binary>png|ico|woff2)|[^\s.~?\/]+))|\/(?<index>(?:[^\s.~?\/]+?\/)*))(?:~{0,6}\?(?<property>[a-zA-Z][a-zA-Z0-9-]+)(?:=(?<assign>[01])$)?)?(?<rank>~{0,7})$/,
 "https://core.parts/favicon.ico~": "src[Symbol.toPrimitive]()",

 // TODO get crossorigin
 "https://core.parts/file.js": "" + (event => {
  const
   { url } = event.request,
   proxy = Ω[url],
   { binary, type, assign, property, target } = proxy.headerOf();
  let string = '';
  if (assign) Ω[target][property] = assign
  else string = proxy.toPrimitive()
  var body = new TextEncoder().encode(string);
  if (binary) {
   const B = atob(string), k = B.length, A = new ArrayBuffer(k), I = new Uint8Array(A);
   for (var i = 0; i < k; i++) I[i] = B.charCodeAt(i);
   body = new Blob([I], { type });
  }
  event.respondWith(new Response(body, { headers: { "content-type": `${type}${binary ? '' : '; charset=UTF-8'}`, "expires": "Sun, 20 Jul 1969 20:17:00 UTC", "server": "kireji" } }))
 }),

 "https://core.parts/core.js": "(α = new Proxy(Proxy, { get: " + ((_, Π) => {
  // alpha get handler
  const
   π = ({ [Symbol.toPrimitive]: 'toPrimitive' }[Π] ?? Π),
   Ψ = υ.match(/^(?<protocol>https:\/\/)(?<host>[^\/]+?)(?:\/(?<path>(?:[^\s.~?\/]+?\/)*)(?:(?<part>[a-z][a-z0-9]*-[a-z0-9-]*)|(?<filename>[^\s~?\/]*)\.(?<extension>(?<binary>png|ico|woff2)|[^\s.~?\/]+))|\/(?<index>(?:[^\s.~?\/]+?\/)*))(?:~{0,6}\?(?<property>[a-zA-Z][a-zA-Z0-9-]+)(?:=(?<assign>[01])$)?)?(?<rank>~{0,7})$/)?.groups;
  if (!Ψ) throw new TypeError('bad request: ' + υ)
  if (Ψ.assign) Ψ.target = υ.slice(0, - Ψ.property.length - (2 + Ψ.assign.length))
  Ψ.type = { 'js': "text/javascript", 'css': "text/css", 'json': 'application/json', 'png': 'image/png', 'woff2': 'font/woff2', 'ico': 'image/vnd.microsoft.icon', 'html': 'text/html' }[Ψ.assign ? 'js' : (Ψ.index !== undefined || Ψ.part !== undefined) ? 'html' : (Ψ.rank.length ? 'js' : (Ψ.property === undefined && Ψ.extension || 'txt'))] ?? 'text/plain'
  return eval(`(${Δ[Δ[`${υ}?${π}`] ?? Δ[`${Δ[`${υ}?core`]}?${π}`] ?? Δ[`${`https://core.parts/core.js`}?${π}`]]})`)
 }) + "}), β = new Proxy(α, α))",

 "https://core.parts/core.js?apply": `https://core.parts/core/apply.js`,
 "https://core.parts/core.js?get": `https://core.parts/core/get.js`,
 "https://core.parts/core.js?getOwnPropertyDescriptor": `https://core.parts/core/getOwnPropertyDescriptor.js`,
 "https://core.parts/core.js?getPrototypeOf": `https://core.parts/core/getPrototypeOf.js`,
 "https://core.parts/core.js?has": `https://core.parts/core/has.js`,
 "https://core.parts/core.js?isExtensible": `https://core.parts/core/isExtensible.js`,
 "https://core.parts/core.js?ownKeys": `https://core.parts/core/ownKeys.js`,
 "https://core.parts/core.js?query": `https://core.parts/core/query.js`,
 "https://core.parts/core.js?headerOf": `https://core.parts/core/headerOf.js`,
 "https://core.parts/core.js?rootsOf": `https://core.parts/core/rootsOf.js`,
 "https://core.parts/core.js?toPrimitive": `https://core.parts/core/toPrimitive.js`,
 "https://core.parts/core.js?toString": `https://core.parts/core/toString.js`,
 "https://core.parts/core.js?valueOf": `https://core.parts/core/valueOf.js`,
 "https://core.parts/core.js?set": "https://core.parts/core/set.js",

 "https://core.parts/core.js?construct": "https://core.parts/core/throw/unused-native.js",
 "https://core.parts/core.js?defineProperty": "https://core.parts/core/throw/unused-native.js",
 "https://core.parts/core.js?deleteProperty": "https://core.parts/core/throw/unused-native.js",
 "https://core.parts/core.js?preventExtensions": "https://core.parts/core/throw/unused-native.js",
 "https://core.parts/core.js?setPrototypeOf": "https://core.parts/core/throw/unused-native.js",

 "https://core.parts/core/apply.js": "" + ((_, __, A) => eval("" + α)(...A)),
 "https://core.parts/core/set.js": "" + ((_, property, assign) => {
  const
   true_url = Ω[Ω[υ].query(l => l.property === property ? l.url : undefined)[0]][Symbol.toPrimitive](),
   existing = Δ[true_url];
  if (existing !== assign) {
   Δ[true_url] = assign
   const changed = ("" + Ω[true_url].affect).split(' ');
   const update = new BroadcastChannel('update')
   for (const rebuild_target of changed) {
    delete Δ[rebuild_target];
    console.log(Δ[rebuild_target])
    console.log(Ω[rebuild_target][Symbol.toPrimitive]())
   }
   update.postMessage(changed.concat(true_url))
   update.close()
  }
 }),
 "https://core.parts/core/ownKeys.js": "" + (() => α.query(l => l.property)),
 "https://core.parts/core/query.js": "" + ((ƒ = x => x) => {
  const roots = β.rootsOf()
  return Object.keys(Δ).reduce((o, url) => {
   const root = roots.find(root => url.startsWith(root + '?'))
   if (root) {
    const item = ƒ({ url, root, property: url.slice(root.length + 1) })
    if (item) o.push(item)
   }
   return o
  }, [])
 }),
 "https://core.parts/core/get.js": "" + ((_, π) => {
  if (['toPrimitive', Symbol.toPrimitive, 'toString', 'valueOf', 'headerOf', 'rootsOf', 'query'].includes(π)) return α[π]
  return Ω[Ω[`${υ}?${π}`]]
 }),
 "https://core.parts/core/headerOf.js": "" + (() => Ψ),
 "https://core.parts/core/rootsOf.js": "" + (() => {
  const roots = [υ]
  let root = υ, key;
  while (root = Δ[key = root + '?core']) {
   if (roots.includes(root)) throw 'core loop'
   roots.push(root);
   if (root === Λ) break;
  }
  if (!roots.includes(Λ)) roots.push(Λ)
  return roots;
 }),
 "https://core.parts/core/toPrimitive.js": "" + (hint => {
  //console.log('primitive', υ, υ.includes('?') ? 'following link' : 'getting or creating value')
  let url = υ, rank = Ψ.rank
  while (Δ[url] === undefined && rank.length < 7) {
   rank += '~'
   url += '~';
  }
  if (Δ[url] === undefined)
   if (Ψ.type === 'text/html') return Ω['https://core.parts/error-404'][Symbol.toPrimitive]()
  while (rank.length > Ψ.rank) {
   rank = rank.slice(0, -1)
   url = url.slice(0, -1)
   const
    urls = Ω[url].query(l => `"${Ω[l.url]}":${l.property}`),
    build = eval(`({${urls.join(',')}})=>${Ω[`${url}~`]}`)
   console.warn('assigning here (post build)', url)
   Δ[url] = build(Ω)
  }
  return Δ[υ]
 }),
 "https://core.parts/core/getOwnPropertyDescriptor.js": "(_, π) => ({ configurable: true, enumerable: true, writable: true, value: α })",
 "https://core.parts/core/getPrototypeOf.js": "() => Object.prototype",
 "https://core.parts/core/has.js": "(_, π) => Δ[`${υ}?${π}`] !== undefined",
 "https://core.parts/core/isExtensible.js": "() => true",
 "https://core.parts/core/toString.js": "() => Δ[υ]",
 "https://core.parts/core/valueOf.js": "() => Δ[υ]",
 "https://core.parts/core/throw/unused-native.js": "() => { throw new TypeError(`unused native trap '${π}' called on ${υ}`) }",
}, { get: (Δ, υ, α, β, Λ) => eval(Δ[Λ = 'https://core.parts/core.js']) }))["https://core.parts/file.js"];