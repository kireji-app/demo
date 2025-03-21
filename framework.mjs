import { extname } from 'path'
import { execSync as $ } from 'child_process'
import {
 rmSync as removeItem,
 statSync as getItemStats,
 existsSync as itemExists,
 mkdirSync as makeFolder,
 readdirSync as readFolder,
 readFileSync as readFile,
 writeFileSync as writeFile
} from 'fs'
class Framework {
 static change = ["major", "minor", "patch"][0]
 static cores = []
 static sourceMappingRadix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
 static maxSegments = 25
 static segmentRadix = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_.~!$*"
 static maxSegmentLength = 250
 static baseHost = "core.parts"
 static rootHost = "root.core.parts"
 static fallbackHost = "www.desktop.parts"
 static debugHost = this.fallbackHost
 static verbosity = 0
 static clientRoot = ".public"
 static domainRoot = "dns-root"
 static typeURL = "base.host"
 static contextURL = "context.js"
 static constructorURL = "define.js"
 static cloudScriptURL = "framework.mjs"
 static clientScriptURL = "framework.js"
 static asyncContextURL = "asyncContext.js"
 static postConstructorURL = "postDefine.js"
 static templateContextURL = "templateContext.js"
 static constructorArgumentsURL = "define.args"
 static BaseType = null
 static DNSRoot = null
 static tags = null
 static get indexHTML() { return `<!DOCTYPE html><html lang=en><head><link rel=manifest /><link rel=icon href="data:image/png;base64,iVBORw0KGgo="><link rel="apple-touch-icon" href="data:image/png;base64,iVBORw0KGgo="><meta name=robots content=noindex /><meta name=viewport content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0" /> <script defer src=${this.version}${this.clientScriptURL}></script></head></html>` }
 static asyncMethodArguments = {
  initialize: [],
  setLayer: ["LAYER", "STATE"],
  setLayerLeafward: ["LAYER", "STATE"],
  setLayerRootward: ["LAYER", "KEY"],
  setDocument: ["LAYER"],
  setDocumentLeafward: ["LAYER"],
  unsetDocument: ["LAYER"],
  updateDocumentLeafward: ["LAYER"],
  updateDocument: ["LAYER"],
 }
 static log(verbosity, ...data) {
  if (this.isDebug && verbosity <= this.verbosity) console.log(...data)
 }
 static btoaUnicode(str) {
  return btoa(new TextEncoder('utf-8').encode(str)
   .reduce((data, byte) => data + String.fromCharCode(byte), '')
  )
 }
 static atobUnicode(str) {
  return btoa(new TextEncoder('utf-8').encode(str)
   .reduce((data, byte) => data + String.fromCharCode(byte), '')
  )
 }
 static getDirectory(host) {
  if (!host) return Framework.DNSRoot
  return host.split(".").reduceRight((dir, subdomainName) => dir?.[subdomainName], Framework.DNSRoot)
 }
 static createFile(pathFromRoot, pathToRoot) {
  return {
   lines: [],
   sources: [],
   scripts: [],
   mappings: [],
   pathToRoot,
   pathFromRoot,
   addSource(source, script) {
    let srcIndex = this.sources.indexOf(source)
    if (srcIndex === -1) {
     srcIndex = this.sources.length
     this.sources.push(source)
     this.scripts.push(script)
    }
    return srcIndex
   },
   addLine(string, srcIndex, ogLn = 0, ogCol = 0, indent = "", mapTokens = true) {
    this.lines.push(indent + string)
    if (string && mapTokens) this.mappings.push([...string.matchAll(/\w+|\s+|\W+/g)].map(({ index: col }) => [indent.length + col, srcIndex, ogLn, ogCol + col]))
    else this.mappings.push([[indent.length, srcIndex, ogLn, ogCol]])
   },
   addLines(strings, srcIndex, ogLn = 0, ogCol = 0, indent = "", mapTokens = true) {
    strings.forEach((string, ln) => this.addLine(string, srcIndex, ogLn + ln, ogCol, indent, mapTokens))
   },
   addSection(string, srcIndex, ogLn = 0, ogCol = 0, indent = "", mapTokens = true) {
    this.addLines(string.split("\n"), srcIndex, ogLn, ogCol, indent, mapTokens)
   },
   packAndMap(url) {
    return this.lines.join("\n") + (Framework.isDebug ? `
//${"#"} sourceMappingURL=data:application/json;charset=utf-8;base64,${Framework.btoaUnicode(this.getMap())}${url ? `
//${"#"} sourceURL=${url}` : ""}` : "")
   },
   getMap() {
    const mappings = Framework.encodeSourceMap(this.mappings)
    return JSON.stringify({
     version: 3,
     file: "file.js",
     sourceRoot: this.pathFromRoot,
     sources: this.sources,
     names: [],
     sourcesContent: this.scripts,
     mappings,
    }, null, 1)
   }
  }
 }
 static createType(host, options) {
  if (!host) throw "undefined host"
  return new this(host, options).Type
 }
 static createPart(host, options, parent) {
  if (!host) throw "undefined host"
  if (typeof host !== "string") throw "invalid host"
  if (!parent && host !== this.rootHost) throw `non-root part '${host}' must be created with a parent.`
  const T = this.createType(host, options)
  return new T(parent)
 }
 static async initialize() {


  function extractDomainNames(directoryStructure) {
   const domainNames = new Set();

   function traverse(dir, currentDomainParts) {
    let hasFiles = false;
    let hasSubdirectories = false;

    for (const key in dir) {
     if (typeof dir[key] === 'object') {
      hasSubdirectories = true;
      traverse(dir[key], [key, ...currentDomainParts]);
     } else if (typeof dir[key] === 'string') {
      hasFiles = true;
     }
    }

    if (hasFiles && currentDomainParts.length > 0) {
     domainNames.add(currentDomainParts.reverse().join('.'));
    }
   }

   traverse(directoryStructure, []);
   return Array.from(domainNames);
  }

  this.hosts = extractDomainNames(this.DNSRoot)
  this.root = this.createPart(this.rootHost)
  await this.root.initialize()
 }
 static compile() {
  this.file = this.createFile("../")
  this.buildSource = this.file.addSource(this.cloudScriptURL, Array(11).fill("\n").join("") + this.toString())
  this.file.addLines(this.toString().split("\n"), this.buildSource, 11/* here */, 0, " ")
  this.file.addSection(`
  Framework.tags = ${JSON.stringify(this.tags)}
  Framework.version = ${JSON.stringify(this.version)}
  Framework.DNSRoot = ${JSON.stringify(this.DNSRoot)}
  Framework.initialize()`.slice(1), this.buildSource, 122/* here */, 0, "", false)
  return this.file.packAndMap()
 }
 static encodeSourceMap(decodedMappings) {
  const encoderAbsolutePosition = [0, 0, 0, 0, 0]
  return decodedMappings.map(decodedLine => (encoderAbsolutePosition[0] = 0, decodedLine.map(decodedSegment => {
   return decodedSegment.map((absoluteDecodedPlace, i) => {
    const signedRelativeDecodedPlace = absoluteDecodedPlace - encoderAbsolutePosition[i]
    encoderAbsolutePosition[i] = absoluteDecodedPlace
    if (signedRelativeDecodedPlace === 0) return 'A'
    let
     unsignedRelativeDecodedPlace = Math.abs(signedRelativeDecodedPlace),
     encodedSegment = ''
    while (unsignedRelativeDecodedPlace > 0) {
     let characterIndex
     if (!encodedSegment) {
      characterIndex = (unsignedRelativeDecodedPlace & 15) * 2 + +!Object.is(signedRelativeDecodedPlace, unsignedRelativeDecodedPlace)
      unsignedRelativeDecodedPlace >>>= 4
     } else {
      characterIndex = unsignedRelativeDecodedPlace & 31
      unsignedRelativeDecodedPlace >>>= 5
     }
     if (unsignedRelativeDecodedPlace > 0) characterIndex |= 32
     encodedSegment += this.sourceMappingRadix[characterIndex]
    }
    return encodedSegment
   }).join('')
  }).join(","))).join(";")
 }
 static headerOf(filename) {
  let binary = false
  const extension = filename.split(".").pop()
  return [{
   get "png"() { binary = true; return "image/png" },
   get "gif"() { binary = true; return "image/gif" },
   "svg": "image/svg+xml;charset=UTF-8",
   "js": "text/javascript;charset=UTF-8",
   "json": "application/json;charset=UTF-8",
   "html": "text/html;charset=UTF-8",
   "host": "text/plain"
  }[extension], binary, extension]
 }
 static get isDebug() {
  return this.tags.includes("dev") || this.tags.includes("local")
 }
 asyncMethods = {}
 generatedFileCache = {}
 constructor(host, options) {
  if (!host) throw "undefined host"
  if (typeof host !== "string") throw "invalid host"
  this.host = host
  this.options = options
  if (!this.options && this.host in Framework.cores) return Framework.cores[this.host]
  Framework.cores[this.host] = this
  this.directory = Framework.getDirectory(this.host)
  this.isBase = this.host === Framework.baseHost
  this.domains = this.host.split(".").concat(Framework.domainRoot)
  this.pathFromRoot = [...this.domains].reverse().join("/")
  if (!this.isBase) {
   this.baseHost = this.read(Framework.typeURL, Framework.baseHost)
  }
  this.BaseType = this.isBase ? Array : Framework.createType(this.baseHost)
  if (!this.BaseType) throw "error creating base type " + this.baseHost + " on type " + this.host
  this.pathToRoot = new Array(this.domains.length).fill("..").join("/")
  this.compile()
 }
 compile() {
  this.file = Framework.createFile(this.pathFromRoot, this.pathToRoot)
  this.buildSource = this.file.addSource(this.pathToRoot + "/" + Framework.cloudScriptURL, Array(11).fill("\n").join("") + this.toString())
  this.file.framework = this
  this.openClass()
  this.compileConstructor()
  this.compileMethods()
  this.closeClass()
  this.script = this.file.packAndMap()
  // These "unused" constants are available in scope of the eval'd script below.
  const framework = this
  const read = (filename, fallback) => this.read(filename, fallback)
  const scriptHost = this.host
  const Base = this.BaseType
  try {
   this.Type = eval(this.script)
  } catch (e) {
   console.warn(this.script)
   throw e
  }
  this.Type.framework = this
  if (this.isBase) Framework.BaseType = this.Type
 }
 openClass() {
  this.file.addSection(`(
   class ${this.host.split(".")[0].split("-").map(name => name[0].toUpperCase() + name.slice(1)).join("")} // is ${this.host}
    extends Base // is ${this.isBase ? "Native Array" : this.baseHost}
   {`, this.buildSource, 199/* here */)
 }
 compileConstructor() {
  this.constructorArguments = this.has(Framework.constructorArgumentsURL) || this.isBase ? ["PARENT", ...(this.isBase ? [] : this.read(Framework.constructorArgumentsURL).match(/(?<=^\s*).+?(?=\s*$)/gm) ?? [])] : this.BaseType.framework.constructorArguments
  if (this.has(Framework.constructorURL) || this.has(Framework.postConstructorURL)) {
   this.file.addLine(`constructor(${this.constructorArguments.join(", ")}) {`, this.buildSource, 207/* here */, 28, " ", false)
   if (this.has(Framework.constructorURL)) {
    this.constructorBody = this.read(Framework.constructorURL)
    this.constructorSource = this.file.addSource(Framework.constructorURL, this.constructorBody)
    const lines = this.constructorBody.split("\n")
    const firstLine = lines.shift()
    if (!firstLine.startsWith("super(")) throw "define.js doesn't start with 'super(' ... " + this.host
    this.file.addLine(firstLine.replace(/(?<=^super\()/, "PARENT, "), this.constructorSource, 0, 0, "  ", false)
    if (lines.length)
     this.file.addLines(lines, this.constructorSource, 1, 0, "  ")
   } else this.file.addLine(`super(${this.isBase ? "" : this.constructorArguments.join(", ")})`, this.buildSource, 217/* here */, 35, "  ", false)
   if (this.has(Framework.postConstructorURL)) {
    this.addContext()
    this.postConstructorBody = this.read(Framework.postConstructorURL)
    this.postConstructorSource = this.file.addSource(Framework.postConstructorURL, this.postConstructorBody)
    this.file.addLines(this.postConstructorBody.split("\n"), this.postConstructorSource, 0, 0, "  ")
   }
   this.file.addLine(`}`, this.buildSource, /* here */224, 28, " ")
  }
 }
 compileMethods() {
  const templateFilenames = Object.keys(this.directory ?? {}).concat(Object.keys(this.options ?? {})).filter(k => k.endsWith(".js") && k.split('.').length > 2)
  this.file.addSection(`
async createResponse(filename) { return await framework.createResponse(filename, this) }
async createDataURI(filename) { return await framework.createDataURI(filename, this) }
async resolve(filename, fallback) { return await framework.resolve(filename, fallback, this) }
get framework() { return framework }
get host() { return scriptHost }`.slice(1), this.buildSource, 264/* here */, 0, " ", false)
  for (const name in Framework.asyncMethodArguments) this.compileMethod(name)
  for (const name of templateFilenames) this.compileMethod(name, true)
 }
 compileMethod(name, isTemplate) {
  if (isTemplate) name = name.slice(0, -3)
  const methodData = this.asyncMethods[name] = {
   url: `${name}.js`,
   arguments: isTemplate ? ["REQUEST"] : Framework.asyncMethodArguments[name],
   source: undefined,
   content: undefined
  }
  if (!isTemplate && !this.has(methodData.url)) return
  this.file.addLine(`async["${name}"](${methodData.arguments.join(", ")}) {
 `, this.buildSource, 245/* here */, 23, " ", false)
  if (Framework.verbosity >= 3)
   this.file.addLine(`console.groupCollapsed(\`\x1b[38;5;158m${this.host} => ${name}()\x1b[0m\`);`, this.buildSource, 247/* here */, 24, "  ", false)
  this.addContext(true, isTemplate)
  methodData.content = this.read(methodData.url)
  methodData.source = this.file.addSource(methodData.url, methodData.content)
  const methodLines = methodData.content.split("\n")
  if (this.isBase) this.file.addLines(methodLines, methodData.source, 0, 0, "  ")
  else {
   if (["setDocument", "unsetDocument", "updateDocument"].includes(name)) {
    this.file.addLine(`await super["${name}"](LAYER);`, this.buildSource, 255/* here */, 24, "  ", false)
    this.file.addLines(methodLines, methodData.source, 0, 0, "  ")
   } else {
    let hasSuper = false
    methodLines.forEach((methodLine, ln) => {
     const firstMatch = [...methodLine.matchAll(/(?<=[^\w]|^)super\s*\(/g)][0]
     if (firstMatch) {
      hasSuper = true
      methodLine = methodLine.slice(0, firstMatch.index) + `await super["${name}"](` + (name === "initialize" ? "" : "LAYER, ") + methodLine.slice(firstMatch.index + firstMatch[0].length)
      this.file.addLine(methodLine, methodData.source, ln, 0, "  ", false)
     } else
      this.file.addLine(methodLine, methodData.source, ln, 0, "  ")
    })
    if (!hasSuper && name !== "initialize" && !isTemplate) console.warn("\x1b[38;5;100m" + 'warning ' + '\x1b[38;5;226m' + `${this.host} => ${name}()` + "\x1b[38;5;100m" + " doesn't call super." + "\x1b[0m")
   }
  }
  if (Framework.verbosity >= 3)
   this.file.addLine(`;console.groupEnd()`, this.buildSource, 272/* here */, 24, "  ")
  this.file.addLine(`}`, this.buildSource, 273/* here */, 23, " ")
 }
 closeClass() {
  this.file.addLine("})", this.buildSource, 155, 22)
 }
 has(filename) {
  return !!this.getSourceObject(filename)
 }
 read(filename, fallback) {
  const sourceObject = this.getSourceObject(filename)
  if (sourceObject) {
   if (filename in sourceObject) return sourceObject[filename]
   if ((filename + ".js") in sourceObject) throw new Error(`Cannot use Framework.prototype.read on templated file https://${this.host}/${filename}`)
  }
  return fallback
 }
 async createResponse(request, part) {
  const url = new URL(request, "https://" + this.host)
  const filename = url.pathname.split("/").pop()
  const [type, binary] = Framework.headerOf(filename)
  let body = await this.resolve(filename, null, part)
  if (!body) {
   console.warn('404 @ ' + this.host + "/" + filename)
   body = new Blob([], { type })
  } else if (binary) {
   const B = atob(body), k = B.length, A = new ArrayBuffer(k), I = new Uint8Array(A)
   for (var i = 0; i < k; i++) I[i] = B.charCodeAt(i)
   body = new Blob([I], { type })
  }
  return new Response(body, {
   headers: {
    "content-type": type,
    expires: "Sun, 20 Jul 1969 20:17:00 UTC",
    server: "kireji",
   },
  })
 }
 async createDataURI(request, part) {
  const url = new URL(request, "https://" + this.host)
  const filename = url.pathname.split("/").pop()
  const [type, binary] = Framework.headerOf(filename)
  let body = await this.resolve(filename, null, part)
  if (!body) {

   console.warn('404 @' + this.host + "/" + filename)
   body = ""
  }
  return `data:${type};base64,${binary ? body : Framework.btoaUnicode(body)}`
 }
 async resolve(request, fallback, part, url = new URL(request, "https://" + this.host)) {
  if (url.href in this.generatedFileCache)
   return this.generatedFileCache[url.href]

  const filename = url.pathname.split("/").pop()

  const sourceObject = this.getSourceObject(filename)

  if (sourceObject) {
   if (filename in sourceObject)
    return sourceObject[filename]

   if (!part)
    throw new Error(`Request ${url.href} requires a part instance to resolve templated file on ${this.host}.`)

   return this.generatedFileCache[url.href] = await part[filename](url)
  }

  if ("framework" in this.BaseType)
   return await this.BaseType.framework.resolve(filename, fallback, part, url)

  return fallback
 }
 resolveSync(request, fallback, url = new URL(request, "https://" + this.host)) {
  const filename = url.pathname.split("/").pop()
  const sourceObject = this.getSourceObject(filename)
  if (sourceObject) {
   if (filename in sourceObject)
    return sourceObject[filename]

   throw new Error(`Cannot resolve sync on file - template must be async @${url.href} (from ${this.host}).`)
  }

  if ("framework" in this.BaseType)
   return this.BaseType.framework.resolveSync(filename, fallback, url)

  return fallback
 }
 getSourceObject(filename) {
  const { options = {}, directory } = this
  if (options && (filename in options || (filename + ".js") in options)) return this.options
  if (directory && (filename in directory || (filename + ".js") in directory)) return this.directory
 }
 addContext(isAsync = false, isTemplate = false, file = this.file) {
  this.BaseType.framework?.addContext(isAsync, isTemplate, file)
  const locallySourced = file === this.file
  const pathPrefix = locallySourced ? "" : file.pathToRoot + "/" + this.pathFromRoot + "/"
  if (this.has(Framework.contextURL)) {
   const body = this.read(Framework.contextURL)
   file.addSection(body, file.addSource(pathPrefix + Framework.contextURL, body), 0, 0, "  ")
  }
  if (isAsync && this.has(Framework.asyncContextURL)) {
   const body = this.read(Framework.asyncContextURL)
   file.addSection(body, file.addSource(pathPrefix + Framework.asyncContextURL, body), 0, 0, "  ")
   if (isTemplate) {
    const body = this.read(Framework.templateContextURL)
    file.addSection(body, file.addSource(pathPrefix + Framework.templateContextURL, body), 0, 0, "  ")
   }
  }
 }
}

Framework.tags = (() => {
 const result = []
 let branchName, commitMessage, commitTag
 if (!process.env.VERCEL || process.env.__VERCEL_DEV_RUNNING) {
  branchName = $('git branch --show-current').toString().trim()
  commitMessage = $('git log -1').toString()
  commitTag = $('git log -1 --pretty=%s').toString().trim()
  result.push("local")
 } else {
  branchName = process.env.VERCEL_GIT_COMMIT_REF
  commitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE
  commitTag = commitMessage.slice(0, commitMessage.indexOf("\n"))
 }
 if (branchName !== "main") result.push(branchName)
 const semanticVersion = commitTag.split(".").map(x => parseInt(x))
 if (result.includes("local")) {
  if (semanticVersion[0] === 0) {
   if (Framework.change === "major") {
    semanticVersion[1]++
    semanticVersion[2] = 0
   } else semanticVersion[2]++
  } else {
   if (Framework.change === "major") {
    semanticVersion[0]++
    semanticVersion[1] = semanticVersion[2] = 0
   } else if (Framework.change === "minor") {
    semanticVersion[1]++
    semanticVersion[2] = 0
   } else semanticVersion[2]++
  }
 }
 result.unshift(semanticVersion.join("."))
 return result
})()

Framework.version = "/v" + Framework.tags[0].split(".")[0] + "/"

Framework.log(0, "Archiving " + Framework.tags.join("-"))

Framework.DNSRoot = (() => {
 const result = {}
 const readRecursive = (host = "", folderPath = Framework.domainRoot, indent = "", tab = "  ", directory = result) => {
  if (host) {
   if (host.length > 253) throw SyntaxError(`requested host is ${host.length} characters long, exceeding the maximum domain name length of 253. \n${host}`)
   Framework.log(2, `\x1b[38;5;27m${indent}<host host="\x1b[38;5;75m${host}\x1b[38;5;27m">\x1b[0m`)
  } else {
   Framework.log(2, `\x1b[38;5;27m<hosts>\x1b[0m`)
  }
  if (!itemExists(folderPath)) throw new ReferenceError("can't pack nonexistent folder " + folderPath)
  for (const itemName of readFolder(folderPath)) {
   const
    folderPath = [Framework.domainRoot, ...(host ? host.split(".").reverse() : [])].join('/'),
    filePath = folderPath + "/" + itemName
   if (itemExists(filePath)) {
    const stats = getItemStats(filePath)
    if (stats.isDirectory()) {
     readRecursive(host ? itemName ? itemName + "." + host : host : itemName ?? "", filePath, indent + tab, tab, directory[itemName] = {})
    }
    else if (stats.isFile()) {
     try {
      if (!$(`git check-ignore -v ${filePath}`).includes('.gitignore:')) throw 1
      Framework.log(2, `\x1b[38;5;239m${indent}${tab}<file name="${itemName}" ignored />\x1b[0m`)
     } catch {
      const
       extension = extname(filePath),
       content = readFile(filePath, ['.png', '.gif'].includes(extension) ? "base64" : "utf-8")
      Framework.log(2, `\x1b[38;5;28m${indent}${tab}<file name="\x1b[38;5;76m${itemName}\x1b[38;5;28m" />\x1b[0m`)
      directory[itemName] = content
     }
    }
   }
  }
  if (host) Framework.log(2, `\x1b[38;5;27m${indent}</host>\x1b[0m`)
  else Framework.log(2, `\x1b[38;5;27m</hosts>\x1b[0m`)
 }
 readRecursive()
 /*
  const { resolveTxt } = require('dns')
  const txt = host => new Promise(give => resolveTxt(host, (e, TXT) => e ? (Framework.log(0, e), process.exit(21)) : give(TXT)))
  const targetHost = "root.core.parts"
  txt(targetHost).then(TXT => {
   for (const txt of TXT) {
    if (txt[0].startsWith("part://")) {
     const
      { host: host, searchParams, hash } = new URL(txt.join("")),
      payload = { [targetHost + "/.host"]: host }
     if (searchParams.has("$1") || searchParams.has("$2")) {
      payload[targetHost + "/define.js"] = `super(${atob(searchParams.get("$1") ?? "")})\n${atob(searchParams.get("$2") ?? "")}`
     }
     console.log(payload)
     break
    }
   }
   process.exit(21)
  })
 */
 return result
})()

console.log(Framework.createType("pick-n.core.parts").toString())

Framework.log(0, "Publishing " + Framework.tags.join("-"))

if (!itemExists(Framework.clientRoot))
 makeFolder(Framework.clientRoot)

const versionPath = Framework.clientRoot + Framework.version

if (itemExists(versionPath))
 removeItem(versionPath, { recursive: true, force: true })

makeFolder(versionPath)
writeFile(versionPath + "index.html", Framework.indexHTML)
writeFile(versionPath + Framework.clientScriptURL, Framework.compile())

const readmeURL = "README.md"
const readmeBody = readFile(readmeURL, "utf-8")
const readmeVersionBody = readmeBody.replace(/version-\d+\.\d+\.\d+/, "version-" + Framework.tags[0])
writeFile(readmeURL, readmeVersionBody)