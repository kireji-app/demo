class Framework {
 static initialize(_BUILD) {
  Set_Static_Properties: {
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
     const encoderAbsolutePosition = [0, 0, 0, 0, 0]
     const mappings = DECODED_MAPPINGS.map(decodedLine => (encoderAbsolutePosition[0] = 0, decodedLine.map(decodedSegment => {
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
   Framework.sourceCode = Framework.toString()
   Framework.sourceLines = Framework.sourceCode.split("\n")
   Framework.responses = {}
   Framework.frameworks = []
   Framework.environments = ["build", "server", "worker", "window"]
   Framework.sourceMapRadix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  }
  Register_Source_Position_Marks: {
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
  Set_Global_Object: {
   const {
    constructor: Globe,
    Window,
    ServiceWorkerGlobalScope: Worker,
    process: cloudProcess
   } = Object.assign(globalThis, {
    _BUILD,
    globe: globalThis,
    IS_PRODUCTION: false,
    Part: class {
     constructor(INPUT) {
      if (typeof INPUT === "string")
       return new (new Framework(INPUT).PartConstructor)()

      throw 'other constructor forms are not yet supported'
     }
    },
    serialize(VALUE) {
     return JSON.stringify(VALUE, (k, v) => typeof v === "bigint" ? v.toString() + "n" : v, 1)
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

   globe.ENVIRONMENT_INDEX =
    Globe === Window ? 3 : (
     Globe === Worker ? 2 : (
      cloudProcess?.argv[1]?.split("/").pop() === "framework.js" ? 0 : 1
     )
    )

   globe.ENVIRONMENT = Framework.environments[ENVIRONMENT_INDEX]

   function conditionalConsoleCall(VERBOSITY, DATA, METHOD = 'debug') {
    if (!IS_PRODUCTION && VERBOSITY <= _BUILD.verbosity)
     console[METHOD](ENVIRONMENT_INDEX, ...DATA)
   }

   if (ENVIRONMENT === "build") {
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
    let commitHash

    if (!process.env.VERCEL || process.env.__VERCEL_DEV_RUNNING) {
     branchName = $('git branch --show-current').toString().trim()
     commitMessage = $('git log -1').toString()
     commitTag = $('git log -1 --pretty=%s').toString().trim()
     commitHash = $('git rev-parse HEAD').toString().trim()
     _BUILD.local = true
     $('git update-index --assume-unchanged api/serverless.js')
    } else {
     branchName = process.env.VERCEL_GIT_COMMIT_REF
     commitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE
     commitTag = commitMessage.slice(0, commitMessage.indexOf("\n"))
     commitHash = process.env.VERCEL_GIT_COMMIT_SHA
     IS_PRODUCTION = branchName === "main"
    }

    _BUILD.branch = branchName

    const semanticVersion = commitTag.split(".").map(x => parseInt(x))

    if (_BUILD.local) {
     if (semanticVersion[0] === 0) {
      if (_BUILD.change === "major") {
       semanticVersion[1]++
       semanticVersion[2] = 0
      } else semanticVersion[2]++
     } else {
      if (_BUILD.change === "major") {
       semanticVersion[0]++
       semanticVersion[1] = semanticVersion[2] = 0
      } else if (_BUILD.change === "minor") {
       semanticVersion[1]++
       semanticVersion[2] = 0
      } else semanticVersion[2]++
     }
    }

    _BUILD.hash = commitHash
    _BUILD.version = semanticVersion.join(".")
    _BUILD.message = commitMessage

    const readRecursive = (host = "", folderPath = "dns-root", stringCollection = _BUILD.stringCollection) => {
     // TODO: Don't read in large files.
     if (host) {
      if (host.length > 253)
       throw SyntaxError(`requested host is ${host.length} characters long, exceeding the maximum domain name length of 253. \n${host}`)
     }

     if (!itemExists(folderPath))
      throw new ReferenceError("Can't pack nonexistent folder " + folderPath)

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

    openLog(0, `Building version ${_BUILD.version}${_BUILD.local ? " (local)" : ""} from branch "${_BUILD.branch}".`)
    if (_BUILD.local && itemExists("api/serverless.js")) {
     log(0, "Existing build detected. Performing partial build.")
     const serverlessScript = readFile("api/serverless.js", "utf-8")
     // This string is split so it catch here.
     const openMark = "Framework.initialize" + "("
     const closeMark = ")"
     const closeIndex = 0 - closeMark.length
     const openIndex = serverlessScript.indexOf(openMark) + openMark.length

     if (openIndex < openMark.length)
      throw "Missing global object marker in existing build script."

     $(`git add --intent-to-add .`)
     const { stringCollection, hash } = JSON.parse(serverlessScript.slice(openIndex, closeIndex))
     for (const nameStatus of $(`git diff --name-status --untracked-files=all ${hash} -- dns-root/`).toString().trim().split("\n")) {
      const [fileStatus, changedStringPath] = nameStatus.split(/\s+/)
      if (changedStringPath.endsWith("/")) continue
      const extension = extname(changedStringPath)
      const path = changedStringPath.slice(9).split("/")
      const stringName = path.pop()
      let root = stringCollection
      for (const pathPart of path)
       root = root[pathPart] ??= {}
      switch (fileStatus) {
       case "A":
        root[stringName] = readFile(changedStringPath, ['.png', '.gif'].includes(extension) ? "base64" : "utf-8")
        log(2, `\x1b[38;5;34m/\x1b[38;5;82m${stringName}\x1b[38;5;34m - added \x1b[0m`)
        break;
       case "M":
        root[stringName] = readFile(changedStringPath, ['.png', '.gif'].includes(extension) ? "base64" : "utf-8")
        log(2, `\x1b[38;5;28m/\x1b[38;5;226m${stringName}\x1b[38;5;28m - modified \x1b[0m`)
        break;
       case "D":
        delete root[stringName];
        log(2, `\x1b[38;5;28m/\x1b[38;5;196m${stringName}\x1b[38;5;28m - deleted \x1b[0m`)
        break;
       case "C": // Copied
       case "R": // Renamed
       case "T": // Type-changed
       case "U": // Unmerged
       case "X": // Unknown
       case "B": // Broken pairing
        throw "Unsupported git diff status '" + fileStatus + "'."
      }
     }
     Object.assign(_BUILD.stringCollection, stringCollection)
    } else readRecursive()
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
   }
  }

  new Part("user.parts").distributeInitializePart()
 }
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
  framework.stockStringCollection = HOST.split(".").reduceRight((stringCollection, subdomain) => stringCollection?.[subdomain] ?? {}, _BUILD.stringCollection)
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
 readOwnString(STRING_NAME, FALLBACK) {
  const framework = this
  if (framework.ownStringNameTable.has(STRING_NAME))
   return framework.ownStringNameTable.get(STRING_NAME)[STRING_NAME]

  return FALLBACK
 }
}

Framework.initialize({
 "stringCollection": {},
 "change": "major",
 "verbosity": 10
})