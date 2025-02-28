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
 static parts = []
 static cores = []
 static vlqBase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
 static baseHost = "core.parts"
 static rootHost = "root.core.parts"
 static fallbackHost = "www.fallback.cloud"
 static isVerbose = false
 static clientRoot = "public"
 static domainRoot = "dns-root"
 static typeURL = "base.host"
 static contextURL = "context.js"
 static constructorURL = "define.js"
 static cloudScriptURL = "framework.mjs"
 static clientScriptURL = "framework.js"
 static asyncContextURL = "asyncContext.js"
 static postConstructorURL = "postDefine.js"
 static constructorArgumentsURL = "define.args"
 static BaseType = null
 static archive = null
 static tags = null
 static get indexHTML() { return `<!DOCTYPE html><html lang=en><head><link rel=manifest /><link rel=icon href="data:image/png;base64,iVBORw0KGgo="><link rel="apple-touch-icon" href="data:image/png;base64,iVBORw0KGgo="><meta name=robots content=noindex /><meta name=viewport content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0" /> <script defer src=/${this.clientScriptURL}></script></head></html>` }
 static asyncMethodArguments = {
  setLayer: ["LAYER", "STATE"],
  propagateRootward: ["LAYER", "LEAVES"],
  propagateLeafward: ["LAYER", "STATE"],
  setDocument: ["LAYER"],
  unsetDocument: ["LAYER"],
  updateDocument: ["LAYER"],
  initialize: [],
 }
 static log(...data) {
  if (this.tags.includes("dev") && this.isVerbose) console.log(...data)
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
    function base64EncodeUnicode(str) {
     return btoa(new TextEncoder('utf-8').encode(str)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
     )
    }
    return this.lines.join("\n") + (Framework.tags.includes("dev") ? `
//${"#"} sourceMappingURL=data:application/json;charset=utf-8;base64,${base64EncodeUnicode(this.getMap())}${url ? `
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
 static createPart(host, options) {
  if (!host) throw "undefined host"
  const T = this.createType(host, options)
  return new T()
 }
 static async initialize() {
  this.root = this.createPart(this.rootHost)
  await this.root.initialize()
 }
 static compile() {
  this.file = this.createFile("../")
  this.buildSource = this.file.addSource(this.cloudScriptURL, Array(11).fill("\n").join("") + this.toString())
  this.file.addLines(this.toString().split("\n"), this.buildSource, 11/* here */, 0, " ")
  this.file.addSection(`
Framework.tags = ${JSON.stringify(this.tags)}
Framework.archive = ${JSON.stringify(this.archive)}
Framework.initialize()`.slice(1), this.buildSource, 114/* here */, 0, "", false)
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
     encodedSegment += this.vlqBase[characterIndex]
    }
    return encodedSegment
   }).join('')
  }).join(","))).join(";")
 }
 asyncMethods = {}
 get archive() { return Framework.archive[this.host] }
 constructor(host, options) {
  if (!host) throw "undefined host"
  this.host = host
  this.options = options
  if (this.host in Framework.cores) return Framework.cores[this.host]
  Framework.cores[this.host] = this
  this.isBase = this.host === Framework.baseHost
  this.domains = this.host.split(".").concat(Framework.domainRoot)
  this.pathFromRoot = [...this.domains].reverse().join("/")
  if (!this.isBase) {
   this.baseHost = this.read(Framework.typeURL, Framework.baseHost)
  }
  this.BaseType = this.isBase ? Array : Framework.createType(this.baseHost)
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
    class Type // is ${this.host}
  extends Base // is ${this.isBase ? "Native Array" : this.baseHost}
{`, this.buildSource, 185/* here */)
 }
 compileConstructor() {
  this.constructorArguments = this.has(Framework.constructorArgumentsURL) ? this.read(Framework.constructorArgumentsURL).match(/(?<=^\s*).+?(?=\s*$)/gm) : this.isBase ? [] : this.BaseType.framework.constructorArguments
  if (this.has(Framework.constructorURL) || this.has(Framework.postConstructorURL)) {
   this.file.addLine(`constructor(${this.constructorArguments.join(", ")}) {`, this.buildSource, 193/* here */, 28, " ", false)
   if (this.has(Framework.constructorURL)) {
    this.constructorBody = this.read(Framework.constructorURL)
    this.constructorSource = this.file.addSource(Framework.constructorURL, this.constructorBody)
    this.file.addLines(this.constructorBody.split("\n"), this.constructorSource, 0, 0, "  ")
   } else this.file.addLine(`super(${this.isBase ? "" : this.constructorArguments.join(", ")})`, this.buildSource, 198/* here */, 35, "  ", false)
   if (this.has(Framework.postConstructorURL)) {
    this.addContext()
    this.postConstructorBody = this.read(Framework.postConstructorURL)
    this.postConstructorSource = this.file.addSource(Framework.postConstructorURL, this.postConstructorBody)
    this.file.addLines(this.postConstructorBody.split("\n"), this.postConstructorSource, 0, 0, "  ")
   }
   this.file.addLine(`}`, this.buildSource, /* here */205, 28, " ")
  }
 }
 compileMethods() {
  for (const name in Framework.asyncMethodArguments) {
   const methodData = this.asyncMethods[name] = {
    url: `${name}.js`,
    arguments: Framework.asyncMethodArguments[name],
    source: undefined,
    content: undefined
   }
   if (!this.has(methodData.url)) continue
   this.file.addLine(`async ${name}(${methodData.arguments.join(", ")}) {`, this.buildSource, 217/* here */, 23, " ", false)
   if (Framework.isVerbose)
    this.file.addLine(`console.groupCollapsed(\`\x1b[38;5;158m${this.host} => ${name}()\x1b[0m\`);`, this.buildSource, 219/* here */, 24, "  ", false)
   this.addContext(true)
   methodData.content = this.read(methodData.url)
   methodData.source = this.file.addSource(methodData.url, methodData.content)
   const methodLines = methodData.content.split("\n")
   if (this.isBase) this.file.addLines(methodLines, methodData.source, 0, 0, "  ")
   else {
    if (["setDocument", "unsetDocument", "updateDocument"].includes(name)) {
     this.file.addLine(`await super.${name}(LAYER);`, this.buildSource, 227/* here */, 24, "  ", false)
     this.file.addLines(methodLines, methodData.source, 0, 0, "  ")
    } else {
     let hasSuper = false
     methodLines.forEach((methodLine, ln) => {
      const firstMatch = [...methodLine.matchAll(/(?<=[^\w]|^)super\s*\(/g)][0]
      if (firstMatch) {
       hasSuper = true
       methodLine = methodLine.slice(0, firstMatch.index) + `await super.${name}(LAYER, ` + methodLine.slice(firstMatch.index + firstMatch[0].length)
       this.file.addLine(methodLine, methodData.source, ln, 0, "  ", false)
      } else
       this.file.addLine(methodLine, methodData.source, ln, 0, "  ")
     })
     if (!hasSuper && name !== "initialize") console.warn(`\x1b[38;5;100mwarning \x1b[38;5;226m${this.host} => ${name}()\x1b[38;5;100m doesn't call super.\x1b[0m`)
    }
   }
   if (Framework.isVerbose)
    this.file.addLine(`;console.groupEnd()`, this.buildSource, 244/* here */, 24, "  ")
   this.file.addLine(`}`, this.buildSource, 245/* here */, 23, " ")
  }
 }
 closeClass() {
  this.file.addLine("})", this.buildSource, 155, 22)
 }
 has(filename) {
  return !!this.getSourceObject(filename)
 }
 read(filename, fallback) {
  return (this.getSourceObject(filename) ?? { [filename]: fallback })[filename]
 }
 resolve(filename, fallback) {
  const sourceObject = this.getSourceObject(filename)

  if (sourceObject)
   return sourceObject[filename]

  if ("framework" in this.BaseType)
   return this.BaseType.framework.resolve(filename, fallback)

  return fallback
 }
 getSourceObject(filename) {
  return this.options && (filename in this.options) ? this.options : this.archive && (filename in this.archive) ? this.archive : undefined
 }
 addContext(isAsync = false, file = this.file) {
  this.BaseType.framework?.addContext(isAsync, file)
  const locallySourced = file === this.file
  const pathPrefix = locallySourced ? "" : file.pathToRoot + "/" + this.pathFromRoot + "/"
  if (this.has(Framework.contextURL)) {
   const body = this.read(Framework.contextURL)
   file.addSection(body, file.addSource(pathPrefix + Framework.contextURL, body), 0, 0, "  ")
  }
  if (isAsync && this.has(Framework.asyncContextURL)) {
   const body = this.read(Framework.asyncContextURL)
   file.addSection(body, file.addSource(pathPrefix + Framework.asyncContextURL, body), 0, 0, "  ")
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
 result.unshift(commitTag)
 return result
})()

console.log("Building " + Framework.tags.join("-"))

Framework.archive = (() => {
 const result = {}
 const readRecursive = (host, folderPath, indent = "", tab = "  ") => {
  if (host) {
   if (host.length > 253) throw SyntaxError(`requested host is ${host.length} characters long, exceeding the maximum domain name length of 253. \n${host}`)
   Framework.log(`\x1b[38;5;27m${indent}<host host="\x1b[38;5;75m${host}\x1b[38;5;27m">\x1b[0m`)
   result[host] = {}
  } else {
   Framework.log(`\x1b[38;5;27m<hosts>\x1b[0m`)
  }
  if (!itemExists(folderPath)) throw new ReferenceError("can't pack nonexistent folder " + folderPath)
  for (const itemname of readFolder(folderPath)) {
   const
    folderPath = [Framework.domainRoot, ...(host ? host.split(".").reverse() : [])].join('/'),
    filePath = folderPath + "/" + itemname
   if (itemExists(filePath)) {
    const stats = getItemStats(filePath)
    if (stats.isDirectory()) readRecursive(host ? itemname ? itemname + "." + host : host : itemname ?? "", filePath, indent + tab)
    else if (stats.isFile()) {
     try {
      if (!$(`git check-ignore -v ${filePath}`).includes('.gitignore:')) throw 1
      Framework.log(`\x1b[38;5;239m${indent}${tab}<file name="${itemname}" ignored />\x1b[0m`)
     } catch {
      const
       extension = extname(filePath),
       content = readFile(filePath, ['.png'].includes(extension) ? "base64" : "utf-8")
      Framework.log(`\x1b[38;5;28m${indent}${tab}<file name="\x1b[38;5;76m${itemname}\x1b[38;5;28m" />\x1b[0m`)
      result[host][itemname] = content
     }
    }
   }
  }
  if (host) Framework.log(`\x1b[38;5;27m${indent}</host>\x1b[0m`)
  else Framework.log(`\x1b[38;5;27m</hosts>\x1b[0m`)
 }
 readRecursive("", Framework.domainRoot)
 /*
  const { resolveTxt } = require('dns')
  const txt = host => new Promise(resolve => resolveTxt(host, (e, TXT) => e ? (console.error(e), process.exit(21)) : resolve(TXT)))
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
if (itemExists(Framework.clientRoot))
 removeItem(Framework.clientRoot, { recursive: true, force: true })

makeFolder(Framework.clientRoot)
writeFile(Framework.clientRoot + "/index.html", Framework.indexHTML)
writeFile(Framework.clientRoot + "/" + Framework.clientScriptURL, Framework.compile())