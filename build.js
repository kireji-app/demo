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
   return _.mapping === "1"
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
 class Route {
  static maxPathLength = 2000
  static maxSegmentLength = 250
  static defaultFilename = 'index.html'
  static pathSegmentRadix = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_0'
  static maxSegmentCardinality = (64n ** 251n - 64n) / 63n
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
  #singletonRouteID
  #taskRouteIDs
  constructor(url, base) {
   url ??= `https://${_.defaultHost}/${_.defaultSingletonSegment}/`
   this.#url = new URL(url, base)
   if (!(this.#url.host in desktop.themes)) {
    this.#url.port &&= ''
    this.#url.host = _.defaultHost
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
   if (!(value in desktop.themes))
    value = _.defaultHost
   this.#url.hostname = value
  }
  get host() { return this.#url.host }
  set host(value) {
   if (!(value in desktop.themes))
    value = _.defaultHost
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
   if (!this.#segments.length || this.#routeIDs[0] >= _.cardinality) {
    this.#routeIDs[0] = BigInt(Route.segmentToRouteID(this.#segments[0] = _.defaultSingletonSegment))
    warn(new RangeError('Encountered out-of-range aperiodic routeID while setting pathname of Route.'), { route: this, pathname })
   }
   this.#path = `/${this.#segments.join("/")}${this.#segments.length ? "/" : ""}`
   this.#header = new FileHeader(this.#filename || Route.defaultFilename)
   this.#url.pathname = `${this.#path}${this.#filename}${this.#mark}`
   this.#taskRouteIDs = [...this.#routeIDs]
   this.#singletonRouteID = this.#taskRouteIDs.shift()
  }
  get filename() { return this.#filename || Route.defaultFilename }
  set filename(value) { this.pathname = `${this.#path}${value}!` }
  get singletonRouteID() { return this.#singletonRouteID }
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
  logAny = (verbosity, data, method) => verbosity <= _.verbosity && console[method](...(environment === "worker" ? ["worker:", ...data] : data)),
  openLog = (verbosity, ...data) => logAny(verbosity, data, "group"),
  closeLog = verbosity => logAny(verbosity, [], "groupEnd"),
  closeLogSpaced = verbosity => (log(verbosity, ""), logAny(verbosity, [], "groupEnd")),
  toCharms = x => (x = Math.ceil(x.toString(2).length / 6)) + " charm" + (x !== 1 ? "s" : ""),
  serialize = value => JSON.stringify(value, (k, v) => (typeof v === "bigint" ? v.toString() + "n" : v), 1),
  scientific = x => (x = x.toString(10), `${x[0]}.${x[1] ?? 0}${x[2] ?? 0} × 10${[...(x.length - 1).toString()].map(n => '⁰¹²³⁴⁵⁶⁷⁸⁹'[n]).join("")}`),
  btoaUnicode = string => btoa(new TextEncoder("utf-8").encode(string).reduce((data, byte) => data + String.fromCharCode(byte), "")),
  logEntropy = (verbosity, ...parts) => {
   openLog(verbosity, "Domain Entropy")
   log(verbosity, `| Display Name                          | Entropy       | Cardinality   |`)
   log(verbosity, `|---------------------------------------|---------------|---------------|`)
   parts.forEach(part => log(1, `| ${(part.title ?? part.host).padEnd(37, " ")} | ${toCharms(part.cardinality).padEnd(13, " ")} | ${scientific(part.cardinality).padEnd(13, " ")} |`))
   closeLogSpaced(verbosity)
  },
  logStringSize = (verbosity, string) => {
   openLog(verbosity, "String Size")
   string = string.toString()
   const n = new TextEncoder().encode(string).length
   const bits = Math.ceil(n * 8)
   const col1Width = bits.toLocaleString().length
   const utf16Unit = "| ECMA-262 string indices "
   const col2Width = utf16Unit.length
   const logRow = (secondaryVerbosity, measure, unit, columnWidth = 0) => {
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
    log(verbosity + secondaryVerbosity, "| " + measureString + " " + unit + " |")
   }
   log(verbosity, "| Quantity".padEnd(col1Width + 3) + "| Unit Name   ".padEnd(col2Width) + "| Radix | Abbr. | Format |")
   log(verbosity, "|-".padEnd(col1Width + 3, "-") + "|".padEnd(col2Width, "-") + "|-------|-------|--------|")
   logRow(0, n / 2 ** 20, "| mebibytes".padEnd(col2Width) + "| 2²⁰   | MiB   | UTF-8 ", col1Width)
   logRow(4, n / 10 ** 6, "| megabytes".padEnd(col2Width) + "| 10⁶   | MB    | UTF-8 ", col1Width)
   logRow(4, n / 2 ** 10, "| kibibytes".padEnd(col2Width) + "| 2¹⁰   | KiB   | UTF-8 ", col1Width)
   logRow(4, n / 10 ** 3, "| kilobytes".padEnd(col2Width) + "| 10³   | KB    | UTF-8 ", col1Width)
   logRow(1, [...string].length, "| Unicode code points".padEnd(col2Width) + "| ----- | UCP   | UTF-32", col1Width)
   logRow(4, string.length, utf16Unit + "| ----- | chars | UTF-16", col1Width)
   logRow(1, n, "| bytes".padEnd(col2Width) + "| 2⁸    | B     | UTF-8 ", col1Width)
   logRow(3, Math.ceil((n * 8) / 6), "| charms (base-64 length)".padEnd(col2Width) + "| 2⁶    | chm   | UTF-8 ", col1Width)
   logRow(2, bits, "| bits".padEnd(col2Width) + "| 2¹    | b     | UTF-8 ", col1Width)
   closeLogSpaced(verbosity)
  }


 openLog(0, `\n     ▌ ▘     ▘▘   ${_.branch}\n 𝒌 = ▙▘▌▛▘█▌ ▌▌   ${_.version}\n     ▛▖▌▌ ▙▖ ▌▌   ${_.local ? "local" : "cloud"}\n            ▙▌    ${environment}\n\nBooting O/S`)
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
    if (!host && ["api", ".git"].includes(itemName)) continue
    const filePath = (host ? host.split(".").reverse().join("/") + "/" : "") + itemName
    if (itemExists(filePath)) {
     try {
      if (!_.$(`git check-ignore -v ${filePath}`).includes(".gitignore:")) throw "Don't ignore."
      log(2, `📄 ${itemName.padEnd(20, " ")} ❌ ignored`)
     } catch {
      const stats = getItemStats(filePath)
      if (stats.isDirectory()) {
       openLog(2, `📁 ${itemName}`)
       readRecursive(host ? (itemName ? itemName + "." + host : host) : itemName ?? "", filePath, (part[itemName] = {}))
       closeLog(2)
      } else if (stats.isFile()) filenames.push([itemName, filePath])
     }
    }
   }
   for (const [filename, filePath] of filenames) {
    const extension = extname(filePath)
    const content = readFile(filePath, [".png", ".gif"].includes(extension) ? "base64" : "utf-8")
    log(2, `📄 ${filename}"`)
    part[filename] = content
    fileCount++
   }
   domainCount++
  }
  readRecursive("", "./", _)
  closeLogSpaced(1)

  openLog(2, "Domain Stats")
  log(2, `| Files | Parts |\n|-------|-------|\n| ${("" + fileCount).padEnd(5, " ")} | ${("" + domainCount).padEnd(5, " ")} |`)
  closeLogSpaced(2)
 }

 const desktop = _.parts.desktop, { service, worker, share, fullscreen, ["address-bar"]: addressBar, agent, gpu, ["hot-keys"]: hotKeys, hydration } = desktop

 if (environment === "window")
  var element, noop, svg
 Hydrate_Archive: {
  const preHydrationArchive = serialize(_)
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
  function recursiveDistributeHydration(part = _, domains = []) {
   let host
   if (typeof part === "string") {
    if (domains.length) throw 'unexpected domains'
    host = part
    domains = host.split(".")
    part = getPartFromDomains(domains)
   } else host = domains.join(".")
   if (part.host) return part
   openLog(2, `"${host}"`)
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
     property.filename = `${PROPERTY_ID}.js`
     property.content = Object.getOwnPropertyDescriptor(part, property.filename)?.value
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
   subdomains.forEach((subdomain, index) => {
    const subpart = part[subdomain]
    Object.defineProperties(subpart, {
     index: { value: index },
     "..": { value: part },
    })
    recursiveDistributeHydration(subpart, [subdomain, ...domains])
    Object.defineProperty(part, index, { value: subpart })
   })
   Build: {
    const buildSteps = []
    let buildMethodOwner = part === _ ? prototype : part
    while (buildMethodOwner) {
     if (Object.hasOwn(buildMethodOwner, "build"))
      buildSteps.unshift(buildMethodOwner.build)
     buildMethodOwner = buildMethodOwner.prototype
    }
    buildSteps.forEach(fn => fn.call(part))
   }
   if (typeof part.cardinality !== "bigint" || part.cardinality <= 0)
    throw new Error(`Part hydration ended with invalid cardinality: ${part.cardinality} (${host}).`)
   log(10, `𝑘 = ${scientific(part.cardinality)} = ${toCharms(part.cardinality)} = ${part.cardinality}`);
   if (!Object.hasOwn(part, "..")) { // The part was first hydrated as a prototype, not a subdomain.
    const parentDomains = [...domains]
    const subdomain = parentDomains.shift()
    const parent = part === _ ? null : getPartFromDomains(parentDomains)
    Object.defineProperty(part, "..", { value: parent, configurable: true, writable: true })
    if (part !== _)
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
  closeLogSpaced(3)
 }

 logEntropy(0, _, _.parts.user.task)

 if (environment === "build") {
  let outputJS
  openLog(1, "Writing Output Files")
  const { writeFileSync: writeFile, existsSync: itemExists, statSync: getItemStats, mkdirSync: makeFolder, rmSync: removeFile } = require("fs")
  if (_.local) {
   const currentReadme = _["README.md"]
   const updatedReadme = currentReadme.replace(/version-\d+\.\d+\.\d+/, `version-${_.version}`)
   if (currentReadme !== updatedReadme) {
    _["README.md"] = updatedReadme
    writeFile("README.md", _["README.md"])
    log(2, `./README.md (to update version number)`)
   }
   if (!itemExists("api")) makeFolder("api")
   else if (itemExists("api/service.js")) removeFile(`api/service.js`)
   outputJS = _["service.js"]
   writeFile("api/service.js", outputJS)
   log(2, `./api/service.js`)
   closeLogSpaced(1)
  } else outputJS = _["service.js"]
  logStringSize(0, outputJS)
 }

 openLog(0, "Installing Facets")
 for (const subdomain of desktop.subdomains) {
  if (desktop[subdomain].prototype.host === "facet.core.parts")
   desktop[subdomain].install()
 }
 closeLogSpaced(0)

 // _.validate()
 log(0, "Boot completed.")
 closeLogSpaced(0)
 log(1, "End of synchronous script execution.")
}

ƒ({
 change: "patch",
 verbosity: "100",
 mapping: "0",
 defaultHost: "www.ejaugust.com",
 defaultSingletonSegment: "hello-world"
})