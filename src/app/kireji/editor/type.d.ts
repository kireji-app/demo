declare interface IKirejiAppEditor
 extends IMix<IKirejiApp, IKirejiAppEditorPart>,
 IWebComponent {

 // Subparts.
 readonly tabGroup: IKirejiAppTabGroup
 readonly sections: IKirejiAppEditorSections
 readonly scroller: IScroller<IKirejiAppEditor>

 // Serialized Properties.
 readonly "crumbs.html": string
 readonly "static.css": string
 readonly "summary-view.html": string
 readonly "file-view.html": string
 readonly "background.svg": string
 /** Creates a new drag-drop-activate session for a tab. If one already exists (multi-touch), the call is ignored.
  * 
  * If TARGET_ELEMENT is a tab:
  * - It is activated immediately.
  * - If the session ends over the tab group, the tab will be moved to the slot nearest the pointer.
  * 
  * If TARGET_ELEMENT is not a tab:
  * - PART_INDEX (and optional FILE_INDEX) are required to identify a tab.
  * - If the session ends over the tab group, the tab will be  moved to (or created at) the slot nearest the pointer and activated.
  * - If the session ends over TARGET_ELEMENT, the tab will be found (or created at the end of the tab group) and activated. */
 readonly point(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement, PART_INDEX?: number, FILE_INDEX?: number): void
 readonly closePoint(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement): void
}

declare type IKirejiAppEditorPart =
 IPart<IKirejiAppEditor, IPart<IKirejiAppEditorPart, IPartAny>>

declare interface IKirejiAppEditorPointerConfig
 extends IPointerConfig {
 /** The index of TARGET_ELEMENT within the tab group or -1 if TARGET_ELEMENT is not a tab in the group. */
 readonly activeTabIndexOfDraggedItem: number
 /** The element currently visually marked as the drop destination for the drag-and-drop operation. */
 readonly dropTargetElement?: HTMLElement
 /** An orphaned tab element that follows the user's pointer movements to show them what item they are currently dragging. */
 readonly dragPreviewElement?: HTMLElement
}

declare const editor: IKirejiAppEditor