const { x, y } = MODEL

orbitalCamera.x.smooth = Math.min(Math.max(x, -90), 90)
orbitalCamera.y.smooth = ((y % 360) + 360) % 360

const newCameraRouteID = orbitalCamera.modelToRouteID(MODEL)

if (newCameraRouteID !== orbitalCamera.routeID)
 orbitalCamera.setRouteID(newCameraRouteID, false, true)