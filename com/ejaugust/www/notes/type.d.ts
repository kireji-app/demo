declare interface IEJAugustApplicationNotes extends IMatch, IEJAugustApplicationArm {
 /** The match that selects a date for ejaugust. */
 readonly date: IEJAugustApplicationNotesDate
 readonly "..": IEJAugustApplication
}

/** The mix representing the state of ejaugust whenever there is a note activated (rather than the home page). */
declare const notes: IEJAugustApplicationNotes