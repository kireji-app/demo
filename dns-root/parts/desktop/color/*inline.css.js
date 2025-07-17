return `html, body {
 /* All six theme colors without shading. */

 --light-fg: ${_.application.lightFgTheme};
 --light-bg: ${_.application.lightBgTheme};
 --light-accent: ${_.application.lightAccentTheme};
 --dark-fg: ${_.application.darkFgTheme};
 --dark-bg: ${_.application.darkBgTheme};
 --dark-accent: ${_.application.darkAccentTheme};

 /* Absolute shades of each color. */

 --accent-light-est: ${color.lightEstAccent};
 --accent-light-er: ${color.lightErAccent};
 --accent-light: ${color.lightAccent};
 --accent: ${color.accent};
 --accent-dark: ${color.darkAccent};
 --accent-dark-er: ${color.darkErAccent};
 --accent-dark-est: ${color.darkEstAccent};

 --accent-un-light-est: ${color.unLightEstAccent};
 --accent-un-light-er: ${color.unLightErAccent};
 --accent-un-light: ${color.unLightAccent};
 --accent-un: ${color.unAccent};
 --accent-un-dark: ${color.unDarkAccent};
 --accent-un-dark-er: ${color.unDarkErAccent};
 --accent-un-dark-est: ${color.unDarkEstAccent};

 --fg-light-est: ${color.lightEstFg};
 --fg-light-er: ${color.lightErFg};
 --fg-light: ${color.lightFg};
 --fg: ${color.fg};
 --fg-dark: ${color.darkFg};
 --fg-dark-er: ${color.darkErFg};
 --fg-dark-est: ${color.darkEstFg};

 --bg-light-est: ${color.lightEstBg};
 --bg-light-er: ${color.lightErBg};
 --bg-light: ${color.lightBg};
 --bg: ${color.bg};
 --bg-dark: ${color.darkBg};
 --bg-dark-er: ${color.darkErBg};
 --bg-dark-est: ${color.darkEstBg};

 /* Color-mode relative shades of each color. */

 --accent-mode-est: ${color.modeEstAccent};
 --accent-mode-er: ${color.modeErAccent};
 --accent-mode: ${color.modeAccent};
 --accent-un-mode: ${color.unModeAccent};
 --accent-un-mode-er: ${color.unModeErAccent};
 --accent-un-mode-est: ${color.unModeEstAccent};

 --fg-mode-est: ${color.modeEstFg};
 --fg-mode-er: ${color.modeErFg};
 --fg-mode: ${color.modeFg};
 --fg-un-mode: ${color.unModeFg};
 --fg-un-mode-er: ${color.unModeErFg};
 --fg-un-mode-est: ${color.unModeEstFg};

 --bg-mode-est: ${color.modeEstBg};
 --bg-mode-er: ${color.modeErBg};
 --bg-mode: ${color.modeBg};
 --bg-un-mode: ${color.unModeBg};
 --bg-un-mode-er: ${color.unModeErBg};
 --bg-un-mode-est: ${color.unModeEstBg};
}`