declare interface IEJAugust
 extends IComApplication {

 // Subparts.
 readonly scroller: IScroller<IEJAugust>
 readonly sections: IEJAugustSections

 // Serialized Properties.
 /** The portion of the stylesheet that doesn't change with the application's state. */
 readonly "static.css": string
 /** A vector form of the GitHub logo that can be used for showing a social integration icon. */
 readonly "github.svg": string
 /** A vector form of the LinkedIn logo that can be used for showing a social integration icon. */
 readonly "linkedin.svg": string

 // Runtime Properties.
 /** An object that maps canonical link pathnames of notes back to their true key (their creation timestamp). */
 readonly canonicalLinks: Record<string, string>
}

/** The entire www.ejaugust.com application, including home page and all notes. */
declare const ejaugust: IEJAugust