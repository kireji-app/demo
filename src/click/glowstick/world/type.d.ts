declare interface IGlowstickWorld
 extends IWalkable<IGlowstickGame>,
 IWebView {

 // Properties.
 /** The html element that represents the Glowstick game world (client only). */
 readonly element: HTMLElement
 /** represents the runtime position of the camera, which gently lags behind player movement to prevent popping due to pixel-perfect player motion. */
 readonly camera: IVector3
 readonly viewedTriIndex: IWalkableTriIndex
 readonly viewedPosition: IVector3
 readonly manifest: IGlowstickWorldManifest
}

declare interface IGlowstickWorldManifest
 extends IWalkableManifest {
 /** The layout of the world as a flat array of numbers representing the positions of props. */
 readonly layout: number[],
 /** The available props as a flat array of numbers representing their shape and texture. Used to index props in the layout. */
 readonly props: number[],
 /** An array of css variable names representing sprite sheets that are available for props. */
 readonly sheets: string[]
}

declare const GlowstickWorld: IGlowstickWorld
type GlowstickWorld = T