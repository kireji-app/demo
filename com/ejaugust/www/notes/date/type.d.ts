declare interface IEJAugustThemeNotesDate extends IMatch {
 readonly "..": IEJAugustThemeNotes
 /** Sets the note for ejaugust based on the incoming date. */
 go(UNIX_TIMESTAMP): void
 readonly arm: IEJAugustNote
}

declare const notesDate: IEJAugustThemeNotesDate