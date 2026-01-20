const bodyDeclarations = []
const earlies = {}

for (const [, host, filename] of BODY_HTML.matchAll(/data:image\/svg\+xml;inert;(.+?)\/(.+?),/g))
 (earlies[host] ??= new Set()).add(filename)

"".replace()

for (const [, host, filename] of HEAD_HTML.matchAll(/var\(--(.+?)--(.+?)\)/g))
 (earlies[host.replaceAll("-", ".").replaceAll("_", "-")] ??= new Set()).add(filename.replace("-", ".").replaceAll("_", "-"))

/* Early service images are valid for .png, .gif and .jpeg files only - additional extensions
   (like .jpg) will cause problems with the quick and dirty mime type determination here. */

return (
 earlyImageSources.map(([owner, filename]) => {
  if (earlies[owner.host]?.has(filename)) {
   const varName = `--${owner.host.replaceAll("-", "_").replaceAll(".", "-")}--${filename.replaceAll("-", "_").replaceAll(".", "-")}`
   bodyDeclarations.push(`${varName}: url(data:image/${filename.slice(-3)};base64,${owner["early-" + filename]});`)
   return `img[src*=";${owner.host}/${filename}"] { background: var(${varName}); background-size: 100%; animation: none }`
  }
  return ""
 }).join("") +
 `body {\n ${bodyDeclarations.join("\n ")}\n}`
)