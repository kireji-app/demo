globe.MixError ??= class MixError extends Error {
 constructor(message = "An unknown error occurred.", cause, subtype) {
  super(`${subtype ? `${subtype}: ` : ` `}${message}`, { cause })
 }
}

globe.MixCollectRouteError ??= class MixCollectRouteError extends MixError {
 constructor(message, cause) {
  super(message, cause, "Collect Route")
 }
}