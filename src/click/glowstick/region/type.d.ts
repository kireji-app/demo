declare interface IGlowstickRegion extends IMix {
 /** The left edge position of the region rectangle in the glowstick world. */
 readonly x: bigint
 /** The top edge position of the region rectangle in the glowstick world. */
 readonly y: bigint
 /** The width of the region rectangle in the glowstick world. */
 readonly w: bigint
 /** The height of the region rectangle in the glowstick world. */
 readonly h: bigint
 /** The current user position on the x-axis if in the region, -1n otherwise. */
 readonly xPosition: bigint
 /** The current user position on the y-axis if in the region, -1n otherwise. */
 readonly yPosition: bigint
 /** A part representing the width range of the region. */
 readonly xAxis: IPart
 /** A part representing the height range of the region. */
 readonly yAxis: IPart
 /** The color of the grid when previewing the world. */
 readonly gridColor: string
 /** The DOM element (client only) representing this region. */
 readonly element: HTMLElement
 /** The list of regions which are overlapping this region. */
 readonly neighbors: IGlowstickRegion[]
 /** Tests whether or not the given region or user overlaps with this region. */
 readonly overlaps(REGION: IGlowstickRegion | IGlowstickUser): boolean
}
declare const region: IGlowstickRegion
/** The incoming region (only available in the overlaps function). */
declare const REGION: IGlowstickRegion