const placeholderIcon = application.placeholderImage("part.png")

const meta =
 // `<meta name="robots" content="noindex" />` +
 `<meta name="format-detection" content="telephone=no, email=no, address=no, date=no">` +
 `<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"/>` +
 `<meta name="description" content="${sanitizeAttr(application.descriptionMeta ?? "This app is coming soon.")}">` /* +
 `<meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)">` +
 `<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">`*/

const links =
 (production ? `` : `<link rel="manifest"${worker.manifestLink}/>`) +
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

if (application.classes)
 bodyClassList.push(...application.classes)

const bodyHTML =
 `<body class="${bodyClassList.join(" ")}">` + (
  `<warning->` + (
   `🚧 App in Alpha. Features subject to change/break without notice.`
  ) +
  `</warning->` +
  `<wallpaper- class=app-container id=${application.host.replaceAll(".", "_")} tabIndex=0${application.attributes ? ` ${application.attributes}` : ""}${application.style ? ` style="${application.style}"` : ""}>` + (
   application["part.html"]
  ) +
  `</wallpaper->` +
  `<!-- windows -->` +
  taskBar["part.html"] +
  worker["part.html"]
 ) +
 `</body>`

const nonImageStyles = `<style id="user-css">${_["part.css"]}</style>` +
 `<style id="era-css">${era["part.css"]}</style>` +
 `<style id="color-css">${color["part.css"]}</style>` +
 `<style id="application-css">${application["part.css"]}</style>`

const styles = nonImageStyles +
 `<style id="img-css">${environment === "server" ? "" : _["images.css"]}</style>` +
 (environment === "server" ? `<style id="early-img-css">${_.getImagesEarly(bodyHTML, nonImageStyles)}</style>` : "")

const headHTML =
 `<head>${title}${meta}${links}${styles}</head>`

return `<!DOCTYPE html><html lang=en>${headHTML}${bodyHTML}</html>`