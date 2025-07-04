function ƒ(_) {
 globalThis._ = _
 class SourceMappedFile {
  static radix = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
  static sourcePositionMarkPatternRegister = /@[a-z-]+@/g
  static sourcePositionMarkPatternAddLine = /^@[a-z-]+@/g
  lines = []
  sources = []
  marks = []
  scripts = []
  mappings = []
  constructor(name, pathToRepo, pathFromRepo) {
   const sourceFile = this
   sourceFile.name = name
   sourceFile.pathToRepo = pathToRepo
   sourceFile.pathFromRepo = pathFromRepo
  }
  addSource(source, script) {
   const sourceFile = this
   let srcIndex = sourceFile.sources.indexOf(source)
   if (srcIndex === -1) {
    srcIndex = sourceFile.sources.length
    sourceFile.sources.push(source)
    sourceFile.scripts.push(script)
   }
   if (script) {
    const sourceLines = script.toString().split("\n")
    sourceFile.marks[srcIndex] = {}
    for (let ln = 0; ln < sourceLines.length; ln++)
     for (const { 0: mark, index: col } of sourceLines[ln].matchAll(SourceMappedFile.sourcePositionMarkPatternRegister)) {
      if (mark in sourceFile.marks[srcIndex]) throw `Duplicate source position mark ${mark} in ${source}.`
      sourceFile.marks[srcIndex][mark] = { ln, col }
     }
   }
   return srcIndex
  }
  addLine(string, srcIndex, ogLn = 0, ogCol = 0, indent = "", mapTokens = true) {
   const sourceFile = this
   if (typeof string !== "string") throw "bad line: " + typeof string
   const mark = string.match(SourceMappedFile.sourcePositionMarkPatternAddLine)?.[0]
   if (mark) {
    string = string.slice(mark.length)
    ogLn = sourceFile.marks[srcIndex][mark].ln
   }
   sourceFile.lines.push(indent + string)
   if (string && mapTokens) sourceFile.mappings.push([...string.matchAll(/\w+|\s+|\W+/g)].map(({ index: col }) => [indent.length + col, srcIndex, ogLn, ogCol + col]))
   else sourceFile.mappings.push([[indent.length, srcIndex, ogLn, ogCol]])
  }
  addLines(strings, srcIndex, ogLn = 0, ogCol = 0, indent = "", mapTokens = true) {
   const sourceFile = this
   strings.forEach((string, ln) => sourceFile.addLine(string, srcIndex, ogLn + ln, ogCol, indent, mapTokens))
  }
  addSection(string, srcIndex, ogLn = 0, ogCol = 0, indent = "", mapTokens = true) {
   const sourceFile = this
   const lines = string.split("\n")
   const mark = lines[0].match(SourceMappedFile.sourcePositionMarkPatternAddLine)?.[0]
   if (mark) {
    if (lines[0].length === mark.length) lines.shift()
    else lines[0].slice(mark.length)
    ogLn = sourceFile.marks[srcIndex][mark].ln + 1
   }
   sourceFile.addLines(lines, srcIndex, ogLn, ogCol, indent, mapTokens)
  }
  packAndMap(url) {
   const sourceFile = this
   const script = sourceFile.lines.join("\n")
   return _.mapping
    ? script +
    `
//${"#"} sourceMappingURL=data:application/json;charset=utf-8;base64,${btoaUnicode(sourceFile.getMap())}${url
     ? `
//${"#"} sourceURL=${url}`
     : ""
    }`
    : script
  }
  getMap() {
   const sourceFile = this
   const encoderAbsolutePosition = [0, 0, 0, 0, 0]
   const mappings = sourceFile.mappings
    .map(
     decodedLine => (
      (encoderAbsolutePosition[0] = 0),
      decodedLine
       .map(decodedSegment => {
        return decodedSegment
         .map((absoluteDecodedPlace, i) => {
          const signedRelativeDecodedPlace = absoluteDecodedPlace - encoderAbsolutePosition[i]
          encoderAbsolutePosition[i] = absoluteDecodedPlace
          if (signedRelativeDecodedPlace === 0) return "A"
          let unsignedRelativeDecodedPlace = Math.abs(signedRelativeDecodedPlace),
           encodedSegment = ""
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
           encodedSegment += SourceMappedFile.radix[characterIndex]
          }
          return encodedSegment
         })
         .join("")
       })
       .join(",")
     ),
    )
    .join(";")
   return serialize(
    {
     version: 3,
     sourceFile: "sourceFile.js",
     sourceRoot: sourceFile.pathFromRepo,
     sources: sourceFile.sources,
     names: [],
     sourcesContent: sourceFile.scripts,
     mappings,
    },
    null,
    1,
   )
  }
 }
 class FileHeader {
  static useUTF8 = true
  static textBasedPrefixes = [
   'text/',
   'application/json',
   'application/xml',
   'application/javascript',
   'image/svg+xml'
  ]
  static mimeTypes = {
   'png': 'image/png',
   'gif': 'image/gif',
   'svg': 'image/svg+xml',
   'jpg': 'image/jpeg',
   'jpeg': 'image/jpeg',
   'webp': 'image/webp',
   'ico': 'image/x-icon',
   'html': 'text/html',
   'htm': 'text/html',
   'css': 'text/css',
   'js': 'text/javascript',
   'mjs': 'text/javascript',
   'json': 'application/json',
   'xml': 'application/xml',
   'txt': 'text/plain',
   'uri': 'text/uri-list',
   'woff': 'font/woff',
   'woff2': 'font/woff2',
   'ttf': 'font/ttf',
   'otf': 'font/otf',
  }
  #filename
  #extension
  #filetype
  #binary
  get extension() { return this.#extension }
  get filetype() { return this.#filetype }
  get binary() { return this.#binary }
  constructor(filename) {
   const lastDotIndex = filename.lastIndexOf('.')
   this.#filename = filename
   this.#extension = lastDotIndex === -1 || lastDotIndex === filename.length - 1 ? '' : filename.slice(lastDotIndex)
   this.#filetype = FileHeader.mimeTypes[this.#extension.slice(1).toLowerCase()] || "text/plain"
   this.#binary = !FileHeader.textBasedPrefixes.some(prefix => this.#filetype.startsWith(prefix))
   if (!this.#binary && FileHeader.useUTF8 && !this.#filetype.includes('charset'))
    this.#filetype += ';charset=UTF-8'
  }
  toString() {
   return this.#filename
  }
  toJSON() {
   return {
    filename: this.#filename,
    extension: this.extension,
    filetype: this.filetype,
    binary: this.binary
   }
  }
 }
 const
  environment = globalThis.constructor === globalThis.Window ? "window" : globalThis.constructor === globalThis.ServiceWorkerGlobalScope ? "worker" : process?.argv[1]?.split("/").pop() !== "build.js" ? "server" : (
   Object.defineProperty(_, "$", { value: (f => x => f(x).toString().trim())(require("child_process").execSync) }),
   process.env.VERCEL && !process.env.__VERCEL_DEV_RUNNING ? (
    _.local = false,
    _.branch = process.env.VERCEL_GIT_COMMIT_REF,
    _.gitSHA = process.env.VERCEL_GIT_COMMIT_SHA,
    _.version = process.env.VERCEL_GIT_COMMIT_MESSAGE.split("\n")[0]
   ) : (
    _.local = true,
    _.branch = _.$("git branch --show-current").toString().trim(),
    _.gitSHA = _.$("git rev-parse HEAD").toString().trim(),
    _.version = (([M, m, p], c) => +M && c === "major" ? `${++M}.0.0` : c === "minor" || (!+M && c === "major") ? `${M}.${++m}.0` : `${M}.${m}.${++p}`)(_.$("git log -1 --pretty=%s").toString().trim().split("."), _.change)
   ),
   "build"
  ),
  production = !_.local && _.branch === "main",
  log = (verbosity, ...data) => logAny(verbosity, data, "log"),
  warn = (...data) => logAny(0, data, "warn"),
  debug = (...data) => logAny(0, data, "debug"),
  error = (...data) => logAny(0, data, "error"),
  logAny = (verbosity, data, method) => !production && verbosity <= _.verbosity && console[method](...(environment === "worker" ? ["worker:", ...data] : data)),
  openLog = (verbosity, ...data) => logAny(verbosity, data, "group"),
  closeLog = (verbosity, spaced) => (spaced && log(verbosity, ""), logAny(verbosity, [], "groupEnd")),
  toCharms = (x, unit = true) => (x = Math.ceil(x.toString(2).length / 6)) + (unit ? " charm" + (x !== 1 ? "s" : "") : 0),
  serialize = value => JSON.stringify(value, (k, v) => (typeof v === "bigint" ? v.toString() + "n" : v), 1),
  scientific = x => (x = x.toString(10), `${x[0]}.${x[1] ?? 0}${x[2] ?? 0}${x[3] ?? 0} × 10${[...(x.length - 1).toString()].map(n => '⁰¹²³⁴⁵⁶⁷⁸⁹'[n]).join("")}`),
  btoaUnicode = string => btoa(new TextEncoder("utf-8").encode(string).reduce((data, byte) => data + String.fromCharCode(byte), "")),
  hang = ms => {
   warn(`Intentionally hanging the main thread for ${ms} milliseconds.`)
   const start = performance.now()
   let iteration = -1, elapsedMilliseconds, remainingMilliseconds
   do {
    elapsedMilliseconds = Math.trunc(performance.now() - start)
    const newRemainingMilliseconds = ms - elapsedMilliseconds
    Math.sin(iteration++)
    if (Math.trunc(newRemainingMilliseconds / 100) !== Math.trunc(remainingMilliseconds / 100)) log(0, "t: -" + newRemainingMilliseconds)
    remainingMilliseconds = newRemainingMilliseconds
   } while (remainingMilliseconds > 0)
   warn(`Main thread hang finished at iteration ${iteration}.`)
  },
  swap = (x, b = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_0", V, O, i, Y, k, c, o, fl, ps) => {
   // TODO: Undo premature minification.
   return Array.isArray(x) ? `/` + (x.join("") === "0" ? "" : (x.map(f => f.map(y => { V = x = ""; Y = y; k = 0n; while (Y > 0n) { c = 2n ** (k * 6n); if (Y >= c) { Y -= c; k++ } else break } o = 0n; for (i = 0n; i < k; i++)o += 2n ** (i * 6n); V = (y - o).toString(2); fl = Number(k) * 6; ps = V.padStart(fl, "0"); for (i = 0; i < fl; i += 6)x += b[parseInt(ps.slice(i, i + 6), 2)]; return x }).join("~")).join("/")) + `/`) : x.slice(1, -1).split("/").map(f => f.split("~").map(y => (V = O = "0b0", [...y].map(c => { i = b.indexOf(c); if (i === -1 || i >= 64) throw c; V += i.toString(2).padStart(6, 0); O += "000001" }), BigInt(V) + BigInt(O))))
  },
  logEntropy = (verbosity, ...parts) => {
   if (verbosity > _.verbosity) return
   logAny(verbosity, [
    parts.reduce((table, part) => (table[part.host] = {
     "Entropy": toCharms(part.cardinality),
     "Cardinality": scientific(part.cardinality)
    }, table), {})
   ], "table")
  },
  logStringSize = (verbosity, string) => {
   if (verbosity > _.verbosity) return
   string = string.toString()
   const n = new TextEncoder().encode(string).length
   logAny(verbosity, [{
    Mebibytes: { Quantity: n / 2 ** 20, Radix: '2²⁰', "Abbr.": 'MiB', Format: 'UTF-8' },
    Megabytes: { Quantity: n / 10 ** 6, Radix: '10⁶', "Abbr.": 'MB', Format: 'UTF-8' },
    Kibibytes: { Quantity: n / 2 ** 10, Radix: '2¹⁰', "Abbr.": 'KiB', Format: 'UTF-8' },
    Kilobytes: { Quantity: n / 10 ** 3, Radix: '10³', "Abbr.": 'KB', Format: 'UTF-8' },
    "Unicode code points": { Quantity: [...string].length, "Abbr.": 'UCP', Format: 'UTF-32' },
    "ECMA-262 string indices": { Quantity: string.length, "Abbr.": 'chars', Format: 'UTF-16' },
    "Bytes": { Quantity: n, Radix: '2⁸', "Abbr.": 'B', Format: 'UTF-8' },
    "Charms  (base-64 length)": { Quantity: Math.ceil((n * 8) / 6), Radix: '2⁶', "Abbr.": 'chm', Format: 'UTF-8' },
    "Bits": { Quantity: Math.ceil(n * 8), Radix: '2¹', "Abbr.": 'b', Format: 'UTF-8' },
   }], "table")
  }
 openLog(1, `\n     ▌ ▘     ▘▘   ${_.branch}\n 𝒌 = ▙▘▌▛▘█▌ ▌▌   ${_.version}\n     ▛▖▌▌ ▙▖ ▌▌   ${_.local ? "local" : "cloud"}\n            ▙▌    ${environment}\n\nBooting O/S`)
 if (environment === "build") {
  const { extname } = require("path"),
   { statSync: getItemStats, existsSync: itemExists, readdirSync: readFolder, readFileSync: readFile } = require("fs")
  openLog(1, "Scanning Repository")
  let fileCount = 0, domainCount = 0
  function readRecursive(host, folderPath, part) {
   if (host && host.length > 253) throw SyntaxError(`requested host is ${host.length} characters long, exceeding the maximum domain name length of 253. \n${host}`)
   if (!itemExists(folderPath)) throw new ReferenceError("Can't pack nonexistent folder " + folderPath)
   const filenames = []
   for (const itemName of readFolder(folderPath)) {
    if (!host && (["api"].includes(itemName) || itemName.startsWith("."))) continue
    const filePath = (host ? host.split(".").reverse().join("/") + "/" : "") + itemName
    if (itemExists(filePath)) {
     try {
      if (!_.$(`git check-ignore -v ${filePath}`).includes(".gitignore:")) throw "Don't ignore."
      log(2, `❌ ${itemName.padEnd(20, " ")} - ignored`)
     } catch {
      const stats = getItemStats(filePath)
      if (stats.isDirectory()) {
       openLog(2, `📦 ${itemName}/`)
       readRecursive(host ? (itemName ? itemName + "." + host : host) : itemName ?? "", filePath, (part[itemName] = {}))
       closeLog(2)
      } else if (stats.isFile()) filenames.push([itemName, filePath])
     }
    }
   }
   for (const [filename, filePath] of filenames) {
    const extension = extname(filePath)
    const content = readFile(filePath, [".png", ".gif"].includes(extension) ? "base64" : "utf-8")
    log(2, `📄 ${filename}`)
    part[filename] = content
    fileCount++
   }
   domainCount++
  }
  readRecursive("", "./", _)
  closeLog(1, true)
  openLog(2, "Domain Stats")
  log(2, `| Files | Parts |\n|-------|-------|\n| ${("" + fileCount).padEnd(5, " ")} | ${("" + domainCount).padEnd(5, " ")} |`)
  closeLog(2, true)
 }
 const preHydrationArchive = serialize(_)
 // These are scope variables for evaluated method bodies.
 const desktop = _.parts.desktop, { service, worker, share, fullscreen, ["address-bar"]: addressBar, agent, gpu, ["hot-keys"]: hotKeys, hydration } = desktop
 if (environment === "window") var element, svg
 Object.defineProperties(_, {
  fps: { value: 1, configurable: true, writable: true },
  meanFrameTime: { value: 1000, configurable: true, writable: true },
 })
 function getPartFromDomains(domains) {
  return domains.reduceRight((currentFolder, name, index) => {
   if (!currentFolder[name])
    throw new ReferenceError(`There is no folder called '${name}' in ${[...domains].slice(index + 1).reverse().join("/")} (trying to create ${domains.join(".")}).`)
   return currentFolder[name]
  }, _)
 }
 openLog(3, "Hydrating Domains")
 const instances = []
 function recursiveDistributeHydration(part, domains = []) {
  let host
  if (typeof part === "string") {
   host = part
   domains = host.split(".")
   part = getPartFromDomains(domains)
  } else host = domains.join(".")
  if (part.host) return part
  openLog(2, `"${host}"`)
  const subdomains = Object.keys(part).filter(n => typeof part[n] === "object")
  const subpartKeys = [...subdomains]
  const filenames = Object.keys(part).filter(n => typeof part[n] === "string")
  const pathToRepo = new Array(domains.length).fill("..").join("/")
  const pathFromRepo = [...domains].reverse().join("/")
  Object.defineProperties(part, {
   manifest: { value: JSON.parse(part["part.json"] ?? "{}"), configurable: true, writable: true },
   host: { value: host },
   subdomains: { value: subdomains },
   subpartKeys: { value: subpartKeys },
   filenames: { value: filenames },
   domains: { value: domains },
  })
  const typename = part.manifest.typename ?? (host !== "part.core.parts" ? "part.core.parts" : null)
  const prototype = typename ? recursiveDistributeHydration(typename ?? "part.core.parts") : null
  const isAbstract = part.manifest.abstract
  if (prototype) {
   Object.setPrototypeOf(part.manifest, prototype.manifest)
   Object.setPrototypeOf(part, prototype)
   Object.defineProperty(part, "prototype", { value: prototype })
  }
  const sourceFile = new SourceMappedFile(pathFromRepo, pathToRepo, "compiled-part.js")
  const buildSource = sourceFile.addSource(pathToRepo + "/build.js", ƒ.toString())
  class Property {
   static identifierPattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/
   static ids = new Set()
   static collectConstants(targetPart, targetProperty) {
    if (targetPart === part) {
     if (targetProperty.content === "") {
      targetProperty.content = "// Do nothing."
      targetProperty.lines = [targetProperty.content]
      return
     }
    }
    prototype?.Property.collectConstants(targetPart, targetProperty)
    function collectOwnConstants(FILENAME) {
     if (!filenames.includes(FILENAME)) return
     const pathPrefix = targetPart.pathToRepo + "/" + pathFromRepo + "/"
     const path = pathPrefix + FILENAME
     const body = part[FILENAME]
     const lines = body.split("\n")
     for (let ln = 0; ln < lines.length; ln++) new targetProperty.MethodConstant(path, lines[ln], ln)
    }
    collectOwnConstants("const-method.js")
    if (targetProperty.isGetOrSet) collectOwnConstants("const-get-or-set.js")
    if (targetProperty.isView) collectOwnConstants("const-view.js")
   }
   constructor(PROPERTY_ID) {
    const property = Property[PROPERTY_ID] = this
    property.id = PROPERTY_ID
    property.isAlias = PROPERTY_ID.startsWith("alias-")
    property.isView = PROPERTY_ID.startsWith("view-")
    property.isAsync = PROPERTY_ID.startsWith("async-")
    property.isSymbol = PROPERTY_ID.startsWith("symbol-")
    property.isGetOrSet = PROPERTY_ID.startsWith("get-") || PROPERTY_ID.startsWith("set-")
    property.filename = property.isAlias ? PROPERTY_ID.slice(6) : `${PROPERTY_ID}.js`
    property.content = Object.getOwnPropertyDescriptor(part, property.filename)?.value
    property.niceName = (() => {
     if (PROPERTY_ID.includes("-")) {
      if (property.isSymbol)
       return `[Symbol.${PROPERTY_ID.slice(7)}]`
      if (PROPERTY_ID.includes(".")) {
       if (property.isGetOrSet)
        return `["${PROPERTY_ID.slice(4)}"]`
      }
      let temp = PROPERTY_ID.split("-")
      let firstWordBecomesLastWord = temp.shift()
      if (property.isGetOrSet || property.isAlias) firstWordBecomesLastWord = temp.shift()
      temp.push(firstWordBecomesLastWord)
      return temp.map((word, i) => (i ? word[0].toUpperCase() + word.slice(1) : word)).join("")
     }
     return PROPERTY_ID
    })()
    property.MethodConstant = class MethodConstant {
     static all = {}
     static unused = {}
     used = false
     requirements = []
     constructor(SOURCE_PATH, SOURCE_LINE, SOURCE_LINE_NUMBER) {
      const constant = this
      constant.path = SOURCE_PATH
      constant.line = SOURCE_LINE
      constant.lineNumber = SOURCE_LINE_NUMBER
      constant.source = sourceFile.addSource(SOURCE_PATH, SOURCE_LINE)
      if (!SOURCE_LINE.startsWith("const ")) throw "invalid const line: " + SOURCE_LINE
      constant.equalsIndex = SOURCE_LINE.indexOf("=")
      constant.identifier = SOURCE_LINE.slice(5, constant.equalsIndex).trim()
      if (constant.identifier in property.MethodConstant.all) throw "Duplicate definition of constant " + constant.identifier + " (" + host + ")."
      for (const previousConstantIdentifier in property.MethodConstant.unused) {
       const previousConstant = property.MethodConstant.unused[previousConstantIdentifier]
       if (previousConstant.usageRegExp.test(SOURCE_LINE)) constant.requirements.push(property.MethodConstant.unused[previousConstantIdentifier])
      }
      property.MethodConstant.all[constant.identifier] = constant
      property.MethodConstant.unused[constant.identifier] = constant
      constant.usageRegExp = new RegExp(`(?:^|[^.])\\b${constant.identifier}\\b`)
      for (const methodBodyLine of property.lines) if (constant.usageRegExp.test(methodBodyLine)) constant.ensureDeclarationAndDependencies()
     }
     ensureDeclarationAndDependencies() {
      const constant = this
      if (constant.used) return
      for (const requiredConstant of constant.requirements) requiredConstant.ensureDeclarationAndDependencies()
      sourceFile.addSection(constant.line, constant.source, constant.lineNumber, 0, "   ")
      constant.used = true
      delete property.MethodConstant.unused[constant.identifier]
     }
    }
    property.MethodConstant.all.PROPERTY_ID = property.MethodConstant.unused.PROPERTY_ID = {
     identifier: "PROPERTY_ID",
     usageRegExp: /(?:^|[^.])\bPROPERTY_ID\b/g,
     ensureDeclarationAndDependencies() {
      const constant = this
      sourceFile.addLine(`@method-i-d-literal@  const PROPERTY_ID = "${PROPERTY_ID}"`, buildSource)
      constant.used = true
     },
    }
    if (typeof property.content !== "string") return
    property.source = sourceFile.addSource(property.filename, property.content)
    property.lines = property.content ? property.content.split("\n") : []
    property.hasValidPropertyName = property.isSymbol || property.isGetOrSet || Property.identifierPattern.test(property.niceName)
    property.propertyReference = property.hasValidPropertyName ? property.niceName : `["${property.niceName}"]`
    property.propertyAccessor = property.propertyReference.startsWith("[") ? property.propertyReference : "." + property.niceName
    property.argumentString = "(" + (part.manifest[PROPERTY_ID]?.join(", ") ?? (PROPERTY_ID.startsWith("set-") ? "VALUE" : "")) + ")"
    property.modifiers = property.isAsync ? "async " : (property.isGetOrSet ? PROPERTY_ID.slice(0, 3) + " " : (property.isAlias ? "get " : ""))
    property.signature = "\n\n " + property.propertyReference + `: {\n  ${(property.isGetOrSet || property.isAlias) ? property.modifiers : ((property.isAsync ? property.modifiers : "") + "value")}${property.argumentString} {`
    sourceFile.addSection(`@method-open@${property.signature}`, buildSource)
    Property.collectConstants(part, property)
    if (property.isAlias) sourceFile.addLine(`return this["${PROPERTY_ID.slice(6)}"]`, buildSource, null, null, "    ")
    else sourceFile.addLines(property.lines, property.source, 0, 0, "   ")
    sourceFile.addLine(`@method-close@ }\n },`, buildSource, null, null, " ")
   }
  }
  Object.defineProperties(part, {
   Property: { value: Property, configurable: true, writable: true },
   isAbstract: { value: isAbstract }
  })
  for (const fn of filenames) {
   if (!fn.includes(".") && fn.includes("-")) {
    Property.ids.add("alias-" + fn)
   } else if (fn.endsWith(".js") && (fn.startsWith("get-") || fn.startsWith("set-") || fn.startsWith("view-")))
    Property.ids.add(fn.slice(0, -3))
  }
  for (const methodID in part.manifest)
   if (!["cardinality", "typename", "abstract", "singleton"].includes(methodID))
    Property.ids.add(methodID)
  sourceFile.part = part
  sourceFile.addSection(`@descriptor-map-open@({\n //  ${host}${!prototype ? "" : ` instanceof ${prototype.host}`}\n`, buildSource)
  for (const id of Property.ids) new Property(id)
  sourceFile.addLine("@descriptor-map-close@})", buildSource)
  const propertyDescriptorScript = sourceFile.packAndMap()
  const propertyDescriptor = eval(propertyDescriptorScript)
  Object.defineProperties(part, propertyDescriptor)
  let subpartIndex = 0
  for (const subdomain of subdomains) {
   const subpart = part[subdomain]
   Object.defineProperty(subpart, "..", { value: part })
   recursiveDistributeHydration(subpart, [subdomain, ...domains])
   if (subpart.isAbstract) {
    subpartKeys.splice(subpartKeys.indexOf(subpart.key), 1)
    continue
   }
   Object.defineProperty(part, subpartIndex++, { value: subpart })
  }
  if (!isAbstract) instances.push(part)
  closeLog(2)
  return part
 }
 recursiveDistributeHydration(_)
 closeLog(3, true)
 openLog(3, "Building Parts")
 for (const part of instances) part.startBuild()
 closeLog(3)
 _.validate()
 closeLog(1, true)
 log(1, "Boot Completed (end of synchronous script execution).")
}

ƒ({
 change: "patch",
 verbosity: 1,
 mapping: false,
 themeHost: "www.ejaugust.com"
})