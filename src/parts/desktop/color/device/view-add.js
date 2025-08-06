part.query = globalThis.matchMedia?.('(prefers-color-scheme: light)')

part.query.onchange = ({ matches }) => {
 document.body.classList.remove(matches ? "dark" : "light")
 document.body.classList.add(matches ? "light" : "dark")
 part.light = !!matches
 part[".."].populateView()
}

part.query.onchange(part.query)
base()