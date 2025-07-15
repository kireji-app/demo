const iconDataURI = _.application.render({
 request: "part.png",
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
 `<style id="application-css">${_.application["inline.css"]}</style>` +
 `<style id="img-css">${environment === "server" ? "" : _["images.css"]}</style>`

const title =
 `<title>${_.application.title ?? "Untitled App"}</title>`

const head =
 `<head>${title}${meta}${links}${styles}</head>`

const bodyClassList = [desktop.era.arm.key]

if (desktop.taskBar.menu.arm?.key === "open")
 bodyClassList.push("menu-fully-open")

if (desktop.taskBar.menu.arm?.key !== "closed")
 bodyClassList.push("menu-pressed")

const body =
 `<body inert class="${bodyClassList.join(" ")}">${desktop["inline.html"]}<!-- windows -->${desktop.taskBar["inline.html"]}${worker["inline.html"]}</body>`

return `<!DOCTYPE html><html lang=en>${head}${body}</html>`