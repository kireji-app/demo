declare interface IEJAugustTopics
 extends IMatch<IEJAugustSections, null>,
 IAppDetails {

 // Properties.
 /** The set of all topic strings that could be discovered at buil time. */
 readonly all: Set<string>
}

declare const EJAugustTopics: IEJAugustTopics
type EJAugustTopics = T