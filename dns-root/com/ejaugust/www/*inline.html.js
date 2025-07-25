return ejaugust[".."].scroller.wrap(
 "<header>" + (
  "<menu>" + (
   `<a id=notebook-title href="https://www.ejaugust.com" onclick="_.com.ejaugust.www.home.go(event)">${ejaugust.title}</a><flex-spacer></flex-spacer>`
  ) +
  "</menu>"
 ) +
 "</header>" + (
  "<article id=notebook-section>" + section["inline.html"] + "</article>"
 ) +
 "<footer>" + (
  '<a id=k-logo target=_blank href="https://github.com/kireji-app/alpha"><pre>' + (
   " \n" +
   "𝑘\n" +
   " \n" +
   " \n"
  ) +
  '</pre><pre>' + (
   "   ▌ ▘     ▘▘ \n" +
   " = ▙▘▌▛▘█▌ ▌▌ \n" +
   "   ▛▖▌▌ ▙▖ ▌▌ \n" +
   "          ▙▌  \n"
  ) +
  "</pre></a>" +
  `<img src="${_.app.kireji.www.render({ request: "part.png", format: "datauri" })}"/>` +
  "<section id=social>" + (
   `<a target=_blank href=https://github.com/EJAugust>${ejaugust["github.svg"]}</a>` +
   `<a target=_blank href=https://linkedin.com/in/kireji>${ejaugust["linkedin.svg"]}</a>` +
   "<a target=_blank href=https://github.com/sponsors/EJAugust>♡</a>"
  ) +
  "</section>"
 ) +
 "</footer>"
)