orbitalCamera.setModel(
 Vector.add(
  orbitalCamera.model,
  Vector.multiply(
   { x: MOUSE_MOVEMENT_Y, y: MOUSE_MOVEMENT_X, z: 0 },
   orbitalGame.manifest.mouseSensitivity
  )
 )
)