declare interface IEJAugustSections
 extends IAppSections<IEJAugust, IEJAugustSubsection> {

 // Subparts.
 readonly home: IEJAugustHome
 readonly notes: IEJAugustNotes
}

declare const EJAugustSections: IEJAugustSections
type EJAugustSections = T