const hex2rgb = hex => {
 hex = hex.replace("#", "")
 return [
  parseInt(hex.slice(0, 2), 16),
  parseInt(hex.slice(2, 4), 16),
  parseInt(hex.slice(4, 6), 16)
 ]
}
const rgb2hex = (r, g, b) => {
 return [r, g, b].map(x => {
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
const themeColor = part.parent.framework.resolve("theme.color") ?? "#1f2025"
const palette = [themeColor.slice(1), "faf9f8"]

inherit.colorModeStyleSheet
inherit.colorModeLabel2
inherit.colorModeButton.onclick = increment
inherit.colorModeHandle

part.labelTimeout
part.setColorMode = light => {
 const bgColor = palette[+light]
 const fgColor = palette[+!light]
 const bgShade1 = blend(bgColor, "7f7f7f", "multiply")
 const bgShade2 = blend(bgColor, "afafaf", "multiply")
 const bgShade3 = blend(bgColor, "cfcfcf", "multiply")
 part.colorModeLabel2.innerText = part.choice[LAYER].niceName
 part.colorModeHandle.innerText = part.choice[LAYER].symbol
 part.colorModeStyleSheet.replaceSync(`html, body {
 --color-mode: ${part.state[LAYER]};
 --fg-fade1: ${light ? "black" : "white"};
 --fg-fade2: #${fgColor}6f;
 --fg-fade3: #${fgColor}3f;

 --bg-shade1: #${light ? "d9dcdf" : bgShade1};
 --bg-shade2: #${bgShade2};
 --bg-shade3: #${bgShade3};

 --toolbar-accent: var(--bottom-${light ? "shadow" : "accent"});
 --theme: ${themeColor};
}`)
}