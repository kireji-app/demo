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
   isBinary = binaryMIMEs.includes(MIME);
  var body = new TextEncoder().encode(string);
  if (isBinary) {
   const B = atob(string), k = B.length, A = new ArrayBuffer(k), I = new Uint8Array(A);
   for (var i = 0; i < k; i++) I[i] = B.charCodeAt(i);
   body = new Blob([I], { type: MIME });
  }
  event.respondWith(fetch('server.js').then(_ => new Response(body, { headers: { "content-type": `${MIME}${isBinary ? '' : '; charset=UTF-8'}`, "expires": "Sun, 20 Jul 1969 20:17:00 UTC", "server": "kireji" } })))
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
 "[index.html]": "[doctype, head, body].join('\\n')",
 "index.html?doctype": "core/html/doctypes/html5.html",
 "index.html?head": "core/html/boilerplate.html",
 "index.html?body": "core/html/body.html",
 "core/html/doctypes/html5.html": "<!DOCTYPE html>",
 "core/html/boilerplate.html": "<head><script src=client.js></script></head>",
 "[core/html/body.html]": "`<body><part-list></part-list></body>`",
 "apple-touch-icon.png": "<?=b64('icon.png')?>",
 "favicon.ico?src": "apple-touch-icon.png",
 "client.js": "",
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


// given an incumbent child list and an incoming child list,
//  suggest the smallest number of operations to update the children
// then, implement the change operation within the custom element