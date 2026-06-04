declare interface IOrbitalCamera
 extends IMix<IOrbitalGame, IAngle<IOrbitalCamera>> {

 // Subparts.
 readonly x: IAngle<IOrbitalCamera>
 readonly y: IAngle<IOrbitalCamera>
 readonly z: IAngle<IOrbitalCamera>

 // Components.
 readonly buffer: Float32Array
 readonly model: IVector3

 // Properties.
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

 // Properties.
 readonly smooth: number
}

declare const OrbitalCamera: IOrbitalCamera
type OrbitalCamera = T