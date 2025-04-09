class Framework {

 // Startup.
 static initialize(GLOBE) {
  Framework.setGlobe(GLOBE)
  Framework.sourceCode = Framework.toString()
  Framework.sourceLines = Framework.sourceCode.split("\n")
  Framework.responses = {}
  Framework.frameworks = []
  Framework.sourceMapRadix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  Framework.SourceMappedFile = class {
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

    if (IS_PRODUCTION)
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

    if (IS_PRODUCTION)
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
    return sourceFile.lines.join("\n") + (/*IS_PRODUCTION */true ? "" : `
//${"#"} sourceMappingURL=data:application/json;charset=utf-8;base64,${btoaUnicode(sourceFile.getMap())}${url ? `
//${"#"} sourceURL=${url}` : ""}`)
   }
   getMap() {
    const sourceFile = this
    const mappings = Framework.encodeSourceMap(sourceFile.mappings)
    return JSON.stringify({
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
  Framework.registerSourcePositionMarks()

  const desktop = new Part("desktop.parts")
  desktop.distributeInitializePart()
  log(0, "Desktop Initialized.")
  // serverless.fetchSync("https://www.desktop.parts/-")
 }
 static setGlobe(GLOBE) {
  const {
   constructor: Globe,
   Window,
   ServiceWorkerGlobalScope: Worker,
   process: cloudProcess
  } = Object.assign(globalThis, {
   ...GLOBE,
   globe: globalThis,
   IS_PRODUCTION: false,
   GLOBE_KEYS: Object.keys(GLOBE),
   Part: class {
    constructor(INPUT) {
     if (typeof INPUT === "string")
      return new (new Framework(INPUT).PartConstructor)()

     throw 'other constructor forms are not yet supported'
    }
   },

   // Debug logging.
   log(VERBOSITY, ...DATA) {
    conditionalConsoleCall(VERBOSITY, DATA, 'log')
   },
   warn(...DATA) {
    if (typeof DATA[0] === "string")
     if (typeof DATA[1] === "string")
      DATA.unshift("\x1b[38;5;100m" + 'warning ' + '\x1b[38;5;226m' + DATA.shift() + "\x1b[38;5;100m" + DATA.shift() + "\x1b[0m")
     else
      DATA.unshift("\x1b[38;5;100m" + 'warning ' + DATA.shift() + "\x1b[0m")
    else
     DATA.unshift("\x1b[38;5;100m" + "warning" + "\x1b[0m")
    conditionalConsoleCall(0, DATA, 'warn')
   },
   debug(...DATA) {
    conditionalConsoleCall(0, DATA, 'debug')
   },
   openLog(VERBOSITY, ...DATA) {
    conditionalConsoleCall(VERBOSITY, DATA, 'group')
   },
   closeLog(VERBOSITY) {
    conditionalConsoleCall(VERBOSITY, [], 'groupEnd')
   },

   // String handling.
   btoaUnicode(BODY) {
    return btoa(new TextEncoder('utf-8').encode(BODY)
     .reduce((data, byte) => data + String.fromCharCode(byte), '')
    )
   }
  })

  globe.ENVIRONMENT =
   Globe === Window ? "window" : (
    Globe === Worker ? "worker" : (
     cloudProcess?.argv[1]?.split("/").pop() === "framework.js" ? "build" : "server"
    )
   )

  function conditionalConsoleCall(VERBOSITY, DATA, METHOD = 'debug') {
   if (!IS_PRODUCTION && VERBOSITY <= BUILD_VERBOSITY)
    console[METHOD](...DATA)
  }

  if (ENVIRONMENT === "build")
   Framework.packRepository()
 }
 static packRepository() {
  openLog(0, "Building String Collection")

  if (ENVIRONMENT !== "build")
   throw 'Can\'t build framework from ' + ENVIRONMENT

  const
   { extname } = require('path'),
   { execSync: $ } = require('child_process'),
   { statSync: getItemStats,
    existsSync: itemExists,
    readdirSync: readFolder,
    readFileSync: readFile } = require('fs')

  let branchName
  let commitMessage
  let commitTag

  if (!process.env.VERCEL || process.env.__VERCEL_DEV_RUNNING) {
   branchName = $('git branch --show-current').toString().trim()
   commitMessage = $('git log -1').toString()
   commitTag = $('git log -1 --pretty=%s').toString().trim()
   BUILD_TAGS.push("local")
  } else {
   branchName = process.env.VERCEL_GIT_COMMIT_REF
   commitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE
   commitTag = commitMessage.slice(0, commitMessage.indexOf("\n"))
   IS_PRODUCTION = branchName === "main"
  }

  BUILD_TAGS.push(branchName)

  const semanticVersion = commitTag.split(".").map(x => parseInt(x))

  if (BUILD_TAGS.includes("local")) {
   if (semanticVersion[0] === 0) {
    if (BUILD_CHANGE === "major") {
     semanticVersion[1]++
     semanticVersion[2] = 0
    } else semanticVersion[2]++
   } else {
    if (BUILD_CHANGE === "major") {
     semanticVersion[0]++
     semanticVersion[1] = semanticVersion[2] = 0
    } else if (BUILD_CHANGE === "minor") {
     semanticVersion[1]++
     semanticVersion[2] = 0
    } else semanticVersion[2]++
   }
  }

  BUILD_TAGS.unshift(semanticVersion.join("."))

  const readRecursive = (host = "", folderPath = "dns-root", stringCollection = BUILD_STRING_COLLECTION) => {
   if (host) {
    if (host.length > 253)
     throw SyntaxError(`requested host is ${host.length} characters long, exceeding the maximum domain name length of 253. \n${host}`)
   }

   if (!itemExists(folderPath))
    throw new ReferenceError("can't pack nonexistent folder " + folderPath)

   const stringNames = []
   for (const itemName of readFolder(folderPath)) {
    const
     folderPath = ["dns-root", ...(host ? host.split(".").reverse() : [])].join('/'),
     filePath = folderPath + "/" + itemName
    if (itemExists(filePath)) {
     const stats = getItemStats(filePath)

     if (stats.isDirectory()) {
      openLog(2, `\x1b[38;5;27m/\x1b[38;5;75m${itemName}\x1b[38;5;27m\x1b[0m`)
      readRecursive(host ? itemName ? itemName + "." + host : host : itemName ?? "", filePath, stringCollection[itemName] = {})
      closeLog(2)
     } else if (stats.isFile())
      stringNames.push([itemName, filePath])
    }
   }

   for (const [stringName, stringPath] of stringNames) {
    try {
     if (!$(`git check-ignore -v ${stringPath}`).includes('.gitignore:')) throw 1
     log(2, `\x1b[38;5;27m/\x1b[38;5;239m${stringName} ignored\x1b[0m`)
    } catch {
     const
      extension = extname(stringPath),
      content = readFile(stringPath, ['.png', '.gif'].includes(extension) ? "base64" : "utf-8")
     log(2, `\x1b[38;5;28m/\x1b[38;5;76m${stringName}\x1b[38;5;28m"\x1b[0m`)
     stringCollection[stringName] = content
    }
   }
  }

  openLog(0, BUILD_TAGS.join("-") + " dns-root/")
  readRecursive()
  closeLog(0)
  /*
   // Future DNS resolution process...
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
 }
 static registerSourcePositionMarks() {
  Framework.sourcePositionMarks = {}
  Framework.sourcePositionMarkPatternRegister = /@[a-z-]+@/g
  Framework.sourcePositionMarkPatternAddLine = /^@[a-z-]+@/g

  for (let ln = 0; ln < Framework.sourceLines.length; ln++) {
   for (const { 0: mark, index: col } of Framework.sourceLines[ln].matchAll(Framework.sourcePositionMarkPatternRegister)) {
    if (mark in Framework.sourcePositionMarks)
     throw `Duplicate source position mark ${mark} in framework.js.`
    Framework.sourcePositionMarks[mark] = { ln, col }
   }
  }
 }

 // File creation and processing.
 static encodeSourceMap(DECODED_MAPPINGS) {
  const encoderAbsolutePosition = [0, 0, 0, 0, 0]
  return DECODED_MAPPINGS.map(decodedLine => (encoderAbsolutePosition[0] = 0, decodedLine.map(decodedSegment => {
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
     encodedSegment += Framework.sourceMapRadix[characterIndex]
    }
    return encodedSegment
   }).join('')
  }).join(","))).join(";")
 }
 static getStringCollection(HOST) {
  return HOST.split(".").reduceRight((stringCollection, subdomain) => stringCollection?.[subdomain] ?? {}, BUILD_STRING_COLLECTION)
 }

 // Creation of host-based part classes.
 constructor(HOST, CUSTOM_STRING_COLLECTION) {
  const framework = this

  if (typeof HOST !== "string")
   throw "host cannot be " + typeof HOST

  if (!/^[0-9a-z-]+(?:\.[0-9a-z-]+){1,}$/.test(HOST) && !/^localhost:\d+$/.test(HOST))
   throw "malformed host " + HOST

  if (!CUSTOM_STRING_COLLECTION) {

   if (HOST in Framework.frameworks)
    return Framework.frameworks[HOST]

   Framework.frameworks[HOST] = framework
  }

  framework.host = HOST
  framework.isCore = HOST === "core.parts"
  framework.domains = HOST.split(".").concat("dns-root")
  framework.pathToRepo = new Array(framework.domains.length).fill("..").join("/")
  framework.pathFromRepo = [...framework.domains].reverse().join("/")
  framework.stockStringCollection = Framework.getStringCollection(HOST)
  framework.customStringCollection = CUSTOM_STRING_COLLECTION ?? {}
  framework.MethodData = class {
   static identifierPattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/
   static fromMethodID(METHOD_ID) {
    this[METHOD_ID] = new this(METHOD_ID)
   }
   constructor(METHOD_ID) {
    const methodData = this
    methodData.methodID = METHOD_ID
    methodData.stringName = `${METHOD_ID}.js`
    methodData.isAuto = METHOD_ID.startsWith("auto-")
    methodData.content = methodData.isAuto ? `@auto-getter@return framework.readOwnString("${METHOD_ID.slice(5)}")` : framework.readOwnString(methodData.stringName)
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

    methodData.source = methodData.isAuto ? framework.buildSource : framework.sourceFile.addSource(methodData.stringName, methodData.content)
    methodData.lines = methodData.content ? methodData.content.split("\n") : []
    methodData.hasValidPropertyName = methodData.isSymbol || methodData.isGetOrSet || methodData.isAuto || framework.MethodData.identifierPattern.test(methodData.niceName)
    methodData.propertyReference = methodData.hasValidPropertyName ? methodData.niceName : `["${methodData.niceName}"]`
    methodData.propertyAccessor = methodData.propertyReference.startsWith("[") ? methodData.propertyReference : "." + methodData.niceName
    methodData.argumentString = "(" + (framework.partJSON[METHOD_ID]?.join(", ") ?? "") + ")"
    methodData.modifiers = methodData.isAsync ? "async " : (methodData.isGetOrSet ? METHOD_ID.slice(0, 3) + " " : (methodData.isAuto ? "get " : ""))
    methodData.signature = methodData.modifiers + methodData.propertyReference + methodData.argumentString

    if (methodData.content === undefined)
     return

    if (methodData.isAuto && framework.ownStringNameTable.has(`get-${METHOD_ID.slice(5)}.js`))
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
      // if (!hasSuper)
      //  warn(`${HOST} => ${METHOD_ID}()`, "doesn't call super.")
     }
    }

    framework.sourceFile.addLine(`@method-close@}`, framework.buildSource, null, null, " ")
   }
  }

  framework.ownStringNameTable = new Map(
   Object.keys(framework.stockStringCollection)
    .filter(itemName => typeof framework.stockStringCollection[itemName] === "string")
    .map(stringName => [stringName, framework.stockStringCollection])
    .concat(
     Object.keys(framework.customStringCollection)
      .map(stringName => [stringName, framework.customStringCollection])
    )
  )

  framework.ownGetAndSetMethodIDs = []
  framework.ownViewMethodIDs = []

  for (const stringName of framework.ownStringNameTable.keys()) {

   if (!stringName.endsWith(".js"))
    continue

   const methodID = stringName.slice(0, -3)

   if (stringName.startsWith("get-") || stringName.startsWith("set-"))
    framework.ownGetAndSetMethodIDs.push(methodID)
   else if (stringName.startsWith("view-"))
    framework.ownViewMethodIDs.push(methodID)
  }

  framework.renderedStrings = {}
  framework.sourceFile = new Framework.SourceMappedFile(framework.pathFromRepo, framework.pathToRepo, "compiled-type.js")
  framework.sourceFile.framework = framework
  framework.buildSource = framework.sourceFile.addSource(framework.pathToRepo + "/framework.js", framework.sourceCode)
  framework.stockPartJSON = JSON.parse(framework.stockStringCollection["part.json"] ?? "{}")
  framework.partJSON = Object.setPrototypeOf(JSON.parse(framework.customStringCollection["part.json"] ?? "{}"), framework.stockPartJSON)
  framework.parent = framework.isCore ? null : new Framework(framework.partJSON.extends ?? "one.core.parts")
  framework.depth = framework.isCore ? 0 : framework.parent.depth + 1

  if (!framework.isCore)
   Object.setPrototypeOf(framework.stockPartJSON, framework.parent.partJSON)

  framework.sourceFile.addLine("@eval-open@(()=>{", framework.buildSource)
  framework.addConstants(framework.sourceFile)
  // Convert kebab-case subdomain to PascalCase constructor name.
  framework.niceName = HOST.startsWith("localhost:") ? "LocalHostPart" : HOST.split(".")[0].split("-").map(word => word[0].toUpperCase() + word.slice(1)).join("") + "Part"
  framework.sourceFile.addSection(`@class-open@
 return class ${framework.niceName}${framework.isCore ? "" : " extends BasePart"} {
 // ${HOST}${framework.isCore ? "" : ` extends ${framework.parent.host}`}

 static framework = framework;
 static host = HOST;`, framework.buildSource)

  for (const methodID of framework.ownGetAndSetMethodIDs)
   framework.MethodData.fromMethodID(methodID)

  for (const methodID in framework.partJSON) {
   if (methodID === "extends")
    continue

   framework.MethodData.fromMethodID(methodID)
  }

  for (const methodID of framework.ownViewMethodIDs)
   framework.MethodData.fromMethodID(methodID)

  for (const stringName of framework.ownStringNameTable.keys())
   framework.MethodData.fromMethodID("auto-" + stringName)

  framework.sourceFile.addLine("@class-close@}", framework.buildSource)
  framework.sourceFile.addLine("@eval-close@})()", framework.buildSource)
  framework.script = framework.sourceFile.packAndMap()
  framework.PartConstructor = eval(framework.script)
  framework.PartConstructor.framework = framework

  if (framework.isCore) {
   globe.CorePart = framework.PartConstructor
  }
 }
 readString(STRING_NAME, FALLBACK) {
  const framework = this
  if (framework.ownStringNameTable.has(STRING_NAME))
   return framework.ownStringNameTable.get(STRING_NAME)[STRING_NAME]

  if (!framework.isCore)
   return framework.parent.readString(STRING_NAME, STRING_NAME)

  return FALLBACK
 }
 readOwnString(STRING_NAME, FALLBACK) {
  const framework = this
  if (framework.ownStringNameTable.has(STRING_NAME))
   return framework.ownStringNameTable.get(STRING_NAME)[STRING_NAME]

  return FALLBACK
 }
 addConstants(FILE) {
  const framework = this
  framework.parent?.addConstants(FILE)
  const stringName = "const-class.js"
  const pathPrefix = FILE === framework.sourceFile ? "" : FILE.pathToRepo + "/" + framework.pathFromRepo + "/"
  const path = pathPrefix + stringName
  const body = framework.readOwnString(stringName)

  if (body)
   FILE.addSection(body, FILE.addSource(path, body), 0, 0, " ")
 }
 collectConstants(FRAMEWORK, METHOD_DATA) {
  const framework = this
  const isForOwnScript = FRAMEWORK === framework

  if (isForOwnScript) {
   if (METHOD_DATA.content === "") {
    METHOD_DATA.content = "// Do nothing."
    METHOD_DATA.lines = [METHOD_DATA.content]
    return
   }
  }

  framework.parent?.collectConstants(FRAMEWORK, METHOD_DATA)

  function collectOwnConstants(STRING_NAME) {

   if (!framework.ownStringNameTable.has(STRING_NAME))
    return

   const pathPrefix = isForOwnScript ? "" : FRAMEWORK.pathToRepo + "/" + framework.pathFromRepo + "/"
   const path = pathPrefix + STRING_NAME
   const body = framework.readOwnString(STRING_NAME)
   const lines = body.split("\n")

   for (let ln = 0; ln < lines.length; ln++)
    new METHOD_DATA.Constant(path, lines[ln], ln)
  }

  collectOwnConstants("const-method.js")

  if (METHOD_DATA.isGetOrSet)
   collectOwnConstants("const-get-or-set.js")

  if (METHOD_DATA.isView)
   collectOwnConstants("const-view.js")
 }
}

Framework.initialize({
 BUILD_TAGS: [],
 BUILD_CHANGE: ["major", "minor", "patch"][2],
 BUILD_VERBOSITY: 10,
 BUILD_STRING_COLLECTION: {}
})