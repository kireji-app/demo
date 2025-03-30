// This function takes in a URL and returns the designated source of truth for the document appearance at that URL.
// task-hydrate rounds up DOM object references
// task-run, task-end and task-update align the DOM state to the results of this function.
return `<!DOCTYPE html><html lang=en>${html_content_varies_with_url}</html>`

throw 'old'
const pathname = PARAMS.get("pathname") ?? "/test/path"
const typeName = BUILD.tags.includes("local") ? BUILD.host : HOST
const segments = pathname.slice(1).split(/\/+/).filter(segment => segment)
const desktopSettings = root.desktop.settings
const { menu } = desktopSettings

const desktopCode = segments[0]
Framework.pathEncoder.parse("document", segments.join("/"))
const results = [...Framework.pathEncoder].map(segment => segment.routeID)
let settingsRouteID = results.shift()

if (settingsRouteID >= desktopSettings.cardinality) {
 settingsRouteID %= desktopSettings.cardinality
 console.warn("wrapping out of range settings segment", settingsRouteID, segments)
}

desktopSettings.setRoute(settingsRouteID)
const colorMode = desktopSettings.colorMode.routeID
const menuRouteID = menu.arm === menu.open
 ? 1 : menu.arm === menu.closed
  ? 0 : menu.arm === menu.dismiss ?
   1 - (Number(menu.dismiss.routeID) + 1) / Number(menu.dismiss.cardinality)
   : Number(menu.introduce.routeID) / Number(menu.introduce.cardinality)
const vintageMode = desktopSettings.vintageMode.routeID

console.warn("handle tasks", results)

return `<!DOCTYPE html>
<html lang=en>
 <head>
  <link rel=manifest />
  <link rel=icon href="data:image/png;base64,iVBORw0KGgo=">
  <link rel="apple-touch-icon" href="data:image/png;base64,iVBORw0KGgo=">
  <meta name=robots content=noindex />
  <meta name=viewport content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"/>
  <style id="inline-style">${part.render("inline.css")}</style>
  <style id="custom-style">${part.render("custom.css") ?? ""}</style>
 </head>
 <body
  style = "
 --color-mode: 0;
 --fg-fade1: #000000EF;
 --fg-fade2: #000000Bf;
 --fg-fade3: #0000007f;
 --fg-fade4: #0000003f;
 --fg-fade5: #0000000f;
 --bg-shade1: #d9dcdf;
 --bg-shade2: #d9dcdf;
 --bg-shade3: #d9dcdf;
 --theme: tomato;
   "
   ${menuRouteID === 1 ? "class=menu-open " : ""} style="--menu-tween:${menuRouteID}" data-dry data-theme=${vintageMode ? "vintage" : "modern"}>
  <desktop- tabIndex=1></desktop->
  <taskbar- tabIndex=2>
   <menu-button tabIndex=3 class=btn>≡</menu-button>
   ${[].map(task => `<html goes here>`)}
   <flex-spacer></flex-spacer>
  </taskbar->${menuRouteID ? `
  <task-menu>
   <sidebar->
    <ul id=kiosks>${["desktop.parts", "kireji.io", "core.parts", "ejaugust.com", "kireji.app", "orenjinari.com"].map(hostBase => {
 const kioskPart = new Part("www." + hostBase)
 return `
     <li class=task-link><a href="https://www.${hostBase}/"><img src="${kioskPart.createDataURI(kioskPart.render("icon.uri"))}" class=task-icon /><span class=label>${kioskPart.framework.niceName}</span></a>`
}).join("")}</ul>
    <hr>
    <section id="settings">
     <span id=version tabIndex=6>
      <span class="label">Version</span>
      <span id="tags">${BUILD.tags.map(tag => `<span>${tag}</span>`).join("")}</span>
     </span>
     <span id="color-mode" tabIndex=7>
      <span id="label1" class="label">Color Mode</span>
      <span id="label2" class="label">Device Mode</span>
      <span class="base">
       <span class="handle">✱</span>
      </span>
     </span>
     <span id="vintage-mode" tabIndex=8>
      <span class="label">Vintage Mode</span>
      <span class="base">
       <span class="handle"></span>
      </span>
     </span>
    </section>
   </sidebar->
  </task-menu>`: ""}
  <script src="/endpoint.js?raw"></script>
 </body>
</html>`

const manifest_href_varies_by_service_worker_support = ""

const icon_varies_by_kiosk_app = "data:image/png;base64,iVBORw0KGgo="

const static_style_all_pages = part.render("inline.css")
const style_varies_by_kiosk_app = part.render("custom.css") ?? ""

const body_style_varies_with_desktop_settings = `
--color-mode: 0;
--fg-fade1: #000000EF;
--fg-fade2: #000000Bf;
--fg-fade3: #0000007f;
--fg-fade4: #0000003f;
--fg-fade5: #0000000f;
--bg-shade1: #d9dcdf;
--bg-shade2: #d9dcdf;
--bg-shade3: #d9dcdf;
--theme: tomato;
--menu-tween:${menuRouteID}`
const body_attributes_vary_with_desktop_settings = `style = "${body_style_varies_with_desktop_settings}"
${menuRouteID === 1 ? "class=menu-open " : ""} style="" data-dry data-theme=${vintageMode ? "vintage" : "modern"}`
const task_list_varies_with_desktop_settings = [].map(task => `<html goes here>`)
const menu_varies_with_desktop_settings = menuRouteID ? `
<task-menu>
 <sidebar->
  <ul id=kiosks>${["desktop.parts", "kireji.io", "core.parts", "ejaugust.com", "kireji.app", "orenjinari.com"].map(hostBase => {
 const kioskPart = new Part("www." + hostBase)
 return `
   <li class=task-link><a href="https://www.${hostBase}/"><img src="${kioskPart.createDataURI(kioskPart.render("icon.uri"))}" class=task-icon /><span class=label>${kioskPart.framework.niceName}</span></a>`
}).join("")}</ul>
  <hr>
  <section id="settings">
   <span id=version tabIndex=6>
    <span class="label">Version</span>
    <span id="tags">${BUILD.tags.map(tag => `<span>${tag}</span>`).join("")}</span>
   </span>
   <span id="color-mode" tabIndex=7>
    <span id="label1" class="label">Color Mode</span>
    <span id="label2" class="label">Device Mode</span>
    <span class="base">
     <span class="handle">✱</span>
    </span>
   </span>
   <span id="vintage-mode" tabIndex=8>
    <span class="label">Vintage Mode</span>
    <span class="base">
     <span class="handle"></span>
    </span>
   </span>
  </section>
 </sidebar->
</task-menu>`: ""
const dynamically_added_script = `<script src="/endpoint.js?raw"></script>`
const pre_taskbar_content_varies_by_desktop_windows = ""
const post_taskbar_content_varies_by_desktop_windows = ""
const body_varies_with_desktop_settings_and_windows = `
 <body${body_attributes_vary_with_desktop_settings}>
  <desktop- tabIndex=1></desktop->
  ${pre_taskbar_content_varies_by_desktop_windows}
  <taskbar- tabIndex=2>
   <menu-button tabIndex=3 class=btn>≡</menu-button>
   ${task_list_varies_with_desktop_settings}
   <flex-spacer></flex-spacer>
  </taskbar->${menu_varies_with_desktop_settings}
  ${post_taskbar_content_varies_by_desktop_windows}
 </body>`
const head_varies_with_kiosk_app_and_client_support = `<head>
  <meta name=robots content=noindex />
  <meta name=viewport content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"/>
  <link rel=manifest ${manifest_href_varies_by_service_worker_support}/>
  <style id="inline-style">${static_style_all_pages}</style>
  <style id="custom-style">${style_varies_by_kiosk_app}</style>
  <link rel=icon href="${icon_varies_by_kiosk_app}"/>
  <link rel="apple-touch-icon" href="${icon_varies_by_kiosk_app}"/>
 </head>`

const html_content_varies_with_url = `
${head_varies_with_kiosk_app_and_client_support}
${body_varies_with_desktop_settings_and_windows}
`
