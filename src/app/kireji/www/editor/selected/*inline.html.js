let totalSize = serialize(selectedPart).length - 4 + 2// minus the outer brackets but plus one comma and line break
let ownRecordSize = 0

const recordTable = selectedPart.filenames.map((filename, index) => {
 const fileSize = serialize(selectedPart[filename]).length
 const recordSize =
  // The number of whitespace characters before the filename entry in the table.
  selectedPart.domains.length + 1 +
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
 totalSize += selectedPart.domains.length

 return "<div>" + filename + "</div>" +
  `<div>${(new FileHeader(filename).binary ? atob(selectedPart[filename]).length : selectedPart[filename].length).toLocaleString()}</div>` +
  `<div>${recordSize.toLocaleString()}</div>`
}).join("")

return (
 `<section><h1><img src="${selectedPart.placeholderImage("part.png")}"/>${selectedPart.title || selectedPart.key}</h1><p><span class=marks>Part "</span>${selectedPart.domains.join("<span class=marks>.</span>")}<span class=marks>" ${selectedPart.host === "part.core.parts" ? "is the type root and has no prototype.</span>" : `extends </span><a href="#" onclick="_.app.kireji.www.editor.selected.go(event, ${allParts.indexOf(selectedPart.prototype)})"><span class=marks>"</span>` + selectedPart.prototype.domains.join("<span class=marks>.</span>") + '<span class=marks>"</span></a>'}<p><p id=description>${selectedPart.description ?? "<span class=marks>This part has no description.</span>"}</p></section>` +
 "<section>" + (
  `<h2><a href="https://en.wikipedia.org/wiki/Perfect_hash_function#Minimal_perfect_hash_function" target="_blank">MPHF</a> Properties</h2>` +
  (instances.includes(selectedPart) ? ("<part-data>" + (
   "<div>Cardinality</div>" +
   `<div>${selectedPart.cardinality.toLocaleString()}<sub class=marks>10</sub></div>` +
   "<div>Cardinality (scientific)</div>" +
   `<div>${scientific(selectedPart.cardinality, true)}</div>` +
   "<div>Entropy (bits)</div>" +
   `<div>${(selectedPart.cardinality - 1n).toString(2).length} <span class=marks>bits</span></div>` +
   "<div>Entropy (charms)</div>" +
   `<div>${toCharms(selectedPart.cardinality, false)} <span class=marks>charms</span></div>` +
   "<div>State Integer</div>" +
   `<div>${selectedPart.routeID.toLocaleString()}<sub class=marks>10</sub></div>` +
   "<div>State String</div>" +
   `<div><span class=marks>"</span>${encodeSegment(selectedPart.routeID)}<span class=marks>"</span></div>`
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