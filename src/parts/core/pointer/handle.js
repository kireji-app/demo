// Don't let this pointer event do anything else.
const noop = event => { event.preventDefault(); event.stopPropagation() }
noop(POINTER_CONFIG.POINTER_EVENT)

// Don't respond to this pointer event if its the wrong type or not the only one.
if (pointer.id !== null || POINTER_CONFIG.POINTER_EVENT.pointerType === 'mouse' && POINTER_CONFIG.POINTER_EVENT.button !== 0)
 return

const controller = new AbortController()

// Don't allow click or context menu during active pointer session.
document.addEventListener('contextmenu', noop, { capture: true, signal: controller.signal })

const
 // Declare the follow-up event handlers.
 drag = pointerEvent => {

  // Don't let this pointer event do anything else.
  noop(pointerEvent)

  // Don't respond to this pointer event if its not the active one.
  if (pointerEvent.pointerId !== pointer.id)
   return

  // Perform custom action.
  if (typeof POINTER_CONFIG.drag === "function")
   POINTER_CONFIG.drag(pointerEvent)
 },
 drop = pointerEvent => {

  // Don't let this pointer event do anything else.
  noop(pointerEvent)

  // Don't drop the pointer event if its the wrong type or not the active one.
  if (pointerEvent.pointerId !== pointer.id || /*pointerEvent.pointerType !== 'touch' */ pointerEvent.pointerType === 'mouse' && pointerEvent.button !== 0)
   return

  // Determine if the drop should be handled using a click override.
  const wasClick = (typeof POINTER_CONFIG.click === "function" || POINTER_CONFIG.focus === "click") && (
   ({ left, right, top, bottom }) => pointerEvent.clientX >= left && pointerEvent.clientX <= right && pointerEvent.clientY >= top && pointerEvent.clientY <= bottom
  )(POINTER_CONFIG.TARGET_ELEMENT.getBoundingClientRect())

  if (wasClick) {

   // Perform custom action.
   if (typeof POINTER_CONFIG.click === "function")
    POINTER_CONFIG.click(pointerEvent)

   // Conditionally focus the element.
   if (POINTER_CONFIG.focus === "click")
    POINTER_CONFIG.TARGET_ELEMENT.focus()

  } else {

   // Perform custom action.
   if (typeof POINTER_CONFIG.drop === 'function')
    POINTER_CONFIG.drop(pointerEvent)
  }

  // Reset the state to before the initial pointer down.
  reset(pointerEvent)
 },
 reset = () => {

  // Detach follow-up listeners and re-enable context menu.
  controller.abort()

  // Release the pointer capture.
  if (POINTER_CONFIG.TARGET_ELEMENT.hasPointerCapture(pointer.id))
   POINTER_CONFIG.TARGET_ELEMENT.releasePointerCapture(pointer.id)

  // Reset the pointer id.
  pointer.id = null

  // Perform custom action.
  if (typeof POINTER_CONFIG.reset === "function")
   POINTER_CONFIG.reset()
 }

// Attach to the follow-up event handlers along the whole document.
document.addEventListener("pointermove", drag, { signal: controller.signal })
document.addEventListener("pointerup", drop, { signal: controller.signal })
document.addEventListener("pointercancel", reset, { signal: controller.signal })

// Don't allow anything else to start picking up events.
POINTER_CONFIG.TARGET_ELEMENT.setPointerCapture(pointer.id = POINTER_CONFIG.POINTER_EVENT.pointerId)

// Conditionally focus the element.
if (POINTER_CONFIG.focus === "down")
 POINTER_CONFIG.TARGET_ELEMENT.focus()

// Perform custom action.
if (typeof POINTER_CONFIG.down === "function")
 POINTER_CONFIG.down()