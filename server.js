onfetch = (Ω = new Proxy({}, new Proxy({
 "https://core.parts/part.js": "" + (() =>
  `\`<!DOCTYPE html><script>callbacks={};change=(href, x, y) => fetch(\\\`\\\${href}?\\\${x}=\\\${y}\\\`);new BroadcastChannel('update').onmessage=${({ data }) => { for (const url in data) callbacks[url]?.(data[url]) }}; BODY_PATTERN = /(?<![.#]|\[[^\]]*)body(?=(?:[^}]*){)/g; onload = ${() => {
   const boilerplate_css = 'body { margin: 0; display: inline-block; overflow: hidden; position: relative } :root { display: grid; overflow: hidden; height: 100% } '
   const addShadow = node => {
    if (!node.tagName.includes('-')) return
    const shadow = node.attachShadow({ mode: "closed" })
    const url = 'https://' + (node.getAttribute('host') ?? 'core.parts') + '/' + (node.getAttribute('path') ?? '') + node.tagName.toLowerCase();
    shadow.append(...node.childNodes)
    const stylenode = shadow.querySelector('style')
    const sheet = new CSSStyleSheet();
    // TODO regex for replace here
    const css = boilerplate_css + stylenode.innerHTML
    sheet.replaceSync(css.replace(BODY_PATTERN, ':host'))
    shadow.adoptedStyleSheets.push(sheet)
    stylenode.remove();
    callbacks[url + '.css'] = css => {
     sheet.replaceSync((boilerplate_css + css).replace(BODY_PATTERN, ':host'))
    }
    callbacks[url + '.html'] = html => {
     console.log('rebuilding entire html on ' + url)
     shadow.innerHTML = html;
     shadow.querySelectorAll('*').forEach(addShadow)
    }
   }
   callbacks[location.href + '.css'] = css => {
    document.head.querySelector('style').innerHTML = boilerplate_css + css
   }
   callbacks[location.href + '.html'] = html => {
    document.body.innerHTML = html;
    document.querySelectorAll('body *').forEach(addShadow)
   }
   document.querySelectorAll('body *').forEach(addShadow)
  }}</script><style>body { margin: 0; display: inline-block; overflow: hidden; position: relative } :root { display: grid; overflow: hidden; height: 100% }\${css}</style>\${html}\``),
 // TODO: if I don't have a property, before checking chain for property, check chain for property constructor
 // this way, if I don't have a property, my core's property constructor generates properties for me
 "https://core.parts/utils/html/parts.js": "(...K) => { const host_url = K.shift(); return K.map(" + (url => {
  const proxy = Ω[url], { groups: { part, path, host } } = proxy.headerOf()
  const { css, html } = proxy
  if (url + '.html~' in Δ && !(url + '.html?fx' in Δ)) console.warn(JSON.stringify({ [`${url}.html?fx`]: `${url}.html.fx`, [`${url}.html.fx`]: `${Δ[`${host_url}?html`]} ${url}` }).slice(1, -1) + ',')
  if (url + '.css~' in Δ && !(url + '.css?fx' in Δ)) console.warn(JSON.stringify({ [`${url}.css?fx`]: `${url}.css.fx`, [`${url}.css.fx`]: `${Δ[`${host_url}?html`]} ${url}` }).slice(1, -1) + ',')
  return `<${part}${host !== 'core.parts' ? ` host="${host}"` : ''}${path ? ` path="${path}"` : ''}><style>${css}</style>${html ?? ''}</${part}>`
 }) + ").join('\\n') }",

 "https://core.parts/~~": "part()",
 "https://core.parts/~?part": "https://core.parts/part.js",
 "https://core.parts/?css": "https://core.parts/os-95.css",
 "https://core.parts/?html": "https://core.parts/os-95.html",
 "https://core.parts/~?fx": "https://core.parts/.fx",
 "https://core.parts/.fx": "https://core.parts/",
 "https://core.parts/os-95.html~": "parts('https://core.parts/', 'https://core.parts/desktop-95', 'https://core.parts/taskbar-95', 'https://core.parts/menu-layer')",
 "https://core.parts/os-95.html?parts": "https://core.parts/utils/html/parts.js",
 "https://core.parts/os-95.css~": "`body { display: grid; grid-template-rows: 1fr ${height} } desktop-95, taskbar-95 { height: 100%; width: 100% } menu-layer { position: fixed; top: 0; left: 0; bottom: 0; right: 0 }`",
 "https://core.parts/os-95.css?height": "https://core.parts/os/task-bar/css-height.txt",
 "https://core.parts/os-95.css?fx": "https://core.parts/.fx",
 "https://core.parts/os-95.html?fx": "https://core.parts/.fx",
 // TODO: reduce repeat calculations of a single document stemming from one click (group incoming changes). This is perhaps the hardest problem.
 "https://core.parts/menu-layer~~": "part()",
 "https://core.parts/menu-layer~?core": "https://core.parts/~",
 "https://core.parts/menu-layer?css": "https://core.parts/menu-layer.css",
 "https://core.parts/menu-layer?html": "https://core.parts/menu-layer.html",
 "https://core.parts/menu-layer.css": "body { display: grid; pointer-events: none; height: 100% } start-menu { background: magenta }",
 "https://core.parts/menu-layer.html~": "start === '1' ? parts('https://core.parts/menu-layer', 'https://core.parts/start-menu') : ''",
 "https://core.parts/menu-layer.html?fx": "https://core.parts/menu-layer.fx",
 "https://core.parts/menu-layer.html?start": "https://core.parts/os/start-menu/open.txt",
 "https://core.parts/menu-layer.html?parts": "https://core.parts/utils/html/parts.js",
 "https://core.parts/menu-layer~?fx": "https://core.parts/menu-layer.fx",
 "https://core.parts/menu-layer.fx": "https://core.parts/menu-layer",
 "https://core.parts/menu-layer.css?fx": "https://core.parts/menu-layer.css.fx",
 "https://core.parts/menu-layer.css.fx": "https://core.parts/os-95.html https://core.parts/menu-layer",
 // we can use a 'have disk' concept to allow a multi-disk installation of apps via url
 // this could be a fun way of installing little games and even playing little installation games
 // anything and everything can be expressive here
 'https://core.parts/error-404~~': "part()",
 "https://core.parts/error-404~?core": "https://core.parts/~",
 "https://core.parts/error-404?css": "https://core.parts/error-404.css",
 "https://core.parts/error-404?html": "https://core.parts/error-404.html",
 "https://core.parts/error-404.css": "body { background: magenta }",
 "https://core.parts/error-404.html": "",
 "https://core.parts/error-404~?fx": "https://core.parts/error-404.fx",
 "https://core.parts/error-404.fx": "https://core.parts/error-404",
 // TODO ASAP: instead of adding css and stuff, just add the tags and fetch on client
 "https://core.parts/desktop-95~~": "part()",
 "https://core.parts/desktop-95~?core": "https://core.parts/~",
 "https://core.parts/desktop-95?css": "https://core.parts/desktop-95.css",
 "https://core.parts/desktop-95?html": "https://core.parts/desktop-95.html",
 "https://core.parts/desktop-95.css": "body { margin: 0; background: #377f7f }",
 "https://core.parts/desktop-95.html": "",
 "https://core.parts/desktop-95~?fx": "https://core.parts/desktop-95.fx",
 "https://core.parts/desktop-95.fx": "https://core.parts/desktop-95",
 "https://core.parts/desktop-95.html?fx": "https://core.parts/desktop-95.html.fx",
 "https://core.parts/desktop-95.html.fx": "https://core.parts/os-95.html https://core.parts/desktop-95",
 "https://core.parts/desktop-95.css?fx": "https://core.parts/desktop-95.css.fx",
 "https://core.parts/desktop-95.css.fx": "https://core.parts/os-95.html https://core.parts/desktop-95",
 // a boolean satisfiability problem with n terms is n computers. their states are intertwined and each one is completely unique.
 "https://core.parts/taskbar-95~~": "part()",
 "https://core.parts/taskbar-95~?core": "https://core.parts/~",
 "https://core.parts/taskbar-95?css": "https://core.parts/taskbar-95.css",
 "https://core.parts/taskbar-95?html": "https://core.parts/taskbar-95.html",
 "https://core.parts/taskbar-95.css~": "`body { display: flex; flex-flow: row nowrap; gap: 3px; height: 100%; padding: 4px 2px 2px; background: #c3c3c3; box-shadow: inset 0 1px #c3c3c3, inset 0 2px white } body > * { height: 22px } body > :first-child { width: 54px } body > :last-child { width: 64px }`",
 "https://core.parts/taskbar-95.css?height": "https://core.parts/os/task-bar/css-height.txt",
 "https://core.parts/taskbar-95.html?core": "https://core.parts/os-95.html",
 "https://core.parts/taskbar-95.html~": "parts('https://core.parts/taskbar-95', 'https://core.parts/start-95', 'https://core.parts/os/running/text-edit-95', 'https://core.parts/tray-95')",
 "https://core.parts/taskbar-95~?fx": "https://core.parts/taskbar-95.fx",
 "https://core.parts/taskbar-95.fx": "https://core.parts/taskbar-95",
 "https://core.parts/taskbar-95.css?fx": "https://core.parts/taskbar-95.css.fx",
 "https://core.parts/taskbar-95.css.fx": "https://core.parts/os-95.html https://core.parts/taskbar-95",
 "https://core.parts/taskbar-95.html?fx": "https://core.parts/taskbar-95.html.fx",
 "https://core.parts/taskbar-95.html.fx": "https://core.parts/os-95.html https://core.parts/taskbar-95",

 "https://core.parts/start-95~~": "part()",
 "https://core.parts/start-95~?core": "https://core.parts/~",
 "https://core.parts/start-95?css": "https://core.parts/start-95.css",
 "https://core.parts/start-95?html": "https://core.parts/start-95.html",
 "https://core.parts/start-95.css?open": "https://core.parts/os/start-menu/open.txt",
 "https://core.parts/start-95.html?open": "https://core.parts/os/start-menu/open.txt",
 "https://core.parts/start-95.css~": "`button { display: flex; flex-flow: row nowrap; gap: 3px; border: none; font: bold 12px sans-serif; width: 54px; box-sizing: border-box; line-height: ${('' + open) === '0' ? 17 : 15}px; padding: ${('' + open) === '0' ? 3 : 5}px 4px 2px; text-align: left; background: #c3c3c3; box-shadow: ${('' + open) === '0' ? 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb' : 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a'} } ${('' + open) === '1' ? 'button::after { content: \"\"; position: absolute; margin: 3px; left: 0; right: 0; top: 0; bottom: 0; border: 1px dotted black; pointer-events: none; }' : ''} button { width: 100%; height: 100% }`",
 "https://core.parts/start-95.html~": "`<button onclick=\"change('https://core.parts/start-95.html', 'open', ${(''+open) === '1' ? '0' : '1'})\">${parts('https://core.parts/start-95', 'https://core.parts/start-icon')}<span>Start</span></button>`",
 "https://core.parts/start-95.html?parts": "https://core.parts/utils/html/parts.js",
 "https://core.parts/start-95~?fx": "https://core.parts/start-95.fx",
 "https://core.parts/start-95.css?fx": "https://core.parts/start-95.fx",
 "https://core.parts/start-95.fx": "https://core.parts/start-95",
 "https://core.parts/start-95.html?fx": "https://core.parts/start-95.html.fx",
 "https://core.parts/start-95.html.fx": "https://core.parts/taskbar-95.html https://core.parts/start-95",

 "https://core.parts/start-icon~~": "part()",
 "https://core.parts/start-icon~?core": "https://core.parts/~",
 "https://core.parts/start-icon?html": "https://core.parts/start-icon.html",
 "https://core.parts/start-icon?css": "https://core.parts/start-icon.css",
 "https://core.parts/start-icon.css": "body { background: magenta; width: 16px; height: 16px; vertical-align: center }",
 "https://core.parts/start-icon.html": "",
 "https://core.parts/start-icon~?fx": "https://core.parts/start-icon.fx",
 "https://core.parts/start-icon.fx": "https://core.parts/start-icon",

 "https://core.parts/os/running/text-edit-95~~": "part()",
 "https://core.parts/os/running/text-edit-95~?core": "https://core.parts/~",
 "https://core.parts/os/running/text-edit-95.css?open": "https://core.parts/os/running/text-edit-95/open.txt",
 "https://core.parts/os/running/text-edit-95?css": "https://core.parts/os/running/text-edit-95.css",
 "https://core.parts/os/running/text-edit-95?html": "https://core.parts/os/running/text-edit-95.html",
 "https://core.parts/os/running/text-edit-95.html?open": "https://core.parts/os/running/text-edit-95/open.txt",
 "https://core.parts/os/running/text-edit-95.css~": "`body { width: 160px; background: #c3c3c3 } button { display: flex; flex-flow: row nowrap; gap: 3px; background: transparent; border: none; font: bold 12px sans-serif; width: 160px; box-sizing: border-box; line-height: ${('' + open) === '0' ? 16 : 15}px; padding: ${('' + open) === '0' ? 3 : 5}px 2px 2px; text-align: left; box-shadow: ${('' + open) === '0' ? 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb' : 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a'} } ${('' + open) === '1' ? 'button::after { content: \"\"; position: absolute; margin: 3px; left: 0; right: 0; top: 0; bottom: 0; border: 1px dotted black; pointer-events: none; }' : ''} button { width: 100%; height: 100% }${(''+open) === '1' ? ' button > span { position: relative; z-index: 10 } button::before { content: \"\"; position: absolute; margin: 2px; border-top: 1px solid white; left: 0; right: 0; top: 0; bottom: 0; background-image:linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white),linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white);background-size: 2px 2px;background-position: 0 0, 1px 1px; }' : ''}`",
 "https://core.parts/os/running/text-edit-95.html~": "`<button onclick=\"change('https://core.parts/os/running/text-edit-95.html', 'open', ${(''+open) === '1' ? '0' : '1'})\">${parts('https://core.parts/start-95', 'https://core.parts/start-icon')}<span>text-edit - untitled</span></button>`",
 "https://core.parts/os/running/text-edit-95.html?parts": "https://core.parts/utils/html/parts.js",
 "https://core.parts/os/running/text-edit-95~?fx": "https://core.parts/os/running/text-edit-95.fx",
 "https://core.parts/os/running/text-edit-95.css?fx": "https://core.parts/os/running/text-edit-95.fx",
 "https://core.parts/os/running/text-edit-95.fx": "https://core.parts/os/running/text-edit-95",
 "https://core.parts/os/running/text-edit-95.html?fx": "https://core.parts/os/running/text-edit-95.html.fx",
 "https://core.parts/os/running/text-edit-95.html.fx": "https://core.parts/taskbar-95.html https://core.parts/os/running/text-edit-95",

 "https://core.parts/tray-95~~": "part()",
 "https://core.parts/tray-95~?core": "https://core.parts/~",
 "https://core.parts/tray-95?css": "https://core.parts/tray-95.css",
 "https://core.parts/tray-95?html": "https://core.parts/tray-95.html",
 "https://core.parts/tray-95.css~": "`body { user-select: none; font: 12px sans-serif; width: 64px; box-sizing: border-box; line-height: 18px; padding: 2px 2px 2px; text-align: left; background: #c3c3c3; box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a }`",
 "https://core.parts/tray-95.html~": "new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })",
 "https://core.parts/tray-95~?fx": "https://core.parts/tray-95.fx",
 "https://core.parts/tray-95.css?fx": "https://core.parts/tray-95.fx",
 "https://core.parts/tray-95.fx": "https://core.parts/tray-95",
 "https://core.parts/tray-95.html?fx": "https://core.parts/tray-95.html.fx",
 "https://core.parts/tray-95.html.fx": "https://core.parts/taskbar-95.html https://core.parts/tray-95",

 "https://core.parts/start-menu~~": "part()",
 "https://core.parts/start-menu~?core": "https://core.parts/~",
 "https://core.parts/start-menu?css": "https://core.parts/start-menu.css",
 "https://core.parts/start-menu?html": "https://core.parts/start-menu.html",
 "https://core.parts/start-menu.css": "body { user-select: none; font: 12px sans-serif; width: 64px; box-sizing: border-box; line-height: 18px; padding: 2px 8px 2px; text-align: left; background: #c3c3c3; box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a }",
 "https://core.parts/start-menu.html": "start menu",
 "https://core.parts/start-menu~?fx": "https://core.parts/start-menu.fx",


 "https://core.parts/os/running/text-edit-95/open.txt~": "('' + selected) === '1' ? '1' : '0'",
 "https://core.parts/os/running/text-edit-95/open.txt?fx": "https://core.parts/os/running/text-edit-95/open.fx",
 "https://core.parts/os/running/text-edit-95/open.txt?selected": "https://core.parts/os/task-bar/selected.txt",
 "https://core.parts/os/running/text-edit-95/open.fx": "https://core.parts/os/running/text-edit-95.css https://core.parts/os/running/text-edit-95.html https://core.parts/os/task-bar/selected.txt",

 "https://core.parts/os/task-bar/selected.txt~": `(''+β.fx).split(' ').findIndex(x => (caller && Δ[caller] === '1') ? (x === caller) : (''+Ω[x]==='1')).toString()`,
 "https://core.parts/os/task-bar/selected.txt": "1",
 "https://core.parts/os/task-bar/selected.txt?fx": "https://core.parts/os/task-bar/selected.txt.fx",
 "https://core.parts/os/task-bar/selected.txt.fx": "https://core.parts/os/start-menu/open.txt https://core.parts/os/running/text-edit-95/open.txt",

 "https://core.parts/os/start-menu/open.txt~": "('' + selected) === '0' ? '1' : '0'",
 "https://core.parts/os/start-menu/open.txt?fx": "https://core.parts/os/start-menu/open.txt.fx",
 "https://core.parts/os/start-menu/open.txt?selected": "https://core.parts/os/task-bar/selected.txt",
 "https://core.parts/os/start-menu/open.txt.fx": "https://core.parts/start-95.css https://core.parts/start-95.html https://core.parts/os/task-bar/selected.txt",

 "https://core.parts/os/task-bar/css-height.txt": "28px",
 "https://core.parts/os/task-bar/css-height.txt.fx": "https://core.parts/taskbar-95.css https://core.parts/os-95.css",

 "https://core.parts/apple-touch-icon.png": "<?=b64('icon.png')?>",
 "https://core.parts/favicon.ico?src": "https://core.parts/apple-touch-icon.png",
 "https://core.parts/patterns/tagname.regex": "" + /^[a-z][a-z0-9]*-[a-z0-9-]*$/,
 "https://core.parts/patterns/url.regex": "" + /^(?<protocol>https:\/\/)(?<host>[^\/]+?)(?:\/(?<path>(?:[^\s.~?\/]+?\/)*)(?:(?<part>[a-z][a-z0-9]*-[a-z0-9-]*)|(?<filename>[^\s~?\/]*)\.(?<extension>(?<binary>png|ico|woff2)|[^\s.~?\/]+))|\/(?<index>(?:[^\s.~?\/]+?\/)*))(?:~{0,6}\?(?<property>[a-zA-Z][a-zA-Z0-9-]+)(?:=(?<value>[01])$)?)?(?<rank>~{0,7})$/,
 "https://core.parts/favicon.ico~": "src[Symbol.toPrimitive]()",

 // TODO get crossorigin
 "https://core.parts/file.js": "" + (event => {
  //const error404Response = new Response(undefined, { status: 404 })
  const
   { url } = event.request,
   proxy = Ω[url],
   { binary, type, value, property, target } = proxy.headerOf().groups;
  let string = '';
  if (value) (Ω[target][property] = value, string = 'success')
  else string = proxy.toPrimitive()
  var body = new TextEncoder().encode(string);
  if (binary) {
   const B = atob(string), k = B.length, A = new ArrayBuffer(k), I = new Uint8Array(A);
   for (var i = 0; i < k; i++) I[i] = B.charCodeAt(i);
   body = new Blob([I], { type });
  }
  event.respondWith(new Response(body, { headers: { "content-type": `${type}${binary ? '' : '; charset=UTF-8'}`, "expires": "Sun, 20 Jul 1969 20:17:00 UTC", "server": "kireji" } }))
 }),

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
 "https://core.parts/core/set.js": "" + ((_, property, value) => Ω[Ω[Ω[υ].query(l => l.property === property ? l.url : undefined)[0]]] = value),
 "https://core.parts/core/ownKeys.js": "" + (() => {
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
 "https://core.parts/core/get.js": "" + ((_, π) => {
  if (['toPrimitive', Symbol.toPrimitive, 'toString', 'valueOf', 'headerOf', 'rootsOf', 'query'].includes(π)) return α[π]
  if (!(π in β)) return undefined
  return Ω[Ω[`${υ}?${π}`]]
 }),
 "https://core.parts/core/headerOf.js": "" + (() => ({ kernelActionLocation: V, kernelActionKey: Υ, full: υ, metaKernel: α, self: β, groups: Ψ, metaKernelKey: π })),
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
 "https://core.parts/core/toPrimitive.js": "" + ((hint, caller) => {
  let url = υ, rank = Ψ.rank
  if (Δ[url] === undefined || hint === 'provisional') {
   while ((hint === 'provisional' && url === υ) || Δ[url] === undefined && rank.length < 7) {
    rank += '~'
    url += '~';
   }
   if (Δ[url] === undefined) {
    //if (Ψ.type === 'text/html') return Ω['https://core.parts/error-404'][Symbol.toPrimitive]()
    //else 
    return (console.warn(new TypeError('no constructor for ' + url)), '')
   }
   rank = rank.slice(0, -1)
   url = url.slice(0, -1)
   const properties = {}
   Ω[url].query(l => {
    if (l.property in properties && properties[l.property].rootIndex >= l.rootIndex) return;
    properties[l.property] = l
   })
   const primitive = eval(`({${Object.entries(properties).map(([property, { url }]) => `"${Ω[url]}":${property}`).join(',')}})=>${Ω[`${url}~`]}`)(Ω)
   if (typeof primitive !== 'string') throw new TypeError(`output of ${url} must be a string (got ${typeof primitive})`)
   Ω[url] = primitive
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
 // TODO now: who spawned a change??
 "https://core.parts/core.js": "({ get: " + ((_, υ) => {
  const Ψ = υ.match(/^(?<protocol>https:\/\/)(?<host>[^\/]+?)(?:\/(?<path>(?:[^\s.~?\/]+?\/)*)(?:(?<part>[a-z][a-z0-9]*-[a-z0-9-]*)|(?<filename>[^\s~?\/]*)\.(?<extension>(?<binary>png|ico|woff2)|[^\s.~?\/]+))|\/(?<index>(?:[^\s.~?\/]+?\/)*))(?:~{0,6}\?(?<property>[a-zA-Z][a-zA-Z0-9-]+)(?:=(?<value>[01])$)?)?(?<rank>~{0,7})$/)?.groups;
  if (!Ψ) throw new TypeError('bad request: ' + υ)
  if (Ψ.value) Ψ.target = υ.slice(0, - Ψ.property.length - (2 + Ψ.value.length))
  Ψ.type = { 'js': "text/javascript", 'css': "text/css", 'json': 'application/json', 'png': 'image/png', 'woff2': 'font/woff2', 'ico': 'image/vnd.microsoft.icon', 'html': 'text/html' }[Ψ.value ? 'js' : (Ψ.index !== undefined || Ψ.part !== undefined) ? 'html' : (Ψ.rank.length ? 'js' : (Ψ.property === undefined && Ψ.extension || 'txt'))] ?? 'text/plain'
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
}, { get: (Δ, Υ) => eval(Δ[V = 'https://core.parts/core.js']) })))["https://core.parts/file.js"];
