declare interface IEJAugustSections
 extends IApplicationSections<IEJAugust, IEJAugustSection> {

 // Subparts.
 readonly home: IEJAugustHome
 readonly notes: IEJAugustNotes
}

declare type IEJAugustSection =
 IApplicationSection<IEJAugustSections, IPart<IEJAugustSection, IPartAny>>

declare const section: IEJAugustSection