const { attributes, style, "inline.html": inlineHTML } = _.application

return `<warning->🚧 App in Alpha. Features subject to change/break without notice.</warning-><wallpaper- tabIndex=1${attributes ? ` ${attributes}` : ""}${style ? ` style="${style}"` : ""}>${inlineHTML}</wallpaper->`