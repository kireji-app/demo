declare interface IKirejiAppApplicationEditor extends IMix {
 readonly selected: IKirejiAppApplicationSelection
 readonly scroller: IScroller
 readonly "static.css": string
}
declare const editor: IKirejiAppApplicationEditor
declare const selected: IKirejiAppApplicationSelection
declare const selectedPart: IPart