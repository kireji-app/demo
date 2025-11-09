const { model } = _

if (!("com" in model))
 model.com = {}

if (!("ejaugust" in model.com))
 model.com.ejaugust = {}

if (!("www" in model.com.ejaugust))
 model.com.ejaugust.www = {}

model.com.ejaugust.scroller = ""

const app = model.com.ejaugust.www

if (PATHNAME === "/") {

 // TODO: Improve hash behavior.
 if (HASH !== "#top") {
  if ("notes" in app)
   delete app.notes

  app.home = ""
 }

} else {

 const parts = PATHNAME.split("/").slice(1)

 if (parts[0] !== "notes" || !parts[1] || parts.length !== 2)
  throw "Unknown Canonical Path: " + PATHNAME

 // TODO: Generate this list dynamically.
 const note = isNaN(parts[1]) ? {
  "unix-timestamp": "1762140334",
  "hashing-the-universe": "1762062190"
 }[parts[1]] : parts[1]

 if (!(note in notes))
  throw "Unknown Canonical Path: " + PATHNAME

 app.notes = note
}

return encodePathname(_.modelToRouteID(model))