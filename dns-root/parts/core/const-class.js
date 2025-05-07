globalThis.PartError ??= class PartError extends Error {
 constructor(message, cause, subtype) {
  super((subtype ? `${subtype}: ` : ``) + message, cause)
 }
}