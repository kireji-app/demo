onfetch = (core = new Proxy({
 "core.js": "((meta) => new Proxy(meta, meta))((new Proxy(Proxy, { get: " + ((ƒ, Π) => {
  const π = ({ [Symbol.toPrimitive]: 'toPrimative', toString: 'toString', valueOf: 'valueOf' }[Π] ?? Π);
  return eval(`(${Δ[Δ[`${υ}?${π}`] ?? Δ[`${Δ[`${υ}?core`] ?? `core.js`}?${π}`]]})`)
 }) + "})))",
 "onfetch.js": "" + (event => {
  // TODO get crossorigin
  const
   hostυ = 'https://' + location.hostname + '/',
   onfetchυ = event.request.url,
   υυ = onfetchυ === hostυ ? 'index.html' : onfetchυ.slice(hostυ.length),
   MIMELookup = { 'js': "text/javascript", 'css': "text/css", 'json': 'application/json', 'png': 'image/png', 'woff2': 'font/woff2', 'txt': 'text/plain', 'ico': 'image/vnd.microsoft.icon', 'html': 'text/html' },
   binaryMIMEs = ['image/png', 'font/woff2'],
   defaultMIME = 'text/plain',
   string = "" + core[υυ],
   MIME = !υυ.includes('?') && MIMELookup[υυ.split('.').at(-1)] || defaultMIME,
   isBinary = binaryMIMEs.includes(MIME),
   clientId = event.clientId || event.resultingClientId,
   user_key = 'client-' + clientId,
   start_time = parseInt(Δ[user_key] ?? (Δ[user_key] = Date.now().toString()));
  Δ[user_key + '/' + (Date.now() - start_time).toString()] = υυ;
  var body = new TextEncoder().encode(string);
  if (isBinary) {
   const B = atob(string), k = B.length, A = new ArrayBuffer(k), I = new Uint8Array(A);
   for (var i = 0; i < k; i++) I[i] = B.charCodeAt(i);
   body = new Blob([I], { type: MIME });
  }
  event.respondWith(new Response(body, { headers: { "content-type": `${MIME}${isBinary ? '' : '; charset=UTF-8'}`, "expires": "Sun, 20 Jul 1969 20:17:00 UTC", "server": "kireji" } }))
 }),
 "core/apply.js": "" + ((γ, _, A) => {
  if (!(υ in Δ)) {
   if (`[${υ}]` in Δ) { Δ[υ] = eval(`({ ${Object.keys(core[υ]).map(π => '\"' + core[`${υ}?${π}`] + '\": ' + π).join(', ')} }) => ${core[`[${υ}]`]}`)(core) } else throw 'double fault ' + υ;
  }
  return eval(Δ[υ])(...A)
 }),
 "core/ownKeys.js": "" + (() => {
  return Object.keys(Δ).filter(k => k.startsWith(υ + '?') && Δ[`[${υ}]`].includes(k.replace(υ + '?', ''))).map(k => k.replace(υ + '?', ''))
 }),
 "core/get.js": "" + ((γ, π) => {
  const primitive = π in { [Symbol.toPrimitive]: 'toPrimative', toString: 'toString', valueOf: 'valueOf' }
  return primitive ? γ[π] : γ[γ[`${υ}?${π}`]]
 }),
 "core/toPrimative.js": "" + (hint => {
  const atomic_depth = 7;
  let search_target = υ, current_depth = atomic_depth
  while (!(search_target in Δ) && current_depth) {
   current_depth--;
   search_target = `[${search_target}]`;
  }
  if (!(search_target in Δ)) throw 'no constructors of ' + υ
  while (current_depth < atomic_depth) {
   current_depth++;
   search_target = search_target.slice(1, -1)
   const keys = Object.keys(core[search_target])
   Δ[search_target] = eval(`({ ${keys.map(π => '\"' + core[`${search_target}?${π}`] + '\": ' + π).join(', ')} }) => ${core[`[${search_target}]`]}`)(core).toString()
  }
  return Δ[υ]
 }),
 "[index.html]": "`<!DOCTYPE html><style>${light_css}</style><script>onload=()=>{const shadow=document.body.attachShadow({mode:'open'});const sheet=new CSSStyleSheet();shadow.adoptedStyleSheets.push(sheet);sheet.replaceSync(\\`${shadow_css}\\`);shadow.innerHTML=\\`${shadow_html}\\`}</script>${light_html}`",
 "index.html?light_css": "client/light.css",
 "index.html?light_html": "client/light.html",
 "index.html?shadow_css": "client/shadow.css",
 "index.html?shadow_html": "client/shadow.html",
 "[client/light.html]": "Object.keys(Δ).map(k=>`<iframe src=\"${k}\" slot=\"${k}\"></iframe>`).join('\\n')",
 "client/light.css": ":root { display: grid; height: 100% }",
 "client/shadow.html": "<slot name='desktop'></slot><slot name='taskbar'></slot>",
 "client/shadow.css": ":host{ margin: 0; display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr 28px; grid-template-areas: \"desktop\" \"taskbar\" } slot{ display: grid } [name=\"desktop\"]{ grid-area: desktop } [name=\"taskbar\"]{ grid-area: taskbar }",
 "client/windows.css": ":host { background: #377f7f } #taskbar { position: fixed; bottom: 0; left: 0; right: 0; height: 28px; box-shadow: inset 0 1px #c3c3c3, inset 0 2px white; } .ui { background: #c3c3c3 } .btn { box-shadow: inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a; }",
 "taskbar": "",
 "desktop": "",
 "apple-touch-icon.png": "<?=b64('icon.png')?>",
 "favicon.ico?src": "apple-touch-icon.png",
 "regex/tagname.txt": "/^[a-z][a-z0-9]*-[a-z0-9-]*$/",
 "[favicon.ico]": "src",
 "core.js?apply": `core/apply.js`,
 "core.js?construct": `core/construct.js`,
 "core.js?defineProperty": `core/defineProperty.js`,
 "core.js?deleteProperty": `core/deleteProperty.js`,
 "core.js?get": `core/get.js`,
 "core.js?getOwnPropertyDescriptor": `core/getOwnPropertyDescriptor.js`,
 "core.js?getPrototypeOf": `core/getPrototypeOf.js`,
 "core.js?has": `core/has.js`,
 "core.js?isExtensible": `core/isExtensible.js`,
 "core.js?ownKeys": `core/ownKeys.js`,
 "core.js?preventExtensions": `core/preventExtensions.js`,
 "core.js?set": `core/set.js`,
 "core.js?setPrototypeOf": `core/setPrototypeOf.js`,
 "core.js?toPrimative": `core/toPrimative.js`,
 "core.js?toString": `core/toString.js`,
 "core.js?valueOf": `core/valueOf.js`,
 "core.js?core": `core/core.js`,
 "core/construct.js": "(γ) => { console.log(υ); if (`[${υ}]` in Δ) { Δ[υ] = eval(`({ ${Object.keys(γ).map(π => '\"' + γ[`${υ}?${π}`] + '\": ' + π).join(', ')} }) => ${Δ[`[${υ}]`]}`)(core) } else throw 'double fault'; return γ }",
 "core/defineProperty.js": "() => { throw new TypeError(`not implimented.`) }",
 "core/deleteProperty.js": "() => { throw new TypeError(`not implimented.`) }",
 "core/getOwnPropertyDescriptor.js": "(γ, π) => ({ configurable: true, enumerable: true, writable: true, value: γ })",
 "core/getPrototypeOf.js": "() => Object.prototype",
 "core/has.js": "(γ, π) => `${υ}?${π}` in Δ",
 "core/isExtensible.js": "() => true",
 "core/preventExtensions.js": "() => { throw new TypeError(`not implimented.`) }",
 "core/set.js": "(γ, π, δ) => { Δ[core[`${υ}?${π}`]] = δ; new γ(π) }",
 "core/setPrototypeOf.js": "() => { throw new TypeError(`not implimented.`) }",
 "core/toString.js": "() => Δ[υ]",
 "core/valueOf.js": "() => Δ[υ]",
}, { get: (Δ, υ) => eval(Δ[`core.js`]) }))['onfetch.js'];