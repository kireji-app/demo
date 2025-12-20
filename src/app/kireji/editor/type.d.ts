declare interface IKirejiAppEditor
 extends IMix<IKirejiApp, IKirejiAppEditorPart>,
 IWebComponent {

 // Subparts.
 readonly tabGroup: IKirejiAppTabGroup
 readonly scroller: IScroller<IKirejiAppEditor>

 // Serialized Properties.
 readonly "info-about.html": string
 readonly "info-state-space.html": string
 readonly "info-state.html": string
 readonly "info-properties.html": string
 readonly "static.css": string
 readonly "summary-view.html": string
 readonly "file-view.html": string
 readonly activate(EVENT: Event, TAB_ELEMENT: HTMLElement): void
 readonly close(EVENT: Event, TAB_INDEX: number): void
 readonly open(EVENT: Event, PART_INDEX: number, FILE_INDEX?: number): void
}

declare type IKirejiAppEditorPart =
 IPart<IKirejiAppEditor, IPart<IKirejiAppEditorPart, IPartAny>>

declare const editor: IKirejiAppEditor