declare interface IEJAugustApplication extends IApplication, IMatch {
 readonly "..": IEJAugust
 readonly home: IEJAugustApplicationHome
 readonly notes: IEJAugustApplicationNotes
 /** The portion of the stylesheet that doesn't change with the application's state. */
 readonly "static.css": string
 readonly arm: IEJAugustApplicationSection
}
/** The entire www.ejaugust.com application, including home page and all notes. */
declare const ejaugust: IEJAugustApplication