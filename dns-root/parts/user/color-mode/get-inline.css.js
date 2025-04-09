const light = colorMode.arm === colorMode.light
const palette = [theme.arm["theme.color"].slice(1), "faf9f8"]
const bgColor = palette[+light]
const fgColor = palette[+!light]
const bgShade1 = colorMode.blendHex(bgColor, "1f1f1f", "multiply")
const bgShade2 = colorMode.blendHex(bgColor, "5f5f5f", "multiply")
const bgShade3 = colorMode.blendHex(bgColor, "afafaf", "multiply")

return `html, body {
 --color-mode: ${colorMode.routeID};
 --fg-fade1: #${light ? "000000" : "ffffff"}EF;
 --fg-fade2: #${light ? "000000" : "ffffff"}Bf;
 --fg-fade3: #${light ? "000000" : "ffffff"}7f;
 --fg-fade4: #${light ? "000000" : "ffffff"}3f;
 --fg-fade5: #${light ? "000000" : "ffffff"}0f;
 --bg-shade1: #${light ? "d9dcdf" : bgShade1};
 --bg-shade2: #${bgShade2};
 --bg-shade3: #${bgShade3};
 --theme: ${theme.arm["theme.color"]};
}`