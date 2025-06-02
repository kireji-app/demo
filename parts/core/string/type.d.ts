declare class PartString extends Part {
 /** A map from string character to place value multiplier,
  * (the value of routeID unit for the given factor).
  * 
  * Used to speed up mapping between string and route ID. */
 readonly placeValues: Map<Part, bigint>
 /** An object storing the plane offsets for each possible string length by its last character (part, key, or index). */
 readonly offsets?: {}
 /** The subpart which is currently the last character in the string. */
 readonly highestEnabledCharacter?: Part
 /** Sets the string's factory settings, character slots, max length and cardinality.
  * For each subpart in the manifest, the cardinality callback will receive the precomputed string cardinality and must return a cardinality to assign to the string. */
 distributeInitializePart(PART_MANIFEST: object, CARDINALITY_CALLBACK: Function): void
}
declare const string: PartString
declare const CHANGED_CHARACTERS: Part[]