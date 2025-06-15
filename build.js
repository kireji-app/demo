function boot(root) {
 const environment = globalThis.constructor === globalThis.Window ? "window" : globalThis.constructor === globalThis.ServiceWorkerGlobalScope ? "worker" : process?.argv[1]?.split("/").pop() === "build.js" ? "build" : "server"
 if (environment === "build") {
  globalThis.$ = require("child_process").execSync
  root.size = 0
  if (!process.env.VERCEL || !!process.env.__VERCEL_DEV_RUNNING) {
   root.local = true
   root.branch = $("git branch --show-current").toString().trim()
   root.hash = $("git rev-parse HEAD").toString().trim()
   root.version = "'" + $("git log -1 --pretty=%s").toString().split("\n")[0] + "'"
   throw root.version
  } else {
   root.local = false
   root.branch = process.env.VERCEL_GIT_COMMIT_REF
   root.hash = process.env.VERCEL_GIT_COMMIT_SHA
   root.version = process.env.VERCEL_GIT_COMMIT_MESSAGE.split("\n")[0]
   throw "'" + root.version + "'"
  }
 }
 const production = !root.local && root.branch === "main"
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
 openLog(0, `Booting Operating System (${root.local ? "local" : "cloud"})`)
 if (environment === "build") {
  const { extname } = require("path"),
   { statSync: getItemStats, existsSync: itemExists, readdirSync: readFolder, readFileSync: readFile, writeFileSync: writeFile, mkdirSync: makeFolder } = require("fs")
  if (root.local) {
   configure_git_behavior: {
    openLog(1, "Initializing git configuration.")
    log(3, `This process configures the git repository to hide output file(s) during local development. It is idempotent.`)
    const commands = ["git update-index --assume-unchanged api/service.js"]
    commands.forEach(command => {
     log(2, `Executing the following command: \`${command}\``)
     $(command)
     log(2, "Command succeeded.")
    })
    closeLog(1)
   }
   increment_version: {
    const ver = root.version.split(".")
    if (ver[0] && root.change === "major") {
     ver[0]++; ver[1] = ver[2] = 0
    } else if (root.change === "minor" || (!ver[0] && root.change === "major")) {
     ver[1]++; ver[2] = 0
    } else ver[2]++
    root.version = ver.join(".")
   }
   update_readme: {
    root["README.md"] = root["README.md"].replace(/version-\d+\.\d+\.\d+/, `version-${root.version}`)
    log(2, `Outputting the project README.md which has been modified to reflect the correct version number.\n`)
    writeFile("README.md", root["README.md"])
   }
  }
  pack_domains: {
   log(0, `Version ${root.branch}/${root.version}`)
   openLog(1, "Packing Repository")
   log(2, "This recursive process makes the project portable by packing a shallow clone of the git repository into a valid ECMA-262 file.")
   let fileCount = 0, domainCount = 0
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
   readRecursive("", "./", root)
   log(2, `The process succeeded. It packed ${fileCount} files across ${domainCount} domains (including the dns-root and ${TLDs.length} top-level domains).`)
   closeLog(1)
  }
  output_service_file: {
   if (!itemExists("api")) makeFolder("api")
   const outputPath = "api/service.js"
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
  }
 }
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
 root.validate()
 log(0, "Boot successful.")
 closeLog(0)
}

boot({
 change: "patch",
 verbosity: "100",
 mapping: "0",
 defaultHost: "www.core.parts",
 defaultDesktopRouteID: "0",
})