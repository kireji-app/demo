declare interface IEJAugustApplicationNotes extends IMatchOf<IEJAugustNote>, IEJAugustApplicationSection {
 readonly "..": IEJAugustApplication
 readonly arm: IEJAugustNote
}

/** The mix representing the section of ejaugust that shows individual notes (rather than the home section). */
declare const notes: IEJAugustApplicationNotes
declare const note = notes.arm
declare const ejaugust = notes[".."]