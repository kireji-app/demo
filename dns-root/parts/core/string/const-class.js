class StringError extends Error {
 constructor(message = "An unknown error occurred.", cause, subtype) {
  super(`${subtype ? `${subtype}: ` : ` `}${message}`, { cause })
 }
}
class StringCollectRouteError extends StringError {
 constructor(message = "An unknown error occurred.", cause) {
  super(message, cause, "Collect Route")
 }
}
