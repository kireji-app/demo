return `
<task-menu style="${menu.arm.styleAttr}" onclick="_.parts.desktop.taskBar.menu.go()">
 <sidebar- onclick="_.noop(event)">
 <ul id=application-control>${Object.entries(_.applications).map(([host, application]) => {
 return `
  <li class=task-link${application === _.application ? ` data-here` : ""}>
   <a href="https://${host}" onclick="_.setApplication(event, this)">
    <img src=""${application.render({ request: "part.png", format: "datauri" })}"" class=part-icon />
    <span class=label>${application.title}</span>
   </a>
  </li>`
}).join("")}</ul>
  <hr>
  <section id="settings">
   <span id=version tabIndex=6>
    <span class="label">Version:</span>
    <a id="tags" href="https://github.com/kireji-app/alpha/tree/${_.gitSHA}" onclick="window.open(this.href, '_blank')">${[
  _.version,
  ...(_.branch === "main" ? [] : [_.branch])
 ].map(tag => `<span>${tag}</span>`).join("")}</a>
   </span>
   ${desktop.color["control.html"]}
   ${desktop.era["control.html"]}
  </section>
 </sidebar->
</task-menu>`