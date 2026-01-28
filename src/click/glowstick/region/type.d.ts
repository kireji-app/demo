declare interface IGlowstickRegion
 extends IBox<IGlowstickWorld>,
 IWebComponent {

 // Serialized Properties.
 /** The space-separated list of HTML element attributes for the region. */
 readonly "attributes": string
 /** The current user position on the x-axis if in the region, -1n otherwise. */
 readonly "xPosition": bigint
 /** The current user position on the y-axis if in the region, -1n otherwise. */
 readonly "yPosition": bigint
 /** The width of the region rectangle in the glowstick world. */
 readonly "w": bigint
 /** The height of the region rectangle in the glowstick world. */
 readonly "h": bigint
 /** An array providing the static x-position, y-position, width and height of the region in the world. */
 readonly "xywh": [bigint | number, bigint | number, bigint | number, bigint | number]
 /** Tests whether or not the given region or user overlaps with the region. */
 readonly overlaps(REGION: IGlowstickRegion | IGlowstickUser): boolean

 // Runtime Properties.
 /** The left edge position of the region rectangle in the glowstick world. */
 readonly x: bigint
 /** The top edge position of the region rectangle in the glowstick world. */
 readonly y: bigint
 /** The color of the grid when previewing the region, if one is defined. */
 readonly gridColor?: string
 /** The DOM element (client only) representing the region. */
 readonly element: HTMLElement
 /** The list of regions which are overlapping the region. */
 readonly neighbors: IGlowstickRegion[]
}

declare const region: IGlowstickRegion
/** The incoming region (only available in the overlaps function). */
declare const REGION: IGlowstickRegion