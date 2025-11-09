const placeholderIcon = application.placeholderImage("part.png")

const meta =
 // `<meta name="robots" content="noindex" />` +
 `<meta name="format-detection" content="telephone=no, email=no, address=no, date=no">` +
 `<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"/>` +
 `<meta name="description" content="${sanitizeAttr(application.descriptionMeta ?? "This app is coming soon.")}">` /* +
 `<meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)">` +
 `<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">`*/

const links =
 `<link rel="manifest"${worker["link-manifest.txt"]}/>` +
 `<link class=favicon rel=icon href="${placeholderIcon}"/>` +
 `<link class=favicon rel="apple-touch-icon" href="${placeholderIcon}"/>` +
 `<link rel="canonical" href="https://${application.host}${application.canonicalPathname ?? "/"}" />`

const title =
 `<title>${sanitizeAttr(application.title ?? "Untitled App")}</title>`

const bodyClassList = ['unhydrated', era.arm.key, color.isLight ? "light" : "dark"]

if (taskBar.menu.arm?.key === "open")
 bodyClassList.push("menu-fully-open")

if (taskBar.menu.arm?.key !== "closed")
 bodyClassList.push("menu-pressed")

if (environment === "server")
 bodyClassList.push("installing")

const body =
 `<body class="${bodyClassList.join(" ")}">` + (
  `<warning->` + (
   `🚧 App in Alpha. Features subject to change/break without notice.`
  ) +
  `</warning->` +
  `<wallpaper- tabIndex=0${application.attributes ? ` ${application.attributes}` : ""}${application.style ? ` style="${application.style}"` : ""}>` + (
   application["inline.html"]
  ) +
  `</wallpaper->` +
  `<!-- windows -->` +
  taskBar["inline.html"] +
  worker["inline.html"]
 ) +
 `</body>`

const nonImageStyles = `<style id="user-css">${_["inline.css"]}</style>` +
 `<style id="era-css">${era["inline.css"]}</style>` +
 `<style id="color-css">${color["inline.css"]}</style>` +
 `<style id="application-css">${application["inline.css"]}</style>`

const styles = nonImageStyles +
 `<style id="img-css">${environment === "server" ? "" : _["images.css"]}</style>` +
 (environment === "server" ? `<style id="early-img-css">${_.getImagesEarly(body, nonImageStyles)}</style>` : "")

const head =
 `<head>${title}${meta}${links}${styles}</head>`

return `<!DOCTYPE html><html lang=en>${head}${body}</html>`