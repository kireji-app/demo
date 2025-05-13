const light = colorMode.arm === colorMode.light
const colorLightFg = theme.arm["color-light-fg"].slice(1)
const colorLightBg = theme.arm["color-light-bg"].slice(1)
const colorLightAccent = theme.arm["color-light-accent"].slice(1)
const colorDarkFg = theme.arm["color-dark-fg"].slice(1)
const colorDarkBg = theme.arm["color-dark-bg"].slice(1)
const colorDarkAccent = theme.arm["color-dark-accent"].slice(1)

const fgColor = light ? colorLightFg : colorDarkFg
const bgColor = light ? colorLightBg : colorDarkBg
const accentColor = light ? colorLightAccent : colorDarkAccent
const unAccentColor = light ? colorDarkAccent : colorLightAccent

const fgLightest = colorMode.blendHex(fgColor, "bfbfbf", "screen")
const fgLighter = colorMode.blendHex(fgColor, "7f7f7f", "screen")
const fgLight = colorMode.blendHex(fgColor, "3f3f3f", "screen")
const fgDark = colorMode.blendHex(fgColor, "bfbfbf", "multiply")
const fgDarker = colorMode.blendHex(fgColor, "7f7f7f", "multiply")
const fgDarkest = colorMode.blendHex(fgColor, "3f3f3f", "multiply")

const bgLightest = colorMode.blendHex(bgColor, "7f7f7f", "screen")
const bgLighter = colorMode.blendHex(bgColor, "4f4f4f", "screen")
const bgLight = colorMode.blendHex(bgColor, "1f1f1f", "screen")
const bgDark = colorMode.blendHex(bgColor, "cfcfcf", "multiply")
const bgDarker = colorMode.blendHex(bgColor, "9f9f9f", "multiply")
const bgDarkest = colorMode.blendHex(bgColor, "6f6f6f", "multiply")

return `html, body {
 --fg-accent: #${accentColor};
 --fg-un-accent: #${unAccentColor};

 --color-light-fg: #${colorLightFg};
 --color-light-bg: #${colorLightBg};
 --color-light-accent: #${colorLightAccent};
 --color-dark-fg: #${colorDarkFg};
 --color-dark-bg: #${colorDarkBg};
 --color-dark-accent: #${colorDarkAccent};
 
 --fg-mode-est: #${light ? fgLightest : fgDarkest};
 --fg-mode-er: #${light ? fgLighter : fgDarker};
 --fg-mode: #${light ? fgLight : fgDark};
 --fg-light-est: #${fgLightest};
 --fg-light-er: #${fgLighter};
 --fg-light: #${fgLight};
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
 --bg-light: #${bgLight};
 --bg: #${bgColor};
 --bg-dark: #${bgDark};
 --bg-dark-er: #${bgDarker};
 --bg-dark-est: #${bgDarkest};
 --bg-un-mode: #${light ? bgDark : bgLight};
 --bg-un-mode-er: #${light ? bgDarker : bgLighter};
 --bg-un-mode-est: #${light ? bgDarkest : bgLightest};
 }`