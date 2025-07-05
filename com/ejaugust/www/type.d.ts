declare interface IEJAugustTheme extends ITheme, IMatch {
 readonly "..": IEJAugust
 readonly home: IEJAugustThemeHome
 readonly notes: IEJAugustThemeNotes
 /** The portion of the stylesheet that doesn't change with the theme's state. */
 readonly "static.css": string
 readonly arm: IEJAugustThemeArm
}

declare interface IEJAugustThemeArm {
 /** The css overrides for ejaugust's arm. */
 readonly "inline.css": string
 /** The html article content of ejaugust's current arm. */
 readonly "inline.html": string
}

/** The entire www.ejaugust.com theme, including home page and all notes. */
declare const ejaugust: IEJAugustTheme