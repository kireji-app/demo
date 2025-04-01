class Framework {
 static { throw "no scope creep allowed" }
 // Debug logging.
 static log(VERBOSITY, ...DATA) {
  Framework.debug(VERBOSITY, DATA, 'log')
 }
 static warn(VERBOSITY, ...DATA) {
  Framework.debug(VERBOSITY, DATA, 'warn')
 }
 static debug(VERBOSITY, DATA, METHOD = 'debug') {
  if (!Framework.isProduction && VERBOSITY <= (Framework.verbosity ?? 0)) console[METHOD](...DATA)
 }
 static openLog(VERBOSITY, ...DATA) {
  Framework.debug(VERBOSITY, DATA, 'group')
 }
 static closeLog(VERBOSITY) {
  Framework.debug(VERBOSITY, [], 'groupEnd')
 }

 // Startup.
 static initialize(BUILD) {
  const {
   constructor: Globe,
   Window: Desktop,
   ServiceWorkerGlobalScope: Worker,
   cloudProcess
  } = Object.assign(globalThis, {
   BUILD,
   globe: globalThis,
   Part: class {
    constructor(...ARGS) {
     return new (new Framework(...ARGS).PartConstructor)()
    }
   }
  })

  Framework.environment =
   Globe === Desktop ? "desktop" : (
    Globe === Worker ? "worker" : (
     cloudProcess?.argv[1]?.split("/").pop() === "framework.mjs" ? "build" : "server"
    )
   )

  if (Framework.environment === "build")
   Framework.buildStringCollection()

  Framework.hosts = []
  Framework.verbosity = 0
  Framework.sourceCode = Framework.toString()
  Framework.sourceLines = Framework.sourceCode.split("\n")
  Framework.isProduction = !BUILD.tags.some(tag => ["dev", "local"].includes(tag))
  Framework.responses = {}
  Framework.frameworks = []
  Framework.maxPathLength = 2000
  Framework.sourceMapRadix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  Framework.pathSegmentRadix = Framework.sourceMapRadix.slice(0, -2) + "-_"
  Framework.maxSegmentLength = 250
  Framework.sourcePositionMarks = {}
  Framework.sourcePositionMarkPattern = /@[a-z-]+@/g
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
    if (Framework.isProduction) return
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

    const mark = string.match(Framework.sourcePositionMarkPattern)?.[0]

    if (mark) {
     string = string.slice(mark.length)
     ogLn = Framework.sourcePositionMarks[mark].ln
    }

    sourceFile.lines.push(indent + string)

    if (Framework.isProduction)
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
    const mark = lines[0].match(Framework.sourcePositionMarkPattern)?.[0]

    if (mark) {
     lines.shift()
     ogLn = Framework.sourcePositionMarks[mark].ln + 1
    }

    sourceFile.addLines(lines, srcIndex, ogLn, ogCol, indent, mapTokens)
   }
   packAndMap(url) {
    const sourceFile = this
    return sourceFile.lines.join("\n") + (Framework.isProduction ? "" : `
//${"#"} sourceMappingURL=data:application/json;charset=utf-8;base64,${Framework.btoaUnicode(sourceFile.getMap())}${url ? `
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
  Framework.sourceFile = Framework.SourceMappedFile("../", undefined, "portable.js")
  Framework.buildSource = Framework.sourceFile.addSource("framework.mjs", Framework.sourceCode)
  Framework.sourceFile.addSection(Framework.sourceCode, Framework.buildSource)
  Framework.sourceFile.addSection(`@init@\n\nFramework.initialize(${JSON.stringify(BUILD, null, 1)})`, Framework.buildSource)
  Framework.portableString = Framework.sourceFile.packAndMap()

  for (let ln = 0; ln < Framework.sourceLines.length; ln++) {
   for (const { 0: mark, index: col } of Framework.sourceLines[ln].matchAll(Framework.sourcePositionMarkPattern)) {
    if (mark in Framework.sourcePositionMarks)
     throw `Duplicate source position mark ${mark} in framework.mjs.`
    Framework.sourcePositionMarks[mark] = { ln, col }
   }
  }

  const traverse = (dir, currentDomainParts) => {
   let hasStrings = false

   for (const key in dir) {
    if (typeof dir[key] === 'object')
     traverse(dir[key], [key, ...currentDomainParts])
    else if (typeof dir[key] === 'string')
     hasStrings = true
   }

   if (hasStrings && currentDomainParts.length > 0)
    Framework.hosts.push(currentDomainParts.reverse().join('.'))
  }
  traverse(BUILD.stringCollection, [])

  new Part("root.core.parts")
 }
 static buildStringCollection() {
  Framework.openLog(0, "Building String Collection")

  if (Framework.environment !== "build")
   throw 'Can\'t build framework from environment ' + Framework.environment

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
   BUILD.tags.push("local")
  } else {
   branchName = process.env.VERCEL_GIT_COMMIT_REF
   commitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE
   commitTag = commitMessage.slice(0, commitMessage.indexOf("\n"))
  }

  if (branchName !== "main")
   BUILD.tags.push(branchName)

  const semanticVersion = commitTag.split(".").map(x => parseInt(x))

  if (BUILD.tags.includes("local")) {
   if (semanticVersion[0] === 0) {
    if (CHANGE === "major") {
     semanticVersion[1]++
     semanticVersion[2] = 0
    } else semanticVersion[2]++
   } else {
    if (CHANGE === "major") {
     semanticVersion[0]++
     semanticVersion[1] = semanticVersion[2] = 0
    } else if (CHANGE === "minor") {
     semanticVersion[1]++
     semanticVersion[2] = 0
    } else semanticVersion[2]++
   }
  }

  BUILD.tags.unshift(semanticVersion.join("."))

  const readRecursive = (host = "", folderPath = "dns-root", indent = "", tab = "  ", stringCollection = BUILD.stringCollection) => {
   if (host) {
    if (host.length > 253) throw SyntaxError(`requested host is ${host.length} characters long, exceeding the maximum domain name length of 253. \n${host}`)
    Framework.log(2, `\x1b[38;5;27m${indent}<host host="\x1b[38;5;75m${host}\x1b[38;5;27m">\x1b[0m`)
   } else {
    Framework.log(2, `\x1b[38;5;27m<hosts>\x1b[0m`)
   }
   if (!itemExists(folderPath)) throw new ReferenceError("can't pack nonexistent folder " + folderPath)
   for (const itemName of readFolder(folderPath)) {
    const
     folderPath = ["dns-root", ...(host ? host.split(".").reverse() : [])].join('/'),
     filePath = folderPath + "/" + itemName
    if (itemExists(filePath)) {
     const stats = getItemStats(filePath)
     if (stats.isDirectory()) {
      Framework.openLog(0, itemName)
      readRecursive(host ? itemName ? itemName + "." + host : host : itemName ?? "", filePath, indent + tab, tab, stringCollection[itemName] = {})
      Framework.closeLog(0, itemName)
     }
     else if (stats.isFile()) {
      try {
       if (!$(`git check-ignore -v ${filePath}`).includes('.gitignore:')) throw 1
       Framework.log(2, `\x1b[38;5;239m${indent}${tab}<source-sourceFile name="${itemName}" ignored />\x1b[0m`)
      } catch {
       const
        extension = extname(filePath),
        content = readFile(filePath, ['.png', '.gif'].includes(extension) ? "base64" : "utf-8")
       Framework.log(2, `\x1b[38;5;28m${indent}${tab}<source-sourceFile name="\x1b[38;5;76m${itemName}\x1b[38;5;28m" />\x1b[0m`)
       stringCollection[itemName] = content
      }
     }
    }
   }
   if (host) Framework.log(2, `\x1b[38;5;27m${indent}</host>\x1b[0m`)
   else Framework.log(2, `\x1b[38;5;27m</hosts>\x1b[0m`)
  }

  Framework.openLog(0, BUILD.tags.join("-") + " dns-root/")
  readRecursive()
  Framework.closeLog(0)
  /*
   // Future DNS resolution process...
   const { resolveTxt } = require('dns')
   const txt = host => new Promise(give => resolveTxt(host, (e, TXT) => e ? (Framework.log(0, e), process.exit(21)) : give(TXT)))
   const targetHost = "root.core.parts"
   txt(targetHost).then(TXT => {
    for (const txt of TXT) {
     if (txt[0].startsWith("part://")) {
      const
       { host: host, searchParams, hash } = new URL(txt.join("")),
       payload = { [targetHost + "/.host"]: host }
      if (searchParams.has("$1") || searchParams.has("$2")) {
       payload[targetHost + "/constructor.js"] = `super(${atob(searchParams.get("$1") ?? "")})\n${atob(searchParams.get("$2") ?? "")}`
      }
      Framework.log(payload)
      break
     }
    }
    process.exit(21)
   })
  */
  Framework.closeLog(0)
 }

 // File creation and processing.
 static headerOf(STRING_NAME) {
  let binary = false
  const extension = STRING_NAME.split(".").pop()
  return [{
   get "png"() { binary = true; return "image/png" },
   get "gif"() { binary = true; return "image/gif" },
   "svg": "image/svg+xml;charset=UTF-8",
   "js": "text/javascript;charset=UTF-8",
   "json": "application/json;charset=UTF-8",
   "html": "text/html;charset=UTF-8",
   "host": "text/plain"
  }[extension], binary, extension]
 }
 static btoaUnicode(BODY) {
  return btoa(new TextEncoder('utf-8').encode(BODY)
   .reduce((data, byte) => data + String.fromCharCode(byte), '')
  )
 }
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
  return HOST.split(".").slice(0, -1).reduceRight((stringCollection, subdomain) => stringCollection?.[subdomain] ?? {}, BUILD.stringCollection)
 }

 // Creation of host-based part classes.
 constructor(HOST, CUSTOM_STRING_COLLECTION) {
  const framework = this

  if (typeof HOST !== "string")
   throw "host cannot be " + typeof HOST

  if (!/^[0-9a-z-]+(?:\.[0-9a-z-]+){1,}$/.test(HOST))
   throw "malformed host " + HOST

  if (!CUSTOM_STRING_COLLECTION) {

   if (HOST in Framework.frameworks)
    return Framework.frameworks[HOST].PartConstructor

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
   framework = framework
   static fromMethodID(METHOD_ID) {
    this[METHOD_ID] = new this(METHOD_ID)
   }
   constructor(METHOD_ID) {
    const methodData = this
    methodData.stringName = `${METHOD_ID}.js`
    methodData.content = framework.readOwnString(methodData.stringName)
    methodData.isSymbol = METHOD_ID.startsWith("symbol-")
    methodData.niceName = (() => {
     if (METHOD_ID.includes("-")) {
      if (methodData.isSymbol)
       return `[Symbol.${METHOD_ID.slice(7)}]`
      let temp = METHOD_ID.split("-")
      const [firstWord] = temp.splice(1, 1)
      temp = temp.map(word => word[0].toUpperCase() + word.slice(1))
      temp.unshift(firstWord)
      return temp.join("")
     }
     return METHOD_ID
    })()

    if (methodData.content !== undefined)
     methodData.source = framework.sourceFile.addSource(methodData.stringName, methodData.content)

    if (METHOD_ID === "constructor") {
     const postConstructorStringName = "post-constructor.js"
     methodData.postContent = framework.readOwnString(postConstructorStringName)
     methodData.postSource = framework.sourceFile.addSource(postConstructorStringName, methodData.postContent)

     if (Framework.verbosity < 3 && methodData.content === undefined && methodData.postContent === undefined)
      return
    } else if (Framework.verbosity < 3 && methodData.content === undefined)
     return

    methodData.hasValidPropertyName = methodData.isSymbol || /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(methodData.niceName)
    methodData.propertyReference = methodData.hasValidPropertyName ? methodData.niceName : `["${methodData.niceName}"]`
    methodData.propertyAccessor = methodData.propertyReference.startsWith("[") ? methodData.propertyReference : "." + methodData.niceName
    methodData.argumentString = "(" + framework.partJSON[METHOD_ID].join(", ") + ")"
    methodData.modifiers = METHOD_ID.startsWith("async-") ? "async " : ""

    framework.sourceFile.addSection(`@method-open@\n\n ${methodData.modifiers}${methodData.propertyReference}${methodData.argumentString} {
  const THIS_METHOD_ID = "${METHOD_ID}";`, framework.buildSource)
    if (Framework.verbosity >= 3)
     framework.sourceFile.addLine(`@method-log-open@   Framework.openLog(\`\x1b[38;5;158mƒ part<${HOST}>${this.propertyAccessor}(${methodData.argumentString})\x1b[0m\`);`, framework.buildSource)

    if (METHOD_ID === "constructor") {
     if (methodData.content) {
      const lines = methodData.content.split("\n")
      for (let ln = 0; ln < lines.length; ln++)
       framework.sourceFile.addLine(lines[ln], methodData.source, ln, 0, "  ")
     } else if (!framework.isCore)
      framework.sourceFile.addLine(`@constructor-auto-super@super${framework.isCore ? "()" : methodData.argumentString}`, framework.buildSource, null, null, "  ", false)
     if (methodData.postContent !== undefined) {
      if (methodData.postContent === "")
       framework.sourceFile.addLines(`@do-nothing-constructor@  // Do nothing.`, Framework.buildSource)
      else {
       framework.addMethodScope(framework.sourceFile)
       framework.sourceFile.addLines(methodData.postContent.split("\n"), methodData.postSource, 0, 0, "  ")
      }
     }
    } else {
     let indent = "  "

     if (methodData.content !== "")
      framework.addMethodScope(framework.sourceFile, METHOD_ID.startsWith("view-"))
     else
      methodData.content = "// Do nothing."

     const methodLines = methodData.content.split("\n")

     if (framework.isCore)
      framework.sourceFile.addLines(methodLines, methodData.source, 0, 0, indent)
     else {
      if (["view-add", "view-populate"].includes(METHOD_ID)) {
       // For all of these view functions, we want to execute the core part's instructions first, then the next and then the next.
       framework.sourceFile.addLine(`@auto-super@super${methodData.propertyAccessor}();`, framework.buildSource, null, null, "  ", false)
       framework.sourceFile.addLines(methodLines, methodData.source, 0, 0, indent)
      } else if (["view-remove"].includes(METHOD_ID)) {
       // For these view functions, we want to execute the derived method's instructions first, then work our way toward the core.
       framework.sourceFile.addLines(methodLines, methodData.source, 0, 0, indent)
       framework.sourceFile.addLine(`@auto-super@super${methodData.propertyAccessor}();`, framework.buildSource, null, null, "  ", false)
      } else {
       let hasSuper = false
       methodLines.forEach((methodLine, ln) => {
        const firstMatch = [...methodLine.matchAll(/(?<=[^\w]|^)super\s*\(/g)][0]
        if (firstMatch) {
         hasSuper = true
         methodLine = methodLine.slice(0, firstMatch.index) + `super${methodData.propertyAccessor}(` + methodLine.slice(firstMatch.index + firstMatch[0].length)
         framework.sourceFile.addLine(methodLine, methodData.source, ln, 0, indent, false)
        } else
         framework.sourceFile.addLine(methodLine, methodData.source, ln, 0, indent)
       })
       if (!hasSuper)
        Framework.warn(0, "\x1b[38;5;100m" + 'warning ' + '\x1b[38;5;226m' + `${HOST} => ${METHOD_ID}()` + "\x1b[38;5;100m" + " doesn't call super." + "\x1b[0m")
      }
     }
    }

    if (Framework.verbosity >= 3)
     framework.sourceFile.addLine(`@method-log-close@;Framework.closeLog()`, framework.buildSource, null, null, indent)

    framework.sourceFile.addLine(`@method-close@}`, framework.buildSource, null, null, " ")
   }
  }

  framework.ownStringNameTable = Object.fromEntries(
   Object.keys(framework.stockStringCollection)
    .map(stringName => [stringName, framework.stockStringCollection])
    .concat(
     Object.keys(framework.customStringCollection)
      .map(stringName => [stringName, framework.customStringCollection])
    )
  )

  framework.ownRenderMethodIDs = Object.keys(framework.ownStringNameTable)
   .filter(stringName => stringName.endsWith(".js") && stringName.startsWith("render-"))

  framework.renderedStrings = {}
  framework.sourceFile = new Framework.SourceMappedFile(framework.pathFromRepo, framework.pathToRepo, "compiled-type.js")
  framework.sourceFile.framework = framework
  framework.buildSource = framework.sourceFile.addSource(framework.pathToRepo + "/framework.mjs", framework.sourceCode)
  framework.stockPartJSON = JSON.parse(framework.stockStringCollection["part.json"] ?? "{}")
  framework.partJSON = Object.setPrototypeOf(JSON.parse(framework.customStringCollection["part.json"] ?? "{}"), framework.stockPartJSON)
  framework.parent = framework.isCore ? null : new Framework(framework.partJSON.extends ?? "core.parts")

  if (!framework.isCore)
   Object.setPrototypeOf(framework.stockPartJSON, framework.parent.partJSON)

  framework.sourceFile.addLine("@eval-open@(()=>{", framework.buildSource)
  framework.addFrameworkScope(framework.sourceFile)
  framework.niceName = HOST.split(".")[0].split("-").map(word => word[0].toUpperCase() + word.slice(1)).join("") + "Part"
  framework.sourceFile.addSection(`@class-open@
 return class ${framework.niceName}${framework.isCore ? "" : " extends BasePart"} {
 
 // ${HOST}${framework.isCore ? "" : ` extends ${framework.parent.host}`}
 static framework = framework
 static host = HOST`, framework.buildSource)

  for (const METHOD_ID in framework.partJSON) {

   if (METHOD_ID === "extends")
    continue

   framework.MethodData.fromMethodID(METHOD_ID)
  }

  for (const METHOD_ID in framework.ownRenderMethodIDs) {
   framework.MethodData.fromMethodID(METHOD_ID)
  }

  framework.sourceFile.addLine("@class-close@}", framework.buildSource)
  framework.sourceFile.addLine("@eval-close@})()", framework.buildSource)
  framework.script = framework.sourceFile.packAndMap()
  framework.PartConstructor = eval(framework.script)
  framework.PartConstructor.framework = framework

  if (framework.isCore)
   globe.CorePart = framework.PartConstructor

  Framework.log(0, framework.PartConstructor.toString())
 }
 readString(STRING_NAME, FALLBACK) {
  const framework = this
  if (STRING_NAME in framework.ownStringNameTable)
   return framework.ownStringNameTable[STRING_NAME][STRING_NAME]

  if (!framework.isCore)
   return framework.parent.readString(STRING_NAME, STRING_NAME)

  return FALLBACK
 }
 readOwnString(STRING_NAME, FALLBACK) {
  const framework = this
  if (STRING_NAME in framework.ownStringNameTable)
   return framework.ownStringNameTable[STRING_NAME][STRING_NAME]

  return FALLBACK
 }
 addMethodScope(FILE, IS_VIEW) {
  const framework = this

  framework.parent?.addMethodScope(FILE, IS_VIEW)
  framework.addOwnScopeString("pre-method.js", FILE)

  if (IS_VIEW)
   framework.addOwnScopeString("pre-view.js", FILE)
 }
 addFrameworkScope(FILE) {
  const framework = this
  framework.parent?.addFrameworkScope(FILE)
  framework.addOwnScopeString("pre-class.js", FILE, " ")
 }
 addOwnScopeString(STRING_NAME, FILE, INDENT = "  ") {
  const framework = this
  const pathPrefix = FILE === framework.sourceFile ? "" : FILE.pathToRepo + "/" + framework.pathFromRepo + "/"
  const path = pathPrefix + STRING_NAME
  const body = framework.readOwnString(STRING_NAME)

  if (body)
   FILE.addSection(body, FILE.addSource(path, body), 0, 0, INDENT)
 }
}

Framework.initialize({
 tags: [],
 host: "www.desktop.parts",
 change: ["major", "minor", "patch"][0],
 stringCollection: {}
})