declare interface IEJAugustApplication extends IApplication, IMatch {
 readonly "..": IEJAugust
 readonly home: IEJAugustApplicationHome
 readonly notes: IEJAugustApplicationNotes
 /** The portion of the stylesheet that doesn't change with the application's state. */
 readonly "static.css": string
 readonly arm: IEJAugustApplicationArm
}

declare interface IEJAugustApplicationArm {
 /** The css overrides for ejaugust's arm. */
 readonly "inline.css": string
 /** The html article content of ejaugust's current arm. */
 readonly "inline.html": string
}

/** The entire www.ejaugust.com application, including home page and all notes. */
declare const ejaugust: IEJAugustApplication