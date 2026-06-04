declare interface IEJAugust
 extends IComApp {

 // Subparts.
 readonly scroller: IScroller<IEJAugust>
 readonly sections: IEJAugustSections

 // Components.
 /** A vector form of the GitHub logo that can be used for showing a social integration icon. */
 readonly "github.svg": string
 /** A vector form of the LinkedIn logo that can be used for showing a social integration icon. */
 readonly "linkedin.svg": string

 // Properties.
 /** An object that maps canonical link pathnames of notes back to their true key (their creation timestamp). */
 readonly canonicalLinks: Record<string, string>
 readonly topics: Record<string, IEJAugustNote[]>
}

/** The entire www.ejaugust.com app, including home page and all notes. */
declare const EJAugust: IEJAugust
type EJAugust = T