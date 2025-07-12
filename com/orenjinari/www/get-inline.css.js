return orenjinari["static.css"] + `
wallpaper- {
 --signature: url(${orenjinari.render({ request: "signature.png", format: "datauri" })});
 --ground: url(${orenjinari.render({ request: "ground.png", format: "datauri" })});
}

wallpaper- .zone {
 box-shadow: inset 0 0 0 8vw #0003;
}
` + orenjinari[".."].scroller["inline.css"]