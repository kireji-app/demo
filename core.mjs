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
class Core {
 static parts = []
 static vlqBase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
 static baseHost = "type.core.parts"
 static rootHost = "root.core.parts"
 static debugHost = "glowstick.click"
 static isVerbose = false
 static clientRoot = "public"
 static domainRoot = "domain-root"
 static typeURL = "base.host"
 static contextURL = "context.js"
 static constructorURL = "define.js"
 static cloudScriptURL = "core.mjs"
 static clientScriptURL = "core.js"
 static asyncContextURL = "asyncContext.js"
 static postConstructorURL = "postDefine.js"
 static constructorArgumentsURL = "define.args"
 static indexHTML = `<!DOCTYPE html><html lang=en><head><link rel=manifest /><link rel=icon href="data:image/png;base64,iVBORw0KGgo="><link rel="apple-touch-icon" href="data:image/png;base64,iVBORw0KGgo="><meta name=robots content=noindex /><meta name=viewport content="width=device-width,initial-scale=0.8" /><script defer src=${this.clientScriptURL}></script></head></html>`
 static BaseType = null
 static archive = null
 static tags = null
 static asyncMethodArguments = {
  setLayer: ["layer", "newState"],
  propagateRootward: ["layer", "subparts"],
  propagateLeafward: ["layer", "newState"],
  setDocument: ["layer"],
  unsetDocument: ["layer"],
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
   addSource(source, script = null) {
    let srcIndex = this.sources.indexOf(source)
    if (srcIndex === -1) {
     srcIndex = this.sources.length
     this.sources.push(source)
     this.scripts.push(null)//script)
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
    return this.lines.join("\n") + (Core.tags.includes("dev") ? `
//${"#"} sourceMappingURL=data:application/json;charset=utf-8;base64,${btoa(this.getMap())}${url ? `
//${"#"} sourceURL=${url}` : ""}` : "")
   },
   getMap() {
    const mappings = Core.encodeSourceMap(this.mappings)
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
  this.buildSource = this.file.addSource(this.cloudScriptURL, null)
  this.file.addLines(this.toString().split("\n"), this.buildSource, 11/* here */, 0, " ")
  this.file.addSection(`
Core.tags = ${JSON.stringify(this.tags)}
Core.archive = ${JSON.stringify(this.archive)}
Core.initialize()`.slice(1), this.buildSource, 105/* here */, 0, "", false)
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
 get archive() { return Core.archive[this.host] }
 constructor(host, options) {
  if (!host) throw "undefined host"
  this.host = host
  this.options = options
  if (this.host in Core) return Core[this.host]
  Core[this.host] = this
  this.isBase = this.host === Core.baseHost
  this.domains = this.host.split(".").concat(Core.domainRoot)
  this.pathFromRoot = [...this.domains].reverse().join("/")
  if (!this.isBase) {
   this.baseHost = this.read(Core.typeURL, Core.baseHost)
  }
  this.BaseType = this.isBase ? Array : Core.createType(this.baseHost)
  this.pathToRoot = new Array(this.domains.length).fill("..").join("/")
  this.compile()
 }
 compile() {
  this.file = Core.createFile(this.pathFromRoot, this.pathToRoot)
  this.buildSource = this.file.addSource(this.pathToRoot + "/" + Core.cloudScriptURL)
  this.file.core = this
  this.openClass()
  this.compileConstructor()
  this.compileMethods()
  this.closeClass()
  this.script = this.file.packAndMap()
  const core = this
  const read = (filename, fallback) => this.read(filename, fallback)
  this.Type = eval(this.script)
  this.Type.core = this
  if (this.isBase) Core.BaseType = this.Type
 }
 openClass() {
  this.file.addLine(`(class ${this.domains[0].replaceAll(/[-](.)|^(.)/g, ([...c]) => c.pop().toUpperCase())} extends this.BaseType {`, this.buildSource, 171/* here */, 21, "", false)
 }
 compileConstructor() {
  this.constructorArguments = this.has(Core.constructorArgumentsURL) ? this.read(Core.constructorArgumentsURL).match(/(?<=^\s*).+?(?=\s*$)/gm) : this.isBase ? [] : this.BaseType.core.constructorArguments
  if (this.has(Core.constructorURL) || this.has(Core.postConstructorURL)) {
   this.file.addLine(`constructor(${this.constructorArguments.join(", ")}) {`, this.buildSource, 176/* here */, 28, " ", false)
   if (this.has(Core.constructorURL)) {
    this.constructorBody = this.read(Core.constructorURL)
    this.constructorSource = this.file.addSource(Core.constructorURL)
    this.file.addLines(this.constructorBody.split("\n"), this.constructorSource, 0, 0, "  ")
   } else this.file.addLine(`super(${this.isBase ? "" : this.constructorArguments.join(", ")})`, this.buildSource, 181/* here */, 35, "  ", false)
   if (this.has(Core.postConstructorURL)) {
    this.addContext()
    this.postConstructorBody = this.read(Core.postConstructorURL)
    this.postConstructorSource = this.file.addSource(Core.postConstructorURL)
    this.file.addLines(this.postConstructorBody.split("\n"), this.postConstructorSource, 0, 0, "  ")
   }
   this.file.addLine(`}`, this.buildSource, /* here */188, 28, " ")
  }
 }
 compileMethods() {
  for (const name in Core.asyncMethodArguments) {
   const methodData = this.asyncMethods[name] = {
    url: `${name}.js`,
    arguments: Core.asyncMethodArguments[name],
    source: undefined,
    content: undefined
   }
   if (!this.has(methodData.url)) continue
   this.file.addLine(`async ${name}(${methodData.arguments.join(", ")}) {`, this.buildSource, 200/* here */, 23, " ", false)
   if (Core.isVerbose)
    this.file.addLine(`console.groupCollapsed(\`\x1b[38;5;158m${this.host} => ${name}()\x1b[0m\`);`, this.buildSource, 202/* here */, 24, "  ", false)
   this.addContext(true)
   methodData.content = this.read(methodData.url)
   methodData.source = this.file.addSource(methodData.url)
   const methodLines = methodData.content.split("\n")
   if (this.isBase) this.file.addLines(methodLines, methodData.source, 0, 0, "  ")
   else {
    if (name === "unsetDocument" || name === "setDocument") {
     this.file.addLine(`await super.${name}(layer);`, this.buildSource, 210/* here */, 24, "  ", false)
     this.file.addLines(methodLines, methodData.source, 0, 0, "  ")
    } else {
     let hasSuper = false
     methodLines.forEach((methodLine, ln) => {
      const firstMatch = [...methodLine.matchAll(/(?<=[^\w]|^)super\s*\(/g)][0]
      if (firstMatch) {
       hasSuper = true
       methodLine = methodLine.slice(0, firstMatch.index) + `await super.${name}(layer, ` + methodLine.slice(firstMatch.index + firstMatch[0].length)
       this.file.addLine(methodLine, methodData.source, ln, 0, "  ", false)
      } else
       this.file.addLine(methodLine, methodData.source, ln, 0, "  ")
     })
     if (!hasSuper && name !== "initialize") console.warn(`\x1b[38;5;100mwarning \x1b[38;5;226m${this.host} => ${name}()\x1b[38;5;100m doesn't call super.\x1b[0m`)
    }
   }
   if (Core.isVerbose)
    this.file.addLine(`;console.groupEnd()`, this.buildSource, 227/* here */, 24, "  ")
   this.file.addLine(`}`, this.buildSource, 228/* here */, 23, " ")
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
 getSourceObject(filename) {
  return this.options && (filename in this.options) ? this.options : this.archive && (filename in this.archive) ? this.archive : undefined
 }
 addContext(isAsync = false, file = this.file) {
  this.BaseType.core?.addContext(isAsync, file)
  const locallySourced = file === this.file
  const pathPrefix = locallySourced ? "" : file.pathToRoot + "/" + this.pathFromRoot + "/"
  if (this.has(Core.contextURL))
   file.addSection(this.read(Core.contextURL), file.addSource(pathPrefix + Core.contextURL), 0, 0, "  ")
  if (isAsync && this.has(Core.asyncContextURL))
   file.addSection(this.read(Core.asyncContextURL), file.addSource(pathPrefix + Core.asyncContextURL), 0, 0, "  ")
 }
}
Core.tags = (() => {
 const result = []
 let branchName, commitMessage, commitTag
 if (!process.env.VERCEL || process.env.__VERCEL_DEV_RUNNING) {
  branchName = $('git branch --show-current').toString().trim()
  commitMessage = $('git log -1').toString()
  commitTag = $('git log -1 --pretty=%s').toString().trim()
  result.push("dev")
 } else {
  branchName = process.env.VERCEL_GIT_COMMIT_REF
  commitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE
  commitTag = commitMessage.slice(0, commitMessage.indexOf("\n"))
 }
 if (branchName !== "main") result.push(branchName)
 result.unshift(commitTag)
 return result
})()
Core.archive = (() => {
 const result = {}
 const readRecursive = (host, folderPath, indent = "", tab = "  ") => {
  if (host) {
   if (host.length > 253) throw SyntaxError(`requested host is ${host.length} characters long, exceeding the maximum domain name length of 253. \n${host}`)
   Core.log(`\x1b[38;5;27m${indent}<host host="\x1b[38;5;75m${host}\x1b[38;5;27m">\x1b[0m`)
   result[host] = {}
  } else {
   Core.log(`\x1b[38;5;27m<hosts>\x1b[0m`)
  }
  if (!itemExists(folderPath)) throw new ReferenceError("can't pack nonexistent folder " + folderPath)
  for (const itemname of readFolder(folderPath)) {
   const
    folderPath = [Core.domainRoot, ...(host ? host.split(".").reverse() : [])].join('/'),
    filePath = folderPath + "/" + itemname
   if (itemExists(filePath)) {
    const stats = getItemStats(filePath)
    if (stats.isDirectory()) readRecursive(host ? itemname ? itemname + "." + host : host : itemname ?? "", filePath, indent + tab)
    else if (stats.isFile()) {
     try {
      if (!$(`git check-ignore -v ${filePath}`).includes('.gitignore:')) throw 1
      Core.log(`\x1b[38;5;239m${indent}${tab}<file name="${itemname}" ignored />\x1b[0m`)
     } catch {
      const
       extension = extname(filePath),
       content = readFile(filePath, ['.png'].includes(extension) ? "base64" : "utf-8")
      Core.log(`\x1b[38;5;28m${indent}${tab}<file name="\x1b[38;5;76m${itemname}\x1b[38;5;28m" />\x1b[0m`)
      result[host][itemname] = content
     }
    }
   }
  }
  if (host) Core.log(`\x1b[38;5;27m${indent}</host>\x1b[0m`)
  else Core.log(`\x1b[38;5;27m</hosts>\x1b[0m`)
 }
 readRecursive("", Core.domainRoot)
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

if (itemExists(Core.clientRoot))
 removeItem(Core.clientRoot, { recursive: true, force: true })
makeFolder(Core.clientRoot)
writeFile(Core.clientRoot + "/index.html", Core.indexHTML)
writeFile(Core.clientRoot + "/" + Core.clientScriptURL, Core.compile())