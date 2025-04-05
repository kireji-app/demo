const BasePart = framework.isCore ? null : framework.parent.PartConstructor
class PartError extends Error {
 constructor(message, cause, subtype) {
  super((subtype ? `${subtype}: ` : ``) + message, cause)
 }
}