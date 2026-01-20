pointer.handle({
 click() {
  const key = TARGET_ELEMENT.parentElement.id.slice(5)
  /** @type {IBoolean<IKirejiAppEditorSettings>} */
  const setting = settings[key]
  setting.toggle()
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})