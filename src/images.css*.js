const bodyDeclarations = []

return (
 imageSources.map(([owner, filename]) => {
  const varName = `--${owner.host.replaceAll("-", "_").replaceAll(".", "-")}--${filename.replaceAll("-", "_").replaceAll(".", "-")}`
  bodyDeclarations.push(`${varName}: url(data:image/${filename.slice(-3)};base64,${owner[filename]});`)
  return `img[src*=";${owner.host}/${filename}"] { background: var(${varName}); background-size: 100%; animation: none }`
 }).join("") +
 `body {\n ${bodyDeclarations.join("\n ")}\n}`
)