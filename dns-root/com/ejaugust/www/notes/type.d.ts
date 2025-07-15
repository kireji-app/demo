declare interface IEJAugustApplicationNotes extends IMatch, IEJAugustApplicationSection {
 readonly "..": IEJAugustApplication
 readonly arm: IEJAugustNote
 /** Sets the note for ejaugust based on the incoming date. */
 go(UNIX_TIMESTAMP): void
}

/** The mix representing the section of ejaugust that shows individual notes (rather than the home section). */
declare const notes: IEJAugustApplicationNotes
declare const note = notes.arm
declare const ejaugust = notes[".."]