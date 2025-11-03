return ejaugust[".."].scroller.wrap(
 "<header>" + (
  `<a id=notebook-title title="⌂ Home" href=https://www.ejaugust.com/ onclick=_.go(this.href,event)>` + (
   `<h1>` + (
    `<img src="${ejaugust.placeholderImage("title.png")}" alt="${ejaugust.title}"></h1>`
   ) + `</h1>`
  ) +
  `</a>`
 ) +
 "</header>" + (
  "\n<article id=notebook-section>" + section["inline.html"] + "\n</article>\n"
 ) +
 "<footer>" + (
  "<section id=quick-links>" + (
   "<a id=footer-home href=https://www.ejaugust.com/ onclick=_.go(this.href,event)><span class=unicode-icon>⌂</span> Home</a>" +
   '<a href=https://www.ejaugust.com/#top onclick=_.go(this.href,event)><span class=unicode-icon>↑</span> Back to Top</a>'
  ) +
  "</section>" +
  '<a id=k-logo title="Visit Site Repo" target=_blank href="https://github.com/kireji-app/demo#readme"><pre>' + (
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
  "<section id=social>" + (
   `<a target=_blank title="My GitHub Profile" href=https://github.com/EJAugust>${ejaugust["github.svg"]}</a>` +
   `<a target=_blank title="Me on LinkedIn" href=https://linkedin.com/in/kireji>${ejaugust["linkedin.svg"]}</a>` +
   `<a target=_blank title="♡ Sponsor Me" href=https://github.com/sponsors/EJAugust>♡</a>`
  ) +
  "</section>"
 ) +
 "</footer>"
)