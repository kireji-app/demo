declare interface IGlowstickWorld extends IMatchOf<IGlowstickRegion> {
 readonly "..": IGlowstick
 /** The color of the grid when previewing the world, if one is defined. */
 readonly gridColor?: string
 /** The html element that represents the glowstick world (client only). */
 readonly element: HTMLElement
}
declare const world: IGlowstickWorld

// instead of adding regions to this dedicated world match, we _could_ have a "regions" property on each part.
// this process would allow us to specify a collection of rectangles for each part.
// then, this world part would aggregate all regions at build time
// including the calculation of each region's door network(s)
// the world can have a region of its own, and even each of the generated region parts can have
// regions of their own, defined generically as part of the region root part.
// door networks then represent per-room matches that are generated at boot-time just like the regions themselves.
// Yes, even per-room matches can have generic regions and/or stateful props if we want them to.
// This provides some degree of self-reference at build-time. Does the meta-world go on forever? how could it? it would 
// bloat the overall cardinality of the state space.
// specifically, the entire world is collected here in much the same way that the selection and outliner options
// are collected per-part at boot time for kireji.app.
// parts without a region are sadly missing.
// the purpose of per-part region definitions is to create a cognitive mapping between the structure of
// the application and the in-game map. Having too many missing regions would prevent teaching opportunities
// even abstract parts can have regions. parts can inherit regions by defining only those properties that they
// wish to override for the given region (for example, so that all "scroller" instances can have something in common).
// Each room can have interactive elements related to their function. For abstract parts with stateful regions,
//  they could in theory exist as blueprints in one of the regions of the parent part.

// Example: the scroller abstract is in the abstract.parts room.
// The abstract.parts part contains the following abstracts (blueprints?):
// - apex
// - clip
// - error
// - facet
// - match
// - mix
// - part
// X range (used only in rectangle)
// X rectangle (unused)
// - scroller
// X slot (unused)
// - tld

// the only concrete part is the www for the application.

// there can also be a www abstract

// now, the room you are in is a simple selection part whose cardinality
//  is the sum of each part's region count

// each room could in theory have a name. i.e. core.parts/bathroom, www.core.parts/office-1, etc.
// this allows the "regions"/"rooms"/"world" property to be a string-keyed object
// this string-keyed object can have other properties too
// it might be worth creating a separate world.json or glowstick.json or similar.
// world.json cannot be dynamically generated because there would be a crock recursive circular logic
// - when trying to determine the cardinality of the root part before generating this world.json
// - whose region counts and sizes determine the cardinality of the root part
// for NPCs to have a decaying certainty, we would need to establish toggle-able NPC positions
// this would require logic similar to the variable-length string logic I tried to implement before
// - which I wasn't able to satisfactorily solve in the absence of dynamic, URL-delimited "file" add-ons
// if we did have that, however, then we could easily implement decay from detailed files to smaller less
// - detailed files by letting NPC files be match arms depending upon whether or not they have decayed
// - from true world positions and state parameters to probability clouds
// this would be the next matured version of the system
// in any case, the simpler probability cloud definition is possible even now,
// - with the probability of an off-screen NPC being found in the next room (or entering the
// - current room) being determined by the NPC's hard-coded nature, its other state parameters,
// - the properties of the room itself and a non-deterministic sampling method
// consider the existence of a dedicated parallel world for each NPC
// in such a world, we have T_count regions containing (independently) arbitrarily many
//  dimensions, each representing mutually exclusive knowledge groups about the NPC.
// When we are in a smaller room, the NPC has less information about their state
// - at approximately each half-life, we "decay" from one of the T-count time-dependent regions
// - to the next smallest. This allows the amount of stored detail about each NPC to "decay" as the
// - certainty of that information is lost.