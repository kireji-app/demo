declare interface IGlowstickRegion
 extends IMix<IGlowstickWorld, IGlowstickRegionDimension> {

 // Subparts.
 /** A part representing the width range of the region. */
 readonly xAxis: IGlowstickRegionDimension
 /** A part representing the height range of the region. */
 readonly yAxis: IGlowstickRegionDimension

 // Serialized Properties.
 /** The space-separated list of HTML element attributes for this region. */
 readonly "attributes": string
 /** The raw HTML that renders this region in the world. */
 readonly "inline.html": string
 /** The current user position on the x-axis if in the region, -1n otherwise. */
 readonly "xPosition": bigint
 /** The current user position on the y-axis if in the region, -1n otherwise. */
 readonly "yPosition": bigint
 /** The width of the region rectangle in the glowstick world. */
 readonly "w": bigint
 /** The height of the region rectangle in the glowstick world. */
 readonly "h": bigint
 /** Tests whether or not the given region or user overlaps with this region. */
 readonly overlaps(REGION: IGlowstickRegion | IGlowstickUser): boolean

 // Runtime Properties.
 /** The left edge position of the region rectangle in the glowstick world. */
 readonly x: bigint
 /** The top edge position of the region rectangle in the glowstick world. */
 readonly y: bigint
 /** The color of the grid when previewing the region, if one is defined. */
 readonly gridColor?: string
 /** The DOM element (client only) representing this region. */
 readonly element: HTMLElement
 /** The list of regions which are overlapping this region. */
 readonly neighbors: IGlowstickRegion[]
}

declare type IGlowstickRegionDimension =
 IPart<IGlowstickRegion, null>

declare const region: IGlowstickRegion
/** The incoming region (only available in the overlaps function). */
declare const REGION: IGlowstickRegion