declare interface IOrbitalCamera
 extends IMix<IOrbitalGame, IAngle<IOrbitalCamera>> {

 // Subparts.
 readonly x: IAngle<IOrbitalCamera>
 readonly y: IAngle<IOrbitalCamera>

 // Serialized Properties.
 readonly buffer: Float32Array
 readonly model: {
  x: number,
  y: number,
  z: number
 }
 // Conditionally sets the route ID of the camera while updating the smooth camera rotation model.
 readonly setSmooth(MODEL: { x: number, y: number }): void

 // Runtime Properties.
 readonly fov: number
 readonly near: number
 readonly far: number
 readonly scope: number
 readonly pixelRatio: number
 /** The height of the camera lens from the ground. */
 readonly height: number
}

declare interface IAngle<TOwner>
 extends IPart<TOwner, null> {

}

declare const orbitalCamera: IOrbitalCamera