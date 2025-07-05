declare interface IEJAugustThemeNotes extends IMatch, IEJAugustThemeArm {
 /** The match that selects a date for ejaugust. */
 readonly date: IEJAugustThemeNotesDate
 readonly "..": IEJAugustTheme
}

/** The mix representing the state of ejaugust whenever there is a note activated (rather than the home page). */
declare const notes: IEJAugustThemeNotes