return `
<task-menu style="${menu.arm.styleAttr}" onpointerdown="${menu.runtimeReference}.point(event,this)">
 <task-sidebar onpointerdown="${menu.runtimeReference}.point(event,this)">
 <ul id=application-control>${Object.entries(_.liveApplications).map(([host, application]) => {
 return `
  <li class=task-link${application === _.application ? ` data-here` : ""}>
   <a href=https://${host} onpointerdown=self._?.appPoint(event,this)>
    <img src="${application.placeholderImage("part.png")}" class=part-icon />
    <span class=label>${application.titleMenu ?? application.title}</span>
   </a>
  </li>`
}).join("")}</ul>
  <hr>
  <section id="settings">
   ${update["part.html"]}
   ${color["part.html"]}
   ${era["part.html"]}
  </section>
 </task-sidebar>
</task-menu>`