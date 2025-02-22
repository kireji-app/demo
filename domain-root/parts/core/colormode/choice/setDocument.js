const
 palette = ["1f2023", "faf9f8"],
 isLight = this.subdomain === "light",
 uid = this.parent.parent.uid

if (isLight) palette.reverse()
else palette[1] = (parseInt(palette[1], 16) - 0x101010).toString(16)

function hex2rgb(hex) {
 hex = hex.replace("#", "")
 return [
  parseInt(hex.slice(0, 2), 16),
  parseInt(hex.slice(2, 4), 16),
  parseInt(hex.slice(4, 6), 16)
 ]
}

function rgb2hex(r, g, b) {
 return "#" + [r, g, b].map(x => {
  const hex = Math.round(x).toString(16);
  return hex.length === 1 ? "0" + hex : hex;
 }).join("");
}

function blend(a, b, c = "screen") {
 b = hex2rgb(b)

 return rgb2hex(...hex2rgb(a).map((n, i) => {
  const m = b[i], k = 255
  switch (c) {
   case "average": return (n + m) / 2;
   case "multiply": return (n * m) / k;
   case "screen": return k - (((k - n) * (k - m)) / k);
   default: throw new RangeError("unsupported blend mode " + c);
  }
 }))
}

const
 globalCSS = Build.archive["menu.core.parts"]["style.css"],
 customCSS = Build.archive[uid]["menu.css"] ?? "",
 themeColor = Build.archive[uid]["theme.color"] ?? "ffffff",
 themeBG = blend(themeColor, "171717", "multiply"),
 lightBG = blend(themeColor, "2f2f2f", "multiply"),
 lighterBG = blend(themeColor, "4f4f4f", "multiply"),
 scriptCSS = `
html,
body {
 --color: #${palette[1]};
 --bg: ${themeBG};
 --faint-color: #${palette[1]}0f;
 --light-bg: ${lightBG};
 --lighter-bg: ${lighterBG};
 --accent-color: #${palette[1]}2f;
 --toolbar-accent: var(--bottom-${isLight ? "shadow" : "accent"});
 --theme: ${themeColor};
}`

this.parent.styleSheet.replaceSync(globalCSS + scriptCSS + customCSS)