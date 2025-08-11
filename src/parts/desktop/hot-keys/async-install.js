await agent.promise

Object.defineProperties(hotKeys, {
 table: { value: JSON.parse(hotKeys["table.json"]) },
 pressed: { value: new Set(), writable: true },
 contextPrefix: { value: agent.isMac ? 'Meta' : 'Control' }
})

/** In macOS, while the context key is pressed, the OS doesn't report non-
 * modifier key up events until the context key is released. This property
 * stores the non-modifier key code most recently pressed while the context
 * key is being held. This key will be removed from the pressed set when the
 * context key is released and replaced in the set the moment a different
 * non-modifier key is pressed while the context key is still being held. */
let postContextNonModifierKey = null

const
 isInPostContext = () => [...hotKeys.pressed].some(code => code.startsWith(hotKeys.contextPrefix)),
 isInPostShift = () => [...hotKeys.pressed].some(code => code.startsWith("Shift")),
 setPostContextNonModifierKey = code => {
  hotKeys.pressed.delete(postContextNonModifierKey)
  postContextNonModifierKey = code
 }

globalThis.addEventListener("blur", e => {
 hotKeys.pressed.clear()
 setPostContextNonModifierKey(null)
})

globalThis.addEventListener("keyup", e => {
 hotKeys.pressed.delete(e.code)
 setPostContextNonModifierKey(null)
})

globalThis.addEventListener("keydown", e => {
 if (!e.repeat) {
  /* This handles the edge case when the user is holding modifier keys that
   * they pressed while not focused on this instance of the platform. */
  if (!isInPostContext() && !e.code.startsWith(hotKeys.contextPrefix) && (agent.isMac ? e.metaKey : e.ctrlKey))
   hotKeys.pressed.add(hotKeys.contextPrefix + "Left")

  if (!isInPostShift() && !e.code.startsWith("Shift") && e.shiftKey)
   hotKeys.pressed.add("ShiftLeft")

  /* When the user presses a context key, drop all prior keys. The user is
   * required to press and hold a context key before they add on other keys.*/
  if (e.code.startsWith(hotKeys.contextPrefix)) {
   setPostContextNonModifierKey(null)
   hotKeys.pressed.clear()
  }
  /* While the user is holding a context key, only retain the most recently
   * pushed non-modifier key, erasing all previous non-modifiers that may have
   * been pressed since context was held. This allows the user to keep holding
   * context and enter multiple commands, while enforcing that every keyboard
   * shortcut can contain only one non-modifier character. */
  else if (isInPostContext()) {
   const isModifier = e.code.startsWith("Shift") || e.code.startsWith("Option") || e.code.startsWith("Alt") || e.code.startsWith("Control") || e.code.startsWith("Meta")
   setPostContextNonModifierKey(isModifier ? null : e.code)
  }

  hotKeys.pressed.add(e.code)

  const combo = hotKeys.getComboString()
  const methodName = hotKeys.table[combo]
  const method = methodName && hotKeys[methodName]

  if (typeof method === "function") {
   e.preventDefault()
   method()
  }
 }
})