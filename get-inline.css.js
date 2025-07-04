return _["static.css"] + `
img[src="${part.render({ request: "blank.png", format: "datauri" })}"],
img[src="${part.render({ request: "blank.gif", format: "datauri" })}"] {
 background: magenta;
}`