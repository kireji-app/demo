globe.MatchError = class MatchError extends Error {
 constructor(message = "An unknown error occurred.", cause, subtype) {
  super(`${subtype ? `${subtype}: ` : ``}${message}`, { cause })
 }
}
globe.MatchCollectRouteError = class MatchCollectRouteError extends MatchError {
 constructor(message, cause) {
  super(message, cause, "Collect Route")
 }
}