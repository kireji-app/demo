if (menu.closed.enabled)
 return ""

return `
<task-menu style="${menu.arm.render("style-attr")}">
 <sidebar->
 <ul id=kiosks>${["desktop.parts", "kireji.io", "core.parts", "ejaugust.com", "kireji.app", "orenjinari.com"].map(hostBase => {
 const kioskHost = "www." + hostBase
 const kioskPart = new Part(kioskHost)
 return `
         <li class=task-link><a href="https://${kioskHost}/"><img src="${kioskPart.render({ stringName: "icon.uri", format: "datauri" })}" class=task-icon /><span class=label>${kioskPart.niceName ?? hostBase}</span></a>`
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
</task-menu>`