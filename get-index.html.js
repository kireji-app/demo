const iconDataURI = desktop.theme.render({
 request: "theme.png",
 fallback: "data:image/png;base64,iVBORw0KGgo=",
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
 `<style id="user-css">${_["inline.css"]}</style>` +
 `<style id="era-css">${desktop.era["inline.css"]}</style>` +
 `<style id="color-css">${desktop.color["inline.css"]}</style>` +
 `<style id="theme-css">${desktop.theme["theme.css"]}</style>`

const title =
 `<title>${desktop.theme.title ?? "Untitled App"}</title>`

const head =
 `<head>${title}${meta}${links}${styles}</head>`

const debugHTML = _.debug ?
 `<debug->` + (
  `<div><label for=debug-theme>Theme</label><select id=debug-theme>${desktop.themes.map(subpart =>
   `<option${subpart === desktop.theme ? ` selected` : ""}>${subpart.key}</option>`
  ).join("")}</select></div>` +
  `<div><label for=debug-color>Color Mode</label><select id=debug-color>${desktop.color.map(subpart =>
   `<option${subpart === desktop.color.arm ? ` selected` : ""}>${subpart.key}</option>`
  ).join("")}</select></div>` +
  `<div><label for=debug-era>Era</label><select id=debug-era>${desktop.era.map(subpart =>
   `<option${subpart === desktop.era.arm ? ` selected` : ""}>${subpart.key}</option>`
  ).join("")}</select></div>` +
  `<div><label for=debug-menu-clip>Menu Clip</label><select id=debug-menu-clip>${desktop.menu.map(subpart =>
   `<option${subpart === desktop.menu.arm ? ` selected` : ""}>${subpart.key}</option>`
  ).join("")}</select></div>` +
  `<div><label for=debug-menu-frame>Menu Frame</label><select id=debug-menu-frame>${new Array(Number(desktop.menu.arm.cardinality)).fill(0).map((__, index) =>
   `<option${BigInt(index) === desktop.menu.arm.routeID ? ` selected` : ""}>${index}</option>`
  ).join("")}</select></div>`
 ) +
 `</debug->` : ''

const bodyClassList = [desktop.era.arm.key]

if (desktop.menu.arm?.key === "open")
 bodyClassList.push("menu-fully-open")

if (desktop.menu.arm?.key !== "closed")
 bodyClassList.push("menu-pressed")

const body =
 `<body inert class="${bodyClassList.join(" ")}">${desktop["wallpaper.html"]}${debugHTML}<!-- windows -->${desktop["task-bar"]["inline.html"]}${worker["inline.html"]}</body>`

return `<!DOCTYPE html><html lang=en>${head}${body}</html>`