function getPartConstructor(uidTemplate, options) {
 const uid = options ? uidTemplate.join(options["index.txt"] ?? "") : uidTemplate[0]
 if (uid in types) return types[uid]
 Debug.log(`\x1b[38;5;32m<class uid="\x1b[38;5;78m${uid}\x1b[38;5;32m" />\x1b[0m`)
 function resolve(filename) {
  let has = false,
   result = undefined
  if (options && filename in options) {
   has = true
   result = options[filename]
  } else {
   result = archive[uid]?.[filename]
   if (result !== undefined) has = true
  }
  return [has, result]
 }
 const isBase = uid === baseUid
 const subdomain = uid.split(".")[0]
 const [overridesPart, resolvedPart] = resolve(".unit")
 const resolvedBaseUid = overridesPart ? resolvedPart : baseUid
 const TBase = isBase ? Array : getPartConstructor([resolvedBaseUid])
 const [overridesConstructor, constructorBody] = resolve("define.js")
 const [overridesConstructorArguments, constructorArgumentsBody] = resolve("define.args")
 const constructorArguments = overridesConstructorArguments ? constructorArgumentsBody.match(/(?<=^\s*).+?(?=\s*$)/gm) : isBase ? [] : TBase.constructorArguments
 const mappedFile = Debug.createMappedFile(scriptSource)
 const bootSource = mappedFile.addSource("build-src/boot.js")
 mappedFile.addLine(`(class ${subdomain.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')} extends ${isBase ? "Array" : `getPartConstructor(["${resolvedBaseUid}"])`} {`, bootSource, 29, 21, "", false)
 mappedFile.addLines([
  `static get uid() { return uid }`,
  `static get constructorArguments() { return constructorArguments }`,
  `static get subdomain() { return subdomain }`
 ], bootSource, 31, 3, " ")
 if (isBase)
  mappedFile.addLine("static define = uid => new (getPartConstructor([uid]))()")
 if (overridesConstructor) {
  mappedFile.addLine(`constructor(${constructorArguments.join(", ")}) {`, bootSource, 37, 22, " ", false)
  if (constructorBody) {
   const constructorURL = ["domain-root", ...uid.split(".").reverse(), "define.js"].join("/")
   const constructorSource = mappedFile.addSource(constructorURL, constructorBody)
   mappedFile.addLines(constructorBody.split("\n"), constructorSource, 0, 0, "  ")
  }
  mappedFile.addLine(`}`, bootSource, 43, 22, " ")
 }
 for (const [methodName, methodArguments = []] of [
  ["propagateRootward", ["...parts"]],
  ["propagateLeafward", ["state"]],
  ["install"],
  ["uninstall"],
  ["setState", ["state"]]
 ]) {
  const [overridesMethod, methodContent] = resolve(`${methodName}.js`)
  if (!overridesMethod) continue
  mappedFile.addLine(`async ${methodName}(${methodArguments.join(", ")}) {`, bootSource, 53, 22, " ", false)
  if (Debug.isVerbose)
   mappedFile.addLine(`console.groupCollapsed(\`\x1b[38;5;158m${uid} => ${methodName}()\x1b[0m\`);`, bootSource, 55, 22, "  ", false)
  const methodURL = ["domain-root", ...uid.split(".").reverse(), methodName + ".js"].join("/")
  const methodSource = mappedFile.addSource(methodURL, methodContent)
  const methodLines = methodContent.split("\n")
  if (isBase)
   mappedFile.addLines(methodLines, methodSource, 0, 0, "  ")
  else {
   if (methodName === "uninstall" || methodName === "install") {
    mappedFile.addLine(`await super.${methodName}();`, bootSource, 63, 25, "  ", false)
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
  if (Debug.isVerbose)
   mappedFile.addLine(`;console.groupEnd()`, bootSource, 80, 23, "  ")
  mappedFile.addLine(`}`, bootSource, 81, 22, " ")
 }
 mappedFile.addLine("})", bootSource, 83, 21)
 return types[uid] = eval(mappedFile.packAndMap(uid + ".js"))
}
const Unit = getPartConstructor([baseUid])
const Root = Unit.define("root.core.parts")
Root.install()