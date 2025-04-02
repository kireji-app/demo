const iconDataURI = desktop.render({
 request: "icon.uri",
 fallback: "data:image/png;base64,iVBORw0KGgo=",
 format: "datauri"
})

const bodyClassList = []

if (menu.arm?.key === "open")
 bodyClassList.push("menu-fully-open")

const dynamically_added_script_for_later = `<script src="/portable.js!"></script>`

return `<!DOCTYPE html>
<html lang=en>
 <head>
  <meta name=robots content=noindex />
  <meta name=viewport content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"/>
  <link rel="manifest"${ENVIRONMENT === "worker" ? ' href="/manifest.json!"' : ""}/>
  <style id="desktop-css">${desktop.render("inline.css")}</style>
  <style id="vintage-mode-css">${vintageMode.render("inline.css")}</style>
  <style id="color-mode-css">${colorMode.render("inline.css")}</style>
  <link rel=icon href="${iconDataURI}"/>
  <link rel="apple-touch-icon" href="${iconDataURI}"/>
 </head>
 <body data-dry ${bodyClassList.length ? ` class="${bodyClassList.join(" ")}"` : ""}>
  <wallpaper- tabIndex=1>${desktop.render("inline.html")}</wallpaper->
  <!-- desktop windows spawn here -->
  <taskbar- tabIndex=2>
   <menu-button tabIndex=3 class=btn>≡</menu-button>
   <!-- desktop task items spawn here -->
   <flex-spacer></flex-spacer><tray->${share.render("inline.html")}${fullscreen.render("inline.html")}</tray->
  </taskbar->${menu.render("inline.html")}
 </body>
</html>`