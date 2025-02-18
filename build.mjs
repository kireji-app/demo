import { extname } from 'path'
import { execSync as $ } from 'child_process'
import {
 rmSync as removeItem,
 statSync as getItemStats,
 existsSync as itemExists,
 mkdirSync as makeFolder,
 readdirSync as readFolder,
 readFileSync as readFile,
 writeFileSync as writeFile
} from 'fs'
class Build {
 static src = "sw.js"
 static types = {}
 static baseUID = "type.core.parts"
 static domainRoot = "domain-root"
 static vlqBase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
 static isVerbose = false
 static indexHTML = `<!DOCTYPE html><html lang=en><head><link rel=manifest /><link rel=icon href="data:image/png;base64,iVBORw0KGgo="><link rel="apple-touch-icon" href="data:image/png;base64,iVBORw0KGgo="><meta name=robots content=noindex /><meta name=viewport content="width=device-width,initial-scale=0.8" /><script defer src=${this.src}></script></head></html>`
 static log(...data) {
  if (this.tags.includes("dev") && this.isVerbose) console.log(...data)
 }
 static type(uidTemplate, options) {
  const uid = options ? uidTemplate.join(options["index.txt"] ?? "") : uidTemplate[0]
  if (uid in this.types) return this.types[uid]
  this.log(`\x1b[38;5;32m<class uid="\x1b[38;5;78m${uid}\x1b[38;5;32m" />\x1b[0m`)
  const resolve = filename => {
   let has = false,
    result = undefined
   if (options && filename in options) {
    has = true
    result = options[filename]
   } else {
    result = this.archive[uid]?.[filename]
    if (result !== undefined) has = true
   }
   return [has, result]
  }
  const isBase = uid === this.baseUID
  const subdomain = uid.split(".")[0]
  const [overridesType, resolvedType] = resolve("type.uid")
  const resolvedBaseUID = overridesType ? resolvedType : this.baseUID
  const TBase = isBase ? Array : this.type([resolvedBaseUID])
  const [overridesConstructor, constructorBody] = resolve("define.js")
  const [overridesConstructorArguments, constructorArgumentsBody] = resolve("define.args")
  const constructorArguments = overridesConstructorArguments ? constructorArgumentsBody.match(/(?<=^\s*).+?(?=\s*$)/gm) : isBase ? [] : TBase.constructorArguments
  const domains = uid.split(".").concat(this.domainRoot).reverse()
  const mappedFile = this.emptyFile("class.js", domains.join("/"))
  const buildSource = mappedFile.addSource(new Array(domains.length).fill("..").concat("build.js").join("/"))
  mappedFile.addLine(`(class ${subdomain.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')} extends ${isBase ? "Array" : `this.type(["${resolvedBaseUID}"])`} {`, buildSource, 52, 22, "", false)
  mappedFile.addLines([
   `static get uid() { return uid }`,
   `static get constructorArguments() { return constructorArguments }`,
   `static get subdomain() { return subdomain }`
  ], buildSource, 54, 4, " ")
  if (overridesConstructor) {
   mappedFile.addLine(`constructor(${constructorArguments.join(", ")}) {`, buildSource, 59, 22, " ", false)
   if (constructorBody) {
    const constructorURL = "define.js"
    const constructorSource = mappedFile.addSource(constructorURL, constructorBody)
    mappedFile.addLines(constructorBody.split("\n"), constructorSource, 0, 0, "  ")
   }
   mappedFile.addLine(`}`, buildSource, 65, 24, " ")
  }
  for (const [methodName, methodArguments = []] of [
   ["propagateRootward", ["...instances"]],
   ["propagateLeafward", ["state"]],
   ["install"],
   ["uninstall"],
   ["setState", ["state"]]
  ]) {
   const [overridesMethod, methodContent] = resolve(`${methodName}.js`)
   if (!overridesMethod) continue
   mappedFile.addLine(`async ${methodName}(${methodArguments.join(", ")}) {`, buildSource, 76, 23, " ", false)
   if (this.isVerbose)
    mappedFile.addLine(`console.groupCollapsed(\`\x1b[38;5;158m${uid} => ${methodName}()\x1b[0m\`);`, buildSource, 78, 24, "  ", false)
   const methodURL = methodName + ".js"
   const methodSource = mappedFile.addSource(methodURL, methodContent)
   const methodLines = methodContent.split("\n")
   if (isBase)
    mappedFile.addLines(methodLines, methodSource, 0, 0, "  ")
   else {
    if (methodName === "uninstall" || methodName === "install") {
     mappedFile.addLine(`await super.${methodName}();`, buildSource, 86, 25, "  ", false)
     mappedFile.addLines(methodLines, methodSource, 0, 0, "  ")
    } else {
     let hasSuper = false
     methodLines.forEach((methodLine, ln) => {
      const firstMatch = [...methodLine.matchAll(/(?<=[^\w]|^)super\s*\(/g)][0]
      if (firstMatch) {
       hasSuper = true
       methodLine = methodLine.slice(0, firstMatch.index) + `await super.${methodName}(` + methodLine.slice(firstMatch.index + firstMatch[0].length)
       mappedFile.addLine(methodLine, methodSource, ln, 0, "  ", false)
      } else
       mappedFile.addLine(methodLine, methodSource, ln, 0, "  ")
     })
     if (!hasSuper) console.warn(`\x1b[38;5;100mwarning \x1b[38;5;226m${uid} => ${methodName}()\x1b[38;5;100m doesn't call super.\x1b[0m`)
    }
   }
   if (this.isVerbose)
    mappedFile.addLine(`;console.groupEnd()`, buildSource, 103, 24, "  ")
   mappedFile.addLine(`}`, buildSource, 104, 23, " ")
  }
  mappedFile.addLine("})", buildSource, 106, 22)
  return this.types[uid] = eval(mappedFile.packAndMap())
 }
 static instance(uid) {
  return new (this.type([uid]))()
 }
 static emptyFile(file, sourceRoot) {
  return {
   lines: [],
   mappings: [],
   sources: [],
   scripts: [],
   addLine(string, srcIndex, ogLn = 0, ogCol = 0, indent = "", mapTokens = true) {
    this.lines.push(indent + string)
    if (string && mapTokens) this.mappings.push([...string.matchAll(/\w+|\s+|\W+/g)].map(({ index: col }) => [indent.length + col, srcIndex, ogLn, ogCol + col]))
    else this.mappings.push([[indent.length, srcIndex, ogLn, ogCol]])
   },
   addLines(strings, srcIndex, ogLn = 0, ogCol = 0, indent = "", mapTokens = true) {
    strings.forEach((string, ln) => this.addLine(string, srcIndex, ogLn + ln, ogCol, indent, mapTokens))
   },
   addSource(source, script = null) {
    let srcIndex = this.sources.indexOf(source)
    if (srcIndex === -1) {
     srcIndex = this.sources.length
     this.sources.push(source)
     this.scripts.push(null)//script)
    }
    return srcIndex
   },
   packAndMap(url) {
    return this.lines.join("\n") + (Build.tags.includes("dev") ? `
//${"#"} sourceMappingURL=data:application/json;charset=utf-8;base64,${btoa(this.getMap())}${url ? `
//${"#"} sourceURL=${url}` : ""}` : "")
   },
   getMap() {
    const mappings = Build.#encodeSourceMap(this.mappings)
    return JSON.stringify({
     version: 3,
     file,
     sourceRoot,
     sources: this.sources,
     names: [],
     sourcesContent: this.scripts,
     mappings,
    }, null, 1)
   }
  }
 }
 static script(filename) {
  const mappedFile = this.emptyFile(filename, "../")
  const buildSource = mappedFile.addSource("build.js", null)
  mappedFile.addLines(this.toString().split("\n"), buildSource, 12, 0, " ")
  mappedFile.addLines([
   `Build.tags = ${JSON.stringify(this.tags)}`,
   `Build.archive = ${JSON.stringify(this.archive)}`,
   `Build.instance("root.core.parts").install()`,
  ], buildSource, 159, 4, "", false)
  return mappedFile.packAndMap()
 }
 static #encodeSourceMap(decodedMappings) {
  const encoderAbsolutePosition = [0, 0, 0, 0, 0]
  return decodedMappings.map(decodedLine => (encoderAbsolutePosition[0] = 0, decodedLine.map(decodedSegment => {
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
      characterIndex = (unsignedRelativeDecodedPlace & 15) * 2 + !Object.is(signedRelativeDecodedPlace, unsignedRelativeDecodedPlace)
      unsignedRelativeDecodedPlace >>>= 4
     } else {
      characterIndex = unsignedRelativeDecodedPlace & 31
      unsignedRelativeDecodedPlace >>>= 5
     }
     if (unsignedRelativeDecodedPlace > 0) characterIndex |= 32
     encodedSegment += this.vlqBase[characterIndex]
    }
    return encodedSegment
   }).join('')
  }).join(","))).join(";")
 }
 static #decodedSourceMap(encodedMappings) {
  const decoderAbsolutePosition = [0, 0, 0, 0, 0]
  return encodedMappings.split(';').map(encodedLine => (decoderAbsolutePosition[0] = 0, encodedLine.split(',').map(encodedSegment => {
   const decodedSegment = []
   let absoluteDecodedPlace = []
   for (const character of encodedSegment) {
    const characterIndex = this.vlqBase.indexOf(character)
    absoluteDecodedPlace.push(characterIndex)
    if (!(characterIndex & 32)) {
     decodedSegment.push(absoluteDecodedPlace.reduceRight((x, characterIndex, i) => i === 0 ? (characterIndex & 1 ? -1 : 1) * x << 4 | ((characterIndex >>>= 1) & 15) : x << 5 | (characterIndex & 31), 0))
     absoluteDecodedPlace = []
    }
   }
   return decodedSegment.map((signedRelativeDecodedPlace, i) => decoderAbsolutePosition[i] += signedRelativeDecodedPlace)
  })))

 }
}
Build.tags = (() => {
 const result = []
 let branchName, commitMessage, commitTag
 if (!process.env.VERCEL || process.env.__VERCEL_DEV_RUNNING) {
  branchName = $('git branch --show-current').toString().trim()
  commitMessage = $('git log -1').toString()
  commitTag = $('git log -1 --pretty=%s').toString().trim()
  result.push("dev")
 } else {
  branchName = process.env.VERCEL_GIT_COMMIT_REF
  commitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE
  commitTag = commitMessage.slice(0, commitMessage.indexOf("\n"))
 }
 if (branchName !== "main") result.push(branchName)
 result.unshift(commitTag)
 return result
})()
Build.archive = (() => {
 const result = {}
 const readRecursive = (uid, folderPath, indent = "", tab = "  ") => {
  if (uid) {
   if (uid.length > 253) throw SyntaxError(`requested UID is ${uid.length} characters long, exceeding the maximum domain name length of 253. \n${uid}`)
   Build.log(`\x1b[38;5;27m${indent}<uid host="\x1b[38;5;75m${uid}\x1b[38;5;27m">\x1b[0m`)
   result[uid] = {}
  } else {
   Build.log(`\x1b[38;5;27m<uids>\x1b[0m`)
  }
  if (!itemExists(folderPath)) throw new ReferenceError("can't pack nonexistent folder " + folderPath)
  for (const itemname of readFolder(folderPath)) {
   const
    folderPath = [Build.domainRoot, ...(uid ? uid.split(".").reverse() : [])].join('/'),
    filePath = folderPath + "/" + itemname
   if (itemExists(filePath)) {
    const stats = getItemStats(filePath)
    if (stats.isDirectory()) readRecursive(uid ? itemname ? itemname + "." + uid : uid : itemname ?? "", filePath, indent + tab)
    else if (stats.isFile()) {
     try {
      if (!$(`git check-ignore -v ${filePath}`).includes('.gitignore:')) throw 1
      Build.log(`\x1b[38;5;239m${indent}${tab}<file name="${itemname}" ignored />\x1b[0m`)
     } catch {
      const
       extension = extname(filePath),
       content = readFile(filePath, ['.png'].includes(extension) ? "base64" : "utf-8")
      Build.log(`\x1b[38;5;28m${indent}${tab}<file name="\x1b[38;5;76m${itemname}\x1b[38;5;28m" />\x1b[0m`)
      result[uid][itemname] = content
     }
    }
   }
  }
  if (uid) Build.log(`\x1b[38;5;27m${indent}</uid>\x1b[0m`)
  else Build.log(`\x1b[38;5;27m</uids>\x1b[0m`)
 }
 readRecursive("", Build.domainRoot)
 /*
  const { resolveTxt } = require('dns')
  const txt = host => new Promise(resolve => resolveTxt(host, (e, TXT) => e ? (console.error(e), process.exit(21)) : resolve(TXT)))
  const targetUid = "root.core.parts"
  txt(targetUid).then(TXT => {
   for (const txt of TXT) {
    if (txt[0].startsWith("part://")) {
     const
      { host: uid, searchParams, hash } = new URL(txt.join("")),
      payload = { [targetUid + "/.host"]: uid }
     if (searchParams.has("$1") || searchParams.has("$2")) {
      payload[targetUid + "/define.js"] = `super(${atob(searchParams.get("$1") ?? "")})\n${atob(searchParams.get("$2") ?? "")}`
     }
     console.log(payload)
     break
    }
   }
   process.exit(21)
  })
 */
 return result
})()

if (itemExists("public")) removeItem("public", { recursive: true, force: true })
makeFolder("public")
writeFile("public/index.html", Build.indexHTML)
writeFile("public/" + Build.src, Build.script())