let totalSize = serialize(selected).length - 4 + 2// minus the outer brackets but plus one comma and line break
let ownRecordSize = 0

const recordTable = selected.filenames.map((filename, index) => {
 const fileSize = serialize(selected[filename]).length
 const recordSize =
  // The number of whitespace characters before the filename entry in the table.
  selected.domains.length + 1 +
  // The number of characters taken up by the filename itself, including quotes.
  serialize(filename).length +
  // The length of the separator linking the key to the value.
  ": ".length +
  // The length of the record itself, including escape characters and outer quotes.
  fileSize +
  // The comma separating this record from siblings.
  ",\n".length

 ownRecordSize += recordSize

 // The whitespace that wasn't included in the serialized file at the start.
 totalSize += selected.domains.length

 return "<div>" + filename + "</div>" +
  `<div><span class=marks>Raw Size: </span>${(new FileHeader(filename).binary ? atob(selected[filename]).length : selected[filename].length).toLocaleString()} bytes</div>` +
  `<div><span class=marks>Record Size: </span>${recordSize.toLocaleString()} bytes</div>`
}).join("")

return (
 "<part-editor>" + (
  `<h1><img src="${selected.render({ request: "part.png", format: "datauri" })}"/><span>${selected.title || selected.key}</span></h1>` +
  "<section>" + (
   "<h2>Common Properties</h2>" +
   "<part-data>" + (
    "<div>Title</div>" +
    `<div>${selected.title ?? "<span class=marks>untitled</span>"}</div>` +
    "<div>Subdomain Name</div>" +
    `<div>${selected.key ?? "<span class=marks>The root is not a subdomain.</span>"}</div>` +
    "<div>Full Domain Name</div>" +
    `<div><span class=marks>"</span>${selected.domains.join("<span class=marks>.</span>")}<span class=marks>"</span></div>` +
    "<div>Description</div>" +
    `<div>${selected.description ?? "<span class=marks>No description set.</span>"}</div>` +
    "<div>Cardinality</div>" +
    `<div>${selected.cardinality.toLocaleString()}<sub class=marks>10</sub></div>` +
    "<div>Entropy</div>" +
    `<div>${toCharms(selected.cardinality)}</div>` +
    "<div>State Integer</div>" +
    `<div>${selected.routeID.toLocaleString()}<sub class=marks>10</sub></div>` +
    "<div>State String</div>" +
    `<div><span class=marks>"</span>${encodeSegment(selected.routeID)}<span class=marks>"</span></div>` +
    "<div>Prototype</div>" +
    `<div><span class=marks>"</span>${selected.prototype.domains.join("<span class=marks>.</span>")}<span class=marks>"</span></div>` +
    "<div>Subtitle</div>" +
    `<div>${selected.subtitle ?? "<span class=marks>No subtitle set.</span>"}</div>` +
    "<div>Unicode Symbol</div>" +
    `<div>${selected.unicode ?? "<span class=marks>No unicode symbol set.</span>"}</div>` +
    `<div>Record Size${selected.subdomains.length ? " (including subparts)" : ""}</div>` +
    `<div>${totalSize.toLocaleString()} bytes</div>`
   ) +
   "</part-data>"
  ) +
  "</section>" +
  "<section>" + (
   "<h2>File Records</h2>" +
   `<p>This part contains ${ownRecordSize.toLocaleString()} bytes of file records.</p>` +
   `<part-data style="--cols: 3">${recordTable}</part-data>`
  ) +
  "</section>"
 ) +
 "</part-editor>"
)