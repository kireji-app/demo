declare interface IKirejiAppPropertyViewer
 extends IMix<IKirejiApp, IKirejiAppPropertyViewerPart> {

 // Subparts.
 readonly selected: IKirejiAppPropertyViewerSelection
 readonly scroller: IScroller<IKirejiAppPropertyViewer>

 // Serialized Properties.
 readonly "inline.css": string
 readonly "inline.html": string
 readonly "static.css": string
}

declare type IKirejiAppPropertyViewerPart =
 IPart<IKirejiAppPropertyViewer, IPart<IKirejiAppPropertyViewerPart, IPartAny>>

declare const propertyViewer: IKirejiAppPropertyViewer
declare const selected: IKirejiAppPropertyViewerSelection
declare const selectedPart: IPartAny