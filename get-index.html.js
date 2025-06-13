const iconDataURI = root.parts.user.themes.arm.render({
 request: "theme.png",
 fallback: "data:image/png;base64,",
 format: "datauri"
})

const meta =
 `<meta name=robots content=noindex />` +
 `<meta name=viewport content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"/>`

const links =
 `<link rel="manifest"${worker["link-manifest.txt"]}/>` +
 `<link rel=icon href="${iconDataURI}"/>` +
 `<link rel="apple-touch-icon" href="${iconDataURI}"/>`

const styles =
 `<style id="user-css">${root.parts.user["inline.css"]}</style>` +
 `<style id="era-css">${root.parts.desktop.era["inline.css"]}</style>` +
 `<style id="color-css">${root.parts.desktop.color["inline.css"]}</style>` +
 `<style id="theme-css">${root.parts.user.themes.arm["theme.css"]}</style>`

const title =
 `<title>${root.parts.user.themes.arm.title}</title>`

const head =
 `<head>${title}${meta}${links}${styles}</head>`

const debugHTML = root.debug ?
 `<debug->` + (
  `<div><label for=debug-theme>Theme</label><select id=debug-theme>${root.parts.user.themes.map(subpart =>
   `<option${subpart === root.parts.user.themes.arm ? ` selected` : ""}>${subpart.key}</option>`
  ).join("")}</select></div>` +
  `<div><label for=debug-color>Color Mode</label><select id=debug-color>${root.parts.desktop.color.map(subpart =>
   `<option${subpart === root.parts.desktop.color.arm ? ` selected` : ""}>${subpart.key}</option>`
  ).join("")}</select></div>` +
  `<div><label for=debug-era>Era</label><select id=debug-era>${root.parts.desktop.era.map(subpart =>
   `<option${subpart === root.parts.desktop.era.arm ? ` selected` : ""}>${subpart.key}</option>`
  ).join("")}</select></div>` +
  `<div><label for=debug-menu-clip>Menu Clip</label><select id=debug-menu-clip>${root.parts.desktop.menu.map(subpart =>
   `<option${subpart === root.parts.desktop.menu.arm ? ` selected` : ""}>${subpart.key}</option>`
  ).join("")}</select></div>` +
  `<div><label for=debug-menu-frame>Menu Frame</label><select id=debug-menu-frame>${new Array(Number(root.parts.desktop.menu.arm.cardinality)).fill(0).map((_, index) =>
   `<option${BigInt(index) === root.parts.desktop.menu.arm.routeID ? ` selected` : ""}>${index}</option>`
  ).join("")}</select></div>`
 ) +
 `</debug->` : ''

const bodyClassList = [root.parts.desktop.era.arm.key]

if (root.parts.desktop.menu.arm?.key === "open")
 bodyClassList.push("menu-fully-open")

if (root.parts.desktop.menu.arm?.key !== "closed")
 bodyClassList.push("menu-pressed")

const body =
 `<body inert class="${bodyClassList.join(" ")}">${root.parts.user.themes["inline.html"]}${debugHTML}<!-- windows -->${root.parts.desktop["task-bar"]["inline.html"]}${worker["inline.html"]}</body>`

return `<!DOCTYPE html><html lang=en>${head}${body}</html>`