import { extname } from 'path'
import { execSync as $ } from 'child_process'
import {
 rmSync as removeItem,
 statSync as getItemStats,
 existsSync as itemExists,

 mkdirSync as makeFolder,
 readdirSync as readFolder,

 readFileSync as readFile,
 writeFileSync as writeFile,
} from 'fs'

// Enable debug logging and source mapping.
class Debug {
 static isVerbose = false
 static isDebug = true
 static log(...data) { if (this.isDebug && this.isVerbose) console.log(...data) }
 static vlqBase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
 static encodeSourceMap(decodedMappings) {
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
     encodedSegment += Debug.vlqBase[characterIndex]
    }
    return encodedSegment
   }).join('')
  }).join(","))).join(";")
 }
 static decodeSourceMap(encodedMappings) {
  const decoderAbsolutePosition = [0, 0, 0, 0, 0]
  return encodedMappings.split(';').map(encodedLine => (decoderAbsolutePosition[0] = 0, encodedLine.split(',').map(encodedSegment => {
   const decodedSegment = []
   let absoluteDecodedPlace = []
   for (const character of encodedSegment) {
    const characterIndex = Debug.vlqBase.indexOf(character)
    absoluteDecodedPlace.push(characterIndex)
    if (!(characterIndex & 32)) {
     decodedSegment.push(absoluteDecodedPlace.reduceRight((x, characterIndex, i) => i === 0 ? (characterIndex & 1 ? -1 : 1) * x << 4 | ((characterIndex >>>= 1) & 15) : x << 5 | (characterIndex & 31), 0))
     absoluteDecodedPlace = []
    }
   }
   return decodedSegment.map((signedRelativeDecodedPlace, i) => decoderAbsolutePosition[i] += signedRelativeDecodedPlace)
  })))

 }
 static mapLineTokens(lines, srcIndex, ogLn = 0, ogCol = 0, newCol = 0) {
  return lines.map((string, ln) => [...string.matchAll(/\w+|\s+|\W+/g)].map(({ index: col }) => [newCol + col, srcIndex, ogLn + ln, ogCol + col]))
 }
 static createMappedFile(file) {
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
   packAndMap(givenURL) {
    return this.lines.join("\n") + (Debug.isDebug ? `
//${"#"} sourceMappingURL=data:application/json;charset=utf-8;base64,${btoa(this.getMap())}${givenURL ? `
//${"#"} sourceURL=${givenURL}` : ""}` : "")
   },
   getMap() {
    const mappings = Debug.encodeSourceMap(this.mappings)
    return JSON.stringify({
     version: 3,
     file,
     sourceRoot: "../",
     sources: this.sources,
     names: [],
     sourcesContent: this.scripts,
     mappings,
    }, null, 1)
   }
  }
 }
}

// Archive source files.
const archive = {}
const sources = ["build.js", "build-src/boot.js", "build-src/index.html"]
const tab = "  "
function addToArchive(uid, folderPath, indent = "") {
 if (uid) {
  if (uid.length > 253) throw SyntaxError(`requested UID is ${uid.length} characters long, exceeding the maximum domain name length of 253. \n${uid}`)
  Debug.log(`\x1b[38;5;27m${indent}<uid host="\x1b[38;5;75m${uid}\x1b[38;5;27m">\x1b[0m`)
  archive[uid] = {}
 } else {
  Debug.log(`\x1b[38;5;27m<uids>\x1b[0m`)
 }
 if (!itemExists(folderPath)) throw new ReferenceError("can't pack nonexistent folder " + folderPath)
 for (const itemname of readFolder(folderPath)) {
  const
   folderPath = ["domain-root", ...(uid ? uid.split(".").reverse() : [])].join('/'),
   filePath = folderPath + "/" + itemname
  if (itemExists(filePath)) {
   const stats = getItemStats(filePath)
   if (stats.isDirectory()) addToArchive(uid ? itemname ? itemname + "." + uid : uid : itemname ?? "", filePath, indent + tab)
   else if (stats.isFile()) {
    try {
     if (!$(`git check-ignore -v ${filePath}`).includes('.gitignore:')) throw 1
     Debug.log(`\x1b[38;5;239m${indent}${tab}<file name="${itemname}" ignored />\x1b[0m`)
    } catch {
     const
      extension = extname(filePath),
      content = readFile(filePath, ['.png'].includes(extension) ? "base64" : "utf-8")
     Debug.log(`\x1b[38;5;28m${indent}${tab}<file name="\x1b[38;5;76m${itemname}\x1b[38;5;28m" />\x1b[0m`)
     archive[uid][itemname] = content
    }
   }
  }
 }
 if (uid) Debug.log(`\x1b[38;5;27m${indent}</uid>\x1b[0m`)
 else Debug.log(`\x1b[38;5;27m</uids>\x1b[0m`)
}
addToArchive("", "domain-root")

// Publish static web files.
const buildName = (() => {
 const tags = []
 let branchName, commitMessage, commitTag
 if (!process.env.VERCEL || process.env.__VERCEL_DEV_RUNNING) {
  branchName = $('git branch --show-current').toString().trim()
  commitMessage = $('git log -1').toString()
  commitTag = $('git log -1 --pretty=%s').toString().trim()
  tags.push("local")
 } else {
  branchName = process.env.VERCEL_GIT_COMMIT_REF
  commitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE
  commitTag = commitMessage.slice(0, commitMessage.indexOf("\n"))
 }
 if (branchName !== "main") tags.push(branchName)
 tags.unshift(commitTag)
 return tags.join("-")
})()
const scriptSource = "sw.js"
const indexURL = "build-src/index.html"
const indexContent = readFile(indexURL, "utf-8")

// Generate or clear output folder.
if (itemExists("public")) {
 Debug.log(`\x1b[38;5;158merase existing published files\x1b[0m`)
 removeItem("public", { recursive: true, force: true })
}
makeFolder("public")

// Generate index.html.
Debug.log(`\x1b[38;5;158mwrite public/index.html\x1b[0m`)
writeFile("public/index.html", indexContent.replace("$scriptSource", scriptSource))

// Generate sw.js.
Debug.log(`\x1b[38;5;158mwrite public/${scriptSource}\x1b[0m`)
const buildURL = "build.js"
const buildContent = readFile(buildURL, "utf-8")
const mappedFile = Debug.createMappedFile(scriptSource)
const buildSource = mappedFile.addSource(buildURL, buildContent)
mappedFile.addLine("function boot() {", buildSource, 189, 21)
mappedFile.addLines(Debug.toString().split("\n"), buildSource, 16, 0, " ")
mappedFile.addLines([
 `types = {},`,
 `baseUid = "unit.core.parts",`,
 `archive = ${JSON.stringify(archive)},`,
 `indexHTML = ${JSON.stringify(indexContent.replace("$scriptSource", "client.js"))},`,
 `buildName = ${JSON.stringify(buildName)}`,
 `scriptSource = ${JSON.stringify(scriptSource)},`,
 `AsyncFunction = async function () { }.constructor`
], buildSource, 192, 2, "  ", false)
const bootURL = "build-src/boot.js"
const bootContent = readFile(bootURL, "utf-8")
const bootSource = mappedFile.addSource(bootURL, bootContent)
mappedFile.addLines(bootContent.split("\n"), bootSource)
mappedFile.addLine("}", buildSource, 204, 21)
mappedFile.addLine("boot()", buildSource, 205, 21)
writeFile("public/" + scriptSource, mappedFile.packAndMap())