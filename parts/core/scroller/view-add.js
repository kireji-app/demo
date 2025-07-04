scroller.container = document.querySelector(scroller.query)
scroller.container.addEventListener("scroll", e => scroller.onscroll(e), { passive: true })