declare interface IGlowstickWorld
 extends IMesh<IGlowstick>,
 IWebComponent {

 // Runtime Properties.
 /** The html element that represents the glowstick world (client only). */
 readonly element: HTMLElement
 /** represents the runtime position of the camera, which gently lags behind player movement to prevent popping due to pixel-perfect player motion. */
 readonly camera: IVector2
 /** Skips distributing the route ID into the runtime model, useful if the method calling to set the world's route ID already distributed a model to it beforehand. */
 readonly skipRuntimeStateDistribution: boolean
 readonly viewedTriIndex: IMeshTriIndex
 readonly viewedPosition: IVector2
}

declare const world: IGlowstickWorld