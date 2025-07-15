return `html, body {
 --invert-on-light: ${desktop.color.arm === desktop.color.light ? "100%" : "0%"};
 --invert-on-dark: ${desktop.color.arm === desktop.color.light ? "0%" : "100%"};

 /* All six theme colors without shading. */

 --light-fg: ${_.application.lightFgTheme};
 --light-bg: ${_.application.lightBgTheme};
 --light-accent: ${_.application.lightAccentTheme};
 --dark-fg: ${_.application.darkFgTheme};
 --dark-bg: ${_.application.darkBgTheme};
 --dark-accent: ${_.application.darkAccentTheme};

 /* Absolute shades of each color. */

 --accent-light-est: ${desktop.color.lightEstAccent};
 --accent-light-er: ${desktop.color.lightErAccent};
 --accent-light: ${desktop.color.lightAccent};
 --accent: ${desktop.color.accent};
 --accent-dark: ${desktop.color.darkAccent};
 --accent-dark-er: ${desktop.color.darkErAccent};
 --accent-dark-est: ${desktop.color.darkEstAccent};

 --accent-un-light-est: ${desktop.color.unLightEstAccent};
 --accent-un-light-er: ${desktop.color.unLightErAccent};
 --accent-un-light: ${desktop.color.unLightAccent};
 --accent-un: ${desktop.color.unAccent};
 --accent-un-dark: ${desktop.color.unDarkAccent};
 --accent-un-dark-er: ${desktop.color.unDarkErAccent};
 --accent-un-dark-est: ${desktop.color.unDarkEstAccent};

 --fg-light-est: ${desktop.color.lightEstFg};
 --fg-light-er: ${desktop.color.lightErFg};
 --fg-light: ${desktop.color.lightFg};
 --fg: ${desktop.color.fg};
 --fg-dark: ${desktop.color.darkFg};
 --fg-dark-er: ${desktop.color.darkErFg};
 --fg-dark-est: ${desktop.color.darkEstFg};

 --bg-light-est: ${desktop.color.lightEstBg};
 --bg-light-er: ${desktop.color.lightErBg};
 --bg-light: ${desktop.color.lightBg};
 --bg: ${desktop.color.bg};
 --bg-dark: ${desktop.color.darkBg};
 --bg-dark-er: ${desktop.color.darkErBg};
 --bg-dark-est: ${desktop.color.darkEstBg};

 /* Color-mode relative shades of each color. */

 --accent-mode-est: ${desktop.color.modeEstAccent};
 --accent-mode-er: ${desktop.color.modeErAccent};
 --accent-mode: ${desktop.color.modeAccent};
 --accent-un-mode: ${desktop.color.unModeAccent};
 --accent-un-mode-er: ${desktop.color.unModeErAccent};
 --accent-un-mode-est: ${desktop.color.unModeEstAccent};

 --fg-mode-est: ${desktop.color.modeEstFg};
 --fg-mode-er: ${desktop.color.modeErFg};
 --fg-mode: ${desktop.color.modeFg};
 --fg-un-mode: ${desktop.color.unModeFg};
 --fg-un-mode-er: ${desktop.color.unModeErFg};
 --fg-un-mode-est: ${desktop.color.unModeEstFg};

 --bg-mode-est: ${desktop.color.modeEstBg};
 --bg-mode-er: ${desktop.color.modeErBg};
 --bg-mode: ${desktop.color.modeBg};
 --bg-un-mode: ${desktop.color.unModeBg};
 --bg-un-mode-er: ${desktop.color.unModeErBg};
 --bg-un-mode-est: ${desktop.color.unModeEstBg};
}`