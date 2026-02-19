declare interface IGlowstickWorld
 extends IMatch<IGlowstick, IGlowstickRegion>,
 IWebComponent {

 // Subparts.
 readonly bathroom: IGlowstickRegion
 readonly bathroomDoor: IGlowstickRegion
 readonly bridge: IGlowstickRegion
 readonly hallway: IGlowstickRegion
 readonly hallwayDoor: IGlowstickRegion
 readonly officeA: IGlowstickRegion
 readonly officeADoor: IGlowstickRegion
 readonly openOffice: IGlowstickRegion

 // Runtime Properties.
 /** The color of the grid when previewing the world, if one is defined. */
 readonly gridColor?: string
 /** The html element that represents the glowstick world (client only). */
 readonly element: HTMLElement
}

declare const world: IGlowstickWorld