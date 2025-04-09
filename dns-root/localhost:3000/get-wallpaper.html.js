return `You have selected a theme that isn't in the theme library (yet).

Please select a theme to fallback to:${theme.map(subpart => subpart === part ? "" : `\n<a href="https://${subpart.host}" onclick=menu.noop()>${subpart.index}. ${subpart.title} (${subpart.host})</a>`).join("")}`