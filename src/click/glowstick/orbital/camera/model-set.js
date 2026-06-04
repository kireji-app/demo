const { x, y } = MODEL

OrbitalCamera.x.smooth = Math.min(Math.max(x, -90), 90)
OrbitalCamera.y.smooth = ((y % 360) + 360) % 360

const newCameraRID = OrbitalCamera.modelToRID(MODEL)

if (newCameraRID !== OrbitalCamera.rid)
 OrbitalCamera.setRID(newCameraRID, false, true)