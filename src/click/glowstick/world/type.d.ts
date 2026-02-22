declare interface IGlowstickWorld
 extends IMesh<IGlowstick>,
 IWebComponent {

 // Runtime Properties.
 /** The html element that represents the glowstick world (client only). */
 readonly element: HTMLElement
 /** Skips distributing the route ID into the runtime model, useful if the method calling to set the world's route ID already distributed a model to it beforehand. */
 readonly skipRuntimeStateDistribution: boolean
}

declare const world: IGlowstickWorld