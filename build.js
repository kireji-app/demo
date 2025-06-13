function boot(root) {
 const environment = globalThis.constructor === globalThis.Window ? "window" : globalThis.constructor === globalThis.ServiceWorkerGlobalScope ? "worker" : process?.argv[1]?.split("/").pop() === "build.js" ? "build" : "server"
 const conditionalLog = (verbosity, data, method) => !production && verbosity <= root.verbosity && console[method](...(environment === "worker" ? ["worker:", ...data] : data))
 const log = (verbosity, ...data) => conditionalLog(verbosity, data, "log")
 const warn = (...data) => conditionalLog(0, data, "warn")
 const debug = (...data) => conditionalLog(0, data, "debug")
 const openLog = (verbosity, ...data) => conditionalLog(verbosity, data, "group")
 const closeLog = verbosity => { log(verbosity, ""); conditionalLog(verbosity, [], "groupEnd") }
 const logMeasure = (verbosity, measure, unit, columnWidth = 0) => {
  if (!["bigint", "number"].includes(typeof measure))
   throw new TypeError(`Logging a measure requires a bigint or number (got ${typeof measure}.`)
  let measureIntegerString, measureString
  const isBigInt = typeof measure === "bigint"
  const measureInteger = isBigInt ? measure : Math.trunc(measure)
  if (isBigInt || measureInteger === measure) {
   measureIntegerString = measureString = measureInteger.toLocaleString()
  } else {
   measureIntegerString = measureInteger.toLocaleString().split(".")[0]
   measureString = measureIntegerString + "." + (measure - measureInteger).toString().slice(2)
  }
  if (measureIntegerString.length > columnWidth) throw new RangeError(`Cannot fit ${measureIntegerString.length} characters into a ${columnWidth}-character column (while logging measure "${measureString} ${unit}").`)
  if (measureString.length > columnWidth) measureString = measureString.slice(0, columnWidth)
  else if (measureString.includes(".")) measureString = measureString.padEnd(columnWidth, "0")
  else measureString = measureString.padStart(columnWidth, " ")
  log(verbosity, "| " + measureString + " " + unit + " |")
 }
 const btoaUnicode = string => btoa(new TextEncoder("utf-8").encode(string).reduce((data, byte) => data + String.fromCharCode(byte), ""))
 const serialize = value => JSON.stringify(value, (k, v) => (typeof v === "bigint" ? v.toString() + "n" : v), 1)
 const hang = timeInMilliseconds => {
  warn(`Intentionally hanging the main thread for ${timeInMilliseconds} milliseconds.`)
  const start = performance.now()
  let iteration = -1, elapsedMilliseconds, remainingMilliseconds
  do {
   elapsedMilliseconds = Math.trunc(performance.now() - start)
   const newRemainingMilliseconds = timeInMilliseconds - elapsedMilliseconds
   Math.sin(iteration++)
   if (Math.trunc(newRemainingMilliseconds / 100) !== Math.trunc(remainingMilliseconds / 100)) log(0, "t: -" + newRemainingMilliseconds)
   remainingMilliseconds = newRemainingMilliseconds
  } while (remainingMilliseconds > 0)
  warn(`Main thread hang finished at iteration ${iteration}.`)
 }
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
   if (production) return
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
   if (production) return
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
   return root.mapping === "1"
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
 // TODO: Include the file name request as part of the routing by making it part of the desktop state integer. Each origin has a known finite file list, making full file names extremely inefficient.
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

 class Route {
  static maxPathLength = 2000
  static maxSegmentLength = 250
  static defaultFilename = 'index.html'
  static pathSegmentRadix = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_0'
  static segmentToRouteID(segment) {
   let binaryValue = "0b0"
   let binaryOffset = "0b0"

   for (const character of segment) {
    const index = Route.pathSegmentRadix.indexOf(character)
    if (index === -1 || index >= 64) {
     warn("Route Error: ignoring unused segment (segments cannot include '" + character + "'). (" + segment + ")")
     binaryValue = "0b0"
     binaryOffset = "0b0"
     break;
    }
    binaryValue += index.toString(2).padStart(6, 0)
    binaryOffset += "000001"
   }
   return BigInt(binaryValue) + BigInt(binaryOffset) - 1n
  }
  static segmentFromRouteID(routeID) {
   routeID++

   let binaryValue = ""
   let segment = ""
   let tempRoute = routeID
   let chunkCount = 0n

   while (tempRoute > 0n) {
    const chunkAddend = 2n ** (chunkCount * 6n)
    if (tempRoute >= chunkAddend) {
     tempRoute -= chunkAddend
     chunkCount++
    } else {
     break
    }
   }

   let offset = 0n
   for (let i = 0n; i < chunkCount; i++)
    offset += 2n ** (i * 6n)

   binaryValue = (routeID - offset).toString(2)

   const finalLength = Number(chunkCount) * 6
   const paddedBinaryString = binaryValue.padStart(finalLength, '0')

   for (let i = 0; i < finalLength; i += 6) {
    const hexad = paddedBinaryString.slice(i, i + 6)
    segment += Route.pathSegmentRadix[parseInt(hexad, 2)]
   }

   return segment
  }

  #filename
  #segments
  #routeIDs
  #path
  #mark
  #header
  #url
  #desktopRouteID
  #taskRouteIDs

  constructor(url = `https://${root.defaultHost}/${Route.defaultDesktopSegment}`, base) {
   this.#url = new URL(url, base)
   if (!(this.#url.host in root.parts.user.themes)) {
    this.#url.port &&= ''
    this.#url.host = root.defaultHost
   }
   this.pathname = this.#url.pathname
  }

  get header() { return this.#header }

  get protocol() { return this.#url.protocol }
  set protocol(value) { this.#url.protocol = value }

  get username() { return this.#url.username }
  set username(value) { this.#url.username = value }

  get password() { return this.#url.password }
  set password(value) { this.#url.password = value }

  get hostname() { return this.#url.hostname }

  set hostname(value) {
   if (!(value in root.parts.user.themes))
    value = root.defaultHost
   this.#url.hostname = value
  }

  get host() { return this.#url.host }
  set host(value) {
   if (!(value in root.parts.user.themes))
    value = root.defaultHost
   this.#url.host = value
  }

  get origin() { return this.#url.origin }

  get pathname() { return this.#url.pathname }
  set pathname(pathname) {
   this.#path = String(pathname) || '/'
   this.#filename = ''
   this.#mark = ''
   if (this.#path.endsWith('!')) {
    const lastSlashIndex = this.#path.lastIndexOf('/')
    const filenameSegment = this.#path.substring(lastSlashIndex + 1, this.#path.length - 1)
    if (filenameSegment && filenameSegment !== Route.defaultFilename) {

     if (!/^[A-Za-z0-9_.-]+$/.test(filenameSegment))
      throw new TypeError("Route Error: filename contained invalid characters. " + filenameSegment)

     this.#filename = filenameSegment
     this.#mark = '!'
    }
    this.#path = this.#path.substring(0, lastSlashIndex + 1)
   }
   this.#routeIDs = []
   this.#segments = this.#path.split('/').filter(segment => {
    if (!segment)
     return

    const routeID = Route.segmentToRouteID(segment)

    if (routeID === -1n)
     return

    this.#routeIDs.push(routeID)
    return true
   })
   if (!this.#segments.length || this.#routeIDs[0] >= root.parts.desktop.cardinality) {
    this.#routeIDs[0] = BigInt(root.defaultDesktopRouteID)
    this.#segments[0] = Route.defaultDesktopSegment
    warn(new RangeError('Encountered out-of-range desktop routeID while setting pathname of Route.'), { route: this, pathname })
   }
   this.#path = `/${this.#segments.join("/")}${this.#segments.length ? "/" : ""}`
   this.#header = new FileHeader(this.#filename || Route.defaultFilename)
   this.#url.pathname = `${this.#path}${this.#filename}${this.#mark}`
   this.#taskRouteIDs = [...this.#routeIDs]
   this.#desktopRouteID = this.#taskRouteIDs.shift()
  }

  get filename() { return this.#filename || Route.defaultFilename }
  set filename(value) { this.pathname = `${this.#path}${value}!` }

  get desktopRouteID() { return this.#desktopRouteID }
  get taskRouteIDs() { return this.#taskRouteIDs }

  get extension() { return this.#header.extension }
  get filetype() { return this.#header.filetype }
  get binary() { return this.#header.binary }

  get segments() { return [...this.#segments] }
  set segments(segments) { this.pathname = `/${segments.join("/")}${segments.length ? "/" : ""}${this.#filename}${this.#mark}` }

  get routeIDs() { return [...this.#routeIDs] }
  set routeIDs(newRouteIDs) { this.segments = newRouteIDs.map(routeID => Route.segmentFromRouteID(routeID)) }

  get path() { return this.#path }
  set path(path) { this.pathname = `${path}${this.#filename}${this.#mark}` }

  get search() { return this.#url.search }
  set search(value) { this.#url.search = value }

  get searchParams() { return this.#url.searchParams }

  get hash() { return this.#url.hash }
  set hash(value) { this.#url.hash = value }

  get href() { return this.#url.href }
  set href(value) { this.#url.href = value }

  toJSON() { return this.#url.toJSON() }
  toString() { return this.#url.toString() }
 }

 Route.defaultDesktopSegment ??= Route.segmentFromRouteID(BigInt(root.defaultDesktopRouteID))
 Route.maxSegmentCardinality ??= (64n ** 251n - 64n) / 63n

 function hydrate() {

  Object.defineProperties(root, {
   fps: { value: 1, configurable: true, writable: true },
   meanFrameTime: { value: 1000, configurable: true, writable: true },
  })

  function getPartFromDomains(domains) {
   return domains.reduceRight((currentFolder, name, index) => {

    if (!currentFolder[name])
     throw new ReferenceError(`There is no folder called '${name}' in ${[...domains].slice(index + 1).reverse().join("/")} (trying to create ${domains.join(".")}).`)

    return currentFolder[name]
   }, root)
  }

  openLog(3, "Recursive Domain Hydration")
  function recursiveDistributeHydration(part = root, domains = []) {
   let host
   if (typeof part === "string") {
    if (domains.length) throw 'unexpected domains'
    host = part
    domains = host.split(".")
    part = getPartFromDomains(domains)
   } else host = domains.join(".")

   if (part.host)
    return part

   openLog(2, `\x1b[38;5;27m"\x1b[38;5;75m${host}\x1b[38;5;27m"\x1b[0m`)

   const subdomains = Object.keys(part).filter(n => typeof part[n] === "object")
   const filenames = Object.keys(part).filter(n => typeof part[n] === "string")
   const pathToRepo = new Array(domains.length).fill("..").join("/")
   const pathFromRepo = [...domains].reverse().join("/")
   Object.defineProperties(part, {
    manifest: { value: JSON.parse(part["part.json"] ?? "{}"), configurable: true, writable: true },
    host: { value: host },
    subdomains: { value: subdomains },
    filenames: { value: filenames },
    length: { value: subdomains.length },
    domains: { value: domains }
   })
   const typename = part.manifest.typename ?? (host !== "part.core.parts" ? "part.core.parts" : null)
   const prototype = typename ? recursiveDistributeHydration(typename ?? "part.core.parts") : null
   if (prototype) {
    Object.setPrototypeOf(part.manifest, prototype.manifest)
    Object.setPrototypeOf(part, prototype)
    Object.defineProperty(part, "prototype", { value: prototype })
   }
   const sourceFile = new SourceMappedFile(pathFromRepo, pathToRepo, "compiled-part.js")
   const buildSource = sourceFile.addSource(pathToRepo + "/build.js", boot.toString())

   class Property {
    static identifierPattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/
    static ids = new Set()
    // static addConstants(targetFile) {
    //  const filename = "const-class.js"
    //  const pathPrefix = targetFile === sourceFile ? "" : targetFile.pathToRepo + "/" + pathFromRepo + "/"
    //  const path = pathPrefix + filename
    //  const body = part[filename]
    //  if (body) targetFile.addSection(body, targetFile.addSource(path, body), 0, 0, " ")
    // }
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
     property.filename = `${PROPERTY_ID}.js`
     property.content = part[property.filename]
     property.isAlias = PROPERTY_ID.startsWith("alias-")
     property.isView = PROPERTY_ID.startsWith("view-")
     property.isAsync = PROPERTY_ID.startsWith("async-")
     property.isSymbol = PROPERTY_ID.startsWith("symbol-")
     property.isGetOrSet = PROPERTY_ID.startsWith("get-") || PROPERTY_ID.startsWith("set-")
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
     if (property.isAlias) {
      sourceFile.addLine(`return this["${PROPERTY_ID.slice(6)}"]`, buildSource, null, null, "    ")
     } else {
      if (!prototype) sourceFile.addLines(property.lines, property.source, 0, 0, "   ")
      else {
       let hasSuper = false
       property.lines.forEach((methodLine, ln) => {
        const firstMatch = [...methodLine.matchAll(/(?<=[^\w]|^)super\s*\(/g)][0]
        if (firstMatch) {
         hasSuper = true
         methodLine = methodLine.slice(0, firstMatch.index) + `super${property.propertyAccessor}(` + methodLine.slice(firstMatch.index + firstMatch[0].length)
         sourceFile.addLine(methodLine, property.source, ln, 0, "   ", false)
        } else sourceFile.addLine(methodLine, property.source, ln, 0, "   ")
       })
      }
     }
     sourceFile.addLine(`@method-close@ }\n },`, buildSource, null, null, " ")
    }
   }

   Object.defineProperties(part, {
    Property: { value: Property, configurable: true, writable: true }
   })

   for (const fn of filenames) {
    if (!fn.includes(".") && fn.includes("-")) {
     Property.ids.add("alias-" + fn)
    } else if (fn.endsWith(".js") && (fn.startsWith("get-") || fn.startsWith("set-") || fn.startsWith("view-")))
     Property.ids.add(fn.slice(0, -3))
   }

   for (const methodID in part.manifest)
    if (!["cardinality", "typename"].includes(methodID))
     Property.ids.add(methodID)

   sourceFile.part = part
   sourceFile.addSection(`@descriptor-map-open@({\n //  ${host}${!prototype ? "" : ` instanceof ${prototype.host}`}\n`, buildSource)
   for (const id of Property.ids) new Property(id)
   sourceFile.addLine("@descriptor-map-close@})", buildSource)
   const propertyDescriptorScript = sourceFile.packAndMap()
   const propertyDescriptor = eval(propertyDescriptorScript)
   Object.defineProperties(part, propertyDescriptor)
   Object.defineProperties(part, {
    enabled: { value: false, configurable: true, writable: true },
    wasEnabled: { value: false, configurable: true, writable: true },
    justDisabled: { value: false, configurable: true, writable: true },
    justEnabled: { value: false, configurable: true, writable: true },
    routeID: { value: -1n, configurable: true, writable: true },
    previousRouteID: { value: -1n, configurable: true, writable: true },
    deltaRouteID: { value: 0n, configurable: true, writable: true },
    cardinality: { value: BigInt(part.manifest.cardinality), configurable: true, writable: true }
   })

   subdomains.forEach((subdomain, index) => {
    const subpart = part[subdomain]

    Object.defineProperties(subpart, {
     index: { value: index, configurable: true, writable: true },
     "..": { value: part, configurable: true, writable: true },
    })

    recursiveDistributeHydration(subpart, [subdomain, ...domains])

    Object.defineProperties(part, {
     cardinality: {
      value: part.count(part.cardinality, subpart, index, subdomains),
      configurable: true, writable: true
     },
     [index]: { value: subpart, configurable: true, writable: true }
    })

    if (typeof part.cardinality !== "bigint")
     throw new Error("part.count() returned invalid cardinality. " + part.host)

   })

   log(5, "Building...")

   if (part !== root) // The root is already the one building.
    part.build()


   if (typeof part.cardinality !== "bigint")
    throw new Error(`Part hydration ended with invalid cardinality: ${part.cardinality} (${host}).`)

   log(5, "Build succeeded.")

   if (!part[".."]) { // The part was first hydrated as a prototype, not a subdomain.
    const parentDomains = [...domains]
    const subdomain = parentDomains.shift()
    const parent = part === root ? null : getPartFromDomains(parentDomains)
    Object.defineProperty(part, "..", { value: parent, configurable: true, writable: true })
    if (part !== root)
     Object.defineProperty(part, "index", {
      value: (
       part[".."].subdomains ?? Object.keys(part[".."]).filter(n => typeof part[n] === "object")
      ).indexOf(subdomain),
      configurable: true, writable: true
     })
   }

   closeLog(2)

   return part
  }

  recursiveDistributeHydration()

  log(1, "Part hydration complete.")
  closeLog(3)

  root.parts.user.modules.install()
 }

 let production = false
 if (environment === "build") {
  const { extname } = require("path"),
   { statSync: getItemStats, existsSync: itemExists, readdirSync: readFolder, readFileSync: readFile, writeFileSync: writeFile, mkdirSync: makeFolder } = require("fs"),
   { execSync: $ } = require("child_process")
  // TODO: Instead of importing root files separately, modify the readRecursive call to include the DNS root.
  const initialFilenames = [".gitignore", "jsconfig.json", "get-path-instance.js", "README.md", "vercel.json", "type.d.ts", "part.json", "build.js"]
  for (const fn of initialFilenames) root[fn] = readFile(fn, "utf-8")
  root.local = !process.env.VERCEL || !!process.env.__VERCEL_DEV_RUNNING
  root.size = 0
  const readmeVersionPattern = /version-(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)/
  const semver = root["README.md"].match(readmeVersionPattern).groups
  if (root.local) {
   root.branch = $("git branch --show-current").toString().trim()
   root.hash = $("git rev-parse HEAD").toString().trim()
   production = false
   if (semver.major && root.change === "major") {
    semver.major++
    semver.minor = 0
    semver.patch = 0
   } else if (root.change === "minor" || (!semver.major && root.change === "major")) {
    semver.major = parseInt(semver.major)
    semver.minor++
    semver.patch = 0
   } else {
    semver.major = parseInt(semver.major)
    semver.minor = parseInt(semver.minor)
    semver.patch++
   }
   root.version = [semver.major, semver.minor, semver.patch].join(".")
   root["README.md"] = root["README.md"].replace(readmeVersionPattern, `version-${root.version}`)
  } else {
   root.branch = process.env.VERCEL_GIT_COMMIT_REF
   root.hash = process.env.VERCEL_GIT_COMMIT_SHA
   production = root.branch === "main"
  }
  // Conditional logging is only functional after this point.
  openLog(0, `Build Notes - ${root.local ? "local" : "cloud"}/${root.branch} ${root.version}`)
  try {
   throw "we always perform a full build during a refactor."
   // Try to use git diff to patch the existing repository.
   if (production) throw "the production environment should always build from scratch."
   if (!itemExists("api/service.js")) throw "there was no existing build file."
   log(0, "Patching existing build.")
   warn("The patch system does not detect files which were changed in the working tree during the previous build and then reverted prior to the current build.")
   const existingBuild = readFile("api/service.js", "utf-8")
   const openMark = "\nboot" + "("
   const openIndex = existingBuild.indexOf(openMark) + openMark.length
   if (openIndex < openMark.length) throw " the existing build wasn't populated correctly."
   const closeMark = ")"
   const closeIndex = existingBuild.lastIndexOf(closeMark)
   const existingRoot = JSON.parse(existingBuild.slice(openIndex, closeIndex))
   const { hash, com, parts } = existingRoot
   log(1, "Staging the intent to add all untracked files.")
   $(`git add --intent-to-add .`)
   for (const diffResult of $(`git diff --name-status ${hash} -- com/ parts/`).toString().trim().split("\n")) {
    if (!diffResult) continue
    const [fileStatus, leftPath, rightPath] = diffResult.split(/\s+/)
    const leftExtension = extname(leftPath)
    const leftPathSegments = leftPath.split("/")
    const leftFilename = leftPathSegments.pop()
    let leftRoot = existingRoot
    let rightRoot = null
    let rightFilename = null
    let rightExtension = null
    for (const pathPart of leftPathSegments) leftRoot = leftRoot[pathPart] ??= {}
    if (rightPath) {
     rightRoot = existingRoot
     rightExtension = extname(rightPath)
     const rightPathSegments = rightPath.split("/")
     rightFilename = rightPathSegments.pop()
     for (const pathPart of rightPathSegments) rightRoot = rightRoot[pathPart] ??= {}
    }
    switch (fileStatus[0]) {
     case "A":
      leftRoot[leftFilename] = readFile(leftPath, [".png", ".gif"].includes(leftExtension) ? "base64" : "utf-8")
      log(2, `\x1b[38;5;34m/\x1b[38;5;82m${leftPath}\x1b[38;5;34m - added \x1b[0m`)
      break
     case "M":
      leftRoot[leftFilename] = readFile(leftPath, [".png", ".gif"].includes(leftExtension) ? "base64" : "utf-8")
      log(2, `\x1b[38;5;100m/\x1b[38;5;226m${leftPath}\x1b[38;5;100m - modified \x1b[0m`)
      break
     case "D":
      delete leftRoot[leftFilename]
      log(2, `\x1b[38;5;88m/\x1b[38;5;196m${leftPath}\x1b[38;5;88m - deleted \x1b[0m`)
      break
     case "C":
     case "R":
      delete leftRoot[leftFilename]
      rightRoot[rightFilename] = readFile(rightPath, [".png", ".gif"].includes(rightExtension) ? "base64" : "utf-8")
      log(2, `\x1b[38;5;54m/\x1b[38;5;129m${rightPath}\x1b[38;5;54m -${diffResult[0] === "C" ? "copied" : "renamed"} \x1b[0m`)
      break
     default:
      throw "the build process encountered an unsupported git file status, '" + fileStatus + "'."
    }
   }
   root.com = com
   root.parts = parts
  } catch (reason) {
   // Pack the repository from scratch.
   log(0, "This build was made from scratch because " + reason)

   openLog(1, "Initializing git configuration.")
   log(3, `This process configures the git repository to hide output file(s) during local development. It is idempotent.`)
   const commands = ["git update-index --assume-unchanged api/service.js"]
   commands.forEach(command => {
    log(2, `Executing the following command: \`${command}\``)
    $(command)
    log(2, "Command succeeded.")
   })
   closeLog(1)

   openLog(1, "Recursive Packing")
   log(2, "This recursive process makes the project portable by packing a shallow clone of the git repository into a valid ECMA-262 file.")
   let fileCount = initialFilenames.length, domainCount = 1
   function readRecursive(host, folderPath, part) {
    if (host && host.length > 253) throw SyntaxError(`requested host is ${host.length} characters long, exceeding the maximum domain name length of 253. \n${host}`)
    if (!itemExists(folderPath)) throw new ReferenceError("Can't pack nonexistent folder " + folderPath)
    const filenames = []
    for (const itemName of readFolder(folderPath)) {
     const folderPath = host ? host.split(".").reverse().join("/") : "",
      filePath = folderPath + "/" + itemName
     if (itemExists(filePath)) {
      const stats = getItemStats(filePath)
      if (stats.isDirectory()) {
       openLog(2, `\x1b[38;5;27m/\x1b[38;5;75m${itemName}\x1b[38;5;27m\x1b[0m`)
       readRecursive(host ? (itemName ? itemName + "." + host : host) : itemName ?? "", filePath, (part[itemName] = {}))
       closeLog(2)
      } else if (stats.isFile()) filenames.push([itemName, filePath])
     }
    }
    for (const [filename, filePath] of filenames) {
     const extension = extname(filePath)
     try {
      if (!$(`git check-ignore -v ${filePath}`).includes(".gitignore:")) throw "Don't ignore."
      log(2, `\x1b[38;5;27m/\x1b[38;5;239m${filename} ignored\x1b[0m`)
     } catch {
      const content = readFile(filePath, [".png", ".gif"].includes(extension) ? "base64" : "utf-8")
      log(2, `\x1b[38;5;28m/\x1b[38;5;76m${filename}\x1b[38;5;28m"\x1b[0m`)
      part[filename] = content
      fileCount++
     }
    }
    domainCount++
   }
   const TLDs = ["com", "parts"]
   TLDs.forEach(tld => readRecursive(tld, tld, root[tld] = {}))
   log(2, `The process succeeded. It packed ${fileCount} files across ${domainCount} domains (including the dns-root and ${TLDs.length} top-level domains).`)
   closeLog(1)
  }
  /*
   // Conceptual:
   const { resolveTxt } = require('dns')
   const txt = host => new Promise(give => resolveTxt(host, (e, TXT) => e ? (warn(e), process.exit(21)) : give(TXT)))
   const targetHost = "www.core.parts"
   txt(targetHost).then(TXT => {
    for (const txt of TXT) {
     if (txt[0].startsWith("part://")) {
      const
       { host: host, searchParams, hash } = new URL(txt.join("")),
       payload = { [targetHost + "/.host"]: host }
      if (searchParams.has("$1") || searchParams.has("$2")) {
       payload[targetHost + "/constructor.js"] = `super(${atob(searchParams.get("$1") ?? "")})\n${atob(searchParams.get("$2") ?? "")}`
      }
      warn(payload)
      break
     }
    }
    process.exit(21)
   })
  */
  hydrate()
  if (!itemExists("api")) makeFolder("api")
  const outputPath = "api/service.js"

  log(2, `Outputting the project README.md which has been modified to reflect the correct version number.\n`)
  writeFile("README.md", root["README.md"])

  log(2, `Outputting the ECMA-262 repository to ${outputPath}.\n`)

  openLog(1, "Computing Size Statistics.\n")
  log(3, "The size is initially missing from the output file\n  because the file size is determined after the file is saved.\n\nAdditional write operations allow us to quickly converge\n  on a correct measurement of the file's size,\n  including the size of the measurement itself.\n")
  writeFile(outputPath, root.parts.user["service.js"])
  root.size = getItemStats("api/service.js").size
  writeFile("api/service.js", root.parts.user["service.js"])
  root.size = getItemStats("api/service.js").size
  const finalBody = root.parts.user["service.js"]
  writeFile("api/service.js", finalBody)

  const bits = Math.ceil(root.size * 8)
  const col1Width = bits.toLocaleString().length
  const utf16Unit = "| ECMA-262 string indices "
  const col2Width = utf16Unit.length
  log(0, "| Quantity".padEnd(col1Width + 3) + "| Unit Name   ".padEnd(col2Width) + "| Radix | Abbr. | Format |")
  log(0, "|-".padEnd(col1Width + 3, "-") + "|".padEnd(col2Width, "-") + "|-------|-------|--------|")
  logMeasure(0, root.size / 2 ** 20, "| mebibytes".padEnd(col2Width) + "| 2²⁰   | MiB   | UTF-8 ", col1Width)
  logMeasure(4, root.size / 10 ** 6, "| megabytes".padEnd(col2Width) + "| 10⁶   | MB    | UTF-8 ", col1Width)
  logMeasure(4, root.size / 2 ** 10, "| kibibytes".padEnd(col2Width) + "| 2¹⁰   | KiB   | UTF-8 ", col1Width)
  logMeasure(4, root.size / 10 ** 3, "| kilobytes".padEnd(col2Width) + "| 10³   | KB    | UTF-8 ", col1Width)
  logMeasure(1, [...finalBody].length, "| Unicode code points".padEnd(col2Width) + "| ----- | UCP   | UTF-32", col1Width)
  logMeasure(4, finalBody.length, utf16Unit + "| ----- | chars | UTF-16", col1Width)
  logMeasure(1, root.size, "| bytes".padEnd(col2Width) + "| 2⁸    | B     | UTF-8 ", col1Width)
  logMeasure(3, Math.ceil((root.size * 8) / 6), "| charms (base-64 length)".padEnd(col2Width) + "| 2⁶    | chm   | UTF-8 ", col1Width)
  logMeasure(2, bits, "| bits".padEnd(col2Width) + "| 2¹    | b     | UTF-8 ", col1Width)
  closeLog(1)

  openLog(5, "Testing index.html.")
  const route = new Route()
  openLog(5, "Setting the route to " + route + ".")
  root.parts.user.setRoute(route)
  log(5, "Done." + route)

  closeLog(5)
  openLog(5, "Reading index.html.")
  log(5, root.parts.user["index.html"])
  closeLog(5)
  closeLog(5)

  closeLog(0)
 } else {
  production = !root.local && root.branch === "main"
  // Conditional logging is only functional after this point.
  openLog(0, `Booting ${root.local ? "local" : "cloud"}/${root.branch} ${root.version}`)
  hydrate()
  closeLog(0)
 }
 log(0, "Boot successful.")
}

boot({
 change: "patch",
 verbosity: "100",
 mapping: "0",
 defaultHost: "www.core.parts",
 defaultDesktopRouteID: "0",
})