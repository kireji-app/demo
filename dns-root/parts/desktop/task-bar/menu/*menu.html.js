return `
<task-menu style="${menu.arm.styleAttr}" onclick="_.parts.desktop.taskBar.menu.go()">
 <sidebar- onclick="_.noop(event)">
 <ul id=application-control>${Object.entries(_.liveApplications).map(([host, application]) => {
 return `
  <li class=task-link${application === _.application ? ` data-here` : ""}>
   <a href="https://${host}" onclick="_.setApplication(event, this)">
    <img src="${application.placeholderImage("part.png")}" class=part-icon />
    <span class=label>${application.title}</span>
   </a>
  </li>`
}).join("")}</ul>
  <hr>
  <section id="settings">
   ${desktop.version["inline.html"]}
   ${color["inline.html"]}
   ${era["inline.html"]}
  </section>
 </sidebar->
</task-menu>`