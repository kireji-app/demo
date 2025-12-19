declare interface IPartOutliner<TOwner>
 extends IMix<TOwner, IPartOutlinerPart<TOwner>>,
 IWebComponent {

 // Subparts.
 readonly scroller: IScroller<IPartOutliner<TOwner>>
 readonly folders: IPartOutlinerFolders<IPartOutliner<TOwner>>

 // Serialized Properties.
 /** A pseudo-part (dummy object) which acts as the hidden root of the hierarchy for the outliner's recursive item html generation. */
 readonly "dummySubject": IPartAny
 /** Takes in a part and returns the array of zero or more children that should appear inside of it within the outliner. */
 readonly getChildren(SUBJECT: IPartAny): IPartAny[]
 /** Takes in a part and recursively generates its outliner item HTML. */
 readonly recursiveItemHTML(SUBJECT: IPartAny, DEPTH: number, IS_LAST_OF_TYPE: bool): string
 /** Responds to a glick on the collapse/expand button of the given svg element, updating the button's state and this part's route ID using the given index to set the bit in the this part's route ID that represents the given outliner item. */
 readonly toggle(ELEMENT: HTMLElement, FOLDER_INDEX: number): void
}

declare type IPartOutlinerAny =
 IPartOutliner<IPartAny<IPartOutlinerAny, IPartAny>>

declare type IPartOutlinerPart<TOutlinerOwner> =
 IPart<IPartOutliner<TOutlinerOwner>, IPart<IPartOutlinerPart<TOutlinerOwner>, IPartAny>>

declare const partOutliner: IPartOutlinerAny
declare const SUBJECT: IPartAny