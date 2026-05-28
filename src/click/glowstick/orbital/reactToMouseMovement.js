orbitalCamera.setModel(
 Vector.add(
  orbitalCamera.model,
  Vector.multiply(
   Vector[3](MOUSE_MOVEMENT_Y, MOUSE_MOVEMENT_X),
   orbitalGame.manifest.mouseSensitivity
  )
 )
)