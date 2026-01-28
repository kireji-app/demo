declare interface IPointer
 extends IFacet<ICore> {

 // Serialized Properties.
 /** The universal interaction handler for clicking, dragging-and-dropping, selecting, etc. */
 readonly handle(POINTER_CONFIG: IPointerConfig): void

 // Runtime Properties.
 /** If there is a pointer session active, the ID of the pointer that controls it. Otherwise, `null`. */
 readonly id: number | null
 /** A helper object that holds information about the double click state of the pointer handler. A double click is only tracked and confirmed when there has been a pointer interaction with an element whose handler has a defined `doubleClick` action. */
 readonly doubleClick: IDoubleClickTracker
}

/** An interface for holding information about the double click state of the pointer handler. */
declare interface IDoubleClickTracker {
 /** The double click target, if one exists. Used to verify if two pointer events happened to the same element. */
 target?: HTMLElement
 /** The ID of the native timeout, if one exists, during which a second click on the same element can trigger a double click event. */
 timeout?: number
 /** A boolean that will be true if the user successfully executed a double click manouver. */
 confirmed?: boolean
}

/** An interface used to standardize the handling of pointer actions throughout the ecosystem. */
declare interface IPointerConfig {
 /** The action that should execute when the user first presses down on TARGET_ELEMENT. */
 down: () => void,
 /** The action that should execute every time the user drags the TARGET_ELEMENT around the screen. */
 drag: (pointerEvent: PointerEvent) => void,
 /** The action that should execute when the user lets go of the TARGET_ELEMENT, as long as it is not bypassed by a defined `click` or `doubleClick` action. */
 drop: (pointerEvent: PointerEvent) => void,
 /** The action that should execute when the user lets go of the TARGET_ELEMENT directly on top of itself. If defined, this bypasses the `drop` action. */
 click: (pointerEvent: PointerEvent) => void,
 /** The action that should execute when the user double clicks/taps the target element. If defined, this bypasses the `click` and `drop` actions, but only on the second click. */
 doubleClick: (pointerEvent: PointerEvent) => void,
 /** The action that should finally execute whenever the user's pointer action is complete (whether successfully or through a native pointer event cancellation). */
 reset: () => void,
 /** **REQUIRED**
  * 
  * The pointerdown event responsible for launching the pointer session. */
 readonly POINTER_EVENT: PointerEvent,
 /** **REQUIRED**
  * 
  * The target HTML element whose pointerdown listener responsible for launching the pointer session. */
 readonly TARGET_ELEMENT: HTMLElement,
 /** Optional helper that can automate calling TARGET_ELEMENT.focus() during the pointer session. */
 readonly focus?: "none" | "down" | "click",
}

declare const pointer: IPointer

declare const POINTER_CONFIG: IPointerConfig
/** The pointerdown event that the current listener is reacting to.
 * 
 * *Available only in pointerdown event listeners.* */
declare const POINTER_EVENT: PointerEvent
/** The element that the current pointerdown event is reacting to.
 * 
 * *Available only in pointerdown event listeners.* */
declare const TARGET_ELEMENT: HTMLElement