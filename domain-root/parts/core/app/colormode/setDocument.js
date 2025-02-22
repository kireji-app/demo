const hex2rgb = hex => {
 hex = hex.replace("#", "")
 return [
  parseInt(hex.slice(0, 2), 16),
  parseInt(hex.slice(2, 4), 16),
  parseInt(hex.slice(4, 6), 16)
 ]
}
const rgb2hex = (r, g, b) => {
 return "#" + [r, g, b].map(x => {
  const hex = Math.round(x).toString(16);
  return hex.length === 1 ? "0" + hex : hex;
 }).join("");
}
const blend = (a, b, c = "screen") => {
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
const themeColor = read("theme.color") ?? "1f2025"
const palette = [themeColor, "faf9f8"]

inherit.colorModeStyleSheet
inherit.colorModeButton.onclick = increment
inherit.colorModeLabel.innerText = "Color Mode"

part.labelTimeout
part.setColorMode = light => {
 const bgColor = palette[+light]
 const fgColor = palette[+!light]
 const bgShade1 = blend(bgColor, "171717", "multiply")
 const bgShade2 = blend(bgColor, "2f2f2f", "multiply")
 const bgShade3 = blend(bgColor, "4f4f4f", "multiply")
 part.colorModeLabel.innerText = part.choice[layer].niceName
 if (part.labelTimeout) clearTimeout(part.labelTimeout)
 part.labelTimeout = setTimeout(() => {
  part.colorModeLabel.innerText = "Color Mode"
  part.labelTimeout = undefined
 }, 1750)
 part.colorModeStyleSheet.replaceSync(`html, body {
 --fg-fade1: #${fgColor};
 --fg-fade2: #${fgColor}2f;
 --fg-fade3: #${fgColor}0f;

 --bg-shade1: ${bgShade1};
 --bg-shade2: ${bgShade2};
 --bg-shade3: ${bgShade3};

 --toolbar-accent: var(--bottom-${light ? "shadow" : "accent"});
 --theme: ${themeColor};
}`)
}