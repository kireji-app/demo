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