const iconDataURI = desktop.render({
 request: "theme.png",
 fallback: "data:image/png;base64,iVBORw0KGgo=",
 format: "datauri"
})

const bodyClassList = []

if (menu.arm?.key === "open")
 bodyClassList.push("menu-fully-open")

if (menu.arm?.key !== "closed")
 bodyClassList.push("menu-pressed")

const dynamically_added_script_for_later = `<script src="/serverless.js!"></script>`

return `<!DOCTYPE html>
<html lang=en>
 <head>
  <title>${theme.arm.title}</title>
  <meta name=robots content=noindex />
  <meta name=viewport content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"/>
  <link rel="manifest"${worker["link-manifest.txt"]}/>
  <style id="desktop-css">${desktop["inline.css"]}</style>
  <style id="vintage-mode-css">${vintageMode["inline.css"]}</style>
  <style id="color-mode-css">${colorMode["inline.css"]}</style>
  <style id="color-mode-css">${theme.arm["theme.css"]}</style>
  <link rel=icon href="${iconDataURI}"/>
  <link rel="apple-touch-icon" href="${iconDataURI}"/>
 </head>
 <body data-dry ${bodyClassList.length ? ` class="${bodyClassList.join(" ")}"` : ""}>
  <wallpaper- tabIndex=1>${theme.arm["wallpaper.html"]}</wallpaper->
  <!-- desktop windows spawn here -->
  <taskbar- tabIndex=2>
   <menu-button tabIndex=3 class=btn>≡</menu-button>
   <!-- desktop task items spawn here -->
   <flex-spacer></flex-spacer><tray->${share["inline.html"]}${fullscreen["inline.html"]}</tray->
  </taskbar->${menu["inline.html"]}
 </body>
</html>`