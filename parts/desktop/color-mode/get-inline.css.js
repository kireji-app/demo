const light = colorMode.arm === colorMode.light
const fgColor = theme.arm[`${light ? "light" : "dark"}-fg.color`].slice(1)
const bgColor = theme.arm[`${light ? "light" : "dark"}-bg.color`].slice(1)

const fgLightest = colorMode.blendHex(fgColor, "bfbfbf", "screen")
const fgLighter = colorMode.blendHex(fgColor, "7f7f7f", "screen")
const fgLight = colorMode.blendHex(fgColor, "3f3f3f", "screen")
const fgDark = colorMode.blendHex(fgColor, "bfbfbf", "multiply")
const fgDarker = colorMode.blendHex(fgColor, "7f7f7f", "multiply")
const fgDarkest = colorMode.blendHex(fgColor, "3f3f3f", "multiply")

const bgLightest = colorMode.blendHex(bgColor, "bfbfbf", "screen")
const bgLighter = colorMode.blendHex(bgColor, "7f7f7f", "screen")
const bgLight = colorMode.blendHex(bgColor, "3f3f3f", "screen")
const bgDark = colorMode.blendHex(bgColor, "bfbfbf", "multiply")
const bgDarker = colorMode.blendHex(bgColor, "7f7f7f", "multiply")
const bgDarkest = colorMode.blendHex(bgColor, "3f3f3f", "multiply")

return `html, body {
 --fg-accent: ${theme.arm[`${light ? "light" : "dark"}-accent.color`].slice(1)};
 
 --fg-mode-est: #${light ? fgLightest : fgDarkest};
 --fg-mode-er: #${light ? fgLighter : fgDarker};
 --fg-mode: #${light ? fgLight : fgDark};
 --fg-light-est: #${fgLightest};
 --fg-light-er: #${fgLighter};
 --fg-light: #${light};
 --fg: #${fgColor};
 --fg-dark: #${fgDark};
 --fg-dark-er: #${fgDarker};
 --fg-dark-est: #${fgDarkest};
 --fg-un-mode: #${light ? fgDark : fgLight};
 --fg-un-mode-er: #${light ? fgDarker : fgLighter};
 --fg-un-mode-est: #${light ? fgDarkest : fgLightest};

 --bg-mode-est: #${light ? bgLightest : bgDarkest};
 --bg-mode-er: #${light ? bgLighter : bgDarker};
 --bg-mode: #${light ? bgLight : bgDark};
 --bg-light-est: #${bgLightest};
 --bg-light-er: #${bgLighter};
 --bg-light: #${light};
 --bg: #${bgColor};
 --bg-dark: #${bgDark};
 --bg-dark-er: #${bgDarker};
 --bg-dark-est: #${bgDarkest};
 --bg-un-mode: #${light ? bgDark : bgLight};
 --bg-un-mode-er: #${light ? bgDarker : bgLighter};
 --bg-un-mode-est: #${light ? bgDarkest : bgLightest};
 }`