const { x, y } = MODEL

orbitalCamera.x.smooth = x
orbitalCamera.y.smooth = y

const newCameraRouteID = orbitalCamera.modelToRouteID(MODEL)

if (newCameraRouteID !== orbitalCamera.routeID)
 orbitalCamera.setRouteID(newCameraRouteID, false, true)