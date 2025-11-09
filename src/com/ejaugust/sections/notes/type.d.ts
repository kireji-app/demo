declare interface IEJAugustNotes extends IEJAugustSection<IEJAugustNote> {
 readonly arm: IEJAugustNote
}

/** The section of ejaugust that contains all of the note entries and can display one individual note in the application. */
declare const notes: IEJAugustNotes
declare const note = notes.arm