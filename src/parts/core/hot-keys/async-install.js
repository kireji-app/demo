await agent.promise

hotKeys.define({
 table: { value: JSON.parse(hotKeys["table.json"]) },
 pressed: { value: new Set(), writable: true },
 contextPrefix: { value: agent.isMac ? 'Meta' : 'Control' }
})

/** In macOS, while the context key is pressed, the OS doesn't report non-
 * modifier key up events until the context key is released. This property
 * stores the non-modifier key code most recently pressed while the context
 * key is being held. This key will be removed from the pressed set when the
 * context key is released and replaced in the set the moment a different
 * non-modifier key is pressed while the context key is still being held.
 * 
 * There is also some lagginess in key presses that makes gaming impossible
 * unless we restrict the number of recognized terminal keys to one: the most
 * recently pressed terminal key. */
let nonModifierKey = null

const
 isInPostContext = () => [...hotKeys.pressed].some(code => code.startsWith(hotKeys.contextPrefix)),
 isInPostShift = () => [...hotKeys.pressed].some(code => code.startsWith("Shift")),
 setNonModifierKey = code => {
  hotKeys.pressed.delete(nonModifierKey)
  nonModifierKey = code
 }

globalThis.addEventListener("blur", () => {
 hotKeys.pressed.clear()
 setNonModifierKey(null)
})

globalThis.addEventListener("keyup", keyboardEvent => {
 hotKeys.pressed.delete(keyboardEvent.code)
 setNonModifierKey(null)
})

globalThis.addEventListener("keydown", keyboardEvent => {
 if (!keyboardEvent.repeat) {
  /* This handles the edge case when the user is holding modifier keys that
   * they pressed while not focused on this instance of the ecosystem. */
  if (!isInPostContext() && !keyboardEvent.code.startsWith(hotKeys.contextPrefix) && (agent.isMac ? keyboardEvent.metaKey : keyboardEvent.ctrlKey))
   hotKeys.pressed.add(hotKeys.contextPrefix + "Left")

  if (!isInPostShift() && !keyboardEvent.code.startsWith("Shift") && keyboardEvent.shiftKey)
   hotKeys.pressed.add("ShiftLeft")

  /* When the user presses a context key, drop all prior keys. The user is
   * required to press and hold a context key before they add on other keys.*/
  if (keyboardEvent.code.startsWith(hotKeys.contextPrefix)) {
   setNonModifierKey(null)
   hotKeys.pressed.clear()
  }
  /* When a context key is held, only retain the most recently pushed
   * non-modifier key, erasing all previous non-modifiers that may have
   * been pressed since context was held. This allows the user to enter
   * multiple commands in rapid succession, while enforcing that every
   * keyboard shortcut can contain only one non-modifier character. */
  else if (isInPostContext()) {
   const isModifier = keyboardEvent.code.startsWith("Shift") || keyboardEvent.code.startsWith("Option") || keyboardEvent.code.startsWith("Alt") || keyboardEvent.code.startsWith("Control") || keyboardEvent.code.startsWith("Meta")
   setNonModifierKey(isModifier ? null : keyboardEvent.code)
  }

  hotKeys.pressed.add(keyboardEvent.code)

  const combo = hotKeys.combo
  const methodName = JSON.parse(_.application["hot-keys.json"] ?? "{}")[combo] ?? hotKeys.table[combo]
  const method = methodName && (_.application[methodName] ?? hotKeys[methodName])

  if (methodName) {
   keyboardEvent.preventDefault()
   if (typeof method === "function")
    method()
   // else warn(`Hot Keys Warning: method called ${methodName} is not defined on either the hot keys manager or the current application.`)
  }
 }
})