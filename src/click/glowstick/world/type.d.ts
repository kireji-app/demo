declare interface IGlowstickWorld extends IMatchOf<IGlowstickRegion> {
 readonly "..": IGlowstick
 /** The color of the grid when previewing the world. */
 readonly gridColor: string
 /** The html element that represents the glowstick world (client only). */
 readonly element: HTMLElement
}
declare const world: IGlowstickWorld