declare interface IKirejiAppPropertyViewer
 extends IMix<IKirejiApp, IKirejiAppPropertyViewerPart> {

 // Subparts.
 readonly selected: IKirejiAppPropertyViewerSelection
 readonly scroller: IScroller<IKirejiAppPropertyViewer>

 // Serialized Properties.
 readonly "info-about.html": string
 readonly "info-hash.html": string
 readonly "info-properties.html": string
 readonly "inline.html": string
 readonly "inline.css": string
 readonly "static.css": string
 readonly "summary-view.html": string
 readonly "file-view.html": string
 readonly activate(EVENT: Event, TAB_ELEMENT: HTMLElement): void
 readonly close(EVENT: Event, TAB_INDEX: number): void
 readonly open(EVENT: Event, PART_INDEX: number, FILE_INDEX: number): void
}

declare type IKirejiAppPropertyViewerPart =
 IPart<IKirejiAppPropertyViewer, IPart<IKirejiAppPropertyViewerPart, IPartAny>>

declare const propertyViewer: IKirejiAppPropertyViewer