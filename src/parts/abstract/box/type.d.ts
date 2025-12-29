declare interface IBox<TOwner>
 extends IPart<TOwner, null> {

 // Serialized Properties.
 readonly "dimensions": [bigint | number]
 // Runtime Properties.
 /** The array of dimension multipliers, (the value of a unit for each of the defined dimensions) where the box is viewed as a fixed-length mixed-radix string.
  * 
  * Used to speed up computation. */
 readonly placeValues: bigint[]
 /** A cache of the individual dimension values as extracted from the box's overall route ID. */
 readonly placeStates: bigint[]
 /** A cache of the "dimensions" property, so that the array is not duplicated during arithmetic and so that the values are guaranteed to be bigints. */
 readonly placeLimits: bigint[]
}

declare type IBoxAny =
 IBox<IPartAny>

declare const box: IBoxAny