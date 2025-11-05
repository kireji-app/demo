// let totalSize = serialize(part).length - 4 + 2
// let ownRecordSize = 0

const recordTable = part.filenames.map((filename, index) => {
 const fileSize = serialize(part[filename]).length
 const recordSize =
  // The number of whitespace characters before the filename entry in the table.
  part.domains.length + 1 +
  // The number of characters taken up by the filename itself, including quotes.
  serialize(filename).length +
  // The length of the separator linking the key to the value.
  ": ".length +
  // The length of the record itself, including escape characters and outer quotes.
  fileSize +
  // The comma separating this record from siblings.
  ",\n".length

 // ownRecordSize += recordSize

 // The whitespace that wasn't included in the serialized file at the start.
 // totalSize += part.domains.length

 return "<div>" + filename + "</div>" +
  `<div>${(new FileHeader(filename).binary ? atob(part[filename]).length : part[filename].length).toLocaleString()}</div>` +
  `<div>${recordSize.toLocaleString()}</div>`
}).join("")

return (
 `<section><h1><img src="${part.placeholderImage("part.png")}"/>${part.title || part.key}</h1><p><span class=marks>Part "</span>${part.domains.join("<span class=marks>.</span>")}<span class=marks>" ${part.host === "part.abstract.parts" ? "is the type root and has no prototype.</span>" : `extends </span><a href="#" onclick="_.app.kireji.www.editor.selected.go(event, ${allParts.indexOf(part.prototype)})"><span class=marks>"</span>` + part.prototype.domains.join("<span class=marks>.</span>") + '<span class=marks>"</span></a>'}<p><p id=description>${part.description ?? "<span class=marks>This part has no description.</span>"}</p></section>` +
 "<section>" + (
  `<h2><a href="https://en.wikipedia.org/wiki/Perfect_hash_function#Minimal_perfect_hash_function" target="_blank">MPHF</a> Properties</h2>` +
  (instances.includes(part) ? ("<part-data>" + (
   "<div>Cardinality</div>" +
   `<div>${part.cardinality.toLocaleString()}<sub class=marks>10</sub></div>` +
   "<div>Cardinality (scientific)</div>" +
   `<div>${scientific(part.cardinality, true)}</div>` +
   "<div>Entropy (bits)</div>" +
   `<div>${(part.cardinality - 1n).toString(2).length} <span class=marks>bits</span></div>` +
   "<div>Entropy (charms)</div>" +
   `<div>${toCharms(part.cardinality, false)} <span class=marks>charms</span></div>` +
   "<div>State Integer</div>" +
   `<div>${part.routeID.toLocaleString()}<sub class=marks>10</sub></div>` +
   "<div>State String</div>" +
   `<div><span class=marks>"</span>${encodeSegment(part.routeID)}<span class=marks>"</span></div>`
  ) +
   "</part-data>"
  ) : "This part is <em>abstract</em>. Abstract parts do not participate directly in the hash function.")
 ) +
 "</section>" +
 "<section>" + (
  "<h2>File Size Properties</h2>" +
  "<p>All sizes are in bytes.</p>" +
  // '<part-data>' + (
  //"<div><b>Total Size (including subparts)</b></div>" +
  //`<div>${totalSize.toLocaleString()}</div>` +
  // "<div><b>Own Record Size</b></div>" +
  // `<div>${ownRecordSize.toLocaleString()}</div>`
  // ) +
  // '</part-data>' +
  '<part-data style="--cols: 3">' + (
   "<div><b>Record Name</b></div>" +
   `<div><b><span class=marks>Raw Size</span></b></div>` +
   `<div><b><span class=marks>Archive Size</span></b></div>` +
   recordTable
  ) +
  "</part-data>"
 ) +
 "</section>"
)