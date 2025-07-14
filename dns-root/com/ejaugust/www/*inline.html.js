return (
 "<header>" + (
  "<menu>" + (
   `<a class=notebook-title href="https://www.ejaugust.com" onclick="_.noop(event); console.log('go home')">${ejaugust.title}</a>` +
   "<flex-spacer></flex-spacer>" +
   "<a target=_blank href=https://github.com/EJAugust>My Github</a>" +
   "<a target=_blank href=https://github.com/kireji-app/alpha>Site GitHub</a>" +
   "<a target=_blank href=https://github.com/sponsors/EJAugust>♡ Support</a>"
  ) +
  "</menu>"
 ) +
 "</header>" +
 ejaugust.arm["inline.html"]
)