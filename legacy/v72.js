onload = () => render(location)

const VERSION = 72 / 1000,
 APP_NAME = location.origin,
 Places = {
  "/": {
   "inner.html":
    "<button onclick=render('404.html')>ErrorDocument 404</button>" +
    "<button onclick=render('hello.world')>My first app</button>" +
    "<button onclick=render('503.html')>ErrorDocument 503</button>"
  },
  "/404.html": {
   "inner.html": "<button onclick=render('/')>Home</button><h1>404</h1>Not found."
  },
  "/hello.world": {
   "inner.html": "<button onclick=render(0)>Home</button><h1>123</h1>hello world"
  },
  "/503.html": {
   "inner.html": "<button onclick=render(0)>Home</button><h1>503</h1>Not ready yet."
  }
 },
 render = (u, n = document.body) => {
  if (typeof u === "string") u = new URL(u, APP_NAME)
  if (!(u?.pathname in Places))
   return render(new URL(`${APP_NAME}/?target=${encodeURIComponent(u.pathname + u.search)}`), n)

  if (!n) {
   n = document.body
   history.replaceState(null, null, `${APP_NAME}${u.pathname}${u.search}`)
  }

  const place = Places[u.pathname]
  if (n.place !== place) {
   n.place = place
   n.innerHTML = place["inner.html"]
  }
 }
