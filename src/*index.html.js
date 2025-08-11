const placeholderIcon = _.application.placeholderImage("part.png")

const meta =
 `<meta name=robots content=noindex />` +
 `<meta name=viewport content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"/>` /*+
 `<meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)">` +
 `<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">`*/

const links =
 `<link rel="manifest"${worker["link-manifest.txt"]}/>` +
 `<link class=favicon rel=icon href="${placeholderIcon}"/>` +
 `<link class=favicon rel="apple-touch-icon" href="${placeholderIcon}"/>`

const styles =
 `<style id="user-css">${_["inline.css"]}</style>` +
 `<style id="era-css">${era["inline.css"]}</style>` +
 `<style id="color-css">${color["inline.css"]}</style>` +
 `<style id="application-css">${_.application["inline.css"]}</style>` +
 `<style id="img-css">${environment === "server" ? "" : _["images.css"]}</style>`

const title =
 `<title>${_.application.title ?? "Untitled App"}</title>`

const head =
 `<head>${title}${meta}${links}${styles}</head>`

const bodyClassList = [era.arm.key, color.isLight ? "light" : "dark"]

if (desktop.taskBar.menu.arm?.key === "open")
 bodyClassList.push("menu-fully-open")

if (desktop.taskBar.menu.arm?.key !== "closed")
 bodyClassList.push("menu-pressed")

if (environment === "server")
 bodyClassList.push("installing")

const body =
 `<body inert class="${bodyClassList.join(" ")}">${desktop["inline.html"]}<!-- windows -->${desktop.taskBar["inline.html"]}${worker["inline.html"]}</body>`

return `<!DOCTYPE html><html lang=en>${head}${body}</html>`