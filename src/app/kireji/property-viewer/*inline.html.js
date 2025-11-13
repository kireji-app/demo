return "<property-viewer>" + propertyViewer.scroller.wrap(
 ["basic", "hash", "properties", "images", "files"].map(word => `<section id=info-${word}>${propertyViewer[`info-${word}.html`]}</section>`).join("")
) + "</property-viewer>"