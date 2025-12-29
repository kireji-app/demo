const { model } = _

if (!("com" in model))
 model.com = {}

if (!("ejaugust" in model.com))
 model.com.ejaugust = {}

model.com.ejaugust.scroller = ""

if (PATHNAME === "/") {

 // TODO: Improve hash abstraction.

 if (HASH !== "#top")
  model.com.ejaugust.sections = "home"

} else {
 const parts = PATHNAME.split("/").slice(1)

 if (parts[0] !== "notes" || !parts[1] || parts.length !== 2)
  throw "Unknown Canonical Path: " + PATHNAME

 const note = isNaN(parts[1]) ? ejaugust.canonicalLinks[parts[1]] : parts[1]

 if (!(note in notes))
  throw "Unknown Canonical Path: " + PATHNAME

 if (!("sections" in model.com.ejaugust))
  model.com.ejaugust.sections = {}

 model.com.ejaugust.sections.notes = note
}

return encodePathname(_.modelToRouteID(model))