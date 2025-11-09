declare interface IKirejiApnEditor extends IMix {
 readonly selected: IKirejiAppSelection
 readonly scroller: IScroller
 readonly "static.css": string
}
declare const editor: IKirejiAppEditor
declare const selected: IKirejiAppSelection
declare const selectedPart: IPart