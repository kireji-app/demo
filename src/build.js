function ƒ(_) {

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

 // Initialization
 const
  environment = globalThis.constructor === globalThis.Window ? "client" : globalThis.constructor === globalThis.ServiceWorkerGlobalScope ? "worker" : (
   Object.defineProperty(_, "$", { value: (f => x => f(x).toString().trim())(require("child_process").execSync) }),
   _.local = process.env.LOCAL ? true : false,
   require.main === module && (
    _.branch = _.$("git rev-parse --abbrev-ref HEAD").toString().trim(),
    _.gitSHA = _.$("git rev-parse HEAD").toString().trim(),
    _.version = (([M, m, p], c) => _.local ? +M && c === "major" ? `${++M}.0.0` : c === "minor" || (!+M && c === "major") ? `${M}.${++m}.0` : `${M}.${m}.${++p}` : `${M}.${m}.${p}`)(_.$("git log -1 --pretty=%s").toString().match(/^\s*(\d+\.\d+\.\d+)/)[1].split("."), _.change),
    _.modified = _.$('git show -s --format=%ci HEAD').toString().trim(),
    _.ETag = `"${_.version}.${_.gitSHA.slice(0, 7)}${_.local ? ("." + Math.random()).slice(2, 10) : ""}"`
   ),
   "server"
  ),
  production = _.branch === "main" && environment !== "server" && !_.local,
  welcomeMessage = `
     ▌ ▘     ▘▘ ${_.branch}
 k = ▙▘▌▛▘█▌ ▌▌ ${_.version}
     ▛▖▌▌ ▙▖ ▌▌ ${environment}
            ▙▌    `.slice(1)

 // Logging Functions
 const
  log = (verbosity, ...data) => logAny(verbosity, data, "log"),
  warn = (...data) => logAny(0, data, "warn"),
  debug = (...data) => logAny(0, data, "debug"),
  error = (...data) => logAny(0, data, "error"),
  logAny = (verbosity, data, method) => (["error", "warn"].includes(method) || !production) && verbosity <= _.verbosity && console[method](...(environment === "worker" ? ["worker:", ...data] : data)),
  logScope = (verbosity, label, callback) => {
   logAny(verbosity, [label], "groupCollapsed")
   const output = callback?.((...data) => logAny(verbosity, data, "log"))
   logAny(verbosity, [], "groupEnd")
   return output
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
  },
  logServerScope = (col1, col2, col3, callback) => {
   return logScope(0, `\n${("" + col1).padEnd(22, " ")} ${(environment === "server" ? Math.trunc(process.memoryUsage().rss / 1024 / 1024) + " MiB" : "--").padEnd(8, " ")} ${("" + col2).padStart(24, " ")} ${col3}`, log => callback((col1, col2, col3) => log(`${("" + col1).padEnd(20, " ")} ${(environment === "server" ? Math.trunc(process.memoryUsage().rss / 1024 / 1024) + " MiB" : "--").padEnd(8, " ")} ${("" + col2).padStart(24, " ")} ${col3}`)))
  }

 // String and Stringification Utilities
 const
  toBits = (x, unit = true) => (x = BigInt(x) - 1n, x ? x.toString(2).length : 0) + (unit ? " bit" + (x !== 1 ? "s" : "") : 0),
  toCharms = (x, unit = true) => encodeSegment(BigInt(x) - 1n).length + (unit ? " charm" + (x !== 1 ? "s" : "") : 0),
  camelCase = (words, delimiter = "-") => (typeof words === "string" ? words.split(delimiter) : words).map((word, i) => (i ? word[0].toUpperCase() + word.slice(1) : word)).join(""),
  serialize = value => JSON.stringify(value, (k, v) => (typeof v === "bigint" ? v.toString() + "n" : v), 1),
  scientific = (x, html = false) => { x = x.toString(10); const log10 = x.length - 1; x = Math.round((x[0] ?? 0) + (x[1] ?? 0) + (x[2] ?? 0) + (x[3] ?? "0") + "." + (x[4] ?? "0")).toString(); const factor = `${x.slice(0, 1)}.${x.slice(1)}`; return html ? `<math><mn>${factor}</mn><mo>&times;</mo><msup><mn>10</mn><mn>${log10}</mn></msup></math>` : `${factor} × 10` + [...log10.toString()].map(n => '⁰¹²³⁴⁵⁶⁷⁸⁹'[n]).join("") },
  btoaUnicode = string => btoa(new TextEncoder("utf-8").encode(string).reduce((data, byte) => data + String.fromCharCode(byte), "")),
  sanitizeAttr = string => string.replaceAll(/&/g, '&amp;').replaceAll(/"/g, '&quot;').replaceAll(/'/g, '&#39;').replaceAll(/</g, '&lt;').replaceAll(/>/g, '&gt;')

 // Random Number Generation
 const
  randomBits = bitCount => {
   const byteCount = Math.ceil(bitCount / 8)
   const bytes = new Uint8Array(byteCount)

   crypto.getRandomValues(bytes)

   let value = 0n

   for (const b of bytes)
    value = (value << 8n) | BigInt(b)

   const excessBits = BigInt(byteCount * 8 - bitCount)

   if (excessBits > 0)
    value >>= excessBits

   return value
  },
  randomRouteID = cardinality => {
   if (typeof cardinality !== "bigint" || cardinality < 0n)
    throw new RangeError("Random BigInt error: Cardinality must be a bigint greater than 0.")

   if (cardinality === 1n)
    return 0n

   const bitCount = toBits(cardinality, false)

   while (true) {
    const r = randomBits(bitCount)
    if (r < cardinality) return r
   }
  },
  flipCoin = (() => {
   let pool = 0
   let bitsLeft = 0
   return () => {
    if (bitsLeft === 0) {
     const b = new Uint8Array(1)
     crypto.getRandomValues(b)
     pool = b[0]
     bitsLeft = 8
    }
    const bit = pool & 1
    pool >>= 1
    bitsLeft--
    return bit === 1
   }
  })()

 // Path and Route Encoding Utilities
 const
  pathRadix = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_0",
  encodeSegment = routeID => {

   if (routeID < 0n)
    throw new RangeError("Segment encoder cannot encode a negative route ID.")

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
  decodeSegment = segment => {
   let charmRoundedBinaryString = "0b0"
   let charmLengthOffsetBinaryString = "0b0"

   for (const character of [...segment]) {
    const characterValue = pathRadix.indexOf(character)

    if (characterValue === -1 || characterValue >= 64)
     throw `Bad Hash Character: ${character}`

    charmRoundedBinaryString += characterValue.toString(2).padStart(6, 0)
    charmLengthOffsetBinaryString += "000001"
   }

   return BigInt(charmRoundedBinaryString) + BigInt(charmLengthOffsetBinaryString)
  },
  encodePathname = routeID => `/${_.version}/${encodeSegment(routeID)}/`,
  decodePathname = pathname => {
   if (!pathname.endsWith("/"))
    throw `Pathname missing trailing slash: ${pathname}`

   const segments = pathname.split("/")

   if (segments.length > 4)
    throw `Pathname has too many segments`
   else if (segments.length < 4)
    throw `Pathname has too few segments`

   return decodeSegment(segments[2])
  }

 logScope(1, `\n${welcomeMessage}`, log => {
  log(`

 ╭┈┈┈┈┈┈┈┈┈┈┈ BOOT BEGINNING ┈┈┈┈┈┈┈┈┈┈┈╮
 ┊ Now booting the Kireji Web Framework ┊
 ╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯

`)
  if (environment === "server" && require.main === module) {
   const stats = { fileCount: 0, domainCount: 0 }
   logScope(1, "Archiving Repository", log => {
    const
     { extname } = require("path"),
     { statSync: getItemStats, existsSync: itemExists, readdirSync: readFolder, readFileSync: readFile } = require("fs"),
     readRecursive = (host, folderPath, part) => {
      if (host && host.length > 253) throw SyntaxError(`requested host is ${host.length} characters long, exceeding the maximum domain name length of 253. \n${host}`)
      if (!itemExists(folderPath)) throw new ReferenceError("Can't pack nonexistent folder " + folderPath)
      const filenames = []
      for (const itemName of readFolder(folderPath)) {
       if (!host && itemName.startsWith(".")) continue
       const filePath = (host ? host.split(".").reverse().join("/") + "/" : "") + itemName
       if (itemExists(filePath)) {
        try {
         if (filePath !== "build.js" && !itemName.endsWith(".ts") && !_.$(`git check-ignore -v ${filePath}`).includes(".gitignore:")) throw "Don't ignore."
         log(`❌ ${itemName.padEnd(20, " ")} - ignored`)
        } catch {
         const itemStats = getItemStats(filePath)
         if (itemStats.isDirectory())
          logScope(2, `📦 ${itemName}/`, () => {
           readRecursive(host ? (itemName ? itemName + "." + host : host) : itemName ?? "", filePath, (part[itemName] = {}))
          })
         else if (itemStats.isFile()) filenames.push([itemName, filePath])
        }
       }
      }
      for (const [filename, filePath] of filenames) {
       const extension = extname(filePath)
       const content = readFile(filePath, [".png", ".gif"].includes(extension) ? "base64" : "utf-8")
       log(`📄 ${filename}`)
       part[filename] = content
       stats.fileCount++
      }
      stats.domainCount++
     }

    readRecursive("", "./", _)
   })

   logScope(2, "\nLogging Domain Stats", () => {
    logAny(2, [{
     Parts: { Amount: stats.domainCount },
     Files: { Amount: stats.fileCount },
    }], "table")
   })
  }
  logScope(3, "\nRecursively Hydrating Parts", () => {
   const
    instances = [],
    allParts = [],
    imageSources = [],
    earlyImageSources = [],
    partsByHost = {},
    preHydrationArchive = serialize(_),
    hydrateRecursive = (part, domains = []) => {

     let host

     if (typeof part === "string") {
      host = part
      domains = host.split(".")
      part = domains.reduceRight((currentFolder, name, index) => {
       if (!currentFolder[name])
        throw new ReferenceError(`There is no part called '${name}' in ${[...domains].slice(index + 1).reverse().join("/") || "the ecosystem"} (trying to create ${domains.join(".")}).`)
       return currentFolder[name]
      }, _)
     } else {
      host = domains.join(".")
     }

     if (part.host)
      return part

     logScope(2, `"${host}"`, () => {
      partsByHost[host] = part
      const subdomains = Object.keys(part).filter(n => typeof part[n] === "object")
      const pathToRepo = new Array(domains.length).fill("..").join("/")
      const pathFromRepo = [...domains].reverse().join("/")
      Object.defineProperties(part, {
       key: { value: domains[0] },
       host: { value: host },
       domains: { value: domains },
       manifest: { value: JSON.parse(part["part.json"] ?? "{}") },
       subparts: { value: [] },
       filenames: { value: Object.keys(part).filter(n => typeof part[n] === "string") },
       inheritors: { value: [] },
       subdomains: { value: subdomains },
      })
      let prototype = null
      if (host === "part.abstract.parts") {
       Object.defineProperty(part, "define", { value(descriptor) { return Object.defineProperties(this, descriptor) } })
       part.define({ isAbstract: { value: part.manifest.abstract } })
      } else {
       const extendsString = part.manifest.extends ?? "part"
       const relativeStepsBack = extendsString.match(/\.*$/)[0].length
       const typename = relativeStepsBack ? `${extendsString.slice(0, -relativeStepsBack)}.${domains.slice(relativeStepsBack - 1).join(".")}` : extendsString.includes(".") ? extendsString : `${extendsString}.abstract.parts`
       prototype = hydrateRecursive(typename)
       Object.setPrototypeOf(part, prototype)
       part.define({
        isAbstract: { value: part.manifest.abstract }
       })
       Object.setPrototypeOf(part.manifest, prototype.manifest)
       prototype.inheritors.push(part)
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

        if (!part.filenames.includes("constants.js")) return
        const pathPrefix = targetPart.pathToRepo + "/" + pathFromRepo + "/"
        const path = pathPrefix + "constants.js"
        const body = part["constants.js"]
        const lines = body.split("\n")
        for (let ln = 0; ln < lines.length; ln++) {
         if (lines[ln].startsWith("const "))
          new targetProperty.MethodConstant(path, lines[ln], ln)
        }
       }
       constructor(PROPERTY_ID) {
        const property = Property[PROPERTY_ID] = this
        property.id = PROPERTY_ID
        property.isAlias = PROPERTY_ID.startsWith("@")
        property.isView = PROPERTY_ID.startsWith("view-")
        property.isAsync = PROPERTY_ID.startsWith("async-")
        property.isSymbol = PROPERTY_ID.startsWith("symbol-")
        property.isGenerated = PROPERTY_ID.endsWith("*")
        property.filename = property.isAlias ? PROPERTY_ID.slice(1) : `${PROPERTY_ID}.js`
        property.content = Object.getOwnPropertyDescriptor(part, property.filename)?.value
        property.niceName = (() => {
         if (PROPERTY_ID.includes("-") || property.isGenerated) {

          if (property.isGenerated && (PROPERTY_ID.includes("."))) {
           property.key = PROPERTY_ID.slice(0, -1)
           return `["${property.key}"]`
          }

          if (property.isSymbol) {
           const symbolName = PROPERTY_ID.slice(7)
           property.key = Symbol[symbolName]
           return `[Symbol.${symbolName}]`
          }

          // First word of kebab-case property name becomes last word of camelCase identifier.
          const words = PROPERTY_ID.slice(property.isAlias ? 1 : 0, property.isGenerated ? -1 : undefined).split("-")
          words.push(words.shift())
          return property.key = camelCase(words)
         }
         property.key = PROPERTY_ID
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
        const args = part.manifest[PROPERTY_ID];
        const errorIndex = args?.findIndex(arg => !arg || typeof arg !== "string") ?? -1
        if (errorIndex !== -1)
         throw `Invalid method argument\n\t_.${[...domains].reverse().join(".")}.manifest["${PROPERTY_ID}"][${errorIndex}]\n\tAll arguments must be non-empty strings.`
        property.argumentString = "(" + (args?.join(", ") ?? (PROPERTY_ID.startsWith("set-") ? "VALUE" : "")) + ")"
        property.modifiers = property.isAsync ? "async " : (property.isGenerated || property.isAlias ? "get " : "")
        property.signature = "\n\n " + property.propertyReference + `: {\n  ${(property.isGenerated || property.isAlias) ? property.modifiers : ((property.isAsync ? property.modifiers : "") + "value")}${property.argumentString} {`
        sourceFile.addSection(`@method-open@${property.signature}`, buildSource)
        Property.collectConstants(part, property)
        if (property.isAlias) sourceFile.addLine(`return this["${PROPERTY_ID.slice(1)}"]`, buildSource, null, null, "    ")
        else sourceFile.addLines(property.lines, property.source, 0, 0, "   ")
        sourceFile.addLine(`@method-close@ }\n },`, buildSource, null, null, " ")
       }
      }
      part.define({
       Property: { value: Property },
       prototype: { value: Object.getPrototypeOf(part) }
      })
      for (const fn of part.filenames) {
       if (!fn.includes(".") && fn.includes("-")) {
        Property.ids.add("@" + fn)
       } else if (fn.endsWith("*.js") || fn.endsWith(".js") && (fn.startsWith("set-") || fn.startsWith("view-"))) {
        Property.ids.add(fn.slice(0, -3))

        if (fn.endsWith(".png*.js") || fn.endsWith(".gif*.js")) {
         if (fn.startsWith("early-"))
          earlyImageSources.push([part, fn.slice(6, -4)])
         imageSources.push([part, fn.slice(0, -4)])
        }
       } else if (fn.endsWith(".png") || fn.endsWith(".gif")) {
        if (fn.startsWith("early-"))
         earlyImageSources.push([part, fn.slice(6)])
        imageSources.push([part, fn])
       }
      }
      for (const methodID in part.manifest)
       if (!["extends", "abstract"].includes(methodID))
        Property.ids.add(methodID)

      sourceFile.addSection(`@descriptor-map-open@({\n //  ${host}${!prototype ? "" : ` instanceof ${prototype.host}`}\n`, buildSource)
      for (const id of Property.ids) new Property(id)
      sourceFile.addLine("@descriptor-map-close@})", buildSource)
      const propertyDescriptorScript = sourceFile.packAndMap()
      try {
       const propertyDescriptor = eval(propertyDescriptorScript)
       part.define(propertyDescriptor)
      } catch (evalError) {
       throw new Error(`Failed to construct property descriptor for ${host}.\n${evalError}\n${propertyDescriptorScript}`)
      }
      for (const subdomain of subdomains) {

       const childPart = part[subdomain]

       if (subdomain.includes("-")) {
        const identifier = camelCase(subdomain)

        if (identifier in part)
         throw `Computed camelCase name ${identifier} for ${subdomain}.${host} conflicts with existing property ${identifier} on ${host}.`

        part.define({ [identifier]: { value: childPart } })
       }

       hydrateRecursive(childPart, [subdomain, ...domains])

       childPart.define({ "..": { value: part } })

       if (!childPart.isAbstract)
        part.subparts.push(childPart)
      }
      if (!part.isAbstract) instances.push(part)
      allParts.push(part)
     })

     return part
    },
    countAndSortInheritorsRecursive = part => {
     if (part.totalInheritors !== undefined)
      return part.totalInheritors
     let totalInheritors = 0
     for (const inheritor of part.inheritors)
      totalInheritors += 1 + countAndSortInheritorsRecursive(inheritor)
     part.define({ totalInheritors: { value: totalInheritors } })

     if (part.inheritors.length > 1)
      part.inheritors.sort((a, b) => (b.totalInheritors - a.totalInheritors) || (a.host > b.host ? 1 : -1))

     return totalInheritors
    }

   hydrateRecursive(_)
   countAndSortInheritorsRecursive(_.parts.abstract.part)

   _.define({ "..": { value: null } })

   logScope(1, "\nRegistering Applications", () => {

    // Applications must be registered before build in order for the list to be available at each part's build-time.

    _.define({
     application: { value: null, writable: true },
     applications: { value: {} },
     menuApplications: { value: {} },
    })

    for (const part of instances) {
     logScope(1, `${part.host}`, log => {

      if (_.parts.abstract.application.isPrototypeOf(part)) {

       _.applications[part.host] = part

       if (part.appearOnMenu) {
        log("Added to menu.")
        _.menuApplications[part.host] = part
       }
      }
     })
    }

    _.defaultApplicationHost ??= Object.keys(_.menuApplications)[0]
   })

   logScope(3, "\nBuilding Part Instances", () => {
    for (const part of instances)
     part.startBuild()
   })

   logScope(1, "\nLogging Part Entropy", () => {
    logEntropy(1, ...instances)
   })

   logScope(1, "\nInstalling Facets", () => {
    const gate = Promise.withResolvers()
    const promiseArray = []
    for (const subpart of _.parts.core)
     if (subpart.prototype.host === "facet.abstract.parts") {
      subpart.install(gate)
      promiseArray.push(subpart.promise)
     }
    gate.resolve(promiseArray)
   })
  })
  logScope(3, "\nComputing Landing Hash & Route ID", log => {

   const landingModel = JSON.parse(_["landing-model.json"])
   const landingRouteID = _.modelToRouteID(landingModel)
   const landingHash = encodeSegment(landingRouteID)

   _.define({
    landingHash: { value: landingHash },
    landingModel: { value: landingModel },
    landingRouteID: { value: landingRouteID },
   })

   log("Landing hash: " + _.landingHash)
  })
  logScope(1, "\nValidating Build", () => {
   _.validate()
  })
  log(`

 ╭┈┈┈┈┈┈┈┈┈┈┈ BOOT SUCCEEDED ┈┈┈┈┈┈┈┈┈┈┈╮
 ┊ End of synchronous script execution. ┊
 ╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯

`)
 })
}

ƒ({
 verbosity: 100,
 // TODO: Fix source mapping bugs.
 mapping: false,
 change: "major",
 hangHydration: 0,
 haltHydration: false,
 defaultApplicationHost: "desktop.parts",
})