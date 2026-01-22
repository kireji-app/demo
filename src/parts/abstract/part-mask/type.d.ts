declare interface IPartMask<TOwner, TMember>
 extends IPart<TOwner, null> {

 // Serialized Properties.
 /** Returns true if SUBJECT is in the current subset. */
 readonly contains(SUBJECT: IPartAny): boolean

 // Runtime Propeties.
 /** The complete list of parts, used to treat this part's route ID as a bitmask that stores each part's inclusion. */
 readonly superset: TMember[]
 /** The array of currently included parts, determined by parsing the route ID as a bitmask/superset index. */
 readonly chosenParts: Set<TMember>
}

declare const partMask: IPartMask<IPartAny, IPartAny>