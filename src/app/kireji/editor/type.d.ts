declare interface IKirejiAppEditor
 extends IMix<IKirejiApp, IKirejiAppEditorPart> {

 // Subparts.
 readonly selected: IKirejiAppEditorSelection
 readonly scroller: IScroller<IKirejiAppEditor>

 // Serialized Properties.
 readonly "inline.css": string
 readonly "inline.html": string
 readonly "static.css": string
}

declare type IKirejiAppEditorPart =
 IPart<IKirejiAppEditor, IPart<IKirejiAppEditorPart, IPartAny>>

declare const editor: IKirejiAppEditor
declare const selected: IKirejiAppEditorSelection
declare const selectedPart: IPartAny