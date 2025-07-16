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
  environment = globalThis.constructor === globalThis.Window ? "client" : globalThis.constructor === globalThis.ServiceWorkerGlobalScope ? "worker" : (
   Object.defineProperty(_, "$", { value: (f => x => f(x).toString().trim())(require("child_process").execSync) }),
   _.local = process.env.LOCAL,
   _.branch = _.$("git rev-parse --abbrev-ref HEAD").toString().trim(),
   _.gitSHA = _.$("git rev-parse HEAD").toString().trim(),
   _.version = (([M, m, p], c) => !_.local ? `${M}.${m}.${p}` : +M && c === "major" ? `${++M}.0.0` : c === "minor" || (!+M && c === "major") ? `${M}.${++m}.0` : `${M}.${m}.${++p}`)(_.$("git log -1 --pretty=%s").toString().trim().split("."), _.change),
   "server"
  ),
  production = _.branch === "main" && environment !== "server" && !_.local,
  pathRadix = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_0",
  log = (verbosity, ...data) => logAny(verbosity, data, "log"),
  warn = (...data) => logAny(0, data, "warn"),
  debug = (...data) => logAny(0, data, "debug"),
  error = (...data) => logAny(0, data, "error"),
  logAny = (verbosity, data, method) => !production && verbosity <= _.verbosity && console[method](...(environment === "worker" ? ["worker:", ...data] : data)),
  openLog = (verbosity, ...data) => logAny(verbosity, data, "group"),
  closeLog = (verbosity, spaced) => (spaced && log(verbosity, ""), logAny(verbosity, [], "groupEnd")),
  // toCharms = (x, unit = true) => (x = Math.ceil(x.toString(2).length / 6)) + (unit ? " charm" + (x !== 1 ? "s" : "") : 0),
  toCharms = (x, unit = true) => encodeSegment(BigInt(x) - 1n).length + (unit ? " charm" + (x !== 1 ? "s" : "") : 0),
  camelCase = (words, delimiter = "-") => (typeof words === "string" ? words.split(delimiter) : words).map((word, i) => (i ? word[0].toUpperCase() + word.slice(1) : word)).join(""),
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
  encodeSegment = routeID => {
   let charmCount = 0n
   let charmIndex
   let reducedRouteID = routeID

   while (reducedRouteID > 0n) {
    charmIndex = 2n ** (charmCount * 6n)
    if (reducedRouteID >= charmIndex) {
     reducedRouteID -= charmIndex
     charmCount++
    } else break
   }

   let charmLengthOffset = 0n

   for (i = 0n; i < charmCount; i++)
    charmLengthOffset += 2n ** (i * 6n)

   const binaryString = (routeID - charmLengthOffset).toString(2)
   const charmRoundedBinaryLength = Number(charmCount) * 6
   const charmRoundedBinaryString = binaryString.padStart(charmRoundedBinaryLength, "0")

   let segment = ""

   for (i = 0; i < charmRoundedBinaryLength; i += 6)
    segment += pathRadix[parseInt(charmRoundedBinaryString.slice(i, i + 6), 2)]

   return segment
  },
  encodeRoute = routeID => `/${_.version}/${encodeSegment(routeID)}/`,
  decodeRoute = pathname => {
   const segments = pathname.slice(1, -1).split("/")
   const versionSegment = segments.shift()
   const rootSegment = segments.shift()

   let charmRoundedBinaryString = "0b0"
   let charmLengthOffsetBinaryString = "0b0"

   for (const character of [...rootSegment]) {
    const characterValue = pathRadix.indexOf(character)
    if (characterValue === -1 || characterValue >= 64) throw character
    charmRoundedBinaryString += characterValue.toString(2).padStart(6, 0)
    charmLengthOffsetBinaryString += "000001"
   }

   return BigInt(charmRoundedBinaryString) + BigInt(charmLengthOffsetBinaryString)
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

 openLog(1, `\n     ▌ ▘     ▘▘   ${_.branch}\n 𝒌 = ▙▘▌▛▘█▌ ▌▌   ${_.version}\n     ▛▖▌▌ ▙▖ ▌▌   \n            ▙▌    ${environment}\n\nBooting O/S`)
 if (environment === "server" && require.main === module) {
  const { extname } = require("path"),
   { statSync: getItemStats, existsSync: itemExists, readdirSync: readFolder, readFileSync: readFile } = require("fs")
  openLog(1, "Scanning Repository")
  let fileCount = 0, domainCount = 0
  function readRecursive(host, folderPath, part) {
   if (host && host.length > 253) throw SyntaxError(`requested host is ${host.length} characters long, exceeding the maximum domain name length of 253. \n${host}`)
   if (!itemExists(folderPath)) throw new ReferenceError("Can't pack nonexistent folder " + folderPath)
   const filenames = []
   for (const itemName of readFolder(folderPath)) {
    if (!host && itemName.startsWith(".")) continue
    const filePath = (host ? host.split(".").reverse().join("/") + "/" : "") + itemName
    if (itemExists(filePath)) {
     try {
      if (filePath !== "build.js" && !itemName.endsWith(".ts") && !_.$(`git check-ignore -v ${filePath}`).includes(".gitignore:")) throw "Don't ignore."
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
 const desktop = _.parts.desktop, { server, worker, share, fullscreen, ["address-bar"]: addressBar, agent, gpu, ["hot-keys"]: hotKeys, client } = desktop
 if (environment === "client") var element, svg
 Object.defineProperties(_, {
  fps: { value: 1, configurable: true, writable: true },
  meanFrameTime: { value: 1000, configurable: true, writable: true },
  application: { value: null, writable: true },
  applications: { value: {} },
 })

 function getPartFromDomains(domains) {
  return domains.reduceRight((currentFolder, name, index) => {
   if (!currentFolder[name])
    throw new ReferenceError(`There is no part called '${name}' in ${[...domains].slice(index + 1).reverse().join("/") || "the DNS root"} (trying to create ${domains.join(".")}).`)
   return currentFolder[name]
  }, _)
 }

 openLog(3, "Hydrating Domains")
 const instances = []
 const imgSources = []
 let landingHash
 function distributeHydration(part, domains = []) {
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
  const prototype = typename ? distributeHydration(typename ?? "part.core.parts") : null
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

    if (!filenames.includes("constants.js")) return
    const pathPrefix = targetPart.pathToRepo + "/" + pathFromRepo + "/"
    const path = pathPrefix + "constants.js"
    const body = part["constants.js"]
    const lines = body.split("\n")
    for (let ln = 0; ln < lines.length; ln++) {
     if (lines[ln].startsWith("const "))
      new targetProperty.MethodConstant(path, lines[ln], ln)
     // else throw "invalid const line: " + SOURCE_LINE
    }
   }
   constructor(PROPERTY_ID) {
    const property = Property[PROPERTY_ID] = this
    property.id = PROPERTY_ID
    property.isAlias = PROPERTY_ID.startsWith("@")
    property.isView = PROPERTY_ID.startsWith("view-")
    property.isAsync = PROPERTY_ID.startsWith("async-")
    property.isSymbol = PROPERTY_ID.startsWith("symbol-")
    property.isGenerated = PROPERTY_ID.startsWith("*")
    property.filename = property.isAlias ? PROPERTY_ID.slice(1) : `${PROPERTY_ID}.js`
    property.content = Object.getOwnPropertyDescriptor(part, property.filename)?.value
    property.niceName = (() => {
     if (PROPERTY_ID.includes("-") || property.isGenerated) {

      if (property.isGenerated && (PROPERTY_ID.includes(".")))
       return `["${PROPERTY_ID.slice(1)}"]`

      if (property.isSymbol)
       return `[Symbol.${PROPERTY_ID.slice(7)}]`

      // First word of kebab-case property name becomes last word of camelCase identifier.
      const words = PROPERTY_ID.slice(+(property.isGenerated || property.isAlias)).split("-")
      words.push(words.shift())
      return camelCase(words)
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
      constant.equalsIndex = SOURCE_LINE.indexOf("=")
      constant.identifier = SOURCE_LINE.slice(5, constant.equalsIndex).trim()
      if (constant.identifier in property.MethodConstant.all) throw "Duplicate definition of constant " + constant.identifier + " (" + host + ")."
      for (const previousConstantIdentifier in property.MethodConstant.unused) {
       const previousConstant = property.MethodConstant.unused[previousConstantIdentifier]
       if (previousConstant.usageRegExp.test(SOURCE_LINE)) constant.requirements.push(property.MethodConstant.unused[previousConstantIdentifier])
      }
      property.MethodConstant.all[constant.identifier] = constant
      property.MethodConstant.unused[constant.identifier] = constant
      constant.usageRegExp = new RegExp(`(?:^|[^.]|\.{3})\\b${constant.identifier}\\b`)
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
    property.source = sourceFile.addSource(pathToRepo + "/" + pathFromRepo + "/" + property.filename, property.content)
    property.lines = property.content ? property.content.split("\n") : []
    property.niceNameIsValidIdentifier = property.isSymbol || property.isGenerated || Property.identifierPattern.test(property.niceName)
    property.propertyReference = property.niceNameIsValidIdentifier ? property.niceName : `["${property.niceName}"]`
    property.propertyAccessor = property.propertyReference.startsWith("[") ? property.propertyReference : "." + property.niceName
    property.argumentString = "(" + (part.manifest[PROPERTY_ID]?.join(", ") ?? (PROPERTY_ID.startsWith("set-") ? "VALUE" : "")) + ")"
    property.modifiers = property.isAsync ? "async " : (property.isGenerated || property.isAlias ? "get " : "")
    property.signature = "\n\n " + property.propertyReference + `: {\n  ${(property.isGenerated || property.isAlias) ? property.modifiers : ((property.isAsync ? property.modifiers : "") + "value")}${property.argumentString} {`
    sourceFile.addSection(`@method-open@${property.signature}`, buildSource)
    Property.collectConstants(part, property)
    if (property.isAlias) sourceFile.addLine(`return this["${PROPERTY_ID.slice(1)}"]`, buildSource, null, null, "    ")
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
    Property.ids.add("@" + fn)
   } else if (fn.endsWith(".js") && (fn.startsWith("*") || fn.startsWith("set-") || fn.startsWith("view-"))) {
    Property.ids.add(fn.slice(0, -3))

    if (fn.startsWith("*") && (fn.endsWith(".png.js") || fn.endsWith(".gif.js")))
     imgSources.push([part, fn.slice(1, -3)])
   } else if (fn.endsWith(".png") || fn.endsWith(".gif"))
    imgSources.push([part, fn])
  }
  for (const methodID in part.manifest)
   if (!["cardinality", "typename", "abstract", "singleton"].includes(methodID))
    Property.ids.add(methodID)
  sourceFile.part = part
  sourceFile.addSection(`@descriptor-map-open@({\n //  ${host}${!prototype ? "" : ` instanceof ${prototype.host}`}\n`, buildSource)
  for (const id of Property.ids) new Property(id)
  sourceFile.addLine("@descriptor-map-close@})", buildSource)
  const propertyDescriptorScript = sourceFile.packAndMap()
  try {
   const propertyDescriptor = eval(propertyDescriptorScript)
   Object.defineProperties(part, propertyDescriptor)
  } catch (e) {
   throw new Error(`Failed to construct property descriptor for ${host}.\n${e}\n${propertyDescriptorScript}`)
  }
  let subpartIndex = 0
  for (const subdomain of subdomains) {
   const subpart = part[subdomain]
   if (subdomain.includes("-")) {
    const identifier = camelCase(subdomain)
    if (identifier in part)
     throw `Computed camelCase name ${identifier} for ${subdomain}.${host} conflicts with existing property ${identifier} on ${host}.`
    Object.defineProperty(part, identifier, { value: subpart })
   }
   Object.defineProperty(subpart, "..", { value: part })
   distributeHydration(subpart, [subdomain, ...domains])
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
 distributeHydration(_)
 closeLog(3, true)
 openLog(3, "Building Parts")
 for (const part of instances) part.startBuild()
 closeLog(3)
 openLog(3, "Computing Landing Hash")
 landingHash = 'hello'
 log(3, "Computed output: " + landingHash)
 closeLog(3)
 if (_.local) _.validate()
 closeLog(1, true)
 log(1, "Boot Completed (end of synchronous script execution).")
}

ƒ({
 change: "major",
 verbosity: 100,
 mapping: false,
 hangHydration: false
})