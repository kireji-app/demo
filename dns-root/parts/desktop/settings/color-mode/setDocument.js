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
const themeColor = await part.parent.resolve("theme.color", "#1f2025")
const palette = [themeColor.slice(1), "faf9f8"]

desktop.colorModeButton.onclick = increment

part.labelTimeout
part.setColorMode = light => {
 const bgColor = palette[+light]
 const fgColor = palette[+!light]
 const bgShade1 = blend(bgColor, "1f1f1f", "multiply")
 const bgShade2 = blend(bgColor, "5f5f5f", "multiply")
 const bgShade3 = blend(bgColor, "afafaf", "multiply")
 desktop.colorModeLabel2.innerText = part.choice[LAYER].niceName
 desktop.colorModeHandle.innerText = part.choice[LAYER].symbol
 desktop.colorModeStyleSheet.replaceSync(`img {
 fill: var(--fg-fade1);
}
html, body {
 --color-mode: ${part.state[LAYER]};
 --fg-fade1: #${light ? "000000" : "ffffff"}EF;
 --fg-fade2: #${light ? "000000" : "ffffff"}Bf;
 --fg-fade3: #${light ? "000000" : "ffffff"}7f;
 --fg-fade4: #${light ? "000000" : "ffffff"}3f;
 --fg-fade5: #${light ? "000000" : "ffffff"}0f;

 --bg-shade1: #${light ? "d9dcdf" : bgShade1};
 --bg-shade2: #${bgShade2};
 --bg-shade3: #${bgShade3};

 --taskbar-accent: var(--bottom-shadow);
 --theme: ${themeColor};
}`)
}