class Framework {
 static initialize(buildData) {
  // Framework.responses = {}
  Framework.frameworks = []
  Framework.sourceLines = Framework.toString().split("\n")
  Framework.sourcePositionMarks = {}
  Framework.sourcePositionMarkPatternRegister = /@[a-z-]+@/g
  Framework.sourcePositionMarkPatternAddLine = /^@[a-z-]+@/g
  for (let ln = 0; ln < Framework.sourceLines.length; ln++) for (const { 0: mark, index: col } of Framework.sourceLines[ln].matchAll(Framework.sourcePositionMarkPatternRegister)) {
   if (mark in Framework.sourcePositionMarks) throw `Duplicate source position mark ${mark} in framework.js.`
   Framework.sourcePositionMarks[mark] = { ln, col }
  }
  globalThis.globe = globalThis
  globalThis.Part = class Part { constructor(host) { return new (new Framework(host).PartConstructor)() } }
  const { constructor: Globe, Window, ServiceWorkerGlobalScope: Worker, process: Cloud } = globalThis
  globalThis.environment = Globe === Window ? "window" : (Globe === Worker ? "worker" : (Cloud?.argv[1]?.split("/").pop() === "framework.js" ? "build" : "server"))
  const conditionalLog = (verbosity, data, method = 'debug') => !production && verbosity <= build.verbosity && console[method](...(environment === "worker" ? ["worker:", ...data] : data))
  globalThis.log = (verbosity, ...data) => conditionalLog(verbosity, data, 'log')
  globalThis.warn = (...data) => conditionalLog(0, data, 'warn')
  globalThis.debug = (...data) => conditionalLog(0, data, 'debug')
  globalThis.openLog = (verbosity, ...data) => conditionalLog(verbosity, data, 'group')
  globalThis.closeLog = (verbosity) => conditionalLog(verbosity, [], 'groupEnd')
  globalThis.btoaUnicode = string => btoa(new TextEncoder('utf-8').encode(string).reduce((data, byte) => data + String.fromCharCode(byte), ''))
  globalThis.serialize = value => JSON.stringify(value, (k, v) => typeof v === "bigint" ? v.toString() + "n" : v, 1)
  globalThis.hang = timeInMilliseconds => {
   warn(`Intentionally hanging the main thread for ${timeInMilliseconds} milliseconds.`)
   const start = performance.now()
   let iteration = -1, elapsedMilliseconds, remainingMilliseconds
   do {
    elapsedMilliseconds = Math.trunc((performance.now() - start))
    const newRemainingMilliseconds = timeInMilliseconds - elapsedMilliseconds
    Math.sin(iteration++)
    if (Math.trunc(newRemainingMilliseconds / 100) !== Math.trunc(remainingMilliseconds / 100)) log(0, "t: -" + newRemainingMilliseconds)
    remainingMilliseconds = newRemainingMilliseconds
   } while (remainingMilliseconds > 0)
   warn(`Main thread hang finished at iteration ${iteration}.`)
  }
  globalThis.SourceMappedFile = class {
   static radix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
   lines = []
   sources = []
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
    return srcIndex
   }
   addLine(string, srcIndex, ogLn = 0, ogCol = 0, indent = "", mapTokens = true) {
    const sourceFile = this
    if (typeof string !== "string") throw 'bad line: ' + (typeof string)
    const mark = string.match(Framework.sourcePositionMarkPatternAddLine)?.[0]
    if (mark) {
     string = string.slice(mark.length)
     ogLn = Framework.sourcePositionMarks[mark].ln
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
    const mark = lines[0].match(Framework.sourcePositionMarkPatternAddLine)?.[0]
    if (mark) {
     lines.shift()
     ogLn = Framework.sourcePositionMarks[mark].ln + 1
    }
    sourceFile.addLines(lines, srcIndex, ogLn, ogCol, indent, mapTokens)
   }
   packAndMap(url) {
    const sourceFile = this
    const script = sourceFile.lines.join("\n")
    return build.mapping ? script + `
 //${"#"} sourceMappingURL=data:application/json;charset=utf-8;base64,${btoaUnicode(sourceFile.getMap())}${url ? `
 //${"#"} sourceURL=${url}` : ""}` : script
   }
   getMap() {
    const sourceFile = this
    const encoderAbsolutePosition = [0, 0, 0, 0, 0]
    const mappings = sourceFile.mappings.map(decodedLine => (encoderAbsolutePosition[0] = 0, decodedLine.map(decodedSegment => {
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
       encodedSegment += SourceMappedFile.radix[characterIndex]
      }
      return encodedSegment
     }).join('')
    }).join(","))).join(";")
    return serialize({
     version: 3,
     sourceFile: "sourceFile.js",
     sourceRoot: sourceFile.pathFromRepo,
     sources: sourceFile.sources,
     names: [],
     sourcesContent: sourceFile.scripts,
     mappings,
    }, null, 1)
   }
  }
  const initializeRootPart = () => {
   const user = new Part("user.parts")
   user.distributeInitializePart()
   // openLog(1, "Performing reinitialization test.")
   // root.distributeInitializePart()
   closeLog(1)
  }
  globalThis.build = buildData
  if (environment === "build") {
   const { extname } = require('path'), { statSync: getItemStats, existsSync: itemExists, readdirSync: readFolder, readFileSync: readFile, writeFileSync: writeFile, mkdirSync: makeFolder } = require('fs'), { execSync: $ } = require('child_process')
   for (const fn of [".gitignore", "jsconfig.json", "README.md", "vercel.json", "type.d.ts"])
    build[fn] = readFile(fn, "utf-8")
   build.local = !Cloud.env.VERCEL || !!Cloud.env.__VERCEL_DEV_RUNNING
   build.size = 0
   const readmeVersionPattern = /version-(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)/
   const semver = build["README.md"].match(readmeVersionPattern).groups
   if (build.local) {
    build.branch = $('git branch --show-current').toString().trim()
    build.hash = $('git rev-parse HEAD').toString().trim()
    globalThis.production = false
    if (semver.major && build.change === "major") {
     semver.major++
     semver.minor = 0
     semver.patch = 0
    } else if (build.change === "minor" || !semver.major && build.change === "major") {
     semver.major = parseInt(semver.major)
     semver.minor++
     semver.patch = 0
    } else {
     semver.major = parseInt(semver.major)
     semver.minor = parseInt(semver.minor)
     semver.patch++
    }
    build.version = [semver.major, semver.minor, semver.patch].join(".")
    build["README.md"] = build["README.md"].replace(readmeVersionPattern, `version-${build.version}`)
   } else {
    build.branch = Cloud.env.VERCEL_GIT_COMMIT_REF
    build.hash = Cloud.env.VERCEL_GIT_COMMIT_SHA
    globalThis.production = build.branch === "main"
   }
   // Conditional logging is only functional after this point.
   openLog(0, `Building ${build.local ? "local" : "cloud"}/${build.branch} ${build.version}...`)
   try { // Try to use git diff to patch the existing repository.
    if (production) throw "The production environment should always build from scratch."
    if (!itemExists("api/service.js")) throw "No existing build file."
    log(0, "Patching existing build.")
    warn("The patch system does not detect files which were changed in the working tree during the previous build and then reverted prior to the current build.")
    const existingBuild = readFile("api/service.js", "utf-8")
    const openMark = "Framework.initialize" + "("
    const openIndex = existingBuild.indexOf(openMark) + openMark.length
    if (openIndex < openMark.length) throw "The existing build file wasn't populated."
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
       leftRoot[leftFilename] = readFile(leftPath, ['.png', '.gif'].includes(leftExtension) ? "base64" : "utf-8")
       log(2, `\x1b[38;5;34m/\x1b[38;5;82m${leftPath}\x1b[38;5;34m - added \x1b[0m`)
       break;
      case "M":
       leftRoot[leftFilename] = readFile(leftPath, ['.png', '.gif'].includes(leftExtension) ? "base64" : "utf-8")
       log(2, `\x1b[38;5;100m/\x1b[38;5;226m${leftPath}\x1b[38;5;100m - modified \x1b[0m`)
       break;
      case "D":
       delete leftRoot[leftFilename];
       log(2, `\x1b[38;5;88m/\x1b[38;5;196m${leftPath}\x1b[38;5;88m - deleted \x1b[0m`)
       break;
      case "C":
      case "R":
       delete leftRoot[leftFilename]
       rightRoot[rightFilename] = readFile(rightPath, ['.png', '.gif'].includes(rightExtension) ? "base64" : "utf-8")
       log(2, `\x1b[38;5;54m/\x1b[38;5;129m${rightPath}\x1b[38;5;54m -${diffResult[0] === "C" ? "copied" : "renamed"} \x1b[0m`)
       break;
      default:
       throw "Unsupported git diff type, '" + fileStatus + "'."
     }
    }
    build.com = com
    build.parts = parts
   } catch (reason) { // Pack the repository from scratch.
    log(0, "Building from scratch.", { reason })
    log(1, "Initializing local git configuration (idempotent).")
    $('git update-index --assume-unchanged api/service.js')
    log(1, "Packing shallow git repository into script.")
    function readRecursive(host, folderPath, directory) {
     if (host && host.length > 253) throw SyntaxError(`requested host is ${host.length} characters long, exceeding the maximum domain name length of 253. \n${host}`)
     if (!itemExists(folderPath)) throw new ReferenceError("Can't pack nonexistent folder " + folderPath)
     const filenames = []
     for (const itemName of readFolder(folderPath)) {
      const
       folderPath = host ? host.split(".").reverse().join('/') : '',
       filePath = folderPath + "/" + itemName
      if (itemExists(filePath)) {
       const stats = getItemStats(filePath)
       if (stats.isDirectory()) {
        openLog(2, `\x1b[38;5;27m/\x1b[38;5;75m${itemName}\x1b[38;5;27m\x1b[0m`)
        readRecursive(host ? itemName ? itemName + "." + host : host : itemName ?? "", filePath, directory[itemName] = {})
        closeLog(2)
       } else if (stats.isFile()) filenames.push([itemName, filePath])
      }
     }
     for (const [filename, filePath] of filenames) {
      const extension = extname(filePath)
      try {
       if (!$(`git check-ignore -v ${filePath}`).includes('.gitignore:')) throw "Don't ignore."
       log(2, `\x1b[38;5;27m/\x1b[38;5;239m${filename} ignored\x1b[0m`)
      } catch {
       const content = readFile(filePath, ['.png', '.gif'].includes(extension) ? "base64" : "utf-8")
       log(2, `\x1b[38;5;28m/\x1b[38;5;76m${filename}\x1b[38;5;28m"\x1b[0m`)
       directory[filename] = content
      }
     }
    }
    readRecursive("com", "com", build.com = {})
    readRecursive("parts", "parts", build.parts = {})
   }
   /*
    // Conceptual:
    const { resolveTxt } = require('dns')
    const txt = host => new Promise(give => resolveTxt(host, (e, TXT) => e ? (debug(e), Cloud.exit(21)) : give(TXT)))
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
       debug(payload)
       break
      }
     }
     Cloud.exit(21)
    })
   */
   initializeRootPart()
   if (!itemExists("api")) makeFolder("api")
   writeFile("api/service.js", user["service.js"])
   writeFile("README.md", build["README.md"])
   build.size = getItemStats("api/service.js").size
   writeFile("api/service.js", user["service.js"])
   build.size = getItemStats("api/service.js").size
   const finalBody = user["service.js"]
   writeFile("api/service.js", finalBody)
   openLog(1, "Stats for service.js")
   log(1, [...finalBody].length.toLocaleString() + " utf-8 characters")
   log(2, finalBody.length.toLocaleString() + " String characters")
   log(1, build.size.toLocaleString() + " bytes")
   log(0, Math.trunc(10000000 * build.size / 2 ** 20) / 10000000 + " megabytes")
   log(2, Math.ceil(build.size * 8 / 6).toLocaleString() + " hexads/sextets")
   closeLog(1)
   openLog(8, "Testing index.html.")
   user.setRoute(new Route("https://" + build.defaultHost + "/1"))
   log(8, user["index.html"])
   closeLog(2)
   closeLog(0)
  } else {
   globalThis.production = !build.local && build.branch === "main"
   // Conditional logging is only functional after this point.
   openLog(0, `Booting ${build.local ? "local" : "cloud"}/${build.branch} ${build.version}`)
   initializeRootPart()
   closeLog(0)
  }
  log(0, "Boot successful.")
 }
 constructor(inputHost, customDirectory) {
  const framework = this
  if (typeof inputHost !== "string") throw "host cannot be " + typeof inputHost
  if (!/^[0-9a-z-]+(?:\.[0-9a-z-]+){1,}$/.test(inputHost) && !/^localhost:\d+$/.test(inputHost)) throw "malformed host " + inputHost
  if (!customDirectory) {
   if (inputHost in Framework.frameworks) return Framework.frameworks[inputHost]
   Framework.frameworks[inputHost] = framework
  }
  framework.renderedStrings = {}
  framework.host = inputHost
  framework.isCore = inputHost === "core.parts"
  framework.domains = inputHost.split(".")
  framework.niceName = inputHost.startsWith("localhost:") ? "PartLocalHost" : "Part" + inputHost.split(".")[0].split("-").map(word => word[0].toUpperCase() + word.slice(1)).join("")
  framework.pathToRepo = new Array(framework.domains.length).fill("..").join("/")
  framework.pathFromRepo = [...framework.domains].reverse().join("/")
  framework.stockDirectory = framework.domains.reduceRight((directory, subdomain) => directory?.[subdomain] ?? {}, build)
  framework.customDirectory = customDirectory ?? {}
  framework.stockPartJSON = JSON.parse(framework.stockDirectory["part.json"] ?? "{}")
  framework.partJSON = Object.setPrototypeOf(JSON.parse(framework.customDirectory["part.json"] ?? "{}"), framework.stockPartJSON)
  framework.parent = framework.isCore ? null : new Framework(framework.partJSON.extends ?? "one.core.parts")
  framework.depth = framework.isCore ? 0 : framework.parent.depth + 1
  if (!framework.isCore) Object.setPrototypeOf(framework.stockPartJSON, framework.parent.partJSON)
  framework.stockSubdomains = Object.keys(framework.stockDirectory).filter(n => typeof framework.stockDirectory[n] === "object")
  framework.customSubdomains = Object.keys(framework.customDirectory).filter(n => typeof framework.customDirectory[n] === "object")
  framework.allSubdomains = framework.stockSubdomains.concat(framework.customSubdomains)
  framework.stockFilenames = Object.keys(framework.stockDirectory).filter(n => typeof framework.stockDirectory[n] === "string")
  framework.customFilenames = Object.keys(framework.customDirectory).filter(n => typeof framework.customDirectory[n] === "string")
  framework.allFilenames = framework.stockFilenames.concat(framework.customFilenames)
  framework.ownFilenameTable = new Map(framework.stockFilenames.map(fn => [fn, framework.stockDirectory]).concat(framework.customFilenames.map(fn => [fn, framework.customDirectory])))
  framework.Property = class {
   static identifierPattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/
   static ids = new Set()
   static addConstants(targetFile) {
    // framework.parent?.Property.addConstants(targetFile)
    // Parents can pass their constants up.
    const filename = "const-class.js"
    const pathPrefix = targetFile === framework.sourceFile ? "" : targetFile.pathToRepo + "/" + framework.pathFromRepo + "/"
    const path = pathPrefix + filename
    const body = framework.Property.readOwnString(filename)
    if (body) targetFile.addSection(body, targetFile.addSource(path, body), 0, 0, " ")
   }
   static collectConstants(targetFramework, targetProperty) {
    if (targetFramework === framework) {
     if (targetProperty.content === "") {
      targetProperty.content = "// Do nothing."
      targetProperty.lines = [targetProperty.content]
      return
     }
    }
    framework.parent?.Property.collectConstants(targetFramework, targetProperty)
    function collectOwnConstants(FILENAME) {
     if (!framework.ownFilenameTable.has(FILENAME)) return
     const pathPrefix = targetFramework.pathToRepo + "/" + framework.pathFromRepo + "/"
     const path = pathPrefix + FILENAME
     const body = framework.Property.readOwnString(FILENAME)
     const lines = body.split("\n")
     for (let ln = 0; ln < lines.length; ln++) new targetProperty.MethodConstant(path, lines[ln], ln)
    }
    collectOwnConstants("const-method.js")
    if (targetProperty.isGetOrSet) collectOwnConstants("const-get-or-set.js")
    if (targetProperty.isView) collectOwnConstants("const-view.js")
   }
   static readOwnString(filename, fallback) {
    return framework.ownFilenameTable.has(filename) ? framework.ownFilenameTable.get(filename)[filename] : fallback
   }
   constructor(PROPERTY_ID) {
    const property = framework.Property[PROPERTY_ID] = this
    property.id = PROPERTY_ID
    property.filename = `${PROPERTY_ID}.js`
    property.isAuto = PROPERTY_ID.startsWith("auto-")
    property.content = property.isAuto ? `@auto-getter@return framework.Property.readOwnString("${PROPERTY_ID.slice(5)}")` : framework.Property.readOwnString(property.filename)
    property.isView = PROPERTY_ID.startsWith("view-")
    property.isAsync = PROPERTY_ID.startsWith("async-")
    property.isSymbol = PROPERTY_ID.startsWith("symbol-")
    property.isGetOrSet = PROPERTY_ID.startsWith("get-") || PROPERTY_ID.startsWith("set-")
    property.niceName = (() => {
     if (PROPERTY_ID.includes("-")) {
      if (property.isSymbol) return `[Symbol.${PROPERTY_ID.slice(7)}]`
      if (PROPERTY_ID.includes(".")) {
       if (property.isGetOrSet) return `["${PROPERTY_ID.slice(4)}"]`
       if (property.isAuto) return `["${PROPERTY_ID.slice(5)}"]`
      }
      let temp = PROPERTY_ID.split("-")
      let firstWordBecomesLastWord = temp.shift()
      if (property.isGetOrSet || property.isAuto) firstWordBecomesLastWord = temp.shift()
      temp.push(firstWordBecomesLastWord)
      return temp.map((word, i) => i ? word[0].toUpperCase() + word.slice(1) : word).join("")
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
      constant.source = framework.sourceFile.addSource(SOURCE_PATH, SOURCE_LINE)
      if (!SOURCE_LINE.startsWith("const ")) throw 'invalid const line: ' + SOURCE_LINE
      constant.equalsIndex = SOURCE_LINE.indexOf("=")
      constant.identifier = SOURCE_LINE.slice(5, constant.equalsIndex).trim()
      if (constant.identifier in property.MethodConstant.all) throw 'Duplicate definition of constant ' + constant.identifier + ' in type ' + framework.host + "."
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
      framework.sourceFile.addSection(constant.line, constant.source, constant.lineNumber, 0, "  ")
      constant.used = true
      delete property.MethodConstant.unused[constant.identifier]
     }
    }
    property.MethodConstant.all.PROPERTY_ID = property.MethodConstant.unused.PROPERTY_ID = {
     identifier: "PROPERTY_ID",
     usageRegExp: /(?:^|[^.])\bPROPERTY_ID\b/g,
     ensureDeclarationAndDependencies() {
      const constant = this
      framework.sourceFile.addLine(`@method-i-d-literal@  const PROPERTY_ID = "${PROPERTY_ID}"`, framework.buildSource)
      constant.used = true
     }
    }
    property.source = property.isAuto ? framework.buildSource : framework.sourceFile.addSource(property.filename, property.content)
    property.lines = property.content ? property.content.split("\n") : []
    property.hasValidPropertyName = property.isSymbol || property.isGetOrSet || property.isAuto || framework.Property.identifierPattern.test(property.niceName)
    property.propertyReference = property.hasValidPropertyName ? property.niceName : `["${property.niceName}"]`
    property.propertyAccessor = property.propertyReference.startsWith("[") ? property.propertyReference : "." + property.niceName
    property.argumentString = "(" + (framework.partJSON[PROPERTY_ID]?.join(", ") ?? "") + ")"
    property.modifiers = property.isAsync ? "async " : (property.isGetOrSet ? PROPERTY_ID.slice(0, 3) + " " : (property.isAuto ? "get " : ""))
    property.signature = property.modifiers + property.propertyReference + property.argumentString
    if (property.content === undefined) return
    if (property.isAuto && (framework.ownFilenameTable.has(`get-${PROPERTY_ID.slice(5)}.js`) || framework.ownFilenameTable.has(`set-${PROPERTY_ID.slice(5)}.js`))) return
    framework.sourceFile.addSection(`@method-open@\n\n ${property.signature} {`, framework.buildSource)
    if (property.isAuto) {
     framework.sourceFile.addLine(property.content, property.source, null, null, "  ")
     if (!PROPERTY_ID.includes(".") && PROPERTY_ID.slice(5) !== property.niceName) {
      framework.sourceFile.addLine(`@method-transition@}\n\nget ["${PROPERTY_ID.slice(5)}"]() {\n`, framework.buildSource, null, null, " ")
      framework.sourceFile.addLine(property.content, property.source, null, null, "  ")
     }
    }
    else {
     framework.Property.collectConstants(framework, property)
     if (framework.isCore) framework.sourceFile.addLines(property.lines, property.source, 0, 0, "  ")
     else {/*
      if (["view-add", "view-populate"].includes(PROPERTY_ID)) {
       framework.sourceFile.addLine(`@auto-super-top@super${property.propertyAccessor}();`, framework.buildSource, null, null, "  ", false)
       framework.sourceFile.addLines(property.lines, property.source, 0, 0, "  ")
      } else if (["view-remove"].includes(PROPERTY_ID)) {
       framework.sourceFile.addLines(property.lines, property.source, 0, 0, "  ")
       framework.sourceFile.addLine(`@auto-super-bottom@super${property.propertyAccessor}();`, framework.buildSource, null, null, "  ", false)
      } else {*/
      let hasSuper = false
      property.lines.forEach((methodLine, ln) => {
       const firstMatch = [...methodLine.matchAll(/(?<=[^\w]|^)super\s*\(/g)][0]
       if (firstMatch) {
        hasSuper = true
        methodLine = methodLine.slice(0, firstMatch.index) + `super${property.propertyAccessor}(` + methodLine.slice(firstMatch.index + firstMatch[0].length)
        framework.sourceFile.addLine(methodLine, property.source, ln, 0, "  ", false)
       } else
        framework.sourceFile.addLine(methodLine, property.source, ln, 0, "  ")
      })
      // }
     }
    }
    framework.sourceFile.addLine(`@method-close@}`, framework.buildSource, null, null, " ")
   }
  }
  for (const fn of framework.allFilenames) {
   framework.Property.ids.add("auto-" + fn);
   if (fn.endsWith(".js") && (fn.startsWith("get-") || fn.startsWith("set-") || fn.startsWith("view-"))) framework.Property.ids.add(fn.slice(0, -3))
  }
  for (const methodID in framework.partJSON) if (methodID !== "extends") framework.Property.ids.add(methodID)
  framework.sourceFile = new SourceMappedFile(framework.pathFromRepo, framework.pathToRepo, "compiled-type.js")
  framework.sourceFile.framework = framework
  framework.buildSource = framework.sourceFile.addSource(framework.pathToRepo + "/framework.js", Framework.sourceLines.join("\n"))
  framework.sourceFile.addLine("@eval-open@(()=>{", framework.buildSource)
  framework.Property.addConstants(framework.sourceFile)
  framework.sourceFile.addSection(`@class-open@\n return class ${framework.niceName}${framework.isCore ? "" : " extends framework.parent.PartConstructor"} {\n // ${inputHost}${framework.isCore ? "" : ` extends ${framework.parent.host}`}\n\n static framework = framework;\n static host = inputHost;`, framework.buildSource)
  for (const id of framework.Property.ids) new framework.Property(id)
  framework.sourceFile.addLine("@class-close@}", framework.buildSource)
  framework.sourceFile.addLine("@eval-close@})()", framework.buildSource)
  framework.script = framework.sourceFile.packAndMap()
  framework.PartConstructor = eval(framework.script)
  framework.PartConstructor.framework = framework
  if (framework.isCore) globalThis.PartCore = framework.PartConstructor
 }
 resolveImplicitHost(key) {
  key = String(key)

  if (/^localhost:\d+$/.test(key))
   return key

  if (/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(key))
   return [key, this.host].join(".")

  if (/^[a-z][A-Za-z0-9]+$/.test(key))
   return [key.split(/(?<=[a-z0-9])(?=[A-Z])/).map(word => word[0].toLocaleLowerCase() + word.slice(1)).join("-"), this.host].join(".")

  if (/[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/.test(key))
   return key

  throw new PartError(`Subpart key '${key}' cannot be implicitly resolved to a host. ${this.host}`)
 }
}

Framework.initialize({
 change: "patch",
 verbosity: 2,
 mapping: false,
 defaultHost: "www.core.parts",
 defaultDesktopRouteID: "0"
})