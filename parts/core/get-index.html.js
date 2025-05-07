const iconDataURI = theme.arm.render({
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
 `<style id="user-css">${user["inline.css"]}</style>` +
 `<style id="vintage-mode-css">${vintageMode["inline.css"]}</style>` +
 `<style id="color-mode-css">${colorMode["inline.css"]}</style>` +
 `<style id="theme-css">${theme.arm["theme.css"]}</style>`

const title =
 `<title>${theme.arm.title}</title>`

const head =
 `<head>${title}${meta}${links}${styles}</head>`

const debugHTML =
 `<debug->` + (
  `<div><label for=debug-theme>Theme</label><select id=debug-theme>${theme.map(subpart =>
   `<option${subpart === theme.arm ? ` selected` : ""}>${subpart.key}</option>`
  ).join("")}</select></div>` +
  `<div><label for=debug-color-mode>Color Mode</label><select id=debug-color-mode>${colorMode.map(subpart =>
   `<option${subpart === colorMode.arm ? ` selected` : ""}>${subpart.key}</option>`
  ).join("")}</select></div>` +
  `<div><label for=debug-vintage-mode>Vintage Mode</label><select id=debug-vintage-mode>${vintageMode.map(subpart =>
   `<option${subpart === vintageMode.arm ? ` selected` : ""}>${subpart.key}</option>`
  ).join("")}</select></div>` +
  `<div><label for=debug-menu-clip>Menu Clip</label><select id=debug-menu-clip>${menu.map(subpart =>
   `<option${subpart === menu.arm ? ` selected` : ""}>${subpart.key}</option>`
  ).join("")}</select></div>` +
  `<div><label for=debug-menu-frame>Menu Frame</label><select id=debug-menu-frame>${new Array(Number(menu.arm.cardinality)).fill(0).map((_, index) =>
   `<option${BigInt(index) === menu.arm.routeID ? ` selected` : ""}>${index}</option>`
  ).join("")}</select></div>`
 ) +
 `</debug->`

const bodyClassList = []

if (menu.arm?.key === "open")
 bodyClassList.push("menu-fully-open")

if (menu.arm?.key !== "closed")
 bodyClassList.push("menu-pressed")

const body =
 `<body inert class="${bodyClassList.join(" ")}">${theme["inline.html"]}${debugHTML}<!-- windows -->${taskBar["inline.html"]}${worker["inline.html"]}</body>`

return `<!DOCTYPE html><html lang=en>${head}${body}</html>`