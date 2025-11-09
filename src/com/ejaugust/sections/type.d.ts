declare interface IEJAugustSections extends IMatch {
 readonly "..": IEJAugust
 readonly home: IEJAugustHome
 readonly notes: IEJAugustNotes
 readonly arm: IEJAugustSection<IPart>
}

declare const section: IEJAugustSection<IPart>