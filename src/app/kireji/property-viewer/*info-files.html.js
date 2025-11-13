let totalSize = serialize(selectedPart).length - 4 + 2
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
  `<div>${(["png", "gif"].includes(filename.split(".").at(-1)) ? atob(selectedPart[filename]).length : selectedPart[filename].length).toLocaleString()}</div>` +
  `<div>${recordSize.toLocaleString()}</div>`
})

return (
 "<h2>File Size Properties</h2>" +
 "<p>All sizes are in bytes.</p>" +
 '<part-data>' + (
  "<div><b>Total Size (including subparts)</b></div>" +
  `<div>${totalSize.toLocaleString()}</div>` +
  "<div><b>Own Record Size</b></div>" +
  `<div>${ownRecordSize.toLocaleString()}</div>`
 ) +
 '</part-data>' +
 '<part-data style="--cols: 3">' + (
  "<div><b>Record Name</b></div>" +
  `<div><b><span class=marks>Raw Size</span></b></div>` +
  `<div><b><span class=marks>Archive Size</span></b></div>` +
  recordTable.join("")
 ) +
 "</part-data>"
)