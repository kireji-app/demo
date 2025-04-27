class Framework {
 static initialize(buildData) {

  // Initialize own static properties
  this.responses = {}
  this.frameworks = []
  this.sourceCode = this.toString()
  this.sourceLines = this.sourceCode.split("\n")
  this.sourcePositionMarks = {}
  this.readmeVersionPattern = /version-(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)/
  this.sourcePositionMarkPatternRegister = /@[a-z-]+@/g
  this.sourcePositionMarkPatternAddLine = /^@[a-z-]+@/g
  for (let ln = 0; ln < this.sourceLines.length; ln++) {
   for (const { 0: mark, index: col } of this.sourceLines[ln].matchAll(this.sourcePositionMarkPatternRegister)) {
    if (mark in this.sourcePositionMarks)
     throw `Duplicate source position mark ${mark} in framework.js.`
    this.sourcePositionMarks[mark] = { ln, col }
   }
  }

  // Initialize global properties.
  const { constructor: Globe, Window, ServiceWorkerGlobalScope: Worker, process: Cloud } = globalThis
  globalThis.environment = Globe === Window ? "window" : (Globe === Worker ? "worker" : (Cloud?.argv[1]?.split("/").pop() === "framework.js" ? "build" : "server"))
  function conditionalConsoleCall(VERBOSITY, DATA, METHOD = 'debug') {
   // Logging functions cannot be used until globalThis.production is defined.
   if (!production && VERBOSITY <= build.verbosity)
    console[METHOD](environment + ":", ...DATA)
  }
  globalThis.log = (VERBOSITY, ...DATA) => {
   conditionalConsoleCall(VERBOSITY, DATA, 'log')
  }
  globalThis.warn = (...DATA) => {
   conditionalConsoleCall(0, DATA, 'warn')
  }
  globalThis.debug = (...DATA) => {
   conditionalConsoleCall(0, DATA, 'debug')
  }
  globalThis.openLog = (VERBOSITY, ...DATA) => {
   conditionalConsoleCall(VERBOSITY, DATA, 'group')
  }
  globalThis.closeLog = (VERBOSITY) => {
   conditionalConsoleCall(VERBOSITY, [], 'groupEnd')
  }
  globalThis.btoaUnicode = BODY => {
   return btoa(new TextEncoder('utf-8').encode(BODY)
    .reduce((data, byte) => data + String.fromCharCode(byte), '')
   )
  }
  globalThis.serialize = VALUE => {
   return JSON.stringify(VALUE, (k, v) => typeof v === "bigint" ? v.toString() + "n" : v, 1)
  }
  globalThis.SourceMappedFile = class {
   static radix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
   lines = []
   sources = []
   scripts = []
   mappings = []
   constructor(NAME, PATH_TO_REPO, PATH_FROM_REPO) {
    const sourceFile = this
    sourceFile.name = NAME
    sourceFile.pathToRepo = PATH_TO_REPO
    sourceFile.pathFromRepo = PATH_FROM_REPO
   }
   addSource(source, script) {
    const sourceFile = this

    if (production)
     return

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
    if (typeof string !== "string")
     throw 'bad line: ' + (typeof string)

    const mark = string.match(Framework.sourcePositionMarkPatternAddLine)?.[0]

    if (mark) {
     string = string.slice(mark.length)
     ogLn = Framework.sourcePositionMarks[mark].ln
    }

    sourceFile.lines.push(indent + string)

    if (production)
     return

    if (string && mapTokens)
     sourceFile.mappings.push([...string.matchAll(/\w+|\s+|\W+/g)].map(({ index: col }) => [indent.length + col, srcIndex, ogLn, ogCol + col]))
    else
     sourceFile.mappings.push([[indent.length, srcIndex, ogLn, ogCol]])
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
    return sourceFile.lines.join("\n") + (production ? "" : `
 //${"#"} sourceMappingURL=data:application/json;charset=utf-8;base64,${btoaUnicode(sourceFile.getMap())}${url ? `
 //${"#"} sourceURL=${url}` : ""}`)
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
  globalThis.Part = class Part {
   constructor(INPUT) {
    if (typeof INPUT === "string")
     return new (new Framework(INPUT).PartConstructor)()

    throw 'other constructor forms are not yet supported'
   }
  }
  globalThis.globe = globalThis
  globalThis.build = buildData

  if (environment === "build") {

   build.repository = {}

   const
    {
     statSync: getItemStats,
     existsSync: itemExists,
     readdirSync: readFolder,
     readFileSync: readFile
    } = require('fs'),
    { extname } = require('path'),
    { execSync: $ } = require('child_process')

   build.local = !process.env.VERCEL || !!process.env.__VERCEL_DEV_RUNNING

   if (build.local) {
    build.branch = $('git branch --show-current').toString().trim()
    build.hash = $('git rev-parse HEAD').toString().trim()
    // build.message = $('git log -1').toString()
    globalThis.production = false
   } else {
    build.branch = process.env.VERCEL_GIT_COMMIT_REF
    build.hash = process.env.VERCEL_GIT_COMMIT_SHA
    // build.message = process.env.VERCEL_GIT_COMMIT_MESSAGE
    globalThis.production = build.branch === "main"
   }
   openLog(0, "Starting build...")
   build.repository[".gitignore"] = readFile(".gitignore", "utf-8")
   build.repository["jsconfig.json"] = readFile("jsconfig.json", "utf-8")
   build.repository["README.md"] = readFile("README.md", "utf-8")
   build.repository["vercel.json"] = readFile("vercel.json", "utf-8")
   build.repository["type.d.ts"] = readFile("type.d.ts", "utf-8")
   const semver = build.semanticVersion = build.repository["README.md"].match(this.readmeVersionPattern).groups
   if (build.local) {
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
   }
   const version = `version-${semver.major}.${semver.minor}.${semver.patch}`
   build.repository["README.md"] = build.repository["README.md"].replace(this.readmeVersionPattern, version)
   log(0, `${version}${build.local ? " (local)" : ""} from branch "${build.branch}".`)

   try {
    // Try to use git diff to patch the existing build.

    if (production)
     throw "The production environment should always build from scratch."

    if (!itemExists("api/service.js"))
     throw "No existing build file."

    log(0, "Existing build detected. Attempting partial build.")

    const existingBuild = readFile("api/service.js", "utf-8")
    const openMark = "Framework.initialize" + "("
    const openIndex = existingBuild.indexOf(openMark) + openMark.length

    if (openIndex < openMark.length)
     throw "The existing build file wasn't populated."

    const closeMark = ")"
    const closeIndex = existingBuild.lastIndexOf(closeMark)
    const { repository, hash } = JSON.parse(existingBuild.slice(openIndex, closeIndex))

    log(0, "Staging the intent to add all untracked files.")
    $(`git add --intent-to-add .`)

    for (const diffResult of $(`git diff --name-status ${hash} -- dns-root/`).toString().trim().split("\n")) {

     if (!diffResult)
      continue

     const [fileStatus, leftPath, rightPath] = diffResult.split(/\s+/)
     const leftExtension = extname(leftPath)
     const leftPathSegments = leftPath.slice(9).split("/")
     const leftFilename = leftPathSegments.pop()
     let leftRoot = repository["dns-root"]
     let rightRoot = null
     let rightFilename = null
     let rightExtension = null

     for (const pathPart of leftPathSegments)
      leftRoot = leftRoot[pathPart] ??= {}

     if (rightPath) {
      rightRoot = repository["dns-root"]
      rightExtension = extname(rightPath)
      const rightPathSegments = rightPath.slice(9).split("/")
      rightFilename = rightPathSegments.pop()
      for (const pathPart of rightPathSegments)
       rightRoot = rightRoot[pathPart] ??= {}
     }
     /* if (rightPath && rightExtension === ".ts" || leftExtension === ".ts") {
      log(2, `\x1b[38;5;27m/\x1b[38;5;239m${filename} ignored\x1b[0m`)
     } else */ switch (fileStatus[0]) {
      case "A":
       leftRoot[leftFilename] = readFile(leftPath, ['.png', '.gif'].includes(leftExtension) ? "base64" : "utf-8")
       log(2, `\x1b[38;5;34m/\x1b[38;5;82m${leftFilename}\x1b[38;5;34m - added \x1b[0m`)
       break;
      case "M":
       leftRoot[leftFilename] = readFile(leftPath, ['.png', '.gif'].includes(leftExtension) ? "base64" : "utf-8")
       log(2, `\x1b[38;5;28m/\x1b[38;5;226m${leftFilename}\x1b[38;5;28m - modified \x1b[0m`)
       break;
      case "D":
       delete leftRoot[leftFilename];
       log(2, `\x1b[38;5;28m/\x1b[38;5;196m${leftFilename}\x1b[38;5;28m - deleted \x1b[0m`)
       break;
      case "C":
      case "R":
       delete leftRoot[leftFilename]
       rightRoot[rightFilename] = readFile(rightPath, ['.png', '.gif'].includes(rightExtension) ? "base64" : "utf-8")
       log(2, `\x1b[38;5;28m/\x1b[38;5;129m${rightFilename}\x1b[38;5;28m -${diffResult[0] === "C" ? "copied" : "renamed"} \x1b[0m`)
       break;
      default:
       throw "Unsupported git diff type, '" + fileStatus + "'."
     }
    }

    build.repository["dns-root"] = repository["dns-root"]
   } catch (reason) {
    log(0, "Building from scratch.", { reason })
    log(1, "Initializing local git configuration (idempotent).")
    $('git update-index --assume-unchanged api/service.js')
    log(1, "Packing shallow git repository into script.")
    build.repository["dns-root"] = {}
    function readRecursive(host = "", folderPath = "dns-root", directory = build.repository["dns-root"]) {
     // TODO: Manage file size max.
     if (host) {
      if (host.length > 253)
       throw SyntaxError(`requested host is ${host.length} characters long, exceeding the maximum domain name length of 253. \n${host}`)
     }

     if (!itemExists(folderPath))
      throw new ReferenceError("Can't pack nonexistent folder " + folderPath)

     const filenames = []
     for (const itemName of readFolder(folderPath)) {
      const
       folderPath = ["dns-root", ...(host ? host.split(".").reverse() : [])].join('/'),
       filePath = folderPath + "/" + itemName
      if (itemExists(filePath)) {
       const stats = getItemStats(filePath)

       if (stats.isDirectory()) {
        openLog(2, `\x1b[38;5;27m/\x1b[38;5;75m${itemName}\x1b[38;5;27m\x1b[0m`)
        readRecursive(host ? itemName ? itemName + "." + host : host : itemName ?? "", filePath, directory[itemName] = {})
        closeLog(2)
       } else if (stats.isFile())
        filenames.push([itemName, filePath])
      }
     }

     for (const [filename, filePath] of filenames) {
      const extension = extname(filePath)
      try {

       if (/*extension !== ".ts" && */!$(`git check-ignore -v ${filePath}`).includes('.gitignore:'))
        throw "Don't ignore."

       log(2, `\x1b[38;5;27m/\x1b[38;5;239m${filename} ignored\x1b[0m`)
      } catch {
       const content = readFile(filePath, ['.png', '.gif'].includes(extension) ? "base64" : "utf-8")
       log(2, `\x1b[38;5;28m/\x1b[38;5;76m${filename}\x1b[38;5;28m"\x1b[0m`)
       directory[filename] = content
      }
     }
    }
    readRecursive()
   }
   /*
    // Conceptual:
    const { resolveTxt } = require('dns')
    const txt = host => new Promise(give => resolveTxt(host, (e, TXT) => e ? (debug(e), process.exit(21)) : give(TXT)))
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
     process.exit(21)
    })
   */
   closeLog(0)
  } else globalThis.production = !build.local && build.branch === "main"

  // Create and initialize the user configuration space.
  new Part("user.parts").distributeInitializePart()
 }
 constructor(inputHost, customDirectory) {
  const framework = this

  if (typeof inputHost !== "string")
   throw "host cannot be " + typeof inputHost

  if (!/^[0-9a-z-]+(?:\.[0-9a-z-]+){1,}$/.test(inputHost) && !/^localhost:\d+$/.test(inputHost))
   throw "malformed host " + inputHost

  if (!customDirectory) {

   if (inputHost in Framework.frameworks)
    return Framework.frameworks[inputHost]

   Framework.frameworks[inputHost] = framework
  }

  framework.host = inputHost
  framework.isCore = inputHost === "core.parts"
  framework.domains = inputHost.split(".").concat("dns-root")
  framework.pathToRepo = new Array(framework.domains.length).fill("..").join("/")
  framework.pathFromRepo = [...framework.domains].reverse().join("/")
  framework.stockDirectory = inputHost.split(".").reduceRight((directory, subdomain) => directory?.[subdomain] ?? {}, build.repository["dns-root"])
  framework.customDirectory = customDirectory ?? {}
  framework.MethodData = class {
   static identifierPattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/
   static fromMethodID(METHOD_ID) {
    this[METHOD_ID] = new this(METHOD_ID)
   }
   constructor(METHOD_ID) {
    const methodData = this
    methodData.methodID = METHOD_ID
    methodData.filename = `${METHOD_ID}.js`
    methodData.isAuto = METHOD_ID.startsWith("auto-")
    methodData.content = methodData.isAuto ? `@auto-getter@return framework.readOwnString("${METHOD_ID.slice(5)}")` : framework.readOwnString(methodData.filename)
    methodData.isView = METHOD_ID.startsWith("view-")
    methodData.isAsync = METHOD_ID.startsWith("async-")
    methodData.isSymbol = METHOD_ID.startsWith("symbol-")
    methodData.isGetOrSet = METHOD_ID.startsWith("get-") || METHOD_ID.startsWith("set-")
    methodData.niceName = (() => {
     if (METHOD_ID.includes("-")) {
      if (methodData.isSymbol) {
       const subMethodID = METHOD_ID.slice(7)
       return `[Symbol.${subMethodID}]`
      } else if (methodData.isGetOrSet) {
       if (METHOD_ID.includes("."))
        return `["${METHOD_ID.slice(4)}"]`
      } else if (methodData.isAuto) {
       if (METHOD_ID.includes("."))
        return `["${METHOD_ID.slice(5)}"]`
      }
      let temp = METHOD_ID.split("-")
      let firstWordBecomesLastWord = temp.shift()

      if (methodData.isGetOrSet || methodData.isAuto)
       firstWordBecomesLastWord = temp.shift()

      temp.push(firstWordBecomesLastWord)

      return temp.map((word, i) => i ? word[0].toUpperCase() + word.slice(1) : word).join("")
     }
     return METHOD_ID
    })()
    methodData.Constant = class MethodConstant {
     static all = {}
     static unused = {}
     static methodIDUsed = false
     used = false
     requirements = []
     constructor(SOURCE_PATH, SOURCE_LINE, SOURCE_LINE_NUMBER) {
      /**
       This object manages exactly one inherited constant declaration (SOURCE_LINE)
        including its dependencies as the parent MethodData class instance traverses
        the prototype chain of the type it is constructing to find both generic method
        constants and specific subtype constants.
  
       It adds the constant - after adding any previous constants that it depends
       on - to the file as soon as its constructed, but only if the given method
       body includes the constant.
      */

      const constant = this
      constant.path = SOURCE_PATH
      constant.line = SOURCE_LINE
      constant.lineNumber = SOURCE_LINE_NUMBER
      constant.source = framework.sourceFile.addSource(SOURCE_PATH, SOURCE_LINE)

      if (!SOURCE_LINE.startsWith("const "))
       throw 'invalid const line: ' + SOURCE_LINE

      constant.equalsIndex = SOURCE_LINE.indexOf("=")
      constant.identifier = SOURCE_LINE.slice(5, constant.equalsIndex).trim()

      if (constant.identifier in methodData.Constant.all)
       throw 'constant overriding is not ready yet'

      for (const previousConstantIdentifier in methodData.Constant.unused) {
       // A currently unused constant is used by this constant.
       const previousConstant = methodData.Constant.unused[previousConstantIdentifier]
       if (previousConstant.usageRegExp.test(SOURCE_LINE)) {
        constant.requirements.push(methodData.Constant.unused[previousConstantIdentifier])
       }
      }

      methodData.Constant.all[constant.identifier] = constant
      methodData.Constant.unused[constant.identifier] = constant
      constant.usageRegExp = new RegExp(`(?:^|[^.])\\b${constant.identifier}\\b`)
      for (const methodBodyLine of methodData.lines) {
       if (constant.usageRegExp.test(methodBodyLine)) {

        // This constant is used in the method's body.
        constant.ensureDeclarationAndDependencies()
       }
      }
     }
     ensureDeclarationAndDependencies() {
      const constant = this

      if (constant.used)
       return

      for (const requiredConstant of constant.requirements)
       requiredConstant.ensureDeclarationAndDependencies()

      framework.sourceFile.addSection(constant.line, constant.source, constant.lineNumber, 0, "  ")
      constant.used = true
      delete methodData.Constant.unused[constant.identifier]
     }
    }
    methodData.Constant.all.METHOD_ID = methodData.Constant.unused.METHOD_ID = {
     identifier: "METHOD_ID",
     usageRegExp: /(?:^|[^.])\bMETHOD_ID\b/g,
     ensureDeclarationAndDependencies() {
      const constant = this
      framework.sourceFile.addLine(`@method-i-d-literal@  const METHOD_ID = "${METHOD_ID}"`, framework.buildSource)
      constant.used = true
     }
    }

    methodData.source = methodData.isAuto ? framework.buildSource : framework.sourceFile.addSource(methodData.filename, methodData.content)
    methodData.lines = methodData.content ? methodData.content.split("\n") : []
    methodData.hasValidPropertyName = methodData.isSymbol || methodData.isGetOrSet || methodData.isAuto || framework.MethodData.identifierPattern.test(methodData.niceName)
    methodData.propertyReference = methodData.hasValidPropertyName ? methodData.niceName : `["${methodData.niceName}"]`
    methodData.propertyAccessor = methodData.propertyReference.startsWith("[") ? methodData.propertyReference : "." + methodData.niceName
    methodData.argumentString = "(" + (framework.partJSON[METHOD_ID]?.join(", ") ?? "") + ")"
    methodData.modifiers = methodData.isAsync ? "async " : (methodData.isGetOrSet ? METHOD_ID.slice(0, 3) + " " : (methodData.isAuto ? "get " : ""))
    methodData.signature = methodData.modifiers + methodData.propertyReference + methodData.argumentString

    if (methodData.content === undefined)
     return

    if (methodData.isAuto && framework.ownFilenameTable.has(`get-${METHOD_ID.slice(5)}.js`))
     return

    framework.sourceFile.addSection(`@method-open@\n\n ${methodData.signature} {`, framework.buildSource)

    if (!methodData.isAuto)
     framework.collectConstants(framework, methodData)

    if (methodData.isAuto)
     framework.sourceFile.addLine(methodData.content, methodData.source, null, null, "  ")
    else if (framework.isCore)
     framework.sourceFile.addLines(methodData.lines, methodData.source, 0, 0, "  ")
    else {
     if (["view-add", "view-populate"].includes(METHOD_ID)) {
      // For all of these view functions, we want to execute the core part's instructions first, then the next and then the next.
      framework.sourceFile.addLine(`@auto-super-top@super${methodData.propertyAccessor}();`, framework.buildSource, null, null, "  ", false)
      framework.sourceFile.addLines(methodData.lines, methodData.source, 0, 0, "  ")
     } else if (["view-remove"].includes(METHOD_ID)) {
      // For these view functions, we want to execute the derived method's instructions first, then work our way toward the core.
      framework.sourceFile.addLines(methodData.lines, methodData.source, 0, 0, "  ")
      framework.sourceFile.addLine(`@auto-super-bottom@super${methodData.propertyAccessor}();`, framework.buildSource, null, null, "  ", false)
     } else {
      let hasSuper = false
      methodData.lines.forEach((methodLine, ln) => {
       const firstMatch = [...methodLine.matchAll(/(?<=[^\w]|^)super\s*\(/g)][0]
       if (firstMatch) {
        hasSuper = true
        methodLine = methodLine.slice(0, firstMatch.index) + `super${methodData.propertyAccessor}(` + methodLine.slice(firstMatch.index + firstMatch[0].length)
        framework.sourceFile.addLine(methodLine, methodData.source, ln, 0, "  ", false)
       } else
        framework.sourceFile.addLine(methodLine, methodData.source, ln, 0, "  ")
      })
     }
    }

    framework.sourceFile.addLine(`@method-close@}`, framework.buildSource, null, null, " ")
   }
  }

  framework.ownFilenameTable = new Map(
   Object.keys(framework.stockDirectory)
    .filter(itemName => typeof framework.stockDirectory[itemName] === "string")
    .map(filename => [filename, framework.stockDirectory])
    .concat(
     Object.keys(framework.customDirectory)
      .map(filename => [filename, framework.customDirectory])
    )
  )

  framework.ownGetAndSetMethodIDs = []
  framework.ownViewMethodIDs = []

  for (const filename of framework.ownFilenameTable.keys()) {

   if (!filename.endsWith(".js"))
    continue

   const methodID = filename.slice(0, -3)

   if (filename.startsWith("get-") || filename.startsWith("set-"))
    framework.ownGetAndSetMethodIDs.push(methodID)
   else if (filename.startsWith("view-"))
    framework.ownViewMethodIDs.push(methodID)
  }

  framework.renderedStrings = {}
  framework.sourceFile = new SourceMappedFile(framework.pathFromRepo, framework.pathToRepo, "compiled-type.js")
  framework.sourceFile.framework = framework
  framework.buildSource = framework.sourceFile.addSource(framework.pathToRepo + "/framework.js", framework.sourceCode)
  framework.stockPartJSON = JSON.parse(framework.stockDirectory["part.json"] ?? "{}")
  framework.partJSON = Object.setPrototypeOf(JSON.parse(framework.customDirectory["part.json"] ?? "{}"), framework.stockPartJSON)
  framework.parent = framework.isCore ? null : new Framework(framework.partJSON.extends ?? "one.core.parts")
  framework.depth = framework.isCore ? 0 : framework.parent.depth + 1

  if (!framework.isCore)
   Object.setPrototypeOf(framework.stockPartJSON, framework.parent.partJSON)

  framework.sourceFile.addLine("@eval-open@(()=>{", framework.buildSource)
  framework.addConstants(framework.sourceFile)
  // Convert kebab-case subdomain to PascalCase constructor name.
  framework.niceName = inputHost.startsWith("localhost:") ? "LocalHostPart" : inputHost.split(".")[0].split("-").map(word => word[0].toUpperCase() + word.slice(1)).join("") + "Part"
  framework.sourceFile.addSection(`@class-open@
 return class ${framework.niceName}${framework.isCore ? "" : " extends BasePart"} {
 // ${inputHost}${framework.isCore ? "" : ` extends ${framework.parent.host}`}

 static framework = framework;
 static host = inputHost;`, framework.buildSource)

  for (const methodID of framework.ownGetAndSetMethodIDs)
   framework.MethodData.fromMethodID(methodID)

  for (const methodID in framework.partJSON) {
   if (methodID === "extends")
    continue

   framework.MethodData.fromMethodID(methodID)
  }

  for (const methodID of framework.ownViewMethodIDs)
   framework.MethodData.fromMethodID(methodID)

  for (const filename of framework.ownFilenameTable.keys())
   framework.MethodData.fromMethodID("auto-" + filename)

  framework.sourceFile.addLine("@class-close@}", framework.buildSource)
  framework.sourceFile.addLine("@eval-close@})()", framework.buildSource)
  framework.script = framework.sourceFile.packAndMap()
  framework.PartConstructor = eval(framework.script)
  framework.PartConstructor.framework = framework

  if (framework.isCore) {
   globalThis.CorePart = framework.PartConstructor
  }
 }
 addConstants(targetFile) {
  const framework = this
  framework.parent?.addConstants(targetFile)
  const filename = "const-class.js"
  const pathPrefix = targetFile === framework.sourceFile ? "" : targetFile.pathToRepo + "/" + framework.pathFromRepo + "/"
  const path = pathPrefix + filename
  const body = framework.readOwnString(filename)

  if (body)
   targetFile.addSection(body, targetFile.addSource(path, body), 0, 0, " ")
 }
 collectConstants(targetFramework, targetMethodData) {
  const framework = this
  const isForOwnScript = targetFramework === framework

  if (isForOwnScript) {
   if (targetMethodData.content === "") {
    targetMethodData.content = "// Do nothing."
    targetMethodData.lines = [targetMethodData.content]
    return
   }
  }

  framework.parent?.collectConstants(targetFramework, targetMethodData)

  function collectOwnConstants(FILENAME) {

   if (!framework.ownFilenameTable.has(FILENAME))
    return

   const pathPrefix = isForOwnScript ? "" : targetFramework.pathToRepo + "/" + framework.pathFromRepo + "/"
   const path = pathPrefix + FILENAME
   const body = framework.readOwnString(FILENAME)
   const lines = body.split("\n")

   for (let ln = 0; ln < lines.length; ln++)
    new targetMethodData.Constant(path, lines[ln], ln)
  }

  collectOwnConstants("const-method.js")

  if (targetMethodData.isGetOrSet)
   collectOwnConstants("const-get-or-set.js")

  if (targetMethodData.isView)
   collectOwnConstants("const-view.js")
 }
 readOwnString(filename, fallback) {
  const framework = this
  if (framework.ownFilenameTable.has(filename))
   return framework.ownFilenameTable.get(filename)[filename]

  return fallback
 }
}

Framework.initialize({
 "change": "patch",
 "verbosity": 2
})