declare interface IPointer
 extends IFacet<ICore> {

 // Serialized Properties.
 /** The universal interaction handler for clicking, dragging-and-dropping, selecting, etc. */
 readonly handle(POINTER_CONFIG: IPointerConfig): void

 // Runtime Properties.
 /** If there is a pointer session active, the id of the pointer that controls it. Otherwise, `null`. */
 readonly id: number | null
 readonly doubleClick: {
  target?: HTMLElement
  timeout?: number
  confirmed?: true
 }
}

declare interface IPointerConfig {
 down: () => void,
 drag: (pointerEvent) => void,
 drop: (pointerEvent) => void,
 click: (pointerEvent) => void,
 doubleClick: (pointerEvent) => void,
 reset: () => void,
 readonly POINTER_EVENT: PointerEvent,
 readonly TARGET_ELEMENT: HTMLElement,
 /** How the item should be focused during the pointer session. */
 readonly focus?: "none" | "down" | "click",
 readonly data: any
}

declare const pointer: IPointer

declare const POINTER_CONFIG: IPointerConfig