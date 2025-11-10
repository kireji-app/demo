declare interface IKirejiAppOutliner
 extends IMix<IKirejiApp, IKirejiAppOutlinerPart> {

 // Subparts.
 readonly width: IKirejiAppOutlinerWidth
 readonly scroller: IScroller<IKirejiAppOutliner>
 readonly folders: IKirejiAppOutlinerFolders

 // Serialized Properties.
 readonly "inline.css": string
 readonly "inline.html": string
 /** Takes in a part and recursively generates its outliner HTML. */
 readonly recursiveItemHTML(SUBJECT: IPartAny, DEPTH: number, IS_LAST_OF_TYPE: bool): string
 /** Responds to a glick on the collapse/expand button of the given svg element, updating the button's state and this part's route ID using the given index to set the bit in the this part's route ID that represents the given outliner item. */
 readonly toggle(ELEMENT: HTMLElement, FOLDER_INDEX: number): void
}

declare type IKirejiAppOutlinerPart =
 IPart<IKirejiAppOutliner, IPart<IKirejiAppOutlinerPart, IPartAny>>

declare const outliner: IKirejiAppOutliner
declare const width: IKirejiAppOutlinerWidth
declare const SUBJECT: IPartAny