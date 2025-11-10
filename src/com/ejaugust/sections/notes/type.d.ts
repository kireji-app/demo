declare interface IEJAugustNotes
 extends IApplicationSections<IEJAugustSections, IEJAugustNote> {

 // Subparts.
 readonly 1743765678: IEJAugustNote
 readonly 1743772658: IEJAugustNote
 readonly 1762062190: IEJAugustNote
 readonly 1762063104: IEJAugustNote
 readonly 1762063947: IEJAugustNote
 readonly 1762098121: IEJAugustNote
 readonly 1762140334: IEJAugustNote
 readonly 1762150560: IEJAugustNote
 readonly 1762157702: IEJAugustNote
 readonly note: IEJAugustNote
}

/** The section of ejaugust that contains all of the note entries and
 * can display one individual note in the application at a time. */
declare const notes: IEJAugustNotes