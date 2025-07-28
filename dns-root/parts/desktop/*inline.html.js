const { attributes, style, "inline.html": inlineHTML } = _.application

return `<wallpaper- tabIndex=1${attributes ? ` ${attributes}` : ""}${style ? ` style="${style}"` : ""}>${inlineHTML}</wallpaper->`