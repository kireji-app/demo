declare interface IKirejiAppPropertyViewer
 extends IMix<IKirejiApp, IKirejiAppPropertyViewerPart> {

 // Subparts.
 readonly selected: IKirejiAppPropertyViewerSelection
 readonly scroller: IScroller<IKirejiAppPropertyViewer>

 // Serialized Properties.
 readonly "info-basic.html": string
 readonly "info-files.html": string
 readonly "info-hash.html": string
 readonly "info-properties.html": string
 readonly "inline.html": string
 readonly "inline.css": string
 readonly "static.css": string
}

declare type IKirejiAppPropertyViewerPart =
 IPart<IKirejiAppPropertyViewer, IPart<IKirejiAppPropertyViewerPart, IPartAny>>

declare const propertyViewer: IKirejiAppPropertyViewer
declare const selected: IKirejiAppPropertyViewerSelection
declare const selectedPart: IPartAny