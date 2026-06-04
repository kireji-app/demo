OrbitalCamera.setModel(
 Vector.add(
  OrbitalCamera.model,
  Vector.multiply(
   Vector[3](MOUSE_MOVEMENT_Y, MOUSE_MOVEMENT_X),
   OrbitalGame.manifest.mouseSensitivity
  )
 )
)